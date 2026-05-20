import type { Metadata } from 'next'
import Image from 'next/image'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Jewelry Coupons & Promo Codes — Best Deals ${year}`,
    description: `Verified jewelry coupons and affiliate deals for ${year}. Shop Blue Nile, Charles & Colvard, Ritani, VRAI, Taylor & Hart, and more — savings applied automatically, no expired codes.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/jewelry-coupons/' },
    openGraph: {
      title: `Best Jewelry Coupons & Deals ${year} — Verified Affiliate Links`,
      description: 'Shop top jewelry retailers with verified affiliate links. Blue Nile, Charles & Colvard, Ritani, VRAI, Amazon jewelry deals and more.',
      type: 'website',
    },
  }
}

const BRANDS = [
  {
    name: 'Blue Nile',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/blue-nile-png-logo.png.webp',
    deal: 'Up to 40% Off Clearance',
    desc: 'GIA-certified diamonds, engagement rings & fine jewelry at 20–40% below retail.',
    cta: 'Shop Blue Nile',
    href: 'https://www.bluenile.com/clear-the-vault?a_aid=66fc3592af524&a_cid=55e51e63&chan=blog',
    badge: 'Top Pick',
  },
  {
    name: 'Charles & Colvard',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/charles-and-colvard-logo-png.png.webp',
    deal: 'Save on Forever One Moissanite',
    desc: 'The original moissanite brand. DEF colorless, lifetime warranty, free shipping.',
    cta: 'Shop C&C',
    href: 'https://charlesandcolvard.sjv.io/YRmOWB',
    badge: 'Best Moissanite',
  },
  {
    name: 'Ritani',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/ritani-logo-png.png.webp',
    deal: 'Free In-Store Preview',
    desc: 'Try before you buy at a local jeweler — free preview, 30-day returns.',
    cta: 'Shop Ritani',
    href: 'https://ritani.vxca.net/09vP6L',
    badge: null,
  },
  {
    name: 'VRAI',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/vrai-logo-png.png.webp',
    deal: 'Sustainable Lab-Grown Diamonds',
    desc: 'Zero-emission created diamonds. Direct-to-consumer pricing, free shipping.',
    cta: 'Shop VRAI',
    href: 'https://vraiandoro.qyov.net/195YN9',
    badge: null,
  },
  {
    name: 'Taylor & Hart',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/taylor-and-hart-logo-png.png.webp',
    deal: 'Custom Engagement Rings',
    desc: 'Bespoke ring design with 3D preview. GIA diamonds, unique settings.',
    cta: 'Shop Taylor & Hart',
    href: 'https://taylorhart.pxf.io/YRYKOR',
    badge: null,
  },
  {
    name: 'Larson Jewelers',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/larson-jewelrs-logo.png.webp',
    deal: 'Wedding Bands & Fine Jewelry',
    desc: 'Extensive selection of wedding bands, anniversary rings, and fine jewelry.',
    cta: 'Shop Larson',
    href: 'https://larson-jewelers.sjv.io/qznKKY',
    badge: null,
  },
  {
    name: 'Mint & Lilly',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/mint-and-lilly-logo.png.webp',
    deal: 'Personalized Jewelry from $19',
    desc: 'Custom name necklaces, initial rings, and personalized gifts.',
    cta: 'Shop Mint & Lilly',
    href: 'https://imp.i300907.net/qzvom5',
    badge: null,
  },
  {
    name: 'Amazon Jewelry',
    logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/07/aamzon-round-logo-scaled.png',
    deal: 'Jewelry Deals — Prime Shipping',
    desc: 'Huge selection from trusted brands. Prime eligible — fast free shipping.',
    cta: 'Shop Amazon',
    href: 'https://amzn.to/4tPvmKK',
    badge: null,
  },
  {
    name: 'Rare Carat',
    logo: null,
    deal: 'Best Price on Any Diamond',
    desc: 'AI-powered diamond comparison. Find GIA-certified diamonds at wholesale prices.',
    cta: 'Shop Rare Carat',
    href: 'https://www.awin1.com/cread.php?awinmid=44489&awinaffid=1756887&ued=https%3A%2F%2Fwww.rarecarat.com%2Fdiamond-search%2Fa1117e98-6a00-45ec-97d7-c37f09f6d999%3Fshape%3Dround',
    badge: 'Price Guarantee',
  },
  {
    name: 'GemsNY',
    logo: null,
    deal: 'Fine Gemstone Jewelry',
    desc: 'Sapphires, rubies, emeralds and fine gemstone jewelry at competitive prices.',
    cta: 'Shop GemsNY',
    href: 'https://gemsny.sjv.io/Z6zEmk',
    badge: null,
  },
  {
    name: 'Mindful Souls',
    logo: null,
    deal: 'Spiritual & Crystal Jewelry',
    desc: 'Meaningful jewelry featuring crystals, birthstones, and spiritual symbols.',
    cta: 'Shop Mindful Souls',
    href: 'https://mindfulsouls.sjv.io/POgnkQ',
    badge: null,
  },
]

