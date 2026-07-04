import type { MetadataRoute } from "next";

// Next.js serves this automatically at /manifest.webmanifest and links it
// in the document head - no manual <link> tag needed.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AAfiends - Data Over Denial",
    short_name: "AAfiends",
    description: "Daily recovery telemetry, the AI Mirror Engine, and the Ledger - your personal dashboard.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    // logo.png is actually a 1024x1024 JPEG under a .png extension (confirmed via file inspection) -
    // declaring the real type/size here since browsers validate this against the actual bytes.
    // Works fine as an icon, but consider swapping in a proper square PNG icon later.
    icons: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/jpeg",
      },
    ],
  };
}
