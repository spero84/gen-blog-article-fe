/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      // 프로덕션 환경의 도메인도 추가해야 합니다
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/content/images/**',
      },
      // 프로덕션 환경의 패턴도 추가해야 합니다
    ],
  },
};

export default nextConfig;
