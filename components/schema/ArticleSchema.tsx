import { BlogPost } from '@/data/types'

interface ArticleSchemaProps {
  post: BlogPost
}

export default function ArticleSchema({ post }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://portabletoiletschamp.com${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://portabletoiletschamp.com/author/${post.author.slug}`
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://portabletoiletschamp.com/#organization',
      name: 'Portable Toilets Champ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://portabletoiletschamp.com/images/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://portabletoiletschamp.com/blog/${post.slug}`
    },
    wordCount: Math.round(post.readingTime * 200),
    articleSection: post.category.name,
    keywords: post.tags.join(', ')
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
