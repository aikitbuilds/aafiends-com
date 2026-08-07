/**
 * The AAfiends photo library — "Dawn Ledger" (August 2026 redesign).
 *
 * 16 documentary photographs on one shared grade: 35mm film grain, muted
 * teal-and-amber, deep near-black shadows, warm highlight on skin. Generated
 * with Creative Claw (Gemini 3.1 Flash Image) and reused across the site.
 *
 * See DESIGN.md → Photography for casting and placement rules.
 *
 * NOTE ON HOSTING: these currently point at the Creative Claw CDN, which is
 * configured in next.config.mjs remotePatterns. Before the next production
 * deploy, download each file into /public/photos/ and swap `src` to the local
 * path so the site owns its own assets and can serve them from Firebase.
 * Filenames below are already the intended local names.
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

const CDN = "https://cdn.creativeclaw.co/u/d0e5efed/images";

export const PHOTOS = {
  /** Hero — the whole site's opening image. */
  dawnRoad: {
    src: `${CDN}/69a561c3-fdcd-4119-86ac-32f85971e97f.jpg`,
    file: "dawn-road.jpg",
    alt: "A man walking alone on an empty road at dawn, morning sun rising over the hills behind him",
    ratio: "16:9",
  },

  /** Oxytocin, fellowship, the rooms. */
  meetingCircle: {
    src: `${CDN}/27533ed7-261b-4d78-b08f-6e77eea0c6ed.jpg`,
    file: "meeting-circle.jpg",
    alt: "A circle of six people of different ages laughing together at a church-basement recovery meeting",
    caption: "The rooms. The calls. The coffee.",
    ratio: "5:4",
  },

  /** Serotonin, stillness, the honest daily read. */
  kitchenJournal: {
    src: `${CDN}/b364ceac-c430-47e0-bc99-8274e1139639.jpg`,
    file: "kitchen-journal.jpg",
    alt: "A man at a kitchen table at dawn with coffee and an open journal, tired but steady",
    caption: "Stillness. The honest daily read.",
    ratio: "4:5",
  },

  /** Sponsorship, being heard, the hard conversation. */
  porchSteps: {
    src: `${CDN}/99463f26-8772-4f67-9ac4-522b8f24d397.jpg`,
    file: "porch-steps.jpg",
    alt: "Two men on porch steps over morning coffee, the older one listening while the younger talks",
    caption: "Someone who picks up.",
    ratio: "5:4",
  },

  /** Dopamine, cold exposure, earned shock. */
  coldLake: {
    src: `${CDN}/9cee9dc4-663b-44f7-988c-0ce9facc7adf.jpg`,
    file: "cold-lake.jpg",
    alt: "A woman waist-deep in a cold grey lake at sunrise, grinning through the shock",
    caption: "Cold water. Morning light. Finishing hard things.",
    ratio: "4:5",
  },

  /** Endorphins, effort, dignity. */
  bridgeRunner: {
    src: `${CDN}/ab8870c3-1f80-4d1b-b277-16e3cd9781ad.jpg`,
    file: "bridge-runner.jpg",
    alt: "A runner in his fifties paused on a bridge at sunrise, eyes closed, spent and proud",
    caption: "Hard effort, heat, and deep laughter.",
    ratio: "16:9",
  },

  /** The journal itself — writing by hand. */
  writingHands: {
    src: `${CDN}/84a1afbb-887f-48dc-b034-d55c2cbea514.jpg`,
    file: "writing-hands.jpg",
    alt: "Weathered hands writing in a lined paper journal at a kitchen table in raking morning light",
    caption: "Ten seconds a day, by hand.",
    ratio: "5:4",
  },

  /** Crisis, reaching out, being answered. */
  nightCall: {
    src: `${CDN}/c4d68ad9-dbbd-4b67-84f1-68722cae4f18.jpg`,
    file: "night-call.jpg",
    alt: "A woman on concrete front steps at night, phone to her ear, shoulders dropping in relief",
    caption: "The call you almost didn't make.",
    ratio: "4:5",
  },

  /** Meditation, the Mirror, stillness without mysticism. */
  windowStillness: {
    src: `${CDN}/936daf99-29d3-439a-ad0f-d156bfbae697.jpg`,
    file: "window-stillness.jpg",
    alt: "A man sitting cross-legged on a bare floor by a window in early morning light, eyes closed",
    caption: "Ten minutes before the day starts.",
    ratio: "5:4",
  },

  /** Fuel, gut serotonin, real food. */
  kitchenFuel: {
    src: `${CDN}/55f90741-6d0e-4f9d-8421-308b886fa4cd.jpg`,
    file: "kitchen-fuel.jpg",
    alt: "Hands at a worn wooden counter with an open jar of kimchi, kefir, chopped greens and a cabbage",
    caption: "Most of your serotonin is made down here.",
    ratio: "5:4",
  },

  /** The cohort, walking together, company on the road. */
  trailGroup: {
    src: `${CDN}/3e3003cd-c90f-4b48-8803-caa456dfa0f9.jpg`,
    file: "trail-group.jpg",
    alt: "Four adults of different ages walking a gravel trail together in morning light, mid-conversation",
    caption: "Company on the road.",
    ratio: "16:9",
  },

  /** Strength, the daily dose, age and effort. */
  gymLift: {
    src: `${CDN}/8de3404a-b8d0-47aa-9d26-8f13fd47f4bd.jpg`,
    file: "gym-lift.jpg",
    alt: "A woman in her late fifties mid-deadlift in a plain concrete gym, grey hair tied back, jaw set",
    caption: "Strength earned, not performed.",
    ratio: "4:5",
  },

  /** AI4AA, learning a skill, the returned hours. */
  lateLearning: {
    src: `${CDN}/081869f6-06b7-4925-8548-63d323844ffb.jpg`,
    file: "late-learning.jpg",
    alt: "A man at a kitchen table in the evening leaning into a laptop with a notebook beside him",
    caption: "The hours recovery hands back.",
    ratio: "5:4",
  },

  /** The book, reading, comprehension. */
  readingTable: {
    src: `${CDN}/f176db76-9a7d-44ab-9806-96cb12f76c89.jpg`,
    file: "reading-table.jpg",
    alt: "A woman in her forties absorbed in a worn paperback at a kitchen table, coffee going cold",
    caption: "Written down so it holds.",
    ratio: "4:5",
  },

  /** Stories, the hard talk, honesty. */
  carTalk: {
    src: `${CDN}/2c8e9f78-4e93-4a35-a840-ddcb401e1ce7.jpg`,
    file: "car-talk.jpg",
    alt: "Two men talking in a parked car at dusk seen through the windscreen, one listening intently",
    caption: "The conversation you have in a car.",
    ratio: "16:9",
  },

  /** Heat, endorphins, recovery protocol. */
  sauna: {
    src: `${CDN}/e4081cac-f213-407c-b12e-9afbaf14cb66.jpg`,
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
