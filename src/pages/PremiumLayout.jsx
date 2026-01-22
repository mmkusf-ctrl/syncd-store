import "./PremiumLanding.css";
import bg from "../assets/premium-bg.jpg";
import logo from "../assets/logo.png";
import { Outlet, useNavigate } from "react-router-dom";

export default function PremiumLayout() {
  const navigate = useNavigate();

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      <header className="premium-header">
        <img
          className="premium-logo"
          src={logo}
          alt="SYNC'D"
          onClick={() => navigate("/collection/premium")}
          style={{ cursor: "pointer" }}
        />
        <h1 className="premium-title">PREMIUM COLLECTION</h1>
      </header>

      <Outlet />
    </div>
  );
}
