"use client";

import AppLayout from "@/components/AppLayout";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from "recharts";
import {
  DEMO_AC_DOMAIN_SCORES, DEMO_JCI_DOMAIN_SCORES, DEMO_HAS_DOMAIN_SCORES,
  DEMO_AC_ASSESSMENTS, DEMO_JCI_ASSESSMENTS, DEMO_HAS_ASSESSMENTS,
  DEMO_DEPARTMENTS,
} from "@/lib/demo-data";
import acData from "@/data/frameworks/AC.json";
import jciData from "@/data/frameworks/JCI.json";
import hasData from "@/data/frameworks/HAS.json";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";

type FwId = "AC" | "JCI" | "HAS";
type StatusType = "conforme" | "partiel" | "non-conforme" | "na";

const frameworkMeta: Record<FwId, { label: string; color: string; shortColor: string }> = {
  AC: { label: "Accreditation Canada Diamond", color: "#3D6B40", shortColor: "#3D6B40" },
  JCI: { label: "JCI 8ème Édition", color: "#2A7B88", shortColor: "#2A7B88" },
  HAS: { label: "HAS V2025", color: "#D4830A", shortColor: "#D4830A" },
};

const statusConfig: Record<StatusType, { label: string; color: string; bg: string }> = {
  "conforme": { label: "Conforme", color: "#3D6B40", bg: "rgba(61,107,64,0.1)" },
  "partiel": { label: "Partiel", color: "#D4830A", bg: "rgba(212,131,10,0.1)" },
  "non-conforme": { label: "Non-conforme", color: "#9A2830", bg: "rgba(154,40,48,0.1)" },
  "na": { label: "N/A", color: "#64748B", bg: "#F1F5F9" },
};

function StatusBadge({ status }: { status: StatusType }) {
  const badgeClass = status === "conforme" ? "badge badge-conforme" :
                     status === "partiel" ? "badge badge-partiel" :
                     status === "non-conforme" ? "badge badge-non-conforme" : "badge badge-na";
  const s = statusConfig[status] || statusConfig.na;
  return (
    <span className={badgeClass}>
      {s.label}
    </span>
  );
}

interface StandardItem {
  id: string;
  code: string;
  title: string;
  description?: string;
  priority?: string;
  imperatif?: boolean;
}
interface DomainGroup {
  id: string;
  code: string;
  name: string;
  description?: string;
  weight?: number;
  score?: number;
  standards: StandardItem[];
}

function buildDomainGroups(fw: FwId): DomainGroup[] {
  if (fw === "AC") {
    const scores = Object.fromEntries(DEMO_AC_DOMAIN_SCORES.map(d => [d.code, d.score]));
    return acData.domains.map(d => ({
      id: d.id, code: d.code, name: d.name, description: d.description, weight: d.weight,
      score: scores[d.code],
      standards: d.standards.map(s => ({ id: s.id, code: s.code, title: s.title, description: s.description, priority: s.priority })),
    }));
  }
  if (fw === "JCI") {
    const scores = Object.fromEntries(DEMO_JCI_DOMAIN_SCORES.map(d => [d.code, d.score]));
    return jciData.sections.map(s => ({
      id: s.id, code: s.code, name: s.name, description: s.description, weight: s.weight,
      score: scores[s.code],
      standards: s.standards.map(st => ({ id: st.id, code: st.code, title: st.title, description: st.description, priority: st.priority })),
    }));
  }
  // HAS
  const scores = Object.fromEntries(DEMO_HAS_DOMAIN_SCORES.map(d => [d.code, d.score]));
  return hasData.chapters.map(ch => ({
    id: ch.id, code: ch.code, name: ch.name, description: ch.description, weight: ch.weight,
    score: scores[ch.code],
    standards: ch.objectives.flatMap(obj =>
      obj.criteria.map(c => ({
        id: c.id, code: c.code, title: c.title, description: c.description, imperatif: c.imperatif,
      }))
    ),
  }));
}

function getAssessments(fw: FwId): Record<string, StatusType> {
  if (fw === "AC") return DEMO_AC_ASSESSMENTS as Record<string, StatusType>;
  if (fw === "JCI") return DEMO_JCI_ASSESSMENTS as Record<string, StatusType>;
  return DEMO_HAS_ASSESSMENTS as Record<string, StatusType>;
}

