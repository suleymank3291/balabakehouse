"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { KategoriConfig } from "@/config/site-config";

interface Props {
  kategoriler: KategoriConfig[];
}

export default function MenuKategorileri({ kategoriler }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [loopFrame, setLoopFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoop = (idx: number) => {
    setHoveredIdx(idx);
    setLoopFrame(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setLoopFrame((f) => (f + 1) % kategoriler[idx].donguGorselleri.length);
    }, 450);
  };

  useEffect(() => {
    startLoop(0); // Default first one
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="menu" className="py-24 md:py-48" style={{ background: "var(--color-light)" }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
          
          {/* Left: Interactive List */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <p
              className="text-xs tracking-[0.3em] mb-12"
              style={{ fontFamily: "var(--font-inter)", color: "var(--color-brown)" }}
            >
              ★&nbsp;&nbsp;GÜNLÜK RİTÜELLER&nbsp;&nbsp;★
            </p>
            
            <div className="flex flex-col space-y-6 md:space-y-10">
              {kategoriler.map((kat, i) => (
                <Link
                  key={kat.isim}
                  href={kat.link}
                  className="group block relative"
                  onMouseEnter={() => startLoop(i)}
                >
                  <div className="flex items-baseline gap-6">
                    <span 
                      className="text-sm md:text-lg opacity-40 font-serif italic"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="transition-all duration-500"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        lineHeight: 1,
                        color: hoveredIdx === i ? "var(--color-primary)" : "var(--color-text)",
                        opacity: hoveredIdx === i ? 1 : 0.3,
                        transform: hoveredIdx === i ? "translateX(10px)" : "translateX(0)"
                      }}
                    >
                      {kat.isim}
                    </h3>
                  </div>
                  
                  {/* Subtle info line under active item */}
                  <div 
                    className="mt-4 transition-all duration-500 overflow-hidden"
                    style={{ 
                      maxHeight: hoveredIdx === i ? "50px" : "0",
                      opacity: hoveredIdx === i ? 1 : 0,
                      paddingLeft: "3.5rem"
                    }}
                  >
                    <p 
                      className="text-sm text-[var(--color-brown)] tracking-widest uppercase flex items-center gap-3"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {kat.urunSayisi} <span className="h-[1px] w-12 bg-[var(--color-brown)]/30" /> İncele →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Large Visual Preview Frame */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-[40px] md:rounded-[80px]"
              style={{
                boxShadow: "0 40px 100px rgba(61,75,46,0.12)",
                border: "1px solid rgba(61,75,46,0.05)"
              }}
            >
              {kategoriler.map((kat, i) => (
                <div 
                  key={kat.isim + "-frame"}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: hoveredIdx === i ? 1 : 0 }}
                >
                  {kat.donguGorselleri[0].endsWith(".mp4") ? (
                    <div className="absolute inset-0">
                      <video
                        src={kat.donguGorselleri[0]}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    kat.donguGorselleri.map((src, fi) => (
                      <div
                        key={src}
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{ opacity: fi === loopFrame ? 1 : 0 }}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={i === 0}
                        />
                      </div>
                    ))
                  )}
                </div>
              ))}
              
              {/* Decorative Frame Label */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div 
                  className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-black/5 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  <span 
                    className="text-[10px] tracking-widest uppercase font-bold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Mutfaktan Canlı
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
