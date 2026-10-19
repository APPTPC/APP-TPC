/* Asistencia TPC · funcionamiento sin conexión.
   Si cambias las guías o los iconos, sube el número de VERSION para que los móviles los vuelvan a descargar. */
const VERSION = "tpc-v11";
const CORE = ["./", "index.html", "centros.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
const PDFS = [
  "guias/ERC2025-05-Soporte-vital-avanzado.pdf",
  "guias/ERC2025-06-Situaciones-especiales.pdf",
  "guias/ERC2025-07-Cuidados-posresucitacion.pdf",
  "guias/ERC2025-08-Soporte-vital-neonatal.pdf",
  "guias/ERC2025-09-Soporte-vital-pediatrico.pdf"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    await Promise.allSettled(PDFS.map(u => c.add(u)));   // si un PDF falla, la app se instala igualmente
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

const conTiempo = (req, ms) => new Promise((ok, no) => {
  const t = setTimeout(no, ms);
  fetch(req).then(r => { clearTimeout(t); ok(r); }, err => { clearTimeout(t); no(err); });
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const esPdf = /\.pdf$/i.test(new URL(req.url).pathname);
  if (req.mode === "navigate" && !esPdf) {   // los PDF (también dentro de un iframe) van por la rama de copia guardada, para no machacar index.html
    // la página: primero la red (así se ven las actualizaciones); sin conexión, la copia guardada
    e.respondWith(conTiempo(req, 3000).then(res => {
      const copia = res.clone();
      caches.open(VERSION).then(c => c.put("index.html", copia));
      return res;
    }).catch(() => caches.match("index.html")));
    return;
  }
  // el resto (PDF, iconos…): primero la copia guardada
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req).then(res => {
    if (res.ok) { const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
    return res;
  })));
});
