/**
 * The Dopamine Trap — a featured 6-part science series for aafiends.com/blog.
 *
 * Written in MT's voice (first-person, plain-spoken, no insider jargon —
 * per Michael 2026-07-20: "the 'deficit' state vocab may not land for others…
 * use common vocab, less tech jargon"). Every number is real and sourced
 * (CDC, NIAAA/SAMHSA, NIDA, WHO/ICD-11, Pew, and the research summarized in
 * Dr. Anna Lembke's "Dopamine Nation"). No fabricated stats — per the Voice
 * Bible guardrail.
 *
 * These extend the existing BlogPost model with three optional fields:
 *   category?: string      — groups posts into a named collection
 *   featured?: boolean     — surfaces the post in the Featured band on /blog
 *   heroImage?: string     — path to a real hero image (overrides PostVisual)
 * Add those fields to the BlogPost interface in lib/blogData.ts (see the
 * ANTIGRAVITY runbook), then spread this array into `blogPosts`.
 *
 * The science model (pleasure–pain balance, the "come-down," the chase-vs-
 * catch of anticipation, tolerance, self-binding, and earning reward the hard
 * way) is credited to Dr. Anna Lembke, "Dopamine Nation" (2021). The people
 * in the trap stories are composites with names changed — never real named
 * individuals — consistent with the Book One standard.
 */

import type { BlogPost, BlogSection } from "@/lib/blogData";

// One shared closer for the series — humble MT landing + Substack + crisis line.
const SERIES_CLOSER: BlogSection = {
  type: "markdown",
  content: `
---

I've got a little sobriety and a lot of miles in this trench — I'm not standing on a mountain with the final answer, and you might read all this and land somewhere different. That's fine. This is just what I've learned, and what's held so far.

The longer, rawer version of each of these — the full walk-and-talk — lands on our Substack, **The Deficit**. This page links there once it's live.

*Not medical advice. This is peer support and personal experience, not treatment. If you're in a dark spot right now, call or text **988** — any time, any reason. AAfiends is not affiliated with Alcoholics Anonymous World Services.*
  `,
};

const DISCLAIMER_ALCOHOL: BlogSection = {
  type: "markdown",
  content: `
**One real safety note before you try anything here:** if you drink heavy every day, stopping cold turkey can actually be dangerous — we're talking seizures, not just a rough night. That's not me being dramatic, it's just true. Talk to a doctor, or call **988**, before you white-knuckle it alone.
  `,
};

export const DOPAMINE_TRAP_CATEGORY = "The Dopamine Trap";

