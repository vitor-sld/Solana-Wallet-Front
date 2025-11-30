import React, { createContext, useContext, useEffect, useState } from "react";
import { getJSON } from "../services/api";

type SessionData = {
  walletAddress: string | null;
  secretKey: number[] | null;
};

type AuthType = {
  session: SessionData | null;
  loading: boolean;
  saveWallet: (data: SessionData) => void;
  logout: () => void;
};

// 🔥 AQUI ESTAVA O ERRO — PRECISA EXPORTAR
export const AuthContext = createContext<AuthType>({
  session: null,
  loading: true,
  saveWallet: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const saved = localStorage.getItem("walletSession");
      if (saved) {
        try {
          const parsed: SessionData = JSON.parse(saved);
          setSession(parsed);
        } catch {}
      }

      try {
        const res = await getJSON("/session/me");
        if (res.ok && res.user) {
          setSession({
            walletAddress: res.user.walletPubkey,
            secretKey: res.user.secretKey,
          });
        }
      } catch {}

      setLoading(false);
    }

    load();
  }, []);

  function saveWallet(data: SessionData) {
    setSession(data);
    localStorage.setItem("walletSession", JSON.stringify(data));
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("walletSession");
  }

  return (
    <AuthContext.Provider value={{ session, loading, saveWallet, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
