"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Download, FileText, CheckCircle2, AlertTriangle, Clock, Settings, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { DEMO_GLOBAL_SCORES, DEMO_AC_DOMAIN_SCORES, DEMO_JCI_DOMAIN_SCORES, DEMO_HAS_DOMAIN_SCORES, DEMO_DEPARTMENTS } from "@/lib/demo-data";
import { DEMO_KPIS, KPI_SECTIONS, getStatus } from "@/lib/kpi-data";

export default function ReportsPage() {
  const [framework, setFramework] = useState("Accreditation Canada");
  const [reportType, setReportType] = useState("Rapport de conformité global");
  const [department, setDepartment] = useState("Tous les départements");
  const [dateRange, setDateRange] = useState("2026-03-01 au 2026-03-31");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Mock list of past reports
  const pastReports = [
    { id: 1, name: "Conformité Mensuelle JCI", date: "28 Fév 2026", type: "PDF" },
    { id: 2, name: "Audit Hygiène Mains (REA)", date: "15 Fév 2026", type: "Excel" },
    { id: 3, name: "Global Accreditation Canada", date: "31 Jan 2026", type: "PDF" },
    { id: 4, name: "Bilan Événements Indésirables", date: "15 Jan 2026", type: "PDF" },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 800);
  };

  const currentDomains = framework === "Accreditation Canada" ? DEMO_AC_DOMAIN_SCORES :
                         framework === "JCI" ? DEMO_JCI_DOMAIN_SCORES : DEMO_HAS_DOMAIN_SCORES;
  
  const currentGlobal = framework === "Accreditation Canada" ? DEMO_GLOBAL_SCORES.AC :
                        framework === "JCI" ? DEMO_GLOBAL_SCORES.JCI : DEMO_GLOBAL_SCORES.HAS;

  const handleExportPDF = () => {
    alert("Export PDF en cours de développement");
  };

  const handleExportExcel = () => {
    alert("Export Excel en cours de développement");
  };

  return (
    <AppLayout>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 4rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A2332", letterSpacing: "-0.02em" }}>
            Génération de Rapports
          </h1>
          <p style={{ color: "#4A5568", fontSize: "0.95rem" }}>
            Configurez et prévisualisez vos rapports officiels d&apos;accréditation
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
          
          {/* LEFT PANEL: Configuration */}
          <div className="w-full md:w-[380px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto pr-2">
            
            {/* Configuration Form */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E2E5EC", borderRadius: "0.75rem", padding: "1.25rem", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A2332", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Settings size={18} color="#3D6B40" /> Critères du Rapport
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#4A5568", marginBottom: "0.5rem" }}>1. Référentiel</label>
                  <select 
                    value={framework} onChange={e => setFramework(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", background: "#F8FAFC", fontSize: "0.9rem", color: "#1A2332", outline: "none" }}
                  >
                    <option>Accreditation Canada</option>
                    <option>JCI</option>
                    <option>HAS</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#4A5568", marginBottom: "0.5rem" }}>2. Type de rapport</label>
                  <select 
                    value={reportType} onChange={e => setReportType(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", background: "#F8FAFC", fontSize: "0.9rem", color: "#1A2332", outline: "none" }}
                  >
                    <option>Rapport de conformité global</option>
                    <option>Rapport KPIs mensuel</option>
                    <option>Rapport par domaine</option>
                    <option>Rapport des non-conformités</option>
                    <option>Rapport des actions correctives</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#4A5568", marginBottom: "0.5rem" }}>3. Département</label>
                  <select 
                    value={department} onChange={e => setDepartment(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", background: "#F8FAFC", fontSize: "0.9rem", color: "#1A2332", outline: "none" }}
                  >
                    <option>Tous les départements</option>
                    {DEMO_DEPARTMENTS.map(d => <option key={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#4A5568", marginBottom: "0.5rem" }}>4. Période</label>
                  <input 
                    type="text" value={dateRange} onChange={e => setDateRange(e.target.value)}
                    style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", background: "#F8FAFC", fontSize: "0.9rem", color: "#1A2332", outline: "none" }}
                  />
                </div>

                <div style={{ paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button onClick={handleGenerate} disabled={isGenerating} style={{ 
                    width: "100%", background: "#3D6B40", color: "#FFFFFF", border: "none", 
                    padding: "0.875rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.95rem", 
                    cursor: isGenerating ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    transition: "all 0.2s"
                  }}>
                    {isGenerating ? "Calcul en cours..." : <><Search size={18} /> Générer le rapport</>}
                  </button>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <button onClick={handleExportPDF} style={{ 
                      background: "#FFFFFF", color: "#1A2332", border: "1px solid #E2E5EC", 
                      padding: "0.6rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", 
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem"
                    }}>
                      <Download size={14} /> Exporter PDF
                    </button>
                    <button onClick={handleExportExcel} style={{ 
                      background: "#FFFFFF", color: "#1A2332", border: "1px solid #E2E5EC", 
                      padding: "0.6rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.8rem", 
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem"
                    }}>
                      <Download size={14} /> Exporter Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Reports */}
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", marginLeft: "0.5rem" }}>
                Derniers rapports générés
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {pastReports.map(rp => (
                  <div key={rp.id} style={{ 
                    background: "#FFFFFF", border: "1px solid #E2E5EC", borderRadius: "0.5rem", 
                    padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#CBD5E1"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#E2E5EC"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <FileText size={18} color={rp.type === "PDF" ? "#9A2830" : "#3D6B40"} />
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1A2332" }}>{rp.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#8896A6" }}>{rp.date}</div>
                      </div>
                    </div>
                    <Download size={16} color="#8896A6" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: 70% Live Preview */}
          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            
            {isGenerating && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(245, 246, 250, 0.7)", backdropFilter: "blur(2px)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: "#FFFFFF", padding: "1.5rem 2.5rem", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "30px", height: "30px", border: "2px solid #E2E5EC", borderTop: "2px solid #3D6B40", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A2332" }}>Génération du rapport...</div>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {showPreview && reportType === "Rapport de conformité global" && (
              <div style={{ background: "#FFFFFF", width: "100%", minHeight: "100%", padding: "4rem", border: "1px solid #E2E5EC", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", margin: "0 auto" }}>
                
                {/* PDF Header */}
                <div style={{ borderBottom: "2px solid #1A2332", paddingBottom: "1.5rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/huim6_logo.png" alt="HUIM6 Logo" style={{ height: "45px", marginBottom: "1rem" }} />
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1A2332", margin: 0 }}>Rapport de Conformité Global</h1>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 500, color: "#4A5568", marginTop: "0.5rem" }}>
                      Référentiel : {framework}
                    </h2>
                  </div>
                  <div style={{ textAlign: "right", color: "#8896A6", fontSize: "0.9rem" }}>
                    <div>Hôpital Universitaire International Mohammed VI</div>
                    <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>Période : {dateRange}</div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
                  <div style={{ flex: 1, background: "#F0Fdf4", border: "1px solid #DCFCE7", borderRadius: "0.5rem", padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3D6B40", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Score Global</div>
                    <div style={{ fontSize: "4rem", fontWeight: 800, color: "#1A2332", lineHeight: 1 }}>{currentGlobal}%</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F8FAFC", padding: "1rem", borderRadius: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle2 size={16} color="#3D6B40" /> <span style={{ fontWeight: 600, color: "#1A2332" }}>Conformes</span></div>
                      <span style={{ fontWeight: 800 }}>824</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F8FAFC", padding: "1rem", borderRadius: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Clock size={16} color="#D4830A" /> <span style={{ fontWeight: 600, color: "#1A2332" }}>Partiels</span></div>
                      <span style={{ fontWeight: 800 }}>112</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F8FAFC", padding: "1rem", borderRadius: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><AlertTriangle size={16} color="#9A2830" /> <span style={{ fontWeight: 600, color: "#1A2332" }}>Non-conformes</span></div>
                      <span style={{ fontWeight: 800 }}>45</span>
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A2332", marginBottom: "1.5rem" }}>Scores par Domaine</h3>
                <div style={{ height: "300px", marginBottom: "3rem" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentDomains} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E5EC" />
                      <XAxis type="number" domain={[0, 100]} stroke="#8896A6" fontSize={12} />
                      <YAxis dataKey="domain" type="category" width={150} tick={{ fontSize: 12, fontWeight: 600, fill: "#1A2332" }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: "#F8FAFC" }} contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E5EC" }} />
                      <Bar dataKey="score" fill="#3D6B40" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Top 5 Critical Alerts */}
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A2332", marginBottom: "1rem" }}>Avertissements Critiques (Top 5)</h3>
                <div style={{ border: "1px solid #E2E5EC", borderRadius: "0.5rem", overflow: "hidden", marginBottom: "4rem" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E5EC" }}>
                        <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase" }}>Standard</th>
                        <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase" }}>Description</th>
                        <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase" }}>Département</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #E2E5EC" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", fontWeight: 700, color: "#9A2830" }}>HIT.5</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#1A2332", fontWeight: 500 }}>Politique de cybersécurité non formalisée</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#4A5568" }}>DSI</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #E2E5EC" }}>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", fontWeight: 700, color: "#9A2830" }}>ROP-MED-01</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#1A2332", fontWeight: 500 }}>Électrolytes concentrés — stockage non sécurisé</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#4A5568" }}>Réanimation</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", fontWeight: 700, color: "#9A2830" }}>HAS 2.2-12</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#1A2332", fontWeight: 500 }}>Checklist opératoire incomplète (78% vs 95%)</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "#4A5568" }}>Bloc Opératoire</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ textAlign: "center", color: "#A0AEC0", fontSize: "0.75rem", fontWeight: 500, borderTop: "1px solid #E2E5EC", paddingTop: "1rem" }}>
                  Document confidentiel généré par la plateforme ANDAR le {new Date().toLocaleDateString("fr-FR")} à {new Date().toLocaleTimeString("fr-FR")}
                </div>
              </div>
            )}

            {showPreview && reportType === "Rapport KPIs mensuel" && (
              <div style={{ background: "#FFFFFF", width: "100%", minHeight: "100%", padding: "4rem", border: "1px solid #E2E5EC", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", margin: "0 auto" }}>
                
                {/* PDF Header */}
                <div style={{ borderBottom: "2px solid #1A2332", paddingBottom: "1.5rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/huim6_logo.png" alt="HUIM6 Logo" style={{ height: "45px", marginBottom: "1rem" }} />
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1A2332", margin: 0 }}>Rapport KPIs Mensuel</h1>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 500, color: "#4A5568", marginTop: "0.5rem" }}>
                      Analytique Temps Réel
                    </h2>
                  </div>
                  <div style={{ textAlign: "right", color: "#8896A6", fontSize: "0.9rem" }}>
                    <div>Hôpital Universitaire International Mohammed VI</div>
                    <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>Période : {dateRange}</div>
                    <div style={{ fontWeight: 600 }}>Département : {department}</div>
                  </div>
                </div>

                {KPI_SECTIONS.map(section => {
                  const items = DEMO_KPIS.filter(k => k.section === section.id);
                  if (items.length === 0) return null;
                  return (
                    <div key={section.id} style={{ marginBottom: "3rem" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A2332", borderBottom: "2px solid #E2E5EC", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
                        {section.name}
                      </h3>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "#F8FAFC" }}>
                            <th style={{ padding: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase" }}>Code</th>
                            <th style={{ padding: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase" }}>Indicateur</th>
                            <th style={{ padding: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase", textAlign: "right" }}>Valeur</th>
                            <th style={{ padding: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#8896A6", textTransform: "uppercase", textAlign: "center" }}>Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((kpi, i) => {
                            const status = getStatus(kpi.currentValue, kpi.thresholds);
                            const dotColor = status === "green" ? "#3D6B40" : status === "amber" ? "#D4830A" : "#9A2830";
                            return (
                              <tr key={kpi.id} style={{ borderBottom: "1px solid #E2E5EC" }}>
                                <td style={{ padding: "1rem 0.75rem", fontSize: "0.85rem", fontWeight: 700, color: "#4A5568" }}>{kpi.code}</td>
                                <td style={{ padding: "1rem 0.75rem", fontSize: "0.85rem", fontWeight: 600, color: "#1A2332" }}>{kpi.name}</td>
                                <td style={{ padding: "1rem 0.75rem", fontSize: "0.95rem", fontWeight: 800, color: "#1A2332", textAlign: "right" }}>{kpi.currentValue} {kpi.unit}</td>
                                <td style={{ padding: "1rem 0.75rem", textAlign: "center" }}>
                                  <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: dotColor }} />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}

                <div style={{ textAlign: "center", color: "#A0AEC0", fontSize: "0.75rem", fontWeight: 500, borderTop: "1px solid #E2E5EC", paddingTop: "1rem", marginTop: "2rem" }}>
                  Document confidentiel généré par la plateforme ANDAR le {new Date().toLocaleDateString("fr-FR")} à {new Date().toLocaleTimeString("fr-FR")}
                </div>
              </div>
            )}

            {!showPreview && reportType === "Rapport par domaine" && (
               <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8896A6", fontSize: "0.9rem" }}>
                 Sélectionnez un type de rapport supporté (Global ou KPIs) et cliquez sur Générer.
               </div>
            )}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
