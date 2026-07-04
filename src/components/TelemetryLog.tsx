"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ActivitySquare, BrainCircuit, Bone, CheckCircle2, ChevronRight, Check, AlertTriangle, Sparkles, ListChecks, Mic, Square } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useVocab } from "@/contexts/VocabularyContext";

interface MirrorResult {
  theWhy: string;
  gentleAlerts: string[];
  reliefPlan: string[];
}

// Turns the form state into the plain-language narrative the AI Mirror Engine reads.
// Keeping this in one place makes it easy to see exactly what Gemini receives.
// Rewritten 2026-07-04 for the 1-5 scale (was 1-10) - see the multiple-choice
// redesign below.
function composeNarrative(
  sliders: { leadSuit: number; brainFog: number; cravings: number; armorLevel: number },
  anchors: { hitMeeting: boolean; calledSponsor: boolean; physicalMovement: boolean; nsdr: boolean },
  override: string
) {
  const anchorLines = [
    `Hit a meeting today: ${anchors.hitMeeting ? "yes" : "no"}.`,
    `Called sponsor today: ${anchors.calledSponsor ? "yes" : "no"}.`,
    `Physical movement today: ${anchors.physicalMovement ? "yes" : "no"}.`,
    `NSDR protocol executed: ${anchors.nsdr ? "yes" : "no"}.`,
  ].join(" ");

  return [
    `Daily check-in telemetry (scale 1-5, higher = worse):`,
    `Physical lead suit / nervous system exhaustion: ${sliders.leadSuit}/5.`,
    `Brain fog / decision fatigue: ${sliders.brainFog}/5.`,
    `Craving intensity: ${sliders.cravings}/5.`,
    `Physical armor / sciatic compression: ${sliders.armorLevel}/5.`,
    anchorLines,
    `What I actually did about it today: ${override || "(nothing logged)"}`,
  ].join("\n");
}

function formatSeconds(total: number): string {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Shared submit path for both the typed form and the voice transcript -
// same auth header, same defensive JSON parsing (see the comment inside for
// why that matters), same /api/mirror endpoint either way.
async function postToMirror(idToken: string, input: string, structured?: unknown) {
  const response = await fetch("/api/mirror", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ input, structured }),
  });

  // The API route always returns JSON on its own error paths - but an
  // infrastructure-level failure (cold start crash, timeout, rate limit)
  // can return a plain-text/HTML error page from the hosting layer
  // itself, before the route's own code ever runs. Calling
  // response.json() directly on that threw a raw, cryptic
  // "Unexpected token 'I', 'Internal S'... is not valid JSON" straight
  // at the user (2026-07-03 bug report). Parse defensively instead.
  const rawText = await response.text();
  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(
      `The Mirror Engine is unavailable right now${response.ok ? "" : ` (error ${response.status})`}. Try again in a moment.`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || "The Mirror Engine failed to respond.");
  }

  return data;
}

const MAX_RECORDING_SECONDS = 180; // 3 minutes

function pickSupportedMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c;
  }
  return "";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Strip the "data:audio/webm;base64," prefix - Gemini's inlineData
      // wants just the raw base64 payload.
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Literal Tailwind classes per severity level (1 = best, 5 = worst) for the
// new multiple-choice scale fields, added 2026-07-04 (Michael, following a
// Perplexity-generated design critique + "use COLOR!!! there's not a
// shortage of colors": replaced the flat all-red 1-10 sliders with 5
// tappable, color-coded options per question, each carrying its own short
// meaning instead of a bare number). Kept as a literal array (not
// template-built) so Tailwind's static scanner picks up every class.
const SCALE_COLORS = [
  { text: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/50", glow: "shadow-[0_0_15px_rgba(16,185,129,0.35)]" },
  { text: "text-teal-400", bg: "bg-teal-500/15", border: "border-teal-500/50", glow: "shadow-[0_0_15px_rgba(20,184,166,0.35)]" },
  { text: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/50", glow: "shadow-[0_0_15px_rgba(245,158,11,0.35)]" },
  { text: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/50", glow: "shadow-[0_0_15px_rgba(249,115,22,0.35)]" },
  { text: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/50", glow: "shadow-[0_0_15px_rgba(239,68,68,0.35)]" },
];

// Literal per-item accent colors for "Today's Actions" - was flat red for
// every row regardless of which action it was.
const ACTION_COLORS = [
  { text: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500", check: "bg-blue-500", glow: "shadow-[0_0_18px_rgba(59,130,246,0.4)]" },
  { text: "text-violet-400", bg: "bg-violet-500/20", border: "border-violet-500", check: "bg-violet-500", glow: "shadow-[0_0_18px_rgba(139,92,246,0.4)]" },
  { text: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500", check: "bg-emerald-500", glow: "shadow-[0_0_18px_rgba(16,185,129,0.4)]" },
  { text: "text-teal-400", bg: "bg-teal-500/20", border: "border-teal-500", check: "bg-teal-500", glow: "shadow-[0_0_18px_rgba(20,184,166,0.4)]" },
];

// Rotation for "What Helped Today" chips - was flat red for every chip.
const CHIP_COLORS = [
  { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500" },
  { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500" },
  { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500" },
  { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500" },
  { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500" },
];

export default function TelemetryLog() {
  const { user } = useAuth();
  const { t } = useVocab();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mirrorResult, setMirrorResult] = useState<MirrorResult | null>(null);

  // Type vs. Record - added 2026-07-03 per Michael's request for a real
  // voice-memo check-in. Kept alongside the existing form rather than
  // replacing it (his call, via AskUserQuestion).
  const [inputMode, setInputMode] = useState<"type" | "record">("type");
  const [recStatus, setRecStatus] = useState<"idle" | "recording" | "transcribing" | "review">("idle");
  const [recSeconds, setRecSeconds] = useState(0);
  const [recError, setRecError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Form State - default 3 is the midpoint of the new 1-5 scale (was 5,
  // the midpoint of the old 1-10 scale).
  const [sliders, setSliders] = useState({
    leadSuit: 3,
    brainFog: 3,
    cravings: 3,
    armorLevel: 3,
  });

  const [anchors, setAnchors] = useState({
    hitMeeting: false,
    calledSponsor: false,
    physicalMovement: false,
    nsdr: false,
  });

  const [override, setOverride] = useState("");

  const handleScaleChange = (name: string, value: number) => {
    setSliders((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof typeof anchors) => {
    setAnchors({ ...anchors, [key]: !anchors[key] });
  };

  // Stop any live mic stream / timer if the component unmounts mid-recording.
  useEffect(() => {
    return () => {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    setRecError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setRecError("Voice recording isn't supported in this browser. Try Chrome, or switch to typing your check-in.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickSupportedMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        void handleRecordingStopped(recorder.mimeType || mimeType || "audio/webm");
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecStatus("recording");
      setRecSeconds(0);

      recTimerRef.current = setInterval(() => {
        setRecSeconds((s) => {
          const next = s + 1;
          if (next >= MAX_RECORDING_SECONDS) {
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.error("Microphone access failed:", err);
      setRecError("Microphone access was blocked. Check your browser's site settings and allow microphone access, or switch to typing your check-in.");
    }
  };

  const stopRecording = () => {
    if (recTimerRef.current) {
      clearInterval(recTimerRef.current);
      recTimerRef.current = null;
    }
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const handleRecordingStopped = async (mimeType: string) => {
    setRecStatus("transcribing");
    try {
      const blob = new Blob(audioChunksRef.current, { type: mimeType });
      const base64Audio = await blobToBase64(blob);
      if (!user) throw new Error("You're signed out - refresh and sign back in.");
      const idToken = await user.getIdToken();

      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ audioBase64: base64Audio, mimeType }),
      });

      const rawText = await response.text();
      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(
          `Transcription is unavailable right now${response.ok ? "" : ` (error ${response.status})`}. Try recording again.`
        );
      }
      if (!response.ok) {
        throw new Error(data.error || "Transcription failed.");
      }

      setTranscript(data.transcript || "");
      setRecStatus("review");
    } catch (err: any) {
      console.error("Transcription failed:", err);
      setRecError(err.message || "Couldn't transcribe that recording. Try again.");
      setRecStatus("idle");
    }
  };

  const submitVoiceCheckIn = async () => {
    if (!user || !transcript.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const data = await postToMirror(idToken, transcript);
      setMirrorResult(data.data as MirrorResult);
      setSubmitted(true);
      setRecStatus("idle");
      setTranscript("");
    } catch (err: any) {
      console.error("Failed to submit voice check-in:", err);
      setError(err.message || "Something broke transmitting to the Grid. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);

    try {
      const idToken = await user.getIdToken();
      const narrative = composeNarrative(sliders, anchors, override);
      const data = await postToMirror(idToken, narrative, { sliders, anchors, override });
      setMirrorResult(data.data as MirrorResult);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit Telemetry Log:", err);
      setError(err.message || "Something broke transmitting to the Grid. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && mirrorResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-emerald-500/30 flex flex-col gap-6 shadow-[0_0_30px_rgba(16,185,129,0.1)] h-full min-h-[400px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest text-white">Check-In Complete.</h3>
            <p className="text-xs text-neutral-400 font-light">Your check-in has been saved.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} /> What's Really Going On
          </span>
          <p className="text-sm text-neutral-200 leading-relaxed">{mirrorResult.theWhy}</p>
        </div>

        {mirrorResult.gentleAlerts?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <AlertTriangle size={12} /> Things to Watch
            </span>
            <ul className="flex flex-col gap-1.5">
              {mirrorResult.gentleAlerts.map((alert, i) => (
                <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">-</span> {alert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {mirrorResult.reliefPlan?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <ListChecks size={12} /> What To Do Next
            </span>
            <ol className="flex flex-col gap-1.5">
              {mirrorResult.reliefPlan.map((step, i) => (
                <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        <button
          onClick={() => {
            setSubmitted(false);
            setMirrorResult(null);
            setRecStatus("idle");
            setTranscript("");
          }}
          className="mt-auto px-6 py-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors self-center"
        >
          Log Another Check-In
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-lg font-black uppercase text-white tracking-widest flex items-center gap-2">
          <Activity className="text-red-500" size={20} /> {t("telemetry")}
        </h3>
      </div>

      {/* Type vs. Record toggle */}
      <div className="flex gap-1.5 p-1 bg-neutral-900/60 rounded-xl border border-white/5 self-start">
        <button
          type="button"
          onClick={() => setInputMode("type")}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors ${
            inputMode === "type" ? "bg-red-500/20 text-red-400" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          Type It
        </button>
        <button
          type="button"
          onClick={() => setInputMode("record")}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
            inputMode === "record" ? "bg-red-500/20 text-red-400" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Mic size={12} /> Record It
        </button>
      </div>

      {inputMode === "type" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Section 1: Multiple-choice scales - redesigned 2026-07-04. Was
              a 1-10 slider (flat red, no explanation of what a given number
              actually meant). Now 5 tappable, color-coded options per
              question, each with its own short description. */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">How You're Feeling Today (1-5)</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScaleField
                label="Physical Fatigue"
                name="leadSuit"
                value={sliders.leadSuit}
                onChange={handleScaleChange}
                icon={<ActivitySquare size={14} />}
                levels={[
                  { value: 1, label: "Energized" },
                  { value: 2, label: "A little tired" },
                  { value: 3, label: "Drained" },
                  { value: 4, label: "Heavy" },
                  { value: 5, label: "Depleted" },
                ]}
              />
              <ScaleField
                label="Brain Fog"
                name="brainFog"
                value={sliders.brainFog}
                onChange={handleScaleChange}
                icon={<BrainCircuit size={14} />}
                levels={[
                  { value: 1, label: "Sharp" },
                  { value: 2, label: "Mostly focused" },
                  { value: 3, label: "Some trouble" },
                  { value: 4, label: "Hard to decide" },
                  { value: 5, label: "Can't think" },
                ]}
              />
              <ScaleField
                label={t("doomloop")}
                name="cravings"
                value={sliders.cravings}
                onChange={handleScaleChange}
                icon={<Activity size={14} />}
                levels={[
                  { value: 1, label: "No urge" },
                  { value: 2, label: "Barely there" },
                  { value: 3, label: "Manageable" },
                  { value: 4, label: "Hard to ignore" },
                  { value: 5, label: "Overwhelming" },
                ]}
              />
              <ScaleField
                label="Pain Level"
                name="armorLevel"
                value={sliders.armorLevel}
                onChange={handleScaleChange}
                icon={<Bone size={14} />}
                levels={[
                  { value: 1, label: "No pain" },
                  { value: 2, label: "Minor ache" },
                  { value: 3, label: "Noticeable" },
                  { value: 4, label: "Significant" },
                  { value: 5, label: "Severe" },
                ]}
              />
            </div>
          </div>

          {/* Section 2: Today's Actions - each row now has its own accent
              color (was flat red for all four) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">Today's Actions</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ToggleField label={`Hit a Meeting (${t("grid")})`} checked={anchors.hitMeeting} onClick={() => handleToggle("hitMeeting")} color={ACTION_COLORS[0]} />
              <ToggleField label={`Called ${t("vanguard")}`} checked={anchors.calledSponsor} onClick={() => handleToggle("calledSponsor")} color={ACTION_COLORS[1]} />
              <ToggleField label="Physical Movement" checked={anchors.physicalMovement} onClick={() => handleToggle("physicalMovement")} color={ACTION_COLORS[2]} />
              <ToggleField label="Did a Relaxation Exercise (NSDR)" checked={anchors.nsdr} onClick={() => handleToggle("nsdr")} color={ACTION_COLORS[3]} />
            </div>
          </div>

          {/* Section 3: What Helped Today - each chip now cycles through a
              color rotation (was flat red for every chip) */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">What Helped Today</h4>

            <div className="flex flex-wrap gap-2 mb-1">
              {["Called a Fellow", "Prayed / Meditated", "Hit a Meeting", "Read Literature", "Physical Exercise"].map((opt, idx) => {
                const c = CHIP_COLORS[idx % CHIP_COLORS.length];
                const selected = override === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOverride(opt)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                      selected
                        ? `${c.bg} ${c.border} ${c.text}`
                        : "bg-neutral-900 border-white/5 text-neutral-500 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <textarea
              value={override}
              onChange={(e) => setOverride(e.target.value)}
              placeholder="Write your own notes... (optional — a fast tap above still counts as a check-in)"
              className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 resize-none h-20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={14} className="shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50"
          >
            {submitting ? "Getting Your Reflection..." : "Submit Check-In"} <ChevronRight size={16} />
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          {recStatus === "idle" && (
            <div className="flex flex-col items-center gap-4 py-10 bg-neutral-900/40 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-colors"
              >
                <Mic size={28} className="text-white" />
              </button>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Tap to start recording</p>
              <p className="text-[10px] text-neutral-600 max-w-xs text-center leading-relaxed">
                Talk through how today actually went. Up to 3 minutes — you'll get to read and edit the transcript before anything is analyzed.
              </p>
            </div>
          )}

          {recStatus === "recording" && (
            <div className="flex flex-col items-center gap-4 py-10 bg-red-500/5 rounded-2xl border border-red-500/30">
              <button
                type="button"
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse"
              >
                <Square size={22} className="text-white" fill="white" />
              </button>
              <p className="text-sm font-black text-red-400 font-mono">{formatSeconds(recSeconds)}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Recording... tap to stop</p>
            </div>
          )}

          {recStatus === "transcribing" && (
            <div className="flex flex-col items-center gap-3 py-14">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse">Transcribing your check-in...</p>
            </div>
          )}

          {recStatus === "review" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">Review Your Transcript</h4>
                <button
                  type="button"
                  onClick={() => { setRecStatus("idle"); setTranscript(""); }}
                  className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  Record Again
                </button>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your transcript will appear here — fix anything misheard before submitting."
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 resize-none h-40"
              />
            </div>
          )}

          {recError && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={14} className="shrink-0" /> {recError}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={14} className="shrink-0" /> {error}
            </div>
          )}

          {recStatus === "review" && (
            <button
              type="button"
              onClick={submitVoiceCheckIn}
              disabled={submitting || !transcript.trim()}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50"
            >
              {submitting ? "Getting Your Reflection..." : "Submit Check-In"} <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-components

// Replaces the old SliderField (a single 1-10 <input type="range">) with 5
// discrete, color-coded, tappable options per question. Each level carries
// its own short label so a number is never shown without an explanation of
// what it actually means.
function ScaleField({ label, name, value, onChange, icon, levels }: {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  icon: React.ReactNode;
  levels: { value: number; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3 bg-neutral-900/40 p-4 rounded-2xl border border-white/5">
      <span className="text-xs font-bold text-white flex items-center gap-1.5">{icon} {label}</span>
      <div className="grid grid-cols-5 gap-1.5">
        {levels.map((level, idx) => {
          const c = SCALE_COLORS[idx] || SCALE_COLORS[SCALE_COLORS.length - 1];
          const selected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(name, level.value)}
              className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border transition-all ${
                selected ? `${c.bg} ${c.border} ${c.glow}` : "bg-neutral-950/50 border-white/5 hover:border-white/15"
              }`}
            >
              <span className={`text-base font-black ${selected ? c.text : "text-neutral-500"}`}>{level.value}</span>
              <span className={`text-[8px] font-bold uppercase leading-tight text-center ${selected ? c.text : "text-neutral-600"}`}>
                {level.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleField({ label, checked, onClick, color }: {
  label: string;
  checked: boolean;
  onClick: () => void;
  color: { text: string; bg: string; border: string; check: string; glow: string };
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
        checked
          ? `${color.bg} ${color.border} ${color.glow}`
          : "bg-neutral-900/50 border-white/5 hover:border-white/10 hover:bg-neutral-800"
      }`}
    >
      <span className={`text-xs font-bold transition-colors ${checked ? "text-white" : "text-neutral-400"}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
        checked ? `${color.check} text-white` : "bg-neutral-800 border border-white/10"
      }`}>
        {checked && <Check size={12} strokeWidth={4} />}
      </div>
    </button>
  );
}
