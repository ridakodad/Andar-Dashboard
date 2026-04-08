"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, AlertCircle, Mail, Lock } from "lucide-react";

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
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "0.625rem",
    color: "#111827",
    fontSize: "0.9rem",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "Inter, sans-serif",
  };

  const inputFocused: React.CSSProperties = {
    ...inputBase,
    background: "#FFFFFF",
    border: "1px solid #3D6B40",
    boxShadow: "0 0 0 3px rgba(61,107,64,0.12)",
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

        {/* Content — logo mark top-left, main text upper area */}
        <div className="relative flex flex-col h-full p-14 z-10" style={{ justifyContent: "flex-start", paddingTop: "3.5rem" }}>
          {/* Top: small logo mark */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: "10px",
            padding: "0.5rem 0.875rem",
            alignSelf: "flex-start",
            marginBottom: "3rem",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_icon.png" alt="HUIM6" style={{ height: "22px", width: "auto" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em" }}>ANDAR</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#7BC47F", letterSpacing: "0.06em" }}>أنظر</span>
          </div>

          {/* Main text */}
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
              lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "0.25rem",
            }}>
              Hôpital Univ.<br />International<br />
              <span style={{ color: "#7BC47F" }}>Mohammed VI</span>
            </h1>

            <div style={{ 
              fontSize: "1.25rem", color: "rgba(255,255,255,0.8)", fontWeight: 700,
              marginBottom: "1rem", letterSpacing: "0.02em"
            }}>
              المستشفى الجامعي الدولي محمد السادس
            </div>

            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500, letterSpacing: "0.18em",
              textTransform: "uppercase", fontSize: "0.75rem",
            } as React.CSSProperties}>
              Rabat · Maroc
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login form — white panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-14 overflow-y-auto" style={{ background: "#FFFFFF" }}>

        {/* Mobile top brand bar */}
        <div className="md:hidden flex items-center gap-3 mb-8 self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/huim6_icon.png" alt="HUIM6" className="h-8 w-auto" />
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1A2332" }}>ANDAR</div>
            <div style={{ fontSize: "0.58rem", color: "#3D6B40", fontWeight: 700, letterSpacing: "0.1em" }}>HUIM6 · Rabat</div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Logo — no drop shadow since white bg matches logo */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/huim6_logo.png"
              alt="HUIM6"
              style={{ height: "80px", width: "auto" }}
            />
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{
              fontSize: "1.75rem", fontWeight: 800, color: "#111827",
              letterSpacing: "-0.02em", marginBottom: "0.4rem",
            }}>
              Connexion à ANDAR
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", fontWeight: 400 }}>
              <span style={{ color: "#3D6B40", fontWeight: 700 }}>أنظر</span>
              {" "}— Observer · Mesurer · Améliorer
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              background: "rgba(154,40,48,0.07)",
              border: "1px solid rgba(154,40,48,0.25)",
              borderRadius: "0.625rem",
              padding: "0.875rem 1rem",
              marginBottom: "1.5rem",
              color: "#9A2830", fontSize: "0.85rem", fontWeight: 500,
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
                color: "#374151", textTransform: "uppercase",
                letterSpacing: "0.07em", marginBottom: "0.5rem",
              }}>
                Adresse email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{
                  position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: focusedField === "email" ? "#3D6B40" : "#9CA3AF",
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
                color: "#374151", textTransform: "uppercase",
                letterSpacing: "0.07em", marginBottom: "0.5rem",
              }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: focusedField === "password" ? "#3D6B40" : "#9CA3AF",
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
                    color: "#9CA3AF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#374151")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
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
            borderTop: "1px solid #F3F4F6",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 500 }}>
              Accès réservé au personnel autorisé · HUIM6
            </p>
            <p style={{ fontSize: "0.68rem", color: "#D1D5DB", marginTop: "0.25rem" }}>
              Système de management de la qualité &amp; acréditation
            </p>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