function DomainAccordion({ domain, assessments, fw, index }: { domain: DomainGroup; assessments: Record<string, StatusType>; fw: FwId; index: number }) {
  const [open, setOpen] = useState(false);
  const meta = frameworkMeta[fw];
  const score = domain.score ?? 0;
  const statusColor = score >= 85 ? "var(--green)" : score >= 70 ? "var(--amber)" : "var(--red)";

  const domainTotal = domain.standards.length;
  const conformes = domain.standards.filter(s => assessments[s.id] === "conforme").length;

  return (
    <div 
      className="card card-enter"
      style={{
        padding: 0, marginBottom: "0.75rem", overflow: "hidden", 
        animationDelay: `${index * 0.05}s`
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "1rem",
          padding: "1.25rem 1.5rem",
          background: open ? "var(--bg)" : "var(--card)",
          border: "none", cursor: "pointer",
          textAlign: "left", transition: "background 0.15s",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "var(--bg)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "var(--card)"; }}
      >
        <div style={{ color: "#8896A6", flexShrink: 0 }}>
          {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>

        {/* Domain code */}
        <div style={{
          padding: "0.2rem 0.5rem",
          background: `${meta.color}10`, border: `1px solid ${meta.color}30`,
          borderRadius: "6px",
          fontSize: "0.65rem", fontWeight: 700, color: meta.color,
          flexShrink: 0,
        }}>
          {domain.code}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1A2332" }}>{domain.name}</div>
          <div style={{ fontSize: "0.7rem", color: "#8896A6", marginTop: "2px" }}>{domain.description}</div>
        </div>

        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: statusColor }}>{score}%</div>
          <div style={{ fontSize: "0.65rem", color: "#8896A6", fontWeight: 500 }}>{conformes}/{domainTotal} conformes</div>
        </div>

        {/* Score bar */}
        <div style={{
          width: "80px", height: "6px", background: "#E2E5EC",
          borderRadius: "3px", overflow: "hidden", flexShrink: 0,
        }}>
          <div style={{
            width: `${score}%`, height: "100%",
            background: statusColor, borderRadius: "3px",
          }} />
        </div>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #E2E5EC" }}>
          {domain.standards.map((std) => {
            const status = assessments[std.id] ?? "na";
            return (
              <div
                key={std.id}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  padding: "0.875rem 1.25rem",
                  borderBottom: "1px solid #F1F5F9",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F8FAFC")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  <span style={{
                    fontSize: "0.65rem", fontFamily: "monospace", fontWeight: 600,
                    color: "#4A5568",
                    padding: "0.15rem 0.4rem",
                    background: "#F1F5F9", border: "1px solid #E2E5EC",
                    borderRadius: "4px",
                  }}>
                    {std.code}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1A2332", marginBottom: "4px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {std.title}
                    {(std.priority === "ROP" || std.imperatif) && (
                      <span style={{
                        padding: "0.1rem 0.35rem",
                        background: "rgba(154,40,48,0.1)", color: "#9A2830",
                        border: "1px solid rgba(154,40,48,0.2)",
                        borderRadius: "4px", fontSize: "0.55rem", fontWeight: 700,
                      }}>
                        {std.priority === "ROP" ? "ROP" : "IMPÉRATIF"}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#4A5568" }}>{std.description}</div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <StatusBadge status={status} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FrameworkPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (Array.isArray(params.id) ? params.id[0] : params.id) ?? "AC";
  const fwId: FwId = (["AC", "JCI", "HAS"].includes(rawId) ? rawId : "AC") as FwId;
  const [selectedDept, setSelectedDept] = useState("ALL");

  const meta = frameworkMeta[fwId];
  const domains = buildDomainGroups(fwId);
  const assessments = getAssessments(fwId);

  // Radar data
  const radarData = domains.slice(0, 9).map(d => ({
    domain: d.code,
    score: d.score ?? 0,
    fullMark: 100,
  }));

  // Score calculation
  const globalScore = Math.round(domains.reduce((acc, d) => acc + (d.score ?? 0), 0) / domains.length);

  return (
    <AppLayout>
      <div style={{ maxWidth: "1200px" }}>
        {/* Header + Tab nav */}
        <div className="page-header">
          <h1 className="page-title">Référentiels Détaillés</h1>
          <p className="page-subtitle">Exploration par domaine et standard — {fwId}</p>
        </div>

        <div style={{ marginBottom: "2rem" }}>

          {/* Framework tabs */}
          <div className="flex flex-wrap gap-2">
            {(["AC", "JCI", "HAS"] as FwId[]).map(fw => {
              const m = frameworkMeta[fw];
              const active = fw === fwId;
              return (
                <button
                  key={fw}
                  onClick={() => router.push(`/framework/${fw}`)}
                  style={{
                    padding: "0.6rem 1.5rem",
                    background: active ? m.color : "var(--card)",
                    border: `1px solid ${active ? m.color : "var(--border)"}`,
                    borderRadius: "var(--radius-sm)",
                    color: active ? "white" : "var(--text-secondary)",
                    fontSize: "0.85rem",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: active ? `0 4px 12px ${m.color}35` : "var(--shadow-sm)",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--bg)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "var(--card)"; }}
                >
                  {fw}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Left: Radar + score */}
          <div className="flex flex-col gap-5 w-full">
            <div className="card" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div className="card-header">Score Global {fwId}</div>
              <div style={{ fontSize: "3.25rem", fontWeight: 900, color: meta.color, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "0.25rem" }}>
                {globalScore}%
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {meta.label}
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                  <PolarGrid stroke="#E2E5EC" />
                  <PolarAngleAxis
                    dataKey="domain"
                    tick={{ fill: "#8896A6", fontSize: 10, fontWeight: 600 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke={meta.color}
                    fill={meta.color}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#FFFFFF", border: "1px solid #E2E5EC",
                      borderRadius: "0.5rem", color: "#1A2332", fontSize: "0.75rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", fontWeight: 600,
                    }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Domain summary chips */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "1rem" }}>
                {domains.slice(0, 6).map(d => (
                  <div key={d.code} style={{
                    background: "#F8FAFC", border: "1px solid #E2E5EC",
                    borderRadius: "0.375rem",
                    padding: "0.4rem 0.5rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{ fontSize: "0.65rem", color: "#4A5568", fontWeight: 600 }}>{d.code}</span>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 800,
                      color: (d.score ?? 0) >= 80 ? "#3D6B40" : (d.score ?? 0) >= 65 ? "#D4830A" : "#9A2830",
                    }}>{d.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department filter */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="card-header">Filtrer par Service</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Filter size={14} color="var(--text-muted)" />
                <select
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                  className="form-select"
                >
                  <option value="ALL">Tous les services</option>
                  {DEMO_DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              {selectedDept !== "ALL" && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(61,107,64,0.06)", borderRadius: "0.5rem", border: "1px solid rgba(61,107,64,0.15)" }}>
                  <div style={{ fontSize: "0.75rem", color: "#3D6B40", fontWeight: 700 }}>
                    {DEMO_DEPARTMENTS.find(d => d.id === selectedDept)?.name}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#4A5568", marginTop: "2px" }}>
                    Responsable : {DEMO_DEPARTMENTS.find(d => d.id === selectedDept)?.headName}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Domain accordion */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#8896A6", fontWeight: 500 }}>
                {domains.length} domaines · {domains.reduce((acc, d) => acc + d.standards.length, 0)} standards
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["conforme", "partiel", "non-conforme"] as StatusType[]).map(s => {
                  const cfg = statusConfig[s];
                  const count = Object.values(assessments).filter(v => v === s).length;
                  return (
                    <div key={s} style={{
                      padding: "0.2rem 0.6rem",
                      background: cfg.bg, color: cfg.color,
                      border: `1px solid ${cfg.color}30`,
                      borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700,
                    }}>
                      {count} {cfg.label.toLowerCase()}
                    </div>
                  );
                })}
              </div>
            </div>

            {domains.map((domain, i) => (
              <DomainAccordion
                key={domain.id}
                domain={domain}
                assessments={assessments}
                fw={fwId}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
