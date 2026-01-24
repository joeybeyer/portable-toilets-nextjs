import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Portable Toilet Rental [60-Second Pricing]',
  description: 'Need a portable toilet quote fast? Get instant pricing for any event or job site. Serving all 50 states with same-day delivery. Call (833) 435-6610 now.',
  openGraph: {
    title: 'Get a Free Quote | Portable Toilet Rental [60-Second Pricing]',
    description: 'Need a portable toilet quote fast? Get instant pricing for any event or job site. Serving all 50 states with same-day delivery.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
