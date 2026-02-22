import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The React Compiler is now stable in Next 16, so it sits at the root
  reactCompiler: true,
  
  // Intercepts traffic to empty root folders and sends it to your Explore hub
  async redirects() {
    return [
      {
        source: '/category',
        destination: '/explore',
        permanent: true,
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