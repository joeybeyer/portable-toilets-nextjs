import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostsByCategory } from '@/data/blog'
import { categories, getCategoryBySlug } from '@/data/clusters'
import BlogCard from '@/components/blog/BlogCard'

interface Props {
  params: { category: string }
}

export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.category)
  if (!category) return {}

  return {
    title: `${category.name} Articles | Portable Toilet Blog [2026 Guide]`,
    description: `${category.description} Expert tips, planning guides & compliance info. Call (833) 435-6610 for your free quote.`,
    alternates: {
      canonical: `https://portabletoiletschamp.com/blog/category/${category.slug}`
    },
    openGraph: {
      title: `${category.name} Articles | Portable Toilet Blog [2026 Guide]`,
      description: category.description,
      url: `https://portabletoiletschamp.com/blog/category/${category.slug}`,
      type: 'website'
    }
  }
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category)
  if (!category) notFound()

  const posts = getBlogPostsByCategory(params.category).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
              <ol className="flex items-center justify-center gap-2">
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
                <li className="text-gray-300">{category.name}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-gray-300">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-teal-500 hover:text-teal-600 transition-colors"
            >
              All Posts
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === params.category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                No posts in this category yet. Check back soon!
              </p>
              <Link
                href="/blog"
                className="text-teal-600 font-medium hover:underline"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Portable Toilets for Your Event?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get a free quote in minutes. Clean units, on-time delivery, simple pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18334356610"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call (833) 435-6610
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-teal-600 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
