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

    // Retailer & coupon pages — high commercial intent
    { url: `${BASE}/top-jewelry-retailers/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/james-allen-promotional-code/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/blue-nile-promo-code/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/blue-nile-jewelry-store/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE}/blue-nile-faqs/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/charles-and-colvard-discount-code/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/jewelry-coupons/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },

    // Quiz & tool pages
    { url: `${BASE}/jewelry-personality-quiz/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/best-jewelry-retailer-quiz/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/best-place-to-buy-engagement-rings-online-tool/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },

    // Calculator pages
    { url: `${BASE}/jewelry-calculators/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diamond-appraisal-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diamond-rate-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diamond-resale-price-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/diamond-finger-coverage-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/moissanite-vs-diamond-price-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/moissanite-price-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/pearl-value-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // About & contact
    { url: `${BASE}/about-mehedi/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
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
