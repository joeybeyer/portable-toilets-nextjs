import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocationBySlug, getAllLocationSlugs, getLocationFAQs, getLocationCoordinates, getNearbyCities, Location } from '@/data/locations'
import { getBlogPostsByCluster } from '@/data/blog'
import { getNeighborhoodsByCitySlug } from '@/data/neighborhoods'
import FAQ from '@/components/FAQ'
import FAQSchema from '@/components/schema/FAQSchema'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    return {
      title: 'Location Not Found | Portable Toilets Champ',
    }
  }

  const coordinates = getLocationCoordinates(location.city)

  // Build other metadata for geo tags
  const otherMeta: Record<string, string> = {
    'geo.placename': location.city,
    'geo.region': `US-${location.stateCode}`,
  }

  if (coordinates) {
    otherMeta['geo.position'] = `${coordinates.lat};${coordinates.lng}`
    otherMeta['ICBM'] = `${coordinates.lat}, ${coordinates.lng}`
  }

  return {
    title: `Portable Toilet Rental ${location.city}, ${location.stateCode} [Same-Day Delivery]`,
    description: `Need portable toilets in ${location.city}? Get clean units delivered fast with same-day service available. Starting at $250. Call ${PHONE} for your free quote today.`,
    alternates: {
      canonical: `https://portabletoiletschamp.com/location/${slug}`,
    },
    openGraph: {
      title: `Portable Toilet Rental ${location.city}, ${location.stateCode} [Same-Day Delivery]`,
      description: `Need portable toilets in ${location.city}? Get clean units delivered fast with same-day service available. Starting at $250.`,
      type: 'website',
    },
    other: otherMeta,
  }
}

function LocationSchema({ location }: { location: Location }) {
  const coordinates = getLocationCoordinates(location.city)

  const schema: Record<string, unknown> = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "name": "Portable Toilets Champ",
    "logo": "https://portabletoiletschamp.com/images/logo.svg",
    "telephone": location.phone,
    "url": `https://portabletoiletschamp.com/location/${location.slug}`,
    "description": `Professional portable toilet rentals in ${location.city}, ${location.stateCode}. Clean units, on-time delivery, simple pricing.`,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      ...(location.address && { "streetAddress": location.address.split(',')[0] }),
      "addressLocality": location.city,
      "addressRegion": location.stateCode,
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": location.city,
      "containedInPlace": {
        "@type": "State",
        "name": location.state
      }
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  }

  // Add geo coordinates if available
  if (coordinates) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": coordinates.lat,
      "longitude": coordinates.lng
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const services = [
  { title: 'Standard Portable Toilets', href: '/standard-portable-toilet-rental', description: 'Reliable and affordable units for any project' },
  { title: 'Deluxe Units', href: '/deluxe-portable-toilet-rental', description: 'Enhanced comfort with hand-washing stations' },
  { title: 'ADA Accessible', href: '/handicap-accessible-portable-toilet-rental', description: 'Fully compliant wheelchair-accessible units' },
  { title: 'Luxury Trailers', href: '/luxury-portable-restroom-trailer-rental', description: 'Premium restroom trailers for upscale events' },
  { title: 'Construction Site', href: '/construction-site-portable-toilet-rental', description: 'Durable units built for job sites' },
  { title: 'Event Rentals', href: '/event-portable-toilet-rental', description: 'Perfect for weddings, festivals, and parties' },
]

const additionalServices = [
  { title: 'VIP Portable Toilets', href: '/vip-portable-toilet-rental' },
  { title: 'Portable Sink Stations', href: '/portable-sink-station-rental' },
  { title: 'Hand Sanitizer Stations', href: '/portable-hand-sanitizer-station-rental' },
  { title: 'Emergency Rentals', href: '/emergency-portable-toilet-rental' },
  { title: 'Long-Term Rentals', href: '/longterm-portable-toilet-rental' },
  { title: 'Delivery Service', href: '/portable-toilet-delivery-service' },
]

