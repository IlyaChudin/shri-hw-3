/* eslint-disable @typescript-eslint/no-var-requires,no-restricted-globals,global-require */
const makeServiceWorkerEnv = require("service-worker-mock");

describe("Service worker", () => {
  beforeEach(() => {
    const serviceWorkerEnv = makeServiceWorkerEnv();
    Object.defineProperty(serviceWorkerEnv, "addEventListener", {
      value: serviceWorkerEnv.addEventListener,
      enumerable: true
    });
    Object.assign(global, serviceWorkerEnv);
    jest.resetModules();
    require("../public/sw");
    self.cacheName = "cache-test";
  });

  it("should add listeners", () => {
    expect(self.listeners.get("install")).toBeDefined();
    expect(self.listeners.get("activate")).toBeDefined();
    expect(self.listeners.get("fetch")).toBeDefined();
  });

  it("should skipWaiting on install ", async () => {
    self.skipWaiting = jest.fn();

    await self.trigger("install");

    expect(self.skipWaiting).toHaveBeenCalledTimes(1);
  });

  it("should delete old caches on activate", async () => {
    await self.caches.open("old");
    expect(self.snapshot().caches.old).toBeDefined();

    await self.trigger("activate");

    expect(self.snapshot().caches.old).toBeUndefined();
  });

  it("should return a cached response", async () => {
    const cachedResponse = new Response("test");
    const cachedRequest = new Request("/cache-me");
    global.fetch = jest.fn(() => Promise.resolve(cachedResponse));
    const cache = await self.caches.open(self.cacheName);
    await cache.put(cachedRequest, cachedResponse);

    const response = await self.trigger("fetch", cachedRequest);

    expect(response).toBe(cachedResponse);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should cache responses for static files", async () => {
    const cachedResponse = new Response();
    cachedResponse.url = "http://localhost/static/test.css";
    global.fetch = jest.fn(() => Promise.resolve(cachedResponse));
    const cachedRequest = new Request("/");

    await self.trigger("fetch", cachedRequest);
    const response = await self.trigger("fetch", cachedRequest);

    expect(response).toStrictEqual(cachedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should cache responses for fonts", async () => {
    const cachedResponse = new Response();
    cachedResponse.headers.set("content-type", "application/font-woff2");
    global.fetch = jest.fn(() => Promise.resolve(cachedResponse));
    const cachedRequest = new Request("/");

    await self.trigger("fetch", cachedRequest);
    const response = await self.trigger("fetch", cachedRequest);

    expect(response).toStrictEqual(cachedResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should not cache non static responses", async () => {
    const cachedResponse = new Response();
    cachedResponse.url = "http://localhost/api/settings";
    global.fetch = jest.fn(() => Promise.resolve(cachedResponse));
    const cachedRequest = new Request("/");

    await self.trigger("fetch", cachedRequest);
    const response = await self.trigger("fetch", cachedRequest);

    expect(response).toStrictEqual(cachedResponse);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("should not cache bad responses", async () => {
    const cachedResponse = new Response();
    cachedResponse.status = 500;
    global.fetch = jest.fn(() => Promise.resolve(cachedResponse));
    const cachedRequest = new Request("/");

    await self.trigger("fetch", cachedRequest);
    const response = await self.trigger("fetch", cachedRequest);

    expect(response).toStrictEqual(cachedResponse);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
