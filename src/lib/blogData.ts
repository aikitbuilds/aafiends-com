/**
 * AAFiends science blog — content data.
 *
 * Added 2026-07-04 (Michael: "create 5-8 science based blogs about aafiends.com
 * with stats, infographics... for an interactive and easy to read and
 * understand blogs/report. more details will be on the substack based on
 * these teaser blogs."). Modeled on RaceFiends.com's /blog pattern
 * (lib/blogData.ts + BlogContent.tsx section renderer) but themed to
 * AAFiends' emerald/black system instead of RaceFiends' red, and with a
 * different section vocabulary (statgrid/timeline/barchart instead of
 * calculator/mantras) since these posts are built around real numbers
 * pulled from the research/ folder rather than RaceFiends' ledger mechanic.
 *
 * IMPORTANT re: images — there is no photoreal image generator available in
 * this environment (confirmed with Michael before building). Every post
 * uses a code-generated gradient + icon "visual" (see PostVisual in
 * BlogContent.tsx / the blog pages) instead of a photo, and every
 * "infographic" is a real, interactive, code-rendered chart built from the
 * actual numbers cited in each post's sources — not a static image.
 *
 * Every stat below is traceable to a specific research doc already surveyed
 * this session:
 * - research/BIO 12 — The Physical Recovery Protocol...md
 * - research/_Analyze the 2024-2026 peer-reviewed clinical lite.md
 * - research/all of the new technology that's available to assi.md
 * Where a research doc itself flags a number as illustrative, estimated, or
 * not yet measured in humans, the post says so explicitly — same standard
 * applied to the dashboard's Vanguard percentage estimate.
 */

export type PillarAccent = "engine" | "mirror" | "network" | "cross";

