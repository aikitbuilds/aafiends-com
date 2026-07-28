/**
 * THE DAILY DOSE (DD) LEDGER — /90rr/stack — added 2026-07-26.
 *
 * Michael's brief: "create a detailed supplement and superfoods for rebuilding
 * the Daily DOSE… moving forward I want to change the name to Daily Dose or DD
 * for short… because of the AA mantra of 24 hours, one day at a time. These
 * supplements help in rebuilding and stabilizing DD… I have a grocery list
 * already on the site but expand on this… same format, short info, with stats,
 * infographics and why it affects our Daily Dose… search my bio and let people
 * know how I use these to get repaired and be able to do ultra races."
 *
 * NAMING: this page introduces **Daily Dose / DD** as the going-forward name.
 * The acronym D.O.S.E. is still spelled out where the four chemicals are being
 * named individually (Dopamine / Oxytocin / Serotonin / Endorphins). Existing
 * pages (/90rr, /90rr/fuel, /90rr/reset, /90rr/meditation) were intentionally
 * NOT renamed in this pass — Michael's call, 2026-07-26.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EDITORIAL STANDARD — read before editing any number on this page.
 *
 * A full verification pass was run against primary sources (NIH ODS, Cochrane,
 * StatPearls, ISSN/ACSM/WMS position stands, and named primary trials) on
 * 2026-07-26. That pass CONTRADICTED several claims that are widely repeated in
 * recovery-supplement content — including in the source PDF this page grew out
 * of. Where the popular claim is wrong, this page says so out loud. That is the
 * whole point of "Data Over Denial": we do not get to apply skepticism only to
 * the things we already dislike.
 *
 * Corrections deliberately baked into the copy below:
 *  - "Never give glucose before thiamine" — no evidence above case-report level
 *    (Schabelman & Kuo, J Emerg Med 2012). ASAM 2020 says either order or
 *    concurrently. Page says "with or around a carb load," never "glucose is
 *    dangerous."
 *  - "5 g/day creatine raises brain creatine" — unsupported. Only ~20 g/day has
 *    ever raised it (+8.7%, Dechent 1999, n=6), and the best-controlled study
 *    found brain PCr unchanged at 20 g/day (Solis, J Appl Physiol 2017, n=64).
 *  - "60-80% of alcoholics are folate deficient" — a 1963 pre-fortification
 *    figure. Contemporary US data: 7% low RBC folate (Sanvisens 2017).
 *  - "Lion's mane raises NGF/BDNF" — never demonstrated in a human. Every
 *    independent non-industry trial was null (Grozier 2022, La Monica 2023,
 *    Surrey 2025).
 *  - "L-tyrosine 500 mg for focus" — research doses are 100-150 mg/kg
 *    (7-10.5 g), and it does nothing when you are rested.
 *  - "5-HTP caused EMS" — EMS was contaminated L-tryptophan (Showa Denko, 1989,
 *    >1,500 affected, 37 deaths); the causative contaminant is still unknown.
 *  - "Magnesium treats alcohol withdrawal" — Cochrane CD008358: insufficient
 *    evidence, unchanged since 2013. Correcting a *measured* low is standard
 *    care; treating withdrawal with it is not.
 *  - "Tart cherry reduces soreness" — null at all four time points in the
 *    athlete-only meta-analysis (Abaïdia, Sports Med Open 2026). The real win
 *    is isometric strength recovery.
 *  - "Beetroot boosts endurance" — d=0.021, p=0.745 in athletes >65 mL/kg/min
 *    (Senefeld 2020); time-trial performance null (Poon 2025).
 *  - "90% of serotonin is made in the gut, so fix your gut to fix your mood" —
 *    the 90% is right, but gut serotonin does NOT cross the blood-brain
 *    barrier. The brain makes its own from tryptophan; the gut talks to it via
 *    the vagus nerve and immune signalling. Page states this correctly.
 *
 * If you add a number here, add its source to `sources` and keep the tier
 * label honest. Anything animal-only, in-vitro, industry-funded, or
 * unreplicated must be labelled as such in the sentence that carries it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { BlogPost } from "@/lib/blogData";

const NOT_MEDICAL =
  "This is personal experience and cited science, not medical or clinical advice, and nothing here is a treatment plan. Alcohol and benzodiazepine withdrawal can kill you — if you are still drinking daily or physically dependent, detox under medical supervision before you change anything. Do not start, stop, or stack any supplement on this page without talking to your doctor or pharmacist, especially if you take an antidepressant, naltrexone, disulfiram, acamprosate, a blood thinner, or anything for blood pressure, thyroid, or kidneys.";

export const dailyDoseStack: BlogPost = {
  slug: "stack",
  title: "The Daily Dose Ledger: Supplements & Superfoods That Rebuild DD",
  excerpt:
    "Your Daily Dose is the four chemicals you have to rebuild inside one 24-hour window — and then do again tomorrow. This is the full ledger of what actually helps, graded by how strong the evidence really is, including the three items everybody sells you that the trials do not support.",
  author: "MT · AAfiends",
  date: "Jul 26, 2026",
  readTime: "16 min read",
  pillar: "engine",
  icon: "shield",
  sources: [
    "NIH Office of Dietary Supplements — Thiamin, Magnesium, Zinc, Vitamin B6, Folate, Vitamin B12 fact sheets (2023–2026)",
    "Schabelman & Kuo, 'Glucose before thiamine for Wernicke encephalopathy: a literature review', J Emerg Med (2012)",
    "ASAM Clinical Practice Guideline on Alcohol Withdrawal Management (2020)",
    "Day et al., Cochrane CD004033 — thiamine for Wernicke-Korsakoff (2013)",
    "Sarai et al., Cochrane CD008358 — magnesium for alcohol withdrawal (2013)",
    "Kreider et al., ISSN position stand: creatine safety & efficacy, JISSN (2017)",
    "Solis et al., J Appl Physiol (2017) — brain vs muscle phosphocreatine at 20 g/day",
    "Eckert et al., creatine & depression meta-analysis, Br J Nutr (2025)",
    "Sandkühler et al., BMC Med (2023) — null cognition trial in rested adults",
    "Forbes et al., creatine for endurance athletes, JISSN (2023)",
    "Roberts et al., Amino Acids (2016) — glycogen resynthesis",
    "Alzheimer's Drug Discovery Foundation — Lion's Mane rating (Sept 2025)",
    "Jongkees et al., tyrosine & cognition review, J Psychiatr Res (2015)",
    "Shaw, Turner & Del Mar, Cochrane CD003198 — tryptophan and 5-HTP for depression",
    "Sanvisens et al., serum vs RBC folate in AUD, Drug Alcohol Depend (2017)",
    "Fragasso et al., functional B12 deficiency with normal serum B12 in alcoholic liver disease (2012)",
    "Duncan et al., iatrogenic copper deficiency from zinc, Br J Clin Pharmacol (2023)",
    "Dhanda et al., zinc deficiency & mortality in alcohol-related liver disease, Aliment Pharmacol Ther (2020)",
    "Wilderness Medical Society Practice Guidelines — Exercise-Associated Hyponatremia (2019 Update)",
    "Almond et al., hyponatremia among runners in the Boston Marathon, N Engl J Med (2005)",
    "Senefeld et al., dietary nitrate & exercise performance meta-analysis, Med Sci Sports Exerc (2020)",
    "Poon et al., nitrate umbrella review, Sports Med (2025)",
    "Abaïdia et al., tart cherry & recovery in athletes meta-analysis, Sports Med Open (2026)",
    "Interaction of the Vagus Nerve and Serotonin in the Gut–Brain Axis (2025 review)",
    "Shahmohammadi et al., vinegar umbrella review of meta-analyses, Food Sci Nutr (2026)",
    "Shoba et al., piperine & curcumin pharmacokinetics, Planta Medica (1998) — unreplicated",
    "TJ Power, The DOSE Effect (2024) — the D.O.S.E. framing",
  ],
  content: "One day of chemistry, built from real inputs.",
  sections: [
    /* ============================================================ */
    /* 1 — WHAT "DAILY DOSE" MEANS                                   */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
