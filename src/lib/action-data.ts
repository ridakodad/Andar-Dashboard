export type Priority = "Critique" | "Haute" | "Normale";
export type Status = "À faire" | "En cours" | "Terminé";

export interface ActionPlan {
  id: string;
  title: string;
  standard: string;
  department: string;
  priority: Priority;
  deadline: string; // ISO format or string "15 avril 2026"
  assignee: string;
  status: Status;
}

export const DEMO_ACTIONS: ActionPlan[] = [
  // A faire (5)
  { id: "act-01", title: "Formaliser politique cybersécurité", standard: "JCI HIT.5", department: "DSI", priority: "Critique", deadline: "2026-04-15", assignee: "Karim Alaoui", status: "À faire" },
  { id: "act-02", title: "Former 100% personnel hygiène mains", standard: "AC IPAC-01", department: "Contrôle Infectieux", priority: "Haute", deadline: "2026-04-30", assignee: "Dr. Lahlou", status: "À faire" },
  { id: "act-03", title: "Auditer stockage produits inflammables", standard: "HAS 3.2-02", department: "Services Techniques", priority: "Normale", deadline: "2026-05-10", assignee: "Amine Tazi", status: "À faire" },
  { id: "act-04", title: "Mettre à jour fiches de poste médicaux", standard: "AC HR-02", department: "RH", priority: "Normale", deadline: "2026-06-01", assignee: "Souad Berrada", status: "À faire" },
  { id: "act-05", title: "Achat nouveaux chariots d'urgence", standard: "JCI MMU.4", department: "Achat & Logistique", priority: "Critique", deadline: "2026-04-05", assignee: "Mehdi Omar", status: "À faire" },

  // En cours (7)
  { id: "act-06", title: "Implémenter checklist chirurgicale numérique", standard: "JCI PS-02", department: "Bloc Opératoire", priority: "Haute", deadline: "2026-05-15", assignee: "Pr. Tazi", status: "En cours" },
  { id: "act-07", title: "Réduire DMS orthopédie de 6.1j à 5.0j", standard: "OP-02", department: "Orthopédie", priority: "Normale", deadline: "2026-06-30", assignee: "Pr. Ouali", status: "En cours" },
  { id: "act-08", title: "Mettre à jour protocole électrolytes concentrés", standard: "AC Medication", department: "Pharmacie", priority: "Critique", deadline: "2026-04-10", assignee: "Dr. Bensouda", status: "En cours" },
  { id: "act-09", title: "Intégration HIS avec laboratoire", standard: "HAS 1.3-02", department: "DSI", priority: "Haute", deadline: "2026-05-20", assignee: "Karim Alaoui", status: "En cours" },
  { id: "act-10", title: "Campagne vaccination grippe personnel", standard: "AC IPAC-05", department: "Contrôle Infectieux", priority: "Normale", deadline: "2026-04-30", assignee: "Mme. Chraibi", status: "En cours" },
  { id: "act-11", title: "Renouvellement affichage évacuation", standard: "JCI ACC-03", department: "Sécurité", priority: "Normale", deadline: "2026-05-05", assignee: "Youssef Nadir", status: "En cours" },
  { id: "act-12", title: "Audit prescription antibiotiques", standard: "AC MM-03", department: "Pharmacie", priority: "Haute", deadline: "2026-04-25", assignee: "Dr. Bensouda", status: "En cours" },

  // Terminé (3)
  { id: "act-13", title: "Création comité bientraitance", standard: "HAS 1.1-01", department: "Direction Générale", priority: "Normale", deadline: "2026-03-10", assignee: "Dr. Rida Akodad", status: "Terminé" },
  { id: "act-14", title: "Formation identification patient (2 IDs)", standard: "JCI IPSG-01", department: "Qualité", priority: "Critique", deadline: "2026-02-28", assignee: "Imane Belkadi", status: "Terminé" },
  { id: "act-15", title: "Simulation incendie annuelle", standard: "JCI FMS-05", department: "Sécurité", priority: "Haute", deadline: "2026-03-15", assignee: "Youssef Nadir", status: "Terminé" },
];
