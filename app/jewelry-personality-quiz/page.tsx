import type { Metadata } from 'next'
import DiamondIQQuiz from '@/components/quiz/DiamondIQQuiz'

export const metadata: Metadata = {
  title: 'Jewelry Personality Quiz — Find Your Perfect Diamond',
  description: 'Test your Diamond IQ! Can you tell natural from lab-grown? Take our interactive quiz and discover which jewelry is right for you.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/jewelry-personality-quiz/' },
}

const AFFILIATE_LINKS = [
  {
    retailer: 'Blue Nile',
    desc: '#1 online diamond retailer — GIA certified, lowest prices',
    cta: 'Shop Blue Nile',
    badge: 'Best Selection',
    href: 'https://www.bluenile.com/?a_aid=66fc3592af524&a_cid=55e51e63',
    badgeColor: 'bg-[#d19b8a]',
  },
  {
    retailer: 'James Allen',
    desc: '360° HD diamond videos — see every angle before you buy',
    cta: 'Shop James Allen',
    badge: 'Best Visualization',
    href: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309',
    badgeColor: 'bg-[#111111]',
  },
  {
    retailer: 'Rare Carat',
    desc: 'AI-powered diamond comparison — find the best deal instantly',
    cta: 'Compare Diamonds',
    badge: 'Best Deals',
    href: 'https://www.rarecarat.com/',
    badgeColor: 'bg-emerald-700',
  },
]

export default function QuizPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">

      {/* Header */}
      <header className="text-center">
        <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-4">Interactive Quiz</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-dark mb-4 text-balance">
          Jewelry Personality Quiz
        </h1>
        <p className="text-text-muted text-sm leading-relaxed max-w-lg mx-auto">
          Discover your jewelry style, test your diamond knowledge, and find the perfect ring — with honest recommendations and the best affiliate deals.
        </p>
      </header>

      {/* Diamond IQ Quiz */}
      <section>
        <DiamondIQQuiz />
      </section>

      {/* Moissanite vs Diamond */}
      <section className="border border-border rounded-2xl overflow-hidden">
        <div className="bg-surface px-6 py-5 border-b border-border">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-1">Question 2</p>
          <h2 className="font-serif text-xl text-dark">Which suits your lifestyle?</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Moissanite',
              desc: 'Nearly as hard as diamond (9.25 Mohs). More brilliance, fraction of the cost. Eco-friendly by design.',
              price: 'From $300',
              stat: '9.25× harder than glass',
              href: 'https://www.charlesandcolvard.com/?ref=aureliamoissanite',
              cta: 'Shop Moissanite',
              color: 'border-[#d19b8a]',
              headColor: 'text-[#d19b8a]',
            },
            {
              title: 'Natural Diamond',
              desc: 'The hardest natural substance. Timeless, universally recognized, retains sentimental value.',
              price: 'From $1,500',
              stat: '10 Mohs — the hardest',
              href: 'https://www.bluenile.com/diamonds?a_aid=66fc3592af524&a_cid=55e51e63',
              cta: 'Shop Diamonds',
              color: 'border-yellow-400/60',
              headColor: 'text-yellow-600',
            },
          ].map(opt => (
            <div key={opt.title} className={`border-2 ${opt.color} rounded-xl p-5 flex flex-col`}>
              <h3 className={`font-serif text-lg mb-2 ${opt.headColor}`}>{opt.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed flex-1 mb-3">{opt.desc}</p>
              <p className="text-xs text-text-subtle mb-1">{opt.stat}</p>
              <p className="text-dark font-semibold text-sm mb-4">{opt.price}</p>
              <a
                href={opt.href}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="block text-center border border-dark text-dark text-xs font-semibold py-2.5 rounded-lg hover:bg-dark hover:text-white transition-colors"
              >
                {opt.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate partner directory */}
      <section>
        <h2 className="font-serif text-2xl text-dark mb-2">Where to Buy</h2>
        <p className="text-text-muted text-sm mb-6">Our trusted affiliate partners — vetted, reviewed, and recommended by Aurelia.</p>
        <div className="space-y-3">
          {AFFILIATE_LINKS.map(link => (
            <a
              key={link.retailer}
              href={link.href}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group flex items-center justify-between gap-4 border border-border hover:border-accent rounded-xl px-5 py-4 transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`${link.badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                  {link.badge}
                </span>
                <div className="min-w-0">
                  <p className="text-dark font-semibold text-sm group-hover:text-accent transition-colors">{link.retailer}</p>
                  <p className="text-text-muted text-xs leading-tight truncate">{link.desc}</p>
                </div>
              </div>
              <span className="text-accent text-xs font-semibold whitespace-nowrap flex-shrink-0 group-hover:text-accent-dark transition-colors">
                {link.cta} →
              </span>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-text-subtle mt-4 leading-relaxed">
          Affiliate disclosure: We earn a commission when you purchase through these links, at no extra cost to you. This is how we keep our guides free and unbiased.
        </p>
      </section>

    </div>
  )
}
