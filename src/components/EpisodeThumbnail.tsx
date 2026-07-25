"use client";

import { useState } from "react";
import Image from "next/image";

interface EpisodeThumbnailProps {
  src: string;
  alt: string;
  episodeNumber: number;
  className?: string;
  dimmed?: boolean;
}

export default function EpisodeThumbnail({
  src,
  alt,
  episodeNumber,
  className = "",
  dimmed = false,
}: EpisodeThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative w-full aspect-video bg-[#0a1428] overflow-hidden ${className}`}>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setHasError(true)}
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            dimmed ? "brightness-50 saturate-50" : ""
          }`}
        />
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1428] via-[#051024] to-[#050505] p-4 text-center border border-white/5 ${dimmed ? "opacity-60" : ""}`}>
          <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full uppercase mb-2">
            EPISODE {episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber}
          </span>
          <span className="text-sm font-black text-neutral-300 line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
}
