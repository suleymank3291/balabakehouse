import CONFIG from "@/config/site-config";
import Hero from "@/components/sections/Hero";
import Karsilama from "@/components/sections/Karsilama";
import OneCikanlar from "@/components/sections/OneCikanlar";
import MenuKategorileri from "@/components/sections/MenuKategorileri";
import Katalog from "@/components/sections/Katalog";
import KelimeKaruseli from "@/components/sections/KelimeKaruseli";
import PolaroidSerit from "@/components/sections/PolaroidSerit";
import MusteriYorumlari from "@/components/sections/MusteriYorumlari";

export default function AnaSayfa() {
  return (
    <>
      {/* Page content fades in after loader */}
      <main className="page-content">
        {/* 1. Hero */}
        <Hero config={CONFIG.hero} />

        {/* 2. Karşılama */}
        <Karsilama config={CONFIG.karsilama} />

        {/* 3. Öne Çıkan Lezzetler */}
        <OneCikanlar urunler={CONFIG.oneCikanlar} />

        {/* 4. Menü Kategorileri */}
        <MenuKategorileri kategoriler={CONFIG.kategoriler} />

        {/* 5. Katalog */}
        <Katalog config={CONFIG.katalog} />

        {/* 6. Kelime Karüseli */}
        <KelimeKaruseli config={CONFIG.flexA} />

        {/* 7. Polaroid Şerit */}
        <PolaroidSerit config={CONFIG.flexB} />

        {/* 8. Müşteri Yorumları */}
        <MusteriYorumlari yorumlar={CONFIG.yorumlar} />

      </main>
    </>
  );
}
