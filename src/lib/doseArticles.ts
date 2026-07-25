/**
 * DOSE Field Guides for /90rr — added 2026-07-24.
 *
 * Two long-form, cited articles that reuse the existing blog section system
 * (BlogPost + BlogContent renderer) but live under /90rr instead of /blog,
 * per Michael's request ("deploy it on the website as an article and shopping
 * list under /90rr"). Both are built on the D.O.S.E. architecture already used
 * across the ecosystem (Dopamine / Oxytocin / Serotonin / Endorphins) and the
 * BIO 12 physical-recovery protocol.
 *
 * Every stat is traceable to a source already in the vault research/ folder:
 *  - research/BIO 12 — The Physical Recovery Protocol...md
 *  - research/The 24-Hour Biological Reset — Clinical Analysis...md
 *  - research/_Analyze the 2024-2026 peer-reviewed clinical lite.md
 * The D.O.S.E. framing is adapted from TJ Power's *The DOSE Effect* (2024).
 * Not medical advice — every article carries that line explicitly.
 *
 * New section types used here (see blogData.ts / BlogContent.tsx / DoseFigures.tsx):
 *   figure · image · callout · shoppinglist
 */

import type { BlogPost } from "@/lib/blogData";

const NOT_MEDICAL =
  "This is personal experience and cited science, not medical or clinical advice. Alcohol and benzodiazepine withdrawal can be dangerous — if you are still drinking daily or physically dependent, detox under medical supervision before changing anything. Talk to your doctor, especially about cold exposure if you have a heart condition.";

