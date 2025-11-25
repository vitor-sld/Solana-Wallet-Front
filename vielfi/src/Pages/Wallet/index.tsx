import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWalletStore } from "../../store/walletStore";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useNavigate } from "react-router-dom";
import { useDepositTracker } from "../../hooks/useDepositTracker";
import { loadSplTokens } from "../../services/loadSplTokens";
import { TOKENS } from "../../config/tokens";

export function Wallet() {
  const { walletName, address, setBalance, tokens, setTokens } = useWalletStore();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const navigate = useNavigate();
  useDepositTracker();

  const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9";

  // Load SOL + SPL balances
  useEffect(() => {
    if (!address) return;

    async function loadAllBalances() {
      try {
        const connection = new Connection(RPC_URL);
        const pubKey = new PublicKey(address);

        // Load SOL
        const lamports = await connection.getBalance(pubKey);
        const sol = lamports / 1e9;
        setSolBalance(sol);
        setBalance(sol);

        // Load SPL tokens
        const splTokens = await loadSplTokens(address);

        // Inject SOL as first token in list
        const fullList = [
          {
            symbol: "SOL",
            balance: sol,
            decimals: 9,
            mint: null,
          },
          ...splTokens,
        ];

        setTokens(fullList);

      } catch (err) {
        console.error("Erro ao carregar saldo:", err);
        setSolBalance(0);
        setBalance(0);
      }
    }

    loadAllBalances();
  }, [address, setBalance, setTokens]);

  return (
    <>
      <Header />

      <S.Container>
        <S.Card>
          <h1>Welcome back,</h1>
          <h2>{walletName}</h2>

          <S.BalanceBox>
            <span>Your SOL Balance</span>
            <strong>
              {solBalance === null ? "Loading..." : `${solBalance.toFixed(4)} SOL`}
            </strong>
          </S.BalanceBox>

          <S.Info>
            <strong>Your Address</strong>
            <p>{address}</p>
          </S.Info>

          <S.Actions>
            <PrimaryButton className="btn-sm" onClick={() => navigate("/deposit")}>
              Deposit
            </PrimaryButton>

            <PrimaryButton className="btn-sm" onClick={() => navigate("/withdraw")}>
              Withdraw
            </PrimaryButton>

            <PrimaryButton className="btn-sm" onClick={() => navigate("/activity")}>
              Activity
            </PrimaryButton>
          </S.Actions>
        </S.Card>
      </S.Container>

      <Footer />
    </>
  );
}
