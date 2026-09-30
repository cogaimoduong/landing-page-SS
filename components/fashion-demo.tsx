"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight, ShoppingBag, Plus, Minus, Truck, RotateCcw, Scissors } from "lucide-react";
import Link from "next/link";
import { DemoDialog } from "./demo-dialog";
import { useLocale } from "./locale-provider";
import "./fashion-demo.css";

const products = [
  { id: 1, name: "Everyday Cotton Tee", group: "tops", material: "100% cotton", price: 390000, image: "photo-1521572163474-6864f9cf17ab", color: "Ivory", tag: "BESTSELLER" },
  { id: 2, name: "The Essential Shirt", group: "tops", material: "Cotton poplin", price: 690000, image: "photo-1598554747436-c9293d6a588f", color: "White", tag: "NEW" },
  { id: 3, name: "Straight-leg Denim", group: "bottoms", material: "Cotton denim", price: 890000, image: "photo-1542272604-787c3835535d", color: "Vintage blue", tag: "ESSENTIAL" },
  { id: 4, name: "Everywhere Backpack", group: "accessories", material: "Canvas", price: 490000, image: "photo-1553062407-98eeb64c6a62", color: "Navy", tag: "NEW" },
];
const photo = (id: string, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
type CartItem = { id: number; size: string; quantity: number };

export function FashionDemo() {
  const { locale } = useLocale();
  const en = locale === "en";
  const t = (vi: string, english: string) => en ? english : vi;
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const [size, setSize] = useState("M");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const money = (value: number) => new Intl.NumberFormat(en ? "en-US" : "vi-VN", { style: "currency", currency: "VND" }).format(value);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id)!.price * item.quantity, 0);
  function addToCart() {
    if (!selected) return;
    const chosenSize = selected.group === "accessories" ? "One size" : size;
    setCart(items => items.some(item => item.id === selected.id && item.size === chosenSize)
      ? items.map(item => item.id === selected.id && item.size === chosenSize ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { id: selected.id, size: chosenSize, quantity: 1 }]);
    setSelected(null); setNotice(""); setCartOpen(true);
  }
  function changeQuantity(id: number, itemSize: string, delta: number) {
    setNotice("");
    setCart(items => items.map(item => item.id === id && item.size === itemSize ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  }
  return <main className="fashion-shop" id="top">
    <div className="fashion-announcement">{t("Một chút mới mẻ cho tủ đồ của bạn.", "A fresh perspective for your everyday wardrobe.")} <span>BEBÉ BOUTIQUE / FALL 2026</span></div>
    <nav className="fashion-nav" aria-label={t("Điều hướng cửa hàng", "Shop navigation")}>
      <a className="fashion-logo" href="#top">Bebé<span>BOUTIQUE</span></a>
      <div className="fashion-links"><a href="#collection">{t("Sản phẩm", "Shop")}</a><a href="#edit">The autumn edit</a><a href="#story">{t("Về Bebé Boutique", "Our story")}</a></div>
      <button className="fashion-bag" onClick={() => { setCartOpen(true); setNotice(""); }} aria-label={`${t("Giỏ hàng", "Shopping bag")} (${count})`}><ShoppingBag size={19} /><span>{t("Giỏ hàng", "Bag")}</span><b>{count}</b></button>
    </nav>
    <header className="fashion-hero">
      <div className="fashion-hero-copy"><span className="fashion-eyebrow">LESS, BUT BETTER / COLLECTION 01</span><h1>{t("Mặc đơn giản.", "Wear less.")}<br /><em>{t("Sống có gu.", "Mean more.")}</em></h1><p>{t("Những thiết kế dễ mặc, chất liệu dễ yêu. Một tủ đồ vừa đủ để bạn luôn là chính mình.", "Considered silhouettes. Textures to fall for. Everyday pieces that feel entirely like you.")}</p><a className="fashion-cta" href="#collection">{t("Khám phá bộ sưu tập", "Explore the collection")} <ArrowUpRight size={19} /></a><div className="fashion-hero-bottom"><span>DESIGNED FOR EVERY DAY.</span><span>01 — 04</span></div></div>
      <div className="fashion-hero-image" role="img" aria-label={t("Phong cách thời trang đường phố", "Street style fashion")}><span>THE ART OF<br />EVERYDAY DRESSING.</span><a href="#edit">AUTUMN / WINTER 2026 <ArrowUpRight size={19} /></a></div>
    </header>
    <div className="fashion-values"><span><Scissors size={18} />{t("Chỉn chu từng đường may", "Thoughtfully made")}</span><span><Truck size={18} />{t("Miễn phí vận chuyển từ 1 triệu", "Free shipping over ₫1,000,000")}</span><span><RotateCcw size={18} />{t("Đổi size trong 14 ngày", "14-day size exchanges")}</span></div>
    <section className="fashion-collection" id="collection"><div className="fashion-section-heading"><div><span className="fashion-eyebrow">YOUR EVERYDAY ROTATION</span><h2>{t("Những món bạn sẽ yêu.", "Your new favourites.")}</h2></div><span>{t("Ít hơn. Chất hơn. Mặc lâu hơn.", "Buy less. Choose well. Wear longer.")}</span></div>
      <div className="fashion-filters" aria-label={t("Lọc sản phẩm", "Filter products")}>{[["all", t("Tất cả", "All pieces")], ["tops", t("Áo", "Tops")], ["bottoms", t("Quần", "Bottoms")], ["accessories", t("Phụ kiện", "Accessories")]].map(([id, label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}<span aria-live="polite">{products.filter(p => filter === "all" || p.group === filter).length} {t("sản phẩm", "pieces")}</span></div>
      <div className="fashion-products">{products.filter(p => filter === "all" || p.group === filter).map(product => <article key={product.id}><button className="fashion-product-image" onClick={() => { setSelected(product); setSize("M"); }} aria-label={`${t("Xem", "View")} ${product.name}`} style={{ backgroundImage: `url(${photo(product.image)})` }}><span>{product.tag}</span><i><Plus size={20} /></i></button><div className="fashion-product-info"><h3><button onClick={() => { setSelected(product); setSize("M"); }}>{product.name}</button></h3><b>{money(product.price)}</b></div><p>{product.material} · {product.color}</p></article>)}</div>
    </section>
    <section className="fashion-edit" id="edit"><div className="fashion-edit-image" role="img" aria-label={t("Bộ sưu tập trang phục mùa thu", "Autumn clothing collection")} /><div><span className="fashion-eyebrow">THE AUTUMN EDIT / 2026</span><h2>{t("Một mùa mới.", "A new season.")}<br /><em>{t("Vẫn là bạn.", "Still you.")}</em></h2><p>{t("Sắc màu trung tính, phom dáng tự do và những lớp chất liệu mềm mại. Tìm thấy cảm hứng mới trong những điều quen thuộc.", "Neutral tones, relaxed silhouettes, and soft layers. Find a new perspective in the familiar.")}</p><a href="#collection" onClick={() => setFilter("tops")}>{t("Khám phá những thiết kế mới", "Discover the new edit")} <ArrowRight size={20} /></a></div></section>
    <section className="fashion-story" id="story"><span className="fashion-eyebrow">THE BEBÉ BOUTIQUE PHILOSOPHY</span><h2>{t("Không cần nhiều hơn.", "You don’t need more.")}<br /><em>{t("Chỉ cần đúng với bạn.", "Just more you.")}</em></h2><p>{t("Bebé Boutique bắt đầu từ một ý tưởng giản đơn: quần áo đẹp là những món bạn muốn mặc đi mặc lại. Chúng tôi dành sự quan tâm cho phom dáng, chất liệu và từng chi tiết nhỏ — để bạn thoải mái viết nên câu chuyện của riêng mình.", "Bebé Boutique starts with a simple idea: great clothes are the pieces you reach for again and again. We care about the fit, the fabric, and the small details, so you can make each piece part of your own story.")}</p></section>
    <footer className="fashion-footer"><a className="fashion-logo" href="#top">Bebé<span>BOUTIQUE</span></a><p>EVERYDAY PIECES. ENDLESS POSSIBILITIES.</p><Link href="/giao-dien">{t("Mẫu giao diện bởi DevDes", "A template by DevDes")} <ArrowUpRight size={15} /></Link><small>© 2026 BEBÉ BOUTIQUE — {t("Cửa hàng minh họa", "Demo storefront")}</small></footer>
    {selected && <DemoDialog title={selected.name} onClose={() => setSelected(null)}><div className="fashion-quickview"><div role="img" aria-label={selected.name} style={{ backgroundImage: `url(${photo(selected.image)})` }} /><section><span className="fashion-eyebrow">{selected.material} / {selected.color}</span><h3>{money(selected.price)}</h3><p>{t("Một thiết kế dễ kết hợp cho tủ đồ hằng ngày. Phom thoải mái, đường nét tối giản.", "An easy-to-style everyday essential with a relaxed fit and clean lines.")}</p><p>{t("Chọn kích cỡ", "Select size")}</p><div className="fashion-sizes">{(selected.group === "accessories" ? ["One size"] : ["S", "M", "L", "XL"]).map(s => <button key={s} aria-pressed={selected.group === "accessories" || size === s} onClick={() => setSize(s)}>{s}</button>)}</div><button className="fashion-cta" onClick={addToCart}>{t("Thêm vào giỏ hàng", "Add to bag")} <Plus size={18} /></button></section></div></DemoDialog>}
    {cartOpen && <DemoDialog title={`${t("Giỏ hàng của bạn", "Your shopping bag")} (${count})`} onClose={() => setCartOpen(false)}><div className="fashion-cart">{cart.length ? <>{cart.map(item => { const product = products.find(p => p.id === item.id)!; return <div className="fashion-cart-row" key={`${item.id}-${item.size}`}><div className="fashion-cart-image" role="img" aria-label={product.name} style={{ backgroundImage: `url(${photo(product.image, 200)})` }} /><div><h3>{product.name}</h3><p>{item.size} · {money(product.price)}</p><div className="fashion-quantity"><button aria-label={`${t("Giảm số lượng", "Decrease quantity")} ${product.name}`} onClick={() => changeQuantity(item.id, item.size, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`${t("Tăng số lượng", "Increase quantity")} ${product.name}`} onClick={() => changeQuantity(item.id, item.size, 1)}><Plus size={14} /></button></div></div><b>{money(product.price * item.quantity)}</b></div>; })}<div className="fashion-cart-total"><span>{t("Tạm tính", "Subtotal")}</span><b>{money(total)}</b></div><p>{t("Giỏ hàng minh họa. Không phát sinh đơn hàng hay thanh toán thực tế.", "Demo bag. No real orders or payments are processed.")}</p><button className="fashion-cta" onClick={() => setNotice(t("Bạn đã trải nghiệm xong bước mua sắm mẫu. Cảm ơn bạn đã ghé Bebé Boutique!", "You’ve completed the sample shopping flow. Thank you for visiting Bebé Boutique!"))}>{t("Thử thanh toán", "Try demo checkout")} <ArrowRight size={18} /></button><p role="status">{notice}</p></> : <div className="fashion-empty"><ShoppingBag size={40} /><h3>{t("Giỏ hàng đang chờ món đồ đầu tiên.", "Your bag is waiting for its first piece.")}</h3><button className="fashion-cta" onClick={() => { setCartOpen(false); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }}>{t("Khám phá sản phẩm", "Explore the collection")} <ArrowRight size={18} /></button></div>}</div></DemoDialog>}
  </main>;
}
