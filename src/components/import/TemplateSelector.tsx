"use client";

import { Download, Table } from "lucide-react";
import type { ImportTemplate } from "@/lib/import-templates";

interface Props {
  templates: ImportTemplate[];
  selected: ImportTemplate;
  onSelect: (t: ImportTemplate) => void;
}

export default function TemplateSelector({ templates, selected, onSelect }: Props) {
  return (
    <div className="card">
      <div className="card-header">Sélection du Template</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1.5rem" }}>
        {templates.map(t => (
          <button
            key={t.code}
            onClick={() => onSelect(t)}
            style={{
              width: "100%", textAlign: "left",
              padding: "0.75rem 1rem",
              background: selected.code === t.code
                ? "var(--green-muted)"
                : "var(--bg)",
              border: `1px solid ${selected.code === t.code ? "var(--green)" : "var(--border)"}`,
              borderRadius: "var(--radius-sm)",
              color: selected.code === t.code ? "var(--green)" : "var(--text-secondary)",
              fontSize: "0.825rem",
              fontWeight: selected.code === t.code ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
            onMouseEnter={e => { if (selected.code !== t.code) { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--border-strong)"; } }}
            onMouseLeave={e => { if (selected.code !== t.code) { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--border)"; } }}
          >
            <Table size={16} style={{ flexShrink: 0, opacity: selected.code === t.code ? 1 : 0.4 }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Template details */}
      <div style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "1.25rem",
      }}>
        <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          {selected.label}
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-body)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
          {selected.description}
        </p>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.65rem", color: "#8896A6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem", fontWeight: 700 }}>
            Colonnes requises
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {selected.columns.map(col => (
              <span key={col} style={{
                padding: "0.15rem 0.5rem",
                background: "#FFFFFF",
                border: "1px solid #E2E5EC",
                borderRadius: "4px",
                fontSize: "0.65rem",
                color: "#1A2332",
                fontFamily: "monospace",
                fontWeight: 600,
              }}>
                {col}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", fontWeight: 800 }}>
            KPIs alimentés
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {selected.kpis.map(kpi => (
              <span key={kpi} className="badge badge-conforme" style={{ fontSize: "0.6rem", padding: "0.15rem 0.5rem" }}>
                {kpi}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Fréquence : </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-primary)", fontWeight: 800 }}>{selected.frequency}</span>
        </div>

        <button className="btn-outline" style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}>
          <Download size={15} />
          Template vide
        </button>
      </div>
    </div>
  );
}
