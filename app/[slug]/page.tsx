import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/graphql/queries/posts'
import { extractTableOfContents, extractFAQs, extractReviewRating } from '@/lib/content/parseContent'
import PostBody from '@/components/blog/PostBody'
import TableOfContents from '@/components/blog/TableOfContents'
import PostCard from '@/components/blog/PostCard'
import AuthorBox from '@/components/blog/AuthorBox'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import type { WPPostCard } from '@/types/wordpress'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const { seo } = post
  return {
    title: seo.title || post.title,
    description: seo.metaDesc || '',
    alternates: { canonical: seo.canonical || `https://moissanitebyaurelia.com/${slug}/` },
    openGraph: {
      title: seo.opengraphTitle || seo.title,
      description: seo.opengraphDescription || seo.metaDesc,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: seo.opengraphImage ? [{ url: seo.opengraphImage.sourceUrl }] : [],
    },
    twitter: {
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.metaDesc,
      images: seo.opengraphImage ? [seo.opengraphImage.sourceUrl] : [],
    },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const tocEntries = extractTableOfContents(post.content)
  const faqEntries = extractFAQs(post.content)
  const reviewRating = extractReviewRating(post.content)
  const primaryCategory = post.categories.nodes[0]
  const relatedPosts = primaryCategory
    ? await getRelatedPosts(primaryCategory.slug, slug, 3)
    : []

  const breadcrumbs = [
    ...(primaryCategory ? [{ label: primaryCategory.name, href: `/category/${primaryCategory.slug}/` }] : []),
    { label: post.title },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      '@type': 'Person',
      name: 'Mehedi Hasan',
      url: 'https://moissanitebyaurelia.com/about-mehedi/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moissanite by Aurelia',
      url: 'https://moissanitebyaurelia.com',
    },
    image: post.featuredImage?.node.sourceUrl,
    description: post.seo.metaDesc,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://moissanitebyaurelia.com/${slug}/` },
  }

  const faqSchema = faqEntries.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  // Emit Review schema for posts that contain a detectable star rating (e.g. retailer reviews)
  const reviewSchema = reviewRating ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: post.title,
    author: { '@type': 'Person', name: 'Mehedi Hasan', url: 'https://moissanitebyaurelia.com/about-mehedi/' },
    datePublished: post.date,
    dateModified: post.modified,
    itemReviewed: {
      '@type': 'Organization',
      name: post.title.replace(/\s+(?:review|legit|honest|is it legit|scam).*/gi, '').trim(),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.ratingValue,
      bestRating: reviewRating.bestRating,
      worstRating: 1,
    },
    reviewBody: post.seo?.metaDesc || '',
    publisher: { '@type': 'Organization', name: 'Moissanite by Aurelia', url: 'https://moissanitebyaurelia.com' },
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Post header — featured image removed from render; still in OG/Twitter meta for Google */}
        <header className="mt-8 mb-0 max-w-3xl">
          {primaryCategory && (
            <Link
              href={`/category/${primaryCategory.slug}/`}
              className="text-accent text-xs font-medium uppercase tracking-widest hover:text-accent-dark transition-colors"
            >
              {primaryCategory.name}
            </Link>
          )}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-dark mt-3 mb-4 leading-snug text-balance">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
            <span>By <Link href="/about-mehedi/" className="text-dark font-medium hover:text-accent transition-colors">{post.author.node.name}</Link></span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.modified !== post.date && (
              <span className="text-text-subtle">Updated {formatDate(post.modified)}</span>
            )}
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="affiliate-disclosure mt-5 mb-0">
          <svg className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>We are reader-supported. Buying through our links may earn us a commission at no extra cost to you.</span>
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden mt-6">
          <TableOfContents entries={tocEntries} showAd={false} />
        </div>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-12">
          {/* Article */}
          <article className="min-w-0">
            <PostBody content={post.content} />

            {/* Tags */}
            {post.tags.nodes.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {post.tags.nodes.map(tag => (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}/`}
                      className="text-xs text-text-muted border border-border hover:border-accent hover:text-accent px-3 py-1 rounded-full transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author box */}
            <AuthorBox />
          </article>

          {/* Sidebar — sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-5">
              <TableOfContents entries={tocEntries} showAd={true} />

              {/* Related guides */}
              {relatedPosts.length > 0 && (
                <div className="border border-border rounded-lg p-4">
                  <p className="font-serif text-sm text-dark mb-3">Related Guides</p>
                  <ul className="space-y-2.5">
                    {relatedPosts.map(related => (
                      <li key={related.slug}>
                        <Link
                          href={`/${related.slug}/`}
                          className="text-xs text-text-muted hover:text-accent leading-snug block transition-colors py-1 border-b border-border/50 last:border-b-0"
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related posts grid */}
        {relatedPosts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-border">
            <h2 className="font-serif text-2xl text-dark mb-8">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map(p => (
                <PostCard key={p.slug} post={p as WPPostCard} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export const revalidate = 86400
