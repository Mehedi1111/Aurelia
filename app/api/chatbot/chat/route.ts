import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { embed } from '@/lib/chatbot/embeddings'
import { queryVectors } from '@/lib/chatbot/pinecone'
import { extractRelatedPosts } from '@/lib/chatbot/recommend'
import { buildRagPrompt, SYSTEM_PROMPT } from '@/lib/chatbot/prompt'
import type { RetrievedChunk, ChatMessage } from '@/lib/chatbot/types'

export const runtime = 'nodejs'
export const maxDuration = 30

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// In-memory rate limiter — good enough for single-instance Vercel deployments
const rateLimits = new Map<string, { n: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimits.get(ip)
  if (!limit || limit.resetAt < now) {
    rateLimits.set(ip, { n: 1, resetAt: now + 60_000 })
    return false
  }
  if (limit.n >= 12) return true
  limit.n++
  return false
}

function jsonError(msg: string, status: number) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return jsonError('Too many messages. Please wait a minute.', 429)
  }

  let body: { message?: string; history?: ChatMessage[] }
  try {
    body = await req.json()
  } catch {
    return jsonError('Invalid request body', 400)
  }

  const userQuery = (body.message ?? '').trim().slice(0, 500)
  if (!userQuery) return jsonError('Message is required', 400)

  const history = (body.history ?? []).slice(-6) // last 3 turns

  try {
    // 1. Embed the user query
    const queryEmbedding = await embed(userQuery)

    // 2. Retrieve top-8 chunks from Pinecone
    const rawMatches = await queryVectors(queryEmbedding, 8)

    // 3. Filter low-confidence matches and map to typed chunks
    const chunks: RetrievedChunk[] = rawMatches
      .filter(m => m.score > 0.28)
      .map(m => ({
        text: (m.metadata.text as string) ?? '',
        metadata: m.metadata as unknown as RetrievedChunk['metadata'],
        score: m.score,
      }))

    // 4. Primary source = highest-scoring chunk's post
    const primarySlug = chunks[0]?.metadata?.slug ?? ''

    // 5. Derive related posts from the same retrieval (no extra DB call)
    const relatedPosts = extractRelatedPosts(chunks, primarySlug, userQuery)

    // 6. Build RAG prompt with top 5 context chunks
    const userMessage = buildRagPrompt(userQuery, chunks.slice(0, 5), relatedPosts)

    // 7. Stream from Claude Haiku
    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
    })

    // 8. Return as Server-Sent Events
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        const send = (payload: unknown) =>
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
          )

        // Send related posts metadata before the first token
        if (relatedPosts.length > 0) {
          send({ type: 'related', posts: relatedPosts })
        }

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            send({ type: 'token', text: event.delta.text })
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('[chatbot/chat]', err)
    return jsonError('Something went wrong. Please try again.', 500)
  }
}
