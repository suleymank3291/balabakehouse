// ─────────────────────────────────────────────────────────────────────────────
//  BALA BAKEHOUSE — Merkezi İçerik & Medya Konfigürasyonu
// ─────────────────────────────────────────────────────────────────────────────

export interface LoaderConfig {
  kareler: string[];
  sureMs: number;
}

export interface HeroConfig {
  arkaplan: string;
  baslikSatir1: string;
  baslikSatir2: string;
  baslikSatir3: string;
  altMetin: string;
  eyebrow: string;
  ctaButon: string;
}

export interface KarsilamaConfig {
  metin: string;
  vurguKelimeler: string[];
}

export interface UrunKart {
  no: string;
  isim: string;
  uzakGorsel: string;
  yakinGorsel: string;
  aciklama: string;
  link: string;
}

export interface KategoriConfig {
  isim: string;
  donguGorselleri: string[];
  urunSayisi: string;
  link: string;
  placeholder?: boolean;
}

export interface KatalogConfig {
  gorsel1: string;
  video2: string | string[];
  gorsel3: string;
  eyebrow: string;
  anaYazi: string;
  vurguKelime: string;
  altMetin: string;
  marqueeMetin: string;
}

export interface FlexAKelime {
  kelime: string;
  gorsel: string;
  gorselKonum: "sol" | "sag";
}

export interface FlexAConfig {
  kelimeler: FlexAKelime[];
}

export interface PolaroidItem {
  gorsel: string;
  not: string;
}

export interface FlexBConfig {
  polaroidler: PolaroidItem[];
}

export interface YorumKart {
  metin: string;
  vurguKelime: string;
  isim: string;
  lokasyon: string;
  tarih: string;
  puan: number;
  kartArkaplan: string;
  yazıRengi: string;
}

export interface FooterConfig {
  adres: string;
  saat: string;
  telefon: string;
  whatsapp: string;
  googleMaps: string;
  instagram: string;
  newsletterMetin: string;
}

export interface SiteConfig {
  marka: string;
  sehir: string;
  slogan: string;
  metaBaslik: string;
  metaAciklama: string;
  ctaLink: string;
  ctaMetin: string;
  yemeksepeti: string;

  loader: LoaderConfig;
  hero: HeroConfig;
  karsilama: KarsilamaConfig;
  oneCikanlar: UrunKart[];
  kategoriler: KategoriConfig[];
  katalog: KatalogConfig;
  flexA: FlexAConfig;
  flexB: FlexBConfig;
  yorumlar: YorumKart[];
  footer: FooterConfig;
}

