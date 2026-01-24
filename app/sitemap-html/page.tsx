import { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { getLocationsByState } from '@/data/locations'
import { getAllBlogSlugs, getBlogPostBySlug } from '@/data/blog'
import { categories } from '@/data/clusters'
import { problemPages } from '@/data/problems'
import { neighborhoods, getNeighborhoodsByCitySlug } from '@/data/neighborhoods'

export const metadata: Metadata = {
  title: 'Site Map | Portable Toilets Champ',
  description: 'Complete site map of Portable Toilets Champ. Find all our services, locations, and resources for portable toilet rentals nationwide.',
  robots: {
    index: true,
    follow: true
  }
}

export default function SitemapPage() {
  const locationsByState = getLocationsByState()
  const blogSlugs = getAllBlogSlugs()
  const blogPosts = blogSlugs.map(slug => getBlogPostBySlug(slug)).filter(Boolean)

  // Group services by type
  const rentalServices = services.filter(s =>
    s.slug.includes('rental') && !s.slug.includes('service')
  )
  const supportServices = services.filter(s =>
    s.slug.includes('service')
  )

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-950 py-12">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Site Map
          </h1>
          <p className="text-lg text-navy-300">
            Find everything on Portable Toilets Champ - all services, locations, and resources.
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Column 1: Main Pages & Services */}
            <div className="space-y-8">
              {/* Main Pages */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Main Pages
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-navy-600 hover:text-teal-600 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/location" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Service Areas
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/citations" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Trust & Citations
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="text-navy-600 hover:text-teal-600 transition-colors">
                      Solutions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Common Problems We Solve
                </h2>
                <ul className="space-y-2">
                  {problemPages.map(problem => (
                    <li key={problem.slug}>
                      <Link
                        href={`/solutions/${problem.slug}`}
                        className="text-navy-600 hover:text-teal-600 transition-colors text-sm"
                      >
                        {problem.title.split('?')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rental Services */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Rental Services
                </h2>
                <ul className="space-y-2">
                  {rentalServices.map(service => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}`}
                        className="text-navy-600 hover:text-teal-600 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Services */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Support Services
                </h2>
                <ul className="space-y-2">
                  {supportServices.map(service => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}`}
                        className="text-navy-600 hover:text-teal-600 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Locations by State */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                Service Locations
              </h2>
              <div className="space-y-6">
                {Object.entries(locationsByState)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([state, locations]) => (
                    <div key={state}>
                      <h3 className="font-semibold text-navy-800 mb-2">{state}</h3>
                      <ul className="space-y-1 pl-4">
        {locations.map(location => {
                          const cityNeighborhoods = getNeighborhoodsByCitySlug(location.slug)
                          return (
                            <li key={location.slug}>
                              <Link
                                href={`/location/${location.slug}`}
                                className="text-sm text-navy-600 hover:text-teal-600 transition-colors"
                              >
                                {location.city}
                              </Link>
                              {cityNeighborhoods.length > 0 && (
                                <ul className="ml-4 mt-1 space-y-1">
                                  {cityNeighborhoods.map(neighborhood => (
                                    <li key={neighborhood.slug}>
                                      <Link
                                        href={`/location/neighborhood/${neighborhood.slug}`}
                                        className="text-xs text-navy-500 hover:text-teal-600 transition-colors"
                                      >
                                        {neighborhood.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>

            {/* Column 3: Blog & Resources */}
            <div className="space-y-8">
              {/* Blog Categories */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Blog Categories
                </h2>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.slug}>
                      <Link
                        href={`/blog/category/${category.slug}`}
                        className="text-navy-600 hover:text-teal-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog Posts */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Blog Articles
                </h2>
                <ul className="space-y-2">
                  {blogPosts.map(post => post && (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-navy-600 hover:text-teal-600 transition-colors text-sm"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-200">
                  Quick Links
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/sitemap.xml"
                      className="text-navy-600 hover:text-teal-600 transition-colors"
                    >
                      XML Sitemap
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/llms.txt"
                      className="text-navy-600 hover:text-teal-600 transition-colors"
                    >
                      LLMs.txt (AI Guidance)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-navy-600 mb-6">
            Contact us directly and we'll help you find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a href="tel:8334356610" className="btn-secondary">
              Call (833) 435-6610
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
