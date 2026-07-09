// ---------------------------------------------------------------------------
// 90 DAYS R&R — "Recovery & Restructure" Fellowship
//
// Single source of truth for the /90-r-and-r landing page. Content is drawn
// from the R&R Master Blueprint (Section 9: 90-Day Structural Recalibration,
// the Three-Pillar Architecture, the DOSE engine, and Tradition 7 funding).
//
// A cohort program: one 1-day intensive bootcamp kicks it off, then 90 days
// of biology-first recovery telemetry. Max 12 seats. First cohort mid-Aug 2026.
// ---------------------------------------------------------------------------

// ⚙️ RESERVATION CONFIG — Michael: drop your Venmo handle here to go live.
// The "Reserve My Seat" button opens Venmo prefilled with the chosen amount.
// If venmoHandle is left blank, the button falls back to a mailto: so it's
// never a dead link. Deposit is a suggested $20 — pay-what-you-can (Trad. 7).
export const RESERVATION = {
  seatsTotal: 12,
  seatsClaimed: 0, // bump this as seats fill, or wire to Firestore later
  suggestedDeposit: 20,
  quickAmounts: [10, 20, 40], // "pay whatever you can" — $20 is the anchor
  venmoHandle: "Cong-Tran-28", // e.g. "aafiends"  →  https://venmo.com/aafiends
  reserveEmail: "reserve@aafiends.com", // fallback if Venmo not set
  note: "90 R&R Fellowship — seat deposit (pay-what-you-can, Tradition 7)",
};

/** Build the deposit link for a chosen amount. Venmo universal link works on
 *  web + mobile; falls back to a prefilled mailto if no handle is configured. */
export function buildDepositUrl(amount: number): string {
  const note = encodeURIComponent(RESERVATION.note);
  if (RESERVATION.venmoHandle) {
    return `https://venmo.com/${RESERVATION.venmoHandle}?txn=pay&amount=${amount}&note=${note}`;
  }
  const subject = encodeURIComponent(`Reserve my 90 R&R seat — $${amount} deposit`);
  const body = encodeURIComponent(
    `I'd like to reserve one of the 12 seats for the 90 Days R&R Fellowship.\n\n` +
      `Deposit I can put down today: $${amount} (pay-what-you-can).\n` +
      `Name / pseudonym:\nBest contact:\n`
  );
  return `mailto:${RESERVATION.reserveEmail}?subject=${subject}&body=${body}`;
}

export const RR_META = {
  name: "90 Days R&R",
  full: "Recovery & Restructure Fellowship",
  durationLabel: "1-Day Bootcamp + 90-Day Cohort",
  startLabel: "Mid-August 2026",
  tagline: "Biology First. Data Over Denial.",
  promise:
    "A 90-day structural recalibration for the first — and hardest — stretch of recovery. We don't treat the obsession of the mind alone; we rebuild the biological vessel underneath it, day by measurable day, alongside a small cohort that starts together and finishes together.",
  // Two missions — the two R's.
  missions: [
    {
      tag: "/* R1 · RECOVERY */",
      color: "#10b981",
      text: "Stabilize the hardware. Heal the CNS, reset the gut-brain axis, anchor your sleep, and pay for your dopamine up front with cold, movement, and light — so your nervous system stops screaming for the poison.",
    },
    {
      tag: "/* R2 · RESTRUCTURE */",
      color: "#f59e0b",
      text: "Rebuild the operating system. Set your Sanctuary, install daily telemetry, work the Steps as a structural audit, and restore the relationships and routines the virus tore down — a life the drink no longer fits inside.",
    },
  ],
};

// ---- Who it's for -----------------------------------------------------------
export const WHO_ITS_FOR = [
  {
    icon: "Flame",
    title: "The Trench",
    sub: "Days 0–90 sober",
    body: "You're in the deficit state — inflamed, foggy, running on willpower fumes. You don't need more theory; you need a structure simple enough to follow when your prefrontal cortex is offline.",
    color: "#10b981",
  },
  {
    icon: "Rocket",
    title: "The Founder / Burnout",
    sub: "Worth tied to output",
    body: "High-functioning and high-stress. You've tried to out-hustle the problem. This gives your ego a system to respect — HRV, baselines, protocols — instead of a slogan to roll your eyes at.",
    color: "#f59e0b",
  },
  {
    icon: "RefreshCw",
    title: "The Returner",
    sub: "Relapse-weary",
    body: "You've been sober before. You're done betting your life on discipline alone. R&R replaces the willpower gamble with objective telemetry, a cohort, and a 24-hour horizon you can actually hold.",
    color: "#00f0ff",
  },
];

