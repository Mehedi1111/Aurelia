import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook called by WordPress when you publish or update a post/product.
 * Install the "WP Webhooks" plugin on WordPress and point it to:
 *   https://moissanitebyaurelia.com/api/revalidate?secret=YOUR_SECRET
 *
 * Set REVALIDATE_SECRET in your Vercel environment variables.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json() as { slug?: string; type?: string }

    // Revalidate everything tagged 'wordpress'
    revalidateTag('wordpress')

    // Also revalidate the specific slug if provided
    if (body.slug) {
      const path = body.type === 'product' ? `/product/${body.slug}` : `/${body.slug}`
      revalidatePath(path)
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch {
    revalidateTag('wordpress')
    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Revalidation endpoint ready' })
}
