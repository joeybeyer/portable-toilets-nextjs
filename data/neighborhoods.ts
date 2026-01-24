import { FAQItem } from './types'

export interface Neighborhood {
  slug: string
  name: string
  citySlug: string  // Parent city's location slug
  city: string
  state: string
  stateCode: string
  zipCodes: string[]
  landmarks: string[]
  description: string
  uniqueFactors: string[]  // Microclimate/local factors for unique content
}

// Generate neighborhood-specific FAQs
export function generateNeighborhoodFAQs(neighborhood: Neighborhood): FAQItem[] {
  const { name, city, stateCode } = neighborhood
  const location = `${name}, ${city}`

  return [
    {
      question: `How much does portable toilet rental cost in ${name}?`,
      answer: `Portable toilet rental in ${location} typically costs $75-150 per day for standard units. Prices may vary based on delivery distance within ${city}. Weekly rentals offer 15-25% savings. Call (833) 435-6610 for an exact quote for your ${name} location.`
    },
    {
      question: `Can you deliver portable toilets to ${name} same-day?`,
      answer: `Yes, same-day portable toilet delivery is available in ${name} and throughout ${city}, ${stateCode}. For emergencies or last-minute events in ${name}, call us at (833) 435-6610. We prioritize urgent requests.`
    },
    {
      question: `What areas near ${name} do you serve?`,
      answer: `We serve all of ${city} including ${name} and surrounding neighborhoods. Our coverage includes residential areas, commercial zones, and event venues throughout the ${city} metro area.`
    },
    {
      question: `Do you service portable toilets in ${name} regularly?`,
      answer: `Yes, all rentals in ${name} include regular servicing. Standard service is weekly, with more frequent service available for high-traffic events or construction sites in the ${name} area.`
    }
  ]
}

// Los Angeles Neighborhoods
const losAngelesNeighborhoods: Neighborhood[] = [
  {
    slug: 'hollywood',
    name: 'Hollywood',
    citySlug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    zipCodes: ['90028', '90038', '90068', '90046'],
    landmarks: ['Hollywood Sign', 'Walk of Fame', 'Dolby Theatre', 'TCL Chinese Theatre', 'Griffith Observatory'],
    description: 'Hollywood is the entertainment capital of the world, home to major film studios, iconic landmarks, and countless events requiring professional portable restroom services.',
    uniqueFactors: [
      'High volume of film and TV productions requiring on-set restrooms',
      'Major tourist events along Hollywood Boulevard',
      'Outdoor concerts at the Hollywood Bowl',
      'Red carpet events requiring luxury restroom trailers',
      'Permit requirements for street closures and filming'
    ]
  },
  {
    slug: 'downtown-la',
    name: 'Downtown LA',
    citySlug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    zipCodes: ['90012', '90013', '90014', '90015', '90017', '90021'],
    landmarks: ['Staples Center', 'LA Convention Center', 'Grand Park', 'Walt Disney Concert Hall', 'Union Station'],
    description: 'Downtown Los Angeles is the commercial heart of the city, hosting major conventions, sporting events, and large-scale construction projects.',
    uniqueFactors: [
      'High-rise construction sites requiring crane-accessible units',
      'Major conventions at LA Convention Center',
      'Sports events at Crypto.com Arena',
      'Street festivals and parades in Grand Park',
      'Limited parking requiring strategic placement'
    ]
  },
  {
    slug: 'santa-monica',
    name: 'Santa Monica',
    citySlug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    zipCodes: ['90401', '90402', '90403', '90404', '90405'],
    landmarks: ['Santa Monica Pier', 'Third Street Promenade', 'Palisades Park', 'Santa Monica Beach', 'Tongva Park'],
    description: 'Santa Monica is a coastal city known for its beach events, pier attractions, and upscale outdoor gatherings requiring premium restroom facilities.',
    uniqueFactors: [
      'Beach events requiring sand-accessible placement',
      'Salt air corrosion considerations for equipment',
      'High-end beach weddings needing luxury trailers',
      'Farmer\'s market and street fair support',
      'Film shoots along the coastline'
    ]
  },
  {
    slug: 'venice',
    name: 'Venice',
    citySlug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    zipCodes: ['90291', '90292', '90294'],
    landmarks: ['Venice Beach Boardwalk', 'Muscle Beach', 'Venice Canals', 'Abbot Kinney Boulevard'],
    description: 'Venice is a vibrant beach community famous for its boardwalk, art scene, and eclectic events requiring flexible portable restroom solutions.',
    uniqueFactors: [
      'Boardwalk events and art festivals',
      'Beach volleyball tournaments',
      'Narrow canal-side access requiring compact units',
      'Unique artistic and bohemian event requirements',
      'High foot traffic areas'
    ]
  },
  {
    slug: 'burbank',
    name: 'Burbank',
    citySlug: 'portable-toilet-rental-services-in-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    zipCodes: ['91501', '91502', '91504', '91505', '91506'],
    landmarks: ['Warner Bros. Studios', 'Disney Studios', 'Universal Studios', 'Burbank Airport'],
    description: 'Burbank is the "Media Capital of the World," home to major studios requiring extensive on-set portable restroom facilities for cast and crew.',
    uniqueFactors: [
      'Film studio backlot requirements',
      'Union crew restroom standards',
      'Trailer-friendly studio access',
      'Long-term production rentals',
      'Premium facilities for talent'
    ]
  }
]

