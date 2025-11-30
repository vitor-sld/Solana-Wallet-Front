// src/context/Auth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getJSON } from "../services/api";

type SessionData = {
  walletAddress: string | null;
  walletSecret: number[] | null;
};

type AuthType = {
  session: SessionData | null;
  loading: boolean;
  setSession: (s: SessionData | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  session: null,
  loading: true,
  setSession: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getJSON("/session/me");

        if (res?.ok && res?.user) {
          setSession({
            walletAddress: res.user.walletPubkey || null,
            walletSecret: res.user.secretKey || null,
          });
        } else {
          setSession(null);
        }
      } catch (e) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, loading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
