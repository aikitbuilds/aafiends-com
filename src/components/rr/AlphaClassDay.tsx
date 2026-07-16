// Save to: aafiends.com/src/components/rr/AlphaClassDay.tsx
// Then in src/app/90-r-and-r/page.tsx:
//   import AlphaClassDay from "@/components/rr/AlphaClassDay";
//   ...and render <AlphaClassDay /> right after the "1-Day Intensive Bootcamp" section.
//
// Park photos: drop Park1.jpg, Park2.jpg, Park3.jpg into aafiends.com/public/.
// (Rename the PARK_PHOTOS entries below if you use different filenames.)

import Link from "next/link";
import { Sun, Coffee, Footprints, Utensils, Users, Biohazard, MessageCircle, Flag, Trees, Droplets, MapPin, BookOpen } from "lucide-react";

const SCHEDULE: { time: string; title: string; desc: string; icon: typeof Sun; color: string }[] = [
  { time: "9:00 AM", title: "Welcome & Introduction", desc: "Meet the cohort and set the tone for the day.", icon: Sun, color: "#f59e0b" },
  { time: "10:00 AM", title: "The Journal System — Deep Dive + Q&A", desc: "How the daily pages, the three pillars, and your VSE score actually work.", icon: BookOpen, color: "#10b981" },
  { time: "11:00 AM", title: "Walk & Talk", desc: "Get moving on the trail with healthy snacks — movement is Pillar 1.", icon: Footprints, color: "#10b981" },
  { time: "12:00 PM", title: "Lunch & Sharing", desc: "Lunch provided. Break bread and tell your story.", icon: Utensils, color: "#f59e0b" },
  { time: "1:00 PM", title: "The AA Meeting Framework", desc: "How we lean on the Steps and Traditions to hold the line.", icon: Users, color: "#a855f7" },
  { time: "2:00 PM", title: "The A.I.V. Deep Dive", desc: "One virus, many faces — and the firewall that starves it.", icon: Biohazard, color: "#ef4444" },
  { time: "3:00 PM", title: "Personal Sharing Time", desc: "Open, honest space with the group.", icon: MessageCircle, color: "#00f0ff" },
  { time: "4:00 PM", title: "Wrap-Up & Open Floor", desc: "Whatever comes up — questions, connection, and next steps together.", icon: Flag, color: "#10b981" },
];

const PARK_PHOTOS = ["/park1.jpg", "/park2.jpg", "/park3.jpg"];

export default function AlphaClassDay() {
  return (
    <section className="w-full flex flex-col gap-24">
      {/* THE DAY — SCHEDULE */}
      <div className="flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs text-[#f59e0b] font-mono uppercase tracking-widest font-bold">
            <Coffee size={14} /> The Alpha Class Day · 9 AM – 4 PM
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The Day, Hour by Hour</h2>
          <p className="text-neutral-400 font-mono uppercase tracking-widest text-xs">Tentative — final times shared with your cohort.</p>
        </div>

        <div className="max-w-3xl mx-auto w-full flex flex-col">
          {SCHEDULE.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.time} className="flex gap-5 group">
                {/* time rail */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}1a`, color: s.color, border: `1px solid ${s.color}55` }}>
                    <Icon size={22} />
                  </div>
                  {i < SCHEDULE.length - 1 && <div className="w-px flex-1 bg-white/10 my-1" />}
                </div>
                {/* content */}
                <div className="pb-8 flex-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: s.color }}>{s.time}</div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mt-1">{s.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* THE SETTING — PARK */}
      <div className="flex flex-col gap-8">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The Setting</h2>
          <p className="text-neutral-400 font-mono uppercase tracking-widest text-xs">Outdoors, in the trees — where the nervous system settles.</p>
        </div>

        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-3 gap-4">
          {PARK_PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <img src={src} alt={`Park venue ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto w-full bg-[#09090b] border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-3 text-[#10b981]">
            <MapPin size={22} />
            <div>
              <div className="text-white font-black uppercase tracking-tight">Mary Jo Peckham Park</div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Katy, TX</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"><Trees size={14} className="text-[#10b981]" /> Shade &amp; trees</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"><Droplets size={14} className="text-[#00f0ff]" /> Water</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Restrooms on site</span>
          </div>
        </div>
        <p className="text-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Bring: water bottle · yoga mat · walking shoes · healthy snacks. Lunch &amp; more snacks provided.
        </p>
      </div>

      {/* SEE THE JOURNAL */}
      <div className="w-full bg-gradient-to-br from-[#09090b] to-[#0a140f] border border-[#10b981]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
        <div className="flex-1 flex flex-col gap-4">
          <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30 w-fit">See the Journal</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">Every seat comes with the <span className="text-[#10b981]">free 90-day journal</span></h2>
          <p className="text-neutral-300 leading-relaxed">
            A print-ready recovery log built around the three pillars — daily data, meeting notes, a weekly score, and the
            Steps mapped across 90 days. Flip through the full guide online, or download and print it today.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/90rr/90RR-Journal-Month1-Alpha1.pdf" download className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-black font-black uppercase tracking-widest text-sm py-3.5 px-7 rounded-xl transition-colors">
              <BookOpen size={16} /> Download the Journal
            </a>
            <Link href="/90rr" className="inline-flex items-center gap-2 bg-transparent text-[#10b981] border border-[#10b981]/50 hover:bg-[#10b981]/10 font-black uppercase tracking-widest text-sm py-3.5 px-7 rounded-xl transition-colors">
              See the Full Guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
