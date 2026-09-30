"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Clock3, Coffee, Flame, Compass, Leaf, MapPin, Menu, Minus, Phone, Plus, ShoppingBag, Sun, Wifi } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { TemplateItem } from "@/lib/templates";
import { useLocale } from "./locale-provider";
import { FoodVisitDetails } from "./food-visit-details";
import "./food-demo.css";

type LocalizedText = Record<Locale, string>;
type Dish = { id: string; name: LocalizedText; group: string; detail: LocalizedText; price: number; note?: LocalizedText };

const text = (en: string, vi: string): LocalizedText => ({ en, vi });
const translate = (locale: Locale, en: string, vi: string) => locale === "en" ? en : vi;

const groupLabels: Record<string, LocalizedText> = {
  starters: text("Starters", "Khai vị"),
  mains: text("Mains", "Món chính"),
  desserts: text("Desserts", "Tráng miệng"),
  savory: text("Savory dishes", "Món mặn"),
  vegetables: text("Vegetables & tofu", "Rau & đậu"),
  soups: text("Soups", "Canh"),
  coffee: text("Coffee", "Cà phê"),
  tea: text("Tea", "Trà"),
  pastries: text("Pastries", "Bánh"),
};

const menus: Record<string, Dish[]> = {
  "lua-viet-restaurant": [
    { id: "pomelo-shrimp-salad", name: text("Grilled shrimp pomelo salad", "Gỏi bưởi tôm nướng"), group: "starters", detail: text("Nam Roi pomelo, charcoal-grilled shrimp, herbs, and first-press fish sauce", "Bưởi năm roi, tôm nướng than, rau thơm và nước mắm cốt"), price: 145000, note: text("Chef's pick", "Đầu bếp gợi ý") },
    { id: "green-season-rolls", name: text("Green season rolls", "Cuốn mùa xanh"), group: "starters", detail: text("Seasonal greens, grilled mushrooms, and toasted sesame sauce", "Rau theo mùa, nấm nướng, sốt mè rang"), price: 95000 },
    { id: "mac-khen-beef", name: text("Mắc khén grilled beef", "Bò nướng mắc khén"), group: "mains", detail: text("Beef tenderloin, mắc khén pepper, grilled vegetables, and green pepper sauce", "Thăn bò, mắc khén, rau củ nướng và sốt tiêu xanh"), price: 285000, note: text("Best seller", "Best seller") },
    { id: "lotus-leaf-fish", name: text("Lotus-leaf steamed fish", "Cá hấp lá sen"), group: "mains", detail: text("Fresh fish, lotus seeds, shiitake mushrooms, and a light broth", "Cá tươi, hạt sen, nấm hương, nước dùng thanh"), price: 225000 },
    { id: "lotus-longan-sweet-soup", name: text("Lotus seed & longan sweet soup", "Chè sen nhãn"), group: "desserts", detail: text("Huế lotus seeds, longan, and rock sugar", "Hạt sen Huế, nhãn lồng, đường phèn"), price: 65000 },
    { id: "grilled-coconut-ice-cream", name: text("Grilled coconut ice cream", "Kem dừa nướng"), group: "desserts", detail: text("Coconut ice cream, toasted coconut, and roasted peanuts", "Kem dừa, dừa sấy, đậu phộng rang"), price: 75000 },
  ],
  "com-nha-eatery": [
    { id: "caramelized-pork-eggs", name: text("Caramelized pork & eggs", "Thịt kho trứng"), group: "savory", detail: text("Tender braised pork belly, chicken eggs, and coconut water", "Thịt ba rọi kho mềm cùng trứng gà, nước dừa"), price: 55000, note: text("Home favorite", "Món nhà") },
    { id: "ginger-roasted-chicken", name: text("Ginger-roasted chicken", "Gà rang gừng"), group: "savory", detail: text("Free-range chicken, fresh ginger, and fragrant scallions", "Gà ta, gừng tươi, hành lá thơm nức"), price: 65000 },
    { id: "tomato-braised-tofu", name: text("Tomato-braised tofu", "Đậu hũ sốt cà"), group: "vegetables", detail: text("Golden-fried tofu with a sweet-and-tangy tomato sauce", "Đậu chiên vàng, sốt cà chua chua ngọt"), price: 35000 },
    { id: "boiled-greens-fish-sauce", name: text("Boiled greens with caramelized fish sauce", "Rau luộc kho quẹt"), group: "vegetables", detail: text("Seasonal greens with rich caramelized fish sauce", "Rau theo mùa và kho quẹt đậm đà"), price: 45000, note: text("Comfort food", "Ăn là nhớ") },
    { id: "sour-fish-soup", name: text("Sour fish soup", "Canh chua cá"), group: "soups", detail: text("Fish, pineapple, tomatoes, and rice paddy herb", "Cá, dứa, cà chua, rau ngổ"), price: 55000 },
    { id: "winter-melon-soup", name: text("Winter melon soup with minced pork", "Canh bí thịt bằm"), group: "soups", detail: text("Winter melon, minced pork, scallions, and cilantro", "Bí xanh, thịt bằm, hành ngò"), price: 35000 },
  ],
  "moc-coffee": [
    { id: "vietnamese-iced-milk-coffee", name: text("Vietnamese iced milk coffee", "Cà phê sữa đá"), group: "coffee", detail: text("Bold phin coffee with just enough condensed milk", "Cà phê phin đậm vị, sữa đặc vừa đủ"), price: 35000, note: text("Everyday", "Mỗi ngày") },
    { id: "moc-latte", name: text("DripDrop latte", "DripDrop latte"), group: "coffee", detail: text("Espresso, silky fresh milk, and a touch of molasses", "Espresso, sữa tươi đánh mịn và một nét mật mía"), price: 55000 },
    { id: "peach-orange-lemongrass-tea", name: text("Peach, orange & lemongrass tea", "Trà đào cam sả"), group: "tea", detail: text("Black tea, peach, fresh orange, and fragrant lemongrass", "Trà đen, đào, cam tươi và sả thơm"), price: 45000 },
    { id: "lotus-tea", name: text("Lotus tea", "Trà sen"), group: "tea", detail: text("Lotus-scented tea, gentle and clear", "Trà ướp sen, thanh và dịu"), price: 45000 },
    { id: "butter-croissant", name: text("Butter croissant", "Croissant bơ"), group: "pastries", detail: text("Flaky pastry, fragrant butter, baked fresh daily", "Bánh ngàn lớp, bơ thơm, nướng trong ngày"), price: 39000 },
    { id: "banana-bread", name: text("Banana bread", "Bánh chuối"), group: "pastries", detail: text("Ripe banana, cinnamon, and walnuts", "Chuối chín, quế, hạt óc chó"), price: 35000 },
  ],
};

