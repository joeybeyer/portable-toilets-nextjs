import { Metadata } from 'next'
import Link from 'next/link'
import { getLocationsByState } from '@/data/locations'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

export const metadata: Metadata = {
  title: 'Portable Toilet Rental Locations | All 50 States [Same-Day]',
  description: 'Need portable toilets delivered fast? We serve all 50 states with same-day delivery in most areas. Find your city and get a free quote: (833) 435-6610.',
  openGraph: {
    title: 'Portable Toilet Rental Locations | All 50 States [Same-Day]',
    description: 'Need portable toilets delivered fast? We serve all 50 states with same-day delivery in most areas.',
    type: 'website',
  },
}

export default function LocationPage() {
  const locationsByState = getLocationsByState()
  const stateOrder = ['California', 'New York', 'Florida', 'Illinois', 'Texas', 'Colorado', 'Arizona', 'Connecticut', 'District of Columbia', 'Kansas', 'Louisiana', 'Maryland', 'Michigan', 'Minnesota', 'Missouri', 'Nevada', 'North Carolina', 'Oklahoma', 'Wisconsin']

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">Coverage</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Portable Toilet Rental Locations in All 50 States
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              We serve all 50 states with professional portable toilet rentals. Find service locations in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-navy-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Same-day delivery available
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Local service teams
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Consistent quality nationwide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stateOrder.map((state) => {
              const stateLocations = locationsByState[state]
              if (!stateLocations || stateLocations.length === 0) return null

              return (
                <div key={state} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-gray-200 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <Link href={`/location/state/${stateLocations[0].stateCode.toLowerCase()}`} className="text-lg font-bold text-navy-900 hover:text-teal-600 transition-colors">
                        {state}
                      </Link>
                    </div>
                    <span className="text-xs text-navy-400">{stateLocations.length} {stateLocations.length === 1 ? 'city' : 'cities'}</span>
                  </div>
                  <ul className="space-y-2">
                    {stateLocations.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={`/location/${location.slug}`}
                          className="text-navy-600 hover:text-teal-600 text-sm transition-colors flex items-center gap-2 group"
                        >
                          <svg className="w-3 h-3 text-navy-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {location.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/location/state/${stateLocations[0].stateCode.toLowerCase()}`}
                    className="mt-4 inline-flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    View all {state} locations
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Not Listed CTA */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Do Not See Your Area?
            </h2>
            <p className="text-navy-600 mb-8">
              We serve all 50 states with locations throughout the country. Even if your city is not listed, we can likely help. Contact us to confirm service availability in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <a href={PHONE_HREF} className="btn-secondary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

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
