// Bidik çevrimdışı önbellek. Sürüm değişince eski önbellek silinir.
const CACHE="bidik-2026-10-02-22";
const FILES=["./", "index.html", "rehber.html", "gizlilik.html", "oyna/index.html", "manifest.webmanifest", "simgeler/simge-192.png", "simgeler/simge-512.png", "simgeler/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Sayfalar: önce ağ (her zaman en yeni sürüm), internet yoksa önbellek.
// Diğer dosyalar: önbellekten hızlı aç, arkada ağdan tazele.
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET") return;
  if(req.mode==="navigate"){
    e.respondWith(fetch(req.url,{cache:"no-cache",credentials:"same-origin"}).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); return r })
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(h=>h||caches.match("./"))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(req,{ignoreSearch:true});
    const net=fetch(req).then(r=>{ if(r&&(r.ok||r.type==="opaque")) c.put(req,r.clone()); return r }).catch(()=>hit);
    return hit||net;
  }));
});
