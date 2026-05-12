"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  speed?: number;
  trigger?: "auto" | "hover";
  className?: string;
  aspectRatio?: string;
}

export default function StopMotionImageGroup({
  images,
  speed = 350,
  trigger = "hover",
  className = "",
  aspectRatio = "4/5",
}: Props) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, speed);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrent(0);
  };

  // Auto mode: start when in viewport
  useEffect(() => {
    if (trigger !== "auto" && !isMobile.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, speed, images.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlers =
    trigger === "hover" && !isMobile.current
      ? {
          onMouseEnter: start,
          onMouseLeave: stop,
        }
      : {};

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio, borderRadius: "16px" }}
      {...handlers}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0, transition: "none" }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
