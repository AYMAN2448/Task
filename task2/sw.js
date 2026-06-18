const CACHE_NAME = 'task2-cache-v1';
const OFFLINE_URL = '/';

self.addEventListener('install', (e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).catch(()=>caches.match(OFFLINE_URL)))
  );
});
