import type { CSSProperties } from "react";

/** The generated atlas contains sixteen equally sized cells in a 4 × 4 grid. */
export function ProductArt({ id, className = "", label }: { id: number; className?: string; label?: string }) {
  return <div className={`bebe-product-art ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ "--product-x": `${(id % 4) * 100 / 3}%`, "--product-y": `${Math.floor(id / 4) * 100 / 3}%` } as CSSProperties} />;
}
