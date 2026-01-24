import { FAQItem } from '@/data/types'

interface FAQSchemaProps {
  faqs: FAQItem[]
  url: string
}

export default function FAQSchema({ faqs, url }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `https://portabletoiletschamp.com${url}`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
