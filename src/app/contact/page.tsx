import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import CrisisSupport from "@/components/CrisisSupport";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  EditorialList,
  EditorialRow,
  PullQuote,
} from "@/components/design";

export const metadata: Metadata = {
  title: "Contact AAfiends — Questions, Feedback & the 90 R&R Fellowship",
  description:
    "Get in touch with AAfiends. Questions about the 90 Days R&R recovery journal, the Fellowship cohort, feedback, or partnerships — reach us at aafiends@gmail.com or send a message.",
  alternates: { canonical: "https://aafiends.com/contact" },
  openGraph: {
    title: "Contact AAfiends",
    description: "Questions, feedback, or the 90 R&R Fellowship — reach us at aafiends@gmail.com.",
    url: "https://aafiends.com/contact",
    siteName: "AAfiends",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      {/* Someone landing here may be reaching out in a bad moment, so the
          photograph is the night call and the crisis numbers come first. */}
      <PageHero
        photo={PHOTOS.nightCall}
        height="short"
        title={
          <>
            Talk <em>to us.</em>
          </>
        }
        lede={
          <>
            Questions about the journal or the Fellowship, feedback, an idea, or you just want to
            say hi — we read every message. Reach us any time at{" "}
            <a
              href="mailto:aafiends@gmail.com"
              className="text-[#f2efe6] underline decoration-[#f2efe6]/40 underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
            >
              aafiends@gmail.com
            </a>
            .
          </>
        }
      />

      <Section tight>
        <Wrap>
          <CrisisSupport />
        </Wrap>
      </Section>

      <Section band tight>
        <Wrap>
          <SectionHead lede={<p>A human in recovery reads every message that comes through.</p>}>
            Send us <em>a message.</em>
          </SectionHead>
          <div className="mt-10 max-w-[72ch]">
            <ContactForm />
          </div>
        </Wrap>
      </Section>

      <Section tight>
        <Wrap>
          <PullQuote>You reached out. That&rsquo;s the hardest rep.</PullQuote>
        </Wrap>
      </Section>

      <Section band tight>
        <Wrap>
          <SectionHead>
            Other ways <em>to reach us.</em>
          </SectionHead>
          <EditorialList>
            <EditorialRow
              href="mailto:aafiends@gmail.com"
              title="Email"
              body="aafiends@gmail.com — questions about the journal or the Fellowship, feedback, ideas, partnerships."
              go="Write to us"
              external
            />
            <EditorialRow
              href="/90rr"
              title="Get the free journal"
              body="Download the 90 R&R workbook — printable, no signup, nothing to install."
              go="The journal"
            />
          </EditorialList>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
