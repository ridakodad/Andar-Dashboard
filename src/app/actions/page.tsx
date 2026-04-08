"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { DEMO_ACTIONS, ActionPlan, Status, Priority } from "@/lib/action-data";
import { AlertCircle, Calendar, MessageSquare, Plus, Clock, CheckCircle2 } from "lucide-react";

export default function ActionsPage() {
  const [actions, setActions] = useState<ActionPlan[]>(DEMO_ACTIONS);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const columns: { title: Status; icon: React.ReactNode; color: string }[] = [
    { title: "À faire", icon: <AlertCircle size={16} />, color: "#8896A6" },
    { title: "En cours", icon: <Clock size={16} />, color: "#D4830A" },
    { title: "Terminé", icon: <CheckCircle2 size={16} />, color: "#3D6B40" },
  ];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    if (!draggedId) return;
    
    setActions(prev => prev.map(a => 
      a.id === draggedId ? { ...a, status } : a
    ));
    setDraggedId(null);
  };

  const getPriorityColor = (priority: Priority) => {
    if (priority === "Critique") return { bg: "#FEE2E2", text: "#9A2830", dot: "#9A2830" };
    if (priority === "Haute") return { bg: "#FEF3C7", text: "#D4830A", dot: "#D4830A" };
    return { bg: "#F1F5F9", text: "#4A5568", dot: "#8896A6" };
  };

  const isOverdue = (deadlineStr: string) => {
    if (deadlineStr.includes("2026-04")) return false; // Simple mock logic for demo
    const date = new Date(deadlineStr);
    return date < new Date(); 
  };

  return (
    <AppLayout>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 4rem)" }}>
        
        {/* Header */}
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 className="page-title">Plans d&apos;Action</h1>
            <p className="page-subtitle">Gestion et suivi des actions correctives (Tableau Kanban)</p>
          </div>
          
          <button className="btn-primary">
            <Plus size={16} /> Nouvelle action
          </button>
        </div>

        {/* Filters */}
        <div style={{ 
          background: "var(--card)", padding: "0.875rem 1.25rem", borderRadius: "var(--radius)", 
          display: "flex", gap: "1.25rem", marginBottom: "1.5rem", flexShrink: 0,
          border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)"
        }}>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.8rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", fontWeight: 500 }}>
              <option>Tous les départements</option>
              <option>Bloc Opératoire</option>
              <option>DSI</option>
              <option>Pharmacie</option>
            </select>
          </div>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.8rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", fontWeight: 500 }}>
              <option>Toutes les priorités</option>
              <option>Critique</option>
              <option>Haute</option>
              <option>Normale</option>
            </select>
          </div>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.8rem", background: "var(--bg)", color: "var(--text-primary)", outline: "none", fontWeight: 500 }}>
              <option>Tous les référentiels</option>
              <option>Accreditation Canada</option>
              <option>JCI</option>
              <option>HAS</option>
            </select>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-3 gap-6 min-h-0 overflow-y-auto md:overflow-hidden">
          {columns.map(col => {
            const colActions = actions.filter(a => a.status === col.title);
            
            return (
              <div 
                key={col.title}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.title)}
                style={{
                  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
                  display: "flex", flexDirection: "column", overflow: "hidden"
                }}
              >
                {/* Column Header */}
                <div style={{ 
                  padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", background: "var(--card)",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ color: col.color, display: "flex" }}>{col.icon}</span>
                    <h2 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.02em" }}>{col.title}</h2>
                  </div>
                  <div style={{ 
                    background: "var(--bg)", color: "var(--text-secondary)", fontSize: "0.65rem", fontWeight: 800, 
                    padding: "0.15rem 0.5rem", borderRadius: "999px", border: "1px solid var(--border)"
                  }}>
                    {colActions.length}
                  </div>
                </div>

                {/* Cards Container */}
                <div style={{ 
                  flex: 1, padding: "1rem", overflowY: "auto", 
                  display: "flex", flexDirection: "column", gap: "0.75rem" 
                }}>
                  {colActions.map((action, i) => {
                    const priorityStyle = getPriorityColor(action.priority);
                    
                    return (
                      <div
                        key={action.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, action.id)}
                        className="card card-hover card-enter"
                        style={{
                          padding: "1.25rem", cursor: "grab",
                          position: "relative",
                          opacity: draggedId === action.id ? 0.5 : 1, 
                          borderColor: draggedId === action.id ? "var(--green)" : "var(--border)",
                          animationDelay: `${i * 0.05}s`,
                        }}
                      >
                        {/* Standard badge */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "var(--green)", background: "var(--green-muted)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-xs)", border: "1px solid rgba(61,107,64,0.15)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                            {action.standard}
                          </span>
                          
                          <span style={{ 
                            fontSize: "0.62rem", fontWeight: 800, color: priorityStyle.text, background: priorityStyle.bg, 
                            padding: "0.15rem 0.5rem", borderRadius: "0.4rem", 
                            display: "flex", alignItems: "center", gap: "0.3rem",
                            textTransform: "uppercase"
                          }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: priorityStyle.dot }} />
                            {action.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: "0.75rem" }}>
                          {action.title}
                        </h3>

                        {/* Dept & assignee */}
                        <div style={{ fontSize: "0.78rem", color: "var(--text-body)", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ fontWeight: 700, fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{action.department}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "0.6rem", fontWeight: 800 }}>
                              {action.assignee.charAt(0)}
                            </div>
                            <span style={{ fontWeight: 500 }}>{action.assignee}</span>
                          </div>
                        </div>

                        {/* Footer (Deadline + Comments) */}
                        <div style={{ 
                          display: "flex", justifyContent: "space-between", alignItems: "center", 
                          paddingTop: "0.75rem", borderTop: "1px solid var(--border)" 
                        }}>
                          <div style={{ 
                            display: "flex", alignItems: "center", gap: "0.375rem", 
                            fontSize: "0.72rem", fontWeight: 700,
                            color: isOverdue(action.deadline) ? "var(--red)" : "var(--text-muted)" 
                          }}>
                            <Calendar size={13} />
                            {new Date(action.deadline).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>
                            <MessageSquare size={13} />
                            {Math.floor(Math.random() * 3)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {colActions.length === 0 && (
                    <div style={{ 
                      padding: "2rem", textAlign: "center", color: "#A0AEC0", 
                      fontSize: "0.8rem", fontWeight: 500, border: "1px dashed #E2E5EC", borderRadius: "0.5rem" 
                    }}>
                      Glissez une action ici
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
