import type { RetrievedChunk, RelatedPost } from './types'

// Affiliate pages to boost when user shows purchase intent
const AFFILIATE_SLUGS = new Set([
  'blue-nile-promo-code',
  'james-allen-promotional-code',
  'jewelry-coupons',
  'charles-and-colvard-discount-code',
  'top-jewelry-retailers',
  'best-place-to-buy-engagement-rings-online-tool',
  'blue-nile-jewelry-store',
])

const AFFILIATE_CATEGORIES = new Set(['diamond-review', 'blue-nile-jewelry-reviews-guide'])

const PURCHASE_INTENT_RE = /\b(buy|price|cost|coupon|discount|promo|deal|cheap|afford|worth|best|recommend|where)\b/i

export function extractRelatedPosts(
  chunks: RetrievedChunk[],
  primarySlug: string,
  userQuery: string,
): RelatedPost[] {
  const isPurchaseIntent = PURCHASE_INTENT_RE.test(userQuery)
  const postBestScore = new Map<string, { score: number; chunk: RetrievedChunk }>()

  for (const chunk of chunks) {
    const { slug } = chunk.metadata
    if (slug === primarySlug) continue

    let score = chunk.score

    // Boost affiliate pages for purchase-intent queries
    if (isPurchaseIntent) {
      if (AFFILIATE_SLUGS.has(slug)) score += 0.09
      if (chunk.metadata.categories.some(c => AFFILIATE_CATEGORIES.has(c))) score += 0.05
    }

    const existing = postBestScore.get(slug)
    if (!existing || score > existing.score) {
      postBestScore.set(slug, { score, chunk })
    }
  }

  return Array.from(postBestScore.entries())
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 3)
    .map(([slug, { score, chunk }]) => ({
      title: chunk.metadata.title,
      url: chunk.metadata.url,
      slug,
      score,
    }))
}
