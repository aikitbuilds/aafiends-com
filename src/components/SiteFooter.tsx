import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#020202] border-t border-white/10 pt-20 pb-8 px-6 text-neutral-400 relative z-20 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AAfiends Logo" className="w-10 h-10 rounded-lg" />
            <div className="text-xl font-black tracking-tight text-white flex items-center gap-1 uppercase">
              AA<span className="text-[#10b981]">fiends</span>
            </div>
          </div>
          <p className="text-sm font-mono leading-relaxed max-w-xs mt-2">
            Data Over Denial. Rebuilding the system one day at a time.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Navigation Directory</h4>
          <nav className="flex flex-col gap-3">
            <Link href="/data" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Data</Link>
            <Link href="/gad" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">G.A.D.</Link>
            <Link href="/12-and-12" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">12 & 12</Link>
            <Link href="/stories" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Stories</Link>
            <Link href="/blog" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Science</Link>
            <Link href="/ai4aa" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">AI4AA Course</Link>
            <Link href="/90-r-and-r" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">90 Days R&amp;R</Link>
            <Link href="/90rr" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">90 R&amp;R Journal</Link>
            <Link href="/contact" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase">Contact</Link>
          </nav>
        </div>

        {/* Column 3: The Fiends Grid (ecosystem cross-links) */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">The Fiends Grid</h4>
          <nav className="flex flex-col gap-3">
            <a href="https://racefiends.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-red-400 transition-colors uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span> RaceFiends.com
            </a>
            <a href="https://aivirus.org" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-red-400 transition-colors uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span> AIVirus.org
            </a>
            <a href="https://aivirus.org/bio12" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-[#10b981] transition-colors uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0"></span> BIO 12 Protocol
            </a>
          </nav>
          <p className="text-[10px] text-neutral-600 leading-relaxed mt-1">One recovery ecosystem — the pavement and the diagnosis.</p>
        </div>

        {/* Column 4: Legal/Disclaimer + Crisis */}
        <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Disclaimer &amp; Support</h4>
            <p className="text-xs leading-relaxed">Contact: <a href="mailto:aafiends@gmail.com" className="text-[#10b981] hover:underline">aafiends@gmail.com</a></p>
            <p className="text-xs leading-relaxed opacity-70">
              AAFiends is peer support, not medical advice, and is not a substitute for professional treatment.
              Not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
            </p>
            <p className="text-xs leading-relaxed text-red-300/90 font-bold">
              In crisis? Call or text <a href="tel:988" className="underline hover:text-red-200">988</a> ·
              Text HOME to <a href="sms:741741&body=HOME" className="underline hover:text-red-200">741741</a> ·
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
