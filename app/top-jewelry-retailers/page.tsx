import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Top Jewelry Retailers ${year} — Best Online Diamond & Moissanite Stores`,
    description: `The best online jewelry retailers for ${year}: Blue Nile, James Allen, Rare Carat, Charles & Colvard, and more. Expert picks for every budget, stone type, and buying priority.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/top-jewelry-retailers/' },
    openGraph: {
      title: `Top Jewelry Retailers ${year} — Expert Picks`,
      description: 'Best online jewelry retailers ranked by diamond selection, certification standards, pricing, and buyer experience.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: 'Which online jewelry retailer has the best diamond selection?', a: 'James Allen and Blue Nile offer the largest curated natural diamond inventories online — both with 100,000+ GIA-certified stones. Rare Carat aggregates inventory from multiple vendors, giving it the broadest search across prices. For lab-grown diamonds, James Allen and Blue Nile are again the top picks, while Charles & Colvard leads for moissanite.' },
  { q: 'Is it safe to buy diamonds online?', a: 'Yes — buying diamonds from reputable online retailers is safe, provided you stick to retailers that offer GIA or IGI certification on every stone, secure payment processing, clear return policies (30+ days), and insured shipping. Blue Nile, James Allen, and Rare Carat all meet these standards. Always verify the certificate number with GIA or IGI directly before finalizing a purchase.' },
  { q: 'What is the most reputable jewelry retailer?', a: 'Blue Nile (founded 1999) is often cited as the most established online jewelry retailer. James Allen is widely praised for their 360° HD imaging and customer service. Both are publicly recognized as top-tier. For moissanite specifically, Charles & Colvard — the original moissanite creator — has the strongest reputation and longest track record.' },
  { q: 'Which retailer is best for engagement rings?', a: 'James Allen is the top pick for first-time engagement ring buyers due to their 360° diamond inspection technology, which lets you see exactly what you\'re getting before purchasing. Blue Nile is excellent for budget-conscious buyers who want a wide selection. For custom designs, Taylor & Hart and Brilliant Earth allow more design flexibility.' },
  { q: 'Does Blue Nile or James Allen offer better prices?', a: 'Pricing is comparable between Blue Nile and James Allen on equivalent GIA-certified stones — both operate with similar overhead-free margins. James Allen occasionally runs promotional events; Blue Nile offers bulk discounts on matched wedding bands. The bigger driver of price is which specific stone you choose — the same quality parameters can vary by 15–25% within each retailer\'s inventory.' },
  { q: 'Are Rare Carat diamonds trustworthy?', a: 'Rare Carat is a legitimate diamond marketplace that aggregates listings from vetted vendors and provides AI-powered quality grading. They are not a retailer themselves — they connect buyers to third-party sellers. Most diamonds listed on Rare Carat are GIA-certified. Always verify the vendor reviews and return policy for each specific listing before purchasing.' },
  { q: 'What is the best retailer for lab-grown diamonds?', a: 'James Allen and Blue Nile both carry large IGI-certified lab-grown diamond inventories with the same return policies and certification standards as their natural diamonds. For budget-focused lab-grown shoppers, Rare Carat can surface deals across multiple vendors. Brilliant Earth specializes in lab-grown with an emphasis on sustainability certification.' },
  { q: 'Can I return a diamond purchased online?', a: 'Yes — all major online retailers offer return windows. Blue Nile offers 30 days, James Allen offers 30 days, and Rare Carat\'s policy depends on the individual vendor. All include free insured return shipping. Custom work (engraving, resizing, build-to-order rings) may have different terms — always check before ordering if customization is planned.' },
  { q: 'Which retailer is best for moissanite?', a: 'Charles & Colvard is the original moissanite creator and offers the most comprehensive selection of their Forever One and Caydia brands. Brilliant Earth also stocks moissanite. For budget moissanite, Gema&Co and direct factory sellers offer significant savings over brand-name options — with the trade-off of less quality consistency.' },
  { q: 'Do online jewelry retailers offer warranties?', a: 'Most reputable online retailers include lifetime warranties on engagement ring settings and wedding bands. James Allen\'s lifetime warranty covers prong tightening, re-plating, and manufacturing defects. Blue Nile offers similar coverage. Diamond certificates (GIA or IGI) serve as a permanent quality guarantee for the stone itself. Check each retailer\'s specific warranty terms before purchase.' },
]

