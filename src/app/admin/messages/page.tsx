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
    <div className="min-h-screen bg-[#0d0f0d] text-[#f2efe6]">
      <div className="border-b border-[#1d231d] bg-[#141814]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-[#b8b4a6] hover:text-[#f2efe6]">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <div className="text-sm font-semibold tracking-tight text-[#f2efe6]">Admin <span className="text-[#4cc07a]">Inbox</span></div>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f2efe6]">Messages &amp; Feedback</h1>
        <AdminMessages />
      </main>
    </div>
  );
}
