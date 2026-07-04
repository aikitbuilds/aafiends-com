"use client";

import { useAuth, UserProfile } from "@/contexts/AuthContext";
import { useVocab } from "@/contexts/VocabularyContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowLeft,
  LogOut,
  UserCircle2,
  Save,
  CheckCircle2,
  ClipboardList,
  Zap,
  Target,
  Compass,
  RotateCcw,
} from "lucide-react";
import { computeVanguardProfile, MASCOT_INFO } from "@/lib/vanguardProfile";
import BuildStamp from "@/components/BuildStamp";

// Read-only labels for the 12 onboarding diagnostic questions, kept in sync
// with the QUESTIONS array in src/app/onboarding/page.tsx. Duplicated here
// (rather than importing icons/state from that page) so this page has no
// dependency on onboarding's wizard/redirect logic — it only needs to
// display what was already answered. Updated 2026-07-03 for the v2
// question set (see ecosystem-docs/onboarding-questions-proposal.md).
const DIAGNOSTIC_LABELS: Record<string, { title: string; options: Record<string, string> }> = {
  q1_recoveryHorizon: {
    title: "Your Recovery Horizon",
    options: {
      in_the_trench_0_90_days: "In the Trench (0-90 Days)",
      stabilizing_3_12_months: "Stabilizing (3-12 Months)",
      solid_baseline_1_5_years: "Solid Baseline (1-5 Years)",
      vanguard_5_plus_years: "Vanguard (5+ Years)",
    },
  },
  q2_fellowshipNetwork: {
    title: "The Fellowship Network",
    options: {
      brand_new: "Brand New",
      attending_but_isolated: "Attending, but Isolated",
      working_steps_homegroup: "Working Steps, Homegroup",
      sponsoring_others: "Sponsoring Others",
    },
  },
  q3_doomLoopTrigger: {
    title: "Your Primary 'Doom-Loop' Trigger",
    options: {
      isolation_boredom: "Isolation & Boredom",
      overworking_ego: "Overworking & Ego",
      anger_resentments: "Anger & Resentments",
      physical_exhaustion: "Physical Exhaustion",
    },
  },
  q4_sleepQuality: {
    title: "How's Your Sleep Right Now?",
    options: {
      wrecked_broken: "Wrecked / Broken",
      getting_there_rough: "Getting There, Rough",
      mostly_steady: "Mostly Steady",
      solid_consistent: "Solid & Consistent",
    },
  },
  q5_physicalPain: {
    title: "Any Physical Pain or Old Injuries?",
    options: {
      chronic_pain_old_injury: "Chronic Pain / Old Injury",
      new_tension_soreness: "New Tension or Soreness",
      mostly_fine: "Mostly Fine",
      no_issues_right_now: "No Issues Right Now",
    },
  },
  q6_doseRewardSource: {
    title: "What Gives You a Lift, Sober?",
    options: {
      movement_exercise: "Movement / Exercise",
      food_cooking: "Food & Cooking",
      connecting_with_people: "Connecting With People",
      nothing_yet: "Honestly, Nothing Yet",
    },
  },
  q7_screenBoundaries: {
    title: "Screen & Tech Boundaries",
    options: {
      constant_doom_scrolling: "Constant Doom-Scrolling",
      lose_track_of_time: "Lose Track of Time",
      strict_nightly_limits: "Strict Nightly Limits",
      strictly_work_tool: "Strictly a Work Tool",
    },
  },
  q8_techComfort: {
    title: "How Do You Feel About Using Apps?",
    options: {
      tech_frustrates_me: "Tech Frustrates Me",
      comfortable_simple: "Comfortable, Keep It Simple",
      confident_often: "Confident, Use It Often",
      power_user: "Power User, Bring It On",
    },
  },
  q9_professionalSupport: {
    title: "Any Professional Support in Place?",
    options: {
      just_aa_fellowship: "Just AA / Fellowship",
      therapist_counselor: "Therapist or Counselor",
      doctor_medication: "Doctor or Medication Support",
      full_care_team: "A Full Care Team",
    },
  },
  q10_thoughtProcessing: {
    title: "How Do You Process Your Thoughts?",
    options: {
      talk_out_loud: "Talk It Out Loud",
      write_by_hand: "Write It By Hand",
      type_notes: "Type Notes",
      keep_in_head: "Keep It In My Head",
    },
  },
  q11_sharingComfort: {
    title: "How Open Are You to Sharing?",
    options: {
      anonymous_listener: "Anonymous Listener",
      hesitant_but_willing: "Hesitant, But Willing",
      comfortable_sharing_data: "Comfortable Sharing",
      fully_ready_to_build: "Fully Ready to Build",
    },
  },
  q12_appGoal: {
    title: "What Do You Want From This App?",
    options: {
      ai_sponsor_journal: "AI Sponsor / Journal",
      biological_dashboard: "A Body & Health Dashboard",
      app_for_homegroup: "Something for My Homegroup",
      just_want_to_learn: "Just Want to Learn",
    },
  },
};

