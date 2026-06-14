export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Joey Beyer',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Portable Toilets Champ'
    },
    url: 'https://portabletoiletschamp.com',
    sameAs: []
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
