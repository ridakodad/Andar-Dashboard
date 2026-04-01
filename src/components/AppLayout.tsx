"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto", padding: "2rem", minWidth: 0, background: "#F5F6FA" }}>
        {children}
      </main>
    </div>
  );
}
