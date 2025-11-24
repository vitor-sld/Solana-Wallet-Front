import { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useWalletStore } from "../../store/walletStore";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function ModalImport({ open, onClose }: ModalProps) {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const setWallet = useWalletStore((s) => s.setWallet);

  if (!open) return null;

  const importWallet = () => {
    try {
      let wallet;

      // Seed phrase
      if (data.trim().split(" ").length >= 12) {
        wallet = ethers.Wallet.fromPhrase(data.trim());
      } 
      // Private key
      else {
        wallet = new ethers.Wallet(data.trim());
      }

      // ⚠ Correção importante para ethers v6
      const hdWallet = wallet as any;
      const seed = hdWallet.mnemonic?.phrase || "";

      setWallet(
        "Imported Wallet",
        wallet.privateKey,
        wallet.address,
        seed
      );

      navigate("/wallet");

    } catch {
      alert("Invalid private key or seed phrase.");
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Import Wallet</h2>
        <p>Enter your private key or seed phrase:</p>

        <S.TextArea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="private key OR seed phrase"
        />

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton disabled={!data.trim()} onClick={importWallet}>
            Import →
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
