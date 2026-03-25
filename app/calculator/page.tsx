import { Metadata } from "next";
import UnitCalculator from "@/components/UnitCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Many Portable Toilets Do I Need? | Free Calculator [2026]",
  description:
    "Use our free portable toilet calculator to find out exactly how many units you need for your event, construction site, or festival. Based on guest count, duration, and type.",
  openGraph: {
    title: "Portable Toilet Calculator — How Many Units Do I Need?",
    description:
      "Free calculator: enter your guest count and event type to get the right number of portable toilets.",
  },
};

const PHONE = "(833) 435-6610";
const PHONE_HREF = "tel:8334356610";

const faq = [
  {
    q: "How many portable toilets do I need for 100 guests?",
    a: "For a 4-hour event with 100 guests, you need approximately 2 standard portable toilets. For an 8-hour event, plan for 3-4 units. Add 1 ADA-accessible unit for compliance.",
  },
  {
    q: "How many porta potties per person on a construction site?",
    a: "OSHA requires a minimum of 1 toilet per 20 workers for construction sites. For sites with 50 workers, you need at least 3 units. Weekly servicing is included with most rentals.",
  },
  {
    q: "What is the OSHA requirement for portable toilets?",
    a: "OSHA Standard 29 CFR 1926.51(c) requires employers to provide a minimum of 1 toilet facility for every 20 employees. For 200 or more employees, 1 toilet seat plus 1 urinal per 40 workers is acceptable.",
  },
  {
    q: "How many portable toilets for a wedding?",
    a: "For a 4-hour wedding reception with 150 guests, plan for 3 standard units or 1 luxury restroom trailer. For premium events, luxury trailers with running water and climate control provide a better guest experience.",
  },
  {
    q: "Do I need ADA-accessible portable toilets?",
    a: "Yes. The ADA requires accessible restroom facilities at public events and construction sites. Plan for at least 1 ADA-accessible unit for every 20 standard units, or a minimum of 1 per event.",
  },
  {
    q: "How often should portable toilets be serviced?",
    a: "Construction site units should be serviced weekly. For events lasting more than 6 hours, consider mid-event pumping for large crowds. Multi-day festivals need daily servicing.",
  },
  {
    q: "What is the standard capacity of a portable toilet?",
    a: "A standard portable toilet tank holds approximately 60 gallons and can handle about 100 uses before needing service. For a typical 4-hour event, each unit comfortably serves 50-75 guests.",
  },
  {
    q: "Should I get hand wash stations too?",
    a: "Yes. Many municipalities and health departments require hand washing facilities at events serving food. Plan 1 hand wash station per 2-4 portable toilets. They add approximately $75-$150 per unit.",
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

const guidelines = [
  { type: "Standard Event (4 hrs)", ratio: "1 unit per 50 guests", example: "100 guests = 2 units" },
  { type: "Extended Event (8 hrs)", ratio: "1 unit per 35 guests", example: "100 guests = 3 units" },
  { type: "Festival (multi-day)", ratio: "1 unit per 75 guests/day", example: "500 guests = 7 units/day" },
  { type: "Construction (OSHA)", ratio: "1 unit per 20 workers", example: "60 workers = 3 units" },
  { type: "Wedding Reception", ratio: "1 unit per 50 guests", example: "150 guests = 3 units or 1 trailer" },
  { type: "Corporate Event", ratio: "1 unit per 40 guests", example: "200 guests = 5 units" },
];

export default function CalculatorPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-teal-500/20 text-teal-400 mb-4">Free Tool</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              How Many Portable Toilets Do I Need?
            </h1>
            <p className="text-lg text-navy-300 mb-8">
              Use our free calculator to determine exactly how many portable toilets your event, construction site, or festival requires. Based on OSHA standards, industry guidelines, and real-world experience from delivering 15,000+ units nationwide.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide max-w-3xl">
          <UnitCalculator />
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 text-center">
            Quick Reference Guide
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-navy-950 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Event Type</th>
                  <th className="px-6 py-4 text-left font-semibold">General Rule</th>
                  <th className="px-6 py-4 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {guidelines.map((g) => (
                  <tr key={g.type} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-navy-900">{g.type}</td>
                    <td className="px-6 py-4 text-navy-600">{g.ratio}</td>
                    <td className="px-6 py-4 text-teal-600 font-medium">{g.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-navy-400 mt-4 text-center">
            Always add 1 ADA-accessible unit per event. Add 15-20% more units if alcohol is served.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
            Factors That Affect How Many Units You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Guest Count", desc: "The primary factor. More people means more units. Our calculator accounts for average usage rates per person per hour." },
              { title: "Event Duration", desc: "Longer events need proportionally more units. An 8-hour event needs about 50% more units than a 4-hour event." },
              { title: "Alcohol Served", desc: "Events with alcohol see 20-30% higher restroom usage. Add extra units when beer, wine, or cocktails are served." },
              { title: "Gender Ratio", desc: "Events with more female attendees may need additional units, as women typically spend more time per restroom visit." },
              { title: "Food Served", desc: "Events with meals increase restroom usage compared to cocktail-only events. Plan accordingly." },
              { title: "Temperature", desc: "Hot weather increases hydration and restroom usage. Add 10-15% more units for outdoor summer events." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-navy-600">{item.desc}</p>
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
                Know How Many You Need? Get Your Quote
              </h2>
              <p className="text-navy-300 text-lg">
                Same-day delivery available. No hidden fees.
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
