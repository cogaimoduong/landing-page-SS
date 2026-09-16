"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Clock3, Coffee, Flame, Instagram, Leaf, MapPin, Menu, Minus, Phone, Plus, ShoppingBag, Sun, Wifi } from "lucide-react";
import type { TemplateItem } from "@/lib/templates";
import "./food-demo.css";

type Dish = { name: string; group: string; detail: string; price: number; note?: string };

const menus: Record<string, Dish[]> = {
  "lua-viet-restaurant": [
    { name: "Gỏi bưởi tôm nướng", group: "Khai vị", detail: "Bưởi năm roi, tôm nướng than, rau thơm và nước mắm cốt", price: 145000, note: "Đầu bếp gợi ý" },
    { name: "Cuốn mùa xanh", group: "Khai vị", detail: "Rau theo mùa, nấm nướng, sốt mè rang", price: 95000 },
    { name: "Bò nướng mắc khén", group: "Món chính", detail: "Thăn bò, mắc khén, rau củ nướng và sốt tiêu xanh", price: 285000, note: "Best seller" },
    { name: "Cá hấp lá sen", group: "Món chính", detail: "Cá tươi, hạt sen, nấm hương, nước dùng thanh", price: 225000 },
    { name: "Chè sen nhãn", group: "Tráng miệng", detail: "Hạt sen Huế, nhãn lồng, đường phèn", price: 65000 },
    { name: "Kem dừa nướng", group: "Tráng miệng", detail: "Kem dừa, dừa sấy, đậu phộng rang", price: 75000 },
  ],
  "com-nha-eatery": [
    { name: "Thịt kho trứng", group: "Món mặn", detail: "Thịt ba rọi kho mềm cùng trứng gà, nước dừa", price: 55000, note: "Món nhà" },
    { name: "Gà rang gừng", group: "Món mặn", detail: "Gà ta, gừng tươi, hành lá thơm nức", price: 65000 },
    { name: "Đậu hũ sốt cà", group: "Rau & đậu", detail: "Đậu chiên vàng, sốt cà chua chua ngọt", price: 35000 },
    { name: "Rau luộc kho quẹt", group: "Rau & đậu", detail: "Rau theo mùa và kho quẹt đậm đà", price: 45000, note: "Ăn là nhớ" },
    { name: "Canh chua cá", group: "Canh", detail: "Cá, dứa, cà chua, rau ngổ", price: 55000 },
    { name: "Canh bí thịt bằm", group: "Canh", detail: "Bí xanh, thịt bằm, hành ngò", price: 35000 },
  ],
  "moc-coffee": [
    { name: "Cà phê sữa đá", group: "Cà phê", detail: "Cà phê phin đậm vị, sữa đặc vừa đủ", price: 35000, note: "Mỗi ngày" },
    { name: "Mộc latte", group: "Cà phê", detail: "Espresso, sữa tươi đánh mịn và một nét mật mía", price: 55000 },
    { name: "Trà đào cam sả", group: "Trà", detail: "Trà đen, đào, cam tươi và sả thơm", price: 45000 },
    { name: "Trà sen", group: "Trà", detail: "Trà ướp sen, thanh và dịu", price: 45000 },
    { name: "Croissant bơ", group: "Bánh", detail: "Bánh ngàn lớp, bơ thơm, nướng trong ngày", price: 39000 },
    { name: "Bánh chuối", group: "Bánh", detail: "Chuối chín, quế, hạt óc chó", price: 35000 },
  ],
};

const money = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

function FoodLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}<ArrowUpRight size={16} /></a>;
}

