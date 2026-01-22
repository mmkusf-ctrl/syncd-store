import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "./PremiumSub.css";

export default function PremiumSub() {
  const { collection, sub } = useParams();

  const items = products.filter(
    (p) => p.collection === collection && p.sub === sub
  );

  const title =
    `${collection.toUpperCase()} COLLECTION / ${sub.replace("-", " ").toUpperCase()}`;

  return (
    <div className="sub-page">
      <div className="sub-overlay">
        <h2 className="sub-title">{title}</h2>

        <div className="sub-grid">
          {items.map((p, i) => (
            <div key={p.id} className="sub-card">
              <div className="sub-img">{i + 1}</div>

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
