"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { HeroConfig } from "@/config/site-config";

interface Props {
  config: HeroConfig;
}

export default function Hero({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateIn = () => {
      if (prefersReduced) {
        [line1Ref, line2Ref, line3Ref, eyebrowRef, subtextRef, ctaRef].forEach((r) => {
          if (r.current) r.current.style.opacity = "1";
        });
        return;
      }

      const els = [
        { el: eyebrowRef.current, delay: 0 },
        { el: line1Ref.current, delay: 200 },
        { el: line2Ref.current, delay: 350 },
        { el: line3Ref.current, delay: 500 },
        { el: subtextRef.current, delay: 650 },
        { el: ctaRef.current, delay: 800 },
      ];

      els.forEach(({ el, delay }) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(32px)";
        el.style.transition = "none";
        setTimeout(() => {
          el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 50);
      });
    };

    if (sessionStorage.getItem("bala-loader-seen")) {
      animateIn();
    } else {
      document.addEventListener("bala-loader-done", animateIn, { once: true });
    }

    // Parallax on scroll
    const onScroll = () => {
      if (!imgRef.current || !sectionRef.current) return;
      const progress = window.scrollY / window.innerHeight;
      imgRef.current.style.transform = `translateY(${progress * 30}%)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic CTA
  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.min(Math.max((e.clientX - cx) * 0.25, -15), 15);
    const dy = Math.min(Math.max((e.clientY - cy) * 0.25, -15), 15);
    e.currentTarget.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleCtaLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", background: "var(--color-primary)" }}
    >
      {/* Background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full"
        style={{ height: "130%", top: "-15%", willChange: "transform" }}
      >
        <Image
          src={config.arkaplan}
          alt="Bala Bakehouse"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(61,75,46,0.55) 0%, rgba(61,75,46,0.2) 50%, transparent 100%)",
          }}
        />
      </div>


      {/* Text block — left-bottom */}
      <div className="absolute bottom-[12vh] md:bottom-[15vh] left-8 md:left-12 lg:left-20 max-w-2xl z-10">
        <p
          ref={eyebrowRef}
          className="text-xs tracking-[0.4em] opacity-0 mb-6"
          style={{
            fontFamily: "var(--font-inter)",
            color: "var(--color-light)",
            letterSpacing: "0.4em",
          }}
        >
          ✦ {config.eyebrow}
        </p>
        <h1
          className="leading-[0.95] tracking-tight"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
          }}
        >
          <span
            ref={line1Ref}
            className="block opacity-0"
            style={{ color: "var(--color-light)", fontStyle: "normal" }}
          >
            {config.baslikSatir1}
          </span>
          <span
            ref={line2Ref}
            className="block opacity-0"
            style={{ color: "var(--color-light)", fontStyle: "italic" }}
          >
            {config.baslikSatir2}
          </span>
          <span
            ref={line3Ref}
            className="block opacity-0"
            style={{ color: "var(--color-accent)", fontStyle: "italic" }}
          >
            {config.baslikSatir3}
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="mt-6 text-sm md:text-base leading-relaxed opacity-0 max-w-[480px]"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "rgba(236,237,223,0.8)",
          }}
        >
          {config.altMetin}
        </p>
      </div>

      {/* CTA — vertically centered, right side */}
      <a
        ref={ctaRef}
        href="/menu"
        data-cursor-cta
        className="absolute top-1/2 -translate-y-1/2 right-[10%] md:right-[8%] w-36 h-36 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center gap-2 opacity-0 group"
        style={{
          background: "rgba(236,237,223,0.12)",
          border: "1px solid rgba(236,237,223,0.5)",
          backdropFilter: "blur(12px)",
          transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1), background 0.4s ease, border-color 0.4s ease",
        }}
        onMouseMove={handleCtaMove}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "#ECEDDF";
          el.style.borderColor = "#ECEDDF";
          el.querySelectorAll("span").forEach((s) => (s.style.color = "#252621"));
        }}
        onMouseLeave={(e) => {
          handleCtaLeave(e);
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgba(236,237,223,0.12)";
          el.style.borderColor = "rgba(236,237,223,0.5)";
          el.querySelectorAll("span").forEach((s) => (s.style.color = "var(--color-light)"));
        }}
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-center leading-tight"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-light)", transition: "color 0.4s ease" }}
        >
          {config.ctaButon}
        </span>
        <span style={{ color: "var(--color-light)", fontSize: "1.2rem", transition: "color 0.4s ease" }}>↓</span>
      </a>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="w-[1px] h-12 relative overflow-hidden"
          style={{ background: "rgba(236,237,223,0.2)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              background: "var(--color-light)",
              animation: "scroll-drip 2s ease-in-out infinite",
              height: "40%",
            }}
          />
        </div>
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.5)" }}
        >
          kaydır
        </span>
      </div>

      <style>{`
        @keyframes scroll-drip {
          0% { transform: translateY(-100%); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
