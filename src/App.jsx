import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PremiumLayout from "./pages/PremiumLayout.jsx";
import PremiumLanding from "./pages/PremiumLanding.jsx";
import PremiumSub from "./pages/PremiumSub.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Premium layout */}
      <Route path="/collection/premium" element={<PremiumLayout />}>
        <Route index element={<PremiumLanding />} />
        <Route path=":type" element={<PremiumSub />} />
      </Route>

      {/* Generic collections */}
      <Route path="/collection/:category" element={<Collection />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
