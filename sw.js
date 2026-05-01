const CACHE = 'backbar-v2';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icon.svg',
  './drinks.js',
  './data-extend.js',
  './data-spirits.js',
  './data-glassware.js',
  './data-garnish.js',
  './data-mistakes.js',
  './data-ratios.js',
  './data-wine-beer.js',
  './data-service.js',
  './app.js',
  './view-browse.js',
  './view-quiz.js',
  './view-speed.js',
  './view-ratios.js',
  './view-progress.js',
  './view-whatcan.js',
  './view-flavor.js',
  './view-shift.js',
  './view-ref.js',
  './view-settings.js',
  './boot.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
