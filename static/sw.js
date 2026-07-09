// 17fei.fun Service Worker
// 策略: 静态资源 stale-while-revalidate, 页面 network-first
// 不缓存 /api/, /fxq/ 子应用, /positions/X.jpg (CDN 资源)

const CACHE_VERSION = "v1";
const STATIC_CACHE = `17fei-static-${CACHE_VERSION}`;
const PAGE_CACHE = `17fei-pages-${CACHE_VERSION}`;
const THEME_CACHE = `17fei-themes-${CACHE_VERSION}`;

// 启动时清理旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![STATIC_CACHE, PAGE_CACHE, THEME_CACHE].includes(k))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// 安装时预缓存关键静态资源
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([
        "/",
        "/manifest.webmanifest",
        "/app.css",
        "/theme-init.js",
        "/theme-meta.js",
        "/keyboard-nav.js",
        "/back-to-top.js",
        "/logo.png",
        "/offline",
      ]).catch(() => undefined)
    ),
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 不缓存 API / 后台路由
  if (url.pathname.startsWith("/api/")) return;
  // 不缓存飞行棋 SPA 资源(独立目录,有自己的缓存逻辑)
  if (url.pathname.startsWith("/fxq/")) return;
  // 不缓存静态姿势图(由后端托管)
  if (url.pathname.startsWith("/positions/")) return;

  // 主题 CSS 用 cache-first(主题不会变,命中率高)
  if (url.pathname.startsWith("/themes/")) {
    event.respondWith(
      caches.open(THEME_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        } catch {
          return hit || new Response("", { status: 504 });
        }
      }),
    );
    return;
  }

  // 静态资源 stale-while-revalidate
  if (
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".webmanifest") ||
    url.pathname.endsWith(".wav") ||
    url.pathname.endsWith(".mp3")
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || fetchPromise;
      }),
    );
    return;
  }

  // 页面 network-first 离线时回退到 /offline 或缓存
  if (
    req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")
  ) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res && res.ok && url.pathname !== "/offline") {
            const cache = await caches.open(PAGE_CACHE);
            cache.put(req, res.clone());
          }
          return res;
        } catch {
          const cache = await caches.open(PAGE_CACHE);
          const hit = await cache.match(req);
          if (hit) return hit;
          const offline = await cache.match("/offline");
          return offline || new Response("离线", { status: 503 });
        }
      })(),
    );
  }
});

// 监听消息: 跳过等待
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
