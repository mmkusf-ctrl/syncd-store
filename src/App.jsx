import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

// Premium flow
import PremiumLayout from "./pages/PremiumLayout.jsx";
import PremiumLanding from "./pages/PremiumLanding.jsx";

// Pearl flow
import PearlLayout from "./pages/PearlLayout.jsx";
import PearlLanding from "./pages/PearlLanding.jsx";

// Shared sub-page grid (necklace / ear-rings / bracelet)
import PremiumSub from "./pages/PremiumSub.jsx";

// Keep your old generic page as a fallback if you want
import Collection from "./pages/Collection.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* PREMIUM (landing + subpages) */}
      <Route path="/collection/premium" element={<PremiumLayout />}>
        <Route index element={<PremiumLanding />} />
        <Route path=":type" element={<PremiumSub />} />
      </Route>

      {/* PEARL (same structure as premium) */}
      <Route path="/collection/pearl" element={<PearlLayout />}>
        <Route index element={<PearlLanding />} />
        <Route path=":type" element={<PremiumSub />} />
      </Route>

      {/* Optional: fallback generic route */}
      <Route path="/collection/:category" element={<Collection />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
