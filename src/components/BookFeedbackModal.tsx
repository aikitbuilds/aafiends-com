"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

export default function BookFeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // honeypot caught a bot
    
    if (!message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/book-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setMessage("");
          setEmail("");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 print:hidden bg-[#e8a33d] hover:bg-[#d99228] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(232,163,61,0.3)] transition-transform hover:scale-105 active:scale-95"
        aria-label="Give Feedback"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] print:hidden flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]">
              <h3 className="font-black text-white tracking-widest uppercase text-sm flex items-center gap-2">
                <MessageSquare size={16} className="text-[#e8a33d]" />
                Book Feedback
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-[#10b981]" />
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">Message Sent</h4>
                  <p className="text-neutral-400">Thank you for your feedback. We read every word.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <p className="text-sm text-neutral-400 mb-2">
                    Notice something confusing? Have an idea? Tell us what you think while it's fresh.
                  </p>
                  
                  {/* Honeypot */}
                  <div className="hidden">
                    <label>Website</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5 ml-1">
                      Message <span className="text-[#e8a33d]">*</span>
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#e8a33d]/50 focus:ring-1 focus:ring-[#e8a33d]/50 transition-all min-h-[140px] resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5 ml-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="If you want a reply..."
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#e8a33d]/50 focus:ring-1 focus:ring-[#e8a33d]/50 transition-all"
                    />
                  </div>

                  {status === "error" && (
                    <div className="text-red-400 text-sm mt-2 font-medium">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !message.trim()}
                    className="w-full mt-4 bg-[#e8a33d] hover:bg-[#d99228] disabled:opacity-50 disabled:hover:bg-[#e8a33d] text-black font-black uppercase tracking-widest text-sm py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={18} /> Send Feedback
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
