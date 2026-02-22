import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables automatic UI optimization for blazing fast rendering
  experimental: {
    reactCompiler: true,
  },
  
  // Intercepts traffic to empty root folders and sends it to your Explore hub
  async redirects() {
    return [
      {
        source: '/category',
        destination: '/explore',
        permanent: true, // Tells Google this is your official structure
      },
      {
        source: '/tag',
        destination: '/explore',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