const money = (value: number, locale: Locale) => new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

function FoodLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}<ArrowUpRight size={16} /></a>;
}

function ReservationForm({ compact = false, label = text("Reserve a table", "Đặt bàn") }: { compact?: boolean; label?: LocalizedText }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <form className={"food-reservation-form " + (compact ? "is-compact" : "")} onSubmit={submit} onChange={() => setSent(false)}>
    <label>{t("Full name", "Họ và tên")}<input name="name" required autoComplete="name" placeholder={t("Your name", "Tên của bạn")} /></label>
    <label>{t("Phone number", "Số điện thoại")}<input name="phone" type="tel" required autoComplete="tel" pattern="[+0-9 ()-]{9,16}" placeholder={t("Contact number", "Số liên hệ")} /></label>
    <div className="food-reservation-fields"><label>{t("Date", "Ngày")}<input name="date" type="date" required /></label><label>{t("Time", "Giờ")}<input name="time" type="time" required /></label><label>{t("Guests", "Số khách")}<select name="guests" defaultValue="2">{[1, 2, 3, 4, 5, 6, 8, 10].map(item => <option key={item}>{item} {t("guests", "khách")}</option>)}</select></label></div>
    <button type="submit">{label[locale]} <ArrowRight size={17} /></button>
    <p role="status">{sent ? t("Your sample request has been received — we will be in touch to confirm it.", "Đã ghi nhận yêu cầu mẫu — chúng tôi sẽ liên hệ xác nhận.") : t("Demo experience — no information has been sent.", "Trải nghiệm demo — chưa có thông tin nào được gửi đi.")}</p>
  </form>;
}