We are giving this a name, and from here on it's the name we use: **the Daily Dose. DD.**

Not because it sounds good on a card. Because it's literally what the thing is. The oldest, most load-bearing idea in these rooms is **one day at a time** — you are not asked to stay sober forever, you are asked to stay sober for twenty-four hours. And it turns out your biology agrees. Dopamine, oxytocin, serotonin, endorphins — the four chemicals your whole life runs on — are not a savings account you fill once. **They are a daily build.** You make them, you spend them, you sleep, and tomorrow you make them again.

So that's the frame. **Your Daily Dose is the four chemicals you rebuild inside one 24-hour window.** Miss a day and nothing is ruined. Do it again tomorrow. That's the entire program, in chemistry and in the rooms, and it's the same sentence: *just today.*

This page is the supply run for that build. It's the ledger of what I actually put in my body, what it's for, when it goes in — and, because this is AAfiends and we say **Data Over Denial**, exactly how strong the evidence behind each one really is. Including the ones I take that the science does not fully back. I'll tell you that too.
      `,
    },
    { type: "figure", id: "dd24" },

    /* ============================================================ */
    /* 2 — THE RULE THAT COMES BEFORE THE LIST                       */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## Rule zero: food is the protocol. Pills are the patch.

Before a single capsule, understand what a supplement can and cannot do.

A supplement is very good at **one** job: refilling something you are genuinely low on. Correct a real deficiency and you can get a dramatic result. Take the same pill when you are not deficient and you will, on average, get nothing — that's not cynicism, it's what the controlled trials keep finding, over and over, across almost every compound on this page.

Early recovery is the rare window where real deficiencies are actually common. Alcohol blocks absorption, wrecks the gut lining, makes your kidneys dump minerals, and replaces meals with liquid calories. So this is one of the few times in your life when "take the vitamin" is a genuinely evidence-based sentence. But that's the reason it works — **you were low** — and it has an expiry date. Once you're repleted and eating real food, the pill stops earning its keep.

Which is why the order never changes: **sleep, sunlight, water, protein, fermented food, movement, a room full of people — then, and only then, the bottle.** Nothing in the ledger below outranks a plate of eggs and a twenty-minute walk. If you only do one thing from this whole page, go read [The DOSE Kitchen](/90rr/fuel) instead. The food guide is the primary document. This one is the appendix.
      `,
    },
    {
      type: "callout",
      tone: "info",
      title: "How to read the grades on this page",
      body:
        "Every item is graded A, B, or C — not by how much I like it, but by how strong the human evidence is. TIER A: fixes a documented deficiency that is genuinely common in early recovery; strong, boring, unglamorous. TIER B: real effect, modest size, works in some situations and not others. TIER C: I may still take it, but the honest answer is that the human trials are thin, null, or industry-funded — and you should know that before you spend money. If an item's evidence is animal-only, in-vitro, unreplicated, or paid for by the company selling it, the sentence carrying it says so.",
    },
    { type: "figure", id: "tiers" },

    /* ============================================================ */
    /* 3 — TIER A                                                    */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## TIER A — the deficiency repairs

These are the least exciting things on the page and the only ones I would call close to non-negotiable in the first ninety days. None of them make you feel superhuman. They stop a specific, documented hole from staying open.

### 1. Thiamine (B1) — the one that is not optional

If you read nothing else, read this. Thiamine is the cofactor that lets glucose enter the Krebs cycle. Without it, ATP production fails first in exactly the brain regions that keep memory intact. Run that deficit long enough and you get **Wernicke's encephalopathy**, and then **Korsakoff's** — permanent, irreversible memory destruction.

