"use client";

import { useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle, Loader2 } from "lucide-react";
import type { ParsedRow } from "@/lib/import-templates";

interface Props {
  data: ParsedRow[];
  columns: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

function getCellStatus(value: unknown, col: string): "ok" | "warn" | "error" {
  if (value === null || value === undefined || value === "") return "error";
  if (col === "date") {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return "error";
  }
  if (col === "taux") {
    const n = Number(value);
    if (isNaN(n) || n < 0 || n > 100) return "warn";
  }
  return "ok";
}

export default function DataPreview({ data, columns, onConfirm, onCancel }: Props) {
  const preview = data.slice(0, 10);

  const { errorCount, warningCount } = useMemo(() => {
    let errorCount = 0;
    let warningCount = 0;
    for (const row of preview) {
      for (const col of columns) {
        const s = getCellStatus(row[col], col);
        if (s === "error") errorCount++;
        else if (s === "warn") warningCount++;
      }
    }
    return { errorCount, warningCount };
  }, [preview, columns]);

  const cellBorderColor = (status: "ok" | "warn" | "error"): string => {
    if (status === "error") return "rgba(154,40,48,0.3)";
    if (status === "warn") return "rgba(212,131,10,0.3)";
    return "transparent";
  };
  const cellBg = (status: "ok" | "warn" | "error"): string => {
    if (status === "error") return "rgba(154,40,48,0.08)";
    if (status === "warn") return "rgba(212,131,10,0.08)";
    return "transparent";
  };
  const cellTextColor = (status: "ok" | "warn" | "error"): string => {
    if (status === "error") return "#9A2830";
    if (status === "warn") return "#D4830A";
    return "#1A2332";
  };

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <div className="card-header" style={{ marginBottom: "2px" }}>Prévisualisation des Données</div>
          <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>
            {data.length} lignes trouvées — aperçu des 10 premières
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {errorCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9A2830", fontSize: "0.75rem", fontWeight: 600 }}>
              <XCircle size={15} />
              <span>{errorCount} erreur{errorCount > 1 ? "s" : ""}</span>
            </div>
          )}
          {warningCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#D4830A", fontSize: "0.75rem", fontWeight: 600 }}>
              <AlertCircle size={15} />
              <span>{warningCount} avertissement{warningCount > 1 ? "s" : ""}</span>
            </div>
          )}
          {errorCount === 0 && warningCount === 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#3D6B40", fontSize: "0.75rem", fontWeight: 600 }}>
              <CheckCircle2 size={15} />
              <span>Données valides</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ overflowX: "auto", marginBottom: "1.25rem", borderRadius: "0.5rem", border: "1px solid #E2E5EC" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {columns.map(col => (
                <th key={col} style={{
                  padding: "0.6rem 0.75rem", textAlign: "left",
                  fontSize: "0.65rem", fontWeight: 700, color: "#4A5568",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  fontFamily: "monospace", whiteSpace: "nowrap", borderBottom: "1px solid #E2E5EC",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid #F1F5F9" }}>
                {columns.map(col => {
                  const val = row[col];
                  const status = getCellStatus(val, col);
                  return (
                    <td key={col} style={{
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.75rem", fontWeight: 500,
                      color: cellTextColor(status),
                      background: cellBg(status),
                      border: `1px solid ${cellBorderColor(status)}`,
                      whiteSpace: "nowrap",
                    }}>
                      {val === null || val === undefined || val === "" ? (
                        <span style={{ color: "#9A2830", fontStyle: "italic", fontSize: "0.65rem" }}>manquant</span>
                      ) : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
            padding: "0.6rem 1.25rem",
            background: "#FFFFFF", border: "1px solid #E2E5EC",
            borderRadius: "0.5rem", color: "#4A5568",
            fontSize: "0.8rem", cursor: "pointer", fontWeight: 600,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#8896A6"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#E2E5EC"}
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          disabled={errorCount > 0}
          style={{
            padding: "0.6rem 1.25rem",
            background: errorCount > 0 ? "#F1F5F9" : "#3D6B40",
            border: "none",
            borderRadius: "0.5rem", color: errorCount > 0 ? "#A0AEC0" : "white",
            fontSize: "0.8rem", cursor: errorCount > 0 ? "not-allowed" : "pointer",
            fontWeight: 700, transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: "0.5rem",
            boxShadow: errorCount > 0 ? "none" : "0 4px 6px rgba(61,107,64,0.2)",
          }}
          onMouseEnter={e => { if (errorCount === 0) e.currentTarget.style.background = "#2D5030"; }}
          onMouseLeave={e => { if (errorCount === 0) e.currentTarget.style.background = "#3D6B40"; }}
        >
          {errorCount > 0 ? (
            <><XCircle size={15} /> Corriger les erreurs</>
          ) : (
            <><Loader2 size={15} /> Confirmer l&apos;import ({data.length} lignes)</>
          )}
        </button>
      </div>
    </div>
  );
}
