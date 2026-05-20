'use client'

import { useState, useEffect, useCallback } from 'react'

const DEALS = [
  {
    tag: "Mother's Day",
    text: "Up To 30% Off select fine jewelry",
    retailer: "Blue Nile",
    href: "https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63",
    cta: "Shop Sale",
  },
  {
    tag: "New Collection",
    text: "Shop the James Allen Collection at Blue Nile",
    retailer: "Blue Nile",
    href: "https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63",
    cta: "Explore Now",
  },
  {
    tag: "Vault Sale",
    text: "Clear The Vault — Up to 70% OFF",
    retailer: "Blue Nile",
    href: "https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=168657",
    cta: "Shop 70% Off",
  },
  {
    tag: "Flash Sale",
    text: "Up to 40% OFF sitewide",
    retailer: "Rare Carat",
    href: "https://www.rarecarat.com/",
    cta: "Shop Now",
  },
  {
    tag: "Exclusive",
    text: "Up to 60% OFF select fine jewelry",
    retailer: "Ritani",
    href: "https://ritani.vxca.net/",
    cta: "View Offer",
  },
]

export default function DealsBar() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [closed, setClosed] = useState(false)

  const advance = useCallback((dir: 1 | -1 = 1) => {
    setVisible(false)
    setTimeout(() => {
      setIdx(i => (i + dir + DEALS.length) % DEALS.length)
      setVisible(true)
    }, 220)
  }, [])

  useEffect(() => {
    const t = setInterval(() => advance(1), 5000)
    return () => clearInterval(t)
  }, [advance])

  if (closed) return null

  const deal = DEALS[idx]

  return (
    <div className="relative bg-[#111111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-center gap-3 h-9 sm:h-10">

        {/* Prev arrow — desktop only */}
        <button
          onClick={() => advance(-1)}
          aria-label="Previous deal"
          className="hidden sm:flex absolute left-4 items-center justify-center w-6 h-6 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Deal content */}
        <div
          className="flex items-center gap-2 text-center transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <span className="text-[#d19b8a] text-[11px] font-medium uppercase tracking-widest hidden sm:inline">
            {deal.tag}:
          </span>

          <span className="text-white text-[11px] sm:text-xs font-light tracking-wide">
            {deal.text}
          </span>

          <span className="text-white/30 text-[10px] hidden sm:inline">·</span>

          <span className="text-white/50 text-[10px] hidden sm:inline">{deal.retailer}</span>

          <a
            href={deal.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="ml-1 text-[11px] font-semibold text-[#d19b8a] border border-[#d19b8a]/40 hover:bg-[#d19b8a] hover:text-white px-2.5 py-0.5 rounded-full transition-all duration-200 whitespace-nowrap"
          >
            {deal.cta} →
          </a>
        </div>

        {/* Next arrow — desktop only */}
        <button
          onClick={() => advance(1)}
          aria-label="Next deal"
          className="hidden sm:flex absolute right-10 items-center justify-center w-6 h-6 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Close */}
        <button
          onClick={() => setClosed(true)}
          aria-label="Close deals bar"
          className="absolute right-3 text-white/30 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex">
        {DEALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true) }, 220) }}
            className="p-2 flex items-center justify-center"
            aria-label={`Go to deal ${i + 1}`}
          >
            <span className={`block rounded-full transition-all duration-300 h-1 ${i === idx ? 'bg-[#d19b8a] w-3' : 'bg-white/20 w-1'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
