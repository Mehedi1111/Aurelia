export interface WPImage {
  sourceUrl: string
  altText: string
  mediaDetails?: {
    width: number
    height: number
  }
}

export interface WPCategory {
  name: string
  slug: string
  uri: string
  description?: string
  count?: number
  ancestors?: {
    nodes: Array<{ name: string; slug: string; uri: string }>
  }
  posts?: { nodes: WPPostCard[] }
}

export interface WPTag {
  name: string
  slug: string
  uri: string
}

export interface WPAuthor {
  name: string
  avatar?: { url: string }
}

export interface WPSeo {
  title: string
  metaDesc: string
  canonical: string
  opengraphTitle: string
  opengraphDescription: string
  opengraphImage?: WPImage
  twitterTitle?: string
  twitterDescription?: string
  schema?: { raw: string }
}

export interface WPPost {
  id: string
  title: string
  slug: string
  uri: string
  content: string
  excerpt: string
  date: string
  modified: string
  featuredImage?: { node: WPImage }
  categories: { nodes: WPCategory[] }
  tags: { nodes: WPTag[] }
  author: { node: WPAuthor }
  seo: WPSeo
}

export interface WPPostCard {
  id: string
  title: string
  slug: string
  uri: string
  excerpt: string
  date: string
  featuredImage?: { node: WPImage }
  categories: { nodes: WPCategory[] }
}

export interface WPProductCategory {
  name: string
  slug: string
  count: number
  description?: string
}

export interface WPProductAttribute {
  name: string
  options: string[]
}

export interface WPProduct {
  id: string
  name: string
  slug: string
  uri: string
  description: string
  shortDescription: string
  price: string
  regularPrice: string
  salePrice: string | null
  onSale: boolean
  externalUrl?: string | null
  image?: WPImage
  galleryImages: { nodes: WPImage[] }
  productCategories: { nodes: WPCategory[] }
  attributes: { nodes: WPProductAttribute[] }
  averageRating: number
  reviewCount: number
  related?: { nodes: WPProductCard[] }
  seo: WPSeo
}

export interface WPProductCard {
  id: string
  name: string
  slug: string
  uri: string
  price: string
  regularPrice: string
  salePrice: string | null
  onSale: boolean
  image?: WPImage
  productCategories: { nodes: Array<{ name: string; slug: string }> }
}

export interface WPMenuItem {
  id: string
  label: string
  uri: string
  parentId: string | null
  childItems?: { nodes: WPMenuItem[] }
}

export interface WPMenu {
  menuItems: { nodes: WPMenuItem[] }
}


export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}

export interface WPPostsResponse {
  posts: {
    nodes: WPPostCard[]
    pageInfo: PageInfo
  }
}

export interface WPProductsResponse {
  products: {
    nodes: WPProductCard[]
    pageInfo: PageInfo
  }
}
