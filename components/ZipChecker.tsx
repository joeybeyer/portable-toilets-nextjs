'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ZipChecker() {
  const router = useRouter()
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!/^\d{5}$/.test(zip)) {
      return
    }

    setStatus('checking')

    // Simulate check, then show success
    setTimeout(() => {
      setStatus('success')

      // Navigate to contact with zip after 1.5s
      setTimeout(() => {
        router.push(`/contact?zip=${zip}`)
      }, 1500)
    }, 500)
  }

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="hero-zip" className="sr-only">Zip Code</label>
          <input
            type="text"
            id="hero-zip"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5))
              setStatus('idle')
            }}
            placeholder="Enter your zip code"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            maxLength={5}
            disabled={status === 'checking' || status === 'success'}
          />
        </div>
        <button
          type="submit"
          disabled={zip.length !== 5 || status === 'checking' || status === 'success'}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {status === 'checking' && (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Checking...
            </>
          )}
          {status === 'idle' && 'Check Availability'}
          {status === 'success' && (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Available!
            </>
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-3 flex items-center gap-2 text-teal-700 bg-teal-50 rounded-lg px-4 py-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Units Available for Next-Day Delivery!</span>
        </div>
      )}
    </div>
  )
}