const TOP_PICKS = [
  {
    rank: 1,
    name: 'Blue Nile',
    tag: 'Best Overall for Natural Diamonds',
    href: '/category/blue-nile-jewelry-reviews-guide/',
    detail: 'The original online diamond retailer. 100,000+ GIA-certified stones, competitive pricing, excellent customer service, and 30-day free returns. Best for buyers who want a trusted name and the widest selection.',
    strengths: ['Largest GIA-certified inventory', '30-day free returns', 'Price match guarantee', 'Established since 1999'],
    best: 'Natural diamond engagement rings',
  },
  {
    rank: 2,
    name: 'James Allen',
    tag: 'Best 360° Diamond Viewing',
    href: '/james-allen-review/',
    detail: 'Pioneered HD 360° diamond video — every stone in their inventory is photographed so you can inspect it from every angle. GIA and IGI certified. Excellent for first-time buyers who want to see exactly what they\'re getting.',
    strengths: ['360° HD diamond video on every stone', 'GIA & IGI certified', 'Lab-grown diamond selection', 'Lifetime warranty on settings'],
    best: 'First-time buyers & lab-grown diamonds',
  },
  {
    rank: 3,
    name: 'Rare Carat',
    tag: 'Best for Price Comparison',
    href: '/category/diamond-review/',
    detail: 'A diamond search aggregator powered by AI grading analysis. Search across hundreds of vendors, compare prices for identical quality grades, and find undervalued stones. Great for experienced buyers who want maximum value.',
    strengths: ['AI-powered quality analysis', 'Aggregates 100+ vendors', 'Price comparison at identical specs', 'Free gemologist check'],
    best: 'Price-conscious natural diamond buyers',
  },
  {
    rank: 4,
    name: 'Charles & Colvard',
    tag: 'Best for Moissanite',
    href: '/charles-and-colvard-discount-code/',
    detail: 'The original moissanite creator. Their Forever One and Caydia collections are the industry benchmark for moissanite quality. Lifetime warranty on every stone. If you\'re buying moissanite, this is the authoritative source.',
    strengths: ['Original moissanite creator', 'Forever One & Caydia grades', 'Lifetime warranty on stones', 'Best color consistency'],
    best: 'Moissanite engagement rings',
  },
]

const SPECIALTY_PICKS = [
  { name: 'GemsNY', specialty: 'Colored gemstones (sapphires, rubies, emeralds) at wholesale prices. GIA-certified. Best for buyers who want natural colored stones without retail markup.' },
  { name: 'Taylor & Hart', specialty: 'Custom engagement ring design. Best for couples who want a fully bespoke ring — choose your stone, setting, metal, and engrave a unique design.' },
  { name: 'Mint & Lilly', specialty: 'Budget-friendly moissanite and lab-grown diamonds. Good for shoppers who want maximum size on a tight budget.' },
  { name: 'Larson Jewelers', specialty: 'Wedding bands. Wide selection of men\'s and women\'s bands in every metal type. Competitive pricing on plain and diamond bands.' },
  { name: 'Mindful Souls', specialty: 'Crystal and healing jewelry. Not for traditional fine jewelry, but excellent for buyers interested in natural crystal pieces.' },
  { name: 'Amazon', specialty: 'Budget jewelry and silver pieces. Fine for fashion jewelry — avoid for diamonds or gemstones where certification matters.' },
]

