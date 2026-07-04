"use client";

// Per-user AI4AA course progress, persisted to the student's own profile doc
// at users/{uid}.ai4aaProgress. The existing Firestore rules already grant the
// owner read/write on users/{uid}, so no rules change is needed.
//
// The whole progress object is written on each change (it's tiny — a few dozen
// booleans), which avoids nested field-path edge cases with hyphenated slugs.

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { PREP_TASKS, WEEKS, TOTAL_TRACKABLE } from "@/data/ai4aaCourse";

export interface WeekProgress {
  completed?: boolean;
  homework?: Record<string, boolean>;
}

export interface CourseProgress {
  prep: Record<string, boolean>;
  weeks: Record<string, WeekProgress>;
}

const EMPTY: CourseProgress = { prep: {}, weeks: {} };

export function useCourseProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CourseProgress>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? (snap.data() as any) : null;
        const p = data?.ai4aaProgress as CourseProgress | undefined;
        if (active) setProgress({ prep: p?.prep ?? {}, weeks: p?.weeks ?? {} });
      } catch (e) {
        console.error("Failed to load course progress", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const persist = useCallback(
    async (next: CourseProgress) => {
      setProgress(next); // optimistic
      if (!user) return;
      try {
        await updateDoc(doc(db, "users", user.uid), { ai4aaProgress: next });
      } catch (e) {
        console.error("Failed to save course progress", e);
      }
    },
    [user]
  );

  const togglePrep = useCallback(
    (id: string) => {
      persist({ ...progress, prep: { ...progress.prep, [id]: !progress.prep[id] } });
    },
    [progress, persist]
  );

  const toggleWeekComplete = useCallback(
    (slug: string) => {
      const w = progress.weeks[slug] ?? {};
      persist({ ...progress, weeks: { ...progress.weeks, [slug]: { ...w, completed: !w.completed } } });
    },
    [progress, persist]
  );

  const toggleHomework = useCallback(
    (slug: string, index: number) => {
      const w = progress.weeks[slug] ?? {};
      const hw = { ...(w.homework ?? {}) };
      hw[String(index)] = !hw[String(index)];
      persist({ ...progress, weeks: { ...progress.weeks, [slug]: { ...w, homework: hw } } });
    },
    [progress, persist]
  );

  return { progress, loading, togglePrep, toggleWeekComplete, toggleHomework };
}

// ---- pure helpers (usable outside the hook) ----------------------------------

export function prepDoneCount(p: CourseProgress): number {
  return PREP_TASKS.filter((t) => p.prep[t.id]).length;
}

export function weekHomeworkDone(p: CourseProgress, slug: string): number {
  const hw = p.weeks[slug]?.homework ?? {};
  return Object.values(hw).filter(Boolean).length;
}

export function isWeekComplete(p: CourseProgress, slug: string): boolean {
  return !!p.weeks[slug]?.completed;
}

export function overallProgressPct(p: CourseProgress): number {
  let done = prepDoneCount(p);
  for (const w of WEEKS) {
    if (p.weeks[w.slug]?.completed) done += 1;
    done += weekHomeworkDone(p, w.slug);
  }
  return Math.round((done / TOTAL_TRACKABLE) * 100);
}
