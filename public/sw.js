/*
 * Service worker: push notifications only. No offline caching on purpose (stale-UI bugs are
 * expensive during a hackathon). Registered by src/components/pwa/service-worker.tsx.
 *
 * Push payload (sent by the backend with the user's subscription):
 *   { "title": "Time for today's lesson", "body": "5 minutes on prompts for email", "url": "/lessons/2" }
 */
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Reminder", {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/", self.location.origin);
  // Only ever open our own origin.
  if (url.origin !== self.location.origin) return;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => w.url.startsWith(self.location.origin));
      if (open) return open.focus().then(() => open.navigate(url.href));
      return self.clients.openWindow(url.href);
    }),
  );
});
