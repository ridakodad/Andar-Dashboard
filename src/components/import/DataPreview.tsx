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
    if (status === "error") return "rgba(154,40,48,0.25)";
    if (status === "warn") return "rgba(212,131,10,0.25)";
    return "transparent";
  };
  const cellBg = (status: "ok" | "warn" | "error"): string => {
    if (status === "error") return "rgba(154,40,48,0.04)";
    if (status === "warn") return "rgba(212,131,10,0.04)";
    return "transparent";
  };
  const cellTextColor = (status: "ok" | "warn" | "error"): string => {
    if (status === "error") return "var(--red)";
    if (status === "warn") return "var(--amber)";
    return "var(--text-primary)";
  };

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <div className="card-header" style={{ marginBottom: "2px" }}>Prévisualisation</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {data.length} lignes · Aperçu
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {errorCount > 0 && (
            <div className="badge badge-non-conforme" style={{ gap: "6px" }}>
              <XCircle size={13} />
              <span>{errorCount} erreur{errorCount > 1 ? "s" : ""}</span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="badge badge-partiel" style={{ gap: "6px" }}>
              <AlertCircle size={13} />
              <span>{warningCount} avertissement{warningCount > 1 ? "s" : ""}</span>
            </div>
          )}
          {errorCount === 0 && warningCount === 0 && (
            <div className="badge badge-conforme" style={{ gap: "6px" }}>
              <CheckCircle2 size={13} />
              <span>Données valides</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: "var(--bg)" }}>
              {columns.map(col => (
                <th key={col} style={{
                  padding: "0.75rem 1rem", textAlign: "left",
                  fontSize: "0.65rem", fontWeight: 800, color: "var(--text-secondary)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  fontFamily: "var(--font-mono)", whiteSpace: "nowrap", borderBottom: "1px solid var(--border)",
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: "1px solid var(--border)" }}>
                {columns.map(col => {
                  const val = row[col];
                  const status = getCellStatus(val, col);
                  return (
                    <td key={col} style={{
                      padding: "0.75rem 1rem",
                      fontSize: "0.78rem", fontWeight: 600,
                      color: cellTextColor(status),
                      background: cellBg(status),
                      borderBottom: "1px solid var(--border)",
                      borderRight: "1px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}>
                      {val === null || val === undefined || val === "" ? (
                        <span style={{ color: "var(--red)", fontStyle: "italic", fontSize: "0.68rem" }}>manquant</span>
                      ) : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          className="btn-outline"
          style={{ padding: "0.75rem 1.5rem" }}
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          disabled={errorCount > 0}
          className="btn-primary"
          style={{ padding: "0.75rem 1.5rem", boxShadow: errorCount > 0 ? "none" : "var(--shadow-md)" }}
        >
          {errorCount > 0 ? (
            <><XCircle size={16} /> Corriger les erreurs</>
          ) : (
            <><Loader2 size={16} /> Confirmer ({data.length} lignes)</>
          )}
        </button>
      </div>
    </div>
  );
}
