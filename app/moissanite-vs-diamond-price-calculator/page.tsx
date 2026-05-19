import type { Metadata } from 'next'
import MoissaniteDiamondComparisonCalculator from '@/components/calculators/MoissaniteDiamondComparisonCalculator'

export const metadata: Metadata = {
  title: "Moissanite vs Diamond Price Calculator — Compare & Save [2026]",
  description: "Compare moissanite and diamond prices side by side. See exact savings for any shape, carat, color, and clarity. Includes James Allen vs Blue Nile comparison and expert 4Cs buying guide.",
  alternates: { canonical: 'https://moissanitebyaurelia.com/moissanite-vs-diamond-price-calculator/' },
  openGraph: {
    title: 'Moissanite vs Diamond Price Calculator — 2026 Side-by-Side Comparison',
    description: 'See how much you save choosing moissanite over a natural diamond. Compare prices for any shape and carat size with verified retailer links.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "Is it safe to buy high-value gems online in 2026?", a: "Yes. Buying online is safer and more transparent than ever. Retailers like Blue Nile and James Allen offer GIA-certified diamonds with 360° HD video, free insured shipping, and 30-day returns. Price aggregators like Rare Carat verify wholesalers so you're never overpaying." },
  { q: "Which is more sparkly — diamond or moissanite?", a: "Moissanite is technically more sparkly due to its higher refractive index (2.65 vs. 2.42 for diamond). It produces more rainbow fire than a diamond under light. Some buyers love this effect; others find it slightly different from the classic white brilliance of diamond." },
  { q: "Should I choose James Allen or Blue Nile?", a: "Both are industry titans. James Allen excels in HD imagery — every stone has a 360° super-zoom video so you can inspect it yourself. Blue Nile offers massive inventory depth and competitive pricing, especially on larger natural diamonds. For lab-grown, both are comparable." },
  { q: "Is moissanite a lab-grown diamond?", a: "No — they are completely different minerals. A lab diamond is 100% carbon (same as a natural diamond, just grown in a lab). Moissanite is silicon carbide (SiC), first discovered in a meteorite. They have different chemical compositions, optical properties, and price points." },
  { q: "Does a natural diamond hold its resale value better than moissanite?", a: "Yes. Natural diamonds have an established secondary market and retain 30–50% of retail value. Moissanite has essentially zero resale value — a pawn shop will pay for the gold setting but not the stone. Don't buy moissanite as an investment; buy it for visual impact at a fraction of the cost." },
  { q: "What is the best diamond color for the money?", a: "The sweet spot is G–H color. These grade as 'Near Colorless' and face up white in white gold or platinum settings without the colorless premium of D–F grades. You save 15–25% vs. D color while getting an optically identical result in a ring setting." },
  { q: "Which diamond shape looks the largest?", a: "Elongated shapes like marquise, oval, and pear tend to look the largest for a given carat weight because they maximize face-up surface area. A 1.00ct oval appears significantly larger than a 1.00ct round brilliant, despite weighing the same." },
  { q: "How much should I spend on an engagement ring?", a: "The old '3 months salary' rule is a marketing myth created by De Beers in the 1980s. Budget what you're comfortable with. A 1.50ct G/VS2 lab diamond ring from a reputable online retailer runs $2,000–3,500 in 2026. A comparable moissanite runs $400–700 — both are beautiful, long-lasting choices." },
  { q: "What are the 4Cs and how do they affect moissanite pricing?", a: "Cut, Color, Clarity, and Carat apply to both diamonds and moissanite. For moissanite, cut quality is most important — a well-cut stone eliminates the 'disco ball' effect sometimes seen in budget moissanite. Color (DEF vs. GHI) and clarity are less critical since premium moissanite is always eye-clean." },
  { q: "Can I design a custom ring online?", a: "Yes — all major online retailers offer custom or semi-custom ring design. Blue Nile's Ring Studio and James Allen's ring builder let you pair any loose stone with hundreds of settings. For fully bespoke work, retailers like Taylor & Hart specialize in custom designs with 3D previews." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Moissanite vs Diamond Price Calculator', item: 'https://moissanitebyaurelia.com/moissanite-vs-diamond-price-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Moissanite vs Diamond Price Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Free side-by-side price comparison calculator for moissanite vs natural diamond by shape, carat, color, and clarity.',
    url: 'https://moissanitebyaurelia.com/moissanite-vs-diamond-price-calculator/',
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

export default function MoissaniteDiamondPriceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Moissanite vs Diamond Price Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Compare moissanite and natural diamond prices side by side — see your potential savings for any shape, size, color, and clarity combination with verified retailer links.
          </p>
        </header>

        <MoissaniteDiamondComparisonCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Use the Moissanite vs Diamond Calculator</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Shape & Carat Weight', body: 'Choose the diamond shape you\'re considering and use the carat slider to set the weight. The calculator applies real face-up size differences between shapes — so a 1.50ct oval moissanite and a 1.50ct round moissanite will show different visual size estimates alongside their price gap.' },
                { step: '2', title: 'Choose Color & Clarity Grades', body: 'Select the color (D–J) and clarity (FL–I1) grades for your comparison. For a fair apples-to-apples comparison, use the same grades for both stones. The calculator applies independent pricing models for natural diamonds and moissanite — the savings percentage updates in real time.' },
                { step: '3', title: 'Compare Prices & Click Through to Retailers', body: 'Click "Compare Prices" to see the side-by-side result: moissanite price, natural diamond price, and total savings (in dollars and percentage). Use the retailer links to verify live pricing at James Allen or Blue Nile before making a final decision.' },
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
            <h2 className="font-serif text-2xl text-dark mb-3">Moissanite: The Ethical &amp; Brilliant Alternative</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              In 2026, moissanite is no longer seen as a diamond substitute but as a superior choice for buyers prioritizing fire, sustainability, and financial intelligence. At 9.25 on the Mohs scale, it&apos;s nearly as hard as a diamond (10) but offers a higher refractive index — producing more rainbow brilliance per facet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Brilliance', body: 'Moissanite has a refractive index of 2.65 vs. 2.42 for diamond — producing more visible fire and light return.' },
                { title: 'Hardness', body: '9.25 Mohs vs. 10 for diamond. Extremely scratch-resistant and suitable for everyday wear.' },
                { title: 'Ethics', body: '100% lab-grown and conflict-free. Zero environmental footprint from mining.' },
                { title: 'Value', body: 'A 3-carat moissanite often costs less than a 0.5-carat diamond. The savings are dramatic at larger sizes.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* James Allen vs Blue Nile Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">James Allen vs Blue Nile — 2026 Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Feature</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">James Allen</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Blue Nile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Imaging', '360° Super Zoom HD Video', '360° High-Res Photos'],
                    ['Best For', 'Inspecting individual stones', 'Largest GIA inventory'],
                    ['Moissanite', 'Yes — large selection', 'Limited selection'],
                    ['Upgrade Policy', 'Lifetime upgrade guarantee', 'Diamond upgrade program'],
                    ['Price Range', 'Competitive with BN', 'Competitive with JA'],
                  ].map(([feat, ja, bn], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{feat}</td>
                      <td className="px-4 py-3 text-text-muted">{ja}</td>
                      <td className="px-4 py-3 text-text-muted">{bn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4Cs Sweet Spot Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Mastering the 4Cs: The Smart Buyer&apos;s Guide</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Maximize your budget by knowing where optical quality is perceptible to the human eye — and where it isn&apos;t. The human eye cannot distinguish a Flawless diamond from a VS1 in a real-world ring setting.
            </p>
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
                    ['Clarity', 'Flawless / VVS1', 'VS2 / SI1 — eye-clean via HD video'],
                    ['Color', 'D / E', 'G / H — faces up white in platinum'],
                    ['Carat', '1.00ct / 2.00ct exactly', '0.92ct or 1.88ct — 15–20% less cost'],
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
            <h2 className="font-serif text-2xl text-dark mb-6">Moissanite vs Diamond — Questions Answered</h2>
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
