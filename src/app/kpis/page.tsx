"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { DEMO_KPIS, KPI_SECTIONS, KPI, getStatus } from "@/lib/kpi-data";
import { ChevronDown, ChevronRight, Activity, TrendingUp, TrendingDown, ArrowRight, X } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function KPIsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    KPI_SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const statusColors = {
    green: "#3D6B40",
    amber: "#D4830A",
    red: "#9A2830"
  };

  const getTrendIcon = (history: number[]) => {
    if (history.length < 2) return <ArrowRight size={14} color="#8896A6" />;
    const last = history[history.length - 1];
    const prev = history[history.length - 2];
    if (last > prev) return <TrendingUp size={14} color="#3D6B40" />;
    if (last < prev) return <TrendingDown size={14} color="#9A2830" />;
    return <ArrowRight size={14} color="#8896A6" />;
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 className="page-title">Indicateurs de Performance</h1>
            <p className="page-subtitle">Suivi des KPIs critiques par domaine — Mise à jour le {new Date().toLocaleDateString("fr-FR")}</p>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="badge badge-conforme">82% Global</div>
            <div className="badge badge-partiel">12% Alerte</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: "var(--card)", padding: "1rem 1.25rem", borderRadius: "var(--radius)", 
          display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "2rem",
          border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)"
        }}>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "0.375rem", letterSpacing: "0.05em" }}>Domaine</label>
            <select style={{ padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.85rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", minWidth: "200px", fontWeight: 500 }}>
              <option>Tous les domaines</option>
              {KPI_SECTIONS.map(s => <option key={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "0.375rem", letterSpacing: "0.05em" }}>Département</label>
            <select style={{ padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.85rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", minWidth: "180px", fontWeight: 500 }}>
              <option>Tous (Hôpital entier)</option>
              <option>Réanimation</option>
              <option>Urgences</option>
              <option>Bloc Opératoire</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "0.375rem", letterSpacing: "0.05em" }}>Statut</label>
            <select style={{ padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.85rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", minWidth: "140px", fontWeight: 500 }}>
              <option>Tous</option>
              <option>Conforme</option>
              <option>À surveiller</option>
              <option>Critique</option>
            </select>
          </div>
        </div>

        {/* Sections */}
        {KPI_SECTIONS.map(section => {
          const sectionKPIs = DEMO_KPIS.filter(k => k.section === section.id);
          const isOpen = openSections[section.id];
          
          return (
            <div key={section.id} style={{ marginBottom: "1.5rem" }}>
              <button 
                onClick={() => toggleSection(section.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
                  padding: "1.25rem", cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "var(--shadow-sm)"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--card)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ 
                    width: "36px", height: "36px", borderRadius: "var(--radius-sm)", 
                    background: "var(--green-muted)", display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <Activity size={18} color="var(--green)" />
                  </div>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                    {section.name} <span style={{ color: "var(--text-muted)", fontWeight: 500, fontSize: "0.9rem", marginLeft: "0.5rem" }}>({sectionKPIs.length})</span>
                  </h2>
                </div>
                {isOpen ? <ChevronDown size={20} color="var(--text-muted)" /> : <ChevronRight size={20} color="var(--text-muted)" />}
              </button>

              {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {sectionKPIs.map((kpi, i) => {
                    const status = getStatus(kpi.currentValue, kpi.thresholds);
                    const sparklineData = kpi.history.slice(-6).map((val, i) => ({ name: i, value: val }));
                    
                    return (
                      <div 
                        key={kpi.id} 
                        onClick={() => setSelectedKPI(kpi)}
                        className="card card-hover card-enter"
                        style={{
                          animationDelay: `${i * 0.05}s`,
                          padding: "1.5rem",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                          <div>
                            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{kpi.code}</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.35 }}>{kpi.name}</div>
                          </div>
                          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: statusColors[status], flexShrink: 0, marginTop: "0.25rem", boxShadow: `0 0 0 4px ${statusColors[status]}25` }} />
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem" }}>
                            <span style={{ fontSize: "2.25rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.03em" }}>{kpi.currentValue}</span>
                            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-secondary)" }}>{kpi.unit}</span>
                          </div>
                          
                          <div style={{ width: "100px", height: "35px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={sparklineData}>
                                <Line type="monotone" dataKey="value" stroke={statusColors[status]} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                            {getTrendIcon(kpi.history)} <span style={{ opacity: 0.8 }}>Tendance 6m</span>
                          </div>
                          <div style={{ display: "flex", gap: "0.25rem" }}>
                            {kpi.frameworks.map(fw => (
                              <span key={fw} style={{ padding: "0.15rem 0.4rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", fontSize: "0.6rem", fontWeight: 800, color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
                                {fw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* KPI Modal */}
      {selectedKPI && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(12, 17, 24, 0.4)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2rem"
        }}>
          <div style={{
            background: "#FFFFFF", borderRadius: "1rem", width: "100%", maxWidth: "800px",
            maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 2rem", borderBottom: "1px solid #E2E5EC" }}>
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3D6B40", letterSpacing: "0.05em", textTransform: "uppercase" }}>{selectedKPI.code}</span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A2332", marginTop: "0.25rem" }}>{selectedKPI.name}</h2>
              </div>
              <button onClick={() => setSelectedKPI(null)} style={{ background: "#F8FAFC", border: "1px solid #E2E5EC", borderRadius: "0.5rem", padding: "0.5rem", cursor: "pointer", color: "#4A5568" }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
                <div style={{ flex: 1, background: "#F8FAFC", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #E2E5EC" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#8896A6", marginBottom: "0.5rem" }}>Valeur Actuelle</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1A2332", lineHeight: 1 }}>{selectedKPI.currentValue}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "#8896A6" }}>{selectedKPI.unit}</span>
                  </div>
                </div>
                
                <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1A2332" }}>Seuils de Tolérance</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#4A5568" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3D6B40" }} /> 
                    Conforme : {selectedKPI.thresholds.isInverse ? `≤ ${selectedKPI.thresholds.green.max}` : `≥ ${selectedKPI.thresholds.green.min}`}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#4A5568" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#D4830A" }} /> 
                    À surveiller : {selectedKPI.thresholds.amber.min} - {selectedKPI.thresholds.amber.max}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#4A5568" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#9A2830" }} /> 
                    Critique : {selectedKPI.thresholds.isInverse ? `> ${selectedKPI.thresholds.red.min}` : `< ${selectedKPI.thresholds.red.max}`}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A2332", marginBottom: "1rem" }}>Historique 12 Mois</h3>
                <div style={{ height: "300px", width: "100%", background: "#FFFFFF", padding: "1rem", borderRadius: "0.75rem", border: "1px solid #E2E5EC" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedKPI.history.map((v, i) => ({ month: `Mois ${i+1}`, value: v }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E5EC" vertical={false} />
                      <XAxis dataKey="month" stroke="#8896A6" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#8896A6" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ background: "#1A2332", border: "none", borderRadius: "0.5rem", color: "#FFFFFF" }}
                        itemStyle={{ color: "#FFFFFF" }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3D6B40" strokeWidth={3} dot={{ fill: "#3D6B40", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
}
