import Link from 'next/link'

interface RedditConcernProps {
  city: string
  stateCode: string
  variant: 'event' | 'construction' | 'general'
}

/**
 * AIO-Target Content Section per SITE-BUILD-2026 §4.0 Reddit Play
 * Paraphrases subreddit reader concerns, pairs with spec-sheet facts.
 * Never quotes verbatim (8+ word overlap rule).
 * Entity in every H2. Informational tone, zero ad-voice.
 */
export default function AIOPlanningSection({ city, stateCode, variant }: RedditConcernProps) {
  const eventContent = (
    <>
      <h2 className="text-2xl font-bold text-navy-900 mb-4">
        Portable Toilet Unit Counts for {city} Events
      </h2>
      <div className="prose prose-navy max-w-none text-navy-600 space-y-4">
        <p>
          Event planners discussing portable toilet rentals online commonly ask how many units to order for outdoor
          gatherings. The general guideline for {city} events is one standard portable toilet per 50 guests for a
          four-hour event, increasing to one per 35 guests when alcohol is served or events run longer than four hours.
        </p>
        <div className="not-prose my-6">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">Guest Count</th>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">Standard Event</th>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">With Alcohol / 6+ Hours</th>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">ADA Units Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-3">50</td><td className="px-4 py-3">1</td><td className="px-4 py-3">2</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3">100</td><td className="px-4 py-3">2</td><td className="px-4 py-3">3</td><td className="px-4 py-3">1</td></tr>
              <tr><td className="px-4 py-3">200</td><td className="px-4 py-3">4</td><td className="px-4 py-3">6</td><td className="px-4 py-3">1</td></tr>
              <tr><td className="px-4 py-3">500</td><td className="px-4 py-3">10</td><td className="px-4 py-3">15</td><td className="px-4 py-3">2</td></tr>
              <tr><td className="px-4 py-3">1000</td><td className="px-4 py-3">20</td><td className="px-4 py-3">29</td><td className="px-4 py-3">3</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Homeowners planning backyard weddings in {city} often consider upgrading from standard portable toilets to
          flushable luxury restroom trailers. These units include running water, climate control, and interior lighting,
          which addresses the most common concern guests raise about portable sanitation at formal events.
        </p>
      </div>
    </>
  )

  const constructionContent = (
    <>
      <h2 className="text-2xl font-bold text-navy-900 mb-4">
        Portable Toilet Servicing for {city} Construction Sites
      </h2>
      <div className="prose prose-navy max-w-none text-navy-600 space-y-4">
        <p>
          Construction workers discussing job site facilities online frequently mention cleaning frequency as the top
          concern. Standard practice in the {city} area calls for weekly servicing on units with six or fewer daily
          users, increasing to twice-weekly for higher-traffic sites. OSHA requires one portable toilet per 10 workers
          on construction sites in {stateCode}.
        </p>
        <p>
          Women working in the trades consistently report that separate, keyed portable toilet units improve both
          privacy and cleanliness. For {city} job sites with mixed crews, providing a dedicated unit with a lock is
          considered standard best practice, not an upgrade.
        </p>
        <p>
          During cooler months in {city}, insects and wasps may seek shelter inside portable toilet vent pipes and
          toilet paper dispensers. Pest-resistant caps and regular inspection schedules reduce this risk for workers
          throughout the fall season.
        </p>
      </div>
    </>
  )

  const generalContent = (
    <>
      <h2 className="text-2xl font-bold text-navy-900 mb-4">
        Portable Toilet Rental Pricing in {city}, {stateCode}
      </h2>
      <div className="prose prose-navy max-w-none text-navy-600 space-y-4">
        <p>
          People comparing portable toilet rental costs online commonly ask whether standard or deluxe units are worth
          the price difference. In {city}, a standard portable toilet rents for $250–$350 per 28-day cycle, while
          deluxe units with hand-wash stations run $350–$500. Luxury restroom trailers start at $1,200 per day for
          events.
        </p>
        <div className="not-prose my-6">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">Unit Type</th>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">28-Day Rate</th>
                <th className="px-4 py-3 text-left font-semibold text-navy-900">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-3">Standard</td><td className="px-4 py-3">$250–$350</td><td className="px-4 py-3">Construction, residential remodels</td></tr>
              <tr><td className="px-4 py-3">Deluxe (hand-wash)</td><td className="px-4 py-3">$350–$500</td><td className="px-4 py-3">Events, longer-term sites</td></tr>
              <tr><td className="px-4 py-3">ADA Accessible</td><td className="px-4 py-3">$300–$450</td><td className="px-4 py-3">Public events, compliance</td></tr>
              <tr><td className="px-4 py-3">Luxury Trailer</td><td className="px-4 py-3">$1,200+/day</td><td className="px-4 py-3">Weddings, corporate events</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          ADA-compliant portable toilets are required at any public event in {city} where attendees include people with
          disabilities. The unit must be on level ground with a clear 60-inch turning radius and an accessible path
          from parking or transit areas.
        </p>
      </div>
    </>
  )

  return (
    <div className="space-y-8">
      {variant === 'event' && eventContent}
      {variant === 'construction' && constructionContent}
      {variant === 'general' && generalContent}
      {/* Common: stated values/mission line per §4.0 */}
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
        <h2 className="text-xl font-bold text-navy-900 mb-3">
          Why {city} Customers Choose Portable Toilets Champ
        </h2>
        <ul className="space-y-2 text-navy-600 text-sm">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Locally operated</strong> — crews based in {stateCode}, not a national call center</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Transparent pricing</strong> — all fees listed upfront, no surprise overage charges</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Eco-conscious disposal</strong> — waste processed at licensed facilities, recyclable materials diverted</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