Here's what makes it dangerous: it hides. In a landmark autopsy series, Wernicke's was found in **12.5%** of people with alcohol use disorder — and **only 20% of those cases had been diagnosed while the person was alive.** Only **16%** showed the classic triad you get taught to look for; **19% had none of the classic signs at all.** Of the people who survive an episode, **80–85% go on to Korsakoff's.**

And you cannot fix an acute case from the vitamin aisle. Heavy alcohol use collapses your gut's ability to absorb oral thiamine to roughly **1.5 mg a day** — below the daily requirement — which is why hospitals give it by injection. A shelf bottle is a reasonable maintenance choice for a stable person eating food. It is not a treatment for the emergency.

**This is a doctor conversation, not a shelf decision.** If you are detoxing, confused, unsteady on your feet, or having eye-movement problems — that is an emergency room, today.
      `,
    },
    {
      type: "statgrid",
      title: "Thiamine — the numbers that make it Tier A",
      stats: [
        { value: "12.5%", label: "Wernicke's found at autopsy in AUD", sublabel: "Torvik, Acta Med Scand 1987" },
        { value: "20%", label: "Of those, diagnosed while alive", sublabel: "Harper, JNNP 1983 — it hides" },
        { value: "80–85%", label: "Of survivors progress to Korsakoff's", sublabel: "Permanent memory loss (StatPearls 2026)" },
        { value: "~1.5 mg", label: "Daily oral absorption ceiling when drinking", sublabel: "Below requirement — why IV exists (Thomson 2012)" },
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "The myth I have to correct: “never take carbs before thiamine”",
      body:
        "You will read everywhere that giving glucose to a depleted person before thiamine will trigger Wernicke's. A full literature review found no evidence above case-report level — no randomized trials, no cohort studies, no case-control studies — and a 2025 emergency-department cohort found zero cases across 120 encounters where intoxicated patients received dextrose without prior thiamine. ASAM's own 2020 guideline says thiamine and glucose may be given in any order or concurrently. What IS supported: sustained carbohydrate loading in a depleted person without thiamine can unmask a deficiency that was already there. So take thiamine with or around your meals — but never skip food or refuse sugar while you wait for a pill. Low blood sugar is a real emergency. Also worth knowing: magnesium is the cofactor that activates thiamine, so a low magnesium level makes thiamine repletion fail.",
    },
    {
      type: "markdown",
      content: `
### 2. Magnesium — the mineral alcohol strips fastest

Alcohol makes your kidneys dump magnesium, and magnesium is the plug sitting inside your NMDA receptor channel — the brake on the glutamate-flooded, wired, teeth-grinding state of early withdrawal. Roughly **a quarter to a third** of people with chronic alcohol use disorder test low, and blood tests understate it because only about **1%** of your body's magnesium is even in the blood.

Two honest caveats. First: **correcting a measured low is standard care, but magnesium is not a treatment for withdrawal.** Cochrane looked at it — four trials, 317 people, all at high risk of bias — and concluded there is insufficient evidence to say whether it helps or harms. That review has not changed since 2013. Second: the sleep story is smaller than the internet claims. The pooled evidence is three trials and 151 adults, showing about **17 minutes** faster to fall asleep, with total sleep time not significantly different, and the authors themselves grading the certainty as *low to very low*.

Seventeen minutes is not nothing when you are lying awake at 2 a.m. It is also not a sleeping pill, and you should not expect it to be one.

**Numbers:** RDA is **400–420 mg/day for men, 310–320 mg for women** — food included. The upper limit for *supplemental* magnesium is **350 mg/day**, and that limit is about diarrhea, not toxicity. Glycinate is the form I take and the one people say is gentlest on the gut; I'll be straight with you that I could not find a head-to-head trial proving that, and NIH's own fact sheet doesn't even list glycinate.

### 3. Zinc — quietly one of the biggest holes

**30–50%** of people with alcohol use disorder have low zinc status. In alcohol-related liver disease it gets stark: **85% deficient in alcoholic hepatitis**, and zinc deficiency independently predicted mortality at 28 and 90 days. Zinc holds your intestinal tight junctions together — the same barrier that, when it leaks, lets bacterial endotoxin through to the liver.

Two things to be honest about. The "zinc seals the leaky gut" mechanism is demonstrated mostly in **mice and cell culture**, not in a completed human trial. And those deficiency percentages are measured with serum zinc, which drops during inflammation independent of your actual stores — so the 85% headline is partly an artifact of how sick those patients were.

**And here is the caveat nobody prints on the bottle:** high-dose zinc traps copper and flushes it out of you. A 13-year audit found copper deficiency cases running **7 months to 72 months** before anyone caught it — and **half had never been diagnosed at all**. The anemia reverses when you stop the zinc. **The spinal cord damage frequently does not.** The upper limit is **40 mg/day**, many drugstore tablets are **50 mg in a single pill**, and the audit's authors recommended that nutritional repletion doses **stay under 20 mg/day.** I take a low dose and I get most of it from pumpkin seeds and shellfish.

### 4. B12 and folate — with the correction nobody makes

You will read that 60–80% of alcoholics are folate deficient. That number comes from a **1963 study of 70 severely malnourished people, before the US started fortifying flour with folic acid in 1998.** Contemporary data in alcohol use disorder: **23% had low serum folate, but only 7% had low red-cell folate** — and RBC folate is the one that reflects actual body stores.

The B12 finding is the genuinely useful one, and it's counterintuitive. **In alcohol-related liver disease, serum B12 can read normal or even high while you are functionally deficient at the tissue level** — damaged liver cells dump stored B12 into the blood, so the number looks fine while the vitamin isn't reaching where it's needed. Serum B12 rising actually tracks with disease severity. If this matters to you, the better tests are **active B12 (holotranscobalamin) and methylmalonic acid.** And do not let anyone use homocysteine to assess you while you are still drinking — alcohol raises it on its own.

### 5. Omega-3 — the membrane your receptors sit in

