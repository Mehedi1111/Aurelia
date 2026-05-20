import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Blue Nile Promo Code & Coupons — Verified Deals ${year}`,
    description: `Verified Blue Nile promo codes and affiliate deals for ${year}. Shop clearance diamonds, engagement rings, and today's jewelry deals with our direct affiliate links — no expired codes.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/blue-nile-promo-code/' },
    openGraph: {
      title: `Blue Nile Promo Code — Clearance & Today's Deals ${year}`,
      description: 'Shop verified Blue Nile deals directly through our affiliate links. Clearance sale and daily jewelry deals available now.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: "What types of promotions does Blue Nile offer?", a: "Blue Nile frequently offers a variety of promotional deals to help you save on fine jewelry. These include sitewide discounts, specific promo codes for a percentage or dollar amount off, and sales on categories like engagement ring settings, lab-grown diamond jewelry, or wedding bands. They also run seasonal sales during major holidays and have a dedicated Clearance section with deeply discounted items." },
  { q: "Do Blue Nile's discount codes apply to all jewelry categories?", a: "Most Blue Nile discount codes are valid across a wide range of their jewelry, but there are often exclusions. Promotions typically apply to select items and may not be valid for loose diamonds, designer collections, or certain custom jewelry. Check the specific terms and conditions of each promotion to ensure your chosen item is eligible." },
  { q: "How do I find the best Blue Nile sales?", a: "The best way to find the most valuable Blue Nile deals is to stay informed. Subscribe to their email and SMS lists for exclusive offers. Regularly check their website's Deals or Sale sections. Additionally, following trusted affiliate sites like ours provides you with the latest verified deals as soon as they become available — without expired codes." },
  { q: "Can I combine a financing plan with a Blue Nile coupon?", a: "No, generally you cannot combine a Blue Nile promotional code with a financing offer. Blue Nile's policies state that offers cannot be stacked. You must choose between a discount code and special financing terms. For large purchases like an engagement ring, calculate which option provides greater overall savings." },
  { q: "Does Blue Nile offer a first-time buyer discount?", a: "Yes, Blue Nile often provides a first-time buyer discount to new customers. The most common offer is a discount for signing up for their email newsletter, which grants you a special Blue Nile discount code for your first purchase — an excellent way to save on items like diamond stud earrings or a solitaire pendant." },
  { q: "Are there special promotions for holidays like Black Friday or Valentine's Day?", a: "Absolutely. Blue Nile runs some of its most significant promotions during major holidays. Black Friday and Cyber Monday are particularly known for deep discounts on a wide range of jewelry. Similarly, sales are common around Valentine's Day, Mother's Day, and the winter holiday season — offering a perfect opportunity to purchase stunning jewelry at reduced prices." },
  { q: "Is it possible to apply a promo code after my purchase is complete?", a: "No. Blue Nile promo codes must be applied at the time of checkout. Once your order has been placed and payment processed, you cannot retroactively apply a discount code. This is why it's important to have your verified coupon ready before completing your purchase." },
  { q: "How can I be notified about new Blue Nile deals and special offers?", a: "The most reliable method is by joining their mailing list. When you subscribe, you'll receive notifications about new promotions, sales, and exclusive discounts directly in your inbox. You can also bookmark this page, which is dedicated to tracking and verifying the latest Blue Nile deals." },
  { q: "What's the best way to get the most value when buying a diamond from Blue Nile?", a: "Focus on the 4Cs — Cut, Color, Clarity, Carat. Prioritize diamond cut above all else, as it is the most important factor in brilliance and sparkle. You can save significantly by choosing a G–H color and VS2–SI1 clarity diamond that is eye-clean. This strategy allows you to get a larger carat weight or a higher-quality setting for your budget." },
  { q: "Do Blue Nile's promotions change frequently?", a: "Yes, Blue Nile promotions are dynamic and change often. They offer new deals weekly or even daily, especially on select jewelry. Major sitewide sales are tied to holidays, but smaller limited-time offers are common throughout the year. If you see a great deal on a specific item, act quickly before it expires." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Blue Nile Promo Code', item: 'https://moissanitebyaurelia.com/blue-nile-promo-code/' },
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

const DEALS = [
  {
    tag: 'Clearance Sale',
    title: 'Clear the Vault — Up to 40% Off',
    desc: 'Shop clearance engagement rings, loose diamonds, and fine jewelry at deeply reduced prices. Limited stock — savings applied automatically at checkout.',
    cta: 'Shop Clear the Vault',
    href: 'https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=deal',
    primary: true,
  },
  {
    tag: "Today's Deals",
    title: "Mother's Day Jewelry Deals",
    desc: 'Special savings on necklaces, earrings, bracelets, and gemstone jewelry — perfect for gifting. New deals added daily with no promo code needed.',
    cta: "Shop Today's Deals",
    href: 'https://www.bluenile.com/jewelry/todays-jewelry-deals?a_aid=66fc3592af524&a_cid=55e51e63&chan=Jewelry_Coupon',
    primary: false,
  },
]

export default function BlueNilePromoCodePage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/blue-nile-promo-code/',
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
            Blue Nile Promo Code & Coupons
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Skip the expired codes. Every link below is a live affiliate deal — click through and savings are applied automatically at checkout. Updated {monthYear}.
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
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
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
            <h2 className="font-serif text-2xl text-dark mb-4">Why Blue Nile Is the Smart Choice for Diamonds</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Founded in 1999, Blue Nile is one of the world&apos;s largest online diamond retailers — publicly traded, GIA-certified inventory only, with over 25 years of customer trust. Their business model cuts out the mall markup: you pay for the diamond, not the storefront. That means 20–40% lower prices on the same GIA-certified stones you&apos;d find in a brick-and-mortar store.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'GIA Certified Only', body: 'Every diamond comes with a GIA grading report — the industry gold standard. You can verify the exact stone you\'re buying using the GIA report number.' },
                { title: '30-Day Returns', body: 'Risk-free shopping. If it\'s not right, return it within 30 days for a full refund. Free insured shipping both ways.' },
                { title: 'Clearance Vault', body: 'Blue Nile regularly discounts overstocked and seasonal pieces by up to 40%. The Clearance section refreshes frequently — check it often.' },
                { title: 'No Promo Code Needed', body: 'Our affiliate links automatically apply the best available deal at checkout. No hunting for codes that may have expired.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Blue Nile {year} Buying Guide — Get the Most for Your Budget</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">The &ldquo;C&rdquo;</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Marketing Trap</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Smart Buy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Cut', 'Good / Very Good', 'Excellent / Ideal — never compromise'],
                    ['Clarity', 'Flawless / VVS1', 'VS2 / SI1 — eye-clean, 30–40% less'],
                    ['Color', 'D / E', 'G / H — faces up white in platinum'],
                    ['Carat', '1.00ct / 2.00ct exactly', '0.92ct or 1.88ct — same look, 15–20% less'],
                  ].map(([c, trap, smart], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{c}</td>
                      <td className="px-4 py-3 text-text-muted">{trap}</td>
                      <td className="px-4 py-3 text-accent font-medium">{smart}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Blue Nile Coupon Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
