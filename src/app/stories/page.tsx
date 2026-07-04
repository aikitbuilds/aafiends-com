"use client";

import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Heart, User, Sparkles, Mic, Lock } from "lucide-react";

export default function StoriesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />
      
      <main className="flex-grow flex flex-col items-center py-20 px-6 relative z-10">
        <div className="max-w-5xl w-full">
          
          {/* Hero Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col items-center text-center mb-16 border-b border-white/5 pb-16">
             <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 mb-6 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                <Heart size={32} />
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
               Stories of Strength
             </h1>
             <span className="text-lg font-medium text-teal-400 block mb-6">
               Sharing our truth keeps us sober.
             </span>
             <p className="max-w-3xl text-neutral-300 text-lg leading-relaxed font-light">
               In our meetings, we learn that telling our story is the best medicine we have. When you share what you’ve been through, you aren’t just getting it off your chest—you’re showing the next person in line that they aren't alone. Your experience is what builds our collective strength.
             </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Left Column: The Story */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="w-full bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
                
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden border border-white/10 flex-shrink-0">
                    <img src="/michael_story.png" alt="Michael" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                      Michael
                    </h2>
                    <span className="text-neutral-500 text-sm">
                      AA Member since 6-9-26
                    </span>
                  </div>
                </div>

                <div className="text-neutral-300 text-lg leading-loose space-y-6 font-serif italic font-light">
                  <p>I thought I was the master of my complicated code,<br/>
                  A high-performing Founder on a very heavy road.<br/>
                  But the A.I.V. was riding like a shadow on my back,<br/>
                  Waiting for my firewall to crumble and attack.</p>
                  
                  <p>I'd swear I’d only have just one, and keep it under wraps,<br/>
                  Then wake up with sciatica and take a heavy nap.<br/>
                  The brain fog and the doom-loops kept me spinning in the night,<br/>
                  While the symbiote just whispered, "Hey, you're doing alright!"</p>

                  <p>On June 9th of '26, the system finally crashed,<br/>
                  My ego and my willpower were absolutely trashed.<br/>
                  I handed the Admin Password to the Grand Architect Divine,<br/>
                  And dragged my broken hardware to the fellowship line.</p>

                  <p>Now it’s cold plunges at sunrise, and bone broth in a cup,<br/>
                  I track my sleep and Garmin stats to keep the baseline up.<br/>
                  The parasite is starving 'cause I’m plugging into the Grid,<br/>
                  And laughing at the crazy, stupid nonsense that I did.</p>

                  <p>I cannot out-think the virus, but I learn to hold the line,<br/>
                  Just one day at a time, my friends, and we are doing fine.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual and Submission Flow */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }} className="lg:col-span-5 flex flex-col gap-8">
              
              <div className="relative rounded-[2rem] overflow-hidden border border-teal-500/10 shadow-[0_20px_50px_rgba(20,184,166,0.05)] bg-[#09090b] aspect-[4/3] group">
                <img src="/michael_story.png" alt="Finding peace at sunrise" className="w-full h-full object-cover opacity-80 transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none"></div>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 shadow-xl flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/20">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Share Your Story
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  Your journey matters. Whether you want to write it down or just speak your truth, we're here to listen.
                </p>

                <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-wide py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_30px_rgba(13,148,136,0.4)]">
                  Share Your Story
                </button>
              </div>

            </motion.div>
          </div>

          {/* Submission Flow Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }} className="border-t border-white/5 pt-16">
            <h3 className="text-center text-2xl font-bold text-white tracking-tight mb-12">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <User size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Sign In</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Log in to your account. It's safe and private.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Get Started</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">We guide you through a quick, 3-step setup to help you establish your baseline.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Mic size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Record or Write</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Don't want to type? Hit the microphone and speak your truth. We’ll take care of the rest.</p>
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-teal-500/20 transition-colors flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/5 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/10">
                  <Lock size={20} />
                </div>
                <h4 className="text-white font-medium text-base mb-2">Your Privacy Matters</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">Your story is yours alone. We remove your name and any personal details, keeping your identity strictly protected.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