Your dopamine D2 and serotonin receptors are proteins embedded in a lipid membrane. Omega-3s are what that membrane is built from, and they lower the neuroinflammation that blunts your prefrontal cortex — the part of you that's supposed to be running the brakes.

Where the evidence is strongest is mood, and it is specifically **EPA, not DHA**: formulations with **EPA at 60% or more of the total** show benefit; DHA-dominant formulations did not. Trial doses cluster around **1,000–2,000 mg of EPA per day.** Read the back of the bottle, not the front — "1,200 mg fish oil" often means 300 mg of actual EPA.

Two sardine tins a week gets you most of the way there for about four dollars. That's genuinely my preference, and not just on cost — whole fish brings the protein and the selenium along with it.
      `,
    },
    {
      type: "statgrid",
      title: "The Tier A deficiency map",
      stats: [
        { value: "30–50%", label: "Low zinc status in AUD", sublabel: "NIH ODS Zinc fact sheet, 2026" },
        { value: "~25–33%", label: "Low magnesium in chronic AUD", sublabel: "Vanoni, Nutrients 2021" },
        { value: "7%", label: "Low RBC folate — not the 80% you've read", sublabel: "Sanvisens 2017; the 80% figure is from 1963" },
        { value: "≥60% EPA", label: "The omega-3 ratio that actually worked", sublabel: "DHA-dominant formulas did not" },
      ],
    },

    /* ============================================================ */
    /* 4 — THE PATHWAY FIGURE + TIER B                               */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## How a plate of food becomes a Daily Dose

Here's the part that made this click for me. Your body does not import dopamine. It **manufactures** it, on site, from an amino acid you ate — and that assembly line needs cofactors at every step. Miss a cofactor and the raw material just sits there.
      `,
    },
    { type: "figure", id: "precursor" },
    {
      type: "markdown",
      content: `
That diagram is also why I stopped chasing single ingredients. Tyrosine without B6 is a delivery truck with no unloading dock. B6 without protein is a dock with nothing to unload. **The whole chain has to be fed, and food feeds the whole chain at once.**

One correction while we're here, because it's the single most-repeated line in recovery nutrition and it's told wrong almost everywhere — including, until today, on this site.

**"About 90% of your serotonin is made in the gut" is true.** What gets tacked onto it is not: that gut serotonin does *not* travel to your brain. Serotonin cannot cross the blood–brain barrier. Your brain manufactures its own, separately, from dietary tryptophan. The gut still absolutely talks to the brain — through the **vagus nerve**, through immune signalling, and by supplying the tryptophan your brain builds with — and rebuilding your microbiome is still worth doing. But it works through the wiring, not by shipping serotonin upstairs. Say it accurately and it's still a good reason to eat the kimchi.

## TIER B — real, modest, situational

### Creatine — and the correction I owe you

Creatine is on this list, I take 5 g every morning in my water, and I still have to tell you that the most common claim made for it in recovery circles is not supported.

**"5 g a day raises your brain creatine" is unsupported.** No brain-imaging study shows it. The studies that *did* raise brain creatine used about **20 g/day** and got only **+8.7%** — in six people. And the largest, best-controlled study, in 64 people at 20 g/day, found **brain phosphocreatine unchanged while muscle phosphocreatine rose 10–28%.** Both major reviews say the optimal brain dose is unknown. The much-shared sleep-deprivation results are real but come from a total of about **44 people, from one lab, with product supplied by a creatine manufacturer.** In rested people it does nothing: a preregistered trial of 123 adults at 5 g/day for six weeks found no benefit on any of eight tests.

And the 2025 depression meta-analysis — 11 trials, 1,093 people — landed at an effect whose confidence interval **touches zero**, works out to 2.2 points on the depression scale (below the 3-point threshold for a difference a patient would notice), and was graded **very low certainty**, with the authors writing that the effects "were not clinically important and the true effect may be trivial or null."

So why is it still in my glass? Because the **muscle** case is airtight — it's one of the most-studied supplements in existence — and I am rebuilding a body, not just a brain. I take it knowing the brain claim is a maybe. That's the difference between a supplement and a promise.

**Two things to actually know.** Creatine converts to creatinine, so it **raises your measured serum creatinine and makes your calculated kidney function look worse without anything being wrong.** Tell your doctor before any blood panel, or stop three to four weeks ahead. And there is a genuine animal signal — two mouse studies, no human data either way — that creatine worsened *alcohol*-induced liver damage while protecting against non-alcoholic fatty liver. If you are still drinking or have diagnosed alcohol-related liver disease, that's a real reason to ask a physician first.

### Electrolytes and salt — the morning tonic

This one is simple and it's the first thing I do every day: **24 oz of water with Celtic salt** before my feet are properly under me. It is not a wellness ritual. Early sobriety leaves you volume-depleted and mineral-poor, and dehydration produces exactly the irritability and fatigue that your brain will happily relabel as a craving. Sodium, potassium, magnesium and phosphate all go sideways at once in withdrawal — and low phosphate is why refeeding syndrome is a real risk when a depleted person starts eating properly again.

Cheapest win on this entire page. Water and salt.

### Apple cider vinegar — small, real, and oversold

ACV does something measurable: pooled across meta-analyses, vinegar with a meal lowers the post-meal glucose response by roughly **15 mg/dL.** That matters here for one specific reason — a blood-sugar crash produces shaky, anxious, irritable, *I need something* — the exact somatic signature your brain reads as a craving. Flattening the spike removes a false alarm.

That is the whole claim. It is not a detox, it does not burn fat, and it does not do anything for your liver. **Always dilute it** — 1–2 tablespoons in a full glass of water, through the day's first big drink — because undiluted vinegar strips tooth enamel and irritates your esophagus.

### Fermented food and probiotics — food beats capsules here

Kefir, kimchi, sauerkraut, live-culture yogurt. Alcohol and stimulants wreck the microbiome, and rebuilding it is worth doing — via the vagus-nerve pathway above, not by making serotonin that flies to your brain.

The honest state of the evidence: multi-strain *Lactobacillus* and *Bifidobacterium* at **1–10 billion CFU daily** has the best support, mostly for anxiety in healthy adults and mild-to-moderate depression, and **strain identity matters more than the CFU number on the front of the box.** Trials are small and methodologically all over the place. Which is precisely why I buy **food, not capsules**: a jar of live kefir is cheaper, brings protein and calcium with it, and does not require me to bet on one strain being the right one.

### Curcumin — with its most famous number in context

Turmeric with black pepper and fat, usually stirred into bone broth. The famous claim is that piperine raises curcumin absorption by **2,000%** — that's from a 1998 industry-sponsored study in a small group of volunteers, and **no independent group has replicated it in the 28 years since.** In the same study, curcumin alone couldn't even be detected in most samples. It's plausible, it's cheap, it tastes good in broth, and I take it as a Tier B bet rather than a Tier A certainty.
      `,
    },
    {
      type: "comparison",
      title: "What the label promises vs. what the trials found",
      leftTitle: "What you'll read on the bottle",
      leftPoints: [
        "Creatine 5 g — “fuels your brain”",
        "Lion's mane — “raises NGF and BDNF, regrows neurons”",
        "L-tyrosine 500 mg — “natural dopamine for focus”",
        "Magnesium — “knocks you out, fixes insomnia”",
        "Beetroot — “proven endurance booster”",
        "Tart cherry — “kills muscle soreness”",
      ],
      rightTitle: "What the human trials actually show",
      rightPoints: [
        "No imaging study shows 5 g raising brain creatine; 20 g raised it +8.7% in n=6, and the best-controlled study found no change at all. The muscle case is solid.",
        "Never demonstrated in a living human — 23 studies screened, zero human. Every independent non-industry trial came out null.",
        "Research doses are 100–150 mg/kg — 7–10.5 g. Capsules are ~5× too small, and it does nothing when you are rested and unstressed.",
        "≈17 minutes faster to fall asleep, total sleep time not significant, evidence graded low to very low certainty.",
        "d = 0.021, p = 0.745 in trained endurance athletes. Time-trial performance: null.",
        "Soreness null at every time point in the 2026 athlete meta-analysis. Isometric strength recovery is the real, replicated win.",
      ],
    },

    /* ============================================================ */
    /* 5 — TIER C                                                    */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## TIER C — the ones I have to be honest about

