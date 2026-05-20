export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChunkMetadata {
  slug: string
  title: string
  url: string
  categories: string[]
  chunkType: 'intro' | 'body' | 'faq' | 'table'
  chunkIndex: number
  publishedAt: string
  affiliateRelevant: boolean
  excerpt: string
  text: string
}

export interface RetrievedChunk {
  text: string
  metadata: ChunkMetadata
  score: number
}

export interface RelatedPost {
  title: string
  url: string
  slug: string
  score: number
}

export interface PostData {
  slug: string
  title: string
  content: string
  excerpt: string
  categories: string[]
  publishedAt: string
  affiliateRelevant: boolean
}
