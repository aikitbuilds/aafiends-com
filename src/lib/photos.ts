/**
 * The AAfiends photo library — "Dawn Ledger" (August 2026 redesign).
 *
 * 16 documentary photographs on one shared grade: 35mm film grain, muted
 * teal-and-amber, deep near-black shadows, warm highlight on skin. Generated
 * with Creative Claw (Gemini 3.1 Flash Image) and reused across the site.
 *
 * See DESIGN.md → Photography for casting and placement rules.
 *
 * Served from /public/photos — the site owns these assets.
 */

export type Photo = {
  /** Remote source. Swap to `/photos/<file>` once downloaded locally. */
  src: string;
  /** Intended local filename under /public/photos/ */
  file: string;
  /** Describes the person and the moment — never the file. */
  alt: string;
  /** Short line shown under section figures. Omit for heroes. */
  caption?: string;
  /** Native aspect, so layouts can pick the right frame. */
  ratio: "16:9" | "5:4" | "4:5";
};

export const PHOTOS = {
  /** Hero — the whole site's opening image. */
  dawnRoad: {
    src: "/photos/dawn-road.jpg",
    file: "dawn-road.jpg",
    alt: "A man walking alone on an empty road at dawn, morning sun rising over the hills behind him",
    ratio: "16:9",
  },

  /** Oxytocin, fellowship, the rooms. */
  meetingCircle: {
    src: "/photos/meeting-circle.jpg",
    file: "meeting-circle.jpg",
    alt: "A circle of six people of different ages laughing together at a church-basement recovery meeting",
    caption: "The rooms. The calls. The coffee.",
    ratio: "5:4",
  },

  /** Serotonin, stillness, the honest daily read. */
  kitchenJournal: {
    src: "/photos/kitchen-journal.jpg",
    file: "kitchen-journal.jpg",
    alt: "A man at a kitchen table at dawn with coffee and an open journal, tired but steady",
    caption: "Stillness. The honest daily read.",
    ratio: "4:5",
  },

  /** Sponsorship, being heard, the hard conversation. */
  porchSteps: {
    src: "/photos/porch-steps.jpg",
    file: "porch-steps.jpg",
    alt: "Two men on porch steps over morning coffee, the older one listening while the younger talks",
    caption: "Someone who picks up.",
    ratio: "5:4",
  },

  /** Dopamine, cold exposure, earned shock. */
  coldLake: {
    src: "/photos/cold-lake.jpg",
    file: "cold-lake.jpg",
    alt: "A woman waist-deep in a cold grey lake at sunrise, grinning through the shock",
    caption: "Cold water. Morning light. Finishing hard things.",
    ratio: "4:5",
  },

  /** Endorphins, effort, dignity. */
  bridgeRunner: {
    src: "/photos/bridge-runner.jpg",
    file: "bridge-runner.jpg",
    alt: "A runner in his fifties paused on a bridge at sunrise, eyes closed, spent and proud",
    caption: "Hard effort, heat, and deep laughter.",
    ratio: "16:9",
  },

  /** The journal itself — writing by hand. */
  writingHands: {
    src: "/photos/writing-hands.jpg",
    file: "writing-hands.jpg",
    alt: "Weathered hands writing in a lined paper journal at a kitchen table in raking morning light",
    caption: "Ten seconds a day, by hand.",
    ratio: "5:4",
  },

  /** Crisis, reaching out, being answered. */
  nightCall: {
    src: "/photos/night-call.jpg",
    file: "night-call.jpg",
    alt: "A woman on concrete front steps at night, phone to her ear, shoulders dropping in relief",
    caption: "The call you almost didn't make.",
    ratio: "4:5",
  },

  /** Meditation, the Mirror, stillness without mysticism. */
  windowStillness: {
    src: "/photos/window-stillness.jpg",
    file: "window-stillness.jpg",
    alt: "A man sitting cross-legged on a bare floor by a window in early morning light, eyes closed",
    caption: "Ten minutes before the day starts.",
    ratio: "5:4",
  },

  /** Fuel, gut serotonin, real food. */
  kitchenFuel: {
    src: "/photos/kitchen-fuel.jpg",
    file: "kitchen-fuel.jpg",
    alt: "Hands at a worn wooden counter with an open jar of kimchi, kefir, chopped greens and a cabbage",
    caption: "Most of your serotonin is made down here.",
    ratio: "5:4",
  },

  /** The cohort, walking together, company on the road. */
  trailGroup: {
    src: "/photos/trail-group.jpg",
    file: "trail-group.jpg",
    alt: "Four adults of different ages walking a gravel trail together in morning light, mid-conversation",
    caption: "Company on the road.",
    ratio: "16:9",
  },

  /** Strength, the daily dose, age and effort. */
  gymLift: {
    src: "/photos/gym-lift.jpg",
    file: "gym-lift.jpg",
    alt: "A woman in her late fifties mid-deadlift in a plain concrete gym, grey hair tied back, jaw set",
    caption: "Strength earned, not performed.",
    ratio: "4:5",
  },

  /** AI4AA, learning a skill, the returned hours. */
  lateLearning: {
    src: "/photos/late-learning.jpg",
    file: "late-learning.jpg",
    alt: "A man at a kitchen table in the evening leaning into a laptop with a notebook beside him",
    caption: "The hours recovery hands back.",
    ratio: "5:4",
  },

  /** The book, reading, comprehension. */
  readingTable: {
    src: "/photos/reading-table.jpg",
    file: "reading-table.jpg",
    alt: "A woman in her forties absorbed in a worn paperback at a kitchen table, coffee going cold",
    caption: "Written down so it holds.",
    ratio: "4:5",
  },

  /** Stories, the hard talk, honesty. */
  carTalk: {
    src: "/photos/car-talk.jpg",
    file: "car-talk.jpg",
    alt: "Two men talking in a parked car at dusk seen through the windscreen, one listening intently",
    caption: "The conversation you have in a car.",
    ratio: "16:9",
  },

  /** Heat, endorphins, recovery protocol. */
  sauna: {
    src: "/photos/sauna.jpg",
    file: "sauna.jpg",
    alt: "A man on a cedar sauna bench, head tipped back, flushed and beaded with sweat in the steam",
    caption: "Heat as medicine.",
    ratio: "4:5",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/** Every photo, for the /public download script and for contact sheets. */
export const ALL_PHOTOS = Object.entries(PHOTOS).map(([key, p]) => ({
  key: key as PhotoKey,
  ...p,
}));
