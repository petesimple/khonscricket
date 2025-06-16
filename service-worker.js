self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('khons-cricket-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './flyingpiglogo.png',
        './chalk-icon.png',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== 'khons-cricket-cache-v1') {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
