import type { Metadata } from 'next'
import MoissanitePriceCalculator from '@/components/calculators/MoissanitePriceCalculator'

export const metadata: Metadata = {
  title: 'Moissanite Price Calculator — Compare Retailers | Moissanite by Aurelia',
  description: 'Compare moissanite prices across Charles & Colvard, James Allen, and Amazon. Find the best deal on any shape and carat weight instantly.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/moissanite-price-calculator/' },
  openGraph: {
    title: 'Moissanite Price Calculator — Compare C&C, James Allen & Amazon',
    description: 'See moissanite prices across all major retailers side by side. Find the best deal on any carat and shape combination.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best place to buy moissanite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Charles & Colvard is the original moissanite brand with the highest quality control (Forever One line). James Allen offers competitive prices with excellent 360° video for every stone. Amazon offers the widest price range and fastest shipping, but quality varies — look for brands like Charles & Colvard or Starlanka on Amazon.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a 1-carat moissanite cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 1-carat round moissanite typically costs $300–500 at Charles & Colvard (Forever One DEF colorless), $350–550 at James Allen, and $150–400 on Amazon depending on brand and quality. Fancy shapes are typically 10–20% less than round.',
      },
    },
  ],
}

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
            Compare moissanite prices across Charles &amp; Colvard, James Allen, and Amazon — find the best deal for any shape and carat weight.
          </p>
        </header>

        <MoissanitePriceCalculator />
      </div>
    </>
  )
}
