import Link from "next/link";

export function TemplateLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link className={`catalog-logo ${dark ? "on-dark" : ""}`} href="/">
      web<span>dao</span><i>.</i>
    </Link>
  );
}
