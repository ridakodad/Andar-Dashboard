"use client";

import AppLayout from "@/components/AppLayout";
import ScoreGauge from "@/components/dashboard/ScoreGauge";
import TrendChart from "@/components/dashboard/TrendChart";
import AlertsTable from "@/components/dashboard/AlertsTable";
import HeatMap from "@/components/dashboard/HeatMap";
import { DEMO_GLOBAL_SCORES, DEMO_KPIS } from "@/lib/demo-data";
import { useRouter } from "next/navigation";
import { Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

function StatBadge({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", gap: "1rem",
      background: "#FFFFFF", border: "1px solid #E2E5EC",
      borderRadius: "0.75rem", padding: "1rem 1.25rem",
      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "10px",
        background: `${color}12`, border: `1px solid ${color}25`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: "0.65rem", color: "#8896A6", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
          {label}
        </div>
        <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1A2332", lineHeight: 1.2 }}>{value}</div>
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

  return (
    <AppLayout>
      <div style={{ maxWidth: "1400px" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A2332", letterSpacing: "-0.02em" }}>Vue d&apos;Ensemble</h1>
            <span style={{ fontSize: "0.8rem", color: "#8896A6", fontWeight: 500 }}>
              HUIM6 — Rabat · {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </span>
          </div>
          <p style={{ color: "#4A5568", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Conformité multi-référentiel — Accreditation Canada · JCI 8ème Éd. · HAS V2025
          </p>
        </div>

        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatBadge icon={Activity} label="Score Global Moyen"
            value={`${Math.round((DEMO_GLOBAL_SCORES.AC + DEMO_GLOBAL_SCORES.JCI + DEMO_GLOBAL_SCORES.HAS) / 3)}%`}
            color="#3D6B40" />
          <StatBadge icon={AlertTriangle} label="Alertes Actives" value="10" color="#9A2830" />
          <StatBadge icon={Clock} label="KPIs Hors Seuil" value={String(kpiNonConformes)} color="#D4830A" />
          <StatBadge icon={CheckCircle2} label="Standards Conformes" value="68%" color="#3D6B40" />
        </div>

        {/* Score gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreGauge label="Accreditation Canada" code="AC" score={DEMO_GLOBAL_SCORES.AC}
            onClick={() => router.push("/framework/AC")} />
          <ScoreGauge label="JCI 8ème Édition" code="JCI" score={DEMO_GLOBAL_SCORES.JCI}
            onClick={() => router.push("/framework/JCI")} />
          <ScoreGauge label="HAS V2025" code="HAS" score={DEMO_GLOBAL_SCORES.HAS}
            onClick={() => router.push("/framework/HAS")} />
        </div>

        {/* Trend + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TrendChart />
          <div className="overflow-x-auto w-full">
            <AlertsTable />
          </div>
        </div>

        {/* Heatmap */}
        <div className="overflow-x-auto w-full pb-4">
          <HeatMap />
        </div>
      </div>
    </AppLayout>
  );
}
