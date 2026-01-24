import { ContentCluster, BlogCategory } from './types'

// Blog categories aligned with clusters
export const categories: BlogCategory[] = [
  {
    slug: 'event-planning',
    name: 'Event Planning',
    description: 'Tips, guides, and best practices for portable toilet planning at events of all sizes.',
    parentCluster: 'event-rentals'
  },
  {
    slug: 'construction-compliance',
    name: 'Construction & Compliance',
    description: 'OSHA compliance, construction site sanitation requirements, and industry regulations.',
    parentCluster: 'construction-site'
  },
  {
    slug: 'luxury-events',
    name: 'Luxury Events',
    description: 'Premium restroom solutions for upscale weddings, VIP events, and executive gatherings.',
    parentCluster: 'luxury-premium'
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    description: 'ADA compliance guides, inclusive event planning, and accessible restroom solutions.',
    parentCluster: 'ada-accessibility'
  }
]

// Content cluster definitions following Ferris Wheel Model
export const clusters: ContentCluster[] = [
  {
    id: 'event-rentals',
    name: 'Event Rentals',
    description: 'Content cluster around event portable toilet rental - weddings, festivals, corporate events, and more.',
    moneyPageSlug: 'event-portable-toilet-rental',
    category: categories[0]
  },
  {
    id: 'construction-site',
    name: 'Construction Site',
    description: 'Content cluster around construction site portable toilet rental - OSHA compliance, long-term rentals.',
    moneyPageSlug: 'construction-site-portable-toilet-rental',
    category: categories[1]
  },
  {
    id: 'luxury-premium',
    name: 'Luxury & Premium',
    description: 'Content cluster around luxury portable restroom trailer rental - upscale events, VIP experiences.',
    moneyPageSlug: 'luxury-portable-restroom-trailer-rental',
    category: categories[2]
  },
  {
    id: 'ada-accessibility',
    name: 'ADA Accessibility',
    description: 'Content cluster around handicap accessible portable toilet rental - ADA compliance, inclusive events.',
    moneyPageSlug: 'handicap-accessible-portable-toilet-rental',
    category: categories[3]
  }
]

// Helper functions
export function getClusterById(clusterId: string): ContentCluster | undefined {
  return clusters.find(c => c.id === clusterId)
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return categories.find(c => c.slug === slug)
}

export function getCategoryByCluster(clusterId: string): BlogCategory | undefined {
  return categories.find(c => c.parentCluster === clusterId)
}
