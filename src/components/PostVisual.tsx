import Image from "next/image";
import { PHOTOS, type Photo } from "@/lib/photos";
import type { BlogPost, PillarAccent } from "@/lib/blogData";

/**
 * The lead photograph for a post — "Dawn Ledger" (August 2026 redesign).
 *
 * This used to be a gradient-and-icon tile: a radial halo behind a lucide
 * glyph in a rounded box. DESIGN.md retires that shape twice over (radial
 * background glows, decorative icon tiles) and replaces it with the thing the
 * whole world is built on — a documentary photograph of a person mid-journey.
 *
 * Posts are mapped to the shared library in src/lib/photos.ts, by slug first,
 * then by series, then by pillar, so a new post always lands on something
 * defensible instead of nothing.
 *
 * NOTE on `heroImage`: both long-form series ship a code-drawn `.svg` under
 * /public/blog — a see-saw, a ticker tape, a phantom clock. Those are
 * diagrams, not photography: they have no person in them and carry no alt
 * text, so they cannot open an article under the rule that every image
 * describes a person and a moment. They stay in the data and stay available
 * to BlogContent as inline figures; the masthead gets a face.
 *
 * The image is rendered here rather than through <Figure> because a lead
 * needs a top-biased crop — several library photos are 4:5 portraits, and
 * centre-cropping those to 16:9 cuts the subject's face.
 */

const BY_SLUG: Record<string, Photo> = {
  /* ── The original science posts ─────────────────────────── */
  "90-day-brain-reset": PHOTOS.dawnRoad,
  "sleep-undoes-a-week": PHOTOS.kitchenJournal,
  "dose-framework": PHOTOS.trailGroup,
  "cold-heat-hard-miles": PHOTOS.coldLake,
  "recovery-score-science": PHOTOS.bridgeRunner,
  "relapse-prediction": PHOTOS.windowStillness,
  "handwriting-vs-typing": PHOTOS.writingHands,

  /* ── The Dopamine Trap ──────────────────────────────────── */
  "dopamine-trap-the-balance": PHOTOS.carTalk,
  "dopamine-trap-alcohol": PHOTOS.porchSteps,
  "dopamine-trap-painkillers": PHOTOS.meetingCircle,
  "dopamine-trap-gaming": PHOTOS.lateLearning,
  "dopamine-trap-shopping": PHOTOS.carTalk,
  "dopamine-trap-social-media": PHOTOS.nightCall,

  /* ── The Synthetic Void ─────────────────────────────────── */
  "synthetic-void-end-of-scarcity": PHOTOS.nightCall,
  "synthetic-void-chemical-numb-out": PHOTOS.nightCall,
  "synthetic-void-casino-of-everything": PHOTOS.lateLearning,
  "synthetic-void-suicide-of-the-will": PHOTOS.nightCall,
  "synthetic-void-system-refactor": PHOTOS.dawnRoad,

  /* ── The /90rr DOSE field guides ────────────────────────── */
  fuel: PHOTOS.kitchenFuel,
  reset: PHOTOS.coldLake,
  meditation: PHOTOS.windowStillness,
  "daily-dose": PHOTOS.gymLift,
};

/** Series-level fallback, so a new chapter inherits the series' look. */
const BY_CATEGORY: Record<string, Photo> = {
  "The Dopamine Trap": PHOTOS.carTalk,
  "The Synthetic Void": PHOTOS.nightCall,
};

/** Last resort: the pillar the post belongs to. */
const BY_PILLAR: Record<PillarAccent, Photo> = {
  engine: PHOTOS.bridgeRunner,
  mirror: PHOTOS.kitchenJournal,
  network: PHOTOS.meetingCircle,
  cross: PHOTOS.dawnRoad,
};

export type LeadPost = Pick<BlogPost, "slug" | "pillar"> & { category?: string };

/** The photograph that opens this post. Always returns something real. */
export function postPhoto(post: LeadPost): Photo {
  return (
    BY_SLUG[post.slug] ??
    (post.category ? BY_CATEGORY[post.category] : undefined) ??
    BY_PILLAR[post.pillar]
  );
}

export default function PostVisual({
  post,
  priority = false,
  className = "",
}: {
  post: LeadPost;
  priority?: boolean;
  className?: string;
}) {
  const photo = postPhoto(post);

  return (
    <figure
      className={`relative aspect-[16/9] overflow-hidden rounded-[14px] bg-[#141814] ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 980px"
        className="object-cover object-[center_32%]"
      />
    </figure>
  );
}