function ReservationForm({ compact = false, label = "Đặt bàn" }: { compact?: boolean; label?: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <form className={`food-reservation-form ${compact ? "is-compact" : ""}`} onSubmit={submit} onChange={() => setSent(false)}>
    <label>Họ và tên<input name="name" required autoComplete="name" placeholder="Tên của bạn" /></label>
    <label>Số điện thoại<input name="phone" type="tel" required autoComplete="tel" pattern="[+0-9 ()-]{9,16}" placeholder="Số liên hệ" /></label>
    <div className="food-reservation-fields"><label>Ngày<input name="date" type="date" required /></label><label>Giờ<input name="time" type="time" required /></label><label>Số khách<select name="guests" defaultValue="2">{[1, 2, 3, 4, 5, 6, 8, 10].map(item => <option key={item}>{item} khách</option>)}</select></label></div>
    <button type="submit">{label} <ArrowRight size={17} /></button>
    <p role="status">{sent ? "Đã ghi nhận yêu cầu mẫu — chúng tôi sẽ liên hệ xác nhận." : "Trải nghiệm demo — chưa có thông tin nào được gửi đi."}</p>
  </form>;
}

function MenuPicker({ slug, variant = "default" }: { slug: string; variant?: "default" | "cards" | "list" }) {
  const dishes = menus[slug];
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<string[]>([]);
  const groups = ["Tất cả", ...new Set(dishes.map(item => item.group))];
  const visible = dishes.filter(item => filter === "Tất cả" || item.group === filter);
  const total = useMemo(() => dishes.filter(item => selected.includes(item.name)).reduce((sum, item) => sum + item.price, 0), [dishes, selected]);
  const toggle = (name: string) => setSelected(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  return <>
    <div className="food-menu-tabs" role="group" aria-label="Lọc thực đơn">{groups.map(group => <button key={group} aria-pressed={filter === group} onClick={() => setFilter(group)}>{group}</button>)}</div>
    <div className={`food-menu-picker food-menu-${variant}`}>{visible.map((dish, index) => <article key={dish.name} className={selected.includes(dish.name) ? "is-picked" : ""}>
      <span className="food-dish-index">{String(index + 1).padStart(2, "0")}</span><div><div className="food-dish-title"><h3>{dish.name}</h3>{dish.note && <small>{dish.note}</small>}</div><p>{dish.detail}</p></div><strong>{money(dish.price)}</strong>
      <button type="button" aria-label={`${selected.includes(dish.name) ? "Bỏ" : "Chọn"} ${dish.name}`} aria-pressed={selected.includes(dish.name)} onClick={() => toggle(dish.name)}>{selected.includes(dish.name) ? <Minus size={17} /> : <Plus size={17} />}</button>
    </article>)}</div>
    <div className="food-cart" aria-live="polite">{selected.length ? <><ShoppingBag size={17} /><span>{selected.length} món đã chọn</span><strong>{money(total)}</strong><button type="button" onClick={() => setSelected([])}>Xóa chọn</button></> : <><ShoppingBag size={17} /><span>Chọn món để xem tổng tạm tính</span></>}</div>
  </>;
}

function Footer({ name, light = false }: { name: string; light?: boolean }) {
  return <footer className={`food-page-footer ${light ? "is-light" : ""}`}><div><a href="#top" className="food-footer-brand">{name}</a><p>Ẩm thực được làm với sự tử tế · Giao diện mẫu F&B DevDes</p></div><div><span>Khám phá</span><a href="#food-menu">Thực đơn</a><a href="#food-story">Câu chuyện</a><a href="#food-booking">Liên hệ</a></div><div><span>Kết nối</span><a href="tel:02873001234"><Phone size={14} /> 028 7300 1234</a><a href="#instagram"><Instagram size={14} /> @devdes.samples</a></div><small>© 2026 {name}. All rights reserved.</small></footer>;
}

function LuaViet({ template }: { template: TemplateItem }) {
  return <div className="food-page lua-viet" id="top">
    <header className="lua-header"><a href="#top" className="lua-monogram" aria-label="Lửa Việt">LV</a><nav aria-label="Điều hướng"><a href="#food-menu">Thực đơn</a><a href="#food-story">Triết lý</a><a href="#food-booking">Đặt bàn</a></nav><a href="#food-booking" className="lua-book">Đặt bàn <ArrowUpRight size={15} /></a></header>
    <section className="lua-hero"><div className="lua-hero-media"><span>EST. 2021 · SAIGON</span><i>LV</i></div><div className="lua-hero-copy"><p className="lua-eyebrow"><Flame size={14} /> CONTEMPORARY VIETNAMESE KITCHEN</p><h1>{template.tagline}</h1><p>Đi qua những vùng vị Việt Nam bằng nguyên liệu theo mùa, lửa than và một cách kể chuyện thật chậm.</p><FoodLink href="#food-menu" className="lua-text-link">Xem thực đơn mùa này</FoodLink><div className="lua-hero-details"><span>11:30 — 14:00 · 17:30 — 22:30</span><span>District 1 · Ho Chi Minh City</span></div></div></section>
    <section className="lua-intro" id="food-story"><span>01 / TINH THẦN CỦA LỬA</span><h2>Để nguyên liệu nói bằng chính mình.</h2><p>Chúng tôi bắt đầu từ những điều gần gũi: mẻ mắm cốt, lá thơm trong vườn, con cá tươi mỗi sớm. Kỹ thuật đương đại chỉ để làm rõ hơn phần ký ức vốn đã đẹp.</p><div className="lua-values"><article><b>03</b><span>mùa thực đơn mỗi năm</span></article><article><b>12</b><span>đối tác nông trại đồng hành</span></article><article><b>01</b><span>bàn bếp mở mỗi tối</span></article></div></section>
    <section className="lua-menu" id="food-menu"><div className="lua-section-heading"><span>02 / MENU DEGUSTATION & À LA CARTE</span><h2>Hương vị đương mùa.</h2><p>Mỗi món là một lát cắt nhỏ của Việt Nam hôm nay.</p></div><MenuPicker slug={template.slug} variant="list" /></section>
    <section className="lua-chef"><div><span>NGƯỜI GIỮ LỬA</span><blockquote>“Nấu món Việt không phải là sao chép ký ức. Đó là cách để ký ức bước tiếp.”</blockquote><p>— Bếp trưởng Minh An</p></div><div className="lua-chef-media"><span>FROM FARM TO FLAME</span></div></section>
    <section className="lua-experience"><div className="lua-experience-image"><span>MỘT BUỔI TỐI TẠI LỬA VIỆT</span></div><div className="lua-experience-copy"><span>TRẢI NGHIỆM</span><h2>Chậm lại một chút, vị sẽ ở lại lâu hơn.</h2><p>Từ bàn bếp mở đến không gian riêng cho những cuộc gặp thân tình, mỗi chi tiết đều được sắp đặt để cuộc trò chuyện là điều ở lại sau cùng.</p><div className="lua-experience-list"><b>Chef&apos;s table <small>06 chỗ ngồi · đặt trước 48h</small></b><b>Private dining <small>12 — 24 khách · thực đơn riêng</small></b><b>Wine pairing <small>Rượu vang chọn theo từng món</small></b></div><a href="#food-booking">Tổ chức một bữa tiệc riêng <ArrowRight size={16} /></a></div></section>
    <section className="lua-booking" id="food-booking"><div><span>03 / RESERVATION</span><h2>Một chỗ ngồi cho cuộc hẹn đáng nhớ.</h2><p>Vui lòng đặt bàn trước để chúng tôi chuẩn bị trải nghiệm chu đáo nhất cho bạn.</p><div className="lua-booking-contact"><MapPin size={17} /><span>18 Nguyễn Hữu Cảnh, Quận 1 · TP. Hồ Chí Minh</span></div></div><ReservationForm label="Gửi yêu cầu đặt bàn" /></section><Footer name={template.name} />
  </div>;
}

function ComNha({ template }: { template: TemplateItem }) {
  const [open, setOpen] = useState(false);
  return <div className="food-page com-nha" id="top">
    <header className="com-header"><a href="#top" className="com-brand"><span>CƠM</span><b>NHÀ</b></a><nav className={open ? "is-open" : ""}><a href="#food-menu" onClick={() => setOpen(false)}>Món hôm nay</a><a href="#food-story" onClick={() => setOpen(false)}>Chuyện nhà</a><a href="#food-booking" onClick={() => setOpen(false)}>Đặt cơm</a></nav><a className="com-call" href="tel:02873001234"><Phone size={16} /> Gọi đặt cơm</a><button className="com-menu-toggle" aria-label="Mở menu" aria-expanded={open} onClick={() => setOpen(!open)}><Menu size={21} /></button></header>
    <section className="com-hero"><div className="com-hero-copy"><p className="com-sticker">Nấu mỗi ngày như cho người thân</p><span>BẾP MỞ CỬA 10:30 — 21:00</span><h1>{template.tagline}</h1><p>Đĩa cơm nóng, món quen vừa vị và một góc nhỏ để bạn thấy mình được về nhà.</p><div><FoodLink href="#food-menu" className="com-button">Chọn món ăn trưa</FoodLink><a href="#food-booking" className="com-underlink">Giữ bàn cho cả nhà <ChevronRight size={15} /></a></div></div><div className="com-hero-art"><strong>HÔM NAY ĂN GÌ?</strong><span>NGON LÀNH · VỪA VỊ · ĐỦ ĐẦY</span></div></section>
    <div className="com-ticker"><span>✳ CƠM NÓNG MỖI NGÀY</span><span>✳ RAU TƯƠI THEO MÙA</span><span>✳ NẤU BẰNG TẤT CẢ SỰ TỬ TẾ</span></div>
    <section className="com-highlights"><article><span>01</span><b>Đủ món như bữa nhà</b><p>Mặn, rau, canh và một chút tráng miệng.</p></article><article><span>02</span><b>Nấu khi bạn gọi</b><p>Đồ ăn nóng hổi, không để sẵn cả ngày.</p></article><article><span>03</span><b>Đi một mình cũng vui</b><p>Phần cơm vừa vặn, bàn nhỏ thật xinh.</p></article></section>
    <section className="com-menu-section" id="food-menu"><div className="com-section-title"><span>THỰC ĐƠN HÔM NAY</span><h2>Món nào cũng muốn gọi thêm.</h2><p>Thực đơn thay đổi theo ngày để căn bếp luôn có điều mới mẻ.</p></div><MenuPicker slug={template.slug} variant="cards" /></section>
    <section className="com-story" id="food-story"><div className="com-story-art"><span>NHỮNG ĐIỀU NHỎ XÍU</span><i>♥</i></div><div><span>CHUYỆN BẾP</span><h2>Cơm ngon là khi có nhau.</h2><p>Không cầu kỳ, chỉ có nồi canh nghi ngút khói, rau luộc xanh và miếng thịt kho mềm. Những điều nhỏ xíu ấy lại là điều khiến ta muốn quay về.</p><a href="#food-booking">Ghé nhà mình nhé <ArrowRight size={17} /></a></div></section>
    <section className="com-combo"><div><span>COMBO CỦA TUẦN</span><h2>Một mâm cơm đủ đầy cho 2.</h2><p>Thịt kho trứng · Rau luộc kho quẹt · Canh bí thịt bằm · Trà tắc nhà làm.</p><strong>159.000đ <small>/ 02 người</small></strong><a href="#food-booking">Đặt combo ngay <ArrowRight size={16} /></a></div><div className="com-combo-art"><b>NHÀ MÌNH ĂN CƠM!</b><span>ƯU ĐÃI ĐẾN HẾT CHỦ NHẬT</span></div></section>
    <section className="com-love"><span>NGƯỜI NHÀ NÓI GÌ?</span><div><blockquote>“Mình dẫn mẹ đến đây và mẹ bảo vị canh chua giống hệt ở nhà. Thế là tuần nào cả nhà cũng ghé.”</blockquote><article><b>4.9 / 5</b><span>★★★★★</span><small>từ 1.200+ lượt ghé quán</small></article></div><div className="com-review-names"><span>THU HÀ · KHÁCH QUEN</span><span>MINH & GIA ĐÌNH</span><span>ANH TÚ · QUẬN 1</span></div></section>
    <section className="com-booking" id="food-booking"><div className="com-booking-heading"><span>GIỮ MỘT BÀN NHỎ</span><h2>Có mặt là vui rồi.</h2><p><Clock3 size={17} /> Mở cửa mỗi ngày · 10:30 — 21:00</p><p><MapPin size={17} /> 38 Trần Hưng Đạo, Quận 1, TP.HCM</p></div><ReservationForm compact label="Giữ bàn giúp mình" /></section><Footer name={template.name} light />
  </div>;
}

function MocCoffee({ template }: { template: TemplateItem }) {
  return <div className="food-page moc-coffee" id="top">
    <header className="moc-header"><a href="#top" className="moc-brand">Mộc<span>coffee</span></a><nav><a href="#food-menu">Menu</a><a href="#food-story">Nhật ký Mộc</a><a href="#food-booking">Ghé Mộc</a></nav><a href="#food-booking" className="moc-reserve">Chọn một góc <ArrowUpRight size={15} /></a></header>
    <section className="moc-hero"><div className="moc-hero-image"><span>BREWED WITH CARE</span><small>01 / 03</small></div><div className="moc-hero-copy"><p className="moc-kicker"><Sun size={14} /> SLOW MORNINGS · QUIET AFTERNOONS</p><h1>{template.tagline}</h1><p>Một nơi để bạn mở trang sách còn dang dở, nhấp một ngụm cà phê và để ngày trôi chậm hơn một chút.</p><FoodLink href="#food-menu" className="moc-link">Chọn ly hôm nay</FoodLink><div className="moc-opening"><span>HẰNG NGÀY · <b>07:00 — 22:00</b></span><span>ĐẶC BIỆT · <b>Hạt rang tại chỗ</b></span></div></div></section>
    <section className="moc-notes"><article><Coffee /><div><span>HẠT CÀ PHÊ</span><b>Rang theo mẻ nhỏ, ưu tiên vị ngọt tự nhiên.</b></div></article><article><Leaf /><div><span>KHÔNG GIAN</span><b>Nhiều ánh sáng, cây xanh và những bàn ngồi yên.</b></div></article><article><Wifi /><div><span>VÌ MỘT NGÀY DÀI</span><b>Wi-Fi tốt, ổ cắm đủ và playlist thật nhẹ.</b></div></article></section>
    <section className="moc-menu-section" id="food-menu"><header><div><span>02 / OUR MENU</span><h2>Một ly bạn thích, một ngày bạn cần.</h2></div><p>Những thức uống đơn giản, được pha thật kỹ.</p></header><MenuPicker slug={template.slug} variant="default" /></section>
    <section className="moc-journal" id="food-story"><div className="moc-journal-copy"><span>NHẬT KÝ MỘC / 09.2026</span><h2>Chúng tôi tin vào những khoảng thở.</h2><p>Một quán cà phê không cần phải thật ồn ào để trở nên đáng nhớ. Đôi khi, chỉ cần một chiếc bàn cạnh cửa sổ và ly cà phê được pha vừa ý.</p><a href="#food-booking">Đọc thêm câu chuyện Mộc <ArrowRight size={17} /></a></div><div className="moc-journal-card"><small>HÔM NAY Ở MỘC</small><b>“Có những ngày, điều tốt nhất bạn có thể làm là ngồi lại.”</b><span>— Ghi chú bên cửa sổ</span></div></section>
    <section className="moc-sessions"><header><span>Ở MỘC TUẦN NÀY</span><h2>Những cuộc hẹn nhỏ và thật vui.</h2><a href="#food-booking">Xem lịch tháng này <ArrowRight size={16} /></a></header><div><article><small>THỨ TƯ · 18:30</small><b>Slow brew tasting</b><p>Thử ba cách pha cùng hạt rang tuần này.</p><span>12 chỗ · miễn phí</span></article><article><small>THỨ BẢY · 09:00</small><b>Morning sketch club</b><p>Mang theo sổ, tụi mình pha cà phê.</p><span>Đăng ký trước</span></article><article><small>CHỦ NHẬT · 16:00</small><b>Vinyl afternoon</b><p>Nghe nhạc, đọc sách và nhấp một ly trà.</p><span>Vào cửa tự do</span></article></div></section>
    <section className="moc-social"><div className="moc-social-quote"><span>@MOCCOFFEE</span><b>Những lát cắt nhỏ ở Mộc.</b><a href="#instagram"><Instagram size={16} /> Theo dõi Instagram</a></div><div className="moc-social-grid"><i>01</i><i>02</i><i>03</i><i>04</i></div></section>
    <section className="moc-visit" id="food-booking"><div className="moc-visit-image"><span>COME AS YOU ARE</span></div><div className="moc-visit-copy"><span>03 / VISIT MỘC</span><h2>Giữ một góc cho riêng bạn.</h2><p><MapPin size={17} /> 12 Lê Văn Miến, Thảo Điền, TP.HCM</p><p><Clock3 size={17} /> Mỗi ngày · 07:00 — 22:00</p><ReservationForm compact label="Gửi lời hẹn" /></div></section><Footer name={template.name} />
  </div>;
}

export function FoodDemo({ template }: { template: TemplateItem }) {
  if (template.slug === "lua-viet-restaurant") return <LuaViet template={template} />;
  if (template.slug === "com-nha-eatery") return <ComNha template={template} />;
  return <MocCoffee template={template} />;
}