I take two of these. I am telling you the truth about all three anyway, because a program built on rigorous honesty about my drinking doesn't get to go soft when the subject is my supplement cabinet.

### Lion's mane — the mechanism has never been closed in a human

The story is beautiful: compounds in the mushroom stimulate nerve growth factor, which rebuilds the pathways addiction burned down. Here's where that story actually stands. A 2025 systematic review screened **23 studies — 7 in vivo plus in vitro, 9 in vivo, 7 in vitro. Zero human.** The blood-brain-barrier evidence is a single **rat** study. In the one human trial that measured it, **pro-BDNF rose but BDNF itself did not change** — and pro-BDNF is functionally the *opposite* of mature BDNF. The Alzheimer's Drug Discovery Foundation's assessment, verbatim: *"These preclinical findings have not been confirmed in humans."*

The pattern that decided it for me: **the positive trials are industry-linked, and every independent non-industry trial — 2022, 2023, 2025 — came out null.** The best positive result, in mild cognitive impairment at 3 g/day for 16 weeks, faded within four weeks of stopping.

I still stir it into my morning tea. I have stopped telling people it repairs their brain.

### L-tyrosine — right idea, wrong dose, wrong conditions

Tyrosine really is the precursor to dopamine. The problem is that the enzyme converting it is **already essentially saturated at normal levels** — adding more substrate to a rested person gives it nothing to push against. It only helps when your dopamine is *acutely* depleted by a stressor. The cleanest demonstration: 150 mg/kg restored performance at **4°C and did nothing at 22°C.** Under sleep deprivation the benefit lasted "on the order of 3 hours."

And the doses: research uses **100–150 mg/kg — that's 7 to 10.5 grams** for a 70 kg adult. A 500 mg capsule is roughly a fifth of that. In depression it failed cleanly in a controlled trial against imipramine and placebo. One trial at high dose during military survival training found it changed almost nothing subjective — **except that it increased ratings of anger.**

### 5-HTP — the one I will actively tell you to leave alone

Cochrane found **111 trials and could only include two, totalling 64 patients**, concluding the evidence was of insufficient quality to be conclusive. There has never been a dedicated meta-analysis for depression, because the trials are too heterogeneous to pool.

But the reason I'd leave it on the shelf isn't the weak evidence — it's **who is reading this page.** A recovery audience is disproportionately on SSRIs, SNRIs, or tramadol, and 5-HTP with any of those is a serotonin syndrome risk serious enough that it's listed under contraindications, not interactions. Add MAOIs, triptans, St John's wort, dextromethorphan, and tricyclics to the avoid list.

