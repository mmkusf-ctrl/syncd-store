import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../context/cartStore";
import "./Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    const onUpdate = () => setCount(getCartCount());
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  return (
    <header className="hdr">
      <div className="hdr-inner">
        <Link to="/" className="brand" aria-label="Home">
          <img src={logo} alt="SYNC'D" className="logo" />
        </Link>

        <nav className="nav">
          <NavLink className="navlink" to="/collection/premium">Premium</NavLink>
          <NavLink className="navlink" to="/collection/pearl">Pearl</NavLink>
          <NavLink className="navlink" to="/account">Account</NavLink>

          <NavLink className="cartbtn" to="/cart" aria-label="Cart">
            <span className="carticon">🛒</span>
            <span className="carttext">Cart</span>
            {count > 0 ? <span className="badge">{count}</span> : null}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
