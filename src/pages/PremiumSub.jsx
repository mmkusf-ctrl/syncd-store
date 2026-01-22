import { useMemo, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { products } from "../data/products";
import "./PremiumSub.css";

// Change these filenames ONLY if yours differ
import premiumBg from "../assets/premium-bg.jpg";
import pearlBg from "../assets/pearl-bg.jpg";

const PAGE_SIZE = 8;

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function typeToMatchText(type) {
  if (!type) return "";
  if (type === "ear-rings") return "ear rings";
  return type.replace("-", " ");
}

function getCategoryFromPath(pathname) {
  // pathname like: /collection/premium/necklace
  const parts = (pathname || "").split("/").filter(Boolean);
  if (parts.length >= 2 && parts[0] === "collection") return parts[1];
  return "";
}

export default function PremiumSub() {
  const { type } = useParams();
  const location = useLocation();

  const category = useMemo(
    () => getCategoryFromPath(location.pathname),
    [location.pathname]
  );

  const bg = category === "pearl" ? pearlBg : premiumBg;

  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [type, category]);

  const filtered = useMemo(() => {
    const matchText = normalize(typeToMatchText(type));

    return products.filter((p) => {
      if (p.category !== category) return false;
      return normalize(p.name).includes(matchText);
    });
  }, [type, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  const titleCategory = (category || "").toUpperCase();
  const titleType = (typeToMatchText(type) || "").toUpperCase();

  return (
    <div
      className="premium-landing"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* soft overlay (same as your landing CSS pattern) */}
      <div className="premium-landing-overlay" />

      <div className="ps-wrap">
        <div className="ps-title">
          {titleCategory} COLLECTION/{titleType}
        </div>

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
        <button className="ps-qty-btn" onClick={() => setQty((q) => q + 1)}>
          +
        </button>
        <button
          className="ps-qty-btn"
          onClick={() => setQty((q) => Math.max(0, q - 1))}
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
