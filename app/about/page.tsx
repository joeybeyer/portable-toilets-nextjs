import { Metadata } from 'next'
import Link from 'next/link'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

export const metadata: Metadata = {
  title: 'About Portable Toilets Champ | Nationwide Rentals [Since 2010]',
  description: 'Looking for reliable portable toilet rentals? Portable Toilets Champ serves all 50 states with 99% on-time delivery. Call (833) 435-6610 for your free quote.',
  openGraph: {
    title: 'About Portable Toilets Champ | Nationwide Rentals [Since 2010]',
    description: 'Looking for reliable portable toilet rentals? Portable Toilets Champ serves all 50 states with 99% on-time delivery.',
    type: 'website',
  },
}

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Reliability',
    description: 'When we say we will be there, we will be there. 99% on-time delivery rate speaks for itself.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Cleanliness',
    description: 'Hospital-grade sanitization on every unit. We would use them ourselves, and we do.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Transparency',
    description: 'Clear pricing with no surprises. The quote you get is the price you pay.',
  },
]

const stats = [
  { value: '15,000+', label: 'Customers Served' },
  { value: '50', label: 'States Covered' },
  { value: '500+', label: 'Service Locations' },
  { value: '99%', label: 'Satisfaction Rate' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">About Us</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              About Portable Toilets Champ: Nationwide Rentals You Can Trust
            </h1>
            <p className="text-lg text-navy-300">
              We built Portable Toilets Champ to make portable restroom rental simple. Clean units, on-time delivery, and fair pricing—serving customers in all 50 states.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-wide py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-teal mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Started with a Simple Mission
              </h2>
              <div className="space-y-4 text-navy-600">
                <p>
                  We started Portable Toilets Champ because we saw an industry that was hard to navigate. Event planners and construction managers spent hours calling around, comparing prices, and hoping they found someone reliable. That was not right.
                </p>
                <p>
                  So we built something different. A rental service that makes it easy to get clean, reliable portable toilets delivered when you need them. We handle everything—from helping you choose the right units to delivery, servicing, and pickup—so you can focus on your event or project.
                </p>
                <p>
                  Today, we serve customers in all 50 states with professional portable toilet rentals. Whether you are in Los Angeles or Louisville, you get the same commitment to quality and reliability.
                </p>
              </div>
            </div>
            <div className="bg-navy-100 rounded-2xl p-8 lg:p-12">
              <h3 className="text-xl font-bold text-navy-900 mb-6">What Sets Us Apart</h3>
              <ul className="space-y-4">
                {[
                  'Professional service with proven track record',
                  'One call gets you everything you need',
                  'Competitive pricing on all rentals',
                  'Same-day delivery available in most areas',
                  'Upfront pricing with no hidden fees',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-700">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-navy mb-4">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Built on Three Principles
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              These are not just words on a wall. They guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card">
                <div className="card-body">
                  <div className="feature-icon mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-navy-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-teal mb-4">Our Customers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              From Fortune 500 companies to local event planners, our customers rely on us when it matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Construction Companies', desc: 'OSHA-compliant units for job sites of any size' },
              { title: 'Event Planners', desc: 'From intimate gatherings to major festivals' },
              { title: 'Film Productions', desc: 'Luxury trailers and rapid deployment' },
              { title: 'Government Agencies', desc: 'Reliable service for public events and emergencies' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-navy-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-teal mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-2">What areas do you serve?</h3>
              <p className="text-navy-600">
                We provide portable toilet rentals in all 50 states. With service locations throughout the country, we can deliver to urban areas, suburbs, and even remote locations. Same-day delivery is available in most metro areas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-2">How do you ensure quality?</h3>
              <p className="text-navy-600">
                Every unit is professionally sanitized before delivery using hospital-grade cleaning products. We maintain strict quality standards and regularly service all units during your rental period to ensure they stay clean and well-stocked.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-2">What is included with my rental?</h3>
              <p className="text-navy-600">
                Your rental includes delivery, setup, regular servicing (for rentals over one day), and pickup. We handle all the logistics so you can focus on your event or project.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-2">What if I have an issue with my rental?</h3>
              <p className="text-navy-600">
                Our customer service team is available to help resolve any issues promptly. Just give us a call and we will take care of it. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-navy-950">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Quote in 60 Seconds
          </h2>
          <p className="text-lg text-navy-300 mb-8 max-w-2xl mx-auto">
            Tell us what you need and get your price instantly. No obligation, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get My Instant Quote
            </Link>
            <a href={PHONE_HREF} className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
              Call Now: {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
