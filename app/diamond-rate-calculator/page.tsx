import type { Metadata } from 'next'
import DiamondRateCalculator from '@/components/calculators/DiamondRateCalculator'

export const metadata: Metadata = {
  title: "Diamond Rate Calculator — Fair Price Estimate [2026]",
  description: "Free diamond rate calculator. Enter carat, color, clarity, and shape for an instant fair price estimate, per-carat value, and 30-day market trend. Covers natural and lab-grown diamonds.",
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-rate-calculator/' },
  openGraph: {
    title: 'Diamond Rate Calculator — What Should I Pay in 2026?',
    description: 'Get an accurate fair market price for any natural or lab-grown diamond. See price ranges, per-carat value, and 30-day trend data instantly.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "What is a diamond price calculator?", a: "A diamond price calculator estimates a stone's fair market value based on carat, color, clarity, and shape using standardized industry pricing models. It gives buyers and sellers a reality check against inflated retail prices before any transaction." },
  { q: "How accurate is a diamond value calculator?", a: "Our calculator uses industry-standard GIA-based pricing models for high accuracy. That said, actual transaction prices vary based on real-time market conditions, specific retailer inventory, and whether you're buying or selling. Use it as a fair-range benchmark, not a final quote." },
  { q: "Can I use this calculator for lab-grown diamonds?", a: "Yes — select 'Lab-Grown Diamond' to apply a separate pricing index. Lab diamonds typically cost 70–80% less than natural diamonds of the same specifications, and their prices have been falling at double-digit annual rates since 2022." },
  { q: "What is a fair price for a 1-carat diamond in 2026?", a: "A 1-carat round natural diamond in G color and VS2 clarity sells for approximately $4,500–6,500 at reputable online retailers. Lab-grown equivalents of the same specs run $1,000–1,800. Mall jewelers often charge 30–50% above these benchmarks." },
  { q: "How does diamond shape affect price?", a: "Round brilliant diamonds command a 10–25% premium over fancy shapes because of higher rough diamond waste during cutting (sometimes 50% of the rough is lost). Fancy shapes like oval, cushion, and pear offer more visual size per dollar." },
  { q: "What factors affect diamond prices most?", a: "Carat weight has the most dramatic effect — prices rise exponentially, not linearly. A 2-carat diamond isn't twice the price of a 1-carat; it's often 4–5x more. After carat, cut quality, color grade, and clarity are the primary drivers." },
  { q: "Should I buy a diamond online or in-store?", a: "Online retailers like Blue Nile and James Allen typically offer 20–40% lower prices than brick-and-mortar stores due to lower overhead. They sell GIA-certified diamonds with high-resolution imagery. For first-time buyers, the 360° HD video at James Allen makes comparison extremely easy." },
  { q: "What is the 30-day price trend in this calculator?", a: "The 30-day trend reflects the average directional movement of diamond prices in the primary market segment. Natural diamond prices have remained relatively stable in 2026, while lab-grown prices continue to fall as manufacturing efficiency improves." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Diamond Rate Calculator', item: 'https://moissanitebyaurelia.com/diamond-rate-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Diamond Rate Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Free diamond price calculator providing fair market price estimates, per-carat value, and 30-day trend data for natural and lab-grown diamonds.',
    url: 'https://moissanitebyaurelia.com/diamond-rate-calculator/',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Mehedi Hasan', url: 'https://moissanitebyaurelia.com' },
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

export default function DiamondRateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Rate Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Get an instant fair price estimate for any natural or lab-grown diamond before you buy or sell — see the market range, per-carat value, and 30-day price trend in seconds.
          </p>
        </header>

        <DiamondRateCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">How to Use the Diamond Rate Calculator</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Origin and Shape', body: 'Choose natural or lab-grown, then select your diamond\'s shape. Round brilliant stones command the highest per-carat prices; fancy shapes like oval, pear, and marquise offer 15–25% more visual size per dollar.' },
                { step: '2', title: 'Input Carat, Color & Clarity', body: 'Enter the carat weight using the slider, then select your color grade (D–M) and clarity (FL–I2). The sweet spot for value is G–H color and VS2–SI1 clarity — eye-clean and significantly less expensive than D-FL stones.' },
                { step: '3', title: 'Get Your Price Estimate', body: 'Click "Get Fair Price Estimate" to see the fair market price, the expected range, per-carat value, and the 30-day market trend. Use the shopping links to verify against live retailer inventory.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-dark text-white text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">{item.step}</div>
                  <div>
                    <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                    <p className="text-text-muted text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Benefits of Using a Diamond Price Calculator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Save Money on Purchases', body: 'Avoid overpaying by comparing your estimated fair price against dealer quotes. Most buyers who negotiate with price data in hand save 10–20% vs. those who walk in without benchmarks.' },
                { title: 'Maximize Resale Value', body: 'If you\'re selling, knowing the fair market price prevents you from accepting lowball offers. Use this alongside the Diamond Resale Calculator to set a realistic floor price for negotiations.' },
                { title: 'Insure with Confidence', body: 'Protect your investment with accurate appraisals. Knowing market value helps you verify that your insurance appraisal isn\'t more than 50% above what you could actually replace the stone for.' },
                { title: 'Understand Diamond Quality', body: 'See exactly how each of the 4Cs moves the price needle. This builds the intuition needed to spot great-value stones that are priced below their optical quality.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The Smart Buyer's Sweet Spot Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">The Smart Buyer&apos;s Value Sweet Spot</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">Where to prioritize spending — and where to save — across the 4Cs:</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">The &ldquo;C&rdquo;</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Marketing Trap (Overpay)</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Value Sweet Spot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Cut', 'Good / Very Good', 'Excellent / Ideal — never compromise here'],
                    ['Clarity', 'Flawless / VVS1', 'VS2 / SI1 — eye-clean, 30–40% less'],
                    ['Color', 'D / E', 'G / H — faces up white in white gold/platinum'],
                    ['Carat', '1.00 ct / 2.00 ct exactly', '0.92 ct or 1.88 ct — same look, 15–20% less'],
                  ].map(([c, trap, sweet], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{c}</td>
                      <td className="px-4 py-3 text-text-muted">{trap}</td>
                      <td className="px-4 py-3 text-accent font-medium">{sweet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Diamond Pricing Questions Answered</h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-border pb-4">
                  <p className="font-medium text-dark text-sm mb-1.5">{item.q}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

        </article>
      </div>
    </>
  )
}
