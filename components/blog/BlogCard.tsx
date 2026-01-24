import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/data/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {post.category.name}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{post.readingTime} min read</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-bold text-lg text-navy-900 mb-2 hover:text-teal-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-teal-600 font-medium text-sm hover:text-teal-800"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}
