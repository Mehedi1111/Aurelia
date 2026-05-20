import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import EngagementRingFinder from '@/components/ui/EngagementRingFinder'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Best Place to Buy Engagement Rings Online ${year} — Interactive Retailer Finder`,
    description: `Find the best online engagement ring retailer for your needs in ${year}. Answer 3 questions and get a personalized pick — James Allen, Blue Nile, Rare Carat, Charles & Colvard, and more.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/best-place-to-buy-engagement-rings-online-tool/' },
    openGraph: {
      title: `Best Place to Buy Engagement Rings Online ${year}`,
      description: 'Interactive retailer finder + definitive guide to buying an engagement ring online. Expert picks for every stone type, budget, and priority.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: 'What is the best place to buy engagement rings online?', a: 'The best online engagement ring retailer depends on your stone type and priorities. James Allen leads for natural and lab-grown diamonds due to their 360° HD video inspection technology. Blue Nile is best for the widest GIA-certified inventory and a trusted name since 1999. Rare Carat is best for price comparison across multiple vendors. Charles & Colvard is the top choice for moissanite. For custom designs, Taylor & Hart offers full bespoke service.' },
  { q: 'Is it safe to buy an engagement ring online?', a: 'Yes — buying an engagement ring online is safe when you use established retailers with independent diamond certification (GIA or IGI), clear return policies (30+ days), insured shipping, and verified customer reviews. James Allen, Blue Nile, and Rare Carat all meet these criteria. Always verify the diamond certificate number directly on the GIA or IGI website before purchase.' },
  { q: 'Should I buy a natural or lab-grown diamond engagement ring?', a: 'Lab-grown diamonds are chemically and optically identical to natural diamonds — a gemologist cannot tell them apart without specialized equipment. They cost 60–80% less than natural diamonds of equivalent quality. Natural diamonds hold resale value better (though neither is a strong investment). The choice comes down to: if you want maximum size for your budget, choose lab-grown. If long-term heirloom value matters, choose natural.' },
  { q: 'How much should I spend on an engagement ring?', a: 'The "three months salary" rule is marketing invented by De Beers in the 1930s — ignore it. Spend what is comfortable for your financial situation. In practice, most couples spend $3,000–$7,000 on an engagement ring. A 1ct G/VS2 lab-grown diamond with setting can be achieved for $1,500–$3,000 through James Allen or Blue Nile. A natural diamond equivalent runs $5,000–$9,000. What matters is the cut quality of the stone, not the price tag.' },
  { q: 'What is the most important factor when choosing a diamond?', a: 'Cut quality is the single most important factor in a diamond\'s appearance — more than color, clarity, or carat weight. An Excellent or Ideal cut grade maximizes how light reflects through the facets, creating brilliance and fire. A poorly cut large diamond looks worse than a well-cut smaller stone. After cut, prioritize color (G or H is near-colorless and offers best value) and clarity (VS2 or SI1 is typically eye-clean at reasonable prices).' },
  { q: 'What is a GIA certificate and why does it matter?', a: 'A GIA (Gemological Institute of America) certificate is the industry gold standard for diamond grading. GIA grades each diamond\'s cut, color, clarity, and carat weight using strict, consistent criteria. Every certificate includes a unique number verifiable on GIA\'s website. For natural diamonds, always insist on GIA certification. For lab-grown diamonds, IGI (International Gemological Institute) is the equivalent standard. Never buy a diamond with only an in-house retailer report.' },
  { q: 'Can I return an engagement ring bought online?', a: 'Yes — all major online engagement ring retailers offer return windows. James Allen and Blue Nile both offer 30-day free returns with insured shipping. Rare Carat\'s return policy varies by vendor — verify before purchasing. Custom-built rings (specific engraving, build-to-order) may have limited return eligibility. Always read the return policy details before completing a purchase.' },
  { q: 'Is moissanite a good alternative to diamond for an engagement ring?', a: 'Moissanite is an excellent alternative for buyers who prioritize brilliance and budget over natural diamond prestige. Moissanite is harder than sapphire (9.25 on Mohs scale vs diamond\'s 10) and extremely durable for everyday wear. It produces more fire and brilliance than diamond — sometimes appearing "too sparkly" in bright light. At 1/10th the cost of a natural diamond, it allows a much larger stone on the same budget. Charles & Colvard\'s Forever One moissanite is the quality benchmark.' },
  { q: 'What ring style is most popular for engagement rings?', a: 'The solitaire remains the most popular engagement ring style — a single stone in a four or six-prong setting. Round brilliant cut diamonds are the most popular shape (approximately 50% of engagement ring diamonds sold). Oval cuts have surged in popularity for their elongating effect and finger coverage per carat. Halo settings (smaller diamonds surrounding the center stone) add visual size without significant cost. Ultimately, choose the style the wearer will love daily for decades.' },
  { q: 'How do I know what size ring to buy?', a: 'If you\'re surprising your partner, the most reliable approach is to borrow one of their existing rings (worn on the same finger) and have a local jeweler measure it — or trace the inside of the ring on paper and bring that to a jeweler. Average US ring sizes are 6–6.5 for women and 10–10.5 for men. All major online retailers offer at least one free resizing within 30–60 days of purchase. You can also purchase inexpensive ring sizers online to measure at home.' },
]

