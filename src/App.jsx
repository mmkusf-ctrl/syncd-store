import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PremiumLanding from "./pages/PremiumLanding.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Premium landing MUST be before the generic category route */}
      <Route path="/collection/premium" element={<PremiumLanding />} />

      {/* Optional: subcategory pages (necklace / ear-rings / bracelet) */}
      <Route path="/collection/:category/:type" element={<Collection />} />

      {/* Generic category listing */}
      <Route path="/collection/:category" element={<Collection />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
