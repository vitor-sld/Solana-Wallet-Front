// src/context/Auth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../services/api";

type WalletSession = {
  walletAddress: string;
  secretKey?: number[];
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<WalletSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load local saved wallet first
    const saved = localStorage.getItem("wallet");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch {}
    }
    // then sync with server session (if any)
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    try {
      const res = await getSession();
      if (res?.ok && res.user?.walletPubkey) {
        const serverWallet = { walletAddress: res.user.walletPubkey };
        setSession(serverWallet);
        localStorage.setItem("wallet", JSON.stringify(serverWallet));
      } else {
        // keep local if exists; otherwise clear
        const saved = localStorage.getItem("wallet");
        if (!saved) setSession(null);
      }
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  function saveWallet(data: WalletSession) {
    localStorage.setItem("wallet", JSON.stringify(data));
    setSession(data);
  }

  function logout() {
    localStorage.removeItem("wallet");
    setSession(null);
    // optionally call backend logout endpoint if present
  }

  return (
    <AuthContext.Provider value={{ session, saveWallet, logout, refresh, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
