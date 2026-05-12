import type { Metadata } from "next";
import Link from "next/link";
import CONFIG from "@/config/site-config";
import Karsilama from "@/components/sections/Karsilama";

export const metadata: Metadata = {
  title: "İletişim | " + CONFIG.marka,
  description: "Bala Bakehouse iletişim bilgileri, adres, telefon ve çalışma saatleri.",
};

export default function IletisimPage() {
  return (
    <main className="pt-32 pb-24" style={{ background: "var(--color-light)", minHeight: "100vh" }}>
      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p
            className="text-xs tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-brown)", opacity: 0.8 }}
          >
            ✦  BİZİMLE İLETİŞİME GEÇİN  ✦
          </p>
          <h1
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.1,
              color: "var(--color-text)",
            }}
          >
            Mutfaktan <br className="md:hidden" />
            <em style={{ color: "var(--color-accent)" }}>Size.</em>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          
          {/* Info Block */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h2 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}>Adres</h2>
              <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text)" }}>
                {CONFIG.footer.adres}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}>İletişim</h2>
              <a href={`tel:${CONFIG.footer.telefon.replace(/\\s/g, '')}`} className="block text-2xl md:text-4xl mb-2 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text)" }}>
                {CONFIG.footer.telefon}
              </a>
              <a href={CONFIG.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm tracking-widest uppercase hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: "var(--font-inter)", color: "var(--color-brown)" }}>
                Instagram: @balabakehouse
              </a>
            </div>

            <div className="mb-12">
              <h2 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}>Çalışma Saatleri</h2>
              <p className="text-lg" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-text)" }}>
                {CONFIG.footer.saat}
              </p>
            </div>

            <div className="pt-8 border-t" style={{ borderColor: "rgba(107,74,43,0.15)" }}>
              <a
                href={CONFIG.yemeksepeti}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase w-full md:w-auto hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(139,46,42,0.25)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  background: "var(--color-accent)",
                  color: "var(--color-light)",
                  transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
                }}
              >
                Yemeksepeti'nden Sipariş Ver
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div className="relative w-full h-[50vh] md:h-full min-h-[400px] overflow-hidden rounded-[24px_8px_32px_8px]" style={{ boxShadow: "0 25px 50px rgba(61,75,46,0.08)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.0602604508267!2d32.7029939761819!3d39.895283087211126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3390014e4072d%3A0x45cd194bb543be63!2sBala%20Bakehouse!5e0!3m2!1str!2str!4v1778626063484!5m2!1str!2str"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
      
      {/* End section text (reusing Karsilama component for consistency) */}
      <Karsilama 
        config={{ metin: "Sıcak bir kahve, taze bir dilim ekmek ve ev mutfağı samimiyetiyle sizi bekliyoruz.", vurguKelimeler: ["ev mutfağı"] }} 
        style={{ minHeight: "auto", padding: "12vh 6vw" }}
      />
    </main>
  );
}
