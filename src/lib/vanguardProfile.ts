/**
 * Vanguard susceptibility profile scoring.
 *
 * Scores the 12-question onboarding diagnostic (src/app/onboarding/page.tsx)
 * against 5 mascot archetypes, originally sourced from
 * `research/master-development-blueprint.md` Section 3 ("The 5 Host
 * Susceptibility Profiles"). This is the first slice of what decisions.md
 * calls the "Vanguard Scoring Engine" - it does NOT write anything back to
 * Firestore, the result is computed client-side, on demand, from data
 * that's already there.
 *
 * QUESTION_MASCOT_MAP below was rebuilt 2026-07-03 when the onboarding
 * question set itself was redesigned (see
 * ecosystem-docs/onboarding-questions-proposal.md for why) - three
 * redundant tech-comfort questions were merged into one, two low-signal
 * questions were replaced, and several were renamed. Every option below is
 * mapped fresh; the mascot definitions (MASCOT_INFO) themselves are
 * unchanged.
 */

export type Mascot = "eagle" | "elephant" | "turtle" | "chameleon" | "tiger";

export const MASCOT_INFO: Record<
  Mascot,
  {
    emoji: string;
    label: string;
    archetype: string;
    vulnerability: string;
    dashboardSolution: string;
    /** The healthy flip side of the same trait named in `vulnerability` — same
     *  wiring, different expression. Added 2026-07-04 (Michael: "show
     *  strengths, weaknesses, and other triggers"). Not in the original
     *  research table (which only documented the vulnerability side); these
     *  are the reciprocal traits, kept consistent with each archetype. */
    strengths: string[];
    /** "Primary System Triggers" from research/master-development-blueprint.md
     *  §3, "The 5 Host Susceptibility Profiles" table — verbatim source, not
     *  invented. */
    commonTriggers: string;
    /** "Pre-Relapse Warnings" from the same source table — what to watch for
     *  when this profile is running unwell. */
    warningSigns: string;
    /** Illustrative estimate of how common this profile is, NOT measured
     *  from real user data — the beta only has a handful of users so far, so
     *  there's no real distribution to report yet. Numbers are a rough,
     *  even-ish split with light texture, not a clinical statistic. Swap
     *  this out for a real computed percentage (from an aggregate Firestore
     *  stats doc) once there's a meaningful population to measure. */
    estimatedShare: number;
  }
> = {
  eagle: {
    emoji: "🦅",
    label: "The Eagle",
    archetype: "The Founder",
    vulnerability: "Fear of failure, loss of control, pride. Worth tied to output.",
    dashboardSolution: "The Kinetic Dashboard — prioritize rest/HRV metrics.",
    strengths: ["Driven and disciplined — turns intention into results", "Natural leader others look to for structure", "Thrives on momentum and follow-through"],
    commonTriggers: "Financial dips, feeling unproductive, unstructured free time.",
    warningSigns: "Working until 2am, skipping meetings to \"hustle,\" breaking planned rest.",
    estimatedShare: 22,
  },
  elephant: {
    emoji: "🐘",
    label: "The Elephant",
    archetype: "The Martyr",
    vulnerability: "Fear of being called selfish. Deep need to be needed.",
    dashboardSolution: "The Boundary Toggle — daily log: did you say 'no' today to protect recovery?",
    strengths: ["Deeply loyal and generous", "The person others lean on in a crisis", "Exceptional at showing up for people"],
    commonTriggers: "Family demands, H.A.L.T. (hungry, angry, lonely, tired), emotional and physical fatigue.",
    warningSigns: "Crying spells, hospital-level exhaustion, silent resentment building.",
    estimatedShare: 21,
  },
  turtle: {
    emoji: "🐢",
    label: "The Turtle",
    archetype: "The Escapist",
    vulnerability: "Running from trauma. Fear of quiet thoughts.",
    dashboardSolution: "Somatic Alarms — direct prompts for short silent walks.",
    strengths: ["Resilient — has survived a lot already", "Calm under pressure", "Skilled at self-soothing once it's safe to slow down"],
    commonTriggers: "Stillness, silence, confrontation, emotional conflict.",
    warningSigns: "Ghosting texts, isolating, skipping the morning routine.",
    estimatedShare: 18,
  },
  chameleon: {
    emoji: "🦎",
    label: "The Chameleon",
    archetype: "The Validator",
    vulnerability: "Fear of social rejection. Belief that the authentic self is unlovable.",
    dashboardSolution: "Radical Honesty Log — conversational voice entries to dump the social mask.",
    strengths: ["Socially perceptive — reads a room well", "Adaptable, easy to connect with", "Genuinely good at making others feel comfortable"],
    commonTriggers: "Social events, FOMO, being alone on weekends, ignored texts.",
    warningSigns: "Saying \"yes\" to everything, downplaying cravings to look fine.",
    estimatedShare: 20,
  },
  tiger: {
    emoji: "🐅",
    label: "The Tiger",
    archetype: "The Saboteur",
    vulnerability: "Addiction to chaos. Peace and stability induce intense anxiety.",
    dashboardSolution: "The Friction Engine — high-friction physical goals.",
    strengths: ["Bold and energizing — pushes the group forward", "Thrives on a real challenge", "Uncomfortable with stagnation, which cuts both ways"],
    commonTriggers: "Long stretches of quiet routine, the \"pink cloud\" wearing off.",
    warningSigns: "Skipping \"boring\" routines, picking fights, chasing risky impulsive tasks.",
    estimatedShare: 19,
  },
};

// question id -> option id -> mascot. Rebuilt 2026-07-03 for the v2
// question set (see src/app/onboarding/page.tsx).
const QUESTION_MASCOT_MAP: Record<string, Record<string, Mascot>> = {
  q1_recoveryHorizon: {
    in_the_trench_0_90_days: "eagle",
    stabilizing_3_12_months: "elephant",
    solid_baseline_1_5_years: "turtle",
    vanguard_5_plus_years: "chameleon",
  },
  q2_fellowshipNetwork: {
    brand_new: "eagle",
    attending_but_isolated: "elephant",
    working_steps_homegroup: "turtle",
    sponsoring_others: "chameleon",
  },
  q3_doomLoopTrigger: {
    isolation_boredom: "turtle",
    overworking_ego: "eagle",
    anger_resentments: "tiger",
    physical_exhaustion: "elephant",
  },
  q4_sleepQuality: {
    wrecked_broken: "eagle",
    getting_there_rough: "elephant",
    mostly_steady: "turtle",
    solid_consistent: "chameleon",
  },
  q5_physicalPain: {
    chronic_pain_old_injury: "tiger",
    new_tension_soreness: "elephant",
    mostly_fine: "turtle",
    no_issues_right_now: "eagle",
  },
  q6_doseRewardSource: {
    movement_exercise: "tiger",
    food_cooking: "elephant",
    connecting_with_people: "chameleon",
    nothing_yet: "turtle",
  },
  q7_screenBoundaries: {
    constant_doom_scrolling: "tiger",
    lose_track_of_time: "chameleon",
    strict_nightly_limits: "elephant",
    strictly_work_tool: "eagle",
  },
  q8_techComfort: {
    tech_frustrates_me: "elephant",
    comfortable_simple: "chameleon",
    confident_often: "turtle",
    power_user: "eagle",
  },
  q9_professionalSupport: {
    just_aa_fellowship: "eagle",
    therapist_counselor: "elephant",
    doctor_medication: "turtle",
    full_care_team: "chameleon",
  },
  q10_thoughtProcessing: {
    talk_out_loud: "elephant",
    write_by_hand: "chameleon",
    type_notes: "turtle",
    keep_in_head: "eagle",
  },
  q11_sharingComfort: {
    anonymous_listener: "turtle",
    hesitant_but_willing: "elephant",
    comfortable_sharing_data: "chameleon",
    fully_ready_to_build: "tiger",
  },
  q12_appGoal: {
    ai_sponsor_journal: "chameleon",
    biological_dashboard: "tiger",
    app_for_homegroup: "elephant",
    just_want_to_learn: "eagle",
  },
};

export interface VanguardProfileResult {
  dominant: Mascot;
  counts: Record<Mascot, number>;
  answeredCount: number;
}

/**
 * Tallies which mascot each answered question maps to and returns the
 * dominant one. Returns null if there's no diagnostic data to score yet.
 * Ties resolve to whichever mascot appears first in MASCOT_ORDER (stable,
 * deterministic — not meant to imply priority/ranking between profiles).
 */
const MASCOT_ORDER: Mascot[] = ["eagle", "elephant", "turtle", "chameleon", "tiger"];

export function computeVanguardProfile(
  diagnosticData: Record<string, string> | undefined | null
): VanguardProfileResult | null {
  if (!diagnosticData || Object.keys(diagnosticData).length === 0) return null;

  const counts: Record<Mascot, number> = { eagle: 0, elephant: 0, turtle: 0, chameleon: 0, tiger: 0 };
  let answeredCount = 0;

  for (const [questionId, optionId] of Object.entries(diagnosticData)) {
    const mascot = QUESTION_MASCOT_MAP[questionId]?.[optionId];
    if (mascot) {
      counts[mascot] += 1;
      answeredCount += 1;
    }
  }

  if (answeredCount === 0) return null;

  let dominant: Mascot = MASCOT_ORDER[0];
  for (const mascot of MASCOT_ORDER) {
    if (counts[mascot] > counts[dominant]) dominant = mascot;
  }

  return { dominant, counts, answeredCount };
}
