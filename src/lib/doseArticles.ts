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

/* ================================================================== */
/*  ARTICLE 3 — THE MIRROR: VIPASSANA (stillness & the craving gap)     */
/* ================================================================== */
export const doseMirror: BlogPost = {
  slug: "meditation",
  title: "The Mirror: Vipassana — Learning to Sit With the Craving Instead of Obeying It",
  excerpt:
    "The craving isn't the problem. Believing you have to act on it is. Vipassana is the free, ten-minutes-a-day practice that puts a gap between the trigger and the drink — and it's the one leg of recovery you can start tonight, in a chair, for nothing.",
  author: "MT · AAfiends",
  date: "Jul 25, 2026",
  readTime: "11 min read",
  pillar: "mirror",
  icon: "sun",
  sources: [
    "Bowen et al., Vipassana meditation and substance use in an incarcerated population, Psychology of Addictive Behaviors (2006)",
    "Bowen et al., Relative Efficacy of Mindfulness-Based Relapse Prevention (MBRP), JAMA Psychiatry (2014)",
    "G. Alan Marlatt — urge surfing / Mindfulness-Based Relapse Prevention",
    "Anna Lembke, Dopamine Nation (2021) — the pleasure-pain balance",
    "James Clear, Atomic Habits (2018) — cue → craving → response → reward",
    "S.N. Goenka / Vipassana tradition — Anapana + body scan",
  ],
  content: "The third leg of recovery is the quiet one.",
  sections: [
    {
      type: "markdown",
      content: `
For years I thought the quiet was the enemy. The reason I drank wasn't really the party — it was the ten minutes alone in the kitchen before it, when my own head got loud. Silence felt like a room where every bad thing I'd ever done was waiting to talk. So I never sat in it. I drank *over* it.

That's the part almost no one tells you when you get sober: the drink was never the disease. It was the **cure** I'd found for a mind I couldn't be alone with. Take the drink away and the loud room is still there. This page is about the tool that finally let me walk into that room and sit down — for free, in a chair, ten minutes at a time. It's called **Vipassana**, and it's the practice under the third pillar of the 90 R&R: **The Mirror.**
      `,
    },
    {
      type: "markdown",
      content: `
## What Vipassana actually is (no incense required)

The word means "to see things as they really are." Strip away the retreats and the robes and it's almost aggressively simple. You sit still, and you watch what's already happening — your breath going in and out, and the raw physical sensations moving through your body — **without doing anything about them.** You don't chase the good ones. You don't run from the bad ones. You just notice, and let them pass.

That's it. Two moves:

**Anapana** — you rest your attention on the natural breath. Not controlling it, just feeling it come and go at the nostrils. When the mind wanders (it will, constantly), you notice, and come back. The coming-back *is* the rep.

**The body scan** — you move your attention slowly through the body, top of the head to the toes, noticing whatever's there: warmth, tightness, itch, a dull ache, nothing at all. The one instruction is **equanimity** — you meet a pleasant sensation and an unpleasant one with the exact same calm attention. You stop bargaining with your own body.

Sounds like nothing. It's the whole game. Because a craving *is* a sensation — a physical event with a wave shape — and learning to watch a sensation without obeying it is the exact skill that keeps you sober.
      `,
    },
    {
      type: "markdown",
      content: `
## Why this works on alcoholism specifically — the dopamine part

Here's the short version, no 2 a.m. lecture. Your brain has a "wanting" system that runs on **dopamine.** It's ancient and dumb and it only knows one job: when a cue predicts a reward, it fires a pulse of *wanting* to make you go get it. Alcohol hijacked that system — it flooded it so hard and so often that your brain turned the dial down to protect itself. Now, sober, the dial is still down (that's the flat gray feeling), but the *wanting* circuit is still wired to your old cues: 5 p.m., the drive home, an argument, a certain song, payday.

So a trigger hits and the dopamine system fires **"go get it"** before the thinking part of your brain — the prefrontal cortex, your brakes — even wakes up. That gap, where the craving arrives fully formed and *feels like a command*, is where relapse lives. Willpower loses here because willpower shows up late, already exhausted, trying to win an argument the craving started three seconds ago.

Vipassana doesn't delete the craving. **It trains the brakes.** Every time you sit and watch a sensation rise and fall without acting, you're doing a rep in the exact circuit — noticing an impulse, *not obeying it* — that a trigger demands in real life. You're building a gap between the cue and the response. And a gap is all sobriety ever needs.
      `,
    },
    { type: "figure", id: "seesaw" },
    {
      type: "markdown",
      content: `
That seesaw is Dr. Anna Lembke's picture of it (*Dopamine Nation*): every hit of easy pleasure tips the board, and the brain slams an equal weight down on the **pain** side to level it. Drink enough and you live on the pain side sober — that's craving. You can't buy your way back to level; a spike just tips it harder. But you *can* let the board settle on its own by learning to sit through the discomfort instead of medicating it. Sitting still is how the seesaw finds level again.
      `,
    },
    {
      type: "markdown",
      content: `
## Cravings and triggers are waves — this is "urge surfing"

The psychologist Alan Marlatt gave this its best name: **urge surfing.** A craving is not a straight line that climbs forever until you drink. It's a **wave.** It rises, it peaks, and — if you don't feed it by staring at the bottle or arguing with yourself — **it crests and falls on its own.** Left alone, most urges peak and pass within about **20–30 minutes.**

The trap is that in the moment a craving feels permanent, like it will only get worse until you cave. Vipassana teaches your nervous system the truth in its own language: *this sensation is temporary, and I can watch it go by without drowning.* You stop fighting the wave (which makes it bigger) and stop obeying it (which makes it win). You sit on your board and let it roll under you. Twenty minutes later it's gone and you're still sober — and your brain just filed away one enormous piece of evidence: **I can have a craving and not drink.** Do that enough times and the craving loses its authority.
      `,
    },
    {
      type: "pullquote",
      text: "The craving was never the enemy. The lie inside it was — that it would last forever and only a drink could end it. Sit still for twenty minutes and you watch that lie die on its own.",
      author: "MT",
    },
    {
      type: "statgrid",
      title: "The Evidence — This Isn't Woo",
      stats: [
        { value: "20–30 min", label: "How long an urge lasts", sublabel: "If you don't feed it, it peaks and passes (Marlatt, urge surfing)" },
        { value: "12 mo", label: "MBRP's edge shows up long-term", sublabel: "Fewer days of use & less heavy drinking vs. standard relapse prevention (Bowen, JAMA Psychiatry 2014)" },
        { value: "Post-jail", label: "Vipassana cut relapse", sublabel: "Reduced alcohol, cannabis & cocaine use after release vs. usual care (Bowen 2006)" },
      ],
    },
    {
      type: "markdown",
      content: `
The prison study is the one that convinced me. Researchers taught a 10-day Vipassana course to incarcerated people and tracked them after release. Compared to standard treatment, the meditators drank less, used less, and had fewer alcohol-related problems — and the effect ran *through* one specific change: they **stopped avoiding their own thoughts.** That's the whole mechanism in a sentence. The people who got better were the ones who learned to stop running from what was in their head. Which is exactly what I'd been drinking to avoid.
      `,
    },
    {
      type: "markdown",
      content: `
## How to actually do it — two sessions, start tonight

You don't need a retreat, an app subscription, or a "clear mind." Your mind will not be clear. That is not the goal. The goal is to *notice* it wandered and come back — that's the entire exercise, and every wander-and-return is a rep for your brakes. A "bad" session where you got distracted 200 times and came back 200 times is 200 reps. There is no failing this.

Sit in a chair, feet flat, back straight but not stiff, hands in your lap. Eyes closed or soft-focused down. That's the whole setup.
      `,
    },
    {
      type: "workflow",
      title: "The 15-Minute Session — the daily minimum",
      steps: [
        { title: "0:00–2:00 · Settle", desc: "Sit. Take three slow breaths to arrive. Tell yourself the only rule: for the next 15 minutes I am not fixing anything, just watching. Set a timer so you're not clock-watching." },
        { title: "2:00–8:00 · Anapana (the breath)", desc: "Rest attention on the natural breath at the nostrils — cool in, warm out. Don't control it. When you notice you've drifted into thinking, that noticing is the win. Gently return to the breath. Repeat forever. This calms and sharpens the attention you'll use next." },
        { title: "8:00–14:00 · Body scan", desc: "Move attention slowly from the top of your head down to your toes. Notice each area — tingling, warmth, tightness, or nothing. Meet every sensation, pleasant or not, with the same calm. If a craving or a hard feeling shows up, treat it as just another sensation: locate it in the body, watch it, don't obey it." },
        { title: "14:00–15:00 · Close", desc: "Take one deliberate breath. Notice you sat with your own mind for 15 minutes and survived it. Log it in the journal (the Mirror pillar). That check-mark is the rep that counts twice." },
      ],
    },
    {
      type: "workflow",
      title: "The 30-Minute Session — the deeper reset",
      steps: [
        { title: "0:00–3:00 · Settle", desc: "Same arrival, a little longer. Three slow breaths, set the intention to simply observe, start the timer. Give the body a minute to stop fidgeting — that's normal, let it." },
        { title: "3:00–13:00 · Anapana (extended breath)", desc: "Ten minutes on the breath. As it steadies, narrow the focus — feel the breath on a smaller and smaller patch of skin below the nostrils. This sharpens concentration enough to feel subtle sensations in the scan. Wander, notice, return — hundreds of times. All reps." },
        { title: "13:00–26:00 · Full body scan", desc: "Thirteen unhurried minutes, head to toe and, if you have time, back up again. Equanimity is the whole practice: the itch you want to scratch and the ache you want gone get the same calm attention as the pleasant warmth. This is where you practice the exact move a craving demands — feel it fully, do nothing." },
        { title: "26:00–30:00 · Rest & metta", desc: "Drop the technique. Sit in the open quiet for a couple of minutes. Optionally, send one honest good wish to yourself and one to someone you resent — that's the oxytocin/Network leg reaching into the Mirror. Then close, and log it." },
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Free tools — no reason not to start tonight",
      body:
        "You don't need a paid app. Declutter The Mind is genuinely free — 500+ guided meditations including Vipassana and body scan, no ads, no subscription, no upsell (declutterthemind.com, or the iOS/Android app). Their YouTube channel — 'straightforward Buddhist meditation for everyone, including devout atheists' — has full guided 15- and 30-minute sessions you can play right now. Search 'Declutter The Mind body scan' or 'guided Vipassana' on YouTube. Prefer no voice at all? Set a timer and follow the steps above. That's the original method.",
    },
    {
      type: "markdown",
      content: `
## Making it a habit that actually sticks — the Atomic Habits build

Knowing how to meditate is easy. Doing it on day 34, when you're tired and the flat feeling is back and it feels pointless, is the actual problem. This is where James Clear's *Atomic Habits* earns its place as the backbone of the whole 90 R&R. His habit loop is the same loop the addiction ran on — **cue → craving → response → reward** — and here you're finally pointing it at something that heals you. Four moves build it:
      `,
    },
    {
      type: "comparison",
      title: "Willpower vs. The System",
      leftTitle: "Why willpower fails",
      leftPoints: [
        "You wait until you 'feel like' meditating — you never will at first",
        "No fixed time or place, so every day is a fresh decision to make",
        "You aim for 30 perfect minutes, miss once, feel like a failure, quit",
        "Nothing marks the win, so the brain never logs the reward",
        "The craving arrives and you meet it with raw self-control — and lose",
      ],
      rightTitle: "Why the system wins",
      rightPoints: [
        "Habit-stack it onto something you already do (make it obvious)",
        "Same chair, same time every day, so the decision is already made",
        "Two-minute rule: on hard days, just sit and breathe once — never zero",
        "Tick the Mirror box in the journal — the streak is the reward (make it satisfying)",
        "The craving arrives and you already have a trained gap to drop it into",
      ],
    },
    {
      type: "workflow",
      title: "The 4 Laws — how to wire the meditation habit",
      steps: [
        { title: "1. Make it obvious — habit stack", desc: "Bolt it onto an anchor you already never skip. 'After I pour my morning coffee, I sit for 15 minutes.' Same trigger, every day. The 90 R&R is built around a 5 a.m. stillness slot for exactly this reason — it stacks on waking up, before the day can vote against it." },
        { title: "2. Make it attractive — pair it", desc: "Do it in the same spot with the same warm drink, the same blanket, the same view. Let the ritual become something a small part of you looks forward to, not a chore you dread. Reframe it: this isn't discipline, it's the ten minutes the day can't touch." },
        { title: "3. Make it easy — the two-minute rule", desc: "The habit is 'sit down,' not 'meditate perfectly.' On a good day you do the full 15 or 30. On a wrecked day you sit and take one conscious breath and that counts. Showing up on the bad days is the entire skill — it keeps the identity ('I'm someone who sits') alive." },
        { title: "4. Make it satisfying — track it & never miss twice", desc: "Mark the Mirror pillar in the journal every single day. The unbroken chain becomes its own reward — you won't want to break it. And the one unbreakable rule: never miss twice. One skipped day is a slip; two is the start of the old pattern. Missed yesterday? Non-negotiable today." },
      ],
    },
    {
      type: "pullquote",
      text: "You do not rise to the level of your willpower. You fall to the level of your systems. Sobriety is a system — and stillness is the part of it you can start with nothing but a chair.",
      author: "after James Clear",
    },
    {
      type: "markdown",
      content: `
## The identity underneath it

Clear's deepest point is that habits are really votes for who you are. Every time you sit — even the two-minute version on the worst day — you cast one vote for *I am someone who can be alone with my own mind.* That's the identity alcohol stole. It told you you needed it to face yourself. Every session quietly proves the opposite.

That's why the Mirror is a pillar and not a nice-to-have. The Engine rebuilds the body. The Network breaks the isolation. But the Mirror is where you finally get to sit in the loud room, watch it go quiet on its own, and learn the one thing the drink swore you'd never survive: **being still.**
      `,
    },
    {
      type: "callout",
      tone: "warn",
      title: "Read this first",
      body: NOT_MEDICAL,
    },
    {
      type: "markdown",
      content: `
---

Start tonight. Not a retreat, not a perfect setup — a chair, a timer, fifteen minutes. Watch the breath, scan the body, and when a craving or a hard thought shows up, don't fight it and don't obey it. Just watch it be a wave. It will crest, and it will fall, and you'll still be sitting there, sober, having proved it to yourself one more time.

Then tick the box. Tomorrow, do it again. That's the whole practice, and it's the whole recovery.

*— MT*

*Personal experience and cited science, not medical advice. Technique adapted from the Vipassana (Goenka) tradition; the relapse science is Bowen et al. and Marlatt's Mindfulness-Based Relapse Prevention; the habit framing is James Clear's* Atomic Habits *and the dopamine framing is Dr. Anna Lembke's* Dopamine Nation.
      `,
    },
  ],
};

/* ================================================================== */
/*  ARTICLE 4 — THE DAILY DOSE (supplements & superfood ledger)        */
/* ================================================================== */
export const dailyDose: BlogPost = {
  slug: "daily-dose",
  title: "The Daily Dose — Supplements & Superfoods That Rebuild D.O.S.E.",
  excerpt:
    "What I actually take to rebuild dopamine, oxytocin, serotonin and endorphins after a 30-year run — the full ledger, what each item does, when I take it, what the evidence really says, and what it costs per day.",
  author: "MT · AAfiends",
  date: "Jul 26, 2026",
  readTime: "11 min read",
  pillar: "engine",
  icon: "brain",
  sources: [
    "creatine + memory: academic.oup.com/nutritionreviews/article/81/4/416/6671817",
    "creatine cognition meta-analysis: ncbi.nlm.nih.gov/pmc/articles/PMC11275561",
    "omega-3 depression meta-analysis: nature.com/articles/s41398-019-0515-5",
    "2025 lion's mane RCT: pmc.ncbi.nlm.nih.gov/articles/PMC12018234",
    "5-HTP interactions: mskcc.org/cancer-care/integrative-medicine/herbs/5-htp-01",
  ],
  content: "What I take to rebuild the Daily Dose",
  sections: [
    {
      type: "markdown",
      content: `
I drank and used for thirty years while building companies, winning an Entrepreneur-of-the-Year award, and getting written up in the paper. Seven Ironmans. 100-mile ultras. Marathons. A ten-day silent Vipassana where nobody spoke and I couldn't outrun anything. I did all of it carrying a four-thousand-pound invisible weight, and I did all of it on hardware I was actively strip-mining.

Here's what nobody tells you about getting sober as an endurance athlete: the day you stop, your body doesn't thank you. It sends the invoice. Thirty years of borrowed dopamine comes due at once, and you find out that the engine you were so proud of has been running on a credit line the whole time.

This page is the resupply list. It is not a stack, it is not a hack, and none of it will get you sober. It is the raw material I put back into a depleted motherboard so that the real work — the rooms, the steps, the sponsor, the 24 hours — has something to run on.
      `,
    },
    {
      type: "markdown",
      content: `
### Why "Daily Dose"

We used to write it D.O.S.E. — Dopamine, Oxytocin, Serotonin, Endorphins. That's still the biology. But the name we use now is the **Daily Dose**, DD for short, and the change is the whole point.

In the rooms they hand you a unit of measurement on day one: **twenty-four hours.** Not a year. Not ninety days. Today. It turns out your neurochemistry uses the same unit. Dopamine you earned on Tuesday does nothing for you on Wednesday. Sleep doesn't bank. Serotonin isn't a savings account. Every one of these four chemicals is a *daily* production run, and if you skip the inputs, the shelves are empty by afternoon.

That's why there's no streak counter on this page. **One day at a time isn't a slogan we borrowed. It's a description of how the machine actually works.**
      `,
    },
    { type: "figure", id: "dd-24hr-loop" },
    {
      type: "markdown",
      content: `
### The Three Checkpoints

To keep decision fatigue out of it, everything below is anchored to three fixed moments. You are not deciding what to take. You are showing up at a checkpoint.

**1 — Morning Ignition (0500–0600).** 24 oz of water, apple cider vinegar, fresh lemon, fresh ginger, a pinch of Himalayan salt. Stir in creatine and lion's mane. L-tyrosine and B-complex before food. Hydration first, stack second, decisions last.

**2 — Gut–Brain Sync (the 3pm dip).** Kefir or plain whole-milk yogurt. Oats with chia. A warm mug of bone broth instead of the override you were about to reach for. A handful of pumpkin seeds. This is the hour most relapses get planned, and it is almost always a blood-sugar problem wearing an emotional costume.

**3 — Evening Checkout (lights-out minus 60).** Magnesium glycinate. That's it. Sleep is when receptors upregulate on their own — the only repair window you get for free, and the one I spent three decades stealing from.
      `,
    },
    {
      type: "image",
      src: "/90rr/img/dd-morning-tonic.png",
      alt: "The morning tonic: water, lemon, ginger, salt, before anything else.",
      caption: "The morning tonic: water, lemon, ginger, salt, before anything else.",
    },
    {
      type: "markdown",
      content: `
### Which Input Feeds Which Chemical
      `,
    },
    { type: "figure", id: "dd-dose-map" },
    {
      type: "markdown",
      content: `
Read that chart with one thing in mind: **supplements do not create the Daily Dose.** They restock the shelf the chemistry gets built from. You still have to go earn it. Note that the oxytocin column has almost nothing you can buy — that one comes from the rooms, the phone call, the service commitment. No powder substitutes for another human being.
      `,
    },
    {
      type: "shoppinglist",
      title: "The Core Stack — $0.55/day",
      note: "The five foundational items. Everything after this is optional.",
      groups: [
        {
          name: "The Core Five",
          accent: "green",
          items: [
            {
              name: "Creatine Monohydrate — 5 g",
              detail: "Crosses the blood-brain barrier and buffers cellular ATP. In early recovery the prefrontal cortex is running a massive energy deficit; this is the difference between brain fog and being able to finish a thought. It is also the single most-studied supplement in sport, and it's cheap.",
              tag: "Morning, in water",
            },
            {
              name: "L-Tyrosine — 500–1000 mg",
              detail: "The direct amino-acid precursor your brain converts into dopamine and norepinephrine. Works best exactly when you need it most: under acute stress and on bad sleep.",
              tag: "Morning, empty stomach",
            },
            {
              name: "B-Complex (B6, B9, B12)",
              detail: "Your body physically cannot convert tyrosine into dopamine, or tryptophan into serotonin, without these acting as enzymatic cofactors. A depleted system fails at the conversion step even when the raw material is there.",
              tag: "Morning, with food",
            },
            {
              name: "Magnesium Glycinate — 200–400 mg",
              detail: "Alcohol and stimulants wreck GABA signaling — that's the 3am wake-up, the restless legs, the piriformis that won't let go. Glycinate relaxes smooth muscle and supports slow-wave sleep without the gut effects of cheaper forms.",
              tag: "30–60 min before bed",
            },
            {
              name: "Himalayan Salt + Electrolytes",
              detail: "Not a wellness claim. Nerve impulses are an electrical event and they need sodium, potassium and magnesium to fire. Chronic use plus heavy sweating strips all three.",
              tag: "Morning, in the tonic",
            },
          ],
        },
      ],
    },
    {
      type: "shoppinglist",
      title: "Superfoods & Extended Support",
      note: "Targeted support for blood sugar, gut repair, and joint integrity.",
      groups: [
        {
          name: "Superfoods & Targeted Compounds",
          accent: "cyan",
          items: [
            {
              name: "Apple Cider Vinegar — 1–2 tbsp",
              detail: "Blunts the blood-sugar spike. Spiking and crashing glucose produces something almost indistinguishable from early withdrawal — the shakes, the dread, the sudden certainty that you need something. That's the H in H.A.L.T. wearing a disguise.",
              tag: "First thing, in water",
            },
            {
              name: "Fresh Ginger + Lemon",
              detail: "Ginger is a genuine anti-inflammatory; lemon makes the tonic something you'll actually drink at 5am for ninety days. Do not underestimate the second one.",
              tag: "Morning tonic",
            },
            {
              name: "Lion's Mane Powder",
              detail: "Hericenones and erinacines promote nerve growth factor — in petri dishes and rodents. See the evidence chart before you spend money on this one. I take it. I won't oversell it.",
              tag: "Morning, in coffee or tea",
            },
            {
              name: "Kefir / Plain Whole-Milk Yogurt",
              detail: "Live cultures. Thirty years of alcohol is thirty years of low-grade gut damage, and gut inflammation shows up upstairs as mood.",
              tag: "Morning or midday",
            },
            {
              name: "Rolled Oats + Chia",
              detail: "Tryptophan can't get across the blood-brain barrier on its own — it loses the transporter competition to other amino acids. A modest complex-carb load triggers just enough insulin to clear the competition and let it through. This is the actual mechanism behind 'comfort food,' and it's the one place carbs earn their reputation.",
              tag: "Breakfast",
            },
            {
              name: "Sardines / Mackerel",
              detail: "EPA and DHA build the cell membranes your dopamine and serotonin receptors sit in. Stiff membranes mean poor binding. A tin costs a dollar-thirty.",
              tag: "Lunch or dinner",
            },
            {
              name: "Pumpkin Seeds",
              detail: "Zinc and magnesium in food form — receptor gatekeeping and the jittery-nervous-system fix.",
              tag: "Afternoon handful",
            },
            {
              name: "Bone Broth / Collagen",
              detail: "Glycine, proline, glutamine. When you're putting ultra mileage on repaired hardware, tendons and ligaments are the failure point long before the engine is.",
              tag: "Midday, warm",
            },
            {
              name: "5-HTP ⚠️",
              detail: "Serotonin precursor. Read the warning below before you touch it. Do not combine 5-HTP with an SSRI, SNRI, MAOI, tramadol, or triptans. It can trigger serotonin syndrome — consult your doctor first.",
              tag: "Evening — doctor cleared only",
            },
          ],
        },
      ],
    },
    {
      type: "markdown",
      content: `
### Honest Evidence Grading
      `,
    },
    { type: "figure", id: "dd-evidence-tiers" },
    {
      type: "markdown",
      content: `
**Data Over Denial has to cut both ways or it's just a slogan.** So here's what's real:

- **Creatine** is solid. Brain creatine rises 3–10% on supplementation; meta-analyses show real gains in memory and processing speed, and no gain in executive function. That's a useful, unglamorous result.
- **Omega-3s** are solid. Across 26 trials and 2,160 people, a small but consistent effect on depressive symptoms — best around 1 g/day of EPA-dominant, not more.
- **Lion's mane is thin.** The NGF mechanism is in-vitro and rodent. A 2025 randomized human trial found no effect on global cognition or mood. I still take it, because it's cheap and the downside is nil. But if someone sells it to you as neurogenesis in a jar, they're selling.
- **The gut-serotonin line that everyone repeats is half wrong.** Yes, ~90% of your body's serotonin is made in the gut. No, it does not cross the blood-brain barrier. Gut health affects mood through inflammation and the vagus nerve, not by shipping serotonin upstairs. Almost every wellness article gets this backwards.
      `,
    },
    {
      type: "callout",
      tone: "danger",
      title: "⚠️ 5-HTP can actually hurt you.",
      body: "Do not combine 5-HTP with an SSRI, SNRI, MAOI, tramadol, or triptans. It's a direct serotonin precursor with no feedback brake, and the combination can trigger serotonin syndrome — which runs from agitation and tremor to seizure. A great many of us in the rooms are on an antidepressant. If that's you, this one is a conversation with your doctor, not a purchase.",
    },
    {
      type: "markdown",
      content: `
### What It Costs
      `,
    },
    { type: "figure", id: "dd-cost-ledger" },
    {
      type: "markdown",
      content: `
I want to be careful here, because "just buy supplements" is a garbage answer for someone who is genuinely broke. So: **the Core Five is fifty-five cents a day.** Sixteen-fifty for a month. Forty-nine-fifty for the whole ninety.

And I'll say the uncomfortable part, because somebody has to. When I was drinking, I was never broke on a Friday night. The money was always there. It was never a budget problem — it was a priority problem wearing a budget costume. Same wallet. Different ledger.

If even that is out of reach right now: the free tier is **sleep, sunlight, walking, water, and a meeting.** Those outperform every item on this page, and they cost nothing. Start there. Nobody gets to use the price of creatine as a reason not to get better.
      `,
    },
    {
      type: "markdown",
      content: `
### How I Use This to Race
      `,
    },
    {
      type: "image",
      src: "/90rr/img/dd-hero-stack.png",
      alt: "The Daily Dose field kit, laid out for inspection.",
      caption: "The Daily Dose field kit, laid out for inspection.",
    },
    {
      type: "markdown",
      content: `
The reason any of this matters to me personally: I still race.

Seven Ironmans and a stack of 100-mile ultras happened while I was drinking — which people hear as a flex and which I hear as the diagnosis. I could suffer for twenty hours straight and still couldn't sit still with myself for twenty minutes. That's not discipline, that's a symptom. Endurance sport was the last respectable place to run a compulsion.

Sober, the racing changed shape. The engine is the same engine, but it's finally being maintained instead of mined. What the protocol above actually buys me is boring and specific: creatine and electrolytes so the mitochondria have something to work with; collagen and omega-3s so the sciatic and piriformis flare-ups that used to end my build weeks stay manageable; magnesium so I sleep, because a training block without sleep is just scheduled injury; and tyrosine and B-vitamins so the prefrontal cortex has raw material on the mornings when the only thing standing between me and a relapse is my ability to make one decent decision.

The ultra and the 24 hours are the same skill. You do not run 100 miles. You run the next aid station, and then you do it again, and that is the entire technique. Recovery is an ultra where the aid stations are 24 hours apart and the DNF is fatal.

The Daily Dose is what I carry between them.
      `,
    },
    {
      type: "callout",
      tone: "warn",
      title: "This is not medical advice.",
      body: "I'm a guy in recovery who reads studies, not a doctor. Supplements interact with medications — genuinely, sometimes dangerously. Talk to your physician before you start anything here, especially if you're on an antidepressant, a blood thinner, or anything for blood pressure. And nothing on this page substitutes for the rooms, a sponsor, or professional treatment.",
    },
    {
      type: "markdown",
      content: `
---

**Sources & Clinical Citations:**
- [Creatine and Memory Meta-Analysis (Nutrition Reviews)](https://academic.oup.com/nutritionreviews/article/81/4/416/6671817)
- [Creatine Cognition Meta-Analysis (PMC)](https://ncbi.nlm.nih.gov/pmc/articles/PMC11275561)
- [Omega-3 Depression Meta-Analysis (Translational Psychiatry / Nature)](https://nature.com/articles/s41398-019-0515-5)
- [2025 Lion's Mane Randomized Controlled Trial (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12018234)
- [5-HTP Herb-Drug Interactions (MSKCC)](https://mskcc.org/cancer-care/integrative-medicine/herbs/5-htp-01)
      `,
    },
  ],
};

export const DOSE_ARTICLES: BlogPost[] = [doseFuel, doseReset, doseMirror, dailyDose];

export function getDoseArticle(slug: string): BlogPost | undefined {
  return DOSE_ARTICLES.find((a) => a.slug === slug);
}