const FAQ_ITEMS = [
  { q: "How do I apply a Blue Nile promo code to my order?", a: "Applying a Blue Nile promo code is done at checkout. After adding items to your cart, look for the 'Promo Code' or 'Have a promo code?' field in your shopping bag. Enter your code exactly as it appears and click Apply. The discount will reflect in your order total. Important: apply the code before entering payment information." },
  { q: "What's the best way to maximize savings with a James Allen promotional code?", a: "To maximize savings at James Allen, time your purchase during a holiday sale like Black Friday or Valentine's Day. James Allen's prices on loose diamonds are already highly competitive. Applying a percentage-based discount code to the setting — rather than the entire ring — often yields the best results, as loose diamonds are sometimes excluded from promotions." },
  { q: "Are there specific Charles & Colvard discount codes for moissanite jewelry?", a: "Yes, Charles & Colvard frequently releases discount codes specifically for their moissanite jewelry, including their premium Forever One collection. These promotions can range from a percentage off certain collections to tiered discounts based on your total spending. Subscribing to their newsletter is the best way to access these brand-specific codes." },
  { q: "How do I know I'm getting a fair price on a diamond, even with a coupon?", a: "A fair price is determined by the diamond's quality. First, insist on a GIA or AGS grading report — these are the industry standard for accuracy. Second, understand the 4Cs and prioritize Cut grade, as it has the greatest effect on sparkle. Third, use the diamond's GIA report number to compare its price against similarly graded diamonds on other reputable retailers. This cross-shopping validates that the coupon provides a genuine discount on a competitively priced stone." },
  { q: "Which is more budget-friendly: moissanite or a lab-grown diamond?", a: "Moissanite is significantly more budget-friendly than a lab-grown diamond. For a given carat size and visual quality, a moissanite can be a fraction of the cost of a lab diamond. While both are created in a lab and offer an ethical, sustainable alternative to mined diamonds, their chemical composition and pricing differ significantly. Moissanite is silicon carbide; lab diamonds are pure carbon. If your primary goal is the largest, most brilliant gemstone for the lowest price, moissanite is the clear winner." },
  { q: "Do these discount codes affect the long-term value of my jewelry?", a: "No, using a discount code has absolutely no impact on the intrinsic or long-term value of your jewelry. The value is determined by the quality of the materials — the diamond's 4Cs and certification, and the metal's purity — and the craftsmanship. A discount code is simply a marketing tool that reduces your initial purchase price and will not appear on any appraisal or certification document." },
  { q: "Can I find deals on pearls or other gemstones on this page?", a: "Yes, many promotions from retailers like Blue Nile and GemsNY apply to a wide range of fine jewelry including items with pearls, sapphires, rubies, and emeralds. Holiday sales — especially Mother's Day — often feature significant discounts on non-diamond jewelry. Always check the terms of a specific coupon for any category exclusions." },
  { q: "Is it possible to use a discount on a custom-designed engagement ring?", a: "This depends on the retailer's policy. For 'Build Your Own Ring' services on major sites like James Allen, discounts can often be applied to the setting component. For fully bespoke custom designs from jewelers like Taylor & Hart, promotional codes are less common. You will typically need to inquire directly with the jeweler for custom work." },
  { q: "Is it cheaper to buy a diamond online?", a: "Yes, in the vast majority of cases, buying a diamond online is significantly cheaper. Online retailers like Blue Nile and James Allen have much lower overhead costs than traditional brick-and-mortar jewelry stores. They don't pay for expensive retail storefronts, extensive in-store inventory, or as many salespeople. This lean business model allows them to pass savings to the consumer — often resulting in prices 30–50% lower for a GIA-certified diamond of the same quality." },
  { q: "What is the difference between Charles & Colvard moissanite and other moissanite?", a: "Charles & Colvard were the original creators of gem-quality moissanite for jewelry and held the master patent for years. Their premium Forever One line is known for being completely colorless (D-E-F color grade) and of exceptional clarity. While other brands now produce quality moissanite since the patents expired, Charles & Colvard's long history and stringent quality control mean they are considered the industry benchmark for the highest-grade material." },
  { q: "Does Ritani have a good reputation?", a: "Yes, Ritani has a solid reputation in the online diamond industry. They are known for their unique business model that blends online pricing with a physical presence — allowing customers to preview their chosen diamond or ring for free at a local partner jeweler before committing to the purchase. This free in-store preview feature provides a layer of trust that many buyers appreciate." },
  { q: "Is Blue Nile a legitimate website?", a: "Yes, Blue Nile is an extremely legitimate and reputable website. They are one of the original and largest online retailers of certified diamonds and fine jewelry in the world, founded in 1999. Publicly traded, they have built a strong reputation for transparent pricing, GIA-certified diamonds, and excellent customer service — including a 30-day return policy and lifetime warranties." },
]

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Jewelry Coupons', item: 'https://moissanitebyaurelia.com/jewelry-coupons/' },
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

