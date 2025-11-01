// components/utils/colorUtils.js
export function getCategoryStyle(color) {
  const hex = color?.replace("#", "") || "9ca3af";
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 150 ? "#000" : "#fff";

  return {
    backgroundColor: `#${hex}`,
    color: textColor,
    borderColor: `#${hex}`,
  };
}
