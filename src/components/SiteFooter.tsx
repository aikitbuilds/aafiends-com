import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#020202] border-t border-white/10 pt-20 pb-8 px-6 text-neutral-400 relative z-20 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

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
          </nav>
        </div>

        {/* Column 3: Legal/Disclaimer */}
        <div className="flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Disclaimer</h4>
            <p className="text-xs leading-relaxed opacity-70">
              AAFiends is not officially affiliated with Alcoholics Anonymous World Services, Inc.
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
