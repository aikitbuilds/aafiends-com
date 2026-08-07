/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Consolidated into /framework (Fable 5 cleanup, July 2026)
      { source: "/gad", destination: "/framework#gad", permanent: true },
      { source: "/12-and-12", destination: "/framework#steps", permanent: true },
    ];
  },
};

export default nextConfig;
