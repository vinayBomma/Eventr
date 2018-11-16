importScripts('/cache-polyfill.js');
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('eventr').then(function (cache) {
            return cache.addAll([
                '/css/main.css',
                '/js/app.js',
                '/js/init.js'
            ])
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        // .then(function (res) {
                        //     return caches.open('eventr-dynamic')
                        //         .then(function (cache) {
                        //             cache.put(event.request.url, res.clone());
                        //             return res;
                        //         })
                        // })
                }
            }).catch(function (err) {

        })
    );
});