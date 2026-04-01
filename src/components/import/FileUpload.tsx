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
          border: `2px dashed ${isDragging ? "#3D6B40" : "#CBD5E1"}`,
          borderRadius: "0.75rem",
          padding: "3rem 2rem",
          textAlign: "center",
          background: isDragging ? "rgba(61,107,64,0.05)" : "#F8FAFC",
          transition: "all 0.2s",
          cursor: "pointer",
          position: "relative",
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
          width: "56px", height: "56px",
          background: "#FFFFFF",
          border: "1px solid #E2E5EC",
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1rem",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        }}>
          {fileName ? <FileSpreadsheet size={28} color="#3D6B40" /> : <Upload size={28} color="#8896A6" />}
        </div>

        {fileName ? (
          <div>
            <div style={{ fontWeight: 600, color: "#1A2332", marginBottom: "0.25rem" }}>{fileName}</div>
            <div style={{ fontSize: "0.75rem", color: "#3D6B40", fontWeight: 500 }}>Fichier chargé — cliquer pour remplacer</div>
          </div>
        ) : (
          <div>
            <div style={{ fontWeight: 600, color: "#1A2332", marginBottom: "0.25rem" }}>
              Glissez votre fichier ici
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>
              ou cliquez pour sélectionner — .xlsx, .xls, .csv
            </div>
            <div style={{ fontSize: "0.7rem", color: "#4A5568", marginTop: "0.75rem", background: "#FFFFFF", display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "9999px", border: "1px solid #E2E5EC" }}>
              Template : <span style={{ color: "#3D6B40", fontWeight: 700 }}>{template.label}</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: "1rem",
          padding: "0.75rem",
          background: "rgba(154,40,48,0.08)",
          border: "1px solid rgba(154,40,48,0.2)",
          borderRadius: "0.5rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          color: "#9A2830", fontSize: "0.8rem", fontWeight: 500,
        }}>
          <AlertCircle size={16} />
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
