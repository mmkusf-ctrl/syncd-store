import { Outlet, useNavigate } from "react-router-dom";
import "./PremiumLanding.css";

import premiumBg from "../assets/premium-bg.jpg";
import logo from "../assets/logo.png";

export default function PremiumLayout() {
  const navigate = useNavigate();

  return (
    <div
      className="premium-landing"
      style={{ backgroundImage: `url(${premiumBg})` }}
    >
      <header className="premium-header">
        <img
          className="premium-logo"
          src={logo}
          alt="SYNC'D"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h1 className="premium-title">PREMIUM COLLECTION</h1>
      </header>

      <Outlet />
    </div>
  );
}
