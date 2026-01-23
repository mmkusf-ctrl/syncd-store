const KEY = "syncd_cart_v1";

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
  return read().reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function addToCart(product, qty = 1) {
  const items = read();
  const idx = items.findIndex((x) => x.id === product.id);
  if (idx >= 0) items[idx].qty += qty;
  else items.push({ ...product, qty });
  write(items);
}

export function incQty(id) {
  const items = read();
  const it = items.find((x) => x.id === id);
  if (it) it.qty += 1;
  write(items);
}

export function decQty(id) {
  const items = read();
  const it = items.find((x) => x.id === id);
  if (!it) return;
  it.qty -= 1;
  if (it.qty <= 0) {
    const next = items.filter((x) => x.id !== id);
    write(next);
    return;
  }
  write(items);
}

export function removeItem(id) {
  const items = read().filter((x) => x.id !== id);
  write(items);
}

export function clearCart() {
  write([]);
}
