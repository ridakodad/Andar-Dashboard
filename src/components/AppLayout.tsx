"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F6FA" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "2px solid #E2E5EC", borderTop: "2px solid #3D6B40",
            animation: "spin 0.8s linear infinite", margin: "0 auto",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ marginTop: "1rem", color: "#8896A6", fontSize: "0.8rem", fontWeight: 500 }}>Chargement ANDAR…</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F6FA" }}>
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0" style={{ background: "#F5F6FA" }}>
        {/* Mobile Header (Hamburger) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E2E5EC]">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/huim6_icon.png" alt="HUIM6" className="h-8 w-auto object-contain" />
            <div>
              <div className="text-sm font-bold text-[#1A2332]">ANDAR</div>
              <div className="text-[0.6rem] font-semibold text-[#3D6B40] tracking-widest uppercase">HUIM6</div>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -mr-2 text-[#4A5568] hover:text-[#1A2332] rounded-md"
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
