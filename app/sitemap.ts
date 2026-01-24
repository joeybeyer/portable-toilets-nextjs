import { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/data/blog'
import { categories } from '@/data/clusters'
import { services } from '@/data/services'
import { locations, getAllStates } from '@/data/locations'
import { getAllProblemSlugs } from '@/data/problems'
import { getAllNeighborhoodSlugs } from '@/data/neighborhoods'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portabletoiletschamp.com'
  const currentDate = new Date().toISOString()

  // Money page slugs for priority boost
  const moneyPageSlugs = [
    'event-portable-toilet-rental',
    'construction-site-portable-toilet-rental',
    'luxury-portable-restroom-trailer-rental',
    'handicap-accessible-portable-toilet-rental'
  ]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/location`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/citations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ]

  // Service pages (money pages get highest priority)
  const servicePages: MetadataRoute.Sitemap = services.map(service => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: moneyPageSlugs.includes(service.slug) ? 1.0 : 0.9
  }))

  // Location pages
  const locationPages: MetadataRoute.Sitemap = locations.map(location => ({
    url: `${baseUrl}/location/${location.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Blog posts
  const blogSlugs = getAllBlogSlugs()
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  // Blog categories
  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  // Problem/Solution pages
  const problemSlugs = getAllProblemSlugs()
  const solutionPages: MetadataRoute.Sitemap = problemSlugs.map(slug => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Neighborhood pages (spoke pages for hub/spoke model)
  const neighborhoodSlugs = getAllNeighborhoodSlugs()
  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoodSlugs.map(slug => ({
    url: `${baseUrl}/location/neighborhood/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  // State pages (hub pages for state-level SEO)
  const states = getAllStates()
  const statePages: MetadataRoute.Sitemap = states.map(state => ({
    url: `${baseUrl}/location/state/${state.stateCode.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...blogPages,
    ...categoryPages,
    ...solutionPages,
    ...neighborhoodPages,
    ...statePages
  ]
}
