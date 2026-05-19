'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Mega menu data ───────────────────────────────────────────────────────────

const MEGA: Array<{
  label: string
  href: string
  columns: Array<{
    heading: string
    links: Array<{ label: string; href: string; desc?: string }>
  }>
}> = [
  {
    label: 'Moissanite',
    href: '/category/moissanite/',
    columns: [
      {
        heading: 'Learn',
        links: [
          { label: 'Complete Moissanite Guide',   href: '/moissanite/',                                   desc: 'Everything you need to know' },
          { label: 'Moissanite vs Diamond',       href: '/which-is-more-sparkly-diamond-or-moissanite/', desc: 'Side-by-side comparison' },
          { label: '4Cs of Moissanite',           href: '/4cs-of-moissanite/',                           desc: 'Cut, color, clarity & carat' },
          { label: 'Moissanite Color Chart',      href: '/moissanite-color-chart-secret/',               desc: 'D–Z scale explained' },
          { label: 'Best Moissanite Rings',       href: '/category/moissanite/',                         desc: 'Top picks by budget' },
        ],
      },
      {
        heading: 'Best Retailers',
        links: [
          { label: 'Charles & Colvard',  href: '/category/charles-colvard/',                     desc: 'Original moissanite brand' },
          { label: 'James Allen',        href: '/category/james-allen-reviews-guides/',           desc: '360° HD diamond view' },
          { label: 'Blue Nile',          href: '/category/blue-nile-jewelry-reviews-guide/',      desc: 'Largest selection online' },
        ],
      },
    ],
  },
  {
    label: 'Diamond',
    href: '/category/diamond/',
    columns: [
      {
        heading: 'Education',
        links: [
          { label: 'Diamond 4Cs Guide',     href: '/diamond-grading-chart-4-cs-of-diamonds/', desc: 'Master cut, color, clarity, carat' },
          { label: 'Diamond Cut Chart',     href: '/diamond-cut-chart/',                      desc: 'Excellent to Poor grades' },
          { label: 'Carat Size Chart',      href: '/diamond-carat-size-chart/',               desc: 'MM to carat visual guide' },
          { label: 'All Diamond Guides',    href: '/category/diamond-buying-guide/',          desc: 'Full buying guide hub' },
        ],
      },
      {
        heading: 'Lab-Grown',
        links: [
          { label: 'Lab-Grown Diamond Guide',  href: '/category/lab-grown-diamond/',   desc: 'Complete buyer guide' },
          { label: 'Natural vs Lab-Grown',     href: '/category/lab-grown-diamond/',   desc: 'Price & quality vs natural' },
          { label: 'IGI vs GIA Certificates',  href: '/category/diamond-buying-guide/', desc: 'Which cert to trust' },
        ],
      },
      {
        heading: 'Where to Buy',
        links: [
          { label: 'Blue Nile Review',     href: '/category/blue-nile-jewelry-reviews-guide/', desc: 'Best overall diamond retailer' },
          { label: 'James Allen Review',   href: '/james-allen-review/',                       desc: 'Best 360° video selection' },
          { label: 'Rare Carat Review',    href: '/category/diamond-review/',                  desc: 'AI-powered price comparison' },
          { label: 'All Retailer Reviews', href: '/category/diamond-review/',                  desc: '' },
        ],
      },
    ],
  },
  {
    label: 'Gemstones',
    href: '/category/gemstone/',
    columns: [
      {
        heading: 'By Stone',
        links: [
          { label: 'Sapphire Guide',    href: '/category/gemstone/sapphire-guide/',        desc: 'Blue, pink & padparadscha' },
          { label: 'Pearl Guide',       href: '/category/gemstone/pearl/',                 desc: 'Freshwater vs Akoya' },
          { label: 'Moonstone',         href: '/category/moonstone/',                      desc: 'Adularescence explained' },
          { label: 'Birthstones A–Z',  href: '/category/gemstone/birthstones-by-month/', desc: 'All 12 months' },
          { label: 'All Gemstones',    href: '/category/gemstone/',                       desc: '' },
        ],
      },
      {
        heading: 'Buying Guides',
        links: [
          { label: 'Colored Gemstone Guide',     href: '/category/gemstone/', desc: 'How to buy colored stones' },
          { label: 'Gemstone Engagement Rings',  href: '/category/gemstone/', desc: 'Alternatives to diamonds' },
          { label: 'Gemstone vs Diamond',        href: '/category/gemstone/', desc: 'Value & beauty comparison' },
        ],
      },
    ],
  },
  {
    label: 'Calculators',
    href: '/diamond-appraisal-calculator/',
    columns: [
      {
        heading: 'Diamond Calculators',
        links: [
          { label: 'Diamond Appraisal Calculator',      href: '/diamond-appraisal-calculator/',       desc: 'Market, insurance & resale value' },
          { label: 'Diamond Rate Calculator',           href: '/diamond-rate-calculator/',            desc: 'Fair market price estimate' },
          { label: 'Diamond Resale Calculator',         href: '/diamond-resale-price-calculator/',    desc: 'Cash offer vs trade-in credit' },
          { label: 'Diamond Finger Coverage',           href: '/diamond-finger-coverage-calculator/', desc: 'Coverage % by shape & ring size' },
        ],
      },
      {
        heading: 'Moissanite & Pearl',
        links: [
          { label: 'Moissanite vs Diamond Calculator',  href: '/moissanite-vs-diamond-price-calculator/', desc: 'Side-by-side price comparison' },
          { label: 'Moissanite Price Calculator',       href: '/moissanite-price-calculator/',            desc: 'C&C, James Allen & Amazon' },
          { label: 'Pearl Value Calculator',            href: '/pearl-value-calculator/',                 desc: 'Freshwater, Akoya, South Sea' },
        ],
      },
      {
        heading: 'Coupons & Deals',
        links: [
          { label: 'All Jewelry Coupons',               href: '/jewelry-coupons/',               desc: 'Best active promo codes' },
          { label: 'Blue Nile Promo Code',              href: '/blue-nile-promo-code/',          desc: 'Up to 70% off — verified' },
          { label: 'James Allen Promo Code',            href: '/james-allen-promotional-code/',  desc: 'Latest deals & discounts' },
        ],
      },
    ],
  },
  {
    label: 'Reviews',
    href: '/category/diamond-review/',
    columns: [
      {
        heading: 'Retailer Reviews',
        links: [
          { label: 'Blue Nile Review',         href: '/category/blue-nile-jewelry-reviews-guide/', desc: 'Best prices on certified diamonds' },
          { label: 'James Allen Review',       href: '/james-allen-review/',                       desc: '360° HD for every diamond' },
          { label: 'Charles & Colvard Review', href: '/category/charles-colvard/',                 desc: 'Original moissanite brand' },
          { label: 'Rare Carat Review',        href: '/category/diamond-review/',                  desc: 'AI price comparison tool' },
          { label: 'Ritani Review',            href: '/category/diamond-review/',                  desc: 'Try-at-home program' },
          { label: 'All Reviews',              href: '/category/diamond-review/',                  desc: '' },
        ],
      },
      {
        heading: 'Comparisons',
        links: [
          { label: 'Blue Nile vs James Allen',  href: '/category/diamond-review/',     desc: 'Head-to-head price & UX' },
          { label: 'Natural vs Lab Diamond',    href: '/category/lab-grown-diamond/',  desc: 'Which is the better buy?' },
          { label: 'Is Rare Carat Legit?',      href: '/category/diamond-review/',     desc: 'Honest verdict' },
        ],
      },
    ],
  },
]

