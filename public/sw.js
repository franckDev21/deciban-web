/* Service Worker Deciban.
   Recoit les controles pousses par le serveur, meme onglet ferme. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {};
  }

  const seconds = data.window || 90;

  event.waitUntil(
    self.registration.showNotification("Deciban · contrôle en cours", {
      body: seconds + " secondes pour répondre",
      tag: "deciban-probe",
      renotify: true,
      requireInteraction: true,
      data: { url: "/session" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/session";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(target) && "focus" in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    })
  );
});
