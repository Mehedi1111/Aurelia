import { NextRequest, NextResponse } from 'next/server'
import { GraphQLClient } from 'graphql-request'

const wp = new GraphQLClient(
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'https://cms.moissanitebyaurelia.com/graphql',
  { headers: { 'Content-Type': 'application/json' } }
)

const QUERY = `
  query ProductSearch($q: String!) {
    products(first: 3, where: { status: "publish", search: $q }) {
      nodes {
        id
        name
        slug
        ... on Product {
          uri
          image { sourceUrl altText }
        }
        ... on SimpleProduct   { price salePrice onSale }
        ... on VariableProduct { price salePrice onSale }
        ... on ExternalProduct { price salePrice onSale }
        ... on GroupProduct    { price }
      }
    }
  }
`

interface ProductNode {
  id: string
  name: string
  slug: string
  uri?: string
  image?: { sourceUrl: string; altText: string }
  price?: string
  salePrice?: string
  onSale?: boolean
}

// WPGraphQL may return the CMS subdomain in image URLs — normalize to main domain
function normalizeImageUrl(url: string): string {
  return url
    .replace('https://cms.moissanitebyaurelia.com', 'https://moissanitebyaurelia.com')
    .replace('http://cms.moissanitebyaurelia.com', 'https://moissanitebyaurelia.com')
}

export async function POST(req: NextRequest) {
  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ products: [] })
  }

  const q = (body.query ?? '').trim().slice(0, 100)
  if (q.length < 2) return NextResponse.json({ products: [] })

  try {
    const data = await wp.request<{ products: { nodes: ProductNode[] } }>(QUERY, { q })
    const products = (data?.products?.nodes ?? []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      url: p.uri || `/product/${p.slug}/`,
      image: p.image?.sourceUrl ? normalizeImageUrl(p.image.sourceUrl) : null,
      imageAlt: p.image?.altText || p.name,
      price: p.price ?? null,
      onSale: p.onSale ?? false,
    }))
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ products: [] })
  }
}
