// src/pages/PremiumLanding.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PremiumLanding.css";

import logo from "../assets/logo.png";
import premiumBg from "../assets/hero-bg.jpg"; // <-- make sure this file exists: src/assets/hero-bg.jpg

import { getCartCount } from "../context/cartStore"; // if you don't have this, I give fallback below

export default function PremiumLanding() {
  const navigate = useNavigate();

  // optional: scroll to top on page enter
  useEffect(() => window.scrollTo(0, 0), []);

  // cart count badge (safe even if you don’t have cartStore helper)
  const count =
    typeof getCartCount === "function"
      ? getCartCount()
      : (() => {
          try {
            const raw = localStorage.getItem("syncd_cart");
            const arr = raw ? JSON.parse(raw) : [];
            return arr.reduce((s, i) => s + (i.qty || 0), 0);
          } catch {
            return 0;
          }
        })();

  return (
    <div
      className="premium-landing"
      style={{ backgroundImage: `url(${premiumBg})` }}
    >
      <div className="premium-landing-overlay" />

      <header className="premium-topbar">
        <Link to="/" className="brand">
          <img className="brand-logo" src={logo} alt="SYNC'D" />
        </Link>

        <div className="brand-title">PREMIUM COLLECTION</div>

        <nav className="top-actions">
          <button className="top-link" onClick={() => navigate("/account")}>
            ACCOUNT
          </button>

          <button className="top-link cartbtn" onClick={() => navigate("/cart")}>
            CART
            <span className="cart-badge">{count}</span>
          </button>
        </nav>
      </header>

      <main className="premium-body">
        <button
          className="premium-cta p1"
          onClick={() => navigate("/collection/premium/necklace")}
        >
          NECKLACE
        </button>

        <button
          className="premium-cta p2"
          onClick={() => navigate("/collection/premium/ear-rings")}
        >
          EAR RINGS
        </button>

        <button
          className="premium-cta p3"
          onClick={() => navigate("/collection/premium/bracelet")}
        >
          BRACELET
        </button>
      </main>
    </div>
  );
}
