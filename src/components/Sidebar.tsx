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
} from "lucide-react";

const navItems: { href: string; label: string; icon: React.ElementType; disabled?: boolean }[] = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/import", label: "Import Données", icon: Upload },
  { href: "/framework/AC", label: "Référentiels", icon: ShieldCheck },
  { href: "/actions", label: "Plans d'Action", icon: ClipboardList },
  { href: "/reports", label: "Rapports", icon: FileText },
];

const roleLabels: Record<string, string> = {
  admin: "Admin",
  quality: "Qualité",
  dept_head: "Département",
  viewer: "Lecteur",
};

// Removed SVG logo component

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/framework/AC") return pathname.startsWith("/framework");
    return pathname === href;
  };

  return (
    <aside style={{
      width: "244px",
      minHeight: "100vh",
      background: "#FFFFFF",
      borderRight: "1px solid #E2E5EC",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Logo + Hospital name */}
      <div style={{ padding: "1.25rem", borderBottom: "1px solid #E2E5EC" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
          <div style={{
            width: "44px", height: "44px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_icon.png" alt="HUIM6" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1A2332", letterSpacing: "0.04em" }}>
              ANDAR
            </div>
            <div style={{ fontSize: "0.58rem", color: "#3D6B40", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Conformité · أنظر
            </div>
          </div>
        </div>
        {/* Hospital name */}
        <div style={{
          background: "#F5F6FA",
          border: "1px solid #E2E5EC",
          borderRadius: "0.375rem",
          padding: "0.5rem 0.625rem",
        }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#1A2332", lineHeight: 1.3 }}>
            Hôpital Universitaire International
          </div>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#3D6B40", lineHeight: 1.3 }}>
            Mohammed VI — Rabat
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0.875rem 0.625rem", display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ fontSize: "0.6rem", color: "#8896A6", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0 0.5rem", marginBottom: "0.4rem" }}>
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
                fontSize: "0.82rem", fontWeight: 500, color: "#A0AEC0",
                cursor: "not-allowed", borderLeft: "3px solid transparent",
              }}>
                <Icon size={15} />
                <span>{item.label} (Bientôt)</span>
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item${active ? " active" : ""}`}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {user && (
        <div style={{ padding: "0.875rem 0.625rem", borderTop: "1px solid #E2E5EC" }}>
          <div style={{
            background: "#F5F6FA",
            border: "1px solid #E2E5EC",
            borderRadius: "0.5rem",
            padding: "0.75rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3D6B40" }} />
              <div style={{ fontSize: "0.6rem", color: "#3D6B40", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {roleLabels[user.role] || user.role}
              </div>
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1A2332", marginBottom: "0.5rem" }}>
              {user.role === "admin" ? "Dr. Akodad — Admin" : user.name}
            </div>
            <button
              onClick={logout}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.375rem 0.5rem",
                background: "transparent", border: "none",
                borderRadius: "0.375rem",
                color: "#8896A6", fontSize: "0.75rem", fontWeight: 600,
                cursor: "pointer", transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#9A2830")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8896A6")}
            >
              <LogOut size={13} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