One myth to kill on the way past: **5-HTP did not cause the 1989 eosinophilia-myalgia syndrome epidemic.** That was **L-tryptophan** — over 1,500 people affected, 37 dead, traced almost entirely to one manufacturer. The causative contaminant has still never been identified in either compound. It's a manufacturing-purity argument, not a "this molecule is poison" argument. It's still an argument for not buying it off the internet.
      `,
    },
    {
      type: "callout",
      tone: "warn",
      title: "The four interaction gates — read these before you buy anything",
      body:
        "1) 5-HTP + any SSRI/SNRI/MAOI/tramadol/triptan = serotonin syndrome risk. Treat as a hard no without your prescriber. 2) Vitamin B6 stacks invisibly across B-complex, magnesium, zinc and 'energy' products and can cause peripheral neuropathy; Australia's regulator now restricts it above 50 mg/day, and any new tingling, numbness or burning in your hands or feet means stop today. Usually reversible if you catch it early — not always. 3) Zinc above ~20 mg/day long-term depletes copper; the anemia reverses, the nerve damage often does not. 4) Creatine raises measured serum creatinine and will make a kidney panel look abnormal when nothing is wrong — tell your doctor, or stop 3–4 weeks before bloodwork. Also: omega-3 at high dose plus a blood thinner, and L-tyrosine within 2 hours of levodopa. If you are on naltrexone, disulfiram, acamprosate, or in a benzodiazepine taper, run this entire page past your prescriber before you change one thing.",
    },

    /* ============================================================ */
    /* 6 — MT'S STORY                                                */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## Why I do all of this — and what it has to do with 100 miles

I should tell you where this comes from, because the ledger above is not theoretical for me.

Before I got sober I finished **seven full Ironmans, two 100-mile races, and more marathons and 50-mile ultras than I can cleanly account for.** I want to be precise about what that means, because it is the least impressive-sounding true version: **I did all of it with a thirty-year addiction running quietly in the background.** Alcohol and MDMA, for decades, while training for and finishing some of the hardest endurance events there are. The engine that carried me across those finish lines is the exact same engine I was poisoning on the drive home.

That's the part people get wrong about endurance athletes in recovery. The fitness was never proof I was fine. It was the alibi. Being able to run a hundred miles is a remarkably effective way to convince everyone — including yourself — that the drinking can't be that bad.

**My sobriety date is June 9, 2026.** So as I write this I am not a man with a comeback story. I'm a man about seven weeks in, doing the boring version of the work, and the boring version is what this page is.

My body kept the receipts. Sciatica down the right leg, piriformis locked up — my check-engine light, the thing that flares in exactly the weeks I'm exhausted, isolating, and haven't eaten a real meal in days. Not a new injury. A readout.

So here is what actually happens in my day. **24 oz of water with Celtic salt, apple cider vinegar and creatine before my feet are fully under me** — rebuilding blood volume and replacing what withdrawal strips out, not a ritual. **Soft-scrambled eggs** for the raw material dopamine is built from. **Sardines and a real omega-3** for the lipid layers alcohol scorched. **Live kefir grains — actual grains, not the store-bought stuff** — for the gut. Moringa and turmeric in hot bone broth. Magnesium at the evening checkout so sleep architecture holds. **And no NSAIDs, at all** — a liver that has spent decades clearing my mess does not need Advil stacked on top of it.

Then the free menu, which outranks every capsule above: **the 40°F plunge for 90 seconds to two minutes**, morning light, the walk, the nerve glides for the screaming sciatica, and a room full of people.

And here's the framing that makes it stick, the only one that's ever worked for me. **This is not discipline and it is not punishment.** I put this physical vessel through absolute hell for years, and miraculously it didn't quit on me. It carried me through seven Ironmans while I was actively poisoning it. So feeding it properly now isn't a chore or a health kick.

**It's a living amends.** The body is the one creditor I can pay back every single day, in full, in twenty-four-hour installments. Same as everything else in this program.

Will I get back to the 100-mile start line? I'd like to. I'm not going to announce a race I haven't signed up for — that's the old me, selling the finish before doing the work. What I know is that the ledger on this page is what rebuilds the machine that gets there, and that it's the same ledger that rebuilds the machine that gets me through today sober. **They turn out to be the identical job.** One day's Daily Dose, banked, and then again tomorrow.
      `,
    },
    {
      type: "image",
      src: "/90rr/img/dd-ledger.png",
      alt: "Overhead flat lay of the Daily Dose morning stack — glass of salted water, creatine, eggs, sardines, kefir, turmeric",
      caption: "The morning ignition · water, salt, ACV, creatine — before anything else gets a vote",
      accent: "#10b981",
    },
    {
      type: "pullquote",
      text: "I put this vessel through hell for thirty years and it never quit on me. Feeding it properly now isn't discipline. It's a living amends — and the body is the one creditor I can pay back in full, every twenty-four hours.",
      author: "MT",
    },

    /* ============================================================ */
    /* 7 — THE PROTOCOL                                              */
    /* ============================================================ */
    {
      type: "workflow",
      title: "The Daily Dose Protocol — one 24-hour build",
      steps: [
        {
          title: "0500–0600 · Morning Ignition",
          desc:
            "24 oz water + a pinch of quality salt + 1–2 tbsp apple cider vinegar (always diluted). Creatine 5 g stirred in. Thiamine/B-complex and zinc with food, not on an empty stomach. Then 10 minutes of outdoor light before your phone gets a vote. Target: Dopamine + the hydration floor everything else stands on.",
        },
        {
          title: "Breakfast · Raw Materials",
          desc:
            "Protein first — eggs, fish, whatever you'll actually eat — plus oats or another complex carb. The protein carries tyrosine and tryptophan; the carbohydrate is the shuttle that gets tryptophan across the blood-brain barrier past its competitors. This is the meal the whole day's chemistry is built out of. Target: Dopamine + Serotonin precursors.",
        },
        {
          title: "Midday · Gut Sync + The Walk",
          desc:
            "Kefir or live-culture yogurt, plus fiber for the bacteria to eat. Then twenty minutes outside, phone in your pocket — the single most evidence-backed dopamine-receptor repair tool there is, and it's free. If the afternoon deficit hits, warm bone broth instead of a behavioral override. Target: Serotonin + Dopamine.",
        },
        {
          title: "Contact · The Room or the Call",
          desc:
            "A meeting, a sponsor call, or helping one person. No capsule on this page produces oxytocin, and oxytocin is the one that buffers you against isolation. This step is not optional and it is not a supplement. Target: Oxytocin.",
        },
        {
          title: "2100–2200 · Evening Checkout",
          desc:
            "Magnesium glycinate 30–60 minutes before lights out. Screens down, room cold and dark. Sleep is where dopamine receptors are physically rebuilt — one bad night downregulates the same D2/D3 receptors substances do, so protecting sleep is protecting the entire build. Target: the overnight repair shift.",
        },
        {
          title: "Then reset the counter",
          desc:
            "That's one Daily Dose. It does not carry over, it does not compound into a buffer you can spend tomorrow, and missing one does not undo the streak. You just build it again in the morning. Twenty-four hours. Log it in the journal and let that be enough.",
        },
      ],
    },

    /* ============================================================ */
    /* 8 — THE ENDURANCE LAYER                                       */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
