"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) router.push("/dashboard");
    else setError(result.error || "Erreur de connexion.");
  };

  const inputStyle = {
    width: "100%", padding: "0.875rem 1.25rem",
    background: "#F8FAFC", border: "1px solid #E2E5EC",
    borderRadius: "0.5rem", color: "#1A2332",
    fontSize: "0.95rem", outline: "none",
    transition: "all 0.15s",
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F6FA]">
      
      {/* Left Photo Side (30% on mobile, 60% on desktop) */}
      <div className="relative w-full md:w-[60%] h-[30vh] md:h-screen flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/huim6_building.png" 
          alt="HUIM6 Rabat" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1118]/90 via-[#0C1118]/70 to-[#0C1118]/40" />
        
        <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end">
          <h1 className="text-xl md:text-5xl font-black text-white leading-tight mb-1 md:mb-4 tracking-tight">
            Hôpital Universitaire<br className="hidden md:block"/> International<br className="hidden md:block"/> Mohammed VI
          </h1>
          <div className="text-[#8896A6] text-xs md:text-sm font-bold tracking-[0.2em] mb-2 md:mb-6 uppercase">
            Rabat, Maroc
          </div>
          <div className="inline-block bg-[#3D6B40]/20 border border-[#3D6B40]/30 backdrop-blur-md rounded-lg p-2 md:p-4 self-start">
            <p className="text-white font-medium text-xs md:text-lg">Plateforme de Conformité & Accréditation Hospitalière</p>
          </div>
        </div>
      </div>

      {/* Right Form Side (70% on mobile, 40% on desktop) */}
      <div className="flex-1 w-full md:w-[40%] flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div style={{ maxWidth: "400px", width: "100%", margin: "0 auto", textAlign: "center" }}>
          
          {/* Logo moved above form */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_logo.png" alt="HUIM6" style={{ height: "80px", width: "auto" }} />
          </div>

          <div style={{ marginBottom: "2.5rem", textAlign: "left" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1A2332", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              Connexion à ANDAR
            </h2>
            <p style={{ fontSize: "1rem", color: "#4A5568", fontWeight: 500 }}>
              <span style={{ color: "#3D6B40", fontWeight: 700 }}>أنظر</span> — Observer, Mesurer, Améliorer
            </p>
          </div>

          <div style={{ textAlign: "left" }}>
            {error && (
              <div style={{
                background: "rgba(154,40,48,0.08)", border: "1px solid rgba(154,40,48,0.2)",
                borderRadius: "0.5rem", padding: "1rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
                color: "#9A2830", fontSize: "0.9rem", marginBottom: "1.5rem", fontWeight: 500,
              }}>
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1A2332", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  Adresse email
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle}
                  placeholder="votre.email@huim6.ma"
                  onFocus={e => { e.target.style.borderColor = "#3D6B40"; e.target.style.boxShadow = "0 0 0 3px rgba(61,107,64,0.1)"; e.target.style.background = "#FFFFFF" }}
                  onBlur={e => { e.target.style.borderColor = "#E2E5EC"; e.target.style.boxShadow = "none"; e.target.style.background = "#F8FAFC" }} />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#1A2332", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  Mot de passe
                </label>
                <div style={{ position: "relative" }}>
                  <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: "3rem" }}
                    onFocus={e => { e.target.style.borderColor = "#3D6B40"; e.target.style.boxShadow = "0 0 0 3px rgba(61,107,64,0.1)"; e.target.style.background = "#FFFFFF" }}
                    onBlur={e => { e.target.style.borderColor = "#E2E5EC"; e.target.style.boxShadow = "none"; e.target.style.background = "#F8FAFC" }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                    position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#8896A6",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "1rem",
                background: loading ? "#E2E5EC" : "#3D6B40",
                color: loading ? "#8896A6" : "white",
                border: "none", borderRadius: "0.5rem",
                fontWeight: 700, fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: loading ? "none" : "0 4px 12px rgba(61,107,64,0.25)",
              }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#2D5030"; e.currentTarget.style.transform = "translateY(-1px)"} }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = "#3D6B40"; e.currentTarget.style.transform = "none"} }}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>
          </div>

          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.8rem", color: "#8896A6", fontWeight: 500 }}>
            Accès réservé au personnel autorisé
          </p>
        </div>
      </div>
    </div>
  );
}
