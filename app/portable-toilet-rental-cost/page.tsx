import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portable Toilet Rental Cost 2026 | Complete Pricing Guide",
  description:
    "How much does portable toilet rental cost? Standard units $150-$250/month, event rentals $75-$200/day, luxury trailers $800-$2,000. Complete 2026 pricing breakdown.",
  openGraph: {
    title: "Portable Toilet Rental Cost 2026 — Complete Pricing Guide",
    description:
      "Standard porta potty $150-$250/month. Event rental $75-$200/day. Luxury trailers $800-$2,000. All costs explained.",
  },
};

const PHONE = "(833) 435-6610";
const PHONE_HREF = "tel:8334356610";

const faq = [
  {
    q: "How much does it cost to rent a portable toilet?",
    a: "Standard portable toilet rental costs $150-$250 per month for construction sites. Short-term event rentals range from $75-$200 per day depending on unit type and location.",
  },
  {
    q: "How much is a porta potty for a day?",
    a: "A standard porta potty costs $75-$125 per day for events. Deluxe flushable units run $150-$250 per day. Luxury restroom trailers start at $800 per day for premium events.",
  },
  {
    q: "Is weekly servicing included in the rental price?",
    a: "Yes. Monthly construction site rentals include weekly pumping, cleaning, and restocking of supplies. Event rentals include pre-delivery sanitization and setup.",
  },
  {
    q: "How much does a luxury restroom trailer cost?",
    a: "Luxury restroom trailers cost $800-$2,000+ per event depending on size, features, and rental duration. Includes climate control, running water, mirrors, and lighting.",
  },
  {
    q: "Are there delivery fees?",
    a: "Most rental companies include delivery and pickup in the quoted price. Some may charge extra for locations more than 25-50 miles from their service center, typically $1-$3 per mile.",
  },
  {
    q: "Do I need to pay for a permit?",
    a: "Some municipalities require permits for portable toilets placed on public property or in certain zones. Permit costs range from $25-$200 depending on the city. We can help you determine if a permit is needed.",
  },
  {
    q: "Is there a deposit required?",
    a: "Most companies require a deposit of $50-$150 for standard units. The deposit is refundable upon return of the unit in acceptable condition. Luxury trailers may require a larger deposit.",
  },
  {
    q: "Are there discounts for renting multiple units?",
    a: "Yes. Bulk discounts of 10-20% are common for rentals of 5+ units. Long-term construction contracts (3+ months) also qualify for reduced monthly rates. Ask about volume pricing when you call.",
  },
  {
    q: "What affects portable toilet rental pricing?",
    a: "The main cost factors are unit type (standard vs luxury), rental duration, quantity, delivery distance, servicing frequency, and local market rates. Peak season (May-September) may have slightly higher prices.",
  },
  {
    q: "How much do hand wash stations cost?",
    a: "Portable hand wash stations cost $75-$150 per month or $50-$100 per event day. Many health departments require them at food service events. We recommend 1 station per 2-4 toilets.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PricingGuidePage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">2026 Pricing</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              How Much Does Portable Toilet Rental Cost in 2026?
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Portable toilet rental costs <strong className="text-white">$150-$250 per month</strong> for standard construction site units. Event rentals range from <strong className="text-white">$75-$200 per day</strong>. This guide breaks down every cost so you know exactly what to expect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} className="btn-primary">
                Call for Exact Quote: {PHONE}
              </a>
              <Link href="/contact" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-navy-500">Low End</p>
                <p className="text-2xl md:text-3xl font-bold text-navy-900">$75</p>
                <p className="text-xs text-navy-400">per day (event)</p>
              </div>
              <div className="border-x border-gray-200">
                <p className="text-sm text-teal-600 font-medium">Average</p>
                <p className="text-2xl md:text-3xl font-bold text-teal-600">$175</p>
                <p className="text-xs text-navy-400">per month</p>
              </div>
              <div>
                <p className="text-sm text-navy-500">High End</p>
                <p className="text-2xl md:text-3xl font-bold text-navy-900">$2,000+</p>
                <p className="text-xs text-navy-400">luxury trailer</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 text-center">
            Portable Toilet Rental Cost by Unit Type
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-navy-950 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Unit Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Monthly Rate</th>
                  <th className="px-6 py-4 text-left font-semibold">Daily Rate (Events)</th>
                  <th className="px-6 py-4 text-left font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">Standard Porta Potty</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$150-$250</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$75-$125</td>
                  <td className="px-6 py-4 text-navy-600">Construction, basic events</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">Deluxe / Flushable</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$250-$400</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$150-$250</td>
                  <td className="px-6 py-4 text-navy-600">Upscale events, 1-2 day rentals</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">ADA Accessible</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$175-$300</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$100-$175</td>
                  <td className="px-6 py-4 text-navy-600">ADA compliance required</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">Hand Wash Station</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$75-$150</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$50-$100</td>
                  <td className="px-6 py-4 text-navy-600">Add-on for any rental</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">Luxury Restroom Trailer</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$1,500-$3,000</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$800-$2,000</td>
                  <td className="px-6 py-4 text-navy-600">Weddings, corporate, VIP</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">High-Rise Construction</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">$300-$500</td>
                  <td className="px-6 py-4 text-teal-600 font-semibold">N/A</td>
                  <td className="px-6 py-4 text-navy-600">Multi-story job sites</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            What Affects Portable Toilet Rental Pricing?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Unit Type", desc: "Standard units are cheapest. Flushable, ADA, and luxury trailers cost more due to features, size, and maintenance requirements." },
              { title: "Rental Duration", desc: "Monthly rentals offer the best per-day value. Short-term event rentals cost more per day but include delivery and pickup." },
              { title: "Quantity", desc: "Bulk discounts of 10-20% are standard for 5+ units. Large events and long-term construction contracts get the best rates." },
              { title: "Delivery Distance", desc: "Most companies include delivery within 25-50 miles. Beyond that, expect $1-$3 per mile in additional fees." },
              { title: "Servicing Frequency", desc: "Standard monthly rental includes weekly service. Events under 8 hours typically need no mid-event service. Multi-day events need daily pumping." },
              { title: "Season", desc: "Peak season (May-September) may have 10-15% higher prices due to demand from weddings, festivals, and outdoor events. Book early for best rates." },
              { title: "Location", desc: "Urban areas with more competition tend to have lower prices. Rural or remote deliveries may cost more due to travel distance." },
              { title: "Permits", desc: "Some cities require portable toilet permits ($25-$200). Your rental company can usually advise on local requirements." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-navy-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
            How to Save on Portable Toilet Rental
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6 max-w-4xl">
            {[
              { tip: "Book early for events", desc: "Reserve 2-4 weeks ahead for standard units, 1-3 months for luxury trailers. Last-minute bookings may incur rush fees." },
              { tip: "Rent in bulk", desc: "Need 5+ units? Ask for volume pricing. Most companies offer 10-20% discounts on bulk orders." },
              { tip: "Choose monthly over daily", desc: "If you need a unit for more than 5-7 days, a monthly rental is almost always cheaper than daily rates." },
              { tip: "Skip the upgrades you do not need", desc: "Standard units are perfectly fine for construction sites and casual outdoor events. Save luxury trailers for weddings and corporate events." },
              { tip: "Bundle hand wash stations", desc: "Adding hand wash stations to an existing order is cheaper than renting them separately. Ask about package deals." },
              { tip: "Off-season discounts", desc: "October through March is the slow season. Many companies offer 10-15% lower rates during winter months." },
            ].map((item) => (
              <div key={item.tip} className="flex gap-3 bg-gray-50 rounded-lg p-4">
                <span className="text-teal-500 text-lg flex-shrink-0">💡</span>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{item.tip}</p>
                  <p className="text-xs text-navy-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faq.map((item) => (
              <div key={item.q} className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-navy-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get Your Exact Quote in 60 Seconds
              </h2>
              <p className="text-navy-300 text-lg">
                Starting at $75/day. Free delivery. No hidden fees.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} className="btn-primary">
                Call {PHONE}
              </a>
              <Link href="/contact" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-navy-900">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
