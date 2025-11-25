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

export function Wallet() {
  const [loading, setLoading] = useState(true);
  const [pubkey, setPubkey] = useState("");
  const [sol, setSol] = useState(0);
  const [tokens, setTokens] = useState<{ [key: string]: number }>({});

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const userId = import.meta.env.VITE_USER_ID;
        const res = await postJSON("/user/balance", { userId });

        setPubkey(res.pubkey);
        setSol(res.sol);
        setTokens(res.tokens || {});
      } catch (err) {
        console.error("Failed to load wallet:", err);
      }
      setLoading(false);
    }

    load();
  }, []);

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

        <BalanceBox>
          <strong>SOL Balance</strong>
          <p>{sol.toFixed(4)} SOL</p>
        </BalanceBox>

        <h3 style={{ color: "var(--foreground)", marginTop: "30px" }}>
          Tokens
        </h3>

        <TokenList>
          {Object.keys(tokens).length === 0 ? (
            <p style={{ color: "#888" }}>No SPL tokens found.</p>
          ) : (
            Object.entries(tokens).map(([symbol, amount]) => (
              <TokenItem key={symbol}>
                <strong>{symbol}</strong>
                <span>{amount}</span>
              </TokenItem>
            ))
          )}
        </TokenList>

        {/* BOTÕES RESTAURADOS */}
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
 