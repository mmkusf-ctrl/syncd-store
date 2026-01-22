import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

import { FaShoppingCart, FaTrash, FaTag, FaLock, FaMinus, FaPlus } from "react-icons/fa";

import {
  getCart,
  incQty,
  decQty,
  removeItem,
  clearCart
} from "../context/cartStore";

export default function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState(getCart());
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // keep in sync when other pages add to cart
  useEffect(() => {
    const onUpdate = () => setItems(getCart());
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((s, it) => s + (it.qty || 0), 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.price) * (it.qty || 0), 0),
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
    // simple 8% demo tax
    const taxable = Math.max(0, subtotal - discount);
    return taxable * 0.08;
  }, [subtotal, discount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount) + shipping + tax;
  }, [subtotal, discount, shipping, tax]);

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

  function handleClear() {
    if (!window.confirm("Clear all items from cart?")) return;
    clearCart();
    setItems(getCart());
  }

  function handleCheckout() {
    if (items.length === 0) return;
    // demo checkout (replace later with Stripe/PayPal)
    alert("Checkout demo: Payment integration can be added next.");
  }

  return (
    <div className="cartPage">
      {/* Premium background + overlay */}
      <div className="cartBg" />
      <div className="cartOverlay" />

      {/* Top bar */}
      <header className="cartTop">
        <div className="cartLeft">
          <Link className="cartHome" to="/">
            ← Home
          </Link>
        </div>

        <div className="cartCenter">
          <div className="cartTitleRow">
            <h1 className="cartTitle">Cart</h1>
            <span className="cartBadge">
              <FaShoppingCart />
              <span>{itemCount}</span>
            </span>
          </div>
          <div className="cartSub">
            {items.length === 0 ? "Your cart is empty." : `Ready to checkout • ${itemCount} item(s)`}
          </div>
        </div>

        <div className="cartRight">
          <button className="cartBtn ghost" onClick={handleClear} disabled={items.length === 0}>
            <FaTrash />
            Clear
          </button>
          <button className="cartBtn solid" onClick={handleCheckout} disabled={items.length === 0}>
            <FaLock />
            Checkout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="cartShell">
        {/* Items */}
        <section className="cartItemsPanel">
          {items.length === 0 ? (
            <div className="emptyCard">
              <div className="emptyTop">
                <div className="emptyIcon">
                  <FaShoppingCart />
                </div>
                <div>
                  <h2>Nothing here yet</h2>
                  <p>Add items from Premium or Pearl pages, then come back.</p>
                </div>
              </div>

              <div className="emptyActions">
                <button className="cartBtn solid" onClick={() => navigate("/collection/premium")}>
                  Shop Premium
                </button>
                <button className="cartBtn ghost" onClick={() => navigate("/collection/pearl")}>
                  Shop Pearl
                </button>
              </div>
            </div>
          ) : (
            <div className="itemsList">
              {items.map((it) => (
                <article className="itemRow" key={it.id}>
                  <div className="thumb">
                    <div className="thumbInner">
                      <span className="thumbText">IMAGE</span>
                    </div>
                  </div>

                  <div className="itemInfo">
                    <div className="itemTopLine">
                      <div className="itemName">{it.name}</div>
                      <div className="itemPrice">${Number(it.price).toFixed(2)}</div>
                    </div>

                    <div className="itemMeta">
                      <span className="pill mono">ID: {it.id}</span>
                      {it.collection ? <span className="pill">{it.collection}</span> : null}
                      {it.sub ? <span className="pill">{it.sub}</span> : null}
                    </div>

                    <div className="itemBottom">
                      <div className="qtyBox">
                        <button
                          className="qtyBtn"
                          onClick={() => {
                            decQty(it.id);
                            setItems(getCart());
                          }}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>

                        <div className="qtyNum">{it.qty}</div>

                        <button
                          className="qtyBtn"
                          onClick={() => {
                            incQty(it.id);
                            setItems(getCart());
                          }}
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="lineTotal">
                        Line total: <strong>${(Number(it.price) * it.qty).toFixed(2)}</strong>
                      </div>

                      <button
                        className="removeBtn"
                        onClick={() => {
                          removeItem(it.id);
                          setItems(getCart());
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Summary */}
        <aside className="summaryPanel">
          <div className="summaryCard">
            <h2 className="summaryTitle">Order summary</h2>

            <div className="sumRow">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="sumRow">
              <span>Discount</span>
              <span>− ${discount.toFixed(2)}</span>
            </div>

            <div className="sumRow">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="sumRow">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="divider" />

            <div className="sumRow total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="promoBox">
              <div className="promoLabel">
                <FaTag />
                Promo code
              </div>

              <div className="promoRow">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="SYNC10 / FREESHIP"
                />
                <button className="cartBtn ghost small" onClick={applyPromo}>
                  Apply
                </button>
              </div>

              {appliedPromo ? (
                <div className="promoApplied">
                  Applied: <strong>{appliedPromo}</strong>{" "}
                  <button className="linkBtn" onClick={() => setAppliedPromo(null)}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="promoHint">Try SYNC10 (10% off) or FREESHIP</div>
              )}
            </div>

            <button
              className="cartBtn solid full"
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              <FaLock />
              Proceed to checkout
            </button>

            <div className="summaryNote">
              Demo cart uses <span className="mono">localStorage</span>.
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