const JA_LINK = 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home'
const BN_LINK = 'https://bluenile.com/?a_aid=66fc3592af524&utm_source=pap&utm_medium=affiliates'
const RC_LINK = 'https://www.awin1.com/cread.php?awinmid=44489&awinaffid=1756887&ued=https%3A%2F%2Fwww.rarecarat.com%2F'

export default function BestPlaceToBuyEngagementRingsPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()

  const SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
        { '@type': 'ListItem', position: 2, name: 'Best Place to Buy Engagement Rings Online', item: 'https://moissanitebyaurelia.com/best-place-to-buy-engagement-rings-online-tool/' },
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
      url: 'https://moissanitebyaurelia.com/best-place-to-buy-engagement-rings-online-tool/',
      dateModified: iso,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Interactive Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Best Place to Buy Engagement Rings Online
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Answer 3 questions and get a personalized retailer recommendation. Or read the full guide below — every major online jeweler evaluated.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Interactive Finder */}
        <div className="max-w-2xl mx-auto mb-16">
          <EngagementRingFinder />
        </div>

        {/* Definitive Guide */}
        <article className="max-w-3xl mx-auto space-y-12">

          <header>
            <h2 className="font-serif text-3xl text-dark mb-4">The {year} Definitive Guide to Buying an Engagement Ring Online</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              A complete evaluation of every major online engagement ring retailer — what they do well, where they fall short, and which buyer each one fits best.
            </p>
          </header>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">James Allen vs Blue Nile — The Detailed Comparison</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              These are the two dominant online diamond retailers. If you&apos;re buying a natural or lab-grown diamond engagement ring, your choice likely comes down to these two.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Factor</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">James Allen</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Blue Nile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Founded', '2006', '1999'],
                    ['Diamond video', '360° HD on every stone', 'Photos only (most stones)'],
                    ['Certification', 'GIA (natural) + IGI (lab)', 'GIA (natural) + IGI (lab)'],
                    ['Inventory size', '150,000+ diamonds', '100,000+ diamonds'],
                    ['Return window', '30 days free', '30 days free'],
                    ['Lab-grown', 'Yes — large selection', 'Yes — large selection'],
                    ['Custom rings', 'Setting customization', 'Setting customization'],
                    ['Showrooms', 'No', 'Yes — 18+ US locations'],
                    ['Best for', 'Visual buyers, first-timers', 'Spec buyers, wide selection'],
                  ].map(([factor, ja, bn], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{factor}</td>
                      <td className="px-4 py-3 text-text-muted">{ja}</td>
                      <td className="px-4 py-3 text-text-muted">{bn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              <strong className="text-dark">Bottom line:</strong> If you want to see exactly what you&apos;re buying before committing, James Allen&apos;s 360° video is unmatched. If you&apos;re an experienced diamond buyer who evaluates by certificate specs, Blue Nile&apos;s larger inventory may surface better value.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">Rare Carat — When to Use a Diamond Aggregator</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Rare Carat is not a retailer — it&apos;s a search aggregator that indexes diamonds from 100+ vendors and uses AI to flag which stones are undervalued or overpriced for their quality grades.
            </p>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              For experienced buyers who know how to read a GIA certificate, Rare Carat can surface stones that James Allen or Blue Nile don&apos;t carry — or carry at a premium. The trade-off: you&apos;re buying through a third-party vendor, not directly from Rare Carat. Always verify the vendor&apos;s return policy and reviews before purchasing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Use Rare Carat if...', items: ['You\'re an experienced diamond buyer', 'You want to compare prices for identical specs', 'You want AI flagging for over-graded stones', 'You\'re open to buying from vendor marketplace'] },
                { title: 'Use James Allen or Blue Nile if...', items: ['You\'re buying your first diamond', 'You want one trusted retailer relationship', 'You want direct return/warranty coverage', 'You want 360° video on every stone (JA)'] },
              ].map(col => (
                <div key={col.title} className="bg-surface border border-border rounded-xl p-5">
                  <p className="font-medium text-dark text-sm mb-3">{col.title}</p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-text-muted">
                        <svg className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">Moissanite Engagement Rings — Charles & Colvard</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Charles & Colvard created moissanite in 1995 and remains the quality benchmark. Their Forever One and Caydia collections are graded for color consistency — something generic moissanite sellers skip. If you&apos;re buying moissanite, pay the premium for C&C over unbranded alternatives; the difference in long-term appearance is significant.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Forever One', detail: 'D-E-F colorless grade. Best for white gold and platinum settings.' },
                { label: 'Caydia', detail: 'Lab-grown for certified performance. Newer line with expanded cuts.' },
                { label: 'Generic Moissanite', detail: 'Lower cost but inconsistent color. May show yellow/green tinting over time.' },
              ].map(item => (
                <div key={item.label} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-2">{item.label}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">The 4Cs — What Actually Moves the Needle</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Most buyers have heard of the 4Cs (cut, color, clarity, carat). But the popular understanding is often wrong about which factors matter most at different price points.
            </p>
            <div className="space-y-3">
              {[
                {
                  c: 'Cut',
                  importance: 'Most important',
                  guidance: 'Always choose Excellent or Ideal cut. Cut determines how light moves through the diamond — a well-cut smaller diamond looks better and is worth more than a poorly cut larger stone. Never compromise on cut to save money.',
                },
                {
                  c: 'Color',
                  importance: 'Second most important',
                  guidance: 'G or H is the sweet spot — near-colorless to the naked eye but 15–25% less expensive than D-F. Below H (I, J) you may see warmth in larger stones. For moissanite in yellow gold, H-I color is fine. For white metals, stick to G+.',
                },
                {
                  c: 'Clarity',
                  importance: 'Often over-weighted',
                  guidance: 'VS2 or SI1 is typically eye-clean at 1ct — meaning inclusions are invisible without magnification. Most buyers over-spend on clarity. VVS or IF clarity is rarely worth the premium unless the diamond will be photographed professionally.',
                },
                {
                  c: 'Carat',
                  importance: 'Marketing-driven',
                  guidance: 'Carat measures weight, not visual size. A well-cut 0.9ct looks nearly identical to a 1.0ct on the hand — and costs 15–20% less (avoiding the price premium at round-number weights). Buy just below round numbers (0.9, 1.9, 2.9) for significant savings.',
                },
              ].map(item => (
                <div key={item.c} className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-dark text-sm">{item.c}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${item.importance === 'Most important' ? 'bg-accent/10 text-accent' : 'bg-surface border border-border text-text-muted'}`}>
                      {item.importance}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{item.guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">Investment Protection — What to Know Before You Buy</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Engagement rings are not investments in the financial sense — diamonds do not reliably appreciate in value. But you can protect your purchase:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Jewelry Insurance', body: 'Insure your ring through a specialist like Jewelers Mutual or Lavalier. Standard homeowners/renters insurance often caps jewelry coverage at $1,500. Dedicated jewelry insurance covers loss, theft, mysterious disappearance, and damage — typically 1–2% of appraised value per year.' },
                { title: 'GIA Appraisal', body: 'Get an independent appraisal from a GIA-certified gemologist after purchase. The GIA certificate documents the stone; the appraisal documents replacement cost for insurance purposes. These are different documents serving different functions.' },
                { title: 'Prong Inspection', body: 'Have a jeweler inspect prongs annually. Loose prongs are the primary cause of stone loss. Most retailers with lifetime warranties cover prong tightening — take advantage of it.' },
                { title: 'Avoid Cash-Back Resale Expectations', body: 'Natural diamonds typically resell at 20–50% of retail on the secondary market. Lab-grown diamonds resell for even less (wholesale prices have dropped 80%+ since 2020). Buy for love and sentiment, not asset appreciation.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-5">
                  <p className="font-medium text-dark text-sm mb-2">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTAs */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Shop James Allen', href: JA_LINK, note: 'Best 360° viewing', external: true },
              { label: 'Shop Blue Nile', href: BN_LINK, note: 'Best overall inventory', external: true },
              { label: 'Compare on Rare Carat', href: RC_LINK, note: 'Best price comparison', external: true },
            ].map(item => (
              <div key={item.label} className="flex flex-col gap-2">
                <a
                  href={item.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="block text-center bg-dark text-white rounded-xl py-3 text-sm font-semibold hover:bg-accent transition-colors duration-200"
                >
                  {item.label} →
                </a>
                <p className="text-center text-xs text-text-muted">{item.note}</p>
                <p className="text-center text-[10px] text-text-subtle">Affiliate link</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-6">Engagement Ring Buying Questions Answered</h3>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
