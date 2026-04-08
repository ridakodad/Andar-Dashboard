"use client";

import AppLayout from "@/components/AppLayout";
import ScoreGauge from "@/components/dashboard/ScoreGauge";
import TrendChart from "@/components/dashboard/TrendChart";
import AlertsTable from "@/components/dashboard/AlertsTable";
import HeatMap from "@/components/dashboard/HeatMap";
import { DEMO_GLOBAL_SCORES, DEMO_KPIS } from "@/lib/demo-data";
import { useRouter } from "next/navigation";
import { Activity, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatBadgeProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  trend?: "up" | "down" | "stable";
  trendVal?: string;
  subtitle?: string;
}

function StatBadge({ icon: Icon, label, value, color, trend, trendVal, subtitle }: StatBadgeProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "#3D6B40" : trend === "down" ? "#9A2830" : "#8896A6";

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.25rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${color}, ${color}60)`,
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: "40px", height: "40px",
          borderRadius: "10px",
          background: `${color}12`,
          border: `1px solid ${color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={18} color={color} />
        </div>
        {trend && trendVal && (
          <div style={{
            display: "flex", alignItems: "center", gap: "3px",
            padding: "0.175rem 0.5rem",
            background: `${trendColor}10`,
            border: `1px solid ${trendColor}20`,
            borderRadius: "9999px",
          }}>
            <TrendIcon size={11} color={trendColor} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: trendColor }}>{trendVal}</span>
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: "0.62rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.25rem" }}>
          {label}
        </div>
        <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.02em" }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 500, marginTop: "0.25rem" }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const kpiNonConformes = DEMO_KPIS.filter(k => {
    if (k.unit === "%") return k.value < k.threshold.orange;
    return k.value > k.threshold.orange;
  }).length;

  const avgScore = Math.round((DEMO_GLOBAL_SCORES.AC + DEMO_GLOBAL_SCORES.JCI + DEMO_GLOBAL_SCORES.HAS) / 3);

  return (
    <AppLayout>
      <div style={{ maxWidth: "1400px" }}>

        {/* ── Page header ── */}
        <div className="page-header">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <h1 className="page-title">Vue d&apos;Ensemble</h1>
              <p className="page-subtitle">
                Conformité multi-référentiel · HUIM6 Rabat ·{" "}
                <span style={{ color: "var(--green)", fontWeight: 600 }}>
                  {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </span>
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(61,107,64,0.08)",
              border: "1px solid rgba(61,107,64,0.2)",
              borderRadius: "9999px",
              padding: "0.35rem 0.875rem",
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3D6B40", animation: "pulse-green 2s infinite" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3D6B40" }}>Données en temps réel</span>
            </div>
          </div>
        </div>

        {/* ── Stat badges ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatBadge
            icon={Activity}
            label="Score Global Moyen"
            value={`${avgScore}%`}
            color="#3D6B40"
            trend="up"
            trendVal="+2.1%"
            subtitle="vs mois précédent"
          />
          <StatBadge
            icon={AlertTriangle}
            label="Alertes Actives"
            value="10"
            color="#9A2830"
            trend="down"
            trendVal="-3"
            subtitle="non-conformités ouvertes"
          />
          <StatBadge
            icon={Clock}
            label="KPIs Hors Seuil"
            value={String(kpiNonConformes)}
            color="#D4830A"
            trend="stable"
            trendVal="=0"
            subtitle="indicateurs à risque"
          />
          <StatBadge
            icon={CheckCircle2}
            label="Standards Conformes"
            value="68%"
            color="#3D6B40"
            trend="up"
            trendVal="+4%"
            subtitle="sur tous référentiels"
          />
        </div>

        {/* ── Score gauges ── */}
        <div style={{ marginBottom: "0.5rem" }}>
          <div className="card-header" style={{ marginBottom: "1rem" }}>Scores par Référentiel</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreGauge label="Accreditation Canada" code="AC" score={DEMO_GLOBAL_SCORES.AC}
            onClick={() => router.push("/framework/AC")} />
          <ScoreGauge label="JCI 8ème Édition" code="JCI" score={DEMO_GLOBAL_SCORES.JCI}
            onClick={() => router.push("/framework/JCI")} />
          <ScoreGauge label="HAS V2025" code="HAS" score={DEMO_GLOBAL_SCORES.HAS}
            onClick={() => router.push("/framework/HAS")} />
        </div>

        {/* ── Trend + Alerts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TrendChart />
          <div className="overflow-x-auto w-full">
            <AlertsTable />
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div className="overflow-x-auto w-full pb-4">
          <HeatMap />
        </div>
      </div>
    </AppLayout>
  );
}
