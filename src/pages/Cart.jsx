import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

import {
  getCart,
  incQty,
  decQty,
  removeItem,
  clearCart
} from "../context/cartStore";

export default function Cart() {
  const [items, setItems] = useState(getCart());
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    const onUpdate = () => setItems(getCart());
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo === "SYNC10") return subtotal * 0.1;
    return 0;
  }, [appliedPromo, subtotal]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    if (appliedPromo === "FREESHIP") return 0;
    return 6.99;
  }, [items.length, appliedPromo]);

  const tax = useMemo(() => {
    const taxable = Math.max(0, subtotal - discount);
    return taxable * 0.08;
  }, [subtotal, discount]);

  const total = useMemo(
    () => Math.max(0, subtotal - discount) + shipping + tax,
    [subtotal, discount, shipping, tax]
  );

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return;

    if (code === "SYNC10" || code === "FREESHIP") {
      setAppliedPromo(code);
      setPromo("");
    } else {
      alert("Invalid promo code. Try SYNC10 or FREESHIP.");
    }
  }

  function onClear() {
    if (!window.confirm("Clear all items from cart?")) return;
    clearCart();
    setItems(getCart());
  }

  return (
    <div className="cart">
      <div className="cart-top">
        <Link className="cart-back" to="/">
          ← Home
        </Link>

        <div className="cart-titlewrap">
          <h1 className="cart-title">Cart</h1>
          <div className="cart-sub">
            {items.length === 0
              ? "Your cart is empty."
              : `Items: ${items.reduce((s, i) => s + i.qty, 0)}`}
          </div>
        </div>

        <div className="cart-actions">
          <button
            className="btn ghost"
            onClick={onClear}
            disabled={items.length === 0}
          >
            Clear cart
          </button>
          <button
            className="btn"
            disabled={items.length === 0}
            onClick={() => alert("Demo: checkout flow next.")}
          >
            Checkout
          </button>
        </div>
      </div>

      <div className="cart-shell">
        <section className="cart-left">
          {items.length === 0 ? (
            <div className="empty">
              <div className="empty-box">
                <h2>Nothing here yet</h2>
                <p>Add items from Premium/Pearl pages, then come back.</p>
                <Link className="btn" to="/">
                  Continue shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="items">
              {items.map((it) => (
                <div className="item" key={it.id}>
                  <div className="thumb">
                    <span>IMAGE</span>
                  </div>

                  <div className="info">
                    <div className="name">{it.name}</div>

                    <div className="meta">
                      <span className="mono">ID: {it.id}</span>
                      {it.collection ? <span className="pill">{it.collection}</span> : null}
                      {it.sub ? <span className="pill">{it.sub}</span> : null}
                    </div>

                    <div className="row">
                      <div className="price">${Number(it.price).toFixed(2)}</div>

                      <div className="qty">
                        <button
                          className="qtybtn"
                          onClick={() => {
                            decQty(it.id);
                            setItems(getCart());
                          }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <div className="qtynum">{it.qty}</div>

                        <button
                          className="qtybtn"
                          onClick={() => {
                            incQty(it.id);
                            setItems(getCart());
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="lineTotal">
                        ${(it.price * it.qty).toFixed(2)}
                      </div>

                      <button
                        className="remove"
                        onClick={() => {
                          removeItem(it.id);
                          setItems(getCart());
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="cart-right">
          <div className="summary">
            <h2>Order summary</h2>

            <div className="sumrow">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="sumrow">
              <span>Discount</span>
              <span>− ${discount.toFixed(2)}</span>
            </div>

            <div className="sumrow">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="sumrow">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="divider" />

            <div className="sumrow total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="promo">
              <div className="promoline">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code (SYNC10 / FREESHIP)"
                />
                <button className="btn ghost" onClick={applyPromo}>
                  Apply
                </button>
              </div>

              {appliedPromo ? (
                <div className="applied">
                  Applied: <strong>{appliedPromo}</strong>{" "}
                  <button className="linkbtn" onClick={() => setAppliedPromo(null)}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="hint">Try SYNC10 (10% off) or FREESHIP</div>
              )}
            </div>

            <button
              className="btn full"
              disabled={items.length === 0}
              onClick={() => alert("Demo: checkout flow next.")}
            >
              Proceed to checkout
            </button>

            <div className="note">
              Demo cart stored in <span className="mono">localStorage</span>.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
