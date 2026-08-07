"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useVocab } from "@/contexts/VocabularyContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Activity, Shield, BookOpen, Plus, Target, Zap, Mic, Brain, Users,
  UserCircle2, LayoutGrid, ChevronRight, ChevronDown, Sparkles, AlertTriangle, Radar,
  GraduationCap, CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import JourneyTab from "@/components/JourneyTab";
import LedgerTab from "@/components/LedgerTab";
import BiometricsTab from "@/components/BiometricsTab";
import BuildStamp from "@/components/BuildStamp";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import { computeVanguardProfile, MASCOT_INFO, type VanguardProfileResult, type Mascot } from "@/lib/vanguardProfile";
import CrisisSupport from "@/components/CrisisSupport";
import DailyLedger from "@/components/DailyLedger";
import RewardsTab from "@/components/RewardsTab";

type TabId = "overview" | "ledger" | "rewards" | "mirror" | "network" | "data";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "ledger", label: "Ledger", icon: BookOpen },
  { id: "rewards", label: "Rewards", icon: Sparkles },
  { id: "mirror", label: "Mirror", icon: Brain },
  { id: "network", label: "Network", icon: Users },
  { id: "data", label: "Data", icon: Activity },
];

const TAB_STYLES: Record<TabId, { active: string; iconWrap: string; text: string }> = {
  overview: { active: "border-emerald-500 text-emerald-400 bg-emerald-500/5", iconWrap: "bg-emerald-500/10 text-emerald-400", text: "text-emerald-400" },
  ledger: { active: "border-emerald-500 text-emerald-400 bg-emerald-500/5", iconWrap: "bg-emerald-500/10 text-emerald-400", text: "text-emerald-400" },
  rewards: { active: "border-amber-500 text-amber-400 bg-amber-500/5", iconWrap: "bg-amber-500/10 text-amber-400", text: "text-amber-400" },
  mirror: { active: "border-blue-500 text-blue-400 bg-blue-500/5", iconWrap: "bg-blue-500/10 text-blue-400", text: "text-blue-400" },
  network: { active: "border-purple-500 text-purple-400 bg-purple-500/5", iconWrap: "bg-purple-500/10 text-purple-400", text: "text-purple-400" },
  data: { active: "border-cyan-500 text-cyan-400 bg-cyan-500/5", iconWrap: "bg-cyan-500/10 text-cyan-400", text: "text-cyan-400" },
};

