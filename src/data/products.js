function makeSeries({ startId, type, sub, count, basePrice }) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: startId + i,
      type,
      sub,
      name: `${capitalize(type)} ${capitalize(sub)} ${String(n).padStart(2, "0")}`,
      price: Number((basePrice + (i % 5) * 7.5 + (i % 3) * 2.25).toFixed(2)),
    };
  });
}

function capitalize(s) {
  return s.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

// 11 items each (matches your earlier pattern)
export const products = [
  ...makeSeries({ startId: 1, type: "premium", sub: "necklace", count: 11, basePrice: 49.99 }),
  ...makeSeries({ startId: 21, type: "premium", sub: "earrings", count: 11, basePrice: 39.99 }),
  ...makeSeries({ startId: 41, type: "premium", sub: "bracelet", count: 11, basePrice: 44.99 }),

  ...makeSeries({ startId: 101, type: "pearl", sub: "necklace", count: 11, basePrice: 79.99 }),
  ...makeSeries({ startId: 121, type: "pearl", sub: "earrings", count: 11, basePrice: 69.99 }),
  ...makeSeries({ startId: 141, type: "pearl", sub: "bracelet", count: 11, basePrice: 74.99 }),
];
