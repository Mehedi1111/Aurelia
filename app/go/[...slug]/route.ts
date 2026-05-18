import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxies Lasso affiliate /go/ redirect links to WordPress backend.
 * Visitor hits moissanitebyaurelia.com/go/jamesallen/
 * → This route forwards the request to cms.moissanitebyaurelia.com/go/jamesallen/
 * → WordPress Lasso plugin redirects to actual affiliate URL with tracking
 *
 * This preserves all your existing affiliate tracking without any data migration.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params
  const path = slug.join('/')
  const wpBackend = process.env.WORDPRESS_URL || 'https://cms.moissanitebyaurelia.com'
  const targetUrl = `${wpBackend}/go/${path}/`

  return NextResponse.redirect(targetUrl, { status: 301 })
}