## The endurance layer — if you're training while you rebuild

If you're doing what I'm doing — repairing a nervous system and putting real training load on it at the same time — four things change. And three of the four are me telling you to spend less money, not more.

**Creatine: keep it, kill the loading phase.** The standard 20 g/day load adds **1–3 kg of water weight**, and in weight-bearing endurance that's a tax on every single step. One trial found a 6 km time trial got *slower* on loaded creatine. The position-stand guidance for endurance athletes is explicit: skip the load, take **3–5 g/day**, and you'll saturate over about four weeks anyway. What you actually get is a **~82% greater 24-hour glycogen resynthesis** on a high-carb diet — that's a recovery-between-sessions effect, not a race-day effect — plus more power in closing sprints. The old cramping-and-heat-illness fear has been refuted, not merely unproven. The real cost is the water weight.

**Sodium: the whole story is backwards.** In ultra-endurance, the thing that hospitalizes people is not under-salting. It's **over-drinking.** Sweat sodium varies about **nine-fold between people** (roughly 230–2,070 mg per litre), so any article giving you a single "mg per hour" number is wrong for most readers. At the Boston Marathon, **13% of finishers were hyponatremic** and the strongest predictor was **gaining weight during the race** — 35% of runners did. The Wilderness Medical Society's grade-1A recommendation is blunt: sustained overhydration is the primary risk factor and should be avoided. Salty snacks are fine and worth having, but their own guideline says this strategy **will not prevent hyponatremia if you are overdrinking.** **Drink to thirst.** And know that SSRIs and NSAIDs both raise the risk — which puts a lot of this audience squarely in it.

**Beetroot: probably not for you.** Dietary nitrate is genuinely well-evidenced — in untrained people, doing short efforts to exhaustion. In trained endurance athletes above 65 mL/kg/min the effect was **d = 0.021, p = 0.745** — indistinguishable from nothing. And in self-paced time trials, the format that actually resembles a race, the pooled result across 42 studies was **null**. Working dose is 8.4 mmol about 2–3 hours out, and don't use antibacterial mouthwash near it — it kills the tongue bacteria that do the conversion. But be clear-eyed: the two predictors of a nitrate response are being untrained and going short. That is the opposite of an ultra.