// ---- The 1-Day Intensive Bootcamp ------------------------------------------
export const BOOTCAMP = {
  label: "Day 0 · The Kickoff",
  title: "The 1-Day Intensive Bootcamp",
  intro:
    "The Fellowship opens with one full-day, in-the-room intensive. By the time you leave, your baseline is calibrated, your Sanctuary is built, and your cohort knows your name. You don't drift into recovery — you launch into it.",
  agenda: [
    {
      icon: "Crosshair",
      title: "Calibrate your baseline",
      body: "Set your authoritative sobriety date, sync your wearable (Garmin / Whoop / Oura), and run the 12-question onboarding that maps you to your persona and your open ports.",
    },
    {
      icon: "Home",
      title: "Build your Sanctuary",
      body: "Clear the space, pour it out, and stand up the morning ignition stack — light anchor, hydration, and a clean desk you can actually think at.",
    },
    {
      icon: "Zap",
      title: "Fire the DOSE engine",
      body: "Live reps of the Dopamine Contrast Protocol — cold exposure, Zone 2 movement, breathwork — so you feel earned dopamine, decoupled from the substance, on Day 0.",
    },
    {
      icon: "Users",
      title: "Meet your cohort + Vanguard",
      body: "Twelve seats, one room. Get matched to a sponsor/Vanguard, trade contacts, and lock the covenant: we start together, we hold the line together.",
    },
  ],
};

// ---- The 90-Day Blueprint (accordion) --------------------------------------
export interface Phase {
  title: string;
  window: string;
  goal: string;
  items: { title: string; desc: string }[];
}

export const PHASES: Phase[] = [
  {
    title: "PHASE 1 · THE RESET",
    window: "Days 1–30 · Biological Reset",
    goal: "Survive withdrawal, stabilize the central nervous system, heal the gut-brain lining, and secure daily morning light. The mountain is just the next 24 hours.",
    items: [
      { title: "Day 1 — Sanctuary", desc: "Destroy the drug box, pour the alcohol down the drain, and clean the desk. The environment moves first." },
      { title: "Day 3 — Deepest deficit", desc: "The 'lead-suit' low. Decision fatigue peaks — we shrink your choices to protect what little bandwidth you have." },
      { title: "Day 4 — Gut reset", desc: "Initialize the microbiome repair with evening pasture-raised kefir; the gut synthesizes up to 90% of your serotonin." },
      { title: "Day 7 — Somatic maintenance", desc: "Begin spinal decompression and nerve glides — the sciatic flare is a sensor, not a nuisance." },
      { title: "Day 14 — Circadian lock", desc: "You start waking 15 minutes before your alarm. The light anchor is holding." },
      { title: "Day 30 — GABA repaired", desc: "Rebound jitters fade as GABA receptors recover. The engine idles instead of redlining." },
    ],
  },
  {
    title: "PHASE 2 · THE RESTRUCTURE",
    window: "Days 31–60 · Structural Rebuilding",
    goal: "Step down the chemical scaffolding, re-introduce conditioning as your own dopamine comes back online, and run the moral inventory as a structural audit.",
    items: [
      { title: "Days 31–40 — Step-down", desc: "Gradually recondition dopamine transporters to fire without assistance. The training wheels come off." },
      { title: "Day 45 — Zone 2 returns", desc: "Re-introduce strictly aerobic Zone 2 rucking. A heart-rate spike above Zone 2 is flagged as a cortisol breach." },
      { title: "Steps 4 & 5 — The audit", desc: "Share a searching moral inventory with your Vanguard — a code-audit of the behavioral subroutines flagged for refactoring." },
      { title: "Day 60 — The boredom milestone", desc: "You can sit in silence without a craving or racing thoughts. Peace stops reading as a threat." },
    ],
  },
  {
    title: "PHASE 3 · THE RECALIBRATION",
    window: "Days 61–90 · Reward Recalibration",
    goal: "Solidify natural reward pathways, restore relational integrity, and finish the technical-debt repair — until the baseline holds without white-knuckling.",
    items: [
      { title: "Day 70 — Sleep normalized", desc: "Garmin data confirms restored slow-wave, glymphatic sleep. The brain is finally taking out its own trash." },
      { title: "Day 80 — Joy returns", desc: "Serotonin baseline normalizes. Meals, sunlight, and ordinary moments start to register as good again." },
      { title: "Steps 8 & 9 — Amends loop", desc: "Formulate and execute relational repairs to clear the family emotional wreckage the virus left behind." },
      { title: "Day 90 — The Clearance", desc: "Dopamine, serotonin, and epinephrine systems recalibrated. The system is bulletproofed — and you graduate into the Grid." },
    ],
  },
];

