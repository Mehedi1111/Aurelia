import { fetchWP } from '../client'
import type { WPCategory } from '@/types/wordpress'

export async function getAllCategorySlugs(): Promise<Array<{ slug: string; uri: string }>> {
  const query = `
    query AllCategorySlugs {
      categories(first: 200) {
        nodes { slug uri }
      }
    }
  `
  const data = await fetchWP<{ categories: { nodes: Array<{ slug: string; uri: string }> } }>(query)
  return data?.categories.nodes ?? []
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const query = `
    query CategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        name
        slug
        uri
        description
        count
        ancestors { nodes { name slug uri } }
        children { nodes { name slug uri count } }
      }
    }
  `
  const data = await fetchWP<{ category: WPCategory | null }>(query, { slug })
  return data?.category ?? null
}

export async function getCategoryByUri(uri: string): Promise<WPCategory | null> {
  const slug = uri.replace(/^\/category\//, '').replace(/\/$/, '').split('/').pop() || ''
  return getCategoryBySlug(slug)
}

export async function getAllCategories(): Promise<WPCategory[]> {
  const query = `
    query AllCategories {
      categories(first: 200, where: { hideEmpty: true }) {
        nodes {
          name slug uri count
          ancestors { nodes { name slug uri } }
        }
      }
    }
  `
  const data = await fetchWP<{ categories: { nodes: WPCategory[] } }>(query)
  return data?.categories.nodes ?? []
}
