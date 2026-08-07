"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import EpisodeThumbnail from "./EpisodeThumbnail";

interface EpisodeVideoEmbedProps {
  youtubeId: string;
  thumbnail: string;
  title: string;
  episodeNumber: number;
}

export default function EpisodeVideoEmbed({
  youtubeId,
  thumbnail,
  title,
  episodeNumber,
}: EpisodeVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-t-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video group cursor-pointer overflow-hidden rounded-t-2xl">
      <EpisodeThumbnail
        src={thumbnail}
        alt={title}
        episodeNumber={episodeNumber}
      />
      <div
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4cc07a]/90 text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4cc07a] transition-all duration-300">
          <Play size={32} className="fill-black translate-x-0.5" />
        </div>
      </div>

      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-[#f2efe6] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-[#2a322a] flex items-center gap-1 backdrop-blur-sm"
        title="Open directly on YouTube"
      >
        <span>YouTube</span>
        <ExternalLink size={12} />
      </a>
    </div>
  );
}
