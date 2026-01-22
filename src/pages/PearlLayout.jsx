import { Outlet, useNavigate } from "react-router-dom";
import "./PremiumLanding.css";
import CartIcon from "../components/CartIcon.jsx";

import pearlBg from "../assets/pearl-bg.jpg";
import logo from "../assets/logo.png";

export default function PearlLayout() {
  const navigate = useNavigate();

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${pearlBg})` }}>
      <header className="premium-header">
        <img
          className="premium-logo"
          src={logo}
          alt="SYNC'D"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <h1 className="premium-title">PEARL COLLECTION</h1>

        <div className="premium-actions">
          <button className="icon-btn" onClick={() => navigate("/account")}>
            ACCOUNT
          </button>
          <CartIcon />
        </div>
      </header>

      <Outlet />
    </div>
  );
}
