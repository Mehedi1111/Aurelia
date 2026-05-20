import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 300

const WP_GRAPHQL = 'https://moissanitebyaurelia.com/graphql'
const INGEST_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/chatbot/ingest`
  : 'https://moissanitebyaurelia.com/api/chatbot/ingest'

interface WPPost {
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  categories: { nodes: Array<{ slug: string }> }
}

async function fetchRecentPosts(since: string): Promise<WPPost[]> {
  const query = `
    query SyncPosts($after: String!) {
      posts(
        first: 100
        where: { status: PUBLISH, dateQuery: { after: { year: ${new Date(since).getFullYear()}, month: ${new Date(since).getMonth() + 1}, day: ${new Date(since).getDate()} } } }
      ) {
        nodes {
          slug title date
          content(format: RAW)
          excerpt(format: RAW)
          categories { nodes { slug } }
        }
      }
    }
  `
  const res = await fetch(WP_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { after: since } }),
    next: { revalidate: 0 },
  })
  const { data } = await res.json()
  return data?.posts?.nodes ?? []
}

export async function POST(req: NextRequest) {
  // Called by Vercel Cron — verify the cron secret
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Sync posts updated in the last 25 hours (covers daily cron with overlap)
  const since = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
  const posts = await fetchRecentPosts(since)

  if (posts.length === 0) {
    return NextResponse.json({ ok: true, synced: 0, message: 'No new posts' })
  }

  let synced = 0
  const errors: string[] = []

  for (const post of posts) {
    try {
      const res = await fetch(INGEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHATBOT_INGEST_SECRET}`,
        },
        body: JSON.stringify({
          slug: post.slug,
          title: post.title,
          content: post.content ?? '',
          excerpt: (post.excerpt ?? '').replace(/<[^>]+>/g, '').trim(),
          categories: post.categories.nodes.map(c => c.slug),
          publishedAt: post.date,
        }),
      })
      if (res.ok) synced++
      else errors.push(`${post.slug}: ${res.status}`)
    } catch (err) {
      errors.push(`${post.slug}: ${String(err)}`)
    }
    // Small delay between posts to avoid rate-limiting embeddings API
    await new Promise(r => setTimeout(r, 250))
  }

  return NextResponse.json({ ok: true, synced, errors })
}

// Allow GET for manual trigger from Vercel dashboard
export async function GET(req: NextRequest) {
  return POST(req)
}
