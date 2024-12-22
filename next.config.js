/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/api/v1/content/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/content/images/:path*',
        destination: 'http://127.0.0.1:8000/api/v1/content/images/:path*',
      },
    ]
  },
}

module.exports = nextConfig 