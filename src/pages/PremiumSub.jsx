import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "./PremiumSub.css";

const PAGE_SIZE = 8;

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function typeToMatchText(type) {
  if (!type) return "";
  if (type === "ear-rings") return "ear rings";
  return type.replace("-", " ");
}

export default function PremiumSub() {
  const { type } = useParams();
  const [page, setPage] = useState(1);

  // Reset to first page when user changes type
  useEffect(() => setPage(1), [type]);

  const filtered = useMemo(() => {
    const matchText = normalize(typeToMatchText(type));

    return products.filter((p) => {
      if (p.category !== "premium") return false;

      // Derive subcategory from product name (no data edits needed)
      // Example: "Premium Necklace 01" matches type "necklace"
      return normalize(p.name).includes(matchText);
    });
  }, [type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  const titleType = (typeToMatchText(type) || "").toUpperCase();

  return (
    <div className="ps-wrap">
      <div className="ps-title">PREMIUM COLLECTION/{titleType}</div>

      <div className="ps-grid">
        {items.map((p, idx) => (
          <PremiumCard key={p.id} num={start + idx + 1} />
        ))}
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="ps-pager">
          <button disabled={page === 1} onClick={() => setPage((x) => x - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((x) => x + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function PremiumCard({ num }) {
  const [qty, setQty] = useState(0);

  return (
    <div className="ps-card">
      <div className="ps-image">
        <span className="ps-num">{num}</span>
      </div>

      <div className="ps-controls">
        <button
          className="ps-qty-btn"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          className="ps-qty-btn"
          onClick={() => setQty((q) => Math.max(0, q - 1))}
          aria-label="Decrease quantity"
        >
          –
        </button>
      </div>

      <button className="ps-add">
        ADD TO CART{qty > 0 ? ` (${qty})` : ""}
      </button>
    </div>
  );
}
