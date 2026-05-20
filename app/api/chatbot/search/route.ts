import { NextRequest, NextResponse } from 'next/server'
import { GraphQLClient } from 'graphql-request'

// Use a fresh (uncached) client so search results are always live
const wp = new GraphQLClient('https://moissanitebyaurelia.com/graphql', {
  headers: { 'Content-Type': 'application/json' },
})

const SEARCH_QUERY = `
  query ChatSearch($q: String!) {
    posts(first: 6, where: { search: $q, status: PUBLISH }) {
      nodes {
        title
        slug
        excerpt
        categories { nodes { name slug } }
      }
    }
  }
`

interface WPSearchResult {
  posts: {
    nodes: Array<{
      title: string
      slug: string
      excerpt: string
      categories: { nodes: Array<{ name: string; slug: string }> }
    }>
  }
}

function cleanExcerpt(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#[0-9]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
}

export async function POST(req: NextRequest) {
  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ results: [] })
  }

  const q = (body.query ?? '').trim().slice(0, 200)
  if (q.length < 2) return NextResponse.json({ results: [] })

  try {
    const data = await wp.request<WPSearchResult>(SEARCH_QUERY, { q })
    const results = (data?.posts?.nodes ?? []).map(post => ({
      title: post.title,
      slug: post.slug,
      url: `/${post.slug}/`,
      excerpt: cleanExcerpt(post.excerpt),
      category: post.categories.nodes[0]?.name ?? null,
      categorySlug: post.categories.nodes[0]?.slug ?? null,
    }))
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
