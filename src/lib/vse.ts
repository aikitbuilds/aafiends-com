/**
 * The Vanguard Scoring Engine (VSE) - daily 0-10 recovery score.
 *
 * Spec source: research/master_development_blueprint_7-2-26.md, Section 2.3
 * (Pillar 3: The Mirror). Each of 5 categories scores 0 or 2 points based on
 * objective (not subjective/emotional) criteria:
 *
 *   Daily VSE Score = Circadian Alignment + Ignition Sequence +
 *                      Fellowship Sync + Biological Maintenance +
 *                      Structural Boundaries
 *
 * Score bands (per the same spec):
 *   9-10  Optimal Configuration   - system in peak repair mode
 *   7-8   Baseline Maintenance    - stable, minor execution friction
 *   5-6   System Alert            - instability, check input logs
 *   <5    Redline                 - high relapse risk, execute manual override
 *
 * IMPLEMENTATION NOTE (as of 2026-07-02): the current TelemetryLog.tsx form
 * does not yet collect two of these five inputs directly (circadian
 * alignment / sleep-wake window adherence, and structural boundaries /
 * override-free day + tech blackout). This function is written to the full
 * spec so it's correct once those two inputs exist - it is NOT yet wired
 * into the dashboard UI. Wiring it in means adding 1-2 small toggles to the
 * check-in form, which is a UI decision worth a quick look before it ships,
 * not something to bolt on silently.
 */

export type IgnitionAdherence = "complete" | "partial" | "failed";

export interface VSEInputs {
  /** Kept the intended sleep/wake window today. */
  circadianAlignment: boolean;
  /** Morning routine adherence. */
  ignitionSequence: IgnitionAdherence;
  /** Attended a meeting and/or completed a sponsor check-in today. */
  fellowshipSync: boolean;
  /** Physical movement/decompression protocol completed today. */
  biologicalMaintenance: boolean;
  /** Chemical-override-free day AND evening technology blackout held. */
  structuralBoundaries: boolean;
}

export interface VSEResult {
  score: number; // 0-10
  band: "optimal" | "baseline" | "alert" | "redline";
  bandLabel: string;
  categoryScores: Record<keyof Omit<VSEInputs, "ignitionSequence"> | "ignitionSequence", number>;
}

function boolPoints(value: boolean): number {
  return value ? 2 : 0;
}

function ignitionPoints(value: IgnitionAdherence): number {
  if (value === "complete") return 2;
  if (value === "partial") return 1;
  return 0;
}

export function computeVSEScore(inputs: VSEInputs): VSEResult {
  const categoryScores = {
    circadianAlignment: boolPoints(inputs.circadianAlignment),
    ignitionSequence: ignitionPoints(inputs.ignitionSequence),
    fellowshipSync: boolPoints(inputs.fellowshipSync),
    biologicalMaintenance: boolPoints(inputs.biologicalMaintenance),
    structuralBoundaries: boolPoints(inputs.structuralBoundaries),
  };

  const score =
    categoryScores.circadianAlignment +
    categoryScores.ignitionSequence +
    categoryScores.fellowshipSync +
    categoryScores.biologicalMaintenance +
    categoryScores.structuralBoundaries;

  let band: VSEResult["band"];
  let bandLabel: string;

  if (score >= 9) {
    band = "optimal";
    bandLabel = "Optimal Configuration - system in peak repair mode.";
  } else if (score >= 7) {
    band = "baseline";
    bandLabel = "Baseline Maintenance - stable, minor execution friction.";
  } else if (score >= 5) {
    band = "alert";
    bandLabel = "System Alert - instability. Check input logs immediately.";
  } else {
    band = "redline";
    bandLabel = "Redline - high relapse risk. Stop all work. Execute manual override (meeting, sponsor call, cold shock).";
  }

  return { score, band, bandLabel, categoryScores };
}
