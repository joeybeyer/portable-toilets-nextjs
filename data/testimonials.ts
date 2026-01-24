export interface Testimonial {
  id: string
  author: string
  role: string
  company: string
  location: string
  rating: number
  review: string
  date: string
  useCase: 'event' | 'construction' | 'wedding' | 'corporate' | 'emergency'
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    author: 'Mike Johnson',
    role: 'Event Coordinator',
    company: 'LA Events Co.',
    location: 'Los Angeles, CA',
    rating: 5,
    review: 'We needed 50 units for a 3-day music festival and they delivered everything on time. The units were spotless and the service crew came daily to keep them clean. Our guests actually complimented the restroom facilities!',
    date: '2024-12-15',
    useCase: 'event'
  },
  {
    id: 'testimonial-2',
    author: 'Sarah Chen',
    role: 'Project Manager',
    company: 'BuildRight Construction',
    location: 'Phoenix, AZ',
    rating: 5,
    review: 'Been using Portable Toilets Champ for all our job sites for 2 years now. Always reliable, always clean, and their pricing is transparent. No hidden fees. They even relocated units for us as the project progressed at no extra charge.',
    date: '2024-11-28',
    useCase: 'construction'
  },
  {
    id: 'testimonial-3',
    author: 'Jennifer & David Martinez',
    role: 'Wedding Couple',
    company: '',
    location: 'San Diego, CA',
    rating: 5,
    review: 'The luxury restroom trailer was a game-changer for our outdoor vineyard wedding. Guests kept asking where we found such elegant portable facilities. Worth every penny for the comfort and style.',
    date: '2024-10-12',
    useCase: 'wedding'
  },
  {
    id: 'testimonial-4',
    author: 'Robert Williams',
    role: 'Operations Director',
    company: 'TechStart Inc.',
    location: 'Austin, TX',
    rating: 5,
    review: 'Our corporate retreat for 200 employees went smoothly thanks to their professional service. The VIP units were clean and well-maintained throughout the 3-day event. Highly recommend for any corporate function.',
    date: '2024-09-20',
    useCase: 'corporate'
  },
  {
    id: 'testimonial-5',
    author: 'Lisa Thompson',
    role: 'Property Manager',
    company: 'Sunset Apartments',
    location: 'Miami, FL',
    rating: 5,
    review: 'When our building\'s plumbing failed unexpectedly, they had units delivered within 3 hours. Saved us from a major tenant crisis. Their emergency response team is exceptional.',
    date: '2024-08-05',
    useCase: 'emergency'
  },
  {
    id: 'testimonial-6',
    author: 'Carlos Rivera',
    role: 'Festival Director',
    company: 'Summer Sounds Festival',
    location: 'Denver, CO',
    rating: 5,
    review: 'Planning a 10,000-person festival requires serious restroom logistics. They helped us calculate exactly how many units we needed and placed them strategically. Zero complaints from attendees about wait times.',
    date: '2024-07-22',
    useCase: 'event'
  },
  {
    id: 'testimonial-7',
    author: 'Amanda Foster',
    role: 'Site Supervisor',
    company: 'Highway Solutions LLC',
    location: 'Chicago, IL',
    rating: 5,
    review: 'We work on highway construction projects that span miles. They service our units reliably every week without fail. The crews are professional and the equipment is always in great condition.',
    date: '2024-06-14',
    useCase: 'construction'
  },
  {
    id: 'testimonial-8',
    author: 'Nicole & James Park',
    role: 'Wedding Couple',
    company: '',
    location: 'Seattle, WA',
    rating: 5,
    review: 'We were nervous about outdoor restrooms for our wedding but the restroom trailer exceeded all expectations. Air conditioning, beautiful interior, and an attendant kept everything perfect.',
    date: '2024-05-18',
    useCase: 'wedding'
  },
  {
    id: 'testimonial-9',
    author: 'Tom Bradley',
    role: 'Ranch Owner',
    company: 'Bradley Ranch',
    location: 'Houston, TX',
    rating: 5,
    review: 'We host annual rodeo events and need reliable restroom service. Been working with them for 5 years now and they never disappoint. Fair prices and fantastic customer service.',
    date: '2024-04-30',
    useCase: 'event'
  },
  {
    id: 'testimonial-10',
    author: 'Patricia Nguyen',
    role: 'HR Manager',
    company: 'GreenBuild Development',
    location: 'Portland, OR',
    rating: 5,
    review: 'OSHA compliance is crucial for us and they understand that. Units are always clean, well-stocked, and properly serviced. Our workers appreciate the quality and we appreciate the peace of mind.',
    date: '2024-03-15',
    useCase: 'construction'
  }
]

// Get testimonials by use case
export function getTestimonialsByUseCase(useCase: Testimonial['useCase']): Testimonial[] {
  return testimonials.filter(t => t.useCase === useCase)
}

// Get featured testimonials (mix of use cases)
export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  const useCases: Testimonial['useCase'][] = ['event', 'construction', 'wedding', 'corporate', 'emergency']
  const featured: Testimonial[] = []

  for (const useCase of useCases) {
    const testimonial = testimonials.find(t => t.useCase === useCase)
    if (testimonial && featured.length < count) {
      featured.push(testimonial)
    }
  }

  return featured
}

// Calculate aggregate rating
export function getAggregateRating(): { average: number; count: number } {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0)
  return {
    average: Math.round((total / testimonials.length) * 10) / 10,
    count: testimonials.length
  }
}
