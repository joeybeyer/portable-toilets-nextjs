interface ReviewSchemaProps {
  itemReviewed?: {
    type: 'LocalBusiness' | 'Service' | 'Product'
    name: string
    url?: string
  }
}

export default function ReviewSchema({ itemReviewed }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: itemReviewed ? {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      url: itemReviewed.url || 'https://portabletoiletschamp.com'
    } : {
      '@type': 'LocalBusiness',
      '@id': 'https://portabletoiletschamp.com/#organization',
      name: 'Portable Toilets Champ',
      url: 'https://portabletoiletschamp.com'
    },
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '2847',
    reviewCount: '2847'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
