// Demo data for CHU UM6SS Rabat (600-bed university hospital)
// This data is used in place of a real database for Phase 1

export const DEMO_HOSPITAL = {
  name: "HUIM6 — Rabat",
  city: "Rabat, Maroc",
  beds: 600,
  type: "Hôpital Universitaire International Mohammed VI",
};

export const DEMO_DEPARTMENTS = [
  { id: "REA", code: "REA", name: "Réanimation", headName: "Pr. Mohammed Benali", headEmail: "m.benali@churabat.ma" },
  { id: "URG", code: "URG", name: "Urgences", headName: "Dr. Fatima Zahra El Amrani", headEmail: "fz.elamrani@churabat.ma" },
  { id: "BLOC", code: "BLOC", name: "Bloc Opératoire", headName: "Pr. Karim Tazi", headEmail: "k.tazi@churabat.ma" },
  { id: "MED", code: "MED", name: "Médecine Interne", headName: "Pr. Sara Ouali", headEmail: "s.ouali@churabat.ma" },
  { id: "CHIR", code: "CHIR", name: "Chirurgie Générale", headName: "Pr. Ahmed Rachidi", headEmail: "a.rachidi@churabat.ma" },
  { id: "PHARM", code: "PHARM", name: "Pharmacie", headName: "Dr. Leila Bensouda", headEmail: "l.bensouda@churabat.ma" },
  { id: "STER", code: "STER", name: "Stérilisation", headName: "Mme. Nadia Chraibi", headEmail: "n.chraibi@churabat.ma" },
  { id: "LAB", code: "LAB", name: "Laboratoire", headName: "Dr. Omar Fassi", headEmail: "o.fassi@churabat.ma" },
  { id: "RADIO", code: "RADIO", name: "Radiologie", headName: "Pr. Youssef Berrada", headEmail: "y.berrada@churabat.ma" },
  { id: "PEDIA", code: "PEDIA", name: "Pédiatrie", headName: "Dr. Hanane Mokkar", headEmail: "h.mokkar@churabat.ma" },
];

export const DEMO_USERS = [
  { id: "usr-001", name: "Dr. Rida Akodad", email: "admin@churabat.ma", role: "admin" as const, departmentId: null },
  { id: "usr-002", name: "Mme. Imane Belkadi", email: "qualite@churabat.ma", role: "quality" as const, departmentId: null },
  { id: "usr-003", name: "Pr. Mohammed Benali", email: "m.benali@churabat.ma", role: "dept_head" as const, departmentId: "REA" },
  { id: "usr-004", name: "Dr. Fatima Zahra El Amrani", email: "fz.elamrani@churabat.ma", role: "dept_head" as const, departmentId: "URG" },
  { id: "usr-005", name: "Viewer", email: "viewer@churabat.ma", role: "viewer" as const, departmentId: null },
];

// Global compliance scores (realistic for a 600-bed CHU in accreditation preparation)
export const DEMO_GLOBAL_SCORES = {
  AC: 74,
  JCI: 68,
  HAS: 81,
};

// 12-month historical scores
export const DEMO_HISTORICAL_SCORES = [
  { month: "Avr 2025", AC: 58, JCI: 54, HAS: 66 },
  { month: "Mai 2025", AC: 60, JCI: 56, HAS: 68 },
  { month: "Juin 2025", AC: 61, JCI: 57, HAS: 70 },
  { month: "Juil 2025", AC: 63, JCI: 59, HAS: 71 },
  { month: "Août 2025", AC: 65, JCI: 60, HAS: 72 },
  { month: "Sep 2025", AC: 66, JCI: 61, HAS: 73 },
  { month: "Oct 2025", AC: 67, JCI: 62, HAS: 75 },
  { month: "Nov 2025", AC: 68, JCI: 63, HAS: 77 },
  { month: "Déc 2025", AC: 70, JCI: 65, HAS: 78 },
  { month: "Jan 2026", AC: 71, JCI: 66, HAS: 79 },
  { month: "Fév 2026", AC: 71, JCI: 67, HAS: 80 },
  { month: "Mar 2026", AC: 72, JCI: 68, HAS: 81 },
];

