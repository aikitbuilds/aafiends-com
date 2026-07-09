import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminMessages from "@/components/AdminMessages";

export const metadata: Metadata = {
  title: "Inbox — AAfiends Admin",
  robots: { index: false, follow: false },
};

export default function AdminMessagesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="border-b border-white/5 bg-[#051024]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white uppercase tracking-widest">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <div className="text-sm font-black tracking-tight text-white uppercase">Admin <span className="text-[#10b981]">Inbox</span></div>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Messages &amp; Feedback</h1>
        <AdminMessages />
      </main>
    </div>
  );
}
