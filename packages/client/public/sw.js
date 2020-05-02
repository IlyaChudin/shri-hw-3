/* eslint-disable no-restricted-globals */
const version = "v1";
self.cacheName = `cache-${version}`;

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(x => x !== self.cacheName).map(x => caches.delete(x))))
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

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
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
    })()
  );
});
