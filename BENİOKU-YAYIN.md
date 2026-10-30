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

## Yayın adresi ve depolar (Ekim 2026)

- **https://bidik.tr** — canlı site. GitHub Pages, depo: `topcubasitolga-oss/bidik-tr` (derlenmiş site + `CNAME`). DNS: Turkticaret panelinde A kayıtları 185.199.108/109/110/111.153, `www` CNAME → topcubasitolga-oss.github.io. HTTPS zorunlu.
- `topcubasitolga-oss/bidik` — eski adres (topcubasitolga-oss.github.io/bidik). Sayfalar ziyaretçiyi otomatik bidik.tr'ye taşır ve eski çevrimdışı önbelleği temizler; eski bağlantılar çalışmaya devam eder.
- Yayın: `bidik-src/yayinla.sh "mesaj"` — derler, iki depoya da gönderir (CNAME yalnızca bidik-tr'de).

## Ziyaret sayımı (Umami)
- Araç: Umami Cloud (AB bölgesi), hesap topcubasitolga@gmail.com, site "Bidik" (bidik.tr). Pano: https://cloud.umami.is/analytics/eu/websites/a2bd2b28-1314-49b9-acba-813cbd034368
- Kod `build.py` içindeki `UMAMI` sabitiyle her sayfanın `<head>`'ine eklenir; `data-domains="bidik.tr,www.bidik.tr"` olduğu için yerel test ve github.io sayılmaz; adres satırındaki arama/hash kısmı gönderilmez.
- Olaylar: tanıtım sayfasında `hemen-oyna`, `ogretmen-rehberi`, `ogretmen-odasi` (data-umami-event); oyunda `oyun-basladi` (oturumda bir kez: mod, yaş bandı, cihaz sınıfı, öğretmen modu), `durak-bitti`, `oyun-bitti`, `sinif-katildi`, `sinif-olusturuldu` (acts/97-olcum.js, 05-world.js, 95-sinif.js).
- Hobby planı sınırı 100 bin olay/ay; bu yüzden bölüm bazlı olaylar Umami'ye gönderilmez (öğrenme analitiği ayrı tasarlanacak).
- Gizlilik metni (gizlilik.html) 25 Ekim 2026'da buna göre güncellendi; avukat kontrolü bekliyor.

## Araştırma kaydı (öğrenme analitiği)
- Oyun, anonim olay satırlarını Firestore `arastirma/{oturum}` belgesine yazar (acts/98-arastirma.js; kancalar: Yol/Kod start·done/finish·çözüm, acts/00-core.js aBad/aWin/startAct/aSolveRun, 80-gorev.js A.ara, ders atla). Yalnızca bidik.tr alanında etkin (`window.__araTest` ile yerelde test).
- Kurallar `firestore.rules` (Firebase konsolundan yayınlanır): yazma şema denetimli ve kimliksiz; okuma yalnızca araştırmacı hesabı (topcubasitolga@gmail.com, UID yc71o5aAOYTlCiiZnRN9mhy5kUo1, e-posta/şifre sağlayıcısı).
- Pano: https://bidik.tr/arastirma.html (arastirma.html; build.py ARA_CFG ile apiKey/projectId gömer; sitemap ve SW dışında, robots'ta Disallow). CSV indirme var.
- Test: scratchpad/ara.js (olay üretimi + PATCH gövdesi), scratchpad/arapano.js (sahte veriyle pano).

## Öğretmen anahtarı (sınıf sistemi)
- Anahtar, sınıfı açan cihazda `Sınıflarım` listesinde saklanır; aynı cihazda açılan bütün sınıflar aynı anahtarı kullanır (`db.ogretmenAnahtar`). "Sınıf değiştir" kaydı silmez; ✕ yalnızca cihazdaki kaydı kaldırır.
- Öğretmen anahtarı kaybederse (başka cihaz, temizlenmiş tarayıcı): `oyun/derleme/anahtar-sifirla.sh KOD` (Mac, gcloud ile proje sahibi girişi). Betik okul/sınıf adını gösterir; öğretmenin e-postasıyla karşılaştırıp onaylayın, yeni anahtarı e-postayla gönderin. Öğrenci verisi değişmez.
- Oyun içi "Anahtarımı unuttum" bağlantısı topcubasitolga@gmail.com adresine kod + okul bilgisiyle e-posta hazırlar.

## Akıllı tahta / USB paketi (çevrimdışı) — bağlantısız, e-postayla verilir
- `build.py` her derlemede `TAHTA_YOL` (şu an `indir/bidik-tahta.zip`, ≈43 MB) üretir: `Bidik/Bidik.html` (uygulama sürümüyle aynı oyun; ebeveyn kapısı yok) + `fonts/` + `ses/` + `NASIL-ACILIR.txt` (kurulum + kullanım hakkı notu).
- **Sitede herkese açık bağlantısı yoktur** (karar: bağlantıyı isteyen öğretmene Tolga verir; `robots.txt` `/indir/` kapalı, arama motorlarında çıkmaz). ogretmen.html'deki kutu öğretmeni e-postaya yönlendirir.
- **Geçerlilik:** `TAHTA_SON` (2027-06-30). Son 30 gün alt şerit uyarır; tarihten sonra "süresi doldu" ekranı (e-posta + bidik.tr/oyna). Yeni öğretim yılı için tarihi ileri alıp yeniden derleyin.
- Zip belirlenimcidir; mp3/woff2 sıkıştırılmadan konur, git ardışık sürümleri delta ile saklar (ölçüm: iki sürüm 39 MB pakette, ikinci sürümün push'u ≈120 KB). Yalnızca `bidik-tr` deposuna gider (`yayinla.sh`, eski `bidik` deposundan `indir/` klasörünü siler).
- Öğretmene gönderilecek e-posta (bağlantıyı siz verirsiniz):
  > Merhaba, Bidik'in internetsiz USB paketi: https://bidik.tr/indir/bidik-tahta.zip (43 MB). Zip'i açın; çıkan "Bidik" klasörünü olduğu gibi USB belleğe kopyalayın; tahtada klasördeki Bidik.html'ye çift tıklayın (Pardus'ta sağ tık → Birlikte Aç → Firefox), F11 ile tam ekran. Ayrıntılar klasördeki NASIL-ACILIR.txt dosyasında. Paket 30 Haziran 2027'ye kadar geçerlidir ve yalnızca okulunuzun kullanımı içindir; lütfen başkalarıyla paylaşmayın, isteyen meslektaşlarınızı bize yönlendirin.
- Okul ağı filtresi: bidik.tr FortiGuard'da "Education" (13 Eki 2026). BTK Güvenli İnternet: Aile Profili'nde "OYUN" kategorisinde, Çocuk Profili listesinde yok (30 Eki 2026 sorgusu); düzeltme talebi guvenlinet.org.tr/sorgula → görüş bildir. MEB/özel okul erişim talebi metni `ogretmen.html`'de.
