import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

import CollectionLanding from "./pages/CollectionLanding.jsx";
import CollectionSub from "./pages/CollectionSub.jsx";
import AnimatedRoutes from "./components/AnimatedRoutes.jsx";

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Collection landing (Premium/Pearl) */}
          <Route path="/collection/:collection" element={<CollectionLanding />} />

          {/* Sub pages */}
          <Route path="/collection/:collection/:sub" element={<CollectionSub />} />

          {/* Legacy redirect: ear-rings -> earrings */}
          <Route
            path="/collection/:collection/ear-rings"
            element={<LegacyRedirect toSub="earrings" />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatedRoutes>
    </HashRouter>
  );
}

function LegacyRedirect({ toSub }) {
  // keep same collection param, redirect sub
  const { collection } = require("react-router-dom").useParams();
  return <Navigate to={`/collection/${collection}/${toSub}`} replace />;
}
