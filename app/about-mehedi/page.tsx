import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'About Mehedi Hasan — Jewelry & Gemstone Expert | Moissanite by Aurelia',
  description: 'Mehedi Hasan is a jewelry educator and gemstone researcher cited in People, Us Weekly, and Page Six. Learn about his background, methodology, and why 500K+ readers trust Moissanite by Aurelia.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/about-mehedi/' },
  openGraph: {
    title: 'About Mehedi Hasan — Jewelry & Gemstone Expert',
    description: 'Cited in People, Us Weekly, and Page Six. Founder of Moissanite by Aurelia — trusted jewelry education since 2022.',
    type: 'profile',
  },
}

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'About Mehedi', item: 'https://moissanitebyaurelia.com/about-mehedi/' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mehedi Hasan',
    url: 'https://moissanitebyaurelia.com/about-mehedi/',
    sameAs: [
      'https://www.pinterest.com/moissanitebyaurelia',
      'https://www.instagram.com/moissanitebyaurelia',
      'https://www.facebook.com/moissanitebyaurelia',
    ],
    jobTitle: 'Jewelry Educator & Gemstone Researcher',
    description: 'Jewelry educator and gemstone researcher. Founded Moissanite by Aurelia in 2022. Cited in People, Us Weekly, and Page Six.',
    foundingDate: '2022',
    knowsAbout: ['Moissanite', 'Diamonds', 'Lab-Grown Diamonds', 'Gemstones', 'Engagement Rings', 'Fine Jewelry'],
    worksFor: {
      '@type': 'Organization',
      name: 'Moissanite by Aurelia',
      url: 'https://moissanitebyaurelia.com',
    },
    award: [
      'Cited in People Magazine',
      'Cited in Us Weekly',
      'Cited in Page Six',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/about-mehedi/',
    name: 'About Mehedi Hasan',
    description: 'Jewelry educator and gemstone researcher cited in People, Us Weekly, and Page Six. Founder of Moissanite by Aurelia.',
    author: {
      '@type': 'Person',
      name: 'Mehedi Hasan',
    },
  },
]

const STATS = [
  { value: '500K+', label: 'Annual Readers' },
  { value: '3+', label: 'Years Educating' },
  { value: '98%', label: 'Return Visitors' },
  { value: '3+', label: 'Media Awards' },
]

const EXPERTISE = [
  { title: 'Moissanite & Lab-Grown Diamonds', body: 'Deep comparative research on moissanite vs diamond across cut quality, optical performance, and price-per-carat. Mehedi\'s moissanite content is among the most referenced in the space.' },
  { title: 'Natural Diamond Grading', body: 'Practical guidance on the 4Cs — cut, color, clarity, carat — translated for buyers rather than gemologists. Focus on what actually matters at different budget levels.' },
  { title: 'Retailer Analysis', body: 'Hands-on evaluation of online diamond retailers including James Allen, Blue Nile, Rare Carat, Charles & Colvard, and emerging brands. Reviews are built around real buyer journeys.' },
  { title: 'Gemstone Research', body: 'Research-backed content on sapphires, opals, pearls, garnets, and emeralds — covering value, origin, treatment disclosure, and where to buy without getting burned.' },
]

const MEDIA = [
  { name: 'People', detail: 'Quoted on engagement ring buying trends and moissanite adoption' },
  { name: 'Us Weekly', detail: 'Cited for jewelry gift guides and gemstone comparisons' },
  { name: 'Page Six', detail: 'Referenced on celebrity jewelry trends and diamond alternatives' },
]

export default function AboutMehediPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <header className="max-w-3xl mx-auto mb-14">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="shrink-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                <Image
                  src="https://moissanitebyaurelia.com/wp-content/uploads/2024/08/Mehedi-Hasan.jpg"
                  alt="Mehedi Hasan — Jewelry & Gemstone Expert"
                  fill
                  sizes="160px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-2">Jewelry Educator & Gemstone Researcher</p>
              <h1 className="font-serif text-3xl sm:text-4xl text-dark mb-3">Mehedi Hasan</h1>
              <p className="text-text-muted text-sm leading-relaxed mb-4 max-w-lg">
                Founder of Moissanite by Aurelia. I research diamonds, moissanite, and fine gemstones so buyers can spend less time second-guessing and more time enjoying their purchase. Cited in People, Us Weekly, and Page Six.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {MEDIA.map(m => (
                  <span key={m.name} className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent border border-accent/30 rounded-full px-3 py-1">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto space-y-12">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-5 text-center">
                <p className="font-serif text-3xl text-accent mb-1">{s.value}</p>
                <p className="text-xs text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Story */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Why I Started Moissanite by Aurelia</h2>
            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
              <p>
                When I was researching engagement rings for the first time, I was overwhelmed. Every source either worked for a retailer or recycled the same surface-level advice. Nobody explained <em>why</em> a VS1 vs VS2 clarity difference matters at certain carat weights — or doesn&apos;t. Nobody told you when to buy a lab-grown diamond and when a natural stone is worth the premium.
              </p>
              <p>
                I started Moissanite by Aurelia in 2022 to be that resource. Not a jewelry store. Not a marketing site dressed up as editorial. A genuine attempt to explain fine jewelry in a way that helps real buyers make decisions they feel good about for years afterward.
              </p>
              <p>
                Over three years and 500K+ annual readers later, the mission is the same: honest, research-backed jewelry education — with affiliate links to retailers I&apos;d actually send a friend to.
              </p>
            </div>
          </section>

          {/* Media citations */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">As Cited In</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MEDIA.map(m => (
                <div key={m.name} className="bg-surface border border-border rounded-xl p-5">
                  <p className="font-serif text-lg text-dark mb-2">{m.name}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expertise areas */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">Areas of Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPERTISE.map(e => (
                <div key={e.title} className="bg-surface border border-border rounded-xl p-5">
                  <p className="font-medium text-dark text-sm mb-2">{e.title}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{e.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How I Research</h2>
            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
              <p>
                Every retailer review on this site is based on actual purchase experience or detailed mystery-shopping. I compare policies, certification standards, return processes, and pricing across comparable stones — not just what the retailer wants you to know.
              </p>
              <p>
                For gemstone guides, I cross-reference GIA research publications, IGI grading standards, and primary source pricing data. When I cite a price range, it reflects current market data — not a number I pulled from a manufacturer&apos;s marketing page.
              </p>
              <p>
                Affiliate links are how this site generates revenue — but they never influence editorial recommendations. If a retailer offers poor value or a bad experience, I say so. The long-term trust of 500K+ annual readers is worth more than a commission.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-surface border border-border rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl text-dark mb-3">Start Learning</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Whether you&apos;re buying your first diamond or comparing moissanite options, start with the guides below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/moissanite/" className="inline-flex items-center justify-center gap-2 bg-dark text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors duration-200">
                Moissanite Guide →
              </Link>
              <Link href="/category/diamond-buying-guide/" className="inline-flex items-center justify-center gap-2 bg-surface border-2 border-accent text-dark rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-white transition-colors duration-200">
                Diamond Buying Guide →
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center">
            <p className="text-text-muted text-sm">
              Media inquiries, collaboration requests, or questions?{' '}
              <a href="mailto:hello@moissanitebyaurelia.com" className="text-accent hover:text-dark transition-colors font-medium">
                hello@moissanitebyaurelia.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </>
  )
}
