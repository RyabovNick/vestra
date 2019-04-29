/* eslint-disable no-undef */
/* eslint-disable no-console */

workbox.setConfig({
  debug: false,
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// такой вариант - кэшировать всё как можно быстрее стразу,
// по-моему больше похоже на костыль
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('index-cache').then(cache => cache.add('/index.html')),
    caches.open('manifest-cache').then(cache => cache.add('manifest.json')),
    caches.open('img-cache').then(cache => cache.add('/img/icons/favicon-16x16.png')),
    caches.open('img-cache').then(cache => cache.add('/img/icons/favicon-32x32.png')),
    caches.open('service-worker-cache').then(cache => cache.add('service-worker.js')),
  );
});

workbox.routing.registerNavigationRoute('/index.html');

// в общем вот так, кэширование происходит только во 2-ой заход на страницу

workbox.routing.registerRoute(
  new RegExp('manifest.json'),
  new workbox.strategies.CacheFirst({
    cacheName: 'manifest-cache',
  }),
);

workbox.routing.registerRoute(
  new RegExp('/img/icons/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'img-cache',
  }),
);

workbox.routing.registerRoute(
  new RegExp('service-worker.js'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'service-worker-cache',
  }),
);
