import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "./CollectionSub.css";

export default function CollectionSub() {
  const { type, sub } = useParams();

  const items = products.filter(
    p => p.type === type && p.sub === sub
  );

  return (
    <div className="sub">
      <Link to={`/collection/${type}`} className="back">← Back</Link>

      <h1>
        {type.toUpperCase()} / {sub.toUpperCase()}
      </h1>

      <div className="grid">
        {items.map((_, idx) => (
          <div className="card" key={idx}>
            <div className="image">IMAGE</div>
            <div className="num">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
