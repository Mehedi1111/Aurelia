import type { PostData } from './types'

// ~500 tokens at 3.5 chars/token
const CHUNK_SIZE = 1750
const CHUNK_OVERLAP = 180

function decodeEntities(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
}

function htmlToPlainText(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (_, level, text) =>
        '\n\n' + '#'.repeat(Number(level)) + ' ' + text.replace(/<[^>]+>/g, '') + '\n\n'
      )
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

interface FaqItem { q: string; a: string }

function extractFaqs(html: string): FaqItem[] {
  const faqs: FaqItem[] = []
  // Match h3/h4 that look like questions followed by p tags
  const pattern = /<h[34][^>]*>(.*?)<\/h[34]>\s*(?:<p[^>]*>([\s\S]*?)<\/p>)+/gi
  let m: RegExpExecArray | null
  while ((m = pattern.exec(html)) !== null) {
    const q = decodeEntities(m[1].replace(/<[^>]+>/g, '').trim())
    // Collect all <p> tags after the heading
    const block = m[0]
    const pMatches = block.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || []
    const a = pMatches.map(p => decodeEntities(p.replace(/<[^>]+>/g, '').trim())).join(' ').trim()
    if (q.length > 10 && a.length > 20) {
      faqs.push({ q, a })
    }
  }
  return faqs
}

function extractTables(html: string): string[] {
  const tables: string[] = []
  const tableRe = /<table[^>]*>([\s\S]*?)<\/table>/gi
  let tm: RegExpExecArray | null
  while ((tm = tableRe.exec(html)) !== null) {
    const rows = tm[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || []
    const textRows = rows.map(row => {
      const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi) || []
      return cells.map(c => decodeEntities(c.replace(/<[^>]+>/g, '').trim())).join(' | ')
    }).filter(r => r.trim())
    if (textRows.length > 1) tables.push(textRows.join('\n'))
  }
  return tables
}

function splitBody(text: string): string[] {
  const chunks: string[] = []
  const paragraphs = text.split(/\n\n+/)
  let current = ''

  for (const para of paragraphs) {
    const candidate = current ? current + '\n\n' + para : para
    if (candidate.length > CHUNK_SIZE && current.length > 0) {
      chunks.push(current.trim())
      // Carry overlap into the next chunk
      const words = current.split(/\s+/)
      const overlapWords = words.slice(-Math.floor(CHUNK_OVERLAP / 5))
      current = overlapWords.join(' ') + '\n\n' + para
    } else {
      current = candidate
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks.filter(c => c.length > 50)
}

export interface IndexedChunk {
  id: string
  text: string
  metadata: {
    slug: string
    title: string
    url: string
    categories: string[]
    chunkType: string
    chunkIndex: number
    publishedAt: string
    affiliateRelevant: boolean
    excerpt: string
    text: string
  }
}

export function chunkPost(post: PostData): IndexedChunk[] {
  const chunks: IndexedChunk[] = []
  const url = `https://moissanitebyaurelia.com/${post.slug}/`

  const baseMeta = {
    slug: post.slug,
    title: post.title,
    url,
    categories: post.categories,
    publishedAt: post.publishedAt,
    affiliateRelevant: post.affiliateRelevant,
    excerpt: post.excerpt.slice(0, 250),
    chunkIndex: 0,
  }

  const push = (type: string, idx: number, text: string) => {
    chunks.push({
      id: `${post.slug}-${type}-${idx}`,
      text,
      metadata: { ...baseMeta, chunkType: type, chunkIndex: idx, text },
    })
  }

  // 1. Intro chunk (title + excerpt — always high relevance)
  push('intro', 0, `${post.title}\n\n${post.excerpt}`)

  // 2. FAQ chunks (highest precision for question queries)
  const faqs = extractFaqs(post.content)
  faqs.forEach((faq, i) => push('faq', i, `Q: ${faq.q}\nA: ${faq.a}`))

  // 3. Table chunks (comparison queries)
  const tables = extractTables(post.content)
  tables.forEach((table, i) =>
    push('table', i, `Comparison data from "${post.title}":\n\n${table}`)
  )

  // 4. Body chunks (general content)
  const plain = `${post.title}\n\n${htmlToPlainText(post.content)}`
  const bodyChunks = splitBody(plain)
  bodyChunks.forEach((text, i) => push('body', i, text))

  return chunks
}
