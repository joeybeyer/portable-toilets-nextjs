import { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedBlogPosts } from '@/data/blog'
import { categories } from '@/data/clusters'
import BlogCard from '@/components/blog/BlogCard'

export const metadata: Metadata = {
  title: 'Portable Toilet Rental Blog | Expert Tips & Guides [2026]',
  description: 'Planning an event or project? Get expert tips on portable toilet rental, event planning guides, and OSHA compliance info. Updated for 2026. Start reading now.',
  alternates: {
    canonical: 'https://portabletoiletschamp.com/blog'
  },
  openGraph: {
    title: 'Portable Toilet Rental Blog | Expert Tips & Guides [2026]',
    description: 'Planning an event or project? Get expert tips on portable toilet rental, event planning guides, and OSHA compliance info.',
    url: 'https://portabletoiletschamp.com/blog',
    type: 'website'
  }
}

export default function BlogPage() {
  const posts = getPublishedBlogPosts().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Portable Toilet Rental Blog: Expert Tips & Guides
            </h1>
            <p className="text-xl text-gray-300">
              Expert insights, planning guides, and industry tips for all your portable sanitation needs.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-teal-600 text-white text-sm font-medium"
            >
              All Posts
            </Link>
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-teal-500 hover:text-teal-600 transition-colors"
              >
                {category.name}
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
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
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
