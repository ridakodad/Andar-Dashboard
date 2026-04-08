"use client";

import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import type { ImportTemplate, ParsedRow } from "@/lib/import-templates";

interface Props {
  template: ImportTemplate;
  onDataParsed: (data: ParsedRow[]) => void;
}

export default function FileUpload({ template, onDataParsed }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    setFileName(file.name);
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      Papa.parse<ParsedRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          onDataParsed(result.data);
        },
        error: () => setError("Erreur lors de la lecture du fichier CSV."),
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json<ParsedRow>(sheet);
          onDataParsed(rows);
        } catch {
          setError("Erreur lors de la lecture du fichier Excel.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError("Format non supporté. Veuillez utiliser un fichier .xlsx ou .csv");
    }
  }, [onDataParsed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="card">
      <div className="card-header">Zone de Téléchargement</div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? "var(--green)" : "var(--border-strong)"}`,
          borderRadius: "var(--radius)",
          padding: "3.5rem 2rem",
          textAlign: "center",
          background: isDragging ? "var(--green-muted)" : "var(--bg)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          position: "relative",
          boxShadow: isDragging ? "inset 0 0 20px rgba(61,107,64,0.05)" : "none",
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleChange}
          style={{ display: "none" }}
        />

        <div style={{
          width: "64px", height: "64px",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.25rem",
          boxShadow: "var(--shadow-sm)",
          color: fileName ? "var(--green)" : "var(--text-muted)",
        }}>
          {fileName ? <FileSpreadsheet size={32} /> : <Upload size={32} />}
        </div>

        {fileName ? (
          <div>
            <div style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem", fontSize: "1rem" }}>{fileName}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--green)", fontWeight: 700, letterSpacing: "0.02em" }}>FICHIER PRÊT · CLIQUER POUR REMPLACER</div>
          </div>
        ) : (
          <div>
            <div style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
              Déposez votre fichier ici
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 500 }}>
              ou cliquez pour parcourir vos documents (.xlsx, .csv)
            </div>
            <div style={{ 
              fontSize: "0.68rem", color: "var(--green)", marginTop: "1.25rem", background: "var(--green-muted)", 
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.875rem", borderRadius: "999px", border: "1px solid rgba(61,107,64,0.15)",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)" }} />
              Template : {template.label}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: "1.25rem",
          padding: "1rem",
          background: "rgba(154,40,48,0.08)",
          border: "1px solid rgba(154,40,48,0.2)",
          borderRadius: "var(--radius-sm)",
          display: "flex", alignItems: "center", gap: "0.75rem",
          color: "var(--red)", fontSize: "0.825rem", fontWeight: 600,
        }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div style={{ marginTop: "1rem", padding: "1rem", background: "#F8FAFC", borderRadius: "0.5rem", border: "1px solid #E2E5EC" }}>
        <div style={{ fontSize: "0.65rem", color: "#8896A6", marginBottom: "0.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Format attendu pour {template.label}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {template.columns.map(col => (
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
    </div>
  );
}
