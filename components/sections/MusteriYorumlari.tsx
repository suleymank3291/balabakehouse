"use client";

import { useEffect, useRef, useState } from "react";
import type { YorumKart } from "@/config/site-config";

interface Props {
  yorumlar: YorumKart[];
}

/**
 * 20 yorumun tamamı ekranda kalacağı için birbirini kapatmayacak,
 * tüm ekranı kapsayan (5 sütun x 4 satır gibi) bir ızgara düzeni.
 */
const DISTRIBUTED_POSITIONS = [
  // Satır 1
  { top: "18%", left: "10%", rotate: -2 },
  { top: "20%", left: "28%", rotate: 3 },
  { top: "16%", left: "46%", rotate: -1 },
  { top: "22%", left: "64%", rotate: 2 },
  { top: "19%", left: "82%", rotate: -3 },
  // Satır 2
  { top: "38%", left: "12%", rotate: 3 },
  { top: "35%", left: "30%", rotate: -2 },
  { top: "42%", left: "48%", rotate: 1 },
  { top: "33%", left: "66%", rotate: -3 },
  { top: "39%", left: "84%", rotate: 2 },
  // Satır 3
  { top: "55%", left: "10%", rotate: -1 },
  { top: "58%", left: "28%", rotate: 3 },
  { top: "52%", left: "46%", rotate: -2 },
  { top: "57%", left: "64%", rotate: 1 },
  { top: "60%", left: "82%", rotate: -3 },
  // Satır 4
  { top: "75%", left: "12%", rotate: 2 },
  { top: "72%", left: "30%", rotate: -1 },
  { top: "78%", left: "48%", rotate: 3 },
  { top: "74%", left: "66%", rotate: -2 },
  { top: "76%", left: "84%", rotate: 1 },
];

export default function MusteriYorumlari({ yorumlar }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = rect.height;
      
      const totalScrollable = sectionHeight - vh;
      const progress = Math.max(0, Math.min(1, (-rect.top + 2) / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "800vh" }} // Dev mesafe: Yavaş ve tane tane akış için
    >
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--color-light)] z-50"
      >
        
        {/* Başlık */}
        <div 
          className="text-center z-20 transition-all duration-1000"
          style={{ 
            opacity: scrollProgress > 0.02 ? 0.15 : 1,
            transform: `translateY(${scrollProgress > 0.02 ? -20 : 0}px)`
          }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4 text-[var(--color-brown)]">MİSAFİRLERİMİZDEN</p>
          <h2 className="font-serif text-4xl md:text-6xl text-[var(--color-text)]">Bala&apos;da bir gün.</h2>
        </div>

        {/* Yorum Kartları Alanı */}
        <div className="absolute inset-0 z-10">
          {yorumlar.slice(0, 20).map((yorum, i) => {
            const totalItems = 20;

            // Giriş zamanları: 0.1'den 0.8'e kadar çok geniş yayılmış
            const start = 0.1 + (i * (0.7 / totalItems));
            // Kalma süresi: Çok uzun (%40 scroll mesafesi)
            const isLastBatch = i >= totalItems - 8;
            const end = isLastBatch ? 1.5 : start + 0.4;
            
            let opacity = 0;
            let scale = 0;
            let blur = 10;
            let yOffset = 30;

            if (scrollProgress >= start) {
              if (scrollProgress <= end) {
                // Sahneye giriş (Çok yavaş ve süzülerek)
                const popProgress = Math.min(1, (scrollProgress - start) / 0.08);
                opacity = popProgress;
                scale = 0.6 + (popProgress * 0.4);
                blur = 10 - (popProgress * 10);
                yOffset = 30 - (popProgress * 30);
              } else {
                // Sahneden çıkış (İnanılmaz yavaş ve akışkan)
                const fadeOutProgress = Math.min(1, (scrollProgress - end) / 0.2);
                opacity = 1 - fadeOutProgress;
                scale = 1 - (fadeOutProgress * 0.4);
                blur = fadeOutProgress * 10;
                yOffset = -fadeOutProgress * 20;
              }
            }

            const pos = DISTRIBUTED_POSITIONS[i % DISTRIBUTED_POSITIONS.length];

            return (
              <div
                key={i}
                className="absolute transition-all duration-1200 ease-out pointer-events-none"
                style={{
                  top: pos.top,
                  left: pos.left,
                  opacity: opacity,
                  transform: `scale(${scale}) rotate(${pos.rotate}deg) translateY(${yOffset}px)`,
                  filter: `blur(${blur}px)`,
                  width: "260px", 
                  zIndex: i + 10,
                }}
              >
                <MiniYorumKarti yorum={yorum} />
              </div>
            );
          })}
        </div>

        {/* Alt Bilgi */}
        <div 
          className="absolute bottom-12 text-center transition-all duration-700"
          style={{ 
            opacity: scrollProgress > 0.9 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.9 ? 0 : 20}px)`
          }}
        >
          <p className="font-serif italic text-[var(--color-muted)] mb-4">Sen de paylaş.</p>
          <a 
            href="https://g.page/r/CWO-Q0W5FNxFEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white text-xs tracking-widest uppercase"
          >
            Google&apos;da Yorum Yaz
          </a>
        </div>
      </div>
    </section>
  );
}

function MiniYorumKarti({ yorum }: { yorum: YorumKart }) {
  return (
    <div
      className="p-4 rounded-xl shadow-2xl"
      style={{
        background: yorum.kartArkaplan,
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className="text-2xl font-serif opacity-30 mb-1" style={{ color: yorum.yazıRengi }}>&quot;</div>
      <p
        className="font-serif italic leading-snug mb-4"
        style={{
          fontSize: "0.95rem",
          color: yorum.yazıRengi,
        }}
      >
        {yorum.metin}
      </p>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: yorum.yazıRengi }}>{yorum.isim}</p>
          <div className="text-[10px] mt-1" style={{ color: "var(--color-accent)" }}>{"★".repeat(yorum.puan)}</div>
        </div>
        <p className="text-[9px] opacity-40 uppercase" style={{ color: yorum.yazıRengi }}>{yorum.tarih}</p>
      </div>
    </div>
  );
}
