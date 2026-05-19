import type { Metadata } from 'next'
import MoissaniteDiamondComparisonCalculator from '@/components/calculators/MoissaniteDiamondComparisonCalculator'

export const metadata: Metadata = {
  title: 'Moissanite vs Diamond Price Calculator — Compare Savings | Moissanite by Aurelia',
  description: 'Compare moissanite and diamond prices side by side. See exactly how much you save with moissanite for any shape, carat, color, and clarity combination.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/moissanite-vs-diamond-price-calculator/' },
  openGraph: {
    title: 'Moissanite vs Diamond Price Calculator',
    description: 'Side-by-side price comparison: see how much you save choosing moissanite over a natural diamond for any carat size and shape.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much cheaper is moissanite than diamond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Moissanite is typically 85–95% less expensive than natural diamonds of similar size. A 1-carat round natural diamond averages $5,000–7,000; a comparable moissanite runs $300–600.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is moissanite a good alternative to diamond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — moissanite is an excellent diamond alternative. It scores 9.25 on the Mohs hardness scale (vs 10 for diamond), has higher brilliance and fire, and is ethically sourced from labs. The main difference is that moissanite is not carbon-based and has a different composition than diamond.',
      },
    },
  ],
}

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
            Compare diamond and moissanite prices side by side. See your potential savings for any shape, size, color, and clarity combination.
          </p>
        </header>

        <MoissaniteDiamondComparisonCalculator />
      </div>
    </>
  )
}
