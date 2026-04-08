"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";

interface ScoreGaugeProps {
  label: string;
  code: "AC" | "JCI" | "HAS";
  score: number;
  onClick?: () => void;
}

const frameworkColors: Record<string, { stroke: string; label: string; gradient: string[] }> = {
  AC:  { stroke: "#3D6B40", label: "Accreditation Canada Diamond", gradient: ["#3D6B40", "#4E8A52"] },
  JCI: { stroke: "#2A7B88", label: "JCI 8ème Édition",            gradient: ["#2A7B88", "#3A9BAA"] },
  HAS: { stroke: "#D4830A", label: "HAS V2025",                   gradient: ["#D4830A", "#F0A030"] },
};

function getStatusColor(score: number): string {
  if (score >= 85) return "#3D6B40";
  if (score >= 70) return "#D4830A";
  return "#9A2830";
}

function getStatusLabel(score: number): string {
  if (score >= 85) return "Conforme";
  if (score >= 70) return "En progression";
  return "À risque";
}

export default function ScoreGauge({ label, code, score, onClick }: ScoreGaugeProps) {
  const fw = frameworkColors[code];
  const statusColor = getStatusColor(score);
  const data = [{ value: score }, { value: 100 - score }];

  return (
    <div
      onClick={onClick}
      className={onClick ? "card card-hover" : "card"}
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "1.75rem 1.5rem 1.5rem",
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "4px",
        background: `linear-gradient(90deg, ${fw.gradient[0]}, ${fw.gradient[1]})`,
      }} />

      {/* Framework pill */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
        <div style={{
          padding: "0.25rem 0.7rem",
          background: `${fw.stroke}12`,
          border: `1px solid ${fw.stroke}25`,
          borderRadius: "6px",
          fontSize: "0.65rem", fontWeight: 800, color: fw.stroke,
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>{code}</div>
        {onClick && (
          <div style={{ color: "var(--text-muted)" }}>
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>
      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
        {fw.label}
      </div>

      {/* Donut gauge */}
      <div style={{ position: "relative", width: "170px", height: "170px", margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={225}
              endAngle={-45}
              innerRadius={62}
              outerRadius={78}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={statusColor} />
              <Cell fill="#F3F4F6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center score */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: statusColor, lineHeight: 1, letterSpacing: "-0.03em" }}>
            {score}
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>/ 100</div>
        </div>
      </div>

      {/* Status badge */}
      <div style={{ marginTop: "0.5rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          padding: "0.3rem 0.875rem",
          borderRadius: "9999px",
          fontSize: "0.7rem", fontWeight: 700,
          background: `${statusColor}10`, color: statusColor,
          border: `1px solid ${statusColor}22`,
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: statusColor, display: "inline-block" }} />
          {getStatusLabel(score)}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: "1.125rem", height: "5px", background: "#F3F4F6", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          width: `${score}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${statusColor}90, ${statusColor})`,
          borderRadius: "3px",
          transition: "width 1s ease",
        }} />
      </div>
      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.4rem", fontWeight: 500 }}>
        {score >= 85 ? "✓ Prêt pour accréditation" : `${100 - score} points restants pour conformité`}
      </div>
    </div>
  );
}
