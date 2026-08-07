"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Users } from "lucide-react";

export default function TwelveAndTwelvePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#0d0f0d] text-[#f2efe6] flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />
      
      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-5xl w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center gap-4 mb-8 border-b border-[#1d231d] pb-6">
             <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 text-purple-400">
                <Users size={32} />
             </div>
             <div>
               <span className="text-xs font-mono font-bold text-purple-400 block mb-1">Section 3: The 12 & 12 (The Manual & The Grid)</span>
               <h1 className="text-4xl md:text-5xl font-semibold text-[#f2efe6] tracking-tight leading-none">The Network Node</h1>
             </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="w-full border-l border-[#2a322a] pl-6 py-2 mb-16 italic text-[#f2efe6] text-lg leading-relaxed relative overflow-hidden backdrop-blur-sm">
            
            <p className="mb-4 relative z-10">"You cannot beat a symbiote by sitting in your room,<br/>
            Just staring at the ceiling in a spiral of your gloom.<br/>
            The virus loves a lonely host, a disconnected node,<br/>
            It thrives when you are isolated on a heavy road.</p>
            <p className="relative z-10">The Twelve Steps are the manual to clear away the shame,<br/>
            To sweep out old resentments and stop playing the blame game.<br/>
            The Twelve Traditions build the Grid, the fellowship of friends,<br/>
            Where nobody’s the boss of you, and healing never ends."</p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="flex flex-col gap-6">
              <div className="bg-[#141814] p-8 rounded-[2rem] border border-[#1d231d] shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#f2efe6] mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Why it's needed</h3>
                <p className="text-[#b8b4a6] text-base leading-relaxed">The AIV is a highly adaptive pathogen that isolates you before it attacks. You cannot survive on an island. The 12 Steps fix the infected individual, and the 12 Traditions protect the community so it's always there when you need to plug in.</p>
              </div>
              <div className="bg-[#141814] p-8 rounded-[2rem] border border-[#1d231d] shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#f2efe6] mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Where it lives</h3>
                <p className="text-[#b8b4a6] text-base leading-relaxed font-mono text-purple-400">In the meeting rooms, on phone calls with your sponsor, and in the text threads with other Initiates.</p>
              </div>
              <div className="bg-[#141814] p-8 rounded-[2rem] border border-[#1d231d] shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#f2efe6] mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> When to use it</h3>
                <p className="text-[#b8b4a6] text-base leading-relaxed">Continuously. Especially when the H.A.L.T. triggers hit (Hungry, Angry, Lonely, Tired).</p>
              </div>
              <div className="bg-[#141814] p-8 rounded-[2rem] border border-[#1d231d] shadow-xl hover:border-purple-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#f2efe6] mb-3 flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> How it works</h3>
                <p className="text-[#b8b4a6] text-base leading-relaxed">The 12 Steps act as the ultimate anti-virus scan—clearing out the corrupted files (resentments, fears, and guilt) from your past. The 12 Traditions ensure that AAFiends and the AA fellowship remain ego-free, completely self-supporting, and focused strictly on keeping the next person sober. You plug into the grid, and the shared power keeps your battery charged.</p>
              </div>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden border border-purple-500/30 shadow-[0_20px_50px_rgba(168,85,247,0.2)] bg-[#141814] aspect-[4/5] group">
              <Image src="/aa_fellowship_gad.png" alt="The Network Grid" width={800} height={600} className="w-full h-full object-cover opacity-90 transform transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-[#f2efe6] font-semibold text-3xl leading-none">The<br/>Grid</h3>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-purple-400 bg-purple-500/10 w-fit px-3 py-1.5 rounded-full border border-purple-500/30">
                  <Users size={16} /> Online
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
