'use client'

interface TrustBadgeProps {
  icon: React.ReactNode
  label: string
}

function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 mb-2">
        {/* Circular border */}
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#14b8a6" strokeWidth="2" />
        </svg>
        {/* Icon in center */}
        <div className="absolute inset-0 flex items-center justify-center text-teal-600">
          {icon}
        </div>
        {/* Checkmark overlay */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-xs font-semibold text-navy-700 uppercase tracking-wide text-center">
        {label}
      </span>
    </div>
  )
}

// OSHA Compliant - Helmet icon
const OSHAIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 2.69-9 6v1c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-1c0-3.31-4.03-6-9-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3" />
  </svg>
)

// Sanitized for Safety - Shield icon
const SanitizedIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

// On-Time Delivery - Truck icon
const OnTimeIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

// Eco-Friendly - Leaf icon
const EcoIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9s9 4.03 9 9c0 4.97-4.03 9-9 9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c1.66 0 3 1.34 3 3 0 2.21-3 6-3 6s-3-3.79-3-6c0-1.66 1.34-3 3-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3" />
  </svg>
)

// Top Rated - Stars icon
const TopRatedIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const badges = [
  { icon: OSHAIcon, label: 'OSHA Compliant' },
  { icon: SanitizedIcon, label: 'Sanitized' },
  { icon: OnTimeIcon, label: 'On-Time Delivery' },
  { icon: EcoIcon, label: 'Eco-Friendly' },
  { icon: TopRatedIcon, label: 'Top Rated' },
]

interface TrustSectionProps {
  variant?: 'default' | 'compact'
  className?: string
}

export default function TrustSection({ variant = 'default', className = '' }: TrustSectionProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 text-sm text-navy-600">
            <div className="w-5 h-5 text-teal-500">
              {badge.icon}
            </div>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Desktop: Horizontal row */}
      <div className="hidden md:flex justify-center gap-8 lg:gap-12">
        {badges.map((badge) => (
          <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
        ))}
      </div>

      {/* Mobile: 2x3 grid */}
      <div className="grid grid-cols-3 gap-4 md:hidden">
        {badges.slice(0, 3).map((badge) => (
          <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
        ))}
        <div className="col-span-3 flex justify-center gap-8">
          {badges.slice(3).map((badge) => (
            <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
          ))}
        </div>
      </div>
    </div>
  )
}
