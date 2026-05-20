import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `James Allen Promotional Code & Coupons — Verified Deals ${year}`,
    description: `Verified James Allen promo codes and affiliate deals for ${year}. Shop GIA-certified diamonds, lab-grown diamonds, and fine jewelry with 360° HD videos — savings applied at checkout through our affiliate links.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/james-allen-promotional-code/' },
    openGraph: {
      title: `James Allen Promotional Code — Verified Deals ${year}`,
      description: 'Shop James Allen with our verified affiliate links. GIA-certified diamonds, 360° HD views, lab-grown diamonds, and moissanite — discounts applied automatically at checkout.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: 'What types of promotions does James Allen offer?', a: 'James Allen frequently runs promotional events including sitewide percentage discounts, flash sales on specific categories, and seasonal events like their Black Friday Sale, Valentine\'s Day promotions, and summer sales. They also offer a first-time buyer discount when you sign up for their email newsletter. Their promotional codes typically apply across engagement ring settings, lab-grown diamonds, and fine jewelry collections.' },
  { q: 'Does James Allen offer a first-time buyer discount?', a: 'Yes, James Allen typically offers a discount to new customers who sign up for their email newsletter. This provides a promotional code that can be applied to your first purchase — an excellent opportunity to save on a diamond or engagement ring setting. Check their website or our affiliate link for the current new customer offer.' },
  { q: 'What makes James Allen\'s 360° HD videos special?', a: 'James Allen was the pioneer of 360° diamond video technology. Every single diamond in their inventory is photographed with high-definition video that lets you rotate and inspect the stone from every angle before purchasing. This gives you the same information as seeing a diamond in person — and in some cases, better visibility than a brick-and-mortar store. It\'s the single most important buying tool in online diamond retail.' },
  { q: 'Can I stack multiple James Allen promotional codes?', a: 'No, James Allen only allows one promotional code per order. To maximize your savings, use the highest available discount and apply it at checkout. Our affiliate links are designed to ensure the best available deal is recognized when you click through, with no expired code frustration.' },
  { q: 'Does James Allen offer free shipping?', a: 'Yes, James Allen provides free shipping on all orders placed through their website. This includes GIA-certified diamonds, lab-grown diamonds, engagement ring settings, and fine jewelry. Free insured return shipping is also included on their standard 30-day return policy.' },
  { q: 'What is the James Allen return policy?', a: 'James Allen offers a 30-day return policy on all orders. If you\'re not completely satisfied with your purchase, you can return it within 30 days for a full refund. They provide free, fully insured return shipping — making online diamond buying genuinely risk-free. Custom engraving or resizing may affect return eligibility.' },
  { q: 'Does James Allen sell lab-grown diamonds?', a: 'Yes, James Allen offers a full selection of IGI-certified lab-grown diamonds alongside their natural GIA-certified inventory. Lab-grown diamonds are chemically and optically identical to natural diamonds, but cost 60–80% less. You get the same 360° HD inspection for every lab-grown stone, making it easy to find the perfect balance of size, quality, and budget.' },
  { q: 'How do James Allen prices compare to local jewelers?', a: 'James Allen typically offers prices 20–40% lower than traditional brick-and-mortar jewelry stores on equivalent GIA-certified diamonds. This is because they operate online without the overhead of physical retail. Their business model passes those savings directly to buyers. For lab-grown diamonds, the savings compared to local retailers can be even more significant — often 50% or more.' },
  { q: 'What ring settings can I customize at James Allen?', a: 'James Allen offers an extensive range of ring settings across all styles — solitaire, halo, three-stone, pavé, channel-set, and more. All settings are available in 14k or 18k white gold, yellow gold, rose gold, and platinum. You can mix any setting with any diamond or moissanite stone, and add engraving for personalization. Their 360° ring preview shows exactly how your chosen stone will look in any setting.' },
  { q: 'Does James Allen offer a warranty on their jewelry?', a: 'Yes, James Allen provides a lifetime warranty on all engagement rings and wedding bands that covers manufacturing defects, prong tightening, re-plating, and cleaning. For diamonds, they provide full GIA or IGI certification which permanently documents the stone\'s quality. This warranty ensures your purchase is protected for years to come.' },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'James Allen Promotional Code', item: 'https://moissanitebyaurelia.com/james-allen-promotional-code/' },
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
]

const JA_LINK = 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home'
const JA_DEALS = 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=deal'
const JA_LAB   = 'https://www.jamesallen.com/loose-diamonds/lab-grown-diamonds/?a_aid=66fc3592af524&a_cid=dfef9309&chan=lab'

const DEALS = [
  {
    tag: 'Sitewide Deal',
    title: 'Shop James Allen — Best Available Price',
    desc: 'Click through our affiliate link for the best currently available James Allen promotional offer. GIA-certified diamonds, lab-grown diamonds, and engagement ring settings — savings applied automatically at checkout.',
    cta: 'Shop James Allen Now',
    href: JA_DEALS,
    primary: true,
  },
  {
    tag: 'Lab-Grown Diamonds',
    title: 'Lab-Grown Diamond Sale — 60–80% Off Natural',
    desc: 'Shop James Allen\'s full selection of IGI-certified lab-grown diamonds with 360° HD inspection on every stone. Same cut, color, clarity — fraction of the price. No promo code needed through our link.',
    cta: 'Shop Lab-Grown Diamonds',
    href: JA_LAB,
    primary: false,
  },
]

export default function JamesAllenPromoCodePage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/james-allen-promotional-code/',
    dateModified: iso,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Verified Affiliate Deals</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            James Allen Promotional Code
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Skip the expired codes. Every link below is a live affiliate deal — click through and savings are applied automatically at checkout. The most trusted name in 360° diamond visualization.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Deals updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Deal Cards */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {DEALS.map(deal => (
            <div key={deal.title} className="flex flex-col bg-surface border-2 border-accent/25 rounded-2xl p-6 gap-4">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {deal.tag}
                </span>
                <span className="text-[11px] text-green-700 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Verified
                </span>
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg text-dark mb-2">{deal.title}</p>
                <p className="text-text-muted text-sm leading-relaxed">{deal.desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={deal.href}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className={`block text-center rounded-xl py-3 text-sm font-semibold transition-colors duration-200 ${deal.primary ? 'bg-dark text-white hover:bg-accent' : 'bg-accent text-white hover:bg-dark'}`}
                >
                  {deal.cta} →
                </a>
                <p className="text-center text-[10px] text-text-subtle">Affiliate link — no extra cost to you</p>
              </div>
            </div>
          ))}
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Why James Allen Leads Online Diamond Retail</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              James Allen pioneered 360° HD diamond video in 2010 — and the entire industry has been trying to catch up ever since. Their proprietary imaging technology photographs every diamond in their inventory with close-up video that lets you inspect a stone&apos;s cut quality, inclusions, and brilliance as clearly as you could in person. For a purchase as significant as a diamond, that level of transparency is everything.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: '360° HD Diamond View', body: 'Every diamond — natural and lab-grown — comes with a high-definition 360° video. You can see exactly how light plays through the facets, identify inclusions, and verify cut quality before committing.' },
                { title: 'GIA & IGI Certified Only', body: 'Natural diamonds carry GIA certificates, the industry gold standard. Lab-grown diamonds carry IGI certificates. Every stone is independently graded — you get a permanent record of exactly what you\'re buying.' },
                { title: '30-Day Free Returns', body: 'Risk-free shopping with free insured return shipping. If the ring isn\'t right — wrong size, different expectations, or simply changed your mind — James Allen handles the return seamlessly.' },
                { title: 'No Promo Code Needed', body: 'Our affiliate links automatically surface the best available deal at checkout. Click through and the discount is recognized — no hunting for a code that expired weeks ago.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">James Allen {year} Buying Guide — Natural vs Lab-Grown</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Factor</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Natural Diamond</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Lab-Grown Diamond</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Price (1ct G/VS2)', '$4,500–$8,000', '$600–$1,500'],
                    ['Certification', 'GIA', 'IGI'],
                    ['Chemical Composition', 'Identical', 'Identical'],
                    ['Appearance', 'Identical to naked eye', 'Identical to naked eye'],
                    ['Resale Value', 'Holds value better', 'Depreciates faster'],
                    ['Best For', 'Heirloom, investment', 'Maximum size & budget'],
                  ].map(([factor, nat, lab], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{factor}</td>
                      <td className="px-4 py-3 text-text-muted">{nat}</td>
                      <td className="px-4 py-3 text-accent font-medium">{lab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs mt-2">Prices are approximate retail for round brilliant, {year} market data.</p>
          </section>

          <div className="text-center">
            <a
              href={JA_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dark text-white rounded-xl px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors duration-200"
            >
              Shop James Allen →
            </a>
            <p className="text-center text-[10px] text-text-subtle mt-2">Affiliate link — no extra cost to you</p>
          </div>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">James Allen Promo Code Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
