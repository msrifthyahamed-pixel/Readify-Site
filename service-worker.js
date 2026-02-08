const CACHE_NAME = 'readify-v1';
const RUNTIME_CACHE = 'readify-runtime-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/books.html',
  '/tracker.html',
  '/recommender.html',
  '/readingflow.html',
  '/feedback.html',
  '/index.css',
  '/books.css',
  '/tracker.css',
  '/recommender.css',
  '/readingflow.css',
  '/feedback.css',
  '/index.js',
  '/books.js',
  '/tracker.js',
  '/recommender.js',
  '/readingflow.js',
  '/feedback.js',
  '/quotes.json',
  '/authors.json',
  '/booksdata.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;500;600&display=swap',
  'https://fonts.gstatic.com'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential assets');
      return cache.addAll(ASSETS_TO_CACHE.filter(url => !url.startsWith('http')))
        .catch((err) => {
          console.log('Some assets failed to cache:', err);
        });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache first for assets, network first for API calls
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external APIs and tracking
  if (url.origin !== location.origin) {
    if (url.hostname.includes('fonts.googleapis') || url.hostname.includes('fonts.gstatic')) {
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request).then((response) => {
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          });
        }).catch(() => {
          return new Response('Font resource unavailable', { status: 503 });
        })
      );
    }
    return;
  }

  // Cache first strategy for static assets
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => {
          return new Response('Resource unavailable offline', { status: 503 });
        });
      })
    );
  }
  // Network first strategy for JSON data
  else if (request.destination === '' && url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(request).then((response) => {
        return caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      }).catch(() => {
        return caches.match(request).then((response) => {
          return response || new Response(
            JSON.stringify({ error: 'Data unavailable offline' }),
            { status: 503 }
          );
        });
      })
    );
  }
  // Cache first strategy for HTML pages
  else if (request.destination === 'document') {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => {
          return caches.match('/index.html');
        });
      })
    );
  }
  // Cache first strategy for images
  else if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => {
          return new Response('Image unavailable', { status: 404 });
        });
      })
    );
  }
});
