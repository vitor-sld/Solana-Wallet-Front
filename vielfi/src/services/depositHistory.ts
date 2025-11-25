export async function fetchDeposits() {
  try {
    const res = await fetch("http://localhost:3001/deposit/check");
    const data = await res.json();
    return data.deposits || [];
  } catch (err) {
    console.error("Error fetching deposits:", err);
    return [];
  }
}
