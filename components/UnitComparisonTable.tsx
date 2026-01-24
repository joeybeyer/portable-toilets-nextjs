'use client'

import Link from 'next/link'

const units = [
  {
    id: 'standard',
    name: 'Standard',
    bestFor: 'Job Sites',
    keyFeatures: 'Basic, Durable',
    priceRange: '$',
    color: 'bg-amber-500',
    href: '/standard-portable-toilet-rental',
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    bestFor: 'Events',
    keyFeatures: 'Flushing, Sink',
    priceRange: '$$',
    color: 'bg-teal-500',
    href: '/deluxe-portable-toilet-rental',
  },
  {
    id: 'ada',
    name: 'ADA Accessible',
    bestFor: 'Accessibility',
    keyFeatures: 'Wheelchair Ramp',
    priceRange: '$$',
    color: 'bg-blue-500',
    href: '/handicap-accessible-portable-toilet-rental',
  },
  {
    id: 'luxury',
    name: 'Luxury Trailer',
    bestFor: 'Weddings/VIP',
    keyFeatures: 'AC/Heat, Sinks',
    priceRange: '$$$$',
    color: 'bg-purple-500',
    href: '/luxury-portable-restroom-trailer-rental',
  },
]

export default function UnitComparisonTable() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge badge-navy mb-4">Compare Options</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Find the Right Unit for Your Needs
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            From basic job site units to luxury trailers, we have options for every budget and occasion.
          </p>
        </div>

        {/* Mobile: Card Layout */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${unit.color} h-2`} />
              <div className="p-4">
                <h3 className="font-bold text-navy-900 mb-2">{unit.name}</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div>
                    <span className="text-navy-500">Best For:</span>
                    <span className="ml-1 text-navy-900">{unit.bestFor}</span>
                  </div>
                  <div>
                    <span className="text-navy-500">Features:</span>
                    <span className="ml-1 text-navy-900">{unit.keyFeatures}</span>
                  </div>
                  <div>
                    <span className="text-navy-500">Price:</span>
                    <span className="ml-1 font-semibold text-teal-600">{unit.priceRange}</span>
                  </div>
                </div>
                <Link
                  href={`/contact?unit=${unit.id}`}
                  className="block w-full text-center bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Select
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-900 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                {units.map((unit) => (
                  <th key={unit.id} className="px-6 py-4 text-center text-sm font-semibold">
                    {unit.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-navy-900">Best For</td>
                {units.map((unit) => (
                  <td key={unit.id} className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${unit.color}`}>
                      {unit.bestFor}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-navy-900">Key Features</td>
                {units.map((unit) => (
                  <td key={unit.id} className="px-6 py-4 text-center text-sm text-navy-600">
                    {unit.keyFeatures}
                  </td>
                ))}
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-navy-900">Price Range</td>
                {units.map((unit) => (
                  <td key={unit.id} className="px-6 py-4 text-center">
                    <span className="text-lg font-bold text-teal-600">{unit.priceRange}</span>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-navy-900"></td>
                {units.map((unit) => (
                  <td key={unit.id} className="px-6 py-4 text-center">
                    <Link
                      href={`/contact?unit=${unit.id}`}
                      className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                      Select
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <p className="text-navy-600 mb-2">Need something specific?</p>
          <Link href="/contact" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
            Contact us for custom solutions
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
