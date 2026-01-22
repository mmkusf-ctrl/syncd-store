import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css";

const LS_KEY = "syncd_account_v1";

function loadAccount() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAccount(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export default function Account() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("profile"); // profile | orders | addresses | security
  const [account, setAccount] = useState(null);

  // auth forms
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // profile
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // addresses
  const [addresses, setAddresses] = useState([]);
  const [addrLine1, setAddrLine1] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrZip, setAddrZip] = useState("");

  // orders (placeholder)
  const orders = useMemo(() => {
    if (!account) return [];
    return account.orders || [
      {
        id: "ORD-10021",
        date: "2026-01-20",
        status: "Delivered",
        total: 129.98,
      },
      {
        id: "ORD-10034",
        date: "2026-01-22",
        status: "Processing",
        total: 79.99,
      },
    ];
  }, [account]);

  useEffect(() => {
    const a = loadAccount();
    if (a) {
      setAccount(a);
      setFullName(a.fullName || "");
      setPhone(a.phone || "");
      setAddresses(a.addresses || []);
    }
  }, []);

  function handleSignIn(e) {
    e.preventDefault();

    // Demo auth (no backend)
    const a = loadAccount();
    if (!a) {
      alert("No account found. Please create an account first.");
      setMode("signup");
      return;
    }
    if (normalize(a.email) !== normalize(email)) {
      alert("Email not found. Please create an account.");
      setMode("signup");
      return;
    }
    if ((a.password || "") !== password) {
      alert("Incorrect password.");
      return;
    }

    setAccount(a);
    setFullName(a.fullName || "");
    setPhone(a.phone || "");
    setAddresses(a.addresses || []);
    setTab("profile");
  }

  function handleSignUp(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const a = {
      email,
      password,
      fullName: fullName || "",
      phone: phone || "",
      addresses: [],
      orders: [],
      createdAt: new Date().toISOString(),
    };

    saveAccount(a);
    setAccount(a);
    setTab("profile");
  }

  function handleSaveProfile() {
    if (!account) return;

    const next = {
      ...account,
      fullName,
      phone,
    };
    setAccount(next);
    saveAccount(next);
    alert("Profile saved.");
  }

  function handleAddAddress() {
    if (!account) return;

    if (!addrLine1 || !addrCity || !addrState || !addrZip) {
      alert("Please fill all address fields.");
      return;
    }

    const newAddr = {
      id: "ADDR-" + Math.random().toString(16).slice(2, 8).toUpperCase(),
      line1: addrLine1,
      city: addrCity,
      state: addrState,
      zip: addrZip,
    };

    const nextAddresses = [newAddr, ...addresses];
    setAddresses(nextAddresses);

    const next = { ...account, addresses: nextAddresses };
    setAccount(next);
    saveAccount(next);

    setAddrLine1("");
    setAddrCity("");
    setAddrState("");
    setAddrZip("");
  }

  function handleRemoveAddress(id) {
    if (!account) return;

    const nextAddresses = addresses.filter((a) => a.id !== id);
    setAddresses(nextAddresses);

    const next = { ...account, addresses: nextAddresses };
    setAccount(next);
    saveAccount(next);
  }

  function handleSignOut() {
    setAccount(null);
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setAddresses([]);
    setMode("signin");
    setTab("profile");
  }

  return (
    <div className="acct">
      <div className="acct-top">
        <button className="acct-back" onClick={() => navigate("/")}>
          ← Home
        </button>
        <h1 className="acct-title">Account</h1>
      </div>

      {!account ? (
        <div className="acct-auth">
          <div className="acct-auth-card">
            <div className="acct-auth-switch">
              <button
                className={mode === "signin" ? "active" : ""}
                onClick={() => setMode("signin")}
                type="button"
              >
                Sign In
              </button>
              <button
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
                type="button"
              >
                Create Account
              </button>
            </div>

            <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp}>
              <label className="acct-label">
                Email
                <input
                  className="acct-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                />
              </label>

              <label className="acct-label">
                Password
                <input
                  className="acct-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                />
              </label>

              {mode === "signup" && (
                <>
                  <label className="acct-label">
                    Full Name (optional)
                    <input
                      className="acct-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Manoj"
                      type="text"
                    />
                  </label>

                  <label className="acct-label">
                    Phone (optional)
                    <input
                      className="acct-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 ..."
                      type="tel"
                    />
                  </label>
                </>
              )}

              <button className="acct-primary" type="submit">
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>

              <p className="acct-note">
                Demo mode: this saves your account locally in the browser
                (localStorage). No real authentication yet.
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="acct-shell">
          <div className="acct-sidebar">
            <div className="acct-user">
              <div className="acct-avatar">
                {(account.fullName || account.email || "U")[0].toUpperCase()}
              </div>
              <div>
                <div className="acct-name">
                  {account.fullName || "Customer"}
                </div>
                <div className="acct-email">{account.email}</div>
              </div>
            </div>

            <nav className="acct-nav">
              <button
                className={tab === "profile" ? "active" : ""}
                onClick={() => setTab("profile")}
              >
                Profile
              </button>
              <button
                className={tab === "orders" ? "active" : ""}
                onClick={() => setTab("orders")}
              >
                Orders
              </button>
              <button
                className={tab === "addresses" ? "active" : ""}
                onClick={() => setTab("addresses")}
              >
                Addresses
              </button>
              <button
                className={tab === "security" ? "active" : ""}
                onClick={() => setTab("security")}
              >
                Security
              </button>
            </nav>

            <button className="acct-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>

          <div className="acct-content">
            {tab === "profile" && (
              <section className="acct-card">
                <h2>Profile</h2>

                <label className="acct-label">
                  Full Name
                  <input
                    className="acct-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    type="text"
                  />
                </label>

                <label className="acct-label">
                  Phone
                  <input
                    className="acct-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 ..."
                    type="tel"
                  />
                </label>

                <button className="acct-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </section>
            )}

            {tab === "orders" && (
              <section className="acct-card">
                <h2>Orders</h2>

                {orders.length === 0 ? (
                  <p>No orders yet.</p>
                ) : (
                  <div className="acct-orders">
                    {orders.map((o) => (
                      <div className="acct-order" key={o.id}>
                        <div>
                          <div className="acct-order-id">{o.id}</div>
                          <div className="acct-muted">{o.date}</div>
                        </div>
                        <div className="acct-order-right">
                          <div className="acct-status">{o.status}</div>
                          <div className="acct-total">
                            ${Number(o.total).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {tab === "addresses" && (
              <section className="acct-card">
                <h2>Addresses</h2>

                <div className="acct-address-form">
                  <input
                    className="acct-input"
                    value={addrLine1}
                    onChange={(e) => setAddrLine1(e.target.value)}
                    placeholder="Address line 1"
                  />
                  <div className="acct-row">
                    <input
                      className="acct-input"
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="City"
                    />
                    <input
                      className="acct-input"
                      value={addrState}
                      onChange={(e) => setAddrState(e.target.value)}
                      placeholder="State"
                    />
                    <input
                      className="acct-input"
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      placeholder="ZIP"
                    />
                  </div>

                  <button className="acct-primary" onClick={handleAddAddress}>
                    Add Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <p>No addresses saved yet.</p>
                ) : (
                  <div className="acct-addresses">
                    {addresses.map((a) => (
                      <div className="acct-address" key={a.id}>
                        <div>
                          <div className="acct-order-id">{a.line1}</div>
                          <div className="acct-muted">
                            {a.city}, {a.state} {a.zip}
                          </div>
                        </div>
                        <button
                          className="acct-link"
                          onClick={() => handleRemoveAddress(a.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {tab === "security" && (
              <section className="acct-card">
                <h2>Security</h2>
                <p className="acct-muted">
                  This is a frontend-only demo. When you add a backend, this
                  section will include password reset, email verification, etc.
                </p>

                <div className="acct-security">
                  <div>
                    <div className="acct-order-id">Email</div>
                    <div className="acct-muted">{account.email}</div>
                  </div>

                  <div>
                    <div className="acct-order-id">Password</div>
                    <div className="acct-muted">••••••••</div>
                  </div>
                </div>

                <p className="acct-muted">
                  Want real login? Next step is connecting Firebase Auth or a
                  Node/Express backend.
                </p>
              </section>
            )}
          </div>
        </div>
      )}

      <div className="acct-footer">
        <Link to="/cart" className="acct-link">
          Go to Cart
        </Link>
      </div>
    </div>
  );
}

function normalize(s) {
  return (s || "").toLowerCase().trim();
}