const SIMPLE = [
  { label: 'Shop', href: '/shop-fine-jewelry/' },
  { label: 'Blog', href: '/blog/' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Header() {
  const [active, setActive]             = useState<string | null>(null)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [mobileExp, setMobileExp]       = useState<string | null>(null)
  const [scrolled, setScrolled]         = useState(false)
  const headerRef                        = useRef<HTMLElement>(null)
  const closeTimer                       = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const openMenu  = useCallback((label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActive(label) }, [])
  const closeMenu = useCallback(() => { closeTimer.current = setTimeout(() => setActive(null), 120) }, [])
  const keepOpen  = useCallback(() => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-bg transition-shadow duration-300 ${
        scrolled ? 'shadow-sm border-b border-border' : 'border-b border-transparent'
      }`}
    >
      {/* ── Top bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Moissanite by Aurelia — Home">
            <Image
              src="https://moissanitebyaurelia.com/wp-content/uploads/2024/08/AURELIA-horizontal.png.webp"
              alt="Aurelia — Fine Jewelry Guides"
              width={140} height={30}
              className="h-7 w-auto object-contain"
              priority unoptimized
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center" aria-label="Main navigation">
            {MEGA.map(item => (
              <div key={item.label} onMouseEnter={() => openMenu(item.label)} onMouseLeave={closeMenu}>
                <button
                  onClick={() => setActive(active === item.label ? null : item.label)}
                  aria-expanded={active === item.label}
                  className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium transition-colors whitespace-nowrap ${
                    active === item.label ? 'text-accent' : 'text-text-muted hover:text-dark'
                  }`}
                >
                  {item.label}
                  <svg className={`w-3 h-3 transition-transform duration-200 ${active === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ))}
            {SIMPLE.map(item => (
              <Link key={item.label} href={item.href} className="px-2.5 py-2 text-[13px] font-medium text-text-muted hover:text-dark transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Search + CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="p-2 text-text-muted hover:text-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </Link>
            <a
              href="https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63"
              target="_blank" rel="nofollow sponsored noopener"
              className="hidden xl:inline-flex items-center gap-1.5 bg-dark text-white text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              Best Deals →
            </a>
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu" aria-expanded={mobileOpen}
              className="xl:hidden p-2 text-text-muted hover:text-dark transition-colors"
            >
              {mobileOpen
                ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega menu panels ── */}
      {MEGA.map(item => {
        const colCount = item.columns.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
        return (
          <div
            key={item.label}
            onMouseEnter={keepOpen}
            onMouseLeave={closeMenu}
            className={`absolute left-0 right-0 bg-bg border-b border-border shadow-xl z-40 transition-all duration-200 origin-top ${
              active === item.label
                ? 'opacity-100 scale-y-100 pointer-events-auto'
                : 'opacity-0 scale-y-95 pointer-events-none'
            }`}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className={`grid gap-0 ${colCount} xl:grid-cols-[1fr_1fr_auto]`}>
                {/* Content columns */}
                <div className={`grid gap-10 col-span-${item.columns.length}`} style={{ gridColumn: `span ${item.columns.length}` }}>
                  <div className={`grid gap-10 ${colCount}`}>
                    {item.columns.map(col => (
                      <div key={col.heading}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-subtle mb-4 pb-2 border-b border-border">
                          {col.heading}
                        </p>
                        <ul className="space-y-0.5">
                          {col.links.map(link => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setActive(null)}
                                className="group flex flex-col py-2 px-2.5 -mx-2.5 rounded-md hover:bg-surface transition-colors"
                              >
                                <span className="text-[13px] font-medium text-dark group-hover:text-accent transition-colors leading-snug">
                                  {link.label}
                                </span>
                                {link.desc && (
                                  <span className="text-[11px] text-text-subtle mt-0.5 leading-snug">{link.desc}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured deal panel */}
                <div className="hidden xl:flex flex-col justify-between pl-10 border-l border-border ml-10 min-w-[200px]">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-subtle mb-4 pb-2 border-b border-border">
                      Today&apos;s Deal
                    </p>
                    <a
                      href="https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=168657"
                      target="_blank" rel="nofollow sponsored noopener"
                      onClick={() => setActive(null)}
                      className="group block rounded-xl overflow-hidden border border-border hover:border-accent transition-colors"
                    >
                      <div className="bg-dark px-4 py-4">
                        <p className="text-[10px] text-accent uppercase tracking-widest font-medium mb-1.5">Blue Nile Vault Sale</p>
                        <p className="font-serif text-white text-base leading-snug">Up to 70% Off<br />Certified Diamonds</p>
                      </div>
                      <div className="px-4 py-2.5 text-[12px] text-accent font-medium group-hover:text-accent-dark transition-colors flex items-center gap-1">
                        Shop the Vault
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="mt-7 pt-5 border-t border-border flex items-center justify-between">
                <Link href={item.href} onClick={() => setActive(null)} className="text-[12px] text-accent font-medium hover:text-accent-dark transition-colors">
                  View all {item.label} guides →
                </Link>
                <p className="hidden sm:block text-[11px] text-text-subtle">
                  415+ expert articles · Cited in People &amp; Us Weekly
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-border bg-bg max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-3" aria-label="Mobile navigation">
            {MEGA.map(item => (
              <div key={item.label} className="border-b border-border/60">
                <button
                  onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                  className="w-full flex items-center justify-between py-3.5 text-sm font-medium text-dark"
                >
                  {item.label}
                  <svg className={`w-4 h-4 text-text-muted transition-transform ${mobileExp === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExp === item.label && (
                  <div className="pb-4 grid grid-cols-2 gap-x-6 gap-y-4">
                    {item.columns.map(col => (
                      <div key={col.heading}>
                        <p className="text-[10px] uppercase tracking-widest text-text-subtle font-semibold mb-2">{col.heading}</p>
                        {col.links.map(link => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => { setMobileOpen(false); setMobileExp(null) }}
                            className="block py-1.5 text-[13px] text-text-muted hover:text-accent transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {SIMPLE.map(item => (
              <Link
                key={item.label} href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3.5 text-sm font-medium text-dark border-b border-border/60"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/jewelry-personality-quiz/" onClick={() => setMobileOpen(false)} className="block py-3.5 text-sm font-medium text-dark border-b border-border/60">
              Quiz
            </Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="block py-3.5 text-sm font-medium text-dark border-b border-border/60">
              Search
            </Link>
            <div className="py-4">
              <a
                href="https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63"
                target="_blank" rel="nofollow sponsored noopener"
                className="block text-center bg-dark text-white text-sm font-medium py-3 rounded-lg hover:bg-accent transition-colors"
              >
                Shop Best Deals →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