export default function JewelryCouponsPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/jewelry-coupons/',
    dateModified: iso,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Verified Deals</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Jewelry Coupons &amp; Promo Codes
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            {BRANDS.length} verified affiliate deals from top jewelry retailers. Click any link — savings are applied automatically. No expired codes, no email required.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Deals verified: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {BRANDS.map(brand => (
            <div key={brand.name} className="flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">

              {/* Logo area */}
              <div className="h-20 flex items-center justify-center bg-surface px-6 border-b border-border relative">
                {brand.badge && (
                  <span className="absolute top-2 right-2 text-[10px] font-semibold bg-accent text-white rounded-full px-2 py-0.5">
                    {brand.badge}
                  </span>
                )}
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={140}
                    height={48}
                    className="max-h-10 max-w-full object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="font-serif text-lg text-dark text-center leading-tight">{brand.name}</span>
                )}
              </div>

              {/* Deal info */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                    <span className="text-[10px] text-green-700 font-semibold uppercase tracking-wide">Deal Verified</span>
                  </div>
                  <p className="font-semibold text-dark text-sm leading-snug mb-1">{brand.deal}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{brand.desc}</p>
                </div>
                <div className="mt-auto flex flex-col gap-1.5">
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="block text-center bg-dark text-white rounded-lg py-2.5 text-xs font-semibold hover:bg-accent transition-colors duration-200"
                  >
                    {brand.cta} →
                  </a>
                  <p className="text-center text-[9px] text-text-subtle">Affiliate link</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Section */}
        <article className="max-w-3xl mx-auto space-y-10">

          <section>
            <h2 className="font-serif text-2xl text-dark mb-4">How to Save the Most on Jewelry in {year}</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Online jewelry retailers consistently offer 20–50% lower prices than brick-and-mortar stores on GIA-certified diamonds and fine jewelry. The biggest opportunities to save:
            </p>
            <div className="space-y-3">
              {[
                { rank: '1', title: 'Choose Online-First Retailers', body: 'Blue Nile, James Allen, and Ritani operate on low overhead — no mall rent, no commissioned salespeople. That saving goes directly to you.' },
                { rank: '2', title: 'Apply the 4Cs Sweet Spot', body: 'Buy G–H color and VS2–SI1 clarity instead of D-FL. You save 30–40% for a stone that looks identical to the naked eye. Spend the savings on carat weight.' },
                { rank: '3', title: 'Consider Moissanite', body: 'Charles & Colvard Forever One moissanite delivers more fire and brilliance than a diamond at roughly 10% of the cost. A 2ct moissanite runs ~$1,000 vs ~$25,000 for a natural diamond.' },
                { rank: '4', title: 'Shop Holiday Sales', body: 'Black Friday, Valentine\'s Day, and Mother\'s Day bring the deepest discounts of the year. Set a reminder and bookmark this page — deals are updated daily during peak seasons.' },
              ].map(item => (
                <div key={item.rank} className="flex gap-4 bg-surface border border-border rounded-xl p-4">
                  <div className="w-7 h-7 rounded-full bg-dark text-white text-xs font-semibold flex items-center justify-center shrink-0">{item.rank}</div>
                  <div className="min-w-0">
                    <p className="font-medium text-dark text-sm">{item.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-dark mb-6">Jewelry Coupon Questions Answered</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </section>

        </article>
      </div>
    </>
  )
}
