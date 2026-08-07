/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Creative Claw CDN hosts the Dawn Ledger photo library (see src/lib/photos.ts).
    // Swap to local /public/photos before the next production deploy.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.creativeclaw.co", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Consolidated into /framework (Fable 5 cleanup, July 2026)
      { source: "/gad", destination: "/framework#gad", permanent: true },
      { source: "/12-and-12", destination: "/framework#steps", permanent: true },
    ];
  },
};

export default nextConfig;
