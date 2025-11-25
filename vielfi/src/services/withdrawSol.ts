// src/services/withdrawSol.ts
import { postJSON } from "./api";

export async function withdrawSol(userId: string, passphrase: string, destination: string, amount: number) {
  return await postJSON("/withdraw/sol", {
    userId,
    passphrase,
    destination,
    amount
  });
}