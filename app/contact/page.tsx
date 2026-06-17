import type { Metadata } from 'next'
import ContactForm from '@/components/ui/ContactForm'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Contact Mehedi Hasan | Moissanite by Aurelia',
  description: 'Get in touch with Mehedi Hasan — jewelry educator and founder of Moissanite by Aurelia. Questions about diamonds, moissanite, media inquiries, or collaboration.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/contact/' },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moissanitebyaurelia.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://moissanitebyaurelia.com/contact/' },
  ],
}

const RESPONSE_TIMES = [
  { type: 'General Questions', time: '1–2 business days' },
  { type: 'Media Inquiries', time: 'Same or next business day' },
  { type: 'Collaboration / Partnership', time: '2–3 business days' },
]

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent text-[11px] uppercase tracking-widest font-medium mb-3">Get in Touch</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark mb-4 text-balance leading-tight">
            Contact
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-lg mx-auto">
            Questions about jewelry, a diamond you&apos;re considering, or a media inquiry — send a message below. Every message goes directly to Mehedi.
          </p>
        </header>

        <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <p className="font-serif text-lg text-dark mb-4">Direct Email</p>
              <a
                href="mailto:hello@moissanitebyaurelia.com"
                className="inline-flex items-center gap-2 text-accent hover:text-dark transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@moissanitebyaurelia.com
              </a>
            </div>

            <div>
              <p className="font-serif text-lg text-dark mb-4">Response Times</p>
              <div className="space-y-3">
                {RESPONSE_TIMES.map(rt => (
                  <div key={rt.type} className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs font-medium text-dark mb-1">{rt.type}</p>
                    <p className="text-xs text-text-muted">{rt.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-serif text-lg text-dark mb-4">What I Can Help With</p>
              <ul className="space-y-2">
                {[
                  'Diamond buying advice',
                  'Moissanite vs diamond questions',
                  'Engagement ring guidance',
                  'Retailer recommendations',
                  'Gemstone identification',
                  'Media & press inquiries',
                  'Affiliate / collaboration',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>
      </div>
    </>
  )
}
