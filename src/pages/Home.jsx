import "./Home.css";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";
import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home" style={{ backgroundImage: `url(${heroBg})` }}>
      <header className="header">
        <div className="search-box">
          <input placeholder="SEARCH HERE..." />
          <FaSearch className="search-icon" />
        </div>

        <div className="icons">
          <button className="icon-btn" onClick={() => navigate("/account")}>
            <FaUser />
            <span>ACCOUNT</span>
          </button>

          <button className="icon-btn" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span>CART</span>
          </button>
        </div>
      </header>

      <main className="hero">
        <div className="logo-box">
          <img className="logo" src={logo} alt="SYNC'D" />
          <div className="tagline">...with your beauty</div>
        </div>

        <div className="cta-buttons">
          <button className="cta" onClick={() => navigate("/collection/premium")}>
            PREMIUM COLLECTION
          </button>
          <button className="cta" onClick={() => navigate("/collection/pearl")}>
            PEARL COLLECTION
          </button>
        </div>
      </main>
    </div>
  );
}
