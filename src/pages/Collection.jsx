import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "./Collection.css";

const PAGE_SIZE = 10;

export default function Collection() {
  const { category } = useParams();
  const [page, setPage] = useState(1);

  // Reset page when category changes (correct hook)
  useEffect(() => {
    setPage(1);
  }, [category]);

  const filtered = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="collection">
      <header className="collection-header">
        <Link to="/" className="back">← Home</Link>
        <div>
          <h1 className="title">{(category || "").toUpperCase()} COLLECTION</h1>
          <p style={{ marginTop: 6, color: "#444" }}>
            Showing {pageItems.length} of {filtered.length} items
          </p>
        </div>
      </header>

      <div className="grid">
        {pageItems.map((item) => (
          <div key={item.id} className="card">
            <div className="img-placeholder">IMAGE</div>
            <div className="card-body">
              <div className="name">{item.name}</div>
              <div className="price">${item.price.toFixed(2)}</div>
              <button className="add">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="pager">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </footer>
    </div>
  );
}
