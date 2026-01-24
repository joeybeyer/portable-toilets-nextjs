import { FAQItem } from './types'

export interface Service {
  slug: string
  title: string
  shortDescription: string
  metaDescription: string
  phone: string
  image: string
  imageAlt: string
  paaFaqs?: FAQItem[]
}

// Service image mapping for conversion-optimized images
const serviceImageMap: Record<string, { path: string; alt: string }> = {
  'standard-portable-toilet-rental': {
    path: '/images/services/standard-portable-toilet.webp',
    alt: 'Clean standard portable toilet rental unit on construction job site - reliable sanitation solution'
  },
  'deluxe-portable-toilet-rental': {
    path: '/images/services/deluxe-portable-toilet.webp',
    alt: 'Deluxe portable toilet rental at elegant outdoor wedding venue - upgraded restroom experience'
  },
  'handicap-accessible-portable-toilet-rental': {
    path: '/images/services/handicap-accessible-toilet.webp',
    alt: 'ADA compliant handicap accessible portable toilet with wheelchair ramp - inclusive restroom solution'
  },
  'luxury-portable-restroom-trailer-rental': {
    path: '/images/services/luxury-restroom-trailer.webp',
    alt: 'Luxury portable restroom trailer for weddings and VIP events - premium mobile bathroom rental'
  },
  'portable-restroom-trailer-rental': {
    path: '/images/services/portable-restroom-trailer.webp',
    alt: 'Multi-stall portable restroom trailer for large events and festivals - high capacity mobile restrooms'
  },
  'vip-portable-toilet-rental': {
    path: '/images/services/vip-portable-toilet.webp',
    alt: 'VIP portable toilet rental with premium features - upscale restroom for corporate events'
  },
  'event-portable-toilet-rental': {
    path: '/images/services/event-portable-toilet.webp',
    alt: 'Event portable toilet rental setup at outdoor festival - professional event sanitation services'
  },
  'construction-site-portable-toilet-rental': {
    path: '/images/services/construction-site-toilet.webp',
    alt: 'Construction site portable toilet rental - OSHA compliant sanitation for job sites'
  },
  'emergency-portable-toilet-rental': {
    path: '/images/services/emergency-portable-toilet.webp',
    alt: 'Emergency portable toilet rental with same-day delivery - fast response sanitation service'
  },
  'longterm-portable-toilet-rental': {
    path: '/images/services/longterm-portable-toilet.webp',
    alt: 'Long-term portable toilet rental for extended projects - cost-effective monthly sanitation'
  },
  'shortterm-portable-toilet-rental': {
    path: '/images/services/shortterm-portable-toilet.webp',
    alt: 'Short-term portable toilet rental for parties and weekend events - flexible rental periods'
  },
  'family-size-portable-toilet-rental': {
    path: '/images/services/family-size-toilet.webp',
    alt: 'Family size portable toilet with extra space - comfortable restroom for families with children'
  },
  'portable-sink-station-rental': {
    path: '/images/services/portable-sink-station.webp',
    alt: 'Portable sink station rental for hand washing - essential hygiene solution for events'
  },
  'portable-hand-sanitizer-station-rental': {
    path: '/images/services/hand-sanitizer-station.webp',
    alt: 'Portable hand sanitizer station rental - touchless hygiene for events and workplaces'
  },
  'portable-urinal-station-rental': {
    path: '/images/services/portable-urinal-station.webp',
    alt: 'Portable urinal station for high-traffic events - efficient restroom solution for large crowds'
  },
  'portable-toilet-delivery-service': {
    path: '/images/services/delivery-service.webp',
    alt: 'Portable toilet delivery service - professional setup and placement at your location'
  },
  'portable-toilet-pickup-service': {
    path: '/images/services/pickup-service.webp',
    alt: 'Portable toilet pickup service - hassle-free removal after your event or project'
  },
  'portable-toilet-placement-service': {
    path: '/images/services/placement-service.webp',
    alt: 'Portable toilet placement service - expert positioning for optimal accessibility'
  },
  'portable-toilet-relocation-service': {
    path: '/images/services/relocation-service.webp',
    alt: 'Portable toilet relocation service - move units as your project progresses'
  },
  'portable-toilet-reservation-service': {
    path: '/images/services/reservation-service.webp',
    alt: 'Portable toilet reservation service - book in advance to secure your units'
  },
  'portable-toilet-waste-disposal-service': {
    path: '/images/services/waste-disposal-service.webp',
    alt: 'Portable toilet waste disposal service - professional sanitation and cleaning'
  }
}

// Helper to get image for a service (exported for use in components)
export function getServiceImage(slug: string): { path: string; alt: string } {
  return serviceImageMap[slug] || {
    path: '/images/services/standard-portable-toilet.webp',
    alt: 'Professional portable toilet rental service - clean and reliable sanitation'
  }
}

