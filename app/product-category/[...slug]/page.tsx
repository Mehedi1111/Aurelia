import '../../wordpress.css'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getAllProductCategories,
  getProductCategoryBySlug,
  getProductsByCategory,
} from '@/lib/graphql/queries/products'
import ProductCard from '@/components/products/ProductCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Pagination from '@/components/ui/Pagination'

const PER_PAGE = 24

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const cats = await getAllProductCategories()
  // Only generate paths for nested categories (those with a parent)
  return cats
    .filter(c => c.parent?.node?.slug)
    .map(c => ({ slug: [c.parent!.node.slug, c.slug] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categorySlug = slug[slug.length - 1]
  const cat = await getProductCategoryBySlug(categorySlug)
  if (!cat) return {}
  const desc = cat.description
    ? cat.description.replace(/<[^>]+>/g, '').trim().slice(0, 160)
    : `Shop ${cat.name} — hand-selected fine jewelry from trusted retailers.`
  return {
    title: `${cat.name} Jewelry`,
    description: desc,
    alternates: { canonical: `https://moissanitebyaurelia.com/product-category/${slug.join('/')}/` },
  }
}

export default async function NestedProductCategoryPage({ params, searchParams }: Props) {
  const [{ slug }, { page: pageParam }] = await Promise.all([params, searchParams])
  const categorySlug = slug[slug.length - 1]

  const [cat, allCats, productsData] = await Promise.all([
    getProductCategoryBySlug(categorySlug),
    getAllProductCategories(),
    getProductsByCategory(categorySlug, 200),
  ])
  if (!cat) notFound()

  const allProducts = productsData.products.nodes
  const page = Math.max(1, parseInt(pageParam || '1', 10))
  const totalPages = Math.ceil(allProducts.length / PER_PAGE)
  const currentPage = Math.min(page, Math.max(1, totalPages))
  const products = allProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
  const basePath = `/product-category/${slug.join('/')}`

  const breadcrumbs = [
    { label: 'Shop', href: '/shop-fine-jewelry/' },
    ...(cat.parent?.node
      ? [{ label: cat.parent.node.name, href: `/product-category/${cat.parent.node.slug}/` }]
      : []),
    { label: cat.name },
  ]

  // Top-level categories only for the filter pills
  const topCats = allCats.filter(c => !c.parent?.node?.slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-6 mb-8 pb-8 border-b border-border">
        <p className="text-accent text-[11px] uppercase tracking-widest font-medium text-center mb-3">
          {cat.count ? `${cat.count} Products` : 'Shop'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark text-center mb-4 text-balance leading-tight">
          {cat.name}
        </h1>
        {cat.description && (
          <p className="text-text-muted text-center max-w-2xl mx-auto leading-relaxed text-sm">
            {cat.description.replace(/<[^>]+>/g, '').trim()}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Link
            href="/shop-fine-jewelry/"
            className="text-xs text-text-muted border border-border bg-bg px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            All
          </Link>
          {topCats.map(c => (
            <Link
              key={c.slug}
              href={`/product-category/${c.slug}/`}
              className={`text-xs border px-4 py-2 rounded-full transition-colors ${
                c.slug === (cat.parent?.node?.slug ?? categorySlug)
                  ? 'border-accent text-accent bg-accent-light font-medium'
                  : 'text-text-muted border-border bg-bg hover:border-accent hover:text-accent'
              }`}
            >
              {c.name}
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
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
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