function MenuPicker({ slug, variant = "default" }: { slug: string; variant?: "default" | "cards" | "list" }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  const dishes = menus[slug];
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const groups = ["all", ...Array.from(new Set(dishes.map(item => item.group)))];
  const visible = dishes.filter(item => filter === "all" || item.group === filter);
  const total = useMemo(() => dishes.filter(item => selected.includes(item.id)).reduce((sum, item) => sum + item.price, 0), [dishes, selected]);
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return <>
    <div className="food-menu-tabs" role="group" aria-label={t("Filter menu", "Lọc thực đơn")}>{groups.map(group => <button key={group} aria-pressed={filter === group} onClick={() => setFilter(group)}>{group === "all" ? t("All", "Tất cả") : groupLabels[group][locale]}</button>)}</div>
    <div className={"food-menu-picker food-menu-" + variant}>{visible.map((dish, index) => <article key={dish.id} className={selected.includes(dish.id) ? "is-picked" : ""}>
      <span className="food-dish-index">{String(index + 1).padStart(2, "0")}</span><div><div className="food-dish-title"><h3>{dish.name[locale]}</h3>{dish.note && <small>{dish.note[locale]}</small>}</div><p>{dish.detail[locale]}</p></div><strong>{money(dish.price, locale)}</strong>
      <button type="button" aria-label={(selected.includes(dish.id) ? t("Remove", "Bỏ") : t("Add", "Chọn")) + " " + dish.name[locale]} aria-pressed={selected.includes(dish.id)} onClick={() => toggle(dish.id)}>{selected.includes(dish.id) ? <Minus size={17} /> : <Plus size={17} />}</button>
    </article>)}</div>
    <div className="food-cart" aria-live="polite">{selected.length ? <><ShoppingBag size={17} /><span>{selected.length} {t("dishes selected", "món đã chọn")}</span><strong>{money(total, locale)}</strong><button type="button" onClick={() => setSelected([])}>{t("Clear selection", "Xóa chọn")}</button></> : <><ShoppingBag size={17} /><span>{t("Choose dishes to see your estimated total", "Chọn món để xem tổng tạm tính")}</span></>}</div>
  </>;
}

function Footer({ name, light = false }: { name: string; light?: boolean }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  return <footer className={"food-page-footer " + (light ? "is-light" : "")}><div><a href="#top" className="food-footer-brand">{name}</a><p>{t("Food made with care · DevDes F&B sample interface", "Ẩm thực được làm với sự tử tế · Giao diện mẫu F&B DevDes")}</p></div><div><span>{t("Explore", "Khám phá")}</span><a href="#food-menu">{t("Menu", "Thực đơn")}</a><a href="#food-story">{t("Story", "Câu chuyện")}</a><a href="#food-booking">{t("Contact", "Liên hệ")}</a></div><div><span>{t("Connect", "Kết nối")}</span><a href="tel:02873001234"><Phone size={14} /> 028 7300 1234</a><a href="#food-faq"><Compass size={14} /> {t("Before your visit", "Trước khi ghé quán")}</a></div><small>© 2026 {name}. All rights reserved.</small></footer>;
}

