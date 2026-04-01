export interface ParsedRow {
  [key: string]: string | number | boolean | null;
}

export interface ImportTemplate {
  code: string;
  label: string;
  description: string;
  columns: string[];
  frequency: string;
  kpis: string[];
}

export const TEMPLATES: ImportTemplate[] = [
  {
    code: "audit_ipac",
    label: "Audit IPAC",
    description: "Audits hygiène des mains et contrôle des infections",
    columns: ["date", "service", "item_audit", "conforme", "observateur", "commentaire"],
    frequency: "Mensuel",
    kpis: ["IPAC-01", "IPAC-05"],
  },
  {
    code: "incidents",
    label: "Incidents & EI",
    description: "Événements indésirables et incidents de sécurité",
    columns: ["date", "type", "gravité", "service", "description", "action_corrective", "statut"],
    frequency: "Continu",
    kpis: ["PS-04"],
  },
  {
    code: "medications",
    label: "Erreurs Médicamenteuses",
    description: "Incidents liés à la gestion des médicaments",
    columns: ["date", "type_erreur", "médicament", "service", "patient_id_anon", "issue", "résolution"],
    frequency: "Mensuel",
    kpis: ["PS-05", "PS-06"],
  },
  {
    code: "hand_hygiene",
    label: "Hygiène des Mains",
    description: "Observations conformité hygiène mains par service",
    columns: ["date", "service", "observations", "conformes", "taux"],
    frequency: "Hebdomadaire",
    kpis: ["IPAC-01"],
  },
  {
    code: "surgical_checklist",
    label: "Checklist Chirurgicale",
    description: "Conformité checklist bloc opératoire par intervention",
    columns: ["date", "salle", "chirurgien", "checklist_complete", "items_manquants"],
    frequency: "Par intervention",
    kpis: ["PS-02"],
  },
  {
    code: "patient_falls",
    label: "Chutes Patients",
    description: "Incidents chutes et évaluation des risques",
    columns: ["date", "service", "patient_id_anon", "gravité", "évaluation_risque_faite"],
    frequency: "Continu",
    kpis: ["PS-03"],
  },
  {
    code: "nosocomial_infections",
    label: "Infections Nosocomiales",
    description: "Surveillance des infections associées aux soins",
    columns: ["date", "type_infection", "service", "germe", "lié_dispositif"],
    frequency: "Mensuel",
    kpis: ["IPAC-02", "IPAC-03", "IPAC-04"],
  },
  {
    code: "satisfaction_patient",
    label: "Satisfaction Patient",
    description: "Résultats enquêtes de satisfaction",
    columns: ["date", "service", "score_global", "commentaires", "recommandation"],
    frequency: "Trimestriel",
    kpis: ["OP-06"],
  },
];
