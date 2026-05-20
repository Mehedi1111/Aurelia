import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, getAllProductCategories } from '@/lib/graphql/queries/products'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Shop Fine Jewelry',
  description: 'Curated fine jewelry picks — moissanite, diamond, and gemstone pieces from trusted retailers. Hand-selected by Mehedi Hasan.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/shop-fine-jewelry/' },
}

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllProductCategories(),
  ])

  const breadcrumbs = [{ label: 'Shop Fine Jewelry' }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-6 mb-8 pb-8 border-b border-border">
        <p className="text-accent text-[11px] uppercase tracking-widest font-medium text-center mb-3">Curated Picks</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark text-center mb-4 text-balance leading-tight">
          Shop Fine Jewelry
        </h1>
        <p className="text-text-muted text-center max-w-2xl mx-auto leading-relaxed text-sm">
          Hand-selected pieces from trusted retailers — moissanite, diamonds, and gemstones at every budget.
        </p>

        {/* Category filter pills — dynamic from WordPress */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-xs border border-accent text-accent bg-accent-light font-medium px-4 py-2 rounded-full">
            All
          </span>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/product-category/${cat.slug}/`}
              className="text-xs text-text-muted border border-border bg-bg px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </header>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="text-center text-xs text-text-subtle mt-8">
            Showing {products.length} products
          </p>
        </>
      ) : (
        <div className="text-center py-20 text-text-muted">
          <p className="font-serif text-xl mb-2">No products yet</p>
          <p className="text-sm">Check back soon — new pieces added weekly.</p>
        </div>
      )}
    </div>
  )
}

export const revalidate = 3600
