const STORAGE_KEY = "syncd_cart_v1";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // notify other components/pages (cart badge, etc.)
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

export function getCart() {
  return read();
}

export function getCartCount() {
  return read().reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function clearCart() {
  write([]);
}

export function addItem(product, qty = 1) {
  // product: { id, name, price, collection?, sub? }
  const items = read();
  const idx = items.findIndex((x) => x.id === product.id);

  if (idx >= 0) {
    items[idx] = { ...items[idx], qty: items[idx].qty + qty };
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: Number(product.price || 0),
      qty: qty,
      // keep optional metadata if you have it
      collection: product.collection,
      sub: product.sub
    });
  }

  write(items);
}

export function setQty(id, qty) {
  const items = read().map((it) =>
    it.id === id ? { ...it, qty: Math.max(1, qty) } : it
  );
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
    .map((it) => (it.id === id ? { ...it, qty: (it.qty || 1) - 1 } : it))
    .filter((it) => (it.qty || 0) > 0);
  write(items);
}

export function removeItem(id) {
  const items = read().filter((it) => it.id !== id);
  write(items);
}
