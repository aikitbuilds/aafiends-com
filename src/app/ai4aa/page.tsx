"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Globe, PenTool, CheckCircle2, ShieldCheck, ChevronDown, Lock, Clock, Quote, Activity, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AI4AAPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/ai4aa/dashboard");
    }
  }, [user, router]);

  const [openWeek, setOpenWeek] = useState<number | null>(0);

  const toggleWeek = (index: number) => {
    setOpenWeek(openWeek === index ? null : index);
  };


  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.08),transparent_60%)] pointer-events-none z-0"></div>

      {/* Sticky Nav */}
      <nav className="border-b border-white/5 bg-[#051024] shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="AAfiends Logo" className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]" />
            <div className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
              AA<span className="text-[#ff6b00]">fiends</span> <span className="text-neutral-500 font-mono text-sm ml-2 tracking-widest hidden sm:inline-block">/ AI4AA</span>
            </div>
          </Link>
          <Link href="#registration" className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black tracking-widest uppercase transition-all duration-300 border border-white/5">
            INIT REGISTRATION
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col gap-32 relative z-20">
        {/* 1. The Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh] pt-12 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-6 text-left"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs text-[#00f0ff] font-mono uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              VANGUARD INITIATIVE ACTIVE
            </motion.span>
            
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              ai4aa Foundation Course: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#10b981]">DATA OVER DENIAL</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-medium">
              A 6-Week Tech Crash Course Built Exclusively for the Recovery Community.
            </p>
            <p className="text-sm md:text-base text-neutral-500 max-w-xl font-mono uppercase tracking-widest">
              Zero technical background required. If you can work the 12 Steps, you can build the code.
            </p>
          
            <div className="pt-4">
              <Link href="#registration">
                <button className="py-4 px-10 rounded-2xl bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)]">
                  <ShieldCheck size={20} className="text-white" />
                  INITIALIZE REGISTRATION
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] group"
          >
            <Image 
              src="/images/ai4aa/ai4aa_hero_biology_real.png" 
              alt="Understand Your Biology" 
              fill
              className="object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </motion.div>
        </section>

        {/* 2. The Mission / The "Why" */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-[#09090b] shadow-xl overflow-hidden flex flex-col"
          >
            <div className="relative h-64 w-full">
              <Image src="/images/ai4aa/the_sanctuary_real.png" alt="The Sanctuary" fill className="object-cover object-[center_20%] opacity-60 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
            </div>
            <div className="p-8 relative z-10 -mt-12 bg-[#09090b]">
              <p className="text-xl leading-relaxed text-neutral-300 font-medium">
                <span className="text-[#ff6b00] font-mono font-bold mb-3 block text-sm uppercase tracking-widest">/* THE HARDWARE HIJACK */</span>
                &quot;For years, addiction hijacked our hardware. We are now replacing a 30-year operational lie with sustainable code—both in our bodies and on the web.&quot;
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-[#09090b] shadow-xl overflow-hidden flex flex-col"
          >
            <div className="relative h-64 w-full">
              <Image src="/images/ai4aa/vanguard_network_real.png" alt="The Vanguard Network" fill className="object-cover object-[center_20%] opacity-60 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
            </div>
            <div className="p-8 relative z-10 -mt-12 bg-[#09090b]">
              <p className="text-xl leading-relaxed text-neutral-300 font-medium">
                <span className="text-[#00f0ff] font-mono font-bold mb-3 block text-sm uppercase tracking-widest">/* THE OBJECTIVE MIRROR */</span>
                &quot;Technology and AI can be intimidating, and the internet is full of 'dopamine mirages.' But when used correctly, AI is the ultimate objective mirror. It doesn't judge, it doesn't shame—it just processes the data.&quot;
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. The Arsenal / What You Will Build */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">THE ARSENAL</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">What you will build and understand.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-8 h-8 text-[#00f0ff]" />,
                title: "🪞 The AI Mirror",
                desc: "Learn how to use AI (ChatGPT, Gemini, Claude) as an objective sounding board to track your daily physical and mental telemetry before a relapse happens.",
                image: "/images/ai4aa/arsenal_exercise.png",
                color: "border-[#00f0ff]/30",
                bgHover: "hover:bg-[#00f0ff]/5"
              },
              {
                icon: <Database className="w-8 h-8 text-[#10b981]" />,
                title: "🏗️ The Digital Inventory",
                desc: "Understand how apps remember data securely using Google Firebase, explained through the lens of taking a fearless moral inventory.",
                image: "/images/ai4aa/arsenal_food.png",
                color: "border-[#10b981]/30",
                bgHover: "hover:bg-[#10b981]/5"
              },
              {
                icon: <Globe className="w-8 h-8 text-[#a855f7]" />,
                title: "🌐 The Grid",
                desc: "Learn how the internet actually works, how to buy your own domain, and how the Cloud is just like the AA fellowship—a decentralized network of power.",
                image: "/images/ai4aa/arsenal_community.png",
                color: "border-[#a855f7]/30",
                bgHover: "hover:bg-[#a855f7]/5"
              },
              {
                icon: <PenTool className="w-8 h-8 text-[#ff6b00]" />,
                title: "🛠️ Become the Architect",
                desc: "You don't need to learn how to type code. You will learn how to write 'Prompts' to command AI to build recovery websites and apps for you.",
                image: "/images/ai4aa/arsenal_god.png",
                color: "border-[#ff6b00]/30",
                bgHover: "hover:bg-[#ff6b00]/5"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-3xl border border-white/5 bg-[#09090b] ${card.bgHover} shadow-xl transition-all group relative overflow-hidden flex flex-col`}
              >
                <div className={`relative h-56 w-full border-b ${card.color}`}>
                  <Image src={card.image} alt={card.title} fill className="object-cover object-[center_25%] opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 to-transparent"></div>
                  <div className="absolute top-6 right-6 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {card.icon}
                  </div>
                </div>
                <div className="p-8 pt-6 flex-grow z-10 relative bg-transparent">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3 flex items-center gap-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* THE BLUEPRINT: COURSE CURRICULUM */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">THE BLUEPRINT: COURSE CURRICULUM</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Step-by-step execution protocol.</p>
            <div className="mt-2 mx-auto inline-flex items-start gap-3 bg-[#050505] border border-[#ff6b00]/30 rounded-xl p-4 px-5 shadow-[0_0_20px_rgba(255,107,0,0.1)] max-w-3xl">
              <span className="text-[#ff6b00] text-sm md:text-base leading-none">⚠️</span>
              <p className="text-[10px] md:text-xs font-mono text-[#ff6b00] uppercase tracking-widest font-bold text-left leading-relaxed">
                VANGUARD NOTICE: This curriculum is a living architecture. Technology moves fast. The modules below may shift or upgrade as new AI models and deployment methods become available. We adapt to the best tools on the grid.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            {[
              {
                title: "WEEK 0: PREPARATION (THE IGNITION SEQUENCE)",
                goal: "Remove all environmental and technical friction before the heavy lifting begins.",
                image: null,
                sessions: [
                  { title: "🧹 The Sanctuary:", desc: "Clean a dedicated workspace and establish the physical baseline." },
                  { title: "📖 The Physical Ledger:", desc: "Buy a notebook for offline cognitive offloading." },
                  { title: "💬 The Google Grid:", desc: "Set up Google Spaces for zero-friction comms." },
                  { title: "🤝 Vanguard Pairing:", desc: "Connect with your accountability partner." }
                ]
              },
              {
                title: "WEEK 1: THE FOUNDATION (ESTABLISHING THE MIRROR)",
                goal: "Demystify the technology, understand digital boundaries, and execute your first AI interaction.",
                image: null,
                sessions: [
                  { title: "🛑 The Dopamine Mirage:", desc: "Establish the '9:00 PM Tech Curfew' and the '60-Minute Rule'." },
                  { title: "🧠 The Anatomy of a Prompt:", desc: "Learn 'Consistency Over Perfection' and how to instruct the AI." },
                  { title: "📝 The First Baseline Read:", desc: "Dictate your messy, raw physical journal entry into the AI and ask it to scan for red flags." }
                ]
              },
              {
                title: "WEEK 2: BIOLOGICAL TELEMETRY & THE GRID",
                goal: "Map digital networks to human biology.",
                image: "/images/ai4aa/curriculum_ledger_real.png",
                sessions: [
                  { title: "🔌 APIs & The Nervous System:", desc: "Learn how computers talk to each other, and how that mirrors your body's D.O.S.E. chemicals (Dopamine, Oxytocin, Serotonin, Epinephrine)." },
                  { title: "☁️ The Cloud & Data Centers:", desc: "Understand how decentralized servers work." },
                  { title: "⌚ Wearable Data Dump:", desc: "Connect your Garmin/Apple Health to the AI Mirror to track your physical baseline." }
                ]
              },
              {
                title: "WEEK 3: DIGITAL REAL ESTATE (THE FOUNDATION)",
                goal: "Claim your space on the web.",
                image: null,
                sessions: [
                  { title: "🌐 Domains:", desc: "How to buy and own your digital 'street address'." },
                  { title: "🤝 The Digital Fellowship:", desc: "Why relying on Cloud networks is exactly like relying on the AA Fellowship." },
                  { title: "💡 App Brainstorming:", desc: "Design your first digital tool for the 30-day newcomer." }
                ]
              },
              {
                title: "WEEK 4: THE LEDGER (DATABASES & MEMORY)",
                goal: "Securely store the data.",
                image: "/images/ai4aa/curriculum_app_real.png",
                sessions: [
                  { title: "🗄️ What is a Database?:", desc: "A website without a database is just a poster. Learn how apps 'remember.'" },
                  { title: "🔥 Google Firebase:", desc: "The backend scaffolding that holds your app together." },
                  { title: "📝 The Digital Inventory:", desc: "Translating the 'Searching and Fearless Inventory' into secure, anonymous data storage." }
                ]
              },
              {
                title: "WEEK 5: THE ARCHITECT (BUILDING WITH AI)",
                goal: "Generate software without typing code.",
                image: null,
                sessions: [
                  { title: "🗣️ Prompting for Code:", desc: "Using AI terminals (Cursor, v0, Anti-Gravity) to build your app." },
                  { title: "⏱️ The 60-Minute Rule:", desc: "Implement strict time boundaries to prevent triggering the 'Founder Ego' and screen addiction." },
                  { title: "🏗️ Live Build:", desc: "Watch an app get built from scratch in real-time." }
                ]
              },
              {
                title: "WEEK 6: DEPLOYMENT & 12TH STEP TECH",
                goal: "Launch your tool to help the next Initiate.",
                image: "/images/ai4aa/curriculum_deploy_real.png",
                sessions: [
                  { title: "🚀 Go Live:", desc: "Connect your Domain, Firebase, and AI Code to the public internet." },
                  { title: "🛡️ The Vanguard Council:", desc: "Safely scaling digital tools without violating AA Traditions." },
                  { title: "📡 Become a Router:", desc: "Graduation. Take what you built and pass it down the line." }
                ]
              }
            ].map((week, index) => (
              <div key={index} className="bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                <button 
                  onClick={() => toggleWeek(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                    {week.title}
                  </h3>
                  <ChevronDown className={`text-white transition-transform duration-300 flex-shrink-0 ml-4 ${openWeek === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openWeek === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-white/5 flex flex-col gap-6 mt-6">
                        <div className="bg-[#ff6b00]/10 border-l-4 border-[#ff6b00] p-4 rounded-r-lg">
                          <p className="text-[#ff6b00] font-mono text-xs uppercase tracking-widest font-bold mb-1">Weekly Goal</p>
                          <p className="text-neutral-200 font-medium">{week.goal}</p>
                        </div>
                        {week.image && (
                          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg mt-2">
                            <Image src={week.image} alt={week.title} fill className="object-cover object-[center_20%]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
                          </div>
                        )}
                        <div className="flex flex-col gap-5">
                          {week.sessions.map((session, sIdx) => (
                            <div key={sIdx} className="flex flex-col gap-1">
                              <h4 className="text-[#00f0ff] font-bold tracking-wide uppercase text-sm">{session.title}</h4>
                              <p className="text-neutral-400 text-sm leading-relaxed">{session.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Course Specs */}
        <section>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="w-full bg-gradient-to-br from-[#09090b] to-[#051024] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_0_40px_rgba(0,240,255,0.05)]"
          >
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Start Date</p>
              <p className="text-2xl font-black text-white uppercase tracking-tight">Mid-July 2026 <span className="text-[#00f0ff] text-sm tracking-widest block sm:inline mt-1 sm:mt-0 sm:ml-2">(Closed Beta)</span></p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Schedule</p>
              <p className="text-2xl font-black text-white uppercase tracking-tight">3 Days / Wk <span className="text-neutral-400 text-sm tracking-widest block sm:inline mt-1 sm:mt-0 sm:ml-2">(60-min Sessions)</span></p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Cost</p>
              <p className="text-2xl font-black text-[#10b981] uppercase tracking-tight">100% Free.</p>
              <p className="text-[10px] font-mono text-neutral-500 max-w-[200px] mx-auto md:mx-0 leading-tight uppercase tracking-wider">Tradition 7: Self-supporting through our own effort.</p>
            </div>
          </motion.div>
        </section>

        {/* NEW SECTION 1: Meet the Architect */}
        <section className="grid md:grid-cols-2 gap-12 items-center bg-[#09090b] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,107,0,0.15)]">
            <Image 
              src="/images/ai4aa/the_architect_real.png" 
              alt="The Architect" 
              fill
              className="object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-col gap-6 text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-[#f59e0b]">ARCHITECT</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-medium italic">
              "I'm not a tech guru—I’m a guy in the trench. After burning out from high-level tech operations, I used these exact AI tools to rebuild my own biological baseline. I’m not teaching theory; I’m sharing the blueprints that saved my sobriety. I'm building this alongside you."
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-1 bg-[#ff6b00] rounded-full"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">— Michael T. (The Empathy Bridge)</span>
            </div>
          </div>
        </section>

        {/* NEW SECTION 2: The Vanguard Safety Promise */}
        <section className="flex flex-col gap-12 pt-8">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">THE VANGUARD SAFETY PROMISE</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Risk Reversal protocols enabled.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#050505] border border-[#10b981]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:bg-[#10b981]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">Sobriety First</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">We build tech to serve our lives, not escape them. We teach you how to turn it off.</p>
            </div>
            <div className="bg-[#050505] border border-[#00f0ff]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:bg-[#00f0ff]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#00f0ff]" />
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">No Screen Addiction</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">Strict 60-minute coding caps and a 9:00 PM digital curfew.</p>
            </div>
            <div className="bg-[#050505] border border-[#a855f7]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:bg-[#a855f7]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#a855f7]" />
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">Anonymity Guaranteed</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">Your telemetry, your data, your recovery. We respect Tradition 11 & 12.</p>
            </div>
          </div>
        </section>

        {/* NEW SECTION 3: Vanguard Evidence */}
        <section className="w-full bg-[#051024] border border-[#00f0ff]/20 rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00f0ff]/10 rounded-full border border-[#00f0ff]/20 w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="text-[#00f0ff] text-xs font-mono font-bold tracking-widest uppercase">Live Ticker</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              12 Initiates Currently<br className="hidden md:block"/> Building Their Baseline
            </h2>
          </div>
          
          <div className="flex-1 relative z-10 w-full">
            <div className="bg-[#09090b]/80 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-white/5" />
              <p className="text-lg md:text-xl text-neutral-300 italic font-medium leading-relaxed relative z-10 text-center">
                "Finally, a way to use tech that doesn't trigger me. It feels like a tool, not a trap."
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-neutral-400" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff]">Anonymous Beta Initiate</span>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION 4: Proof of Life */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">REAL PROJECTS. <span className="text-[#10b981]">REAL RESULTS.</span></h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Proof of Life (Visual Output)</p>
          </div>
          
          <div className="w-full relative rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
            <div className="relative aspect-video w-full">
              <Image src="/images/ai4aa/curriculum_app_real.png" alt="Sample Dashboard" fill className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-[#050505] to-transparent">
              <div className="bg-[#09090b]/80 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
                <p className="text-neutral-200 text-sm md:text-base font-medium text-center md:text-left">
                  <span className="text-[#10b981] font-bold uppercase tracking-wide mr-2">Sample Project:</span> 
                  A custom sober-tracking dashboard built in under 60 minutes by an Initiate using the AI Mirror method.
                </p>
                <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  <Activity className="w-4 h-4 text-[#10b981]" /> Deployed
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Onboarding Diagnostic */}
        <section id="registration" className="scroll-mt-32 max-w-4xl mx-auto w-full pb-24 relative z-10">
          <div className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff6b00] via-[#00f0ff] to-[#10b981]"></div>
            
            <div className="mb-10 text-center flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Initialize Registration:<br/><span className="text-[#00f0ff]">AI4AA Foundation</span></h2>
              <p className="text-xs font-mono text-neutral-400 bg-neutral-900/50 p-4 rounded-xl border border-white/5 uppercase tracking-widest leading-relaxed">
                <span className="text-[#ff6b00] font-black">Disclaimer:</span> We respect Tradition 11 and 12 regarding anonymity at the public level. Use a pseudonym if you prefer; we only care about the baseline.
              </p>
            </div>

            <div className="flex justify-center mt-12 mb-4">
              <button
                onClick={login}
                className="w-full md:w-auto px-12 py-6 bg-white hover:bg-neutral-200 text-black font-black text-lg md:text-xl uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex justify-center items-center gap-4 group"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                Authenticate with Google <span className="hidden sm:inline font-mono text-sm text-neutral-500 font-bold ml-2">(Secure Workspace)</span>
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#051024] py-8 mt-20 relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="AAfiends Logo" className="w-8 h-8 rounded-lg grayscale opacity-70" />
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-1 uppercase">
              AA<span className="text-[#ff6b00]">fiends</span> <span className="text-neutral-500 font-mono ml-1">/ AI4AA</span>
            </div>
          </Link>

          <div className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-widest flex items-center gap-6">
            <span>&copy; {new Date().getFullYear()} AAfiends</span>
            <span className="hidden sm:inline">Protocol 1.0</span>
            <a 
              href="https://ubuild.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00f0ff] hover:text-white transition-colors flex items-center gap-1.5"
            >
              Built by ubuild.pro
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
