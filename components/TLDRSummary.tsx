interface TLDRSummaryProps {
  items: string[]
  title?: string
}

export default function TLDRSummary({ items, title = 'Key Takeaways' }: TLDRSummaryProps) {
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-bold text-teal-800 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-navy-700">
            <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
