export const CRASH_COURSE_YOUTUBE_ID = "W-Ip9V3I2HE";
export const CRASH_COURSE_RUNTIME = "1h 20m";

export interface CourseChapter {
  timestamp: string;
  seconds: number;
  title: string;
}

export const CRASH_COURSE_CHAPTERS: CourseChapter[] = [
  { timestamp: "0:00", seconds: 0, title: "The morning you decide" },
  { timestamp: "6:07", seconds: 367, title: "How this works — the booklet, 3 pillars, the score" },
  { timestamp: "16:07", seconds: 967, title: "Day Zero — setup, your name, your date, your people" },
  { timestamp: "22:47", seconds: 1367, title: "The Infection — what A.I.V. actually is" },
  { timestamp: "30:28", seconds: 1828, title: "D.O.S.E. — the four chemicals you rebuild" },
  { timestamp: "39:41", seconds: 2381, title: "Day 1 — the lead suit" },
  { timestamp: "46:51", seconds: 2811, title: "Day 2 — the Engine: sleep, light, movement" },
  { timestamp: "53:01", seconds: 3181, title: "Day 3 — Fuel: the gut is the factory" },
  { timestamp: "1:00:25", seconds: 3625, title: "Day 4 — the Network: your first room" },
  { timestamp: "1:05:55", seconds: 3955, title: "Day 5 — earned dopamine: cold, effort, stillness" },
  { timestamp: "1:10:40", seconds: 4240, title: "Day 6 — the Mirror: ego, resentment, gratitude" },
  { timestamp: "1:15:20", seconds: 4520, title: "Day 7 — the kernel check" },
  { timestamp: "1:18:40", seconds: 4720, title: "The landing, and the next 90" },
];