const CONFIG: SiteConfig = {
  marka: "Bala Bakehouse",
  sehir: "Ankara, Çankaya",
  slogan: "Farm to Table Bakery · Breakfast · Sweets · Coffee",
  metaBaslik: "Bala Bakehouse · Farm to Table Bakery · Ankara",
  metaAciklama:
    "Kendi bahçemizden, kendi mutfağımızdan. Ankara Çankaya'da ekşi mayalı ekmek, mevsim kahvaltıları, ev yapımı tatlılar.",
  ctaLink: "https://www.instagram.com/balabakehouse/",
  ctaMetin: "Menüyü Keşfet",
  yemeksepeti: "https://www.yemeksepeti.com/restaurant/w7hu/bala-bakehouse?srsltid=AfmBOook0xr9RvaiEDlBIK26pewVAy7EQtP_hFw-cW-FQoWrh_IQG0cR",

  // ─── LOADER ────────────────────────────────────────────────────────────────
  loader: {
    kareler: [
      "/loaders/loader1.png",
      "/loaders/loader2.png",
      "/loaders/loader3.png",
      "/loaders/loader4.png",
      "/loaders/loader5.png",
    ],
    sureMs: 350,
  },

  // ─── HERO ──────────────────────────────────────────────────────────────────
  hero: {
    arkaplan: "/hero.png",
    baslikSatir1: "Buğdaydan",
    baslikSatir2: "başlayan bir",
    baslikSatir3: "hikâye.",
    altMetin:
      "Kendi yetiştirdiğimiz siyez buğdayını taş değirmende öğütüyoruz. Kahvaltıdan tatlıya, her tabak ev mutfağımızdan çıkıyor.",
    eyebrow: "FARM TO TABLE  ·  ANKARA",
    ctaButon: "MENÜYÜ KEŞFET",
  },

  // ─── KARŞILAMA ─────────────────────────────────────────────────────────────
  karsilama: {
    metin:
      "Sabah ışığı bahçeye düştüğünde, ekmek mayalanmaya, domates olgunlaşmaya başlar. Burası bir kafe değil — hammaddenin kendisinden şekillenen bir ev mutfağı.",
    vurguKelimeler: ["ekmek mayalanmaya", "domates olgunlaşmaya", "ev mutfağı"],
  },

  // ─── ÖNE ÇIKAN LEZZETLER ──────────────────────────────────────────────────
  oneCikanlar: [
    {
      no: "no. 01",
      isim: "Egg Benedict",
      uzakGorsel: "/products/balabakehouse_1758971967_3730849731267042101_72162333753_2.jpg",
      yakinGorsel: "/products/balabakehouse_1758971967_3730849730948237793_72162333753_1.jpg",
      aciklama: "hollandaise sos, isli pastırma, taze fesleğen",
      link: "/menu#egg-benedict",
    },
    {
      no: "no. 02",
      isim: "Shakshuka on Brioche",
      uzakGorsel: "/products/balabakehouse_1772644118_3845539519206530020_72162333753_1.jpg",
      yakinGorsel: "/products/balabakehouse_1772644118_3845539521345644773_72162333753_2.jpg",
      aciklama: "marinelenmiş kale, parmesan, pancarlı yoğurt",
      link: "/menu#shakshuka",
    },
    {
      no: "no. 03",
      isim: "Çilekli Pasta",
      uzakGorsel: "/products/balabakehouse_1749102818_3648061308695458559_72162333753_2.jpg",
      yakinGorsel: "/products/balabakehouse_1749102818_3648061308687016768_72162333753_1.jpg",
      aciklama: "taze çilek, çırpılmış krema, ev yapımı bisküvi taban",
      link: "/menu#cilekli-pasta",
    },
    {
      no: "no. 04",
      isim: "Meyveli Kurabiye",
      uzakGorsel: "/products/balabakehouse_1748790710_3645443159437090283_72162333753_1.jpg",
      yakinGorsel: "/products/balabakehouse_1748790710_3645443159437098779_72162333753_2.jpg",
      aciklama: "mevsim meyveleri, tam buğday unu, organik tereyağı",
      link: "/menu#meyveli-kurabiye",
    },
  ],

  // ─── MENÜ KATEGORİLERİ ────────────────────────────────────────────────────
  kategoriler: [
    {
      isim: "Kahvaltılar",
      donguGorselleri: ["/videos/dongu-video.mp4"],
      urunSayisi: "12 tabak",
      link: "/menu#kahvaltilar",
    },
    {
      isim: "Fırın & Bakery",
      donguGorselleri: [
        "/loops/firin/1.jpg",
        "/loops/firin/2.jpg",
        "/loops/firin/3.jpg",
        "/loops/firin/4.jpg",
      ],
      urunSayisi: "8 çeşit",
      link: "/menu#firin",
    },
    {
      isim: "Tatlılar",
      donguGorselleri: [
        "/loops/tatlilar/1.jpg",
        "/loops/tatlilar/2.jpg",
        "/loops/tatlilar/3.jpg",
        "/loops/tatlilar/4.jpg",
        "/loops/tatlilar/5.jpg",
      ],
      urunSayisi: "10 tatlı",
      link: "/menu#tatlilar",
    },
    {
      isim: "Kahve & Çay",
      donguGorselleri: [
        "/loops/kahvalti/1.jpg",
        "/loops/kahvalti/2.jpg",
        "/loops/kahvalti/3.jpg",
        "/loops/kahvalti/4.jpg",
        "/loops/kahvalti/5.jpg",
      ],
      urunSayisi: "9 içecek",
      link: "/menu#kahve",
    },
  ],

  // ─── KATALOG ───────────────────────────────────────────────────────────────
  katalog: {
    gorsel1: "/videos/dongu-video-2.mp4",
    video2: [
      "/loops/dongu5/balabakehouse_1761824968_3754782438506123079_72162333753_1.jpg",
      "/loops/dongu5/balabakehouse_1761824968_3754782438204150599_72162333753_2.jpg",
      "/loops/dongu5/balabakehouse_1761824968_3754782438187376853_72162333753_3.jpg",
      "/loops/dongu5/balabakehouse_1761824968_3754782438178958477_72162333753_4.jpg",
    ],
    gorsel3: "/videos/dongu-video-3.mp4",
    eyebrow: "★  KENDİ BAHÇEMİZDEN  ★",
    anaYazi: "buğdaydan başlar.",
    vurguKelime: "başlar.",
    altMetin: "Siyez · Mevsim sebzeleri · Ev yapımı reçeller",
    marqueeMetin:
      "★ farm-to-table  ★ siyez buğdayı  ★ ev yapımı  ★ mevsimsel  ★ özenle  ",
  },

  // ─── FLEX A — Kelime Karuseli ──────────────────────────────────────────────
  // Görseller mevcut medyadan en yakın eşleşmeyle atanmıştır.
  // "Bahçe" ve "Mevsim" için daha uygun görseller geldiğinde buradan güncellenebilir.
  flexA: {
    kelimeler: [
      {
        kelime: "Buğday",
        gorsel: "/katalog/ekmek.jpg", 
        gorselKonum: "sag",
      },
      {
        kelime: "Maya",
        gorsel: "/katalog/ekmek-yakin.jpg", 
        gorselKonum: "sol",
      },
      {
        kelime: "Bahçe",
        gorsel: "/flex-a/bahce.jpg", 
        gorselKonum: "sag",
      },
      {
        kelime: "Lezzet",
        gorsel: "/loops/tatlilar/1.jpg", 
        gorselKonum: "sol",
      },
      {
        kelime: "Ev",
        gorsel: "/flex-a/ev.png", 
        gorselKonum: "sag",
      },
    ],
  },

  // ─── FLEX B — Yatay Polaroid Şerit ────────────────────────────────────────
  // PLACEHOLDER notlar: Bala'nın gerçek tarih/not etiketleriyle değiştirilecek
  flexB: {
    polaroidler: [
      { gorsel: "/flex-b/1.jpg", not: "siyez ekmeği · çarşamba" },
      { gorsel: "/flex-b/2.jpg", not: "mutfaktan sabah" },
      { gorsel: "/flex-b/3.jpg", not: "vişne reçeli · mart" },
      { gorsel: "/flex-b/4.jpg", not: "kahvaltı saati" },
      { gorsel: "/flex-b/5.jpg", not: "bahar tabağı" },
      { gorsel: "/flex-b/6.jpg", not: "soup & crust · perşembe" },
      { gorsel: "/flex-b/7.jpg", not: "ekşi maya · cuma" },
      { gorsel: "/flex-b/8.jpg", not: "tezgahtan notlar" },
    ],
  },

  // ─── MÜŞTERİ YORUMLARI ────────────────────────────────────────────────────
  // PLACEHOLDER: Bala'nın gerçek Google/Instagram yorumlarıyla değiştirilecek
  yorumlar: [
    {
      metin: "Ekşi maya ekmeğinin üzerine dökülen hollandaise, sabahı bambaşka bir şeye dönüştürüyor. Bala'da kahvaltı bir ritüel haline geliyor.",
      vurguKelime: "ritüel",
      isim: "A. Yılmaz",
      lokasyon: "Ankara",
      tarih: "Ocak 2025",
      puan: 5,
      kartArkaplan: "var(--color-light)",
      yazıRengi: "var(--color-text)",
    },
    {
      metin: "Çılbırı ilk kez burada denedim — sıradan bir tarifi bu kadar özenle sunan başka bir yer görmedim. Yoğurdun altında saklanan sarımsak, her şeyi değiştiriyor.",
      vurguKelime: "özenle",
      isim: "M. Demir",
      lokasyon: "Çankaya, Ankara",
      tarih: "Şubat 2025",
      puan: 5,
      kartArkaplan: "#3C2A21",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Brownie'nin yanında gelen vişne, sadece bir tatlı değil — bir his. Bu mutfakta her detayın düşünüldüğünü hissediyorsunuz.",
      vurguKelime: "düşünüldüğünü",
      isim: "S. Kaya",
      lokasyon: "Ankara",
      tarih: "Mart 2025",
      puan: 5,
      kartArkaplan: "#1A2C42",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Atmosfer o kadar içten ki çıkmak istemiyorsunuz. Gün ışığının masaya vurduğu o an, sıcak çikolatanın buhuru — başka türlü anlatamam.",
      vurguKelime: "başka türlü anlatamam",
      isim: "E. Şahin",
      lokasyon: "Batıkent, Ankara",
      tarih: "Nisan 2025",
      puan: 5,
      kartArkaplan: "#6E7D00",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Her sabah Bala var diye uyanmak başlı başına bir neden. Shakshuka sipariş ettim, tabak geldiğinde fotoğraf çekmeyi unuttum — yemeye başlamışım.",
      vurguKelime: "fotoğraf çekmeyi unuttum",
      isim: "B. Arslan",
      lokasyon: "Ankara",
      tarih: "Nisan 2025",
      puan: 5,
      kartArkaplan: "#74121F",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Fırından çıkan o koku, çocukluğumdaki sabahları hatırlatıyor. Gerçek bir ev mutfağı deneyimi.",
      vurguKelime: "çocukluğumdaki sabahları",
      isim: "C. Yıldız",
      lokasyon: "Ankara",
      tarih: "Mayıs 2025",
      puan: 5,
      kartArkaplan: "var(--color-light)",
      yazıRengi: "var(--color-text)",
    },
    {
      metin: "Siyez buğdayının lezzeti ekmeğin her gözenekli yapısında hissediliyor. Muazzam bir emek.",
      vurguKelime: "Muazzam bir emek",
      isim: "K. Özkan",
      lokasyon: "Ankara",
      tarih: "Haziran 2025",
      puan: 5,
      kartArkaplan: "#3C2A21",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Vişneli pasta ve demli çay... Ankara'nın en huzurlu köşesi burası olabilir.",
      vurguKelime: "huzurlu köşesi",
      isim: "L. Doğan",
      lokasyon: "Ankara",
      tarih: "Temmuz 2025",
      puan: 5,
      kartArkaplan: "#74121F",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Burada servis edilen her tabak bir sanat eseri gibi. Sunumlar o kadar özenli ki bozmaya kıyamıyorsunuz.",
      vurguKelime: "sanat eseri",
      isim: "Z. Aksoy",
      lokasyon: "Ankara",
      tarih: "Ağustos 2025",
      puan: 5,
      kartArkaplan: "#6E7D00",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Kahve çekirdekleri taze, kavurma derecesi tam kıvamında. Kahve & Çay seçkisi de mutfak kadar iddialı.",
      vurguKelime: "tam kıvamında",
      isim: "H. Kurt",
      lokasyon: "Ankara",
      tarih: "Eylül 2025",
      puan: 5,
      kartArkaplan: "#1A2C42",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Mevsim meyveleriyle yapılan o kurabiyeleri başka hiçbir yerde bulamazsınız. Tam buğdayın tadı bambaşka.",
      vurguKelime: "Tam buğdayın tadı",
      isim: "F. Çelik",
      lokasyon: "Ankara",
      tarih: "Ekim 2025",
      puan: 5,
      kartArkaplan: "var(--color-light)",
      yazıRengi: "var(--color-text)",
    },
    {
      metin: "Bala'nın mutfağında her şeyin şeffaf olması insana güven veriyor. Kalite asla tesadüf değil.",
      vurguKelime: "şeffaf olması",
      isim: "G. Erdem",
      lokasyon: "Ankara",
      tarih: "Kasım 2025",
      puan: 5,
      kartArkaplan: "#3C2A21",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Her gelişimizde farklı bir hikâye keşfediyoruz. Bu seferki favorim Brioche üzerindeki Shakshuka oldu.",
      vurguKelime: "farklı bir hikâye",
      isim: "O. Bulut",
      lokasyon: "Ankara",
      tarih: "Aralık 2025",
      puan: 5,
      kartArkaplan: "#74121F",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Ankara'da böyle bir vaha bulmak çok değerli. Bahçesi de iç mekânı kadar huzur verici.",
      vurguKelime: "vaha",
      isim: "N. Güler",
      lokasyon: "Ankara",
      tarih: "Ocak 2026",
      puan: 5,
      kartArkaplan: "#6E7D00",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Personel çok nazik, her ürünün hikâyesini sabırla anlatıyorlar. Kendinizi misafir gibi hissediyorsunuz.",
      vurguKelime: "misafir gibi",
      isim: "T. Koç",
      lokasyon: "Ankara",
      tarih: "Ocak 2026",
      puan: 5,
      kartArkaplan: "#1A2C42",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Ekmeklerin dokusu ve kokusu... Alıp eve götürdüğüm o somun, akşam yemeğimizin yıldızı oldu.",
      vurguKelime: "akşam yemeğimizin yıldızı",
      isim: "S. Tekin",
      lokasyon: "Ankara",
      tarih: "Şubat 2026",
      puan: 5,
      kartArkaplan: "#3C2A21",
      yazıRengi: "#E5E5CB",
    },
    {
      metin: "Gerçek gıda, gerçek lezzet. Bala Bakehouse Ankara için büyük bir şans.",
      vurguKelime: "Gerçek gıda",
      isim: "V. Yaman",
      lokasyon: "Ankara",
      tarih: "Şubat 2026",
      puan: 5,
      kartArkaplan: "#74121F",
      yazıRengi: "#E5E5CB",
    },
  ],

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  footer: {
    adres: "Mutlukent Mah. 1950 Sk. No:15  Çankaya, Ankara",
    saat: "Her gün  ·  09:00 — 23:00",
    telefon: "0531 250 08 98",
    whatsapp: "",
    googleMaps:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.78!3d39.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34!2sBala%20Bakehouse!5e0!3m2!1str!2str",
    instagram: "https://www.instagram.com/balabakehouse/",
    newsletterMetin: "Mevsim menümüz değiştikçe haberin olsun.",
  },
};

export default CONFIG;
