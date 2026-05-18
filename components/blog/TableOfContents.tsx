'use client'

import { useEffect, useState } from 'react'
import SidebarAd from './SidebarAd'
import type { TocEntry } from '@/lib/content/parseContent'

interface TableOfContentsProps {
  entries: TocEntry[]
  showAd?: boolean
}

export default function TableOfContents({ entries, showAd = true }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (entries.length === 0) return
    const observer = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 },
    )
    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [entries])

  return (
    <div className="space-y-5">
      {/* TOC card */}
      {entries.length >= 3 && (
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-accent-light transition-colors"
            aria-expanded={open}
          >
            <span className="font-serif text-sm text-dark">Contents</span>
            <svg
              className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <nav className="px-3 py-3 max-h-72 overflow-y-auto scrollbar-thin">
              <ul className="space-y-0">
                {entries.map(entry => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={`toc-link ${activeId === entry.id ? 'active' : ''}`}
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* Affiliate ad */}
      {showAd && <SidebarAd />}
    </div>
  )
}
