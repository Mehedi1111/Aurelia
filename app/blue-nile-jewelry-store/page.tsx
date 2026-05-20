import type { Metadata } from 'next'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Blue Nile Jewelry Store Locations ${year} — Showrooms & In-Store Experience`,
    description: `Find Blue Nile jewelry store locations for ${year}. Blue Nile operates showrooms across the US where you can try on engagement rings and consult with jewelry experts. No high-pressure sales.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/blue-nile-jewelry-store/' },
    openGraph: {
      title: `Blue Nile Jewelry Store Locations ${year}`,
      description: 'Blue Nile showroom locations, hours, and what to expect. Try on rings, consult experts, and order at online prices.',
      type: 'website',
    },
  }
}

const SHOWROOMS: { state: string; city: string; address: string }[] = [
  { state: 'California', city: 'Beverly Hills', address: '9536 Brighton Way, Beverly Hills, CA 90210' },
  { state: 'California', city: 'San Francisco', address: 'Westfield San Francisco Centre, 865 Market St, San Francisco, CA 94103' },
  { state: 'California', city: 'San Jose', address: 'Santana Row, 3055 Olin Ave, Suite 1000, San Jose, CA 95128' },
  { state: 'California', city: 'Los Angeles', address: 'Westfield Century City, 10250 Santa Monica Blvd, Los Angeles, CA 90067' },
  { state: 'Texas', city: 'Dallas', address: 'NorthPark Center, 8687 N Central Expy, Dallas, TX 75225' },
  { state: 'Texas', city: 'Houston', address: 'The Galleria, 5085 Westheimer Rd, Houston, TX 77056' },
  { state: 'Texas', city: 'Austin', address: 'Domain Northside, 11601 Domain Blvd, Austin, TX 78758' },
  { state: 'Florida', city: 'Miami', address: 'Aventura Mall, 19501 Biscayne Blvd, Aventura, FL 33180' },
  { state: 'Florida', city: 'Orlando', address: 'Mall at Millenia, 4200 Conroy Rd, Orlando, FL 32839' },
  { state: 'Florida', city: 'Tampa', address: 'International Plaza, 2223 N Westshore Blvd, Tampa, FL 33607' },
  { state: 'New York', city: 'New York City', address: '432 Park Ave, New York, NY 10022' },
  { state: 'Arizona', city: 'Scottsdale', address: 'Fashion Square, 7014-590 E Camelback Rd, Scottsdale, AZ 85251' },
  { state: 'North Carolina', city: 'Charlotte', address: 'SouthPark Mall, 4400 Sharon Rd, Charlotte, NC 28211' },
  { state: 'Oregon', city: 'Portland', address: 'Washington Square, 9585 SW Washington Square Rd, Portland, OR 97223' },
  { state: 'Pennsylvania', city: 'Philadelphia', address: 'King of Prussia Mall, 160 N Gulph Rd, King of Prussia, PA 19406' },
  { state: 'Washington', city: 'Seattle', address: 'University Village, 2601 NE University Village St, Seattle, WA 98105' },
  { state: 'Virginia', city: 'McLean', address: 'Tysons Galleria, 2001 International Dr, McLean, VA 22102' },
  { state: 'Georgia', city: 'Atlanta', address: 'Phipps Plaza, 3500 Peachtree Rd NE, Atlanta, GA 30326' },
]

const BY_STATE = SHOWROOMS.reduce<Record<string, typeof SHOWROOMS>>((acc, loc) => {
  if (!acc[loc.state]) acc[loc.state] = []
  acc[loc.state].push(loc)
  return acc
}, {})

const FAQ_ITEMS = [
  { q: 'Does Blue Nile have physical stores?', a: 'Yes — Blue Nile operates a growing network of physical showrooms across the United States. These are experience-focused locations, not traditional jewelry stores. You can try on settings, consult with jewelry experts, and view diamonds, but all orders are placed online at Blue Nile\'s website pricing. There are no in-store-only prices or sales pressure.' },
  { q: 'What can I do at a Blue Nile showroom?', a: 'At Blue Nile showrooms you can: try on a wide range of ring settings to find your preferred style, consult one-on-one with knowledgeable jewelry advisors, view diamond and gemstone samples, and use the in-store digital displays to browse Blue Nile\'s full online inventory. Orders are placed through the website — the showroom experience is designed to inform your purchase, not close it on the spot.' },
  { q: 'Are Blue Nile showroom staff on commission?', a: 'No — Blue Nile showroom staff are salaried, not commission-based. This is intentional. The no-commission model removes the high-pressure sales environment common at traditional jewelry retailers. Staff are there to educate and assist, not to upsell. This is consistently noted as a positive aspect of the Blue Nile showroom experience in customer reviews.' },
  { q: 'Do I need an appointment at a Blue Nile showroom?', a: 'Appointments are recommended for Blue Nile showroom visits, particularly for engagement ring consultations. Walk-ins are typically welcome, but scheduling an appointment in advance ensures a dedicated advisor is available to spend time with you. Appointments can usually be booked through the Blue Nile website.' },
  { q: 'Can I buy a ring in a Blue Nile showroom?', a: 'Not directly in the traditional sense — Blue Nile showrooms don\'t have a conventional point-of-sale for ring inventory. Instead, the advisor assists you in placing your order through Blue Nile\'s website during or after your visit. The pricing is identical to what you\'d pay ordering online at home. Some locations may have limited finished ring inventory available for same-day purchase.' },
  { q: 'Can I return a Blue Nile ring to a showroom?', a: 'Return policies at showrooms may vary. Blue Nile\'s standard return process involves shipping the item back using their prepaid insured label. Contact the specific showroom or Blue Nile customer service to confirm whether in-person returns are accepted at your nearest location. The standard 30-day return window and full refund policy applies regardless of return method.' },
  { q: 'How does the Blue Nile showroom experience compare to traditional jewelry stores?', a: 'Blue Nile showrooms are designed to be fundamentally different from traditional jewelry stores. Key differences: (1) No commission sales staff — advisors are educators, not closers. (2) No in-store inventory pressure — you\'re encouraged to take time. (3) Online pricing — you pay the same whether you order in-store or at home. (4) Full inventory access — digital displays browse Blue Nile\'s entire catalog, not just what\'s physically present. (5) Appointment-based — dedicated one-on-one consultation time.' },
  { q: 'Is the Blue Nile showroom pricing the same as online?', a: 'Yes — Blue Nile showroom pricing is identical to their online pricing. There are no showroom surcharges or in-store premiums. This is part of Blue Nile\'s model: the showroom is a service, not an additional cost layer. You can compare prices on Blue Nile\'s website from your phone while you\'re in the showroom and they will match exactly.' },
]

