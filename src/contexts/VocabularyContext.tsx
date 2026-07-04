"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type VocabMode = "standard" | "racefiends";

interface VocabularyContextType {
  mode: VocabMode;
  toggleMode: () => void;
  t: (key: VocabTerm) => string;
}

export type VocabTerm = 
  | "deficit"
  | "telemetry"
  | "doomloop"
  | "grid"
  | "architect"
  | "initiate"
  | "vanguard";

const dictionary: Record<VocabTerm, { standard: string; racefiends: string }> = {
  deficit: { standard: "Early Recovery", racefiends: "The Deficit" },
  telemetry: { standard: "Daily Check-in", racefiends: "Telemetry Log" },
  doomloop: { standard: "Cravings", racefiends: "The Doom-Loop" },
  grid: { standard: "The Fellowship", racefiends: "The Grid" },
  architect: { standard: "Higher Power", racefiends: "Master Architect" },
  initiate: { standard: "Newcomer", racefiends: "Initiate" },
  vanguard: { standard: "Sponsor / Mentor", racefiends: "Vanguard" },
};

const VocabularyContext = createContext<VocabularyContextType>({} as VocabularyContextType);

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<VocabMode>("standard");

  const toggleMode = () => {
    setMode((prev) => (prev === "standard" ? "racefiends" : "standard"));
  };

  const t = (key: VocabTerm) => dictionary[key][mode];

  return (
    <VocabularyContext.Provider value={{ mode, toggleMode, t }}>
      {children}
    </VocabularyContext.Provider>
  );
}

export const useVocab = () => useContext(VocabularyContext);
