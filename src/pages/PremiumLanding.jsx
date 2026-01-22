import { useNavigate } from "react-router-dom";
import "./PremiumLanding.css";
import bg from "../assets/premium-bg.jpg";
import logo from "../assets/logo.png";

export default function PremiumLanding() {
  const navigate = useNavigate();

  return (
    <div className="premium-landing" style={{ backgroundImage: `url(${bg})` }}>
      <header className="premium-header">
        <img className="premium-logo" src={logo} alt="SYNC'D" />
        <h1 className="premium-title">PREMIUM COLLECTION</h1>
      </header>

      <main className="premium-buttons">
        <button
          className="premium-btn slide-1"
          onClick={() => navigate("/collection/premium/necklace")}
        >
          NECKLACE
        </button>

        <button
          className="premium-btn slide-2"
          onClick={() => navigate("/collection/premium/ear-rings")}
        >
          EAR&nbsp;&nbsp;RINGS
        </button>

        <button
          className="premium-btn slide-3"
          onClick={() => navigate("/collection/premium/bracelet")}
        >
          BRACELET
        </button>
      </main>
    </div>
  );
}
