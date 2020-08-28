const cacheName = 'tic-tac-toe-v1';
const staticAssets = [
    'index.html',
    'manifest.webmanifest',
    'assets/style.css',
    'assets/x.svg',
    'assets/o.svg',
    'assets/icon-96.png',
    'assets/icon-512.png'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});


self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
            .filter(key => key !== cacheName)
            .map(key => caches.delete(key))
            );
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request)
        })
    )
});




