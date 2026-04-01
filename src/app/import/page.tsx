"use client";

import AppLayout from "@/components/AppLayout";
import TemplateSelector from "@/components/import/TemplateSelector";
import FileUpload from "@/components/import/FileUpload";
import DataPreview from "@/components/import/DataPreview";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TEMPLATES, type ImportTemplate, type ParsedRow } from "@/lib/import-templates";

export default function ImportPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ImportTemplate>(TEMPLATES[0]);
  const [parsedData, setParsedData] = useState<ParsedRow[] | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleDataParsed = (data: ParsedRow[]) => {
    setParsedData(data);
    setImportSuccess(false);
  };

  const handleConfirm = () => {
    setImportSuccess(true);
    setTimeout(() => {
      setParsedData(null);
      setImportSuccess(false);
    }, 3000);
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: "1100px" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A2332", letterSpacing: "-0.02em" }}>Import de Données</h1>
          <p style={{ color: "#4A5568", fontSize: "0.9rem", marginTop: "0.25rem", fontWeight: 500 }}>
            Importez vos données qualité via Excel ou CSV — validation automatique avant traitement
          </p>
        </div>

        {importSuccess && (
          <div style={{
            background: "rgba(61,107,64,0.1)", border: "1px solid rgba(61,107,64,0.25)",
            borderRadius: "0.75rem", padding: "1rem 1.5rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
            color: "#3D6B40"
          }}>
            <CheckCircle2 size={20} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2D5030" }}>Import réussi !</div>
              <div style={{ fontSize: "0.8rem", color: "#3D6B40" }}>
                Les données ont été traitées. Les KPIs associés ({selectedTemplate.kpis.join(", ")}) seront mis à jour.
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* Left: Template selector */}
          <TemplateSelector
            templates={TEMPLATES}
            selected={selectedTemplate}
            onSelect={(t) => { setSelectedTemplate(t); setParsedData(null); }}
          />

          {/* Right: Upload zone + preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FileUpload
              template={selectedTemplate}
              onDataParsed={handleDataParsed}
            />
            {parsedData && (
              <DataPreview
                data={parsedData}
                columns={selectedTemplate.columns}
                onConfirm={handleConfirm}
                onCancel={() => setParsedData(null)}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