export default function TopJewelryRetailersPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()

  const SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
        { '@type': 'ListItem', position: 2, name: 'Top Jewelry Retailers', item: 'https://moissanitebyaurelia.com/top-jewelry-retailers/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: 'https://moissanitebyaurelia.com/top-jewelry-retailers/',
      dateModified: iso,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Expert Picks</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Top Jewelry Retailers {year}
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            The best online jewelry stores ranked by diamond selection, certification standards, pricing transparency, and buyer experience — based on hands-on research.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Top Picks */}
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <h2 className="font-serif text-2xl text-dark text-center mb-6">Our Top Picks</h2>
          {TOP_PICKS.map(retailer => (
            <div key={retailer.name} className="bg-surface border-2 border-accent/25 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center font-serif text-lg">
                  {retailer.rank}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-serif text-xl text-dark">{retailer.name}</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-accent border border-accent/30 rounded-full px-2.5 py-1">
                      {retailer.tag}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{retailer.detail}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {retailer.strengths.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 text-[11px] text-text-muted bg-white border border-border rounded-full px-3 py-1">
                        <svg className="w-3 h-3 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-subtle">Best for: <span className="text-dark font-medium">{retailer.best}</span></span>
                    <Link href={retailer.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-dark transition-colors">
                      Read Review →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <article className="max-w-3xl mx-auto space-y-10">

          {/* Specialty picks */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Specialty Retailers Worth Knowing</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Beyond the top four, these retailers serve specific niches where they outperform the general market leaders:
            </p>
            <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
              {SPECIALTY_PICKS.map(sp => (
                <div key={sp.name} className="px-5 py-4 bg-surface">
                  <span className="font-medium text-dark text-sm">{sp.name} — </span>
                  <span className="text-text-muted text-sm">{sp.specialty}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How to choose */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Choose the Right Jewelry Retailer</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              The best retailer for your purchase depends on what you&apos;re buying and what matters most to you. Here&apos;s a quick decision framework:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { scenario: 'You want the largest natural diamond selection', pick: 'Blue Nile or James Allen — both 100,000+ GIA-certified stones.' },
                { scenario: 'You\'re buying a lab-grown diamond', pick: 'James Allen for 360° inspection. Blue Nile for competitive pricing. Both IGI-certified.' },
                { scenario: 'You want moissanite', pick: 'Charles & Colvard for quality assurance. Mint & Lilly for budget options.' },
                { scenario: 'You want to compare prices across vendors', pick: 'Rare Carat aggregates listings and flags which stones are undervalued vs overpriced.' },
                { scenario: 'You want a custom ring design', pick: 'Taylor & Hart for full bespoke design. James Allen for standard setting customization.' },
                { scenario: 'You want a colored gemstone', pick: 'GemsNY for wholesale sapphires, rubies, and emeralds with GIA grading.' },
              ].map(item => (
                <div key={item.scenario} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.scenario}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.pick}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What to look for */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">What Makes a Jewelry Retailer Trustworthy</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Not all online jewelers meet the same standards. Before buying from any retailer, verify these five factors:
            </p>
            <div className="space-y-3">
              {[
                { title: 'Independent Certification', body: 'Every diamond should have a GIA or IGI certificate — not an in-house grading report. These certificates are verifiable on the GIA and IGI websites by certificate number.' },
                { title: 'Return Policy', body: 'A minimum 30-day free return window with insured shipping. Avoid retailers with 14-day or no-return policies on diamonds.' },
                { title: 'Transparent Pricing', body: 'Reputable retailers show consistent pricing without hidden fees. Be cautious of retailers who require account creation to see prices.' },
                { title: 'Contact Access', body: 'Direct phone or live chat access to gemologists or jewelry consultants. Not just an email contact form.' },
                { title: 'Established Track Record', body: 'Check BBB ratings, Trustpilot reviews, and industry publications. Look for retailers that have operated for 5+ years with verifiable customer reviews.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 bg-surface border border-border rounded-xl p-4">
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Jewelry Retailer Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
