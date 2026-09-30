"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Flower2, Gift, Heart, Leaf, Plus, RotateCcw, Ruler, Search, ShoppingBag, Sparkles, Sun, X } from "lucide-react";
import { useLocale } from "./locale-provider";
import { BebeSections } from "./bebe-sections";
import { BebeDialogs } from "./bebe-dialogs";
import { ProductArt } from "./bebe-product-art";
import { bebeProducts, bebeCategories, bebeCollections, type BebeProduct, type BebeCategory, type BebeCollection, type BebeAge } from "@/lib/bebe-products";
import "./fashion-demo.css";

export type BebeCartItem = { id: number; size: string; quantity: number };
type Sort = "featured" | "price-asc" | "price-desc";
const featuredOrder = [4, 8, 0, 6, 1, 5, 12, 13, 7, 9, 10, 11, 2, 3, 14, 15];

export function FashionDemo() {
  const { locale } = useLocale();
  const en = locale === "en";
  const t = (vi: string, english: string) => en ? english : vi;
  const [category, setCategory] = useState<BebeCategory>("all");
  const [collection, setCollection] = useState<BebeCollection>("all");
  const [age, setAge] = useState<BebeAge>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [limit, setLimit] = useState(8);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selected, setSelected] = useState<BebeProduct | null>(null);
  const [cart, setCart] = useState<BebeCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const money = (value: number) => new Intl.NumberFormat(en ? "en-US" : "vi-VN", { style: "currency", currency: "VND" }).format(value);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();
  const filtered = bebeProducts.filter(product =>
    (category === "all" || product.categories.includes(category)) &&
    (collection === "all" || product.collections.includes(collection)) &&
    (age === "all" || product.ages.includes(age)) &&
    (!onlyFavorites || favorites.includes(product.id)) &&
    normalize(`${product.name[locale]} ${product.material[locale]}`).includes(normalize(query.trim()))
  ).sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));
  const currentCollection = bebeCollections.find(item => item.id === collection);
  function scrollToShop() { document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }
  function resetFilters() { setCategory("all"); setCollection("all"); setAge("all"); setQuery(""); setOnlyFavorites(false); setLimit(8); }
  function browseCategory(value: BebeCategory) { resetFilters(); setCategory(value); scrollToShop(); }
  function browseCollection(value: BebeCollection) { resetFilters(); setCollection(value); scrollToShop(); }
  function toggleFavorite(id: number) { setFavorites(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]); }
  function addItem(id: number, size: string) {
    setCart(items => items.some(item => item.id === id && item.size === size)
      ? items.map(item => item.id === id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { id, size, quantity: 1 }]);
    setSelected(null); setCartOpen(true);
  }
  function changeQuantity(id: number, size: string, delta: number) {
    setCart(items => items.map(item => item.id === id && item.size === size ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  }

  return <main className="bebe-shop" id="top">
    <div className="bebe-announcement"><span><Gift size={14} /> {t("Gói ghém yêu thương trong từng món nhỏ", "A little love in every little parcel")}</span><span>{t("Miễn phí giao hàng từ 699.000đ", "Free shipping on orders over ₫699,000")}</span></div>
    <nav className="bebe-nav bebe-shell" aria-label={t("Điều hướng cửa hàng", "Shop navigation")}>
      <a className="bebe-logo" href="#top">bebé<span>BOUTIQUE · LITTLE & LOVED</span></a>
      <div className="bebe-nav-links">{bebeCategories.map(item => <button key={item.id} onClick={() => browseCategory(item.id)}>{item.label[locale]}</button>)}<a href="#collections">{t("Bộ sưu tập", "Collections")}</a></div>
      <div className="bebe-nav-actions"><button aria-label={t("Xem sản phẩm yêu thích", "View favourites")} onClick={() => { resetFilters(); setOnlyFavorites(true); scrollToShop(); }}><Heart size={21} /><span>{favorites.length}</span></button><button aria-label={`${t("Giỏ hàng", "Shopping bag")} (${count})`} onClick={() => setCartOpen(true)}><ShoppingBag size={21} /><span>{count}</span></button></div>
    </nav>
    <header className="bebe-hero bebe-shell">
      <div className="bebe-hero-copy"><span className="bebe-eyebrow"><span /> {t("THẾ GIỚI NHỎ, NIỀM VUI TO", "SMALL WORLD, BIG WONDER")}</span><h1>{t("Nhỏ xíu thôi.", "Little clothes.")}<br /><em>{t("Yêu hết nấc.", "Big adventures.")}</em></h1><p>{t("Mềm một chút, xinh một chút. Để mỗi ngày lớn lên của bé là một ngày thật nhiều niềm vui.", "A little softer. A little sweeter. Thoughtful little pieces for all their big, beautiful adventures.")}</p><button className="bebe-cta" onClick={() => browseCategory("all")}>{t("Sắm đồ xinh cho bé", "Find their next favourite")} <ArrowRight size={18} /></button><a className="bebe-hero-secondary" href="#collections">{t("Dạo một vòng bộ sưu tập", "Wander through our collections")} <ArrowUpRight size={16} /></a><div className="bebe-hero-note"><Flower2 size={29} /><span>{t("Dành cho những năm tháng", "Made for the little years,")}<br /><b>{t("nhỏ xíu mà đáng nhớ.", "and the biggest memories.")}</b></span></div></div>
      <div className="bebe-hero-visual"><Image className="bebe-campaign" src="/images/bebe/garden-campaign.png" alt={t("Hai bé mặc yếm vàng và váy hồng đào, nắm tay dạo chơi trong vườn", "Two children in yellow dungarees and a peach dress holding hands in a sunny garden")} fill sizes="(max-width: 760px) 90vw, 50vw" preload /><div className="bebe-sun" aria-hidden="true"><Sun /><span>hello,<br />little sunshine!</span></div><div className="bebe-photo-label"><span>THE LITTLE GARDEN CLUB</span><b>{t("Lớn lên cùng những ngày vui", "Growing up in happy colours")}</b><a href="#collections" aria-label={t("Xem bộ sưu tập", "Explore collections")}><ArrowUpRight size={21} /></a></div></div>
    </header>
    <div className="bebe-promise-strip"><span><Leaf /> {t("Chất liệu mềm mại", "Soft, lovely fabrics")}</span><Flower2 aria-hidden="true" /><span><Heart /> {t("Thoải mái là ưu tiên", "Comfort comes first")}</span><Flower2 aria-hidden="true" /><span><RotateCcw /> {t("Đổi size trong 14 ngày", "14-day size exchanges")}</span><Flower2 aria-hidden="true" /><span><Gift /> {t("Có gói quà xinh", "Gift-ready happiness")}</span></div>
    <section className="bebe-categories bebe-shell" aria-labelledby="bebe-category-heading"><div className="bebe-section-title"><div><span className="bebe-eyebrow">A LITTLE SOMETHING FOR EVERYONE</span><h2 id="bebe-category-heading">{t("Bé nhà mình đang tuổi nào?", "For every little chapter.")}</h2></div><span>{t("Từ cái ôm đầu tiên đến ngày tựu trường.", "From first cuddles to first school days.")}</span></div><div className="bebe-category-grid">{bebeCategories.map((item, index) => <button className={`bebe-category bebe-tone-${index}`} key={item.id} onClick={() => browseCategory(item.id)}><div><ProductArt id={item.image} /><span><ArrowUpRight size={22} /></span></div><h3>{item.label[locale]}</h3><p>{item.ages[locale]}</p></button>)}</div></section>
    <section className="bebe-shop-section bebe-shell" id="collection"><div className="bebe-section-title"><div><span className="bebe-eyebrow"><Sparkles size={14} /> LITTLE THINGS TO LOVE</span><h2>{onlyFavorites ? t("Những món bạn đã thương.", "Your little favourites.") : currentCollection ? currentCollection.name[locale] : t("Xinh từ cái nhìn đầu tiên.", "Love at first little sight.")}</h2></div><button className="bebe-text-link" onClick={() => setGuideOpen(true)}><Ruler size={17} /> {t("Giúp mình chọn size", "Help me choose a size")}</button></div>
      <div className="bebe-filter-tabs" aria-label={t("Danh mục sản phẩm", "Product categories")}><button aria-pressed={category === "all"} onClick={() => { setCategory("all"); setLimit(8); }}>{t("Tất cả đồ xinh", "All little things")}</button>{bebeCategories.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setLimit(8); }}>{item.label[locale]}</button>)}<button className="bebe-favorites-filter" aria-pressed={onlyFavorites} onClick={() => { setOnlyFavorites(!onlyFavorites); setLimit(8); }}><Heart size={14} />{t("Yêu thích", "Favourites")} ({favorites.length})</button></div>
      <div className="bebe-shop-tools"><label className="bebe-search"><Search size={17} /><input aria-label={t("Tìm sản phẩm", "Search products")} placeholder={t("Tìm món xinh cho bé…", "Find a little favourite…")} value={query} onChange={event => { setQuery(event.target.value); setLimit(8); }} />{query && <button aria-label={t("Xóa tìm kiếm", "Clear search")} onClick={() => setQuery("")}><X size={15} /></button>}</label><label>{t("Độ tuổi", "Age")}<select value={age} onChange={event => { setAge(event.target.value as BebeAge); setLimit(8); }}><option value="all">{t("Mọi độ tuổi", "All ages")}</option><option value="baby">{t("0–24 tháng", "0–24 months")}</option><option value="toddler">{t("2–4 tuổi", "2–4 years")}</option><option value="kids">{t("5–8 tuổi", "5–8 years")}</option></select></label><label>{t("Sắp xếp", "Sort")}<select value={sort} onChange={event => setSort(event.target.value as Sort)}><option value="featured">{t("Bebé gợi ý", "Bebé picks")}</option><option value="price-asc">{t("Giá tăng dần", "Price: low to high")}</option><option value="price-desc">{t("Giá giảm dần", "Price: high to low")}</option></select></label></div>
      <div className="bebe-results"><span role="status">{filtered.length} {t("món nhỏ xinh", "lovely little pieces")}</span>{(category !== "all" || collection !== "all" || age !== "all" || query || onlyFavorites) && <button onClick={resetFilters}>{t("Xóa bộ lọc", "Clear filters")} <X size={13} /></button>}</div>
      <div className="bebe-product-grid">{filtered.slice(0, limit).map(product => <article className="bebe-product" key={product.id}><div className="bebe-product-cover"><button className="bebe-product-open" onClick={() => setSelected(product)} aria-label={`${t("Xem", "View")} ${product.name[locale]}`}><ProductArt id={product.id} /></button>{product.badge && <span className={`bebe-product-badge ${product.badge}`}>{product.badge === "new" ? t("Mới xinh", "Just arrived") : t("Bebé yêu thích", "Bebé favourite")}</span>}<button className="bebe-heart" aria-pressed={favorites.includes(product.id)} aria-label={`${t("Yêu thích", "Save")} ${product.name[locale]}`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button><button className="bebe-quick-add" onClick={() => setSelected(product)} aria-label={`${t("Chọn size", "Choose size")} ${product.name[locale]}`}><Plus size={16} />{t("Chọn size", "Choose size")}</button></div><div className="bebe-product-meta"><span>{product.material[locale]}</span><h3><button onClick={() => setSelected(product)}>{product.name[locale]}</button></h3><div><b>{money(product.price)}</b><span className="bebe-color" title={product.colorName[locale]} style={{ background: product.color }} /></div><small>{product.sizeType === "baby" ? t("0–24 tháng", "0–24 months") : product.sizeType === "clothes" ? t("2–8 tuổi", "2–8 years") : product.sizes.join(" · ")}</small></div></article>)}</div>
      {filtered.length === 0 && <div className="bebe-empty"><Search size={34} /><h3>{t("Chưa tìm thấy món phù hợp.", "No little matches just yet.")}</h3><p>{t("Thử một từ khóa khác hoặc bỏ bớt bộ lọc nhé.", "Try another search or clear a few filters.")}</p><button className="bebe-cta" onClick={resetFilters}>{t("Xem tất cả sản phẩm", "See all pieces")}<ArrowRight size={17} /></button></div>}
      {filtered.length > limit && <div className="bebe-show-more"><button className="bebe-outline" onClick={() => setLimit(value => value + 8)}>{t(`Xem thêm ${filtered.length - limit} món xinh`, `Discover ${filtered.length - limit} more pieces`)} <Plus size={17} /></button></div>}
    </section>
    <BebeSections browseCategory={browseCategory} browseCollection={browseCollection} openGuide={() => setGuideOpen(true)} />
    <BebeDialogs selected={selected} closeProduct={() => setSelected(null)} addItem={addItem} cart={cart} cartOpen={cartOpen} closeCart={() => setCartOpen(false)} changeQuantity={changeQuantity} guideOpen={guideOpen} closeGuide={() => setGuideOpen(false)} browse={() => { setCartOpen(false); browseCategory("all"); }} />
  </main>;
}
