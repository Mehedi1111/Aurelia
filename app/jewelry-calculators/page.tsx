import type { Metadata } from 'next'
import Link from 'next/link'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Jewelry & Diamond Calculators — Free Tools ${year} | Moissanite by Aurelia`,
    description: `Free jewelry calculators for ${year}: diamond appraisal, resale value, moissanite vs diamond price, finger coverage, pearl value, and more. Instant results with no sign-up required.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/jewelry-calculators/' },
    openGraph: {
      title: `Free Jewelry & Diamond Calculators ${year}`,
      description: 'Diamond appraisal, resale value, moissanite vs diamond price, finger coverage, pearl value calculators — free, instant, no sign-up.',
      type: 'website',
    },
  }
}

const CALCULATORS = [
  {
    title: 'Diamond Appraisal Calculator',
    desc: 'Estimate the appraised replacement value of a diamond based on carat weight, cut, color, and clarity. Useful for insurance purposes.',
    href: '/diamond-appraisal-calculator/',
    icon: '💎',
    tag: 'Appraisal',
  },
  {
    title: 'Diamond Rate Calculator',
    desc: 'Find the current market rate for a diamond by shape, weight, and quality grade. Compare natural vs lab-grown pricing side by side.',
    href: '/diamond-rate-calculator/',
    icon: '📊',
    tag: 'Pricing',
  },
  {
    title: 'Diamond Resale Price Calculator',
    desc: 'Understand what your diamond is likely worth on the secondary market. Natural diamonds typically resell at 20–50% of retail.',
    href: '/diamond-resale-price-calculator/',
    icon: '🔄',
    tag: 'Resale',
  },
  {
    title: 'Diamond Finger Coverage Calculator',
    desc: 'See how large a diamond will appear on your specific finger width. Coverage percentage affects perceived size more than carat weight alone.',
    href: '/diamond-finger-coverage-calculator/',
    icon: '💍',
    tag: 'Size & Fit',
  },
  {
    title: 'Moissanite vs Diamond Price Calculator',
    desc: 'Compare the cost of moissanite and natural diamond at equivalent sizes. See exactly how much you save choosing moissanite.',
    href: '/moissanite-vs-diamond-price-calculator/',
    icon: '⚖️',
    tag: 'Comparison',
  },
  {
    title: 'Moissanite Price Calculator',
    desc: 'Get instant moissanite pricing by shape, size, and brand (Charles & Colvard vs generic). Know what to pay before you shop.',
    href: '/moissanite-price-calculator/',
    icon: '✨',
    tag: 'Moissanite',
  },
  {
    title: 'Pearl Value Calculator',
    desc: 'Estimate the value of pearls based on type (Akoya, Tahitian, South Sea, freshwater), size, luster, and surface quality.',
    href: '/pearl-value-calculator/',
    icon: '🦪',
    tag: 'Pearls',
  },
]

