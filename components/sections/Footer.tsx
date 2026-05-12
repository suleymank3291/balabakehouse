"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { FooterConfig, SiteConfig } from "@/config/site-config";

interface Props {
  marka: string;
  footer: FooterConfig;
  instagram: string;
}

export default function Footer({ marka, footer, instagram }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const marqueeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const fromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight;
      if (fromBottom < 100) setEasterEgg(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LINKS = [
    { label: "Anasayfa", href: "/" },
    { label: "Menü", href: "/menu" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Mevsim Tabakları", href: "/#mevsim" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <footer style={{ background: "var(--color-light)" }} id="iletisim">
      {/* Devasa imza */}
      <div
        className="overflow-hidden border-y"
        style={{ borderColor: "rgba(107,74,43,0.2)" }}
      >
        <h2
          ref={marqueeRef}
          className="whitespace-nowrap py-4 leading-none select-none"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(4rem, 14vw, 14rem)",
            color: "#252621",
            letterSpacing: "0.04em",
            animation: "marquee-footer 20s linear infinite",
          }}
        >
          {marka}&nbsp;&nbsp;&nbsp;&nbsp;{marka}&nbsp;&nbsp;&nbsp;&nbsp;
        </h2>
      </div>

      {/* Main footer block */}
      <div
        className="py-20 px-8 md:px-16"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Sol — Adres & Saatler */}
          <div className="flex flex-col gap-4">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}
            >
              Ziyaret
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "var(--color-light)" }}
            >
              {footer.adres}
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "rgba(236,237,223,0.7)" }}
            >
              {footer.saat}
            </p>
            <div className="h-[1px] w-12 mt-2" style={{ background: "rgba(236,237,223,0.2)" }} />
            <a
              href={`https://www.google.com/maps/search/Mutlukent+Mah+1950+Sk+No+15+Çankaya+Ankara`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors duration-300"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-accent)",
              }}
            >
              Yol Tarifi Al →
            </a>
          </div>

          {/* Orta — Linkler */}
          <div className="flex flex-col gap-4">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}
            >
              Keşfet
            </p>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm group relative w-fit"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  color: "rgba(236,237,223,0.8)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(236,237,223,0.8)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sağ — Instagram & Newsletter */}
          <div className="flex flex-col gap-4">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)" }}
            >
              Mutfaktan
            </p>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
              style={{ fontFamily: "var(--font-caveat)", color: "var(--color-light)" }}
            >
              @balabakehouse
            </a>
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                color: "rgba(236,237,223,0.5)",
              }}
            >
              Mutfaktan, bahçeden, ekmek tezgahından kareler.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              {[
                { label: "Instagram", href: instagram, icon: "◈" },
                { label: "Maps", href: "https://maps.google.com", icon: "◉" },
                { label: "Mail", href: "mailto:merhaba@balabakehouse.com", icon: "◎" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-lg transition-colors duration-300"
                  style={{ color: "rgba(236,237,223,0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(236,237,223,0.5)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p
                className="text-xs mb-3"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  color: "rgba(236,237,223,0.7)",
                }}
              >
                {footer.newsletterMetin}
              </p>
              {submitted ? (
                <p
                  className="text-sm italic"
                  style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-accent)" }}
                >
                  Teşekkürler! Abone oldunuz.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="e-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 300,
                      color: "var(--color-light)",
                      borderBottom: "1px solid rgba(236,237,223,0.3)",
                      paddingBottom: "6px",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 600,
                      background: "var(--color-accent)",
                      color: "var(--color-light)",
                    }}
                  >
                    Abone Ol
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>


        {/* Copyright */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: "1px solid rgba(236,237,223,0.08)" }}
        >
          <p
            className="text-[10px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.3)" }}
          >
            © {new Date().getFullYear()} {marka}&nbsp;&nbsp;·&nbsp;&nbsp;Tüm hakları saklıdır.
          </p>
          <p
            className="text-[10px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.2)" }}
          >
            Hand-crafted in Ankara.
          </p>
        </div>
      </div>

      {/* Easter egg */}
      <div
        className="fixed bottom-6 right-8 pointer-events-none select-none z-[50]"
        style={{
          opacity: easterEgg ? 1 : 0,
          transform: easterEgg ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}
      >
        <span
          className="text-sm"
          style={{
            fontFamily: "var(--font-caveat)",
            color: "var(--color-muted)",
            letterSpacing: "0.05em",
          }}
        >
          afiyet olsun ✦
        </span>
      </div>

      <style>{`
        @keyframes marquee-footer {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
