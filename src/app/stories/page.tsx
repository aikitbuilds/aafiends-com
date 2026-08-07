"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StoryDisclaimer from "@/components/StoryDisclaimer";
import CrisisSupport from "@/components/CrisisSupport";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { Lock, X, Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  PhotoRow,
  StackList,
  PullQuote,
} from "@/components/design";

// A story's paragraphs can be pre-authored JSX (the seed stories below, which
// use <br/> for their poem line breaks) OR plain strings pulled from Firestore
// (community submissions). renderParagraph() handles both.
type Story = {
  id: string;
  name: string;
  joinDate: string;
  image: string | null;
  paragraphs: (ReactNode | string)[];
};

// Seed stories - always shown, rendered first. Community submissions from
// Firestore are appended below these.
const seedStories: Story[] = [
  {
    id: "mt",
    name: "MT",
    joinDate: "6-9-26",
    image: "/mt_story.png",
    paragraphs: [
      <>I thought I was the master of my complicated code,<br/>A high-performing Founder on a very heavy road.<br/>But the A.I.V. was riding like a shadow on my back,<br/>Waiting for my firewall to crumble and attack.</>,
      <>I'd swear I’d only have just one, and keep it under wraps,<br/>Then wake up with sciatica and take a heavy nap.<br/>The brain fog and the doom-loops kept me spinning in the night,<br/>While the symbiote just whispered, "Hey, you're doing alright!"</>,
      <>On June 9th of '26, the system finally crashed,<br/>My ego and my willpower were absolutely trashed.<br/>I handed the Admin Password to the Grand Architect Divine,<br/>And dragged my broken hardware to the fellowship line.</>,
      <>Now it’s cold plunges at sunrise, and bone broth in a cup,<br/>I track my sleep and Garmin stats to keep the baseline up.<br/>The parasite is starving 'cause I’m plugging into the Grid,<br/>And laughing at the crazy, stupid nonsense that I did.</>,
      <>I cannot out-think the virus, but I learn to hold the line,<br/>Just one day at a time, my friends, and we are doing fine.</>
    ]
  },
  {
    id: "sarah",
    name: "Sarah",
    joinDate: "1-12-26",
    image: "/blog_gamification.png", // Using existing image as placeholder
    paragraphs: [
      <>The burn-out was a feature, not a bug, or so I thought,<br/>Until the system crashed and I was completely overwrought.</>,
      <>I found the group, I shared my log, I laid my data bare,<br/>And found the greatest strength I had was simply being there.</>
    ]
  }
];

