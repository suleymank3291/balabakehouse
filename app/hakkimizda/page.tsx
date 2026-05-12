"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CONFIG from "@/config/site-config";
import Karsilama from "@/components/sections/Karsilama";

export default function HakkimizdaPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [unmutedVideo, setUnmutedVideo] = useState<number | null>(null);

  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = unmutedVideo !== 1;
    if (video2Ref.current) video2Ref.current.muted = unmutedVideo !== 2;
  }, [unmutedVideo]);


  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onScroll = () => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const scrollable = window.innerHeight;
      
      // Calculate how far the image is through the viewport
      if (rect.top <= scrollable && rect.bottom >= 0) {
        const progress = 1 - (rect.bottom / (scrollable + rect.height));
        // Parallax effect: move image down slowly
        const yOffset = progress * 150; 
        const img = parallaxRef.current.querySelector('img');
        if (img) img.style.transform = `translateY(${yOffset}px) scale(1.1)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="pt-32 pb-0 overflow-hidden" style={{ background: "var(--color-light)", minHeight: "100vh" }}>
      
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 text-center mb-24 md:mb-32">
        <p
          className="text-xs tracking-[0.3em] mb-6 uppercase"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-brown)", opacity: 0.8 }}
        >
          ✦  BİZİM HİKAYEMİZ  ✦
        </p>
        <h1
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.1,
            color: "var(--color-text)",
          }}
        >
          Buğdaydan Başlayan <br className="hidden md:block" />
          <em style={{ color: "var(--color-accent)" }}>Bir Hikâye.</em>
        </h1>
      </div>

      {/* Hikayemiz - Video Sağ, Yazı Sol */}
      <section className="max-w-screen-xl mx-auto px-6 mb-32 md:mb-48">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text)" }}>
              Kökene Dönüş
            </h2>
            <div className="h-[1px] w-12 mb-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-text)" }}>
              Bala Bakehouse, ekşi mayalı ekmeklerden kahvaltı tabaklarına, tatlılardan sıcak çikolataya uzanan menüsüyle hızlı tüketimden ziyade ürünün kökenine önem veren bir mutfak anlayışı sunuyor ve hikâyesi buğdaydan başlıyor.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-text)" }}>
              Kendi yetiştirdikleri siyez buğdayını taş değirmende öğüterek un elde ediyorlar ve bu unu da ekşi mayalı ekmeklerinde kullanıyorlar. Şef Gözde Erdem’in yaklaşımıyla mutfak, adeta hammaddenin kendisinden şekilleniyor.
            </p>
          </div>
          <div className="w-full md:w-2/5 order-1 md:order-2">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ boxShadow: "0 25px 50px rgba(61,75,46,0.08)" }}>
              <video 
                ref={video1Ref}
                src="/videos/hikayemiz-video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full block"
              />
              <button 
                onClick={() => setUnmutedVideo(unmutedVideo === 1 ? null : 1)}
                className="absolute bottom-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                aria-label="Sesi aç/kapat"
              >
                {unmutedVideo === 1 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tam Ekran Parallax Görsel */}
      <section 
        ref={parallaxRef}
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mb-0"
      >
        <Image 
          src="/hero.png" // Placeholder, user might change it
          alt="Bala Bakehouse"
          fill
          priority
          className="object-cover transition-transform duration-75 ease-out scale-110 origin-bottom"
          sizes="100vw"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(61, 75, 46, 0.45), transparent)" }} />
      </section>

      {/* Karşılama (Şiirsel Metin) */}
      <Karsilama 
        config={{ 
          metin: "“Bakehouse” ismindeki house vurgusu, hem ev hissine hem de mekânın geçmişte bir ev olmasına referans veriyor. Burası steril bir kafe değil, gündelik hayata karışan sıcak bir üretim alanı.", 
          vurguKelimeler: ["üretim alanı"] 
        }} 
        style={{ minHeight: "auto", padding: "12vh 12vw" }}
        contentClassName="max-w-[1400px]"
      />

      {/* Doğadan Hasat - Video Sol, Yazı Sağ */}
      <section className="max-w-screen-xl mx-auto px-6 mt-12 mb-32 md:mb-48">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-2/5">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ boxShadow: "0 25px 50px rgba(61,75,46,0.08)" }}>
              <video 
                ref={video2Ref}
                src="/videos/dogadan-hasat.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full block"
              />
              <button 
                onClick={() => setUnmutedVideo(unmutedVideo === 2 ? null : 2)}
                className="absolute bottom-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                aria-label="Sesi aç/kapat"
              >
                {unmutedVideo === 2 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text)" }}>
              Bahçeden Tabağa
            </h2>
            <div className="h-[1px] w-12 mb-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-text)" }}>
              Burada önemli olan yalnızca ne piştiği değil, nasıl düşünüldüğü. Bala Bakehouse mutfağı, “evde kendimiz için nasıl yemek yapıyorsak burada da öyle yapıyoruz” fikri üzerine kurulmuş.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-text)" }}>
              Yaz aylarında sebze ve meyvelerin bir kısmı kendi bahçelerinden geliyor. Reçellerin, turşuların, süt reçelinin, vanilya şurubunun ve bazı sosların mutfakta hazırlanması; bu yaklaşımın samimi ama disiplinli bir üretim modeline dönüştüğünü gösteriyor.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
