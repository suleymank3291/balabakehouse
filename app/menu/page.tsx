"use client";

import { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CONFIG from "@/config/site-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── VERİ ──────────────────────────────────────────────────────────────────

type KahvaltiItem = {
  isim: string;
  aciklama: string;
  fiyat: number;
  gorsel: string;
  gorselSag: boolean;
};

type KahveItem = { isim: string; fiyat: number };
type IcecekItem = { isim: string; fiyat: number };

const KAHVALTILAR: KahvaltiItem[] = [
  {
    isim: "Avokadolu Çırpılmış Yumurta",
    aciklama: "Ekşi maya ekmek üzeri çırpılmış yumurta, peynir, zeytin, domates ve bahçe salatası",
    fiyat: 400,
    gorsel: "/menu/avokadolu.png",
    gorselSag: true,
  },
  {
    isim: "Trüflü Çırpılmış Yumurta",
    aciklama: "Ekşi maya ekmek üzeri trüflü çırpılmış yumurta, parmesan, peynir, zeytin, ızgara mantar, ızgara domates ve bahçe salatası",
    fiyat: 430,
    gorsel: "/menu/truflu.png",
    gorselSag: false,
  },
  {
    isim: "English Breakfast",
    aciklama: "Frankfurter dana sosis, dana bacon, elma dilim patates, ızgara domates, ızgara mantar, göz yumurta, ekşi maya ekmek",
    fiyat: 500,
    gorsel: "/menu/english-breakfast.png",
    gorselSag: true,
  },
  {
    isim: "Eggs Benedict",
    aciklama: "Brioche ekmeği üzerine dana bacon, poşe yumurta, hollandaise sos, yeşil soğan, kekik",
    fiyat: 480,
    gorsel: "/menu/eggs-benedict.jpg",
    gorselSag: false,
  },
  {
    isim: "Kahvaltı Kasesi",
    aciklama: "Haşlanmış yumurta, avokado, peynir, zeytin, bahçe salatası, domates, siyez ekmeği, zeytinyağı, kabak çekirdeği",
    fiyat: 400,
    gorsel: "/menu/kahvalti-kasesi.png",
    gorselSag: true,
  },
  {
    isim: "Çılbır",
    aciklama: "İsli sarımsaklı yoğurt, poşe yumurta, tereyağlı biberli sos, dereotu, nane, acı biber iplikleri, ekşi maya ekmek",
    fiyat: 400,
    gorsel: "/menu/cilbir.png",
    gorselSag: false,
  },
  {
    isim: "Humuslu Poşe",
    aciklama: "Humus, zeytinyağlı baharatlı ızgara domates, ızgara padron biberi, poşe yumurta, ekşi maya ekmek",
    fiyat: 430,
    gorsel: "/menu/humuslu-pose.png",
    gorselSag: true,
  },
  {
    isim: "Granola Kasesi",
    aciklama: "Süzme yoğurt, karabuğdaylı yulaflı granola, fıstık ezmesi, bal, kabak çekirdeği ve mevsim meyveleri",
    fiyat: 300,
    gorsel: "/menu/granola-kasesi.png",
    gorselSag: false,
  },
];

const KAHVALTI_EKSTRALAR = [
  "Yumurta +30",
  "Organik yumurta +50",
  "Frankfurter sosis +100",
  "Yarım avokado +80",
  "Peynir tabağı +250",
  "Söğüş tabağı +150",
];

type Sandvic = { isim: string; aciklama: string };
const SANDVICLER: Sandvic[] = [
  {
    isim: "Hindi Füme",
    aciklama: "Karamelize soğan, avokadolu özel sos, krem peynir",
  },
  {
    isim: "Tiftik Eti",
    aciklama: "Kendi yapımımız acı biber reçeli, cheddar, çıtır soğan",
  },
  {
    isim: "Roastbeef",
    aciklama: "Pesto, mozarella, roka",
  },
];

const KAHVE_SICAK: KahveItem[] = [
  { isim: "Espresso", fiyat: 110 },
  { isim: "Double Espresso", fiyat: 130 },
  { isim: "Americano", fiyat: 190 },
  { isim: "Latte", fiyat: 220 },
  { isim: "Cappucino", fiyat: 200 },
  { isim: "Cortado", fiyat: 190 },
  { isim: "Flat White", fiyat: 190 },
  { isim: "Vanilya Latte", fiyat: 250 },
  { isim: "Caramel Latte", fiyat: 250 },
  { isim: "Mocha", fiyat: 250 },
  { isim: "White Mocha", fiyat: 250 },
  { isim: "Filtre Kahve", fiyat: 190 },
  { isim: "Decaf (Kafeinsiz)", fiyat: 250 },
];

const MATCHA_SICAK: IcecekItem[] = [
  { isim: "Matcha Latte", fiyat: 260 },
  { isim: "Vanilya Matcha Latte", fiyat: 290 },
];

const MATCHA_SOGUK: IcecekItem[] = [
  { isim: "Ice Matcha Latte", fiyat: 280 },
  { isim: "Ice Strawberry Matcha Latte", fiyat: 310 },
  { isim: "Ice Vanilya Matcha Latte", fiyat: 310 },
  { isim: "Coconut Cloud Matcha", fiyat: 350 },
  { isim: "Strawberry Cream Matcha", fiyat: 330 },
  { isim: "Chocolate Cream Matcha", fiyat: 330 },
  { isim: "White Chocolate Cream Matcha", fiyat: 330 },
  { isim: "Matchagato", fiyat: 320 },
];

const SOGUK_CAYLAR: IcecekItem[] = [
  { isim: "Buzlu Reyhan", fiyat: 210 },
  { isim: "Çilek-Lime-Melisa", fiyat: 210 },
  { isim: "Şeftali-Limon-Rooibos", fiyat: 210 },
];

// ─── KATEGORİ TANIMI ───────────────────────────────────────────────────────

const KATEGORILER = [
  { slug: "kahvalti", isim: "Kahvaltı",  renk: "#252621" },
  { slug: "sandvic",  isim: "Sandviçler", renk: "#3C2A21" },
  { slug: "kahve",    isim: "Kahve",      renk: "#6E7D00" },
  { slug: "icecek",   isim: "İçecekler",  renk: "#1A2C42" },
];

const N = KATEGORILER.length;

// ─── ALT BİLEŞENLER ───────────────────────────────────────────────────────

function KahvaltiKarti() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".zigzag-item");
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    const ekstra = sectionRef.current.querySelector(".ekstralar-blok");
    if (ekstra) {
      gsap.fromTo(
        ekstra,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ekstra,
            start: "top 90%",
            once: true,
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll()
        .filter((t) => {
          const trigger = t.vars?.trigger as Element | undefined;
          return trigger && sectionRef.current?.contains(trigger);
        })
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full px-6 md:px-14 py-14 md:py-20"
      style={{ background: "#ECEDDF", color: "#252621" }}
    >
      {/* Başlık */}
      <div className="mb-4">
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "var(--font-inter)", color: "#6B7260", fontWeight: 600 }}
        >
          Farm to Table · Bala Bakehouse
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(4rem, 11vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: "#252621",
          }}
        >
          KAHVALTI
        </h2>
        <p
          className="mt-4 text-sm"
          style={{ fontFamily: "var(--font-inter)", color: "#6B7260", fontStyle: "italic" }}
        >
          Kahvaltı servisimiz saat{" "}
          <span style={{ fontWeight: 600, color: "#252621" }}>14:30&rsquo;a</span> kadar devam etmektedir.
        </p>
        <div className="mt-5 h-[2px] w-20" style={{ background: "#3D4B2E" }} />
      </div>

      {/* Zigzag Yemek Listesi */}
      <div className="mt-14 flex flex-col gap-0">
        {KAHVALTILAR.map((item) => (
          <div
            key={item.isim}
            className={`zigzag-item flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 border-b ${
              item.gorselSag ? "" : "md:flex-row-reverse"
            }`}
            style={{ borderColor: "rgba(37,38,33,0.1)" }}
          >
            {/* Daire Görsel */}
            <div
              className="shrink-0 relative"
              style={{
                width: "clamp(120px, 18vw, 200px)",
                height: "clamp(120px, 18vw, 200px)",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(37,38,33,0.12)",
                flexShrink: 0,
              }}
            >
              <Image
                src={item.gorsel}
                alt={item.isim}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Metin */}
            <div className={`flex-1 ${item.gorselSag ? "md:pr-8" : "md:pl-8"}`}>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  color: "#252621",
                  lineHeight: 1.15,
                }}
              >
                {item.isim}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  color: "#4A4840",
                  maxWidth: "46ch",
                }}
              >
                {item.aciklama}
              </p>
              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#3D4B2E",
                  letterSpacing: "0.02em",
                }}
              >
                {item.fiyat}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ekstralar */}
      <div
        className="ekstralar-blok mt-10 pt-8"
        style={{ borderTop: "1px solid rgba(37,38,33,0.08)" }}
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-inter)", color: "#6B7260", fontWeight: 600 }}
        >
          Ekstralar
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {KAHVALTI_EKSTRALAR.map((e) => (
            <span
              key={e}
              className="text-sm"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                color: "#4A4840",
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SandvicKarti() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector(".sandvic-inner");
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
    const items = sectionRef.current.querySelectorAll(".sandvic-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full px-6 md:px-14 py-14 md:py-20"
      style={{ background: "#3C2A21", color: "#ECEDDF" }}
    >
      {/* Başlık */}
      <div className="mb-12">
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(236,237,223,0.45)", fontWeight: 600 }}
        >
          Kendi fırınımızdan
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#ECEDDF",
          }}
        >
          EKŞİ MAYA
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "#8B2E2A",
            }}
          >
            Sandviçleri
          </em>
        </h2>
        <div className="mt-5 h-[2px] w-20" style={{ background: "#8B2E2A" }} />
      </div>

      {/* Resim + Sandviçler */}
      <div className="sandvic-inner flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
        {/* Sol — Görsel (orijinal 3:4 oran korunur) */}
        <div
          className="shrink-0 rounded-2xl overflow-hidden"
          style={{
            maxWidth: "clamp(220px, 32vw, 380px)",
            boxShadow: "0 16px 64px rgba(0,0,0,0.3)",
          }}
        >
          <Image
            src="/menu/sandvic-main.jpg"
            alt="Ekşi Maya Sandviçleri"
            width={1440}
            height={1920}
            style={{ width: "100%", height: "auto", display: "block" }}
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>

        {/* Sağ — Sandviç Listesi */}
        <div className="flex-1 flex flex-col justify-center gap-8">
          {SANDVICLER.map((s, i) => (
            <div
              key={s.isim}
              className="sandvic-item pb-8"
              style={{
                borderBottom: i < SANDVICLER.length - 1 ? "1px solid rgba(236,237,223,0.12)" : "none",
              }}
            >
              <div className="mb-2">
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                    fontWeight: 700,
                    color: "#ECEDDF",
                    lineHeight: 1.1,
                  }}
                >
                  {s.isim}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  color: "rgba(236,237,223,0.65)",
                }}
              >
                {s.aciklama}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiftik burger destekleyici görsel küçük kartı */}
      <div
        className="mt-14 flex items-center gap-4 pt-8"
        style={{ borderTop: "1px solid rgba(236,237,223,0.1)" }}
      >
        <div
          className="relative rounded-xl overflow-hidden shrink-0"
          style={{ width: 72, height: 72 }}
        >
          <Image
            src="/menu/tiftikli-burger.png"
            alt="Tiftik Eti Sandviç"
            fill
            className="object-cover"
            sizes="72px"
          />
        </div>
        <p
          className="text-xs leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "rgba(236,237,223,0.45)",
            fontStyle: "italic",
          }}
        >
          Tüm sandviçlerimiz kendi fırınımızdan çıkan ekşi maya ekmeğiyle servis edilir.
        </p>
      </div>
    </div>
  );
}

