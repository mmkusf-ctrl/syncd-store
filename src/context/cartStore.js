// src/context/cartStore.js
const KEY = "syncd_cart";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart() {
  return read();
}

export function getCartCount() {
  const items = read();
  return items.reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function addToCart(product, qty = 1) {
  const items = read();
  const i = items.findIndex((x) => x.id === product.id);

  if (i >= 0) {
    items[i].qty = (items[i].qty || 0) + qty;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      collection: product.collection,
      sub: product.sub,
      qty: qty
    });
  }

  write(items);
}

export function incQty(id) {
  const items = read();
  const i = items.findIndex((x) => x.id === id);
  if (i >= 0) {
    items[i].qty = (items[i].qty || 0) + 1;
    write(items);
  }
}

export function decQty(id) {
  const items = read();
  const i = items.findIndex((x) => x.id === id);
  if (i >= 0) {
    items[i].qty = (items[i].qty || 0) - 1;
    if (items[i].qty <= 0) items.splice(i, 1);
    write(items);
  }
}

export function removeItem(id) {
  const items = read().filter((x) => x.id !== id);
  write(items);
}

export function clearCart() {
  write([]);
}
