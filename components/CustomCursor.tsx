"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    };

    const onEnter = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.borderColor = "var(--color-accent)";
    };

    const onLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "var(--color-primary)";
      ring.style.background = "transparent";
      ring.style.opacity = "0.5";
      dot.style.opacity = "1";
    };

    const onCtaEnter = () => {
      ring.style.width = "80px";
      ring.style.height = "80px";
      ring.style.borderColor = "var(--color-accent)";
      ring.style.background = "rgba(139,46,42,0.1)";
      ring.style.opacity = "0.9";
      dot.style.opacity = "0";
    };

    let raf: number;
    const animate = () => {
      rx += (mx - rx - 14) * 0.12;
      ry += (my - ry - 14) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const attachListeners = () => {
      document.querySelectorAll("[data-cursor-cta]").forEach((el) => {
        el.removeEventListener("mouseenter", onCtaEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onCtaEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      document.querySelectorAll("a:not([data-cursor-cta]), button:not([data-cursor-cta]), [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--color-primary)] pointer-events-none z-[9999] mix-blend-multiply"
        style={{ transition: "opacity 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[var(--color-primary)] pointer-events-none z-[9999]"
        style={{
          width: "28px",
          height: "28px",
          opacity: 0.5,
          transition: "width 0.35s cubic-bezier(0.25,1,0.5,1), height 0.35s cubic-bezier(0.25,1,0.5,1), border-color 0.3s, background 0.3s, opacity 0.3s",
        }}
      />
    </>
  );
}
