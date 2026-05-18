import Image from 'next/image'
import Link from 'next/link'

const MEHEDI = {
  name: 'Mehedi Hasan',
  title: 'Jewelry Expert & Founder',
  bio: 'Mehedi Hasan is the founder of Moissanite by Aurelia with nearly a decade of experience in diamonds, moissanite, and colored gemstones. His work has been cited in Us Weekly, People, and Page Six.',
  photo: 'https://moissanitebyaurelia.com/wp-content/uploads/2025/10/Mehedi-Hasan-Jewelry-diamond-moissanite-gemstone-expert.jpg',
  url: 'https://moissanitebyaurelia.com/about-mehedi/',
  email: 'hello@moissanitebyaurelia.com',
  sameAs: [
    'https://www.facebook.com/moissanitebyaurelia',
    'https://www.instagram.com/moissanitebyaurelia',
    'https://www.pinterest.com/moissanitebyaurelia',
    'https://www.linkedin.com/in/mehedi-hasan-aurelia',
  ],
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: MEHEDI.name,
  jobTitle: MEHEDI.title,
  url: MEHEDI.url,
  email: MEHEDI.email,
  image: MEHEDI.photo,
  worksFor: {
    '@type': 'Organization',
    name: 'Moissanite by Aurelia',
    url: 'https://moissanitebyaurelia.com',
  },
  knowsAbout: ['Moissanite', 'Diamonds', 'Gemstones', 'Fine Jewelry', 'Engagement Rings'],
  sameAs: MEHEDI.sameAs,
}

export default function AuthorBox() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="border border-border rounded-lg p-5 sm:p-6 mt-12">
        <p className="text-xs text-text-subtle uppercase tracking-widest font-medium mb-5">
          About the Author
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/about-mehedi/"
            className="flex-shrink-0"
            aria-label={`About ${MEHEDI.name}`}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-accent-muted">
              <Image
                src={MEHEDI.photo}
                alt={MEHEDI.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              href="/about-mehedi/"
              className="block font-serif text-lg text-dark hover:text-accent transition-colors leading-tight mb-0.5"
            >
              {MEHEDI.name}
            </Link>
            <p className="text-xs text-accent font-medium mb-3 tracking-wide">
              {MEHEDI.title}
            </p>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              {MEHEDI.bio}
            </p>
            <Link
              href="/about-mehedi/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent border border-border hover:border-accent rounded-full px-4 py-1.5 transition-colors"
            >
              Read full bio
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
