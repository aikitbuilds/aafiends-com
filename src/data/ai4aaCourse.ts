// ---------------------------------------------------------------------------
// AI4AA — "AI Crash Course: 6-Week Curriculum" (Perplexity · Gemini · Claude)
// Public Speaking Edition.
//
// This is the single source of truth for the course content that renders in the
// student login (/ai4aa/dashboard and /ai4aa/dashboard/week/[slug]). Expanded
// from the source curriculum for self-study: every week carries a hook, teaching
// points, a plain-language student lesson, a worked case study, discussion
// prompts, a homework checklist, and the week's on-camera skill.
// ---------------------------------------------------------------------------

export interface Homework {
  title: string;
  tool: string;
  deliverable: string;
}

export interface CaseStudy {
  name: string;
  scenario: string;
  approach: string[];
  result: string;
  discussion: string[];
}

export interface KeyMove {
  move: string;
  how: string;
  when: string;
}

export interface Week {
  slug: string;
  num: number;
  title: string;
  theme: string;
  tools: string;
  cameraSkill: string;
  cameraDeliverable: string;
  level: string;
  /** Accent key -> literal classes in ai4aa infographics/pages COLOR map. */
  accent: "cyan" | "violet" | "blue" | "amber" | "emerald" | "orange";
  icon: string; // lucide name
  image?: string;
  hook: string;
  /** Short "what you'll be able to do" outcomes. */
  outcomes: string[];
  teachingPoints: { title: string; body: string }[];
  studentLesson: string[]; // paragraphs
  keyMoves?: { heading: string; rows: KeyMove[] };
  demoScript: string[];
  caseStudy: CaseStudy;
  homework: Homework[];
  estMinutes: number;
}

export const COURSE_META = {
  title: "AI Crash Course",
  subtitle: "Perplexity · Gemini · Claude — Public Speaking Edition",
  durationLabel: "6 Weeks · 12 live sessions (2×/week)",
  philosophy:
    "Every week is a live performance. You're not just learning AI tools — you're building confidence on camera, behind a mic, and in front of an audience. Each class runs like a broadcast: open with a hook, teach with examples, close with a clear call to action.",
  dualGoal: [
    "Teach AI fluency — Perplexity for research, Gemini for productivity, Claude for building.",
    "Build on-camera presence — every session is a rehearsal for your future podcast or YouTube channel.",
  ],
};

export const TOOL_COMPARISON = [
  {
    tool: "Perplexity",
    role: "The Researcher",
    accent: "cyan",
    bestFor: "Web research, cited answers, Deep Research reports",
    standout: "Model Council (3 models in parallel), Deep Research, Spaces",
    coding: "Moderate",
    web: "Excellent — native search with citations",
  },
  {
    tool: "Gemini",
    role: "The Productivity Assistant",
    accent: "blue",
    bestFor: "Google Workspace automation, multimodal tasks",
    standout: "Cross-app Workspace context (Gmail + Docs + Drive + Sheets)",
    coding: "Moderate",
    web: "Good — Google Search integration",
  },
  {
    tool: "Claude",
    role: "The Builder",
    accent: "orange",
    bestFor: "Coding, long-form reasoning, Claude Code + MCP servers",
    standout: "Claude Code with MCP servers, multi-agent subagents, Artifacts",
    coding: "Excellent — Claude Code in the terminal",
    web: "Limited (no native web search)",
  },
];

export const WEEKLY_RHYTHM = [
  { segment: "Hook (Open)", minutes: 5, purpose: "Open with a bold statement or question — camera practice." },
  { segment: "Recap + Homework Review", minutes: 10, purpose: "Students share what they built last week." },
  { segment: "Core Lesson", minutes: 25, purpose: "Teach the AI concept with live demonstrations." },
  { segment: "Case Study Discussion", minutes: 15, purpose: "Real-world example, open discussion." },
  { segment: "Hands-On Lab", minutes: 20, purpose: "Students try it live." },
  { segment: "On-Camera Moment", minutes: 10, purpose: "Each student records a 60-second AI tip." },
  { segment: "Homework Assignment", minutes: 5, purpose: "Clear deliverable due next session." },
];