export const dopamineTrapPosts: BlogPost[] = [
  // ───────────────────────────────────────────────────────────── 1. SCIENCE
  {
    slug: "dopamine-trap-the-balance",
    title: "The Balance in Your Head: Why You Can't Put the Phone Down",
    excerpt:
      "Dopamine isn't the 'feel-good' chemical everybody thinks it is. Once you see what it actually does — and the see-saw it rides on — every bad habit you've got starts to make a lot more sense.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    pillar: "cross",
    icon: "brain",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-balance.svg",
    sources: [
      "Lembke, A. Dopamine Nation (2021)",
      "Di Chiara & Imperato, PNAS (1988) — reward-driven dopamine release",
      "NIDA — reward circuitry and the brain",
    ],
    content:
      "Dopamine isn't pleasure. It's the go-get-it chemical. Here's the see-saw it rides on, and why the crash after every high is built into the machine.",
    sections: [
      {
        type: "markdown",
        content: `
The light turns red. I've got maybe forty seconds. And before I've even decided to, my hand is already on the phone.

For thirty years I told myself that kind of thing was a discipline problem — that I was just a little weaker than the people who could leave the phone in the cup holder. I was wrong, and being wrong about it cost me a lot. So let me hand you the thing I wish somebody had handed me, in plain English, no biology degree required.
        `,
      },
      {
        type: "markdown",
        content: `
First thing nobody tells you: **dopamine is not the "feel-good" chemical.** Everybody calls it that. It's wrong.

Dopamine is the **go-get-it chemical.** It's the fuel for *wanting* — the thing that makes you lean forward, chase, search, refresh the page one more time. Your body runs on it. It's what got your ancestors up off the ground to hunt when they were tired and scared. It was never about the reward itself. It's about the *chase* for the reward. Hold onto that — it's the whole trick.
        `,
      },
      {
        type: "pullquote",
        text:
          "Pleasure and pain aren't opposites in the brain. They ride the same see-saw — and your brain will do anything to keep it level.",
        author: "The core idea, from Dr. Anna Lembke's Dopamine Nation",
      },
      {
        type: "markdown",
        content: `
Here's the picture that finally made it click for me. Think of an old playground see-saw — a plank on a middle post, one side down, one side up.

That see-saw is in your head. Pleasure on one side, pain on the other. Every time something feels good — a cold beer, a buzz in your pocket, a win in a game — you get a little squirt of dopamine and the see-saw tips down toward pleasure.

And your brain **hates** a tilted see-saw. It has one rule it will not break: keep it level. So the second pleasure tips you one way, your brain shoves it back the other way to even the score.
        `,
      },
      {
        type: "markdown",
        content: `
Two things about that even-the-score move, and they're the whole ballgame:

**One — it overshoots.** Your brain doesn't gently set the see-saw back to level. It slams it past level, down onto the *pain* side. That drop you feel after the high wears off — the itch for one more, the hangover, the 3 p.m. crash, the "just one more scroll" — that's not weakness. That's the see-saw slamming down on the pain side. Every single time.

**Two — if you wait, it settles.** Leave the see-saw alone and it slowly comes back to level on its own. The craving passes. That's the most important sentence I know: **a craving is a wave, and waves break if you don't feed them.**
        `,
      },
      {
        type: "markdown",
        content: `
Now here's how a habit becomes a trap. Hit the same button over and over — every night, every break, every red light — and your brain stops just evening the score for a minute. It leaves a permanent weight on the pain side. The see-saw gets **stuck**, tilted toward pain, as your everyday normal.

And that flips the whole thing upside down. You're not drinking, scrolling, or using to feel *good* anymore. You're doing it just to feel *okay* — to shove the see-saw level for a few minutes so you stop feeling so bad. When you're not using, you feel restless, flat, anxious, bored out of your skull. That's not your personality. That's a see-saw stuck on the pain side. Almost everybody stuck in a habit they hate is walking around in some quiet version of that.
        `,
      },
      {
        type: "barchart",
        title: "Not every pleasure tips the see-saw the same",
        unit: "%",
        bars: [
          { label: "Chocolate", value: 55, sublabel: "≈55% above baseline dopamine" },
          { label: "Sex", value: 100, sublabel: "≈100% — roughly double" },
          { label: "Nicotine", value: 150, sublabel: "≈150% above baseline" },
          { label: "Cocaine", value: 225, sublabel: "≈225% above baseline" },
          { label: "Amphetamine (e.g. meth)", value: 1000, sublabel: "≈1,000% — ten times over" },
        ],
      },
      {
        type: "markdown",
        content: `
Those numbers come from lab studies summarized in Dr. Anna Lembke's *Dopamine Nation*. The point isn't the exact figure — it's the shape. The bigger and faster something tips you toward pleasure, the bigger and harder your brain slams the see-saw back toward pain. A drug isn't "stronger" because you're weak. It's stronger because it tips the board ten times harder than a piece of chocolate ever could.

And then we built a whole world out of the strongest tips: the most engineered drink, the most addictive game, the most bottomless app — all one arm's reach away, all day. Your wiring was built for a world where good stuff was rare and you had to work for it. It never stood a chance against a smartphone. **That's a mismatch, not a character flaw.** Say it with me: it was never really about willpower.
        `,
      },
      {
        type: "markdown",
        content: `
Here's the part that put wind back in my chest, and it's just as true as the trap.

**The see-saw works both ways.** The same brain that overshoots into pain when you chase the easy hit will overshoot into steady, real good-feeling when you stop feeding it — and especially when you pay for your reward the hard way first (a walk, a cold shower, real work, real sweat). Stop feeding the weight on the pain side, and it eventually lifts. The board comes back to level. And when it does, the small stuff you'd stopped being able to feel — a good meal, a real conversation, a full night's sleep — starts landing again. People coming out of it always say the same thing: the color comes back.

That's not a pep talk. It's just the see-saw doing what see-saws do.
        `,
      },
      {
        type: "markdown",
        content: `
The next five pieces in this series each take one everyday trap — the after-work beer, the painkiller after an injury, the game the kid can't log off, the shopping cart that feels empty, the endless scroll — and show you exactly how it tips your see-saw, and exactly how to tip it back. Different button, same brain, same way out.

For now, just sit with the one picture. **A see-saw. Pleasure on one side, pain on the other. A brain that always evens the score.** Once you can see it, you can start to work with it instead of getting worked by it.
        `,
      },
      {
        type: "workflow",
        title: "Try this today",
        steps: [
          { title: "Name the wave", desc: "Next craving that hits — phone, snack, drink — don't fight it and don't feed it. Just notice: 'there's the wave.'" },
          { title: "Put ten minutes on it", desc: "Look at the clock. Wait ten minutes before you act. You're not saying no forever — you're letting the see-saw settle." },
          { title: "Watch it break", desc: "Most cravings crest and fall in a few minutes. Feel that happen once, on purpose, and you own it. That's the whole skill." },
        ],
      },
      SERIES_CLOSER,
    ],
  },

  // ───────────────────────────────────────────────────────────── 2. ALCOHOL
  {
    slug: "dopamine-trap-alcohol",
    title: "The After-Work Beer: Why the Drink That Takes the Edge Off Is Sharpening It",
    excerpt:
      "You earned that cold one after a brutal shift — nobody's arguing. But here's what it does to your head after you fall asleep, and why the stress you're drinking to fix is partly the drinking itself.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    pillar: "engine",
    icon: "wine",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-alcohol.svg",
    sources: [
      "CDC — ~178,000 U.S. deaths/yr from excessive alcohol use (2020–2021)",
      "SAMHSA/NIAAA (NSDUH) — alcohol use disorder prevalence",
      "Lembke, A. Dopamine Nation (2021); Schuckit — substance-induced depression",
    ],
    content:
      "The after-work beer tips your see-saw toward pleasure, then your brain slams it back toward pain while you sleep. Here's the way out that isn't willpower.",
    sections: [
      {
        type: "markdown",
        content: `
It's 6:40 p.m. You've been on your feet since before the sun came up. Your lower back is a fist, your boots feel full of sand, and before you've even set your keys down you're reaching into the fridge for that first cold one.

Crack. Hiss. First long pull. And *ahhh* — the shoulders drop half an inch, the day starts sliding off you.

I'm not here to tell you that you didn't earn it. You did. I'm here to tell you what that beer does after you fall asleep, because for years I had that part exactly backwards — and it's the part that keeps good, hard-working people stuck for decades.
        `,
      },
      {
        type: "markdown",
        content: `
Remember the see-saw. Pleasure one side, pain the other, and a brain that will do anything to keep it level.

That first drink squirts dopamine and tips you toward pleasure. The tension melts. That sigh of relief is real — you're not imagining it. But your brain sees the tilt and shoves it back the other way, and it overshoots. By the time you're asleep, the see-saw has swung down onto the pain side. By the time your alarm goes off, it's still down there. You wake up a little more anxious, a little more wound-up, a little flatter than you'd be on a morning you didn't drink.

And here's the cruel part — the exact trap I lived in: you feel that low, gray, wound-up morning, and you blame your *life*. The job. The bills. The people. So by 6:40 the next evening you "need" that beer again to take the edge off.
        `,
      },
      {
        type: "pullquote",
        text:
          "A big piece of that edge isn't your life. It's last night's drink, still pushing the see-saw down. The thing you're using to cure the stress is helping manufacture it.",
        author: "MT",
      },
      {
        type: "statgrid",
        title: "This is not a small or rare trap",
        stats: [
          { value: "~28M", label: "Americans with an alcohol use disorder", sublabel: "Ages 12+, past year (2023, SAMHSA/NIAAA)" },
          { value: "~178,000", label: "U.S. deaths a year from excessive alcohol", sublabel: "2020–2021 average (CDC)" },
          { value: "+29%", label: "Rise in those deaths vs. 2016–2017", sublabel: "From ~138,000 to ~178,000 (CDC)" },
        ],
      },
      {
        type: "markdown",
        content: `
Alcohol is a bigger, faster tip than a piece of chocolate, so the shove-back is bigger and faster too. Do it every night and the weight on the pain side stops lifting. One beer stops doing the job. You need two to feel what one used to give you. Then three. Not because you're greedy or weak — because the board moved, and you're chasing a level that keeps drifting away.

Here's the fact that stopped me cold. Doctors who treat this have watched it thousands of times, and the research backs it: when people who drink heavy — and feel anxious or depressed — just **stop for about a month**, with nothing else, a large majority find the anxiety and depression lift on their own. Dr. Anna Lembke, a Stanford addiction doctor, points to research finding most alcohol-driven depression clears within roughly four weeks of stopping.

Read that again. For a lot of people, the sadness they've been *drinking to fix* was being **caused by the drinking.** Take the drink out, wait out the crash, and the see-saw levels. That won't be true for everyone — some people need real medical help to stop safely — but it's true often enough that it's worth finding out if it's true for you.
        `,
      },
      DISCLAIMER_ALCOHOL,
      {
        type: "timeline",
        title: "What one honest month actually feels like",
        phases: [
          { range: "Days 1–3", label: "The toll booth opens", desc: "Restless, irritable, maybe worse sleep. The see-saw is swinging back through the middle. This is the sign it's working, not that it isn't." },
          { range: "Days 4–14", label: "The hard stretch", desc: "The cravings are loudest here and the old story ('I need it to relax') gets loud too. Ride the wave; it breaks. Don't do it alone." },
          { range: "Weeks 3–4", label: "The color comes back", desc: "You sleep like you're younger. Coffee tastes like something. A dumb joke from your kid actually lands. That's your real baseline returning." },
        ],
      },
      {
        type: "workflow",
        title: "The way out isn't more willpower",
        steps: [
          { title: "Take the 30 days", desc: "Give your brain one honest month to reset and show you your real normal. Mark each day off so you can see the chain build." },
          { title: "Make it harder to reach", desc: "Don't keep a cold twelve-pack in the fridge door after a shift you know will wear you down. Out of the house beats out of willpower." },
          { title: "Trade the button, don't just delete it", desc: "The beer was doing a job — unwinding a wound-up body. Give the body another door: a ten-minute walk before you go inside, a hot shower, hands busy with something that isn't work." },
        ],
      },
      {
        type: "markdown",
        content: `
And the biggest one, the one I can't say loud enough: **don't do it alone.** The strongest thing going for anybody getting free isn't grit — it's other people. One meeting. One buddy who's a text away. One person who knows what you're up to.

The beer promised to take the edge off. For one night it does. Then it goes to work on the pain side of your see-saw while you sleep. You can keep paying that rent — or you can take one honest month and find out how good your own normal actually feels. I didn't believe mine would come back either. It did.
        `,
      },
      SERIES_CLOSER,
    ],
  },

  // ─────────────────────────────────────────────────────── 3. PRESCRIPTION
  {
    slug: "dopamine-trap-painkillers",
    title: "The Injury Trap: How Getting Hurt on the Job Can Flip Your Whole Life",
    excerpt:
      "It doesn't start in a back alley. It starts on a job site, doing everything right — an injury, a prescription taken exactly as the label says, and a feeling that everything is finally okay.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    pillar: "engine",
    icon: "pill",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-painkillers.svg",
    sources: [
      "CDC/NIDA — 105,007 U.S. drug overdose deaths in 2023; 79,358 opioid-involved; 13,026 prescription-opioid-involved",
      "Lembke, A. Dopamine Nation (2021) — tolerance & the dopamine deficit",
      "NIDA — opioids and the reward system",
    ],
    content:
      "A refined painkiller floods dopamine and numbs every kind of pain — so it feels like coming home. Here's the trap, and the way out that holds.",
    sections: [
      {
        type: "markdown",
        content: `
Here's how it starts for a lot of people, and it's nothing like the movies. No back alley. A job site, doing everything right.

Picture a framer — I'll call him Ray, not his real name. Twenty years in. One wet morning he steps off a ladder wrong and something in his lower back lets go. Surgery. Recovery. A prescription for pain pills, handed over by a doctor, filled at a pharmacy, taken exactly as the label says.

First few days, the pills do the obvious thing — the back pain backs off. But then Ray notices something nobody warned him about. It isn't just his back that feels better. *Everything* feels better. The money worry that sits on his chest every night — quieter. The short fuse with his kids — gone. That low gray hum he's carried so long he stopped noticing it — lifted. For the first time in years he feels normal. Better than normal. Like he finally came home.

That feeling — not the back pain, that feeling — is the door to the trap. And it's not a story about a weak man. It's a story about strong chemistry meeting an ordinary brain.
        `,
      },
      {
        type: "markdown",
        content: `
Back to the see-saw. A piece of chocolate tips your dopamine up a little. A modern, fast-acting painkiller tips it *far* harder — a flood, not a squirt. It slams the see-saw down toward pleasure with a force nothing in Ray's normal life ever came close to. That's why it doesn't just touch the back pain — it steamrolls every kind of pain at once. It doesn't feel like a drug. It feels like the answer.

But you know what your brain does with a tilted see-saw. It panics and evens the score. And when the tip is this big and this fast, the shove-back is brutal.
        `,
      },
      {
        type: "pullquote",
        text:
          "To protect itself from a flood that big, the brain tears out its own catchers. Soon you need the drug just to feel okay — then just to not be in agony.",
        author: "MT",
      },
      {
        type: "markdown",
        content: `
Here's the ugly engineering of it, in plain words. To survive a flood that size, the brain rips out some of its own dopamine "catchers" — the spots where the good-feeling signal lands — to turn the volume back down. Now Ray's in a hole:

The **same dose stops working** — he needs more just to feel what the first pills gave him. And when he's *not* taking them, he doesn't feel like his old self — he feels far worse: aching, sweating, sick, crawling out of his skin. So the switch flips. Ray isn't chasing "better than normal" anymore. He's chasing "not in agony." The dose climbs. And somewhere in there a decent, honest man starts doing things that don't square with who he is — because his body now believes it will die without the drug. That's not his character rotting. That's the wiring, screaming a survival alarm.
        `,
      },
      {
        type: "statgrid",
        title: "The scale of this one (2023, U.S.)",
        stats: [
          { value: "105,007", label: "Drug overdose deaths", sublabel: "Total, United States, 2023 (CDC/NIDA)" },
          { value: "79,358", label: "Involved an opioid", sublabel: "About 3 in 4 of all overdose deaths" },
          { value: "13,026", label: "Involved a prescription opioid", sublabel: "Many journeys start with a legitimate script" },
        ],
      },
      {
        type: "markdown",
        content: `
Telling someone in that hole to "just have more willpower" is like telling a man holding his breath underwater to be more disciplined about not breathing. The drive isn't moral. It's biological, and it's screaming.

This is the one in the whole series where you should **not** go it alone — and you may not be able to go it safely on your own at all. Coming off opioids is miserable and, mixed with other things, can be dangerous. There are medicines that make stopping far safer, and doctors who do this for a living. Getting that help isn't weakness, and it isn't "trading one drug for another" — it's using the right tool for a chemical problem.
        `,
      },
      {
        type: "workflow",
        title: "The way out that actually holds",
        steps: [
          { title: "Surrender the solo fight", desc: "The turning point isn't a burst of strength — it's the opposite. It's admitting you can't beat this alone and letting people in. Isolation feeds it; connection starves it." },
          { title: "Start absurdly small", desc: "Not 'fix my whole life by Friday.' Show up to one meeting. Take a phone number. Make the coffee. Sweep the floor. Small, real wins while the catchers slowly grow back." },
          { title: "Give the brain time to heal", desc: "The catchers do come back — over weeks and months, not days. Early recovery feels flat because you're running on a half-rebuilt system. That flatness is a cast on a healing bone, not forever." },
        ],
      },
      {
        type: "markdown",
        content: `
Ray's story doesn't have to end in the trap. Plenty of people who've been exactly where he is — respectable, hard-working, blindsided by an injury and a script — are on the other side of it now, sleeping through the night, back with their families. It started the day they stopped trying to out-tough a chemical and let people and time do what willpower never could.

If this is your story, or somebody's you love: it's not a moral hole. It's a chemical one, with a way out that's been walked by a lot of people. The first step isn't a gut-check. It's one phone call and one true sentence: *"I think I'm hooked on my pain meds and I need help stopping safely."* Say that to one human — a doctor, a line, **988** — and you've already started.
        `,
      },
      SERIES_CLOSER,
    ],
  },

  // ────────────────────────────────────────────────────────────── 4. GAMING
  {
    slug: "dopamine-trap-gaming",
    title: "The Game He Can't Log Off: When a Smart Kid Vanishes Into a Screen",
    excerpt:
      "The door stays shut, the blinds are down at 2 p.m., and 'in a sec' never comes. It's usually not a lazy kid — it's a bright one, up against software built by pros to beat exactly his kind of brain.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    pillar: "mirror",
    icon: "gamepad",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-gaming.svg",
    sources: [
      "World Health Organization — 'gaming disorder' recognized in ICD-11 (in effect Jan 2022)",
      "Stevens et al. (2021), meta-analysis — global gaming-disorder prevalence ~3%",
      "Lembke, A. Dopamine Nation (2021) — engineered reward & self-binding",
    ],
    content:
      "Modern games are engineered to yank the see-saw toward the screen. Here's the plan that gets a kid back — change the room, not the kid.",
    sections: [
      {
        type: "markdown",
        content: `
If you've got a teenager — or you are one — you know the scene. The bedroom door stays shut. Blinds down at 2 in the afternoon. The only light is the cold blue glow of a monitor, and a headset voice you don't recognize comes through the wall. Meals get carried in and left half-eaten. School slides. The in-person friends thin out to nobody. And when you knock and say *come out for a bit*, you get back a flat "in a sec" that never comes.

This is almost never a lazy kid. Usually it's a sharp one — sharp enough that the real world started to feel slow and full of pressure while the game felt fast, fair, and full of wins. How does a *game* do that? The see-saw explains it — and so does the fact that these games are *built*, on purpose, to move it.
        `,
      },
      {
        type: "markdown",
        content: `
A cold beer is just a beer; nobody designed it in a lab to keep you drinking. A modern competitive game is different. Rooms full of very smart people are paid, full-time, to make it as hard as possible to put down. Three levers do most of the work:

**Unpredictable wins.** You never know if the next match or loot drop is a jackpot or a bust. That *maybe* is rocket fuel — your brain squirts more go-get-it chemical over a reward it *can't* predict than one it can. **Endless little rewards.** Level up, ding. New rank, ding. A steady drip of tiny see-saw tips all night, so you're never quite at a stopping point. **No natural end.** No last page, no final whistle — the next match is always one click away.

Stack those and every session is a massive, repeated pull on the pleasure side of the see-saw. Then real life — homework, a chore, an awkward hallway conversation — has to compete with that, and it can't. Real life feels gray by comparison. That's not the kid being dramatic. That's a see-saw yanked so far toward the screen that everything else reads as pain.
        `,
      },
      {
        type: "statgrid",
        title: "Real enough that the WHO named it",
        stats: [
          { value: "2022", label: "'Gaming disorder' entered the WHO's official manual", sublabel: "ICD-11 — the first time it's a recognized condition" },
          { value: "~3%", label: "Estimated global prevalence", sublabel: "Meta-analysis of gamers (Stevens et al., 2021)" },
          { value: "The brakes", label: "What marathon play quietly weakens", sublabel: "The 'stop-and-think' part of the brain — from disuse" },
        ],
      },
      {
        type: "pullquote",
        text:
          "It's not that the kid won't stop. It's that the exact part of the brain built for stopping has gone soft from never being used. That heals — but you rebuild it, you don't yell at it.",
        author: "MT",
      },
      {
        type: "markdown",
        content: `
That second thing matters, especially for parents. The part of the brain right behind the forehead is the one that says *not yet, think first.* It's the brakes. Like any muscle it gets stronger with use and weaker without. Marathon gaming is intense but totally passive — no body moving, no moments where you have to stop yourself and choose — so the brakes never get pressed, and they go soft. Now the kid has a hair-trigger for the game *and* weaker brakes to stop himself. Fixable. But you fix it by rebuilding the muscle, not by shouting at it.
        `,
      },
      {
        type: "workflow",
        title: "The plan that works: change the room, not the kid",
        steps: [
          { title: "Two separate machines", desc: "One computer for school and life. A different one for games. When the schoolwork machine can't run the game, there's no willpower fight at 11 p.m. — the barrier already decided." },
          { title: "A fixed window, not 'free time'", desc: "Gaming lives on set days only — say Friday and Saturday — and nowhere else. A rule you set once beats a decision you have to win every night." },
          { title: "Real friends only", desc: "Play with actual friends he knows, never a churn of strangers. Same activity, but now it feeds real human connection instead of replacing it — and connection is what starves this whole thing." },
        ],
      },
      {
        type: "markdown",
        content: `
Two more: often the honest move is to retire the single most addictive game for good — the hyper-competitive, never-ending one — the way a drinker doesn't keep "just one bottle" in the house. And a real reset — a full stretch off games, usually a few weeks — is rough for the first week or two (that's the see-saw swinging back), then real life slowly gets its color back.

Notice what's *not* on that list: "try harder," "have more discipline," "just log off." None of it works, because it asks weak brakes to beat an engineered machine every single night. You win by making the fight not happen in the first place.

If it's your kid, hold two things at once. **It's not a character flaw** — not his, not yours — he got outgunned by software built by pros to beat his exact brain. Lead with that, out loud, because shame just makes a kid hide deeper in the one place that feels good. **And the room is yours to change** — that's where your power is. You probably can't out-argue the pull of the game. You *can* set up the two machines, the weekend window, the friends-only rule. The kid behind that door isn't gone. His see-saw is stuck and his brakes are tired. Both heal.
        `,
      },
      SERIES_CLOSER,
    ],
  },

  // ──────────────────────────────────────────────────────────── 5. SHOPPING
  {
    slug: "dopamine-trap-shopping",
    title: "The Empty Package: Why the Thing You Couldn't Wait to Order Feels Like Nothing When It Lands",
    excerpt:
      "The lift when you order, the letdown when it arrives, the reach for the next one. That loop isn't you being bad with money — it's one of the sneakiest tricks your own brain plays.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "5 min read",
    pillar: "network",
    icon: "shopping-cart",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-shopping.svg",
    sources: [
      "Koran et al., Am. J. Psychiatry (2006) — compulsive buying ≈5.8% of U.S. adults",
      "Lembke, A. Dopamine Nation (2021) — anticipation vs. reward",
      "Schultz — dopamine and reward prediction",
    ],
    content:
      "Dopamine spikes during the chase, not the catch. That's why the box feels empty the second it lands — and here's how to stop paying for it.",
    sections: [
      {
        type: "markdown",
        content: `
It's 9 p.m. Dinner's done, dishes stacked, and you're sunk into the couch with nothing left in the tank. Not hungry. Not exactly bored. Just… flat. And your thumb, all on its own, opens the shopping app.

And something wakes up. You start browsing — tools, boots, truck parts, a jacket, that gadget a guy used online. You compare. You read reviews. You add one to the cart, swap it for a better one. Your chest lifts. You feel *sharp* again, awake, on the hunt. You hit Buy, and for a second there's a clean little hit of *yes.* Then you track that package like it's Christmas Eve.

Then it lands on the porch. You open it. And… huh. It's fine. It's just a thing. The spark you felt ordering it is gone, and your thumb is already drifting back to the app to find the next one.
        `,
      },
      {
        type: "markdown",
        content: `
That whole loop isn't you being materialistic or bad with money. It's the sneakiest trick the see-saw plays, and once you see it you can't be fooled the same way again.

Here's the thing almost nobody realizes: your go-get-it chemical doesn't spike the most when you *get* the reward. It spikes when you're **chasing** it. The wanting. The hunting. The *almost.* Scientists have watched it in the lab — dopamine surges during the searching, the clicking, the waiting for the truck. That's the peak. By the time the box is in your hands, the chemical has already dropped, often below where you started.
        `,
      },
      {
        type: "pullquote",
        text:
          "You weren't shopping for the boots. You were shopping for the chase — and the chase ends the second the box hits the porch. That's why your thumb goes looking for the next thing.",
        author: "MT",
      },
      {
        type: "markdown",
        content: `
Notice *when* the thumb opened the app: 9 p.m., wrung out, flat. That's not random. When your everyday baseline is already running low, a jolt of the chase feels amazing by contrast — the fastest way to feel awake without getting off the couch. So the tireder and flatter you feel, the louder the app calls. And every time you answer it, the see-saw settles a hair lower, which makes tomorrow night's flat feeling a little worse, which makes the app call a little louder. Round and round — while the closet fills with stuff that gave you a great five minutes of *wanting* and a whole lot of nothing after.

This is the trap wearing its most harmless-looking mask. It doesn't slur your speech or wreck your liver. It just quietly drains the bank account and teaches your brain that the answer to feeling flat is always one more purchase.
        `,
      },
      {
        type: "statgrid",
        title: "More common than people admit",
        stats: [
          { value: "~1 in 20", label: "U.S. adults show compulsive buying", sublabel: "≈5.8% (Koran et al., 2006)" },
          { value: "The chase", label: "Where the dopamine actually peaks", sublabel: "Anticipation, not the package" },
          { value: "48 hrs", label: "How long the urge needs to fade", sublabel: "The core of the fix below" },
        ],
      },
      {
        type: "workflow",
        title: "Put friction between you and the Buy button",
        steps: [
          { title: "The 48-hour cart rule", desc: "Load the cart all you want — that's fine, that's even the point. But nothing goes from cart to checkout for two full days. The chase fades; nine times out of ten the must-have turns back into a don't-need. You got the thrill free and skipped the bill." },
          { title: "Delete the apps off your phone", desc: "They're built to be one thumb-tap away in your most tired moment. Take them off the phone. If you want to buy, make yourself sit down at a real computer and log in. That little bit of effort is often enough for the urge to pass." },
          { title: "Kill one-click and saved cards", desc: "The whole machine removes every speed bump between wanting and buying. Put them back. Turn off one-click, don't save the card, dig it out and type all sixteen digits every time. Annoying is the feature, not the bug." },
        ],
      },
      {
        type: "markdown",
        content: `
And name what you were really reaching for. You didn't open the app because you needed truck parts. You opened it because you were flat and tired and wanted to feel awake. That's a real need — it's just pointed at the wrong thing. A ten-minute walk, a shower, a text to a friend, ten minutes of something with your hands — those work on the actual problem, and they don't show up on your credit-card statement.

The chase will always feel good in the moment — that's just wiring, and it's not going anywhere. But you don't have to keep paying real money for a hit that's gone before the box is even open. Load the cart. Wait two days. Watch how many of those must-haves quietly turn back into don't-needs. That's not going without. That's keeping the money *and* the peace.
        `,
      },
      SERIES_CLOSER,
    ],
  },

  // ─────────────────────────────────────────────────────── 6. SOCIAL MEDIA
  {
    slug: "dopamine-trap-social-media",
    title: "The Slot Machine in Your Pocket: Where Three Hours Go on the Couch",
    excerpt:
      "You pick up the phone 'just to check something' and look up three hours later, unable to name one thing you saw. That's not an accident. Your phone was built to be a slot machine.",
    author: "MT",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    pillar: "mirror",
    icon: "smartphone",
    category: DOPAMINE_TRAP_CATEGORY,
    featured: true,
    heroImage: "/blog/dopamine/hero-social.svg",
    sources: [
      "Pew Research Center — Teens, Social Media & Technology 2024 (≈1 in 3 teens on a top app 'almost constantly')",
      "Lembke, A. Dopamine Nation (2021) — the smartphone as a modern delivery device",
      "Skinner — variable-ratio (unpredictable) reward schedules",
    ],
    content:
      "Unpredictable 'maybe' rewards keep your thumb pulling the handle. Here's how to dull the machine and take your evenings back.",
    sections: [
      {
        type: "markdown",
        content: `
Dinner's over. You drop onto the couch and pick up the phone "just to check something." You'll be a minute.

You look up and it's three hours later. You couldn't tell anybody one thing you saw. Your neck aches. There's a vague, hollowed-out feeling, like you ate a whole bag of chips you never tasted. You didn't *decide* to give up your whole evening — it just got taken. Thumb flicking up, up, up, the way a slot-machine handle gets pulled. And that's not a coincidence. Your phone is a slot machine. It was built to be one. Let's look at why, because the why is also the way out.
        `,
      },
      {
        type: "markdown",
        content: `
Back to the see-saw one more time. You'd think a *guaranteed* reward would hook you hardest. It's the opposite. Your brain squirts the most go-get-it chemical over a reward it **can't predict.** A *maybe* lights you up more than a *yes.*

That one fact is the whole business model of a casino slot machine. You pull the handle, and *maybe* it pays. Most of the time it doesn't — and that not-knowing is exactly what keeps your hand coming back. Now flip your phone over in your head. Every swipe is a pull of the handle. *Maybe* the next post is hilarious. *Maybe* somebody liked your photo. *Maybe* there's news that makes you feel something. Most swipes are nothing — but every so often, *ding,* a little jackpot. That unpredictable payout is what keeps your thumb going long after you meant to stop. You're not weak-willed. You're sitting at a slot machine that fits in your pocket and never closes.
        `,
      },
      {
        type: "pullquote",
        text:
          "Older habits took effort — you had to drive somewhere, wait for the mail. The phone deleted the effort. Now it's instant, endless, and always in reach. Nothing in history was this easy to overdo.",
        author: "MT",
      },
      {
        type: "markdown",
        content: `
And here's the tell that it's the same trap as all the others: **you build up a tolerance.** What used to be enough stops being enough. The feed that satisfied you a year ago feels boring now, so — usually without noticing — you drift toward stuff that's louder, angrier, more shocking, just to feel the same little *ding.* Even people who study this for a living get caught by it. Nobody's too smart for a slot machine. It doesn't beat your intelligence — it beats your wiring.
        `,
      },
      {
        type: "statgrid",
        title: "How deep this one runs (U.S. teens, 2024)",
        stats: [
          { value: "~1 in 3", label: "Teens on a top app 'almost constantly'", sublabel: "At least one major platform (Pew, 2024)" },
          { value: "16% / 15%", label: "'Almost constantly' on TikTok / YouTube", sublabel: "Among U.S. teens (Pew, 2024)" },
          { value: "Maybe", label: "The most powerful word in the machine", sublabel: "Unpredictable rewards hook hardest" },
        ],
      },
      {
        type: "markdown",
        content: `
This trap has a special kind of shame around it, because it feels so *small.* "I'm a grown adult and I lost my whole night to a phone." So we hide it — we don't say the real number of hours. And that secrecy is the food it grows on.

One of the strongest moves, strange as it sounds, is plain honesty out loud to one other person. Tell someone your real screen-time number without shaving it down. Say the actual thing: "I lose hours to this and I hate it." Something shifts when a private habit becomes a spoken sentence between you and one human. It drags the thing into the light, where it can't run the same way.
        `,
      },
      {
        type: "workflow",
        title: "Dull the machine and pull the plug",
        steps: [
          { title: "Go grayscale", desc: "Switch the screen to black-and-white in settings. Sounds too simple to matter. It isn't — those punchy red notification dots are engineered bait, and draining the color drains a shocking amount of the pull. Free, thirty seconds." },
          { title: "Power it down for real hours", desc: "Not face-down on the table — off, or in another room. Pick sacred windows: the dinner table, the last hour before bed, the first thirty minutes awake. A machine you have to walk to and turn on is one you'll play a lot less." },
          { title: "Take a 24-hour fast, keep the people", desc: "Once a week, a full day off the feeds. The first few hours are itchy — that's the wave, not an emergency. Ride it out. And aim your social wiring at real humans: text a friend, call your mom, see people. Starve the machine, feed the thing you were actually hungry for." },
        ],
      },
      {
        type: "markdown",
        content: `
Three hours didn't disappear tonight because something's wrong with you. They got pulled out of you by the best-engineered slot machine ever built, sitting in your own hand. But it only wins while it's shiny, in reach, and secret. Turn the color off. Put it in the other room. Say the real number to one person. Take one full day back. You'll be surprised how much evening — and how much of *you* — comes back with it.

That's the series. Six traps, one see-saw, and one thing underneath all of it: none of this was ever really about willpower. It's old wiring in a world built to overload it — and the same brain that gets hooked is the one that heals. Stop feeding the pain side, lean into a little honest hard, let real people back in. The color comes back. It always does.
        `,
      },
      SERIES_CLOSER,
    ],
  },
];
