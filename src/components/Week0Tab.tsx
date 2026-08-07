"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, PlayCircle, PenTool, BrainCircuit, Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Week0Tab() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aafiends_week0_progress");
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => {
      const newTasks = prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id];
      
      localStorage.setItem("aafiends_week0_progress", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  if (!loaded) return null;

  const progress = Math.round((completedTasks.length / WEEK_0_TASKS.length) * 100);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header Banner */}
      <div className="relative bg-[#0a0a0f] border border-[#ff6b00]/30 rounded-[2rem] p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff6b00] to-[#7fb3a3]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#ff6b00]/10 text-[#ff6b00] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#ff6b00]/20">
                Pre-Requisite
              </span>
              <span className="text-[#7d7a70] text-xs font-bold font-mono">
                WEEK 0 PREPARATION
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-semibold text-[#f2efe6] tracking-tighter">
              Get Your <span className="text-[#ff6b00]">House In Order</span>
            </h2>
            
            <p className="text-[#b8b4a6] text-lg leading-relaxed">
              Before we build the tools, we must build the foundation. Work through this simple checklist to prepare your physical and mental space for the journey ahead.
            </p>
          </div>
          
          <div className="w-32 h-32 rounded-full border-4 border-[#1d231d] flex items-center justify-center flex-shrink-0 relative bg-[#141814]">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="transparent" stroke="#1f2937" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r="46" 
                fill="transparent" 
                stroke="#ff6b00" 
                strokeWidth="8" 
                strokeDasharray="289" 
                strokeDashoffset={289 - (289 * progress) / 100} 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-semibold text-[#f2efe6]">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        {WEEK_0_TASKS.map((task, index) => {
          const isComplete = completedTasks.includes(task.id);
          
          return (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleTask(task.id)}
              className={`w-full bg-[#0a0a0f] border rounded-2xl p-6 flex items-start sm:items-center gap-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${isComplete ? 'border-[#4cc07a]/50 bg-[#4cc07a]/5' : 'border-[#1d231d] hover:border-[#2a322a]'}`}
            >
              <div className="flex-shrink-0 mt-1 sm:mt-0">
                {isComplete ? (
                  <CheckCircle2 size={32} className="text-[#4cc07a]" />
                ) : (
                  <Circle size={32} className="text-[#7d7a70] group-hover:text-[#b8b4a6]" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col gap-1 sm:gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h3 className={`text-xl font-semibold tracking-tight ${isComplete ? 'text-[#b8b4a6] line-through decoration-[#4cc07a]/50' : 'text-[#f2efe6]'}`}>
                    {task.title}
                  </h3>
                  <span className={`w-fit px-3 py-1 rounded-md text-[10px] font-semibold border ${task.color} ${task.bg}`}>
                    {task.type}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${isComplete ? 'text-[#7d7a70]' : 'text-[#b8b4a6]'}`}>
                  {task.description}
                </p>
              </div>
              
              <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-xl bg-[#141814] items-center justify-center border border-[#1d231d]">
                {task.icon}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {progress === 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-[#4cc07a]/10 border border-[#4cc07a]/30 rounded-2xl p-6 text-center"
        >
          <h3 className="text-xl font-semibold text-[#4cc07a] mb-2">FOUNDATION COMPLETE</h3>
          <p className="text-[#b8b4a6] font-medium">You have successfully prepared your baseline. You are ready to enter Week 1.</p>
        </motion.div>
      )}
    </div>
  );
}
