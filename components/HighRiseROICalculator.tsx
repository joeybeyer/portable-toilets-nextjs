'use client'

import { useState } from 'react'
import Link from 'next/link'

const LABOR_RATE = 35 // avg construction labor $/hr
const TRIPS_PER_DAY = 4
const WALK_TIME_PER_FLOOR = 1.5 // minutes per floor (stairwell)
const WORKING_DAYS_PER_MONTH = 22

export default function HighRiseROICalculator() {
  const [workers, setWorkers] = useState('')
  const [floors, setFloors] = useState('')
  const [result, setResult] = useState<{
    minutesLostPerDay: number
    dollarsSavedPerMonth: number
  } | null>(null)

  const calculate = () => {
    const w = parseInt(workers) || 0
    const f = parseInt(floors) || 0
    if (w <= 0 || f <= 0) return

    const walkTimePerTrip = f * WALK_TIME_PER_FLOOR // minutes
    const dailyMinutesLost = w * TRIPS_PER_DAY * walkTimePerTrip
    const dailyDollarsLost = (dailyMinutesLost / 60) * LABOR_RATE
    const monthlyDollarsLost = dailyDollarsLost * WORKING_DAYS_PER_MONTH

    setResult({
      minutesLostPerDay: Math.round(dailyMinutesLost),
      dollarsSavedPerMonth: Math.round(monthlyDollarsLost),
    })
  }

  const adjust = (field: 'workers' | 'floors', delta: number) => {
    if (field === 'workers') {
      setWorkers(prev => String(Math.max(1, (parseInt(prev) || 0) + delta)))
    } else {
      setFloors(prev => String(Math.max(1, (parseInt(prev) || 0) + delta)))
    }
    setResult(null)
  }

  return (
    <section className="section bg-amber-50 border-y border-amber-100">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge bg-amber-100 text-amber-800 mb-4">ROI Calculator</span>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
              How Much Is Walking to the Ground Floor Costing You?
            </h2>
            <p className="text-navy-600">
              On a high-rise site, workers walking down to street-level facilities lose hours of productivity every day. Calculate your true cost.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {/* Workers input */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">
                  Workers on Site
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjust('workers', -5)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-navy-700 font-bold text-lg hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={workers}
                    onChange={(e) => { setWorkers(e.target.value); setResult(null) }}
                    placeholder="e.g. 40"
                    min="1"
                    className="flex-1 text-center text-xl font-bold border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjust('workers', 5)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-navy-700 font-bold text-lg hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Floors input */}
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">
                  Number of Floors (Stories)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjust('floors', -1)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-navy-700 font-bold text-lg hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={floors}
                    onChange={(e) => { setFloors(e.target.value); setResult(null) }}
                    placeholder="e.g. 8"
                    min="1"
                    className="flex-1 text-center text-xl font-bold border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjust('floors', 1)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 text-navy-700 font-bold text-lg hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={calculate}
              disabled={!workers || !floors}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate My Savings
            </button>

            {result && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-teal-50 rounded-xl p-5 text-center">
                    <p className="text-sm font-medium text-teal-700 mb-1">Productivity Lost Per Day</p>
                    <p className="text-4xl font-bold text-teal-600">{result.minutesLostPerDay}</p>
                    <p className="text-sm text-teal-600">worker-minutes</p>
                  </div>
                  <div className="bg-navy-900 rounded-xl p-5 text-center">
                    <p className="text-sm font-medium text-navy-300 mb-1">Estimated Cost Per Month</p>
                    <p className="text-4xl font-bold text-white">
                      ${result.dollarsSavedPerMonth.toLocaleString()}
                    </p>
                    <p className="text-sm text-navy-400">in lost labor time</p>
                  </div>
                </div>

                <p className="text-xs text-navy-500 text-center mb-6">
                  Based on {TRIPS_PER_DAY} trips/worker/day, {WALK_TIME_PER_FLOOR} min/floor stairwell time, ${LABOR_RATE}/hr avg labor rate, {WORKING_DAYS_PER_MONTH} working days/month.
                </p>

                <Link
                  href={`/contact?project=construction&unit=standard`}
                  className="btn-primary w-full py-4 text-center text-lg justify-center"
                >
                  Get Crane-Set Units &amp; Reclaim That Productivity
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