// ---- The Three Pillars ------------------------------------------------------
export const PILLARS = [
  {
    name: "The Engine",
    sub: "The Biological Vessel",
    color: "#10b981",
    image: "/pillar_physical_real.png",
    body: "Your body is hardware in the shop. Sleep architecture, the morning ignition stack, DOSE contrast therapy, and somatic pain protocols — restore homeostasis with evidence, not affirmations.",
  },
  {
    name: "The Network",
    sub: "The Fellowship / The Grid",
    color: "#a855f7",
    image: "/pillar_network_real.png",
    body: "You can't out-think a virus alone. Meetings, sponsor/Vanguard check-ins, and a cohort of twelve — with a Human Handoff lock that freezes the app and sends you to a real person when you isolate.",
  },
  {
    name: "The Mirror",
    sub: "Daily Telemetry & VSE",
    color: "#00f0ff",
    image: "/pillar_mental_real.png",
    body: "An objective ledger that strips the addict ego out of self-evaluation. A daily digitized Step 10 scores your VSE out of 10 — so you're reading data, not your own denial.",
  },
];

// ---- What you get for the 90 days -------------------------------------------
export const DELIVERABLES = [
  { icon: "CalendarCheck", title: "1-Day Intensive Bootcamp", body: "The full-day in-room kickoff — baseline calibrated, Sanctuary built, cohort met." },
  { icon: "Activity", title: "Daily Telemetry Dashboard", body: "Log sleep, pain, meetings, and the DOSE stack in seconds — and watch the baseline heal." },
  { icon: "Gauge", title: "The VSE Score", body: "A daily Vanguard Score out of 10 that flags Redline days before they become relapse days." },
  { icon: "BookOpen", title: "The Foundry Journals", body: "The 7-day and 30-day paper ledgers — a structured daily Step 10 you can hold in your hand." },
  { icon: "Sparkles", title: "The AI Mirror", body: "Speak a raw check-in; get back a clean, structural read — defect loop named, somatic fix prescribed." },
  { icon: "UserCheck", title: "Vanguard / Sponsor Match", body: "Matched to a mentor by trigger and communication style, not left to chance." },
  { icon: "Radio", title: "Weekly Kernel Check", body: "A standing cohort sync — shared-burden maintenance so no one silently slips offline." },
  { icon: "Lock", title: "Private Cohort of 12", body: "One small, closed group that starts and finishes together. Anonymity honored (Traditions 11 & 12)." },
];

// ---- Safety promise ---------------------------------------------------------
export const SAFETY = [
  {
    icon: "ShieldCheck",
    color: "#10b981",
    title: "Sobriety First",
    body: "Every protocol serves the day count. The tech exists to be turned off — we teach you how.",
  },
  {
    icon: "PhoneCall",
    color: "#a855f7",
    title: "Human Handoff Lock",
    body: "Log three days without a meeting or sponsor call and the app freezes: 'I have no heartbeat. Go call your Vanguard.'",
  },
  {
    icon: "EyeOff",
    color: "#00f0ff",
    title: "Anonymity Guaranteed",
    body: "Use a pseudonym. Your telemetry lives in a private vault. Zero push notifications, zero public streaks.",
  },
];
