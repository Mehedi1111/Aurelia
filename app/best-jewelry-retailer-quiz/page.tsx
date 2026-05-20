import type { Metadata } from 'next'
import JewelryRetailerQuiz from '@/components/ui/JewelryRetailerQuiz'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Best Jewelry Retailer Quiz — Find Your Perfect Match ${year}`,
    description: `Take our free 7-step jewelry retailer quiz to find your perfect match. Compare Blue Nile, James Allen, Charles & Colvard, Taylor & Hart, and more — matched to your style and budget.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/best-jewelry-retailer-quiz/' },
    openGraph: {
      title: `Best Jewelry Retailer Quiz — Find Your Match ${year}`,
      description: 'Answer 7 questions and get instantly matched with the top 3 jewelers for your style, stone preference, and budget.',
      type: 'website',
    },
  }
}

const FAQ_ITEMS = [
  { q: 'Is Blue Nile or James Allen better for engagement rings?', a: 'Both are top-tier online retailers that eliminate traditional retail markups. James Allen is superior for its groundbreaking 360° HD video technology, allowing close inspection of every diamond. Blue Nile is renowned for its massive inventory of GIA-certified stones. Your choice depends on whether you value digital inspection technology or sheer selection volume more.' },
  { q: 'Which is better: diamond, lab diamond, or moissanite?', a: '"Better" depends entirely on your budget and values. Natural Diamonds offer irreplaceable heritage and resale value. Lab Diamonds are chemically identical to natural diamonds but offer significantly better price-to-size value and full traceability. Moissanite offers maximum brilliance and carat size for the lowest cost — ideal for buyers who want the most visual impact per dollar.' },
  { q: 'How can I get the biggest diamond for my budget?', a: 'There are two proven strategies: (1) Choose a Lab-Grown Diamond over a natural one — they save 40–60% of the cost for the same 4Cs grade. (2) Opt for Moissanite, which is priced even lower while offering greater brilliance. You can filter all options by carat weight on Blue Nile\'s inventory to find the largest stone within your exact budget.' },
  { q: 'Is a GIA certificate required when buying a diamond online?', a: 'While not legally required, a GIA or IGI certificate is essential for verifying the quality and value of any high-value diamond. Never buy a diamond without one. Both James Allen and Blue Nile provide full certificate transparency for every diamond sold, including the ability to verify your stone using the GIA report number.' },
  { q: 'Who should I choose if I want a completely custom, bespoke ring?', a: 'If your vision requires a ring that is truly one-of-a-kind — beyond standard setting options — we strongly recommend Taylor & Hart. They specialize in bespoke custom design, guiding you through the entire creative process from initial sketch to final production. Perfect for highly personalized engagement rings.' },
  { q: 'Which diamond shape sparkles the most?', a: 'The Round Brilliant cut is engineered to produce the maximum amount of brilliance (white light return) and fire (rainbow sparkle). For detailed, real-time comparisons of sparkle between shapes, James Allen\'s 360° videos are the best tool available online — you can compare how each cut performs under light before buying.' },
  { q: 'Where can I find high-quality colored gemstone engagement rings?', a: 'For custom rings featuring certified sapphires, rubies, or emeralds, our top recommendation is GemsNY. They specialize in high-quality colored stones and offer a vast selection of loose gems for custom settings — far exceeding the typical selection found at mass-market retailers. Taylor & Hart also excels in bespoke colored gemstone rings.' },
  { q: 'What are the most durable and unique wedding bands for men?', a: 'For high-durability materials like tungsten, titanium, cobalt, or meteorite, Larson Jewelers is the industry leader. They specialize in non-traditional and highly durable men\'s and women\'s wedding bands built for a lifetime of wear. Their selection of alternative metal bands is unmatched in the online jewelry space.' },
  { q: 'Are online diamonds ethically and responsibly sourced?', a: 'The industry has significantly improved transparency. Reputable online retailers adhere strictly to the Kimberley Process to prevent conflict diamonds. Furthermore, retailers like Blue Nile and James Allen offer Lab-Grown Diamonds, which provide guaranteed origin and full traceability — the most ethical option available today.' },
  { q: 'Where should I shop for affordable, trendy, or sentimental fashion jewelry?', a: 'For everyday fashion jewelry, affordable gifts, and custom name necklaces, the best value is found at large retailers like Amazon and specialists like Mint & Lilly. They offer a huge selection of accessible pieces that are perfect for trend-driven styles, sentimental wear, and gifts at every price point.' },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Jewelry Retailer Quiz', item: 'https://moissanitebyaurelia.com/best-jewelry-retailer-quiz/' },
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

export default function BestJewelryRetailerQuizPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/best-jewelry-retailer-quiz/',
    dateModified: iso,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Interactive Quiz</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Best Jewelry Retailer Quiz
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Stop guessing which jeweler to buy from. Answer 7 questions about your stone preference, budget, and style — and get matched with your top 3 retailers instantly.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Quiz */}
        <div className="max-w-2xl mx-auto mb-16">
          <JewelryRetailerQuiz />
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How the Retailer Matching Works</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              The quiz maps your answers to a buying persona — then cross-references your stone preference, confidence factors, budget, aesthetic, and purpose to surface the three jewelers most aligned with your profile. Here&apos;s who each retailer is best for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { retailer: 'Blue Nile', best: 'Largest GIA-certified inventory. Best for buyers who want maximum selection and proven trust — publicly traded since 1999.' },
                { retailer: 'James Allen', best: 'Best for visual buyers. Their 360° HD diamond viewer lets you inspect every facet before purchasing — a major confidence booster.' },
                { retailer: 'Charles & Colvard', best: 'The original moissanite brand. Forever One DEF colorless moissanite in every shape and size. Ideal for brilliant value seekers.' },
                { retailer: 'Taylor & Hart', best: 'Best for bespoke custom rings. A guided design process from sketch to production — for when standard settings aren\'t enough.' },
                { retailer: 'GemsNY', best: 'Specialists in certified colored gemstones — sapphires, rubies, emeralds. A vast selection for custom colored stone settings.' },
                { retailer: 'Larson Jewelers', best: 'Industry leader for alternative metal wedding bands — tungsten, titanium, meteorite. Built for durability and lifelong wear.' },
              ].map(item => (
                <div key={item.retailer} className="bg-surface border border-border rounded-xl p-4">
                  <p className="font-medium text-dark text-sm mb-1">{item.retailer}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{item.best}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">{year} Price Comparison — Stone Types</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">Stone Type</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">1.00 ct Price</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Best Retailer</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Natural Diamond', '$5,000–$8,000', 'Blue Nile', 'Legacy & investment'],
                    ['Lab Diamond', '$800–$1,800', 'James Allen', 'Ethics & value'],
                    ['Moissanite', '$400–$600', 'Charles & Colvard', 'Maximum brilliance'],
                    ['Blue Sapphire', '$1,000–$6,000', 'GemsNY', 'Color & uniqueness'],
                  ].map(([stone, price, retailer, best], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{stone}</td>
                      <td className="px-4 py-3 text-text-muted">{price}</td>
                      <td className="px-4 py-3 text-accent font-medium">{retailer}</td>
                      <td className="px-4 py-3 text-text-muted">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-subtle text-xs mt-2">Prices are approximate retail for G/VS2 equivalent quality. {year} market data.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Jewelry Retailer Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