export const PILLAR_STYLES: Record<PillarAccent, { label: string; text: string; bg: string; border: string; dot: string; glow: string }> = {
  engine: { label: "Engine", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", dot: "bg-red-500", glow: "rgba(239,68,68,0.35)" },
  mirror: { label: "Mirror", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", dot: "bg-blue-500", glow: "rgba(59,130,246,0.35)" },
  network: { label: "Network", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", dot: "bg-purple-500", glow: "rgba(168,85,247,0.35)" },
  cross: { label: "Ecosystem", text: "text-[#10b981]", bg: "bg-[#10b981]/10", border: "border-[#10b981]/20", dot: "bg-[#10b981]", glow: "rgba(16,185,129,0.35)" },
};

export type BlogSection =
  | { type: "markdown"; content: string }
  | { type: "pullquote"; text: string; author?: string }
  | { type: "comparison"; title: string; leftTitle: string; leftPoints: string[]; rightTitle: string; rightPoints: string[] }
  | { type: "workflow"; title: string; steps: { title: string; desc: string }[] }
  | { type: "statgrid"; title?: string; stats: { value: string; label: string; sublabel?: string }[] }
  | { type: "timeline"; title: string; phases: { range: string; label: string; desc: string }[] }
  | { type: "barchart"; title: string; unit?: string; bars: { label: string; value: number; sublabel?: string }[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  pillar: PillarAccent;
  icon: string;
  sources: string[];
  content: string;
  sections: BlogSection[];
}

const SUBSTACK_CTA: BlogSection = {
  type: "markdown",
  content: `
---

This is the teaser version. The full breakdown — with the complete citation list, the caveats the summary above skips, and how this maps onto your own check-in data — runs on **The Deficit**, our long-form Substack. This page will link there directly once it's live.
  `,
};

export const blogPosts: BlogPost[] = [
  {
    slug: "90-day-brain-reset",
    title: "The 90-Day Reset: What's Actually Happening in Your Brain",
    excerpt: "Sobriety isn't a light switch. It's a phased biological repair job, and the real timeline is longer — and stranger — than most people expect.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "6 min read",
    pillar: "cross",
    icon: "brain",
    sources: ["BIO 12 — The Physical Recovery Protocol", "2024-2026 clinical literature synthesis on D2 receptor recovery"],
    content: "Sobriety isn't a light switch...",
    sections: [
      {
        type: "markdown",
        content: `
If you're a few weeks in and still feel flat — no motivation, food tastes like cardboard, nothing is fun yet — that isn't you doing recovery wrong. It's called the **Deficit State**, and it's a predictable, physiological phase, not a character problem.

Chronic alcohol and stimulant use suppress dopamine firing in the brain's reward circuit (the VTA and striatum) and disrupt serotonin production, most of which actually happens in your gut, not your head. When the substance goes away, those systems don't snap back — they have to physically rebuild, on a schedule your willpower doesn't control.
        `,
      },
      {
        type: "timeline",
        title: "The Repair Schedule",
        phases: [
          { range: "Days 1–14", label: "Detox", desc: "Acute withdrawal. Dopamine-producing cell firing in the VTA is measurably reduced — this is the flat, gray period, and it's expected." },
          { range: "Days 15–30", label: "Early Stabilization", desc: "Dopamine baseline starts recalibrating. Early cortical thickening begins in imaging studies." },
          { range: "Days 30–90", label: "Critical Window", desc: "The fastest rate of measurable brain change in the entire recovery timeline — and the highest relapse vulnerability, because the repair isn't done yet." },
          { range: "Months 7–18", label: "Neurochemical Recovery", desc: "Dopamine D2/D3 receptor density continues rebuilding — this runs well past the first 90 days most programs focus on." },
        ],
      },
      {
        type: "markdown",
        content: `
That last phase surprises people. Full dopamine receptor repair from chronic alcohol use has been tracked out to roughly **14 months** in some studies — nearly five times longer than the "90 days" most people set as their mental finish line. Serotonin recovery from stimulants like MDMA tends to move faster, over weeks to months, but it's still not instant.

None of this is a reason to give up on tracking progress at 30 or 90 days — those windows genuinely matter, especially for relapse risk. It's a reason to stop treating flat mood at day 25 as proof something's broken.
        `,
      },
      {
        type: "statgrid",
        title: "The Numbers",
        stats: [
          { value: "0–7 days", label: "Acute dopamine dip", sublabel: "VTA firing rate drops fastest here" },
          { value: "30–90 days", label: "Fastest brain change", sublabel: "Also the highest relapse-risk window" },
          { value: "~14 months", label: "Full D2/D3 receptor repair", sublabel: "Chronic alcohol use, tracked in the literature" },
        ],
      },
      {
        type: "pullquote",
        text: "Anhedonia at Day 25 is not a protocol failure — it is the neurological fact.",
      },
      {
        type: "markdown",
        content: `
This is exactly why the Mirror pillar exists as a *daily* check-in instead of a weekly mood survey. A single bad day means very little on its own. A trend line across 30, 60, and 90 days is what actually tells you whether the repair is on schedule — which is a much more useful thing to look at than how you feel at 6am on a Tuesday.
        `,
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "sleep-undoes-a-week",
    title: "Why One Bad Night of Sleep Undoes a Week of Progress",
    excerpt: "Sleep deprivation doesn't just make you tired. It downregulates the exact same dopamine receptors that cocaine and alcohol do — voluntarily, for free, every time you skip it.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "5 min read",
    pillar: "engine",
    icon: "moon",
    sources: ["BIO 12 — The Physical Recovery Protocol"],
    content: "Sleep deprivation doesn't just make you tired...",
    sections: [
      {
        type: "markdown",
        content: `
Here's an uncomfortable fact from the research: one single night of sleep deprivation reduces striatal D2/D3 dopamine receptor availability in the nucleus accumbens — **the same brain region compromised by cocaine and alcohol.** A person in early recovery who sleeps badly is, without meaning to, keeping their reward system in a state that looks a lot like the thing they're recovering from.

Sleep deprivation isn't just a symptom of a rough patch, either — a 2026 NIH review lists it as a **causal factor** in relapse, not just a side effect of one.
        `,
      },
      {
        type: "statgrid",
        title: "Why Sleep Isn't Optional",
        stats: [
          { value: "1 night", label: "Is enough to measurably drop D2/D3 receptor availability" },
          { value: "+45%", label: "Increase in D2 receptor binding", sublabel: "When sleep is properly restored — the brain compensating upward" },
          { value: "Causal", label: "Not just correlated", sublabel: "NIH's 2026 review lists poor sleep as a relapse driver, not a symptom" },
        ],
      },
      {
        type: "markdown",
        content: `
The good news is that this cuts both ways. If bad sleep degrades the same system substances do, good sleep is direct maintenance on it — not a nice-to-have wellness habit sitting next to recovery, but part of the same repair job.
        `,
      },
      {
        type: "workflow",
        title: "The Actual Protocol",
        steps: [
          { title: "Same window, every day", desc: "Consistent sleep and wake times, within about 30 minutes — the regularity matters as much as the total hours." },
          { title: "7–9 hours, cold/dark/quiet", desc: "Duration and environment both matter. A short, disrupted night doesn't count even if the clock says 8 hours." },
          { title: "Track it daily", desc: "A single night tells you little. A sleep-score trend across weeks tells you whether the repair is actually on schedule." },
        ],
      },
      {
        type: "pullquote",
        text: "A recovering addict who sleeps poorly is involuntarily keeping their own system compromised.",
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "dose-framework",
    title: "The DOSE Framework: Getting Your Four Chemicals Back Without the Substance",
    excerpt: "Alcohol doesn't just hit one system — it floods four at once, then cripples your ability to make any of them on your own. Here's how to rebuild each one separately.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "6 min read",
    pillar: "cross",
    icon: "sparkles",
    sources: ["Perplexity research chain on AI/tech and DOSE framework in recovery"],
    content: "Alcohol doesn't just hit one system...",
    sections: [
      {
        type: "markdown",
        content: `
DOSE is shorthand researchers use for the four chemical systems behind most of what makes us feel good: **D**opamine (reward, anticipation), **O**xytocin (bonding, trust), **S**erotonin (mood, contentment), **E**ndorphins (pain relief, euphoria).

Alcohol's trick is that it floods all four at once — which is exactly why nothing else feels like it, at first. The cost is that it also degrades the brain's ability to produce each one independently over time. Recovery isn't just removing the substance; it's rebuilding four separate supply chains that got outsourced to a drug.
        `,
      },
      {
        type: "comparison",
        title: "Where Each Chemical Actually Comes From",
        leftTitle: "The Substance Shortcut",
        leftPoints: [
          "Floods dopamine, oxytocin, serotonin, and endorphins simultaneously",
          "No effort required — the brain stops bothering to produce its own",
          "Tolerance builds fast; natural production atrophies faster",
          "One tool doing four jobs badly, long-term",
        ],
        rightTitle: "The Natural Supply Chain",
        rightPoints: [
          "Dopamine: movement, completed goals, novelty, cold exposure",
          "Oxytocin: in-person connection — meetings are literally an oxytocin protocol",
          "Serotonin: gut health — 90% of it is made in the gut, not the brain",
          "Endorphins: sustained exercise, laughter, physical touch",
        ],
      },
      {
        type: "statgrid",
        stats: [
          { value: "90%", label: "Of serotonin is made in the gut", sublabel: "Not the brain — gut health is a mood intervention, not just a digestion one" },
          { value: "4-for-1", label: "What alcohol replaces", sublabel: "One substance standing in for four separate biological systems" },
        ],
      },
      {
        type: "pullquote",
        text: "Meetings help with oxytocin. Structured physical programming targets all four systems at once.",
      },
      {
        type: "markdown",
        content: `
This is the actual argument for treating meetings, movement, and gut-friendly nutrition as one connected system rather than three separate to-do items — they're not competing priorities, they're four chemical repair jobs that happen to overlap.
        `,
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "cold-heat-hard-miles",
    title: "Cold, Heat, and Hard Miles: The Real Chemistry of a Dopamine Reset",
    excerpt: "Cold plunges and rucking aren't just trends. Here are the actual measured dopamine and norepinephrine numbers, and the safety limits most people skip past.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "6 min read",
    pillar: "engine",
    icon: "snowflake",
    sources: ["2024-2026 clinical synthesis on cold exposure, sauna, and Zone 2 training"],
    content: "Cold plunges and rucking aren't just trends...",
    sections: [
      {
        type: "markdown",
        content: `
Cold exposure, heat exposure, and steady-state cardio all produce measurable, drug-free spikes in dopamine and norepinephrine. The numbers are bigger than most people expect — and the safety margins are narrower than most people assume, especially at the extremes.
        `,
      },
      {
        type: "barchart",
        title: "Measured Increase Over Baseline",
        unit: "%",
        bars: [
          { label: "Cold plunge (57°F, 60 min) — norepinephrine", value: 530, sublabel: "Largest single acute spike measured" },
          { label: "Cold plunge (57°F, 60 min) — dopamine", value: 250 },
          { label: "Traditional sauna (176°F) — norepinephrine", value: 310, sublabel: "Upper end of the studied range" },
          { label: "Zone 2 rucking — chronic dopamine baseline", value: 32, sublabel: "After 8 weeks of consistent training, not a single session" },
        ],
      },
      {
        type: "markdown",
        content: `
That last one is the one worth sitting with: rucking's dopamine effect isn't a single-session rush, it's a **baseline shift** after 8 weeks of showing up — 3 sessions a week, about 40 minutes each, at 70–75% max heart rate. Resting norepinephrine actually *drops* over that same period, which is the nervous system calming its resting tone while keeping full reactivity in reserve for when it's needed.

Cortisol follows a specific arc with cold exposure too: flat-to-modest during the plunge itself, a real reduction window around 12 hours after, and full habituation after about 12 weeks of consistent 3x/week practice.
        `,
      },
      {
        type: "comparison",
        title: "Where the Safety Line Actually Is",
        leftTitle: "Studied, Reasonable Range",
        leftPoints: [
          "Cold: 43–60°F for 1–5 minutes, ~11 total minutes per week",
          "Heat: traditional 176°F Finnish sauna, standard session lengths",
          "Cardio: 70–75% max heart rate, ~30–40 min, 3x per week",
          "Build up gradually from warmer water/shorter sessions",
        ],
        rightTitle: "Where Risk Rises Sharply",
        rightPoints: [
          "Cold below ~47°F for extended periods — hypothermia, arrhythmia risk",
          "Any cold plunge with unscreened cardiac history",
          "Sauna sessions pushed for duration over tolerance",
          "Skipping acclimatization and going straight to the extreme end",
        ],
      },
      {
        type: "pullquote",
        text: "At the coldest end of the range, cardiac screening and a strict 1–2 minute cap aren't optional extras — they're the baseline safety requirement.",
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "recovery-score-science",
    title: "Why Your Wearable's \"Recovery Score\" Actually Means Something",
    excerpt: "WHOOP, Oura, and Garmin all compute a daily recovery number. Here's what's actually inside that black box, and why the Mirror pillar borrows the same logic.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "5 min read",
    pillar: "mirror",
    icon: "activity",
    sources: ["Industry research on wearable recovery-score architectures"],
    content: "WHOOP, Oura, and Garmin all compute a daily recovery number...",
    sections: [
      {
        type: "markdown",
        content: `
No wearable manufacturer publishes their exact formula, and no composite recovery score has been clinically validated against real health outcomes — that's worth saying up front. But the reverse-engineered architecture is consistent across every major platform, and it's a genuinely good model for anyone tracking their own recovery: **weight physiological signals against your own rolling baseline, never against a population average.**
        `,
      },
      {
        type: "barchart",
        title: "What Each Platform Weighs Most",
        unit: "%",
        bars: [
          { label: "WHOOP — HRV", value: 40 },
          { label: "WHOOP — Resting Heart Rate", value: 35 },
          { label: "WHOOP — Sleep Performance", value: 25 },
          { label: "Oura — Sleep Balance", value: 35 },
          { label: "Oura — HRV Balance", value: 25 },
          { label: "Oura — Recovery Index", value: 20 },
        ],
      },
      {
        type: "markdown",
        content: `
Garmin's Body Battery works a little differently — it's a continuous tank rather than a morning reset, charging roughly 6–8 points per hour during deep sleep and draining under HRV-measured stress throughout the day. All three converge on the same underlying idea even with different math: **your own trend is the only baseline that matters.**

That's the exact principle the Mirror pillar's check-in trend is built on — not comparing you to anyone else's numbers, just tracking whether *your* numbers are moving in the right direction relative to where you personally started.
        `,
      },
      {
        type: "pullquote",
        text: "Personalized rolling baseline — never population norms.",
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "relapse-prediction",
    title: "Relapse Prediction: Why Daily Check-Ins Beat Waiting Until It's Too Late",
    excerpt: "Machine learning models can now flag a lapse hours before it happens with striking accuracy. The Mirror pillar's daily check-in is a low-tech version of the same idea.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "4 min read",
    pillar: "mirror",
    icon: "radar",
    sources: ["AI/tech landscape research on relapse-prediction models"],
    content: "Machine learning models can now flag a lapse hours before it happens...",
    sections: [
      {
        type: "markdown",
        content: `
One of the more striking findings in recent recovery-tech research: AI relapse-prediction models, trained on daily behavioral and physiological signals, can flag a lapse **hour-by-hour with 90–93% accuracy** — often early enough to deliver an intervention before the drink actually happens. In at least one deployed tool, this cut heavy drinking days in half.
        `,
      },
      {
        type: "statgrid",
        stats: [
          { value: "90–93%", label: "Accuracy predicting a lapse", sublabel: "Hour-by-hour, from daily behavioral signal trends" },
          { value: "50%", label: "Reduction in heavy drinking days", sublabel: "In one deployed tool using this approach" },
        ],
      },
      {
        type: "markdown",
        content: `
The AAFiends Mirror doesn't run a machine-learning model behind the scenes — it's a daily check-in, reflected back in plain language. But the underlying logic is the same one these prediction systems rely on: **the signal that matters isn't any single day, it's the trend.** A model can't predict a lapse from one data point any more than you can — it needs the pattern building up to it.
        `,
      },
      {
        type: "workflow",
        title: "The Low-Tech Version of the Same Idea",
        steps: [
          { title: "Log it daily", desc: "Ten seconds of sliders, most days — consistency matters more than depth on any single day." },
          { title: "Watch the trend, not the day", desc: "One rough check-in means little. Three in a row pointed the same direction means something." },
          { title: "Catch drift before it becomes a decision", desc: "The goal is to see the slide starting while it's still just data — before it turns into a choice you're arguing yourself into." },
        ],
      },
      {
        type: "pullquote",
        text: "The goal isn't predicting the future. It's noticing the present a little earlier than you normally would.",
      },
      SUBSTACK_CTA,
    ],
  },
  {
    slug: "handwriting-vs-typing",
    title: "Why Handwriting Your Step Work Still Beats Typing It",
    excerpt: "Handwriting activates more of the brain than typing does, and the retention difference is measurable. Here's why the Mirror lets you choose how you process a thought.",
    author: "AAfiends Research",
    date: "Jul 4, 2026",
    readTime: "4 min read",
    pillar: "network",
    icon: "pen-tool",
    sources: ["Handwriting neuroscience meta-analysis; AI + handwriting hybrid workflow research"],
    content: "Handwriting activates more of the brain than typing does...",
    sections: [
      {
        type: "markdown",
        content: `
This one runs against the grain of building an AI-powered app, so it's worth saying plainly: **handwriting still beats typing for the deep, emotional processing work recovery actually requires** — Step 4 inventories, working through a resentment, anything that needs to actually sink in rather than just get recorded.
        `,
      },
      {
        type: "statgrid",
        stats: [
          { value: "13 vs 10", label: "Brain regions activated", sublabel: "Handwriting vs. typing — including motor planning and memory consolidation circuits typing doesn't touch" },
          { value: "g = 0.248", label: "Retention effect size", sublabel: "2024 meta-analysis across 24 studies — a real, measurable advantage" },
        ],
      },
      {
        type: "comparison",
        title: "Different Tools, Different Jobs",
        leftTitle: "Handwriting",
        leftPoints: [
          "Deep neurological encoding — the brain processes it through physical motion",
          "Best for Step work, resentment inventories, anything that needs to actually land",
          "Slower by design — the friction is the point",
          "Nothing searchable, nothing pattern-matched across 90 days",
        ],
        rightTitle: "Typing / Voice (the Mirror)",
        rightPoints: [
          "Fast capture — good for daily check-ins, not deep processing",
          "Searchable and trend-tracked across weeks and months",
          "AI can spot patterns a single handwritten page can't reveal on its own",
          "Available at 3am when a craving hits and a notebook isn't within reach",
        ],
      },
      {
        type: "pullquote",
        text: "Handwriting does the deep neurological encoding. AI does what handwriting can't — it finds the pattern across 90 days of entries.",
      },
      {
        type: "markdown",
        content: `
That's the actual reasoning behind letting you choose talk, type, or write by hand during onboarding, rather than assuming everyone processes the same way. Neither tool replaces the other — they're doing different jobs.
        `,
      },
      SUBSTACK_CTA,
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
