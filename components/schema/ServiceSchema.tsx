import { Service } from '@/data/services'

interface ServiceSchemaProps {
  service: Service
}

export default function ServiceSchema({ service }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://portabletoiletschamp.com/${service.slug}#service`,
    serviceType: 'Portable Toilet Rental',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://portabletoiletschamp.com/#organization',
      name: 'Portable Toilets Champ',
      telephone: service.phone,
      url: 'https://portabletoiletschamp.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    url: `https://portabletoiletschamp.com/${service.slug}`,
    image: `https://portabletoiletschamp.com${service.image}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Portable Toilet Rental Options',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Daily Rental',
            description: 'Short-term portable toilet rental for events and projects'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Weekly Rental',
            description: 'Week-long portable toilet rental with service included'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly Rental',
            description: 'Extended rental for construction sites and ongoing projects'
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
