// Basic Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Fetch handler with basic caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});