// Domain scores per framework
export const DEMO_AC_DOMAIN_SCORES = [
  { domain: "Leadership", code: "LD", score: 78 },
  { domain: "Gouvernance", code: "GOV", score: 71 },
  { domain: "Ressources Humaines", code: "HR", score: 69 },
  { domain: "Prévention Infections", code: "IPAC", score: 74 },
  { domain: "Gestion Médicaments", code: "MM", score: 62 },
  { domain: "Éducation Patient", code: "PFE", score: 80 },
  { domain: "Flux Patient", code: "PF", score: 65 },
  { domain: "Amélioration Qualité", code: "QI", score: 77 },
];

export const DEMO_JCI_DOMAIN_SCORES = [
  { domain: "APR", code: "APR", score: 82 },
  { domain: "IPSG", code: "IPSG", score: 71 },
  { domain: "ACC", code: "ACC", score: 67 },
  { domain: "MMU", code: "MMU", score: 60 },
  { domain: "QPS", code: "QPS", score: 74 },
  { domain: "PCI", code: "PCI", score: 69 },
  { domain: "GLD", code: "GLD", score: 73 },
  { domain: "HIT", code: "HIT", score: 55 },
  { domain: "PS", code: "PS", score: 66 },
];

export const DEMO_HAS_DOMAIN_SCORES = [
  { domain: "Le Patient", code: "CH1", score: 86 },
  { domain: "Équipes de Soins", code: "CH2", score: 79 },
  { domain: "L'Établissement", code: "CH3", score: 75 },
];

// Active alerts / non-conformities
export const DEMO_ALERTS = [
  {
    id: "alert-001",
    framework: "JCI",
    domain: "HIT",
    code: "HIT.5",
    title: "Politique de cybersécurité non formalisée",
    department: "DSI",
    daysPastDue: 45,
    responsible: "M. Karim Alaoui",
    priority: "critique" as const,
  },
  {
    id: "alert-002",
    framework: "AC",
    domain: "MM",
    code: "ROP-MED-01",
    title: "Électrolytes concentrés — stockage non sécurisé en REA",
    department: "Réanimation",
    daysPastDue: 32,
    responsible: "Pr. Mohammed Benali",
    priority: "critique" as const,
  },
  {
    id: "alert-003",
    framework: "HAS",
    domain: "CH2",
    code: "2.2-12",
    title: "Checklist bloc opératoire incomplète (78% vs 95% requis)",
    department: "Bloc Opératoire",
    daysPastDue: 28,
    responsible: "Pr. Karim Tazi",
    priority: "critique" as const,
  },
  {
    id: "alert-004",
    framework: "JCI",
    domain: "IPSG",
    code: "IPSG.1",
    title: "Taux identification patient — 89% (< 98% requis)",
    department: "Urgences",
    daysPastDue: 21,
    responsible: "Dr. Fatima Zahra El Amrani",
    priority: "haute" as const,
  },
  {
    id: "alert-005",
    framework: "AC",
    domain: "HR",
    code: "AC-HR-03",
    title: "Plan de formation continue non mis à jour (2024)",
    department: "Direction RH",
    daysPastDue: 18,
    responsible: "Mme. Souad Berrada",
    priority: "haute" as const,
  },
  {
    id: "alert-006",
    framework: "HAS",
    domain: "CH2",
    code: "2.4-02",
    title: "Protocole antibiothérapie non conforme aux dernières recommandations",
    department: "Pharmacie",
    daysPastDue: 15,
    responsible: "Dr. Leila Bensouda",
    priority: "haute" as const,
  },
  {
    id: "alert-007",
    framework: "JCI",
    domain: "MMU",
    code: "MMU.7",
    title: "Réconciliation médicamenteuse à l'admission < 70%",
    department: "Médecine Interne",
    daysPastDue: 12,
    responsible: "Pr. Sara Ouali",
    priority: "haute" as const,
  },
  {
    id: "alert-008",
    framework: "AC",
    domain: "IPAC",
    code: "ROP-IPAC-01",
    title: "Hygiène mains — audit service chirurgie : 72% (< 85%)",
    department: "Chirurgie Générale",
    daysPastDue: 8,
    responsible: "Pr. Ahmed Rachidi",
    priority: "moyenne" as const,
  },
  {
    id: "alert-009",
    framework: "HAS",
    domain: "CH3",
    code: "3.1-02",
    title: "EI graves non déclarés — 3 incidents non tracés Q1 2026",
    department: "Réanimation",
    daysPastDue: 5,
    responsible: "Cellule Qualité",
    priority: "moyenne" as const,
  },
  {
    id: "alert-010",
    framework: "JCI",
    domain: "PS",
    code: "PS.3",
    title: "Événement sentinelle de Mars — analyse causes profondes en attente",
    department: "Bloc Opératoire",
    daysPastDue: 3,
    responsible: "Dr. Imane Belkadi",
    priority: "moyenne" as const,
  },
];

