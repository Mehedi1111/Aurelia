import { Pinecone, type RecordMetadata } from '@pinecone-database/pinecone'

let _pc: Pinecone | null = null

function getClient(): Pinecone {
  if (!_pc) _pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
  return _pc
}

const INDEX_NAME = process.env.PINECONE_INDEX ?? 'aurelia-chatbot'

export function getIndex() {
  return getClient().index(INDEX_NAME)
}

interface PineconeVector {
  id: string
  values: number[]
  metadata: RecordMetadata
}

const BATCH_SIZE = 100

export async function upsertVectors(vectors: PineconeVector[]): Promise<void> {
  const index = getIndex()
  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    // Pinecone v7 API: upsert({ records: [...] })
    await index.upsert({ records: vectors.slice(i, i + BATCH_SIZE) })
  }
}

export interface QueryMatch {
  id: string
  score: number
  metadata: Record<string, unknown>
}

export async function queryVectors(
  embedding: number[],
  topK = 8,
): Promise<QueryMatch[]> {
  const index = getIndex()
  const result = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  })
  return (result.matches ?? []).map(m => ({
    id: m.id,
    score: m.score ?? 0,
    metadata: (m.metadata as Record<string, unknown>) ?? {},
  }))
}