export default function DashboardPage() {
  const { user, profile, loading, logout, refreshProfile } = useAuth();
  const { mode, toggleMode } = useVocab();
  const [checkingIn, setCheckingIn] = useState(false);
  const [justLogged, setJustLogged] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const router = useRouter();

  // Calculate Days Sober
  const daysSober = profile?.sobrietyDate
    ? Math.floor((new Date().getTime() - new Date(profile.sobrietyDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const vanguard: VanguardProfileResult | null = computeVanguardProfile(profile?.diagnosticData);

  const handleMeetingCheckIn = async () => {
    if (!user || checkingIn) return;
    setCheckingIn(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        meetingsCount: increment(1)
      });
      await refreshProfile();
      setJustLogged(true);
      setTimeout(() => setJustLogged(false), 2500);
    } catch (error) {
      console.error("Failed to check in", error);
    } finally {
      setCheckingIn(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (!profile) {
        router.push("/onboarding");
      }
    }
  }, [user, profile, loading, router]);

  if (loading || !user || (!profile && user)) {
    return <div className="min-h-screen bg-[#0d0f0d] flex items-center justify-center text-[#4cc07a] font-semibold text-sm">Loading your dashboard...</div>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-[#0d0f0d] text-[#b8b4a6] font-sans selection:bg-[#4cc07a]/30 selection:text-emerald-200">

      <header className="border-b border-[#1d231d] bg-[#0d0f0d]/90 backdrop-blur-md sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#4cc07a]/10 border border-[#4cc07a]/30 flex items-center justify-center shrink-0">
              <Activity className="text-[#4cc07a] w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[#f2efe6] truncate">My Dashboard</h1>
              <p className="text-[9px] sm:text-[10px] font-mono text-[#7d7a70] font-bold truncate">
                Data Over Denial
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <BuildStamp />
            {/* VOCABULARY TOGGLE */}
            <button
              onClick={toggleMode}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1d231d] bg-[#141814] hover:bg-[#141814] transition-colors text-[10px] font-semibold text-[#b8b4a6]"
              title="Toggle Vocabulary Mode"
            >
              {mode === "tactical" ? (
                <><Shield size={14} className="text-red-400" /> Tactical</>
              ) : (
                <><BookOpen size={14} className="text-[#4cc07a]" /> Standard</>
              )}
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#141814] border border-[#1d231d] hover:bg-[#141814] transition-colors"
              title="Operator Profile"
            >
              <span className="w-2 h-2 rounded-full bg-[#4cc07a]"></span>
              <span className="text-[10px] font-mono font-bold text-[#b8b4a6]">{user?.email}</span>
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="p-2.5 rounded-full bg-[#141814] border border-[#1d231d] hover:bg-[#141814] transition-colors text-[#b8b4a6] hover:text-[#f2efe6] sm:hidden"
              title="Operator Profile"
            >
              <UserCircle2 size={16} />
            </button>
            <button
              onClick={logout}
              className="p-2.5 rounded-full bg-[#141814] border border-[#1d231d] hover:bg-[#141814] transition-colors text-[#b8b4a6] hover:text-[#f2efe6]"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
            <Link
              href="/ai4aa/dashboard"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#7fb3a3]/40 bg-[#7fb3a3]/10 hover:bg-[#7fb3a3]/20 text-[#7fb3a3] text-xs font-semibold transition-colors"
              title="Open the AI4AA course"
            >
              <GraduationCap size={14} /> AI4AA Course
            </Link>
            <button
              onClick={handleMeetingCheckIn}
              disabled={checkingIn}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold transition-colors disabled:opacity-50 ${
 justLogged
 ? "border-[#4cc07a] bg-[#4cc07a] text-black"
 : "border-[#4cc07a]/50 bg-[#4cc07a]/10 hover:bg-[#4cc07a]/20 text-[#4cc07a]"
 }`}
            >
              {justLogged ? <><CheckCircle2 size={14} /> LOGGED +1</> : <><Plus size={14} /> {checkingIn ? "LOGGING..." : "LOG FELLOWSHIP"}</>}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6 sm:gap-8">

        {/* TAB NAV */}
        <div className="flex gap-1 sm:gap-2 border-b border-[#1d231d] overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const styles = TAB_STYLES[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
 isActive ? styles.active : "border-transparent text-[#7d7a70] hover:text-[#b8b4a6]"
 }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="flex flex-col gap-6 sm:gap-8"
          >
            {activeTab === "overview" && (
              <>
                {/* Welcome */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#f2efe6] tracking-tight">Welcome back.</h2>
                  <p className="text-sm text-[#b8b4a6] max-w-xl leading-relaxed">
                    Recovery here runs on three pillars: the human{" "}
                    <span className="text-purple-400 font-bold">Network</span> that holds you, the physical{" "}
                    <span className="text-red-400 font-bold">Engine</span> that carries you, and the{" "}
                    <span className="text-blue-400 font-bold">Mirror</span> that keeps you honest.
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <StatChip icon={Zap} label="Days Sober" value={daysSober} accent="bg-emerald-500/10 text-emerald-400" />
                  <StatChip icon={Target} label="Meetings Logged" value={profile?.meetingsCount || 0} accent="bg-purple-500/10 text-purple-400" />
                </div>

                {/* Today's check-in CTA — opens the Daily Ledger (the single check-in) */}
                <button
                  onClick={() => setActiveTab("ledger")}
                  className="w-full flex items-center justify-between gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 hover:bg-emerald-500/15 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <BookOpen className="text-emerald-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#f2efe6]">Log Today's Check-In</h4>
                      <p className="text-xs text-[#b8b4a6]">Open your Daily Ledger — Side A / Side B, scored for your trend.</p>
                    </div>
                  </div>
                  <ChevronRight className="text-emerald-400 shrink-0" size={18} />
                </button>

                {/* AI4AA course access — switch over to the course materials */}
                <Link
                  href="/ai4aa/dashboard"
                  className="w-full flex items-center justify-between gap-4 bg-gradient-to-r from-[#7fb3a3]/10 to-[#3b82f6]/5 border border-[#7fb3a3]/30 rounded-2xl p-5 hover:from-[#7fb3a3]/15 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7fb3a3]/10 border border-[#7fb3a3]/20 flex items-center justify-center shrink-0">
                      <GraduationCap className="text-[#7fb3a3]" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#f2efe6]">AI4AA Course</h4>
                      <p className="text-xs text-[#b8b4a6]">Your 6-week AI crash course — lessons, homework, and prep. Switch over anytime.</p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#7fb3a3] shrink-0 group-hover:translate-x-0.5 transition-transform" size={18} />
                </Link>

                {/* Vanguard vulnerability profile */}
                {vanguard && <VanguardCard vanguard={vanguard} />}

                {/* Crisis resources — always available (safety audit P0) */}
                <CrisisSupport />

                {/* Pillar cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <PillarCard
                    icon={Mic}
                    name="Engine"
                    subtitle="The Biological Vessel"
                    description="Sleep, nutrition, and pain management. You can't hold a steady recovery in a body that isn't being taken care of."
                    accent={TAB_STYLES.ledger}
                    onClick={() => setActiveTab("ledger")}
                  />
                  <PillarCard
                    icon={Brain}
                    name="Mirror"
                    subtitle="Daily Check-Ins & Reflection"
                    description="Your day, reflected back so you can catch problems before they turn into a relapse."
                    accent={TAB_STYLES.mirror}
                    onClick={() => setActiveTab("mirror")}
                  />
                  <PillarCard
                    icon={Users}
                    name="Network"
                    subtitle="AA Framework & Sponsorship"
                    description="You can't do this alone. Meetings, sponsorship, and fellowship — the people who hold you up."
                    accent={TAB_STYLES.network}
                    onClick={() => setActiveTab("network")}
                  />
                </div>
              </>
            )}

            {activeTab === "ledger" && (
              <PillarPanel
                icon={BookOpen}
                name="Daily Ledger"
                subtitle="Your paper journal, digitized"
                description="The same Side A / Side B check-in as the printed 90 R&R workbook — it scores your day (VSE) and feeds your trend chart."
                accent={TAB_STYLES.ledger}
              >
                <DailyLedger daysSober={daysSober} />
              </PillarPanel>
            )}

            {activeTab === "rewards" && (
              <PillarPanel
                icon={Sparkles}
                name="AAF Rewards"
                subtitle="Chips & points for showing up"
                description="Earn AAF points and sobriety chips for staying sober, meetings, and service — redeem for unlocks and real-world rewards."
                accent={TAB_STYLES.rewards}
              >
                <RewardsTab />
              </PillarPanel>
            )}

            {activeTab === "mirror" && (
              <PillarPanel
                icon={Brain}
                name="Mirror"
                subtitle="Daily Check-Ins & Reflection"
                description="AI reflects back what your check-ins show."
                accent={TAB_STYLES.mirror}
              >
                <LedgerTab />
              </PillarPanel>
            )}

            {activeTab === "network" && (
              <PillarPanel
                icon={Users}
                name="Network"
                subtitle="AA Framework & Sponsorship"
                description="Track your real-world progress and fellowship."
                accent={TAB_STYLES.network}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#141814] border border-[#1d231d] rounded-2xl p-6 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-purple-400">
                      <span>Days Sober</span>
                      <Zap size={14} />
                    </div>
                    <div className="text-5xl font-semibold text-[#f2efe6]">{daysSober}</div>
                  </div>

                  <div className="bg-[#141814] border border-[#1d231d] rounded-2xl p-6 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-blue-400">
                      <span>Fellowship Meetings</span>
                      <Target size={14} />
                    </div>
                    <div className="text-5xl font-semibold text-[#f2efe6]">{profile?.meetingsCount || 0}</div>
                    <p className="text-[10px] text-[#7d7a70] leading-relaxed">
                      Total AA meetings you've logged. Tap "Log Fellowship" in the top bar each time you attend one.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0d0f0d] rounded-2xl overflow-hidden border border-[#1d231d]">
                  <JourneyTab daysSober={daysSober} />
                </div>
              </PillarPanel>
            )}

            {activeTab === "data" && (
              <PillarPanel
                icon={Activity}
                name="Data"
                subtitle="Biometric Telemetry"
                description="Your body's data, visualized — Data Over Denial."
                accent={TAB_STYLES.data}
              >
                <BiometricsTab />
              </PillarPanel>
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatChip({ icon: Icon, label, value, accent }: { icon: any; label: string; value: React.ReactNode; accent: string }) {
  return (
    <div className="bg-[#141814] border border-[#1d231d] rounded-2xl p-4 sm:p-5 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] text-[#7d7a70] font-semibold">{label}</span>
        <span className="text-lg sm:text-xl font-semibold text-[#f2efe6] truncate">{value}</span>
      </div>
    </div>
  );
}

function PillarCard({ icon: Icon, name, subtitle, description, accent, onClick }: {
  icon: any; name: string; subtitle: string; description: string;
  accent: { active: string; iconWrap: string; text: string }; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-[#141814] border border-[#1d231d] hover:bg-white/[0.03] hover:border-[#2a322a] transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${accent.iconWrap}`}>
          <Icon size={16} />
        </div>
        <div>
          <h3 className={`text-sm font-semibold ${accent.text}`}>{name}</h3>
          <p className="text-[10px] text-[#7d7a70] font-bold tracking-wide">{subtitle}</p>
        </div>
      </div>
      <p className="text-xs text-[#b8b4a6] leading-relaxed flex-1">{description}</p>
      <span className={`text-[10px] font-semibold flex items-center gap-1 ${accent.text}`}>
        Open <ChevronRight size={12} />
      </span>
    </button>
  );
}

function PillarPanel({ icon: Icon, name, subtitle, description, accent, children }: {
  icon: any; name: string; subtitle: string; description: string;
  accent: { active: string; iconWrap: string; text: string }; children: React.ReactNode;
}) {
  return (
    <div className="bg-[#141814]/60 backdrop-blur-md border border-[#1d231d] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-10 shadow-xl flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#f2efe6]">
            {name} <span className="text-[#7d7a70] font-medium">— {subtitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#b8b4a6]">{description}</p>
        </div>
      </div>
      <div className="bg-[#0d0f0d] rounded-2xl overflow-hidden border border-[#1d231d]">
        {children}
      </div>
    </div>
  );
}

// Literal Tailwind classes per mascot (not template-generated — see the
// TAB_STYLES comment near the top of this file for why: dynamically built
// class names don't survive Tailwind's static scanning).
const MASCOT_STYLES: Record<Mascot, { border: string; text: string; bg: string; glow: string; chip: string }> = {
  eagle: { border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/10", glow: "shadow-[0_0_30px_-10px_rgba(245,158,11,0.4)]", chip: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  elephant: { border: "border-sky-500/30", text: "text-sky-400", bg: "bg-sky-500/10", glow: "shadow-[0_0_30px_-10px_rgba(56,189,248,0.4)]", chip: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
  turtle: { border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10", glow: "shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)]", chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  chameleon: { border: "border-violet-500/30", text: "text-violet-400", bg: "bg-violet-500/10", glow: "shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)]", chip: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  tiger: { border: "border-orange-500/30", text: "text-orange-400", bg: "bg-orange-500/10", glow: "shadow-[0_0_30px_-10px_rgba(249,115,22,0.4)]", chip: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
};

