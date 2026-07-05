// Visual data for the AI4AA course — kept separate from ai4aaCourse.ts so the
// content stays clean. Powers the before/after time-savings bars and the
// color-coded "anatomy of a prompt" diagram.

export interface CaseMetric {
  label: string;
  before: number;
  after: number;
  unit: string;
  /** Optional human-friendly note, e.g. "per newsletter". */
  note?: string;
}

// Keyed by week slug. Numbers come straight from each week's case study.
export const CASE_METRICS: Record<string, CaseMetric> = {
  "week-1-foundations": { label: "Weekly newsletter", before: 180, after: 25, unit: "min" },
  "week-2-perplexity": { label: "Startup due diligence", before: 120, after: 8, unit: "min" },
  "week-3-gemini": { label: "Agency weekly output", before: 40, after: 18, unit: "hrs" },
  "week-4-claude": { label: "SaaS build time", before: 12, after: 5, unit: "wks" },
  "week-5-workflow": { label: "Podcast prep / episode", before: 120, after: 45, unit: "min" },
};

export interface AnatomyPart {
  chip: string;
  label: string;
  accent: "cyan" | "blue" | "orange" | "violet" | "emerald" | "amber" | "pink";
  example: string;
}

// A strong prompt, broken into its parts. Rendered as color-coded segments so
// a total beginner can *see* what makes a prompt work.
export const PROMPT_ANATOMY = {
  weak: "Tell me about social media marketing",
  strong: {
    parts: [
      { chip: "Ask", label: "The ask", accent: "cyan", example: "What are the top 3 Instagram strategies" },
      { chip: "Who", label: "Audience", accent: "violet", example: "small businesses in Houston" },
      { chip: "Goal", label: "Specific goal", accent: "orange", example: "used to grow from 0 to 10,000 followers" },
      { chip: "When", label: "Timeframe", accent: "emerald", example: "in 2025–2026" },
      { chip: "Format", label: "Output format", accent: "amber", example: "Include real examples." },
    ] as AnatomyPart[],
  },
};
