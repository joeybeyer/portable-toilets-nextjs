import { Metadata } from 'next'
import Link from 'next/link'
import { problemPages } from '@/data/problems'

export const metadata: Metadata = {
  title: 'Portable Toilet Solutions | Common Problems We Solve',
  description: 'Find solutions to common portable toilet and restroom challenges. From wedding venues without bathrooms to OSHA compliance issues, we have you covered.',
}

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">Solutions</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              We've Seen Your Problem Before
            </h1>
            <p className="text-xl text-navy-300 mb-8">
              From wedding venues without restrooms to construction site compliance issues, we help solve portable toilet challenges every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Get Free Quote
              </Link>
              <a href={PHONE_HREF} className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemPages.map((problem) => (
              <Link
                key={problem.slug}
                href={`/solutions/${problem.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Problem</span>
                </div>

                <h2 className="font-bold text-lg text-navy-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {problem.title.split('?')[0]}?
                </h2>

                <p className="text-navy-600 text-sm mb-4 line-clamp-3">
                  {problem.problem.split('.')[0]}.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.relatedServices.slice(0, 2).map((service) => (
                    <span key={service} className="text-xs bg-gray-100 text-navy-600 px-2 py-1 rounded">
                      {service.replace(/-/g, ' ').replace('portable toilet rental', '').trim()}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center text-teal-600 font-medium text-sm">
                  See Solution
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Don't See Your Problem Listed?
            </h2>
            <p className="text-navy-300 mb-8 max-w-2xl mx-auto">
              We've handled thousands of unique situations. Call us to discuss your specific needs—chances are we've solved something similar before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF} className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE}
              </a>
              <Link href="/contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
