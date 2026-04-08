"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "2px solid var(--border)", borderTop: "2px solid var(--green)",
            animation: "spin 0.8s linear infinite", margin: "0 auto",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.82rem", fontWeight: 500 }}>
            Chargement ANDAR…
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0" style={{ background: "var(--bg)" }}>

        {/* ── Mobile top bar ── */}
        <div className="md:hidden flex items-center justify-between bg-[#0F1923] px-4 py-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_icon.png" alt="HUIM6" className="h-7 w-auto object-contain" />
            <div>
              <div className="text-sm font-extrabold text-white tracking-wide">ANDAR</div>
              <div className="text-[0.55rem] font-bold text-[#3D6B40] tracking-widest uppercase">Conformité · HUIM6</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
            className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Page content ── */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
