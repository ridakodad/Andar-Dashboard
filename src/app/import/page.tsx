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
        <div className="page-header">
          <h1 className="page-title">Import de Données</h1>
          <p className="page-subtitle">Importez vos données qualité via Excel ou CSV — validation automatique avant traitement</p>
        </div>

        {importSuccess && (
          <div style={{
            background: "var(--green-muted)", border: "1px solid var(--green)",
            borderRadius: "var(--radius)", padding: "1.25rem 1.5rem",
            display: "flex", alignItems: "center", gap: "1rem",
            marginBottom: "2rem",
            color: "var(--green)"
          }}>
            <CheckCircle2 size={24} />
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "2px" }}>Import réussi !</div>
              <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Les données ont été traitées. Les KPIs associés ({selectedTemplate.kpis.join(", ")}) ont été mis à jour dans le tableau de bord.
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
