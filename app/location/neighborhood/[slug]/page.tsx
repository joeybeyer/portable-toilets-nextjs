import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNeighborhoodBySlug, getAllNeighborhoodSlugs, generateNeighborhoodFAQs, getNeighborhoodsByCitySlug } from '@/data/neighborhoods'
import { getLocationBySlug } from '@/data/locations'
import FAQ from '@/components/FAQ'
import FAQSchema from '@/components/schema/FAQSchema'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllNeighborhoodSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const neighborhood = getNeighborhoodBySlug(slug)

  if (!neighborhood) {
    return { title: 'Not Found' }
  }

  // BERT-optimized title: [Service] + [Geo] close together with bracket technique
  const title = `Portable Toilet Rental ${neighborhood.name}, ${neighborhood.city} [Same-Day]`
  const description = `Need porta potties in ${neighborhood.name}? Same-day delivery to ${neighborhood.zipCodes.slice(0, 2).join(', ')} & nearby areas. Clean units from $250. Call ${PHONE} for your free quote.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://portabletoiletschamp.com/location/neighborhood/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
    other: {
      'geo.placename': `${neighborhood.name}, ${neighborhood.city}`,
      'geo.region': `US-${neighborhood.stateCode}`,
    },
  }
}

// Services with BERT-optimized descriptions (high-probability verb-noun pairs)
const services = [
  {
    title: 'Standard Portable Toilets',
    href: '/standard-portable-toilet-rental',
    description: 'Our technicians deliver and service clean portable toilets for construction sites and events.'
  },
  {
    title: 'Deluxe Flushable Units',
    href: '/deluxe-portable-toilet-rental',
    description: 'Upgraded units with hand-washing stations installed and maintained by our team.'
  },
  {
    title: 'ADA Accessible Units',
    href: '/handicap-accessible-portable-toilet-rental',
    description: 'Wheelchair-accessible portable restrooms meeting full ADA compliance requirements.'
  },
  {
    title: 'Luxury Restroom Trailers',
    href: '/luxury-portable-restroom-trailer-rental',
    description: 'Climate-controlled restroom trailers with running water for upscale events.'
  },
  {
    title: 'Construction Site Rentals',
    href: '/construction-site-portable-toilet-rental',
    description: 'OSHA-compliant portable toilets built for demanding job site conditions.'
  },
  {
    title: 'Event Portable Toilets',
    href: '/event-portable-toilet-rental',
    description: 'High-capacity sanitation solutions for festivals, weddings, and gatherings.'
  },
]

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params
  const neighborhood = getNeighborhoodBySlug(slug)

  if (!neighborhood) {
    notFound()
  }

  const faqs = generateNeighborhoodFAQs(neighborhood)
  const parentCity = getLocationBySlug(neighborhood.citySlug)
  const siblingNeighborhoods = getNeighborhoodsByCitySlug(neighborhood.citySlug)
    .filter(n => n.slug !== slug)
    .slice(0, 3)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/location' },
    { name: neighborhood.city, url: `/location/${neighborhood.citySlug}` },
    { name: neighborhood.name, url: `/location/neighborhood/${slug}` }
  ]

  return (
    <>
      <FAQSchema faqs={faqs} url={`/location/neighborhood/${slug}`} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            {/* 1 UP Link - First paragraph, above fold (Hub/Spoke model) */}
            <div className="mb-4">
              <Link
                href={`/location/${neighborhood.citySlug}`}
                className="inline-flex items-center text-teal-400 hover:text-teal-300 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {neighborhood.city} Portable Toilet Rentals
              </Link>
            </div>

            <span className="badge bg-teal-500/20 text-teal-400 mb-4">
              {neighborhood.name} Service Area
            </span>

            {/* BERT-optimized H1: Service + Geo close together */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Portable Toilet Rental in {neighborhood.name}, {neighborhood.city}
            </h1>

            {/* First 100 characters answer the query directly */}
            <p className="text-xl text-navy-300 mb-8">
              Professional portable toilet delivery and service in {neighborhood.name}.
              Same-day availability for construction sites, events, and emergencies in the{' '}
              {neighborhood.zipCodes.slice(0, 3).join(', ')} zip code areas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Free Quote for {neighborhood.name}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href={PHONE_HREF} className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE}
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Same-Day Delivery in {neighborhood.name}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Quotes
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Local Service Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Local Content Section - Information Gain */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* About the Area - Unique Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                  Portable Toilet Services in {neighborhood.name}
                </h2>
                <p className="text-navy-600 leading-relaxed mb-6">
                  {neighborhood.description}
                </p>
                <p className="text-navy-600 leading-relaxed">
                  Our team provides expert portable toilet rental and delivery throughout{' '}
                  {neighborhood.name}, including areas near {neighborhood.landmarks.slice(0, 3).join(', ')}.
                  Whether you need units for a construction project, special event, or emergency situation,
                  we deliver clean, professionally maintained portable restrooms to your exact location.
                </p>
              </div>

              {/* Local Considerations - Microclimate Content for Information Gain */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  <svg className="w-5 h-5 inline mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {neighborhood.name} Service Considerations
                </h3>
                <ul className="space-y-3">
                  {neighborhood.uniqueFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-navy-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Zip Codes Served - RSVM Data (Spatial Vector Matching) */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  Zip Codes We Serve in {neighborhood.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {neighborhood.zipCodes.map((zip) => (
                    <span key={zip} className="bg-gray-100 text-navy-700 px-4 py-2 rounded-lg font-mono">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Landmarks - RSVM Enhancement */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  Landmarks Near Our {neighborhood.name} Service Area
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {neighborhood.landmarks.map((landmark) => (
                    <div key={landmark} className="flex items-center gap-2 text-navy-600">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {landmark}
                    </div>
                  ))}
                </div>
              </div>

              {/* Services - 2-3 ACROSS Links to Non-Geo Service Pages */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Portable Toilet Services Available in {neighborhood.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="p-4 bg-white border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-md transition-all group"
                    >
                      <h4 className="font-bold text-navy-900 mb-1 group-hover:text-teal-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-navy-600 text-sm">{service.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Section - Q&A Format for BERT Segment Vectors */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Portable Toilet Rental Questions in {neighborhood.name}
                </h3>
                <FAQ items={faqs} allowMultiple={true} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-navy-900 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-4">Get a Quote for {neighborhood.name}</h3>
                <p className="text-navy-300 text-sm mb-6">
                  Need portable toilets delivered to {neighborhood.name}? Get a free quote in minutes.
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
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Request Quote
                  </Link>
                </div>
              </div>

              {/* Nearby Neighborhoods - 2-3 ACROSS Links */}
              {siblingNeighborhoods.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-navy-900 mb-4">
                    Nearby {neighborhood.city} Areas
                  </h4>
                  <ul className="space-y-2">
                    {siblingNeighborhoods.map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={`/location/neighborhood/${n.slug}`}
                          className="text-navy-600 hover:text-teal-600 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Portable Toilets in {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Parent City Link */}
              {parentCity && (
                <div className="bg-teal-50 rounded-xl p-6">
                  <h4 className="font-bold text-navy-900 mb-2">
                    {neighborhood.city} Service Hub
                  </h4>
                  <p className="text-navy-600 text-sm mb-4">
                    View all portable toilet services available throughout {neighborhood.city}.
                  </p>
                  <Link
                    href={`/location/${neighborhood.citySlug}`}
                    className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-1"
                  >
                    All {neighborhood.city} Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Google Business Profile / Find Us */}
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=portable+toilet+rental+${encodeURIComponent(neighborhood.name)}+${encodeURIComponent(neighborhood.city)}+${encodeURIComponent(neighborhood.stateCode)}&zoom=14`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Portable toilet rental service area in ${neighborhood.name}, ${neighborhood.city}`}
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Find Us on Google
                  </h4>
                  <p className="text-sm text-navy-600 mb-3">
                    View our service area and get directions for delivery in {neighborhood.name}.
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/portable+toilet+rental+${encodeURIComponent(neighborhood.name)}+${encodeURIComponent(neighborhood.city)}+${encodeURIComponent(neighborhood.stateCode)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                    </svg>
                    View on Google Maps
                    <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Portable Toilet Service in {neighborhood.name}?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get your free quote for delivery anywhere in {neighborhood.name}, {neighborhood.city}.
            Same-day service available.
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
