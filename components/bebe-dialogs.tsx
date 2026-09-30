"use client";

import { useState } from "react";
import { ArrowRight, Gift, Leaf, Minus, Plus, Ruler, ShoppingBag } from "lucide-react";
import { bebeProducts, bebeSizeRows, type BebeProduct } from "@/lib/bebe-products";
import { useLocale } from "./locale-provider";
import { DemoDialog } from "./demo-dialog";
import { ProductArt } from "./bebe-product-art";
import type { BebeCartItem } from "./fashion-demo";

type Props = {
  selected: BebeProduct | null;
  closeProduct: () => void;
  addItem: (id: number, size: string) => void;
  cart: BebeCartItem[];
  cartOpen: boolean;
  closeCart: () => void;
  changeQuantity: (id: number, size: string, delta: number) => void;
  guideOpen: boolean;
  closeGuide: () => void;
  browse: () => void;
};

export function BebeDialogs(props: Props) {
  const { locale } = useLocale();
  const en = locale === "en";
  const t = (vi: string, english: string) => en ? english : vi;
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  return <>
    {props.selected && <ProductDialog key={props.selected.id} product={props.selected} onClose={props.closeProduct} addItem={props.addItem} />}
    {props.cartOpen && <CartDialog {...props} giftWrap={giftWrap} setGiftWrap={setGiftWrap} giftNote={giftNote} setGiftNote={setGiftNote} />}
    {props.guideOpen && <DemoDialog title={t("Chọn size cùng Bebé", "Find their little size")} onClose={props.closeGuide}><div className="bebe-size-guide"><p>{t("Độ tuổi là gợi ý. Hãy đối chiếu chiều cao của bé và số đo từng sản phẩm. M = tháng, Y = tuổi.", "Age is a guide. Compare your child's height with the product measurements. M = months, Y = years.")}</p><div><section><h3>{t("Bé sơ sinh · 0–24 tháng", "Baby · 0–24 months")}</h3><SizeTable type="baby" en={en} /></section><section><h3>{t("Bé lớn · 2–8 tuổi", "Little kids · 2–8 years")}</h3><SizeTable type="clothes" en={en} /></section><section><h3>{t("Giày cho bé", "Little shoes")}</h3><SizeTable type="shoes" en={en} /></section></div><p className="bebe-demo-note">{t("Bảng số đo minh họa. Mũ dùng vòng đầu, balo và khăn dùng kích thước sản phẩm ghi trên từng món. Sản phẩm thực tế cần bảng size riêng của nhà sản xuất.", "Illustrative measurements. Hats use head circumference; bags and blankets list product dimensions. Real products need the manufacturer's own size chart.")}</p></div></DemoDialog>}
  </>;
}

function ProductDialog({ product, onClose, addItem }: { product: BebeProduct; onClose: () => void; addItem: Props["addItem"] }) {
  const { locale } = useLocale();
  const en = locale === "en";
  const t = (vi: string, english: string) => en ? english : vi;
  const [size, setSize] = useState(product.sizes[0]);
  const price = new Intl.NumberFormat(en ? "en-US" : "vi-VN", { style: "currency", currency: "VND" }).format(product.price);
  return <DemoDialog title={product.name[locale]} onClose={onClose}><div className="bebe-quickview"><ProductArt id={product.id} label={product.name[locale]} /><section><span className="bebe-eyebrow">BEBÉ BOUTIQUE · LITTLE & LOVED</span><h3>{price}</h3><p>{product.description[locale]}</p><p className="bebe-material"><Leaf size={16} />{product.material[locale]}</p><p className="bebe-material"><span className="bebe-color" style={{ background: product.color }} />{product.colorName[locale]}</p><fieldset className="bebe-size-picker"><legend>{t("Chọn kích cỡ", "Choose a size")}</legend>{product.sizes.map(value => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value}</button>)}</fieldset>{product.sizeType !== "accessory" && <details className="bebe-inline-guide"><summary><Ruler size={15} />{t("Xem số đo tham khảo", "See reference measurements")}</summary><SizeTable type={product.sizeType} en={en} /><small>{t("M = tháng · Y = tuổi. Số đo minh họa.", "M = months · Y = years. Illustrative measurements.")}</small></details>}<button className="bebe-cta" onClick={() => addItem(product.id, size)}>{t("Thêm vào giỏ nhỏ", "Add to little bag")} <ShoppingBag size={18} /></button><p className="bebe-demo-note">{t("Giá và chất liệu minh họa cho mẫu website.", "Prices and materials are illustrative for this website demo.")}</p></section></div></DemoDialog>;
}

