import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/graphql/queries/posts'
import { getAllCategories } from '@/lib/graphql/queries/categories'
import PostCard from '@/components/blog/PostCard'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Jewelry Guides & Articles — Moissanite by Aurelia',
  description: 'Expert moissanite, diamond, and gemstone guides. Buying advice, comparisons, and reviews by Mehedi Hasan.',
  alternates: { canonical: 'https://moissanitebyaurelia.com/blog/' },
}

export default async function BlogPage() {
  const [data, allCategories] = await Promise.all([
    getPosts(48),
    getAllCategories(),
  ])
  const posts = data.posts.nodes

  // Show only top-level categories (no ancestors) that have posts
  const topCategories = allCategories
    .filter(c => !c.ancestors?.nodes?.length && (c.count ?? 0) > 0)
    .slice(0, 12)

  const breadcrumbs = [{ label: 'Blog' }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-6 mb-8 pb-8 border-b border-border">
        <p className="text-accent text-[11px] uppercase tracking-widest font-medium text-center mb-3">
          The Jewelry Insider
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark text-center mb-4 text-balance leading-tight">
          Guides &amp; Articles
        </h1>
        <p className="text-text-muted text-center max-w-2xl mx-auto leading-relaxed text-sm">
          Expert advice on moissanite, diamonds, and gemstones — from buying guides to honest reviews.
        </p>

        {/* Blog category filter pills */}
        {topCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-xs border border-accent text-accent bg-accent-light font-medium px-4 py-2 rounded-full">
              All
            </span>
            {topCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className="text-xs text-text-muted border border-border bg-bg px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {posts.length > 0 && (
        <div className="mb-10">
          <PostCard post={posts[0]} featured />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <p className="font-serif text-xl mb-2">No articles yet</p>
          <p className="text-sm">Check back soon for guides and reviews.</p>
        </div>
      )}
    </div>
  )
}

export const revalidate = 3600
