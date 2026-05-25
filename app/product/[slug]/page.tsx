import '../../wordpress.css'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProductSlugs, getProductBySlug } from '@/lib/graphql/queries/products'
import PostBody from '@/components/blog/PostBody'
import AffiliateButton from '@/components/products/AffiliateButton'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import type { WPProductCard } from '@/types/wordpress'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  const seo = product.seo
  const stripBrand = (t: string) => t.replace(/\s*[|—]\s*Moissanite by Aurelia\s*$/i, '').trim()
  return {
    title: stripBrand(seo.title || product.name),
    description: seo.metaDesc || '',
    alternates: { canonical: seo.canonical || `https://moissanitebyaurelia.com/product/${slug}/` },
    openGraph: {
      title: seo.opengraphTitle || seo.title,
      description: seo.opengraphDescription || seo.metaDesc,
      type: 'website',
      images: product.image ? [{ url: product.image.sourceUrl }] : [],
    },
  }
}

function formatPrice(price: string | null | undefined) {
  return price?.replace(/<[^>]+>/g, '').trim() ?? ''
}

function discountPercent(regular: string | null | undefined, sale: string | null | undefined) {
  if (!sale || !regular) return null
  const reg = parseFloat(regular.replace(/[^0-9.]/g, ''))
  const sal = parseFloat(sale.replace(/[^0-9.]/g, ''))
  if (!reg || !sal) return null
  return Math.round((1 - sal / reg) * 100)
}

const TRUST_BADGES = [
  { label: 'Free Shipping' },
  { label: 'Secure Checkout' },
  { label: '30-Day Returns' },
  { label: '1-Year Warranty' },
]

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const discount = discountPercent(product.regularPrice, product.salePrice)
  const primaryCategory = product.productCategories.nodes[0]
  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.galleryImages?.nodes || []),
  ]

  const breadcrumbs = [
    { label: 'Shop', href: '/shop-fine-jewelry/' },
    ...(primaryCategory ? [{ label: primaryCategory.name, href: `/product-category/${primaryCategory.slug}/` }] : []),
    { label: product.name },
  ]

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription?.replace(/<[^>]+>/g, '') || '',
    image: allImages.map(img => img.sourceUrl),
    brand: { '@type': 'Brand', name: 'Moissanite by Aurelia' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: (product.salePrice || product.price || '').replace(/[^0-9.]/g, ''),
      availability: 'https://schema.org/InStock',
      url: `https://moissanitebyaurelia.com/product/${slug}/`,
    },
    ...(product.averageRating > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.averageRating,
        reviewCount: product.reviewCount,
      },
    } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-6 lg:grid lg:grid-cols-2 lg:gap-14 lg:items-start">

          {/* ── Image gallery ── */}
          <div className="mb-10 lg:mb-0 lg:sticky lg:top-24">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface">
              {allImages[0] ? (
                <Image
                  src={allImages[0].sourceUrl}
                  alt={allImages[0].altText || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface">
                  <svg className="w-16 h-16 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
                </div>
              )}
              {discount !== null && (
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {allImages.slice(0, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden bg-surface cursor-pointer ring-1 ring-border hover:ring-2 hover:ring-accent transition-all"
                  >
                    <Image
                      src={img.sourceUrl}
                      alt={img.altText || `${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ── */}
          <div>
            {/* Categories */}
            {product.productCategories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-3">
                {product.productCategories.nodes.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/product-category/${cat.slug}/`}
                    className="text-[11px] font-semibold text-accent uppercase tracking-widest hover:text-accent-dark transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="font-serif text-2xl md:text-3xl text-dark leading-snug mb-3 text-balance">
              {product.name}
            </h1>

            {/* Star rating */}
            {product.averageRating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.averageRating) ? 'text-accent' : 'text-border'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-text-muted">
                  {product.averageRating.toFixed(1)}{' '}
                  <span className="text-text-subtle">({product.reviewCount} reviews)</span>
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3 mb-6 pb-6 border-b border-border">
              {product.onSale && product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-dark">{formatPrice(product.salePrice)}</span>
                  <span className="text-lg text-text-subtle line-through">{formatPrice(product.regularPrice)}</span>
                  {discount !== null && (
                    <span className="bg-accent-light text-accent-dark text-xs font-semibold px-2.5 py-1 rounded-full">
                      Save {discount}%
                    </span>
                  )}
                </>
              ) : (
                <span className="text-3xl font-bold text-dark">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <div
                className="text-text-muted text-sm leading-relaxed mb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* CTA */}
            <div className="mb-6">
              <AffiliateButton
                href={product.externalUrl || `https://moissanitebyaurelia.com/product/${slug}/`}
                label="Shop This Product"
                size="lg"
                className="w-full"
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {TRUST_BADGES.map(badge => (
                <div key={badge.label} className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2.5">
                  <span className="text-xs font-medium text-text-muted">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Specifications */}
            {(product.attributes?.nodes?.length ?? 0) > 0 && (
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-dark px-4 py-3">
                  <p className="font-serif text-white text-sm">Specifications</p>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {product.attributes.nodes.map((attr, i) => (
                      <tr key={attr.name} className={i % 2 === 0 ? 'bg-surface' : 'bg-card'}>
                        <td className="px-4 py-2.5 font-medium text-text-muted w-2/5 border-b border-border">
                          {attr.name}
                        </td>
                        <td className="px-4 py-2.5 text-dark border-b border-border">
                          {attr.options.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── Full description ── */}
        {product.description && (
          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="font-serif text-2xl text-dark mb-8 pb-4 border-b border-border">
              About This Product
            </h2>
            <div className="max-w-3xl">
              <PostBody content={product.description} pageUrl={`https://moissanitebyaurelia.com/product/${slug}/`} />
            </div>
          </div>
        )}

        {/* ── Related products ── */}
        {(product.related?.nodes?.length ?? 0) > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="font-serif text-2xl text-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {product.related?.nodes.slice(0, 8).map(related => (
                <ProductCard key={related.slug} product={related as WPProductCard} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export const revalidate = 21600
