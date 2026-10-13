import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Blog posts are offline for now — old post URLs land on the /news placeholder
  async redirects() {
    return [
      {
        source: '/news/:slug+',
        destination: '/news',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
