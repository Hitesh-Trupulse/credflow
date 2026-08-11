/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force metadata into <head> for all user agents (including Lighthouse).
  // Without this, Next.js 15 streams meta tags into <body> for browsers,
  // so Lighthouse fails "Document does not have a meta description".
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    // Longer CDN/browser cache for optimized images (repeat visits)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  // Prefer modern syntax; reduces legacy polyfill payload
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
};

export default nextConfig;
