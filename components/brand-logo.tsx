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
        <span><b>DevDes</b><em>.click</em></span>
      </span>
    </span>
  );
}
