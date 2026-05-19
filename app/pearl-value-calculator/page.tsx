import type { Metadata } from 'next'
import PearlValueCalculator from '@/components/calculators/PearlValueCalculator'

export const metadata: Metadata = {
  title: 'Pearl Value Calculator — How Much Is My Pearl Worth? [2026]',
  description: 'Free pearl value calculator. Enter type (freshwater, Akoya, South Sea, Tahitian), size, luster, shape, and surface quality for an instant price estimate and resale value.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/pearl-value-calculator/' },
  openGraph: {
    title: 'Pearl Value Calculator — Freshwater, Akoya, South Sea & Tahitian [2026]',
    description: 'Instantly estimate the retail and resale value of any pearl based on type, size, luster, shape, and surface quality. Includes 2026 price chart and real vs. fake pearl guide.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  { q: "What factors determine pearl value?", a: "Pearl value is determined by five key factors: (1) Luster — the sharpness and intensity of reflections on the surface; high luster means you can see your reflection clearly. (2) Surface quality — fewer spots, pits, or blemishes means higher value. (3) Shape — perfectly round pearls command the highest premium; baroques are the most affordable. (4) Size — value rises exponentially above 8mm because large pearls are extremely rare in nature. (5) Origin — natural (unfarmed) pearls are 5–10x more valuable than cultured pearls of the same size." },
  { q: "What is the most valuable pearl type?", a: "South Sea pearls, grown in Pinctada maxima oysters in Australia, Indonesia, and the Philippines, are the most valuable cultured pearl type. Large round South Sea pearls (14–18mm) can fetch $1,000–$5,000+ per pearl. Natural saltwater pearls from the Persian Gulf are even rarer and can sell for tens of thousands at auction. Tahitian pearls rank second in value, followed by Akoya, then freshwater." },
  { q: "How much is a freshwater pearl worth in 2026?", a: "A single freshwater pearl is worth $5–$200 depending on size and quality. Small freshwater rounds (6–7mm) in high volume retail settings sell for $5–$25 each. Large near-round freshwater pearls (11–13mm) with excellent luster can reach $150–$300 per pearl. A complete strand of freshwater pearls typically sells for $50–$1,000 depending on quality, length, and uniformity." },
  { q: "How much is an Akoya pearl worth?", a: "Akoya pearls are Japanese cultured saltwater pearls prized for their mirror-like luster and near-perfect roundness. A single quality Akoya pearl (7–8mm, high luster, clean surface) retails for $80–$300. A matched 18-inch strand of Akoya pearls (7–7.5mm) in fine quality runs $800–$2,500. Hanadama-grade (highest tier) Akoya strands can exceed $5,000." },
  { q: "Can I sell my pearl jewelry for a good price?", a: "Resale value for pearl jewelry is modest. Cultured pearls have minimal secondary market demand — expect 20–35% of original retail price from a jeweler or consignment shop. Freshwater pearls have the lowest resale value. Akoya and South Sea pearls fare better, especially with original paperwork. Natural (non-cultured) pearls are the exception — these are genuine rarities with strong auction market value, sometimes exceeding original purchase price." },
  { q: "How do I tell if a pearl is real or fake?", a: "The classic test: rub the pearl lightly across your front teeth. Real pearls (including cultured) feel gritty or sandy — this is the nacre texture. Fake (glass or plastic) pearls feel perfectly smooth. Other indicators: real pearls are cool to the touch initially, have slight weight, and show minor variations between pearls in a strand. Perfect uniformity across all pearls in a strand is often a sign of imitation." },
  { q: "What does pearl luster mean, and how does it affect value?", a: "Luster is the most important quality factor for pearls. It refers to the intensity, sharpness, and depth of light reflected from the pearl surface. High luster pearls show mirror-like reflections where you can see distinct images. Low luster pearls appear chalky, milky, or dull. A high-luster freshwater pearl can be worth 3–5x more than a low-luster pearl of the same size, type, and shape. Akoya pearls are especially prized for their exceptional luster." },
  { q: "Does pearl shape affect value significantly?", a: "Yes. Round pearls command the highest premiums because they are rarest in nature — less than 5% of all cultured pearls achieve near-perfect roundness. Semi-round and oval pearls are the next tier. Button pearls (flat on one side) are popular for earrings and are valued moderately. Baroque pearls (irregular, asymmetric) are the most affordable and are increasingly fashionable in contemporary jewelry design. The price difference between round and baroque of the same size/luster can be 300–400%." },
  { q: "What is the best size pearl for an engagement ring or pendant?", a: "For an engagement ring, an Akoya or freshwater pearl of 7–9mm strikes the best balance of visual presence and wearability. South Sea pearls in this size range offer the most luxurious option. For a pendant, 9–12mm is the sweet spot — large enough to be a focal point without being heavy. Stud earrings look best at 7–9mm for everyday wear, 10–12mm for special occasions." },
  { q: "Are Tahitian pearls real black pearls?", a: "Yes — Tahitian pearls are genuine cultured saltwater pearls grown in Pinctada margaritifera (black-lipped oysters) primarily in French Polynesia. Their natural dark colors range from charcoal to dark green, peacock (greenish overtone), and aubergine. They are never dyed to achieve their color. A high-quality 10–12mm round Tahitian pearl with peacock overtone retails for $200–$800 per pearl. Uniform strands of Tahitian pearls can reach $3,000–$10,000." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Pearl Value Calculator', item: 'https://moissanitebyaurelia.com/pearl-value-calculator/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pearl Value Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Free pearl value calculator providing instant retail and resale price estimates for freshwater, Akoya, South Sea, and Tahitian pearls based on size, luster, shape, and surface quality.',
    url: 'https://moissanitebyaurelia.com/pearl-value-calculator/',
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

export default function PearlValueCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Pearl Value Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Estimate the retail and resale value of any pearl — freshwater, Akoya, South Sea, or Tahitian. Enter the key quality factors for an instant 2026 price estimate.
          </p>
        </header>

        <PearlValueCalculator />

        {/* ── Article Content ── */}
        <article className="max-w-3xl mx-auto mt-16 space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Use the Pearl Value Calculator</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Select Pearl Type & Origin', body: 'Choose the pearl type: freshwater, Akoya, South Sea, or Tahitian. Each has a completely different price baseline — a 9mm South Sea pearl is worth 10–20x more than a 9mm freshwater pearl of equivalent quality. Select the origin (cultured or natural) — natural (unfarmed) pearls are exponentially rarer and more valuable.' },
                { step: '2', title: 'Enter Size, Luster & Surface Quality', body: 'Input the pearl diameter in millimeters — use calipers for accuracy if you have a loose pearl. Then select the luster grade (Excellent shows mirror-sharp reflections; Poor appears chalky) and surface quality (Clean to Heavily Blemished). Luster is the single biggest value driver after size.' },
                { step: '3', title: 'Choose Shape & Get Your Estimate', body: 'Select the pearl shape (Round, Near Round, Oval, Button, or Baroque) and click "Calculate Pearl Value." The result shows an estimated retail range and a realistic resale estimate. Use this as a benchmark when buying from a jeweler or estate sale, or before insuring a pearl strand.' },
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
            <h2 className="font-serif text-2xl text-dark mb-3">Understanding Pearl Quality & Value</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Pearl pricing is more complex than diamonds — there is no universally standardized grading system equivalent to GIA. Instead, pearl value is the product of five independent quality factors. Understanding each factor lets you buy and sell with confidence in a market where inflated retail markups are common.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Luster', body: 'The most critical factor. High-luster pearls show mirror-sharp reflections. Low-luster pearls appear dull or chalky — avoid them regardless of price.' },
                { title: 'Size', body: 'Value rises exponentially above 8mm. A 12mm South Sea pearl isn\'t 50% more valuable than an 8mm — it can be 5–10x the price due to rarity.' },
                { title: 'Surface Quality', body: 'Fewer blemishes, pits, or spots increase value. Lightly spotted pearls (1–3 minor blemishes) are acceptable. Heavily spotted pearls are significantly discounted.' },
                { title: 'Shape', body: 'Round pearls are rarest and most valuable. Semi-round, oval, button, and baroque shapes offer progressively more value per dollar spent.' },
              ].map(item => (
                <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2026 Pearl Price Chart */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">2026 Pearl Price Chart — By Type & Size</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Per-pearl retail price ranges for cultured pearls in good-to-excellent quality (high luster, lightly blemished, near-round):
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Pearl Type</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Size Range</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Per-Pearl Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Freshwater (round)', '6–8mm', '$15 – $80'],
                    ['Freshwater (large round)', '10–13mm', '$80 – $300'],
                    ['Akoya', '6.5–7.5mm', '$80 – $250'],
                    ['Akoya (premium)', '8–9mm', '$250 – $600'],
                    ['Tahitian', '9–11mm', '$150 – $500'],
                    ['Tahitian (peacock)', '11–13mm', '$400 – $1,200'],
                    ['South Sea (white)', '10–13mm', '$350 – $1,500'],
                    ['South Sea (large)', '14–18mm', '$1,200 – $5,000+'],
                  ].map(([type, size, price], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{type}</td>
                      <td className="px-4 py-3 text-text-muted">{size}</td>
                      <td className="px-4 py-3 text-accent font-semibold">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Resale Reality */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Pearl Resale Reality: What You Can Actually Get</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Pearl jewelry depreciates significantly after purchase. Unlike natural diamonds, cultured pearls are not considered investment-grade assets. Here&apos;s what to realistically expect when selling:
            </p>
            <div className="space-y-3">
              {[
                { type: 'Freshwater Pearls', ret: '10–20% of retail', note: 'Lowest resale due to high supply and low collector demand.' },
                { type: 'Akoya Pearls', ret: '20–35% of retail', note: 'Better liquidity, especially with original box and paperwork from Japanese brands (Mikimoto, Tasaki).' },
                { type: 'Tahitian Pearls', ret: '25–40% of retail', note: 'Strong secondary market for high-quality peacock-overtone strands.' },
                { type: 'South Sea Pearls', ret: '30–50% of retail', note: 'Best resale of cultured pearls. Round 14mm+ strands have active auction market.' },
                { type: 'Natural (Unfarmed) Pearls', ret: '100–300%+ of purchase', note: 'Genuine rarities. Well-documented natural pearl strands regularly exceed original purchase prices at auction.' },
              ].map(item => (
                <div key={item.type} className="bg-surface border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-dark text-sm">{item.type}</p>
                    <p className="text-accent font-semibold text-sm">{item.ret}</p>
                  </div>
                  <p className="text-text-subtle text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real vs Fake */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-3">Real vs. Fake Pearl Test — 3 Methods</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Before buying pearl jewelry online or in store, use these tests to distinguish genuine cultured pearls from glass, plastic, or coated imitations:
            </p>
            <div className="space-y-4">
              {[
                { step: '1', title: 'The Tooth Test (Most Reliable)', body: 'Gently rub the pearl surface across the edge of your front teeth. Real pearls (cultured or natural) feel slightly gritty or sandy — this is the crystalline nacre structure. Fake pearls (glass or plastic) feel completely smooth, almost slippery.' },
                { step: '2', title: 'The Temperature Test', body: 'Hold the pearl in your closed fist for 30 seconds. Real pearls start cool and slowly warm to body temperature. Glass imitations take slightly longer; plastic imitations warm up immediately and feel lighter than real pearls of the same size.' },
                { step: '3', title: 'The Uniformity Test', body: 'Examine a pearl strand under bright light. Genuine pearl strands always show slight natural variations in shape, size, and overtone between individual pearls — no two are identical. Perfectly uniform, machine-perfect strands with identical weight, color, and surface are almost always imitations.' },
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
            <h2 className="font-serif text-2xl text-dark mb-6">Pearl Value Questions Answered</h2>
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
