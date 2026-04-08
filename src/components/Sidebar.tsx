"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  ShieldCheck,
  Upload,
  ClipboardList,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems: { href: string; label: string; icon: React.ElementType; disabled?: boolean }[] = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/import", label: "Import Données", icon: Upload },
  { href: "/framework/AC", label: "Référentiels", icon: ShieldCheck },
  { href: "/actions", label: "Plans d'Action", icon: ClipboardList },
  { href: "/reports", label: "Rapports", icon: FileText },
];

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  quality: "Qualité",
  dept_head: "Chef de Département",
  viewer: "Lecteur",
};

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/framework/AC") return pathname.startsWith("/framework");
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-[256px] min-h-screen flex flex-col flex-shrink-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `} style={{ background: "#1E3A4A", borderRight: "1px solid rgba(255,255,255,0.10)" }}>

        {/* ── Logo area ── */}
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              width: "42px", height: "42px",
              background: "rgba(255,255,255,0.10)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.16)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/huim6_icon.png" alt="HUIM6" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#FFFFFF", letterSpacing: "0.04em", lineHeight: 1.1 }}>
                ANDAR
              </div>
              <div style={{ fontSize: "0.58rem", color: "#A8D0AA", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "1px" }}>
                أنظر · Conformité
              </div>
            </div>
          </div>

          {/* Hospital chip */}
          <div style={{
            background: "rgba(61,107,64,0.18)",
            border: "1px solid rgba(61,107,64,0.32)",
            borderRadius: "8px",
            padding: "0.5rem 0.75rem",
          }}>
            <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
              Établissement
            </div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7BC47F", lineHeight: 1.35 }}>
              Hôpital Univ. Int. Mohammed VI
            </div>
            <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: "1px" }}>
              Rabat, Maroc
            </div>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{
            fontSize: "0.58rem", color: "rgba(255,255,255,0.40)", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0 0.5rem", marginBottom: "0.5rem",
          }}>
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            if (item.disabled) {
              return (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.6rem 0.875rem", borderRadius: "0.5rem",
                  fontSize: "0.82rem", fontWeight: 500, color: "rgba(255,255,255,0.2)",
                  cursor: "not-allowed",
                }}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item${active ? " active" : ""}`}
                onClick={() => { if (onClose) onClose(); }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {active && <ChevronRight size={13} style={{ opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* ── User card ── */}
        {user && (
          <div style={{ padding: "0.875rem 0.75rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: "10px",
              padding: "0.875rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
                {/* Avatar */}
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #3D6B40, #2D5030)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 800, color: "white", flexShrink: 0,
                }}>
                  {(user.role === "admin" ? "A" : user.name?.[0] || "U")}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.90)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.role === "admin" ? "Dr. Akodad" : user.name}
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "#3D6B40", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {roleLabels[user.role] || user.role}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.4rem 0.5rem",
                  background: "rgba(154,40,48,0.08)",
                  border: "1px solid rgba(154,40,48,0.15)",
                  borderRadius: "6px",
                  color: "rgba(255,100,100,0.7)", fontSize: "0.72rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(154,40,48,0.18)";
                  e.currentTarget.style.color = "#FF8080";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(154,40,48,0.08)";
                  e.currentTarget.style.color = "rgba(255,100,100,0.7)";
                }}
              >
                <LogOut size={13} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
