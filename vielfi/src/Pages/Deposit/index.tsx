import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { postJSON } from "../../services/api";
import { Container, Card, QRWrapper, AddressBox, InfoText } from "./styles";
import { Header } from "../../Components/Header";

export default function Deposit() {
  const [pubkey, setPubkey] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const userId = import.meta.env.VITE_USER_ID;
        const res = await postJSON("/user/balance", { userId });
        setPubkey(res.pubkey);
      } catch (e) {
        console.error("Error loading pubkey", e);
      }
      setLoading(false);
    }
    load();
  }, []);

  function copyAddress() {
    navigator.clipboard.writeText(pubkey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
    <Header />
    <Container>
      <Card>
        <h1>Deposit</h1>
        <p>Send SOL to your personal wallet address below:</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <QRWrapper>
              <QRCode
                size={180}
                style={{ height: "180px", width: "180px" }}
                value={pubkey}
              />
            </QRWrapper>

            <AddressBox>
              <strong>Wallet Address</strong>
              <p>{pubkey}</p>
            </AddressBox>

            <button
              onClick={copyAddress}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, #b026ff, #7d00ff, #5500c8)",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 0 18px rgba(157, 78, 221, 0.35)",
              }}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>

            <InfoText>
              The system will automatically detect new deposits.
            </InfoText>
          </>
        )}
      </Card>
    </Container>
    </>
  );
}
