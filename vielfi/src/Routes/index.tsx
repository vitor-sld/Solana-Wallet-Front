import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import { Wallet } from "../Pages/Wallet";
import Deposit from "../Pages/Deposit";
import Activity from "../Pages/Activity";

import WalletWithdraw from "../Pages/WalletWithdraw";  // <- Ajuste correto

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* WALLET */}
        <Route path="/wallet" element={<Wallet />} />

        {/* DEPÓSITO */}
        <Route path="/deposit" element={<Deposit />} />

        {/* SAQUE */}
        <Route path="/withdraw" element={<WalletWithdraw />} />
        
        <Route path="/activity" element={<Activity />} />


      </Routes>
    </BrowserRouter>
  );
}
