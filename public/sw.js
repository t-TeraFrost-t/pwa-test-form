
const staticCacheName = 'site-static';
const assets = [
  '/index.html',
  '/app.js',
  '/style.css'
];
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
          console.log('caching shell assets');
          cache.addAll(assets);
        })
      );
  });

  self.addEventListener('activate', evt => {
    console.log('service worker activated');
  });

  self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          return cacheRes || fetch(evt.request);
        })
      );
  });