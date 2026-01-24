import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      },
      {
        userAgent: 'GPTBot',
        allow: '/'
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/'
      },
      {
        userAgent: 'Google-Extended',
        allow: '/'
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/'
      },
      {
        userAgent: 'Claude-Web',
        allow: '/'
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/'
      },
      {
        userAgent: 'Bytespider',
        allow: '/'
      }
    ],
    sitemap: 'https://portabletoiletschamp.com/sitemap.xml',
    host: 'https://portabletoiletschamp.com'
  }
}

// Note: LLMs.txt file is available at /llms.txt for AI systems
// This provides structured guidance for AI crawlers about our business
