"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

// Nav is consolidated into 4 top-level items; everything else lives in a
// dropdown (desktop) / accordion (mobile) underneath its parent, so the bar
// stays clean. `children` = a toggle group; a bare `href` = a plain link.
type NavChild = { href: string; label: string; external?: boolean };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "90 R&R",
    children: [
      { href: "/90-r-and-r", label: "Program Overview" },
      { href: "/90rr", label: "Printable Journal" },
      { href: "/12-and-12", label: "12 & 12" },
      { href: "/gad", label: "G.A.D." },
    ],
  },
  {
    label: "The Science",
    children: [
      { href: "/blog#the-dopamine-trap", label: "The Dopamine Trap ★" },
      { href: "/blog", label: "Research" },
      { href: "/data", label: "The Data" },
      { href: "/book1", label: "Book One (Beta)" },
    ],
  },
  {
    label: "Follow",
    children: [
      { href: "https://aafiends.substack.com", label: "Newsletter", external: true },
      { href: "https://www.youtube.com/@aafiends", label: "YouTube", external: true },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const childClass =
  "block px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-neutral-300 hover:text-[#10b981] hover:bg-white/5 transition-colors whitespace-nowrap";

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/5 bg-[#051024] shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
          <Image src="/logo.png" alt="AAfiends Logo" width={48} height={48} className="rounded-xl group-hover:scale-105 transition-transform" />
          <div className="leading-none">
            <div className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
              AA<span className="text-[#10b981]">fiends</span>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500 mt-1">90 Days R&amp;R</div>
          </div>
        </Link>

        {/* Desktop nav — 4 mains, dropdowns on hover/focus */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  className="flex items-center gap-1 text-sm font-bold text-neutral-300 group-hover:text-[#10b981] transition-colors uppercase tracking-widest focus:outline-none"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown size={14} className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150">
                  <div className="min-w-[13rem] rounded-xl border border-white/10 bg-[#0a1428] py-2 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
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
                className="text-sm font-bold text-neutral-300 hover:text-[#10b981] transition-colors uppercase tracking-widest"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-10 w-28 bg-white/5 animate-pulse rounded-lg border border-white/5"></div>
          ) : user ? (
            <div className="text-[11px] font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              ACTIVE
            </div>
          ) : (
            <button
              onClick={login}
              className="hidden sm:block px-6 py-2 rounded-xl bg-orange-500 text-black text-sm font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:bg-orange-400"
            >
              Login
            </button>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            className="flex md:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — accordion groups */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden bg-[#050505]/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
              <div className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                AA<span className="text-[#10b981]">fiends</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-6 py-8">
              {NAV.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-white/5">
                    <button
                      onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-4 text-xl font-black text-white uppercase tracking-widest"
                    >
                      {item.label}
                      <ChevronDown size={20} className={openGroup === item.label ? "rotate-180 text-[#10b981] transition-transform" : "text-neutral-500 transition-transform"} />
                    </button>
                    <AnimatePresence>
                      {openGroup === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col"
                        >
                          {item.children.map((c) => (
                            <ChildLink key={c.href} child={c} onClick={() => setMobileOpen(false)} />
                          ))}
                          <div className="pb-3" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setMobileOpen(false)}
                    className="py-4 border-b border-white/5 text-xl font-black text-white uppercase tracking-widest"
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
                  className="mt-8 px-8 py-3 rounded-xl bg-orange-500 text-black text-sm font-black tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                >
                  Login
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
