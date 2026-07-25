import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#020202] border-t border-white/10 pt-20 pb-8 px-6 text-neutral-400 relative z-20 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="AAfiends Logo" width={40} height={40} className="rounded-lg" />
            <div className="text-xl font-black tracking-tight text-white flex items-center gap-1 uppercase">
              AA<span className="text-[#10b981]">fiends</span>
            </div>
          </div>
          <p className="text-sm font-mono leading-relaxed max-w-xs mt-2">
            Data Over Denial. Rebuilding the system one day at a time.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://aafiends.substack.com" aria-label="AA Fiends Substack" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@aafiends" aria-label="AA Fiends YouTube" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://aivirus.org" aria-label="AIVirus.org" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#10b981] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </a>
          </div>
          <a href="https://www.venmo.com/u/aafiends" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex w-fit items-center gap-2 px-4 py-2 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-black uppercase tracking-widest hover:bg-[#f59e0b]/20 transition-colors">
            ☕ Buy me a coffee
          </a>
          <p className="text-[10px] font-mono text-neutral-600 leading-relaxed">
            Venmo <span className="text-neutral-400">@aafiends</span> · Zelle <a href="mailto:aafiends@gmail.com" className="text-[#f59e0b] hover:underline">aafiends@gmail.com</a> · keeps the servers on (Tradition 7).
          </p>
        </div>

        {/* Column 2: The Program + The Science — mirrors the header's four
            buckets so the site has one consistent structure, and lists the
            biology pages ahead of the framework pages throughout. */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">The Program</h4>
          <nav className="flex flex-col gap-2.5">
            <Link href="/90rr" className="text-sm font-black text-white hover:text-[#10b981] transition-colors uppercase">Free Printable Journal</Link>
            <Link href="/protocol" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">BIO 12 Protocol</Link>
            <Link href="/prep90" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Prep Kit</Link>
            <Link href="/framework" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">The 12 Steps</Link>
            <Link href="/90-r-and-r" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">The Fellowship Cohort</Link>
          </nav>

          <h4 className="text-white font-black uppercase tracking-widest text-sm mt-5 mb-2">The Science</h4>
          <nav className="flex flex-col gap-2.5">
            <Link href="/the-science" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">D.O.S.E. &amp; the Biology</Link>
            <Link href="/blog" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Research Posts</Link>
            <Link href="/data" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">The Data</Link>
            <Link href="/book1" className="text-sm font-bold hover:text-[#e8a33d] transition-colors uppercase">Book One (Beta)</Link>
          </nav>

          <h4 className="text-white font-black uppercase tracking-widest text-sm mt-5 mb-2">More</h4>
          <nav className="flex flex-col gap-2.5">
            <Link href="/aivy" className="text-sm font-bold hover:text-purple-400 transition-colors uppercase">Aivy — The Series</Link>
            <Link href="/ai4aa" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">AI4AA Course</Link>
            <Link href="/contact" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Contact</Link>
          </nav>
        </div>

        {/* Column 3: The Fiends Grid. Standardized across all three sites —
            same three cards, same one-line job description, same order:
            diagnosis (AIVirus) → treatment (AAfiends) → movement (RaceFiends). */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">The Fiends Grid</h4>
          <nav className="flex flex-col gap-4">
            <a href="https://aivirus.org" target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1">
              <span className="text-sm font-black text-white group-hover:text-red-400 transition-colors uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span> AIVirus.org
              </span>
              <span className="text-[11px] text-neutral-500 leading-snug pl-3.5">The diagnosis. Understand the threat.</span>
            </a>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-black text-[#10b981] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0"></span> AAfiends.com
              </span>
              <span className="text-[11px] text-neutral-500 leading-snug pl-3.5">The treatment. You are here.</span>
            </div>
            <a href="https://racefiends.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1">
              <span className="text-sm font-black text-white group-hover:text-orange-400 transition-colors uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span> RaceFiends.com
              </span>
              <span className="text-[11px] text-neutral-500 leading-snug pl-3.5">The movement. Carry the standard.</span>
            </a>
          </nav>
          <a href="https://aivirus.org/data" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest mt-1">
            Addiction statistics → all 10 vectors
          </a>
        </div>

        {/* Column 4: Legal/Disclaimer + Crisis */}
        <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Disclaimer &amp; Support</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/glossary" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Glossary</Link>
              <Link href="/faq" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">FAQ</Link>
              <Link href="/privacy" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Privacy &amp; Your Data</Link>
              <Link href="/terms" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Terms &amp; Disclaimer</Link>
            </nav>
            <p className="text-xs leading-relaxed">Contact: <a href="mailto:aafiends@gmail.com" className="text-[#10b981] hover:underline">aafiends@gmail.com</a></p>
            <p className="text-xs leading-relaxed opacity-70">
              AAFiends is peer support, not medical advice, and is not a substitute for professional treatment.
              Not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
            </p>
            <p className="text-xs leading-relaxed text-red-300/90 font-bold">
              In crisis? Call or text <a href="tel:988" className="underline hover:text-red-200">988</a> &middot;
              Text HOME to <a href="sms:741741&body=HOME" className="underline hover:text-red-200">741741</a> &middot;
              SAMHSA <a href="tel:18006624357" className="underline hover:text-red-200">1-800-662-4357</a>
            </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col items-center text-center gap-2 text-xs font-mono tracking-widest opacity-60">
        <span>&copy; {new Date().getFullYear()} AAFiends. Built by members, for members. Data Over Denial.</span>
      </div>
    </footer>
  );
}
