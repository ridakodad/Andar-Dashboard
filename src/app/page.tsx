"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.push(isAuthenticated ? "/dashboard" : "/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#F5F6FA",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          border: "2px solid #E2E5EC", borderTop: "2px solid #3D6B40",
          animation: "spin 0.8s linear infinite", margin: "0 auto",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ marginTop: "1rem", color: "#8896A6", fontSize: "0.8rem", fontWeight: 500 }}>
          Redirection en cours...
        </div>
      </div>
    </div>
  );
}
