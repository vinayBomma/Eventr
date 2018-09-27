// importScripts('/cache-polyfill.js');
// self.addEventListener('install', function (e) {
//     e.waitUntil(
//         caches.open('since').then(function (cache) {
//             return cache.addAll([
//                 '/',
//                 '/?homescreen=1',
//                 'public/js/app.js',
//                 'public/js/init.js',
//                 'public/css/main.css',
//             ])
//         })
//     )
// });
//
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             return response || fetch(event.request);
//         })
//     );
// });
//
