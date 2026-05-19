import type { Metadata } from 'next'
import MoissanitePriceCalculator from '@/components/calculators/MoissanitePriceCalculator'

export const metadata: Metadata = {
  title: 'Moissanite Price Calculator — Compare Retailers & Find Best Deal [2026]',
  description: 'Free moissanite price calculator. Compare Charles & Colvard, James Allen, and Amazon prices side by side for any shape and carat weight. Includes 2026 price chart, GRA certificate guide, and buyer tips.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/moissanite-price-calculator/' },
  openGraph: {
    title: 'Moissanite Price Calculator — C&C vs James Allen vs Amazon [2026]',
    description: 'Compare moissanite prices across all major retailers. See exactly what you should pay for any carat and shape combination in 2026.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "Which is the best place to buy moissanite in 2026?", a: "Charles & Colvard is the original moissanite brand with the tightest quality control — their Forever One line is the industry benchmark for DEF colorless moissanite. James Allen offers competitive pricing with 360° HD video for every stone, making it easy to inspect before buying. Amazon offers the widest price range and fastest shipping (Prime), but quality varies significantly — stick to verified brands like Charles & Colvard sold directly through Amazon. For budget buyers, Amazon's C&C listings often match or beat the C&C website during promotional events." },
  { q: "How much does a 1-carat moissanite cost in 2026?", a: "A 1-carat round moissanite (DEF colorless, Excellent cut) typically costs $400–550 at Charles & Colvard, $380–530 at James Allen, and $200–450 on Amazon depending on brand and quality. Fancy shapes are typically 10–20% less than round for the same carat weight. Budget moissanite from unknown Amazon brands can cost as little as $80–150, but quality, cut grading, and warranty differ significantly from premium brands." },
  { q: "What is the difference between DEF and GHI moissanite?", a: "DEF moissanite is 'colorless' — it appears white and ice-clear just like a D-color diamond. GHI moissanite is 'near-colorless' with a very slight warm or faint yellow tint that's visible under certain lighting. For white gold or platinum settings, DEF is recommended to prevent any contrast between the stone and metal. For yellow or rose gold, GHI moissanite pairs beautifully at a 15–25% lower price point." },
  { q: "Does moissanite have resale value?", a: "No. Moissanite has essentially zero resale value in the secondary market. Pawn shops and estate jewelers do not purchase moissanite stones — they may pay the scrap value of the gold or platinum setting only. Unlike natural diamonds, moissanite is not a scarce resource, so there is no secondary market demand. Buy moissanite for its beauty, ethical origins, and value — not as an investment." },
  { q: "What is a GRA certificate for moissanite?", a: "A GRA (Gemological Research Association) certificate is an independent grading report that verifies a moissanite stone's specifications: carat equivalent weight, color grade (DEF or GHI), cut grade, and confirms it is genuine moissanite (silicon carbide). It is the moissanite equivalent of a GIA certificate for diamonds. Reputable moissanite sellers include GRA certificates or brand-specific certificates (Charles & Colvard's branded certificate) with every stone. Always request a certificate when buying moissanite online." },
  { q: "What is the biggest moissanite you can buy?", a: "Charles & Colvard produces moissanite up to 12+ carats (diamond equivalent weight). However, at very large sizes (5+ carats), moissanite's high dispersion creates an intense 'disco ball' rainbow effect that some buyers find overpowering. For maximum size without visual drawback, most experienced buyers stay under 3–4 carats for round shapes, or choose elongated shapes (oval, pear, marquise) which spread carat weight for a larger face-up appearance with less concentrated fire." },
  { q: "Is moissanite visible from a distance?", a: "Moissanite's fire (rainbow dispersion) is actually more visible from a distance than a diamond's. Its refractive index of 2.65 (vs. 2.42 for diamond) means it disperses more light — beautiful in most lighting but potentially too flashy under harsh spotlights or direct sun in large sizes. In typical indoor lighting, moissanite appears brilliant and white, virtually indistinguishable from a diamond at arm's length." },
  { q: "Can a jeweler tell the difference between moissanite and diamond?", a: "Yes. Professional jewelers use a moissanite tester (separate from a standard diamond tester, which will false-positive on moissanite). Under magnification, moissanite shows doubled facet edges due to its birefringent optical structure — a characteristic diamonds don't have. However, to the naked eye at normal viewing distance, a well-cut DEF moissanite is virtually indistinguishable from a diamond by non-experts." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Moissanite Price Calculator', item: 'https://moissanitebyaurelia.com/moissanite-price-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Moissanite Price Calculator',
    applicationCategory: 'ShoppingApplication',
    operatingSystem: 'Web',
    description: 'Free moissanite price calculator comparing Charles & Colvard, James Allen, and Amazon prices side by side for any shape and carat weight.',
    url: 'https://moissanitebyaurelia.com/moissanite-price-calculator/',
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

export default function MoissanitePriceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Moissanite Price Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Compare moissanite prices across Charles &amp; Colvard, James Allen, and Amazon — find the best deal for any shape and carat weight before you buy.
          </p>
        </header>

        <MoissanitePriceCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Moissanite Pricing Explained: 3 Tiers You Need to Know</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Moissanite pricing is not a single market — it splits into three distinct tiers based on brand quality, certification, and sourcing. Knowing the tiers prevents you from overpaying at brand level or unknowingly buying low-grade stones at discount prices.
            </p>
            <div className="space-y-3">
              {[
                {
                  tier: 'Tier 1 — Premium Branded',
                  retailers: 'Charles & Colvard Forever One, James Allen branded',
                  price: '$350–$900 / carat eq.',
                  note: 'Tightest color grade tolerances, lifetime warranty, brand-issued certificate. Best quality guarantee.',
                },
                {
                  tier: 'Tier 2 — Certified Generic',
                  retailers: 'Starlanka, Superbagus, other GRA-certified Amazon sellers',
                  price: '$150–$350 / carat eq.',
                  note: 'Independent GRA certificate included. Color and cut accuracy varies. Read reviews carefully.',
                },
                {
                  tier: 'Tier 3 — Uncertified Budget',
                  retailers: 'Unknown Amazon brands, AliExpress resellers',
                  price: '$40–$150 / carat eq.',
                  note: 'No certificate, no warranty. May be genuine moissanite but color, cut, and size accuracy are unverified. High risk.',
                },
              ].map(item => (
                <div key={item.tier} className="bg-surface border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-medium text-dark text-sm">{item.tier}</p>
                    <p className="text-accent font-semibold text-sm shrink-0">{item.price}</p>
                  </div>
                  <p className="text-text-muted text-xs mb-1">{item.retailers}</p>
                  <p className="text-text-subtle text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Price Chart Table */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">2026 Moissanite Price Chart — Round Brilliant (DEF Colorless)</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Approximate retail prices for round brilliant cut, DEF colorless, Excellent cut moissanite across the three main retailers:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Carat Weight</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Charles & Colvard</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">James Allen</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Amazon (C&C)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['0.50 ct', '$180–$240', '$170–$230', '$160–$220'],
                    ['1.00 ct', '$400–$540', '$380–$510', '$350–$500'],
                    ['1.50 ct', '$620–$820', '$590–$790', '$550–$760'],
                    ['2.00 ct', '$900–$1,200', '$860–$1,150', '$800–$1,100'],
                    ['3.00 ct', '$1,400–$1,900', '$1,350–$1,800', '$1,250–$1,750'],
                    ['4.00 ct', '$2,000–$2,700', '$1,900–$2,600', '$1,800–$2,500'],
                  ].map(([carat, cc, ja, amz], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{carat}</td>
                      <td className="px-4 py-3 text-text-muted">{cc}</td>
                      <td className="px-4 py-3 text-text-muted">{ja}</td>
                      <td className="px-4 py-3 text-text-muted">{amz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs mt-2">Prices shown are diamond equivalent weight (DEW). Actual moissanite weight differs. Prices vary with promotions.</p>
          </section>

          {/* GRA Certificate Section */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">The Truth About GRA Certificates</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-3">
              A GRA (Gemological Research Association) certificate for moissanite is the industry&apos;s standard third-party verification document. Here is what it confirms — and what it does not:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'What GRA Certifies', body: 'Confirms the stone is genuine moissanite (silicon carbide). Verifies carat equivalent weight, color grade (DEF or GHI), and cut grade. Provides a reference number for authenticity lookup.' },
                { title: 'What GRA Does NOT Do', body: 'GRA does not have the same global authority or standardization as GIA for diamonds. Color grade tolerance can be less strict than GIA standards. It does not assess optical performance (fire, brilliance) beyond cut grade.' },
                { title: 'Charles & Colvard Certificate', body: 'C&C\'s own certificate carries more brand accountability than a generic GRA cert — backed by a lifetime warranty. If color or cut is off, C&C will replace the stone.' },
                { title: 'When to Demand a Certificate', body: 'Always request a GRA or brand certificate for stones 0.5 carats and above. For small melee moissanite, certificates are less critical since the per-stone value is low.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Big Stone Buyer's Tip */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">The Smart Strategy for Large Moissanite Stones</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Moissanite&apos;s high dispersion index (0.104 vs. 0.044 for diamond) produces more rainbow fire — beautiful at 1–2 carats, but can appear overwhelming in large round stones above 3 carats. Here&apos;s how to maximize visual impact without the &ldquo;disco ball&rdquo; effect:
            </p>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Choose Elongated Shapes for Large Sizes', body: 'Oval, pear, and marquise shapes distribute the same carat weight across a larger face-up area, reducing concentrated fire and creating an elegant spread rather than an intense sparkle. A 3ct oval moissanite reads as large as a 4ct round with a more refined look.' },
                { step: '2', title: 'Stay in the 1.5–2.5 Carat Sweet Spot', body: 'The 1.5–2.5 carat range offers the best combination of visual impact, proportional fire, and cost savings vs. a diamond. A 2ct DEF moissanite costs $900–$1,200 vs. $15,000–$22,000 for a comparable diamond — 93% savings.' },
                { step: '3', title: 'Use a Thin, Simple Solitaire Setting', body: 'A thin 4-prong or 6-prong solitaire minimizes metal competition with the stone. Avoid thick halo frames for large moissanite — they can amplify the fire effect. A simple knife-edge band of 1.6–1.8mm maximizes the center stone presence.' },
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
            <h2 className="font-serif text-2xl text-dark mb-6">Moissanite Price Questions Answered</h2>
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
