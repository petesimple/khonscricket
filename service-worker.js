self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('khons-cricket-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './flyingpiglogo.png',
        './chalk-icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
