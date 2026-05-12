"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { FlexAConfig } from "@/config/site-config";

interface Props {
  config: FlexAConfig;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function KelimeKaruseli({ config }: Props) {
  const { kelimeler } = config;
  const N = kelimeler.length;

  const sectionRef = useRef<HTMLElement>(null);
  // raw progress 0→1
  const progressRef = useRef(0);
  const frameRef = useRef<number>(0);

  // Current word index + transition progress (0→1 within transition zone)
  const [wordIdx, setWordIdx] = useState(0);
  const [trans, setTrans] = useState(0);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 768px)").matches;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setWordIdx(0); setTrans(0);
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));
      progressRef.current = raw;

      // Map 0→1 to N word slots
      const wp = raw * N;
      const idx = Math.min(Math.floor(wp), N - 1);
      const t = wp % 1;

      setWordIdx(idx);
      setTrans(t);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  // Compute exit style for current word (0→1 means transitioning OUT)
  const TRANS_START = 0.6; // transition begins at 60% through a word's slot
  const transNorm = Math.max(0, (trans - TRANS_START) / (1 - TRANS_START));
  const nextNorm = Math.max(0, (trans - 0) / TRANS_START); // entering: 0→1 during first 60%

  const isTransitioning = trans > TRANS_START && wordIdx < N - 1;
  const nextIdx = Math.min(wordIdx + 1, N - 1);

  // Exit: current word falls forward-down
  const exitRotX = lerp(0, -25, transNorm);
  const exitTransY = lerp(0, -60, transNorm);
  const exitOpacity = lerp(1, 0, transNorm);

  // Enter: next word comes from below
  const enterRotX = isTransitioning ? lerp(25, 0, transNorm) : 25;
  const enterTransY = isTransitioning ? lerp(80, 0, transNorm) : 80;
  const enterOpacity = isTransitioning ? lerp(0, 1, transNorm) : 0;

  const current = kelimeler[wordIdx];
  const next = kelimeler[nextIdx];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${N * 100 + 100}vh`, position: "relative" }}
    >
      <div
        className="sticky top-0 overflow-hidden flex items-center justify-center"
        style={{
          height: "100svh",
          background: "var(--color-light)",
          perspective: "1200px",
        }}
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 overflow-hidden rounded-full"
          style={{ width: 80, height: 1, background: "rgba(61,75,46,0.15)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${((wordIdx + trans) / N) * 100}%`,
              background: "var(--color-accent)",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-6 right-8"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-muted)", fontSize: "0.75rem", letterSpacing: "0.1em" }}
        >
          {String(wordIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>

        {/* ─── Current word ─── */}
        <WordCard
          kelime={current.kelime}
          gorsel={current.gorsel}
          gorselKonum={current.gorselKonum}
          rotX={exitRotX}
          transY={exitTransY}
          opacity={exitOpacity}
        />

        {/* ─── Next word (only during transition) ─── */}
        {isTransitioning && (
          <WordCard
            kelime={next.kelime}
            gorsel={next.gorsel}
            gorselKonum={next.gorselKonum}
            rotX={enterRotX}
            transY={enterTransY}
            opacity={enterOpacity}
          />
        )}
      </div>
    </section>
  );
}

function WordCard({
  kelime,
  gorsel,
  gorselKonum,
  rotX,
  transY,
  opacity,
}: {
  kelime: string;
  gorsel: string;
  gorselKonum: "sol" | "sag";
  rotX: number;
  transY: number;
  opacity: number;
}) {
  const isRight = gorselKonum === "sag";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity,
        transform: `translateY(${transY}px) rotateX(${rotX}deg)`,
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }}
    >
      <div
        className={`flex items-center gap-12 md:gap-20 ${
          isRight ? "flex-row" : "flex-row-reverse"
        } px-8 md:px-16`}
      >
        {/* Görsel */}
        <div
          className="hidden md:block relative overflow-hidden flex-shrink-0"
          style={{
            width: "clamp(160px, 18vw, 280px)",
            height: "clamp(200px, 24vw, 360px)",
            borderRadius: "12px 24px 12px 24px",
          }}
        >
          <Image
            src={gorsel}
            alt={kelime}
            fill
            className="object-cover"
            sizes="20vw"
          />
        </div>

        {/* Kelime */}
        <div className="flex flex-col">
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(4rem, 14vw, 13rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--color-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {kelime}
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
