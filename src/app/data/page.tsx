"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Moon,
  Droplets,
  Dumbbell,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  BrainCircuit,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PhotoRow,
  StackList,
  CalloutBand,
} from "@/components/design";

// Simulated 7-day Garmin telemetry dataset
const garminData = [
  { day: "Day -6", sleep: 5.2, hr: 62, stress: 45 },
  { day: "Day -5", sleep: 6.1, hr: 60, stress: 38 },
  { day: "Day -4", sleep: 5.8, hr: 61, stress: 42 },
  { day: "Day -3", sleep: 7.4, hr: 58, stress: 28 },
  { day: "Day -2", sleep: 7.8, hr: 57, stress: 24 },
  { day: "Day -1", sleep: 7.5, hr: 58, stress: 25 },
  { day: "Today",  sleep: 7.2, hr: 58, stress: 22 },
];

// Chart palette — DESIGN.md tokens only.
const SERIES = {
  sleep: "#4cc07a",
  hr: "#7fb3a3",
  stress: "#e0a45c",
};

const HR_WEEK = [62, 60, 59, 61, 58, 57, 58];

export default function DataPage() {
  const [sleep, setSleep] = useState<number>(7);
  const [hydration, setHydration] = useState<boolean>(false);
  const [movement, setMovement] = useState<string>("Walk");
  const [statusLogged, setStatusLogged] = useState<boolean>(false);

  const handleLogTelemetry = async () => {
    try {
      await addDoc(collection(db, "telemetry"), {
        sleep,
        hydration,
        movement,
        timestamp: serverTimestamp(),
      });
      setStatusLogged(true);
      setTimeout(() => setStatusLogged(false), 3000); // Reset after 3s
    } catch (error) {
      console.error("Error logging telemetry:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <main className="flex-grow">
        {/* ── The read ─────────────────────────────────────── */}
        <Section tight>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  The A.I.V. &mdash; the Addiction Intelligence Virus &mdash; thrives in the fog of
                  exhaustion. Raw telemetry clears the fog. Your dashboard is where the healing
                  stops being a feeling and starts being a number.
                </p>
              }
            >
              Data over <em>denial.</em>
            </SectionHead>

            <PhotoRow photo={PHOTOS.kitchenJournal}>
              <SubHead>The reality check log</SubHead>
              <div className="font-display-italic mt-5 max-w-[52ch] space-y-4 text-[1.05rem] leading-[1.8] text-[#b8b4a6]">
                <p>
                  I thought my memory was sharp, my willpower was grand,<br />
                  But A.I.V. just took my brain and buried it in sand.<br />
                  &lsquo;You&rsquo;re doing great!&rsquo; the virus lied, &lsquo;You don&rsquo;t
                  need any rest!&rsquo;<br />
                  Then suddenly my heart was pounding hard inside my chest.
                </p>
                <p>
                  So now I drop the old excuse, I look at what is real,<br />
                  I track my water and my sleep to monitor the heal.<br />
                  It&rsquo;s Data Over Denial now&mdash;a flashlight in the deep,<br />
                  To catch the little gremlins where they slowly start to creep.
                </p>
              </div>
            </PhotoRow>
          </Wrap>
        </Section>

        {/* ── The protocol ─────────────────────────────────── */}
        <Section band>
          <Wrap>
            <SectionHead
              lede={<p>Why you track, where it lives, when you open it, and what goes in.</p>}
            >
              The operational <em>protocol.</em>
            </SectionHead>
            <StackList
              items={[
                {
                  n: "01",
                  title: "Why it’s needed",
                  body: "Addiction thrives in blind spots. The AIV uses your exhaustion as a craving. Tracking basics removes the blind spots so you know exactly when your firewall is down.",
                },
                {
                  n: "02",
                  title: "Where it lives",
                  body: "Your Daily Dashboard. This is your central Step 10 terminal for tracking all recovery telemetry and analyzing system stability.",
                  maps: "step 10",
                },
                {
                  n: "03",
                  title: "When to use it",
                  body: "Twice a day. Once in the morning to calibrate the baseline, once in the evening (Step 10) to clear the system cache and reset for tomorrow.",
                  maps: "2× daily",
                },
                {
                  n: "04",
                  title: "How it works",
                  body: "Log the Big Three inputs: Fuel (water/food), Recharge (sleep), and Friction (exercise/movement). Undeniable facts, not opinions.",
                  maps: "fuel · recharge · friction",
                },
              ]}
            />
          </Wrap>
        </Section>

        {/* ── Garmin sync ──────────────────────────────────── */}
        <Section>
          <Wrap>
            <SectionHead lede={<p>Sample telemetry &mdash; illustrative figures.</p>}>
              Garmin biometric <em>sync.</em>
            </SectionHead>

            <CalloutBand className="mt-8 max-w-[70ch]">
              <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[#b8b4a6]">
                <AlertTriangle size={16} className="mt-1 shrink-0 text-[#e0a45c]" aria-hidden="true" />
                <span>
                  The figures below are{" "}
                  <b className="font-semibold text-[#f2efe6]">sample values shown for illustration</b>
                  . Live Garmin data appears here once your device is connected &mdash; nothing on
                  this panel is a real-time reading yet.
                </span>
              </p>
            </CalloutBand>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <figure className="overflow-hidden rounded-[14px] border border-[#1d231d]">
                <div className="relative aspect-[4/3] bg-[#0d0f0d]">
                  <Image
                    src="/garmin1.jpg"
                    alt="A Garmin Connect dashboard screenshot showing the day’s activity, heart rate and body battery summary"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="font-measure border-t border-[#1d231d] bg-[#141814] px-5 py-3 text-[12.5px] text-[#7d7a70]">
                  Source: Garmin Connect · screenshot
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-[14px] border border-[#1d231d]">
                <div className="relative aspect-[4/3] bg-[#0d0f0d]">
                  <Image
                    src="/garminsleep.webp"
                    alt="A Garmin sleep screen screenshot showing a night broken into deep, light and REM stages"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="font-measure border-t border-[#1d231d] bg-[#141814] px-5 py-3 text-[12.5px] text-[#7d7a70]">
                  Source: Garmin Sleep · screenshot
                </figcaption>
              </figure>
            </div>

            {/* Three sample readings, as a ledger rather than a card grid */}
            <div className="mt-12 border-t border-[#1d231d]">
              <div className="grid gap-x-10 gap-y-4 border-b border-[#1d231d] px-1 py-7 sm:grid-cols-[13rem_1fr]">
                <div>
                  <p className="flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                    <Moon size={16} className="text-[#4cc07a]" aria-hidden="true" /> Sleep
                  </p>
                  <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">
                    Last night · sample
                  </p>
                </div>
                <div>
                  <p className="font-measure text-[1.75rem] leading-none text-[#4cc07a]">
                    7h 12m{" "}
                    <span className="text-[0.85rem] text-[#b8b4a6]">score 84 / 100</span>
                  </p>
                  <div className="mt-4 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-[#1d231d]">
                    <div className="h-full bg-[#4cc07a]" style={{ width: "84%" }} />
                  </div>
                  <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-[#b8b4a6]">
                    Denial says you&rsquo;re fine. The watch says you&rsquo;re operating on a severe
                    deficit. Sleep is the primary firewall against the A.I.V.
                  </p>
                </div>
              </div>

              <div className="grid gap-x-10 gap-y-4 border-b border-[#1d231d] px-1 py-7 sm:grid-cols-[13rem_1fr]">
                <div>
                  <p className="flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                    <HeartPulse size={16} className="text-[#7fb3a3]" aria-hidden="true" /> Resting
                    heart rate
                  </p>
                  <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">
                    7-day average · sample
                  </p>
                </div>
                <div>
                  <p className="font-measure text-[1.75rem] leading-none text-[#7fb3a3]">
                    58 <span className="text-[0.85rem] text-[#b8b4a6]">bpm</span>
                  </p>
                  <div className="mt-4 flex h-8 max-w-md items-end gap-1.5">
                    {HR_WEEK.map((bpm, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#7fb3a3]/35"
                        style={{ height: `${(bpm / 70) * 100}%` }}
                        title={`${bpm} bpm`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-[#b8b4a6]">
                    Elevated resting heart rate is an early warning system. It detects the physical
                    stress of craving before the conscious mind does.
                  </p>
                </div>
              </div>

              <div className="grid gap-x-10 gap-y-4 border-b border-[#1d231d] px-1 py-7 sm:grid-cols-[13rem_1fr]">
                <div>
                  <p className="flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                    <BrainCircuit size={16} className="text-[#e0a45c]" aria-hidden="true" /> Stress
                  </p>
                  <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">Current · sample</p>
                </div>
                <div>
                  <p className="font-measure text-[1.75rem] leading-none text-[#e0a45c]">
                    22 <span className="text-[0.85rem] text-[#b8b4a6]">/ 100</span>
                  </p>
                  <div className="mt-4 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-[#1d231d]">
                    <div className="h-full bg-[#e0a45c]" style={{ width: "22%" }} />
                  </div>
                  <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-[#b8b4a6]">
                    High stress depletes willpower. By syncing HRV, you monitor the exact moment
                    your mental defenses are compromised.
                  </p>
                </div>
              </div>
            </div>
          </Wrap>
        </Section>

        {/* ── The daily inventory ──────────────────────────── */}
        <Section band>
          <Wrap>
            <SectionHead
              lede={<p>Input daily telemetry to calibrate your D.O.S.E. baseline. Ten seconds.</p>}
            >
              The daily <em>inventory.</em>
            </SectionHead>

            <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              {/* Daily input widget */}
              <div className="rounded-[14px] border border-[#1d231d] bg-[#0d0f0d] p-7">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="sleep-hours" className="flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                      <Moon size={17} className="text-[#4cc07a]" aria-hidden="true" /> Recharge
                      (sleep)
                    </label>
                    <span className="font-measure text-[1.05rem] text-[#4cc07a]">{sleep} hrs</span>
                  </div>
                  <input
                    id="sleep-hours"
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={sleep}
                    onChange={(e) => setSleep(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#1d231d] accent-[#4cc07a]"
                  />
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                      <Droplets size={17} className="text-[#4cc07a]" aria-hidden="true" /> Fuel
                      (hydration)
                    </span>
                    <button
                      onClick={() => setHydration(!hydration)}
                      role="switch"
                      aria-checked={hydration}
                      aria-label="Hydration logged today"
                      className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors duration-200 ${
                        hydration ? "bg-[#4cc07a]" : "bg-[#1d231d]"
                      }`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full bg-[#f2efe6] transition-transform duration-200 ${
                          hydration ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="font-measure mt-2 text-[12.5px] text-[#7d7a70]">
                    Target: 8+ cups logged today.
                  </p>
                </div>

                <div className="mt-8">
                  <span className="mb-4 flex items-center gap-2 text-[15.5px] text-[#f2efe6]">
                    <Dumbbell size={17} className="text-[#4cc07a]" aria-hidden="true" /> Friction
                    (movement)
                  </span>
                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {["Walk", "Lift", "Cold Plunge"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setMovement(type)}
                        aria-pressed={movement === type}
                        className={`rounded-[10px] border px-3 py-3 text-[13.5px] font-semibold transition-colors duration-200 active:scale-[0.98] ${
                          movement === type
                            ? "border-[#4cc07a] bg-[#4cc07a]/10 text-[#4cc07a]"
                            : "border-[#1d231d] bg-[#141814] text-[#b8b4a6] hover:border-[#2a322a]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#1d231d] pt-6">
                  <button
                    onClick={handleLogTelemetry}
                    className="w-full rounded-[10px] bg-[#4cc07a] px-6 py-4 text-base font-semibold text-[#08130c] transition-[background-color,transform] duration-200 hover:bg-[#5fd08c] active:scale-[0.98]"
                  >
                    Sync telemetry to the Grid
                  </button>

                  <div className="mt-4 flex h-8 items-center justify-center">
                    {statusLogged ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-measure flex items-center gap-2 text-[13px] text-[#4cc07a]"
                      >
                        <CheckCircle2 size={15} aria-hidden="true" /> Firewall holding. Baseline
                        updated.
                      </motion.div>
                    ) : (
                      <p className="font-measure flex items-center gap-2 text-[13px] text-[#7d7a70]">
                        <AlertTriangle size={14} aria-hidden="true" /> Pending synchronization
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Telemetry chart */}
              <div className="rounded-[14px] border border-[#1d231d] bg-[#141814] p-6 sm:p-7">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[1.25rem] leading-tight text-[#f2efe6]">
                      Garmin telemetry overlay
                    </h3>
                    <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">
                      7-day biometric trending — sleep, HR, stress
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-measure text-[1.05rem] text-[#e0a45c]">Sample data</p>
                    <p className="font-measure text-[12px] text-[#7d7a70]">Illustrative</p>
                  </div>
                </div>

                <div className="font-measure mt-6 h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={garminData} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke="#1d231d" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="#2a322a"
                        tick={{ fill: "#7d7a70", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke="#2a322a"
                        tick={{ fill: "#7d7a70", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#2a322a"
                        tick={{ fill: "#7d7a70", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 12]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#141814",
                          border: "1px solid #1d231d",
                          borderRadius: "10px",
                          color: "#f2efe6",
                        }}
                        itemStyle={{ fontSize: "13px" }}
                        labelStyle={{ color: "#7d7a70", marginBottom: "4px", fontSize: "12px" }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="stress"
                        stroke={SERIES.stress}
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#141814", stroke: SERIES.stress, strokeWidth: 2 }}
                        name="Stress level"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="hr"
                        stroke={SERIES.hr}
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#141814", stroke: SERIES.hr, strokeWidth: 2 }}
                        name="Resting HR (bpm)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="sleep"
                        stroke={SERIES.sleep}
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#141814", stroke: SERIES.sleep, strokeWidth: 2 }}
                        name="Sleep (hrs)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="font-measure mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#1d231d] pt-4 text-[12.5px] text-[#b8b4a6]">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-px w-5" style={{ backgroundColor: SERIES.sleep }} /> Sleep
                    (hrs)
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-px w-5" style={{ backgroundColor: SERIES.hr }} /> Resting HR
                    (bpm)
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-px w-5" style={{ backgroundColor: SERIES.stress }} /> Stress
                    level
                  </span>
                </div>
              </div>
            </div>
          </Wrap>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
