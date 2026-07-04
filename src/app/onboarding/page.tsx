"use client";

import { useState, useEffect } from "react";
import { useAuth, UserProfile } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Anchor, Compass, Navigation, Sprout, User, Users, Map,
  Ghost, Briefcase, Flame, BatteryWarning, ZapOff, BatteryLow, BedDouble,
  MoonStar, Bone, Activity, Smile, CheckCircle2, Footprints, Utensils,
  Heart, HelpCircle, RefreshCcw, Clock, Moon, Wrench, AlertTriangle,
  Smartphone, Monitor, Server, MessageSquare, Pill, ShieldCheck, Mic,
  PenTool, Keyboard, Brain, Handshake, BarChart3, Megaphone, Bot, Home,
  BookOpen,
} from "lucide-react";

// ---------------------------------------------------------------------------
// v2 onboarding questions (2026-07-03). Replaced the original 12 after
// Michael flagged redundancy: three separate questions (Technical
// Scaffolding, AI Experience Level, Biggest Tech Fear) were all measuring
// the same "how comfortable are you with tech" axis, and two more (Physical
// Sanctuary, the 60-Minute Rule) weren't feeding into anything the app
// personalizes. That freed five slots, used here for things the research
// says actually matter but nothing asked about before: sleep quality,
// physical pain (feeds the Engine pillar's pain-management content),
// what gives someone a natural mood lift sober (DOSE-framework
// personalization), and whether they have professional support in place.
// Full rationale: ecosystem-docs/onboarding-questions-proposal.md.
//
// See src/lib/vanguardProfile.ts for how each option maps to a Vanguard
// mascot - that map was rebuilt in lockstep with this question set.
// ---------------------------------------------------------------------------
const QUESTIONS = [
  {
    id: "q1_recoveryHorizon",
    title: "Your Recovery Horizon",
    options: [
      { id: "in_the_trench_0_90_days", icon: Shield, text: "In the Trench (0-90 Days)" },
      { id: "stabilizing_3_12_months", icon: Anchor, text: "Stabilizing (3-12 Months)" },
      { id: "solid_baseline_1_5_years", icon: Compass, text: "Solid Baseline (1-5 Years)" },
      { id: "vanguard_5_plus_years", icon: Navigation, text: "Vanguard (5+ Years)" }
    ]
  },
  {
    id: "q2_fellowshipNetwork",
    title: "The Fellowship Network",
    options: [
      { id: "brand_new", icon: Sprout, text: "Brand New" },
      { id: "attending_but_isolated", icon: User, text: "Attending, but Isolated" },
      { id: "working_steps_homegroup", icon: Users, text: "Working Steps, Homegroup" },
      { id: "sponsoring_others", icon: Map, text: "Sponsoring Others" }
    ]
  },
  {
    id: "q3_doomLoopTrigger",
    title: "Your Primary 'Doom-Loop' Trigger",
    options: [
      { id: "isolation_boredom", icon: Ghost, text: "Isolation & Boredom" },
      { id: "overworking_ego", icon: Briefcase, text: "Overworking & Ego" },
      { id: "anger_resentments", icon: Flame, text: "Anger & Resentments" },
      { id: "physical_exhaustion", icon: BatteryWarning, text: "Physical Exhaustion" }
    ]
  },
  {
    id: "q4_sleepQuality",
    title: "How's Your Sleep Right Now?",
    options: [
      { id: "wrecked_broken", icon: ZapOff, text: "Wrecked / Broken" },
      { id: "getting_there_rough", icon: BatteryLow, text: "Getting There, Rough" },
      { id: "mostly_steady", icon: BedDouble, text: "Mostly Steady" },
      { id: "solid_consistent", icon: MoonStar, text: "Solid & Consistent" }
    ]
  },
  {
    id: "q5_physicalPain",
    title: "Any Physical Pain or Old Injuries?",
    options: [
      { id: "chronic_pain_old_injury", icon: Bone, text: "Chronic Pain / Old Injury" },
      { id: "new_tension_soreness", icon: Activity, text: "New Tension or Soreness" },
      { id: "mostly_fine", icon: Smile, text: "Mostly Fine" },
      { id: "no_issues_right_now", icon: CheckCircle2, text: "No Issues Right Now" }
    ]
  },
  {
    id: "q6_doseRewardSource",
    title: "What Gives You a Lift, Sober?",
    options: [
      { id: "movement_exercise", icon: Footprints, text: "Movement / Exercise" },
      { id: "food_cooking", icon: Utensils, text: "Food & Cooking" },
      { id: "connecting_with_people", icon: Heart, text: "Connecting With People" },
      { id: "nothing_yet", icon: HelpCircle, text: "Honestly, Nothing Yet" }
    ]
  },
  {
    id: "q7_screenBoundaries",
    title: "Screen & Tech Boundaries",
    options: [
      { id: "constant_doom_scrolling", icon: RefreshCcw, text: "Constant Doom-Scrolling" },
      { id: "lose_track_of_time", icon: Clock, text: "Lose Track of Time" },
      { id: "strict_nightly_limits", icon: Moon, text: "Strict Nightly Limits" },
      { id: "strictly_work_tool", icon: Wrench, text: "Strictly a Work Tool" }
    ]
  },
  {
    id: "q8_techComfort",
    title: "How Do You Feel About Using Apps?",
    options: [
      { id: "tech_frustrates_me", icon: AlertTriangle, text: "Tech Frustrates Me" },
      { id: "comfortable_simple", icon: Smartphone, text: "Comfortable, Keep It Simple" },
      { id: "confident_often", icon: Monitor, text: "Confident, Use It Often" },
      { id: "power_user", icon: Server, text: "Power User, Bring It On" }
    ]
  },
  {
    id: "q9_professionalSupport",
    title: "Any Professional Support in Place?",
    options: [
      { id: "just_aa_fellowship", icon: Users, text: "Just AA / Fellowship" },
      { id: "therapist_counselor", icon: MessageSquare, text: "Therapist or Counselor" },
      { id: "doctor_medication", icon: Pill, text: "Doctor or Medication Support" },
      { id: "full_care_team", icon: ShieldCheck, text: "A Full Care Team" }
    ]
  },
  {
    id: "q10_thoughtProcessing",
    title: "How Do You Process Your Thoughts?",
    options: [
      { id: "talk_out_loud", icon: Mic, text: "Talk It Out Loud" },
      { id: "write_by_hand", icon: PenTool, text: "Write It By Hand" },
      { id: "type_notes", icon: Keyboard, text: "Type Notes" },
      { id: "keep_in_head", icon: Brain, text: "Keep It In My Head" }
    ]
  },
  {
    id: "q11_sharingComfort",
    title: "How Open Are You to Sharing?",
    options: [
      { id: "anonymous_listener", icon: Ghost, text: "Anonymous Listener" },
      { id: "hesitant_but_willing", icon: Handshake, text: "Hesitant, But Willing" },
      { id: "comfortable_sharing_data", icon: BarChart3, text: "Comfortable Sharing" },
      { id: "fully_ready_to_build", icon: Megaphone, text: "Fully Ready to Build" }
    ]
  },
  {
    id: "q12_appGoal",
    title: "What Do You Want From This App?",
    options: [
      { id: "ai_sponsor_journal", icon: Bot, text: "AI Sponsor / Journal" },
      { id: "biological_dashboard", icon: Activity, text: "A Body & Health Dashboard" },
      { id: "app_for_homegroup", icon: Home, text: "Something for My Homegroup" },
      { id: "just_want_to_learn", icon: BookOpen, text: "Just Want to Learn" }
    ]
  }
];

