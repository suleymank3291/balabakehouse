"use client";

import { useState, useEffect } from "react";

interface Props {
  uzakSrc: string;
  yakinSrc: string;
  alt: string;
  className?: string;
}

export default function YakinUzakHover({ uzakSrc, yakinSrc, alt, className = "" }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handlers = isMobile
    ? { onClick: () => setHovered((h) => !h) }
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      };

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${className}`}
      {...handlers}
    >
      {/* Uzak fotoğraf */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <img
          src={uzakSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Yakın fotoğraf */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(1.1)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <img
          src={yakinSrc}
          alt={`${alt} — yakın`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Yakın işaret */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <span
          className="text-[var(--color-light)] text-xs tracking-widest bg-black/20 px-3 py-1 rounded-full"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          yakına bak
        </span>
      </div>
    </div>
  );
}
