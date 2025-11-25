import { useEffect } from "react";
import { useWalletStore } from "../store/walletStore";
import { useActivityStore } from "../store/activityStore";
import { useToast } from "../components/Toast";

export function useDepositTracker() {
  const { address, setBalance } = useWalletStore();
  const { addActivity } = useActivityStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (!address) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3001/deposit/check?address=${address}`);
        const data = await res.json();

        if (data.newDeposits?.length > 0) {
          data.newDeposits.forEach((dep: any) => {
            addActivity({
              type: "deposit",
              amount: dep.amount,
              signature: dep.signature,
              timestamp: Date.now(),
            });
          });

          showToast("New deposit received!", "success");

          // Atualiza o saldo
          setBalance(data.currentBalance);
        }
      } catch (_) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);
}
