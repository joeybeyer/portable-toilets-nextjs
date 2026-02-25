'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const PHONE = '(833) 435-6610'
const PHONE_HREF = 'tel:8334356610'

export default function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-6 right-0 left-0 z-50 flex justify-center gap-3 px-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <a
        href={PHONE_HREF}
        aria-label={`Call us at ${PHONE}`}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <svg className="w-5 h-5 animate-pulse flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="hidden sm:inline">{PHONE}</span>
        <span className="sm:hidden">Call Now</span>
      </a>

      <Link
        href="/contact"
        className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Get Quote
      </Link>
    </div>
  )
}