export const services: Service[] = [
  {
    slug: 'standard-portable-toilet-rental',
    title: 'Standard Portable Toilet Rental',
    shortDescription: 'Basic portable toilet rentals for events and construction sites.',
    metaDescription: 'Need reliable portable toilets for your site? Clean units delivered same-day with weekly service included. Starting at $250. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/standard-portable-toilet.webp',
    imageAlt: 'Clean standard portable toilet rental unit on construction job site - reliable sanitation solution',
    paaFaqs: [
      {
        question: 'How much does standard portable toilet rental cost?',
        answer: 'Standard portable toilet rental starts at $250, which includes delivery, pickup, and weekly servicing. Monthly rentals offer better value for longer projects. Prices vary by location and rental duration. Most companies offer discounts for longer rental periods and multiple unit orders. Call (833) 435-6610 for an exact quote.'
      },
      {
        question: 'What is included in a standard portable toilet rental?',
        answer: 'A standard portable toilet rental includes the unit itself, delivery and pickup, initial stocking of toilet paper and hand sanitizer, and basic cleaning. Most rentals also include weekly servicing (pumping waste, restocking supplies, and sanitizing). Additional services like more frequent cleanings are available for an extra fee.'
      },
      {
        question: 'How often are standard portable toilets serviced?',
        answer: 'Standard portable toilets are typically serviced once per week under normal usage. High-traffic locations like construction sites or events may require service 2-3 times per week or daily. Each service includes pumping waste, sanitizing surfaces, restocking toilet paper and hand sanitizer, and checking for any maintenance needs.'
      },
      {
        question: 'How many people can use one standard portable toilet?',
        answer: 'One standard portable toilet can accommodate approximately 10 workers for a full 8-hour workday with weekly servicing. For events, plan for 1 unit per 50-75 guests for a 4-hour event. If alcohol is served, increase to 1 unit per 35-50 guests. Heavy usage may require more frequent servicing.'
      }
    ]
  },
  {
    slug: 'deluxe-portable-toilet-rental',
    title: 'Deluxe Portable Toilet Rental',
    shortDescription: 'Upgraded portable toilets with extra amenities for comfort.',
    metaDescription: 'Want premium restrooms for your event? Deluxe units with flushing toilets, sinks & mirrors. Same-day delivery available. Call (833) 435-6610 for a free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/deluxe-portable-toilet.webp',
    imageAlt: 'Deluxe portable toilet rental at elegant outdoor wedding venue - upgraded restroom experience',
    paaFaqs: [
      {
        question: 'What is the difference between standard and deluxe portable toilets?',
        answer: 'Deluxe portable toilets offer upgraded features compared to standard units. Key differences include flushing capability, built-in hand washing sinks with running water, interior lighting, mirrors, and better ventilation. Deluxe units are more spacious and provide a more comfortable experience similar to indoor restrooms.'
      },
      {
        question: 'How much does deluxe portable toilet rental cost?',
        answer: 'Deluxe portable toilet rental starts at $350, reflecting enhanced features like flushing toilets, sinks, and better ventilation. Monthly rentals offer significant savings for extended projects. Volume discounts are available for multiple unit rentals. Call (833) 435-6610 for your exact quote.'
      },
      {
        question: 'Do deluxe portable toilets have running water?',
        answer: 'Yes, deluxe portable toilets feature built-in sinks with running water for hand washing. They use a freshwater tank and gray water collection system. Some models include foot-pump or hands-free faucets. The water supply is replenished during regular servicing visits.'
      },
      {
        question: 'Are deluxe portable toilets good for weddings?',
        answer: 'Yes, deluxe portable toilets are an excellent choice for weddings. They offer flushing toilets, running water sinks, mirrors, and interior lighting that provide guests with a more comfortable and dignified experience. For upscale weddings, consider luxury restroom trailers which offer even more premium amenities.'
      }
    ]
  },
  {
    slug: 'handicap-accessible-portable-toilet-rental',
    title: 'ADA Handicap Accessible Portable Toilet Rental',
    shortDescription: 'ADA-compliant portable toilets for accessibility needs.',
    metaDescription: 'Need ADA-compliant restrooms? Get wheelchair-accessible units with ramps & grab bars. OSHA compliant, same-day delivery. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/handicap-accessible-toilet.webp',
    imageAlt: 'ADA compliant handicap accessible portable toilet with wheelchair ramp - inclusive restroom solution',
    paaFaqs: [
      {
        question: 'What makes a portable toilet ADA compliant?',
        answer: 'ADA-compliant portable toilets meet Americans with Disabilities Act accessibility standards. Key features include a minimum 60-inch turning radius inside, grab bars on both sides, a wider doorway (minimum 32 inches), lower toilet seat height, and a level entry with no steps. The door must open outward and be operable with one hand.'
      },
      {
        question: 'How many ADA portable toilets are required at an event?',
        answer: 'ADA guidelines require at least 5% of all portable toilets at an event be accessible units, with a minimum of one accessible unit. For example, if you have 20 portable toilets, at least 1 must be ADA-compliant. Many event permits require accessible restrooms regardless of total unit count.'
      },
      {
        question: 'How wide is a handicap accessible portable toilet?',
        answer: 'Handicap accessible portable toilets are approximately 60 inches wide and 90 inches deep, compared to standard units at 44 inches wide. The larger size provides the required 60-inch turning radius for wheelchair users. The doorway is at least 32 inches wide to accommodate wheelchairs and mobility devices.'
      },
      {
        question: 'How much does ADA portable toilet rental cost?',
        answer: 'ADA-compliant portable toilet rental starts at $350, reflecting the larger unit size and specialized accessibility features including grab bars, wider doors, and wheelchair turning radius. Monthly rentals offer better value for extended projects. Delivery, pickup, and regular servicing are included. Call (833) 435-6610 for your quote.'
      }
    ]
  },
  {
    slug: 'luxury-portable-restroom-trailer-rental',
    title: 'Luxury Portable Restroom Trailer Rental',
    shortDescription: 'High-end restroom trailers for upscale events.',
    metaDescription: 'Planning a VIP event or wedding? Luxury restroom trailers with AC, flushing toilets & running water. Impress your guests. Call (833) 435-6610 for a free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/luxury-restroom-trailer.webp',
    imageAlt: 'Luxury portable restroom trailer for weddings and VIP events - premium mobile bathroom rental',
    paaFaqs: [
      {
        question: 'How much does a luxury restroom trailer cost to rent?',
        answer: 'Luxury restroom trailer rental typically costs $500-1,500 per day for a 2-station trailer and $1,000-3,000+ for larger 4-8 station units. Weekend wedding packages range from $1,500-5,000. Prices include delivery, setup, generator (if needed), and attendant options. Premium trailers with marble, chandeliers, and climate control cost more.'
      },
      {
        question: 'What is the difference between a porta potty and a restroom trailer?',
        answer: 'Restroom trailers are fully enclosed, climate-controlled mobile restrooms that resemble indoor bathrooms. Unlike porta potties, they feature flushing porcelain toilets, running water sinks, mirrors, lighting, and premium finishes. Luxury trailers include amenities like hardwood floors, granite countertops, stereo systems, and separate men\'s and women\'s sections.'
      },
      {
        question: 'Do luxury restroom trailers have running water and electricity?',
        answer: 'Yes, luxury restroom trailers have full running water with hot and cold options, flushing toilets, and electricity for lighting and climate control. They connect to an external water source or use onboard freshwater tanks. Power comes from a standard electrical hookup or a generator, which can be included in your rental.'
      },
      {
        question: 'How many guests can a luxury restroom trailer accommodate?',
        answer: 'A 2-station luxury restroom trailer comfortably serves 75-150 guests for a 4-hour event. A 4-station trailer serves 150-300 guests. For larger events, 6-8 station trailers can accommodate 300-500+ guests. The number varies based on event duration, alcohol service, and whether the trailer supplements existing facilities.'
      }
    ]
  },
  {
    slug: 'portable-restroom-trailer-rental',
    title: 'Portable Restroom Trailer Rental',
    shortDescription: 'Multi-stall restroom trailers for large events.',
    metaDescription: 'Hosting a large event? Multi-stall restroom trailers handle high traffic with climate control & running water. Same-day available. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    image: '/images/services/portable-restroom-trailer.webp',
    imageAlt: 'Multi-stall portable restroom trailer for large events and festivals - high capacity mobile restrooms',
    paaFaqs: [
      {
        question: 'What is a portable restroom trailer?',
        answer: 'A portable restroom trailer is a mobile bathroom facility on a towable trailer chassis. Unlike single-unit porta potties, trailers contain multiple private stalls with flushing toilets, sinks with running water, mirrors, and climate control. They range from basic 2-stall units to luxury 10+ stall trailers for large events.'
      },
      {
        question: 'How much space is needed for a restroom trailer?',
        answer: 'A standard 2-station restroom trailer requires approximately 12x8 feet of flat, level ground. Larger trailers need 20-35 feet in length. You also need clear access for delivery (12 feet wide, 14 feet high minimum). The area should be within 100 feet of a water source and electrical hookup, or you\'ll need generator and tank rentals.'
      },
      {
        question: 'Can restroom trailers be used in winter?',
        answer: 'Yes, restroom trailers can be used in winter with proper preparation. Most trailers have climate control systems with heating. For extreme cold, insulated water lines, tank heaters, and heated holding tanks prevent freezing. Some rentals include winterization packages. Indoor-quality comfort is maintained even in freezing temperatures.'
      }
    ]
  },
  {
    slug: 'vip-portable-toilet-rental',
    title: 'VIP Portable Toilet Rental',
    shortDescription: 'Premium VIP portable toilets with luxury features.',
    metaDescription: 'Need upscale restrooms without the trailer cost? VIP units with flushing toilets, sinks & mirrors. Perfect for corporate events. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    image: '/images/services/vip-portable-toilet.webp',
    imageAlt: 'VIP portable toilet rental with premium features - upscale restroom for corporate events',
    paaFaqs: [
      {
        question: 'What is a VIP portable toilet?',
        answer: 'A VIP portable toilet is an upgraded single-unit portable restroom with premium features. Unlike standard porta potties, VIP units include flushing toilets, hand washing sinks with running water, interior lighting, mirrors, and better ventilation. They bridge the gap between basic portable toilets and full restroom trailers.'
      },
      {
        question: 'How much does VIP portable toilet rental cost?',
        answer: 'VIP portable toilet rental starts at $400, reflecting premium features like flushing toilets, running water sinks, mirrors, and better ventilation. For weddings and corporate events, VIP units offer a significant upgrade over standard porta potties at a fraction of trailer costs. Call (833) 435-6610 for your quote.'
      },
      {
        question: 'When should I choose VIP toilets over standard porta potties?',
        answer: 'Choose VIP portable toilets for weddings, corporate events, upscale parties, and any occasion where guest comfort matters. They\'re ideal when you need better-than-basic facilities but don\'t have space or budget for a full restroom trailer. VIP units work well for smaller events of 50-100 guests wanting a nicer experience.'
      }
    ]
  },
  {
    slug: 'event-portable-toilet-rental',
    title: 'Event Portable Toilet Rental',
    shortDescription: 'Portable toilet solutions for all types of events.',
    metaDescription: 'Planning an outdoor event? Get clean portable toilets delivered same-day. Festivals, weddings & concerts covered. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/event-portable-toilet.webp',
    imageAlt: 'Event portable toilet rental setup at outdoor festival - professional event sanitation services',
    paaFaqs: [
      {
        question: 'How many portable toilets do I need for an outdoor event?',
        answer: 'For outdoor events, plan for 1 portable toilet per 50-75 guests for a 4-hour event. If serving alcohol, increase to 1 per 35-50 guests. For all-day events (8+ hours), double the quantity. Add 15% more for predominantly female attendance. Always include at least one ADA-accessible unit for events over 50 guests.'
      },
      {
        question: 'How far in advance should I book portable toilets for an event?',
        answer: 'Book portable toilets 2-4 weeks in advance for standard events. For peak seasons (May-October), weddings, and large festivals, reserve 4-8 weeks ahead. Holiday weekends and major local events may require 2-3 months advance booking. Last-minute rentals are possible but may have limited selection and higher prices.'
      },
      {
        question: 'What types of portable toilets are best for weddings?',
        answer: 'For weddings, luxury restroom trailers provide the best guest experience with flushing toilets, running water, mirrors, and climate control. VIP or deluxe portable toilets are good mid-range options. For casual outdoor weddings, flushable units with hand washing stations work well. Always include at least one ADA unit.'
      },
      {
        question: 'Do I need a permit for portable toilets at an event?',
        answer: 'Permit requirements vary by location. Public events, street festivals, and gatherings over 200 people typically require permits that specify restroom requirements. Private property events usually don\'t need permits for portable toilets. Check with your local health department and event venue for specific requirements.'
      }
    ]
  },
  {
    slug: 'construction-site-portable-toilet-rental',
    title: 'Construction Site Portable Toilet Rental',
    shortDescription: 'Durable portable toilets for construction job sites.',
    metaDescription: 'Need OSHA-compliant job site restrooms? Get durable units with weekly service from $250/month. Stay legal & productive. Call (833) 435-6610 for a free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/construction-site-toilet.webp',
    imageAlt: 'Construction site portable toilet rental - OSHA compliant sanitation for job sites',
    paaFaqs: [
      {
        question: 'Are portable toilets required on construction sites?',
        answer: 'Yes, OSHA requires employers to provide toilet facilities for construction workers. The regulation (29 CFR 1926.51) mandates at least 1 toilet for every 20 workers on sites with 20 or fewer employees, and 1 toilet plus 1 urinal per 40 workers for larger sites. Toilets must be available within a 10-minute walk.'
      },
      {
        question: 'How often should construction site portable toilets be serviced?',
        answer: 'Construction site portable toilets should be serviced at least once per week for standard usage (up to 10 workers per unit). High-traffic sites or hot weather may require twice-weekly or daily service. Each service includes pumping waste, sanitizing, restocking supplies, and maintenance checks. OSHA requires sanitary conditions at all times.'
      },
      {
        question: 'What are OSHA portable toilet requirements for construction?',
        answer: 'OSHA requires 1 toilet per 20 workers for job sites with 20 or fewer employees. Sites with 20+ workers need 1 toilet and 1 urinal per 40 workers (or 1 toilet per 40 if urinals aren\'t used). Toilets must be located within 10 minutes travel time, maintained in sanitary condition, and have privacy. Separate facilities are recommended for gender diversity.'
      },
      {
        question: 'How much does construction site porta potty rental cost per month?',
        answer: 'Construction site porta potty rental starts at $250 per month for a standard unit with weekly service. This includes delivery, pickup, and regular servicing. Deluxe units with sinks and handwashing start around $350 monthly. Long-term construction projects often receive discounted rates. Call (833) 435-6610 for your quote.'
      }
    ]
  },
  {
    slug: 'emergency-portable-toilet-rental',
    title: 'Emergency Portable Toilet Rental',
    shortDescription: 'Fast emergency portable toilet delivery when you need it.',
    metaDescription: 'Need portable toilets NOW? Emergency delivery in 2-4 hours. Plumbing failures, disasters, last-minute events. Call (833) 435-6610 for same-day service.',
    phone: '(833) 435-6610',
    image: '/images/services/emergency-portable-toilet.webp',
    imageAlt: 'Emergency portable toilet rental with same-day delivery - fast response sanitation service',
    paaFaqs: [
      {
        question: 'Can I get same-day portable toilet delivery?',
        answer: 'Yes, same-day portable toilet delivery is available in most areas. Emergency rentals can often be delivered within 2-4 hours depending on location and availability. Rush delivery fees typically range from $50-150. Call (833) 435-6610 for immediate emergency portable toilet service and availability.'
      },
      {
        question: 'What is considered an emergency portable toilet rental?',
        answer: 'Emergency portable toilet rentals cover unexpected situations requiring immediate restroom facilities. Common emergencies include plumbing failures, natural disasters, power outages affecting building facilities, last-minute events, or construction delays. Emergency service includes expedited delivery, often within hours rather than days.'
      },
      {
        question: 'How much extra does emergency portable toilet rental cost?',
        answer: 'Emergency and rush portable toilet delivery typically adds $50-200 to standard rental rates. Same-day delivery may cost $75-150 extra. After-hours, weekend, and holiday deliveries have higher premiums. Despite the added cost, emergency service ensures you have sanitary facilities when you need them most urgently.'
      }
    ]
  },
  {
    slug: 'longterm-portable-toilet-rental',
    title: 'Long-Term Portable Toilet Rental',
    shortDescription: 'Extended rental periods for ongoing projects.',
    metaDescription: 'Running a long project? Save 10-25% with extended rental contracts. Weekly service included from $250/month. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/longterm-portable-toilet.webp',
    imageAlt: 'Long-term portable toilet rental for extended projects - cost-effective monthly sanitation',
    paaFaqs: [
      {
        question: 'How much does long-term portable toilet rental cost?',
        answer: 'Long-term portable toilet rental starts at $250 per month for standard units with weekly service. Deluxe units with sinks start around $350 monthly. Multi-month and multi-year contracts receive discounts of 10-25%. The monthly rate includes delivery, pickup, and regular servicing. Call (833) 435-6610 for your quote.'
      },
      {
        question: 'What is considered long-term portable toilet rental?',
        answer: 'Long-term portable toilet rental typically means rentals of 3 months or longer. Many companies offer special pricing for 6-month, 12-month, and multi-year contracts. Long-term rentals are common for construction projects, industrial sites, farms, and remote locations without permanent restroom facilities.'
      },
      {
        question: 'Can I change service frequency on a long-term rental?',
        answer: 'Yes, service frequency on long-term rentals can be adjusted based on usage needs. If your worker count or usage changes, you can increase to twice-weekly or daily service, or reduce to bi-weekly if usage decreases. Notify your provider at least a week in advance to adjust your service schedule.'
      }
    ]
  },
  {
    slug: 'shortterm-portable-toilet-rental',
    title: 'Short-Term Portable Toilet Rental',
    shortDescription: 'Flexible short-term rentals for quick needs.',
    metaDescription: 'Need a porta potty for just a day or weekend? Flexible short-term rentals starting at $250. Delivery included. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/shortterm-portable-toilet.webp',
    imageAlt: 'Short-term portable toilet rental for parties and weekend events - flexible rental periods',
    paaFaqs: [
      {
        question: 'Can I rent a portable toilet for just one day?',
        answer: 'Yes, single-day portable toilet rentals are available starting at $250 for standard units. The price includes delivery, pickup, and initial stocking with toilet paper and hand sanitizer. One-day rentals are perfect for parties, small events, and short-term projects. Call (833) 435-6610 to confirm availability.'
      },
      {
        question: 'What is the minimum rental period for portable toilets?',
        answer: 'Most portable toilet companies have a minimum rental period of 1-3 days, though many offer true single-day rentals. Weekend minimums (Friday-Monday) are common for events. Some companies charge a 1-week minimum during peak season. Always confirm minimum rental periods when booking.'
      },
      {
        question: 'How much does weekend portable toilet rental cost?',
        answer: 'Weekend portable toilet rental (Friday delivery, Monday pickup) starts at $250 for standard units and around $400 for deluxe units with sinks. This 3-day period is popular for backyard parties, graduation celebrations, and small weddings. Prices include delivery, pickup, and initial supplies. Call (833) 435-6610 for your quote.'
      }
    ]
  },
  {
    slug: 'family-size-portable-toilet-rental',
    title: 'Family Size Portable Toilet Rental',
    shortDescription: 'Spacious portable toilets for families with children.',
    metaDescription: 'Attending events with kids? Family-size units have extra room for parents & children with changing shelves. Same-day delivery. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    image: '/images/services/family-size-toilet.webp',
    imageAlt: 'Family size portable toilet with extra space - comfortable restroom for families with children',
    paaFaqs: [
      {
        question: 'What is a family size portable toilet?',
        answer: 'A family size portable toilet is a larger unit designed to accommodate parents with young children. These spacious units provide room for a parent and child to enter together, with enough space for diaper changes and helping small children. They\'re larger than standard units but more compact than full ADA-accessible toilets.'
      },
      {
        question: 'How big is a family size portable toilet?',
        answer: 'Family size portable toilets are approximately 50-55 inches wide and 50-55 inches deep, compared to standard units at 44 inches. This provides about 25% more interior space. The extra room allows parents to assist children and includes amenities like fold-down changing shelves in many models.'
      },
      {
        question: 'Are family portable toilets the same as ADA units?',
        answer: 'No, family size portable toilets differ from ADA units. While both are larger than standard, ADA units meet specific accessibility requirements including 60-inch turning radius, grab bars, and wheelchair accessibility. Family units are spacious for convenience but may not meet all ADA requirements. For accessibility needs, specifically request ADA-compliant units.'
      }
    ]
  },
  {
    slug: 'portable-sink-station-rental',
    title: 'Portable Sink Station Rental',
    shortDescription: 'Handwashing stations for hygiene compliance.',
    metaDescription: 'Need hand washing for OSHA or health compliance? Self-contained sinks require no plumbing. Same-day delivery available. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/portable-sink-station.webp',
    imageAlt: 'Portable sink station rental for hand washing - essential hygiene solution for events',
    paaFaqs: [
      {
        question: 'Are hand washing stations required with portable toilets?',
        answer: 'Hand washing requirements vary by location and event type. OSHA requires hand washing facilities for construction sites. Health departments often require them for food service events and public gatherings. Many venues and permits mandate hand washing stations with portable toilets. Best practice is always to provide hand washing near restroom facilities.'
      },
      {
        question: 'How much does portable sink station rental cost?',
        answer: 'Portable sink station rental starts at $150 for short-term events or around $200-300 per month for longer projects. Prices include the unit, freshwater tank, gray water collection, soap, and paper towels. Multi-station sinks (2-4 users) cost more. Call (833) 435-6610 for your exact quote.'
      },
      {
        question: 'Do portable sinks need water hookup?',
        answer: 'No, portable sinks are self-contained and don\'t require water hookups. They have freshwater tanks (typically 5-20 gallons) and gray water collection tanks. Foot pumps or battery-powered systems provide water flow. Tanks are refilled during regular service visits. This makes them perfect for remote locations without plumbing access.'
      }
    ]
  },
  {
    slug: 'portable-hand-sanitizer-station-rental',
    title: 'Portable Hand Sanitizer Station Rental',
    shortDescription: 'Hand sanitizer stations for events and workplaces.',
    metaDescription: 'Want touchless hygiene for your event? Freestanding sanitizer stations require no power. Same-day available. Call (833) 435-6610 for your free quote.',
    phone: '(833) 435-6610',
    image: '/images/services/hand-sanitizer-station.webp',
    imageAlt: 'Portable hand sanitizer station rental - touchless hygiene for events and workplaces',
    paaFaqs: [
      {
        question: 'How much does hand sanitizer station rental cost?',
        answer: 'Portable hand sanitizer station rental starts at $50 for events or around $100-150 per month for ongoing use. Prices include the stand, dispenser, and initial sanitizer fill. Refills during the rental period may be additional depending on usage. Volume discounts apply for multiple stations. Call (833) 435-6610 for your quote.'
      },
      {
        question: 'Where should hand sanitizer stations be placed at events?',
        answer: 'Place hand sanitizer stations at event entrances and exits, near food service areas, adjacent to portable toilets, at registration or check-in points, and throughout high-traffic areas. For large events, space stations every 50-100 feet in main thoroughfares. Visible placement encourages use and promotes hygiene.'
      },
      {
        question: 'How many hand sanitizer stations do I need for my event?',
        answer: 'Plan for 1 hand sanitizer station per 100-150 guests for general events. Food festivals and health-conscious events may need 1 per 50-75 guests. Place at least one near each portable toilet cluster and food area. For corporate settings, provide 1 station per 25-50 employees in high-traffic areas.'
      }
    ]
  },
  {
    slug: 'portable-urinal-station-rental',
    title: 'Portable Urinal Station Rental',
    shortDescription: 'Efficient urinal stations for high-traffic events.',
    metaDescription: 'Long restroom lines at your event? 4-8 position urinal stations cut wait times by 75%. Ideal for concerts & festivals. Call (833) 435-6610 for availability.',
    phone: '(833) 435-6610',
    image: '/images/services/portable-urinal-station.webp',
    imageAlt: 'Portable urinal station for high-traffic events - efficient restroom solution for large crowds',
    paaFaqs: [
      {
        question: 'What is a portable urinal station?',
        answer: 'A portable urinal station is a multi-position urinal unit designed for high-volume events. Unlike single-occupancy portable toilets, urinal stations allow 4-8 men to use the facility simultaneously. They\'re highly efficient for concerts, sporting events, and festivals where quick turnaround is essential to reduce wait times.'
      },
      {
        question: 'How many people can use a portable urinal station?',
        answer: 'A standard portable urinal station has 4 positions, allowing 4 users simultaneously. Some units have 6-8 positions. A 4-position urinal station can accommodate roughly 200-300 men per hour, compared to 15-20 uses per hour for a standard portable toilet. They dramatically reduce lines at male-heavy events.'
      },
      {
        question: 'When should I rent urinal stations instead of regular portable toilets?',
        answer: 'Rent urinal stations for large events with predominantly male attendance, such as sports games, concerts, and construction sites. They\'re ideal when reducing wait times is critical. Combine urinal stations with standard portable toilets—urinals handle high-volume needs while regular units serve those needing full facilities.'
      }
    ]
  },
  {
    slug: 'portable-toilet-delivery-service',
    title: 'Portable Toilet Delivery Service',
    shortDescription: 'Reliable delivery and setup of portable toilets.',
    metaDescription: 'Need portable toilets delivered fast? Free delivery within 50 miles, same-day available. Professional setup included. Call (833) 435-6610 to schedule.',
    phone: '(833) 435-6610',
    image: '/images/services/delivery-service.webp',
    imageAlt: 'Portable toilet delivery service - professional setup and placement at your location',
    paaFaqs: [
      {
        question: 'How far in advance should I schedule portable toilet delivery?',
        answer: 'Schedule portable toilet delivery 1-2 weeks in advance for standard orders. Peak season (May-October), holidays, and large events require 3-4 weeks notice. Same-day and next-day emergency delivery is available for an additional fee. Confirm delivery windows when booking—most companies offer 2-4 hour delivery windows.'
      },
      {
        question: 'What do I need to prepare for portable toilet delivery?',
        answer: 'Prepare a flat, level surface accessible by truck (12 feet wide minimum). Clear the area of obstacles, vehicles, and debris. Mark the exact placement location. Ensure ground access isn\'t blocked by gates, low-hanging branches, or tight turns. Inform the driver of any access codes, parking restrictions, or site-specific requirements.'
      },
      {
        question: 'Is portable toilet delivery included in the rental price?',
        answer: 'Most portable toilet rentals include standard delivery and pickup within a service area (typically 25-50 miles). Locations outside the service area incur additional delivery fees, usually $2-5 per mile. Rush delivery, after-hours delivery, and difficult access locations may have surcharges. Confirm delivery terms when booking.'
      }
    ]
  },
  {
    slug: 'portable-toilet-pickup-service',
    title: 'Portable Toilet Pickup Service',
    shortDescription: 'Hassle-free pickup after your event or project.',
    metaDescription: 'Done with your rental? Hassle-free pickup next business day. Need to extend? No problem. Call (833) 435-6610 to schedule your pickup.',
    phone: '(833) 435-6610',
    image: '/images/services/pickup-service.webp',
    imageAlt: 'Portable toilet pickup service - hassle-free removal after your event or project',
    paaFaqs: [
      {
        question: 'When will portable toilets be picked up after my event?',
        answer: 'Portable toilets are typically picked up the next business day after your rental ends. For weekend events, pickup is usually Monday. You can request same-day pickup for an additional fee. Confirm your pickup date when booking and ensure the units are accessible—not blocked by vehicles or event teardown equipment.'
      },
      {
        question: 'Do I need to do anything before portable toilet pickup?',
        answer: 'Simply ensure the portable toilets are accessible for the pickup truck. Remove any signage, decorations, or items you placed near the units. Clear vehicles and equipment from the access path. You don\'t need to clean or empty the units—that\'s handled during pickup. The rental company manages all waste disposal.'
      },
      {
        question: 'What if I need to extend my portable toilet rental?',
        answer: 'Contact your rental company as soon as you know you need an extension. Most companies accommodate extensions if units are available. You\'ll be charged the daily or weekly rate for additional time. Request extensions at least 24-48 hours before scheduled pickup to ensure seamless service continuation.'
      }
    ]
  },
  {
    slug: 'portable-toilet-placement-service',
    title: 'Portable Toilet Placement Service',
    shortDescription: 'Strategic placement for optimal accessibility.',
    metaDescription: 'Not sure where to put your porta potties? Expert placement for optimal guest flow & ADA compliance. Call (833) 435-6610 for free placement guidance.',
    phone: '(833) 435-6610',
    image: '/images/services/placement-service.webp',
    imageAlt: 'Portable toilet placement service - expert positioning for optimal accessibility',
    paaFaqs: [
      {
        question: 'Where should portable toilets be placed at an event?',
        answer: 'Place portable toilets in visible, well-lit areas near high-traffic zones but not adjacent to food service or main gathering areas. Space them at least 50-75 feet from food prep and dining. Ensure ADA units have level, accessible paths. For large events, distribute units throughout the venue rather than clustering in one location.'
      },
      {
        question: 'How much space is needed for portable toilet placement?',
        answer: 'A standard portable toilet requires a 4x4 foot footprint plus 3 feet of clearance in front for door access. Allow 2-3 feet between units if placing multiple toilets. ADA units need 5x8 feet plus accessible pathway. Ensure the ground is flat, level, and can support the weight (approximately 250-400 lbs when serviced).'
      },
      {
        question: 'Can portable toilets be placed on grass or gravel?',
        answer: 'Yes, portable toilets can be placed on grass, gravel, dirt, or paved surfaces. The ground must be relatively flat and stable. Avoid slopes, muddy areas, or loose sand. For multi-day events, grass placement may leave marks. Consider using plywood bases for soft ground or to protect decorative surfaces at upscale events.'
      }
    ]
  },
  {
    slug: 'portable-toilet-relocation-service',
    title: 'Portable Toilet Relocation Service',
    shortDescription: 'Move portable toilets as your project progresses.',
    metaDescription: 'Project layout changing? Professional relocation service includes pumping & cleaning before moving. Perfect for construction. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    image: '/images/services/relocation-service.webp',
    imageAlt: 'Portable toilet relocation service - move units as your project progresses',
    paaFaqs: [
      {
        question: 'Can portable toilets be moved during a rental?',
        answer: 'Yes, portable toilets can be relocated during your rental period. Relocation service typically costs $50-100 per unit. Schedule relocations at least 24-48 hours in advance. This service is common for construction sites where work areas shift, or for events with changing layouts. The unit is pumped and cleaned before relocation.'
      },
      {
        question: 'How often can I have portable toilets relocated?',
        answer: 'Portable toilets can be relocated as often as needed, though each move incurs a service fee. For construction sites with frequently changing work areas, consider adding extra units to cover multiple zones instead of constant relocation. Weekly or monthly moves are common for long-term construction projects.'
      },
      {
        question: 'Do I need to empty portable toilets before relocation?',
        answer: 'No, you don\'t need to empty the units yourself. The relocation service includes pumping and cleaning before moving. Never attempt to move a portable toilet on your own—they\'re heavy (250-400 lbs) and require specialized equipment. Always use professional relocation services to avoid damage, spills, or injury.'
      }
    ]
  },
  {
    slug: 'portable-toilet-reservation-service',
    title: 'Portable Toilet Reservation Service',
    shortDescription: 'Book in advance to secure your portable toilets.',
    metaDescription: 'Planning ahead for your event? Reserve up to 12 months in advance. Lock in your date with just 25% deposit. Call (833) 435-6610 to secure your units.',
    phone: '(833) 435-6610',
    image: '/images/services/reservation-service.webp',
    imageAlt: 'Portable toilet reservation service - book in advance to secure your units',
    paaFaqs: [
      {
        question: 'How far in advance can I reserve portable toilets?',
        answer: 'Portable toilets can typically be reserved up to 12 months in advance. For weddings and major events, booking 6-12 months ahead is recommended. Popular dates (summer weekends, holiday weekends, local festival dates) book quickly. A deposit usually secures your reservation, with the balance due before delivery.'
      },
      {
        question: 'What is the cancellation policy for portable toilet reservations?',
        answer: 'Cancellation policies vary by company. Most allow free cancellation 7-14 days before delivery. Cancellations within 7 days may forfeit the deposit or incur fees of 25-50% of the rental cost. Same-day cancellations often result in full charges. Review cancellation terms carefully when booking and consider event cancellation insurance.'
      },
      {
        question: 'Do I need a deposit to reserve portable toilets?',
        answer: 'Most companies require a deposit to secure reservations, typically 25-50% of the total rental cost. Deposits are usually due at booking, with the balance due 1-7 days before delivery. Some companies waive deposits for established customers or small orders. Credit card authorization may substitute for deposits.'
      }
    ]
  },
  {
    slug: 'portable-toilet-waste-disposal-service',
    title: 'Portable Toilet Waste Disposal Service',
    shortDescription: 'Professional waste removal and sanitation.',
    metaDescription: 'Need professional waste pumping? EPA-compliant disposal with eco-friendly chemicals. Weekly service included with rentals. Call (833) 435-6610.',
    phone: '(833) 435-6610',
    image: '/images/services/waste-disposal-service.webp',
    imageAlt: 'Portable toilet waste disposal service - professional sanitation and cleaning',
    paaFaqs: [
      {
        question: 'How is portable toilet waste disposed of?',
        answer: 'Portable toilet waste is pumped into specialized vacuum trucks by licensed technicians. The waste is transported to approved wastewater treatment facilities where it\'s processed according to EPA and local regulations. This ensures proper, environmentally compliant disposal. Rental companies handle all waste disposal—you never need to manage it yourself.'
      },
      {
        question: 'How often do portable toilets need to be pumped?',
        answer: 'Standard usage (10 workers or fewer per unit) requires weekly pumping. High-traffic events or sites need pumping every 2-3 days or daily. Event portable toilets are typically serviced before and after the event. Hot weather accelerates odor and may require more frequent service. Your rental agreement specifies service frequency.'
      },
      {
        question: 'What chemicals are used in portable toilets?',
        answer: 'Portable toilets use blue deodorizing chemicals containing biocides to control bacteria and odor, dyes for visual monitoring, and surfactants to aid waste breakdown. Modern formulas are formaldehyde-free and more environmentally friendly than older products. The chemicals are safe for standard wastewater treatment processing.'
      }
    ]
  }
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug)
}

