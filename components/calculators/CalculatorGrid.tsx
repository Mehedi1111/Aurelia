import Link from 'next/link'

const CALCULATORS = [
  {
    title: 'Diamond Appraisal',
    desc: 'Estimate your diamond\'s full market value',
    href: '/diamond-appraisal-calculator/',
    icon: '💎',
  },
  {
    title: 'Diamond Rate',
    desc: 'Get a fair price estimate for any diamond',
    href: '/diamond-rate-calculator/',
    icon: '📊',
  },
  {
    title: 'Diamond Resale',
    desc: 'See what your diamond is worth to sell',
    href: '/diamond-resale-price-calculator/',
    icon: '🔄',
  },
  {
    title: 'Finger Coverage',
    desc: 'How much of your finger will the diamond cover',
    href: '/diamond-finger-coverage-calculator/',
    icon: '💍',
  },
  {
    title: 'Moissanite vs Diamond',
    desc: 'Compare prices side by side',
    href: '/moissanite-vs-diamond-price-calculator/',
    icon: '⚖️',
  },
  {
    title: 'Moissanite Price',
    desc: 'Find the best moissanite price by retailer',
    href: '/moissanite-price-calculator/',
    icon: '✨',
  },
  {
    title: 'Pearl Value',
    desc: 'Estimate the value of any pearl',
    href: '/pearl-value-calculator/',
    icon: '🫧',
  },
]

interface CalculatorGridProps {
  current?: string
}

export default function CalculatorGrid({ current }: CalculatorGridProps) {
  const others = CALCULATORS.filter(c => c.href !== current)
  return (
    <section className="mt-14 pt-10 border-t border-border">
      <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1">Free Tools</p>
      <h2 className="font-serif text-2xl text-dark mb-6">Explore Other Calculators</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {others.map(calc => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group flex flex-col gap-2 border border-border rounded-xl p-4 hover:border-accent hover:shadow-md transition-all duration-200 bg-card"
          >
            <span className="text-2xl">{calc.icon}</span>
            <span className="font-serif text-sm text-dark group-hover:text-accent transition-colors leading-snug">{calc.title}</span>
            <span className="text-[11px] text-text-subtle leading-snug">{calc.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
