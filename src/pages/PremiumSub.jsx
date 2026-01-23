import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import "./PremiumSub.css";

import logo from "../assets/logo.png";
import premiumBg from "../assets/hero-bg.jpg";
import pearlBg from "../assets/pearl-bg.jpg";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import { addToCart, getCart } from "../context/cartStore";

export default function PremiumSub() {
  const navigate = useNavigate();
  const params = useParams();

  // Support both route styles:
  // /collection/:collection/:sub  OR /collection/:category/:sub
  const collection = params.collection || params.category; 
  const sub = params.sub;

  // cart badge
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const refresh = () => {
      const cart = getCart();
      setCartCount(cart.reduce((s, it) => s + (it.qty || 0), 0));
    };
    refresh();
    window.addEventListener("cart:updated", refresh);
    return () => window.removeEventListener("cart:updated", refresh);
  }, []);

  const bg = collection === "pearl" ? pearlBg : premiumBg;

  const items = useMemo(() => {
    return products.filter((p) => p.collection === collection && p.sub === sub);
  }, [collection, sub]);

  const title = `${String(collection || "").toUpperCase()} COLLECTION / ${String(sub || "")
    .replace(/-/g, " ")
    .toUpperCase()}`;

  function handleAdd(product) {
    addToCart(product, 1);
    window.dispatchEvent(new Event("cart:updated"));
  }

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      <div className="premium-landing-overlay" />

      <header className="ps-header">
        <button className="ps-logoBtn" onClick={() => navigate("/")}>
          <img className="ps-logo" src={logo} alt="SYNC'D" />
        </button>

        <div className="ps-headTitle">{String(collection || "").toUpperCase()} COLLECTION</div>

        <div className="ps-headActions">
          <button className="ps-action" onClick={() => navigate("/account")}>
            <FaUser />
            <span>ACCOUNT</span>
          </button>

          <button className="ps-action" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span>CART</span>
            <span className="ps-cartBadge">{cartCount}</span>
          </button>
        </div>
      </header>

      <div className="ps-wrap">
        <h2 className="ps-title">{title}</h2>

        {items.length === 0 ? (
          <div className="ps-empty">
            <p>No items found for this category.</p>
            <Link className="ps-back" to={`/collection/${collection}`}>
              ← Back
            </Link>
          </div>
        ) : (
          <div className="ps-grid">
            {items.map((p, idx) => (
              <div className="ps-card" key={p.id}>
                <div className="ps-image">
                  <div className="ps-num">{idx + 1}</div>
                </div>

                <div className="ps-controls">
                  <button className="ps-qty-btn" onClick={() => handleAdd(p)}>+</button>
                  <button className="ps-qty-btn" onClick={() => navigate("/cart")}>−</button>
                </div>

                <button className="ps-add" onClick={() => handleAdd(p)}>
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
