import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProblemBySlug, getAllProblemSlugs } from '@/data/problems'
import { getServiceBySlug } from '@/data/services'
import FAQ from '@/components/FAQ'
import FAQSchema from '@/components/schema/FAQSchema'
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProblemSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const problem = getProblemBySlug(slug)

  if (!problem) {
    return { title: 'Not Found' }
  }

  return {
    title: problem.metaTitle,
    description: problem.metaDescription,
    alternates: {
      canonical: `https://portabletoiletschamp.com/solutions/${slug}`,
    },
    openGraph: {
      title: problem.metaTitle,
      description: problem.metaDescription,
      type: 'article',
    },
  }
}

export default async function ProblemSolutionPage({ params }: Props) {
  const { slug } = await params
  const problem = getProblemBySlug(slug)

  if (!problem) {
    notFound()
  }

  // Get related services
  const relatedServices = problem.relatedServices
    .map(slug => getServiceBySlug(slug))
    .filter(Boolean)

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: problem.title.split('?')[0], url: `/solutions/${slug}` }
  ]

  return (
    <>
      <FAQSchema faqs={problem.faqs} url={`/solutions/${slug}`} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section - Problem-Focused */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-900 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            {/* Problem Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-orange-400">Common Problem</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {problem.title}
            </h1>

            <p className="text-xl text-navy-300 mb-8">
              {problem.problem.split('.').slice(0, 2).join('.')}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Solution Now
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
                Same-Day Delivery
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Consultation
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Expert Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Does This Sound Familiar? */}
      <section className="section bg-orange-50 border-b border-orange-100">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Does This Sound Familiar?
            </h2>
            <p className="text-navy-600">
              If you're experiencing any of these situations, we can help.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {problem.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-navy-700 text-sm">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="badge badge-teal mb-4">The Solution</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">
                Here's How We Solve This Problem
              </h2>
              <p className="text-navy-600 text-lg mb-8 leading-relaxed">
                {problem.solution}
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {problem.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-navy-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-navy-900 rounded-2xl p-8 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-4">Get Your Solution Today</h3>
              <p className="text-navy-300 mb-6">
                Ready to solve this problem? Our team is standing by to help with fast quotes and same-day delivery options.
              </p>

              <div className="space-y-4 mb-6">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs text-navy-400">Call Now</span>
                    <span className="font-bold text-lg">{PHONE}</span>
                  </div>
                </a>
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center py-4"
                >
                  Get Free Quote
                </Link>
              </div>

              {/* Trust signals */}
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-teal-400">4.9★</div>
                    <div className="text-xs text-navy-400">Customer Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-400">15K+</div>
                    <div className="text-xs text-navy-400">Deliveries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Common Questions About This Solution
              </h2>
            </div>
            <FAQ items={problem.faqs} allowMultiple={true} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Related Services
              </h2>
              <p className="text-navy-600">
                Explore our services that can help with this situation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service) => (
                service && (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all group"
                  >
                    <h3 className="font-bold text-navy-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-navy-600 text-sm line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center text-teal-600 text-sm font-medium mt-4">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Solve This Problem?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get your free quote in minutes. Same-day delivery available in most areas.
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
