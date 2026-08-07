"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

// Nav is consolidated into 4 top-level items; everything else lives in a
// dropdown (desktop) / accordion (mobile) underneath its parent, so the bar
// stays clean. `children` = a toggle group; a bare `href` = a plain link.
type NavChild = { href: string; label: string; external?: boolean };
type NavItem = { label: string; href?: string; children?: NavChild[] };

// Four buckets that mirror the actual journey — Start (get the journal),
// Program (what you run daily), Science (why it works), More (everything else).
// Ordered biology-first: the Science bucket leads with D.O.S.E., and the
// Program bucket leads with the protocol rather than the cohort, so a newcomer
// meets the free thing before the paid thing.
const NAV: NavItem[] = [
  { label: "Start", href: "/90rr" },
  {
    label: "The program",
    children: [
      { href: "/protocol", label: "BIO 12 protocol" },
      { href: "/90rr", label: "Printable journal" },
      { href: "/prep90", label: "Prep kit" },
      { href: "/framework", label: "The 12 Steps" },
      { href: "/90-r-and-r", label: "The fellowship cohort" },
    ],
  },
  {
    label: "The science",
    children: [
      { href: "/the-science", label: "D.O.S.E. & the biology" },
      { href: "/blog", label: "Research posts" },
      { href: "/data", label: "The data" },
      { href: "/book1", label: "Book One (beta)" },
      { href: "/book2", label: "Book Two (draft)" },
    ],
  },
  {
    label: "More",
    children: [
      { href: "/aivy", label: "Aivy — the series" },
      { href: "/watch", label: "Watch" },
      { href: "/ai4aa", label: "AI4AA course" },
      { href: "https://aafiends.substack.com", label: "Newsletter", external: true },
      { href: "https://www.youtube.com/@aafiends", label: "YouTube", external: true },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const childClass =
  "block whitespace-nowrap px-4 py-2.5 text-[14.5px] text-[#b8b4a6] transition-colors hover:bg-[#1d231d] hover:text-[#f2efe6]";

function ChildLink({ child, onClick }: { child: NavChild; onClick?: () => void }) {
  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={childClass} onClick={onClick}>
        {child.label}
      </a>
    );
  }
  return (
    <Link href={child.href} className={childClass} onClick={onClick}>
      {child.label}
    </Link>
  );
}

export default function SiteHeader() {
  const { user, loading, login } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1d231d] bg-[#0d0f0d]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Image src="/logo.png" alt="" width={34} height={34} className="rounded-lg" />
          <span className="font-display text-[21px] font-semibold tracking-[-0.01em] text-[#f2efe6]">
            AA<span className="text-[#4cc07a]">fiends</span>
          </span>
        </Link>

        {/* Desktop nav — 4 mains, dropdowns on hover/focus */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  className="flex items-center gap-1 text-[14.5px] font-medium text-[#b8b4a6] transition-colors group-hover:text-[#f2efe6]"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-0.5 opacity-60 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[14rem] overflow-hidden rounded-xl border border-[#1d231d] bg-[#141814] py-2">
                    {item.children.map((c) => (
                      <ChildLink key={c.href} child={c} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="text-[14.5px] font-medium text-[#b8b4a6] transition-colors hover:text-[#f2efe6]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 rounded-lg border border-[#1d231d] bg-[#141814]" />
          ) : user ? (
            // A real status, stated once. No pulsing dot.
            <span className="font-measure hidden rounded-lg border border-[#2c7a4d] px-3 py-1.5 text-[12px] text-[#4cc07a] sm:inline-block">
              Tracking
            </span>
          ) : (
            <button
              onClick={login}
              className="hidden rounded-[10px] border border-[#1d231d] px-5 py-2 text-[14.5px] font-semibold text-[#f2efe6] transition-colors hover:border-[#2c7a4d] hover:bg-[#141814] sm:block"
            >
              Sign in
            </button>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            className="flex rounded-lg border border-[#1d231d] p-2.5 text-[#b8b4a6] transition-colors hover:text-[#f2efe6] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — accordion groups */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#0d0f0d] md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[#1d231d] px-5">
            <span className="font-display text-[21px] font-semibold text-[#f2efe6]">
              AA<span className="text-[#4cc07a]">fiends</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-[#1d231d] p-2.5 text-[#b8b4a6] transition-colors hover:text-[#f2efe6]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-[#1d231d]">
                  <button
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    className="font-display flex w-full items-center justify-between py-4 text-[1.35rem] text-[#f2efe6]"
                    aria-expanded={openGroup === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      className={
                        openGroup === item.label
                          ? "rotate-180 text-[#4cc07a] transition-transform"
                          : "text-[#7d7a70] transition-transform"
                      }
                    />
                  </button>
                  {openGroup === item.label && (
                    <div className="flex flex-col pb-3">
                      {item.children.map((c) => (
                        <ChildLink key={c.href} child={c} onClick={() => setMobileOpen(false)} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="font-display border-b border-[#1d231d] py-4 text-[1.35rem] text-[#f2efe6]"
                >
                  {item.label}
                </Link>
              )
            )}

            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  login();
                }}
                className="mt-8 rounded-[10px] bg-[#4cc07a] px-7 py-3 text-base font-semibold text-[#08130c]"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
