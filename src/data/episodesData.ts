export type EpisodeStatus = "released" | "coming-soon";

export interface Episode {
  number: number;
  title: string;
  slug: string;
  status: EpisodeStatus;
  releaseDate: string;        // ISO, e.g. "2026-07-24"
  youtubeId?: string;         // set for released
  thumbnail: string;          // /thumbnails/epNN.png
  tagline: string;
  hook: string;               // one-line thumbnail/hook copy
  description: string;        // website blurb (prose)
  hashtags: string[];
}

export interface UpcomingEpisode {
  number: number;
  title: string;
  tagline: string;
}

export const EPISODES: Episode[] = [
  {
    number: 1,
    title: "The Fancy Rat Poison",
    slug: "the-fancy-rat-poison",
    status: "released",
    releaseDate: "2026-07-22",
    youtubeId: "oyjOI0iAlto",
    thumbnail: "/thumbnails/ep01.jpg",
    tagline: "Rebuild the Vessel",
    hook: "She only loves you when you're drinking.",
    description: "The pilot. Meet Aivy — the addiction, personified as the toxic wife who's sweet exactly when you're about to use and vicious the second you're healthy. She rebrands poison as romance and sells MT “just one.” He names the poison instead.",
    hashtags: ["sobriety", "recovery", "sobercurious", "AA", "addiction", "Step1", "DataOverDenial"],
  },
  {
    number: 2,
    title: "One Day at a Time",
    slug: "one-day-at-a-time",
    status: "released",
    releaseDate: "2026-07-23",
    youtubeId: "2A6MZlypuNE",
    thumbnail: "/thumbnails/ep02.png",
    tagline: "Just Today",
    hook: "You don't have to beat forever. Just today.",
    description: "Aivy tries to crush MT under the weight of *forever*, then taps in her cousin Ai-Ya — the backwards-cap bro face of the addiction — for the “one beer with the boys” pressure. White-knuckling forever is the pain side with no payoff; “one beer” is the pleasure spike billed later. The only dose he can carry is twenty-four hours.",
    hashtags: ["sobriety", "recovery", "onedayatatime", "AA", "mensmentalhealth", "DataOverDenial"],
  },
  {
    number: 3,
    title: "The First Week",
    slug: "the-first-week",
    status: "released",
    releaseDate: "2026-07-24",
    youtubeId: "KAFcUblwoiY",
    thumbnail: "/thumbnails/ep03.png",
    tagline: "Get Through the Week",
    hook: "Week one. She changes shape every single night.",
    description: "The first seven days — the hardest stretch. Aivy won't hold one form: the hangover gremlin on Day 1, the insomnia bat at 3 a.m. on Day 3, the sugar-frosted siren by Day 5, and “reasonable” again by Day 7. MT survives the way you survive week one — on the 24-hour dose, one shape at a time.",
    hashtags: ["sobriety", "recovery", "weekone", "withdrawal", "AA", "dopamine", "DataOverDenial"],
  },
  {
    number: 4,
    title: "Same Love Story",
    slug: "same-love-story",
    status: "coming-soon",
    releaseDate: "2026-07-27",
    thumbnail: "/thumbnails/ep04.png",
    tagline: "Same Love Story, New Costume",
    hook: "Three faces. One disease.",
    description: "The addiction stops pretending to be one thing. MT meets Aivy's “sisters” — Ivy (the drink), Coco (the party powder), and Pixie (the all-night escape) — and clocks the con: same girl, three costumes, same script to the same cheap folding chair. He doesn't have to beat all of them forever — he just can't go home with any of them today.",
    hashtags: ["sobriety", "recovery", "addiction", "sobercurious", "AA", "dopamine", "DataOverDenial"],
  },
  {
    number: 5,
    title: "The Usual Suspect",
    slug: "the-usual-suspect",
    status: "coming-soon",
    releaseDate: "2026-07-27",
    youtubeId: "nOrjhDvqU7M",
    thumbnail: "/thumbnails/ep05.png",
    tagline: "The Apocalypse Had an Open Bar the Whole Time",
    hook: "The one that took everything poured the drinks.",
    description: "A World War Z–style outbreak parody. A field investigator hunts patient zero of a plague turning ordinary people into hollow-eyed shamblers, and rounds up every obvious monster — cocaine, gambling, the screens. Cleared, all of them. The real culprit was the toast at every wedding, the round on every tab: legal, beloved, hiding in plain sight. The zombies aren't villains — they're ordinary people the disease got.",
    hashtags: ["sobriety", "recovery", "AA", "alcoholawareness", "sobercurious", "dopamine", "DataOverDenial"],
  },
  {
    number: 6,
    title: "Cheers",
    slug: "cheers",
    status: "coming-soon",
    releaseDate: "2026-07-28",
    youtubeId: "PMT8WcMKe10",
    thumbnail: "/thumbnails/ep06.png",
    tagline: "Where Everybody Knows Your Name",
    hook: "The one bar where nobody's drinking.",
    description: "A Cheers-meets-Night-of-the-Living-Dead parody. Outside, the street crawls with the “infected” — active addiction, brains burned down to the dopamine spike-and-crash. Inside, the AA meeting is the warmest bar in the city: Gary works the coffee like the taps, the room roars your name, and getting seen releases real oxytocin — a buffer against the next drink. MT walks through the horde into the one room his addiction can't follow him into.",
    hashtags: ["sobriety", "recovery", "AA", "fellowship", "oxytocin", "sobercurious", "DataOverDenial"],
  },
];

// Next slate. Titles set; dates TBD.
export const UPCOMING: UpcomingEpisode[] = [
  { number: 7, title: "Fellowship Fiends",     tagline: "Same Fiends. Cleaner Drug." },
  { number: 8, title: "Successful Sam",        tagline: "Handling It Isn't the Same as Free" },
  { number: 9, title: "The 20-Minute Standoff", tagline: "Outlast the Wave" },
];

/**
 * Get released episodes sorted by releaseDate ascending
 */
export function getReleased(): Episode[] {
  return EPISODES.filter((ep) => ep.status === "released").sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
}

/**
 * Get upcoming (coming-soon) episodes sorted by releaseDate ascending
 */
export function getUpcoming(): Episode[] {
  return EPISODES.filter((ep) => ep.status === "coming-soon").sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
}

/**
 * Format ISO date string (e.g. "2026-07-24") to human readable format (e.g. "Fri, Jul 24")
 */
export function formatReleaseDate(isoDate: string): string {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(Date.UTC(year, month, day));
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  return isoDate;
}
