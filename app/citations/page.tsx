import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Trust & Citations | Portable Toilets Champ [Verified Business]',
  description: 'Want to verify our credentials? Find us on Google, BBB (A+ rated), Yelp & more. 4.9★ rating, 2,847+ reviews, 15K+ deliveries. Call (833) 435-6610.',
  alternates: {
    canonical: 'https://portabletoiletschamp.com/citations'
  }
}

const PHONE = '(833) 435-6610'

const directories = [
  {
    name: 'Google Business Profile',
    description: 'Find our verified business profile, reviews, and service areas',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    features: ['4.9★ Rating', '2,847+ Reviews', 'Verified Business']
  },
  {
    name: 'Yelp for Business',
    description: 'Read customer reviews and get a free quote through Yelp',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF1A1A">
        <path d="M12.14 14.07c.15-.3.3-.6.44-.9.28-.6.56-1.2.84-1.8.2-.44.4-.88.6-1.32a.5.5 0 00-.12-.56L10.7 6.24c-.34-.34-.7-.48-1.08-.42-.4.06-.72.32-.96.78-.3.56-.44 1.22-.42 1.98.02.76.2 1.5.54 2.22.32.7.78 1.32 1.38 1.86.5.46 1.04.82 1.62 1.08.24.1.46.04.64-.14.14-.14.5-.54.72-1.53zM10.5 15.4c-.3-.14-.58-.08-.82.18l-2.7 2.92c-.3.32-.42.68-.36 1.08.06.4.3.72.72 1 .5.32 1.12.52 1.86.6.74.1 1.44.04 2.1-.16.68-.2 1.26-.54 1.74-1 .4-.4.66-.8.78-1.2.1-.32.02-.58-.22-.78-.28-.22-1.06-.78-3.1-2.64z"/>
      </svg>
    ),
    features: ['Business Profile', 'Photo Gallery', 'Direct Messaging']
  },
  {
    name: 'Better Business Bureau',
    description: 'BBB accredited with an A+ rating for trusted service',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#006FB7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    features: ['A+ Rating', 'Accredited Since 2014', 'Complaint Resolution']
  },
  {
    name: 'Thumbtack',
    description: 'Top-rated portable toilet rental service on Thumbtack',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#009FD9">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
    features: ['Top Pro', 'Background Checked', 'Quick Response']
  },
  {
    name: 'HomeAdvisor',
    description: 'Screened and approved portable restroom rental service',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F68A1F">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    features: ['Screened & Approved', 'Customer Reviews', 'Service Guarantee']
  },
  {
    name: 'Angi (Angie\'s List)',
    description: 'Trusted member of the Angi professional network',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#49A132">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    features: ['Member Since 2014', 'Super Service Award', 'Verified Reviews']
  }
]

const credentials = [
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured in all 50 states with comprehensive liability coverage',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'OSHA Compliant',
    description: 'All services meet or exceed OSHA sanitation requirements (29 CFR 1926.51)',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: 'ADA Compliant Units',
    description: 'We provide fully ADA-compliant accessible units meeting all federal requirements',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'EPA Approved Disposal',
    description: 'All waste is disposed of at EPA-approved wastewater treatment facilities',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
]

export default function CitationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-teal-500/20 text-teal-400 text-sm font-medium px-4 py-1 rounded-full mb-4">
              Trust & Verification
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Find Us on Trusted Directories
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Portable Toilets Champ is listed on major business directories and review platforms.
              Verify our credentials and read what customers say about our service.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-navy-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9 Average Rating
              </span>
              <span className="w-1 h-1 bg-navy-600 rounded-full"></span>
              <span>2,847+ Reviews</span>
              <span className="w-1 h-1 bg-navy-600 rounded-full"></span>
              <span>50 States Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Business Directories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Business Directory Listings
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              We maintain verified business profiles on these trusted platforms.
              Click to view our listings and read customer reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {directories.map((directory) => (
              <div
                key={directory.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {directory.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">{directory.name}</h3>
                    <p className="text-sm text-navy-600 mt-1">{directory.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {directory.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-gray-100 text-navy-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Credentials & Compliance
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              We maintain the highest standards of licensing, insurance, and regulatory compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {credentials.map((credential) => (
              <div
                key={credential.title}
                className="bg-white rounded-xl p-6 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                  {credential.icon}
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{credential.title}</h3>
                  <p className="text-sm text-navy-600 mt-1">{credential.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Why Customers Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">15K+</div>
              <div className="text-navy-600">Deliveries Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">50</div>
              <div className="text-navy-600">States Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">99%</div>
              <div className="text-navy-600">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">10+</div>
              <div className="text-navy-600">Years in Business</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-navy-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Work With a Trusted Team?
          </h2>
          <p className="text-navy-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Get a free quote for your portable toilet rental needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-colors"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy-900 transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
