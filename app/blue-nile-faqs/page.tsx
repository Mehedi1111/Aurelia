import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import Link from 'next/link'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Blue Nile FAQs ${year} — Is Blue Nile Legit? Returns, Reviews & More`,
    description: `Answers to the most common Blue Nile questions for ${year}: Is Blue Nile legit? What is their return policy? How does Blue Nile compare to James Allen and Tiffany? Full FAQ.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/blue-nile-faqs/' },
    openGraph: {
      title: `Blue Nile FAQs ${year} — Legitimacy, Returns, and Comparisons`,
      description: 'Is Blue Nile legit? Return policy, shipping, ownership, and how it compares to James Allen, Tiffany, Kay, and Zales.',
      type: 'website',
    },
  }
}

const FAQ_TRUST = [
  { q: 'Is Blue Nile a legitimate company?', a: 'Yes, Blue Nile is a fully legitimate and well-established jewelry retailer. Founded in 1999, Blue Nile was one of the first online diamond retailers and remains one of the most trusted. They are accredited by the Better Business Bureau (BBB) with an A+ rating, offer GIA-certified diamonds, and have served millions of customers worldwide. Blue Nile was publicly traded on NASDAQ (NILE) before being taken private in 2017.' },
  { q: 'What is Blue Nile\'s return policy?', a: 'Blue Nile offers a 30-day return policy on all purchases. Returns are free — Blue Nile provides a prepaid, fully insured shipping label for returns. Items must be in their original, unworn condition. Custom engraving may affect return eligibility. Wedding bands and rings that have been sized may have different return terms. Contact their customer service team for specific situations.' },
  { q: 'Is Blue Nile reputable for diamonds?', a: 'Blue Nile is one of the most reputable online diamond retailers in the world. They only sell GIA-certified natural diamonds and IGI-certified lab-grown diamonds — the two most respected diamond certification bodies. Their pricing is transparent, their certification is verifiable, and they have a 25+ year track record of customer service. Consumer Reports, The New York Times Wirecutter, and other major publications consistently recommend Blue Nile.' },
  { q: 'Does Blue Nile sell real diamonds?', a: 'Yes, Blue Nile sells real, genuine natural diamonds certified by GIA (Gemological Institute of America). Every natural diamond in their inventory comes with a GIA certificate that can be verified online using the certificate number. They also sell IGI-certified lab-grown diamonds — which are chemically and optically identical to natural diamonds, grown in a controlled environment rather than mined.' },
  { q: 'Is Blue Nile safe for buying an engagement ring?', a: 'Yes — Blue Nile is one of the safest places to buy an engagement ring online. Their diamonds are independently certified by GIA, their website uses secure SSL encryption, and they offer full refund returns within 30 days. Shipping is free, fully insured, and requires a signature. Millions of engagement rings have been purchased through Blue Nile since 1999. Their customer service team includes trained gemologists available by phone or chat.' },
  { q: 'Who owns Blue Nile?', a: 'Blue Nile is currently owned by Signet Jewelers, the world\'s largest retailer of diamond jewelry. Signet acquired Blue Nile in 2022 for approximately $490 million. Signet also owns Kay Jewelers, Zales, Jared, and Peoples Jewellers. Despite the acquisition, Blue Nile continues to operate as a distinct brand with its own pricing, policies, and online-first model.' },
  { q: 'What happened to Blue Nile?', a: 'Blue Nile was founded in 1999 and went public in 2004. After years as an independent public company, Blue Nile was taken private in 2017 by Bain Capital and Bow Street. In 2022, Signet Jewelers acquired Blue Nile for $490 million. The brand continues to operate under the Blue Nile name as part of Signet\'s portfolio, which also includes Kay Jewelers and Zales.' },
  { q: 'How fast does Blue Nile ship?', a: 'Blue Nile\'s shipping times vary by order type. Standard loose diamonds and in-stock settings typically ship within 1–3 business days. Complete ring orders (setting + stone assembled) can take 7–10 business days. Rush processing is available for some orders. All shipments are fully insured and require a signature upon delivery. Free shipping is included on all orders.' },
  { q: 'Can I return a Blue Nile ring to a physical store?', a: 'Blue Nile operates a small number of physical showrooms in select US cities, but their primary model is online. In-store returns are not guaranteed at showroom locations — returns should be processed through their standard mail-in return process with the prepaid label they provide. Contact Blue Nile customer service to confirm if in-store return is available at a specific location.' },
  { q: 'Is it safe to buy diamonds online from Blue Nile?', a: 'Yes — Blue Nile\'s online purchasing process is safe and secure. They use industry-standard SSL encryption for all transactions. Payments are processed through secure gateways with fraud protection. All shipped items are fully insured for the declared value. Their 30-day return policy provides a safety net if anything isn\'t right. GIA certification on every diamond means you know exactly what you\'re purchasing before it arrives.' },
]

