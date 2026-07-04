// Minimal service worker - exists purely so the browser treats this as an
// installable PWA. No caching of API/dynamic data on purpose: this is a
// personal telemetry tool and stale-cached AI Mirror or Firestore responses
// would be actively misleading. Static assets pass straight through to the
// network; add a cache strategy here later only if offline use becomes a
// real need.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass-through only - no caching, no offline fallback yet.
  event.respondWith(fetch(event.request));
});
