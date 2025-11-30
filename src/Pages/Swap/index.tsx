import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";

export default function SwapPage() {
  const { session } = useAuth();
  const walletAddress = session?.walletAddress ?? "";

  const [solAmount, setSolAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  async function getQuote() {
    if (!solAmount) return;

    setLoading(true);
    setError("");
    setQuote(null);

    try {
      const res = await fetch(`${API}/swap/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solAmount: Number(solAmount) }),
      });

      const text = await res.text(); // pega texto bruto

      if (!res.ok) {
        console.error("Quote failed:", text);
        setError("Error fetching quote.");
        return;
      }

      const data = JSON.parse(text);
      setQuote(data);
    } catch (err) {
      console.error("Quote error:", err);
      setError("Could not get quote. API did not return JSON.");
    } finally {
      setLoading(false);
    }
  }

  async function executeSwap() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/swap/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solAmount: Number(solAmount),
          userWallet: walletAddress,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Execute swap failed:", text);
        setError("Swap execution failed.");
        return;
      }

      const data = JSON.parse(text);
      alert("Swap completed: " + data.signature);
      setQuote(null);
    } catch (err) {
      console.error("Execute swap error:", err);
      setError("Swap error. API returned no valid JSON.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Container>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        {quote && (
          <>
            <p>You will receive: {quote.token}</p>
            <button onClick={executeSwap} disabled={loading}>
              {loading ? "Processing..." : "Confirm Swap"}
            </button>
          </>
        )}
      </S.Box>
    </S.Container>
  );
}
