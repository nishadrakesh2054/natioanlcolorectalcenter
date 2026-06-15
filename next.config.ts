import type { NextConfig } from "next";

const supabaseHostname = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64,72, 96, 128, 256, 384],
    ...(supabaseHostname
      ? {
          remotePatterns: [
            {
              protocol: "https",
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ],
        }
      : {}),
  },
  experimental: {
    optimizePackageImports: ["embla-carousel-react", "embla-carousel-autoplay"],
  },
};

export default nextConfig;
