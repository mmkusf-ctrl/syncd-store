import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PremiumLanding from "./pages/PremiumLanding.jsx";
import PremiumSub from "./pages/PremiumSub.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Premium */}
      <Route path="/collection/premium" element={<PremiumLanding type="premium" />} />
      <Route path="/collection/premium/:sub" element={<PremiumSub type="premium" />} />

      {/* Pearl (uses SAME components) */}
      <Route path="/collection/pearl" element={<PremiumLanding type="pearl" />} />
      <Route path="/collection/pearl/:sub" element={<PremiumSub type="pearl" />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
