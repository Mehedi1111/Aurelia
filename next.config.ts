import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  async rewrites() {
    // WordPress backend URL — add a DNS A record for cms.moissanitebyaurelia.com
    // pointing to 156.67.73.18 (Hostinger IP) so this works after domain switches to Vercel
    const WP = 'https://moissanitebyaurelia.com'

    // WordPress Pages (not posts) that need to be proxied — these have no Next.js route
    const WP_PAGES = [
      'diamond-finger-coverage-calculator',
      'lab-diamond-vs-moissanite-price-calculator',
      'moissanite-price-calculator',
      'diamond-rate-calculator',
      'diamond-appraisal-calculator',
      'diamond-resale-price-calculator',
      'moissanite-vs-diamond-price-calculator',
      'jewelry-coupons',
      'blue-nile-promo-code',
      'james-allen-promotional-code',
      'best-jewelry-retailer-quiz',
      'faq',
      'engagement-ring-inspiration-gallery',
    ]

    return [
      // Proxy Lasso affiliate redirect links to WordPress backend
      { source: '/go/:path*', destination: `${WP}/go/:path*` },
      // Keep WordPress admin and REST API accessible
      { source: '/wp-admin/:path*', destination: `${WP}/wp-admin/:path*` },
      { source: '/wp-login.php', destination: `${WP}/wp-login.php` },
      { source: '/wp-json/:path*', destination: `${WP}/wp-json/:path*` },
      // WordPress Pages without Next.js routes — proxy through to WordPress
      ...WP_PAGES.map(slug => ({
        source: `/${slug}/`,
        destination: `${WP}/${slug}/`,
      })),
      // Also match without trailing slash
      ...WP_PAGES.map(slug => ({
        source: `/${slug}`,
        destination: `${WP}/${slug}/`,
      })),
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
