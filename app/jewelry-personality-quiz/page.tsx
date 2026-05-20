import type { Metadata } from 'next'
import GemIQQuiz from '@/components/ui/GemIQQuiz'
import { getCurrentDateInfo } from '@/lib/utils/currentDate'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { year } = getCurrentDateInfo()
  return {
    title: `Jewelry Personality Quiz — Discover Your Gemstone ${year}`,
    description: `Test your jewelry IQ with our interactive gemstone quizzes. Natural vs lab diamond, moissanite vs diamond, pearl, opal, and emerald challenges — plus discover your gemstone personality type.`,
    alternates: { canonical: 'https://moissanitebyaurelia.com/jewelry-personality-quiz/' },
    openGraph: {
      title: `Jewelry Personality Quiz & Gemstone IQ Tests ${year}`,
      description: 'Six interactive gemstone challenges — discover what your jewelry preferences reveal about your personality.',
      type: 'website',
    },
  }
}

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
      { '@type': 'ListItem', position: 2, name: 'Jewelry Personality Quiz', item: 'https://moissanitebyaurelia.com/jewelry-personality-quiz/' },
    ],
  },
]

export default function JewelryPersonalityQuizPage() {
  const { year, monthYear, iso } = getCurrentDateInfo()
  const dateModSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://moissanitebyaurelia.com/jewelry-personality-quiz/',
    dateModified: iso,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dateModSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Interactive Gem Challenges</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Jewelry Personality Quiz
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
            Six interactive challenges to test your gemstone eye — then discover what your choices reveal about your jewelry personality. Can you tell the diamond from the moissanite? The natural pearl from the cultured?
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Updated: <time dateTime={iso} className="font-medium text-dark">{monthYear}</time>
          </div>
        </header>

        {/* IQ Test 1: Diamond IQ */}
        <section className="max-w-3xl mx-auto mb-8">
          <GemIQQuiz
            title="Diamond IQ Test: Which is the Natural Diamond?"
            description={<>Two identical diamonds: GIA Certified, 1.51ct, D Color, VVS1, Ideal Cut. One is a rare natural gem, the other a lab-grown marvel worth a fraction of the price. <strong className="text-white">Click the one you believe is natural.</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/09/james-allen-1.51-carat-d-color-vvs1-excellent-ideal-cut-gia-lab-grown-diamond.png', imgAlt: 'Lab-Grown Diamond 1.51ct D VVS1', label: 'The Lab-Grown Diamond', price: '$2,390', priceStyle: 'cyan', correct: false },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/09/blue-nile-1.51-carat-d-color-vvs1-excellent-ideal-cut-gia-natural-diamond.png', imgAlt: 'Natural Diamond 1.51ct D VVS1', label: 'The Natural Diamond', price: '$16,530', priceStyle: 'gold', correct: true },
            ]}
            correctMessage={<>You&apos;ve got a brilliant eye! You correctly identified the <strong style={{ color: '#FFD700' }}>natural diamond</strong>. Its rarity and origin story are what create its extraordinary value. Ready to admire it up close?</>}
            incorrectMessage={<>Don&apos;t worry — they&apos;re designed to be visually identical. You chose the <strong style={{ color: '#00E6E6' }}>lab-grown diamond</strong>, a marvel of technology with the same fire and brilliance for a fraction of the cost. Let&apos;s explore both.</>}
            ctas={[
              { label: 'Examine the Natural Diamond', href: 'https://www.bluenile.com/diamond-details/24464030?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz', primary: true },
              { label: 'Explore Lab-Grown Diamonds', href: 'https://www.jamesallen.com/loose-diamonds/round-cut/1.51-carat-d-color-vvs1-clarity-excellent-cut-sku-25671908?a_aid=66fc3592af524&a_cid=dfef9309&chan=quiz', primary: false },
            ]}
          />
        </section>

        {/* IQ Test 2: Diamond vs Moissanite */}
        <section className="max-w-3xl mx-auto mb-8">
          <GemIQQuiz
            title="Diamond vs. Moissanite: The Pro Test"
            description={<>One of these 2.48ct gems is a Diamond, the other is a Moissanite. One costs <strong className="text-white">$39,000</strong>, the other just <strong className="text-white">$1,180</strong>. <strong className="text-white">Click the one you believe is the Diamond.</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/08/diamond-1.png', imgAlt: 'Gemstone 1', label: 'The Diamond', price: '$39,000', priceStyle: 'gold', correct: true },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/08/moissanite.png', imgAlt: 'Gemstone 2', label: 'The Moissanite', price: '$1,180', priceStyle: 'cyan', correct: false },
            ]}
            correctMessage={<>Incredible eye! You correctly spotted the <strong style={{ color: '#FFD700' }}>natural diamond</strong>. It carries a timeless legacy of rarity and tradition. Ready to see its famous fire up close?</>}
            incorrectMessage={<>A tough one! You chose the brilliant <strong style={{ color: '#00E6E6' }}>moissanite</strong>. With nearly identical sparkle for a fraction of the cost, it&apos;s an amazing modern choice. Let&apos;s compare them both.</>}
            ctas={[
              { label: 'Examine the Diamond', href: 'https://www.jamesallen.com/loose-diamonds/round-cut/2.49-carat-g-color-vs1-clarity-excellent-cut-sku-25372630?a_aid=66fc3592af524&a_cid=dfef9309', primary: true },
              { label: 'Explore the Moissanite', href: 'https://www.jamesallen.com/gemstones/moissanite/2.48-carat-round-sku-79574?a_aid=66fc3592af524&a_cid=dfef9309', primary: false },
            ]}
          />
        </section>

        {/* IQ Test 3: Pearl */}
        <section className="max-w-3xl mx-auto mb-8">
          <GemIQQuiz
            title="Think You're a Pearl Pro?"
            description={<>One necklace sells for <strong style={{ color: '#C0C0C0' }}>$870</strong>, the other sold at auction for <strong style={{ color: '#FFD700' }}>$175,000</strong>. <strong className="text-white">Can you spot the legendary Natural Pearl necklace?</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2024/12/A-SINGLE-STRAND-NATURAL-PEARL-NECKLACE.jpg', imgAlt: 'Single-Strand Natural Pearl Necklace', label: 'The Natural Pearl Necklace', price: '$175,000', priceStyle: 'gold', correct: true },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2024/12/blue-nile-pearl.jpg', imgAlt: 'Freshwater Cultured Pearl Strand Necklace', label: 'The Cultured Pearl Necklace', price: '$870', priceStyle: 'silver', correct: false },
            ]}
            correctMessage={<>Amazing! You correctly identified the <strong style={{ color: '#FFD700' }}>Natural Pearl Necklace</strong>. A true treasure of the ocean — extreme rarity commands legendary prices. A fantastic eye for historical value!</>}
            incorrectMessage={<>Very tricky! You chose the beautiful <strong style={{ color: '#C0C0C0' }}>Cultured Pearl Necklace</strong>. It offers the same classic elegance for an accessible price. Let&apos;s explore the beauty of both!</>}
            ctas={[
              { label: 'Shop Exquisite Pearl Jewelry', href: 'https://www.bluenile.com/jewelry/pearl-jewelry/all?Pearl=Akoya,Tahitian,SouthSea&sort=PriceDesc&a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz', primary: true },
              { label: 'Shop Cultured Pearl Necklaces', href: 'https://www.bluenile.com/jewelry/necklaces/16-freshwater-cultured-pearl-strand-necklace-in-14k-white-gold-80-85mm-item-195810?a_aid=66fc3592af524&a_cid=55e51e63', primary: false },
            ]}
            imageShape="rounded"
          />
        </section>

        {/* IQ Test 4: Opal */}
        <section className="max-w-3xl mx-auto mb-8">
          <GemIQQuiz
            title="Opal IQ Test: Solid or Doublet?"
            description={<>One of these Australian opals is <strong style={{ color: '#00E6E6' }}>$89</strong>. The other is a collector&apos;s piece worth <strong style={{ color: '#FFD700' }}>$32,745</strong>. <strong className="text-white">Can you spot the rare solid gemstone?</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/10/australian-doublet-opal.jpg', imgAlt: 'Australian Doublet Opal', label: 'The Opal Doublet', price: '$89', priceStyle: 'cyan', correct: false },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/10/australian-opal.jpg', imgAlt: 'Solid Australian Black Opal', label: 'The Solid Australian Opal', price: '$32,745', priceStyle: 'gold', correct: true },
            ]}
            correctMessage={<>Incredible! You correctly identified the <strong style={{ color: '#FFD700' }}>Solid Australian Opal</strong>. Its breathtaking color and backing are one solid gem — a phenomenal eye for authenticity!</>}
            incorrectMessage={<>Expert-level! You chose the <strong style={{ color: '#00E6E6' }}>Opal Doublet</strong>. It uses a thin layer of real opal for stunning color at an unbelievably accessible price. Now you know the secret!</>}
            ctas={[
              { label: 'Shop Investment-Grade Opals', href: 'https://amzn.to/48ORFsV', primary: true },
              { label: 'Explore Opal Doublets', href: 'https://amzn.to/46BYAV8', primary: false },
            ]}
            imageShape="rounded"
          />
        </section>

        {/* IQ Test 5: January Birthstone */}
        <section className="max-w-3xl mx-auto mb-8">
          <GemIQQuiz
            title="January Birthstone IQ Test: Garnet or Glass?"
            description={<>Two red stones. One is a <strong className="text-white">natural January Garnet</strong> worth <strong style={{ color: '#FFD700' }}>$2,171</strong>. The other is a <strong className="text-white">red glass simulant</strong> worth just <strong style={{ color: '#00E6E6' }}>$7</strong>. <strong className="text-white">Which is the real birthstone?</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/12/garnet-loose-stone-scaled.png', imgAlt: 'Natural Garnet January Birthstone', label: 'The Natural Garnet', price: '$2,171', priceStyle: 'gold', correct: true },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/12/red-glass-stone-1-scaled.png', imgAlt: 'Red Glass Garnet Simulant', label: 'The Red Glass Simulant', price: '$7', priceStyle: 'cyan', correct: false },
            ]}
            correctMessage={<>Sharp eye! You correctly identified the <strong style={{ color: '#FFD700' }}>natural Garnet</strong>. Its deep, rich red comes from natural iron and manganese — impossible to replicate in glass.</>}
            incorrectMessage={<>Nice guess! You chose the <strong style={{ color: '#00E6E6' }}>red glass simulant</strong>. They can look remarkably similar, but a trained eye spots the depth and natural inclusions of real garnet. Explore the real deal below!</>}
            ctas={[
              { label: 'Shop Natural Garnets', href: 'https://gemsny.sjv.io/gO9kNv', primary: true },
              { label: 'Explore Garnet Jewelry', href: 'https://amzn.to/3MMqLco', primary: false },
            ]}
          />
        </section>

        {/* IQ Test 6: Emerald */}
        <section className="max-w-3xl mx-auto mb-16">
          <GemIQQuiz
            title="Emerald IQ Test: Can You Spot the Value?"
            description={<>Two magnificent green emeralds, both 2.5+ carats. One is priced at <strong style={{ color: '#00ff88' }}>$16,910</strong>, the other is a collector&apos;s specimen valued at <strong style={{ color: '#FFD700' }}>$58,780</strong>. <strong className="text-white">Which commands the higher premium?</strong></>}
            options={[
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/12/emrald-no-1.png', imgAlt: 'Emerald 1', label: '2.93ct Round Emerald', price: '$16,910', priceStyle: 'green', correct: false },
              { imgSrc: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/12/emerald-no-2.png', imgAlt: 'Emerald 2', label: "2.83ct Collector's Emerald", price: '$58,780', priceStyle: 'gold', correct: true },
            ]}
            correctMessage={<>Exceptional! You spotted the <strong style={{ color: '#FFD700' }}>$58,780 collector&apos;s emerald</strong>. Superior color saturation and clarity drive that premium — emerald connoisseurs pay for depth of green, not just size.</>}
            incorrectMessage={<>The difference is subtle! The <strong style={{ color: '#00ff88' }}>$16,910 emerald</strong> is beautiful, but the other&apos;s deeper color saturation commands a 3× premium. Emerald quality is all in the green.</>}
            ctas={[
              { label: 'Shop the $16,910 Emerald', href: 'https://www.jamesallen.com/gemstones/green-emerald/2.93-carat-round-sku-114655?a_aid=66fc3592af524&a_cid=dfef9309&chan=quiz', primary: false },
              { label: 'Shop the $58,780 Emerald', href: 'https://www.bluenile.com/gemstones/green-emerald/2.83-carat-emerald-sku-95988?a_aid=66fc3592af524&a_cid=55e51e63&chan=quiz', primary: true },
            ]}
            imageShape="rounded"
          />
        </section>

        {/* Personality Decoder Article */}
        <article className="max-w-3xl mx-auto space-y-10">
          <header>
            <h2 className="font-serif text-3xl text-dark mb-4">The Gemstone Personality Decoder</h2>
            <p className="text-text-muted text-base leading-relaxed border-b border-border pb-6">
              You&apos;ve taken the challenges — now discover what your choices reveal. Your jewelry preference isn&apos;t random. It&apos;s a subconscious signal of your deepest values. Here&apos;s what each stone says about you in {year}.
            </p>
          </header>

          <section>
            <h3 className="font-serif text-2xl text-dark mb-4">The Quick Match Matrix</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="text-left px-4 py-3 font-normal font-serif">If You Chose…</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Your Archetype</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Style Vibe</th>
                    <th className="text-left px-4 py-3 font-normal font-serif">Key Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Diamond', 'The Traditionalist', 'Timeless, Elegant, Safe', 'Perfection'],
                    ['Moissanite', 'The Smart Disruptor', 'Modern, Practical, Savvy', 'Value & Logic'],
                    ['Sapphire', 'The Intellectual', 'Royal, Calm, Deep', 'Wisdom'],
                    ['Ruby', 'The Power Player', 'Bold, Fiery, Expressive', 'Passion'],
                    ['Emerald', 'The Vintage Soul', 'Earthy, Romantic, Unique', 'History'],
                    ['Pearl', 'The Classic Icon', 'Soft, Feminine, Polished', 'Tradition'],
                  ].map(([stone, archetype, vibe, value], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-surface' : ''}>
                      <td className="px-4 py-3 font-medium text-dark">{stone}</td>
                      <td className="px-4 py-3 text-accent font-medium">{archetype}</td>
                      <td className="px-4 py-3 text-text-muted">{vibe}</td>
                      <td className="px-4 py-3 text-text-muted">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {[
            { title: '1. The Diamond Personality: "The Unbreakable Standard"', body: 'If you consistently pick the Natural Diamond, you value Legacy and Authenticity. You appreciate order, clarity, and enduring value — you aren\'t swayed by trends. You view jewelry as an heirloom to pass down, not just an accessory for today. Your struggle: Analysis Paralysis. You obsess over the 4Cs because you demand perfection.', tip: 'To master the technical details you crave, study our Diamond Grading Chart to understand cut, color, clarity, and carat — and where you can save without compromising quality.' },
            { title: '2. The Moissanite Personality: "The Value Hacker"', body: 'If you prefer the fiery rainbow sparkle of Moissanite, you are a Pragmatist. You look at a $20,000 diamond and think, "I could buy a car with that." You love Moissanite because it offers more fire for 5% of the price. You are confident enough to ignore brand names and make data-driven decisions.', tip: 'Since you care about getting the best technology, read our Best Moissanite Brand guide to ensure you get a crisp, colorless Forever One stone — not a cloudy generic.' },
            { title: '3. The Sapphire Personality: "Quiet Confidence"', body: 'If you\'re drawn to deep blue sapphires, you value Loyalty and Truth. You don\'t need to be the loudest in the room. Like a Royal Blue Sapphire, you command attention through elegance, not noise. You likely prefer "Old Money" aesthetics over flashy trends — think Princess Diana\'s iconic sapphire ring.', tip: 'Sapphire lovers prioritize color saturation over simple sparkle. When shopping, focus on hue (vivid blue), tone (medium to medium-dark), and saturation — not just carat weight.' },
            { title: '4. The Ruby Personality: "Main Character Energy"', body: 'If you picked the Ruby, you are Fearless. Ruby is the King of Gems — it represents raw passion and power. If this is your stone, you love intensely and dress to be seen. You view jewelry as armor. High-quality rubies are actually rarer than diamonds, making this the ultimate status symbol for the bold.', tip: 'For the finest certified rubies and colored gemstones, GemsNY offers a vast selection with full certification — ideal for custom ring settings.' },
            { title: '5. The Emerald Personality: "Sophisticated Nature"', body: 'If you chose the green stone, you are likely a Creative or Romantic. Emeralds are famous for their "Jardin" — the natural inclusions that make every stone unique. You embrace imperfections. You love vintage shopping, nature walks, and art history. You understand that true beauty has character.', tip: 'Emerald quality is about the green — color saturation and tone matter far more than clarity. A slightly included emerald with vivid green is worth far more than a pale, clean stone.' },
            { title: '6. The Pearl Personality: "The CEO of Grace"', body: 'If you spotted the $175,000 Natural Pearl strand, you have an eye for Subtle Luxury. Pearls represent wisdom gained through experience. You are polished, professional, and composed. You prefer a look that glows rather than sparkles aggressively. Grace Kelly, Coco Chanel, Audrey Hepburn — your tribe.', tip: 'Pearl luster is the single most important quality factor. A pearl with high luster appears to glow from within — you can see a sharp, bright reflection in its surface. Always prioritize luster over size.' },
          ].map(({ title, body, tip }) => (
            <section key={title}>
              <h3 className="font-serif text-xl text-dark mb-3">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-3">{body}</p>
              <div className="bg-surface border-l-4 border-accent rounded-r-xl p-4">
                <p className="text-text-muted text-sm leading-relaxed">
                  <span className="font-semibold text-dark">Expert Tip: </span>{tip}
                </p>
              </div>
            </section>
          ))}
        </article>

      </div>
    </>
  )
}
