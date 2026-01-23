// src/context/cartStore.js

const KEY = "syncd_cart_v1";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  // Notify all pages/components to refresh cart badge + cart page
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart() {
  return read();
}

export function getCartCount() {
  const cart = read();
  return cart.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}

export function addToCart(product, qty = 1) {
  const cart = read();
  const q = Math.max(1, Number(qty) || 1);

  const idx = cart.findIndex((x) => x.id === product.id);
  if (idx >= 0) {
    cart[idx].qty = (Number(cart[idx].qty) || 0) + q;
  } else {
    cart.push({ ...product, qty: q });
  }

  write(cart);
}

export function incQty(id) {
  const cart = read();
  const idx = cart.findIndex((x) => x.id === id);
  if (idx >= 0) {
    cart[idx].qty = (Number(cart[idx].qty) || 0) + 1;
    write(cart);
  }
}

export function decQty(id) {
  const cart = read();
  const idx = cart.findIndex((x) => x.id === id);
  if (idx >= 0) {
    const next = (Number(cart[idx].qty) || 0) - 1;
    if (next <= 0) cart.splice(idx, 1);
    else cart[idx].qty = next;
    write(cart);
  }
}

export function removeItem(id) {
  const cart = read().filter((x) => x.id !== id);
  write(cart);
}

export function clearCart() {
  write([]);
}
