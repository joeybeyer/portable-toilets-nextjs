/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        // Consolidated into the indexed San Antonio URL to avoid cannibalization.
        source: '/location/portable-toilet-rental-san-antonio-tx-jackson-keller',
        destination: '/location/portable-toilet-rental-san-antonio-tx',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig