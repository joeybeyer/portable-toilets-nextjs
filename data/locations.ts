import { FAQItem } from './types'

export interface Location {
  slug: string
  city: string
  state: string
  stateCode: string
  title: string
  metaDescription: string
  phone: string
  address?: string
  mapEmbed?: string
  paaFaqs?: FAQItem[]
  latitude?: number
  longitude?: number
  neighborhoods?: string[]
}

// Generate geo-targeted PAA FAQs for a location
function generateLocationFAQs(city: string, state: string, stateCode: string): FAQItem[] {
  const location = `${city}, ${stateCode}`
  const cityName = city

  return [
    {
      question: `How much does portable toilet rental cost in ${cityName}?`,
      answer: `Portable toilet rental in ${location} typically costs $250-300 for a standard 28-day rental cycle, which includes weekly servicing. Deluxe units with hand washing stations and luxury restroom trailers are available at higher price points. Daily and weekly rentals are also available for events. Call (833) 435-6610 for a free quote tailored to your ${cityName} event or project.`
    },
    {
      question: `How many portable toilets do I need for an event in ${cityName}?`,
      answer: `For events in ${cityName}, plan for 1 portable toilet per 50-75 guests for a 4-hour event. If serving alcohol, increase to 1 unit per 35-50 guests. Large festivals and multi-day events in ${location} may require additional units. Our team can provide specific recommendations based on your event size and duration.`
    },
    {
      question: `Can I get same-day portable toilet delivery in ${cityName}?`,
      answer: `Yes, same-day portable toilet delivery is available in ${location} and surrounding areas. Emergency and rush orders can often be accommodated for construction sites, events, and unexpected needs. Additional fees may apply for same-day service. Contact us at (833) 435-6610 for immediate availability.`
    },
    {
      question: `What types of portable toilets are available in ${cityName}?`,
      answer: `In ${location}, we offer standard portable toilets, deluxe flushable units with sinks, ADA-accessible handicap units, luxury restroom trailers with climate control, and high-rise construction units. All portable toilets are thoroughly sanitized and regularly serviced to ensure cleanliness for ${cityName} customers.`
    },
    {
      question: `Do portable toilet rental companies in ${cityName} provide servicing?`,
      answer: `Yes, professional portable toilet companies in ${location} include regular servicing with rentals. This includes waste pumping, sanitizing, restocking supplies, and maintenance. Service frequency depends on usage—typically weekly for standard use, more often for high-traffic events. Servicing is included in most rental packages.`
    }
  ]
}

