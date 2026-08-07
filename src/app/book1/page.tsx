import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BookFeedbackModal from "@/components/BookFeedbackModal";
import { BOOK1_HTML } from "@/data/book1Content";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  CalloutBand,
  ButtonPrimary,
  ButtonQuiet,
  CtaRow,
} from "@/components/design";
import "./book1.css";

const PDF_HREF = "/book1/AIV-Recovery-Field-Manual-Book1.pdf";

const ghostLink =
  "inline-block rounded-[10px] border border-[#f2efe6]/35 px-6 py-[15px] text-base font-semibold text-[#f2efe6] no-underline transition-[border-color,transform] duration-200 hover:border-[#f2efe6] active:scale-[0.98]";

export default function Book1Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <div className="print:hidden">
        <SiteHeader />

        <PageHero
          photo={PHOTOS.readingTable}
          height="short"
          title={
            <>
              The AIV Recovery <em>Field Manual</em>
            </>
          }
          lede="Book One: The Engine — a practical survival guide for healing the hardware first, before you touch the mind or the meetings."
          meta="12 chapters · written by MT · free to read while it’s in beta"
        >
          <CtaRow>
            <ButtonPrimary href="#read">Start reading</ButtonPrimary>
            <a href={PDF_HREF} download className={ghostLink}>
              Download the PDF
            </a>
            <ButtonQuiet href="/contact">Send feedback</ButtonQuiet>
          </CtaRow>
        </PageHero>

        <Section tight>
          <Wrap>
            <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <figure className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[14px] bg-[#141814] lg:mx-0">
                <div className="relative aspect-[2/3]">
                  <Image
                    src="/book1/book1-cover.png"
                    alt="The cover of The AIV Recovery Field Manual, Book One: The Engine"
                    fill
                    sizes="(max-width: 1024px) 70vw, 340px"
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>
              <div>
                <SectionHead
                  lede={
                    <p>
                      The book behind AAfiends &mdash; MT&rsquo;s own recovery, written down.
                      Biology first: sleep, movement, nutrition, and breath. The full beta is free
                      to read right now, in the browser or as a PDF, and every page is looking for
                      your notes before the final edition ships.
                    </p>
                  }
                >
                  Book One: <em>The Engine.</em>
                </SectionHead>
              </div>
            </div>
          </Wrap>
        </Section>
      </div>

      {/* DISCLAIMER — always visible, on screen and in print */}
      <div className="mx-auto w-full max-w-4xl px-5 pb-10 sm:px-8 print:max-w-none print:px-0">
        <CalloutBand
          tone="urgent"
          className="text-sm leading-relaxed text-[#b8b4a6] print:border-black print:bg-white print:text-black"
        >
          <h2 className="font-display text-[1.35rem] leading-tight text-[#f2efe6] print:text-black">
            Disclaimer
          </h2>
          <p className="mt-3">
            This book draws on my own life story, thirty years of lived experience with addiction,
            my personal research, and my ongoing AA sobriety journey. The manuscript was compiled
            and drafted with the help of AI, working from my own notes, journals, and voice
            recordings &mdash; grounded in my own research and in established best practices in
            addiction recovery, exercise and sleep science, and mindfulness-based relapse
            prevention. Every statistic is sourced; every story is either mine or a composite with
            names changed.
          </p>
          <p className="mt-3">
            This is peer support and personal experience, not medical, psychiatric, or clinical
            advice, and it is not a substitute for professional treatment. AAFiends is not
            affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
          </p>
          <p className="font-measure mt-4 text-[13px] text-[#f2efe6] print:text-black">
            In crisis? Call or text{" "}
            <a href="tel:988" className="underline underline-offset-4">
              988
            </a>{" "}
            · Text HOME to{" "}
            <a href="sms:741741&body=HOME" className="underline underline-offset-4">
              741741
            </a>{" "}
            · SAMHSA{" "}
            <a href="tel:18006624357" className="underline underline-offset-4">
              1-800-662-4357
            </a>
          </p>
        </CalloutBand>
      </div>

      {/* THE BOOK — paper surface, print-friendly, id="read" for the hero CTA anchor */}
      <section id="read" className="w-full bg-[#f9f6f0] print:bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 print:max-w-none print:px-0 print:py-0">
          <div className="book1-content" dangerouslySetInnerHTML={{ __html: BOOK1_HTML }} />
        </div>
      </section>

      <div className="print:hidden">
        <Section tight className="border-t border-[#1d231d]">
          <Wrap>
            <SectionHead
              lede={
                <p>
                  If something felt generic, confusing, or worth cutting &mdash; tell me. That
                  feedback shapes the final edition and Books Two and Three.
                </p>
              }
            >
              This is a <em>beta.</em>
            </SectionHead>
            <CtaRow>
              <a href={PDF_HREF} download className={ghostLink}>
                Download the PDF
              </a>
              <Link
                href="/contact"
                className="inline-block rounded-[10px] bg-[#4cc07a] px-6 py-[15px] text-base font-semibold text-[#08130c] no-underline transition-[background-color,transform] duration-200 hover:bg-[#5fd08c] active:scale-[0.98]"
              >
                Send feedback
              </Link>
            </CtaRow>
          </Wrap>
        </Section>
        <SiteFooter />
      </div>

      <BookFeedbackModal />
    </div>
  );
}
