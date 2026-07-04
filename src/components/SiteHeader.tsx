"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BuildStamp from "./BuildStamp";

// Nav links pulled into a shared array so the desktop nav and the mobile
// drawer (added 2026-07-03, was previously "hidden md:flex" with zero
// mobile alternative - a real P0 bug, phones had no navigation at all)
// can't drift out of sync. title= doubles as a tooltip on desktop and a
// one-line subtitle on mobile, since "G.A.D." and "Data" are opaque to a
// newcomer on their own.
const NAV_LINKS = [
  { href: "/data", label: "Data", title: "Your telemetry dashboard" },
  { href: "/gad", label: "G.A.D.", title: "Grand Architect Divine — the spiritual framing" },
  { href: "/12-and-12", label: "12 & 12", title: "The 12 Steps & 12 Traditions" },
  { href: "/stories", label: "Stories", title: "Community recovery stories" },
  { href: "/blog", label: "Science", title: "The research behind the app, in plain English" },
];

export default function SiteHeader() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/5 bg-[#051024] shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <img src="/logo.png" alt="AAFiends Logo" className="w-12 h-12 rounded-xl group-hover:scale-105 transition-transform" />
          <div className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
            AA<span className="text-[#10b981]">fiends</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className="text-sm font-bold text-neutral-300 hover:text-[#10b981] transition-colors uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BuildStamp />
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

          {/* Mobile hamburger — the nav above is hidden md:flex, so this is
              the only way to reach any nav link on a phone */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex md:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
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

            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-2xl font-black text-white uppercase tracking-widest">{link.label}</span>
                  <span className="text-xs text-neutral-500 font-mono">{link.title}</span>
                </Link>
              ))}

              {!user && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    login();
                  }}
                  className="mt-6 px-8 py-3 rounded-xl bg-orange-500 text-black text-sm font-black tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.3)]"
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
