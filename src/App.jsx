// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

import PremiumLanding from "./pages/PremiumLanding.jsx";
import PearlLanding from "./pages/PearlLanding.jsx";
import PremiumSub from "./pages/PremiumSub.jsx";

// Keep your old Collection page ONLY if you still use it
import Collection from "./pages/Collection.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Landing pages */}
      <Route path="/collection/premium" element={<PremiumLanding />} />
      <Route path="/collection/pearl" element={<PearlLanding />} />

      {/* Sub-collection pages: premium/necklace, pearl/necklace, premium/ear-rings, etc */}
      <Route path="/collection/:collection/:sub" element={<PremiumSub />} />

      {/* Optional legacy route (if you still use it) */}
      <Route path="/collection/:category" element={<Collection />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