**Tart cherry: right idea, wrong headline.** The 2026 athlete-only meta-analysis of 19 trials found **muscle soreness null at every single time point**, along with CK, IL-6 and TNF-α. What it *did* find, clearly and consistently, is **isometric strength recovery** — big effects at 24, 48 and 72 hours. So it's a "get your legs back faster" supplement, not a "hurt less" supplement. Standard protocol is 30 mL of concentrate twice daily starting 4–7 days out. Watch the sugar: that protocol delivers about **40 g of fruit sugar a day** on top of your fueling, which for someone whose brain is still recalibrating its reward system is worth thinking about honestly.
      `,
    },
    {
      type: "statgrid",
      title: "The endurance numbers",
      stats: [
        { value: "3–5 g", label: "Creatine, no loading phase", sublabel: "Loading adds 1–3 kg of water — a tax on every step" },
        { value: "+82%", label: "24-hour glycogen resynthesis with creatine", sublabel: "Roberts, Amino Acids 2016 — a recovery effect, not a race effect" },
        { value: "13%", label: "Boston Marathon finishers hyponatremic", sublabel: "Almond, NEJM 2005 — the driver was weight GAIN, not salt loss" },
        { value: "9×", label: "Between-person variation in sweat sodium", sublabel: "Which is why any single mg/hour number is wrong for you" },
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Ultra safety — the one that actually sends people to hospital",
      body:
        "Exercise-associated hyponatremia is sodium below 135 mmol/L during or within 24 hours of prolonged effort. The primary risk factor is sustained overdrinking, and the strongest single predictor is gaining weight during the race. Drink to thirst — fixed hourly fluid schedules are explicitly called inappropriate by the Wilderness Medical Society. Salt tablets do not license drinking more; the guideline states plainly that salting will not prevent hyponatremia when combined with overdrinking. SSRIs, NSAIDs and diuretics all raise the risk. And note: the widely quoted '30–51% of 100-milers get hyponatremia' figure refers to ASYMPTOMATIC cases found by screening bloods, not people getting sick.",
    },

    /* ============================================================ */
    /* 9 — THE LEDGER (shopping list)                                */
    /* ============================================================ */
    {
      type: "shoppinglist",
      title: "The Daily Dose Ledger — the full buy list",
      note:
        "Grouped by evidence tier, then by which chemical it serves. You do not need all of it and you should not start with all of it. Start with Tier A and the food columns; treat everything below that as optional. Every price note is a rough US ballpark, not a quote.",
      groups: [
        {
          name: "TIER A · Deficiency Repairs (start here)",
          accent: "green",
          items: [
            { name: "Thiamine (B1)", detail: "The non-optional one. Maintenance dose only — an acute deficiency is an ER visit, not a shelf decision. Talk to your doctor.", tag: "ask first" },
            { name: "B-complex (B6 / B9 / B12)", detail: "The cofactors that convert precursors into chemicals. Watch total B6 across ALL products — stay well under 50 mg/day.", tag: "with food" },
            { name: "Magnesium glycinate", detail: "Evening. Supplemental upper limit 350 mg/day — that limit is about diarrhea, not toxicity.", tag: "evening" },
            { name: "Zinc — low dose", detail: "Keep it near 20 mg/day, not the 50 mg tablets. Above that, long-term, it strips copper.", tag: "≤20 mg" },
            { name: "Omega-3 — check the EPA number", detail: "Aim ≥60% EPA, 1,000–2,000 mg EPA. Read the back label, not the front.", tag: "EPA ≥60%" },
            { name: "Water + quality salt", detail: "24 oz first thing. Cheapest, highest-yield item on this entire page.", tag: "free" },
          ],
        },
        {
          name: "D — Dopamine · Raw Material (food first)",
          accent: "green",
          items: [
            { name: "Eggs", detail: "Tyrosine + choline. The cheapest dopamine raw material there is", tag: "daily" },
            { name: "Lean beef / chicken / turkey", detail: "Protein at every meal keeps the precursor pool steady, not spiked" },
            { name: "Salmon or canned sardines", detail: "Protein + omega-3 in one tin, for about a dollar", tag: "2×/wk" },
            { name: "Tofu / tempeh / lentils", detail: "Plant-based tyrosine plus prebiotic fiber" },
            { name: "Pumpkin seeds (pepitas)", detail: "Tyrosine + zinc + magnesium in one snackable handful — my preferred way to get zinc" },
            { name: "Creatine monohydrate", detail: "5 g/day, no loading phase. Muscle case is airtight; brain case is a maybe", tag: "5 g" },
          ],
        },
        {
          name: "S — Serotonin · Gut & Precursors",
          accent: "cyan",
          items: [
            { name: "Live kefir (grains if you can)", detail: "Drinkable probiotic. Food beats capsules here — cheaper, and it brings protein along", tag: "daily" },
            { name: "Kimchi / sauerkraut", detail: "Buy it refrigerated. Shelf-stable jars are usually pasteurised — the cultures are dead" },
            { name: "Plain live-culture yogurt", detail: "Unsweetened. Added sugar undoes the point" },
            { name: "Rolled oats + chia seeds", detail: "Complex carbs are the shuttle that gets tryptophan past its competitors into the brain" },
            { name: "Onions, garlic, bananas, greens", detail: "Prebiotic fiber — what the good bacteria actually eat" },
            { name: "Apple cider vinegar", detail: "1–2 tbsp, ALWAYS diluted in a full glass. ~15 mg/dL lower post-meal glucose = one fewer false-alarm craving", tag: "dilute" },
          ],
        },
        {
          name: "O + E — Oxytocin & Endorphins",
          accent: "purple",
          items: [
            { name: "One meal shared with a person", detail: "The actual oxytocin lever. Nothing in a bottle does this", tag: "free" },
            { name: "Dark chocolate 85%+", detail: "Hits both. A square, not a bar" },
            { name: "Chili / cayenne / fresh ginger", detail: "Capsaicin's burn triggers a real endorphin release" },
            { name: "Turmeric + black pepper + fat", detail: "Stir into bone broth. The famous 2,000% piperine figure is from one 1998 industry study, never replicated" },
            { name: "Bone broth / collagen", detail: "Glycine, proline, glutamine — connective tissue and gut lining, and it's what I drink at the afternoon dip" },
            { name: "Citrus + leafy greens", detail: "Vitamin C and magnesium for the release side" },
          ],
        },
        {
          name: "TIER C · Buy With Your Eyes Open",
          accent: "amber",
          items: [
            { name: "Lion's mane powder", detail: "Zero human studies in the 2025 systematic review; every independent trial null. I take it anyway and say so", tag: "thin" },
            { name: "L-tyrosine", detail: "Only works under acute stress, cold, or sleep loss — and research doses are 7–10.5 g, not the 500 mg capsule", tag: "conditional" },
            { name: "Tart cherry concentrate", detail: "Strength recovery yes, soreness no. ~40 g of sugar/day on the standard protocol", tag: "athletes" },
            { name: "Beetroot / nitrate", detail: "Near-zero effect in trained endurance athletes; null in time trials. Skip it unless you're new to training", tag: "skip?" },
          ],
        },
        {
          name: "LEAVE ON THE SHELF",
          accent: "red",
          items: [
            { name: "5-HTP", detail: "Serotonin syndrome risk with SSRIs/SNRIs/tramadol — a contraindication, not an interaction. Not without your prescriber" },
            { name: "50 mg zinc tablets", detail: "Above the 40 mg upper limit in a single pill. Copper depletion; the nerve damage often doesn't reverse" },
            { name: "High-dose B6 “energy” products", detail: "B6 stacks invisibly across products and causes peripheral neuropathy" },
            { name: "Energy drinks", detail: "Sabotages the sleep that physically rebuilds your dopamine receptors" },
            { name: "Added sugar & ultra-processed snacks", detail: "Its own spike-and-crash loop, plus the inflammation that blunts your impulse control" },
            { name: "NSAIDs, if you can avoid them", detail: "A liver that has cleared decades of your mess doesn't need Advil stacked on top. My rule, not a prescription" },
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

    /* ============================================================ */
    /* 10 — CLOSE                                                    */
    /* ============================================================ */
    {
      type: "markdown",
      content: `
---

Here's what I want you to take from the whole ledger.

Half the things on this page work because you were low on them, and they will stop working once you aren't. A few work modestly and forever. Three of them are mostly a story, and I own two of those three. **Not one of them outperforms sleep, a plate of real food, twenty minutes outside, and a room full of people who know your name.**

That's not a disappointing ending. It's the actual good news — because it means the Daily Dose is not something you have to buy. It's something you build, in one twenty-four hour window, out of things that are mostly free.

And then it resets. And you do it again.

*— MT*

*Personal experience and cited science, not medical advice. Every claim on this page was verified against primary sources on July 26, 2026; where the popular version of a claim did not survive that check, the correction is stated in the text rather than quietly dropped. The D.O.S.E. framing is adapted from TJ Power's* The DOSE Effect *(2024).*
      `,
    },
  ],
};