// Department x Domain heatmap data
// Score 0-100 for each dept × AC domain
export const DEMO_HEATMAP = {
  departments: ["REA", "URG", "BLOC", "MED", "CHIR", "PHARM", "STER", "LAB"],
  AC: {
    domains: ["LD", "GOV", "HR", "IPAC", "MM", "PFE", "PF", "QI"],
    scores: [
      // REA
      [80, 72, 65, 78, 55, 82, 70, 75],
      // URG
      [75, 68, 70, 71, 63, 77, 58, 72],
      // BLOC
      [78, 70, 68, 80, 60, 75, 72, 78],
      // MED
      [82, 75, 72, 69, 68, 85, 74, 80],
      // CHIR
      [76, 69, 67, 72, 65, 73, 70, 74],
      // PHARM
      [70, 73, 75, 76, 80, 70, 65, 78],
      // STER
      [85, 80, 78, 88, 70, 65, 78, 82],
      // LAB
      [78, 76, 75, 82, 68, 72, 70, 76],
    ],
  },
};

// KPIs demo data
export const DEMO_KPIS = [
  { code: "IPAC-01", name: "Taux hygiène mains", value: 82, unit: "%", trend: "+3.2%", trendUp: true, threshold: { green: 85, orange: 70 } },
  { code: "IPAC-02", name: "Infections nosocomiales", value: 3.8, unit: "/1000j", trend: "-0.4", trendUp: false, threshold: { green: 3.0, orange: 5.0 } },
  { code: "PS-01", name: "Identification patient (2 ID)", value: 89, unit: "%", trend: "+1.5%", trendUp: true, threshold: { green: 98, orange: 90 } },
  { code: "PS-02", name: "Checklist chirurgicale", value: 78, unit: "%", trend: "+5%", trendUp: true, threshold: { green: 95, orange: 85 } },
  { code: "PS-03", name: "Chutes / 1000j", value: 4.2, unit: "/1000j", trend: "-0.3", trendUp: false, threshold: { green: 3.0, orange: 6.0 } },
  { code: "PS-05", name: "Erreurs médicamenteuses", value: 2.1, unit: "/1000 pres", trend: "-0.2", trendUp: false, threshold: { green: 1.0, orange: 3.0 } },
  { code: "OP-01", name: "Taux occupation lits", value: 87, unit: "%", trend: "+2%", trendUp: true, threshold: { green: 85, orange: 91 } },
  { code: "OP-05", name: "Temps attente urgences", value: 42, unit: "min", trend: "-5min", trendUp: false, threshold: { green: 30, orange: 60 } },
  { code: "GQ-01", name: "Standards conformes AC", value: 72, unit: "%", trend: "+4%", trendUp: true, threshold: { green: 90, orange: 70 } },
  { code: "GQ-03", name: "Actions correctives dans délais", value: 68, unit: "%", trend: "+8%", trendUp: true, threshold: { green: 85, orange: 60 } },
];

// Assessment data for framework page
export type AssessmentStatus = "conforme" | "partiel" | "non-conforme" | "na";

