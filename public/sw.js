// Service worker của Tiệm Nhà An — sinh ra khi build (scripts/build.mjs), phiên bản f13453a5
// Trang HTML: lấy từ mạng trước, mất mạng thì dùng bản đã lưu hoặc trang "Bạn đang ngoại tuyến".
// Tài nguyên tĩnh có mã phiên bản (?v=…) và ảnh: lấy từ bộ nhớ đệm trước, tự làm mới khi đổi phiên bản.
const VERSION = '__VERSION__';
const STATIC = `nhaan-static-${VERSION}`;
const PAGES = `nhaan-pages-${VERSION}`;
const IMAGES = 'nhaan-images-v1';
const PRECACHE = ["/offline","/assets/css/style.min.css?v=20c88aa842","/assets/js/main.js?v=25cd6be26e","/assets/img/brand/logo-circle-96.webp"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![STATIC, PAGES, IMAGES].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const trim = async (name, max) => {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/_vercel/')) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(req, copy)).then(() => trim(PAGES, 40));
          }
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match('/offline')) || Response.error()),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/img/')) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(IMAGES).then((c) => c.put(req, copy)).then(() => trim(IMAGES, 150));
        }
        return res;
      })),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/') && url.search.includes('v=')) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(STATIC).then((c) => c.put(req, copy));
        }
        return res;
      })),
    );
  }
});
