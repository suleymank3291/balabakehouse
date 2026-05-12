"use client";

/**
 * Loader — Tek element magic-move.
 *
 * Aynı <div> elementi:
 *   1. Stop-motion kare gösterimi (loader1-4, küt swap)
 *   2. loader5 tam ekran
 *   3. Navbar logo slotuna magic-move (top/left/width/height animate)
 *   4. "settled" fazı: küçük fixed logo olarak kalır, navbar üzerinde yaşar
 *
 * Navbar'ın logo slotu boş bir spacer'dır (görsel yok).
 * Loader'ın settled logosu daima onun üzerinde durur — hiçbir swap olmaz.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { LoaderConfig } from "@/config/site-config";

type Phase = "hidden" | "frames" | "animating" | "settled";

interface Props {
  config: LoaderConfig;
}

const LOGO_SIZE = 68;
const NAVBAR_PAD_NORMAL = 28;
const NAVBAR_PAD_SCROLLED = 18;

export default function Loader({ config }: Props) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("hidden");
  const [currentFrame, setCurrentFrame] = useState(0);

  // Overlay container (full-screen during frames + animating)
  const overlayRef = useRef<HTMLDivElement>(null);
  // Logo div — the element that moves from full-screen → navbar
  const logoRef = useRef<HTMLDivElement>(null);
  // Settled logo (rendered separately when overlay is gone)
  const settledRef = useRef<HTMLDivElement>(null);
  // Saved target rect for settled rendering
  const savedRect = useRef<{ top: number; left: number }>({ top: NAVBAR_PAD_NORMAL, left: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navType = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;
    const alreadySeen = sessionStorage.getItem("bala-loader-seen");

    if (alreadySeen && navType !== "reload") {
      // SPA içi navigasyon — loader'ı atla
      setPhase("settled");
      setTimeout(revealPage, 50);
      return;
    }

    // Sayfa yenilendi: önceki flag'i temizle, loader baştan çalışsın
    if (navType === "reload") {
      sessionStorage.removeItem("bala-loader-seen");
    }

    if (prefersReduced) {
      // Show logo briefly, then settle
      setCurrentFrame(4); // jump to loader5
      setPhase("frames");
      setTimeout(() => doMagicMove(), 400);
      return;
    }

    // Preload all images
    config.kareler.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    setPhase("frames");

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame < config.kareler.length) {
        setCurrentFrame(frame);
      } else {
        clearInterval(interval);
        setTimeout(doMagicMove, 80);
      }
    }, config.sureMs);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function doMagicMove() {
    const logo = logoRef.current;
    if (!logo) { settle(); return; }

    // Get target from navbar spacer
    const slot = document.getElementById("navbar-logo-slot");
    const slotRect = slot?.getBoundingClientRect();

    const targetTop = slotRect?.top ?? NAVBAR_PAD_NORMAL;
    const targetLeft = slotRect?.left ?? (window.innerWidth / 2 - LOGO_SIZE / 2);

    savedRect.current = { top: targetTop, left: targetLeft };

    setPhase("animating");

    // Force a layout before transitioning
    logo.getBoundingClientRect();

    logo.style.transition =
      "top 1.1s cubic-bezier(0.65,0,0.35,1), width 1.1s cubic-bezier(0.65,0,0.35,1), height 1.1s cubic-bezier(0.65,0,0.35,1), border-radius 1.1s cubic-bezier(0.65,0,0.35,1)";
    logo.style.top = targetTop + "px";
    logo.style.width = LOGO_SIZE + "px";
    logo.style.height = LOGO_SIZE + "px";
    logo.style.borderRadius = "8px";

    setTimeout(settle, 1100);
  }

  function settle() {
    setPhase("settled");
    sessionStorage.setItem("bala-loader-seen", "true");
    revealPage();
  }

  function revealPage() {
    document.dispatchEvent(new CustomEvent("bala-loader-done"));
    const content = document.querySelector<HTMLElement>(".page-content");
    if (content) {
      content.style.transition = "opacity 0.7s ease-out 0.15s";
      content.style.opacity = "1";
    }
  }

  // Re-reveal page content on navigation back to homepage if already settled
  useEffect(() => {
    if (phase === "settled") {
      setTimeout(revealPage, 50);
    }
  }, [pathname, phase]);

  // Track navbar padding change → settled logo follows
  useEffect(() => {
    if (phase !== "settled") return;

    const el = settledRef.current;
    if (!el) return;

    // Set initial position
    const slot = document.getElementById("navbar-logo-slot");
    if (slot) {
      const r = slot.getBoundingClientRect();
      el.style.top = r.top + "px";
    } else {
      el.style.top = savedRect.current.top + "px";
    }

    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      const targetTop = scrolled ? NAVBAR_PAD_SCROLLED : NAVBAR_PAD_NORMAL;
      el.style.top = targetTop + "px";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase]);

  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      (e.currentTarget as HTMLAnchorElement).style.transform = "translate(-50%, 0) scale(1.06)";
      (e.currentTarget as HTMLAnchorElement).style.boxShadow =
        "0 0 24px 4px rgba(236,237,223,0.25)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      (e.currentTarget as HTMLAnchorElement).style.transform = "translate(-50%, 0) scale(1)";
      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
    },
  };

  // ─── Settled phase: only the small logo ──────────────────────────────────
  if (phase === "settled") {
    return (
      <a
        ref={settledRef as React.Ref<HTMLAnchorElement>}
        href="/"
        aria-label="Bala Bakehouse Anasayfa"
        style={{
          position: "fixed",
          top: savedRect.current.top,
          left: "50%",
          transform: "translate(-50%, 0)",
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          borderRadius: 8,
          overflow: "hidden",
          zIndex: 101,
          display: "block",
          flexShrink: 0,
          transition: "top 0.4s ease, box-shadow 0.4s ease",
        }}
        {...hoverHandlers}
      >
        <Image
          src="/loaders/loader5.png"
          alt="Bala Bakehouse"
          fill
          priority
          className="object-cover"
        />
      </a>
    );
  }

  if (phase === "hidden") return null;

  // ─── Loading / animating: full overlay + moving logo ─────────────────────
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990]"
      style={{ background: "var(--color-light)" }}
    >
      {/* Frames 1-4 */}
      {config.kareler.slice(0, 4).map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === currentFrame && currentFrame < 4 ? 1 : 0,
            transition: "none",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i < 2}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Logo element — starts full-screen, animates to navbar */}
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          overflow: "hidden",
          opacity: currentFrame >= 4 || phase === "animating" ? 1 : 0,
          transition: "none",
        }}
      >
        <Image
          src="/loaders/loader5.png"
          alt="Bala Bakehouse"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
