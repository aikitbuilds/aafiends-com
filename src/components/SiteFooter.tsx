import Link from "next/link";
import Image from "next/image";

const linkClass =
  "text-[15px] text-[#f2efe6] no-underline transition-colors hover:text-[#4cc07a]";
const headClass = "mb-3.5 text-[13.5px] font-semibold text-[#7d7a70]";

export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full border-t border-[#1d231d] bg-[#0d0f0d] pb-10 pt-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Crisis first. Someone reaching the footer at 2am should not have to
            read four columns of marketing before finding a phone number. */}
        <div className="mb-14 flex flex-wrap items-baseline gap-x-7 gap-y-2 rounded-xl border border-[#c2603f]/40 bg-[#c2603f]/[0.07] px-6 py-5">
          <span className="font-semibold text-[#f2efe6]">In crisis right now?</span>
          <span className="text-[15px] text-[#b8b4a6]">
            Call or text{" "}
            <a href="tel:988" className="font-semibold text-[#e0a45c] no-underline hover:underline">
              988
            </a>
          </span>
          <span className="text-[15px] text-[#b8b4a6]">
            Text HOME to{" "}
            <a href="sms:741741&body=HOME" className="font-semibold text-[#e0a45c] no-underline hover:underline">
              741741
            </a>
          </span>
          <span className="text-[15px] text-[#b8b4a6]">
            SAMHSA{" "}
            <a href="tel:18006624357" className="font-semibold text-[#e0a45c] no-underline hover:underline">
              1-800-662-4357
            </a>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={32} height={32} className="rounded-lg" />
              <span className="font-display text-[21px] font-semibold tracking-[-0.01em] text-[#f2efe6]">
                AA<span className="text-[#4cc07a]">fiends</span>
              </span>
            </div>
            <p className="mt-3 max-w-[36ch] text-[15px] text-[#b8b4a6]">
              Data over denial. Rebuilding the system one day at a time. Built by members, for
              members.
            </p>

            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://aafiends.substack.com"
                aria-label="AAfiends on Substack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7a70] transition-colors hover:text-[#f2efe6]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@aafiends"
                aria-label="AAfiends on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7a70] transition-colors hover:text-[#f2efe6]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <p className="font-measure mt-5 max-w-[38ch] text-[12px] leading-relaxed text-[#7d7a70]">
              Keeps the servers on (Tradition 7): Venmo{" "}
              <a
                href="https://www.venmo.com/u/aafiends"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 hover:text-[#e0a45c]"
              >
                @aafiends
              </a>{" "}
              · Zelle{" "}
              <a
                href="mailto:aafiends@gmail.com"
                className="text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 hover:text-[#e0a45c]"
              >
                aafiends@gmail.com
              </a>
            </p>
          </div>

          {/* The program */}
          <div>
            <h4 className={headClass}>The program</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/90rr" className={linkClass}>Free printable journal</Link></li>
              <li><Link href="/protocol" className={linkClass}>BIO 12 protocol</Link></li>
              <li><Link href="/prep90" className={linkClass}>Prep kit</Link></li>
              <li><Link href="/framework" className={linkClass}>The 12 Steps</Link></li>
              <li><Link href="/90-r-and-r" className={linkClass}>The fellowship cohort</Link></li>
            </ul>
          </div>

          {/* The science */}
          <div>
            <h4 className={headClass}>The science</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/the-science" className={linkClass}>D.O.S.E. &amp; the biology</Link></li>
              <li><Link href="/blog" className={linkClass}>Research posts</Link></li>
              <li><Link href="/data" className={linkClass}>The data</Link></li>
              <li><Link href="/book1" className={linkClass}>Book One (beta)</Link></li>
              <li><Link href="/glossary" className={linkClass}>Glossary</Link></li>
            </ul>
          </div>

          {/* More + legal */}
          <div>
            <h4 className={headClass}>More</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/aivy" className={linkClass}>Aivy — the series</Link></li>
              <li><Link href="/ai4aa" className={linkClass}>AI4AA course</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/privacy" className={linkClass}>Privacy &amp; your data</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms &amp; disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* The Fiends Grid — one ecosystem, three fronts. Same three entries,
            same order, on all three sites: diagnosis → treatment → movement. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          <a
            href="https://aivirus.org"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t-2 border-[#1d231d] pt-5 no-underline transition-colors hover:border-[#4cc07a]"
          >
            <span className="font-measure text-[13px] text-[#7d7a70]">aivirus.org</span>
            <h3 className="font-display mt-2 text-[1.3rem] text-[#f2efe6]">The diagnosis</h3>
            <p className="mt-1.5 text-[15px] text-[#b8b4a6]">
              The Addiction Intelligence Virus across 10 vectors, and the firewall that starves it.
            </p>
          </a>
          <div className="block border-t-2 border-[#4cc07a] pt-5">
            <span className="font-measure text-[13px] text-[#4cc07a]">
              aafiends.com · you&rsquo;re here
            </span>
            <h3 className="font-display mt-2 text-[1.3rem] text-[#f2efe6]">The treatment</h3>
            <p className="mt-1.5 text-[15px] text-[#b8b4a6]">
              Daily check-ins, the AI Mirror, the BIO 12 protocol, and the ledger that proves it.
            </p>
          </div>
          <a
            href="https://racefiends.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t-2 border-[#1d231d] pt-5 no-underline transition-colors hover:border-[#4cc07a]"
          >
            <span className="font-measure text-[13px] text-[#7d7a70]">racefiends.com</span>
            <h3 className="font-display mt-2 text-[1.3rem] text-[#f2efe6]">The movement</h3>
            <p className="mt-1.5 text-[15px] text-[#b8b4a6]">
              Running accountability with a partner and honest stakes. Movement is pillar one.
            </p>
          </a>
        </div>

        <div className="mt-12 max-w-[76ch] border-t border-[#1d231d] pt-6 text-[13.5px] leading-relaxed text-[#7d7a70]">
          <p>
            AAfiends is peer support, not medical advice, and is not a substitute for professional
            treatment. Not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
          </p>
          <p className="mt-2">
            Contact:{" "}
            <a
              href="mailto:aafiends@gmail.com"
              className="text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 hover:text-[#f2efe6]"
            >
              aafiends@gmail.com
            </a>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} AAfiends. Built by members, for members. Data over denial.
          </p>
        </div>
      </div>
    </footer>
  );
}
