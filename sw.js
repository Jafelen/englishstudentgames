/* English Student Games — Service Worker
 * Strategy:
 *   - HTML files: network-first with cache fallback
 *   - Everything else (CSS, JS, images, manifest): cache-first with network update
 *   - CACHE_VERSION bumped on each deploy; old caches cleaned in activate
 */
var CACHE_VERSION = 'v1';

var CACHE_NAME = CACHE_VERSION + '-cache';

/* Every static asset served from this origin.
 * When a new game is added, append its path here.
 * The SW installs only if all these files cache successfully. */
var PRECACHE = [
  '/',
  'index.html',
  'games/phrasal-verbs/game1.html',
  'games/phrasal-verbs/game2.html',
  'games/phrasal-verbs/game4.html',
  'games/gerund-infinitive/game3.html',
  'pwa.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'icons/icon.svg'
];

/* Install: cache all precache assets (skip already-cached on update) */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* Activate: clean old caches (from previous versions) */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* Fetch: HTML → network-first with cache fallback; everything else → cache-first */
self.addEventListener('fetch', function (event) {
  var isHtml = event.request.destination === 'document' ||
               event.request.headers.get('accept') &&
               event.request.headers.get('accept').indexOf('text/html') !== -1;

  if (isHtml) {
    /* Network-first for HTML: always try the network so updates are picked up,
     * but fall back to cache if offline */
    event.respondWith(
      fetch(event.request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      }).catch(function () {
        return caches.match(event.request);
      })
    );
  } else {
    /* Cache-first for assets: serve from cache immediately, update in background */
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        var fetchPromise = fetch(event.request).then(function (response) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, copy);
          });
          return response;
        }).catch(function () { return null; });

        return cached || fetchPromise;
      })
    );
  }
});
