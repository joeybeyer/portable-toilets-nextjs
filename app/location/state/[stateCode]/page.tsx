import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocationsByState, getAllStates } from '@/data/locations'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

interface StatePageProps {
  params: Promise<{ stateCode: string }>
}

export async function generateStaticParams() {
  const states = getAllStates()
  return states.map((state) => ({
    stateCode: state.stateCode.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { stateCode } = await params
  const locationsByState = getLocationsByState()

  // Find the state by stateCode (case-insensitive)
  const stateEntry = Object.entries(locationsByState).find(
    ([, locations]) => locations[0]?.stateCode.toLowerCase() === stateCode.toLowerCase()
  )

  if (!stateEntry) {
    return {
      title: 'State Not Found | Portable Toilets Champ',
    }
  }

  const [stateName, locations] = stateEntry
  const cityCount = locations.length

  const actualStateCode = locations[0].stateCode.toLowerCase()

  return {
    title: `Portable Toilet Rental in ${stateName} | ${cityCount} Cities [Same-Day]`,
    description: `Need portable toilets in ${stateName}? We serve ${cityCount} cities including ${locations.slice(0, 3).map(l => l.city).join(', ')}. Same-day delivery, clean units. Call ${PHONE} for your free quote.`,
    alternates: {
      canonical: `https://portabletoiletschamp.com/location/state/${actualStateCode}`,
    },
    openGraph: {
      title: `Portable Toilet Rental in ${stateName} | ${cityCount} Cities [Same-Day]`,
      description: `Need portable toilets in ${stateName}? We serve ${cityCount} cities with same-day delivery and clean units.`,
      type: 'website',
    },
  }
}

export default async function StatePage({ params }: StatePageProps) {
  const { stateCode } = await params
  const locationsByState = getLocationsByState()

  // Find the state by stateCode (case-insensitive)
  const stateEntry = Object.entries(locationsByState).find(
    ([, locations]) => locations[0]?.stateCode.toLowerCase() === stateCode.toLowerCase()
  )

  if (!stateEntry) {
    notFound()
  }

  const [stateName, locations] = stateEntry
  const actualStateCode = locations[0].stateCode

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/location' },
    { name: stateName, url: `/location/state/${actualStateCode.toLowerCase()}` }
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">{actualStateCode}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Portable Toilet Rental in {stateName}: {locations.length} Cities Served
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Professional portable restroom services across {stateName}.
              We proudly serve {locations.length} {locations.length === 1 ? 'city' : 'cities'} with clean units, on-time delivery, and competitive pricing.
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

      {/* Cities Grid */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Cities We Serve in {stateName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations
              .sort((a, b) => a.city.localeCompare(b.city))
              .map((location) => (
                <Link
                  key={location.slug}
                  href={`/location/${location.slug}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-teal-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-navy-900 group-hover:text-teal-600 transition-colors">
                      {location.city}
                    </span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 text-center">
            Services Available in {stateName}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Standard Portable Toilets', href: '/standard-portable-toilet-rental', desc: 'Reliable and cost-effective for any project' },
              { title: 'Deluxe Units', href: '/deluxe-portable-toilet-rental', desc: 'Enhanced comfort with hand washing stations' },
              { title: 'ADA Accessible', href: '/handicap-accessible-portable-toilet-rental', desc: 'Fully compliant accessible restrooms' },
              { title: 'Luxury Trailers', href: '/luxury-portable-restroom-trailer-rental', desc: 'Premium restrooms for upscale events' },
              { title: 'Construction Site', href: '/construction-site-portable-toilet-rental', desc: 'OSHA-compliant job site solutions' },
              { title: 'Event Rentals', href: '/event-portable-toilet-rental', desc: 'Perfect for festivals, weddings, and parties' },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-navy-900 mb-2">{service.title}</h3>
                <p className="text-sm text-navy-600">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
            Need Portable Toilets in {stateName}?
          </h2>
          <p className="text-lg text-navy-600 mb-8 max-w-2xl mx-auto">
            Contact us for a free quote. We offer same-day delivery in many {stateName} cities,
            competitive pricing, and professional service you can count on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <a href={PHONE_HREF} className="btn-secondary">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
