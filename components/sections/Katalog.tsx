"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StopMotionVideoTile from "@/components/patterns/StopMotionVideoTile";
import type { KatalogConfig } from "@/config/site-config";

interface Props {
  config: KatalogConfig;
}

export default function Katalog({ config }: Props) {
  const [loopFrame, setLoopFrame] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Array.isArray(config.video2)) {
      const interval = setInterval(() => {
        setLoopFrame((f) => (f + 1) % config.video2.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [config.video2]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      [img1Ref, img2Ref, img3Ref, textRef].forEach((r) => {
        if (r.current) { r.current.style.opacity = "1"; r.current.style.transform = "scale(1) none"; }
      });
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (-rect.top) / (rect.height - vh)));
      const entered = rect.top < vh;

      if (img1Ref.current) {
        img1Ref.current.style.transform = `translateY(${progress * -120}px) rotate(-2deg)`;
        img1Ref.current.style.opacity = entered ? String(Math.min(1, (vh - rect.top) / 300)) : "0.3";
      }
      if (img2Ref.current) {
        img2Ref.current.style.transform = `translateY(${progress * -60}px) rotate(1deg)`;
        img2Ref.current.style.opacity = entered ? String(Math.min(1, (vh - rect.top) / 250)) : "0.3";
      }
      if (img3Ref.current) {
        img3Ref.current.style.transform = `translateY(${progress * -180}px) rotate(-1deg)`;
        img3Ref.current.style.opacity = entered ? String(Math.min(1, (vh - rect.top) / 400)) : "0.3";
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${progress * -40}px)`;
        textRef.current.style.opacity = entered ? String(Math.min(1, (vh - rect.top) / 400)) : "0";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menumuz"
      className="relative overflow-hidden"
      style={{
        height: "140vh",
        background: "var(--color-primary)",
      }}
    >
      {/* Görsel 1 — sol üst */}
      <div
        ref={img1Ref}
        className="absolute overflow-hidden"
        style={{
          top: "10%",
          left: "3%",
          width: "clamp(220px, 30vw, 480px)",
          height: "clamp(160px, 45vh, 520px)",
          borderRadius: "24px 8px 24px 8px",
          opacity: 0.3,
          willChange: "transform, opacity",
        }}
      >
        {config.gorsel1.endsWith(".mp4") ? (
          <video
            src={config.gorsel1}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={config.gorsel1}
            alt="Katalog 1"
            fill
            className="object-cover"
            sizes="30vw"
          />
        )}
      </div>

      {/* Görsel 2 — sağ orta */}
      <div
        ref={img2Ref}
        className="absolute overflow-hidden"
        style={{
          top: "30%",
          right: "3%",
          width: "clamp(240px, 35vw, 520px)",
          height: "clamp(200px, 55vh, 600px)",
          borderRadius: "8px 24px 8px 24px",
          opacity: 0.3,
          willChange: "transform, opacity",
        }}
      >
        {Array.isArray(config.video2) ? (
          <div className="w-full h-full relative">
            {config.video2.map((src, fi) => (
              <div
                key={src}
                className="absolute inset-0"
                style={{ opacity: fi === loopFrame ? 1 : 0 }}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="35vw" />
              </div>
            ))}
          </div>
        ) : config.video2.endsWith(".mp4") ? (
          <StopMotionVideoTile src={config.video2} aspectRatio="3/4" className="w-full h-full" />
        ) : (
          <Image src={config.video2 as string} alt="Katalog 2" fill className="object-cover" sizes="35vw" />
        )}
      </div>

      {/* Görsel 3 — sol alt */}
      <div
        ref={img3Ref}
        className="absolute overflow-hidden"
        style={{
          top: "60%",
          left: "12%",
          width: "clamp(180px, 26vw, 400px)",
          height: "clamp(140px, 38vh, 440px)",
          borderRadius: "24px 8px 8px 24px",
          opacity: 0.3,
          willChange: "transform, opacity",
        }}
      >
        {config.gorsel3.endsWith(".mp4") ? (
          <video
            src={config.gorsel3}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={config.gorsel3}
            alt="Katalog 3"
            fill
            className="object-cover"
            sizes="26vw"
          />
        )}
      </div>

      {/* Ortadaki metin */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 text-center"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <p
          className="text-xs tracking-[0.4em] mb-4"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.7)" }}
        >
          {config.eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            lineHeight: 1.0,
            color: "var(--color-light)",
          }}
        >
          {config.anaYazi.replace(config.vurguKelime, "")}
          <em style={{ color: "var(--color-accent)" }}>{config.vurguKelime}</em>
        </h2>
        <p
          className="mt-4 text-sm md:text-base italic"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "rgba(236,237,223,0.7)",
            letterSpacing: "0.15em",
          }}
        >
          {config.altMetin}
        </p>
      </div>

      {/* Marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-4"
        style={{ borderTop: "1px solid rgba(236,237,223,0.1)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase pr-8"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.5)" }}
          >
            {config.marqueeMetin}
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase pr-8"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.5)" }}
          >
            {config.marqueeMetin}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
