# Bidik web sitesi — yayınlama rehberi

Bu klasör Bidik'in hazır web sitesidir. İçinde sunucu tarafı kod yoktur; dosyaları herhangi bir statik barındırma hizmetine yüklemek yeterlidir.

## Klasörde neler var

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Öğretmenlere yönelik tanıtım sayfası |
| `oyna/index.html` | Oyunun kendisi |
| `rehber.html` | Öğretmen rehberi (ders akışı, kavram tablosu) |
| `gizlilik.html` | Gizlilik politikası (Google Play de bu adresi ister) |
| `manifest.webmanifest`, `sw.js` | "Ana ekrana ekle" ve internetsiz çalışma |
| `simgeler/` | Uygulama simgeleri |

## En kolay yol: GitHub Pages (ücretsiz)

1. github.com'da yeni bir depo açın, adı `bidik` olsun. **Public** seçin (ücretsiz Pages için gerekli).
2. **uploading an existing file** bağlantısına tıklayın, bu klasörün **içindeki her şeyi** sürükleyin (gizli `.nojekyll` dosyası dahil), **Commit changes** deyin.
3. Settings → **Pages** → Source: **Deploy from a branch** → Branch: `main`, klasör: `/ (root)` → **Save**.
4. 1-2 dakika sonra siteniz `https://KULLANICIADINIZ.github.io/bidik/` adresinde açılır.

Not: Android projesindeki imza anahtarları bu depoda **yoktur**; Android projesi ayrı ve özel (private) bir depoda kalmalıdır.

## Kendi alan adınızı bağlamak

Alan adını aldıktan sonra (ör. bidik.com.tr):
1. Settings → Pages → **Custom domain** kutusuna alan adınızı yazın.
2. Alan adını aldığınız firmanın DNS panelinde GitHub'ın gösterdiği kayıtları ekleyin.
3. **Enforce HTTPS** kutusunu işaretleyin.

## Güncelleme yaparken

Yeni sürümü yüklediğinizde `sw.js` içindeki `CACHE` adı değiştiği için öğrencilerin cihazları da yeni sürüme kendiliğinden geçer.

## Okulda kullanmadan önce

- Okul ağında bazı siteler filtrelenebilir. Derste kullanmadan önce siteyi okul ağından, akıllı tahtanın tarayıcısından bir kez açıp deneyin.
- Bir kez açıldıktan sonra site internet kesilse de çalışır.
