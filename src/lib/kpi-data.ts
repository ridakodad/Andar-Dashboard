export interface KPIThreshold {
  green: { min?: number; max?: number }; // If missing min/max, it implies infinity in that direction
  amber: { min: number; max: number };
  red: { min?: number; max?: number };
  isInverse?: boolean; // If true, lower is better (e.g., Falls per 1000 days)
}

export interface KPI {
  id: string;
  section: "ipac" | "ps" | "op" | "gq";
  code: string;
  name: string;
  currentValue: number;
  unit: string;
  thresholds: KPIThreshold;
  frameworks: ("AC" | "JCI" | "HAS")[];
  history: number[]; // 6 data points for sparkline, 12 for full modal
}

export const KPI_SECTIONS = [
  { id: "ipac", name: "Prévention Infections" },
  { id: "ps", name: "Sécurité Patient" },
  { id: "op", name: "Opérationnel" },
  { id: "gq", name: "Gouvernance & Qualité" },
];

export const DEMO_KPIS: KPI[] = [
  // SECTION 1 — Prévention Infections
  {
    id: "ipac-1", section: "ipac", code: "IPAC-01", name: "Taux conformité hygiène mains",
    currentValue: 82, unit: "%",
    thresholds: { green: { min: 85 }, amber: { min: 70, max: 84 }, red: { max: 69 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [68, 70, 72, 75, 78, 80, 81, 80, 82, 85, 83, 82],
  },
  {
    id: "ipac-2", section: "ipac", code: "IPAC-02", name: "Taux infections nosocomiales",
    currentValue: 3.8, unit: "/1000j",
    thresholds: { green: { max: 3.0 }, amber: { min: 3.1, max: 5.0 }, red: { min: 5.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [4.5, 4.3, 4.0, 4.2, 3.9, 4.0, 3.8, 3.6, 3.5, 3.7, 3.9, 3.8],
  },
  {
    id: "ipac-3", section: "ipac", code: "IPAC-03", name: "Taux infections site opératoire",
    currentValue: 1.9, unit: "%",
    thresholds: { green: { max: 1.5 }, amber: { min: 1.6, max: 3.0 }, red: { min: 3.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [2.5, 2.3, 2.1, 2.2, 2.0, 1.8, 1.9, 1.7, 1.6, 1.8, 2.0, 1.9],
  },
  {
    id: "ipac-4", section: "ipac", code: "IPAC-04", name: "Infections liées cathéters (CLABSI)",
    currentValue: 1.2, unit: "/1000j",
    thresholds: { green: { max: 1.0 }, amber: { min: 1.1, max: 2.5 }, red: { min: 2.6 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [1.8, 1.7, 1.5, 1.6, 1.4, 1.3, 1.2, 1.1, 1.0, 1.2, 1.3, 1.2],
  },
  {
    id: "ipac-5", section: "ipac", code: "IPAC-05", name: "Personnel formé PCI",
    currentValue: 91, unit: "%",
    thresholds: { green: { min: 95 }, amber: { min: 80, max: 94 }, red: { max: 79 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [60, 65, 70, 75, 80, 85, 88, 89, 90, 92, 91, 91],
  },
  {
    id: "ipac-6", section: "ipac", code: "IPAC-06", name: "Délai signalement épidémie",
    currentValue: 4, unit: "h",
    thresholds: { green: { max: 2 }, amber: { min: 2.1, max: 12 }, red: { min: 12.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [8, 7.5, 7, 6, 5.5, 5, 4.5, 4, 3.5, 4, 3.8, 4],
  },

  // SECTION 2 — Sécurité Patient
  {
    id: "ps-1", section: "ps", code: "PS-01", name: "Identification patient (2 ID)",
    currentValue: 96, unit: "%",
    thresholds: { green: { min: 98 }, amber: { min: 90, max: 97 }, red: { max: 89 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [85, 87, 89, 90, 92, 94, 95, 96, 95, 97, 96, 96],
  },
  {
    id: "ps-2", section: "ps", code: "PS-02", name: "Checklist chirurgicale complète",
    currentValue: 93, unit: "%",
    thresholds: { green: { min: 95 }, amber: { min: 85, max: 94 }, red: { max: 84 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [75, 78, 80, 82, 85, 87, 89, 90, 92, 94, 93, 93],
  },
  {
    id: "ps-3", section: "ps", code: "PS-03", name: "Chutes / 1000 jours-patient",
    currentValue: 2.8, unit: "/1000j",
    thresholds: { green: { max: 3.0 }, amber: { min: 3.1, max: 6.0 }, red: { min: 6.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [4.5, 4.2, 4.0, 3.8, 3.5, 3.3, 3.0, 2.9, 2.7, 2.6, 2.9, 2.8],
  },
  {
    id: "ps-4", section: "ps", code: "PS-04", name: "Taux déclaration incidents",
    currentValue: 72, unit: "%",
    thresholds: { green: { min: 80 }, amber: { min: 50, max: 79 }, red: { max: 49 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [40, 45, 50, 55, 60, 65, 68, 70, 75, 76, 74, 72],
  },
  {
    id: "ps-5", section: "ps", code: "PS-05", name: "Erreurs médicamenteuses / 1000 prescriptions",
    currentValue: 1.4, unit: "/1000 pres",
    thresholds: { green: { max: 1.0 }, amber: { min: 1.1, max: 3.0 }, red: { min: 3.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [2.5, 2.3, 2.1, 2.0, 1.8, 1.6, 1.5, 1.4, 1.2, 1.3, 1.5, 1.4],
  },
  {
    id: "ps-6", section: "ps", code: "PS-06", name: "Réconciliation méd. à l'admission",
    currentValue: 78, unit: "%",
    thresholds: { green: { min: 90 }, amber: { min: 70, max: 89 }, red: { max: 69 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [50, 55, 60, 63, 67, 70, 72, 75, 77, 80, 79, 78],
  },
  {
    id: "ps-7", section: "ps", code: "PS-07", name: "Événements sentinelles / trimestre",
    currentValue: 1, unit: "",
    thresholds: { green: { max: 0 }, amber: { min: 1, max: 1 }, red: { min: 2 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [3, 2, 2, 1, 0, 1, 0, 0, 1, 0, 0, 1],
  },

  // SECTION 3 — Opérationnel
  {
    id: "op-1", section: "op", code: "OP-01", name: "Taux occupation lits",
    currentValue: 88, unit: "%",
    thresholds: { green: { min: 75, max: 90 }, amber: { min: 91, max: 95 }, red: { min: 96 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [82, 85, 87, 89, 91, 93, 94, 92, 90, 89, 87, 88],
  },
  {
    id: "op-2", section: "op", code: "OP-02", name: "DMS (durée moyenne séjour)",
    currentValue: 5.2, unit: "j",
    thresholds: { green: { max: 5.0 }, amber: { min: 5.1, max: 6.0 }, red: { min: 6.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [6.5, 6.3, 6.1, 5.9, 5.7, 5.5, 5.4, 5.3, 5.1, 5.0, 5.3, 5.2],
  },
  {
    id: "op-3", section: "op", code: "OP-03", name: "Taux annulation chirurgicale",
    currentValue: 3.8, unit: "%",
    thresholds: { green: { max: 2.0 }, amber: { min: 2.1, max: 5.0 }, red: { min: 5.1 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [6.0, 5.5, 5.0, 4.8, 4.5, 4.2, 4.0, 3.9, 3.7, 3.5, 3.6, 3.8],
  },
  {
    id: "op-4", section: "op", code: "OP-04", name: "Utilisation bloc opératoire",
    currentValue: 79, unit: "%",
    thresholds: { green: { min: 85 }, amber: { min: 70, max: 84 }, red: { max: 69 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [60, 62, 65, 68, 70, 72, 75, 77, 80, 82, 80, 79],
  },
  {
    id: "op-5", section: "op", code: "OP-05", name: "Temps attente urgences (médian)",
    currentValue: 42, unit: "min",
    thresholds: { green: { max: 30 }, amber: { min: 31, max: 60 }, red: { min: 61 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [75, 70, 65, 60, 55, 50, 48, 45, 43, 40, 41, 42],
  },
  {
    id: "op-6", section: "op", code: "OP-06", name: "Satisfaction patient",
    currentValue: 7.6, unit: "/10",
    thresholds: { green: { min: 8.0 }, amber: { min: 6.0, max: 7.9 }, red: { max: 5.9 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [6.0, 6.2, 6.5, 6.7, 7.0, 7.2, 7.3, 7.5, 7.8, 8.0, 7.7, 7.6],
  },

  // SECTION 4 — Gouvernance & Qualité
  {
    id: "gq-1", section: "gq", code: "GQ-01", name: "Standards conformes",
    currentValue: 68, unit: "%",
    thresholds: { green: { min: 90 }, amber: { min: 70, max: 89 }, red: { max: 69 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [45, 48, 50, 53, 56, 59, 62, 65, 68, 71, 70, 68],
  },
  {
    id: "gq-2", section: "gq", code: "GQ-02", name: "ROPs / impératifs conformes",
    currentValue: 84, unit: "%",
    thresholds: { green: { min: 100 }, amber: { min: 80, max: 99 }, red: { max: 79 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [50, 55, 60, 65, 70, 75, 78, 82, 85, 88, 86, 84],
  },
  {
    id: "gq-3", section: "gq", code: "GQ-03", name: "Actions correctives dans les délais",
    currentValue: 61, unit: "%",
    thresholds: { green: { min: 85 }, amber: { min: 60, max: 84 }, red: { max: 59 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 65, 61],
  },
  {
    id: "gq-4", section: "gq", code: "GQ-04", name: "Personnel formé qualité",
    currentValue: 76, unit: "%",
    thresholds: { green: { min: 90 }, amber: { min: 70, max: 89 }, red: { max: 69 } },
    frameworks: ["AC", "JCI", "HAS"],
    history: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 78, 76],
  },
  {
    id: "gq-5", section: "gq", code: "GQ-05", name: "Délai moyen résolution non-conformité",
    currentValue: 47, unit: "j",
    thresholds: { green: { max: 30 }, amber: { min: 31, max: 60 }, red: { min: 61 }, isInverse: true },
    frameworks: ["AC", "JCI", "HAS"],
    history: [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 48, 47],
  },
];

export function getStatus(value: number, threshold: KPIThreshold): "green" | "amber" | "red" {
  if (threshold.isInverse) {
    if (threshold.green.max !== undefined && value <= threshold.green.max) return "green";
    if (threshold.red.min !== undefined && value >= threshold.red.min) return "red";
    return "amber";
  } else {
    if (threshold.green.min !== undefined && value >= threshold.green.min) return "green";
    if (threshold.red.max !== undefined && value <= threshold.red.max) return "red";
    return "amber";
  }
}
