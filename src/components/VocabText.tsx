"use client";

/**
 * VocabText — drop-in text span that renders the current vocabulary mode's
 * word for a concept. Usage: <VocabText vocabKey="daily_checkin" />
 */

import { useVocabulary } from "@/contexts/VocabularyContext";
import type { VocabTerm } from "@/contexts/VocabularyContext";

export default function VocabText({
  vocabKey,
  className,
}: {
  vocabKey: VocabTerm;
  className?: string;
}) {
  const { t } = useVocabulary();
  return <span className={className}>{t(vocabKey)}</span>;
}
