import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./CartIcon.css";

export default function CartIcon() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <button className="cart-icon-btn" onClick={() => navigate("/cart")} aria-label="Cart">
      <FaShoppingCart />
      <span>CART</span>

      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </button>
  );
}