/* ================================================================== */
/*  ARTICLE 1 — THE DOSE KITCHEN (food & drink)                        */
/* ================================================================== */
export const doseFuel: BlogPost = {
  slug: "fuel",
  title: "The DOSE Kitchen: Food & Drink That Rebuilds All Four Chemicals",
  excerpt:
    "Alcohol and drugs strip-mine the four chemicals your good days run on. Here's the grocery list that hands your body the raw materials back — dopamine, oxytocin, serotonin, and endorphins, from the ground up.",
  author: "MT · AAfiends",
  date: "Jul 24, 2026",
  readTime: "9 min read",
  pillar: "engine",
  icon: "wine",
  sources: [
    "BIO 12 — The Physical Recovery Protocol (vault research)",
    "The 24-Hour Biological Reset — Clinical Analysis of a Polysubstance Recovery Protocol (vault research)",
    "2024–2026 peer-reviewed clinical literature synthesis (gut-brain axis, D2 recovery)",
    "TJ Power, The DOSE Effect (2024)",
  ],
  content: "Food is the first repair job.",
  sections: [
    {
      type: "markdown",
      content: `
If you're a few weeks in and food tastes like cardboard, nothing is fun, and your mood is a flat gray line — that isn't you doing recovery wrong. It's the **Deficit State**, and it's physiological, not a character flaw.

Here's the short version, and I promise no 2 a.m. science lecture. Your brain runs on four chemicals people call **D.O.S.E.** — Dopamine, Oxytocin, Serotonin, Endorphins. Think of them as four old friends who've quietly been running your good days your whole life. The substance didn't invent a fifth chemical to hurt you. It found a way to flood all four at once, through one door — and your brain, built to stay level, turned the volume down to compensate. Take the substance away and the volume is still down. That's the flat feeling. It's real, it's temporary, and **the fastest thing you control is what you put in your mouth.**
      `,
    },
    { type: "figure", id: "seesaw" },
    {
      type: "markdown",
      content: `
You can't supplement your way past biology. But your body literally builds these chemicals out of things you eat — **dopamine and serotonin are assembled from amino acids in food**, and about **90% of your serotonin is manufactured in your gut**, not your head. Feed the factory the right raw materials and you're not "boosting" anything. You're handing recovery its supply chain.

Here's the whole map on one card.
      `,
    },
    { type: "figure", id: "matrix" },
    {
      type: "markdown",
      content: `
### D — Dopamine: protein is the raw material

Dopamine is built from **tyrosine**, an amino acid you get from protein. A recovering brain is running with fewer dopamine receptors (D2/D3) than it used to — chronic alcohol use blunts them, and the density can take **up to 14 months** to fully rebuild. You can't rush that timeline, but starving it of building blocks makes it slower. Protein at every meal — eggs, lean beef, chicken, fish, tofu, beans, pumpkin seeds — keeps tyrosine in the tank.
      `,
    },
    {
      type: "statgrid",
      title: "The Dopamine Numbers",
      stats: [
        { value: "~14 mo", label: "Full D2/D3 receptor repair", sublabel: "Chronic alcohol use, tracked in imaging studies" },
        { value: "Tyrosine", label: "The precursor amino acid", sublabel: "From protein → converted to dopamine" },
        { value: "Every meal", label: "Protein target", sublabel: "Keeps the raw material steady, not spiked" },
      ],
    },
    {
      type: "markdown",
      content: `
### S — Serotonin: the road runs through your gut

This is the one almost nobody gets told. Roughly **90% of the body's serotonin is produced in the gut** by its lining — not the brain. Alcohol and stimulants like MDMA devastate the gut microbiome, which directly depletes your primary serotonin infrastructure. That's a big part of why early sobriety feels anxious and joyless: the factory got wrecked.

Rebuilding it is not a diet. It's **restoring the microbiome** with fermented foods — kefir, kimchi, sauerkraut, live-culture yogurt — plus the fiber those bacteria feed on. A 2025 study found kefir specifically modulates gut bacteria to **balance serotonin homeostasis**, which is exactly the system MDMA and alcohol deplete.
      `,
    },
    {
      // Custom image — generated by Antigravity via Google AI Studio (gemini-2.5-flash-image).
      // Prompt + drop path are specified in ANTIGRAVITY-DEPLOY-90RR-DOSE-ARTICLES-V1.md.
      // SmartImage hides this cleanly until the file exists at the path below.
      type: "image",
      src: "/90rr/img/dose-fuel-food.png",
      alt: "Overhead of whole foods, fermented jars, and fresh produce on a dark surface",
      caption: "Whole food, fermented food, fiber — microbiome repair is serotonin repair",
      accent: "#00f0ff",
    },
    {
      type: "comparison",
      title: "Feeds the Virus vs. Feeds the Repair",
      leftTitle: "Feeds the Virus",
      leftPoints: [
        "Ultra-processed food — sustains the inflammation that blunts the prefrontal cortex (your impulse control)",
        "Added sugar — its own spike-and-crash dopamine loop",
        "Seed oils and fried food — inflammatory load the gut doesn't need",
        "Skipping meals — dehydration and low blood sugar mimic H.A.L.T. cravings",
        "Energy drinks late — wrecks the sleep that rebuilds dopamine receptors",
      ],
      rightTitle: "Feeds the Repair",
      rightPoints: [
        "Protein at every meal — tyrosine (dopamine) and tryptophan (serotonin) precursors",
        "Fermented foods daily — rebuild the gut that makes 90% of your serotonin",
        "Prebiotic fiber — oats, beans, greens, onions, garlic feed the good bacteria",
        "Omega-3 fats — salmon, sardines, walnuts lower brain inflammation",
        "Water first — dehydration is a relapse vulnerability, not just thirst",
      ],
    },
    {
      type: "markdown",
      content: `
### O — Oxytocin & E — Endorphins: the small daily levers

Oxytocin, the bonding chemical, isn't really "eaten" — the real lever is **a shared meal with a real person** instead of eating alone over a screen. But **dark chocolate (85%+)**, citrus, and magnesium-rich greens support the system while you do the human part.

Endorphins are your built-in painkillers. The kitchen shortcut is **capsaicin** — the mild burn of chili, cayenne, or ginger triggers a genuine endorphin release. Dark chocolate hits here too. (The bigger endorphin lever is movement — that's the next field guide.)
      `,
    },
    {
      type: "pullquote",
      text: "You are not boosting your brain. You are handing a repair crew the materials it has been asking for the whole time.",
      author: "MT",
    },
    {
      type: "markdown",
      content: `
### The repair stack + what to drink

A few things do heavier lifting than their size suggests, and they're mostly things you drink:

- **Water, first and often.** Dehydration mimics the exact irritability and fatigue that read as cravings. This is the cheapest win in recovery.
- **Kefir** — a probiotic you drink; gut-brain axis repair in a glass.
- **Bone broth & collagen** — amino acids plus the minerals a depleted body is short on.
- **Green tea** — L-theanine gives calm focus without the jitter-crash of energy drinks.
- **Coffee, but timed.** Wait **90–120 minutes after waking** before your first cup. Coffee at the moment you wake doesn't clear the sleep chemical adenosine — it just masks it, and you crash harder later. Delay it and you extend real alertness instead of stacking on jitter.

And three supplements the research keeps flagging for recovering brains, not as performance hacks but as **repair substrate**: **creatine (5g/day)** — direct energy for a brain running on empty; **omega-3** — lowers the inflammation blocking your executive control; **magnesium** — sleep, calm, and the mineral alcohol strips fastest.
      `,
    },
    {
      type: "callout",
      tone: "warn",
      title: "Read this before you change anything",
      body: NOT_MEDICAL,
    },
    {
      type: "shoppinglist",
      title: "The DOSE Grocery List",
      note: "Print it, screenshot it, take it to the store. Grouped by the chemical it rebuilds. You do not need all of it — pick two things from each column and start.",
      groups: [
        {
          name: "D — Dopamine (Protein)",
          accent: "green",
          items: [
            { name: "Eggs", detail: "tyrosine + choline; the cheapest dopamine fuel there is" },
            { name: "Lean beef / chicken / turkey", detail: "protein at every meal" },
            { name: "Salmon or sardines", detail: "protein + omega-3, double duty", tag: "2x/wk" },
            { name: "Tofu / tempeh", detail: "plant-based tyrosine" },
            { name: "Beans & lentils", detail: "protein + prebiotic fiber" },
            { name: "Pumpkin seeds", detail: "tyrosine + magnesium, snackable" },
          ],
        },
        {
          name: "S — Serotonin (Gut)",
          accent: "cyan",
          items: [
            { name: "Kefir", detail: "drinkable probiotic — the single best gut-repair buy", tag: "daily" },
            { name: "Kimchi / sauerkraut", detail: "live fermented; buy refrigerated, not shelf-stable" },
            { name: "Live-culture yogurt", detail: "plain, unsweetened" },
            { name: "Oats", detail: "prebiotic fiber the good bacteria feed on" },
            { name: "Bananas, onions, garlic", detail: "more prebiotic fuel" },
            { name: "Turkey / oats / seeds", detail: "tryptophan — the serotonin precursor" },
          ],
        },
        {
          name: "O + E — Oxytocin & Endorphins",
          accent: "purple",
          items: [
            { name: "Dark chocolate 85%+", detail: "hits both; small square, not a bar" },
            { name: "Chili / cayenne / fresh ginger", detail: "capsaicin = endorphin release" },
            { name: "Citrus (oranges, lemons)", detail: "vitamin C supports oxytocin" },
            { name: "Leafy greens", detail: "magnesium for calm + release" },
            { name: "One meal to share", detail: "the real oxytocin lever isn't a food — it's company" },
          ],
        },
        {
          name: "The Repair Stack + Drinks",
          accent: "amber",
          items: [
            { name: "Water", detail: "buy a bottle you'll actually carry", tag: "first" },
            { name: "Bone broth", detail: "amino acids + minerals" },
            { name: "Green tea", detail: "calm focus, no crash — swap for energy drinks" },
            { name: "Creatine monohydrate", detail: "5g/day; brain energy substrate", tag: "5g" },
            { name: "Omega-3 (fish oil)", detail: "if you don't eat fish 2x/week" },
            { name: "Magnesium glycinate", detail: "evening; sleep + calm" },
          ],
        },
        {
          name: "Leave On The Shelf",
          accent: "red",
          items: [
            { name: "Ultra-processed / packaged snacks", detail: "sustains brain inflammation" },
            { name: "Added sugar & soda", detail: "its own spike-and-crash loop" },
            { name: "Energy drinks", detail: "sabotages the sleep that rebuilds dopamine" },
            { name: "Seed / fried oils", detail: "inflammatory load the gut doesn't need" },
          ],
        },
      ],
    },
    {
      type: "markdown",
      content: `
---

None of this is a diet, and none of it is willpower. It's a supply run. Your body already knows how to rebuild dopamine, oxytocin, serotonin, and endorphins — it's been doing it your whole life. The kitchen is just where you stop starving the repair crew and start handing them the materials.

The next field guide is the other half of this: how to make the same four chemicals with **movement, cold, sunlight, and the rooms** — no substance, no receipt.

*— MT*

*The D.O.S.E. framework is adapted from TJ Power's* The DOSE Effect *(2024). Not medical advice — sourced where the science is cited.*
      `,
    },
  ],
};

