import type { Metadata } from 'next'
import PearlValueCalculator from '@/components/calculators/PearlValueCalculator'

export const metadata: Metadata = {
  title: 'Pearl Value Calculator — Estimate Pearl Price | Moissanite by Aurelia',
  description: 'Estimate the value of any pearl. Enter origin, type (freshwater, Akoya, South Sea, Tahitian), size, luster, shape, and surface quality for an instant estimate.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/pearl-value-calculator/' },
  openGraph: {
    title: 'Pearl Value Calculator — How Much Is My Pearl Worth?',
    description: 'Instantly estimate pearl values for freshwater, Akoya, South Sea, and Tahitian pearls based on size, luster, shape, and surface quality.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What factors determine pearl value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pearl value is determined by five main factors: luster (sharpness of reflections), surface quality (fewer blemishes = more value), shape (round commands highest premium), size (exponentially rarer as size increases), and origin (natural pearls are 5–10x more valuable than cultured).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most valuable pearl type?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Sea pearls, grown in Pinctada maxima oysters in Australia and the Philippines, are the most valuable cultured pearl type. Large round South Sea pearls (14–18mm) can fetch thousands per pearl. Natural saltwater pearls from the Persian Gulf are even rarer and more valuable.',
      },
    },
  ],
}

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
            Estimate the retail value of any pearl — freshwater, Akoya, South Sea, or Tahitian. Enter the key quality factors for an instant price estimate.
          </p>
        </header>

        <PearlValueCalculator />
      </div>
    </>
  )
}
