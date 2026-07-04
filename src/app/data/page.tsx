"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  Activity, 
  ShieldAlert, 
  Terminal, 
  Clock, 
  Settings, 
  Droplets, 
  Moon, 
  Dumbbell, 
  CheckCircle2, 
  AlertTriangle,
  Watch,
  HeartPulse,
  BrainCircuit
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

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

export default function DataPage() {
  const [sleep, setSleep] = useState<number>(7);
  const [hydration, setHydration] = useState<boolean>(false);
  const [movement, setMovement] = useState<string>("Walk");
  const [statusLogged, setStatusLogged] = useState<boolean>(false);

  const handleLogTelemetry = () => {
    setStatusLogged(true);
    setTimeout(() => setStatusLogged(false), 3000); // Reset after 3s
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden selection:bg-emerald-500/30">
      <SiteHeader />
      
      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-6xl w-full flex flex-col gap-16">
          
          {/* COMPONENT 1: Hero & The Reality Check (Poem) */}
          <section className="relative rounded-[3rem] overflow-hidden border border-white/10 mb-16 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img src="/blog_gamification.png" alt="System Gamification" className="w-full h-full object-cover" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-16 h-full items-start">
              
              {/* Left Box (Data Over Denial) - Pushed Down */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-5 lg:col-start-1 mt-12 lg:mt-56 bg-[#020202]/50 border border-white/10 p-8 md:p-10 rounded-[2rem] backdrop-blur-md self-end">
                <div className="flex items-center gap-3 mb-4 text-emerald-500 text-xs font-mono font-bold tracking-widest uppercase">
                  <Activity size={16} /> System Telemetry Online
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                  Data Over <br/> <span className="text-emerald-500">Denial.</span>
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed max-w-md font-medium">
                  The A.I.V. thrives in the fog of exhaustion. We use raw telemetry to clear the fog. Your dashboard proves the healing is working.
                </p>
              </motion.div>

              {/* Right Box (Reality Check) - Pushed Right */}
              <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-5 lg:col-start-8">
                <div className="bg-[#0a0a0a]/40 border border-emerald-500/30 p-8 md:p-10 rounded-[2rem] shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <h3 className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                    <Terminal size={16} /> Reality Check Log
                  </h3>
                  <div className="italic text-neutral-200 text-lg leading-loose font-serif">
                    <p className="mb-4">
                      I thought my memory was sharp, my willpower was grand,<br/>
                      But A.I.V. just took my brain and buried it in sand.<br/>
                      'You're doing great!' the virus lied, 'You don't need any rest!'<br/>
                      Then suddenly my heart was pounding hard inside my chest.
                    </p>
                    <p>
                      So now I drop the old excuse, I look at what is real,<br/>
                      I track my water and my sleep to monitor the heal.<br/>
                      It’s Data Over Denial now—a flashlight in the deep,<br/>
                      To catch the little gremlins where they slowly start to creep.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* COMPONENT 2: The "Why, Where, When, How" (Grid Layout) */}
          <section>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-black text-white uppercase tracking-tight mb-8">
              Operational Protocols
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative bg-gradient-to-b from-[#0e0e12] to-[#050505] p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <ShieldAlert size={24} />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-3 tracking-wide relative z-10 group-hover:text-emerald-400 transition-colors">Why it's needed</h4>
                <p className="text-neutral-400 text-sm leading-relaxed relative z-10 group-hover:text-neutral-300 transition-colors">
                  Addiction thrives in blind spots. The AIV uses your exhaustion as a craving. Tracking basics removes the blind spots so you know exactly when your firewall is down.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }} className="relative bg-gradient-to-b from-[#0e0e12] to-[#050505] p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Activity size={24} />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-3 tracking-wide relative z-10 group-hover:text-emerald-400 transition-colors">Where it lives</h4>
                <p className="text-neutral-400 text-sm leading-relaxed relative z-10 group-hover:text-neutral-300 transition-colors">
                  Your Daily Dashboard. This is your central Step 10 terminal for tracking all recovery telemetry and analyzing system stability.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }} className="relative bg-gradient-to-b from-[#0e0e12] to-[#050505] p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Clock size={24} />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-3 tracking-wide relative z-10 group-hover:text-emerald-400 transition-colors">When to use it</h4>
                <p className="text-neutral-400 text-sm leading-relaxed relative z-10 group-hover:text-neutral-300 transition-colors">
                  Twice a day. Once in the morning to calibrate the baseline, once in the evening (Step 10) to clear the system cache and reset for tomorrow.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.3 }} className="relative bg-gradient-to-b from-[#0e0e12] to-[#050505] p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Settings size={24} />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-3 tracking-wide relative z-10 group-hover:text-emerald-400 transition-colors">How it works</h4>
                <p className="text-neutral-400 text-sm leading-relaxed relative z-10 group-hover:text-neutral-300 transition-colors">
                  Log the Big Three inputs: Fuel (water/food), Recharge (sleep), and Friction (exercise/movement). Undeniable facts, not opinions.
                </p>
              </motion.div>

            </div>
          </section>

          {/* COMPONENT 2.5: Garmin Sync Integration (Real Data & UI) */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
              <Watch className="text-emerald-500" size={32} />
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Garmin Biometric Sync
                </h2>
                <p className="text-neutral-400 font-mono text-xs tracking-widest uppercase mt-1">
                  Real Hardware Telemetry Analysis
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              
              {/* Real Screenshots Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0a0a0a] p-4 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                   <div className="flex items-center justify-between mb-4 px-2">
                     <span className="text-emerald-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                       <Activity size={14} /> Source: Garmin Connect
                     </span>
                     <span className="text-neutral-500 text-xs font-mono">Sync: OK</span>
                   </div>
                   <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-[4/3] bg-black">
                     <img src="/garmin1.jpg" alt="Garmin Connect Dashboard" className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-transform duration-700" />
                   </div>
                </div>
                
                <div className="bg-[#0a0a0a] p-4 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
                   <div className="flex items-center justify-between mb-4 px-2">
                     <span className="text-blue-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                       <Moon size={14} /> Source: Garmin Sleep
                     </span>
                     <span className="text-neutral-500 text-xs font-mono">Sync: OK</span>
                   </div>
                   <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-[4/3] bg-black">
                     <img src="/garminsleep.webp" alt="Garmin Sleep Data" className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-transform duration-700" />
                   </div>
                </div>
              </div>

              {/* Data Extraction UI Row (The one created previously) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sleep Data */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Moon size={20} />
                      <span className="font-bold uppercase text-sm tracking-wider">Sleep</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">Last Night</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-black text-white">7h 12m</span>
                    <span className="text-emerald-500 font-bold mb-1">Score: 84</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-emerald-500 h-full w-[84%]"></div>
                  </div>
                  <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                    Denial says you're fine. The watch says you're operating on a severe deficit. Sleep is the primary firewall against the A.I.V.
                  </p>
                </div>

                {/* Heart Rate Data */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <HeartPulse size={20} />
                      <span className="font-bold uppercase text-sm tracking-wider">Resting HR</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">7-Day Avg</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-black text-white">58</span>
                    <span className="text-neutral-400 font-bold mb-1 text-sm">bpm</span>
                  </div>
                  <div className="flex gap-1 mt-4 h-8 items-end">
                    {[62, 60, 59, 61, 58, 57, 58].map((bpm, i) => (
                      <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm" style={{ height: `${(bpm/70)*100}%` }}></div>
                    ))}
                  </div>
                  <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                    Elevated resting heart rate is an early warning system. It detects the physical stress of craving before the conscious mind does.
                  </p>
                </div>

                {/* Stress Data */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <BrainCircuit size={20} />
                      <span className="font-bold uppercase text-sm tracking-wider">Stress</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">Current</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-black text-emerald-500">22</span>
                    <span className="text-neutral-400 font-bold mb-1 text-sm">/ 100</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-emerald-500 h-full w-[22%]"></div>
                  </div>
                  <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                    High stress depletes willpower. By syncing HRV, you monitor the exact moment your mental defenses are compromised.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* COMPONENT 3: Interactive Dashboard (The Functional Core) */}
          <section className="bg-[#09090b] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-6">
               <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Activity className="text-emerald-500" /> The Daily Inventory
              </h2>
              <p className="text-neutral-400 mt-2 font-mono text-sm uppercase tracking-widest">Input Daily Telemetry to Calibrate DOSE Baseline</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Daily Input Widget */}
              <div className="flex flex-col gap-8 bg-[#020202] border border-white/5 rounded-3xl p-8">
                
                {/* Sleep Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-bold uppercase tracking-wide flex items-center gap-2">
                      <Moon size={18} className="text-emerald-500" /> Recharge (Sleep)
                    </label>
                    <span className="text-emerald-500 font-mono font-bold text-lg">{sleep} hrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="12" step="1" 
                    value={sleep} 
                    onChange={(e) => setSleep(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Hydration Toggle */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-white font-bold uppercase tracking-wide flex items-center gap-2">
                      <Droplets size={18} className="text-emerald-500" /> Fuel (Hydration)
                    </label>
                    <button 
                      onClick={() => setHydration(!hydration)}
                      className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300 ${hydration ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                    >
                      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${hydration ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                  <p className="text-neutral-500 text-xs mt-2 font-mono">Target: 8+ cups logged today.</p>
                </div>

                {/* Daily Movement */}
                <div>
                  <label className="text-white font-bold uppercase tracking-wide flex items-center gap-2 mb-4">
                    <Dumbbell size={18} className="text-emerald-500" /> Friction (Movement)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Walk', 'Lift', 'Cold Plunge'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setMovement(type)}
                        className={`py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 border ${
                          movement === type 
                          ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50' 
                          : 'bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 mt-auto border-t border-white/10">
                  <button 
                    onClick={handleLogTelemetry}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Sync Telemetry to Grid
                  </button>
                  
                  {/* Status Feedback */}
                  <div className="h-8 mt-4 flex items-center justify-center">
                    {statusLogged ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-sm">
                        <CheckCircle2 size={16} /> Firewall Holding. Baseline Updated.
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-500/50 font-bold uppercase tracking-widest text-xs">
                        <AlertTriangle size={14} /> Pending Synchronization
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Data Visualization Chart */}
              <div className="flex flex-col gap-6 bg-[#020202] border border-white/5 rounded-3xl p-8 lg:col-span-2">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">Garmin Telemetry Overlay</h3>
                    <p className="text-neutral-500 text-xs font-mono">7-Day Biometric Trending (Sleep, HR, Stress)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-500">Sync Active</span>
                    <p className="text-emerald-500/70 text-xs font-mono uppercase tracking-widest">Connected</p>
                  </div>
                </div>

                <div className="flex-grow w-full h-[350px] -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={garminData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} domain={[0, 12]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px' }}
                        itemStyle={{ fontWeight: 'bold' }}
                        labelStyle={{ color: '#888', marginBottom: '4px', fontSize: '12px', textTransform: 'uppercase' }}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="stress" 
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#0a0a0a', stroke: '#ef4444', strokeWidth: 2 }}
                        name="Stress Level"
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="hr" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#0a0a0a', stroke: '#10b981', strokeWidth: 2 }}
                        name="Resting HR (bpm)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="sleep" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#0a0a0a', stroke: '#3b82f6', strokeWidth: 2 }}
                        name="Sleep (hrs)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
