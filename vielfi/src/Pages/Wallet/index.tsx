// src/pages/Wallet/index.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getSession, postUserBalance } from "../../services/api";

export default function WalletPage() {
  const { session, loading } = useAuth();
  const [balanceSOL, setBalanceSOL] = useState<number | null>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadOnce() {
    try {
      // ensure we have session (try server session if not loaded)
      const s = await getSession();
      const pub = s?.user?.walletPubkey ?? session?.walletAddress;
      if (!pub) {
        setError("Wallet not loaded");
        return;
      }

      const r = await postUserBalance(pub);
      setBalanceSOL(typeof r.solBalance === "number" ? r.solBalance : (r.balance ?? null));
      setTokens(Array.isArray(r.tokens) ? r.tokens : []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load wallet");
      console.error("Wallet load error:", err);
    }
  }

  useEffect(() => {
    if (!loading) loadOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Wallet</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginTop: 16 }}>
        <strong>SOL Balance:</strong>{" "}
        {balanceSOL === null ? "…" : balanceSOL.toFixed(6)} SOL
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Tokens:</strong>
        <div>
          {tokens.length === 0 ? (
            <div style={{ color: "#888" }}>No tokens</div>
          ) : (
            tokens.map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
                <div>{t.mint}</div>
                <div>{t.uiAmount ?? 0}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={loadOnce}>Refresh</button>
      </div>
    </div>
  );
}
