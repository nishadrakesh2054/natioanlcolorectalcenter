import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["embla-carousel-react", "embla-carousel-autoplay"],
  },
};

export default nextConfig;
