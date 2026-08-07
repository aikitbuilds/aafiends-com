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
      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold transition-colors ${
 tactical
 ? "border-[#4cc07a]/40 bg-[#4cc07a]/10 text-[#4cc07a]"
 : "border-[#1d231d] bg-[#141814] text-[#b8b4a6] hover:text-[#f2efe6]"
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
