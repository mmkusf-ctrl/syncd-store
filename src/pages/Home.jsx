import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card">
        <h1 className="home-title">SYNC’D</h1>
        <p className="home-sub">
          Premium & Pearl collections. Smooth shopping flow. Demo store.
        </p>

        <div className="home-actions">
          <Link className="home-btn" to="/collection/premium">Explore Premium</Link>
          <Link className="home-btn ghost" to="/collection/pearl">Explore Pearl</Link>
        </div>
      </div>
    </div>
  );
}
