"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock, CheckCircle2, Circle, PlayCircle, ShieldCheck, PenTool, Activity, BrainCircuit } from "lucide-react";

const WEEK_0_TASKS = [
  {
    id: "orientation_video",
    type: "Action",
    title: "Watch the Week 0 Orientation Video",
    description: "A quick 5-minute video on what to expect. No tech required, just listen.",
    icon: <PlayCircle size={20} className="text-[#3b82f6]" />,
    color: "border-[#3b82f6]/30",
    bg: "bg-[#3b82f6]/10",
  },
  {
    id: "workspace_setup",
    type: "Action",
    title: "Set up your Workspace (The Sanctuary)",
    description: "Clean your physical desk. A cluttered space leads to a cluttered mind. Make it a safe space for your recovery work.",
    icon: <ShieldCheck size={20} className="text-[#4cc07a]" />,
    color: "border-[#4cc07a]/30",
    bg: "bg-[#4cc07a]/10",
  },
  {
    id: "tech_inventory",
    type: "Inventory",
    title: "Write a Fear Inventory around Technology",
    description: "Grab a real piece of paper. Write down any resentments or fears you have about learning computers or AI. Be fearless and searching.",
    icon: <PenTool size={20} className="text-[#ff6b00]" />,
    color: "border-[#ff6b00]/30",
    bg: "bg-[#ff6b00]/10",
  },
  {
    id: "baseline_checkin",
    type: "Baseline",
    title: "Take a 10th Step Baseline Check-In",
    description: "Check your physical and mental state right now. Hungry, Angry, Lonely, or Tired (HALT)?",
    icon: <Activity size={20} className="text-[#a88fc4]" />,
    color: "border-[#a88fc4]/30",
    bg: "bg-[#a88fc4]/10",
  },
  {
    id: "ai_practice",
    type: "Practice",
    title: "Ask an AI for Sober Advice",
    description: "Open ChatGPT or Gemini on your phone. Ask it: 'I am in recovery from addiction. Give me a 3-step action plan to stay sober today.' See how it acts as an objective mirror.",
    icon: <BrainCircuit size={20} className="text-[#7fb3a3]" />,
    color: "border-[#7fb3a3]/30",
    bg: "bg-[#7fb3a3]/10",
  }
];

