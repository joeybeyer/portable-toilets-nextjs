import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts } from '@/data/blog'
import Testimonials from '@/components/Testimonials'
import TrustBadges from '@/components/TrustBadges'
import ReviewSchema from '@/components/schema/ReviewSchema'
import ZipChecker from '@/components/ZipChecker'
import UnitCalculator from '@/components/UnitCalculator'
import UnitComparisonTable from '@/components/UnitComparisonTable'

export const metadata: Metadata = {
  title: 'Portable Toilet Rental | Same-Day Delivery [2026 Pricing]',
  description: 'Tired of unreliable porta potty rentals? Get spotless units delivered on-time, starting at $250. Serving all 50 states. Call (833) 435-6610 for your free quote.',
  openGraph: {
    title: 'Portable Toilet Rental | Same-Day Delivery [2026 Pricing]',
    description: 'Tired of unreliable porta potty rentals? Get spotless units delivered on-time, starting at $250. Serving all 50 states.',
  },
}

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

const stats = [
  { value: '15K+', label: 'Units Delivered' },
  { value: '50', label: 'States Served' },
  { value: '99%', label: 'On-Time Rate' },
  { value: '4.9', label: 'Customer Rating' },
]

const trustLogos = [
  'Construction Companies',
  'Event Planners',
  'Film Productions',
  'Government Agencies',
  'Festival Organizers',
]

const pillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Spotless Clean',
    description: 'Every unit is professionally sanitized before delivery. Hospital-grade cleaning standards.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Always On Time',
    description: 'Same-day delivery available. Your units arrive when promised, every time.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Simple Pricing',
    description: 'Transparent quotes with no hidden fees. What we quote is what you pay.',
  },
]

const featuredServices = [
  {
    slug: 'standard-portable-toilet-rental',
    title: 'Standard Units',
    description: 'Reliable, clean, and cost-effective for any job site or event.',
    badge: 'jobsite',
  },
  {
    slug: 'deluxe-portable-toilet-rental',
    title: 'Deluxe Units',
    description: 'Enhanced comfort with built-in hand-washing stations.',
    badge: null,
  },
  {
    slug: 'handicap-accessible-portable-toilet-rental',
    title: 'ADA Accessible',
    description: 'Fully compliant units ensuring accessibility for everyone.',
    badge: null,
  },
  {
    slug: 'luxury-portable-restroom-trailer-rental',
    title: 'Luxury Trailers',
    description: 'Premium restroom trailers for upscale events and VIP areas.',
    badge: 'wedding',
  },
  {
    slug: 'construction-site-portable-toilet-rental',
    title: 'Construction Site',
    description: 'Durable units built for demanding job site conditions.',
    badge: 'jobsite',
  },
  {
    slug: 'event-portable-toilet-rental',
    title: 'Events & Festivals',
    description: 'High-capacity solutions for concerts, fairs, and gatherings.',
    badge: 'event',
  },
  {
    slug: 'vip-portable-toilet-rental',
    title: 'VIP Toilets',
    description: 'Upgraded amenities for special guests and executives.',
    badge: 'wedding',
  },
  {
    slug: 'portable-sink-station-rental',
    title: 'Sink Stations',
    description: 'Standalone sinks for hygiene compliance and convenience.',
    badge: null,
  },
  {
    slug: 'emergency-portable-toilet-rental',
    title: 'Emergency Rentals',
    description: 'Rapid deployment for disaster relief and emergencies.',
    badge: null,
  },
  {
    slug: 'longterm-portable-toilet-rental',
    title: 'Long-Term Rentals',
    description: 'Extended rental periods with regular maintenance included.',
    badge: 'jobsite',
  },
  {
    slug: 'portable-toilet-delivery-service',
    title: 'Delivery Service',
    description: 'Professional delivery and setup at your location.',
    badge: null,
  },
  {
    slug: 'portable-hand-sanitizer-station-rental',
    title: 'Hand Sanitizer',
    description: 'Touchless sanitizing stations for health and safety.',
    badge: null,
  },
]

// Featured state links for service area section
const featuredStates = [
  { name: 'California', code: 'ca' },
  { name: 'Texas', code: 'tx' },
  { name: 'Florida', code: 'fl' },
  { name: 'New York', code: 'ny' },
  { name: 'Arizona', code: 'az' },
  { name: 'Nevada', code: 'nv' },
  { name: 'Colorado', code: 'co' },
  { name: 'Illinois', code: 'il' },
]

// Featured blog posts for homepage
const featuredPosts = blogPosts.slice(0, 4)

