import { fetchWP } from '../client'
import type { WPPost, WPPostCard, WPPostsResponse } from '@/types/wordpress'

const SEO_FIELDS = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl altText }
    twitterTitle
    twitterDescription
    schema { raw }
  }
`

const POST_CARD_FIELDS = `
  id
  title
  slug
  uri
  excerpt
  date
  featuredImage { node { sourceUrl altText mediaDetails { width height } } }
  categories { nodes { name slug uri } }
`

const FULL_POST_FIELDS = `
  id
  title
  slug
  uri
  content
  excerpt
  date
  modified
  featuredImage { node { sourceUrl altText mediaDetails { width height } } }
  categories {
    nodes {
      name slug uri
      ancestors { nodes { name slug uri } }
    }
  }
  tags { nodes { name slug uri } }
  author { node { name avatar { url } } }
  ${SEO_FIELDS}
`

const EMPTY_POSTS: WPPostsResponse = {
  posts: { nodes: [], pageInfo: { hasNextPage: false, endCursor: '' } },
}

export async function getAllPostSlugs(): Promise<Array<{ slug: string }>> {
  const query = `
    query AllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes { slug }
      }
    }
  `
  const data = await fetchWP<{ posts: { nodes: Array<{ slug: string }> } }>(query)
  return data?.posts.nodes ?? []
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const query = `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${FULL_POST_FIELDS}
      }
    }
  `
  const data = await fetchWP<{ post: WPPost | null }>(query, { slug })
  return data?.post ?? null
}

export async function getPosts(first = 12, after?: string): Promise<WPPostsResponse> {
  const query = `
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { ${POST_CARD_FIELDS} }
        pageInfo { hasNextPage endCursor }
      }
    }
  `
  const data = await fetchWP<WPPostsResponse>(query, { first, after })
  return data ?? EMPTY_POSTS
}

export async function getPostsByCategory(categorySlug: string, first = 12, after?: string): Promise<WPPostsResponse> {
  const query = `
    query PostsByCategory($categorySlug: String!, $first: Int!, $after: String) {
      posts(
        first: $first
        after: $after
        where: { status: PUBLISH, categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }
      ) {
        nodes { ${POST_CARD_FIELDS} }
        pageInfo { hasNextPage endCursor }
      }
    }
  `
  const data = await fetchWP<WPPostsResponse>(query, { categorySlug, first, after })
  return data ?? EMPTY_POSTS
}

export async function getRelatedPosts(categorySlug: string, excludeSlug: string, first = 4): Promise<WPPostCard[]> {
  const query = `
    query RelatedPosts($categorySlug: String!, $first: Int!) {
      posts(
        first: $first
        where: { status: PUBLISH, categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }
      ) {
        nodes { ${POST_CARD_FIELDS} }
      }
    }
  `
  const data = await fetchWP<{ posts: { nodes: WPPostCard[] } }>(query, { categorySlug, first: first + 1 })
  return (data?.posts.nodes ?? []).filter(p => p.slug !== excludeSlug).slice(0, first)
}
