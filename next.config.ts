import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',    // allow any host
        port:     '',      // any port (or you can lock to '443')
        pathname: '/**',   // any path
      },
    ],
  },
};

export default nextConfig;
