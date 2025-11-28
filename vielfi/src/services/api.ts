// src/services/api.ts

const API_BASE = "http://localhost:3001";

/**
 * GET genérico que retorna JSON
 * Usado pelo useAuth → getJSON("/session/me")
 */
export async function getJSON(path: string, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "GET",
    credentials: "include", // mantém cookies da sessão!
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error(`Erro GET ${path}: ${res.status}`);
  }

  return res.json();
}

/**
 * POST genérico para JSON
 */
export async function postJSON(path: string, body: any, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "POST",
    credentials: "include", // mantém sessão do usuário
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Erro POST ${path}: ${res.status}`);
  }

  return res.json();
}

/* -------------------------
   ROTAS DA COMPRA DE VEIL
--------------------------*/

/**
 * Criar pedido de compra
 */
export async function createOrder(usdAmount: number, buyerWallet: string) {
  return postJSON("/swap/buy/init", {
    usdAmount,
    buyer: buyerWallet
  });
}

/**
 * Confirmar pagamento e enviar VEIL
 */
export async function confirmOrder(orderId: string, paymentSignature: string) {
  return postJSON("/swap/buy/confirm", {
    orderId,
    paymentSignature
  });
}
