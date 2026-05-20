'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getResponse, getProductKeyword, QUICK_PROMPTS, type BotResponse } from './knowledge'

interface ProductCard {
  id: string
  name: string
  slug: string
  url: string
  image: string | null
  imageAlt: string
  price: string | null
  onSale: boolean
}

interface Message {
  role: 'user' | 'bot'
  text?: string
  response?: BotResponse
  products?: ProductCard[]
}

interface ChatPanelProps {
  onClose: () => void
}

const GREETING: BotResponse = {
  text: "Hi! I'm Aurelia. Ask me anything about moissanite, diamonds, pearls, or fine jewelry — I'll point you to the right guide.",
  links: [],
}

async function fetchProducts(keyword: string): Promise<ProductCard[]> {
  try {
    const res = await fetch('/api/chatbot/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: keyword }),
    })
    const data = await res.json()
    return data.products ?? []
  } catch {
    return []
  }
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', response: GREETING, products: [] },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showPrompts, setShowPrompts] = useState(true)
  const [visible, setVisible] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Slide-in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setShowPrompts(false)
    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    const keyword = getProductKeyword(trimmed)
    const productPromise = fetchProducts(keyword)

    setTimeout(() => {
      const response = getResponse(trimmed)
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', response, products: [] }])

      productPromise.then(products => {
        if (products.length > 0) {
          setMessages(prev => {
            const next = [...prev]
            next[next.length - 1] = { ...next[next.length - 1], products }
            return next
          })
        }
      })
    }, 800)
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') send(input)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden"
      style={{
        width: 'min(370px, calc(100vw - 2rem))',
        height: 'min(560px, calc(100svh - 7rem))',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      role="dialog"
      aria-label="Ask Aurelia jewelry guide assistant"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark text-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-serif text-white text-sm font-bold select-none">
            A
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Aurelia</p>
            <p className="text-[11px] text-white/50 mt-0.5">Jewelry guide assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-white/50 hover:text-white p-1.5 -mr-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            {msg.role === 'user' ? (
              <div className="max-w-[80%] bg-dark text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm leading-relaxed">
                {msg.text}
              </div>
            ) : (
              <div className="max-w-[92%] space-y-2">
                {/* Bot text bubble */}
                <div className="bg-surface border border-border text-sm text-dark px-4 py-2.5 rounded-2xl rounded-bl-sm leading-relaxed">
                  {msg.response?.text}
                </div>

                {/* Article links */}
                {msg.response && msg.response.links.length > 0 && (
                  <div className="space-y-1.5">
                    {msg.response.links.map((link, j) =>
                      link.affiliate ? (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="flex items-center justify-between gap-2 text-xs font-medium text-accent bg-surface border border-border px-3.5 py-2 rounded-xl hover:border-accent hover:bg-accent/5 transition-colors group"
                        >
                          <span className="leading-snug">{link.label}</span>
                          <svg className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          key={j}
                          href={link.url}
                          className="flex items-center justify-between gap-2 text-xs font-medium text-dark bg-surface border border-border px-3.5 py-2 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors group"
                        >
                          <span className="leading-snug">{link.label}</span>
                          <svg className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    )}
                  </div>
                )}

                {/* Product cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] uppercase tracking-widest text-text-subtle font-medium px-0.5">
                      Related products
                    </p>
                    {msg.products.map(p => (
                      <a
                        key={p.id}
                        href={p.url}
                        className="flex items-center gap-3 bg-surface border border-border rounded-xl p-2.5 hover:border-accent transition-colors group"
                      >
                        {/* Wrapper always reserves the 48px square; img fills it if it loads */}
                        <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-border">
                          {p.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-dark leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                            {p.name}
                          </p>
                          {p.price && (
                            <p className="text-[11px] text-accent font-semibold mt-0.5">
                              {p.price}
                            </p>
                          )}
                        </div>
                        <svg className="w-3.5 h-3.5 text-accent shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick prompts — shown only before first user message */}
        {showPrompts && !typing && (
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium">
              Try asking
            </p>
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="w-full text-left text-xs text-dark bg-surface border border-border px-3.5 py-2.5 rounded-xl hover:border-accent hover:text-accent transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-2 focus-within:border-accent transition-colors duration-150">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about moissanite, diamonds…"
            maxLength={200}
            className="flex-1 text-sm bg-transparent text-dark placeholder:text-text-subtle focus:outline-none"
            aria-label="Ask Aurelia"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
            className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-text-subtle text-center mt-2">
          moissanitebyaurelia.com guides only
        </p>
      </div>
    </div>
  )
}
