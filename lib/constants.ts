export const PHONE = '(833) 435-6610'
export const PHONE_HREF = 'tel:8334356610'
export const EMAIL = 'info@portabletoiletschamp.com'

export const UNIT_TYPES = [
  {
    id: 'standard',
    name: 'Standard',
    bestFor: 'Job Sites',
    keyFeatures: 'Basic, Durable',
    priceRange: '$',
    description: 'Reliable portable toilets perfect for construction sites and outdoor work areas.',
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    bestFor: 'Events',
    keyFeatures: 'Flushing, Sink',
    priceRange: '$$',
    description: 'Enhanced units with flushing toilets and built-in hand washing stations.',
  },
  {
    id: 'ada',
    name: 'ADA Accessible',
    bestFor: 'Accessibility',
    keyFeatures: 'Wheelchair Ramp',
    priceRange: '$$',
    description: 'Fully compliant accessible units with extra space and grab bars.',
  },
  {
    id: 'luxury',
    name: 'Luxury Trailer',
    bestFor: 'Weddings/VIP',
    keyFeatures: 'AC/Heat, Sinks',
    priceRange: '$$$$',
    description: 'Premium restroom trailers with climate control and upscale finishes.',
  },
]

// Calculator formulas
export const CALCULATOR_FORMULAS = {
  construction: {
    label: 'Construction Site',
    unitsPerPeople: 10, // 1 unit per 10 workers
    hoursAssumed: 8, // 8-hour shift
  },
  event: {
    label: 'Event',
    unitsPerPeople: 75, // 1 unit per 75 guests
    hoursAssumed: 4, // 4 hours
  },
  festival: {
    label: 'Festival/Multi-Day',
    unitsPerPeople: 50, // 1 unit per 50 guests
    bufferPercent: 0.15, // 15% buffer
  },
}