export const DEMO_AC_ASSESSMENTS: Record<string, AssessmentStatus> = {
  "AC-LD-01": "conforme",
  "AC-LD-02": "conforme",
  "AC-LD-03": "partiel",
  "AC-LD-04": "partiel",
  "AC-LD-05": "conforme",
  "AC-GOV-01": "conforme",
  "AC-GOV-02": "partiel",
  "AC-GOV-03": "conforme",
  "AC-GOV-04": "partiel",
  "AC-HR-01": "partiel",
  "AC-HR-02": "conforme",
  "AC-HR-03": "non-conforme",
  "AC-HR-04": "partiel",
  "AC-HR-05": "partiel",
  "AC-IPAC-01": "conforme",
  "AC-IPAC-02": "partiel",
  "AC-IPAC-03": "conforme",
  "AC-IPAC-04": "partiel",
  "AC-IPAC-05": "conforme",
  "AC-MM-01": "non-conforme",
  "AC-MM-02": "partiel",
  "AC-MM-03": "partiel",
  "AC-MM-04": "non-conforme",
  "AC-MM-05": "partiel",
  "AC-PFE-01": "conforme",
  "AC-PFE-02": "conforme",
  "AC-PFE-03": "conforme",
  "AC-PF-01": "partiel",
  "AC-PF-02": "non-conforme",
  "AC-PF-03": "partiel",
  "AC-QI-01": "conforme",
  "AC-QI-02": "conforme",
  "AC-QI-03": "partiel",
  "AC-QI-04": "conforme",
};

export const DEMO_JCI_ASSESSMENTS: Record<string, AssessmentStatus> = {
  "JCI-APR-01": "conforme",
  "JCI-APR-02": "partiel",
  "JCI-IPSG-01": "partiel",
  "JCI-IPSG-02": "conforme",
  "JCI-IPSG-03": "partiel",
  "JCI-IPSG-04": "non-conforme",
  "JCI-IPSG-05": "partiel",
  "JCI-IPSG-06": "partiel",
  "JCI-ACC-01": "partiel",
  "JCI-ACC-02": "conforme",
  "JCI-ACC-03": "partiel",
  "JCI-MMU-01": "partiel",
  "JCI-MMU-02": "conforme",
  "JCI-MMU-04": "partiel",
  "JCI-MMU-07": "non-conforme",
  "JCI-QPS-01": "conforme",
  "JCI-QPS-03": "conforme",
  "JCI-QPS-06": "partiel",
  "JCI-PCI-01": "conforme",
  "JCI-PCI-05": "partiel",
  "JCI-PCI-07": "conforme",
  "JCI-GLD-01": "conforme",
  "JCI-GLD-06": "partiel",
  "JCI-HIT-01": "partiel",
  "JCI-HIT-03": "partiel",
  "JCI-HIT-05": "non-conforme",
  "JCI-PS-01": "partiel",
  "JCI-PS-02": "partiel",
  "JCI-PS-03": "partiel",
};

export const DEMO_HAS_ASSESSMENTS: Record<string, AssessmentStatus> = {
  "HAS-1.1-01": "conforme",
  "HAS-1.1-02": "conforme",
  "HAS-1.1-03": "conforme",
  "HAS-1.2-01": "partiel",
  "HAS-1.2-02": "partiel",
  "HAS-1.2-03": "conforme",
  "HAS-1.3-01": "conforme",
  "HAS-1.3-02": "conforme",
  "HAS-1.4-01": "conforme",
  "HAS-1.4-02": "partiel",
  "HAS-2.1-01": "conforme",
  "HAS-2.1-02": "partiel",
  "HAS-2.2-12": "non-conforme",
  "HAS-2.2-02": "partiel",
  "HAS-2.3-01": "conforme",
  "HAS-2.3-02": "partiel",
  "HAS-2.3-03": "conforme",
  "HAS-2.3-04": "partiel",
  "HAS-2.4-02": "non-conforme",
  "HAS-2.4-03": "partiel",
  "HAS-2.4-04": "partiel",
  "HAS-3.1-01": "conforme",
  "HAS-3.1-02": "partiel",
  "HAS-3.2-01": "partiel",
  "HAS-3.2-02": "conforme",
  "HAS-3.3-05": "partiel",
  "HAS-3.6-01": "conforme",
  "HAS-3.6-02": "non-conforme",
  "HAS-3.6-03": "na",
};
