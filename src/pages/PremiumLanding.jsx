import { useNavigate } from "react-router-dom";

export default function PremiumLanding() {
  const navigate = useNavigate();

  return (
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
  );
}
