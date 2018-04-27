importScripts('/cache-polyfill.js');
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('since').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/?homescreen=1',
                '/css/main.css',
                '/js/app.js',
            ])
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
