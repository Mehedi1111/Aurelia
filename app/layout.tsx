import type { Metadata } from 'next'
import { Marcellus, DM_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DealsBar from '@/components/layout/DealsBar'

// Defer chatbot until after page is interactive — keeps it out of the critical JS bundle
const ChatBubble = dynamic(() => import('@/components/chatbot/ChatBubble'), { ssr: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://moissanitebyaurelia.com'),
  title: {
    default: 'Moissanite by Aurelia — Diamond, Gemstone & Moissanite Jewelry Guides',
    template: '%s | Moissanite by Aurelia',
  },
  description: 'Your trusted guide to moissanite, diamond, and gemstone jewelry. Expert reviews, comparisons, and buying guides by Aurelia.',
  openGraph: {
    type: 'website',
    siteName: 'Moissanite by Aurelia',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Moissanite by Aurelia',
  url: 'https://moissanitebyaurelia.com',
  logo: 'https://moissanitebyaurelia.com/wp-content/uploads/2024/08/AURELIA-horizontal.png.webp',
  description: 'Expert jewelry guides on moissanite, diamonds, and gemstones by Mehedi Hasan. Cited in People, Us Weekly, and Page Six.',
  founder: {
    '@type': 'Person',
    name: 'Mehedi Hasan',
    url: 'https://moissanitebyaurelia.com/about-mehedi/',
    jobTitle: 'Jewelry Expert & Founder',
    knowsAbout: ['Moissanite', 'Diamonds', 'Gemstones', 'Fine Jewelry', 'Engagement Rings', 'Lab-Grown Diamonds'],
  },
  contactPoint: { '@type': 'ContactPoint', email: 'hello@moissanitebyaurelia.com' },
  sameAs: [
    'https://www.facebook.com/moissanitebyaurelia',
    'https://www.instagram.com/moissanitebyaurelia',
    'https://www.pinterest.com/moissanitebyaurelia',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${dmSans.variable} scrollbar-thin`}>
      <body className="min-h-screen flex flex-col bg-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <DealsBar />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatBubble />
      </body>
    </html>
  )
}
