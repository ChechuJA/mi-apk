// Service Worker para la aplicación de Juegos de Bruno y Vega
const CACHE_NAME = 'bruno-vega-cache-v1';
const urlsToCache = [
  '/',
  '/index-mobile.html',
  '/style.css',
  '/game-utils.js',
  '/manifest.json',
  // Añadir todos los scripts de juegos
  '/script-arkanoid.js',
  '/script-paracaidista.js',
  '/script-vega-bailarina.js',
  '/script-nave-exploradora.js',
  '/script-memoria.js',
  '/script-math-catcher.js',
  '/script-huerto.js',
  '/script-constelaciones.js',
  '/script-laberinto.js',
  '/script-bloques.js',
  '/script-serpiente.js',
  '/script-sokoban.js',
  '/script-carrera.js',
  '/script-bubble.js',
  '/script-alonso-noel.js',
  '/script-ahorcado.js',
  '/script-quiz.js',
  '/script-4enraya.js',
  '/script-recoge-moras.js',
  '/script-canaveras.js',
  '/script-alcala-canas-tapas.js',
  '/script-sonseca-camino.js',
  '/script-juego-habilidad.js',
  '/script-moto-desierto.js',
  '/script-flappy.js',
  '/script-atrapa-bola.js',
  // Iconos
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta cacheada si la encuentra
        if (response) {
          return response;
        }
        // Si no está en cache, buscamos en la red
        return fetch(event.request)
          .then(response => {
            // Comprobamos si recibimos una respuesta válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonamos la respuesta para guardarla en caché
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});