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
        <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A2332", letterSpacing: "-0.02em" }}>Plans d&apos;Action</h1>
              </div>
              <p style={{ color: "#4A5568", fontSize: "0.95rem" }}>
                Gestion et suivi des actions correctives (Tableau Kanban)
              </p>
            </div>
            
            <button style={{ 
              display: "flex", alignItems: "center", gap: "0.5rem", 
              background: "#3D6B40", color: "#FFFFFF", border: "none", 
              padding: "0.6rem 1rem", borderRadius: "0.5rem", 
              fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
              boxShadow: "0 2px 4px rgba(61,107,64,0.2)" 
            }}>
              <Plus size={16} /> Nouvelle action
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: "#FFFFFF", padding: "0.75rem 1rem", borderRadius: "0.75rem", 
          display: "flex", gap: "1rem", marginBottom: "1.5rem", flexShrink: 0,
          border: "1px solid #E2E5EC", boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
        }}>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", fontSize: "0.8rem", background: "#F8FAFC", color: "#1A2332", outline: "none" }}>
              <option>Tous les départements</option>
              <option>Bloc Opératoire</option>
              <option>DSI</option>
              <option>Pharmacie</option>
            </select>
          </div>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", fontSize: "0.8rem", background: "#F8FAFC", color: "#1A2332", outline: "none" }}>
              <option>Toutes les priorités</option>
              <option>Critique</option>
              <option>Haute</option>
              <option>Normale</option>
            </select>
          </div>
          <div>
            <select style={{ padding: "0.4rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #E2E5EC", fontSize: "0.8rem", background: "#F8FAFC", color: "#1A2332", outline: "none" }}>
              <option>Tous les référentiels</option>
              <option>Accreditation Canada</option>
              <option>JCI</option>
              <option>HAS</option>
            </select>
          </div>
        </div>

        {/* Kanban Board */}
        <div style={{ 
          flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "1.5rem", minHeight: 0, overflow: "hidden" 
        }}>
          {columns.map(col => {
            const colActions = actions.filter(a => a.status === col.title);
            
            return (
              <div 
                key={col.title}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.title)}
                style={{
                  background: "#F5F6FA", border: "1px solid #E2E5EC", borderRadius: "0.75rem",
                  display: "flex", flexDirection: "column", overflow: "hidden"
                }}
              >
                {/* Column Header */}
                <div style={{ 
                  padding: "1rem", borderBottom: "1px solid #E2E5EC", background: "#FFFFFF",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: col.color, display: "flex" }}>{col.icon}</span>
                    <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1A2332" }}>{col.title}</h2>
                  </div>
                  <div style={{ 
                    background: "#F1F5F9", color: "#4A5568", fontSize: "0.7rem", fontWeight: 800, 
                    padding: "0.15rem 0.5rem", borderRadius: "999px" 
                  }}>
                    {colActions.length}
                  </div>
                </div>

                {/* Cards Container */}
                <div style={{ 
                  flex: 1, padding: "1rem", overflowY: "auto", 
                  display: "flex", flexDirection: "column", gap: "0.75rem" 
                }}>
                  {colActions.map(action => {
                    const priorityStyle = getPriorityColor(action.priority);
                    
                    return (
                      <div
                        key={action.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, action.id)}
                        style={{
                          background: "#FFFFFF", border: `1px solid ${draggedId === action.id ? "#3D6B40" : "#E2E5EC"}`, 
                          borderRadius: "0.5rem", padding: "1rem", cursor: "grab",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)", position: "relative",
                          opacity: draggedId === action.id ? 0.5 : 1, transition: "border 0.2s"
                        }}
                      >
                        {/* Standard badge */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#3D6B40", background: "#F0FDF4", padding: "0.15rem 0.4rem", borderRadius: "0.25rem", border: "1px solid #DCFCE7" }}>
                            {action.standard}
                          </span>
                          
                          <span style={{ 
                            fontSize: "0.65rem", fontWeight: 700, color: priorityStyle.text, background: priorityStyle.bg, 
                            padding: "0.15rem 0.4rem", borderRadius: "0.25rem", 
                            display: "flex", alignItems: "center", gap: "0.25rem" 
                          }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: priorityStyle.dot }} />
                            {action.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1A2332", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                          {action.title}
                        </h3>

                        {/* Dept & assignee */}
                        <div style={{ fontSize: "0.75rem", color: "#4A5568", marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                          <span style={{ fontWeight: 600 }}>{action.department}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#E2E5EC", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A5568", fontSize: "0.5rem", fontWeight: 700 }}>
                              {action.assignee.charAt(0)}
                            </div>
                            <span>{action.assignee}</span>
                          </div>
                        </div>

                        {/* Footer (Deadline + Comments) */}
                        <div style={{ 
                          display: "flex", justifyContent: "space-between", alignItems: "center", 
                          paddingTop: "0.5rem", borderTop: "1px solid #F1F5F9" 
                        }}>
                          <div style={{ 
                            display: "flex", alignItems: "center", gap: "0.25rem", 
                            fontSize: "0.7rem", fontWeight: 600,
                            color: isOverdue(action.deadline) ? "#9A2830" : "#8896A6" 
                          }}>
                            <Calendar size={12} />
                            {new Date(action.deadline).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", color: "#8896A6" }}>
                            <MessageSquare size={12} />
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
