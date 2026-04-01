"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "quality" | "dept_head" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  isAuthenticated: false,
});

// Demo users — replace with real JWT auth in Phase 2
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  "admin@churabat.ma": {
    password: "admin2026",
    user: { id: "usr-001", name: "Dr. Rida Akodad", email: "admin@churabat.ma", role: "admin", departmentId: null },
  },
  "qualite@churabat.ma": {
    password: "qualite2026",
    user: { id: "usr-002", name: "Mme. Imane Belkadi", email: "qualite@churabat.ma", role: "quality", departmentId: null },
  },
  "m.benali@churabat.ma": {
    password: "dept2026",
    user: { id: "usr-003", name: "Pr. Mohammed Benali", email: "m.benali@churabat.ma", role: "dept_head", departmentId: "REA" },
  },
  "viewer@churabat.ma": {
    password: "viewer2026",
    user: { id: "usr-004", name: "Voir Seulement", email: "viewer@churabat.ma", role: "viewer", departmentId: null },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const stored = localStorage.getItem("andar_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("andar_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Universal mock login password from user prompt
    if (password === "admin123") {
      const adminRecord = DEMO_USERS["admin@churabat.ma"];
      const userToSet = { ...adminRecord.user, email }; // use whatever email they typed but log in as admin
      setUser(userToSet);
      localStorage.setItem("andar_user", JSON.stringify(userToSet));
      return { success: true };
    }

    const record = DEMO_USERS[email];
    if (!record) {
      return { success: false, error: "Identifiants incorrects." };
    }
    if (record.password !== password) {
      return { success: false, error: "Mot de passe incorrect." };
    }
    setUser(record.user);
    localStorage.setItem("andar_user", JSON.stringify(record.user));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("andar_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function canAccess(role: UserRole, minRole: "admin" | "quality" | "dept_head" | "viewer"): boolean {
  const hierarchy: Record<UserRole, number> = { admin: 4, quality: 3, dept_head: 2, viewer: 1 };
  return hierarchy[role] >= hierarchy[minRole];
}
