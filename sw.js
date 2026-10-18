const CACHE_NAME = 'chat-studio-v2-pwa';
const APP_SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.json',
  './icon.svg', './icon-192.png', './icon-512.png', './avatar.svg'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache assets individually: one missing/redirected file cannot abort SW installation.
    await Promise.all(APP_SHELL.map(async path => {
      try {
        const response = await fetch(path, { cache: 'reload' });
        if (response.ok) await cache.put(path, response);
      } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('chat-studio-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const copy = response.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, copy);
      }
      return response;
    } catch (_) {
      const fallback = await caches.match('./index.html');
      if (fallback && event.request.mode === 'navigate') return fallback;
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