const FAQ_COMPARE = [
  { q: 'How does Blue Nile compare to James Allen?', a: 'Blue Nile and James Allen are the two dominant online diamond retailers and are comparable in most areas. The key difference is visualization: James Allen has superior 360° HD video imaging on every diamond, making it easier to evaluate a stone before purchasing. Blue Nile has a slightly larger loose diamond inventory and has been in business longer (1999 vs 2006). For pricing, they are very similar on equivalent GIA-certified stones. James Allen is often recommended for first-time buyers due to the video inspection capability; Blue Nile for experienced buyers who know what quality grades to specify.' },
  { q: 'Which is better for engagement rings — Blue Nile or James Allen?', a: 'For first-time buyers, James Allen is generally the better choice because their 360° HD diamond video lets you see every inclusion and every facet before committing. For experienced buyers who already know how to evaluate GIA certificates, Blue Nile\'s wider selection may surface better value. Both offer equivalent return policies, certification standards, and pricing. The right choice depends on how much you rely on visual inspection vs. spec-based buying.' },
  { q: 'Are Blue Nile and James Allen the same company?', a: 'No, Blue Nile and James Allen are entirely separate companies. Blue Nile is owned by Signet Jewelers (which also owns Kay Jewelers and Zales). James Allen was acquired by Signet Jewelers in 2017. So while they are both now owned by the same parent company (Signet), they operate as distinct brands with separate websites, pricing, inventory, and customer service teams.' },
  { q: 'How does Blue Nile compare to Tiffany & Co?', a: 'Blue Nile and Tiffany & Co serve different markets. Tiffany is a luxury brand selling a status symbol alongside the diamond — their pricing includes significant brand premium. Blue Nile focuses on certified diamond value without brand markup. For equivalent GIA-certified diamonds (same cut, color, clarity, carat), Blue Nile will typically be 40–60% less expensive than Tiffany. If the Tiffany brand and in-store experience are important to you, the premium may be worth it. For pure diamond value, Blue Nile wins.' },
  { q: 'Is Blue Nile better than Kay Jewelers?', a: 'For diamond engagement rings, Blue Nile is generally the better choice over Kay Jewelers. Blue Nile sells GIA-certified diamonds with transparent grading — you can verify exactly what you\'re buying. Kay Jewelers sells many diamonds with in-house grading reports that use more flexible standards than GIA. Blue Nile also typically offers better pricing on equivalent quality. Kay\'s advantage is physical store presence and the ability to see rings in person, but their diamond quality standards are lower than Blue Nile or James Allen.' },
  { q: 'Does Kay Jewelers own Blue Nile?', a: 'No, Kay Jewelers does not own Blue Nile — but they share a parent company. Both Kay Jewelers and Blue Nile are owned by Signet Jewelers. Signet acquired Blue Nile in 2022 for approximately $490 million. Kay Jewelers, Zales, Jared, and Blue Nile are all separate brands under the Signet umbrella, but operate independently with their own pricing, inventory, and policies.' },
  { q: 'Is Blue Nile better than Zales?', a: 'For diamond quality and certification, Blue Nile is generally superior to Zales. Blue Nile requires GIA certification on natural diamonds; Zales uses a mix of GIA-certified and in-house graded stones. Blue Nile\'s online model allows for more transparent pricing and a larger selection. Zales offers physical retail locations and the ability to see jewelry in person, which some buyers prefer. For the best-certified diamond value, Blue Nile wins. For in-store experience or budget fashion jewelry, Zales is more accessible.' },
  { q: 'Does Zales own Blue Nile?', a: 'No, Zales does not own Blue Nile — but they share the same parent company. Both Zales and Blue Nile are owned by Signet Jewelers. Signet is the world\'s largest diamond jewelry retailer and owns multiple brands including Kay Jewelers, Zales, Jared, Blue Nile, and Peoples Jewellers. Each brand operates separately with its own business model and customer base.' },
  { q: 'Is Blue Nile cheaper than other diamond retailers?', a: 'Blue Nile is consistently among the most competitively priced major diamond retailers for GIA-certified natural diamonds. Their online-only model (no retail overhead) allows them to pass savings to buyers. On equivalent GIA-certified diamonds, Blue Nile typically beats Tiffany by 40–60%, Kay and Zales by 20–40%, and competes closely with James Allen and Rare Carat. The best way to compare is to use a specific GIA report number across multiple retailers — the stone is identical, only the price differs.' },
]

