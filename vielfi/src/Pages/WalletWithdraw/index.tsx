import { useState } from "react";
import * as S from "./styles";
import { withdrawSol } from "../../services/withdrawSol";
import { useToast } from "../../Components/Toast";
import { useActivityStore } from "../../store/activityStore";
import { PrimaryButton } from "../../styles";

export default function WalletWithdraw() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const addActivity = useActivityStore((s) => s.addActivity);

  const handleWithdraw = async () => {
    if (!to || amount <= 0) {
      showToast("Please enter a valid destination address and amount.", "error");
      return;
    }

    setLoading(true);

    const response = await withdrawSol(to, amount);
    setLoading(false);

    if (!response.success) {
      showToast(response.error || "Withdraw failed.", "error");
      return;
    }

    // Add to activity history
    addActivity({
      type: "withdraw",
      amount,
      signature: response.signature,
      timestamp: Date.now(),
    });

    showToast("Withdrawal successful!", "success");
  };

  return (
    <S.Container>
      <S.Card>
        <h1>Withdraw SOL</h1>
        <p>Send SOL to another Solana address</p>

        <S.Field>
          <S.Label>Destination Address</S.Label>
          <S.Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Ex: UbxB...3Np"
          />
        </S.Field>

        <S.Field>
          <S.Label>Amount (SOL)</S.Label>
          <S.Input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.01"
          />
        </S.Field>

        <PrimaryButton disabled={loading} onClick={handleWithdraw}>
          {loading ? "Processing..." : "Withdraw"}
        </PrimaryButton>
      </S.Card>
    </S.Container>
  );
}
