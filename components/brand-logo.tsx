import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="devdes-logo" aria-hidden="true">
      <Image
        className="devdes-logo-mark"
        src="/images/devdes-mark.png"
        alt=""
        width={148}
        height={240}
        priority
      />
      <span className="devdes-logo-type">
        <span><b>D</b>evelop</span>
        <span><b>D</b>esign</span>
      </span>
    </span>
  );
}
