"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";

// Gated to Michael's account only — same reasoning as GarminSimulator.tsx:
// beta testers shouldn't see a floating "[DEV]" button on their own dashboard.
const DEV_EMAILS = ["michaelcongtran@gmail.com"];

export default function VanguardTest() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  if (!user || !DEV_EMAILS.includes(user.email ?? "")) return null;

  if (!visible) {
    return (
      <button 
        onClick={() => setVisible(true)}
        className="fixed bottom-2 right-2 text-[8px] text-neutral-800 hover:text-neutral-500 transition-colors z-50"
      >
        [DEV]
      </button>
    );
  }

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/mirror", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({ input })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process");
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-neutral-900 border border-neutral-700 p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase">Vanguard Alpha Test</h3>
        <button onClick={() => setVisible(false)} className="text-neutral-500 hover:text-white">✕</button>
      </div>

      {!user ? (
        <p className="text-xs text-red-400">Must be logged in.</p>
      ) : (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter raw telemetry text..."
            className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded"
          >
            {loading ? "Processing..." : "Send to Vanguard"}
          </button>
        </>
      )}

      {error && <p className="text-xs text-red-500 font-mono break-words border border-red-900/50 p-2 rounded bg-red-900/20">{error}</p>}
      {result && (
        <div className="text-xs font-mono text-emerald-300 bg-neutral-950 p-2 rounded border border-neutral-800 max-h-48 overflow-y-auto">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