function CartDialog({ cart, closeCart, changeQuantity, browse, giftWrap, setGiftWrap, giftNote, setGiftNote }: Props & { giftWrap: boolean; setGiftWrap: (value: boolean) => void; giftNote: string; setGiftNote: (value: string) => void }) {
  const { locale } = useLocale();
  const en = locale === "en";
  const t = (vi: string, english: string) => en ? english : vi;
  const money = (value: number) => new Intl.NumberFormat(en ? "en-US" : "vi-VN", { style: "currency", currency: "VND" }).format(value);
  const [notice, setNotice] = useState("");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + bebeProducts[item.id].price * item.quantity, 0);
  const total = subtotal + (giftWrap && cart.length > 0 ? 25000 : 0);
  function update(id: number, size: string, delta: number) { setNotice(""); changeQuantity(id, size, delta); }
  return <DemoDialog title={`${t("Giỏ nhỏ của bạn", "Your little bag")} (${count})`} onClose={closeCart}><div className="bebe-cart">{cart.length ? <>{cart.map(item => { const product = bebeProducts[item.id]; return <div className="bebe-cart-row" key={`${item.id}-${item.size}`}><ProductArt id={item.id} label={product.name[locale]} /><div><h3>{product.name[locale]}</h3><p>{item.size} · {money(product.price)}</p><div className="bebe-quantity"><button aria-label={`${t("Giảm số lượng", "Decrease quantity")} ${product.name[locale]}`} onClick={() => update(item.id, item.size, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`${t("Tăng số lượng", "Increase quantity")} ${product.name[locale]}`} onClick={() => update(item.id, item.size, 1)}><Plus size={14} /></button></div></div><b>{money(product.price * item.quantity)}</b></div>; })}<div className="bebe-gift-option"><label><input type="checkbox" checked={giftWrap} onChange={event => { setGiftWrap(event.target.checked); setNotice(""); }} /><Gift size={19} />{t("Thêm gói quà & thiệp", "Add gift wrap & a card")} <b>+{money(25000)}</b></label>{giftWrap && <label className="bebe-gift-message">{t("Lời nhắn yêu thương", "Your little note")}<textarea value={giftNote} maxLength={180} placeholder={t("Gửi bé một lời chúc…", "Write a little wish…")} onChange={event => { setGiftNote(event.target.value); setNotice(""); }} /><small>{giftNote.length}/180</small></label>}</div><div className="bebe-cart-summary"><p><span>{t("Tiền sản phẩm", "Items")}</span><b>{money(subtotal)}</b></p>{giftWrap && <p><span>{t("Gói quà", "Gift wrap")}</span><b>{money(25000)}</b></p>}<p><span>{t("Giao hàng", "Delivery")}</span><span>{subtotal >= 699000 ? t("Miễn phí (minh họa)", "Free (demo)") : t("Tính khi xác nhận đơn", "Calculated on confirmation")}</span></p><div><span>{t("Tạm tính", "Subtotal")}</span><b>{money(total)}</b></div></div><button className="bebe-cta" onClick={() => setNotice(t(`Đã hoàn tất trải nghiệm mua sắm mẫu với ${count} sản phẩm${giftWrap ? " và gói quà" : ""}. Không có đơn hàng hay thanh toán thực tế.`, `Demo complete with ${count} items${giftWrap ? " and gift wrapping" : ""}. No real order or payment was created.`))}>{t("Thử thanh toán mẫu", "Try demo checkout")} <ArrowRight size={18} /></button><p role="status" className="bebe-cart-notice">{notice}</p><p className="bebe-demo-note">{t("Giỏ hàng chỉ lưu trong phiên xem. Không thu tiền hoặc gửi đơn thực tế.", "Your bag lasts for this visit only. No real payment or order is processed.")}</p></> : <div className="bebe-empty"><ShoppingBag size={42} /><h3>{t("Giỏ nhỏ đang chờ một món xinh.", "A little bag waiting for a lovely thing.")}</h3><button className="bebe-cta" onClick={browse}>{t("Dạo cửa hàng", "Explore the shop")} <ArrowRight size={18} /></button></div>}</div></DemoDialog>;
}

function SizeTable({ type, en }: { type: "baby" | "clothes" | "shoes"; en: boolean }) {
  return <table className="bebe-size-table"><thead><tr><th>Size</th><th>{type === "shoes" ? (en ? "Foot length" : "Chiều dài bàn chân") : (en ? "Height" : "Chiều cao")}</th></tr></thead><tbody>{bebeSizeRows[type].map(([size, height]) => <tr key={size}><td>{size}</td><td>{height}</td></tr>)}</tbody></table>;
}
