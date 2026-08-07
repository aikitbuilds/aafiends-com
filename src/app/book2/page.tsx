import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual from "@/components/PostVisual";
import { BLOG_SERIES, seriesPosts } from "@/lib/blogData";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  CalloutBand,
  ButtonPrimary,
  ButtonQuiet,
  CtaRow,
} from "@/components/design";

export const metadata: Metadata = {
  title: "Book Two (Draft) — Addicted World: Pleasure and Pain with AI | AAfiends",
  description:
    "Five chapters, published as they're written. What happens to a species that engineered scarcity out of existence and left the reward on tap.",
  alternates: { canonical: "https://aafiends.com/book2" },
};

export default function Book2Page() {
  const syntheticVoidSeries = BLOG_SERIES.find((s) => s.id === "the-synthetic-void");
  const posts = syntheticVoidSeries ? seriesPosts(syntheticVoidSeries) : [];

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.readingTable}
        height="short"
        title={
          <>
            Addicted World: <em>Pleasure and Pain with AI</em>
          </>
        }
        lede="Book Two is being written in public. Five chapters, published as they're written. What happens to a species that engineered scarcity out of existence and left the reward on tap."
        meta={`Book Two · draft · ${posts.length} of 5 chapters published · episodes in production`}
      >
        {posts.length > 0 && (
          <CtaRow>
            <ButtonPrimary href={`/blog/${posts[0].slug}`}>Read chapter 1</ButtonPrimary>
            <ButtonQuiet href="/book1">Read Book One</ButtonQuiet>
          </CtaRow>
        )}
      </PageHero>

      {/* ── Written in public ────────────────────────────────── */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <figure className="overflow-hidden rounded-[14px] bg-[#141814]">
              <div className="relative aspect-[1200/630]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/blog/synthetic-void/series-banner.svg"
                  alt="Series banner for The Synthetic Void, the five-part draft of Book Two"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
            <div>
              <SectionHead>
                Book Two is being <em>written in public.</em>
              </SectionHead>
              <p className="mt-5 max-w-[54ch] text-[#b8b4a6]">
                Book One was about the disease inside one person. This one is about the machine we
                built around all of us: a world that engineered scarcity out of existence and left
                the reward on tap. Each chapter ships here as a draft, and as an episode of{" "}
                <em className="font-display-italic text-[#e0a45c]">The Synthetic Void</em>, before
                any of it is finished. If a chapter is wrong, I&apos;d rather find out now than in
                print.
              </p>
              <p className="font-measure mt-5 text-[12.5px] text-[#7d7a70]">
                — MT · author of AAfiends &amp; The Synthetic Void
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── The chapters ─────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                {posts.length} of five published so far. Each one goes up as a draft the day it is
                written.
              </p>
            }
          >
            The five <em>chapters.</em>
          </SectionHead>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="grid items-center gap-6 border-b border-[#1d231d] px-1 py-7 no-underline transition-colors hover:bg-[#0d0f0d] sm:grid-cols-[16rem_1fr] sm:gap-8"
              >
                <PostVisual post={post} />
                <div>
                  <p className="font-measure text-[13px] text-[#7fb3a3]">
                    Part {index + 1 < 10 ? `0${index + 1}` : index + 1} · {post.date} ·{" "}
                    {post.readTime}
                  </p>
                  <SubHead className="mt-2">{post.title}</SubHead>
                  <p className="mt-3 max-w-[58ch] text-[15px] text-[#b8b4a6]">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── The caveat and the crisis line ───────────────────── */}
      <Section tight>
        <Wrap>
          <p className="max-w-[62ch] text-[#b8b4a6]">
            I&apos;ve got a little sobriety and a lot of miles in this trench &mdash; I&apos;m not
            standing on a mountain with the final answer, and you might read all this and land
            somewhere different. That&apos;s fine. This is just what I&apos;ve learned, and
            what&apos;s held so far.
          </p>
          <p className="font-measure mt-4 max-w-[62ch] text-[13px] text-[#7d7a70]">
            The longer, rawer version of each chapter lands on our Substack,{" "}
            <span className="text-[#f2efe6]">The Deficit</span>.
          </p>

          <CalloutBand tone="urgent" className="mt-10 max-w-[62ch]">
            <p className="font-display text-[1.2rem] leading-tight text-[#f2efe6]">
              In a dark spot? Call or text 988 anytime.
            </p>
            <p className="mt-3 text-[15px] text-[#b8b4a6]">
              Not medical advice. Peer support and personal experience only. AAfiends is not
              affiliated with Alcoholics Anonymous World Services.
            </p>
          </CalloutBand>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
