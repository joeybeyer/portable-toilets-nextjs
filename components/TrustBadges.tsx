import Link from 'next/link'

interface TrustBadgesProps {
  variant?: 'compact' | 'full'
  className?: string
}

const badges = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Nationwide Service',
    subtitle: '50 States',
    href: '/location'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fast Local Delivery',
    subtitle: 'Same-Day Available',
    href: '/about#delivery'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: '4.9★ Rating',
    subtitle: '2,847 Reviews',
    href: '/citations'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Fully Insured',
    subtitle: 'Licensed & Bonded',
    href: '/about#insurance'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: '15,000+',
    subtitle: 'Customers Served',
    href: '/about'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Upfront Pricing',
    subtitle: 'Competitive Rates',
    href: '/contact'
  }
]

export default function TrustBadges({ variant = 'full', className = '' }: TrustBadgesProps) {
  const displayBadges = variant === 'compact' ? badges.slice(0, 4) : badges

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
        {displayBadges.map((badge, index) => (
          <Link
            key={index}
            href={badge.href}
            className="flex items-center gap-2 text-navy-700 hover:text-teal-600 transition-colors cursor-pointer"
          >
            <span className="text-teal-600">{badge.icon}</span>
            <span className="font-medium">{badge.title}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className={`bg-navy-50 border-y border-navy-100 ${className}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayBadges.map((badge, index) => (
            <Link
              key={index}
              href={badge.href}
              className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-navy-100 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-teal-200 transition-colors">
                {badge.icon}
              </div>
              <div className="font-semibold text-navy-900 text-sm group-hover:text-teal-700 transition-colors">{badge.title}</div>
              <div className="text-navy-600 text-xs">{badge.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
