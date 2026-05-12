"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
  aspectRatio?: string;
  label?: string;
}

export default function StopMotionVideoTile({
  src,
  className = "",
  aspectRatio = "3/4",
  label,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {label && (
        <span
          className="absolute bottom-3 left-3 text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full"
          style={{
            background: "rgba(236,237,223,0.15)",
            color: "var(--color-light)",
            backdropFilter: "blur(8px)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
