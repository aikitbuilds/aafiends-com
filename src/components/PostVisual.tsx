"use client";

import { Brain, Moon, Sparkles, Snowflake, Activity, Radar, PenTool, type LucideIcon } from "lucide-react";
import { PillarAccent } from "@/lib/blogData";

/**
 * Code-generated "hero image" for each blog post — added 2026-07-04. There's
 * no photoreal image generator available in this environment, so instead of
 * a stock photo every post gets a gradient + icon treatment keyed to its
 * pillar color, used as both the list-card thumbnail and the detail-page
 * hero. Same component, different height via the `variant` prop.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  moon: Moon,
  sparkles: Sparkles,
  snowflake: Snowflake,
  activity: Activity,
  radar: Radar,
  "pen-tool": PenTool,
};

// `dot` is a separate literal class (not derived from `bg` via string
// manipulation) because Tailwind's static scanner only picks up class names
// that appear verbatim in source — a runtime .replace() on "bg-red-500/10"
// would produce "bg-red-500" as a string, but that exact token never
// appears in the file, so the utility wouldn't be generated.
export const PILLAR_STYLES: Record<PillarAccent, { label: string; text: string; bg: string; border: string; dot: string; glow: string }> = {
  engine: { label: "Engine", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", dot: "bg-red-500", glow: "rgba(239,68,68,0.35)" },
  mirror: { label: "Mirror", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", dot: "bg-blue-500", glow: "rgba(59,130,246,0.35)" },
  network: { label: "Network", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", dot: "bg-purple-500", glow: "rgba(168,85,247,0.35)" },
  cross: { label: "Ecosystem", text: "text-[#10b981]", bg: "bg-[#10b981]/10", border: "border-[#10b981]/20", dot: "bg-[#10b981]", glow: "rgba(16,185,129,0.35)" },
};

export default function PostVisual({
  icon,
  pillar,
  variant = "card",
}: {
  icon: string;
  pillar: PillarAccent;
  variant?: "card" | "hero";
}) {
  const Icon = ICON_MAP[icon] || Sparkles;
  const style = PILLAR_STYLES[pillar];
  const iconSize = variant === "hero" ? 72 : 40;

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-[#050505]`}
      style={{
        backgroundImage: `radial-gradient(circle at 30% 20%, ${style.glow}, transparent 60%), radial-gradient(circle at 80% 80%, ${style.glow}, transparent 55%)`,
      }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
      />
      <div className={`relative z-10 rounded-3xl ${style.bg} border ${style.border} flex items-center justify-center`} style={{ width: iconSize * 1.8, height: iconSize * 1.8 }}>
        <Icon className={style.text} size={iconSize} strokeWidth={1.5} />
      </div>
    </div>
  );
}
