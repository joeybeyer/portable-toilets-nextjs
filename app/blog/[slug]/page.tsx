import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogSlugs, getBlogPostBySlug, getCircularSiblings, getCrossClusterPosts } from '@/data/blog'
import ArticleSchema from '@/components/schema/ArticleSchema'
import FAQSchema from '@/components/schema/FAQSchema'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import AuthorBox from '@/components/blog/AuthorBox'
import FAQ from '@/components/FAQ'
import LastUpdated from '@/components/LastUpdated'
import ClusterNavigation from '@/components/blog/ClusterNavigation'
import RelatedPosts from '@/components/blog/RelatedPosts'
import TableOfContents from '@/components/blog/TableOfContents'
import { processBlogContent } from '@/lib/content-utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://portabletoiletschamp.com/blog/${post.slug}`
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: `https://portabletoiletschamp.com${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://portabletoiletschamp.com${post.featuredImage}`]
    }
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const { prev, next } = getCircularSiblings(post)
  const crossClusterPosts = getCrossClusterPosts(post, 3)

  // Process content with heading IDs and contextual service links
  const processedContent = processBlogContent(post.content, post.moneyPageLink?.targetSlug)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category.name, url: `/blog/category/${post.category.slug}` },
    { name: post.title, url: `/blog/${post.slug}` }
  ]

  return (
    <article>
      <ArticleSchema post={post} />
      {post.faqs && post.faqs.length > 0 && (
        <FAQSchema faqs={post.faqs} url={`/blog/${post.slug}`} />
      )}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li className="text-gray-500">/</li>
                <li>
                  <Link
                    href={`/blog/category/${post.category.slug}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {post.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Category Badge */}
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 hover:bg-teal-700 transition-colors"
            >
              {post.category.name}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <LastUpdated date={post.updatedAt} className="text-gray-300" />
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{post.readingTime} min read</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>By {post.author.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl shadow-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Main Content - Enhanced readability */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-navy-900 prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-5
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:text-navy-800
              prose-p:text-navy-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:md:text-lg
              prose-a:text-teal-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-navy-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-navy-700 prose-li:leading-relaxed prose-li:text-base prose-li:md:text-lg prose-li:pl-2
              prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Money Page CTA - Link UP */}
          <div className="my-10 p-6 bg-teal-50 rounded-xl border-l-4 border-teal-600">
            <p className="text-lg text-navy-900">
              Ready to get started? Check out our{' '}
              <Link
                href={`/${post.moneyPageLink.targetSlug}`}
                className="text-teal-600 font-semibold hover:underline"
              >
                {post.moneyPageLink.anchorText}
              </Link>{' '}
              available nationwide.
            </p>
          </div>

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">
                Frequently Asked Questions
              </h2>
              <FAQ items={post.faqs} />
            </section>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="my-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Tags:</span>
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <AuthorBox author={post.author} />

          {/* Cluster Navigation - Links SIDEWAYS */}
          <ClusterNavigation
            prevPost={prev}
            nextPost={next}
            clusterName={post.cluster.clusterId}
          />

          {/* Cross-Cluster Related Posts */}
          <RelatedPosts posts={crossClusterPosts} />

          {/* Final CTA */}
          <div className="bg-navy-900 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Need Portable Toilets for Your Event?
            </h3>
            <p className="text-gray-300 mb-6">
              Get a free quote in minutes. Same-day service available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18334356610"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-colors"
              >
                Call (833) 435-6610
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy-900 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