const features = [
  'Same-day delivery available',
  'Professional sanitization',
  'Flexible rental periods',
  'Regular servicing included',
  'Competitive local pricing',
  'Dedicated account support',
]

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  const locationFaqs = getLocationFAQs(location)
  const nearbyCities = getNearbyCities(slug, 6)
  const cityNeighborhoods = getNeighborhoodsByCitySlug(slug)

  // Get blog posts - rotate through clusters based on location slug hash
  const clusters = ['event-rentals', 'construction-site', 'luxury-premium', 'ada-accessibility']
  const clusterIndex = slug.length % clusters.length
  const relatedPosts = getBlogPostsByCluster(clusters[clusterIndex]).slice(0, 3)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/location' },
    { name: location.state, url: `/location/state/${location.stateCode.toLowerCase()}` },
    { name: location.city, url: `/location/${location.slug}` }
  ]

  return (
    <>
      <LocationSchema location={location} />
      <FAQSchema faqs={locationFaqs} url={`/location/${location.slug}`} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">{location.stateCode}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Portable Toilet Rental in {location.city}
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Professional portable restroom services for {location.city} and surrounding areas.
              Clean units, on-time delivery, simple pricing.
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
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                  Trusted Portable Toilet Rentals in {location.city}
                </h2>
                <div className="prose prose-navy max-w-none space-y-4 text-navy-600">
                  <p>
                    When planning events or managing projects in {location.city}, reliable restroom facilities
                    are essential. Portable Toilets Champ delivers professional portable toilet rental services
                    that meet the highest standards of cleanliness and reliability.
                  </p>
                  <p>
                    Our {location.city} service includes delivery, setup, regular maintenance, and pickup.
                    Whether you need a single unit for a small project or dozens for a large event, we have
                    the inventory and logistics to meet your needs.
                  </p>
                  <p>
                    Every unit is professionally sanitized before delivery using hospital-grade cleaning
                    products. We understand that restroom quality directly impacts guest satisfaction and
                    worker productivity, which is why we never compromise on cleanliness.
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Why {location.city} Customers Choose Us
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-navy-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Portable Toilet Services in {location.city}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="p-4 bg-white border border-gray-100 rounded-xl hover:border-teal-200 hover:shadow-sm transition-all group"
                    >
                      <span className="font-medium text-navy-900 group-hover:text-teal-600 transition-colors block mb-1">
                        {service.title}
                      </span>
                      <span className="text-sm text-navy-500">{service.description}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-navy-600 mb-3">More services available:</p>
                  <div className="flex flex-wrap gap-2">
                    {additionalServices.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ - PAA Optimized */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Frequently Asked Questions About Portable Toilet Rental in {location.city}
                </h3>
                <FAQ items={locationFaqs} allowMultiple={true} />
              </div>

              {/* Google Map Embed */}
              {location.mapEmbed && (
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-6">
                    Our Location in {location.city}
                  </h3>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src={location.mapEmbed}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Portable Toilets Champ location in ${location.city}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-navy-900 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-4">Get Your Free Quote</h3>
                <p className="text-navy-300 text-sm mb-6">
                  Ready to book portable toilets in {location.city}? Contact us for fast, friendly service.
                </p>
                <div className="space-y-4">
                  <a
                    href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs text-navy-400">Call Us</span>
                      <span className="font-medium">{location.phone}</span>
                    </div>
                  </a>
                  {location.address && (
                    <div className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
                      <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs text-navy-400">Address</span>
                        <span className="font-medium text-sm">{location.address}</span>
                      </div>
                    </div>
                  )}
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
                    '15,000+ units delivered',
                    '99% on-time delivery rate',
                    'Serving all 50 states',
                    'Professional sanitization',
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

              {/* Google Business Profile / Find Us */}
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {location.city === 'Buffalo' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.364095817818!2d-78.85820269999999!3d42.865158699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d31300141bdeeb%3A0x1902fc36358d2fe2!2sPortable%20Toilets%20Champ!5e0!3m2!1sen!2sus!4v1766848443086!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Buffalo, NY Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Garden Grove' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.354341642205!2d-117.956592!3d33.777346699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd299e2b521f49%3A0xe293925d883c1f0f!2sPortable%20Toilets%20Champ!5e0!3m2!1sen!2sus!4v1766848743784!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Garden Grove, CA Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Oklahoma City' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.3843064315593!2d-97.5420709!3d35.519499599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b21bb23bbb86c3%3A0x7568f6aa22eea075!2sPortable%20Toilets%20Champ!5e0!3m2!1sen!2sus!4v1766849044279!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Oklahoma City, OK Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Claremont' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4614.619630453882!2d-117.69339540000001!3d34.122923799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c333b4d1e4e4e5%3A0xe018c8f59c1e5082!2sPortable%20Toilets%20Champ!5e0!3m2!1sen!2sus!4v1735315200000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Claremont, CA Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Peoria' && location.stateCode === 'AZ' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4643.164671370387!2d-112.2557727!3d33.5963209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b43c0858027cf%3A0xcd6e78b136aef972!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849328627!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Peoria, AZ Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Baltimore' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4315.09427373698!2d-76.6719268!3d39.2762355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81d76f9c0c37d%3A0x660118d5a3db7fd1!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849429023!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Baltimore, MD Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Charlotte' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4551.137313979702!2d-80.8245436!3d35.269250199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a11738c75e77%3A0xd825a13eaf5fbd6c!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849480863!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Charlotte, NC Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Detroit' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4119.581185530022!2d-83.0670519!3d42.35123850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824d3877c0690f9%3A0x8fc84652206fe134!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849573695!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Detroit, MI Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Santa Ana' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4636.992514738655!2d-117.86854149999999!3d33.7107997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd96de355a441%3A0xa8ea7de195aa9f27!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849617305!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Santa Ana, CA Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'San Francisco' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4404.829908006347!2d-122.41517999999999!3d37.79571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085813821c6f63b%3A0x5266715f03031eea!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849655187!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - San Francisco, CA Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Boca Raton' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4994.641425315188!2d-80.1214554!3d26.361586400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d91f1c41856a41%3A0x9c2b1301d59ae7b4!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849711337!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Boca Raton, FL Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Milwaukee' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4066.35329728662!2d-88.0531039!3d43.157168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8805036006d948eb%3A0x748592b848856a38!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849762882!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Milwaukee, WI Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Reno' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4299.971975479572!2d-119.8127126!3d39.521125999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809941002f50cf2d%3A0xd7d8f67849d42e68!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849805172!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Reno, NV Location"
                      className="absolute inset-0"
                    />
                  ) : location.city === 'Fresno' ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4465.458965901947!2d-119.76936070000001!3d36.7668898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945d001d8f0a41%3A0x4f74d107b5ed8882!2sPortable%20Toilets%20Champ!5e1!3m2!1sen!2sus!4v1766849843433!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Portable Toilets Champ - Fresno, CA Location"
                      className="absolute inset-0"
                    />
                  ) : (
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.city)},+${encodeURIComponent(location.stateCode)}&zoom=11`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${location.city}, ${location.stateCode} service area map`}
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <div className="p-4">
                  {location.city === 'Buffalo' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">43 Hamburg St</p>
                      <p className="text-sm text-navy-600 mb-3">Buffalo, NY 14204</p>
                      <a
                        href="https://maps.google.com/?q=43+Hamburg+St,+Buffalo,+NY+14204"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Garden Grove' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">10102 Stanford Ave</p>
                      <p className="text-sm text-navy-600 mb-3">Garden Grove, CA 92840</p>
                      <a
                        href="https://maps.google.com/?q=10102+Stanford+Ave,+Garden+Grove,+CA+92840"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Oklahoma City' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">4832 Richmond Square</p>
                      <p className="text-sm text-navy-600 mb-3">Oklahoma City, OK 73118</p>
                      <a
                        href="https://maps.google.com/?q=4832+Richmond+Square,+Oklahoma+City,+OK+73118"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Claremont' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">2209 E Baseline Rd Suite 300 265</p>
                      <p className="text-sm text-navy-600 mb-3">Claremont, CA 91711</p>
                      <a
                        href="https://maps.google.com/?q=2209+E+Baseline+Rd+Suite+300+265,+Claremont,+CA+91711"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Peoria' && location.stateCode === 'AZ' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">9132 W Cactus Rd</p>
                      <p className="text-sm text-navy-600 mb-3">Peoria, AZ 85381</p>
                      <a
                        href="https://maps.google.com/?q=9132+W+Cactus+Rd,+Peoria,+AZ+85381"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Baltimore' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">710 S Caton Ave</p>
                      <p className="text-sm text-navy-600 mb-3">Baltimore, MD 21229</p>
                      <a
                        href="https://maps.google.com/?q=710+S+Caton+Ave,+Baltimore,+MD+21229"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Charlotte' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">3301 Woodpark Blvd</p>
                      <p className="text-sm text-navy-600 mb-3">Charlotte, NC 28206</p>
                      <a
                        href="https://maps.google.com/?q=3301+Woodpark+Blvd,+Charlotte,+NC+28206"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Detroit' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">4417 2nd Ave</p>
                      <p className="text-sm text-navy-600 mb-3">Detroit, MI 48201</p>
                      <a
                        href="https://maps.google.com/?q=4417+2nd+Ave,+Detroit,+MI+48201"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Santa Ana' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">2700 S Main St</p>
                      <p className="text-sm text-navy-600 mb-3">Santa Ana, CA 92707</p>
                      <a
                        href="https://maps.google.com/?q=2700+S+Main+St,+Santa+Ana,+CA+92707"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'San Francisco' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">1201 Pacific Ave</p>
                      <p className="text-sm text-navy-600 mb-3">San Francisco, CA 94109</p>
                      <a
                        href="https://maps.google.com/?q=1201+Pacific+Ave,+San+Francisco,+CA+94109"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Boca Raton' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">1800 N Military Trl</p>
                      <p className="text-sm text-navy-600 mb-3">Boca Raton, FL 33431</p>
                      <a
                        href="https://maps.google.com/?q=1800+N+Military+Trl,+Boca+Raton,+FL+33431"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Milwaukee' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">11301 W Lake Park Dr</p>
                      <p className="text-sm text-navy-600 mb-3">Milwaukee, WI 53224</p>
                      <a
                        href="https://maps.google.com/?q=11301+W+Lake+Park+Dr,+Milwaukee,+WI+53224"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Reno' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">100 W Liberty St</p>
                      <p className="text-sm text-navy-600 mb-3">Reno, NV 89501</p>
                      <a
                        href="https://maps.google.com/?q=100+W+Liberty+St,+Reno,+NV+89501"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : location.city === 'Fresno' ? (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Visit Our Location
                      </h4>
                      <p className="text-sm text-navy-700 font-medium mb-1">3323 E Normal Ave</p>
                      <p className="text-sm text-navy-600 mb-3">Fresno, CA 93703</p>
                      <a
                        href="https://maps.google.com/?q=3323+E+Normal+Ave,+Fresno,+CA+93703"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Service Area
                      </h4>
                      <p className="text-sm text-navy-600 mb-3">
                        We provide portable toilet delivery throughout {location.city}, {location.stateCode} and surrounding areas.
                      </p>
                      <a
                        href={`https://www.google.com/maps/place/${encodeURIComponent(location.city)},+${encodeURIComponent(location.stateCode)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.5 5.25c1.05 0 2.1.255 3.045.75l-1.29 1.77c-.57-.285-1.17-.42-1.755-.42-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.635 0 3.015-1.05 3.525-2.5H10.5v-2.1h6c.075.36.12.735.12 1.125 0 3.39-2.775 6.125-6.12 6.125A6.132 6.132 0 014.375 11.25 6.132 6.132 0 0110.5 5.25z"/>
                        </svg>
                        View {location.city} on Map
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Spoke Pages - Hub/Spoke Model */}
      {cityNeighborhoods.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Portable Toilet Rental by {location.city} Neighborhood
            </h2>
            <p className="text-navy-600 mb-8">
              We provide specialized portable toilet services across all {location.city} neighborhoods.
              Find local pricing, same-day availability, and area-specific information for your location:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/location/neighborhood/${neighborhood.slug}`}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-teal-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-navy-900 group-hover:text-teal-600 transition-colors">
                      {neighborhood.name}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-navy-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Cities Section - Internal Linking */}
      {nearbyCities.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Portable Toilet Rental in Nearby {location.state} Cities
            </h2>
            <p className="text-navy-600 mb-8">
              We also provide portable toilet rental services throughout {location.state}. Find professional restroom solutions in these nearby cities:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/location/${city.slug}`}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-teal-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-navy-900 group-hover:text-teal-600 transition-colors">
                      {city.city}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-navy-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/location/state/${location.stateCode.toLowerCase()}`}
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
              >
                View all {location.state} locations
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts Section - Internal Linking */}
      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Portable Toilet Rental Tips & Guides
            </h2>
            <p className="text-navy-600 mb-8">
              Learn more about portable toilet rentals, planning tips, and industry best practices.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="p-6">
                    <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                      {post.category.name}
                    </span>
                    <h3 className="font-bold text-navy-900 mt-2 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-navy-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm text-teal-600 mt-4 font-medium">
                      Read article
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="btn-secondary"
              >
                View All Articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book in {location.city}?
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
