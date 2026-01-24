'use client'

import { useState } from 'react'
import Link from 'next/link'

type ProjectType = 'construction' | 'event' | 'festival'

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: 'construction', label: 'Construction Site' },
  { value: 'event', label: 'Event (up to 4 hours)' },
  { value: 'festival', label: 'Festival / Multi-Day' },
]

export default function UnitCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('event')
  const [people, setPeople] = useState('')
  const [duration, setDuration] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculateUnits = () => {
    const numPeople = parseInt(people) || 0
    const numDays = parseInt(duration) || 1

    if (numPeople <= 0) {
      setResult(null)
      return
    }

    let units = 0

    switch (projectType) {
      case 'construction':
        // 1 unit per 10 workers (8-hour shift)
        units = Math.ceil(numPeople / 10)
        break
      case 'event':
        // 1 unit per 75 guests (4 hours)
        units = Math.ceil(numPeople / 75)
        break
      case 'festival':
        // 1 unit per 50 guests + 15% buffer
        units = Math.ceil((numPeople / 50) * 1.15)
        // Multiply by days for multi-day events (extra servicing needed)
        if (numDays > 1) {
          units = Math.ceil(units * (1 + (numDays - 1) * 0.2))
        }
        break
    }

    // Minimum 1 unit
    setResult(Math.max(1, units))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateUnits()
  }

  return (
    <section className="section bg-gray-50">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge badge-teal mb-4">Calculator</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              How Many Units Do You Need?
            </h2>
            <p className="text-lg text-navy-600">
              Use our OSHA-compliant calculator to determine the right number of portable toilets.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Project Type */}
                <div>
                  <label htmlFor="calc-project-type" className="block text-sm font-medium text-navy-900 mb-2">
                    Project Type
                  </label>
                  <select
                    id="calc-project-type"
                    value={projectType}
                    onChange={(e) => {
                      setProjectType(e.target.value as ProjectType)
                      setResult(null)
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of People */}
                <div>
                  <label htmlFor="calc-people" className="block text-sm font-medium text-navy-900 mb-2">
                    {projectType === 'construction' ? 'Number of Workers' : 'Number of Guests'}
                  </label>
                  <input
                    type="number"
                    id="calc-people"
                    value={people}
                    onChange={(e) => {
                      setPeople(e.target.value)
                      setResult(null)
                    }}
                    placeholder={projectType === 'construction' ? 'e.g., 50' : 'e.g., 200'}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Duration (for festivals) */}
                <div>
                  <label htmlFor="calc-duration" className="block text-sm font-medium text-navy-900 mb-2">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    id="calc-duration"
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value)
                      setResult(null)
                    }}
                    placeholder="e.g., 1"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto btn-primary py-3 px-8"
              >
                Calculate Units Needed
              </button>
            </form>

            {/* Result */}
            {result !== null && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium text-navy-600 mb-1">Recommended Units</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-teal-600">{result}</span>
                      <span className="text-xl text-navy-600">
                        {result === 1 ? 'Unit' : 'Units'}
                      </span>
                    </div>
                    <p className="text-sm text-navy-500 mt-2">
                      Based on {projectType === 'construction' ? 'OSHA guidelines' : 'industry standards'}
                    </p>
                  </div>

                  <Link
                    href={`/contact?units=${result}&project=${projectType}&people=${people}`}
                    className="btn-primary py-3 px-6"
                  >
                    Add to Quote
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Formula explanation */}
                <div className="mt-6 p-4 bg-navy-50 rounded-lg">
                  <p className="text-sm text-navy-700">
                    <strong>How we calculated this:</strong>{' '}
                    {projectType === 'construction' && (
                      <>1 portable toilet per 10 workers for an 8-hour shift (OSHA requirement).</>
                    )}
                    {projectType === 'event' && (
                      <>1 portable toilet per 75 guests for events up to 4 hours.</>
                    )}
                    {projectType === 'festival' && (
                      <>1 portable toilet per 50 guests with a 15% buffer for festivals and multi-day events.</>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
