"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Activity } from "lucide-react";

export default function LedgerTab() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "private_vault"),
          orderBy("date", "asc"),
          limit(30)
        );
        
        const snapshot = await getDocs(q);
        const fetchedData: any[] = [];
        
        snapshot.forEach((doc) => {
          const d = doc.data();
          // Previously required BOTH d.hardware AND d.software to plot a day,
          // which meant a real check-in (TelemetryLog -> /api/mirror, writes
          // software.* only) never appeared unless that same day also had
          // Garmin data (from the simulator or Terra). Beta users who never
          // touch the hidden [DEV: INJECT GARMIN] button would see "No
          // Telemetry Found" forever despite checking in daily. Fixed: plot
          // whichever side(s) exist; Recharts simply won't draw a point for
          // an undefined field, so a software-only day still shows its
          // craving/pain line even with no hardware line that day.
          if (!d.date || (!d.hardware && !d.software)) return;
          fetchedData.push({
            date: d.date.slice(5), // e.g. "06-28"
            hrv: d.hardware?.hrv,
            sleepHours: d.hardware?.sleepHours,
            sciaticaPainLevel: d.software?.sciaticaPainLevel,
            cravingIntensity: d.software?.cravingIntensity
          });
        });
        
        setData(fetchedData);
      } catch (err) {
        console.error("Failed to fetch telemetry for Ledger", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse">Loading your chart...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center p-6 text-center gap-2">
        <Activity className="text-neutral-600 mb-2" size={32} />
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">No Check-Ins Yet</p>
        <p className="text-xs text-neutral-600">Complete a check-in above and your chart will fill in.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-6 gap-6 bg-[#050505]">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-black uppercase text-white tracking-widest flex items-center gap-2">
          Your Trends
        </h3>
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Body vs. Mind, Over Time
        </p>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#4b5563" 
              fontSize={10} 
              tickMargin={10}
              tickLine={false}
              axisLine={false}
            />
            
            {/* Left Y-Axis: Biological Hardware (Green/Positive) */}
            <YAxis 
              yAxisId="left" 
              stroke="#10b981" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax + 20']}
            />
            
            {/* Right Y-Axis: Mental Software (Red/Negative) - domain changed
                from [0, 10] to [0, 5] 2026-07-04 to match the Engine
                check-in's new 1-5 multiple-choice scale (was 1-10 sliders) */}
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#ef4444"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, 5]}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#a1a1aa', fontSize: '10px', marginBottom: '4px' }}
            />
            
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }}
            />

            {/* Hardware Lines */}
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="hrv" 
              name="HRV (ms)" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="sleepHours" 
              name="Sleep (hrs)" 
              stroke="#34d399" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Software Lines */}
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="sciaticaPainLevel" 
              name="Pain (1-5)" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="cravingIntensity" 
              name="Cravings (1-5)" 
              stroke="#f87171" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
