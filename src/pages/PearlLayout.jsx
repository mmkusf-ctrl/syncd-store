import { Outlet, useNavigate } from "react-router-dom";
import "./PremiumLanding.css"; // reuse same CSS
import bg from "../assets/premium-bg.jpg"; // optionally use a pearl-specific background here
import logo from "../assets/logo.png";

export default function PearlLayout() {
  const navigate = useNavigate();

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      <header className="premium-header">
        <img
          className="premium-logo"
          src={logo}
          alt="SYNC'D"
          onClick={() => navigate("/collection/pearl")}
          style={{ cursor: "pointer" }}
        />
        <h1 className="premium-title">PEARL COLLECTION</h1>
      </header>

      <Outlet />
    </div>
  );
}
