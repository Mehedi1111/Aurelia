import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllCategorySlugs, getCategoryBySlug } from '@/lib/graphql/queries/categories'
import { getAllPostsByCategory } from '@/lib/graphql/queries/posts'
import PostCard from '@/components/blog/PostCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Pagination from '@/components/ui/Pagination'

const PER_PAGE = 12

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategorySlugs()
  return categories.map(({ uri }) => ({
    slug: uri.replace(/^\/category\//, '').replace(/\/$/, '').split('/'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categorySlug = slug[slug.length - 1]
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return {}

  const plainDesc = category.description
    ? category.description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160)
    : `Browse all ${category.name} articles and expert guides by Moissanite by Aurelia.`
  return {
    title: `${category.name} — Expert Guides & Reviews`,
    description: plainDesc,
    alternates: { canonical: `https://moissanitebyaurelia.com/category/${slug.join('/')}/` },
    openGraph: { title: `${category.name} — Expert Guides`, description: plainDesc, type: 'website' },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, { page: pageParam }] = await Promise.all([params, searchParams])
  const categorySlug = slug[slug.length - 1]

  const [category, allPosts] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getAllPostsByCategory(categorySlug),
  ])
  if (!category) notFound()
  const page = Math.max(1, parseInt(pageParam || '1', 10))
  const totalPages = Math.ceil(allPosts.length / PER_PAGE)
  const currentPage = Math.min(page, Math.max(1, totalPages))
  const posts = allPosts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
  const basePath = `/category/${slug.join('/')}`

  const ancestors = category.ancestors?.nodes || []
  const breadcrumbs = [
    ...ancestors.map(a => ({ label: a.name, href: `/category/${a.slug}/` })),
    { label: category.name },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-6 mb-10 pb-8 border-b border-border">
        <p className="text-accent text-[11px] uppercase tracking-widest font-medium text-center mb-3">
          {category.count != null ? `${category.count} Articles` : 'Category'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark text-center mb-4 text-balance leading-tight">
          {category.name}
        </h1>
        {totalPages > 1 && (
          <p className="text-center text-xs text-text-subtle mt-2">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </header>

      {posts.length > 0 ? (
        <>
          {currentPage === 1 && (
            <div className="mb-8">
              <PostCard post={posts[0]} featured />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(currentPage === 1 ? posts.slice(1) : posts).map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        </>
      ) : (
        <div className="text-center py-20 text-text-muted">
          <p className="font-serif text-xl mb-2">No articles yet</p>
          <p className="text-sm">Check back soon for guides in this category.</p>
        </div>
      )}
    </div>
  )
}

export const revalidate = 3600
