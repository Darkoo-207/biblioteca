const CACHE_NAME = "biblioteca-pwa-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon.png"
];


// INSTALACIÓN
self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(ARCHIVOS);

            })

    );

});


// CARGAR ARCHIVOS
self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
            .then(function(respuesta) {

                if (respuesta) {
                    return respuesta;
                }

                return fetch(event.request);

            })

    );

});


// ACTUALIZAR CACHE
self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys()
            .then(function(nombres) {

                return Promise.all(

                    nombres
                        .filter(function(nombre) {

                            return nombre !== CACHE_NAME;

                        })
                        .map(function(nombre) {

                            return caches.delete(nombre);

                        })

                );

            })

    );

});
