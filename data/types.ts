// Core TypeScript interfaces for Content Clustering & SEO

// FAQ Item for schema markup
export interface FAQItem {
  question: string
  answer: string
}

// Author information for blog posts
export interface AuthorInfo {
  name: string
  slug: string
  avatar: string
  bio: string
  credentials: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

// Blog category
export interface BlogCategory {
  slug: string
  name: string
  description: string
  parentCluster?: string
}

// Cluster relationship tracking (Ferris Wheel Model)
export interface ClusterInfo {
  clusterId: string
  moneyPageSlug: string
  position: number // Position in circular linking pattern (1-10)
}

// Internal link with unique anchor text
export interface InternalLink {
  targetSlug: string
  anchorText: string // MUST be unique across entire site
  targetType: 'blog' | 'service' | 'location'
}

// Link UP to money page
export interface MoneyPageLink {
  targetSlug: string
  anchorText: string // Unique anchor for linking UP to money page
}

// Complete blog post structure
export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  content: string // HTML content
  featuredImage: string
  featuredImageAlt: string
  author: AuthorInfo
  publishedAt: string // ISO 8601 date
  updatedAt: string // ISO 8601 date
  category: BlogCategory
  tags: string[]
  cluster: ClusterInfo
  internalLinks: InternalLink[] // Links SIDEWAYS to other posts
  moneyPageLink: MoneyPageLink // Link UP to money page
  readingTime: number // minutes
  faqs?: FAQItem[]
}

// Content cluster definition
export interface ContentCluster {
  id: string
  name: string
  description: string
  moneyPageSlug: string
  category: BlogCategory
}

// Service with cluster awareness
export interface ServiceWithCluster {
  slug: string
  title: string
  shortDescription: string
  metaDescription: string
  phone: string
  isMoneyPage?: boolean
  clusterId?: string
  lastUpdated?: string
}
