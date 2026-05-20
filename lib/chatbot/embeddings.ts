import OpenAI from 'openai'

let _openai: OpenAI | null = null

function getClient(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
  return _openai
}

const MODEL = 'text-embedding-3-small'
const DIMENSIONS = 1536
const MAX_CHARS = 8000

export async function embed(text: string): Promise<number[]> {
  const res = await getClient().embeddings.create({
    model: MODEL,
    input: text.slice(0, MAX_CHARS),
    dimensions: DIMENSIONS,
  })
  return res.data[0].embedding
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []
  const res = await getClient().embeddings.create({
    model: MODEL,
    input: texts.map(t => t.slice(0, MAX_CHARS)),
    dimensions: DIMENSIONS,
  })
  return res.data.map(d => d.embedding)
}
