import { useNavigate } from "react-router-dom";
import "./PremiumLanding.css"; // reuse the same styles
import bg from "../assets/premium-bg.jpg"; // you can change to a pearl-specific background later
import logo from "../assets/logo.png";

export default function PearlLanding() {
  const navigate = useNavigate();

  return (
    <main className="premium-buttons">
      <button
        className="premium-btn slide-1"
        onClick={() => navigate("/collection/pearl/necklace")}
      >
        NECKLACE
      </button>

      <button
        className="premium-btn slide-2"
        onClick={() => navigate("/collection/pearl/ear-rings")}
      >
        EAR&nbsp;RINGS
      </button>

      <button
        className="premium-btn slide-3"
        onClick={() => navigate("/collection/pearl/bracelet")}
      >
        BRACELET
      </button>
    </main>
  );
}
