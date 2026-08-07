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
    <div className={`relative w-full aspect-video bg-[#141814] overflow-hidden ${className}`}>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setHasError(true)}
          className={`object-cover transition-transform duration-500 ${
 dimmed ? "brightness-50 saturate-50" : ""
 }`}
        />
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#141814] via-[#141814] to-[#0d0f0d] p-4 text-center border border-[#1d231d] ${dimmed ? "opacity-60" : ""}`}>
          <span className="text-xs font-mono font-bold text-[#4cc07a] bg-[#4cc07a]/10 px-3 py-1 rounded-full mb-2">
            EPISODE {episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber}
          </span>
          <span className="text-sm font-semibold text-[#b8b4a6] line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
}
