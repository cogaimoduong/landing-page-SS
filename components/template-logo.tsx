import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function TemplateLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link className={`catalog-logo ${dark ? "on-dark" : ""}`} href="/" aria-label="DevDes.click — Về trang chủ">
      <BrandLogo />
    </Link>
  );
}
