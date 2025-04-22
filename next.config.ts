import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
