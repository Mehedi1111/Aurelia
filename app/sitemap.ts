import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/graphql/queries/posts'
import { getAllProductSlugs } from '@/lib/graphql/queries/products'
import { getAllCategorySlugs } from '@/lib/graphql/queries/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://moissanitebyaurelia.com'

  const [postSlugs, productSlugs, categorySlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/shop-fine-jewelry/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/jewelry-personality-quiz/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const postPages: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
    url: `${BASE}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = productSlugs.map(({ slug }) => ({
    url: `${BASE}/product/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map(({ uri }) => ({
    url: `${BASE}${uri}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...postPages, ...productPages, ...categoryPages]
}
