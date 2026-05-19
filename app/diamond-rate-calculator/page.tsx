import type { Metadata } from 'next'
import DiamondRateCalculator from '@/components/calculators/DiamondRateCalculator'

export const metadata: Metadata = {
  title: 'Diamond Rate Calculator — Fair Price Estimate | Moissanite by Aurelia',
  description: 'Find the fair market price for any diamond. Enter carat, color, clarity, and shape to get an accurate price range plus 30-day market trend data.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/diamond-rate-calculator/' },
  openGraph: {
    title: 'Diamond Rate Calculator — What Should I Pay?',
    description: 'Instantly calculate a fair market price for any natural or lab-grown diamond based on 4Cs. See price ranges and 30-day market trends.',
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a fair price for a 1 carat diamond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fair price for a 1 carat round brilliant natural diamond in G color and VS2 clarity is approximately $4,500–6,500. Lab-grown equivalents cost 70–80% less, typically $1,000–1,800.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does diamond shape affect price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Round brilliant diamonds command a 10–25% premium over fancy shapes due to higher rough diamond waste in cutting. Fancy shapes like oval, cushion, and pear offer more visual size per dollar.',
      },
    },
  ],
}

export default function DiamondRateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Free Tool</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Diamond Rate Calculator
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Get a fair price estimate for any diamond before you buy or sell — see the market range and per-carat price in seconds.
          </p>
        </header>

        <DiamondRateCalculator />
      </div>
    </>
  )
}
