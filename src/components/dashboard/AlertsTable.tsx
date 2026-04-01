"use client";

import { DEMO_ALERTS } from "@/lib/demo-data";
import { AlertTriangle, Clock } from "lucide-react";

const priorityConfig = {
  critique: { color: "#9A2830", label: "Critique", bg: "rgba(154,40,48,0.1)" },
  haute: { color: "#D4830A", label: "Haute", bg: "rgba(212,131,10,0.1)" },
  moyenne: { color: "#4A5568", label: "Moyenne", bg: "rgba(74,85,104,0.1)" },
};

const fwColors: Record<string, string> = {
  AC: "#3D6B40",
  JCI: "#2A7B88",
  HAS: "#D4830A",
};

export default function AlertsTable() {
  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <div className="card-header" style={{ marginBottom: "2px" }}>Alertes Actives</div>
          <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>Top 10 non-conformités — priorité décroissante</div>
        </div>
        <div style={{
          background: "rgba(154,40,48,0.08)", border: "1px solid rgba(154,40,48,0.2)",
          borderRadius: "9999px", padding: "0.2rem 0.7rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          <AlertTriangle size={12} color="#9A2830" />
          <span style={{ fontSize: "0.65rem", color: "#9A2830", fontWeight: 700 }}>
            {DEMO_ALERTS.filter(a => a.priority === "critique").length} critiques
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
        {DEMO_ALERTS.map((alert, i) => {
          const pc = priorityConfig[alert.priority];
          const fwColor = fwColors[alert.framework] || "#8896A6";
          return (
            <div key={alert.id} style={{
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
              padding: "0.75rem 0.5rem",
              background: i % 2 === 0 ? "#F8FAFC" : "transparent",
              borderRadius: "0.5rem", marginBottom: "2px",
              borderLeft: `3px solid ${pc.color}`,
              cursor: "pointer", transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = pc.bg)}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#F8FAFC" : "transparent")}
            >
              <div style={{ flexShrink: 0, minWidth: "52px" }}>
                <div style={{
                  padding: "0.2rem 0.35rem", borderRadius: "4px",
                  background: pc.bg, border: `1px solid ${pc.color}35`,
                  fontSize: "0.58rem", fontWeight: 700, color: pc.color,
                  textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px",
                }}>{pc.label}</div>
                <div style={{
                  padding: "0.15rem 0.3rem", borderRadius: "4px",
                  background: `${fwColor}12`, border: `1px solid ${fwColor}30`,
                  fontSize: "0.6rem", color: fwColor, fontWeight: 700, textAlign: "center",
                }}>{alert.framework}</div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1A2332", marginBottom: "2px" }}>
                  {alert.title}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#4A5568", display: "flex", gap: "0.6rem", flexWrap: "wrap", fontWeight: 500 }}>
                  <span>📌 {alert.code}</span>
                  <span>🏥 {alert.department}</span>
                </div>
              </div>

              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                  <Clock size={12} color={alert.daysPastDue > 20 ? "#9A2830" : "#D4830A"} />
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    color: alert.daysPastDue > 20 ? "#9A2830" : "#D4830A",
                  }}>+{alert.daysPastDue}j</span>
                </div>
                <span style={{ fontSize: "0.6rem", color: "#8896A6", fontWeight: 500 }}>dépassé</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
