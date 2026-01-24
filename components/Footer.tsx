'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import TrustSection from './TrustSection'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'
const EMAIL = 'info@portabletoiletschamp.com'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Rental Services - organized by category
  const rentalServices = [
    { href: '/standard-portable-toilet-rental', label: 'Standard Toilets' },
    { href: '/deluxe-portable-toilet-rental', label: 'Deluxe Units' },
    { href: '/vip-portable-toilet-rental', label: 'VIP Toilets' },
    { href: '/luxury-portable-restroom-trailer-rental', label: 'Luxury Trailers' },
    { href: '/handicap-accessible-portable-toilet-rental', label: 'ADA Accessible' },
    { href: '/family-size-portable-toilet-rental', label: 'Family Size' },
    { href: '/event-portable-toilet-rental', label: 'Event Rentals' },
    { href: '/construction-site-portable-toilet-rental', label: 'Construction Site' },
  ]

  // Support Services
  const supportServices = [
    { href: '/portable-toilet-delivery-service', label: 'Delivery Service' },
    { href: '/portable-toilet-pickup-service', label: 'Pickup Service' },
    { href: '/portable-toilet-placement-service', label: 'Placement Service' },
    { href: '/portable-sink-station-rental', label: 'Sink Stations' },
    { href: '/portable-hand-sanitizer-station-rental', label: 'Hand Sanitizer' },
    { href: '/emergency-portable-toilet-rental', label: 'Emergency Rentals' },
    { href: '/longterm-portable-toilet-rental', label: 'Long-Term Rentals' },
    { href: '/shortterm-portable-toilet-rental', label: 'Short-Term Rentals' },
  ]

  // Popular locations
  const popularLocations = [
    { href: '/location/portable-toilet-rental-services-in-los-angeles', label: 'Los Angeles, CA' },
    { href: '/location/premium-portable-toilet-services-in-new-york', label: 'New York, NY' },
    { href: '/location/the-ultimate-guide-to-portable-toilet-service-in-chicago', label: 'Chicago, IL' },
    { href: '/location/ultimate-guide-to-portable-toilet-services-in-miami', label: 'Miami, FL' },
    { href: '/location/ultimate-guide-to-portable-toilet-services-in-denver', label: 'Denver, CO' },
    { href: '/location/top-rated-portable-toilet-services-in-san-francisco', label: 'San Francisco, CA' },
    { href: '/location/high-quality-portable-toilet-services-in-washington', label: 'Washington, DC' },
    { href: '/location/top-rated-portable-toilet-services-in-minneapolis', label: 'Minneapolis, MN' },
  ]

  const companyLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/location', label: 'Service Areas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/citations', label: 'Trust & Citations' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ]

  return (
    <>
      {/* Trust Badges Section */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-navy-500 uppercase tracking-wider mb-8">
            Why Customers Trust Us
          </p>
          <TrustSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900 py-16">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get Your Quote in 60 Seconds
              </h2>
              <p className="text-navy-300 text-lg">
                Starting at $250. Fast delivery, no hidden fees.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: {PHONE}
              </a>
              <Link href="/contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-navy-900">
                Get My Instant Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-navy-950 text-white">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <img
                  src="/images/logo.png"
                  alt="Portable Toilets Champ"
                  className="h-14 w-auto"
                />
              </Link>
              <p className="text-navy-400 text-sm mb-6">
                Professional portable toilet rentals serving all 50 states. Fast delivery, reliable service, upfront pricing.
              </p>
              <div className="space-y-3">
                <a href={PHONE_HREF} className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">{PHONE}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{EMAIL}</span>
                </a>
              </div>
            </div>

            {/* Rental Services Column */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Rental Services</h3>
              <ul className="space-y-2">
                {rentalServices.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-navy-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Services Column */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support Services</h3>
              <ul className="space-y-2">
                {supportServices.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-navy-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Locations Column */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Locations</h3>
              <ul className="space-y-2">
                {popularLocations.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-navy-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/location" className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                    View All Locations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-navy-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800">
          <div className="container-wide py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-navy-500 text-sm">
                &copy; {currentYear} Portable Toilets Champ. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="text-navy-500 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/sitemap-html" className="text-navy-500 hover:text-white text-sm transition-colors">
                  Site Map
                </Link>
                <Link href="/sitemap.xml" className="text-navy-500 hover:text-white text-sm transition-colors">
                  XML Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  )
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-navy-800 hover:bg-navy-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}
