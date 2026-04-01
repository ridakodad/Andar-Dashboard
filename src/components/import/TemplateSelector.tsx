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

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "1.25rem" }}>
        {templates.map(t => (
          <button
            key={t.code}
            onClick={() => onSelect(t)}
            style={{
              width: "100%", textAlign: "left",
              padding: "0.6rem 0.875rem",
              background: selected.code === t.code
                ? "rgba(61,107,64,0.12)"
                : "#F8FAFC",
              border: selected.code === t.code
                ? "1px solid rgba(61,107,64,0.3)"
                : "1px solid transparent",
              borderRadius: "0.5rem",
              color: selected.code === t.code ? "#2D5030" : "#4A5568",
              fontSize: "0.8rem",
              fontWeight: selected.code === t.code ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={e => { if (selected.code !== t.code) { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "#1A2332"; } }}
            onMouseLeave={e => { if (selected.code !== t.code) { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.color = "#4A5568"; } }}
          >
            <Table size={14} style={{ flexShrink: 0, color: selected.code === t.code ? "#3D6B40" : "#8896A6" }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Template details */}
      <div style={{
        background: "rgba(61,107,64,0.05)",
        border: "1px solid rgba(61,107,64,0.15)",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#3D6B40", marginBottom: "0.5rem" }}>
          {selected.label}
        </div>
        <p style={{ fontSize: "0.75rem", color: "#4A5568", marginBottom: "0.75rem" }}>
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

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.65rem", color: "#8896A6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem", fontWeight: 700 }}>
            KPIs alimentés
          </div>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {selected.kpis.map(kpi => (
              <span key={kpi} style={{
                padding: "0.15rem 0.5rem",
                background: "rgba(154,40,48,0.1)",
                border: "1px solid rgba(154,40,48,0.2)",
                borderRadius: "4px",
                fontSize: "0.65rem",
                color: "#9A2830",
                fontWeight: 700,
              }}>
                {kpi}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "1rem" }}>
          <span style={{ fontSize: "0.7rem", color: "#8896A6", fontWeight: 600 }}>Fréquence : </span>
          <span style={{ fontSize: "0.7rem", color: "#1A2332", fontWeight: 700 }}>{selected.frequency}</span>
        </div>

        <button style={{
          width: "100%", marginTop: "1rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          padding: "0.6rem",
          background: "#FFFFFF",
          border: "1px solid #E2E5EC",
          borderRadius: "0.375rem",
          color: "#4A5568",
          fontSize: "0.75rem",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all 0.15s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#3D6B40"; e.currentTarget.style.color = "#3D6B40"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E5EC"; e.currentTarget.style.color = "#4A5568"; }}
        >
          <Download size={14} />
          Télécharger le template vide
        </button>
      </div>
    </div>
  );
}
