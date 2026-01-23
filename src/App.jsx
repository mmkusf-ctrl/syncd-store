import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import PageTransition from "./components/PageTransition.jsx";

import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import CollectionSub from "./pages/CollectionSub.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />

      {/* Smooth transitions: location.key ensures animation runs on route change */}
      <PageTransition routeKey={location.key}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/collection/:type" element={<Collection />} />
          <Route path="/collection/:type/:sub" element={<CollectionSub />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </div>
  );
}
