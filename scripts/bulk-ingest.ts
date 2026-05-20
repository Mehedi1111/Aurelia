/**
 * One-time bulk ingestion of all WordPress posts into Pinecone.
 *
 * Usage (run from the project root while dev server is running):
 *   npx tsx scripts/bulk-ingest.ts
 *
 * Or point at production:
 *   INGEST_TARGET=https://moissanitebyaurelia.com npx tsx scripts/bulk-ingest.ts
 */

const WP_GRAPHQL = 'https://moissanitebyaurelia.com/graphql'
const INGEST_TARGET = process.env.INGEST_TARGET ?? 'http://localhost:3000'
const INGEST_SECRET = process.env.CHATBOT_INGEST_SECRET ?? ''

if (!INGEST_SECRET) {
  console.error('ERROR: Set CHATBOT_INGEST_SECRET environment variable')
  process.exit(1)
}

interface WPPost {
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  categories: { nodes: Array<{ slug: string }> }
}

async function fetchAllPosts(): Promise<WPPost[]> {
  const all: WPPost[] = []
  let cursor: string | null = null

  while (true) {
    const query = `
      query BulkIngest($after: String) {
        posts(first: 100, after: $after, where: { status: PUBLISH }) {
          pageInfo { hasNextPage endCursor }
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
      body: JSON.stringify({ query, variables: { after: cursor } }),
    })
    const json = await res.json()
    const { nodes, pageInfo } = json.data.posts
    all.push(...nodes)
    console.log(`  Fetched ${all.length} posts so far...`)
    if (!pageInfo.hasNextPage) break
    cursor = pageInfo.endCursor
    await delay(300)
  }
  return all
}

async function ingestPost(post: WPPost): Promise<{ ok: boolean; chunks?: number; error?: string }> {
  const res = await fetch(`${INGEST_TARGET}/api/chatbot/ingest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${INGEST_SECRET}`,
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

  if (!res.ok) {
    const text = await res.text()
    return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 100)}` }
  }

  const data = await res.json()
  return { ok: true, chunks: data.chunksIndexed }
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  console.log('=== Aurelia Chatbot — Bulk Ingest ===')
  console.log(`Target: ${INGEST_TARGET}`)
  console.log()

  console.log('Fetching all published posts from WordPress...')
  const posts = await fetchAllPosts()
  console.log(`Found ${posts.length} posts.\n`)

  let success = 0
  let failed = 0
  let totalChunks = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const result = await ingestPost(post)

    if (result.ok) {
      success++
      totalChunks += result.chunks ?? 0
      console.log(`[${i + 1}/${posts.length}] OK  ${post.slug} (${result.chunks} chunks)`)
    } else {
      failed++
      console.error(`[${i + 1}/${posts.length}] ERR ${post.slug} — ${result.error}`)
    }

    // Respect OpenAI embedding rate limits (~3000 req/min on tier 1)
    await delay(400)
  }

  console.log('\n=== Done ===')
  console.log(`Success: ${success} | Failed: ${failed} | Total chunks indexed: ${totalChunks}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
