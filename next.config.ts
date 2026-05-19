import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  async rewrites() {
    return [
      // Proxy Lasso affiliate redirect links to WordPress backend
      {
        source: '/go/:path*',
        destination: 'https://cms.moissanitebyaurelia.com/go/:path*',
      },
      // Keep WordPress admin accessible
      {
        source: '/wp-admin/:path*',
        destination: 'https://cms.moissanitebyaurelia.com/wp-admin/:path*',
      },
      {
        source: '/wp-login.php',
        destination: 'https://cms.moissanitebyaurelia.com/wp-login.php',
      },
      // Keep WordPress REST API accessible for any plugins that need it
      {
        source: '/wp-json/:path*',
        destination: 'https://cms.moissanitebyaurelia.com/wp-json/:path*',
      },
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
