"use client";

import { DEMO_ALERTS } from "@/lib/demo-data";
import { AlertTriangle, Clock, MapPin, BookmarkCheck } from "lucide-react";

const priorityConfig = {
  critique: { color: "#9A2830", label: "Critique", bg: "rgba(154,40,48,0.08)", dot: "#9A2830" },
  haute:    { color: "#D4830A", label: "Haute",    bg: "rgba(212,131,10,0.08)", dot: "#D4830A" },
  moyenne:  { color: "#4A90D9", label: "Moyenne",  bg: "rgba(74,144,217,0.08)", dot: "#4A90D9" },
};

const fwColors: Record<string, string> = {
  AC:  "#3D6B40",
  JCI: "#2A7B88",
  HAS: "#D4830A",
};

export default function AlertsTable() {
  const critCount = DEMO_ALERTS.filter(a => a.priority === "critique").length;

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <div className="card-header" style={{ marginBottom: "2px" }}>Alertes Actives</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            Top 10 non-conformités · priorité décroissante
          </div>
        </div>
        <div style={{
          background: "rgba(154,40,48,0.10)",
          border: "1px solid rgba(154,40,48,0.22)",
          borderRadius: "9999px",
          padding: "0.2rem 0.75rem",
          display: "flex", alignItems: "center", gap: "5px",
          flexShrink: 0,
        }}>
          <AlertTriangle size={11} color="#9A2830" />
          <span style={{ fontSize: "0.65rem", color: "#9A2830", fontWeight: 700 }}>
            {critCount} critiques
          </span>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "3px" }}>
        {DEMO_ALERTS.map((alert, i) => {
          const pc = priorityConfig[alert.priority as keyof typeof priorityConfig] ?? priorityConfig.moyenne;
          const fwColor = fwColors[alert.framework] ?? "#8896A6";

          return (
            <div
              key={alert.id}
              style={{
                display: "flex", alignItems: "flex-start", gap: "0.75rem",
                padding: "0.7rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid transparent",
                borderLeft: `3px solid ${pc.color}`,
                background: i % 2 === 0 ? "#FAFBFC" : "transparent",
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = pc.bg;
                e.currentTarget.style.borderColor = `${pc.color}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = i % 2 === 0 ? "#FAFBFC" : "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {/* Priority + FW badges */}
              <div style={{ flexShrink: 0, minWidth: "54px", display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "3px",
                  padding: "0.18rem 0.35rem",
                  background: pc.bg, border: `1px solid ${pc.color}30`,
                  borderRadius: "4px",
                  fontSize: "0.57rem", fontWeight: 700, color: pc.color,
                  textTransform: "uppercase", letterSpacing: "0.04em",
                }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: pc.dot, display: "inline-block" }} />
                  {pc.label}
                </div>
                <div style={{
                  padding: "0.15rem 0.3rem",
                  background: `${fwColor}10`, border: `1px solid ${fwColor}28`,
                  borderRadius: "4px",
                  fontSize: "0.6rem", color: fwColor, fontWeight: 700, textAlign: "center",
                }}>{alert.framework}</div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "3px", lineHeight: 1.3 }}>
                  {alert.title}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.64rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                    <BookmarkCheck size={11} color="var(--text-muted)" />
                    {alert.code}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.64rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                    <MapPin size={11} color="var(--text-muted)" />
                    {alert.department}
                  </span>
                </div>
              </div>

              {/* Days overdue */}
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                  <Clock size={11} color={alert.daysPastDue > 20 ? "#9A2830" : "#D4830A"} />
                  <span style={{
                    fontSize: "0.72rem", fontWeight: 800,
                    color: alert.daysPastDue > 20 ? "#9A2830" : "#D4830A",
                  }}>+{alert.daysPastDue}j</span>
                </div>
                <span style={{ fontSize: "0.58rem", color: "var(--text-muted)", fontWeight: 500 }}>dépassé</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
