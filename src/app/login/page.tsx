"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, AlertCircle, Mail, Lock, ShieldCheck, Activity, FileText } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, label: "Multi-référentiel",  desc: "AC · JCI · HAS V2025" },
  { icon: Activity,    label: "KPIs en temps réel", desc: "26 indicateurs qualité" },
  { icon: FileText,    label: "Rapports PDF",        desc: "Export & accréditation" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) router.push("/dashboard");
    else setError(result.error || "Identifiants incorrects.");
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem 0.8rem 2.75rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "0.625rem",
    color: "#FFFFFF",
    fontSize: "0.9rem",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "Inter, sans-serif",
  };

  const inputFocused: React.CSSProperties = {
    ...inputBase,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(61,107,64,0.7)",
    boxShadow: "0 0 0 3px rgba(61,107,64,0.15)",
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ background: "#0F1923" }}>

      {/* ── LEFT: Photo + Brand (hidden on small mobile, 60% on desktop) ── */}
      <div className="relative hidden md:flex w-[60%] flex-shrink-0 flex-col">
        {/* Hospital photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/huim6_building.png"
          alt="HUIM6 Rabat"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(15,25,35,0.92) 0%, rgba(15,25,35,0.55) 60%, rgba(15,25,35,0.30) 100%)"
        }} />
        {/* Green accent strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{
          background: "linear-gradient(90deg, #3D6B40, #7BC47F, #3D6B40)"
        }} />

        {/* Content */}
        <div className="relative flex flex-col justify-between h-full p-14 z-10">
          {/* Top: small logo mark */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: "10px",
            padding: "0.5rem 0.875rem",
            alignSelf: "flex-start",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_icon.png" alt="HUIM6" style={{ height: "22px", width: "auto" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em" }}>ANDAR</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#7BC47F", letterSpacing: "0.06em" }}>أنظر</span>
          </div>

          {/* Bottom: main text */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(61,107,64,0.20)",
              border: "1px solid rgba(61,107,64,0.35)",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              marginBottom: "1.5rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7BC47F", display: "inline-block" }} />
              <span style={{ fontSize: "0.65rem", color: "#7BC47F", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Plateforme active · HUIM6
              </span>
            </div>

            <h1 style={{
              fontSize: "3.25rem", fontWeight: 900, color: "#FFFFFF",
              lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "0.75rem",
            }}>
              Hôpital Univ.<br />International<br />
              <span style={{ color: "#7BC47F" }}>Mohammed VI</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500, marginBottom: "2.5rem", letterSpacing: "0.18em",
              textTransform: "uppercase", fontSize: "0.75rem",
            } as React.CSSProperties}>
              Rabat · Maroc
            </p>

            {/* Feature pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {FEATURES.map(({ icon: Icon, label, desc }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: "0.875rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                }}>
                  <div style={{
                    width: "34px", height: "34px",
                    background: "rgba(61,107,64,0.20)",
                    border: "1px solid rgba(61,107,64,0.30)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="#7BC47F" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.90)" }}>{label}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login form (full width on mobile, 40% on desktop) ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-14 overflow-y-auto">

        {/* Mobile top brand bar */}
        <div className="md:hidden flex items-center gap-3 mb-8 self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/huim6_icon.png" alt="HUIM6" className="h-8 w-auto" />
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#FFFFFF" }}>ANDAR</div>
            <div style={{ fontSize: "0.58rem", color: "#3D6B40", fontWeight: 700, letterSpacing: "0.1em" }}>HUIM6 · Rabat</div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Logo */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/huim6_logo.png"
              alt="HUIM6"
              style={{ height: "72px", width: "auto", filter: "drop-shadow(0 4px 12px rgba(61,107,64,0.3))" }}
            />
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{
              fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF",
              letterSpacing: "-0.02em", marginBottom: "0.4rem",
            }}>
              Connexion à ANDAR
            </h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.40)", fontWeight: 400 }}>
              <span style={{ color: "#7BC47F", fontWeight: 700 }}>أنظر</span>
              {" "}— Observer · Mesurer · Améliorer
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              background: "rgba(154,40,48,0.12)",
              border: "1px solid rgba(154,40,48,0.30)",
              borderRadius: "0.625rem",
              padding: "0.875rem 1rem",
              marginBottom: "1.5rem",
              color: "#FF8080", fontSize: "0.85rem", fontWeight: 500,
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email field */}
            <div>
              <label style={{
                display: "block", fontSize: "0.72rem", fontWeight: 700,
                color: "rgba(255,255,255,0.50)", textTransform: "uppercase",
                letterSpacing: "0.07em", marginBottom: "0.5rem",
              }}>
                Adresse email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{
                  position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: focusedField === "email" ? "#7BC47F" : "rgba(255,255,255,0.25)",
                  transition: "color 0.2s",
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="votre.email@huim6.ma"
                  style={focusedField === "email" ? inputFocused : inputBase}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label style={{
                display: "block", fontSize: "0.72rem", fontWeight: 700,
                color: "rgba(255,255,255,0.50)", textTransform: "uppercase",
                letterSpacing: "0.07em", marginBottom: "0.5rem",
              }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: focusedField === "password" ? "#7BC47F" : "rgba(255,255,255,0.25)",
                  transition: "color 0.2s",
                }} />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    ...(focusedField === "password" ? inputFocused : inputBase),
                    paddingRight: "3rem",
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.30)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.30)")}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                marginTop: "0.5rem",
                background: loading
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, #3D6B40, #4E8A52)",
                color: loading ? "rgba(255,255,255,0.30)" : "#FFFFFF",
                border: "none",
                borderRadius: "0.625rem",
                fontWeight: 700, fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: loading ? "none" : "0 4px 16px rgba(61,107,64,0.35)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = "linear-gradient(135deg, #2D5030, #3D6B40)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,107,64,0.40)";
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.currentTarget.style.background = "linear-gradient(135deg, #3D6B40, #4E8A52)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(61,107,64,0.35)";
                }
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white",
                    animation: "spin 0.7s linear infinite", display: "inline-block",
                  }} />
                  Connexion en cours…
                </span>
              ) : "Se connecter"}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
              Accès réservé au personnel autorisé · HUIM6
            </p>
            <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.18)", marginTop: "0.25rem" }}>
              Système de management de la qualité & accréditation
            </p>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
