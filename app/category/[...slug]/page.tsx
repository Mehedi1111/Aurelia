import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllCategorySlugs, getCategoryBySlug } from '@/lib/graphql/queries/categories'
import { getPostsByCategory } from '@/lib/graphql/queries/posts'
import PostCard from '@/components/blog/PostCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const categories = await getAllCategorySlugs()
  return categories.map(({ uri }) => ({
    // Convert /category/diamond/diamond-clarity-guide/ → ['diamond', 'diamond-clarity-guide']
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categorySlug = slug[slug.length - 1]
  const category = await getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const postsData = await getPostsByCategory(categorySlug, 24)
  const posts = postsData.posts.nodes

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
      </header>

      {posts.length > 0 ? (
        <>
          {/* Featured first post */}
          {posts.length > 0 && (
            <div className="mb-8">
              <PostCard post={posts[0]} featured />
            </div>
          )}

          {/* Grid of remaining posts */}
          {posts.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
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

export const revalidate = 86400
