import { fetchWP } from '../client'
import type { WPPostCard, WPProductCard } from '@/types/wordpress'

export interface SearchResults {
  posts: WPPostCard[]
  products: WPProductCard[]
}

export async function searchContent(query: string): Promise<SearchResults> {
  if (!query || query.trim().length < 2) return { posts: [], products: [] }
  const q = query.trim()

  const gql = `
    query Search($q: String!) {
      posts(where: { search: $q, status: PUBLISH }, first: 8) {
        nodes {
          slug
          title
          date
          excerpt
          categories { nodes { name slug } }
          featuredImage { node { sourceUrl altText } }
          seo { metaDesc }
        }
      }
      products(where: { search: $q, status: "publish" }, first: 8) {
        nodes {
          id
          name
          slug
          ... on Product { uri image { sourceUrl altText } productCategories { nodes { name slug } } }
          ... on SimpleProduct   { price regularPrice salePrice onSale }
          ... on VariableProduct { price regularPrice salePrice onSale }
          ... on ExternalProduct { price regularPrice salePrice onSale }
          ... on GroupProduct    { price }
        }
      }
    }
  `

  const data = await fetchWP<{
    posts: { nodes: WPPostCard[] }
    products: { nodes: WPProductCard[] }
  }>(gql, { q })

  return {
    posts: data?.posts?.nodes ?? [],
    products: data?.products?.nodes ?? [],
  }
}
