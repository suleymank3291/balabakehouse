"use client";

import { useEffect, useRef } from "react";
import type { KarsilamaConfig } from "@/config/site-config";

interface CharItem {
  char: string;
  isVurgu: boolean;
  color?: string;
  delay: number;
}

function buildTimeline(metin: string, vurguKelimeler: string[]): CharItem[] {
  const COLOR_MAP: Record<string, string> = {
    "ev mutfağı": "#6E7D00",
    "ekmek mayalanmaya": "#8B5E3C",
  };

  const escaped = vurguKelimeler.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const segments = metin.split(pattern);
  const chars: CharItem[] = [];
  let t = 0;

  segments.forEach((seg) => {
    const isVurgu = vurguKelimeler.includes(seg);
    const speed = isVurgu ? 90 : 35;
    const color = COLOR_MAP[seg] || "var(--color-accent)";

    if (isVurgu) t += 150; // pause before emphasis

    for (const ch of seg) {
      chars.push({ char: ch, isVurgu, color, delay: t });
      t += speed;
      if (ch === ".") t += 250;
      if (ch === ",") t += 60;
    }

    if (isVurgu) t += 150; // pause after emphasis
  });

  return chars;
}

interface Props {
  config: KarsilamaConfig;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
}

export default function Karsilama({ config, className, style, contentClassName }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const caretRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const triggered = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const chars = buildTimeline(config.metin, config.vurguKelimeler);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Just fade in everything at once
      charRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true;
            observer.disconnect();
            startTypewriter();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      timeouts.current.forEach(clearTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startTypewriter() {
    const caret = caretRef.current;
    const container = containerRef.current;

    chars.forEach(({ delay }, i) => {
      const t = setTimeout(() => {
        const el = charRefs.current[i];
        if (!el) return;

        el.style.transition =
          "opacity 80ms ease-out, transform 80ms cubic-bezier(0.25,1,0.5,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";

        // Move caret after this char
        if (caret && container) {
          const charRect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          caret.style.left = charRect.right - containerRect.left + "px";
          caret.style.top = charRect.top - containerRect.top + "px";
          caret.style.height = charRect.height + "px";
          caret.style.opacity = "0.7";
        }

        // On last char: fade caret out
        if (i === chars.length - 1) {
          const t2 = setTimeout(() => {
            if (caret) {
              caret.style.transition = "opacity 800ms ease";
              caret.style.opacity = "0";
            }
          }, 400);
          timeouts.current.push(t2);
        }
      }, delay);

      timeouts.current.push(t);
    });
  }

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        minHeight: "90vh",
        padding: "18vh 12vw",
        background: "var(--color-light)",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {/* Left accent line */}
      <div
        className="absolute"
        style={{
          left: "6vw",
          top: "15%",
          bottom: "15%",
          width: "1px",
          background: "var(--color-accent)",
          opacity: 0.35,
        }}
      />

      {/* Screen reader text */}
      <p className="sr-only">{config.metin}</p>

      <div className={`relative w-full ${contentClassName || "max-w-5xl"}`}>
        <p
          ref={containerRef}
          aria-hidden
          className="relative leading-[1.25]"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(1.8rem, 4vw, 4rem)",
            color: "var(--color-text)",
          }}
        >
          {chars.map(({ char, isVurgu, color }, i) => (
            <span
              key={i}
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              style={{
                display: "inline",
                opacity: 0,
                transform: `translateY(6px) scale(${isVurgu ? 0.92 : 1})`,
                color: isVurgu ? color : "var(--color-text)",
                fontStyle: isVurgu ? "italic" : "normal",
                textDecoration: "none",
                willChange: "opacity, transform",
              }}
            >
              {char}
            </span>
          ))}

          {/* Blinking caret */}
          <span
            ref={caretRef}
            aria-hidden
            style={{
              position: "absolute",
              width: "2px",
              background: "var(--color-accent)",
              opacity: 0,
              borderRadius: "1px",
              animation: "caret-blink 0.6s step-end infinite",
              pointerEvents: "none",
            }}
          />
        </p>
      </div>

      <style>{`
        @keyframes caret-blink {
          50% { opacity: 0 !important; }
        }
      `}</style>
    </section>
  );
}
