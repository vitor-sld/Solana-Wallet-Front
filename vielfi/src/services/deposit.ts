
export async function checkDeposits() {
  try {
    const res = await fetch("http://localhost:3001/deposit/check");
    const data = await res.json();
    return data.deposits || [];
  } catch (err) {
    console.error("Deposit check error:", err);
    return [];
  }
}
