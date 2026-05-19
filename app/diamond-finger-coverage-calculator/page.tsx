import type { Metadata } from 'next'
import DiamondFingerCoverageCalculator from '@/components/calculators/DiamondFingerCoverageCalculator'

export const metadata: Metadata = {
  title: "Diamond Finger Coverage Calculator — Visualize Stone Size on Your Hand [2026]",
  description: "Free diamond finger coverage calculator. See exactly what percentage of your finger a diamond covers by shape, carat, and ring size before you buy.",
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-finger-coverage-calculator/' },
  openGraph: {
    title: 'Diamond Finger Coverage Calculator — What Will It Look Like on My Hand?',
    description: 'Calculate finger coverage percentage before buying. A 1-carat diamond looks very different on a size 4 vs. a size 8 finger — see exactly what to expect.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "What is diamond finger coverage?", a: "Finger coverage is the percentage of your visible finger width that the center stone or ring design covers when viewed from above. 30–35% is a classic dainty look, 40–50% is the modern sweet spot, and 50%+ creates a statement 'knuckle-to-knuckle' style." },
  { q: "Which diamond shape gives the best finger coverage?", a: "Marquise diamonds offer the highest finger coverage per carat due to their elongated design. Oval and pear diamonds follow closely. Both the marquise and oval can appear 10–15% wider than a round diamond of the same carat weight." },
  { q: "What is the ideal finger coverage percentage for an engagement ring?", a: "Most buyers prefer 35–50% coverage for a balanced, elegant look. Coverage above 65% starts to look oversized for everyday wear, while below 30% can appear too delicate depending on band width." },
  { q: "Does a larger ring size mean less finger coverage?", a: "Yes. On a larger finger, the same stone covers a smaller percentage of finger width. This is why people with ring sizes 7+ often opt for slightly larger diamonds or elongated shapes to achieve the same visual impact as smaller ring sizes." },
  { q: "Does carat weight determine how big a diamond looks on the finger?", a: "Carat measures weight, not visual size. A deeply cut diamond can hide weight 'invisibly,' appearing smaller than its carat weight suggests. Always check the face-up diameter in millimeters alongside the carat weight — an 'Excellent' or 'Ideal' cut ensures proper proportions." },
  { q: "Do lab-grown diamonds look the same size as natural diamonds?", a: "Yes — lab-grown and natural diamonds of the same carat weight and cut grade have identical physical dimensions and face-up appearance. The practical advantage of lab-grown is cost: you can afford a larger stone for the same budget, potentially going from 35% coverage to 55% coverage." },
  { q: "How does band width affect the appearance of finger coverage?", a: "Thicker bands visually compete with the center stone. A delicate band of 1.6–2.0mm minimizes metal visibility and makes the diamond appear larger. A thick band (3mm+) can reduce perceived stone size by up to 20%." },
  { q: "What is the best strategy to maximize visual impact on a budget?", a: "Three approaches: (1) Choose an elongated shape like oval, pear, or marquise — they appear larger per carat than round. (2) Use a thin band (1.8mm or less) to frame the stone. (3) Add a halo setting — this can visually increase apparent stone size by 25–30% without increasing the center stone carat weight." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Diamond Finger Coverage Calculator', item: 'https://moissanitebyaurelia.com/diamond-finger-coverage-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Diamond Finger Coverage Calculator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    description: 'Free calculator showing what percentage of your finger a diamond covers based on shape, carat weight, and ring size.',
    url: 'https://moissanitebyaurelia.com/diamond-finger-coverage-calculator/',
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

export default function DiamondFingerCoverageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Finger Coverage Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            A 1-carat diamond looks massive on a size 4 finger but can appear dainty on a size 8 finger. Enter your ring size, shape, and carat weight to see exactly what percentage of your finger the stone will cover.
          </p>
        </header>

        <DiamondFingerCoverageCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Understanding Finger Coverage Percentages</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Purchasing an engagement ring online presents a challenge: photos are misleading. A stone photographed on a model&apos;s size 5 finger will look completely different on your size 7 hand. Finger Coverage solves this by calculating the exact ratio of stone face-up width to finger width.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { range: '30–35%', label: 'Classic / Dainty', desc: 'Standard look for a 1.00ct round diamond on an average hand. Elegant and understated.' },
                { range: '40–50%', label: 'Sweet Spot', desc: 'Head-turning presence. The ideal balance of drama and wearability for modern buyers.' },
                { range: '50–65%', label: 'Statement Look', desc: 'Bold, knuckle-to-knuckle style. Favored by fashion-forward buyers and celebrities.' },
              ].map(item => (
                <div key={item.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                  <p className="font-serif text-xl text-accent mb-1">{item.range}</p>
                  <p className="font-medium text-dark text-sm mb-1">{item.label}</p>
                  <p className="text-text-subtle text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Why Shape Matters More Than Carat</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Carat is a measurement of weight, not visual size. Elongated shapes like oval, pear, and marquise maximize face-up surface area because their cutting process retains more spread. Compare these approximate face-up widths for a 1.00 carat stone:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Shape</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Face-Up Width (1.00 ct)</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">vs. Round Brilliant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Round Brilliant', '6.5 mm', 'Baseline'],
                    ['Oval', '8.4 mm', '+29% wider appearance'],
                    ['Marquise', '10.4 mm', '+60% longer appearance'],
                    ['Pear', '8.0 mm', '+23% wider'],
                    ['Princess', '5.5 mm', '-15% smaller appearance'],
                    ['Emerald', '6.8 mm', 'Similar width, more length'],
                  ].map(([shape, width, vs], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{shape}</td>
                      <td className="px-4 py-3 text-text-muted">{width}</td>
                      <td className="px-4 py-3 text-accent font-medium">{vs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Finger Coverage Questions Answered</h2>
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