export default function CurriculumAccordion() {
  const [openSection, setOpenSection] = useState<number>(1); // Default to Week 0 open
  const [completedWeek0Tasks, setCompletedWeek0Tasks] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aafiends_week0_progress");
    if (saved) {
      setCompletedWeek0Tasks(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const toggleTask = (id: string) => {
    setCompletedWeek0Tasks(prev => {
      const newTasks = prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id];
      
      localStorage.setItem("aafiends_week0_progress", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const isWeek0Complete = completedWeek0Tasks.length === WEEK_0_TASKS.length;

  if (!loaded) return null;

  return (
    <div className="w-full flex flex-col gap-4 max-w-4xl mx-auto">
      
      {/* PHASE 0: Onboarding (Completed by default if they are here) */}
      <div className="w-full bg-[#0a0a0f] border border-[#4cc07a]/50 rounded-[2rem] overflow-hidden">
        <button 
          onClick={() => setOpenSection(openSection === 0 ? -1 : 0)}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-gradient-to-r from-[#4cc07a]/10 to-transparent hover:from-[#4cc07a]/20 transition-all"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#4cc07a]/20 flex items-center justify-center flex-shrink-0 border border-[#4cc07a]/50">
              <CheckCircle2 className="text-[#4cc07a]" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#b8b4a6] font-bold">Phase 0</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#f2efe6] tracking-tight">Onboarding & Baseline Setup</h2>
            </div>
          </div>
          <ChevronDown className={`text-[#7d7a70] transition-transform duration-300 ${openSection === 0 ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSection === 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-0 text-[#b8b4a6] leading-relaxed border-t border-[#1d231d] mt-4">
                <p>Your baseline profile has been successfully initialized in the secure database. You are ready to begin the program.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PHASE 1: Week 0 Preparation */}
      <div className={`w-full bg-[#0a0a0f] border rounded-[2rem] overflow-hidden transition-all duration-500 ${isWeek0Complete ? 'border-[#4cc07a]/50' : 'border-[#ff6b00]/50'}`}>
        <button 
          onClick={() => setOpenSection(openSection === 1 ? -1 : 1)}
          className={`w-full flex items-center justify-between p-6 md:p-8 text-left transition-all ${isWeek0Complete ? 'bg-gradient-to-r from-[#4cc07a]/10 to-transparent hover:from-[#4cc07a]/20' : 'bg-gradient-to-r from-[#ff6b00]/10 to-transparent hover:from-[#ff6b00]/20'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${isWeek0Complete ? 'bg-[#4cc07a]/20 border-[#4cc07a]/50' : 'bg-[#ff6b00]/20 border-[#ff6b00]/50'}`}>
              {isWeek0Complete ? (
                <CheckCircle2 className="text-[#4cc07a]" size={24} />
              ) : (
                <span className="text-[#f2efe6] font-semibold text-lg">1</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#b8b4a6] font-bold">Phase 1</span>
              <h2 className={`text-xl md:text-2xl font-semibold tracking-tight ${isWeek0Complete ? 'text-[#f2efe6]' : 'text-[#f2efe6]'}`}>
                Week 0: Preparation <span className="hidden md:inline font-normal text-[#7d7a70] text-lg">| Get Your House In Order</span>
              </h2>
            </div>
          </div>
          <ChevronDown className={`text-[#7d7a70] transition-transform duration-300 ${openSection === 1 ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSection === 1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 border-t border-[#1d231d] bg-[#0d0f0d]/50 flex flex-col gap-6">
                <p className="text-[#b8b4a6] leading-relaxed font-medium">
                  Before we build the tools, we must build the foundation. Work through this simple checklist to prepare your physical and mental space for the journey ahead.
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {WEEK_0_TASKS.map((task) => {
                    const isComplete = completedWeek0Tasks.includes(task.id);
                    return (
                      <div 
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full bg-[#0a0a0f] border rounded-2xl p-5 flex items-start sm:items-center gap-5 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${isComplete ? 'border-[#4cc07a]/30 bg-[#4cc07a]/5' : 'border-[#1d231d] hover:border-[#2a322a]'}`}
                      >
                        <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                          {isComplete ? (
                            <CheckCircle2 size={24} className="text-[#4cc07a]" />
                          ) : (
                            <Circle size={24} className="text-[#7d7a70] group-hover:text-[#b8b4a6]" />
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h3 className={`text-lg font-semibold tracking-tight ${isComplete ? 'text-[#b8b4a6] line-through decoration-[#4cc07a]/50' : 'text-[#f2efe6]'}`}>
                              {task.title}
                            </h3>
                            <span className={`w-fit px-2 py-0.5 rounded text-[9px] font-semibold border ${task.color} ${task.bg}`}>
                              {task.type}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed ${isComplete ? 'text-[#7d7a70]' : 'text-[#b8b4a6]'}`}>
                            {task.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {isWeek0Complete && (
                   <div className="w-full bg-[#4cc07a]/10 border border-[#4cc07a]/30 rounded-2xl p-5 text-center mt-2">
                     <h3 className="text-sm font-semibold text-[#4cc07a]">FOUNDATION COMPLETE</h3>
                     <p className="text-[#b8b4a6] text-xs mt-1">You are ready to enter Week 1 when it unlocks.</p>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PHASE 2: Week 1 - The AI Mirror (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 2</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 1: The AI Mirror</h2>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#7d7a70] bg-[#141814] px-3 py-1 rounded-full border border-[#1d231d]">Locked</span>
        </div>
      </div>

      {/* PHASE 3: Week 2 - Biological Telemetry & The Grid (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 3</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 2: Biological Telemetry & The Grid</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* PHASE 4: Week 3 - Hardware Hijack (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 4</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 3: Hardware Hijack</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* PHASE 5: Week 4 - The Ledger (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 5</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 4: The Ledger (Databases)</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* PHASE 6: Week 5 - Connecting the Nodes (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 6</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 5: Connecting the Nodes</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* PHASE 7: Week 6 - Deployment (LOCKED) */}
      <div className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-[2rem] overflow-hidden opacity-60 grayscale cursor-not-allowed">
        <div className="w-full flex items-center justify-between p-6 md:p-8 text-left">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#141814] flex items-center justify-center flex-shrink-0 border border-[#1d231d]">
              <Lock className="text-[#7d7a70]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#7d7a70] font-bold">Phase 7</span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#b8b4a6] tracking-tight">Week 6: Deployment & 12th Step Tech</h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
