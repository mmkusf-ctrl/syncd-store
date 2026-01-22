import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cartItems: { [productId]: qty }
  const [cartItems, setCartItems] = useState({});

  const cartCount = useMemo(() => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  }, [cartItems]);

  function addToCart(productId, qty = 1) {
    setCartItems((prev) => {
      const nextQty = (prev[productId] || 0) + qty;
      return { ...prev, [productId]: nextQty };
    });
  }

  function setQty(productId, qty) {
    setCartItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function clearCart() {
    setCartItems({});
  }

  const value = useMemo(
    () => ({ cartItems, cartCount, addToCart, setQty, removeFromCart, clearCart }),
    [cartItems, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
