import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import OrganizationSchema from '@/components/schema/OrganizationSchema'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Portable Toilet Rental - Same-Day Delivery Nationwide [2026 Pricing]',
    template: '%s'
  },
  description: 'Need portable toilets fast? Same-day delivery in all 50 states. Clean units from $250. 99% on-time guarantee. Get your free quote: (833) 435-6610.',
  keywords: ['portable toilet rental', 'porta potty rental', 'portable restroom', 'event restrooms', 'construction site toilets', 'ADA portable toilet', 'luxury restroom trailer'],
  authors: [{ name: 'Portable Toilets Champ' }],
  verification: {
    google: 'dxlk6iHYw2jOUpAlhFWpKS8K8_B40F11MtRjo7S_S7M',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portabletoiletschamp.com',
    siteName: 'Portable Toilets Champ',
    title: 'Portable Toilet Rental - Same-Day Delivery Nationwide [2026 Pricing]',
    description: 'Need portable toilets fast? Same-day delivery in all 50 states. Clean units from $75/day. 99% on-time guarantee.',
    images: [
      {
        url: 'https://portabletoiletschamp.com/images/logo.svg',
        width: 280,
        height: 50,
        alt: 'Portable Toilets Champ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portable Toilet Rental - Same-Day Delivery [2026 Pricing]',
    description: 'Need portable toilets fast? Same-day delivery in all 50 states. Clean units from $75/day. 99% on-time guarantee.',
    images: ['https://portabletoiletschamp.com/images/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://portabletoiletschamp.com',
    types: {
      'application/rss+xml': 'https://portabletoiletschamp.com/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TC3MF539');`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Organization Schema for SEO */}
        <OrganizationSchema />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TC3MF539"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