/* ================================================================== */
/*  ARTICLE 2 — THE RESET (natural regulation + cold plunge build)     */
/* ================================================================== */
export const doseReset: BlogPost = {
  slug: "reset",
  title: "The Reset: How to Regulate Dopamine Without a Substance",
  excerpt:
    "Walking, cold, sunlight, and the rooms — the earned menu that rebuilds the dopamine system a substance wore down. Plus a full build: turn a chest freezer into a 40°F cold plunge for about $600.",
  author: "MT · AAfiends",
  date: "Jul 24, 2026",
  readTime: "11 min read",
  pillar: "cross",
  icon: "snowflake",
  sources: [
    "The 24-Hour Biological Reset — Clinical Analysis of a Polysubstance Recovery Protocol (vault research)",
    "BIO 12 — The Physical Recovery Protocol (vault research)",
    "University at Buffalo RIA — aerobic exercise & mesolimbic dopamine",
    "Šrámek et al. / cold-water immersion dopamine studies; Wim Hof Method literature",
    "2014 neurobiological model of AA fellowship & oxytocin",
  ],
  content: "You can make all four chemicals without a substance.",
  sections: [
    {
      type: "markdown",
      content: `
Here's the trap nobody draws for you. A drink or a hit is a **tall, fast dopamine spike** — and what goes up that fast crashes *below* where it started. That dip below baseline is the craving. So you go again, and the baseline sinks a little more each time.

The way out isn't more willpower against the spike. It's a different **shape**. Cold water, a hard walk, sunlight, a meeting — these raise dopamine **gently and leave you above baseline for hours**, with no crash. Same chemical. Opposite curve. This is the whole game: stop buying the spike, start earning the slope.
      `,
    },
    { type: "figure", id: "curve" },
    {
      type: "markdown",
      content: `
### 1. Walk. It's the most underrated drug you own.

Aerobic movement is the most powerful **non-pharmacological D2-receptor restoration tool** known to science — the exact receptors alcohol and stimulants blunt. University at Buffalo's Research Institute on Addictions found daily aerobic exercise literally **alters the mesolimbic dopamine pathway** and helps prevent relapse across alcohol, nicotine, stimulants, and opioids. In methamphetamine users, structured exercise **repaired striatal D2/D3 receptor deficits** on PET imaging.

You don't need a marathon. **Days 1–14: walk 20 minutes a day. Do not push.** That's the dose. Every walk is a receptor installation.
      `,
    },
    {
      type: "statgrid",
      title: "The Movement Numbers",
      stats: [
        { value: "20 min", label: "Starting dose", sublabel: "A daily walk, first two weeks — that's it" },
        { value: "D2/D3", label: "Receptors it rebuilds", sublabel: "The same ones substances blunt" },
        { value: "2 weeks", label: "Effect outlasts the exercise", sublabel: "Receptor signaling stayed elevated after stopping, in animal studies" },
      ],
    },
    {
      type: "image",
      src: "/90rr/img/dose-reset-walk.png",
      alt: "A person walking alone along a path at sunrise, seen from behind",
      caption: "Days 1–14: twenty minutes, outside, every day. The pavement is the protocol.",
      accent: "#10b981",
    },
    {
      type: "markdown",
      content: `
### 2. Get the morning right: light, then sleep

Ten to fifteen minutes of **outdoor morning light** sets your body clock: a clean dopamine bump now, and melatonin arriving on time tonight. That matters because sleep is where dopamine receptors get rebuilt — and here's the brutal part: **one night of bad sleep downregulates the same D2/D3 receptors that cocaine and alcohol do.** Skipping sleep is voluntarily keeping your system compromised. Protect it like the medicine it is: 7–9 hours, no screens after 9:30, cold and dark room.

### 3. Cold — the single strongest natural dopamine anchor

This is the big one. Cold-water immersion can raise baseline dopamine by **up to 250%**, and unlike a substance it's a **slow, sustained release that lasts for hours** — no crash. Wim Hof describes the cold as activating "the internal pharmacy," the deep brain regions tied to your own opioids and dopamine. Critically, it doesn't *bypass* your reward system the way a drug does — it **rehabilitates the exact pathway substances damaged.** Every plunge is a deposit in the recovery account.
      `,
    },
    {
      type: "statgrid",
      title: "The Cold Numbers",
      stats: [
        { value: "+250%", label: "Baseline dopamine rise", sublabel: "Cold-water immersion, sustained for hours" },
        { value: "~40°F", label: "The target water temp", sublabel: "Cold enough to work, safe with a timer" },
        { value: "2–3 min", label: "Where beginners start", sublabel: "Not 10. Build up slowly." },
      ],
    },
    {
      type: "markdown",
      content: `
### 4. The rooms — oxytocin is a real anti-craving drug

Addiction is a disease of isolation, and left alone the mind uses **your own voice** to talk you back out. The antidote is biological. Sitting in a meeting, calling a sponsor, helping a newcomer — eye contact and shared story **release oxytocin**, which a 2014 neurobiological model shows shifts the brain from reactive "wanting" toward stable "liking," and cross-activates the very serotonin system stimulants deplete. This is why meetings work beyond the accountability. You can't out-argue isolation. You can out-*attend* it.
      `,
    },
    {
      type: "pullquote",
      text: "Left alone, the mind uses your own voice to talk you back out — and you will believe it. A room full of people is the one place that voice can't win.",
      author: "MT",
    },
    {
      type: "workflow",
      title: "The Daily Reset — Four Free Anchors",
      steps: [
        { title: "Morning: Light + Cold", desc: "10 min of outdoor light, then a cold shower or plunge. Sets the clock and anchors dopamine before the day starts." },
        { title: "Midday: The Walk", desc: "20 minutes, outside, phone in pocket. The D2 receptor installation. Non-negotiable, even on the flat days." },
        { title: "Contact: The Room or the Call", desc: "A meeting, a sponsor call, or helping one person. Oxytocin — the biological opposite of isolation." },
        { title: "Night: Stillness + Sleep", desc: "Screens off by 9:30, five minutes of quiet or box breathing, cold dark room. Sleep rebuilds the receptors." },
      ],
    },
    {
      type: "markdown",
      content: `
## Build the tool: a 40°F cold plunge from a chest freezer

You can pay $5,000 for a plunge tub. Or you can build one that holds a perfect 40°F, on a timer, for around **$600** — and most of that is a freezer you can find used on Facebook Marketplace. Here's exactly how it goes together.
      `,
    },
    { type: "figure", id: "cutaway" },
    {
      type: "workflow",
      title: "The Build — Step by Step",
      steps: [
        { title: "1. Source the freezer", desc: "A chest freezer, new ($150–250) or used off Marketplace ($60–150). Look for one you can sit in — roughly 5–7 cu ft. Clean it, test that it powers on. Trash pickups and moving sales are full of these." },
        { title: "2. Seal & insulate", desc: "Silicone-seal every interior seam (aquarium-grade, food-safe). Optional but worth it: wrap the outside in foam board or spray foam to hold temperature and cut how often the compressor runs." },
        { title: "3. Wire the temperature controller", desc: "Plug the freezer into an Inkbird ITC-308. It cuts power when the water hits your set point and kicks it back on when it drifts. Set it to ~40°F. This one $35 part is what makes the whole thing work — the freezer's own thermostat can't do water." },
        { title: "4. Add circulation + a UV filter", desc: "A small submersible or pond pump keeps water moving so it never freezes into a solid block. Run it through an inline UV clarifier + filter to kill bacteria and algae so the water stays clean between changes." },
        { title: "5. Power it safely", desc: "Everything plugs into a GFCI outlet or a GFCI extension. Water plus electricity is the one place you do not improvise. If you're unsure, have an electrician check it — once." },
        { title: "6. Fill, set, and dial in", desc: "Fill with clean water, set the ITC-308 to 40°F, let it pull down overnight. Add a lid (foam or the freezer's own) to hold temp. Start at 2–3 minutes. Build from there." },
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Safety — non-negotiable",
      body:
        "Everything electrical runs through a GFCI. Never do breath-holds (Wim Hof style) in or near the water — shallow-water blackout is a real, documented fatality risk; finish your breathing on dry land first. Start at 2–3 minutes, not 10. Get out if you stop shivering or feel disoriented. Talk to your doctor before cold exposure if you have any heart condition, high blood pressure, or are pregnant.",
    },
    {
      type: "image",
      src: "/90rr/img/dose-reset-cold.png",
      alt: "Cold blue water with ice, close up",
      caption: "40°F, on a timer, for hours a day — the most powerful natural dopamine anchor you can own",
      accent: "#00f0ff",
    },
    {
      type: "shoppinglist",
      title: "Shopping List — The Cold Plunge Build",
      note: "Roughly $500–650 all in, most of it the freezer. Parts are widely available; the exact controller and clarifier below are the ones the DIY plunge community has standardized on.",
      groups: [
        {
          name: "The Core Build",
          accent: "cyan",
          items: [
            { name: "Chest freezer, 5–7 cu ft", detail: "new $150–250, or used on FB Marketplace $60–150", tag: "$60–250" },
            { name: "Inkbird ITC-308 temp controller", detail: "the part that makes it hold 40°F", tag: "~$35" },
            { name: "Submersible / pond pump", detail: "keeps water circulating so it can't freeze solid", tag: "~$30" },
            { name: "UV clarifier + inline filter", detail: "kills bacteria & algae between water changes", tag: "~$60" },
            { name: "GFCI outlet or extension cord", detail: "water-plus-power safety — not optional", tag: "~$20" },
          ],
        },
        {
          name: "Seal, Insulate & Maintain",
          accent: "amber",
          items: [
            { name: "Food-safe silicone sealant", detail: "aquarium-grade, seal every interior seam" },
            { name: "Foam board or spray foam", detail: "wrap the shell — holds temp, cuts run-time" },
            { name: "Insulated lid", detail: "foam cut-to-fit, or reuse the freezer lid" },
            { name: "Hydrogen peroxide or chlorine granules", detail: "small dose to keep water clear" },
            { name: "Waterproof thermometer", detail: "verify the controller's reading" },
            { name: "Step stool + grab surface", detail: "safe in and out" },
          ],
        },
      ],
    },
    {
      type: "shoppinglist",
      title: "Shopping List — The Free Menu",
      note: "The other half of dopamine regulation costs nothing. This is the 'buy-in' — mostly just showing up.",
      groups: [
        {
          name: "Costs $0",
          accent: "green",
          items: [
            { name: "A 20-minute walk", detail: "daily; the D2 receptor installation" },
            { name: "10 min of morning sunlight", detail: "sets the clock, times melatonin" },
            { name: "A cold shower", detail: "the plunge's little brother; start here today" },
            { name: "An AA / recovery meeting", detail: "oxytocin; find one at aa.org or your local hub" },
            { name: "Calling one person", detail: "sponsor, friend, newcomer — breaks isolation" },
            { name: "5 min of box breathing", detail: "4-4-4-4; resets the nervous system at night" },
          ],
        },
        {
          name: "Small Buy-In (optional)",
          accent: "purple",
          items: [
            { name: "Decent walking shoes", detail: "removes the last excuse" },
            { name: "A fitness watch", detail: "sleep + HRV; makes progress visible" },
            { name: "The 90 R&R Journal", detail: "tracks all of it daily", url: "/90rr" },
            { name: "A meeting schedule", detail: "printed, on the fridge; make it default" },
          ],
        },
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Read this before you change anything",
      body: NOT_MEDICAL,
    },
    {
      type: "markdown",
      content: `
---

Every one of these — the walk, the light, the cold, the room — makes the same chemicals the substance was counterfeiting. The difference is the shape of the curve and who you become on the way up. A spike you buy leaves you lower than it found you. A slope you earn leaves you higher, and it compounds.

Build the plunge this weekend if you can. But you can start the free menu in the next ten minutes: put on shoes, walk out the door, and let the sun hit your face. That's the first deposit.

*— MT*

*Sourced where the science is cited. Not medical advice. The D.O.S.E. framing is adapted from TJ Power's* The DOSE Effect *(2024).*
      `,
    },
  ],
};

export const DOSE_ARTICLES: BlogPost[] = [doseFuel, doseReset];

export function getDoseArticle(slug: string): BlogPost | undefined {
  return DOSE_ARTICLES.find((a) => a.slug === slug);
}
