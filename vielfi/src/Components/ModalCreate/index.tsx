import { useState, useMemo } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useWalletStore } from "../../store/walletStore";
import { useNavigate } from "react-router-dom";

import * as bip39 from "bip39";
import nacl from "tweetnacl";
import bs58 from "bs58";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function ModalCreate({ open, onClose }: ModalProps) {
  if (!open) return null;

  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const setWallet = useWalletStore((s) => s.setWallet);

  // Gera wallet Solana
  const wallet = useMemo(() => {
    const mnemonic = bip39.generateMnemonic(128);
    const seed = bip39.mnemonicToSeedSync(mnemonic).subarray(0, 32);

    const keypair = nacl.sign.keyPair.fromSeed(seed);

    const publicKey = bs58.encode(keypair.publicKey);
    const secretKey = bs58.encode(keypair.secretKey);

    return { mnemonic, publicKey, secretKey };
  }, []);

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

  const handleCreate = () => {
    if (!name.trim() || !checked) {
      setError(true);
      return;
    }

    setWallet(name, wallet.secretKey, wallet.publicKey, wallet.mnemonic);
    navigate("/wallet");
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} error={error}>
        <h2>Create Wallet (Solana)</h2>

        <S.Input
          placeholder="Wallet name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          className={error && !name.trim() ? "error" : ""}
        />

        <h3>Seed Phrase</h3>

        <S.SeedBox>
          <p>{wallet.mnemonic}</p>
          <button onClick={() => handleCopy(wallet.mnemonic)}>Copy</button>
        </S.SeedBox>

        <S.CheckRow className={error && !checked ? "error" : ""}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              setError(false);
            }}
          />
          <span>I confirm I have written down my seed phrase.</span>
        </S.CheckRow>

        {error && (
          <S.ErrorMsg>
            Please fill out all required fields before creating a wallet.
          </S.ErrorMsg>
        )}

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton onClick={handleCreate}>Create →</PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
