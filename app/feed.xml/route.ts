import { getAllBlogSlugs, getBlogPostBySlug } from '@/data/blog'

export async function GET() {
  const slugs = getAllBlogSlugs()
  const posts = slugs.map(slug => getBlogPostBySlug(slug)).filter(Boolean)
  const baseUrl = 'https://portabletoiletschamp.com'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Portable Toilet Rental Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert guides, tips, and industry insights for portable toilet rentals nationwide.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post!.title)}</title>
      <link>${baseUrl}/blog/${post!.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post!.slug}</guid>
      <description>${escapeXml(post!.excerpt || post!.title)}</description>
      <pubDate>${new Date(post!.publishedAt || Date.now()).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
