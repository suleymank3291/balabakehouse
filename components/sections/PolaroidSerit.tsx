"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FlexBConfig } from "@/config/site-config";

interface Props {
  config: FlexBConfig;
}

const POLAROID_W = 320; // px
const GAP = 40;
const ROTATIONS = [-3, 2, -1.5, 4, -2, 3, -1, 2.5];
const OFFSETS_Y = [0, -20, 10, -10, 20, -5, 15, -15];

export default function PolaroidSerit({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const section = sectionRef.current;
      const strip = stripRef.current;
      if (!section || !strip) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      // İçeriğin gerçek genişliğini (resimler veya yazıdan hangisi uzunsa) alıyoruz
      const contentWidth = strip.scrollWidth;
      const maxTravel = Math.max(0, contentWidth - window.innerWidth);
      
      const tx = prefersReduced ? 0 : -progress * maxTravel;
      strip.style.transform = `translateX(${tx}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Sayfa yüklendiğinde bir kere tetikle
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return <MobilePolaroid config={config} />;
  }

  return (
    <section ref={sectionRef} style={{ height: "320vh", position: "relative" }}>
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center"
        style={{ height: "100svh", background: "#8B5E3C" }}
      >
        {/* Section title (Top) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20">
          <p
            className="text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-inter)", color: "var(--color-brown)", opacity: 0.5 }}
          >
            ✦ &nbsp; mutfaktan kareler &nbsp; ✦
          </p>
        </div>

        {/* Resimler ve Yazı Şeridi (Aynı hızda kayar) */}
        <div
          ref={stripRef}
          className="flex flex-col items-start willChange-transform"
          style={{ paddingLeft: 60, paddingRight: 0 }}
        >
          {/* 1. Üstteki Resimler */}
          <div className="flex items-center gap-10">
            {config.polaroidler.map((item, i) => (
              <PolaroidCard
                key={i}
                gorsel={item.gorsel}
                not={item.not}
                rotate={ROTATIONS[i % ROTATIONS.length]}
                offsetY={OFFSETS_Y[i % OFFSETS_Y.length]}
              />
            ))}
          </div>

          {/* 2. Hemen Alttaki Büyük Yazı */}
          <div className="mt-16 md:mt-24 whitespace-nowrap pr-0">
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                lineHeight: 1,
                color: "var(--color-light)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em"
              }}
            >
              <span style={{ color: "#E5E5CB" }}>✦</span> MUTFAĞIMIZDAN TAZE ÇIKAN HİKAYELER <span style={{ color: "#E5E5CB" }}>✦</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolaroidCard({ gorsel, not, rotate, offsetY }: { gorsel: string; not: string; rotate: number; offsetY: number }) {
  return (
    <div
      className="relative flex-shrink-0 group"
      style={{
        width: POLAROID_W,
        background: "#FAF7F1",
        padding: "14px 14px 40px 14px",
        borderRadius: "2px",
        transform: `translateY(${offsetY}px) rotate(${rotate}deg)`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        transition: "all 0.5s ease",
      }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-brown)] opacity-20" />
      <div className="relative overflow-hidden aspect-square">
        <Image src={gorsel} alt={not} fill className="object-cover" sizes="320px" />
      </div>
      <p className="mt-4 text-center text-xs opacity-40 italic" style={{ fontFamily: "var(--font-caveat)" }}>
        {not}
      </p>
    </div>
  );
}

function MobilePolaroid({ config }: { config: FlexBConfig }) {
  return (
    <section className="py-20 overflow-hidden" style={{ background: "#8B5E3C" }}>
      <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-10 opacity-50">✦ &nbsp; mutfaktan kareler &nbsp; ✦</p>
      
      <div className="flex flex-col gap-12">
        <div className="flex gap-6 overflow-x-auto px-6 pb-6 snap-x">
          {config.polaroidler.map((item, i) => (
            <div key={i} className="flex-shrink-0 snap-center" style={{ width: 260, background: "#FAF7F1", padding: "12px 12px 30px 12px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
              <div className="relative aspect-square"><Image src={item.gorsel} alt={item.not} fill className="object-cover" sizes="260px" /></div>
            </div>
          ))}
        </div>
        
        <div className="px-6 text-center">
          <h2 className="text-4xl font-serif uppercase leading-tight text-[var(--color-light)]">
            <span style={{ color: "#E5E5CB" }}>✦</span> MUTFAĞIMIZDAN TAZE ÇIKAN HİKAYELER <span style={{ color: "#E5E5CB" }}>✦</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
