"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuthStatus } from "@/lib/api";

interface AuthContextValue {
  isAdmin: boolean;
  checked: boolean;
  setIsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  // Runs once, since this provider lives in the root layout and isn't
  // remounted when navigating between pages.
  useEffect(() => {
    getAuthStatus().then((value) => {
      setIsAdmin(value);
      setChecked(true);
    });
  }, []);

  return <AuthContext.Provider value={{ isAdmin, checked, setIsAdmin }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
