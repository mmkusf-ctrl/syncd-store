import { products } from "../data/products";
import "./PremiumSub.css";

export default function PremiumSub() {
  const necklace = products.filter(p => p.category === "premium");

  return (
    <div className="necklace-page">
      <div className="necklace-overlay">

        <h2 className="necklace-title">
          PREMIUM COLLECTION / NECKLACE
        </h2>

        <div className="necklace-grid">
          {necklace.map((p, i) => (
            <div key={p.id} className="necklace-card">
              <div className="necklace-img">{i + 1}</div>

              <div className="qty">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <button className="add-btn">ADD TO CART</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