export default function JewelryCalculatorsPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()

  const SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
        { '@type': 'ListItem', position: 2, name: 'Jewelry Calculators', item: 'https://moissanitebyaurelia.com/jewelry-calculators/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Jewelry & Diamond Calculators ${year}`,
      description: 'Free online calculators for diamonds, moissanite, and pearls',
      numberOfItems: CALCULATORS.length,
      itemListElement: CALCULATORS.map((calc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: calc.title,
        url: `https://moissanitebyaurelia.com${calc.href}`,
        description: calc.desc,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: 'https://moissanitebyaurelia.com/jewelry-calculators/',
      dateModified: iso,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tools</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Jewelry & Diamond Calculators
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Seven free calculators for diamond pricing, resale value, finger coverage, moissanite comparisons, and pearl valuation. No sign-up. Instant results.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Calculator Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {CALCULATORS.map(calc => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group flex flex-col bg-surface border-2 border-border hover:border-accent/50 rounded-2xl p-6 gap-4 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{calc.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent border border-accent/30 rounded-full px-2.5 py-1">
                  {calc.tag}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg text-dark mb-2 group-hover:text-accent transition-colors">{calc.title}</p>
                <p className="text-text-muted text-xs leading-relaxed">{calc.desc}</p>
              </div>
              <p className="text-accent text-sm font-semibold">Open Calculator →</p>
            </Link>
          ))}
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Use These Jewelry Calculators</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Each calculator on this page is designed for a specific buying or ownership decision. Here&apos;s when to reach for each one:
            </p>
            <div className="space-y-3">
              {[
                { q: 'Before buying a diamond', a: 'Use the Diamond Rate Calculator to benchmark pricing, then the Finger Coverage Calculator to understand how the carat weight will look on your hand.' },
                { q: 'Comparing moissanite vs diamond', a: 'The Moissanite vs Diamond Price Calculator shows you the exact dollar difference for equivalent sizes. Most buyers are surprised by the margin.' },
                { q: 'For insurance or estate purposes', a: 'The Diamond Appraisal Calculator estimates replacement value — the figure your jeweler or insurer uses, not market value.' },
                { q: 'Considering resale', a: 'The Diamond Resale Price Calculator models realistic secondary market returns. Natural diamonds typically return 20–50% of retail; lab-grown diamonds significantly less.' },
                { q: 'Valuing a pearl piece', a: 'The Pearl Value Calculator estimates worth based on pearl type, luster grade, size, and surface quality — the four factors that actually drive pearl pricing.' },
              ].map(item => (
                <div key={item.q} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.q}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Diamond vs Moissanite — Price Comparison at a Glance</h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Size (Round)</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Natural Diamond</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Lab-Grown Diamond</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Moissanite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['0.5ct (5.2mm)', '$1,000–$2,500', '$200–$500', '$80–$150'],
                    ['1.0ct (6.5mm)', '$4,500–$8,000', '$600–$1,500', '$200–$400'],
                    ['1.5ct (7.4mm)', '$9,000–$18,000', '$1,000–$2,800', '$350–$600'],
                    ['2.0ct (8.1mm)', '$16,000–$35,000', '$1,800–$4,500', '$500–$900'],
                    ['3.0ct (9.4mm)', '$35,000–$80,000', '$3,500–$9,000', '$800–$1,500'],
                  ].map(([size, nat, lab, mois], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{size}</td>
                      <td className="px-4 py-3 text-text-muted">{nat}</td>
                      <td className="px-4 py-3 text-text-muted">{lab}</td>
                      <td className="px-4 py-3 text-accent font-medium">{mois}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs">Approximate retail ranges for G color, VS2 clarity, Excellent cut, {year} market data. Use our calculators for precise estimates.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Diamond Resale Value — What to Expect</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Diamonds are not investments in the traditional sense. The resale market is thin, and most buyers recover a fraction of retail. Here&apos;s what current secondary market data shows:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: 'Natural Diamonds', return: '20–50% of retail', note: 'GIA-certified stones in popular weights (0.5–2ct) perform best. Off-shapes and low-quality grades recover less.' },
                { type: 'Lab-Grown Diamonds', return: '5–15% of retail', note: 'Wholesale prices have dropped 80%+ since 2020. Secondary market value has followed. Lab-grown diamonds are a luxury purchase, not an asset.' },
                { type: 'Moissanite', return: '10–20% of retail', note: 'Small resale market. Best recovered through specialty forums (r/Moissanite, dedicated Facebook groups) rather than pawn shops.' },
              ].map(item => (
                <div key={item.type} className="bg-surface border border-border rounded-xl p-5">
                  <p className="font-medium text-dark text-sm mb-1">{item.type}</p>
                  <p className="text-accent font-semibold text-lg mb-2">{item.return}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Understanding Finger Coverage</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Carat weight tells you mass, not visual size. What actually matters on the hand is finger coverage — the percentage of finger width the stone spans. A wide finger requires more carat weight to achieve the same visual impact as the same stone on a narrower finger.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Finger Width</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">50% Coverage</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">65% Coverage</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">80% Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['14mm (narrow)', '~0.5ct', '~0.8ct', '~1.2ct'],
                    ['16mm (average)', '~0.75ct', '~1.1ct', '~1.5ct'],
                    ['18mm (wide)', '~1.0ct', '~1.5ct', '~2.0ct'],
                    ['20mm (very wide)', '~1.3ct', '~2.0ct', '~2.7ct'],
                  ].map(([fw, c50, c65, c80], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{fw}</td>
                      <td className="px-4 py-3 text-text-muted">{c50}</td>
                      <td className="px-4 py-3 text-text-muted">{c65}</td>
                      <td className="px-4 py-3 text-accent font-medium">{c80}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs">Estimates for round brilliant cut. Use our Finger Coverage Calculator for exact results based on your measurements.</p>
          </section>

        </article>
      </div>
    </>
  )
}
