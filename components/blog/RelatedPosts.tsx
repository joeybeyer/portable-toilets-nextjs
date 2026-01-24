import Link from 'next/link'
import { BlogPost } from '@/data/types'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="my-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-navy-900 mb-6">
        You May Also Like
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
          >
            <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
              {post.category.name}
            </span>
            <h3 className="font-bold text-navy-900 mt-2 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-navy-600 line-clamp-2">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center text-sm text-teal-600 mt-3 font-medium">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
