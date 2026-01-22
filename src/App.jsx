import { Routes, Route, Navigate } from "react-router-dom";

import PageTransition from "./components/PageTransition.jsx";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";

import PremiumLayout from "./pages/PremiumLayout.jsx";
import PremiumLanding from "./pages/PremiumLanding.jsx";

import PearlLayout from "./pages/PearlLayout.jsx";
import PearlLanding from "./pages/PearlLanding.jsx";

import PremiumSub from "./pages/PremiumSub.jsx";
import Collection from "./pages/Collection.jsx";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <Home />
          </PageTransition>
        }
      />

      {/* PREMIUM */}
      <Route
        path="/collection/premium"
        element={
          <PageTransition>
            <PremiumLayout />
          </PageTransition>
        }
      >
        <Route
          index
          element={
            <PageTransition>
              <PremiumLanding />
            </PageTransition>
          }
        />
        <Route
          path=":type"
          element={
            <PageTransition>
              <PremiumSub />
            </PageTransition>
          }
        />
      </Route>

      {/* PEARL */}
      <Route
        path="/collection/pearl"
        element={
          <PageTransition>
            <PearlLayout />
          </PageTransition>
        }
      >
        <Route
          index
          element={
            <PageTransition>
              <PearlLanding />
            </PageTransition>
          }
        />
        <Route
          path=":type"
          element={
            <PageTransition>
              <PremiumSub />
            </PageTransition>
          }
        />
      </Route>

      {/* OPTIONAL FALLBACK */}
      <Route
        path="/collection/:category"
        element={
          <PageTransition>
            <Collection />
          </PageTransition>
        }
      />

      <Route
        path="/cart"
        element={
          <PageTransition>
            <Cart />
          </PageTransition>
        }
      />

      <Route
        path="/account"
        element={
          <PageTransition>
            <Account />
          </PageTransition>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
