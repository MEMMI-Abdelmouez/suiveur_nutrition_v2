/* Service worker — met l'app en cache pour un fonctionnement hors-ligne */
const CACHE = 'mon-assiette2-v6';
const SHELL = [
    './',
    './index.html',
    './app.css',
    './app.js',
    './manifest.webmanifest',
    './icon.svg',
];

// Installation : on met en cache la coquille de l'app
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

// Activation : on supprime les anciens caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Récupération des requêtes
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Requêtes vers Open Food Facts (autre domaine) : réseau d'abord, sans cache
    if (url.origin !== self.location.origin) {
        e.respondWith(fetch(req).catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } })));
        return;
    }

    // Fichiers de l'app : RÉSEAU d'abord (toujours la dernière version).
    // Si le réseau échoue OU renvoie une erreur (hors-ligne, tunnel coupé,
    // page d'erreur...), on bascule sur le cache.
    e.respondWith(
        fetch(req).then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
            return res;
        }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
    );
});
