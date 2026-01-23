// src/pages/PremiumLanding.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumLanding.css";

import logo from "../assets/logo.png";
import premiumBg from "../assets/hero-bg.jpg";

import { getCartCount } from "../context/cartStore";

export default function PremiumLanding() {
  const navigate = useNavigate();
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
        <img
          src={logo}
          alt="SYNC'D"
          className="premium-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <div className="premium-title">PREMIUM COLLECTION</div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 18 }}>
          <button
            onClick={() => navigate("/account")}
            style={{
              background: "transparent",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ACCOUNT
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={{
              position: "relative",
              background: "transparent",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            CART
            {cartCount > 0 ? (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -10,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "#111",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  padding: "0 5px",
                }}
              >
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <main className="premium-buttons">
        <button
          className="premium-btn slide-1"
          onClick={() => navigate("/collection/premium/necklace")}
          style={{ top: "18%" }}
        >
          NECKLACE
        </button>

        <button
          className="premium-btn slide-2"
          onClick={() => navigate("/collection/premium/ear-rings")}
          style={{ top: "42%" }}
        >
          EAR RINGS
        </button>

        <button
          className="premium-btn slide-3"
          onClick={() => navigate("/collection/premium/bracelet")}
          style={{ top: "66%" }}
        >
          BRACELET
        </button>
      </main>
    </div>
  );
}
