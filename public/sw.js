/*
 * Minimal service worker. It exists so browsers treat the app as installable (PWA);
 * it does not cache anything and does not handle push. Registered by
 * src/components/pwa/service-worker.tsx.
 */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
