// Utility functions for processing blog content

// Map of keywords to service page links for contextual internal linking
const serviceKeywordMap: Record<string, { slug: string; title: string }> = {
  'event portable toilet': { slug: 'event-portable-toilet-rental', title: 'event portable toilet rental' },
  'event restroom': { slug: 'event-portable-toilet-rental', title: 'event portable toilet rental' },
  'festival restroom': { slug: 'event-portable-toilet-rental', title: 'event portable toilet rental' },
  'outdoor event toilet': { slug: 'event-portable-toilet-rental', title: 'event portable toilet rental' },
  'construction site toilet': { slug: 'construction-site-portable-toilet-rental', title: 'construction site portable toilet rental' },
  'construction portable toilet': { slug: 'construction-site-portable-toilet-rental', title: 'construction site portable toilet rental' },
  'job site toilet': { slug: 'construction-site-portable-toilet-rental', title: 'construction site portable toilet rental' },
  'luxury restroom trailer': { slug: 'luxury-portable-restroom-trailer-rental', title: 'luxury restroom trailer rental' },
  'luxury trailer': { slug: 'luxury-portable-restroom-trailer-rental', title: 'luxury restroom trailer rental' },
  'wedding restroom trailer': { slug: 'luxury-portable-restroom-trailer-rental', title: 'luxury restroom trailer rental' },
  'restroom trailer': { slug: 'portable-restroom-trailer-rental', title: 'restroom trailer rental' },
  'vip portable toilet': { slug: 'vip-portable-toilet-rental', title: 'VIP portable toilet rental' },
  'vip toilet': { slug: 'vip-portable-toilet-rental', title: 'VIP portable toilet rental' },
  'vip restroom': { slug: 'vip-portable-toilet-rental', title: 'VIP portable toilet rental' },
  'deluxe portable toilet': { slug: 'deluxe-portable-toilet-rental', title: 'deluxe portable toilet rental' },
  'deluxe toilet': { slug: 'deluxe-portable-toilet-rental', title: 'deluxe portable toilet rental' },
  'deluxe unit': { slug: 'deluxe-portable-toilet-rental', title: 'deluxe portable toilet rental' },
  'standard portable toilet': { slug: 'standard-portable-toilet-rental', title: 'standard portable toilet rental' },
  'standard toilet': { slug: 'standard-portable-toilet-rental', title: 'standard portable toilet rental' },
  'standard unit': { slug: 'standard-portable-toilet-rental', title: 'standard portable toilet rental' },
  'handicap accessible toilet': { slug: 'handicap-accessible-portable-toilet-rental', title: 'ADA accessible portable toilet rental' },
  'ada accessible toilet': { slug: 'handicap-accessible-portable-toilet-rental', title: 'ADA accessible portable toilet rental' },
  'wheelchair accessible toilet': { slug: 'handicap-accessible-portable-toilet-rental', title: 'ADA accessible portable toilet rental' },
  'ada compliant': { slug: 'handicap-accessible-portable-toilet-rental', title: 'ADA accessible portable toilet rental' },
  'accessible restroom': { slug: 'handicap-accessible-portable-toilet-rental', title: 'ADA accessible portable toilet rental' },
  'family size toilet': { slug: 'family-size-portable-toilet-rental', title: 'family size portable toilet rental' },
  'family toilet': { slug: 'family-size-portable-toilet-rental', title: 'family size portable toilet rental' },
  'emergency toilet': { slug: 'emergency-portable-toilet-rental', title: 'emergency portable toilet rental' },
  'same-day delivery': { slug: 'emergency-portable-toilet-rental', title: 'emergency portable toilet rental' },
  'last minute rental': { slug: 'emergency-portable-toilet-rental', title: 'emergency portable toilet rental' },
  'long-term rental': { slug: 'longterm-portable-toilet-rental', title: 'long-term portable toilet rental' },
  'monthly rental': { slug: 'longterm-portable-toilet-rental', title: 'long-term portable toilet rental' },
  'extended rental': { slug: 'longterm-portable-toilet-rental', title: 'long-term portable toilet rental' },
  'short-term rental': { slug: 'shortterm-portable-toilet-rental', title: 'short-term portable toilet rental' },
  'weekend rental': { slug: 'shortterm-portable-toilet-rental', title: 'short-term portable toilet rental' },
  'daily rental': { slug: 'shortterm-portable-toilet-rental', title: 'short-term portable toilet rental' },
  'hand washing station': { slug: 'portable-sink-station-rental', title: 'portable sink station rental' },
  'sink station': { slug: 'portable-sink-station-rental', title: 'portable sink station rental' },
  'portable sink': { slug: 'portable-sink-station-rental', title: 'portable sink station rental' },
  'hand sanitizer station': { slug: 'portable-hand-sanitizer-station-rental', title: 'hand sanitizer station rental' },
  'sanitizer station': { slug: 'portable-hand-sanitizer-station-rental', title: 'hand sanitizer station rental' },
}

/**
 * Add anchor IDs to headings in HTML content
 */
export function addHeadingIds(content: string): string {
  let headingIndex = 0
  return content.replace(/<(h[23])>([^<]+)<\/h[23]>/gi, (match, tag, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() || `heading-${headingIndex}`

    headingIndex++
    return `<${tag} id="${id}">${text}</${tag}>`
  })
}

/**
 * Add contextual anchor links to service pages within blog content
 * Only links the first occurrence of each keyword to avoid over-optimization
 */
export function addContextualServiceLinks(content: string, excludeSlug?: string): string {
  let processedContent = content
  const linkedKeywords = new Set<string>()

  // Sort keywords by length (longest first) to prevent partial matches
  const sortedKeywords = Object.keys(serviceKeywordMap).sort((a, b) => b.length - a.length)

  for (const keyword of sortedKeywords) {
    const service = serviceKeywordMap[keyword]

    // Skip if this is the current page's service
    if (excludeSlug && service.slug === excludeSlug) continue

    // Skip if we've already linked to this service
    if (linkedKeywords.has(service.slug)) continue

    // Create a case-insensitive regex that doesn't match inside existing links or tags
    const regex = new RegExp(
      `(?<!<[^>]*?)(?<!href="[^"]*?)\\b(${keyword})\\b(?![^<]*?>)(?![^<]*?</a>)`,
      'i'
    )

    const match = processedContent.match(regex)
    if (match) {
      processedContent = processedContent.replace(
        regex,
        `<a href="/${service.slug}" class="text-teal-600 font-medium hover:underline">$1</a>`
      )
      linkedKeywords.add(service.slug)
    }
  }

  return processedContent
}

/**
 * Process blog content: add heading IDs and contextual service links
 */
export function processBlogContent(content: string, excludeSlug?: string): string {
  let processed = addHeadingIds(content)
  processed = addContextualServiceLinks(processed, excludeSlug)
  return processed
}