// Redesigned 2026-07-04 (Michael, via annotated screenshot: "I want a Read
// More about my Profile. show strengths, weaknesses, and other triggers...
// give a percentage... still need it to stand out more and less reading
// unless they want more by 'read more' link"). Collapsed state is now
// mascot-colored (was flat amber for every profile) and shows only the
// headline + one-line vulnerability + a population estimate chip. Strengths,
// common triggers, and warning signs are behind the Read More toggle so the
// default card is a glance, not a paragraph.
function VanguardCard({ vanguard }: { vanguard: VanguardProfileResult }) {
  const info = MASCOT_INFO[vanguard.dominant];
  const style = MASCOT_STYLES[vanguard.dominant];
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-[#141814] border ${style.border} ${style.glow} rounded-2xl p-5 sm:p-6 flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex gap-4 items-center">
          <div className={`text-4xl sm:text-5xl shrink-0 w-16 h-16 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-center`}>
            {info.emoji}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className={`text-[10px] font-semibold ${style.text}`}>Your Vulnerability Profile</span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f2efe6] leading-tight">
              {info.label} <span className="text-[#7d7a70] font-medium text-sm sm:text-base">— {info.archetype}</span>
            </h3>
          </div>
        </div>
        {/* TODO: show real computed share (~{info.estimatedShare}% was an illustrative placeholder) once 50+ real users exist */}
        <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${style.chip}`}>
          Early beta — your data shapes this archetype
        </span>
      </div>

      <p className="text-sm text-[#b8b4a6] leading-relaxed">{info.vulnerability}</p>

      <button
        onClick={() => setExpanded((v) => !v)}
        className={`flex items-center gap-1.5 text-xs font-semibold ${style.text} self-start`}
      >
        {expanded ? "Show Less" : "Read More"}
        <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#b8b4a6]">
                <Sparkles size={12} className={style.text} /> Strengths
              </span>
              <ul className="flex flex-col gap-1.5">
                {info.strengths.map((s) => (
                  <li key={s} className="text-xs text-[#b8b4a6] leading-relaxed flex gap-2">
                    <span className={`${style.text} shrink-0`}>•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#b8b4a6]">
                <Radar size={12} className={style.text} /> Common Triggers
              </span>
              <p className="text-xs text-[#b8b4a6] leading-relaxed">{info.commonTriggers}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#b8b4a6]">
                <AlertTriangle size={12} className={style.text} /> Warning Signs to Watch
              </span>
              <p className="text-xs text-[#b8b4a6] leading-relaxed">{info.warningSigns}</p>
            </div>

            <p className="text-[10px] text-[#7d7a70] font-mono leading-relaxed pt-1 border-t border-[#1d231d]">
              Estimate based on how the diagnostic is designed, not measured from real user data yet — the beta is still small. This will switch to a live number as more people complete the diagnostic.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