export default function BlueNileJewelryStorePage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const stateList = Object.keys(BY_STATE).sort()

  const SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
        { '@type': 'ListItem', position: 2, name: 'Blue Nile Jewelry Store', item: 'https://moissanitebyaurelia.com/blue-nile-jewelry-store/' },
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
    ...SHOWROOMS.map(loc => ({
      '@context': 'https://schema.org',
      '@type': 'JewelryStore',
      name: `Blue Nile — ${loc.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.state,
        addressCountry: 'US',
      },
      parentOrganization: {
        '@type': 'Organization',
        name: 'Blue Nile',
        url: 'https://www.bluenile.com',
      },
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: 'https://moissanitebyaurelia.com/blue-nile-jewelry-store/',
      dateModified: iso,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Showroom Locations</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Blue Nile Jewelry Store Locations
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Blue Nile operates {SHOWROOMS.length} showrooms across {stateList.length} US states — experience-focused locations where you can try on rings, consult experts, and order at online prices. No commission sales. No pressure.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Stats bar */}
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-12">
          {[
            { value: `${SHOWROOMS.length}`, label: 'Showrooms' },
            { value: `${stateList.length}`, label: 'States' },
            { value: 'Salaried', label: 'Staff Model' },
          ].map(s => (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-5 text-center">
              <p className="font-serif text-2xl text-accent mb-1">{s.value}</p>
              <p className="text-xs text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl text-dark mb-4 text-center">What to Expect at a Blue Nile Showroom</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Try On Settings', body: 'Handle and try on Blue Nile\'s ring settings across all styles — solitaire, halo, three-stone, pavé, and more.' },
              { step: '2', title: 'Consult an Expert', body: 'One-on-one time with a salaried jewelry advisor. Ask everything — cut quality, certification, setting options, sizing.' },
              { step: '3', title: 'Order at Online Prices', body: 'Place your order through Blue Nile\'s website — same pricing as ordering from home. No showroom markup.' },
            ].map(item => (
              <div key={item.step} className="bg-surface border border-border rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center font-serif text-sm mb-3">
                  {item.step}
                </div>
                <p className="font-medium text-dark text-sm mb-2">{item.title}</p>
                <p className="text-text-muted text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Showroom locations by state */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl text-dark mb-6 text-center">Showrooms by State</h2>
          <div className="space-y-6">
            {stateList.map(state => (
              <div key={state}>
                <h3 className="font-serif text-lg text-dark mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  {state}
                </h3>
                <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                  {BY_STATE[state].map(loc => (
                    <div key={loc.city} className="flex items-start gap-4 px-5 py-4 bg-surface">
                      <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-dark text-sm">{loc.city}</p>
                        <p className="text-text-muted text-xs mt-0.5">{loc.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-text-subtle text-xs mt-4 text-center">
            Location data current as of {monthYear}. Confirm hours and availability at{' '}
            <a href="https://www.bluenile.com/showrooms" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-dark transition-colors">bluenile.com/showrooms</a>.
          </p>
        </div>

        {/* Showroom vs online comparison */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl text-dark mb-4">Showroom vs Ordering Online — Key Differences</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-dark text-white">
                  <th className="text-left px-4 py-3 font-normal font-serif">Factor</th>
                  <th className="text-left px-4 py-3 font-normal font-serif">Showroom</th>
                  <th className="text-left px-4 py-3 font-normal font-serif">Online Only</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Pricing', 'Same as online', 'Same as showroom'],
                  ['Ring try-on', 'Yes — settings & styles', 'No — photos & 360° only'],
                  ['Expert consultation', 'In-person, dedicated time', 'Phone, chat, email'],
                  ['Inventory access', 'Full catalog via digital displays', 'Full catalog online'],
                  ['Sales pressure', 'None — salaried staff', 'None'],
                  ['Appointment needed', 'Recommended', 'N/A'],
                  ['Return process', 'Mail-in (same as online)', 'Mail-in with prepaid label'],
                ].map(([factor, showroom, online], i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                    <td className="px-4 py-3 font-medium text-dark">{factor}</td>
                    <td className="px-4 py-3 text-accent font-medium">{showroom}</td>
                    <td className="px-4 py-3 text-text-muted">{online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-dark mb-6 text-center">Blue Nile Showroom Questions Answered</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>

      </div>
    </>
  )
}
