"use client";

/**
 * Navbar — Logo slotu boş spacer'dır.
 * Görsel logo, Loader.tsx tarafından position:fixed olarak
 * bu slotun üzerinde render edilir. Hiçbir swap yoktur.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CONFIG from "@/config/site-config";

const NAV_LEFT = [
  { label: "Anasayfa", href: "/" },
  { label: "Menümüz", href: "/menu" },
];

const NAV_RIGHT = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onLoaderDone = () => setLinksVisible(true);
    document.addEventListener("bala-loader-done", onLoaderDone);

    const navType = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;
    if (sessionStorage.getItem("bala-loader-seen") && navType !== "reload") setLinksVisible(true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("bala-loader-done", onLoaderDone);
    };
  }, []);

  const textColor = scrolled ? "var(--color-primary)" : (isHome ? "var(--color-light)" : "var(--color-primary)");

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] w-full"
        style={{
          background: scrolled ? "rgba(244,239,230,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(61,75,46,0.08)" : "none",
          padding: scrolled ? "18px 32px" : "28px 32px",
          transition: "background 0.4s ease, padding 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full h-full">
          {/* Sol grup */}
          <div
            className="flex-1 hidden md:flex items-center gap-8 justify-start"
            style={{
              opacity: linksVisible ? 1 : 0,
              transform: linksVisible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {NAV_LEFT.map((item) => (
              <NavLink key={item.href} href={item.href} color={textColor}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Merkez için boş alan (yazıların çakışmaması için) */}
          <div className="flex-shrink-0 w-24 md:w-32 h-full" />

          {/* Sağ grup */}
          <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
            <div
              className="hidden md:flex items-center gap-8"
              style={{
                opacity: linksVisible ? 1 : 0,
                transform: linksVisible ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
              }}
            >
              {NAV_RIGHT.map((item) => (
                <NavLink key={item.href} href={item.href} color={textColor}>
                  {item.label}
                </NavLink>
              ))}
              <RezervasjonBtn scrolled={scrolled} isHome={isHome} />
            </div>

            {/* Hamburger (mobil) */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Menüyü aç"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-6 h-[1.5px]"
                  style={{ background: textColor, transition: "background 0.4s" }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* LOGO SLOT — Navbar'ın tam ortasında, viewport'a göre merkezli */}
        <div
          id="navbar-logo-slot"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 68, height: 68 }}
        />
      </nav>

      {/* Mobil overlay */}
      <div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{
          background: "var(--color-primary)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <button
          className="absolute top-7 right-8 text-[var(--color-light)] text-3xl"
          onClick={() => setMenuOpen(false)}
          aria-label="Kapat"
        >
          ✕
        </button>
        <nav className="flex flex-col items-center gap-10">
          {[...NAV_LEFT, ...NAV_RIGHT, { label: "Sipariş Ver", href: CONFIG?.yemeksepeti || "https://www.yemeksepeti.com/restaurant/w7hu/bala-bakehouse" }].map(
            (item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-fraunces)",
                  color: "var(--color-light)",
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                  display: "block",
                }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}

function NavLink({ href, color, children }: { href: string; color: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm tracking-wide group"
      style={{ fontFamily: "var(--font-inter)", color, transition: "color 0.4s ease" }}
    >
      {children}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] w-0 group-hover:w-full"
        style={{
          background: "var(--color-accent)",
          transformOrigin: "center",
          transition: "width 0.4s cubic-bezier(0.25,1,0.5,1)",
        }}
      />
    </Link>
  );
}

function RezervasjonBtn({ scrolled, isHome }: { scrolled: boolean; isHome: boolean }) {
  const textColor = scrolled ? "var(--color-light)" : (isHome ? "var(--color-light)" : "var(--color-primary)");
  const borderColor = scrolled ? "transparent" : (isHome ? "var(--color-light)" : "var(--color-primary)");

  return (
    <a
      href={CONFIG?.yemeksepeti || "https://www.yemeksepeti.com/restaurant/w7hu/bala-bakehouse"}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-cta
      className="px-5 py-2.5 rounded-full text-sm tracking-widest uppercase"
      style={{
        fontFamily: "var(--font-inter)",
        fontWeight: 600,
        background: scrolled ? "var(--color-accent)" : "transparent",
        color: textColor,
        border: `1px solid ${borderColor}`,
        transition: "background 0.4s ease, color 0.4s ease, border-color 0.4s ease, transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s ease, outline-offset 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(-4px) scale(1.04)";
        el.style.boxShadow = "0 14px 32px rgba(61,75,46,0.22)";
        el.style.outline = "2px solid currentColor";
        el.style.outlineOffset = "4px";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "none";
        el.style.outline = "none";
        el.style.outlineOffset = "0px";
      }}
    >
      Sipariş Ver
    </a>
  );
}
