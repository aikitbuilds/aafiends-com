"use client";

/**
 * VocabularyContext — dynamic vocabulary system for the Fiends Grid.
 *
 * Two registers for the same recovery concepts:
 *   "standard" — newcomer-safe, familiar 12-Step language
 *   "tactical" — the Operator/Fiends Grid register
 *
 * Design notes:
 * - Persists to localStorage (key: aaf_vocab_mode) so the choice survives
 *   reloads and sessions. Hydration-safe: first render always uses
 *   "standard" (matches the server), then a useEffect applies the saved
 *   preference on the client. No hydration mismatch, no flash of wrong text
 *   beyond one paint.
 * - No external state library on purpose — React context is enough for a
 *   single boolean-ish preference, and it keeps the dependency surface small.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type VocabMode = "standard" | "tactical";

export type VocabTerm =
  | "early_recovery"
  | "daily_checkin"
  | "mental_obsession"
  | "fellowship"
  | "higher_power"
  | "newcomer"
  | "sponsor"
  | "cravings"
  | "the_disease"
  | "recovery"
  | "meeting"
  | "sobriety_date"
  | "relapse"
  // Legacy aliases kept so earlier components keep compiling — same concepts,
  // shorter keys. New code should prefer the descriptive keys above.
  | "deficit"
  | "telemetry"
  | "doomloop"
  | "grid"
  | "architect"
  | "initiate"
  | "vanguard";

export const VOCAB_DICTIONARY: Record<
  VocabTerm,
  { standard: string; tactical: string }
> = {
  early_recovery: { standard: "Early Recovery", tactical: "The Deficit" },
  daily_checkin: { standard: "Daily Check-in", tactical: "Telemetry Log" },
  mental_obsession: { standard: "Mental Obsession", tactical: "The Doom-Loop" },
  fellowship: { standard: "The Fellowship", tactical: "The Grid" },
  higher_power: { standard: "Higher Power", tactical: "Master Architect" },
  newcomer: { standard: "Newcomer", tactical: "Initiate" },
  sponsor: { standard: "Sponsor / Mentor", tactical: "Vanguard" },
  cravings: { standard: "Cravings", tactical: "System Glitch" },
  the_disease: { standard: "The Disease", tactical: "The Virus (AIV)" },
  recovery: { standard: "Recovery", tactical: "Baseline Restoration" },
  meeting: { standard: "Meeting", tactical: "Grid Sync" },
  sobriety_date: { standard: "Sobriety Date", tactical: "System Boot Date" },
  relapse: { standard: "Relapse", tactical: "Critical System Failure" },
  // Legacy aliases
  deficit: { standard: "Early Recovery", tactical: "The Deficit" },
  telemetry: { standard: "Daily Check-in", tactical: "Telemetry Log" },
  doomloop: { standard: "Cravings", tactical: "The Doom-Loop" },
  grid: { standard: "The Fellowship", tactical: "The Grid" },
  architect: { standard: "Higher Power", tactical: "Master Architect" },
  initiate: { standard: "Newcomer", tactical: "Initiate" },
  vanguard: { standard: "Sponsor / Mentor", tactical: "Vanguard" },
};

const STORAGE_KEY = "aaf_vocab_mode";

interface VocabularyContextType {
  mode: VocabMode;
  toggleMode: () => void;
  t: (key: VocabTerm) => string;
}

const VocabularyContext = createContext<VocabularyContextType>({
  mode: "standard",
  toggleMode: () => {},
  t: (key) => VOCAB_DICTIONARY[key].standard,
});

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<VocabMode>("standard");

  // Apply the persisted preference after mount (client only).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "tactical" || saved === "standard") setMode(saved);
    } catch {
      /* localStorage unavailable (private mode etc.) — stay on standard */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "standard" ? "tactical" : "standard";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* non-fatal */
      }
      return next;
    });
  }, []);

  const t = useCallback((key: VocabTerm) => VOCAB_DICTIONARY[key][mode], [mode]);

  return (
    <VocabularyContext.Provider value={{ mode, toggleMode, t }}>
      {children}
    </VocabularyContext.Provider>
  );
}

export const useVocabulary = () => useContext(VocabularyContext);
// Back-compat alias (earlier draft exported useVocab)
export const useVocab = useVocabulary;