// Related services mapping for internal linking
// Based on SOP: Create topical paths - upgrade paths, complementary services
export const relatedServicesMap: Record<string, string[]> = {
  // Upgrade paths: standard → deluxe → luxury → vip
  'standard-portable-toilet-rental': ['deluxe-portable-toilet-rental', 'handicap-accessible-portable-toilet-rental', 'portable-sink-station-rental', 'event-portable-toilet-rental'],
  'deluxe-portable-toilet-rental': ['standard-portable-toilet-rental', 'luxury-portable-restroom-trailer-rental', 'vip-portable-toilet-rental', 'event-portable-toilet-rental'],
  'vip-portable-toilet-rental': ['deluxe-portable-toilet-rental', 'luxury-portable-restroom-trailer-rental', 'portable-restroom-trailer-rental', 'event-portable-toilet-rental'],
  'luxury-portable-restroom-trailer-rental': ['vip-portable-toilet-rental', 'portable-restroom-trailer-rental', 'event-portable-toilet-rental', 'deluxe-portable-toilet-rental'],
  'portable-restroom-trailer-rental': ['luxury-portable-restroom-trailer-rental', 'vip-portable-toilet-rental', 'event-portable-toilet-rental', 'portable-sink-station-rental'],

  // ADA cluster
  'handicap-accessible-portable-toilet-rental': ['standard-portable-toilet-rental', 'family-size-portable-toilet-rental', 'event-portable-toilet-rental', 'construction-site-portable-toilet-rental'],
  'family-size-portable-toilet-rental': ['handicap-accessible-portable-toilet-rental', 'standard-portable-toilet-rental', 'event-portable-toilet-rental', 'deluxe-portable-toilet-rental'],

  // Event cluster
  'event-portable-toilet-rental': ['luxury-portable-restroom-trailer-rental', 'portable-sink-station-rental', 'vip-portable-toilet-rental', 'handicap-accessible-portable-toilet-rental'],

  // Construction cluster
  'construction-site-portable-toilet-rental': ['longterm-portable-toilet-rental', 'portable-sink-station-rental', 'portable-hand-sanitizer-station-rental', 'handicap-accessible-portable-toilet-rental'],
  'longterm-portable-toilet-rental': ['construction-site-portable-toilet-rental', 'shortterm-portable-toilet-rental', 'portable-toilet-waste-disposal-service', 'standard-portable-toilet-rental'],
  'shortterm-portable-toilet-rental': ['longterm-portable-toilet-rental', 'event-portable-toilet-rental', 'standard-portable-toilet-rental', 'portable-toilet-delivery-service'],

  // Emergency
  'emergency-portable-toilet-rental': ['portable-toilet-delivery-service', 'standard-portable-toilet-rental', 'construction-site-portable-toilet-rental', 'shortterm-portable-toilet-rental'],

  // Accessories
  'portable-sink-station-rental': ['portable-hand-sanitizer-station-rental', 'construction-site-portable-toilet-rental', 'event-portable-toilet-rental', 'standard-portable-toilet-rental'],
  'portable-hand-sanitizer-station-rental': ['portable-sink-station-rental', 'event-portable-toilet-rental', 'construction-site-portable-toilet-rental', 'standard-portable-toilet-rental'],
  'portable-urinal-station-rental': ['event-portable-toilet-rental', 'standard-portable-toilet-rental', 'construction-site-portable-toilet-rental', 'portable-sink-station-rental'],

  // Support services
  'portable-toilet-delivery-service': ['portable-toilet-pickup-service', 'portable-toilet-placement-service', 'standard-portable-toilet-rental', 'event-portable-toilet-rental'],
  'portable-toilet-pickup-service': ['portable-toilet-delivery-service', 'portable-toilet-waste-disposal-service', 'shortterm-portable-toilet-rental', 'event-portable-toilet-rental'],
  'portable-toilet-placement-service': ['portable-toilet-delivery-service', 'portable-toilet-relocation-service', 'event-portable-toilet-rental', 'construction-site-portable-toilet-rental'],
  'portable-toilet-relocation-service': ['portable-toilet-placement-service', 'construction-site-portable-toilet-rental', 'longterm-portable-toilet-rental', 'portable-toilet-delivery-service'],
  'portable-toilet-reservation-service': ['event-portable-toilet-rental', 'portable-toilet-delivery-service', 'luxury-portable-restroom-trailer-rental', 'construction-site-portable-toilet-rental'],
  'portable-toilet-waste-disposal-service': ['longterm-portable-toilet-rental', 'construction-site-portable-toilet-rental', 'portable-toilet-pickup-service', 'event-portable-toilet-rental'],
}

