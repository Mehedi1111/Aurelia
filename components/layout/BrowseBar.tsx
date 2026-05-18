'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type NavItem = { label: string; href: string }

function Dropdown({
  label,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string
  items: NavItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`
          inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest
          px-5 py-2.5 rounded-full border transition-all duration-200 select-none
          ${isOpen
            ? 'bg-dark text-white border-dark shadow-sm'
            : 'bg-white text-dark border-dark/25 hover:border-dark'
          }
        `}
      >
        {label}
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 z-50 w-56 bg-white border border-border rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="py-2 px-1.5 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-text-muted hover:text-dark hover:bg-surface rounded-xl transition-colors group"
              >
                <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BrowseBar({
  guideItems,
  shopItems,
}: {
  guideItems: NavItem[]
  shopItems: NavItem[]
}) {
  const [open, setOpen] = useState<'guides' | 'shop' | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const toggle = (key: 'guides' | 'shop') =>
    setOpen(prev => (prev === key ? null : key))

  return (
    <section className="border-b border-border bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div ref={barRef} className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-subtle hidden sm:block mr-1">
            Explore
          </span>

          <Dropdown
            label="Guides"
            items={guideItems}
            isOpen={open === 'guides'}
            onToggle={() => toggle('guides')}
            onClose={() => setOpen(null)}
          />

          <Dropdown
            label="Shop"
            items={shopItems}
            isOpen={open === 'shop'}
            onToggle={() => toggle('shop')}
            onClose={() => setOpen(null)}
          />

          <div className="hidden xl:flex items-center gap-5 ml-auto pl-5 border-l border-border/60">
            <Link href="/moissanite/" className="text-[11px] text-text-subtle hover:text-accent transition-colors whitespace-nowrap">
              Moissanite Guide
            </Link>
            <Link href="/diamond-cut-chart/" className="text-[11px] text-text-subtle hover:text-accent transition-colors whitespace-nowrap">
              Diamond 4Cs
            </Link>
            <Link href="/which-is-more-sparkly-diamond-or-moissanite/" className="text-[11px] text-text-subtle hover:text-accent transition-colors whitespace-nowrap">
              Moissanite vs Diamond
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