// Phoenix Neighborhoods
const phoenixNeighborhoods: Neighborhood[] = [
  {
    slug: 'scottsdale',
    name: 'Scottsdale',
    citySlug: 'portable-toilet-rentals-in-phoenix-your-complete-guide',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    zipCodes: ['85250', '85251', '85254', '85255', '85257', '85258', '85259', '85260'],
    landmarks: ['Old Town Scottsdale', 'Scottsdale Fashion Square', 'TPC Scottsdale', 'McDowell Sonoran Preserve'],
    description: 'Scottsdale is an upscale desert city known for golf tournaments, luxury resorts, and high-end events requiring premium portable restroom services.',
    uniqueFactors: [
      'Desert heat requiring climate-controlled trailers',
      'Golf tournament sanitation (WM Phoenix Open)',
      'Luxury resort events needing high-end facilities',
      'Spring training baseball games',
      'Extreme summer temperatures affecting equipment'
    ]
  },
  {
    slug: 'tempe',
    name: 'Tempe',
    citySlug: 'portable-toilet-rentals-in-phoenix-your-complete-guide',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    zipCodes: ['85281', '85282', '85283', '85284', '85287'],
    landmarks: ['Arizona State University', 'Tempe Town Lake', 'Sun Devil Stadium', 'Mill Avenue District'],
    description: 'Tempe is a college town home to Arizona State University, hosting large sporting events, festivals, and construction projects year-round.',
    uniqueFactors: [
      'ASU football games at Sun Devil Stadium',
      'Tempe Town Lake events and festivals',
      'College graduation ceremonies',
      'Ironman Arizona triathlon support',
      'Year-round construction due to growth'
    ]
  },
  {
    slug: 'mesa',
    name: 'Mesa',
    citySlug: 'portable-toilet-rentals-in-phoenix-your-complete-guide',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    zipCodes: ['85201', '85202', '85203', '85204', '85205', '85206', '85207', '85208', '85209', '85210'],
    landmarks: ['Mesa Arts Center', 'Sloan Park', 'Riverview Park', 'Arizona Museum of Natural History'],
    description: 'Mesa is Arizona\'s third-largest city with growing construction activity, spring training baseball, and community events.',
    uniqueFactors: [
      'Chicago Cubs spring training at Sloan Park',
      'Rapid suburban development and construction',
      'Large community park events',
      'Agricultural and farming events',
      'Desert climate equipment considerations'
    ]
  }
]

