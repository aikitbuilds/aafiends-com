"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Dev-only tool: injects 21 days of fake Garmin telemetry. Was rendering
// for every signed-in user (including beta testers), which is confusing —
// gated to Michael's own account so beta testers never see a floating
// "[DEV: INJECT GARMIN]" button on what's supposed to be their real data.
const DEV_EMAILS = ["aafiends@gmail.com"];

export default function GarminSimulator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSimulate = async () => {
    if (!user) return;
    setLoading(true);
    setResult(null);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/garmin/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to simulate data");
      
      setResult("Successfully injected 21 days of telemetry.");
    } catch (err: any) {
      setResult("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !DEV_EMAILS.includes(user.email ?? "")) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={handleSimulate}
        disabled={loading}
        className="text-[10px] bg-neutral-900 border border-neutral-700 text-neutral-500 hover:text-emerald-400 px-2 py-1 rounded transition-colors"
      >
        {loading ? "[SIMULATING...]" : "[DEV: INJECT GARMIN]"}
      </button>
      {result && (
        <div className="absolute bottom-full mb-2 left-0 w-48 p-2 bg-neutral-900 border border-neutral-700 text-[10px] text-emerald-400 rounded">
          {result}
        </div>
      )}
    </div>
  );
}
