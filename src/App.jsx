// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

import PremiumLanding from "./pages/PremiumLanding.jsx";
import PearlLanding from "./pages/PearlLanding.jsx";
import PremiumSub from "./pages/PremiumSub.jsx";

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Collection landings */}
      <Route path="/collection/premium" element={<PremiumLanding />} />
      <Route path="/collection/pearl" element={<PearlLanding />} />

      {/* Sub-collection pages (necklace / ear-rings / bracelet) */}
      <Route path="/collection/:collection/:sub" element={<PremiumSub />} />

      {/* Utility pages */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
