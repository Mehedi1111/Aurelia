'use client'

import { useState, useEffect, useCallback } from 'react'

const DEALS = [
  {
    tag: "New Collection",
    text: "Shop the James Allen Collection at Blue Nile",
    retailer: "Blue Nile",
    href: "https://www.bluenile.com/jewelry/by-james-allen?a_aid=66fc3592af524&a_cid=55e51e63&chan=deal_notice",
    cta: "Explore Now",
  },
  {
    tag: "Flash Sale",
    text: "Up to 40% OFF sitewide",
    retailer: "Rare Carat",
    href: "https://www.awin1.com/cread.php?awinmid=44489&awinaffid=1756887&ued=https%3A%2F%2Fwww.rarecarat.com%2F",
    cta: "Shop Now",
  },
  {
    tag: "Memorial Day",
    text: "Up To 30% Off select fine jewelry",
    retailer: "Blue Nile",
    href: "https://www.bluenile.com/jewelry/todays-jewelry-deals?a_aid=66fc3592af524&a_cid=55e51e63&chan=deal_notice",
    cta: "Shop Sale",
  },
  {
    tag: "Exclusive",
    text: "Up to 60% OFF select fine jewelry",
    retailer: "Ritani",
    href: "https://ritani.vxca.net/VObK23",
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
    // No overflow-hidden — lets dot buttons have full 24 px tap area
    <div className="relative bg-[#111111] text-white">
      {/* Bar row — h-11 (44 px) so dots at bottom-0 stay fully inside */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-center gap-3 h-11">

        {/* Prev arrow — 32 × 32 px tap target, desktop only */}
        <button
          onClick={() => advance(-1)}
          aria-label="Previous deal"
          className="hidden sm:flex absolute left-2 items-center justify-center w-8 h-8 text-white/40 hover:text-white transition-colors"
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

          {/* CTA — py-1.5 gives ~28 px height, passes 24 px minimum */}
          <a
            href={deal.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="ml-1 text-[11px] font-semibold text-[#d19b8a] border border-[#d19b8a]/40 hover:bg-[#d19b8a] hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap"
          >
            {deal.cta} →
          </a>
        </div>

        {/* Next arrow — 32 × 32 px, desktop only */}
        <button
          onClick={() => advance(1)}
          aria-label="Next deal"
          className="hidden sm:flex absolute right-11 items-center justify-center w-8 h-8 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Close — 32 × 32 px */}
        <button
          onClick={() => setClosed(true)}
          aria-label="Close deals bar"
          className="absolute right-1 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Dot indicators — 24 × 24 px each, 8 px gap between = passes Lighthouse */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {DEALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true) }, 220) }}
            className="w-6 h-6 flex items-center justify-center"
            aria-label={`Go to deal ${i + 1}`}
          >
            <span className={`block rounded-full transition-all duration-300 h-1 ${i === idx ? 'bg-[#d19b8a] w-3' : 'bg-white/20 w-1'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
