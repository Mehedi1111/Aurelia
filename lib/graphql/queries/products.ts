import { fetchWP } from '../client'
import type { WPProduct, WPProductCard, WPProductCategory, WPProductsResponse } from '@/types/wordpress'

const SEO_FIELDS = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl altText }
  }
`

// WPGraphQL WooCommerce v1+ requires inline fragments for pricing fields
const PRICING_INLINE = `
  ... on SimpleProduct   { price regularPrice salePrice onSale }
  ... on VariableProduct { price regularPrice salePrice onSale }
  ... on ExternalProduct { price regularPrice salePrice onSale }
  ... on GroupProduct    { price }
`

// uri/image/productCategories must use ... on Product {} because related nodes return ProductUnion
const PRODUCT_CARD_FIELDS = `
  id
  name
  slug
  ... on Product { uri image { sourceUrl altText } productCategories { nodes { name slug } } }
  ${PRICING_INLINE}
`

// attributes/averageRating/reviewCount also need inline fragments in WPGraphQL WooCommerce v1+
const FULL_PRODUCT_FIELDS = `
  id
  name
  slug
  uri
  description
  shortDescription
  image { sourceUrl altText mediaDetails { width height } }
  galleryImages { nodes { sourceUrl altText } }
  productCategories { nodes { name slug uri } }
  ... on SimpleProduct   { price regularPrice salePrice onSale averageRating reviewCount attributes { nodes { name options } } }
  ... on VariableProduct { price regularPrice salePrice onSale averageRating reviewCount attributes { nodes { name options } } }
  ... on ExternalProduct { price regularPrice salePrice onSale averageRating reviewCount externalUrl }
  ... on GroupProduct    { price }
  ${SEO_FIELDS}
`

const EMPTY_PRODUCTS: WPProductsResponse = {
  products: { nodes: [], pageInfo: { hasNextPage: false, endCursor: '' } },
}

export async function getAllProductSlugs(): Promise<Array<{ slug: string }>> {
  const query = `
    query AllProductSlugs {
      products(first: 1000, where: { status: "publish" }) {
        nodes { slug }
      }
    }
  `
  const data = await fetchWP<{ products: { nodes: Array<{ slug: string }> } }>(query)
  return data?.products.nodes ?? []
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  const query = `
    query ProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        ${FULL_PRODUCT_FIELDS}
        related(first: 8) {
          nodes { ${PRODUCT_CARD_FIELDS} }
        }
      }
    }
  `
  const data = await fetchWP<{ product: WPProduct | null }>(query, { slug })
  return data?.product ?? null
}

export async function getProducts(first = 12, after?: string): Promise<WPProductsResponse> {
  const query = `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after, where: { status: "publish", orderby: { field: DATE, order: DESC } }) {
        nodes { ${PRODUCT_CARD_FIELDS} }
        pageInfo { hasNextPage endCursor }
      }
    }
  `
  const data = await fetchWP<WPProductsResponse>(query, { first, after })
  return data ?? EMPTY_PRODUCTS
}

export async function getAllProductCategories(): Promise<WPProductCategory[]> {
  const query = `
    query AllProductCategories {
      productCategories(first: 100, where: { hideEmpty: true }) {
        nodes { name slug count description }
      }
    }
  `
  const data = await fetchWP<{ productCategories: { nodes: WPProductCategory[] } }>(query)
  return data?.productCategories?.nodes ?? []
}

export async function getProductCategoryBySlug(slug: string): Promise<WPProductCategory | null> {
  const query = `
    query ProductCategoryBySlug($slug: ID!) {
      productCategory(id: $slug, idType: SLUG) { name slug count description }
    }
  `
  const data = await fetchWP<{ productCategory: WPProductCategory | null }>(query, { slug })
  return data?.productCategory ?? null
}

export async function getProductsByCategory(categorySlug: string, first = 12): Promise<WPProductsResponse> {
  const query = `
    query ProductsByCategory($categorySlug: String!, $first: Int!) {
      products(
        first: $first
        where: { status: "publish", category: $categorySlug }
      ) {
        nodes { ${PRODUCT_CARD_FIELDS} }
        pageInfo { hasNextPage endCursor }
      }
    }
  `
  const data = await fetchWP<WPProductsResponse>(query, { categorySlug, first })
  return data ?? EMPTY_PRODUCTS
}
