import Link from 'next/link'
import { BlogPost } from '@/data/types'

interface ClusterNavigationProps {
  prevPost: BlogPost | null
  nextPost: BlogPost | null
  clusterName: string
}

export default function ClusterNavigation({
  prevPost,
  nextPost,
  clusterName
}: ClusterNavigationProps) {
  const displayName = clusterName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <nav className="my-10 border-t border-b border-gray-200 py-6">
      <div className="text-center text-sm text-gray-500 mb-4">
        More in our <span className="font-medium text-teal-600">{displayName}</span> series
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50/50 transition-all"
          >
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Previous Article
            </span>
            <div className="font-semibold text-navy-900 group-hover:text-teal-600 transition-colors mt-1 line-clamp-2">
              {prevPost.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50/50 transition-all text-right"
          >
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Next Article
            </span>
            <div className="font-semibold text-navy-900 group-hover:text-teal-600 transition-colors mt-1 line-clamp-2">
              {nextPost.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
