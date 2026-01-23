// src/pages/PremiumLanding.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PremiumLanding.css";

import premiumBg from "../assets/hero-bg.jpg";
import logo from "../assets/logo.png";

import { getCartCount } from "../context/cartStore";

export default function PremiumLanding() {
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const onUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  return (
    <div
      className="premium-landing"
      style={{ backgroundImage: `url(${premiumBg})` }}
    >
      <div className="premium-landing-overlay" />

      <header className="premium-header">
        <Link to="/" aria-label="Home">
          <img className="premium-logo" src={logo} alt="syncd logo" />
        </Link>

        <div className="premium-title">PREMIUM COLLECTION</div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 18 }}>
          <Link to="/account" style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>
            ACCOUNT
          </Link>

          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}
          >
            CART{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </div>
      </header>

      <div className="premium-buttons">
        <Link className="premium-btn slide-1" to="/collection/premium/necklace">
          NECKLACE
        </Link>

        <Link className="premium-btn slide-2" to="/collection/premium/ear-rings">
          EAR RINGS
        </Link>

        <Link className="premium-btn slide-3" to="/collection/premium/bracelet">
          BRACELET
        </Link>
      </div>
    </div>
  );
}
