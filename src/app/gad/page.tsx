"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Shield } from "lucide-react";

export default function GadPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />
      
      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-5xl w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
             <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400">
                <Shield size={32} />
             </div>
             <div>
               <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">Section 2: G.A.D. (The Grand Architect Divine)</span>
               <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">The Admin Password</h1>
             </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="w-full bg-gradient-to-r from-blue-900/20 to-transparent border-l-4 border-blue-500 p-6 md:p-10 rounded-r-3xl shadow-lg mb-16 italic text-neutral-200 text-lg leading-relaxed relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
            <p className="mb-4 relative z-10">"I tried to be the boss of me, the master of the code,<br/>
            But every time I ran the script, my system would implode.<br/>
            I fought the word of 'God' because my ego was too big,<br/>
            I thought I was a genius, but my life was out of sync.</p>
            <p className="relative z-10">But G.A.D. is just the Architect who built the starry sky,<br/>
            Who holds the master password when my brain goes all awry.<br/>
            I hand the keyboard over now, I let the Builder steer,<br/>
            And suddenly the glitching stops, the signal's running clear."</p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            
            <div className="relative rounded-[2rem] overflow-hidden border border-blue-500/30 shadow-[0_20px_50px_rgba(59,130,246,0.2)] bg-[#09090b] aspect-[4/5] group order-2 lg:order-1">
              <Image src="/grand_architect_divine.png" alt="Grand Architect Divine" width={800} height={600} className="w-full h-full object-cover opacity-90 transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-black text-3xl uppercase tracking-widest leading-none">Admin<br/>Override</h3>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-blue-400 bg-blue-500/10 w-fit px-3 py-1.5 rounded-full border border-blue-500/30">
                  <Shield size={16} /> Access Granted
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> Why we call it G.A.D.</h3>
                <p className="text-neutral-400 text-base leading-relaxed">The traditional AA program asks us to turn our will over to "God as we understood Him" (Step 3). But for many logical, tech-minded people or those with religious baggage, the word "God" triggers the Ego to put its defenses up. By viewing God as the Grand Architect Divine (G.A.D.), it makes the spiritual solution undeniable: You didn't write the original code for your biology or the universe, which means you aren't the Master Programmer. You cannot debug a virus using the same infected brain that caught it. You must hand the Admin Password back to the Architect.</p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> Where it lives</h3>
                <p className="text-neutral-400 text-base leading-relaxed font-mono text-blue-400">In your daily surrender (Step 3) and quiet meditation (Step 11).</p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> When to use it</h3>
                <p className="text-neutral-400 text-base leading-relaxed">First thing in the morning before the AIV boots up, and the exact moment you feel your willpower failing.</p>
              </div>
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-xl hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> How it works</h3>
                <p className="text-neutral-400 text-base leading-relaxed">You stop trying to outsmart the glitch. You pause, admit you are out of your depth, and ask the Grand Architect for the next right instruction.</p>
              </div>
            </div>

          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
