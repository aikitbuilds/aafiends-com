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
        className="fixed bottom-6 right-6 z-50 print:hidden bg-[#e0a45c] hover:bg-[#c98f45] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(232,163,61,0.3)] transition-transform active:scale-95"
        aria-label="Give Feedback"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] print:hidden flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#1d231d] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d231d] bg-[#141814]">
              <h3 className="font-semibold text-[#f2efe6] text-sm flex items-center gap-2">
                <MessageSquare size={16} className="text-[#e0a45c]" />
                Book Feedback
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#7d7a70] hover:text-[#f2efe6] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#4cc07a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-[#4cc07a]" />
                  </div>
                  <h4 className="text-[#f2efe6] font-bold text-xl mb-2">Message Sent</h4>
                  <p className="text-[#b8b4a6]">Thank you for your feedback. We read every word.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <p className="text-sm text-[#b8b4a6] mb-2">
                    Notice something confusing? Have an idea? Tell us what you think while it's fresh.
                  </p>
                  
                  {/* Honeypot */}
                  <div className="hidden">
                    <label>Website</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#7d7a70] mb-1.5 ml-1">
                      Message <span className="text-[#e0a45c]">*</span>
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-xl p-4 text-[#f2efe6] placeholder:text-[#7d7a70] focus:outline-none focus:border-[#e0a45c]/50 focus:ring-1 focus:ring-[#e0a45c]/50 transition-all min-h-[140px] resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#7d7a70] mb-1.5 ml-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="If you want a reply..."
                      className="w-full bg-[#0d0f0d] border border-[#1d231d] rounded-xl px-4 py-3 text-[#f2efe6] placeholder:text-[#7d7a70] focus:outline-none focus:border-[#e0a45c]/50 focus:ring-1 focus:ring-[#e0a45c]/50 transition-all"
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
                    className="w-full mt-4 bg-[#e0a45c] hover:bg-[#c98f45] disabled:opacity-50 disabled:hover:bg-[#e0a45c] text-black font-semibold text-sm py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
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
