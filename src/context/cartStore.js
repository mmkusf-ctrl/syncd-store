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
  // notify pages (Cart listens to this)
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart() {
  return read();
}

export function clearCart() {
  write([]);
}

export function removeItem(id) {
  const items = read().filter((it) => it.id !== id);
  write(items);
}

export function incQty(id) {
  const items = read().map((it) =>
    it.id === id ? { ...it, qty: (it.qty || 1) + 1 } : it
  );
  write(items);
}

export function decQty(id) {
  const items = read()
    .map((it) =>
      it.id === id ? { ...it, qty: Math.max(1, (it.qty || 1) - 1) } : it
    )
    .filter((it) => (it.qty || 1) >= 1);
  write(items);
}

// Call this from product pages
export function addToCart(product, qty = 1) {
  const items = read();
  const existing = items.find((it) => it.id === product.id);

  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
    write([...items]);
    return;
  }

  const item = {
    id: product.id,
    name: product.name,
    price: Number(product.price || 0),
    qty: Math.max(1, Number(qty || 1)),
    collection: product.collection,
    sub: product.sub,
  };

  write([...items, item]);
}
