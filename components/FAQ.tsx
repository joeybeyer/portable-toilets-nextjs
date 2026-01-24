'use client'

import { useState } from 'react'
import { FAQItem } from '@/data/types'

interface FAQProps {
  items: FAQItem[]
  allowMultiple?: boolean
}

export default function FAQ({ items, allowMultiple = false }: FAQProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]))

  const toggleItem = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            aria-expanded={openIndices.has(index)}
          >
            <h3 className="font-semibold text-navy-900 pr-4">{item.question}</h3>
            <span
              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-transform duration-200 ${
                openIndices.has(index) ? 'rotate-180' : ''
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndices.has(index) ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
