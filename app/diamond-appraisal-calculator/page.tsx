import type { Metadata } from 'next'
import DiamondAppraisalCalculator from '@/components/calculators/DiamondAppraisalCalculator'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Diamond Appraisal Calculator — What Is My Diamond Worth? [2026]",
  description: "Free diamond appraisal calculator. Enter carat, color, clarity, cut and get instant market value, insurance replacement cost, and resale estimates. GIA-based pricing.",
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-appraisal-calculator/' },
  openGraph: {
    title: 'Diamond Appraisal Calculator — Market, Insurance & Resale Value',
    description: 'Instantly estimate your diamond\'s true market value, insurance replacement cost, and cash resale value based on current GIA marketplace indices.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "Is a free online diamond appraisal calculator accurate?", a: "An online diamond appraisal is highly accurate for establishing fair market price and insurance replacement cost based on current GIA inventory data, but it cannot substitute for physical inspection to verify stone health variables like microscopic chips or light leakage. A digital tool determines value based on the 4Cs, but a physical appraiser is required to confirm the stone's integrity." },
  { q: "What is the difference between a retail appraisal and resale value?", a: "The main difference is the Markup Margin: a retail appraisal reflects the Full Replacement Value including jeweler overhead and profit (often 100% higher than cost), while resale value reflects the Liquid Cash Value — what a wholesaler will pay on the spot. Appraisals are insurance documents, not a reflection of what you could actually sell the stone for today." },
  { q: "Why is my diamond ring appraised for much more than I paid?", a: "This is a standard industry practice designed to provide an Insurance Buffer, allowing for inflation and precious metal market volatility. Retailers provide feel-good appraisals, but the primary purpose is for your insurance provider to calculate monthly premiums based on the highest possible replacement cost." },
  { q: "Will a pawn shop or jeweler pay the price listed on my appraisal?", a: "No. Pawn shops and estate buyers generally ignore the retail appraisal dollar amount, offering roughly 20–40% of that number based on wholesale commodity floor prices. If you enter a pawn shop expecting to receive the insured amount, you will be disappointed." },
  { q: "How much is a 1-carat diamond worth to sell in 2026?", a: "The resale value of a 1-carat diamond currently sits between $1,400 and $3,500 depending on color and clarity. A 1-carat G/VS2 natural round diamond is considered a liquid asset, but you always lose the retail premium the second you walk out of the store." },
  { q: "Does GIA provide a dollar-value appraisal for diamonds?", a: "No. The GIA only provides the Diamond Grading Report, which lists technical attributes — they do not calculate appraisals or dollar values. An appraiser uses GIA data to compare against current marketplace values. Any certificate with a pre-printed dollar amount is a retail marketing document, not an unbiased gemological report." },
  { q: "Can you appraise a lab-grown diamond using this calculator?", a: "Yes — select 'Lab-Grown' in the inputs to apply a separate pricing index. Lab diamond prices have dropped over 30% recently due to manufacturing technology advances. An appraisal from 2023 or 2024 is likely completely inaccurate for today's market." },
  { q: "Does diamond shape affect an appraisal?", a: "Absolutely. Round Brilliant diamonds command the highest appraised value because they require the most raw diamond rough to produce. Fancy shapes like Ovals, Pears, and Marquises typically carry a lower per-carat appraisal because their production results in less wasted material. In the resale market, round diamonds also move faster, giving them higher liquidity value." },
  { q: "Why do diamonds lose 50% of their value immediately after purchase?", a: "This is caused by Retail Leakage: you buy at a Sell Side price that includes mall rent, high-stakes marketing, and commissions, but you must sell at the Buy Side wholesale floor. The stone's mineral value doesn't change, but the retail layer evaporates the moment it becomes used jewelry." },
  { q: "Is Insurance Replacement value the same as Market Worth?", a: "No. Insurance Replacement Value is a calculated high estimate meant to guarantee a like-for-like stone can be found quickly at any retail outlet. Market Worth (Fair Market Value) is the price an informed buyer would pay an informed seller in an open market — typically 40–60% of the insurance appraisal." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Diamond Appraisal Calculator', item: 'https://moissanitebyaurelia.com/diamond-appraisal-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Diamond Appraisal Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Free diamond appraisal calculator providing instant market value, insurance replacement cost, and resale estimates based on GIA-graded diamond characteristics.',
    url: 'https://moissanitebyaurelia.com/diamond-appraisal-calculator/',
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

export default function DiamondAppraisalCalculatorPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/diamond-appraisal-calculator/',
    dateModified: iso,
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Appraisal Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            A professional diamond appraisal calculator identifies the specific gap between your jewelry store&apos;s inflated &ldquo;Retail Replacement Value&rdquo; and the actual &ldquo;Fair Market Value&rdquo; of your gemstone — so you can accurately estimate 2026 insurance premiums or real-world resale value.
          </p>
        </header>

        <DiamondAppraisalCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <p className="flex items-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Price data updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </p>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Why Your &ldquo;Retail&rdquo; Appraisal Is an Industry Myth</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              In the high-stakes jewelry vaults, there&apos;s a saying: <em>&ldquo;Appraisals are for your ego; checks are for your pocket.&rdquo;</em> Most people seeking a diamond appraisal online are clutching a document that lists a price nearly double what they actually paid. The calculator doesn&apos;t give you one number — it shows a technical hierarchy of what your stone is actually worth at each layer of the market.
            </p>

            <h3 className="font-serif text-lg text-dark mb-2">1. The &ldquo;Replacement&rdquo; Lie: High Numbers for High Premiums</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              If you recently bought an elite D-color VVS diamond, the store likely handed you an appraisal for nearly double what you paid. This is the <strong>Retail Replacement Value</strong> — the absolute highest cost for an insurance company to buy that ring tomorrow at full retail price. It&apos;s great for your ego, but it&apos;s a debt anchor. You&apos;re paying monthly insurance premiums based on this inflated number for a gem you could replace today at a reputable online retailer for half that amount.
            </p>

            <h3 className="font-serif text-lg text-dark mb-2">2. The Lab-Grown Divergence: {year} Price Shocks</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Most {year} appraisals still value lab diamonds based on 2023 or 2024 manufacturing costs. Because technology is moving quickly, the price for lab diamonds is dropping by double digits annually. If your appraisal isn&apos;t updated every 12 months, you are insured for an outdated asset. Always select &ldquo;Lab Grown&rdquo; in the calculator to apply current market indices.
            </p>
          </section>

          {/* Value Classification Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">{year} Asset Worth Reality Map</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">What your appraisal paperwork actually means at each market layer:</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif text-sm">Value Classification</th>
                    <th className="text-left px-4 py-3 font-normal font-serif text-sm">Typical % of Appraisal</th>
                    <th className="text-left px-4 py-3 font-normal font-serif text-sm">Who It Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Retail Replacement', '100% – 120%', 'Your insurance agent — inflated to hike premiums'],
                    ['Fair Market Value', '40% – 60%', 'The smart buyer — realistic replacement cost online'],
                    ['Liquidity Value', '20% – 40%', 'Resale & pawn trade-ins — cash-on-the-spot offers'],
                    ['Scrap Value', '10% – 15%', 'Emergency fire sales — raw gold weight only'],
                  ].map(([type, pct, desc], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{type}</td>
                      <td className="px-4 py-3 text-accent font-semibold">{pct}</td>
                      <td className="px-4 py-3 text-text-muted">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">How the Diamond Appraisal Calculator Works</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Origin, Shape & Carat', body: 'Choose your diamond\'s origin (natural or lab-grown) and shape. Enter the carat weight using the slider. Shape impacts value significantly — round brilliant diamonds command a premium due to cutting waste, while fancy shapes like oval and cushion run 15–25% less per carat.' },
                { step: '2', title: 'Input Color, Clarity & Cut', body: 'Select your diamond\'s color grade (D–M) and clarity (FL–I2). Add the cut grade and current condition to refine the appraisal. Each grade affects value: color and clarity are the biggest variables after carat weight.' },
                { step: '3', title: 'Get Your Appraised Value', body: 'Click "Calculate Appraisal Value" to see your diamond\'s estimated market value, insurance replacement cost, and realistic resale estimate. Compare these numbers against dealer quotes before buying, selling, or insuring.' },
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

          {/* Full FAQ */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Diamond Appraisal Questions Answered</h2>
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
