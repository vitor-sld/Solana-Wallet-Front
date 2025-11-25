import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PublicKey } from "@solana/web3.js";

interface TokenData {
  symbol: string;
  mint: string | null;
  decimals: number;
  balance: number;
}

interface WalletState {
  walletName: string | null;
  privateKey: string | null;   // base58
  address: string | null;      // base58
  seedPhrase: string | null;

  balance: number;             // SOL balance
  tokens: TokenData[];         // SPL tokens (USDC, VEIL, etc.)
  depositAddress: string | null;

  setWallet: (
    name: string,
    privateKey: string,
    address: string,
    seedPhrase: string
  ) => void;

  setBalance: (amount: number) => void;
  setTokens: (tokens: TokenData[]) => void;
  setDepositAddress: (addr: string | null) => void;

  resetWallet: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      walletName: null,
      privateKey: null,
      address: null,
      seedPhrase: null,

      balance: 0,
      tokens: [],
      depositAddress: null,

      // ------------------------------------------------------
      // CREATE WALLET (NOW ONLY VALID SOLANA WALLETS)
      // ------------------------------------------------------
      setWallet: (walletName, privateKey, address, seedPhrase) => {
        try {
          new PublicKey(address); // Validate Base58 Solana address
        } catch (err) {
          console.error("❌ Invalid Solana address:", address);
          return;
        }

        set({
          walletName,
          privateKey,
          address,
          seedPhrase,
          balance: 0,
          tokens: [],
          depositAddress: address, // deposit always uses the public key
        });
      },

      // ------------------------------------------------------
      // SET SOL BALANCE
      // ------------------------------------------------------
      setBalance: (amount) => set({ balance: amount }),

      // ------------------------------------------------------
      // SET SPL TOKENS (USDC, VEIL, ...)
      // ------------------------------------------------------
      setTokens: (tokens) => set({ tokens }),

      // ------------------------------------------------------
      // SET DEPOSIT ADDRESS
      // ------------------------------------------------------
      setDepositAddress: (addr) => set({ depositAddress: addr }),

      // ------------------------------------------------------
      // RESET WALLET COMPLETELY
      // ------------------------------------------------------
      resetWallet: () =>
        set({
          walletName: null,
          privateKey: null,
          address: null,
          seedPhrase: null,
          balance: 0,
          tokens: [],
          depositAddress: null,
        }),
    }),

    {
      name: "veilfi-wallet", // localStorage key
    }
  )
);
