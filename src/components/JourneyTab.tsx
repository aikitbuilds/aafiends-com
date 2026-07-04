"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Shield, Target, Zap, ChevronRight, Lock } from "lucide-react";

const STEPS = [
  { step: 1, title: "Honesty", days: 0, meetings: 0, quote: "We admitted we were powerless over alcohol—that our lives had become unmanageable." },
  { step: 2, title: "Hope", days: 7, meetings: 3, quote: "Came to believe that a Power greater than ourselves could restore us to sanity." },
  { step: 3, title: "Surrender", days: 14, meetings: 7, quote: "Made a decision to turn our will and our lives over to the care of God as we understood Him." },
  { step: 4, title: "Courage", days: 30, meetings: 15, quote: "Made a searching and fearless moral inventory of ourselves." },
  { step: 5, title: "Integrity", days: 60, meetings: 30, quote: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs." },
  { step: 6, title: "Willingness", days: 90, meetings: 45, quote: "Were entirely ready to have God remove all these defects of character." },
  { step: 7, title: "Humility", days: 120, meetings: 60, quote: "Humbly asked Him to remove our shortcomings." },
  { step: 8, title: "Love", days: 150, meetings: 75, quote: "Made a list of all persons we had harmed, and became willing to make amends to them all." },
  { step: 9, title: "Discipline", days: 180, meetings: 90, quote: "Made direct amends to such people wherever possible, except when to do so would injure them or others." },
  { step: 10, title: "Perseverance", days: 270, meetings: 120, quote: "Continued to take personal inventory and when we were wrong promptly admitted it." },
  { step: 11, title: "Spiritual Awareness", days: 365, meetings: 150, quote: "Sought through prayer and meditation to improve our conscious contact with God, as we understood Him, praying only for knowledge of His will for us and the power to carry that out." },
  { step: 12, title: "Service", days: 500, meetings: 200, quote: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs." }
];

export default function JourneyTab({ daysSober }: { daysSober: number }) {
  const { profile } = useAuth();
  const meetings = profile?.meetingsCount || 0;

  // Find the highest step they qualify for based on BOTH Days and Meetings
  let currentStepIndex = 0;
  for (let i = 0; i < STEPS.length; i++) {
    if (daysSober >= STEPS[i].days && meetings >= STEPS[i].meetings) {
      currentStepIndex = i;
    } else {
      break; // They haven't reached this step yet
    }
  }

  const currentStep = STEPS[currentStepIndex];
  const nextStep = currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1] : null;

  // Calculate Progress Percentages to next step
  const daysProgress = nextStep 
    ? Math.min(100, Math.max(0, ((daysSober - currentStep.days) / (nextStep.days - currentStep.days)) * 100))
    : 100;
  
  const meetingsProgress = nextStep 
    ? Math.min(100, Math.max(0, ((meetings - currentStep.meetings) / (nextStep.meetings - currentStep.meetings)) * 100))
    : 100;

  return (
    <div className="w-full flex flex-col gap-8">

      {/* Plain-English explainer - this whole section auto-advances based on
          days sober + meetings logged, but that wasn't explained anywhere,
          so it read as unlabeled sci-fi jargon (2026-07-03 user feedback). */}
      <div className="flex flex-col gap-1 -mb-2">
        <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">Your 12-Step Progress</h4>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
          This tracks which of the 12 Steps you're on. It moves forward automatically as your days sober and logged meetings add up - no need to do anything else here.
        </p>
      </div>

      {/* Current Step Banner */}
      <div className="relative bg-[#0a0a0f] border border-[#00f0ff]/30 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#00f0ff]/10 text-[#00f0ff] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-[#00f0ff]/20">
                Current Step
              </span>
              <span className="text-neutral-500 text-xs font-bold font-mono tracking-widest uppercase">
                Step {currentStep.step} of 12
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Step {currentStep.step}: <span className="text-[#00f0ff]">{currentStep.title}</span>
            </h2>

            <blockquote className="text-neutral-400 italic border-l-4 border-[#00f0ff]/50 pl-4 py-2 mt-2">
              "{currentStep.quote}"
            </blockquote>
          </div>

          <div className="w-32 h-32 rounded-full border-4 border-[#00f0ff]/20 flex items-center justify-center flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#00f0ff] animate-[spin_10s_linear_infinite] border-t-transparent border-r-transparent"></div>
            <span className="text-4xl font-black text-white">{currentStep.step}</span>
          </div>
        </div>
      </div>

      {/* Progress to Next Step */}
      {nextStep ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Days Progress */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Days Sober</span>
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap size={16} className="text-[#10b981]" /> {daysSober} / {nextStep.days} Days
                </span>
              </div>
              {daysSober >= nextStep.days && <Shield size={20} className="text-[#10b981]" />}
            </div>
            <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] transition-all duration-1000" style={{ width: `${daysProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
              {nextStep.days - daysSober > 0 ? `${nextStep.days - daysSober} more days to reach Step ${nextStep.step}` : "Reached."}
            </p>
          </div>

          {/* Meetings Progress */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Meetings Attended</span>
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <Target size={16} className="text-[#ff6b00]" /> {meetings} / {nextStep.meetings} Meetings
                </span>
              </div>
              {meetings >= nextStep.meetings && <Shield size={20} className="text-[#ff6b00]" />}
            </div>
            <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
              <div className="h-full bg-[#ff6b00] transition-all duration-1000" style={{ width: `${meetingsProgress}%` }}></div>
            </div>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
              {nextStep.meetings - meetings > 0 ? `${nextStep.meetings - meetings} more meetings to reach Step ${nextStep.step} - use "Log Fellowship" above` : "Reached."}
            </p>
          </div>

        </div>
      ) : (
        <div className="bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] p-6 rounded-2xl flex items-center justify-center gap-3">
          <Shield size={24} />
          <span className="text-sm font-black uppercase tracking-widest">You've reached Step 12 - the highest step tracked here.</span>
        </div>
      )}

      {/* Next Step Preview */}
      {nextStep && (
        <div className="flex items-center gap-4 bg-neutral-950 border border-white/5 p-4 rounded-xl opacity-50 grayscale">
          <Lock size={20} className="text-neutral-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Next Step</span>
            <span className="text-sm font-bold text-white">Step {nextStep.step}: {nextStep.title}</span>
          </div>
          <ChevronRight size={20} className="text-neutral-700 ml-auto" />
        </div>
      )}

    </div>
  );
}
