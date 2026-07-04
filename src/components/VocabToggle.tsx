"use client";

/**
 * VocabToggle — nav-bar switch between Standard and Tactical vocabulary.
 * Accessible: real button, aria-pressed, title explains what it does.
 */

import { motion } from "framer-motion";
import { BookOpen, Radar } from "lucide-react";
import { useVocabulary } from "@/contexts/VocabularyContext";

export default function VocabToggle({ className = "" }: { className?: string }) {
  const { mode, toggleMode } = useVocabulary();
  const tactical = mode === "tactical";

  return (
    <button
      onClick={toggleMode}
      aria-pressed={tactical}
      title={
        tactical
          ? "Tactical vocabulary on — switch back to standard recovery language"
          : "Switch to Tactical (Fiends Grid) vocabulary"
      }
      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-colors ${
        tactical
          ? "border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981]"
          : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
      } ${className}`}
    >
      <motion.span
        key={mode}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5"
      >
        {tactical ? <Radar size={12} /> : <BookOpen size={12} />}
        {tactical ? "Tactical" : "Standard"}
      </motion.span>
    </button>
  );
}
