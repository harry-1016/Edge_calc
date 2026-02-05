const CACHE_NAME = 't20-betting-calculator-v2';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './manifest.json'
];

// Install service worker
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[SW] Cache installation failed:', err);
      })
  );
  self.skipWaiting();
});

// Fetch from cache with fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('[SW] Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request).then(fetchResponse => {
          // Don't cache if not a success
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }
          
          // Clone the response
          const responseToCache = fetchResponse.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return fetchResponse;
        }).catch(err => {
          console.error('[SW] Fetch failed:', err);
          // If it's a navigation request and we're offline, serve index.html from cache
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Activate and clean old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
