import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Charles & Colvard Discount Code — Save on Forever One Moissanite ${year}`,
    description: `Verified Charles & Colvard discount codes and affiliate deals for ${year}. Shop Forever One DEF colorless moissanite engagement rings, wedding bands, and fine jewelry.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/charles-and-colvard-discount-code/' },
    openGraph: {
      title: `Charles & Colvard Discount Code — Forever One Moissanite ${year}`,
      description: 'Shop Charles & Colvard with our verified affiliate link. Save on the original and finest Forever One moissanite jewelry.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: "How can I get a valid Charles and Colvard discount code?", a: "You can find valid Charles and Colvard discount codes directly on their official website, through trusted affiliate partners like us, or during special events such as their Black Friday Sale. We regularly update this page with the latest Charles and Colvard coupons, promo codes, and sitewide deals on Forever One Moissanite jewelry." },
  { q: "Does Charles and Colvard offer Black Friday sales?", a: "Yes, Charles and Colvard offers major Black Friday sales every year, often featuring sitewide discounts and exclusive coupon codes. Black Friday is one of the best times to shop for moissanite engagement rings, wedding bands, and fine jewelry at reduced prices." },
  { q: "What is Charles and Colvard Forever One Moissanite?", a: "Charles and Colvard Forever One Moissanite is their premium, near-colorless gemstone known for exceptional brilliance and ethical sourcing. Forever One Moissanite is a top choice for engagement rings, wedding bands, and fine jewelry because of its stunning appearance and long-lasting durability. It grades DEF (colorless) or GHI (near-colorless)." },
  { q: "Is Charles and Colvard legit?", a: "Yes, Charles and Colvard is a legitimate, trusted jewelry brand with decades of experience. They pioneered gem-quality moissanite and are known for their high-quality jewelry, transparent customer service, and reliable discount codes. Their Forever One Moissanite is one of the most respected options in the market today." },
  { q: "Where are Charles and Colvard locations?", a: "Charles and Colvard primarily operates online and does not have retail stores. However, you can find their moissanite jewelry at select authorized retailers across the U.S. Shopping online gives you access to the latest discount codes and the full Forever One Moissanite collection." },
  { q: "Can I stack multiple Charles and Colvard coupon codes?", a: "No, Charles and Colvard only allows one coupon code per order. It's best to use the highest available discount code to maximize your savings on moissanite jewelry." },
  { q: "Does Charles and Colvard offer free shipping?", a: "Yes, Charles and Colvard provides free shipping on all orders placed through their official website. This includes Forever One Moissanite engagement rings, wedding bands, and fine jewelry shipped both domestically and internationally." },
  { q: "How often are Charles and Colvard coupon codes updated?", a: "Charles and Colvard coupon codes are frequently updated, especially during seasonal events like Black Friday, Valentine's Day, and summer sales. Check this page regularly for the latest verified discount codes and coupons." },
  { q: "Does Charles and Colvard offer a warranty on their jewelry?", a: "Yes, all Charles and Colvard Forever One Moissanite jewelry comes with a limited lifetime warranty covering manufacturing defects. This warranty ensures your engagement rings, wedding bands, and fine jewelry are protected for years to come." },
  { q: "What types of jewelry can I buy with a Charles and Colvard discount code?", a: "You can use Charles and Colvard discount codes on a wide selection of moissanite jewelry, including engagement rings, wedding bands, earrings, necklaces, and bracelets. Some exclusions, such as the Signature Collection, may apply to specific promotions." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Charles & Colvard Discount Code', item: 'https://moissanitebyaurelia.com/charles-and-colvard-discount-code/' },
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

const CC_LINK = 'https://charlesandcolvard.sjv.io/YRmOWB'

export default function CharlesAndColvardDiscountCodePage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/charles-and-colvard-discount-code/',
    dateModified: iso,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Verified Affiliate Deal</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Charles &amp; Colvard Discount Code
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            The original and finest moissanite brand. Shop Forever One DEF colorless moissanite with our verified affiliate link — free shipping, lifetime warranty, and savings applied at checkout.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Deals updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Main Deal Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-surface border-2 border-accent/25 rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Live Affiliate Deal
              </span>
              <span className="text-[11px] text-green-700 font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Verified
              </span>
            </div>
            <div>
              <p className="font-serif text-2xl text-dark mb-2">Shop Forever One Moissanite</p>
              <p className="text-text-muted text-sm leading-relaxed">
                Access the full Charles &amp; Colvard collection through our affiliate link — DEF colorless and GHI near-colorless Forever One moissanite in every shape and size. Free shipping on all orders, limited lifetime warranty included, no promo code needed.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-border text-center">
              {[
                { label: 'Free Shipping', sub: 'All orders' },
                { label: 'Lifetime Warranty', sub: 'Manufacturing defects' },
                { label: 'GRA Certified', sub: 'Every stone' },
              ].map(item => (
                <div key={item.label}>
                  <p className="font-medium text-dark text-xs">{item.label}</p>
                  <p className="text-text-subtle text-[11px]">{item.sub}</p>
                </div>
              ))}
            </div>
            <a
              href={CC_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block text-center bg-dark text-white rounded-xl py-4 text-sm font-semibold hover:bg-accent transition-colors duration-200"
            >
              Shop Charles &amp; Colvard Forever One →
            </a>
            <p className="text-center text-[10px] text-text-subtle">Affiliate link — we may earn a commission at no extra cost to you</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Why Charles &amp; Colvard Is the Best Moissanite Brand</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Charles &amp; Colvard didn&apos;t just sell moissanite — they invented it as a gemstone. Founded in 1995, they held the original patent on gem-quality moissanite for years, and their manufacturing process remains the industry benchmark. When competitors&apos; patents expired and generic moissanite flooded the market, C&amp;C responded by launching Forever One — their premium colorless (DEF) line with tighter color grading than any competitor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Forever One DEF', body: 'Colorless grade. Faces up perfectly white in white gold or platinum settings. Indistinguishable from a D-color diamond to the naked eye.' },
                { title: 'Forever One GHI', body: 'Near-colorless grade. A slight warmth visible only under magnification. Pairs beautifully with yellow or rose gold — at a 15–25% lower price.' },
                { title: 'Refractive Index 2.65', body: 'Diamond is 2.42. Moissanite produces more fire and rainbow brilliance per facet — some buyers love this; others prefer the white sparkle of diamond.' },
                { title: 'Hardness 9.25', body: 'Second only to diamond (10 on the Mohs scale). Scratch-resistant, durable for everyday wear, and fully insurable.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Moissanite vs Diamond — {year} Cost Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Carat (eq.)</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">C&amp;C Forever One</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Natural Diamond</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Your Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['1.00 ct', '$400–$550', '$5,000–$8,000', '~90%'],
                    ['1.50 ct', '$600–$820', '$10,000–$18,000', '~94%'],
                    ['2.00 ct', '$900–$1,200', '$20,000–$35,000', '~96%'],
                    ['3.00 ct', '$1,400–$1,900', '$45,000–$80,000', '~97%'],
                  ].map(([carat, moi, dia, save], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{carat}</td>
                      <td className="px-4 py-3 text-text-muted">{moi}</td>
                      <td className="px-4 py-3 text-text-muted">{dia}</td>
                      <td className="px-4 py-3 text-accent font-semibold">{save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs mt-2">Diamond prices are approximate retail for GIA-certified G/VS2 round brilliant.</p>
          </section>

          <div className="text-center">
            <a
              href={CC_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dark text-white rounded-xl px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors duration-200"
            >
              Shop Charles &amp; Colvard →
            </a>
            <p className="text-center text-[10px] text-text-subtle mt-2">Affiliate link — no extra cost to you</p>
          </div>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Charles &amp; Colvard Discount Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
