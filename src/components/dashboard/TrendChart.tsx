"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DEMO_HISTORICAL_SCORES } from "@/lib/demo-data";

interface TooltipPayload { color: string; name: string; value: number; }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string; }

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid #E2E5EC", borderRadius: "0.5rem",
      padding: "0.875rem 1rem", fontSize: "0.8rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}>
      <p style={{ color: "#1A2332", marginBottom: "0.5rem", fontWeight: 700 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
          <span style={{ color: "#4A5568", fontWeight: 500 }}>{p.name}:</span>
          <span style={{ color: p.color, fontWeight: 800 }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart() {
  const legend = [
    { label: "AC", color: "#3D6B40" },
    { label: "JCI", color: "#2A7B88" },
    { label: "HAS", color: "#D4830A" },
  ];
  return (
    <div className="card" style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <div className="card-header" style={{ marginBottom: "2px" }}>Évolution de la Conformité</div>
          <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>Tendance sur 12 mois — 3 référentiels</div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {legend.map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "3px", background: f.color, borderRadius: "2px" }} />
              <span style={{ fontSize: "0.7rem", color: "#4A5568", fontWeight: 700 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={DEMO_HISTORICAL_SCORES} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#8896A6", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
          <YAxis domain={[50, 100]} tick={{ fill: "#8896A6", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="AC" stroke="#3D6B40" strokeWidth={3}
            dot={{ fill: "#FFFFFF", stroke: "#3D6B40", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0, fill: "#3D6B40" }} />
          <Line type="monotone" dataKey="JCI" stroke="#2A7B88" strokeWidth={3}
            dot={{ fill: "#FFFFFF", stroke: "#2A7B88", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0, fill: "#2A7B88" }} />
          <Line type="monotone" dataKey="HAS" stroke="#D4830A" strokeWidth={3}
            dot={{ fill: "#FFFFFF", stroke: "#D4830A", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0, fill: "#D4830A" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
