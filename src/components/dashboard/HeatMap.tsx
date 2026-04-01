"use client";

import { DEMO_HEATMAP } from "@/lib/demo-data";

function getHeatColor(score: number): string {
  if (score >= 85) return "rgba(61,107,64,0.15)";
  if (score >= 70) return "rgba(212,131,10,0.15)";
  if (score >= 55) return "rgba(154,40,48,0.1)";
  return "rgba(154,40,48,0.2)";
}
function getTextColor(score: number): string {
  if (score >= 85) return "#2D5030";
  if (score >= 70) return "#B26908";
  return "#9A2830";
}

const DEPT_LABELS: Record<string, string> = {
  REA: "Réanimation", URG: "Urgences", BLOC: "Bloc Op.",
  MED: "Méd. Int.", CHIR: "Chirurgie", PHARM: "Pharmacie",
};

export default function HeatMap() {
  const { departments, AC } = DEMO_HEATMAP;
  return (
    <div className="card">
      <div style={{ marginBottom: "1.25rem" }}>
        <div className="card-header" style={{ marginBottom: "2px" }}>Heatmap — Départements × Domaines AC</div>
        <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>Score de conformité par service et domaine (Accreditation Canada)</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "4px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0 0.5rem 0.5rem", fontSize: "0.65rem", color: "#4A5568", fontWeight: 700, width: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Service / Domaine
              </th>
              {AC.domains.map(d => (
                <th key={d} style={{ padding: "0 0.25rem 0.5rem", fontSize: "0.65rem", color: "#4A5568", fontWeight: 700, textAlign: "center", minWidth: "56px" }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, di) => (
              <tr key={dept}>
                <td style={{ padding: "0.4rem 0.5rem", fontSize: "0.75rem", color: "#1A2332", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {DEPT_LABELS[dept] || dept}
                </td>
                {AC.scores[di].map((score, si) => (
                  <td key={si} style={{ padding: "2px" }}>
                    <div style={{
                      background: getHeatColor(score), borderRadius: "6px",
                      padding: "0.5rem 0.25rem", textAlign: "center",
                      fontSize: "0.7rem", fontWeight: 700, color: getTextColor(score),
                      transition: "transform 0.15s", cursor: "pointer", minWidth: "40px",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {score}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: "1.25rem", marginTop: "1rem", justifyContent: "flex-end" }}>
        {[
          { color: "rgba(61,107,64,0.15)", border: "#3D6B40", label: "≥ 85%" },
          { color: "rgba(212,131,10,0.15)", border: "#D4830A", label: "70–84%" },
          { color: "rgba(154,40,48,0.1)", border: "#9A2830", label: "55–69%" },
          { color: "rgba(154,40,48,0.2)", border: "#9A2830", label: "< 55%" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: item.color, border: `1px solid ${item.border}50` }} />
            <span style={{ fontSize: "0.65rem", color: "#4A5568", fontWeight: 500 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
