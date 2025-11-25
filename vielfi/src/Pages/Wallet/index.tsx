import { useEffect, useState } from "react";
import { postJSON } from "../../services/api";
import {
  Container,
  Card,
  Title,
  AddressText,
  BalanceBox,
  TokenList,
  TokenItem,
  Actions,
  SecondaryButton
} from "./styles";
import { useNavigate } from "react-router-dom";
import { TOKENS } from "../../config/tokens";

type TokenAccount = {
  mint: string;
  amount: string;
  decimals: number;
  uiAmount: number;
};

export function Wallet() {
  const [loading, setLoading] = useState(true);
  const [pubkey, setPubkey] = useState("");
  const [sol, setSol] = useState(0);
  const [tokens, setTokens] = useState<TokenAccount[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const userId = import.meta.env.VITE_USER_ID;
        const res = await postJSON("/user/balance", { userId });

        setPubkey(res.pubkey);
        setSol(res.sol);
        setTokens(res.tokens || []);
      } catch (err) {
        console.error("Failed to load wallet:", err);
      }
      setLoading(false);
    }

    load();
  }, []);

  // Função para resolver nome do token baseado na mint
  function resolveTokenSymbol(mint: string): string {
    const entry = Object.values(TOKENS).find((t) => t.mint === mint);
    return entry ? entry.symbol : mint.slice(0, 4) + "...";
  }

  if (loading) {
    return (
      <Container>
        <Card>
          <Title>Wallet</Title>
          <p style={{ color: "#ccc" }}>Loading...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Your Wallet</Title>

        <AddressText>{pubkey}</AddressText>

        {/* SALDO SOL */}
        <BalanceBox>
          <strong>SOL Balance</strong>
          <p>{sol.toFixed(4)} SOL</p>
        </BalanceBox>

        {/* LISTA DE TOKENS */}
        <h3 style={{ color: "var(--foreground)", marginTop: "30px" }}>
          Tokens (SPL)
        </h3>

        <TokenList>
          {tokens.length === 0 ? (
            <p style={{ color: "#888" }}>No SPL tokens found.</p>
          ) : (
            tokens.map((t) => (
              <TokenItem key={t.mint}>
                <strong>{resolveTokenSymbol(t.mint)}</strong>
                <span>{t.uiAmount}</span>
              </TokenItem>
            ))
          )}
        </TokenList>

        {/* BOTÕES */}
        <Actions>
          <SecondaryButton onClick={() => navigate("/deposit")}>
            Deposit
          </SecondaryButton>

          <SecondaryButton onClick={() => navigate("/withdraw")}>
            Withdraw
          </SecondaryButton>

          <SecondaryButton onClick={() => navigate("/activity")}>
            Activity
          </SecondaryButton>
        </Actions>
      </Card>
    </Container>
  );
}
