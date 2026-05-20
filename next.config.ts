import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  async rewrites() {
    // WordPress lives at cms.moissanitebyaurelia.com (Hostinger).
    // Main domain moissanitebyaurelia.com now points to Vercel — never proxy back to it.
    const WP = 'https://cms.moissanitebyaurelia.com'

    const WP_PAGES = [
      'faq',
      'engagement-ring-inspiration-gallery',
    ]

    return [
      // ── Media files ── fixes all images after domain switch to Vercel
      { source: '/wp-content/:path*', destination: `${WP}/wp-content/:path*` },
      // ── GraphQL ── keeps WPGraphQL accessible via main domain too
      { source: '/graphql', destination: `${WP}/graphql` },
      // ── WordPress admin ──
      { source: '/wp-admin/:path*',              destination: `${WP}/wp-admin/:path*` },
      { source: '/wp-login.php',                 destination: `${WP}/wp-login.php` },
      { source: '/keys-to-affordable-jewelry',   destination: `${WP}/keys-to-affordable-jewelry` },
      { source: '/keys-to-affordable-jewelry/',  destination: `${WP}/keys-to-affordable-jewelry/` },
      { source: '/wp-json/:path*',  destination: `${WP}/wp-json/:path*` },
      // ── Lasso affiliate redirects ──
      { source: '/go/:path*', destination: `${WP}/go/:path*` },
      // ── WordPress Pages with no Next.js route ──
      ...WP_PAGES.map(slug => ({ source: `/${slug}/`, destination: `${WP}/${slug}/` })),
      ...WP_PAGES.map(slug => ({ source: `/${slug}`,  destination: `${WP}/${slug}/` })),
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ]
  },
}

export default nextConfig
