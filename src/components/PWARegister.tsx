"use client";

import { useEffect } from "react";

// Registers the service worker so the browser will offer "Install app" /
// "Add to Home Screen". Deliberately minimal - no offline caching of API
// responses, so the AI Mirror / telemetry data is never served stale.
export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  }, []);

  return null;
}
