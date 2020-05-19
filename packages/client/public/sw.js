/* eslint-disable no-restricted-globals */
const version = "v1";
self.cacheName = `cache-${version}`;
let key;

// https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
const urlBase64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = self.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

self.updateNotificationSubscription = async () => {
  try {
    if (Notification.permission === "granted") {
      const response = await fetch("http://localhost:4000/vapidPublicKey");
      const vapidPublicKey = await response.text();
      let subscription = await self.registration.pushManager.getSubscription();
      if (vapidPublicKey !== key || !subscription) {
        if (subscription) {
          await subscription.unsubscribe();
        }
        subscription = await self.registration.pushManager.subscribe({
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          userVisibleOnly: true
        });
        await fetch("http://localhost:4000/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(subscription)
        });
        key = vapidPublicKey;
        console.log("Push subscription registered on server.");
      }
    }
  } catch (err) {
    console.log("Push subscription not registered on server.", err);
  }
};

self.addEventListener("message", event => {
  if (event.data === "update-notification-subscription") {
    event.waitUntil(self.updateNotificationSubscription());
  }
});

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      self.updateNotificationSubscription(),
      caches.keys().then(keys => Promise.all(keys.filter(x => x !== self.cacheName).map(x => caches.delete(x))))
    ])
  );
});

self.isFont = res =>
  !!((res.headers.has("content-type") && res.headers.get("content-type").match(/font/i)) || res.url.match(/font/i));

self.isStatic = res => {
  if (res.url) {
    const { pathname } = new URL(res.url);
    if (pathname === "/" || pathname === "/index.html" || pathname.match(/^\/static\//i)) {
      return true;
    }
  }

  return false;
};

const fetchHandler = async event => {
  const cache = await caches.open(self.cacheName);
  const match = await cache.match(event.request);
  if (match) {
    return match;
  }
  const response = await fetch(event.request.clone());
  if (response.status < 400 && (self.isFont(response) || self.isStatic(response))) {
    cache.put(event.request, response.clone());
  }
  return response;
};

self.addEventListener("fetch", event => {
  event.respondWith(fetchHandler(event));
});

const pushHandler = event => {
  try {
    const build = event.data.json();
    self.registration.showNotification(`Build #${build.buildNumber}`, {
      body: `Status: ${build.status}`,
      data: build
    });
  } catch (e) {
    console.log("Notification not pushed.", e);
  }
};

self.addEventListener("push", event => {
  event.waitUntil(pushHandler(event));
});

const clickHandler = async event => {
  const clients = await self.clients.matchAll({ type: "window" });
  const url = `/build/${event.notification.data.id}`;
  for (let i = 0; i < clients.length; i += 1) {
    const client = clients[i];
    if (client.url.match(url)) {
      client.focus();
      return client.navigate(url);
    }
  }
  return self.clients.openWindow(url);
};

self.addEventListener("notificationclick", event => {
  event.waitUntil(clickHandler(event));
});
