'use client'

import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-medium text-dark text-sm leading-snug group-hover:text-accent transition-colors">
              {item.q}
            </span>
            <span
              className="text-accent text-xl font-light shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              +
            </span>
          </button>
          {open === i && (
            <p className="mt-3 text-text-muted text-sm leading-relaxed pr-8">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