// Preserves the same 12-question order used during onboarding.
const DIAGNOSTIC_ORDER = Object.keys(DIAGNOSTIC_LABELS);

export default function ProfilePage() {
  const { user, profile, loading, logout, refreshProfile } = useAuth();
  const { t } = useVocab();
  const router = useRouter();

  const [sobrietyDate, setSobrietyDate] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Auth/profile guard — same pattern as dashboard/page.tsx.
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (!profile) {
        router.push("/onboarding");
      }
    }
  }, [user, profile, loading, router]);

  // Populate the form once the real profile loads.
  useEffect(() => {
    if (profile) {
      setSobrietyDate(profile.sobrietyDate || "");
      setSponsorName(profile.sponsorName && profile.sponsorName !== "None" ? profile.sponsorName : "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user || saving) return;
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const updates: Partial<UserProfile> = {
        sobrietyDate: sobrietyDate || profile?.sobrietyDate || "",
        sponsorName: sponsorName || "None",
      };
      await setDoc(doc(db, "users", user.uid), updates, { merge: true });
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error("Failed to save profile", e);
      setError("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user || (!profile && user)) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center text-teal-500 uppercase tracking-widest font-black text-sm animate-pulse">
        Initializing Sanctuary...
      </div>
    );
  }

  const daysSober = profile?.sobrietyDate
    ? Math.floor((new Date().getTime() - new Date(profile.sobrietyDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const answeredQuestions = DIAGNOSTIC_ORDER.filter((qid) => profile?.diagnosticData?.[qid]);
  const vanguardProfile = computeVanguardProfile(profile?.diagnosticData);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-300 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-md sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors text-xs font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Protocol
          </button>
          <div className="flex items-center gap-3">
            <BuildStamp />
            <button
              onClick={logout}
              className="p-2.5 rounded-full bg-stone-800 border border-stone-700 hover:bg-stone-700 transition-colors text-stone-400 hover:text-stone-200"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">
        {/* PAGE HEADER */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <UserCircle2 className="text-teal-400 w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-100 tracking-tight">Operator Profile</h1>
          <p className="text-sm text-stone-400">{user?.email}</p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-stone-800/40 border border-stone-700/50 rounded-2xl p-5 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-black text-teal-400 uppercase tracking-widest">
              <span>Days Sober</span>
              <Zap size={14} />
            </div>
            <div className="text-4xl font-black text-stone-100">{daysSober}</div>
          </div>
          <div className="bg-stone-800/40 border border-stone-700/50 rounded-2xl p-5 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-black text-blue-400 uppercase tracking-widest">
              <span>Fellowship Meetings</span>
              <Target size={14} />
            </div>
            <div className="text-4xl font-black text-stone-100">{profile?.meetingsCount || 0}</div>
          </div>
        </div>

        {/* EDITABLE IDENTITY */}
        <section className="bg-stone-800/40 backdrop-blur-md border border-stone-700/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl flex flex-col gap-6">
          <h2 className="text-lg font-bold text-stone-100">Baseline Details</h2>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-stone-500 uppercase tracking-widest">Sobriety Date</label>
            <input
              type="date"
              value={sobrietyDate}
              onChange={(e) => setSobrietyDate(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-teal-500/50 [color-scheme:dark]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-stone-500 uppercase tracking-widest">
              {t("vanguard")} Name / Emergency Contact
            </label>
            <input
              type="text"
              value={sponsorName}
              onChange={(e) => setSponsorName(e.target.value)}
              placeholder="Who are you accountable to?"
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-stone-900 font-black uppercase tracking-widest text-xs rounded-xl transition-colors disabled:opacity-50"
            >
              {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
            </button>
            {error && <span className="text-xs text-rose-400 font-mono">{error}</span>}
          </div>
        </section>

        {/* VULNERABILITY PROFILE (Vanguard Scoring Engine, first slice) */}
        {vanguardProfile && (
          <section className="bg-stone-800/40 backdrop-blur-md border border-stone-700/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <Compass className="text-rose-400 w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-100">Vulnerability Profile</h2>
                <p className="text-xs text-stone-400">Scored from your diagnostic — where the AIV is most likely to find an open port.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-stone-900 border border-stone-700 rounded-xl p-5">
              <div className="text-5xl leading-none">{MASCOT_INFO[vanguardProfile.dominant].emoji}</div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-black text-stone-100">
                  {MASCOT_INFO[vanguardProfile.dominant].label} <span className="text-stone-500 font-bold">— {MASCOT_INFO[vanguardProfile.dominant].archetype}</span>
                </span>
                <span className="text-sm text-stone-400">{MASCOT_INFO[vanguardProfile.dominant].vulnerability}</span>
                <span className="text-xs font-mono text-teal-400 mt-1">{MASCOT_INFO[vanguardProfile.dominant].dashboardSolution}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Full Breakdown ({vanguardProfile.answeredCount} of 12 answered)</span>
              <div className="grid grid-cols-5 gap-2">
                {(Object.keys(MASCOT_INFO) as (keyof typeof MASCOT_INFO)[]).map((key) => (
                  <div
                    key={key}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${
                      key === vanguardProfile.dominant ? "border-teal-500/50 bg-teal-500/10" : "border-stone-700 bg-stone-900"
                    }`}
                  >
                    <span className="text-xl">{MASCOT_INFO[key].emoji}</span>
                    <span className="text-lg font-black text-stone-100">{vanguardProfile.counts[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DIAGNOSTIC ANSWERS */}
        <section className="bg-stone-800/40 backdrop-blur-md border border-stone-700/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <ClipboardList className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-100">Your Diagnostic</h2>
                <p className="text-xs text-stone-400">Answers from your baseline calibration.</p>
              </div>
            </div>
            {/* Retake entry point - reuses the onboarding wizard in edit
                mode (src/app/onboarding/page.tsx) instead of building a
                separate editing UI, per Michael's request to let people
                change their answers from the profile page. */}
            <button
              onClick={() => router.push("/onboarding?edit=true")}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 border border-stone-700 hover:border-teal-500/50 hover:text-teal-400 text-stone-300 font-black uppercase tracking-widest text-xs rounded-xl transition-colors"
            >
              <RotateCcw size={14} /> Update My Answers
            </button>
          </div>

          {answeredQuestions.length === 0 ? (
            <p className="text-sm text-stone-500 font-mono">No diagnostic answers on file yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {answeredQuestions.map((qid) => {
                const question = DIAGNOSTIC_LABELS[qid];
                const answerId = profile?.diagnosticData?.[qid] ?? "";
                const answerLabel = question.options[answerId] || answerId;
                return (
                  <div key={qid} className="bg-stone-900 border border-stone-700 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{question.title}</span>
                    <span className="text-sm text-stone-200 font-bold">{answerLabel}</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[10px] font-mono text-stone-600 uppercase tracking-widest pb-8"
        >
          Data Over Denial // Sanctuary
        </motion.p>
      </main>
    </div>
  );
}
