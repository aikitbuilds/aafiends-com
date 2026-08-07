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
  { time: "9:00 AM", title: "Welcome & Introduction", desc: "Meet the cohort and set the tone for the day.", icon: Sun, color: "#e0a45c" },
  { time: "10:00 AM", title: "The Journal System — Deep Dive + Q&A", desc: "How the daily pages, the three pillars, and your VSE score actually work.", icon: BookOpen, color: "#4cc07a" },
  { time: "11:00 AM", title: "Walk & Talk", desc: "Get moving on the trail with healthy snacks — movement is Pillar 1.", icon: Footprints, color: "#4cc07a" },
  { time: "12:00 PM", title: "Lunch & Sharing", desc: "Lunch provided. Break bread and tell your story.", icon: Utensils, color: "#e0a45c" },
  { time: "1:00 PM", title: "The AA Meeting Framework", desc: "How we lean on the Steps and Traditions to hold the line.", icon: Users, color: "#a88fc4" },
  { time: "2:00 PM", title: "The A.I.V. Deep Dive", desc: "One virus, many faces — and the firewall that starves it.", icon: Biohazard, color: "#c2603f" },
  { time: "3:00 PM", title: "Personal Sharing Time", desc: "Open, honest space with the group.", icon: MessageCircle, color: "#7fb3a3" },
  { time: "4:00 PM", title: "Wrap-Up & Open Floor", desc: "Whatever comes up — questions, connection, and next steps together.", icon: Flag, color: "#4cc07a" },
];

const PARK_PHOTOS = ["/park1.jpg", "/park2.jpg", "/park3.jpg"];

export default function AlphaClassDay() {
  return (
    <section className="w-full flex flex-col gap-24">
      {/* THE DAY — SCHEDULE */}
      <div className="flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-[#e0a45c]/10 border border-[#e0a45c]/30 text-xs text-[#e0a45c] font-mono font-bold">
            <Coffee size={14} /> The Alpha Class Day · 9 AM – 4 PM
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#f2efe6] tracking-tight leading-none">The Day, Hour by Hour</h2>
          <p className="text-[#b8b4a6] font-mono text-xs">Tentative — final times shared with your cohort.</p>
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
                  {i < SCHEDULE.length - 1 && <div className="w-px flex-1 bg-[#1d231d] my-1" />}
                </div>
                {/* content */}
                <div className="pb-8 flex-1">
                  <div className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.time}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#f2efe6] tracking-tight mt-1">{s.title}</h3>
                  <p className="text-sm text-[#b8b4a6] leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* THE SETTING — PARK */}
      <div className="flex flex-col gap-8">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#f2efe6] tracking-tight leading-none">The Setting</h2>
          <p className="text-[#b8b4a6] font-mono text-xs">Outdoors, in the trees — where the nervous system settles.</p>
        </div>

        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-3 gap-4">
          {PARK_PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1d231d] bg-[#141814]">
              <img src={src} alt={`Park venue ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0d]/60 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto w-full bg-[#141814] border border-[#1d231d] rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-3 text-[#4cc07a]">
            <MapPin size={22} />
            <div>
              <div className="text-[#f2efe6] font-semibold tracking-tight">Mary Jo Peckham Park</div>
              <div className="text-xs font-mono text-[#7d7a70]">Katy, TX</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#1d231d]" />
          <div className="flex flex-wrap gap-3 text-sm text-[#b8b4a6]">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141814] border border-[#1d231d]"><Trees size={14} className="text-[#4cc07a]" /> Shade &amp; trees</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141814] border border-[#1d231d]"><Droplets size={14} className="text-[#7fb3a3]" /> Water</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141814] border border-[#1d231d]">Restrooms on site</span>
          </div>
        </div>
        <p className="text-center text-xs font-mono text-[#7d7a70]">
          Bring: water bottle · yoga mat · walking shoes · healthy snacks. Lunch &amp; more snacks provided.
        </p>
      </div>

      {/* SEE THE JOURNAL */}
      <div className="w-full bg-gradient-to-br from-[#141814] to-[#141814] border border-[#4cc07a]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <span className="text-xs font-mono font-bold text-[#4cc07a] bg-[#4cc07a]/10 px-3 py-1 rounded-full border border-[#4cc07a]/30 w-fit">See the Journal</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#f2efe6] tracking-tight leading-none">Every seat comes with the <span className="text-[#4cc07a]">free 90-day journal</span></h2>
          <p className="text-[#b8b4a6] leading-relaxed">
            A print-ready recovery log built around the three pillars — daily data, meeting notes, a weekly score, and the
            Steps mapped across 90 days. Flip through the full guide online, or download and print it today.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="/90rr/90RR-Journal-Month1-Alpha1.pdf" download className="inline-flex items-center gap-2 bg-[#4cc07a] hover:bg-[#2c7a4d] text-black font-semibold text-sm py-3.5 px-7 rounded-xl transition-colors">
              <BookOpen size={16} /> Download the Journal
            </a>
            <Link href="/90rr" className="inline-flex items-center gap-2 bg-transparent text-[#4cc07a] border border-[#4cc07a]/50 hover:bg-[#4cc07a]/10 font-semibold text-sm py-3.5 px-7 rounded-xl transition-colors">
              See the Full Guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
