import type { Metadata } from 'next'
import DiamondResaleCalculator from '@/components/calculators/DiamondResaleCalculator'

export const metadata: Metadata = {
  title: "Diamond Resale Price Calculator — What Is My Diamond Worth to Sell? [2026]",
  description: "Free diamond resale value calculator. Get instant cash offer and trade-in estimates for natural diamonds, lab-grown diamonds, and moissanite. See where to sell for the best return.",
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-resale-price-calculator/' },
  openGraph: {
    title: 'Diamond Resale Value Calculator — Cash Offer vs Trade-In [2026]',
    description: 'Find out how much your diamond is worth when selling. Compare direct cash offers vs. trade-in credit at Blue Nile and James Allen upgrade programs.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "Can I sell a diamond ring without a certificate?", a: "Yes, but expect significantly lower offers. Without GIA or IGI certification, buyers downgrade stones conservatively — often by 2 full clarity grades. Getting a stone over 1.00 carat certified for $150 often justifies the cost before selling, as it can increase offers by $500 or more." },
  { q: "Does the ring setting have resale value?", a: "Settings have scrap metal value only. Jewelers rarely resell used settings due to style obsolescence, calculating value based on the current spot price for gold or platinum weight. Separate the stone from the setting before negotiating to open additional buyer pools." },
  { q: "Is jewelry appraisal identical to resale value?", a: "No. Appraisals represent maximum retail replacement costs for insurance purposes — typically inflated by 100%. Resale value reflects actual cash liquidation prices, which is usually 25–50% of the retail purchase price for natural diamonds." },
  { q: "How much is a 1-carat diamond worth to resell in 2026?", a: "A 1-carat natural diamond (Round, H Color, VS2 Clarity) typically resells for $1,800–2,600. Lab-grown equivalents resell for approximately $100–300 due to rapidly falling manufacturing costs. Moissanite has minimal resale value — expect $0–50 from most buyers." },
  { q: "What is the best place to sell a diamond?", a: "Direct-to-buyer platforms (eBay, Worthy, I Do Now I Don't) yield 60–70% of fair market value but take 1–3 months. Consignment with local jewelers returns 40–50% in 3–6 months. Pawn shops offer immediate cash at 20–30% of fair market value. Diamond upgrade programs at Blue Nile or James Allen offer trade-in credit worth 30–50% more than cash." },
  { q: "Why is lab-grown diamond resale value so low?", a: "Lab-grown diamonds function as consumer technology products rather than finite assets. Manufacturing costs decrease annually — production cost fell from roughly $4,000 per carat in 2020 to under $500 in 2026. Jewelers rarely purchase pre-owned lab diamonds when they can buy new, cheaper alternatives directly from factories." },
  { q: "How can I increase the resale value of my diamond?", a: "Three proven strategies: (1) Locate your GIA report — selling without certification means 'selling blind,' costing you 20–40% in offers. (2) Separate the stone from the setting to open additional buyer pools. (3) Get a $20 steam cleaning — improved perceived color grade attracts higher bids from private buyers." },
  { q: "Is it better to use a diamond upgrade program or sell directly?", a: "Upgrade programs at Blue Nile and James Allen offer 30–50% more credit than cash sales, but only toward a new purchase. If you plan to upgrade your jewelry, trade-in credit is almost always the better financial choice. If you need liquid cash, direct sale via a consignment platform yields the best cash return." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Diamond Resale Price Calculator', item: 'https://moissanitebyaurelia.com/diamond-resale-price-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Diamond Resale Price Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Free diamond resale value calculator providing instant cash offer and trade-in estimates for natural diamonds, lab-grown diamonds, and moissanite.',
    url: 'https://moissanitebyaurelia.com/diamond-resale-price-calculator/',
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

export default function DiamondResalePriceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Resale Price Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Find out how much your diamond is worth when selling — get instant cash offer and trade-in credit estimates, and see which option puts more money in your pocket.
          </p>
        </header>

        <DiamondResaleCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Use the Diamond Resale Calculator</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Stone Type & Shape', body: 'Choose between natural diamond, lab-grown diamond, or moissanite — each has a very different resale market. Then select the shape. Round brilliants have the strongest secondary market demand; fancy shapes are harder to sell but round brilliants command higher per-carat resale.' },
                { step: '2', title: 'Enter Carat, Color & Clarity', body: 'Input the carat weight and select color and clarity grades from your GIA certificate. If you don\'t have a certificate, use conservative estimates — unverified stones always receive lower offers. The calculator assumes the stone is GIA-certified for the base calculation.' },
                { step: '3', title: 'Choose Condition & Get Your Estimate', body: 'Select the stone\'s current condition (Excellent, Very Good, Good, or Fair) and click "Calculate Resale Value." You\'ll see both a direct cash offer estimate and a trade-in credit estimate — plus recommended selling channels ranked by return percentage.' },
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
            <h2 className="font-serif text-2xl text-dark mb-3">Why Your Diamond&apos;s Value Changed</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              Diamonds marketed as lifetime assets face significant depreciation in secondary markets. The gap between retail replacement value and liquidation value has expanded dramatically by 2026. The real resale market must subtract three costs that are baked into your original purchase price and are completely unrecoverable:
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2"><span className="text-accent font-semibold shrink-0">—</span> <span><strong className="text-dark">Labor &amp; craftsmanship:</strong> The setting, sizing, and finishing work has zero secondary value.</span></li>
              <li className="flex gap-2"><span className="text-accent font-semibold shrink-0">—</span> <span><strong className="text-dark">Retail markup (100–300%):</strong> Every jeweler runs a business. That margin evaporates at resale.</span></li>
              <li className="flex gap-2"><span className="text-accent font-semibold shrink-0">—</span> <span><strong className="text-dark">Sales tax (10–20%):</strong> Paid on purchase, gone on resale — no refunds in the secondary market.</span></li>
            </ul>
          </section>

          {/* Liquidity Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Natural vs Lab-Grown: The Liquidity Gap</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Stone Type</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Liquidity</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Value Retained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Natural Diamond (GIA certified)', 'High', '30–60% of retail'],
                    ['Lab-Grown Diamond', 'Very Low', '10–25% of retail'],
                    ['Moissanite', 'Negligible', 'Setting value only'],
                  ].map(([type, liq, val], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{type}</td>
                      <td className="px-4 py-3 text-text-muted">{liq}</td>
                      <td className="px-4 py-3 text-accent font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Where to Sell Your Diamond (Ranked by Return)</h2>
            <div className="space-y-3">
              {[
                { rank: '1', method: 'Direct to Buyer (eBay, Worthy, IDoNowIDont)', ret: '60–70%', time: '1–3 months', note: 'Best cash return but requires patience and effort.' },
                { rank: '2', method: 'Consignment with Local Jeweler', ret: '40–50%', time: '3–6 months', note: 'Good option if you\'re not in a hurry.' },
                { rank: '3', method: 'Retailer Trade-In (Blue Nile, James Allen)', ret: '30–50% credit', time: 'Immediate', note: 'Best overall value if you plan to upgrade.' },
                { rank: '4', method: 'Pawn Shops / Cash-for-Gold', ret: '20–30%', time: 'Immediate', note: 'Worst financial return but fastest cash.' },
              ].map(item => (
                <div key={item.rank} className="flex gap-4 bg-surface border border-border rounded-xl p-4">
                  <div className="w-7 h-7 rounded-full bg-dark text-white text-xs font-semibold flex items-center justify-center shrink-0">{item.rank}</div>
                  <div className="min-w-0">
                    <p className="font-medium text-dark text-sm">{item.method}</p>
                    <p className="text-xs text-text-muted mt-0.5">Return: <span className="text-accent font-semibold">{item.ret}</span> · Timeline: {item.time}</p>
                    <p className="text-xs text-text-subtle mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Diamond Resale Questions Answered</h2>
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
