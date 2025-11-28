// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function safeParse(res: Response) {
  const txt = await res.text().catch(() => "");
  try { return txt ? JSON.parse(txt) : {}; } catch { return { message: txt }; }
}

export async function getJSON(path: string, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) {
    const data = await safeParse(res);
    throw new Error(data.message || `GET ${path} → ${res.status}`);
  }
  return safeParse(res);
}

export async function postJSON(path: string, body: any, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    body: JSON.stringify(body),
  });

  const data = await safeParse(res);
  if (!res.ok) {
    throw new Error(data.message || `POST ${path} → ${res.status}`);
  }
  return data;
}

/* AUTH */
export function importWallet(input: string) {
  // backend expects { input }
  return postJSON("/auth/import", { input });
}

/* SESSION */
export function getSession() {
  return getJSON("/session/me");
}

/* USER */
export function postUserBalance(userPubkey: string) {
  return postJSON("/user/balance", { userPubkey });
}

/* SWAP / BUY (kept for completeness) */
export function createOrder(usdAmount: number, buyer: string) {
  return postJSON("/swap/buy/init", { usdAmount, buyer });
}
export function confirmOrder(orderId: string, paymentSignature: string, buyer: string) {
  return postJSON("/swap/buy/confirm", { orderId, paymentSignature, buyer });
}
