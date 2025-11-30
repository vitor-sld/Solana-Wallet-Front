import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export default function SendPage() {
  const { session } = useAuth();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!session?.walletSecret || !session?.walletAddress) {
      alert("Your wallet is not loaded. Re-import your wallet.");
      return;
    }

    if (!to || !amount) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await postJSON("/wallet/send", {
        userSecret: session.walletSecret,     // obrigatório
        userPubkey: session.walletAddress,    // obrigatório!
        recipient: to,                        // destino
        amount: Number(amount),               // valor
      });

      if (res.error) {
        alert("Error: " + res.error);
        setLoading(false);
        return;
      }

      alert("Sent! Signature: " + res.signature);
    } catch (err: any) {
      alert("Error sending: " + err.message);
    }

    setLoading(false);
  }

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Send SOL</h1>

        <input
          placeholder="Destination wallet"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button disabled={loading} onClick={handleSend}>
          {loading ? "Sending..." : "Send"}
        </button>
      </S.Box>
    </S.PageContainer>
  );
}
