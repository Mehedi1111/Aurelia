'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface SearchResult {
  title: string
  slug: string
  url: string
  excerpt: string
  category: string | null
  categorySlug: string | null
}

interface ChatPanelProps {
  onClose: () => void
}

const QUICK_TOPICS = [
  'Moissanite vs diamond',
  'Best engagement rings',
  'Lab grown diamonds',
  'Pearl size guide',
  'Blue Nile vs James Allen',
  'Diamond 4Cs explained',
]

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const search = useCallback(async (q: string) => {
    const trimmed = q.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      })
      const data = await res.json()
      setResults(data.results ?? [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [loading])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') search(query)
  }

  const quickSearch = (topic: string) => {
    setQuery(topic)
    search(topic)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden"
      style={{ width: 'min(370px, calc(100vw - 2rem))', height: 'min(560px, calc(100svh - 7rem))' }}
      role="dialog"
      aria-label="Search Aurelia jewelry guides"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark text-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-serif text-white text-sm font-bold select-none">
            A
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Aurelia</p>
            <p className="text-[11px] text-white/50 mt-0.5">Search 400+ jewelry guides</p>
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

      {/* Results area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!searched ? (
          // Initial state
          <div>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              Search Mehedi&apos;s expert guides on moissanite, diamonds, gemstones, and fine jewelry.
            </p>
            <p className="text-[11px] uppercase tracking-widest text-text-subtle font-medium mb-2.5">
              Popular topics
            </p>
            <div className="space-y-1.5">
              {QUICK_TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => quickSearch(topic)}
                  className="w-full text-left flex items-center gap-2.5 text-sm text-dark px-3.5 py-2.5 bg-surface border border-border rounded-xl hover:border-accent hover:text-accent transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          // Skeleton loading
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-surface border border-border rounded-xl p-4 animate-pulse">
                <div className="h-2.5 bg-border rounded w-1/4 mb-2.5" />
                <div className="h-4 bg-border rounded w-4/5 mb-2" />
                <div className="h-3 bg-border rounded w-full mb-1.5" />
                <div className="h-3 bg-border rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : results && results.length > 0 ? (
          // Search results
          <div className="space-y-3">
            <p className="text-[11px] text-text-subtle">
              {results.length} guide{results.length !== 1 ? 's' : ''} found
            </p>
            {results.map(r => (
              <a
                key={r.slug}
                href={r.url}
                className="block bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors group"
              >
                {r.category && (
                  <p className="text-accent text-[10px] uppercase tracking-widest font-medium mb-1.5">
                    {r.category}
                  </p>
                )}
                <p className="text-sm font-serif text-dark group-hover:text-accent transition-colors leading-snug mb-2">
                  {r.title}
                </p>
                {r.excerpt && (
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-2">
                    {r.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                  Read guide
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
            <button
              onClick={() => { setSearched(false); setResults(null); setQuery('') }}
              className="w-full text-xs text-text-muted hover:text-accent transition-colors py-1"
            >
              ← Search again
            </button>
          </div>
        ) : (
          // No results
          <div className="text-center py-10">
            <p className="font-serif text-base text-dark mb-1.5">No guides found</p>
            <p className="text-sm text-text-muted mb-4">
              Try different keywords or browse all articles.
            </p>
            <a
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              Browse all guides →
            </a>
            <div className="mt-4">
              <button
                onClick={() => { setSearched(false); setResults(null); setQuery('') }}
                className="text-xs text-text-muted hover:text-accent transition-colors"
              >
                ← Try again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search input */}
      <div className="px-3 pb-3 pt-2 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-2 focus-within:border-accent transition-colors duration-150">
          <svg
            className="w-4 h-4 text-text-subtle shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="e.g. Which pearl size for daily wear?"
            maxLength={200}
            className="flex-1 text-sm bg-transparent text-dark placeholder:text-text-subtle focus:outline-none"
            aria-label="Search jewelry guides"
          />
          <button
            onClick={() => search(query)}
            disabled={!query.trim() || loading}
            aria-label="Search"
            className="w-7 h-7 rounded-lg bg-dark text-white flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-text-subtle text-center mt-2">
          Searches moissanitebyaurelia.com guides only
        </p>
      </div>
    </div>
  )
}
