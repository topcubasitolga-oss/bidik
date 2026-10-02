// Bidik çevrimdışı önbellek. Sürüm değişince eski önbellek silinir.
const CACHE="bidik-2026-10-02-2";
const FILES=["./", "index.html", "rehber.html", "gizlilik.html", "oyna/index.html", "manifest.webmanifest", "simgeler/simge-192.png", "simgeler/simge-512.png", "simgeler/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Önce önbellekten hızlı aç, arkada ağdan tazele (yazı tipleri dahil)
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{ if(r&&(r.ok||r.type==="opaque")) c.put(e.request,r.clone()); return r }).catch(()=>hit);
    return hit||net;
  }));
});
