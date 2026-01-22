import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "./PremiumSub.css";

// Backgrounds (adjust names if your files differ)
import premiumBg from "../assets/hero-bg.jpg";
import pearlBg from "../assets/pearl-bg.jpg";

export default function PremiumSub() {
  const { collection, sub } = useParams();

  // pick background based on collection
  const bg = collection === "pearl" ? pearlBg : premiumBg;

  const items = useMemo(() => {
    return products.filter(
      (p) => p.collection === collection && p.sub === sub
    );
  }, [collection, sub]);

  const title = `${collection.toUpperCase()} COLLECTION / ${sub
    .replace("-", " ")
    .toUpperCase()}`;

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      <div className="ps-wrap">
        <h2 className="ps-title">{title}</h2>

        <div className="ps-grid">
          {items.map((p, idx) => (
            <div key={p.id} className="ps-card">
              <div className="ps-image">
                <div className="ps-num">{idx + 1}</div>
              </div>

              <div className="ps-controls">
                <button className="ps-qty-btn" type="button">
                  +
                </button>
                <button className="ps-qty-btn" type="button">
                  −
                </button>
              </div>

              <button className="ps-add" type="button">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
