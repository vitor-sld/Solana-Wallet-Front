// src/services/api.ts
const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function postJSON(path: string, body: any) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getJSON(path: string) {
  const res = await fetch(`${API}${path}`);
  return res.json();
}