// Get related services for a given service
export function getRelatedServices(slug: string): Service[] {
  const relatedSlugs = relatedServicesMap[slug] || []
  return relatedSlugs
    .map(relatedSlug => getServiceBySlug(relatedSlug))
    .filter((service): service is Service => service !== undefined)
}

// Service to cluster mapping for blog post linking
export const serviceToClusterMap: Record<string, string> = {
  'event-portable-toilet-rental': 'event-rentals',
  'construction-site-portable-toilet-rental': 'construction-site',
  'luxury-portable-restroom-trailer-rental': 'luxury-premium',
  'handicap-accessible-portable-toilet-rental': 'ada-accessibility',
  // Map secondary services to most relevant cluster
  'standard-portable-toilet-rental': 'event-rentals',
  'deluxe-portable-toilet-rental': 'event-rentals',
  'vip-portable-toilet-rental': 'luxury-premium',
  'portable-restroom-trailer-rental': 'luxury-premium',
  'family-size-portable-toilet-rental': 'ada-accessibility',
  'longterm-portable-toilet-rental': 'construction-site',
  'shortterm-portable-toilet-rental': 'event-rentals',
  'emergency-portable-toilet-rental': 'construction-site',
  'portable-sink-station-rental': 'construction-site',
  'portable-hand-sanitizer-station-rental': 'construction-site',
  'portable-urinal-station-rental': 'event-rentals',
  'portable-toilet-delivery-service': 'event-rentals',
  'portable-toilet-pickup-service': 'event-rentals',
  'portable-toilet-placement-service': 'event-rentals',
  'portable-toilet-relocation-service': 'construction-site',
  'portable-toilet-reservation-service': 'event-rentals',
  'portable-toilet-waste-disposal-service': 'construction-site',
}
