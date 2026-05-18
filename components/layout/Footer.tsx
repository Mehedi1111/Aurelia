import Link from 'next/link'
import Image from 'next/image'

const COLS = {
  'Guides': [
    { label: 'Moissanite Guide',       href: '/moissanite/' },
    { label: 'Diamond Buying Guide',   href: '/category/diamond-buying-guide/' },
    { label: 'Engagement Rings',       href: '/category/diamond-buying-guide/engagement-ring-buying-guide/' },
    { label: 'Lab-Grown Diamonds',     href: '/category/lab-grown-diamond/' },
    { label: 'Sapphire Guide',         href: '/category/gemstone/sapphire-guide/' },
    { label: 'Blog',                    href: '/blog/' },
  ],
  'Reviews': [
    { label: 'James Allen Review',  href: '/james-allen-review/' },
    { label: 'Blue Nile Review',    href: '/category/blue-nile-jewelry-reviews-guide/' },
    { label: 'Rare Carat Review',   href: '/category/diamond-review/' },
    { label: 'Ritani Review',       href: '/category/diamond-review/' },
    { label: 'All Reviews',         href: '/category/diamond-review/' },
  ],
  'Tools': [
    { label: 'Diamond IQ Quiz',     href: '/jewelry-personality-quiz/' },
    { label: 'Ask Aurelia',         href: '/category/ask-aurelia/' },
    { label: 'Shop Fine Jewelry',   href: '/shop-fine-jewelry/' },
    { label: 'Best Deals',          href: '/category/diamond-buying-guide/' },
  ],
  'About': [
    { label: 'About Mehedi',         href: '/about-mehedi/' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
    { label: 'Privacy Policy',       href: '/privacy-policy/' },
    { label: 'Contact',              href: '/contact/' },
  ],
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Moissanite by Aurelia',
  url: 'https://moissanitebyaurelia.com',
  description: 'Expert guides on moissanite, diamonds, and gemstones by Mehedi Hasan. Cited in People, Us Weekly, and Page Six.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://moissanitebyaurelia.com/?s={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 bg-bg" itemScope itemType="https://schema.org/WPFooter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="Moissanite by Aurelia — Home">
              <Image
                src="https://moissanitebyaurelia.com/wp-content/uploads/2024/08/AURELIA-horizontal.png.webp"
                alt="Moissanite by Aurelia — Fine Jewelry Guides"
                width={130} height={28}
                className="h-7 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-xs text-text-muted leading-relaxed mb-3">
              Expert jewelry guides and honest reviews by{' '}
              <Link href="/about-mehedi/" className="text-accent hover:text-accent-dark transition-colors">Mehedi Hasan</Link>.
              Cited in People, Us Weekly &amp; Page Six.
            </p>
            <p className="text-xs text-text-subtle leading-relaxed mb-4">
              We earn commissions from affiliate links at no extra cost to you.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Pinterest', href: 'https://www.pinterest.com/moissanitebyaurelia', icon: <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.36-.719-.36-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.519.769 1.519 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /> },
                { label: 'Instagram', href: 'https://www.instagram.com/moissanitebyaurelia', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                { label: 'Facebook', href: 'https://www.facebook.com/moissanitebyaurelia', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Moissanite by Aurelia on ${s.label}`}
                  className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-serif text-xs text-dark tracking-widest uppercase mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-text-muted hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-subtle">
            © {new Date().getFullYear()} Moissanite by Aurelia · All rights reserved
          </p>
          <p className="text-xs text-text-subtle">
            <a href="mailto:hello@moissanitebyaurelia.com" className="hover:text-accent transition-colors">
              hello@moissanitebyaurelia.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
