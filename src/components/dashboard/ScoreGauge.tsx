"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ScoreGaugeProps {
  label: string;
  code: "AC" | "JCI" | "HAS";
  score: number;
  onClick?: () => void;
}

const frameworkColors: Record<string, { stroke: string; fill: string; label: string }> = {
  AC: { stroke: "#3D6B40", fill: "#3D6B40", label: "Accreditation Canada Diamond" },
  JCI: { stroke: "#2A7B88", fill: "#2A7B88", label: "JCI 8ème Édition" },
  HAS: { stroke: "#D4830A", fill: "#D4830A", label: "HAS V2025" },
};

function getStatusColor(score: number): string {
  if (score >= 90) return "#3D6B40";
  if (score >= 70) return "#D4830A";
  return "#9A2830";
}

function getStatusLabel(score: number): string {
  if (score >= 90) return "Conforme";
  if (score >= 70) return "En cours";
  return "À risque";
}

export default function ScoreGauge({ label, code, score, onClick }: ScoreGaugeProps) {
  const fw = frameworkColors[code];
  const statusColor = getStatusColor(score);
  const data = [{ value: score }, { value: 100 - score }];

  return (
    <div
      onClick={onClick}
      style={{
        flex: 1, background: "#FFFFFF",
        border: "1px solid #E2E5EC",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        textAlign: "center",
        position: "relative", overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = fw.stroke; e.currentTarget.style.boxShadow = `0 10px 25px -5px ${fw.stroke}20`; e.currentTarget.style.transform = "translateY(-2px)"; } }}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.borderColor = "#E2E5EC"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)"; e.currentTarget.style.transform = "none"; } }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)`,
      }} />

      {/* Framework code pill */}
      <div style={{
        display: "inline-block",
        padding: "0.2rem 0.6rem",
        background: `${fw.stroke}10`,
        border: `1px solid ${fw.stroke}25`,
        borderRadius: "6px",
        fontSize: "0.65rem", fontWeight: 700, color: fw.stroke,
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: "0.5rem",
      }}>{code}</div>
      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1A2332", marginBottom: "1rem" }}>{fw.label}</div>

      {/* Gauge */}
      <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" startAngle={220} endAngle={-40}
              innerRadius={58} outerRadius={72} dataKey="value" strokeWidth={0}>
              <Cell fill={statusColor} />
              <Cell fill="#F1F5F9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", textAlign: "center",
        }}>
          <div style={{ fontSize: "2.25rem", fontWeight: 800, color: statusColor, lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#8896A6", fontWeight: 600 }}>/ 100</div>
        </div>
      </div>

      {/* Status badge */}
      <div style={{ marginTop: "0.6rem" }}>
        <span style={{
          display: "inline-block", padding: "0.3rem 0.8rem",
          borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 700,
          background: `${statusColor}10`, color: statusColor,
          border: `1px solid ${statusColor}20`,
        }}>{getStatusLabel(score)}</span>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: "1rem", height: "4px", background: "#F1F5F9", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          width: `${score}%`, height: "100%",
          background: `linear-gradient(90deg, ${statusColor}80, ${statusColor})`,
          borderRadius: "2px", transition: "width 0.8s ease",
        }} />
      </div>
      <div style={{ fontSize: "0.65rem", color: "#4A5568", marginTop: "0.4rem", fontWeight: 500 }}>
        {score >= 90 ? "✓ Prêt pour accréditation" : `${100 - score} points restants`}
      </div>
    </div>
  );
}