// Week 0 — onboarding / prep the student completes before Week 1.
export interface PrepTask {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PREP_TASKS: PrepTask[] = [
  {
    id: "accounts",
    title: "Create your 3 free AI accounts",
    description: "Sign up (free tiers are fine) at perplexity.ai, gemini.google.com, and claude.ai. Keep all three open in browser tabs — you'll use them every week.",
    icon: "KeyRound",
  },
  {
    id: "workspace",
    title: "Set up your recording corner",
    description: "Pick one spot with decent light and a plain background. Your phone on a stack of books is enough. This is your 'studio' for the next 6 weeks of camera practice.",
    icon: "Video",
  },
  {
    id: "goals",
    title: "Write down 3 tasks you want AI to help with",
    description: "On paper, list three things in your work or life that eat time. You'll aim these tools at them as the course goes.",
    icon: "PenTool",
  },
  {
    id: "first-prompt",
    title: "Run your very first prompt",
    description: "In Perplexity, type: \"Explain AI to a 10-year-old in 3 sentences, then to a business owner in 3 sentences.\" Notice how the answer changes with framing — that's prompt context, your #1 skill.",
    icon: "Sparkles",
  },
  {
    id: "intro-video",
    title: "Record your 30-second intro",
    description: "Film a 30-second clip: who you are and what you hope to get from this course. Don't over-think it — this is your baseline. You'll watch your growth by Week 6.",
    icon: "Camera",
  },
];

export const WEEKS: Week[] = [
  {
    slug: "week-1-foundations",
    num: 1,
    title: "Foundations — What Is AI and Why Should You Care?",
    theme: "AI literacy — understanding the landscape",
    tools: "Perplexity (primary), quick intro to Gemini & Claude",
    cameraSkill: "Introducing yourself on camera — the 30-second hook",
    cameraDeliverable: "Video: who I am and what I'm learning",
    level: "Zero assumed knowledge",
    accent: "cyan",
    icon: "Compass",
    image: "/images/ai4aa/weeks/week-1.png",
    hook: "In 2026, not knowing how to use AI is like not knowing how to use Google in 2005. Today you'll meet the three tools that change how you work — and by the end of this course you'll explain them on camera better than most tech influencers.",
    outcomes: [
      "Explain what a Large Language Model is in one plain sentence.",
      "Tell the difference between search, a productivity assistant, and a build partner.",
      "Run and screenshot the same prompt across all three tools.",
    ],
    teachingPoints: [
      { title: "What is an LLM?", body: "Think of it as the world's most well-read intern: it has read almost everything ever written, but it can still be confidently wrong. That's why verification matters." },
      { title: "Three different jobs", body: "Perplexity = search & research (with citations). Gemini = productivity assistant living in your Google apps. Claude = code + reasoning partner that can actually build things." },
      { title: "Why citations matter", body: "Perplexity cites every claim so you can check it. Most AIs will hallucinate confidently without a source. For business decisions, cited beats uncited every time." },
    ],
    studentLesson: [
      "AI tools are like specialized team members. Perplexity is your researcher — it finds and cites real information from the web. Gemini is your productivity assistant — it works inside your Google apps. Claude is your builder — it writes and debugs code, thinks through complex problems, and can control software through a terminal.",
      "Your first prompt to try now: go to perplexity.ai and type \"Explain AI to a 10-year-old in 3 sentences, then explain it to a business owner in 3 sentences.\" Notice how the answer changes with framing. That shift is called prompt context — and it's the most powerful skill in this whole course.",
    ],
    demoScript: [
      "Open Perplexity and ask: \"What are the top 5 ways entrepreneurs in Houston are using AI in 2026?\"",
      "Watch citations appear after every claim.",
      "Click Deep Research — see it run multiple searches and synthesize a report.",
      "Convert the result into a Perplexity Page — a shareable, formatted document.",
    ],
    caseStudy: {
      name: "The Houston Restaurant Owner",
      scenario: "Maria owns a restaurant in Midtown Houston and spends 3 hours a week writing her email newsletter.",
      approach: [
        "Used Perplexity to research trending food topics.",
        "Used Gemini to draft the newsletter inside Google Docs.",
      ],
      result: "Newsletter time dropped from 3 hours to 25 minutes. She reinvested the time into a weekly 2-minute cooking video — growing her YouTube channel to 1,200 subscribers in 4 months.",
      discussion: [
        "What task in your own work takes the most time that AI could help with?",
        "What would you do with that recovered time?",
      ],
    },
    homework: [
      { title: "Create free accounts on Perplexity, Gemini, and Claude", tool: "All 3", deliverable: "Screenshot of all 3 dashboards" },
      { title: "Run the same question on all 3 AIs: \"What is the best advice for a new entrepreneur in 2026?\"", tool: "All 3", deliverable: "Screenshot of all 3 answers" },
      { title: "Record a 60-second video introducing yourself and what you hope to learn", tool: "Camera", deliverable: "Video file" },
      { title: "Write down 3 tasks in your daily work you want AI to help with", tool: "Reflection", deliverable: "Written list" },
    ],
    estMinutes: 90,
  },
  {
    slug: "week-2-perplexity",
    num: 2,
    title: "Perplexity Deep Dive — Your AI Research Engine",
    theme: "Research mastery with Perplexity",
    tools: "Perplexity AI (all features)",
    cameraSkill: "Teaching to the camera — explain a concept in 90 seconds",
    cameraDeliverable: "Video: explain Perplexity Spaces to a friend",
    level: "Beginner",
    accent: "cyan",
    icon: "Search",
    image: "/images/ai4aa/weeks/week-2.png",
    hook: "What if you could hire a research assistant who reads 500 web pages in 3 minutes, cites every source, and never sleeps? That's what we're doing today.",
    outcomes: [
      "Create a Perplexity Space that searches your documents and the live web together.",
      "Run a Deep Research report and export it as a shareable Page.",
      "Write a strong, specific prompt instead of a weak, vague one.",
    ],
    teachingPoints: [
      { title: "Pro Search vs Standard", body: "Pro Search runs multiple searches and reconciles conflicting information instead of returning a single quick answer." },
      { title: "Spaces", body: "A persistent research workspace. Upload your own documents AND search the live web at once — e.g., drop in your business plan, then ask questions about your market." },
      { title: "Model Council", body: "Run 3 frontier models in parallel and compare answers — great for strategic decisions where one opinion isn't enough." },
      { title: "Pages", body: "Turn any research thread into a shareable, formatted report instantly." },
    ],
    studentLesson: [
      "Perplexity rewards specific prompts. Compare a weak prompt — \"Tell me about social media marketing\" — with a strong one: \"What are the top 3 Instagram strategies small businesses in Houston used to grow from 0 to 10,000 followers in 2025–2026? Include real examples.\" The strong prompt gives a target audience, location, timeframe, and format, so Perplexity searches for exactly what you need.",
      "Always sanity-check the sources it cites before you act on them — the citations are there so you can verify, not so you can skip verifying.",
    ],
    keyMoves: {
      heading: "The 3 Perplexity moves every entrepreneur needs",
      rows: [
        { move: "Quick Answer", how: "Standard search bar", when: "Fast facts, current news, quick definitions" },
        { move: "Deep Research", how: "Click \"+\" → Deep Research", when: "Market research, competitive analysis, writing a brief" },
        { move: "Spaces", how: "Left sidebar → Create Space", when: "Ongoing projects needing web + your own documents together" },
      ],
    },
    demoScript: [
      "Create a Space titled \"My Business Research\".",
      "Upload a one-page business summary.",
      "Ask: \"Who are my top 5 competitors, and what are their weaknesses?\"",
      "Show it pulling from both your document and the live web.",
      "Export as a Perplexity Page and view it as a shareable report.",
    ],
    caseStudy: {
      name: "The Tech Startup Due Diligence",
      scenario: "A Houston investor needs to evaluate a SaaS startup before a meeting in 2 hours.",
      approach: [
        "Old way: 2 hours reading blog posts, LinkedIn, and Crunchbase by hand.",
        "AI way: Perplexity Deep Research — \"Give me a comprehensive competitive analysis of [Company]: competitors, funding history, product gaps, and red flags.\"",
      ],
      result: "A 12-page structured report in 8 minutes. The investor walked in with better questions than the founders expected.",
      discussion: [
        "What research task do you repeat that Perplexity could automate?",
        "How would you verify Perplexity's information before using it?",
      ],
    },
    homework: [
      { title: "Create a Perplexity Space for your business or a current project", tool: "Perplexity", deliverable: "Space with 1+ uploaded document + 5 queries" },
      { title: "Run a Deep Research report on your industry or a podcast topic", tool: "Perplexity", deliverable: "Exported Page/report" },
      { title: "Record yourself explaining one thing you learned — 90 seconds, no notes", tool: "Camera", deliverable: "Video file" },
      { title: "Compare a Perplexity answer to a Google result on the same question", tool: "Both", deliverable: "Written comparison" },
    ],
    estMinutes: 90,
  },
  {
    slug: "week-3-gemini",
    num: 3,
    title: "Gemini Deep Dive — AI Inside Your Google Life",
    theme: "Productivity and creation with Gemini",
    tools: "Google Gemini (standalone + Workspace)",
    cameraSkill: "Storytelling on camera — the Problem → Solution structure",
    cameraDeliverable: "Video: a 2-minute Problem → Solution story",
    level: "Beginner–Intermediate",
    accent: "blue",
    icon: "Sparkles",
    image: "/images/ai4aa/weeks/week-3.png",
    hook: "Google Workspace is where most of us live — email, docs, spreadsheets. Gemini just made it 10x more powerful. Let me show you how to turn a full day of document work into a 45-minute morning.",
    outcomes: [
      "Draft a real document with \"Help Me Create\" using your Drive files as context.",
      "Auto-populate a spreadsheet column with \"Fill with Gemini\".",
      "Tell a tight Problem → Solution story on camera.",
    ],
    teachingPoints: [
      { title: "Cross-app context", body: "Gemini can pull from Gmail, Drive, and Chat at once to draft documents — no more tab-switching." },
      { title: "Help Me Create (Docs)", body: "Give a one-sentence prompt and Gemini drafts a full document using relevant Drive files as context." },
      { title: "Fill with Gemini (Sheets)", body: "Auto-populate columns with AI-generated data or live web data." },
      { title: "Workspace Studio + Meet", body: "Plain-English workflow automation, plus real-time meeting transcription, action items, and post-meeting summaries." },
    ],
    studentLesson: [
      "Gemini's superpower is that it knows your work. Unlike Perplexity (which searches the web) or Claude (which works with what you give it), Gemini can see your documents, emails, and calendar — so it can answer things like \"Draft a follow-up email based on my meeting notes from last Tuesday\" or \"Create a slide deck for the Q3 review using the data in my quarterly spreadsheet.\"",
      "This week's camera skill is the Problem → Solution story. Frame it in three beats: Problem (\"Every Monday I spent 2 hours writing the same report...\"), Discovery (\"Then I found Gemini could pull from my Drive automatically...\"), Result (\"Now it takes 15 minutes and it's actually better.\"). This structure works for YouTube intros, podcasts, and client pitches.",
    ],
    demoScript: [
      "Gmail → Gemini: \"Summarize my 5 most important unread emails and suggest responses.\"",
      "Docs → Help Me Create: \"Write a business proposal using the project files in my Drive.\"",
      "Sheets → Fill with Gemini: \"Add a column with the LinkedIn URL for each company in column A.\"",
      "Join a Meet and show live transcription + the action-item panel.",
    ],
    caseStudy: {
      name: "The Marketing Agency Content Team",
      scenario: "A 5-person Houston agency produces weekly content packages for 8 clients — a brief, 3 social posts, a blog outline, and a performance summary each. About 40 hours a week.",
      approach: [
        "Gemini drafts briefs from past Gmail context.",
        "Help Me Create drafts blog outlines from previous client Drive docs.",
        "Sheets auto-populates performance data; Meet summaries generate next-week task docs.",
      ],
      result: "40 hours dropped to 18. The team reinvested the time in client strategy calls, lifting retention by 30%.",
      discussion: [
        "Which Gemini Workspace feature would save you the most time immediately?",
        "What's the risk of letting AI draft communications for you — and how do you mitigate it?",
      ],
    },
    homework: [
      { title: "Use \"Help Me Create\" in Docs to draft one real business document", tool: "Gemini Docs", deliverable: "Finished draft document" },
      { title: "Use \"Fill with Gemini\" in Sheets to auto-populate a useful column", tool: "Gemini Sheets", deliverable: "Completed spreadsheet" },
      { title: "Record a 2-minute Problem → Solution story about a task AI helped with", tool: "Camera", deliverable: "Video file" },
      { title: "Test Gemini vs Perplexity on the same research task — which was better and why?", tool: "Both", deliverable: "Written reflection" },
    ],
    estMinutes: 90,
  },
  {
    slug: "week-4-claude",
    num: 4,
    title: "Claude Deep Dive — Your AI Co-Builder",
    theme: "Building and creating with Claude — from chat to code",
    tools: "Claude.ai (chat), Claude Code (terminal)",
    cameraSkill: "Demonstrating live — the \"watch me build\" format",
    cameraDeliverable: "Video: a 2-minute \"watch me use AI\" screen share",
    level: "Beginner–Intermediate",
    accent: "orange",
    icon: "Terminal",
    image: "/images/ai4aa/weeks/week-4.png",
    hook: "The other two tools help you research and write. Claude helps you BUILD. Today I'll type a prompt into a terminal and watch a working app appear in real time. You don't need to be a developer — but after today, you'll know how to talk to one.",
    outcomes: [
      "Get real work out of Claude with plain-language prompts (no code required).",
      "Understand what Claude Code, MCP servers, and CLAUDE.md do.",
      "Narrate a \"watch me build\" screen share on camera.",
    ],
    teachingPoints: [
      { title: "Chat vs Claude Code", body: "Chat is conversational AI. Claude Code is a terminal agent that writes, runs, and debugs code autonomously — with your approval at each step." },
      { title: "MCP servers", body: "Plugins that give Claude live access to tools — GitHub, databases, file systems, APIs. Think of them as Claude's hands: it can actually reach out and act on your stack." },
      { title: "CLAUDE.md", body: "A project memory file. Write your rules, stack versions, and constraints once, and Claude remembers them every session." },
      { title: "Projects & Artifacts", body: "Projects are persistent workspaces with custom instructions and knowledge files. Artifacts are runnable code, charts, and HTML created right in the chat." },
    ],
    studentLesson: [
      "You don't need to write code to benefit from Claude. In plain language it can write a script, build a small web tool, analyze a spreadsheet and explain the trends, debug an error message, or draft a professional proposal — you describe the outcome, it produces the working thing.",
      "This week's camera skill is the \"watch me build\" format — one of YouTube's most-watched. Share your screen, talk to one imaginary viewer, and narrate your thinking (\"Now I'm going to ask Claude to...\"). When something breaks, that's content — don't cut it. 8–12 minutes is the sweet spot.",
    ],
    keyMoves: {
      heading: "What Claude can do for non-coders",
      rows: [
        { move: "Write a script", how: "\"Write a Python script that reads my CSV of leads and emails each one\"", when: "Repetitive data tasks" },
        { move: "Build a tool", how: "\"Create a web page that calculates podcast ROI from views, CPM, and hours\"", when: "Small utilities" },
        { move: "Analyze data", how: "\"Here's my sales spreadsheet — find the top 3 trends in plain English\"", when: "Making sense of numbers" },
        { move: "Debug errors", how: "\"Here's an error from my app — what's wrong and how do I fix it?\"", when: "When something breaks" },
      ],
    },
    demoScript: [
      "Open a terminal with Claude Code installed (npm install -g @anthropic-ai/claude-code).",
      "Navigate to a project folder.",
      "Type: \"Build a simple web page showing the top 5 AI tools for entrepreneurs with a comparison table.\"",
      "Watch Claude plan, write files, and execute — with approval prompts.",
      "Open the result in a browser and discuss what just happened.",
    ],
    caseStudy: {
      name: "The Solo Developer Building a SaaS App",
      scenario: "Marcus, a solo developer in Houston, estimated 3 months to build a client-portal SaaS alone.",
      approach: [
        "CLAUDE.md defined his stack: Next.js, Supabase, TypeScript.",
        "GitHub MCP tracked features and bugs; PostgreSQL MCP wrote and tested queries.",
        "Subagents ran in parallel: one building features, one writing tests, one updating docs.",
      ],
      result: "First working version launched in 5 weeks. Claude Code wrote roughly 65% of the boilerplate; Marcus focused on product, UX, and customer conversations.",
      discussion: [
        "What's one tool or app you've always wanted to build but lacked the skills for?",
        "How does an AI co-builder change the kind of entrepreneur you can be?",
      ],
    },
    homework: [
      { title: "Have Claude Chat write something useful for your business (script, email sequence, proposal)", tool: "Claude.ai", deliverable: "Finished document" },
      { title: "If comfortable: install Claude Code and run your first terminal session (build a simple HTML page)", tool: "Claude Code", deliverable: "Working file in a folder" },
      { title: "Record a 2-minute \"watch me use AI\" screen share, narrating as you go", tool: "Camera + screen", deliverable: "Video file" },
      { title: "Write: what 3 things could Claude Code build for your business with no technical limits?", tool: "Reflection", deliverable: "Written list" },
    ],
    estMinutes: 90,
  },
  {
    slug: "week-5-workflow",
    num: 5,
    title: "The AI Workflow — Combining All Three Tools",
    theme: "Designing integrated AI workflows for real business tasks",
    tools: "Perplexity + Gemini + Claude working together",
    cameraSkill: "The conversational interview format — explaining without a script",
    cameraDeliverable: "Video: a 3-minute conversational piece, 3 anchor points, no script",
    level: "Intermediate",
    accent: "violet",
    icon: "Workflow",
    image: "/images/ai4aa/weeks/week-5.png",
    hook: "Individually, these three tools are powerful. Together, they're a full AI team. Today we design your personal AI workflow — specific to your business and your content goals.",
    outcomes: [
      "Map a real recurring task to the right tool at each step.",
      "Run the 3-tool content pipeline end to end for one real idea.",
      "Speak to camera from anchor points instead of a script.",
    ],
    teachingPoints: [
      { title: "The AI stack (think in layers)", body: "Research layer = Perplexity (cited facts & trends). Productivity layer = Gemini (draft, automate, run meetings). Build layer = Claude (code, logic, apps)." },
      { title: "3-tool content pipeline", body: "Perplexity researches the topic → Gemini turns it into an outline + talking points → Claude writes the show-notes page, timestamps, and description." },
      { title: "3-tool entrepreneur workflow", body: "Perplexity researches the client/market → Gemini drafts the proposal from past files → Claude builds any technical deliverable the proposal promises." },
      { title: "Right tool for the job", body: "Route research to Perplexity, productivity to Gemini, and building/coding to Claude. Model Council is for big either/or decisions." },
    ],
    studentLesson: [
      "Fill in your personal AI stack: researching topics → Perplexity (citations, current data); drafting emails/proposals → Gemini (lives in Workspace); building tools/scripts → Claude (best reasoning + code); big decisions → Perplexity Model Council; presentations → Gemini Slides; debugging → Claude.",
      "This week's camera skill is talking without a script. Know your 3 main points before you hit record — anchors, not a script. If you lose your place: pause, smile, and say \"Let me come back to that.\" Audiences respect authenticity. Record 3 minutes, watch it back, fix one thing, repeat daily.",
    ],
    demoScript: [
      "Perplexity Deep Research: \"What are the biggest trends in AI for small business in Houston in 2026?\"",
      "Export to a Perplexity Page.",
      "Gemini Docs: paste the research → \"Help me create an episode outline for a 30-minute podcast.\"",
      "Claude: \"Write the show-notes HTML page with timestamps for intro, 3 topics, case study, and outro, plus an SEO meta description.\"",
      "Review the full package — research, outline, show notes — in under an hour.",
    ],
    caseStudy: {
      name: "The Entrepreneur Podcast — Idea to Episode",
      scenario: "A Houston entrepreneur wants to launch a podcast about AI for small business owners, with zero podcasting experience.",
      approach: [
        "Perplexity researched the competitive podcast landscape (15 min).",
        "Gemini drafted the concept, a 20-topic episode list, and a brand-voice guide (30 min).",
        "Claude built a simple email-capture site for the launch (45 min).",
      ],
      result: "Per-episode prep dropped under 2 hours (research 10 min, outline 15 min, show notes 20 min, recording 45 min because she was prepared). She launched 8 episodes in 6 weeks.",
      discussion: [
        "What does your ideal content workflow look like, start to finish?",
        "Where do you spend the most time today that AI could compress?",
      ],
    },
    homework: [
      { title: "Design your personal AI workflow for one recurring task — map tool to step", tool: "All 3", deliverable: "Workflow diagram or written doc" },
      { title: "Run the 3-tool content pipeline for one real content idea", tool: "All 3", deliverable: "Research report + outline + show notes" },
      { title: "Record a 3-minute conversational piece to camera — no script, 3 anchors", tool: "Camera", deliverable: "Video file" },
      { title: "Test Perplexity's Model Council on a real strategic question", tool: "Perplexity", deliverable: "Screenshot + notes on which answer helped most" },
    ],
    estMinutes: 90,
  },
  {
    slug: "week-6-capstone",
    num: 6,
    title: "Capstone — Build Your AI-Powered Brand",
    theme: "Launching your AI workflow and your on-camera brand",
    tools: "All three + your personal setup",
    cameraSkill: "Delivering a complete 5-minute on-camera presentation",
    cameraDeliverable: "Capstone: 5-minute presentation + live demo",
    level: "Intermediate",
    accent: "amber",
    icon: "Trophy",
    image: "/images/ai4aa/weeks/week-6.png",
    hook: "Six weeks ago, some of you had never talked to an AI. Today you'll demo your AI workflow on camera — just like you would on your podcast or YouTube channel. This is your first episode.",
    outcomes: [
      "Present your AI workflow for one real business task on camera.",
      "Run a live demo of one of the three tools.",
      "Show one thing you built or created with AI during the course.",
    ],
    teachingPoints: [
      { title: "Capstone requirements", body: "A 5-minute on-camera presentation: your AI workflow for one real task, a live demo of one tool, and one result you produced during the course." },
      { title: "AI is a multiplier, not a replacement", body: "The entrepreneur who uses AI well beats the one who doesn't — every time." },
      { title: "Celebrate the break", body: "If a live demo fails, that's a lesson in adaptability. Don't hide it — narrate the recovery." },
      { title: "On-camera confidence is a skill", body: "Not a talent. It improves with daily reps: reduce fear, start small, use structure, watch yourself, publish publicly." },
    ],
    studentLesson: [
      "You are now an AI-literate entrepreneur. You know Perplexity (Deep Research, Spaces, Pages, Model Council), Gemini (cross-app Workspace context, Help Me Create, Fill with Gemini, Meet AI), and Claude (chat reasoning, Claude Code, MCP servers, CLAUDE.md, Artifacts) — and you can do it on camera because you've practiced for six weeks.",
      "Your 30-day post-course challenge keeps the momentum: days 1–7, post one 60-second AI tip video per day; days 8–14, record your first full podcast episode using the 3-tool pipeline; days 15–21, build one small tool with Claude Code; days 22–30, run a Deep Research report and publish it as a blog post or newsletter.",
    ],
    demoScript: [
      "Rehearse the 5-minute flow once: hook → workflow → live demo → one result → close.",
      "Have a backup screenshot ready in case a live tool is slow.",
      "Record the final presentation — it becomes a portfolio piece.",
      "Watch all your weekly clips back-to-back to see six weeks of growth.",
    ],
    caseStudy: {
      name: "Your Capstone Rubric",
      scenario: "You'll be assessed on five criteria — use them to prepare, not just to be graded.",
      approach: [
        "AI Tool Usage — demonstrate all 3 tools fluently.",
        "On-Camera Presence — confident, natural, engaging.",
        "Structure — clear hook, 3 points, strong close.",
        "Real-World Application + Live Demo — show a direct business use and run it live (recover gracefully if it breaks).",
      ],
      result: "Record the presentation and keep it. Watching your Week 1 intro next to your Week 6 capstone is your real graduation project.",
      discussion: [
        "Which of the five rubric criteria is your strongest — and which needs the most prep?",
        "What's the very first thing you'll publish after the course?",
      ],
    },
    homework: [
      { title: "Deliver your 5-minute capstone: workflow + live demo + one result", tool: "All 3 + Camera", deliverable: "Recorded presentation" },
      { title: "Start the 30-day challenge: post your first 60-second AI tip video", tool: "Camera", deliverable: "Published video" },
      { title: "Watch your Week 1 intro next to today's capstone", tool: "Reflection", deliverable: "Written note on what changed" },
    ],
    estMinutes: 120,
  },
];

// ---- Supplemental study tools -------------------------------------------------

export const PROMPT_FORMULAS = [
  { goal: "Research", formula: "Give me [number] [type of info] about [topic] with specific examples from [timeframe/location]." },
  { goal: "Writing", formula: "Write a [format] for [audience] about [topic]. Tone: [tone]. Length: [length]." },
  { goal: "Analysis", formula: "Here is [data/document]. Identify the top [number] insights and explain why each matters for [goal]." },
  { goal: "Code", formula: "Build a [type of tool] that [function]. I use [tech stack]. Output a working file I can run immediately." },
  { goal: "Decision", formula: "I'm deciding between [A] and [B] for [situation]. What are the top 3 considerations for each?" },
];

export const CAMERA_MILESTONES = [
  { week: 1, skill: "30-second self-introduction", deliverable: "Who I am and what I'm learning" },
  { week: 2, skill: "90-second teaching moment", deliverable: "Explain Perplexity Spaces to a friend" },
  { week: 3, skill: "2-minute Problem → Solution story", deliverable: "An AI tool that saved you time" },
  { week: 4, skill: "2-minute screen-share tutorial", deliverable: "\"Watch me use Claude\"" },
  { week: 5, skill: "3-minute conversational piece", deliverable: "3 anchor points, no script" },
  { week: 6, skill: "5-minute full presentation + live demo", deliverable: "Capstone project" },
];

export const THIRTY_DAY_CHALLENGE = [
  { range: "Days 1–7", task: "Post one 60-second AI tip video per day." },
  { range: "Days 8–14", task: "Record your first full podcast episode using the 3-tool content pipeline." },
  { range: "Days 15–21", task: "Build one small tool with Claude Code that solves a real problem." },
  { range: "Days 22–30", task: "Run a Deep Research report with Perplexity and publish it as a blog post or newsletter." },
];

export const CAPSTONE_RUBRIC = [
  { criteria: "AI Tool Usage", excellent: "Demonstrates all 3 tools fluently", good: "Uses 2 tools well", needsWork: "Uses 1 tool" },
  { criteria: "On-Camera Presence", excellent: "Confident, natural, engaging", good: "Mostly confident", needsWork: "Nervous but clear" },
  { criteria: "Structure", excellent: "Clear hook, 3 points, strong close", good: "Has structure", needsWork: "Somewhat structured" },
  { criteria: "Real-World Application", excellent: "Direct business application", good: "General application", needsWork: "Vague application" },
  { criteria: "Live Demo", excellent: "Runs smoothly, narrates well", good: "Minor issues", needsWork: "Breaks but recovers" },
];

export function getWeek(slug: string): Week | undefined {
  return WEEKS.find((w) => w.slug === slug);
}

// Every trackable item, used to compute overall course progress.
export const TOTAL_TRACKABLE =
  PREP_TASKS.length + WEEKS.reduce((sum, w) => sum + 1 + w.homework.length, 0);