function KahveKarti() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll(".kahve-satir");
    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: i * 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full"
      style={{ background: "#6E7D00", color: "#F7F2DF", display: "flex" }}
    >
      {/* Ana içerik */}
      <div className="flex-1 min-w-0 px-8 md:px-12 py-14 md:py-20">

        {/* Başlık */}
        <div className="mb-10">
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(5rem, 14vw, 11rem)",
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              color: "#F7F2DF",
            }}
          >
            KAHVE
          </h2>
          <div className="mt-4 h-[2px] w-16" style={{ background: "rgba(247,242,223,0.35)" }} />
        </div>

        {/* Sıcak başlığı */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 700, color: "rgba(247,242,223,0.55)" }}
        >
          Sıcak
        </p>

        {/* Kahve listesi */}
        <div className="max-w-lg">
          {KAHVE_SICAK.map((item) => (
            <div
              key={item.isim}
              className="kahve-satir flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid rgba(247,242,223,0.1)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.78rem, 1.8vw, 0.95rem)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#F7F2DF",
                }}
              >
                {item.isim}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                  fontWeight: 700,
                  color: "#F7F2DF",
                  letterSpacing: "0.02em",
                }}
              >
                {item.fiyat}
              </span>
            </div>
          ))}
        </div>

        {/* Notlar */}
        <div
          className="mt-10 pt-6 flex flex-wrap gap-x-8 gap-y-2"
          style={{ borderTop: "1px solid rgba(247,242,223,0.1)" }}
        >
          {["Extra shot  +65", "Extra şurup  +30", "Bitkisel süt  +40"].map((n) => (
            <span
              key={n}
              className="text-xs"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                color: "rgba(247,242,223,0.45)",
                fontStyle: "italic",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Dikey "KAHVELER" — sağ sütun */}
      <div
        className="shrink-0 hidden md:block select-none pointer-events-none"
        style={{
          width: 148,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            margin: "auto",
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(5rem, 12vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            color: "rgba(247,242,223,0.07)",
            whiteSpace: "nowrap",
          }}
        >
          KAHVELER
        </span>
      </div>
    </div>
  );
}

function IcecekKarti() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll(".icecek-satir");
    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          delay: i * 0.035,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full"
      style={{ background: "#1A2C42", color: "#FDFBF7", display: "flex" }}
    >
      {/* Ana içerik — flex-1 */}
      <div className="flex-1 min-w-0 px-8 md:px-12 py-14 md:py-20">

        {/* Matcha Bar Başlık */}
        <div className="mb-10">
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "#FDFBF7",
            }}
          >
            MATCHA BAR
          </h2>
          <div className="mt-4 h-[2px] w-16" style={{ background: "rgba(253,251,247,0.25)" }} />
        </div>

        {/* Sıcak */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 700, color: "rgba(253,251,247,0.45)" }}
        >
          Sıcak
        </p>
        <div className="max-w-lg mb-8">
          {MATCHA_SICAK.map((item) => (
            <div
              key={item.isim}
              className="icecek-satir flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid rgba(253,251,247,0.08)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.88rem)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FDFBF7",
                }}
              >
                {item.isim}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  fontWeight: 700,
                  color: "#FDFBF7",
                }}
              >
                {item.fiyat}
              </span>
            </div>
          ))}
        </div>

        {/* Soğuk */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 700, color: "rgba(253,251,247,0.45)" }}
        >
          Soğuk
        </p>
        <div className="max-w-lg mb-10">
          {MATCHA_SOGUK.map((item) => (
            <div
              key={item.isim}
              className="icecek-satir flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid rgba(253,251,247,0.08)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.88rem)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FDFBF7",
                }}
              >
                {item.isim}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  fontWeight: 700,
                  color: "#FDFBF7",
                }}
              >
                {item.fiyat}
              </span>
            </div>
          ))}
        </div>

        {/* Extra notlar */}
        <div
          className="mb-12 pt-4 flex flex-wrap gap-x-6 gap-y-2"
          style={{ borderTop: "1px solid rgba(253,251,247,0.08)" }}
        >
          {["Extra şurup  +30", "Bitkisel süt  +40"].map((n) => (
            <span
              key={n}
              className="text-xs"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                color: "rgba(253,251,247,0.35)",
                fontStyle: "italic",
              }}
            >
              {n}
            </span>
          ))}
        </div>

        {/* Ev Yapımı Soğuk Çaylar */}
        <div
          className="pt-8"
          style={{ borderTop: "2px solid rgba(253,251,247,0.12)" }}
        >
          <h3
            className="mb-6"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "#FDFBF7",
              letterSpacing: "0.01em",
            }}
          >
            Ev Yapımı Soğuk Çaylar
          </h3>
          <div className="max-w-lg">
            {SOGUK_CAYLAR.map((item) => (
              <div
                key={item.isim}
                className="icecek-satir flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid rgba(253,251,247,0.08)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.75rem, 1.5vw, 0.88rem)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#FDFBF7",
                  }}
                >
                  {item.isim}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 700,
                    color: "#FDFBF7",
                    }}
                >
                  {item.fiyat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dikey "İÇECEKLER" — bağımsız sağ sütun, içerikle asla çakışmaz */}
      <div
        className="shrink-0 hidden md:block select-none pointer-events-none"
        style={{
          width: 148,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            margin: "auto",
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(5rem, 12vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            color: "rgba(253,251,247,0.07)",
            whiteSpace: "nowrap",
          }}
        >
          İÇECEKLER
        </span>
      </div>
    </div>
  );
}