// Houston Neighborhoods
const houstonNeighborhoods: Neighborhood[] = [
  {
    slug: 'downtown-houston',
    name: 'Downtown Houston',
    citySlug: 'the-best-portable-toilet-rentals-in-houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    zipCodes: ['77002', '77003', '77004', '77010', '77019'],
    landmarks: ['Minute Maid Park', 'Toyota Center', 'Discovery Green', 'George R. Brown Convention Center'],
    description: 'Downtown Houston is the commercial center of Texas\'s largest city, hosting major sporting events, conventions, and urban construction projects.',
    uniqueFactors: [
      'Major league sports venues (Astros, Rockets)',
      'Hurricane season emergency preparedness',
      'High humidity affecting equipment maintenance',
      'Large convention center events',
      'Underground tunnel system considerations'
    ]
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    citySlug: 'the-best-portable-toilet-rentals-in-houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    zipCodes: ['77380', '77381', '77382', '77384', '77385', '77386', '77389'],
    landmarks: ['The Woodlands Pavilion', 'The Woodlands Waterway', 'Town Center', 'George Mitchell Nature Preserve'],
    description: 'The Woodlands is a master-planned community north of Houston known for concerts, corporate events, and upscale outdoor gatherings.',
    uniqueFactors: [
      'Cynthia Woods Mitchell Pavilion concerts',
      'Corporate campus events',
      'Wooded terrain requiring careful placement',
      'High-end community events',
      'Golf tournaments and country club functions'
    ]
  },
  {
    slug: 'katy',
    name: 'Katy',
    citySlug: 'the-best-portable-toilet-rentals-in-houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    zipCodes: ['77449', '77450', '77491', '77492', '77493', '77494'],
    landmarks: ['Katy Mills Mall', 'Typhoon Texas', 'LaCenterra at Cinco Ranch', 'Katy ISD Stadium'],
    description: 'Katy is a rapidly growing suburb west of Houston with major retail development, school events, and family-friendly festivals.',
    uniqueFactors: [
      'High school football at Legacy Stadium',
      'Rapid new construction and development',
      'Water park and outdoor entertainment venues',
      'Rice harvest and agricultural festivals',
      'Hurricane evacuation route support'
    ]
  }
]

// Miami Neighborhoods
const miamiNeighborhoods: Neighborhood[] = [
  {
    slug: 'miami-beach',
    name: 'Miami Beach',
    citySlug: 'portable-toilet-service-in-miami-a-comprehensive-guide',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    zipCodes: ['33139', '33140', '33141', '33154'],
    landmarks: ['South Beach', 'Ocean Drive', 'Art Deco Historic District', 'Lincoln Road Mall', 'Miami Beach Convention Center'],
    description: 'Miami Beach is a world-famous barrier island known for beach events, Art Basel, and luxury gatherings requiring premium portable restroom services.',
    uniqueFactors: [
      'Beach events requiring sand-accessible placement',
      'Art Basel and major art fairs',
      'Salt air corrosion from ocean proximity',
      'Luxury hotel overflow events',
      'Spring break high-volume needs',
      'Hurricane preparedness requirements'
    ]
  },
  {
    slug: 'wynwood',
    name: 'Wynwood',
    citySlug: 'portable-toilet-service-in-miami-a-comprehensive-guide',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    zipCodes: ['33127', '33137'],
    landmarks: ['Wynwood Walls', 'Wynwood Marketplace', 'The Rubell Museum', 'Wynwood Brewing Company'],
    description: 'Wynwood is Miami\'s arts district, famous for street art, galleries, and creative events requiring stylish portable restroom solutions.',
    uniqueFactors: [
      'Art walk and gallery opening events',
      'Warehouse venue conversions',
      'Street festivals and block parties',
      'Brewery and distillery events',
      'Creative industry corporate events'
    ]
  },
  {
    slug: 'brickell',
    name: 'Brickell',
    citySlug: 'portable-toilet-service-in-miami-a-comprehensive-guide',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    zipCodes: ['33129', '33130', '33131'],
    landmarks: ['Brickell City Centre', 'Mary Brickell Village', 'Brickell Key', 'Icon Brickell'],
    description: 'Brickell is Miami\'s financial district with high-rise construction, corporate events, and upscale gatherings requiring professional restroom services.',
    uniqueFactors: [
      'High-rise construction site requirements',
      'Corporate rooftop events',
      'Luxury condo construction projects',
      'Financial district festivals',
      'Limited space requiring compact solutions'
    ]
  }
]

// Export all neighborhoods
export const neighborhoods: Neighborhood[] = [
  ...losAngelesNeighborhoods,
  ...phoenixNeighborhoods,
  ...houstonNeighborhoods,
  ...miamiNeighborhoods
]

// Helper functions
export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.slug === slug)
}

export function getNeighborhoodsByCitySlug(citySlug: string): Neighborhood[] {
  return neighborhoods.filter(n => n.citySlug === citySlug)
}

export function getAllNeighborhoodSlugs(): string[] {
  return neighborhoods.map(n => n.slug)
}

export function getNeighborhoodsByState(stateCode: string): Neighborhood[] {
  return neighborhoods.filter(n => n.stateCode === stateCode)
}
