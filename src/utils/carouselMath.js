export function getCircularOffset(index, activeIndex, total) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function getCardTransform(offset) {
  const abs = Math.abs(offset);
  if (abs === 0) return { x: 0, scale: 1, opacity: 1, blur: 0, z: 5, tier: "large" };
  if (abs === 1) return { x: offset * 300, scale: 0.68, opacity: 0.65, blur: 0.5, z: 3, tier: "medium" };
  if (abs === 2) return { x: offset * 480, scale: 0.46, opacity: 0.3, blur: 1.5, z: 2, tier: "small" };
  return { x: offset * 560, scale: 0.35, opacity: 0, blur: 2, z: 1, tier: "hidden" };
}