export default function Home() {
  return (
    <>
      <ReviewSchema />

      {/* Hero Section - Bright, clean aesthetic for sanitation industry */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Image - Full visibility, text box handles readability */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/general/hero-banner.webp"
            alt="Clean portable toilet unit ready for delivery - Portable Toilets Champ"
            fill
            className="object-cover object-left md:object-center"
            priority
          />
        </div>

        <div className="container-wide relative z-20">
          <div className="py-12 md:py-28 lg:py-36">
            {/* Semi-transparent box for text readability per CRO feedback */}
            <div className="max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10">
              {/* Mobile-First Value Props - Visible immediately on mobile */}
              <div className="flex flex-wrap gap-2 mb-4 md:hidden">
                <span className="inline-flex items-center gap-1.5 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Same-Day Delivery
                </span>
                <span className="inline-flex items-center gap-1.5 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Spotless Units
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  99% On-Time
                </span>
              </div>

              {/* Trust Badge with Price Anchor - Desktop */}
              <div className="hidden md:inline-flex items-center gap-2 bg-teal-600 rounded-full px-4 py-2 mb-6">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-white">Starting at $250 • Serving all 50 states</span>
              </div>

              {/* Headline - Smaller on mobile */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-4 md:mb-6 leading-tight">
                Portable Toilet Rental:{' '}
                <span className="text-teal-600">Spotless Units.</span>{' '}
                Same-Day Delivery.
              </h1>

              {/* 99% On-Time Stat - Desktop only */}
              <div className="hidden md:inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 mb-6">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold text-amber-800">99% On-Time Delivery Record</span>
                <span className="text-xs text-amber-600">• 2,847 verified reviews</span>
              </div>

              {/* Subheadline - Shorter on mobile */}
              <p className="text-lg md:text-xl text-navy-600 mb-6 md:mb-8 max-w-2xl">
                <span className="md:hidden">Clean units from $250. All 50 states.</span>
                <span className="hidden md:inline">Fast, reliable portable toilet rentals with same-day delivery available in all 50 states. Professional service you can count on.</span>
              </p>

              {/* CTAs - Solid buttons for both actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  See My Instant Price
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href={PHONE_HREF} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-lg inline-flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: {PHONE}
                </a>
              </div>

              {/* Mini Social Proof */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">JM</div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">SK</div>
                  <div className="w-8 h-8 rounded-full bg-lime-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">AR</div>
                </div>
                <div className="text-sm text-navy-600">
                  <span className="text-yellow-500">★★★★★</span> <span className="font-medium text-navy-900">4.9/5</span> from 2,847 reviews
                </div>
              </div>

              {/* Zip Code Checker */}
              <div className="mb-8">
                <p className="text-sm font-medium text-navy-700 mb-2">Check availability in your area:</p>
                <ZipChecker />
              </div>

              {/* How It Works Micro-Strip */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-8">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">How it works</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                    <span className="text-navy-700">Enter your zip code to check availability</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                    <span className="text-navy-700">Get an instant quote with upfront pricing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                    <span className="text-navy-700">We deliver, service, and pick up on schedule</span>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-600">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fast Local Delivery
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Quotes
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Certification Strip */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-navy-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#006FB7">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-sm font-medium">BBB A+ Rated</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#49A132">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium">Angi Certified</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium">4.9★ Google Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Fully Insured</span>
            </div>
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

      {/* Unit Comparison Table — moved up per CRO audit: users want to see product diff early */}
      <UnitComparisonTable />

      {/* 3 Pillars Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-teal mb-4">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              The Portable Toilets Champ Difference
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              We built our business on three simple promises that matter most to our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card">
                <div className="card-body text-center">
                  <div className="feature-icon mx-auto mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{pillar.title}</h3>
                  <p className="text-navy-600">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Calculator */}
      <UnitCalculator />

      {/* Services Section */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-navy mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Portable Restroom Solutions
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              From standard units to luxury trailers, we have the right solution for your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-teal-200 hover:shadow-md transition-all group relative">
                {service.badge === 'wedding' && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Best for Weddings
                  </span>
                )}
                {service.badge === 'jobsite' && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Best for Job Sites
                  </span>
                )}
                {service.badge === 'event' && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Best for Events
                  </span>
                )}
                <h3 className="font-bold text-navy-900 mb-1 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-navy-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-navy-950 text-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-navy-300 max-w-2xl mx-auto">
              From quote to pickup, we handle everything so you can focus on your event or project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Enter Your Zip Code</h3>
              <p className="text-navy-400">
                Check availability in your area instantly. We&apos;ll show you options and pricing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Your Quote</h3>
              <p className="text-navy-400">
                Receive transparent pricing with no hidden fees. Same-day delivery available in most areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">We Handle It All</h3>
              <p className="text-navy-400">
                Professional delivery, regular servicing, and pickup included. Zero hassle for you.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get My Quote in 60 Seconds
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="section-sm bg-gray-50 border-y border-gray-100">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-navy-500 uppercase tracking-wider mb-6">
            Trusted by professionals nationwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {trustLogos.map((name) => (
              <span key={name} className="text-navy-400 font-medium">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-teal mb-4">Coverage</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Nationwide Service Coverage
              </h2>
              <p className="text-lg text-navy-600 mb-6">
                We deliver portable toilets to all 50 states. Whether you need one unit or one hundred, we have you covered with reliable service in your area.
              </p>
              <ul className="space-y-3 mb-8">
                {['Same-day delivery in most metro areas', 'Rural and remote location service', 'Event-specific logistics support', 'Ongoing maintenance included'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-navy-700">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/location" className="btn-primary">
                Find Your Area
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-navy-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {featuredStates.map((state) => (
                  <Link key={state.code} href={`/location/state/${state.code}`} className="flex items-center gap-2 text-navy-700 hover:text-teal-600 transition-colors group">
                    <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium group-hover:underline">{state.name}</span>
                  </Link>
                ))}
              </div>
              <Link href="/location" className="block text-center text-teal-600 hover:text-teal-700 font-medium text-sm mt-6">
                View all 50 states
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="badge badge-navy mb-4">Resources</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Portable Toilet Rental Tips & Guides
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              Expert advice to help you plan your next event or construction project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="p-5">
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                    {post.category.name}
                  </span>
                  <h3 className="font-bold text-navy-900 mt-2 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-navy-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm text-teal-600 mt-3 font-medium">
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/blog" className="btn-secondary">
              View All Articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Price in 60 Seconds
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Tell us what you need and get your quote instantly. No obligation, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-teal-700 hover:bg-gray-100">
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