export const locations: Location[] = [
  // California
  {
    slug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    title: 'Top-Rated Portable Toilet Rental in Los Angeles, California',
    metaDescription: 'Looking for Portable Toilet Rental in Los Angeles, CA? Portable Toilets Champ offers top-notch service for events and construction sites in LA.',
    phone: '(213) 714-8399',
    address: '6132 Wilshire Blvd, Los Angeles, CA 90048',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9795.267287888637!2d-118.3626757!3d34.0629217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b900025eb477%3A0xe2a174376deff14b!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1767702668217!5m2!1sen!2sus'
  },
  {
    slug: 'your-ultimate-guide-to-portable-toilet-rental-in-anaheim',
    city: 'Anaheim',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Rental in Anaheim, California',
    metaDescription: 'Looking for Portable Toilet Rental in Anaheim, CA? Portable Toilets Champ offers top-notch service for events and construction sites.',
    phone: '(714) 551-7552',
    address: '201 E Center St, Anaheim, CA 92805',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4910.713453163733!2d-117.9128628!3d33.8359366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd700448d83a7%3A0x441f1ddc837ef942!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1767702927069!5m2!1sen!2sus'
  },
  {
    slug: 'exceptional-portable-toilet-rental-services-in-beverly-hills',
    city: 'Beverly Hills',
    state: 'California',
    stateCode: 'CA',
    title: 'Exceptional Portable Toilet Rental Services in Beverly Hills',
    metaDescription: 'Looking for Portable Toilet Rental in Beverly Hills, CA? Portable Toilets Champ offers premium service for upscale events.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-rental-in-burbank-your-ultimate-guide',
    city: 'Burbank',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Rental in Burbank - Your Ultimate Guide',
    metaDescription: 'Looking for Portable Toilet Rental in Burbank, CA? Portable Toilets Champ offers reliable service for events and construction sites.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-rental-solutions-in-malibu',
    city: 'Malibu',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Rental Solutions in Malibu',
    metaDescription: 'Looking for Portable Toilet Rental in Malibu, CA? Portable Toilets Champ offers beach-ready service for events.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'the-ultimate-guide-to-portable-toilet-rental-in-riverside',
    city: 'Riverside',
    state: 'California',
    stateCode: 'CA',
    title: 'The Ultimate Guide to Portable Toilet Rental in Riverside',
    metaDescription: 'Looking for Portable Toilet Rental in Riverside, CA? Portable Toilets Champ offers comprehensive service for all needs.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-rental-solutions-in-torrance',
    city: 'Torrance',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Rental Solutions in Torrance',
    metaDescription: 'Looking for Portable Toilet Rental in Torrance, CA? Portable Toilets Champ offers reliable service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-fresno-your-comprehensive-guide',
    city: 'Fresno',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Services in Fresno - Your Comprehensive Guide',
    metaDescription: 'Looking for Portable Toilet Rental in Fresno, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(559) 338-7172',
    address: '3323 E Normal Ave, Fresno, CA 93703',
    latitude: 36.7668898,
    longitude: -119.7693607
  },
  {
    slug: 'high-quality-portable-toilet-services-in-bakersfield',
    city: 'Bakersfield',
    state: 'California',
    stateCode: 'CA',
    title: 'High-Quality Portable Toilet Services in Bakersfield',
    metaDescription: 'Looking for Portable Toilet Rental in Bakersfield, CA? Portable Toilets Champ offers high-quality service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-rated-portable-toilet-services-in-san-francisco',
    city: 'San Francisco',
    state: 'California',
    stateCode: 'CA',
    title: 'Top-Rated Portable Toilet Services in San Francisco',
    metaDescription: 'Looking for Portable Toilet Rental in San Francisco, CA? Portable Toilets Champ offers top-rated service.',
    phone: '(231) 452-0319',
    address: '1201 Pacific Ave, San Francisco, CA 94109',
    latitude: 37.79571,
    longitude: -122.4151800
  },
  {
    slug: 'top-notch-portable-toilet-services-in-thousand-oaks',
    city: 'Thousand Oaks',
    state: 'California',
    stateCode: 'CA',
    title: 'Top-Notch Portable Toilet Services in Thousand Oaks',
    metaDescription: 'Looking for Portable Toilet Rental in Thousand Oaks, CA? Portable Toilets Champ offers top-notch service.',
    phone: '(805) 269-9118',
    address: '1596 N Moorpark Rd, Thousand Oaks, CA 91360'
  },
  {
    slug: 'premium-portable-toilet-services-in-glendale',
    city: 'Glendale',
    state: 'California',
    stateCode: 'CA',
    title: 'Premium Portable Toilet Services in Glendale',
    metaDescription: 'Looking for Portable Toilet Rental in Glendale, CA? Portable Toilets Champ offers premium service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-rated-portable-toilet-service-in-long-beach',
    city: 'Long Beach',
    state: 'California',
    stateCode: 'CA',
    title: 'Top-Rated Portable Toilet Service in Long Beach',
    metaDescription: 'Looking for Portable Toilet Rental in Long Beach, CA? Portable Toilets Champ offers top-rated service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-huntington-beach-comprehensive-guide',
    city: 'Huntington Beach',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Services in Huntington Beach',
    metaDescription: 'Looking for Portable Toilet Rental in Huntington Beach, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-santa-ana-your-comprehensive-guide',
    city: 'Santa Ana',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Service in Santa Ana',
    metaDescription: 'Looking for Portable Toilet Rental in Santa Ana, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(714) 502-5574',
    address: '2700 S Main St, Santa Ana, CA 92707',
    latitude: 33.7107997,
    longitude: -117.8685415
  },
  {
    slug: 'top-quality-portable-toilet-service-in-garden-grove',
    city: 'Garden Grove',
    state: 'California',
    stateCode: 'CA',
    title: 'Top-Quality Portable Toilet Service in Garden Grove',
    metaDescription: 'Looking for Portable Toilet Rental in Garden Grove, CA? Portable Toilets Champ offers top-quality service.',
    phone: '(657) 551-5463',
    address: '10102 Stanford Ave, Garden Grove, CA 92840',
    latitude: 33.777346699999995,
    longitude: -117.956592
  },
  {
    slug: 'costa-mesas-premier-portable-toilet-service',
    city: 'Costa Mesa',
    state: 'California',
    stateCode: 'CA',
    title: 'Costa Mesa\'s Premier Portable Toilet Service',
    metaDescription: 'Looking for Portable Toilet Rental in Costa Mesa, CA? Portable Toilets Champ offers premier service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'comprehensive-guide-to-portable-toilet-service-in-westminster',
    city: 'Westminster',
    state: 'California',
    stateCode: 'CA',
    title: 'Comprehensive Guide to Portable Toilet Service in Westminster',
    metaDescription: 'Looking for Portable Toilet Rental in Westminster, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-simi-valley-your-comprehensive-guide',
    city: 'Simi Valley',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Service in Simi Valley',
    metaDescription: 'Looking for Portable Toilet Rental in Simi Valley, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'the-leading-portable-toilet-service-in-chula-vista',
    city: 'Chula Vista',
    state: 'California',
    stateCode: 'CA',
    title: 'The Leading Portable Toilet Service in Chula Vista',
    metaDescription: 'Looking for Portable Toilet Rental in Chula Vista, CA? Portable Toilets Champ offers leading service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'premium-portable-toilet-service-in-victorville',
    city: 'Victorville',
    state: 'California',
    stateCode: 'CA',
    title: 'Premium Portable Toilet Service in Victorville',
    metaDescription: 'Looking for Portable Toilet Rental in Victorville, CA? Portable Toilets Champ offers premium service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'premium-portable-toilet-services-in-inglewood',
    city: 'Inglewood',
    state: 'California',
    stateCode: 'CA',
    title: 'Premium Portable Toilet Services in Inglewood',
    metaDescription: 'Looking for Portable Toilet Rental in Inglewood, CA? Portable Toilets Champ offers premium service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'comprehensive-guide-to-portable-toilet-services-in-visalia',
    city: 'Visalia',
    state: 'California',
    stateCode: 'CA',
    title: 'Comprehensive Guide to Portable Toilet Services in Visalia',
    metaDescription: 'Looking for Portable Toilet Rental in Visalia, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-roseville-comprehensive-guide',
    city: 'Roseville',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Services in Roseville',
    metaDescription: 'Looking for Portable Toilet Rental in Roseville, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'your-go-to-portable-toilet-service-in-concord',
    city: 'Concord',
    state: 'California',
    stateCode: 'CA',
    title: 'Your Go-To Portable Toilet Service in Concord',
    metaDescription: 'Looking for Portable Toilet Rental in Concord, CA? Portable Toilets Champ offers reliable service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'your-premier-portable-toilet-service-in-claremont',
    city: 'Claremont',
    state: 'California',
    stateCode: 'CA',
    title: 'Your Premier Portable Toilet Service in Claremont',
    metaDescription: 'Looking for Portable Toilet Rental in Claremont, CA? Portable Toilets Champ offers premier service.',
    phone: '(909) 245-9073',
    address: '2209 E Baseline Rd Suite 300 265, Claremont, CA 91711',
    latitude: 34.122924,
    longitude: -117.693395
  },
  {
    slug: 'portable-toilet-services-in-west-covina-convenience-and-quality-combined',
    city: 'West Covina',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Services in West Covina',
    metaDescription: 'Looking for Portable Toilet Rental in West Covina, CA? Portable Toilets Champ offers quality service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-downey-comprehensive-guide',
    city: 'Downey',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Service in Downey',
    metaDescription: 'Looking for Portable Toilet Rental in Downey, CA? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'superior-portable-toilet-services-in-el-monte',
    city: 'El Monte',
    state: 'California',
    stateCode: 'CA',
    title: 'Superior Portable Toilet Services in El Monte',
    metaDescription: 'Looking for Portable Toilet Rental in El Monte, CA? Portable Toilets Champ offers superior service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'best-portable-toilet-service-in-lakewood',
    city: 'Lakewood',
    state: 'California',
    stateCode: 'CA',
    title: 'Best Portable Toilet Service in Lakewood',
    metaDescription: 'Looking for Portable Toilet Rental in Lakewood, CA? Portable Toilets Champ offers the best service.',
    phone: '(833) 435-6610'
  },
  // New York
  {
    slug: 'premium-portable-toilet-services-in-new-york',
    city: 'New York',
    state: 'New York',
    stateCode: 'NY',
    title: 'Premium Portable Toilet Services in New York',
    metaDescription: 'Looking for Portable Toilet Rental in New York, NY? Portable Toilets Champ offers premium service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-the-bronx-comprehensive-guide',
    city: 'Bronx',
    state: 'New York',
    stateCode: 'NY',
    title: 'Portable Toilet Services in the Bronx',
    metaDescription: 'Looking for Portable Toilet Rental in the Bronx, NY? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'the-ultimate-guide-to-portable-toilet-services-in-brooklyn',
    city: 'Brooklyn',
    state: 'New York',
    stateCode: 'NY',
    title: 'The Ultimate Guide to Portable Toilet Services in Brooklyn',
    metaDescription: 'Looking for Portable Toilet Rental in Brooklyn, NY? Portable Toilets Champ offers comprehensive service.',
    phone: '(929) 658-9620',
    address: '1236 Atlantic Ave, Brooklyn, NY 11216',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4483.548044227606!2d-73.9517055!3d40.6782884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b00555959e7%3A0xc8feacb5f454ff68!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1767702720860!5m2!1sen!2sus'
  },
  {
    slug: 'portable-toilet-rental-buffalo-ny',
    city: 'Buffalo',
    state: 'New York',
    stateCode: 'NY',
    title: 'Portable Toilet Rental in Buffalo, NY',
    metaDescription: 'Looking for Portable Toilet Rental in Buffalo, NY? Portable Toilets Champ offers professional service for events and construction sites.',
    phone: '(716) 203-5512',
    address: '43 Hamburg St, Buffalo, NY 14204',
    latitude: 42.865158699999995,
    longitude: -78.85820269999999
  },
  {
    slug: 'the-ultimate-guide-to-portable-toilet-services-in-east-rutherford',
    city: 'East Rutherford',
    state: 'New York',
    stateCode: 'NY',
    title: 'Portable Toilet Services in East Rutherford',
    metaDescription: 'Looking for Portable Toilet Rental in East Rutherford, NY? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'your-comprehensive-guide-to-portable-toilet-service-in-jamaica',
    city: 'Jamaica',
    state: 'New York',
    stateCode: 'NY',
    title: 'Portable Toilet Service in Jamaica, NY',
    metaDescription: 'Looking for Portable Toilet Rental in Jamaica, NY? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'the-ultimate-guide-to-portable-toilet-services-in-yonkers',
    city: 'Yonkers',
    state: 'New York',
    stateCode: 'NY',
    title: 'Portable Toilet Services in Yonkers',
    metaDescription: 'Looking for Portable Toilet Rental in Yonkers, NY? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-notch-portable-toilet-services-in-rochester',
    city: 'Rochester',
    state: 'New York',
    stateCode: 'NY',
    title: 'Top-Notch Portable Toilet Services in Rochester',
    metaDescription: 'Looking for Portable Toilet Rental in Rochester, NY? Portable Toilets Champ offers top-notch service.',
    phone: '(833) 435-6610'
  },
  // Other States
  {
    slug: 'ultimate-guide-to-portable-toilet-services-in-miami',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Ultimate Guide to Portable Toilet Services in Miami',
    metaDescription: 'Looking for Portable Toilet Rental in Miami, FL? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-miami-a-comprehensive-guide',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Portable Toilet Service in Miami',
    metaDescription: 'Looking for Portable Toilet Rental in Miami, FL? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-tallahassee-a-comprehensive-guide',
    city: 'Tallahassee',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Portable Toilet Service in Tallahassee',
    metaDescription: 'Looking for Portable Toilet Rental in Tallahassee, FL? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'premium-portable-toilet-services-in-boca-raton',
    city: 'Boca Raton',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Premium Portable Toilet Services in Boca Raton',
    metaDescription: 'Looking for Portable Toilet Rental in Boca Raton, FL? Portable Toilets Champ offers premium service.',
    phone: '(561) 916-4387',
    address: '1800 N Military Trl, Boca Raton, FL 33431',
    latitude: 26.3615864,
    longitude: -80.1214554
  },
  {
    slug: 'the-ultimate-guide-to-portable-toilet-service-in-chicago',
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    title: 'Portable Toilet Service in Chicago',
    metaDescription: 'Looking for Portable Toilet Rental in Chicago, IL? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-notch-portable-toilet-services-in-peoria',
    city: 'Peoria',
    state: 'Illinois',
    stateCode: 'IL',
    title: 'Top-Notch Portable Toilet Services in Peoria',
    metaDescription: 'Looking for Portable Toilet Rental in Peoria, IL? Portable Toilets Champ offers top-notch service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-springfield-your-ultimate-guide',
    city: 'Springfield',
    state: 'Illinois',
    stateCode: 'IL',
    title: 'Portable Toilet Services in Springfield',
    metaDescription: 'Looking for Portable Toilet Rental in Springfield, IL? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'ultimate-guide-to-portable-toilet-services-in-denver',
    city: 'Denver',
    state: 'Colorado',
    stateCode: 'CO',
    title: 'Ultimate Guide to Portable Toilet Services in Denver',
    metaDescription: 'Looking for Portable Toilet Rental in Denver, CO? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-arvada-your-comprehensive-guide',
    city: 'Arvada',
    state: 'Colorado',
    stateCode: 'CO',
    title: 'Portable Toilet Services in Arvada',
    metaDescription: 'Looking for Portable Toilet Rental in Arvada, CO? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'high-quality-portable-toilet-services-in-washington',
    city: 'Washington',
    state: 'District of Columbia',
    stateCode: 'DC',
    title: 'High-Quality Portable Toilet Services in Washington',
    metaDescription: 'Looking for Portable Toilet Rental in Washington, DC? Portable Toilets Champ offers high-quality service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-service-in-detroit-your-comprehensive-guide',
    city: 'Detroit',
    state: 'Michigan',
    stateCode: 'MI',
    title: 'Portable Toilet Service in Detroit',
    metaDescription: 'Looking for Portable Toilet Rental in Detroit, MI? Portable Toilets Champ offers comprehensive service.',
    phone: '(313) 547-5676',
    address: '4417 2nd Ave, Detroit, MI 48201',
    latitude: 42.3512385,
    longitude: -83.0670519
  },
  {
    slug: 'top-quality-portable-toilet-service-in-ann-arbor',
    city: 'Ann Arbor',
    state: 'Michigan',
    stateCode: 'MI',
    title: 'Top-Quality Portable Toilet Service in Ann Arbor',
    metaDescription: 'Looking for Portable Toilet Rental in Ann Arbor, MI? Portable Toilets Champ offers top-quality service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-rated-portable-toilet-services-in-minneapolis',
    city: 'Minneapolis',
    state: 'Minnesota',
    stateCode: 'MN',
    title: 'Top-Rated Portable Toilet Services in Minneapolis',
    metaDescription: 'Looking for Portable Toilet Rental in Minneapolis, MN? Portable Toilets Champ offers top-rated service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'premier-portable-toilet-services-in-saint-paul',
    city: 'Saint Paul',
    state: 'Minnesota',
    stateCode: 'MN',
    title: 'Premier Portable Toilet Services in Saint Paul',
    metaDescription: 'Looking for Portable Toilet Rental in Saint Paul, MN? Portable Toilets Champ offers premier service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-notch-portable-toilet-service-in-saint-paul',
    city: 'Saint Paul',
    state: 'Minnesota',
    stateCode: 'MN',
    title: 'Top-Notch Portable Toilet Service in Saint Paul',
    metaDescription: 'Looking for Portable Toilet Rental in Saint Paul, MN? Portable Toilets Champ offers top-notch service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-quality-portable-toilet-services-in-kansas-city',
    city: 'Kansas City',
    state: 'Missouri',
    stateCode: 'MO',
    title: 'Top-Quality Portable Toilet Services in Kansas City',
    metaDescription: 'Looking for Portable Toilet Rental in Kansas City, MO? Portable Toilets Champ offers top-quality service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-portable-toilet-services-in-olathe-your-ultimate-guide',
    city: 'Olathe',
    state: 'Kansas',
    stateCode: 'KS',
    title: 'Top Portable Toilet Services in Olathe',
    metaDescription: 'Looking for Portable Toilet Rental in Olathe, KS? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-quality-portable-toilet-services-in-new-orleans',
    city: 'New Orleans',
    state: 'Louisiana',
    stateCode: 'LA',
    title: 'Top-Quality Portable Toilet Services in New Orleans',
    metaDescription: 'Looking for Portable Toilet Rental in New Orleans, LA? Portable Toilets Champ offers top-quality service.',
    phone: '(504) 276-2817',
    address: '3135 Dauphine St, New Orleans, LA 70117'
  },
  {
    slug: 'portable-toilet-services-in-baltimore-your-comprehensive-guide',
    city: 'Baltimore',
    state: 'Maryland',
    stateCode: 'MD',
    title: 'Portable Toilet Services in Baltimore',
    metaDescription: 'Looking for Portable Toilet Rental in Baltimore, MD? Portable Toilets Champ offers comprehensive service.',
    phone: '(410) 226-7914',
    address: '710 S Caton Ave, Baltimore, MD 21229',
    latitude: 39.2762355,
    longitude: -76.6719268
  },
  {
    slug: 'portable-toilet-services-in-charlotte-your-comprehensive-guide',
    city: 'Charlotte',
    state: 'North Carolina',
    stateCode: 'NC',
    title: 'Portable Toilet Services in Charlotte',
    metaDescription: 'Looking for Portable Toilet Rental in Charlotte, NC? Portable Toilets Champ offers comprehensive service.',
    phone: '(704) 440-3491',
    address: '3301 Woodpark Blvd, Charlotte, NC 28206',
    latitude: 35.2692502,
    longitude: -80.8245436
  },
  {
    slug: 'portable-toilet-services-in-raleigh-comprehensive-guide',
    city: 'Raleigh',
    state: 'North Carolina',
    stateCode: 'NC',
    title: 'Portable Toilet Services in Raleigh',
    metaDescription: 'Looking for Portable Toilet Rental in Raleigh, NC? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'top-quality-portable-toilet-services-in-reno',
    city: 'Reno',
    state: 'Nevada',
    stateCode: 'NV',
    title: 'Top-Quality Portable Toilet Services in Reno',
    metaDescription: 'Looking for Portable Toilet Rental in Reno, NV? Portable Toilets Champ offers top-quality service.',
    phone: '(775) 307-5143',
    address: '100 W Liberty St, Reno, NV 89501',
    latitude: 39.521126,
    longitude: -119.8127126
  },
  {
    slug: 'premium-portable-toilet-services-in-oklahoma-city',
    city: 'Oklahoma City',
    state: 'Oklahoma',
    stateCode: 'OK',
    title: 'Premium Portable Toilet Services in Oklahoma City',
    metaDescription: 'Looking for Portable Toilet Rental in Oklahoma City, OK? Portable Toilets Champ offers premium service.',
    phone: '(405) 357-0013',
    address: '4832 Richmond Square, Oklahoma City, OK 73118',
    latitude: 35.519499599999996,
    longitude: -97.5420709
  },
  {
    slug: 'comprehensive-portable-toilet-services-in-fort-worth',
    city: 'Fort Worth',
    state: 'Texas',
    stateCode: 'TX',
    title: 'Comprehensive Portable Toilet Services in Fort Worth',
    metaDescription: 'Looking for Portable Toilet Rental in Fort Worth, TX? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-services-in-milwaukee-your-ultimate-guide',
    city: 'Milwaukee',
    state: 'Wisconsin',
    stateCode: 'WI',
    title: 'Portable Toilet Services in Milwaukee',
    metaDescription: 'Looking for Portable Toilet Rental in Milwaukee, WI? Portable Toilets Champ offers comprehensive service.',
    phone: '(414) 279-4967',
    address: '11301 W Lake Park Dr, Milwaukee, WI 53224',
    latitude: 43.157168,
    longitude: -88.0531039
  },
  {
    slug: 'comprehensive-guide-to-portable-toilet-services-in-bridgeport',
    city: 'Bridgeport',
    state: 'Connecticut',
    stateCode: 'CT',
    title: 'Comprehensive Guide to Portable Toilet Services in Bridgeport',
    metaDescription: 'Looking for Portable Toilet Rental in Bridgeport, CT? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'comprehensive-guide-to-portable-toilet-services-in-gilbert',
    city: 'Gilbert',
    state: 'Arizona',
    stateCode: 'AZ',
    title: 'Comprehensive Guide to Portable Toilet Services in Gilbert',
    metaDescription: 'Looking for Portable Toilet Rental in Gilbert, AZ? Portable Toilets Champ offers comprehensive service.',
    phone: '(833) 435-6610'
  },
  {
    slug: 'portable-toilet-rental-services-in-peoria-az',
    city: 'Peoria',
    state: 'Arizona',
    stateCode: 'AZ',
    title: 'Portable Toilet Rental Services in Peoria, AZ',
    metaDescription: 'Looking for Portable Toilet Rental in Peoria, AZ? Portable Toilets Champ offers reliable service for events and construction sites.',
    phone: '(928) 212-1228',
    address: '9132 W Cactus Rd, Peoria, AZ 85381',
    latitude: 33.5963209,
    longitude: -112.2557727
  },
  // Major Markets - High Priority Additions
  {
    slug: 'portable-toilet-rental-seattle-wa',
    city: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    title: 'Portable Toilet Rental in Seattle, WA',
    metaDescription: 'Need portable toilets in Seattle? Same-day delivery for events & construction. Clean units from $250. Call (833) 435-6610 for your free quote today.',
    phone: '(833) 435-6610',
    latitude: 47.6062,
    longitude: -122.3321
  },
  {
    slug: 'portable-toilet-rental-portland-or',
    city: 'Portland',
    state: 'Oregon',
    stateCode: 'OR',
    title: 'Portable Toilet Rental in Portland, OR',
    metaDescription: 'Need porta potties in Portland? Same-day delivery available. Standard, deluxe & ADA units from $250. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    latitude: 45.5155,
    longitude: -122.6789
  },
  {
    slug: 'portable-toilet-rental-las-vegas-nv',
    city: 'Las Vegas',
    state: 'Nevada',
    stateCode: 'NV',
    title: 'Portable Toilet Rental in Las Vegas, NV',
    metaDescription: 'Vegas event or construction site? Get portable toilets delivered same-day. Clean units from $250. Call (833) 435-6610 for free Vegas quote.',
    phone: '(833) 435-6610',
    latitude: 36.1699,
    longitude: -115.1398
  },
  {
    slug: 'portable-toilet-rental-san-diego-ca',
    city: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    title: 'Portable Toilet Rental in San Diego, CA',
    metaDescription: 'Need portable toilets in San Diego? Same-day delivery for beaches, events & job sites. Clean units from $250. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    latitude: 32.7157,
    longitude: -117.1611
  },
  {
    slug: 'portable-toilet-rental-phoenix-az',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    title: 'Portable Toilet Rental in Phoenix, AZ',
    metaDescription: 'Phoenix portable toilet rental with same-day delivery. Climate-ready units for desert heat. From $250. Call (833) 435-6610 for free quote.',
    phone: '(833) 435-6610',
    latitude: 33.4484,
    longitude: -112.0740
  },
  {
    slug: 'portable-toilet-rental-atlanta-ga',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    title: 'Portable Toilet Rental in Atlanta, GA',
    metaDescription: 'Need porta potties in Atlanta? Same-day delivery for events & construction. Clean units from $250. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    latitude: 33.7490,
    longitude: -84.3880
  },
  {
    slug: 'portable-toilet-rental-nashville-tn',
    city: 'Nashville',
    state: 'Tennessee',
    stateCode: 'TN',
    title: 'Portable Toilet Rental in Nashville, TN',
    metaDescription: 'Nashville event or job site? Get portable toilets delivered same-day. Standard to luxury units from $250. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    latitude: 36.1627,
    longitude: -86.7816
  },
  {
    slug: 'portable-toilet-rental-boston-ma',
    city: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    title: 'Portable Toilet Rental in Boston, MA',
    metaDescription: 'Need portable toilets in Boston? Same-day delivery available. Standard, deluxe & ADA units from $250. Call (833) 435-6610 for free quote.',
    phone: '(833) 435-6610',
    latitude: 42.3601,
    longitude: -71.0589
  },
  {
    slug: 'portable-toilet-rental-philadelphia-pa',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    title: 'Portable Toilet Rental in Philadelphia, PA',
    metaDescription: 'Philly event or construction site? Get portable toilets delivered fast. Clean units from $250. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    latitude: 39.9526,
    longitude: -75.1652
  },
  {
    slug: 'portable-toilet-rental-austin-tx',
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    title: 'Portable Toilet Rental in Austin, TX',
    metaDescription: 'Austin portable toilet rental with same-day delivery. Festival-ready units for SXSW & beyond. From $250. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    latitude: 30.2672,
    longitude: -97.7431
  },
  {
    slug: 'portable-toilet-rental-san-antonio-tx',
    city: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    title: 'Portable Toilet Rental in San Antonio, TX',
    metaDescription: 'Need porta potties in San Antonio? Same-day delivery for Fiesta & year-round events. From $250. Call (833) 435-6610 for free quote.',
    phone: '(833) 435-6610',
    latitude: 29.4241,
    longitude: -98.4936
  },
  {
    slug: 'portable-toilet-rental-dallas-tx',
    city: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    title: 'Portable Toilet Rental in Dallas, TX',
    metaDescription: 'Dallas portable toilet rental with same-day delivery. Events, construction & more. Clean units from $250. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    latitude: 32.7767,
    longitude: -96.7970
  },
  {
    slug: 'portable-toilet-rental-houston-tx',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    title: 'Portable Toilet Rental in Houston, TX',
    metaDescription: 'Need portable toilets in Houston? Same-day delivery for events & job sites. Clean units from $250. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    latitude: 29.7604,
    longitude: -95.3698
  },
  {
    slug: 'portable-toilet-rental-tampa-fl',
    city: 'Tampa',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Portable Toilet Rental in Tampa, FL',
    metaDescription: 'Tampa Bay portable toilet rental with same-day delivery. Beach events & construction. From $250. Call (833) 435-6610 for free quote.',
    phone: '(833) 435-6610',
    latitude: 27.9506,
    longitude: -82.4572
  },
  {
    slug: 'portable-toilet-rental-orlando-fl',
    city: 'Orlando',
    state: 'Florida',
    stateCode: 'FL',
    title: 'Portable Toilet Rental in Orlando, FL',
    metaDescription: 'Orlando portable toilet rental for theme park events & construction. Same-day delivery from $250. Call (833) 435-6610 today.',
    phone: '(833) 435-6610',
    latitude: 28.5383,
    longitude: -81.3792
  }
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(location => location.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return locations.map(location => location.slug)
}

export function getLocationsByState(): Record<string, Location[]> {
  return locations.reduce((acc, location) => {
    const state = location.state
    if (!acc[state]) {
      acc[state] = []
    }
    acc[state].push(location)
    return acc
  }, {} as Record<string, Location[]>)
}

// Get PAA FAQs for a location (generates dynamically if not defined)
export function getLocationFAQs(location: Location): FAQItem[] {
  if (location.paaFaqs && location.paaFaqs.length > 0) {
    return location.paaFaqs
  }
  return generateLocationFAQs(location.city, location.state, location.stateCode)
}

// City coordinates lookup
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  // California
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'Anaheim': { lat: 33.8366, lng: -117.9143 },
  'Beverly Hills': { lat: 34.0736, lng: -118.4004 },
  'Burbank': { lat: 34.1808, lng: -118.3090 },
  'Malibu': { lat: 34.0259, lng: -118.7798 },
  'Riverside': { lat: 33.9533, lng: -117.3962 },
  'Torrance': { lat: 33.8358, lng: -118.3406 },
  'Fresno': { lat: 36.7378, lng: -119.7871 },
  'Bakersfield': { lat: 35.3733, lng: -119.0187 },
  'San Francisco': { lat: 37.7749, lng: -122.4194 },
  'Thousand Oaks': { lat: 34.1706, lng: -118.8376 },
  'Glendale': { lat: 34.1425, lng: -118.2551 },
  'Long Beach': { lat: 33.7701, lng: -118.1937 },
  'Huntington Beach': { lat: 33.6595, lng: -117.9988 },
  'Santa Ana': { lat: 33.7455, lng: -117.8677 },
  'Garden Grove': { lat: 33.7739, lng: -117.9414 },
  'Costa Mesa': { lat: 33.6411, lng: -117.9187 },
  'Westminster': { lat: 33.7513, lng: -117.9940 },
  'Simi Valley': { lat: 34.2694, lng: -118.7815 },
  'Chula Vista': { lat: 32.6401, lng: -117.0842 },
  'Victorville': { lat: 34.5362, lng: -117.2928 },
  'Inglewood': { lat: 33.9617, lng: -118.3531 },
  'San Bernardino': { lat: 34.1083, lng: -117.2898 },
  'San Diego': { lat: 32.7157, lng: -117.1611 },
  'Sacramento': { lat: 38.5816, lng: -121.4944 },
  'San Jose': { lat: 37.3382, lng: -121.8863 },
  'Oakland': { lat: 37.8044, lng: -122.2712 },
  'Irvine': { lat: 33.6846, lng: -117.8265 },
  'Fullerton': { lat: 33.8703, lng: -117.9253 },
  // Arizona
  'Phoenix': { lat: 33.4484, lng: -112.0740 },
  'Scottsdale': { lat: 33.4942, lng: -111.9261 },
  'Mesa': { lat: 33.4152, lng: -111.8315 },
  'Chandler': { lat: 33.3062, lng: -111.8413 },
  'Glendale AZ': { lat: 33.5387, lng: -112.1860 },
  'Gilbert': { lat: 33.3528, lng: -111.7890 },
  'Tempe': { lat: 33.4255, lng: -111.9400 },
  'Tucson': { lat: 32.2226, lng: -110.9747 },
  // Nevada
  'Las Vegas': { lat: 36.1699, lng: -115.1398 },
  'Henderson': { lat: 36.0395, lng: -114.9817 },
  'Reno': { lat: 39.5296, lng: -119.8138 },
  'North Las Vegas': { lat: 36.1989, lng: -115.1175 },
  // Texas
  'Houston': { lat: 29.7604, lng: -95.3698 },
  'Dallas': { lat: 32.7767, lng: -96.7970 },
  'Austin': { lat: 30.2672, lng: -97.7431 },
  'San Antonio': { lat: 29.4241, lng: -98.4936 },
  'Fort Worth': { lat: 32.7555, lng: -97.3308 },
  'El Paso': { lat: 31.7619, lng: -106.4850 },
  'Arlington': { lat: 32.7357, lng: -97.1081 },
  'Plano': { lat: 33.0198, lng: -96.6989 },
  // Florida
  'Miami': { lat: 25.7617, lng: -80.1918 },
  'Orlando': { lat: 28.5383, lng: -81.3792 },
  'Tampa': { lat: 27.9506, lng: -82.4572 },
  'Jacksonville': { lat: 30.3322, lng: -81.6557 },
  'Fort Lauderdale': { lat: 26.1224, lng: -80.1373 },
  // New York
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Buffalo': { lat: 42.8864, lng: -78.8784 },
  'Rochester': { lat: 43.1566, lng: -77.6088 },
  // Illinois
  'Chicago': { lat: 41.8781, lng: -87.6298 },
  'Aurora': { lat: 41.7606, lng: -88.3201 },
  // Pennsylvania
  'Philadelphia': { lat: 39.9526, lng: -75.1652 },
  'Pittsburgh': { lat: 40.4406, lng: -79.9959 },
  // Other major cities
  'Seattle': { lat: 47.6062, lng: -122.3321 },
  'Denver': { lat: 39.7392, lng: -104.9903 },
  'Boston': { lat: 42.3601, lng: -71.0589 },
  'Atlanta': { lat: 33.7490, lng: -84.3880 },
  'Minneapolis': { lat: 44.9778, lng: -93.2650 },
  'Detroit': { lat: 42.3314, lng: -83.0458 },
  'Portland': { lat: 45.5155, lng: -122.6789 },
  'Nashville': { lat: 36.1627, lng: -86.7816 },
  'Charlotte': { lat: 35.2271, lng: -80.8431 },
  'Indianapolis': { lat: 39.7684, lng: -86.1581 },
  'Columbus': { lat: 39.9612, lng: -82.9988 },
  'Milwaukee': { lat: 43.0389, lng: -87.9065 },
  'Bridgeport': { lat: 41.1865, lng: -73.1952 },
  'Cleveland': { lat: 41.4993, lng: -81.6944 },
  'Baltimore': { lat: 39.2904, lng: -76.6122 },
  'Washington': { lat: 38.9072, lng: -77.0369 },
  'New Orleans': { lat: 29.9511, lng: -90.0715 },
  'Kansas City': { lat: 39.0997, lng: -94.5786 },
  'Oklahoma City': { lat: 35.4676, lng: -97.5164 },
  'Louisville': { lat: 38.2527, lng: -85.7585 },
  'Memphis': { lat: 35.1495, lng: -90.0490 },
  'Salt Lake City': { lat: 40.7608, lng: -111.8910 },
  'Albuquerque': { lat: 35.0844, lng: -106.6504 },
}

// Get coordinates for a location
export function getLocationCoordinates(city: string): { lat: number; lng: number } | undefined {
  return cityCoordinates[city]
}

// Get all unique states
export function getAllStates(): { state: string; stateCode: string; count: number }[] {
  const stateMap = new Map<string, { stateCode: string; count: number }>()

  for (const location of locations) {
    const existing = stateMap.get(location.state)
    if (existing) {
      existing.count++
    } else {
      stateMap.set(location.state, { stateCode: location.stateCode, count: 1 })
    }
  }

  return Array.from(stateMap.entries())
    .map(([state, data]) => ({ state, stateCode: data.stateCode, count: data.count }))
    .sort((a, b) => a.state.localeCompare(b.state))
}

// Get nearby cities in the same state (excluding the current city)
export function getNearbyCities(currentSlug: string, limit: number = 6): Location[] {
  const currentLocation = getLocationBySlug(currentSlug)
  if (!currentLocation) return []

  return locations
    .filter(loc => loc.stateCode === currentLocation.stateCode && loc.slug !== currentSlug)
    .slice(0, limit)
}
