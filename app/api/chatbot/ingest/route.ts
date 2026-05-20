import { NextRequest, NextResponse } from 'next/server'
import { embedBatch } from '@/lib/chatbot/embeddings'
import { upsertVectors } from '@/lib/chatbot/pinecone'
import { chunkPost } from '@/lib/chatbot/chunk'
import type { PostData } from '@/lib/chatbot/types'
import type { RecordMetadata } from '@pinecone-database/pinecone'

export const runtime = 'nodejs'
export const maxDuration = 60

const AFFILIATE_SLUGS = new Set([
  'blue-nile-promo-code',
  'james-allen-promotional-code',
  'jewelry-coupons',
  'charles-and-colvard-discount-code',
  'top-jewelry-retailers',
  'best-place-to-buy-engagement-rings-online-tool',
])

const AFFILIATE_CATS = new Set(['diamond-review', 'blue-nile-jewelry-reviews-guide'])

function isAffiliateRelevant(slug: string, cats: string[]): boolean {
  return AFFILIATE_SLUGS.has(slug) || cats.some(c => AFFILIATE_CATS.has(c))
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CHATBOT_INGEST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Partial<PostData>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { slug, title, content, excerpt = '', categories = [], publishedAt } = body
  if (!slug || !title || !content) {
    return NextResponse.json(
      { error: 'slug, title, and content are required' },
      { status: 400 }
    )
  }

  const post: PostData = {
    slug,
    title,
    content,
    excerpt,
    categories,
    publishedAt: publishedAt ?? new Date().toISOString(),
    affiliateRelevant: isAffiliateRelevant(slug, categories),
  }

  // Chunk the post
  const chunks = chunkPost(post)

  // Embed all chunk texts in one batched API call
  const embeddings = await embedBatch(chunks.map(c => c.text))

  // Build Pinecone vectors
  const vectors = chunks.map((chunk, i) => ({
    id: chunk.id,
    values: embeddings[i],
    metadata: chunk.metadata as unknown as RecordMetadata,
  }))

  await upsertVectors(vectors)

  return NextResponse.json({ ok: true, slug, chunksIndexed: chunks.length })
}
