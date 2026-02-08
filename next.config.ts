import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable image optimization
    formats: ["image/webp", "image/avif"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality settings for different use cases
    qualities: [75, 85, 90],
    // Minimize layout shift
    minimumCacheTTL: 31536000, // 1 year cache for static images
    // Disable static image optimization in development for faster builds
    unoptimized: process.env.NODE_ENV === "development" ? false : false,
  },
  // Cache headers for static assets
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Enable static export optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
