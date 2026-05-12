"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import YakinUzakHover from "@/components/patterns/YakinUzakHover";
import type { UrunKart } from "@/config/site-config";

interface Props {
  urunler: UrunKart[];
}

const OFFSETS = [
  { x: -60, y: 0, delay: 0 },
  { x: 0, y: 80, delay: 0.15 },
  { x: 0, y: -50, delay: 0.3 },
  { x: 60, y: 0, delay: 0.45 },
];

const CARD_RADIUS = [
  "8px 32px 8px 8px",
  "8px 8px 32px 8px",
  "32px 8px 8px 8px",
  "8px 8px 8px 32px",
];

export default function OneCikanlar({ urunler }: Props) {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx < 0) return;
            const { delay } = OFFSETS[idx];
            const el = entry.target as HTMLDivElement;
            setTimeout(() => {
              el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)`;
              el.style.opacity = "1";
              el.style.transform = "translateX(0) translateY(0)";
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-40 overflow-hidden" style={{ background: "#8B5E3C" }}>
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <p
          className="text-xs tracking-[0.3em] mb-4"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-light)", opacity: 0.8 }}
        >
          ✦&nbsp;&nbsp;Mutfaktan İmza Tabaklar&nbsp;&nbsp;✦
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--color-light)",
          }}
        >
          Tabağa Düşen Hikâyeler
          <span style={{ color: "var(--color-accent)" }}>.</span>
        </h2>
      </div>

      {/* Cards grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 items-start">
        {urunler.map((urun, i) => {
          const { x, y } = OFFSETS[i];
          const mdOffset = i === 1 ? "md:mt-20" : i === 2 ? "md:-mt-10" : "";

          return (
            <div
              key={urun.no}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              className={`group flex flex-col ${mdOffset}`}
              style={{
                opacity: 0,
                transform: `translateX(${x}px) translateY(${y}px)`,
                willChange: "opacity, transform",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                card.style.transform = "translateY(-8px)";
                card.style.transition = "transform 0.5s cubic-bezier(0.25,1,0.5,1)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLDivElement;
                card.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  borderRadius: CARD_RADIUS[i],
                  boxShadow: "0 25px 50px rgba(61,75,46,0.08)",
                }}
              >
                {/* Caveat number */}
                <span
                  className="absolute top-3 left-3 z-10 text-sm"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    color: "var(--color-light)",
                    background: "rgba(61,75,46,0.4)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {urun.no}
                </span>

                <YakinUzakHover
                  uzakSrc={urun.uzakGorsel}
                  yakinSrc={urun.yakinGorsel}
                  alt={urun.isim}
                  className="absolute inset-0"
                />
              </div>

              {/* Info */}
              <div className="mt-4 px-1">
                <h3
                  className="font-serif italic text-xl md:text-2xl transition-colors duration-500 group-hover:text-[var(--color-accent)]"
                  style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-light)" }}
                >
                  {urun.isim}
                </h3>
                <div
                  className="h-[1px] my-2 transition-all duration-500 group-hover:w-full"
                  style={{ background: "var(--color-brown)", opacity: 0.3, width: "40%" }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "rgba(236,237,223,0.7)" }}
                >
                  {urun.aciklama}
                </p>
                <Link
                  href={urun.link}
                  className="inline-flex items-center gap-1 mt-3 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600, color: "var(--color-accent)" }}
                >
                  İncele →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative SVG */}
      <div
        className="absolute right-8 bottom-8 pointer-events-none select-none"
        style={{ opacity: 0.07 }}
        aria-hidden
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="60" rx="8" ry="40" stroke="var(--color-primary)" strokeWidth="1.5" />
          <ellipse cx="100" cy="60" rx="8" ry="40" stroke="var(--color-primary)" strokeWidth="1.5" transform="rotate(30 100 60)" />
          <ellipse cx="100" cy="60" rx="8" ry="40" stroke="var(--color-primary)" strokeWidth="1.5" transform="rotate(-30 100 60)" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="var(--color-primary)" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
