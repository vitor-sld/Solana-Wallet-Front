import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";

export default function SwapPage() {
  const { session } = useAuth();
  const walletAddress = session?.walletAddress ?? "";

  const [solAmount, setSolAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  async function getQuote() {
    if (!solAmount) return;
    setLoading(true);

    const res = await fetch(`${API}/swap/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ solAmount: Number(solAmount) }),
    });

    const data = await res.json();
    setQuote(data);
    setLoading(false);
  }

  async function executeSwap() {
    setLoading(true);

    const res = await fetch(`${API}/swap/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        solAmount: Number(solAmount),
        userWallet: walletAddress,
      }),
    });

    const data = await res.json();
    setQuote(null);
    setLoading(false);
    alert("Swap completed: " + data.signature);
  }

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Token Swap</h1>

        <input
          type="number"
          placeholder="Amount of SOL"
          value={solAmount}
          onChange={(e) => setSolAmount(e.target.value)}
        />

        <button onClick={getQuote} disabled={loading}>
          {loading ? "Loading..." : "Get Quote"}
        </button>

        {quote && (
          <>
            <p>You will receive: {quote.token}</p>
            <button onClick={executeSwap}>Confirm Swap</button>
          </>
        )}
      </S.Box>
    </S.PageContainer>
  );
}
