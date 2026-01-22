import { useMemo, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext.jsx";
import "./PremiumSub.css";

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
  // /collection/premium/necklace  OR /collection/pearl/necklace
  const parts = (pathname || "").split("/").filter(Boolean);
  if (parts.length >= 2 && parts[0] === "collection") return parts[1];
  return "";
}

export default function PremiumSub() {
  const { type } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const category = useMemo(
    () => getCategoryFromPath(location.pathname),
    [location.pathname]
  );

  const bg = category === "pearl" ? pearlBg : premiumBg;

  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [type, category]);

  // qtyMap keeps local quantities per product
  const [qtyMap, setQtyMap] = useState({});

  // Reset local quantities when switching pages/types/categories (optional but clean)
  useEffect(() => {
    setQtyMap({});
  }, [type, category, page]);

  const filtered = useMemo(() => {
    const matchText = normalize(typeToMatchText(type));

    return products.filter((p) => {
      if (p.category !== category) return false;

      // This assumes product name contains: Necklace / Ear Rings / Bracelet
      return normalize(p.name).includes(matchText);
    });
  }, [type, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  const titleCategory = (category || "").toUpperCase();
  const titleType = (typeToMatchText(type) || "").toUpperCase();

  function inc(id) {
    setQtyMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function dec(id) {
    setQtyMap((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) - 1);
      return next;
    });
  }

  function handleAdd(id) {
    const qty = qtyMap[id] || 0;
    if (qty <= 0) return;
    addToCart(id, qty);
    // Optionally reset after adding:
    setQtyMap((prev) => ({ ...prev, [id]: 0 }));
  }

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      {/* soft overlay */}
      <div className="premium-landing-overlay" />

      <div className="ps-wrap">
        <div className="ps-title">
          {titleCategory} COLLECTION/{titleType}
        </div>

        <div className="ps-grid">
          {items.map((p, idx) => {
            const cardNumber = start + idx + 1;
            const qty = qtyMap[p.id] || 0;

            return (
              <div className="ps-card" key={p.id}>
                <div className="ps-image">
                  <span className="ps-num">{cardNumber}</span>
                </div>

                <div className="ps-controls">
                  <button className="ps-qty-btn" onClick={() => inc(p.id)}>
                    +
                  </button>
                  <button className="ps-qty-btn" onClick={() => dec(p.id)}>
                    –
                  </button>
                </div>

                <button className="ps-add" onClick={() => handleAdd(p.id)}>
                  ADD TO CART{qty > 0 ? ` (${qty})` : ""}
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="ps-pager">
            <button
              disabled={page === 1}
              onClick={() => setPage((x) => x - 1)}
            >
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

import PageTransition from "../components/PageTransition";
import "./PremiumSub.css";

export default function PremiumSub() {
  return (
    <PageTransition>
      <div className="premium-sub">
        {/* your existing code */}
      </div>
    </PageTransition>
  );
}
