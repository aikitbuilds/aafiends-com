"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { Heart, User, Sparkles, Mic, Lock, X, Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

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
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />

      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-5xl w-full">

          {/* Hero Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col items-center text-center mb-16 border-b border-white/5 pb-16">
             <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 mb-6 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                <Heart size={32} />
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
               Stories of Strength
             </h1>
             <span className="text-lg font-medium text-teal-400 block mb-6">
               Sharing our truth keeps us sober.
             </span>
             <p className="max-w-3xl text-neutral-300 text-lg leading-relaxed font-light">
               In our meetings, we learn that telling our story is the best medicine we have. When you share what you’ve been through, you aren’t just getting it off your chest—you’re showing the next person in line that they aren't alone. Your experience is what builds our collective strength.
             </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">

            {/* Left Column: The Stories */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-7 flex flex-col gap-6">

              <div className="flex flex-col gap-12">
                {stories.map((story) => (
                  <div key={story.id} className="w-full bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center">
                        {story.image ? (
                          <Image src={story.image} alt={story.name} width={800} height={600} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-teal-400 font-black text-lg">{story.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">
                          {story.name}
                        </h2>
                        {story.joinDate && (
                          <span className="text-neutral-500 text-sm">
                            AA Member since {story.joinDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-neutral-300 text-lg leading-loose space-y-6 font-serif italic font-light">
                      {story.paragraphs.map((p, i) => renderParagraph(p, i))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Visual and Submission Flow */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }} className="lg:col-span-5 flex flex-col gap-8">

              <div className="relative rounded-[2rem] overflow-hidden border border-teal-500/10 shadow-[0_20px_50px_rgba(20,184,166,0.05)] bg-[#09090b] aspect-[4/3] group">
                <Image src="/mt_story.png" alt="Finding peace at sunrise" width={800} height={600} className="w-full h-full object-cover opacity-80 transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none"></div>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 shadow-xl flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/20">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Share Your Story
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  Your journey matters. Whether you want to write it down or just speak your truth, we're here to listen.
                </p>

                <button
                  onClick={() => { setShowForm(true); setSubmitted(false); setError(null); }}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-wide py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_30px_rgba(13,148,136,0.4)]"
                >
                  Share Your Story
                </button>
              </div>

            </motion.div>
          </div>

          {/* Submission Flow Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }} className="border-t border-white/5 pt-16">
            <h3 className="text-center text-2xl font-bold text-white tracking-tight mb-12">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <User size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Sign In</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Log in to your account. It's safe and private.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Get Started</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">We guide you through a quick, 3-step setup to help you establish your baseline.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Mic size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Record or Write</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Don't want to type? Hit the microphone and speak your truth. We’ll take care of the rest.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Lock size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Your Privacy Matters</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Your story is yours alone. We remove your name and any personal details, keeping your identity strictly protected.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* Share Your Story modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeForm}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              className="absolute top-5 right-5 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-14 h-14 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 border border-teal-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Thank you for sharing</h3>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                  Your story has been received and will be reviewed before it appears here. Sharing your truth keeps us all sober.
                </p>
                <button
                  onClick={closeForm}
                  className="mt-8 bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-wide py-3 px-8 rounded-2xl transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Share Your Story</h3>
                </div>

                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Name or initial</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. MT, or just M."
                  maxLength={60}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 mb-5"
                />

                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Your story</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write as much or as little as you like. Leave a blank line between paragraphs."
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 resize-none h-40"
                />

                <p className="text-neutral-600 text-xs mt-3 leading-relaxed flex items-start gap-2">
                  <Lock size={12} className="shrink-0 mt-0.5" />
                  Submissions are reviewed before publishing. Nothing appears publicly until approved.
                </p>

                {error && (
                  <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mt-4">
                    <AlertTriangle size={14} className="shrink-0" /> {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold tracking-wide py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                  ) : (
                    <><Send size={16} /> Submit for Review</>
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