function LuaViet({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  const [open, setOpen] = useState(false);
  return <div className="food-page lua-viet" id="top">
    <header className="lua-header"><a href="#top" className="lua-monogram" aria-label="Lửa Việt">LV</a><nav id="lua-primary-nav" className={open ? "is-open" : ""} aria-label={t("Primary navigation", "Điều hướng")}><a href="#food-menu" onClick={() => setOpen(false)}>{t("Menu", "Thực đơn")}</a><a href="#food-story" onClick={() => setOpen(false)}>{t("Philosophy", "Triết lý")}</a><a href="#food-booking" onClick={() => setOpen(false)}>{t("Reservations", "Đặt bàn")}</a></nav><a href="#food-booking" className="lua-book">{t("Reserve a table", "Đặt bàn")} <ArrowUpRight size={15} /></a><button type="button" className="lua-menu-toggle" aria-label={open ? t("Close menu", "Đóng menu") : t("Open menu", "Mở menu")} aria-expanded={open} aria-controls="lua-primary-nav" onClick={() => setOpen(!open)}><Menu size={21} /></button></header>
    <section className="lua-hero"><div className="lua-hero-media"><span>EST. 2021 · SAIGON</span><i>LV</i></div><div className="lua-hero-copy"><p className="lua-eyebrow"><Flame size={14} /> {t("CONTEMPORARY VIETNAMESE KITCHEN", "ẨM THỰC VIỆT ĐƯƠNG ĐẠI")}</p><h1>{template.tagline}</h1><p>{t("Travel through the flavors of Vietnam with seasonal ingredients, charcoal fire, and an unhurried way of telling stories.", "Đi qua những vùng vị Việt Nam bằng nguyên liệu theo mùa, lửa than và một cách kể chuyện thật chậm.")}</p><FoodLink href="#food-menu" className="lua-text-link">{t("View this season's menu", "Xem thực đơn mùa này")}</FoodLink><div className="lua-hero-details"><span>11:30 — 14:00 · 17:30 — 22:30</span><span>{t("District 1 · Ho Chi Minh City", "Quận 1 · TP. Hồ Chí Minh")}</span></div></div></section>
    <section className="lua-intro" id="food-story"><span>{t("01 / THE SPIRIT OF FIRE", "01 / TINH THẦN CỦA LỬA")}</span><h2>{t("Let ingredients speak for themselves.", "Để nguyên liệu nói bằng chính mình.")}</h2><p>{t("We begin with familiar things: first-press fish sauce, herbs from the garden, fish fresh from the morning market. Contemporary technique simply brings a beautiful memory into sharper focus.", "Chúng tôi bắt đầu từ những điều gần gũi: mẻ mắm cốt, lá thơm trong vườn, con cá tươi mỗi sớm. Kỹ thuật đương đại chỉ để làm rõ hơn phần ký ức vốn đã đẹp.")}</p><div className="lua-values"><article><b>03</b><span>{t("menu seasons each year", "mùa thực đơn mỗi năm")}</span></article><article><b>12</b><span>{t("partner farms", "đối tác nông trại đồng hành")}</span></article><article><b>01</b><span>{t("open-kitchen counter every evening", "bàn bếp mở mỗi tối")}</span></article></div></section>
    <section className="lua-menu" id="food-menu"><div className="lua-section-heading"><span>02 / DEGUSTATION & À LA CARTE</span><h2>{t("Flavors in season.", "Hương vị đương mùa.")}</h2><p>{t("Each dish is a small slice of Vietnam today.", "Mỗi món là một lát cắt nhỏ của Việt Nam hôm nay.")}</p></div><MenuPicker slug={template.slug} variant="list" /></section>
    <section className="lua-chef"><div><span>{t("THE KEEPER OF THE FIRE", "NGƯỜI GIỮ LỬA")}</span><blockquote>{t("“Cooking Vietnamese food is not copying memory. It is how memory moves forward.”", "“Nấu món Việt không phải là sao chép ký ức. Đó là cách để ký ức bước tiếp.”")}</blockquote><p>{t("— Chef Minh An", "— Bếp trưởng Minh An")}</p></div><div className="lua-chef-media"><span>{t("FROM FARM TO FLAME", "TỪ NÔNG TRẠI ĐẾN BẾP LỬA")}</span></div></section>
    <section className="lua-experience"><div className="lua-experience-image"><span>{t("AN EVENING AT LỬA VIỆT", "MỘT BUỔI TỐI TẠI LỬA VIỆT")}</span></div><div className="lua-experience-copy"><span>{t("THE EXPERIENCE", "TRẢI NGHIỆM")}</span><h2>{t("Slow down a little. The flavors will stay a little longer.", "Chậm lại một chút, vị sẽ ở lại lâu hơn.")}</h2><p>{t("From the open kitchen counter to intimate spaces for meaningful gatherings, every detail is arranged so that the conversation is what lingers last.", "Từ bàn bếp mở đến không gian riêng cho những cuộc gặp thân tình, mỗi chi tiết đều được sắp đặt để cuộc trò chuyện là điều ở lại sau cùng.")}</p><div className="lua-experience-list"><b>Chef&apos;s table <small>{t("06 seats · reserve 48 hours ahead", "06 chỗ ngồi · đặt trước 48h")}</small></b><b>Private dining <small>{t("12 — 24 guests · bespoke menu", "12 — 24 khách · thực đơn riêng")}</small></b><b>Wine pairing <small>{t("Wine selected for each dish", "Rượu vang chọn theo từng món")}</small></b></div><a href="#food-booking">{t("Plan a private dinner", "Tổ chức một bữa tiệc riêng")} <ArrowRight size={16} /></a></div></section>
    <section className="lua-booking" id="food-booking"><div><span>{t("03 / RESERVATIONS", "03 / ĐẶT BÀN")}</span><h2>{t("A seat for a memorable occasion.", "Một chỗ ngồi cho cuộc hẹn đáng nhớ.")}</h2><p>{t("Please reserve ahead so we can prepare the most thoughtful experience for you.", "Vui lòng đặt bàn trước để chúng tôi chuẩn bị trải nghiệm chu đáo nhất cho bạn.")}</p><div className="lua-booking-contact"><MapPin size={17} /><span>{t("18 Nguyễn Hữu Cảnh, District 1 · Ho Chi Minh City", "18 Nguyễn Hữu Cảnh, Quận 1 · TP. Hồ Chí Minh")}</span></div></div><ReservationForm label={text("Send reservation request", "Gửi yêu cầu đặt bàn")} /></section><FoodVisitDetails coffee={template.slug === "moc-coffee"} /><Footer name={template.name} />
  </div>;
}

function ComNha({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  const [open, setOpen] = useState(false);
  return <div className="food-page com-nha" id="top">
    <header className="com-header"><a href="#top" className="com-brand"><span>TASTY</span><b>HEALTHY</b></a><nav className={open ? "is-open" : ""}><a href="#food-menu" onClick={() => setOpen(false)}>{t("Today's dishes", "Món hôm nay")}</a><a href="#food-story" onClick={() => setOpen(false)}>{t("Home stories", "Chuyện nhà")}</a><a href="#food-booking" onClick={() => setOpen(false)}>{t("Order a meal", "Đặt cơm")}</a></nav><a className="com-call" href="tel:02873001234"><Phone size={16} /> {t("Call to order", "Gọi đặt cơm")}</a><button className="com-menu-toggle" aria-label={open ? t("Close menu", "Đóng menu") : t("Open menu", "Mở menu")} aria-expanded={open} onClick={() => setOpen(!open)}><Menu size={21} /></button></header>
    <section className="com-hero"><div className="com-hero-copy"><p className="com-sticker">{t("Cooked every day as if for family", "Nấu mỗi ngày như cho người thân")}</p><span>{t("KITCHEN OPEN 10:30 — 21:00", "BẾP MỞ CỬA 10:30 — 21:00")}</span><h1>{template.tagline}</h1><p>{t("A warm plate of rice, familiar dishes seasoned just right, and a little corner that feels like coming home.", "Đĩa cơm nóng, món quen vừa vị và một góc nhỏ để bạn thấy mình được về nhà.")}</p><div><FoodLink href="#food-menu" className="com-button">{t("Choose lunch", "Chọn món ăn trưa")}</FoodLink><a href="#food-booking" className="com-underlink">{t("Save a table for the family", "Giữ bàn cho cả nhà")} <ChevronRight size={15} /></a></div></div><div className="com-hero-art"><strong>{t("WHAT'S FOR LUNCH?", "HÔM NAY ĂN GÌ?")}</strong><span>{t("WHOLESOME · BALANCED · HEARTY", "NGON LÀNH · VỪA VỊ · ĐỦ ĐẦY")}</span></div></section>
    <div className="com-ticker"><span>{t("✳ HOT RICE EVERY DAY", "✳ CƠM NÓNG MỖI NGÀY")}</span><span>{t("✳ SEASONAL FRESH GREENS", "✳ RAU TƯƠI THEO MÙA")}</span><span>{t("✳ COOKED WITH ALL OUR CARE", "✳ NẤU BẰNG TẤT CẢ SỰ TỬ TẾ")}</span></div>
    <section className="com-highlights"><article><span>01</span><b>{t("A complete home-style meal", "Đủ món như bữa nhà")}</b><p>{t("A savory dish, vegetables, soup, and a little dessert.", "Mặn, rau, canh và một chút tráng miệng.")}</p></article><article><span>02</span><b>{t("Cooked when you order", "Nấu khi bạn gọi")}</b><p>{t("Served hot, never left out all day.", "Đồ ăn nóng hổi, không để sẵn cả ngày.")}</p></article><article><span>03</span><b>{t("Lovely even on your own", "Đi một mình cũng vui")}</b><p>{t("A just-right portion at a sweet little table.", "Phần cơm vừa vặn, bàn nhỏ thật xinh.")}</p></article></section>
    <section className="com-menu-section" id="food-menu"><div className="com-section-title"><span>{t("TODAY'S MENU", "THỰC ĐƠN HÔM NAY")}</span><h2>{t("Every dish makes you want one more.", "Món nào cũng muốn gọi thêm.")}</h2><p>{t("The menu changes daily so the kitchen always has something new.", "Thực đơn thay đổi theo ngày để căn bếp luôn có điều mới mẻ.")}</p></div><MenuPicker slug={template.slug} variant="cards" /></section>
    <section className="com-story" id="food-story"><div className="com-story-art"><span>{t("LITTLE THINGS", "NHỮNG ĐIỀU NHỎ XÍU")}</span><i>♥</i></div><div><span>{t("KITCHEN STORIES", "CHUYỆN BẾP")}</span><h2>{t("Good rice tastes better together.", "Cơm ngon là khi có nhau.")}</h2><p>{t("Nothing elaborate: just a steaming pot of soup, bright boiled greens, and meltingly tender braised pork. Those little things are what make us want to come back.", "Không cầu kỳ, chỉ có nồi canh nghi ngút khói, rau luộc xanh và miếng thịt kho mềm. Những điều nhỏ xíu ấy lại là điều khiến ta muốn quay về.")}</p><a href="#food-booking">{t("Come by our place", "Ghé nhà mình nhé")} <ArrowRight size={17} /></a></div></section>
    <section className="com-combo"><div><span>{t("COMBO OF THE WEEK", "COMBO CỦA TUẦN")}</span><h2>{t("A generous home meal for two.", "Một mâm cơm đủ đầy cho 2.")}</h2><p>{t("Caramelized pork & eggs · Boiled greens with caramelized fish sauce · Winter melon soup with minced pork · House kumquat tea.", "Thịt kho trứng · Rau luộc kho quẹt · Canh bí thịt bằm · Trà tắc nhà làm.")}</p><strong>{money(159000, locale)} <small>{t("/ 2 people", "/ 02 người")}</small></strong><a href="#food-booking">{t("Order the combo", "Đặt combo ngay")} <ArrowRight size={16} /></a></div><div className="com-combo-art"><b>{t("LET'S EAT AT HOME!", "NHÀ MÌNH ĂN CƠM!")}</b><span>{t("OFFER ENDS SUNDAY", "ƯU ĐÃI ĐẾN HẾT CHỦ NHẬT")}</span></div></section>
    <section className="com-love"><span>{t("WHAT DO OUR REGULARS SAY?", "NGƯỜI NHÀ NÓI GÌ?")}</span><div><blockquote>{t("“I brought my mum here, and she said the sour soup tasted exactly like home. Now the whole family comes by every week.”", "“Mình dẫn mẹ đến đây và mẹ bảo vị canh chua giống hệt ở nhà. Thế là tuần nào cả nhà cũng ghé.”")}</blockquote><article><b>4.9 / 5</b><span>★★★★★</span><small>{t("from 1,200+ restaurant visits", "từ 1.200+ lượt ghé quán")}</small></article></div><div className="com-review-names"><span>{t("THU HÀ · REGULAR", "THU HÀ · KHÁCH QUEN")}</span><span>{t("MINH & FAMILY", "MINH & GIA ĐÌNH")}</span><span>{t("ANH TÚ · DISTRICT 1", "ANH TÚ · QUẬN 1")}</span></div></section>
    <section className="com-booking" id="food-booking"><div className="com-booking-heading"><span>{t("SAVE A LITTLE TABLE", "GIỮ MỘT BÀN NHỎ")}</span><h2>{t("It is happier when you are here.", "Có mặt là vui rồi.")}</h2><p><Clock3 size={17} /> {t("Open daily · 10:30 — 21:00", "Mở cửa mỗi ngày · 10:30 — 21:00")}</p><p><MapPin size={17} /> {t("38 Trần Hưng Đạo, District 1, Ho Chi Minh City", "38 Trần Hưng Đạo, Quận 1, TP.HCM")}</p></div><ReservationForm compact label={text("Save us a table", "Giữ bàn giúp mình")} /></section><FoodVisitDetails coffee={template.slug === "moc-coffee"} /><Footer name={template.name} light />
  </div>;
}

function MocCoffee({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const t = (en: string, vi: string) => translate(locale, en, vi);
  const [open, setOpen] = useState(false);
  return <div className="food-page moc-coffee" id="top">
    <header className="moc-header"><a href="#top" className="moc-brand">DripDrop<span>Speciality Coffee</span></a><nav id="moc-primary-nav" className={open ? "is-open" : ""} aria-label={t("Primary navigation", "Điều hướng")}><a href="#food-menu" onClick={() => setOpen(false)}>Menu</a><a href="#food-story" onClick={() => setOpen(false)}>{t("DripDrop journal", "Nhật ký DripDrop")}</a><a href="#food-booking" onClick={() => setOpen(false)}>{t("Visit DripDrop", "Ghé DripDrop")}</a></nav><a href="#food-booking" className="moc-reserve">{t("Choose a corner", "Chọn một góc")} <ArrowUpRight size={15} /></a><button type="button" className="moc-menu-toggle" aria-label={open ? t("Close menu", "Đóng menu") : t("Open menu", "Mở menu")} aria-expanded={open} aria-controls="moc-primary-nav" onClick={() => setOpen(!open)}><Menu size={21} /></button></header>
    <section className="moc-hero"><div className="moc-hero-image"><span>BREWED WITH CARE</span><small>01 / 03</small></div><div className="moc-hero-copy"><p className="moc-kicker"><Sun size={14} /> SLOW MORNINGS · QUIET AFTERNOONS</p><h1>{template.tagline}</h1><p>{t("A place to open a half-finished book, sip coffee, and let the day move a little more slowly.", "Một nơi để bạn mở trang sách còn dang dở, nhấp một ngụm cà phê và để ngày trôi chậm hơn một chút.")}</p><FoodLink href="#food-menu" className="moc-link">{t("Choose today's cup", "Chọn ly hôm nay")}</FoodLink><div className="moc-opening"><span>{t("EVERY DAY", "HẰNG NGÀY")} · <b>07:00 — 22:00</b></span><span>{t("SPECIAL", "ĐẶC BIỆT")} · <b>{t("Roasted in house", "Hạt rang tại chỗ")}</b></span></div></div></section>
    <section className="moc-notes"><article><Coffee /><div><span>{t("COFFEE BEANS", "HẠT CÀ PHÊ")}</span><b>{t("Small-batch roasted with a preference for natural sweetness.", "Rang theo mẻ nhỏ, ưu tiên vị ngọt tự nhiên.")}</b></div></article><article><Leaf /><div><span>{t("THE SPACE", "KHÔNG GIAN")}</span><b>{t("Plenty of light, greenery, and quiet tables.", "Nhiều ánh sáng, cây xanh và những bàn ngồi yên.")}</b></div></article><article><Wifi /><div><span>{t("FOR A LONG DAY", "VÌ MỘT NGÀY DÀI")}</span><b>{t("Good Wi-Fi, enough power outlets, and a gentle playlist.", "Wi-Fi tốt, ổ cắm đủ và playlist thật nhẹ.")}</b></div></article></section>
    <section className="moc-menu-section" id="food-menu"><header><div><span>02 / OUR MENU</span><h2>{t("A cup you like, for the day you need.", "Một ly bạn thích, một ngày bạn cần.")}</h2></div><p>{t("Simple drinks, made with care.", "Những thức uống đơn giản, được pha thật kỹ.")}</p></header><MenuPicker slug={template.slug} variant="default" /></section>
    <section className="moc-journal" id="food-story"><div className="moc-journal-copy"><span>{t("DRIPDROP JOURNAL / 09.2026", "NHẬT KÝ DRIPDROP / 09.2026")}</span><h2>{t("We believe in breathing room.", "Chúng tôi tin vào những khoảng thở.")}</h2><p>{t("A coffee shop does not need to be loud to be memorable. Sometimes a table by the window and a cup made just right are enough.", "Một quán cà phê không cần phải thật ồn ào để trở nên đáng nhớ. Đôi khi, chỉ cần một chiếc bàn cạnh cửa sổ và ly cà phê được pha vừa ý.")}</p><a href="#food-booking">{t("Read more from DripDrop", "Đọc thêm câu chuyện DripDrop")} <ArrowRight size={17} /></a></div><div className="moc-journal-card"><small>{t("TODAY AT DRIPDROP", "HÔM NAY Ở DRIPDROP")}</small><b>{t("“Some days, the best thing you can do is stay seated.”", "“Có những ngày, điều tốt nhất bạn có thể làm là ngồi lại.”")}</b><span>{t("— A note by the window", "— Ghi chú bên cửa sổ")}</span></div></section>
    <section className="moc-sessions"><header><span>{t("THIS WEEK AT DRIPDROP", "Ở DRIPDROP TUẦN NÀY")}</span><h2>{t("Small, joyful gatherings.", "Những cuộc hẹn nhỏ và thật vui.")}</h2><a href="#food-booking">{t("See this month's schedule", "Xem lịch tháng này")} <ArrowRight size={16} /></a></header><div><article><small>{t("WEDNESDAY · 18:30", "THỨ TƯ · 18:30")}</small><b>Slow brew tasting</b><p>{t("Try three brewing methods with this week's roasted beans.", "Thử ba cách pha cùng hạt rang tuần này.")}</p><span>{t("12 seats · free", "12 chỗ · miễn phí")}</span></article><article><small>{t("SATURDAY · 09:00", "THỨ BẢY · 09:00")}</small><b>Morning sketch club</b><p>{t("Bring a notebook; we'll make the coffee.", "Mang theo sổ, tụi mình pha cà phê.")}</p><span>{t("Registration required", "Đăng ký trước")}</span></article><article><small>{t("SUNDAY · 16:00", "CHỦ NHẬT · 16:00")}</small><b>Vinyl afternoon</b><p>{t("Listen to music, read, and sip a cup of tea.", "Nghe nhạc, đọc sách và nhấp một ly trà.")}</p><span>{t("Walk-ins welcome", "Vào cửa tự do")}</span></article></div></section>
    <section className="moc-social"><div className="moc-social-quote"><span>@DRIPDROP</span><b>{t("Small scenes from DripDrop.", "Những lát cắt nhỏ ở DripDrop.")}</b><a href="#food-faq"><Compass size={16} /> {t("Plan a visit", "Hẹn một buổi ghé DripDrop")}</a></div><div className="moc-social-grid"><i>01</i><i>02</i><i>03</i><i>04</i></div></section>
    <section className="moc-visit" id="food-booking"><div className="moc-visit-image"><span>{t("COME AS YOU ARE", "CỨ ĐẾN NHƯ BẠN VỐN THẾ")}</span></div><div className="moc-visit-copy"><span>{t("03 / VISIT DRIPDROP", "03 / GHÉ DRIPDROP")}</span><h2>{t("Keep a corner just for you.", "Giữ một góc cho riêng bạn.")}</h2><p><MapPin size={17} /> {t("12 Lê Văn Miến, Thảo Điền, Ho Chi Minh City", "12 Lê Văn Miến, Thảo Điền, TP.HCM")}</p><p><Clock3 size={17} /> {t("Every day · 07:00 — 22:00", "Mỗi ngày · 07:00 — 22:00")}</p><ReservationForm compact label={text("Send a reservation", "Gửi lời hẹn")} /></div></section><FoodVisitDetails coffee={template.slug === "moc-coffee"} /><Footer name={template.name} />
  </div>;
}

export function FoodDemo({ template }: { template: TemplateItem }) {
  if (template.slug === "lua-viet-restaurant") return <LuaViet template={template} />;
  if (template.slug === "com-nha-eatery") return <ComNha template={template} />;
  return <MocCoffee template={template} />;
}