export default function BlueNileFaqsPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()

  const ALL_FAQ = [...FAQ_TRUST, ...FAQ_COMPARE]

  const SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
        { '@type': 'ListItem', position: 2, name: 'Blue Nile FAQs', item: 'https://moissanitebyaurelia.com/blue-nile-faqs/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ALL_FAQ.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: 'https://moissanitebyaurelia.com/blue-nile-faqs/',
      dateModified: iso,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Complete FAQ Guide</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Blue Nile FAQs
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Every common question about Blue Nile answered — legitimacy, return policy, ownership, shipping, and how they compare to James Allen, Tiffany, Kay, and Zales.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        <div className="max-w-3xl mx-auto space-y-12">

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '1999', label: 'Founded' },
              { value: 'GIA', label: 'Diamond Cert' },
              { value: '30 Days', label: 'Return Window' },
              { value: 'Signet', label: 'Parent Company' },
            ].map(s => (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="font-serif text-xl text-accent mb-1">{s.value}</p>
                <p className="text-xs text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Trust & legitimacy FAQs */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <h2 className="font-serif text-2xl text-dark whitespace-nowrap">Is Blue Nile Legit?</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Blue Nile has operated for 25+ years, served millions of customers, and consistently earns top marks from independent consumer publications. Here&apos;s everything you need to know about their legitimacy, policies, and reputation.
            </p>
            <FaqAccordion items={FAQ_TRUST} />
          </section>

          {/* Ownership note */}
          <section className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-serif text-xl text-dark mb-3">Blue Nile & Signet — What the Acquisition Means for Buyers</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              Signet Jewelers acquired Blue Nile in 2022 — making them the parent company of both Blue Nile and Kay Jewelers. This raised concerns among some buyers about whether Blue Nile would shift toward Kay&apos;s lower certification standards.
            </p>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              Post-acquisition, Blue Nile has maintained their GIA-certification requirement on natural diamonds and their online-first pricing model. The brands operate separately. Blue Nile&apos;s pricing, return policy, and certification standards have remained consistent with their pre-acquisition model.
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              Our recommendation: verify GIA certificate numbers on the{' '}
              <a href="https://www.gia.edu/report-check" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-dark transition-colors">GIA website</a>
              {' '}for any natural diamond purchase, regardless of retailer. This is independent of who owns the store.
            </p>
          </section>

          {/* Comparison FAQs */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <h2 className="font-serif text-2xl text-dark whitespace-nowrap">Blue Nile vs Other Retailers</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              How Blue Nile stacks up against James Allen, Tiffany, Kay Jewelers, and Zales — including the ownership relationships buyers often ask about.
            </p>
            <FaqAccordion items={FAQ_COMPARE} />
          </section>

          {/* Bottom CTA */}
          <section className="bg-surface border border-border rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl text-dark mb-3">Compare Blue Nile vs James Allen</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Our in-depth retailer review covers diamond selection, pricing, imaging, policies, and which retailer fits which buyer best.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/category/blue-nile-jewelry-reviews-guide/" className="inline-flex items-center justify-center gap-2 bg-dark text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors duration-200">
                Blue Nile Review →
              </Link>
              <Link href="/james-allen-review/" className="inline-flex items-center justify-center gap-2 bg-surface border-2 border-accent text-dark rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-white transition-colors duration-200">
                James Allen Review →
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