function renderParagraph(p: ReactNode | string, i: number) {
  if (typeof p === "string") {
    const lines = p.split("\n");
    return (
      <p key={i}>
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }
  return <p key={i}>{p}</p>;
}

export default function StoriesPage() {
  const [communityStories, setCommunityStories] = useState<Story[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pull approved community stories. The query is constrained to
  // approved == true so it satisfies the Firestore rule (public read is only
  // granted for approved docs). Sorting happens client-side to avoid needing
  // a composite index. If rules haven't been deployed yet the read simply
  // fails and we fall back to the seed stories - never a crash.
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "stories"), where("approved", "==", true))
        );
        const rows: Story[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            name: typeof data.name === "string" && data.name.trim() ? data.name : "Anonymous",
            joinDate: typeof data.joinDate === "string" ? data.joinDate : "",
            image: typeof data.image === "string" ? data.image : null,
            paragraphs: Array.isArray(data.paragraphs)
              ? data.paragraphs.map((x: unknown) => String(x))
              : [String(data.paragraphs ?? "")],
            _ts: data.timestamp?.seconds ?? 0,
          } as Story & { _ts: number };
        });
        rows.sort((a, b) => ((b as any)._ts ?? 0) - ((a as any)._ts ?? 0));
        setCommunityStories(rows);
      } catch (err) {
        console.warn("Community stories unavailable (deploy firestore.rules for the 'stories' collection):", err);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) {
      setError("Please add your name (or an initial) and your story.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const paragraphs = text
        .split(/\n\s*\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      await addDoc(collection(db, "stories"), {
        name: name.trim(),
        paragraphs,
        approved: false, // held for review before appearing publicly
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setName("");
      setText("");
    } catch (err) {
      console.error("Story submission failed:", err);
      setError("Couldn't submit right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setError(null);
    // Leave `submitted` as-is so re-opening shows a fresh form.
    setSubmitted(false);
  };

  const stories: Story[] = [...seedStories, ...communityStories];

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.carTalk}
        height="short"
        title={
          <>
            Stories of <em>strength.</em>
          </>
        }
        lede="In our meetings, we learn that telling our story is the best medicine we have. When you share what you’ve been through, you aren’t just getting it off your chest — you’re showing the next person in line that they aren’t alone."
      />

      {/* ── The stories ──────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead lede={<p>Your experience is what builds our collective strength.</p>}>
            In their <em>own words.</em>
          </SectionHead>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {stories.map((story) => (
              <article key={story.id} className="border-b border-[#1d231d] py-10">
                <div className="flex items-center gap-4">
                  {story.image ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#141814]">
                      <Image
                        src={story.image}
                        alt={`Photograph shared alongside ${story.name}’s story`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1d231d] bg-[#141814] text-[1.1rem] text-[#4cc07a]">
                      {story.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-tight text-[#f2efe6]">
                      {story.name}
                    </h3>
                    {story.joinDate && (
                      <p className="font-measure text-[12.5px] text-[#7d7a70]">
                        AA member since {story.joinDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="font-display-italic mt-6 max-w-[58ch] space-y-5 text-[1.05rem] leading-[1.8] text-[#b8b4a6]">
                  {story.paragraphs.map((p, i) => renderParagraph(p, i))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <PullQuote cite="— what we learn in the rooms">
              Sharing our truth keeps us sober.
            </PullQuote>
          </div>
        </Wrap>
      </Section>

      {/* ── Share yours ──────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead>
            Your journey <em>matters.</em>
          </SectionHead>
          <PhotoRow photo={PHOTOS.nightCall} flip>
            <p className="max-w-[50ch] text-[#b8b4a6]">
              Whether you want to write it down or just speak your truth, we&apos;re here to listen.
              Submissions are read before anything is published, and nothing appears with your full
              name on it.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setShowForm(true);
                  setSubmitted(false);
                  setError(null);
                }}
                className="inline-block rounded-[10px] bg-[#4cc07a] px-6 py-[15px] text-base font-semibold text-[#08130c] transition-[background-color,transform] duration-200 hover:bg-[#5fd08c] active:scale-[0.98]"
              >
                Share your story
              </button>
            </div>
          </PhotoRow>
        </Wrap>
      </Section>

      {/* ── How it works ─────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead>
            How it <em>works.</em>
          </SectionHead>
          <StackList
            items={[
              {
                n: "01",
                title: "Sign in",
                body: "Log in to your account. It’s safe and private.",
              },
              {
                n: "02",
                title: "Get started",
                body: "We guide you through a quick, 3-step setup to help you establish your baseline.",
              },
              {
                n: "03",
                title: "Record or write",
                body: "Don’t want to type? Hit the microphone and speak your truth. We’ll take care of the rest.",
              },
              {
                n: "04",
                title: "Your privacy matters",
                body: "Your story is yours alone. We remove your name and any personal details, keeping your identity strictly protected.",
              },
            ]}
          />

          <div className="mt-14 flex flex-col gap-6">
            <StoryDisclaimer />
            <CrisisSupport />
          </div>
        </Wrap>
      </Section>

      {/* Share Your Story modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeForm}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-[14px] border border-[#1d231d] bg-[#141814] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              className="absolute right-5 top-5 text-[#7d7a70] transition-colors hover:text-[#f2efe6]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 size={28} className="mb-5 text-[#4cc07a]" aria-hidden="true" />
                <h3 className="font-display text-[1.5rem] leading-tight text-[#f2efe6]">
                  Thank you for sharing
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#b8b4a6]">
                  Your story has been received and will be reviewed before it appears here. Sharing
                  your truth keeps us all sober.
                </p>
                <button
                  onClick={closeForm}
                  className="mt-8 rounded-[10px] bg-[#4cc07a] px-8 py-3 text-base font-semibold text-[#08130c] transition-colors hover:bg-[#5fd08c]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-[1.5rem] leading-tight text-[#f2efe6]">
                  Share your story
                </h3>

                <label
                  htmlFor="story-name"
                  className="mt-6 block text-[13.5px] text-[#b8b4a6]"
                >
                  Name or initial
                </label>
                <input
                  id="story-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. MT, or just M."
                  maxLength={60}
                  className="mt-2 w-full rounded-[10px] border border-[#1d231d] bg-[#0d0f0d] px-4 py-3 text-[15px] text-[#f2efe6] placeholder-[#7d7a70] transition-colors focus:border-[#4cc07a] focus:outline-none"
                />

                <label
                  htmlFor="story-text"
                  className="mt-5 block text-[13.5px] text-[#b8b4a6]"
                >
                  Your story
                </label>
                <textarea
                  id="story-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write as much or as little as you like. Leave a blank line between paragraphs."
                  className="mt-2 h-40 w-full resize-none rounded-[10px] border border-[#1d231d] bg-[#0d0f0d] px-4 py-3 text-[15px] text-[#f2efe6] placeholder-[#7d7a70] transition-colors focus:border-[#4cc07a] focus:outline-none"
                />

                <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-[#7d7a70]">
                  <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Submissions are reviewed before publishing. Nothing appears publicly until
                  approved.
                </p>

                {error && (
                  <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-[#c2603f]/40 bg-[#c2603f]/[0.07] px-4 py-3 text-[13.5px] text-[#f2efe6]">
                    <AlertTriangle size={14} className="shrink-0" aria-hidden="true" /> {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#4cc07a] px-6 py-4 text-base font-semibold text-[#08130c] transition-[background-color,transform] duration-200 hover:bg-[#5fd08c] active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" /> Submit for review
                    </>
                  )}
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
