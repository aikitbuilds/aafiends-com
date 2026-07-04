"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useVocab } from "@/contexts/VocabularyContext";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Activity, Shield, BookOpen, Plus, Target, Zap, ChevronDown, Wrench } from "lucide-react";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import JourneyTab from "@/components/JourneyTab";
import TelemetryLog from "@/components/TelemetryLog";
import LedgerTab from "@/components/LedgerTab";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export default function CourseDashboardPage() {
  const { user, profile, loading, logout, refreshProfile } = useAuth();
  const { mode, toggleMode } = useVocab();
  const [checkingIn, setCheckingIn] = useState(false);
  const [showRecoveryTools, setShowRecoveryTools] = useState(false);
  const router = useRouter();

  // Calculate Days Sober
  const daysSober = profile?.sobrietyDate 
    ? Math.floor((new Date().getTime() - new Date(profile.sobrietyDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleMeetingCheckIn = async () => {
    if (!user || checkingIn) return;
    setCheckingIn(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        meetingsCount: increment(1)
      });
      await refreshProfile();
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
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#00f0ff] uppercase tracking-widest font-black text-sm animate-pulse">Initializing Course Dashboard...</div>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-[#ff6b00]/30 selection:text-white">
      
      {/* Header */}
      <header className="border-b border-white/5 bg-[#051024] sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
              ai4aa Foundation Course
            </h1>
            <p className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
              Student Dashboard // Data Over Denial
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">{user?.email}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2.5 rounded-full bg-neutral-900 border border-white/5 hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        
        {/* Course Curriculum — Primary Focus */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full">
          <CurriculumAccordion />
        </motion.div>

        {/* ─── AAFiends Recovery Tools (Optional / Collapsible) ─── */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full">
          <div className="w-full bg-[#0a0a0f] border border-[#00f0ff]/20 rounded-[2rem] overflow-hidden">
            <button
              onClick={() => setShowRecoveryTools(!showRecoveryTools)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-gradient-to-r from-[#00f0ff]/5 to-transparent hover:from-[#00f0ff]/10 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#00f0ff]/10 flex items-center justify-center flex-shrink-0 border border-[#00f0ff]/30">
                  <Wrench className="text-[#00f0ff]" size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-widest">Optional</span>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                    AAFiends Recovery Tools
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 hidden md:block">
                    Your sobriety tracker, meeting log, and personal recovery data. This is the app you will learn to reverse-engineer.
                  </p>
                </div>
              </div>
              <ChevronDown className={`text-neutral-500 transition-transform duration-300 flex-shrink-0 ${showRecoveryTools ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showRecoveryTools && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 border-t border-white/5 bg-[#050505]/50 flex flex-col gap-8">
                    
                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={handleMeetingCheckIn}
                        disabled={checkingIn}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#ff6b00]/50 bg-[#ff6b00]/10 hover:bg-[#ff6b00]/20 text-[#ff6b00] text-xs font-black tracking-widest uppercase transition-colors disabled:opacity-50"
                      >
                        <Plus size={14} /> {checkingIn ? "LOGGING..." : "LOG MEETING"}
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#10b981]/50 bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] text-xs font-black tracking-widest uppercase transition-colors">
                        <Activity size={14} /> SYNC GARMIN
                      </button>
                      <button
                        onClick={toggleMode}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-black uppercase tracking-widest text-neutral-400"
                      >
                        {mode === "tactical" ? (
                          <><Shield size={14} className="text-[#ff6b00]" /> Tactical</>
                        ) : (
                          <><BookOpen size={14} className="text-[#00f0ff]" /> Standard</>
                        )}
                      </button>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#09090b] border border-[#10b981]/30 rounded-2xl p-5 flex flex-col gap-2 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                        <div className="flex justify-between items-center text-[10px] font-black text-[#10b981] uppercase tracking-widest">
                          <span>Days Sober</span>
                          <Zap size={14} />
                        </div>
                        <div className="text-4xl font-black text-[#10b981]">{daysSober}</div>
                      </div>

                      <div className="bg-[#09090b] border border-[#ff6b00]/30 rounded-2xl p-5 flex flex-col gap-2 shadow-[0_0_20px_rgba(255,107,0,0.05)]">
                        <div className="flex justify-between items-center text-[10px] font-black text-[#ff6b00] uppercase tracking-widest">
                          <span>Meetings</span>
                          <Target size={14} />
                        </div>
                        <div className="text-4xl font-black text-[#ff6b00]">{profile?.meetingsCount || 0}</div>
                      </div>
                    </div>

                    {/* Journey Progress */}
                    <JourneyTab daysSober={daysSober} />

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