export default function OnboardingPage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Edit mode - reached via the "Update My Answers" button on /profile
  // (src/app/profile/page.tsx). Reuses this exact same wizard instead of
  // building a separate editing UI, per Michael's request to let people
  // change their answers from the profile page.
  const isEditMode = searchParams.get("edit") === "true";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Phase 3.5 State
  const [sobrietyDate, setSobrietyDate] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
    // Only bounce away for an already-complete profile when NOT explicitly
    // retaking the diagnostic - otherwise the edit-mode link from /profile
    // would just redirect straight back to /dashboard.
    if (!loading && profile?.setupComplete && !isEditMode) {
      router.push("/dashboard");
    }
  }, [user, profile, loading, router, isEditMode]);

  // Prefill from the existing profile when retaking the diagnostic, so it
  // reads as "review and update" rather than starting from a blank slate.
  useEffect(() => {
    if (isEditMode && profile) {
      setAnswers(profile.diagnosticData || {});
      setSobrietyDate(profile.sobrietyDate || "");
      setSponsorName(profile.sponsorName && profile.sponsorName !== "None" ? profile.sponsorName : "");
    }
  }, [isEditMode, profile]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 300); // Small delay so they see the tap state before it slides
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const newProfile: Partial<UserProfile> = {
        sponsorName: sponsorName || "None",
        sobrietyDate: sobrietyDate,
        setupComplete: true,
        diagnosticData: answers
      };

      await setDoc(doc(db, "users", user.uid), newProfile, { merge: true });
      await refreshProfile();
      setSuccess(true);
    } catch (error) {
      console.error("Failed to save profile", error);
      setSubmitting(false);
    }
  };

  // Skip escape hatch: previously just router.push("/dashboard") with no
  // Firestore write, which meant /dashboard's `if (!profile) router.push("/onboarding")`
  // guard bounced the user straight back here — an infinite loop. Now writes a
  // minimal profile (whatever answers/sobriety date/sponsor were captured so far,
  // defaulting sobrietyDate to today if not yet entered) so `profile` is non-null
  // and the loop can't happen. User can fill in real details later via a profile page.
  const handleSkip = async () => {
    if (!user || submitting) return;

    // In edit mode there's already a complete profile on file - "skip" just
    // means "cancel, I don't want to change anything right now."
    if (isEditMode) {
      router.push("/profile");
      return;
    }

    setSubmitting(true);
    try {
      const newProfile: Partial<UserProfile> = {
        sponsorName: sponsorName || "None",
        sobrietyDate: sobrietyDate || new Date().toISOString().split("T")[0],
        setupComplete: true,
        diagnosticData: answers
      };

      await setDoc(doc(db, "users", user.uid), newProfile, { merge: true });
      await refreshProfile();
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save profile (skip)", error);
      setSubmitting(false);
    }
  };

  if (loading || (profile && profile.setupComplete && !isEditMode)) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">Initializing...</div>;
  }

  // Phase 4: Success State
  if (success) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#10b981] blur-3xl opacity-20 rounded-full"></div>
          <CheckCircle2 size={120} className="text-[#10b981] relative z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4"
        >
          {isEditMode ? (
            <>Profile Updated.</>
          ) : (
            <>
              Telemetry Logged.
              <br/>
              <span className="text-[#00f0ff]">Welcome to the Vanguard Council.</span>
            </>
          )}
        </motion.h1>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push(isEditMode ? "/profile" : "/dashboard")}
          className="mt-12 px-10 py-5 w-full max-w-md bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
        >
          {isEditMode ? "Back to Profile" : "Enter the Secure Workspace"}
        </motion.button>
      </div>
    );
  }

  // Phase 3.5: Calibrating Your Dashboard
  if (currentStep === QUESTIONS.length) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
        {/* Banner */}
        <div className="w-full bg-[#10b981]/10 border-b border-[#10b981]/20 py-3 px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Phase 3.5: Final Calibration</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Calibrating Your Dashboard</h2>
              <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Establish the final temporal baseline.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Confirm Sobriety Date <span className="text-[#10b981]">(Required)</span></label>
                <input 
                  type="date"
                  required
                  value={sobrietyDate}
                  onChange={(e) => setSobrietyDate(e.target.value)}
                  className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#10b981]/50 text-lg [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Sponsor's Name / Emergency Contact <span className="text-neutral-600">(Optional)</span></label>
                <input 
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="Who are you accountable to?"
                  className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-[#00f0ff]/50"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 mt-6 bg-[#10b981] hover:bg-[#10b981]/80 text-black font-black uppercase tracking-widest text-sm rounded-xl transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                {submitting ? "CALIBRATING..." : isEditMode ? "SAVE CHANGES" : "INITIALIZE DASHBOARD"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // Phase 2 & 3: The 12-Question Diagnostic Wizard
  const progressPercentage = ((currentStep) / QUESTIONS.length) * 100;
  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Banner */}
      <div className="w-full bg-[#00f0ff]/5 border-b border-[#00f0ff]/10 py-3 px-6 text-center z-20">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#00f0ff]">
          {isEditMode ? "Updating Your Baseline. 12 Quick Questions." : "Establishing Baseline. 12 Quick Questions. ~2 Minutes to complete."}
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="w-full h-3 bg-neutral-900 relative z-20">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00f0ff]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="text-center py-6 z-20">
        <p className="text-sm font-mono text-neutral-400 font-black uppercase tracking-widest">
          Step {currentStep + 1} of 12
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl flex flex-col items-center w-full"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-8 sm:mb-10 w-full leading-tight">
              {currentQ.title}
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              {currentQ.options.map((option, idx) => {
                const Icon = option.icon;
                const isSelected = answers[currentQ.id] === option.id;
                
                const borderColors = ['border-[#00f0ff]/30', 'border-[#10b981]/30', 'border-[#ff6b00]/30', 'border-[#8b5cf6]/30'];
                const textColors = ['text-[#00f0ff]', 'text-[#10b981]', 'text-[#ff6b00]', 'text-[#8b5cf6]'];
                const hoverBgs = ['hover:bg-[#00f0ff]/10', 'hover:bg-[#10b981]/10', 'hover:bg-[#ff6b00]/10', 'hover:bg-[#8b5cf6]/10'];
                const selectedBgs = ['bg-[#00f0ff]/20', 'bg-[#10b981]/20', 'bg-[#ff6b00]/20', 'bg-[#8b5cf6]/20'];
                const selectedBorders = ['border-[#00f0ff]', 'border-[#10b981]', 'border-[#ff6b00]', 'border-[#8b5cf6]'];

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentQ.id, option.id)}
                    className={`flex flex-col items-center justify-center text-center gap-3 sm:gap-4 p-5 sm:p-8 min-h-[140px] sm:min-h-[168px] rounded-2xl border transition-all shadow-xl hover:shadow-2xl ${
                      isSelected 
                        ? `${selectedBgs[idx]} ${selectedBorders[idx]} scale-95` 
                        : `bg-[#09090b] ${borderColors[idx]} ${hoverBgs[idx]}`
                    }`}
                  >
                    <Icon size={36} className={`sm:w-11 sm:h-11 ${isSelected ? textColors[idx] : "text-neutral-400"}`} />
                    <span className={`text-base sm:text-lg font-bold uppercase tracking-wider leading-tight ${isSelected ? textColors[idx] : 'text-neutral-200'}`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Escape Hatch */}
      <div className="py-8 text-center z-20">
        <button
          onClick={handleSkip}
          disabled={submitting}
          className="text-[10px] font-mono font-bold text-neutral-600 hover:text-white uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-0.5 disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : isEditMode
            ? "Cancel, keep my current answers."
            : "Skip for now, take me to the dashboard."}
        </button>
      </div>

    </div>
  );
}
