import "./Account.css";

export default function Account() {
  return (
    <div className="account-page">
      <h1 className="account-title">My Account</h1>

      <div className="account-grid">
        {/* Profile */}
        <div className="account-card">
          <h2>Profile</h2>
          <p><strong>Name:</strong> Demo User</p>
          <p><strong>Email:</strong> user@syncd.com</p>
          <button>Edit Profile</button>
        </div>

        {/* Orders */}
        <div className="account-card">
          <h2>My Orders</h2>
          <ul>
            <li>Order #1001 - Premium Necklace - $49.99</li>
            <li>Order #1002 - Pearl Earrings - $69.99</li>
          </ul>
        </div>

        {/* Cart summary */}
        <div className="account-card">
          <h2>Cart</h2>
          <p>Items in cart: 3</p>
          <p>Total: $179.97</p>
          <button>Go to Cart</button>
        </div>

        {/* Logout */}
        <div className="account-card danger">
          <h2>Session</h2>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}
