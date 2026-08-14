/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force metadata into <head> for all user agents (including Lighthouse).
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  async headers() {
    // Report-only for now: logs violations to the browser console without
    // blocking anything. Covers GTM, Zapier form posts, Firebase (auth +
    // Firestore + storage, incl. Google sign-in popup), and Fontshare.
    // Browse the site with devtools open and watch for CSP warnings before
    // switching this to an enforcing `Content-Security-Policy` header.
    const cspReportOnly = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
      "font-src 'self' https://api.fontshare.com data:",
      "img-src 'self' data: blob: https://firebasestorage.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com",
      "connect-src 'self' https://hooks.zapier.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://firestore.googleapis.com https://firebasestorage.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com",
      "frame-src 'self' https://credflow-blog-7425f.firebaseapp.com https://accounts.google.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ");


    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
