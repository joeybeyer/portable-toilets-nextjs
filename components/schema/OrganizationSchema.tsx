export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://portabletoiletschamp.com/#organization',
    name: 'Portable Toilets Champ',
    url: 'https://portabletoiletschamp.com',
    logo: 'https://portabletoiletschamp.com/images/logo.svg',
    image: 'https://portabletoiletschamp.com/images/logo.svg',
    telephone: '+1-833-435-6610',
    email: 'info@portabletoiletschamp.com',
    description: 'Professional portable toilet rentals serving all 50 states. Clean units, on-time delivery, simple pricing. Same-day service available.',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6132 Wilshire Blvd',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90048',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0633,
      longitude: -118.3626
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    serviceType: [
      'Portable Toilet Rental',
      'Event Restroom Rental',
      'Construction Site Sanitation',
      'Luxury Restroom Trailer Rental',
      'ADA Accessible Portable Toilet Rental'
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/portabletoiletschamp',
      'https://www.instagram.com/portabletoiletschamp',
      'https://twitter.com/ptchamp',
      'https://www.linkedin.com/company/portable-toilets-champ',
      'https://www.yelp.com/biz/portable-toilets-champ-los-angeles',
      'https://www.google.com/maps/place/Portable+Toilets+Champ',
      'https://www.bbb.org/us/ca/los-angeles/profile/portable-toilet-rental/portable-toilets-champ',
      'https://www.yellowpages.com/los-angeles-ca/portable-toilet-rental/portable-toilets-champ',
      'https://www.superpages.com/los-angeles-ca/portable-toilet-rental/portable-toilets-champ',
      'https://m.yelp.com/biz/portable-toilets-champ-los-angeles',
      'https://www.mapquest.com/us/los-angeles-ca/portable-toilets-champ',
      'https://foursquare.com/v/portable-toilets-champ'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
