import type { Metadata } from 'next'
import Image from 'next/image'
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

const AF = 'a_aid=66fc3592af524&a_cid=55e51e63&chan=store_near_me'
const BN = 'https://www.bluenile.com/jewelry-stores'

const WP = 'https://cms.moissanitebyaurelia.com/wp-content/uploads/2025/09'

const SHOWROOMS: { state: string; mall: string; city: string; address: string; slug: string; image?: string }[] = [
  { state: 'Arizona',        mall: 'Fashion Square',         city: 'Scottsdale',    address: '7014 E Camelback Rd STE 1252, Scottsdale, AZ 85251',                  slug: 'store-fashion-square-az' },
  { state: 'California',     mall: 'Century City',           city: 'Los Angeles',   address: '10250 Santa Monica Blvd STE 1655, Los Angeles, CA 90067',             slug: 'store-centurycity-ca',        image: `${WP}/Blue-Nile-Showroom-at-Century-City.jpg.webp` },
  { state: 'California',     mall: 'Fashion Island',         city: 'Newport Beach', address: '1085 Newport Center DR Space 1085, Newport Beach, CA 92660',          slug: 'store-fashion-island-ca',     image: `${WP}/Fashion-Island-Showroom-blue-nile-1.jpg.webp` },
  { state: 'California',     mall: 'Roseville Galleria',     city: 'Roseville',     address: '1151 Galleria Blvd Suite 120, Roseville, CA 95678',                   slug: 'store-roseville-galleria-ca', image: `${WP}/Roseville-Galleria-Showroom-blue-nile.jpg.webp` },
  { state: 'California',     mall: 'Valley Fair',            city: 'Santa Clara',   address: '2855 Stevens Creek Blvd STE 1105-A105, Santa Clara, CA 95050',        slug: 'store-valleyfair-ca',         image: `${WP}/Valley-Fair-Showroom-blue-nile.jpg.webp` },
  { state: 'Florida',        mall: 'Boca Town Center',       city: 'Boca Raton',    address: '6000 Glades Rd Space 1102, Boca Raton, FL 33431',                     slug: 'store-boca-raton-fl' },
  { state: 'Florida',        mall: 'Brickell City Centre',   city: 'Miami',         address: '701 S Miami Ave Space 135-B, Miami, FL 33130',                        slug: 'store-brickell-city-center-fl' },
  { state: 'Florida',        mall: 'Mall at Millenia',       city: 'Orlando',       address: '4200 Conroy Rd Space B-160, Orlando, FL 32839',                       slug: 'store-mall-at-millenia-fl' },
  { state: 'Georgia',        mall: 'Lenox Square',           city: 'Atlanta',       address: '3393 Peachtree Road NE STE 4045, Atlanta, GA 30326',                  slug: 'store-lenox-square-ga' },
  { state: 'Michigan',       mall: 'Somerset Collection',    city: 'Troy',          address: '2800 West Big Beaver Rd Space Q-121, Troy, MI 48084',                 slug: 'store-somerset-collection-mi' },
  { state: 'New Hampshire',  mall: 'Rockingham Park',        city: 'Salem',         address: '99 Rockingham Park Blvd Suite W111A, Salem, NH 03079',                slug: 'store-rockingham-park-nh' },
  { state: 'New Jersey',     mall: 'Garden State Plaza',     city: 'Paramus',       address: '1 Garden State Plaza Space 1103, Paramus, NJ 07652',                  slug: 'store-garden-state-plaza-nj' },
  { state: 'New Jersey',     mall: 'Short Hills',            city: 'Short Hills',   address: '1200 Morris Tpke STE B254, Short Hills, NJ 07078',                    slug: 'store-short-hills-nj' },
  { state: 'New York',       mall: 'Roosevelt Field',        city: 'Garden City',   address: '1630 Old Country Rd Unit 1101B, Garden City, NY 11530',               slug: 'store-roosevelt-ny' },
  { state: 'North Carolina', mall: 'SouthPark Mall',         city: 'Charlotte',     address: '4400 Sharon Rd E-14B, Charlotte, NC 28211',                          slug: 'store-southpark-mall-nc' },
  { state: 'Oregon',         mall: 'Washington Square',      city: 'Portland',      address: '9364 SW Washington Square Rd, Portland, OR 97223',                   slug: 'store-washington-square-or' },
  { state: 'Pennsylvania',   mall: 'King of Prussia',        city: 'King of Prussia', address: '160 N Gulph Rd STE 2662, King of Prussia, PA 19406',               slug: 'store-king-of-prussia-pa' },
  { state: 'Texas',          mall: 'Domain Northside',       city: 'Austin',        address: '11700 Rock Rose Ave STE 122B, Austin, TX 78758',                     slug: 'store-domainnorthside-tx' },
  { state: 'Texas',          mall: 'Houston Galleria',       city: 'Houston',       address: '5085 Westheimer Rd STE B3556, Houston, TX 77056',                    slug: 'store-houston-galleria-tx' },
  { state: 'Texas',          mall: 'NorthPark Center',       city: 'Dallas',        address: '8687 N Central Expy Suite 794, Dallas, TX 75225',                    slug: 'store-northpark-center-tx' },
  { state: 'Virginia',       mall: 'Tysons Corner Center',   city: 'McLean',        address: '7977A Tysons Corner Ctr, McLean, VA 22102',                          slug: 'store-tysons-corner-center-va' },
  { state: 'Washington',     mall: 'Bellevue Square',        city: 'Bellevue',      address: '177 Bellevue Sq, Bellevue, WA 98004',                                slug: 'store-bellevue-square-wa' },
]

