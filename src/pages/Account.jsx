import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "orders", label: "Orders" },
  { key: "addresses", label: "Addresses" },
  { key: "payments", label: "Payment methods" },
  { key: "wishlist", label: "Wishlist" },
  { key: "settings", label: "Settings" }
];

export default function Account() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  // Demo data (replace with real API later)
  const profile = useMemo(
    () => ({
      name: "Manoj Manne",
      email: "manoj@syncd-store.com",
      phone: "+1 (000) 000-0000",
      memberSince: "2025",
      loyaltyTier: "Silver"
    }),
    []
  );

  const orders = useMemo(
    () => [
      {
        id: "SYNC-1042",
        date: "2026-01-20",
        status: "Delivered",
        total: 149.97,
        items: 3,
        tracking: "1Z999AA10123456784"
      },
      {
        id: "SYNC-1039",
        date: "2026-01-14",
        status: "In Transit",
        total: 79.99,
        items: 1,
        tracking: "9400111202555444332211"
      },
      {
        id: "SYNC-1031",
        date: "2026-01-05",
        status: "Processing",
        total: 109.99,
        items: 1,
        tracking: "-"
      }
    ],
    []
  );

  const addresses = useMemo(
    () => [
      {
        id: "addr1",
        label: "Home",
        name: "Manoj Manne",
        line1: "123 Main St",
        line2: "Apt 4B",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
        isDefault: true
      },
      {
        id: "addr2",
        label: "Work",
        name: "Manoj Manne",
        line1: "500 Congress Ave",
        line2: "",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
        isDefault: false
      }
    ],
    []
  );

  const payments = useMemo(
    () => [
      { id: "pm1", brand: "Visa", last4: "4242", exp: "08/27", isDefault: true },
      { id: "pm2", brand: "Mastercard", last4: "4444", exp: "12/26", isDefault: false }
    ],
    []
  );

  const wishlist = useMemo(
    () => [
      { id: "w1", name: "Premium Necklace 04", price: 44.99, tag: "Premium" },
      { id: "w2", name: "Pearl Ear Rings 01", price: 49.99, tag: "Pearl" },
      { id: "w3", name: "Premium Bracelet 02", price: 44.99, tag: "Premium" }
    ],
    []
  );

  return (
    <div className="acc">
      {/* Top bar */}
      <div className="acc-topbar">
        <div className="acc-breadcrumb">
          <Link className="acc-home" to="/">← Home</Link>
          <span className="acc-sep">/</span>
          <span>Account</span>
        </div>

        <div className="acc-actions">
          <button className="acc-btn ghost" onClick={() => navigate("/cart")}>
            View Cart
          </button>
          <button className="acc-btn" onClick={() => alert("Demo: checkout flow next.")}>
            Checkout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="acc-shell">
        {/* Sidebar */}
        <aside className="acc-side">
          <div className="acc-profile">
            <div className="acc-avatar">{profile.name.slice(0, 1)}</div>
            <div>
              <div className="acc-name">{profile.name}</div>
              <div className="acc-meta">{profile.email}</div>
              <div className="acc-chip">
                {profile.loyaltyTier} • Member since {profile.memberSince}
              </div>
            </div>
          </div>

          <nav className="acc-nav">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`acc-navitem ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="acc-sidefooter">
            <button
              className="acc-btn danger"
              onClick={() => alert("Demo: logout hook later.")}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="acc-main">
          {tab === "overview" && (
            <section className="acc-section">
              <h1 className="acc-title">Account Overview</h1>

              <div className="acc-grid">
                <div className="acc-card">
                  <h2>Quick stats</h2>
                  <div className="acc-stats">
                    <div className="acc-stat">
                      <div className="k">Orders</div>
                      <div className="v">{orders.length}</div>
                    </div>
                    <div className="acc-stat">
                      <div className="k">Wishlist</div>
                      <div className="v">{wishlist.length}</div>
                    </div>
                    <div className="acc-stat">
                      <div className="k">Addresses</div>
                      <div className="v">{addresses.length}</div>
                    </div>
                    <div className="acc-stat">
                      <div className="k">Payment methods</div>
                      <div className="v">{payments.length}</div>
                    </div>
                  </div>
                </div>

                <div className="acc-card">
                  <h2>Recent orders</h2>
                  <div className="acc-tablewrap">
                    <table className="acc-table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Items</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 3).map((o) => (
                          <tr key={o.id}>
                            <td className="mono">{o.id}</td>
                            <td>{o.date}</td>
                            <td>
                              <span className={`badge ${badgeClass(o.status)}`}>
                                {o.status}
                              </span>
                            </td>
                            <td>{o.items}</td>
                            <td>${o.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button className="acc-btn ghost" onClick={() => setTab("orders")}>
                    View all orders
                  </button>
                </div>

                <div className="acc-card">
                  <h2>Default shipping address</h2>
                  {addresses.filter((a) => a.isDefault).map((a) => (
                    <div key={a.id} className="acc-address">
                      <div className="row">
                        <strong>{a.label}</strong>
                        <span className="badge neutral">Default</span>
                      </div>
                      <div>{a.name}</div>
                      <div>{a.line1}</div>
                      {a.line2 ? <div>{a.line2}</div> : null}
                      <div>
                        {a.city}, {a.state} {a.zip}
                      </div>
                      <div>{a.country}</div>
                    </div>
                  ))}
                  <button className="acc-btn ghost" onClick={() => setTab("addresses")}>
                    Manage addresses
                  </button>
                </div>

                <div className="acc-card">
                  <h2>Saved payment</h2>
                  {payments
                    .filter((p) => p.isDefault)
                    .map((p) => (
                      <div key={p.id} className="acc-pay">
                        <div className="row">
                          <strong>{p.brand}</strong>
                          <span className="badge neutral">Default</span>
                        </div>
                        <div>•••• •••• •••• {p.last4}</div>
                        <div>Exp {p.exp}</div>
                      </div>
                    ))}
                  <button className="acc-btn ghost" onClick={() => setTab("payments")}>
                    Manage payment methods
                  </button>
                </div>
              </div>
            </section>
          )}

          {tab === "orders" && (
            <section className="acc-section">
              <div className="acc-headrow">
                <h1 className="acc-title">Orders</h1>
                <button className="acc-btn ghost" onClick={() => alert("Demo: order search soon.")}>
                  Search orders
                </button>
              </div>

              <div className="acc-tablewrap">
                <table className="acc-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Tracking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td className="mono">{o.id}</td>
                        <td>{o.date}</td>
                        <td>
                          <span className={`badge ${badgeClass(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                        <td>{o.items}</td>
                        <td>${o.total.toFixed(2)}</td>
                        <td className="mono">{o.tracking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="acc-note">
                Demo data. When you connect checkout, store real orders and render them here.
              </div>
            </section>
          )}

          {tab === "addresses" && (
            <section className="acc-section">
              <div className="acc-headrow">
                <h1 className="acc-title">Addresses</h1>
                <button className="acc-btn" onClick={() => alert("Demo: add address form next.")}>
                  Add new address
                </button>
              </div>

              <div className="acc-cards">
                {addresses.map((a) => (
                  <div key={a.id} className="acc-card">
                    <div className="row">
                      <h2>{a.label}</h2>
                      {a.isDefault ? <span className="badge neutral">Default</span> : null}
                    </div>
                    <div>{a.name}</div>
                    <div>{a.line1}</div>
                    {a.line2 ? <div>{a.line2}</div> : null}
                    <div>
                      {a.city}, {a.state} {a.zip}
                    </div>
                    <div>{a.country}</div>

                    <div className="acc-rowbtns">
                      <button className="acc-btn ghost" onClick={() => alert("Demo: edit address.")}>
                        Edit
                      </button>
                      <button className="acc-btn danger" onClick={() => alert("Demo: delete address.")}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "payments" && (
            <section className="acc-section">
              <div className="acc-headrow">
                <h1 className="acc-title">Payment methods</h1>
                <button className="acc-btn" onClick={() => alert("Demo: add payment method.")}>
                  Add new card
                </button>
              </div>

              <div className="acc-cards">
                {payments.map((p) => (
                  <div key={p.id} className="acc-card">
                    <div className="row">
                      <h2>{p.brand}</h2>
                      {p.isDefault ? <span className="badge neutral">Default</span> : null}
                    </div>
                    <div className="mono">•••• •••• •••• {p.last4}</div>
                    <div>Exp {p.exp}</div>

                    <div className="acc-rowbtns">
                      <button className="acc-btn ghost" onClick={() => alert("Demo: set default.")}>
                        Set default
                      </button>
                      <button className="acc-btn danger" onClick={() => alert("Demo: remove card.")}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "wishlist" && (
            <section className="acc-section">
              <div className="acc-headrow">
                <h1 className="acc-title">Wishlist</h1>
                <button className="acc-btn ghost" onClick={() => alert("Demo: wishlist sync later.")}>
                  Sync
                </button>
              </div>

              <div className="acc-wishlist">
                {wishlist.map((w) => (
                  <div key={w.id} className="wish-card">
                    <div className="wish-tag">{w.tag}</div>
                    <div className="wish-name">{w.name}</div>
                    <div className="wish-price">${w.price.toFixed(2)}</div>
                    <div className="wish-actions">
                      <button className="acc-btn" onClick={() => navigate("/cart")}>
                        Add to cart
                      </button>
                      <button className="acc-btn danger" onClick={() => alert("Demo: remove from wishlist.")}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "settings" && (
            <section className="acc-section">
              <h1 className="acc-title">Settings</h1>

              <div className="acc-card">
                <h2>Account details</h2>

                <div className="form-grid">
                  <label>
                    Full name
                    <input defaultValue={profile.name} />
                  </label>

                  <label>
                    Email
                    <input defaultValue={profile.email} />
                  </label>

                  <label>
                    Phone
                    <input defaultValue={profile.phone} />
                  </label>

                  <label>
                    Password
                    <input type="password" defaultValue="********" />
                  </label>
                </div>

                <div className="acc-rowbtns">
                  <button className="acc-btn" onClick={() => alert("Demo: save settings.")}>
                    Save changes
                  </button>
                  <button className="acc-btn ghost" onClick={() => alert("Demo: cancel.")}>
                    Cancel
                  </button>
                </div>
              </div>

              <div className="acc-note">
                Demo only. Connect to Firebase/Auth0 later for real sign-in + profile updates.
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function badgeClass(status) {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "good";
  if (s.includes("transit")) return "warn";
  if (s.includes("process")) return "neutral";
  return "neutral";
}
