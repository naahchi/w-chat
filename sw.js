const CACHE_NAME = 'chat-studio-v3-pwa';
const APP_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'avatar.svg',
  'back.svg',
  'call.svg',
  'video.svg',
  'menu.svg',
  'emoji.svg',
  'attachment.svg',
  'rupee.svg',
  'camera.svg',
  'microphone.svg'
];

function assetURL(path) {
  return new URL(path, self.registration.scope).href;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache available project assets individually. A single missing asset won't break install.
    await Promise.all(APP_FILES.map(async path => {
      const url = assetURL(path);
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok && (response.type === 'basic' || response.type === 'default')) {
          await cache.put(url, response);
        }
      } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key.startsWith('chat-studio-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    // Prefer network for page navigation so GitHub Pages redirects/updates are respected.
    if (request.mode === 'navigate') {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(request)) ||
               (await caches.match(assetURL('index.html'))) ||
               new Response('App is unavailable offline. Open it once while online.', {
                 status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
               });
      }
    }

    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok && response.type !== 'opaque') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