const BY_STATE = SHOWROOMS.reduce<Record<string, typeof SHOWROOMS>>((acc, loc) => {
  if (!acc[loc.state]) acc[loc.state] = []
  acc[loc.state].push(loc)
  return acc
}, {})

const FAQ_ITEMS = [
  { q: 'Do Blue Nile stores sell jewelry?', a: 'Blue Nile locations are technically showrooms, not traditional stores. They don\'t hold sellable inventory for you to buy and take home the same day. Instead, they provide a pressure-free environment to try on high-quality replicas, get expert advice, and then use their online inventory to order the perfect piece. Your final purchase is then shipped to you or the store for pickup.' },
  { q: 'What are the official Blue Nile jewelry store locations?', a: 'Blue Nile has showrooms in major metropolitan areas across the United States, from California and Texas to New York and Florida. We list all 22 current locations above. For the most current information, use the official store locator on their website.' },
  { q: 'Does Blue Nile have a store near me?', a: 'With 22 showrooms nationwide across 12 states, there is a very good chance there\'s a Blue Nile store near you if you live in or near a major city. Use the Find a Showroom button above — it provides addresses, maps, and direct links to book an appointment for your local showroom.' },
  { q: 'Are Blue Nile diamonds available at a retail store?', a: 'Yes, but in a modern way. You can\'t browse trays of diamonds like at a traditional jeweler. At a Blue Nile retail store, you sit with an expert who helps you access their entire online inventory of GIA-certified diamonds. You can view 360° videos and specs on a large screen to choose the perfect stone — giving you access to a far larger selection than any physical store could ever hold.' },
  { q: 'How can I find a Blue Nile store location?', a: 'The best and most reliable method is to visit the official Blue Nile website. They have an interactive map and a search feature to find the showroom closest to your address or zip code. Using their official locator ensures you get the correct hours and contact information.' },
  { q: 'What are the business hours for the Blue Nile store?', a: 'Business hours vary by showroom location and are often tailored to mall hours or local shopping district patterns. Because they operate primarily on a personalized consultation model, it is highly recommended to book an appointment rather than just walking in. Booking ensures you have a dedicated expert waiting for you.' },
  { q: 'Can I get a ring sized at a Blue Nile store?', a: 'Absolutely. All Blue Nile showrooms offer a range of professional jewelry services, including ring sizing. If you buy a ring and it\'s not the perfect fit, or if you have an existing piece that needs adjustment, you can bring it to any location for expert service. They also offer cleaning and repair assistance.' },
  { q: 'Can I ship my order to a Blue Nile retail store?', a: 'Yes, and it\'s one of their best features for ensuring a secure and discreet delivery. When you place your order online or in the showroom, you can choose to have it shipped directly to your nearest Blue Nile retail store. You can then pick it up at your convenience, knowing it\'s safe.' },
  { q: 'Are there any stores like Blue Nile that I can visit?', a: 'Yes, the main competitor with a similar hybrid online/physical showroom model is James Allen. They also have physical locations in select cities where you can have a hands-on experience. Both brands are leaders in the industry.' },
  { q: 'Is Blue Nile a good jewelry store for engagement rings?', a: 'Blue Nile is an excellent choice for engagement rings. They combine a massive inventory of GIA-certified diamonds with hundreds of settings, giving you nearly limitless options. Their price transparency and focus on diamond education make them one of the most trusted names in the business.' },
  { q: 'Do I need an appointment to visit a Blue Nile jewelry store?', a: 'While some locations may accept walk-ins if there is availability, making an appointment is highly recommended. An appointment guarantees you\'ll have a one-on-one session with a non-commissioned Diamond & Jewelry Expert who can dedicate their time to your needs. You can book a free appointment online for your preferred date and time.' },
  { q: 'How does the Blue Nile online store compare to in-person shopping?', a: 'It\'s designed to be a seamless experience. The online store provides endless inventory and powerful search tools, while the in-person showroom provides the tangible experience and expert guidance. You can build ideas online at home and then bring those ideas to your showroom appointment to see them come to life with physical settings.' },
  { q: 'Can I schedule a Blue Nile pickup in store?', a: 'Yes, absolutely. Scheduling a Blue Nile pickup in store is a standard, secure, and highly recommended option. It ensures your high-value purchase is never left on a doorstep and allows you to open your package in a safe environment with an expert present to answer any final questions.' },
  { q: 'What\'s the difference between Blue Nile and a traditional jewelry store?', a: 'The main differences are inventory, pressure, and price. Traditional stores have a limited, expensive physical inventory and commission-based staff. Blue Nile has a vast online inventory with lower overhead, salaried experts, and prices that are typically 30–50% lower. This model gives you more choices with zero sales pressure.' },
  { q: 'Does Blue Nile have a store in New York City?', a: 'While there isn\'t a showroom in the five boroughs of NYC proper currently, Blue Nile has a significant presence in the Tri-State Area. The closest and most popular location is the Roosevelt Field showroom in Garden City, NY on Long Island. There are also two convenient showrooms in New Jersey — Short Hills and Paramus — serving the entire greater New York City metro area.' },
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
      name: `Blue Nile — ${loc.mall}, ${loc.city}`,
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

        <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-border">
          <Image
            src="https://cms.moissanitebyaurelia.com/wp-content/uploads/2025/09/blue-nile-jewelry-store-cover.jpg.webp"
            alt="Blue Nile jewelry store showroom interior"
            width={1500}
            height={750}
            className="w-full h-auto"
            priority
          />
        </div>

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

        {/* CTA */}
        <div className="max-w-3xl mx-auto mb-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.bluenile.com/jewelry-stores?a_aid=66fc3592af524&a_cid=55e51e63&chan=store_near_me"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-block bg-dark text-white rounded-xl px-8 py-3 text-sm hover:bg-accent transition-colors"
          >
            Find a Blue Nile Showroom Near You
          </a>
          <a
            href="https://www.bluenile.com/jewelry-stores/virtual-appointment?a_aid=66fc3592af524&a_cid=55e51e63&chan=store_near_me"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-block bg-surface border border-border text-dark rounded-xl px-8 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Book a Virtual Appointment
          </a>
        </div>

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

        {/* US map */}
        <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-border">
          <Image
            src="https://cms.moissanitebyaurelia.com/wp-content/uploads/2025/09/Map-of-all-Blue-Nile-jewelry-store-locations-and-showrooms-across-the-United-States.png.webp"
            alt="Map of all Blue Nile jewelry store locations and showrooms across the United States"
            width={1500}
            height={900}
            className="w-full h-auto"
          />
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
                    <a
                      key={loc.mall}
                      href={`${BN}/${loc.slug}?${AF}`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="block bg-surface hover:bg-border transition-colors group overflow-hidden"
                    >
                      {loc.image && (
                        <Image
                          src={loc.image}
                          alt={`Blue Nile ${loc.mall} showroom in ${loc.city}`}
                          width={800}
                          height={450}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="flex items-start gap-4 px-5 py-4">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex-1">
                          <p className="font-medium text-dark text-sm group-hover:text-accent transition-colors">{loc.mall} — {loc.city}</p>
                          <p className="text-text-muted text-xs mt-0.5">{loc.address}</p>
                        </div>
                        <svg className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-text-subtle text-xs mt-4 text-center">
            Location data current as of {monthYear}. Confirm hours and availability at{' '}
            <a href="https://www.bluenile.com/jewelry-stores?a_aid=66fc3592af524&a_cid=55e51e63&chan=store_near_me" target="_blank" rel="sponsored noopener noreferrer" className="text-accent hover:text-dark transition-colors">bluenile.com/jewelry-stores</a>.
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
