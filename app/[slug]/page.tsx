import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServiceSlugs, getRelatedServices, serviceToClusterMap, Service } from '@/data/services'
import { getBlogPostsByCluster } from '@/data/blog'
import { getSolutionsByService } from '@/data/problems'
import FAQ from '@/components/FAQ'
import FAQSchema from '@/components/schema/FAQSchema'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'
import ServiceSchema from '@/components/schema/ServiceSchema'
import UnitComparisonTable from '@/components/UnitComparisonTable'
import HighRiseROICalculator from '@/components/HighRiseROICalculator'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Portable Toilets Champ',
    }
  }

  // SEO-optimized title: Primary Keyword + Benefit Hook [Modifier]
  const seoTitle = `${service.title} - Same-Day Delivery [2026 Pricing]`

  return {
    title: seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://portabletoiletschamp.com/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: service.metaDescription,
      type: 'website',
    },
  }
}

const serviceDescriptions: Record<string, { intro: string; features: string[]; benefits: string; useCases: string[] }> = {
  'standard-portable-toilet-rental': {
    intro: 'Our standard portable toilet rentals are the reliable, cost-effective solution for construction sites, outdoor events, and any situation requiring temporary restroom facilities. Each unit is professionally cleaned and fully stocked before delivery.',
    features: [
      'Sturdy, weather-resistant construction',
      'Non-slip flooring for safety',
      'Proper ventilation system',
      'Hand sanitizer dispenser included',
      'Toilet paper holder with backup supply',
      'Lockable door with occupancy indicator'
    ],
    benefits: 'Our standard units deliver dependable sanitation at competitive prices. Regular maintenance keeps units clean and well-stocked throughout your rental period.',
    useCases: ['Construction sites', 'Outdoor festivals', 'Sports events', 'Community gatherings', 'Parking lot sales']
  },
  'deluxe-portable-toilet-rental': {
    intro: 'Upgrade your event or project with our deluxe portable toilet rentals. These premium units offer enhanced features and additional space for a more comfortable experience.',
    features: [
      'Larger interior space',
      'Mirror and shelf',
      'Improved ventilation with solar lighting',
      'Hand sanitizer and soap dispenser',
      'Better interior lighting',
      'Premium finishes throughout'
    ],
    benefits: 'Deluxe units provide a step up in comfort and appearance, making them suitable for events where guest experience matters.',
    useCases: ['Corporate events', 'Weddings', 'Upscale outdoor parties', 'Trade shows', 'Film and photo shoots']
  },
  'handicap-accessible-portable-toilet-rental': {
    intro: 'Our ADA-compliant handicap accessible portable toilets ensure everyone at your event or worksite has dignified access to restroom facilities. These spacious units accommodate wheelchairs and mobility devices with ease.',
    features: [
      'Full ADA compliance',
      'Extra-wide doorway with ramp',
      'Wheelchair-accessible interior',
      'Sturdy grab bars',
      'Non-slip flooring',
      'Appropriate fixture heights'
    ],
    benefits: 'Meeting accessibility requirements protects your organization and ensures all guests and workers can participate fully.',
    useCases: ['Public events', 'Construction sites', 'Government projects', 'Healthcare facilities', 'Schools and universities']
  },
  'luxury-portable-restroom-trailer-rental': {
    intro: 'Our luxury portable restroom trailers deliver all the amenities of a permanent restroom in a mobile format. Perfect for events where you want to impress.',
    features: [
      'Climate control (AC/heating)',
      'Running water with sinks',
      'Flushing toilets',
      'Full mirrors and lighting',
      'Premium interior finishes',
      'Multiple private stalls'
    ],
    benefits: 'Luxury trailers transform the restroom experience from a necessity to an amenity. Your guests will notice the difference.',
    useCases: ['Weddings', 'VIP events', 'Executive gatherings', 'Film productions', 'High-end corporate events']
  },
  'portable-restroom-trailer-rental': {
    intro: 'Our portable restroom trailers provide multiple stalls in a single unit, making them efficient solutions for large events. These trailers offer amenities beyond standard portable toilets.',
    features: [
      'Multiple private stalls',
      'Running water sinks',
      'Flushing toilets',
      'Climate control options',
      'Interior lighting',
      'Full-length mirrors'
    ],
    benefits: 'Restroom trailers handle high traffic efficiently while providing a more comfortable experience than standard units.',
    useCases: ['Large festivals', 'Corporate gatherings', 'Sporting events', 'Concert venues', 'Trade shows']
  },
  'vip-portable-toilet-rental': {
    intro: 'Our VIP portable toilet rentals offer enhanced amenities for guests who expect more. These premium units feature upgraded finishes and additional conveniences.',
    features: [
      'Premium interior finishes',
      'Enhanced lighting',
      'Hand washing station',
      'Climate control',
      'Fresh water flush system',
      'Elegant design'
    ],
    benefits: 'VIP units strike the balance between standard portables and full trailers, offering upgraded amenities at a reasonable price point.',
    useCases: ['VIP sections', 'Executive areas', 'Premium event spaces', 'Backstage areas', 'Artist hospitality']
  },
  'event-portable-toilet-rental': {
    intro: 'Our event portable toilet rentals are specifically configured for festivals, concerts, weddings, and gatherings of all sizes. We offer flexible packages to match your event requirements.',
    features: [
      'Event-ready presentation',
      'Fast setup and removal',
      'Servicing during multi-day events',
      'Multiple unit types available',
      'Customizable packages',
      'Reliable on-time delivery'
    ],
    benefits: 'Our event team understands the unique demands of temporary gatherings and plans accordingly to keep your event running smoothly.',
    useCases: ['Music festivals', 'Food festivals', 'Weddings', 'Corporate picnics', 'Community events', 'Sporting tournaments']
  },
  'construction-site-portable-toilet-rental': {
    intro: 'Our construction site portable toilets are built to handle the demands of busy job sites. Durable, OSHA-compliant, and designed for heavy use.',
    features: [
      'Heavy-duty construction',
      'Easy-clean surfaces',
      'OSHA compliant',
      'Scheduled servicing',
      'Vandal-resistant features',
      'Flexible rental terms'
    ],
    benefits: 'Keeping workers on-site with proper facilities improves productivity and maintains compliance with workplace regulations.',
    useCases: ['Commercial construction', 'Residential projects', 'Road work', 'Infrastructure projects', 'Renovation sites']
  },
  'emergency-portable-toilet-rental': {
    intro: 'When disaster strikes or unexpected situations arise, our emergency portable toilet service provides rapid response to get you the facilities you need immediately.',
    features: [
      'Same-day delivery available',
      '24/7 availability',
      'Multiple unit options',
      'Rapid setup',
      'Emergency response team',
      'Flexible rental periods'
    ],
    benefits: 'Our emergency team is equipped to respond quickly when you need facilities without delay.',
    useCases: ['Natural disasters', 'Emergency response sites', 'Unexpected events', 'Urgent construction needs', 'Utility emergencies']
  },
  'longterm-portable-toilet-rental': {
    intro: 'For extended projects and ongoing needs, our long-term portable toilet rentals offer cost-effective solutions with regular maintenance included.',
    features: [
      'Discounted long-term rates',
      'Weekly servicing included',
      'Flexible contract terms',
      'Reliable maintenance schedule',
      'Unit replacement if needed',
      'Dedicated account manager'
    ],
    benefits: 'Long-term rentals provide predictable costs and consistent service for projects that extend beyond a few days.',
    useCases: ['Multi-month construction', 'Seasonal venues', 'Remote work sites', 'Extended events', 'Ongoing projects']
  },
  'shortterm-portable-toilet-rental': {
    intro: 'Need portable toilets for just a day or weekend? Our short-term rental options provide flexible solutions for brief events and temporary needs.',
    features: [
      'Daily and weekend rates',
      'Quick delivery and pickup',
      'Clean, fully-stocked units',
      'No long-term commitment',
      'Simple booking process',
      'Reliable service'
    ],
    benefits: 'Short-term rentals are perfect when you need facilities for a limited time without extended commitments.',
    useCases: ['Weekend events', 'One-day gatherings', 'Photo shoots', 'Small parties', 'Pop-up events']
  },
  'family-size-portable-toilet-rental': {
    intro: 'Our family-size portable toilets offer extra space for parents with young children. Larger interiors make it easier to assist children comfortably.',
    features: [
      'Extra-large interior',
      'Room for parent and child',
      'Changing shelf',
      'Multiple hooks for belongings',
      'Child-friendly features',
      'Easy-access door'
    ],
    benefits: 'Families appreciate the added space and convenience when attending events with young children.',
    useCases: ['Family festivals', 'Community events', 'Parks and recreation', 'School events', 'Family reunions']
  },
  'portable-sink-station-rental': {
    intro: 'Maintain proper hygiene standards with our portable sink station rentals. Standalone handwashing units help meet health requirements at any location.',
    features: [
      'Multiple sink stations',
      'Fresh water tank',
      'Waste water collection',
      'Soap dispensers',
      'Paper towel holders',
      'Foot pump or hands-free operation'
    ],
    benefits: 'Handwashing stations support hygiene compliance and demonstrate your commitment to guest and worker safety.',
    useCases: ['Food service areas', 'Medical tents', 'Construction sites', 'Outdoor dining', 'Event venues']
  },
  'portable-hand-sanitizer-station-rental': {
    intro: 'Keep hands clean with our portable hand sanitizer station rentals. Place these convenient units throughout your event or facility for easy access.',
    features: [
      'Touchless dispensers',
      'High-capacity sanitizer tanks',
      'Sturdy, stable design',
      'Weather-resistant construction',
      'Easy to refill',
      'Professional appearance'
    ],
    benefits: 'Sanitizer stations provide convenient hygiene access for guests moving through your event or facility.',
    useCases: ['Event entrances', 'Food areas', 'High-traffic zones', 'Waiting areas', 'Check-in points']
  },
  'portable-urinal-station-rental': {
    intro: 'For high-volume events, our portable urinal stations provide efficient, space-saving restroom solutions that help manage traffic flow.',
    features: [
      'Multiple urinal stations',
      'Privacy screens',
      'Efficient drainage system',
      'Quick setup',
      'Easy maintenance',
      'Compact footprint'
    ],
    benefits: 'Urinal stations maximize capacity in limited space, helping reduce wait times at busy events.',
    useCases: ['Concerts', 'Sporting events', 'Large festivals', 'Stadiums', 'Outdoor venues']
  },
  'portable-toilet-delivery-service': {
    intro: 'Our professional delivery service ensures your units arrive on time, properly positioned, and ready for use. We handle the logistics.',
    features: [
      'On-time delivery guarantee',
      'Professional placement',
      'Site assessment',
      'Clean, serviced units',
      'Flexible scheduling',
      'Trained delivery crews'
    ],
    benefits: 'Our delivery team knows how to position units for optimal accessibility and efficiency at your location.',
    useCases: ['Event setup', 'Construction projects', 'Remote locations', 'Multi-site delivery', 'Scheduled deployments']
  },
  'portable-toilet-pickup-service': {
    intro: 'When your event ends or project completes, our pickup service removes all units promptly and professionally.',
    features: [
      'Scheduled pickup times',
      'Prompt service',
      'Complete removal',
      'Site cleanup',
      'Flexible scheduling',
      'Professional crews'
    ],
    benefits: 'Our pickup service ensures your site is clear and clean after your rental period ends.',
    useCases: ['Event teardown', 'Project completion', 'Site restoration', 'End-of-rental', 'Quick turnarounds']
  },
  'portable-toilet-placement-service': {
    intro: 'Strategic placement of portable toilets affects guest convenience and event flow. Our placement service ensures optimal positioning for your specific needs.',
    features: [
      'Site assessment',
      'Traffic flow analysis',
      'ADA compliance consideration',
      'Aesthetic placement options',
      'Service access planning',
      'Expert recommendations'
    ],
    benefits: 'Professional placement planning helps ensure your guests find facilities easily and your event flows smoothly.',
    useCases: ['Large events', 'Complex sites', 'Multi-area venues', 'Public gatherings', 'Corporate campuses']
  },
  'portable-toilet-relocation-service': {
    intro: 'Need to move your portable toilets during a project? Our relocation service handles unit moves safely and efficiently.',
    features: [
      'Quick relocation',
      'Minimal disruption',
      'Professional handling',
      'Flexible scheduling',
      'Same-day service available',
      'Trained crews'
    ],
    benefits: 'Our relocation service helps you adapt to changing site conditions without service interruption.',
    useCases: ['Phased construction', 'Event reconfiguration', 'Site changes', 'Weather response', 'Optimized positioning']
  },
  'portable-toilet-reservation-service': {
    intro: 'Planning ahead? Our reservation service lets you book portable toilets in advance to ensure availability for your event or project.',
    features: [
      'Advance booking',
      'Guaranteed availability',
      'Price lock',
      'Easy modifications',
      'Reminder notifications',
      'Priority service'
    ],
    benefits: 'Reserving in advance ensures you have the units you need when peak season arrives.',
    useCases: ['Peak season events', 'Large gatherings', 'Major projects', 'Holiday events', 'Annual occasions']
  },
  'portable-toilet-waste-disposal-service': {
    intro: 'Proper waste disposal is essential for sanitation and environmental compliance. Our waste disposal service handles all waste management professionally.',
    features: [
      'Regular pumping schedule',
      'Proper waste disposal',
      'Environmental compliance',
      'Certified technicians',
      'Detailed records',
      'Flexible scheduling'
    ],
    benefits: 'Professional waste management keeps your units sanitary and ensures compliance with all applicable regulations.',
    useCases: ['Long-term rentals', 'High-use events', 'Remote sites', 'Environmental compliance', 'Multi-day events']
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const description = serviceDescriptions[slug] || {
    intro: `Portable Toilets Champ provides professional ${service.title} services nationwide. Contact us for a free quote.`,
    features: ['Professional service', 'Clean units', 'Reliable delivery', 'Competitive pricing'],
    benefits: 'Contact us to learn more about how we can help with your portable toilet needs.',
    useCases: ['Events', 'Construction', 'Outdoor gatherings']
  }

  const serviceFaqs = service.paaFaqs || []

  // Get related services for internal linking
  const relatedServices = getRelatedServices(slug)

  // Get related blog posts from the service's cluster
  const clusterId = serviceToClusterMap[slug] || 'event-rentals'
  const clusterPosts = getBlogPostsByCluster(clusterId)
  const relatedPosts = clusterPosts.slice(0, 3)

  // Get related solutions (problem pages that link to this service)
  const relatedSolutions = getSolutionsByService(slug)

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/' },
    { name: service.title, url: `/${slug}` }
  ]

  return (
    <>
      <ServiceSchema service={service} />
      {serviceFaqs.length > 0 && (
        <FAQSchema faqs={serviceFaqs} url={`/${service.slug}`} />
      )}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-navy-950 py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-950/80 z-10" />
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="container-wide relative z-20">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">Service</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              {description.intro.split('.')[0]}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Get Free Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href={PHONE_HREF} className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                  Overview
                </h2>
                <p className="text-navy-600 leading-relaxed">
                  {description.intro}
                </p>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-6">Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {description.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-navy-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Benefits</h3>
                <p className="text-navy-600">{description.benefits}</p>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {description.useCases.map((useCase) => (
                    <span key={useCase} className="badge badge-navy">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ - PAA Optimized */}
              {serviceFaqs.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-6">
                    Frequently Asked Questions
                  </h3>
                  <FAQ items={serviceFaqs} allowMultiple={true} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-navy-900 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-4">Get Your Free Quote</h3>
                <p className="text-navy-300 text-sm mb-6">
                  Ready to book? Contact us for fast, friendly service and competitive pricing.
                </p>
                <div className="space-y-4">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs text-navy-400">Call Us</span>
                      <span className="font-medium">{PHONE}</span>
                    </div>
                  </a>
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-navy-900 mb-4">Why Choose Us</h4>
                <ul className="space-y-3">
                  {[
                    'Same-day delivery available',
                    '99% on-time delivery rate',
                    'Professional sanitization',
                    'No hidden fees',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-navy-600">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Rise ROI Calculator — construction page only */}
      {slug === 'construction-site-portable-toilet-rental' && (
        <HighRiseROICalculator />
      )}

      {/* Unit Comparison Table */}
      <UnitComparisonTable />

      {/* Related Services Section - Internal Linking */}
      {relatedServices.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">
              Related Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/${relatedService.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {relatedService.title}
                  </h3>
                  <p className="text-sm text-navy-600 line-clamp-2">
                    {relatedService.shortDescription}
                  </p>
                  <span className="inline-flex items-center text-sm text-teal-600 mt-3 group-hover:text-teal-700">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Solutions Section - Internal Linking */}
      {relatedSolutions.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Common Problems We Solve
              </h2>
              <p className="text-navy-600 max-w-2xl mx-auto">
                Facing one of these situations? See how our {service.title.toLowerCase()} can help.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSolutions.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-navy-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-sm text-navy-600 line-clamp-2 mb-4">
                    {solution.problem.split('.')[0]}.
                  </p>
                  <span className="inline-flex items-center text-sm text-teal-600 font-medium group-hover:text-teal-700">
                    See solution
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts Section - Internal Linking */}
      {relatedPosts.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
                Helpful Resources
              </h2>
              <Link href="/blog" className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center">
                View all articles
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="p-6">
                    <span className="badge badge-teal mb-3">{post.category.name}</span>
                    <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-navy-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm text-teal-600 mt-4 group-hover:text-teal-700">
                      Read article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get your free quote in minutes. Professional service, competitive pricing, zero hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-teal-700 hover:bg-gray-100">
              Get Free Quote
            </Link>
            <a href={PHONE_HREF} className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
