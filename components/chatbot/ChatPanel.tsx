'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface RelatedPost {
  title: string
  url: string
  slug: string
  score: number
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  relatedPosts?: RelatedPost[]
  streaming?: boolean
}

interface ChatPanelProps {
  onClose: () => void
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Aurelia — Mehedi's AI jewelry assistant. Ask me anything about moissanite, diamonds, gemstones, or where to get the best deals.",
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || busy) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text }
    const assistantId = `a-${Date.now() + 1}`

    const history = messages
      .filter(m => m.id !== 'welcome' && !m.streaming)
      .map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [
      ...prev,
      userMsg,
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ])
    setInput('')
    setBusy(true)

    try {
      const res = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })

      if (!res.ok || !res.body) {
        throw new Error(await res.text())
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''
      let related: RelatedPost[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6)
          if (raw === '[DONE]') break
          try {
            const event = JSON.parse(raw)
            if (event.type === 'related') {
              related = event.posts
            } else if (event.type === 'token') {
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.text }
                    : m
                )
              )
            }
          } catch {
            // malformed SSE line — skip
          }
        }
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, streaming: false, relatedPosts: related.length ? related : undefined }
            : m
        )
      )
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: 'Sorry, something went wrong. Please try again.',
                streaming: false,
              }
            : m
        )
      )
    } finally {
      setBusy(false)
    }
  }, [input, busy, messages])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden"
      style={{ width: 'min(370px, calc(100vw - 2rem))', height: 'min(560px, calc(100svh - 7rem))' }}
      role="dialog"
      aria-label="Aurelia jewelry assistant"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark text-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-serif text-white text-sm font-bold select-none">
            A
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Aurelia</p>
            <p className="text-[11px] text-white/50 mt-0.5">Fine Jewelry Expert</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Minimize chat"
          className="text-white/50 hover:text-white transition-colors p-1.5 -mr-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[88%] space-y-2">
              {/* Bubble */}
              <div
                className={`text-sm leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-dark text-white rounded-br-sm'
                    : 'bg-surface border border-border text-dark rounded-bl-sm'
                }`}
              >
                {msg.streaming && !msg.content ? (
                  <span className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </span>
                ) : (
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                    {msg.streaming && (
                      <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse align-text-bottom" />
                    )}
                  </p>
                )}
              </div>

              {/* Related posts */}
              {!msg.streaming && msg.relatedPosts && msg.relatedPosts.length > 0 && (
                <div className="space-y-1.5 pt-0.5">
                  <p className="text-[10px] uppercase tracking-widest text-text-subtle font-medium px-1">
                    Related guides
                  </p>
                  {msg.relatedPosts.map(post => (
                    <a
                      key={post.slug}
                      href={post.url}
                      className="flex items-center gap-2 text-xs text-dark hover:text-accent transition-colors px-3 py-2 bg-surface border border-border rounded-xl hover:border-accent group"
                    >
                      <svg
                        className="w-3 h-3 shrink-0 text-accent group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="line-clamp-1 leading-snug">{post.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-3 pb-3 pt-2 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-2 focus-within:border-accent transition-colors duration-150">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about moissanite, diamonds, prices…"
            maxLength={500}
            disabled={busy}
            className="flex-1 text-sm bg-transparent text-dark placeholder:text-text-subtle focus:outline-none disabled:opacity-60"
            aria-label="Type your jewelry question"
          />
          <button
            onClick={send}
            disabled={!input.trim() || busy}
            aria-label="Send"
            className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-text-subtle text-center mt-2">
          AI answers based on moissanitebyaurelia.com articles only
        </p>
      </div>
    </div>
  )
}
