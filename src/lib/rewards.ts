/**
 * AAF Rewards — the ecosystem points + chip system.
 *
 * Two layers, on purpose:
 *  1) AAF CHIPS  — permanent achievement medallions, the digital twin of the AA
 *     sobriety chip. Earned purely from *verified* sobriety time (server reads
 *     the honest sobrietyDate), so they can't be gamed and carry real meaning.
 *  2) AAF POINTS — a spendable score. Always DERIVED server-side from honest
 *     source data (sobriety milestones + logged meetings + service) minus what's
 *     been redeemed, so there is no stored, client-writable balance to spoof.
 *
 * Redemptions are a mix of symbolic (themes/badges) and real-world (mailed
 * items, Fellowship-fund donations). Real-world items are milestone-gated to
 * keep it restrained and Tradition-friendly (no pay-to-win, recovery isn't
 * commercialized). All awarding/redeeming happens in /api/rewards (server).
 */

export interface ChipTier {
  days: number;
  key: string;
  name: string;
  blurb: string;
  bonus: number; // AAF points granted the first time this chip is reached
}

export const CHIP_TIERS: ChipTier[] = [
  { days: 1, key: "desire", name: "Desire Chip", blurb: "24 hours. You showed up.", bonus: 25 },
  { days: 30, key: "m1", name: "30-Day Chip", blurb: "One month. The reset holds.", bonus: 300 },
  { days: 60, key: "m2", name: "60-Day Chip", blurb: "Two months. Momentum.", bonus: 300 },
  { days: 90, key: "m3", name: "90-Day Chip", blurb: "90 days. The clearance.", bonus: 600 },
  { days: 180, key: "m6", name: "6-Month Chip", blurb: "Half a year. Baseline restored.", bonus: 900 },
  { days: 270, key: "m9", name: "9-Month Chip", blurb: "Nine months. Steady.", bonus: 1200 },
  { days: 365, key: "y1", name: "1-Year Chip", blurb: "A year. A new life.", bonus: 1500 },
];

/** Per-action point values (all server-verified against source data). */
export const POINTS = {
  perMeeting: 15,       // each logged fellowship meeting
  perSponsorAction: 25, // each logged sponsor / service session (the user chose "points like any action")
  perFeedback: 20,      // submitting feedback / a suggestion
};

export type RedeemType = "symbolic" | "real" | "payitforward";

export interface Redemption {
  id: string;
  name: string;
  blurb: string;
  cost: number;
  type: RedeemType;
  requiresDays?: number; // milestone gate for real-world items
}

export const REDEMPTIONS: Redemption[] = [
  { id: "theme_gold", name: "Gold Dashboard Theme", blurb: "A warmer skin for your dashboard.", cost: 200, type: "symbolic" },
  { id: "badge_vanguard", name: "Vanguard Profile Badge", blurb: "Show your service on your profile.", cost: 400, type: "symbolic" },
  { id: "leaderboard", name: "Leaderboard Entry (pseudonymous, opt-in)", blurb: "Compare streaks anonymously.", cost: 150, type: "symbolic" },
  { id: "sticker_pack", name: "AAF Sticker Pack (mailed)", blurb: "Physical stickers, shipped to you.", cost: 1200, type: "real", requiresDays: 30 },
  { id: "medallion_1yr", name: "Engraved 1-Year Medallion (mailed)", blurb: "A real medallion for your year.", cost: 3650, type: "real", requiresDays: 365 },
  { id: "fellowship_fund", name: "Donate to the Fellowship Fund", blurb: "Sponsor a newcomer's seat — pay it forward.", cost: 500, type: "payitforward" },
];

export function daysSoberFrom(sobrietyDate?: string | null): number {
  if (!sobrietyDate) return 0;
  const t = new Date(sobrietyDate).getTime();
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.floor((Date.now() - t) / 86400000));
}

/** Chips whose day-threshold has been reached. */
export function earnedChips(daysSober: number): ChipTier[] {
  return CHIP_TIERS.filter((c) => daysSober >= c.days);
}

/** The next chip not yet earned (or null if all earned). */
export function nextChip(daysSober: number): ChipTier | null {
  return CHIP_TIERS.find((c) => daysSober < c.days) ?? null;
}

export interface EarnInputs {
  daysSober: number;
  meetingsCount: number;
  sponsorActions?: number;
  feedbackCount?: number;
}

/** Total lifetime points earned — computed purely from verified source data. */
export function earnedPoints(i: EarnInputs): number {
  const chipBonus = earnedChips(i.daysSober).reduce((s, c) => s + c.bonus, 0);
  return (
    chipBonus +
    (i.meetingsCount || 0) * POINTS.perMeeting +
    (i.sponsorActions || 0) * POINTS.perSponsorAction +
    (i.feedbackCount || 0) * POINTS.perFeedback
  );
}

export const REWARDS_LEVELS = [
  { min: 0, name: "Initiate" },
  { min: 500, name: "Inducted" },
  { min: 1500, name: "Bounded" },
  { min: 4000, name: "Vanguard" },
  { min: 9000, name: "Architect" },
];

export function levelFor(lifetimePoints: number) {
  let lvl = REWARDS_LEVELS[0];
  for (const l of REWARDS_LEVELS) if (lifetimePoints >= l.min) lvl = l;
  return lvl;
}