// ─── ANA SAYFA ────────────────────────────────────────────────────────────

export default function MenuSayfasi() {
  const [aktifIdx, setAktifIdx] = useState(0);
  const aktifIdxRef  = useRef(0);
  const stripRef     = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const katNavRef    = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef     = useRef<gsap.core.Tween | null>(null);
  const progressObj  = useRef({ v: 0 });
  const headerRef    = useRef<HTMLDivElement>(null);

  /* İlk yüklemede container yüksekliğini ayarla */
  useLayoutEffect(() => {
    const panel = panelRefs.current[0];
    if (containerRef.current && panel) {
      containerRef.current.style.height = `${panel.scrollHeight}px`;
    }
  }, []);

  /* Aktif panel değişince yüksekliği güncelle */
  useEffect(() => {
    const panel = panelRefs.current[aktifIdx];
    if (containerRef.current && panel) {
      containerRef.current.style.height = `${panel.scrollHeight}px`;
    }
  }, [aktifIdx]);

  /* Header reveal */
  useEffect(() => {
    if (!headerRef.current) return;
    const eyebrow = headerRef.current.querySelector(".header-eyebrow");
    const title = headerRef.current.querySelector(".header-title");
    const sub = headerRef.current.querySelector(".header-sub");
    const tl = gsap.timeline({ delay: 0.2 });
    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.4");
    if (sub) tl.fromTo(sub, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5");
  }, []);

  const goToKat = useCallback((idx: number) => {
    if (idx === aktifIdxRef.current) return;

    // Sticky nav'ın hemen altına scroll et — yükseklik değişimi scroll pozisyonunu etkilemez
    if (katNavRef.current) {
      const navBottom = katNavRef.current.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: navBottom - katNavRef.current.offsetHeight, behavior: "smooth" });
    }

    tweenRef.current?.kill();
    aktifIdxRef.current = idx;
    setAktifIdx(idx);

    const dist = Math.abs(idx - progressObj.current.v);
    const dur = 0.55 + dist * 0.12;

    tweenRef.current = gsap.to(progressObj.current, {
      v: idx,
      duration: dur,
      ease: "power3.inOut",
      onUpdate() {
        if (stripRef.current) {
          gsap.set(stripRef.current, {
            x: `-${progressObj.current.v * (100 / N)}%`,
          });
        }
      },
      onComplete() {
        const panel = panelRefs.current[idx];
        if (containerRef.current && panel) {
          containerRef.current.style.height = `${panel.scrollHeight}px`;
        }
      },
    });
  }, []);

  return (
    <main
      className="pt-[100px] md:pt-[120px]"
      style={{ background: "var(--color-light)", minHeight: "100vh" }}
    >
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="px-6 md:px-14 pt-14 pb-10 md:pt-20 md:pb-14"
        style={{ background: "var(--color-light)" }}
      >
        <p
          className="header-eyebrow text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "var(--font-inter)", color: "var(--color-muted)", fontWeight: 600 }}
        >
          ★ Farm to Table · Ankara
        </p>
        <h1
          className="header-title"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
          }}
        >
          Menümüz{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-accent)",
            }}
          >
            sizi bekliyor.
          </em>
        </h1>
        <p
          className="header-sub mt-6 text-sm leading-relaxed max-w-[52ch]"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "var(--color-muted)",
          }}
        >
          Kendi bahçemizden topladığımız sebzeler, taş değirmende öğüttüğümüz siyez buğdayı, ekşi maya ekmeğimiz — her tabak doğrudan ev mutfağımızdan.
        </p>
        <div className="mt-6 h-[2px] w-20" style={{ background: "var(--color-primary)" }} />
      </div>

      {/* ── KATEGORİ NAVİGASYONU ─────────────────────────────── */}
      <div
        ref={katNavRef}
        className="sticky top-[60px] md:top-[72px] z-40"
        style={{
          background: "rgba(236,237,223,0.92)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          borderBottom: "1px solid rgba(61,75,46,0.1)",
        }}
      >
        <div className="px-6 md:px-14">
          <div className="flex items-center gap-8 md:gap-14 py-4 overflow-x-auto scrollbar-hide">
            {KATEGORILER.map((k, i) => {
              const aktif = i === aktifIdx;
              return (
                <button
                  key={k.slug}
                  onClick={() => goToKat(i)}
                  className="relative pb-2 shrink-0"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "0.03em",
                    color: aktif ? k.renk : "rgba(42,37,32,0.35)",
                    transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 8px 0",
                  }}
                >
                  {k.isim}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: 2,
                      background: k.renk,
                      transformOrigin: "left",
                      transform: aktif ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── GSAP ŞERİT ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          overflow: "hidden",
          position: "relative",
          transition: "height 0.5s cubic-bezier(0.22,1,0.36,1)",
          background: "var(--color-light)",
        }}
      >
        <div
          ref={stripRef}
          style={{ display: "flex", width: `${N * 100}%`, alignItems: "flex-start" }}
        >
          {/* Panel 0 — Kahvaltı */}
          <div
            ref={(el) => { panelRefs.current[0] = el; }}
            style={{ width: `${100 / N}%`, flexShrink: 0, padding: "2.5rem clamp(0.75rem, 3vw, 2.5rem)" }}
          >
            <div style={{
              maxWidth: 960,
              margin: "0 auto",
              borderRadius: 36,
              overflow: "hidden",
              boxShadow: "0 16px 40px -4px rgba(42,37,32,0.12), 0 4px 12px -2px rgba(42,37,32,0.07)",
            }}>
              <KahvaltiKarti />
            </div>
          </div>

          {/* Panel 1 — Sandviçler */}
          <div
            ref={(el) => { panelRefs.current[1] = el; }}
            style={{ width: `${100 / N}%`, flexShrink: 0, padding: "2.5rem clamp(0.75rem, 3vw, 2.5rem)" }}
          >
            <div style={{
              maxWidth: 960,
              margin: "0 auto",
              borderRadius: 36,
              overflow: "hidden",
              boxShadow: "0 16px 40px -4px rgba(42,37,32,0.14), 0 4px 12px -2px rgba(42,37,32,0.08)",
            }}>
              <SandvicKarti />
            </div>
          </div>

          {/* Panel 2 — Kahve */}
          <div
            ref={(el) => { panelRefs.current[2] = el; }}
            style={{ width: `${100 / N}%`, flexShrink: 0, padding: "2.5rem clamp(0.75rem, 3vw, 2.5rem)" }}
          >
            <div style={{
              maxWidth: 960,
              margin: "0 auto",
              borderRadius: 36,
              overflow: "hidden",
              boxShadow: "0 16px 40px -4px rgba(42,37,32,0.14), 0 4px 12px -2px rgba(42,37,32,0.08)",
            }}>
              <KahveKarti />
            </div>
          </div>

          {/* Panel 3 — İçecekler */}
          <div
            ref={(el) => { panelRefs.current[3] = el; }}
            style={{ width: `${100 / N}%`, flexShrink: 0, padding: "2.5rem clamp(0.75rem, 3vw, 2.5rem)" }}
          >
            <div style={{
              maxWidth: 960,
              margin: "0 auto",
              borderRadius: 36,
              overflow: "hidden",
              boxShadow: "0 16px 40px -4px rgba(42,37,32,0.15), 0 4px 12px -2px rgba(42,37,32,0.08)",
            }}>
              <IcecekKarti />
            </div>
          </div>
        </div>
      </div>

      {/* Kart altı çerçeve boşluğu */}
      <div style={{ background: "var(--color-light)", height: "5rem" }} />

      {/* ── SİPARİŞ VER CTA ──────────────────────────────────── */}
      <div
        className="py-20 md:py-28 px-6 md:px-14"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{
              fontFamily: "var(--font-inter)",
              color: "rgba(236,237,223,0.4)",
              fontWeight: 600,
            }}
          >
            Bala Bakehouse
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--color-light)",
            }}
          >
            Evden sipariş ver,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              sofranı hazırla.
            </em>
          </h2>
          <p
            className="mt-5 mb-10 text-sm leading-relaxed max-w-sm mx-auto"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              color: "rgba(236,237,223,0.55)",
            }}
          >
            Yemeksepeti üzerinden siparişini ver, Bala mutfağı kapında.
          </p>
          <a
            href={CONFIG.yemeksepeti}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm tracking-widest uppercase transition-all duration-500"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              background: "var(--color-accent)",
              color: "var(--color-light)",
              boxShadow: "0 8px 32px rgba(139,46,42,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 48px rgba(139,46,42,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(139,46,42,0.35)";
            }}
          >
            Sipariş Ver →
          </a>
        </div>
      </div>
    </main>
  );
}
