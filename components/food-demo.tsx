"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { TemplateItem } from "@/lib/templates";
import "./food-demo.css";

type Dish = { name: string; group: string; detail: string; price: number };
const menus: Record<string, Dish[]> = {
  "lua-viet-restaurant": [
    { name: "Gỏi bưởi tôm nướng", group: "Khai vị", detail: "Bưởi tươi, tôm nướng than, rau thơm", price: 145000 },
    { name: "Cuốn mùa xanh", group: "Khai vị", detail: "Rau theo mùa, nấm, sốt mè rang", price: 95000 },
    { name: "Bò nướng mắc khén", group: "Món chính", detail: "Thăn bò, mắc khén, rau củ nướng", price: 285000 },
    { name: "Cá hấp lá sen", group: "Món chính", detail: "Cá tươi, hạt sen, nước dùng thanh", price: 225000 },
    { name: "Chè sen nhãn", group: "Tráng miệng", detail: "Hạt sen, nhãn, đường phèn", price: 65000 },
    { name: "Kem dừa nướng", group: "Tráng miệng", detail: "Kem dừa, dừa sấy, đậu phộng", price: 75000 },
  ],
  "com-nha-eatery": [
    { name: "Thịt kho trứng", group: "Món mặn", detail: "Thịt kho mềm, trứng gà, nước dừa", price: 55000 },
    { name: "Gà rang gừng", group: "Món mặn", detail: "Gà ta, gừng tươi, hành lá", price: 65000 },
    { name: "Đậu hũ sốt cà", group: "Rau & đậu", detail: "Đậu chiên vàng, sốt cà chua", price: 35000 },
    { name: "Rau luộc kho quẹt", group: "Rau & đậu", detail: "Rau theo mùa, kho quẹt đậm đà", price: 45000 },
    { name: "Canh chua cá", group: "Canh", detail: "Cá, dứa, cà chua, rau ngổ", price: 55000 },
    { name: "Canh bí thịt bằm", group: "Canh", detail: "Bí xanh, thịt bằm, hành ngò", price: 35000 },
  ],
  "moc-coffee": [
    { name: "Cà phê sữa đá", group: "Cà phê", detail: "Cà phê phin đậm vị, sữa đặc", price: 35000 },
    { name: "Latte", group: "Cà phê", detail: "Espresso, sữa tươi đánh mịn", price: 55000 },
    { name: "Trà đào cam sả", group: "Trà", detail: "Trà đen, đào, cam tươi, sả", price: 45000 },
    { name: "Trà sen", group: "Trà", detail: "Trà ướp sen, hương thơm dịu", price: 45000 },
    { name: "Croissant bơ", group: "Bánh", detail: "Bánh ngàn lớp, bơ thơm", price: 39000 },
    { name: "Bánh chuối", group: "Bánh", detail: "Chuối chín, quế, hạt óc chó", price: 35000 },
  ],
};
const money = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

export function FoodDemo({ template }: { template: TemplateItem }) {
  const cafe = template.slug === "moc-coffee";
  const casual = template.slug === "com-nha-eatery";
  const dishes = menus[template.slug];
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const groups = ["Tất cả", ...new Set(dishes.map(dish => dish.group))];
  const total = dishes.filter(dish => selected.includes(dish.name)).reduce((sum, dish) => sum + dish.price, 0);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
  }
  return (
    <div className={`food-demo ${cafe ? "food-cafe" : casual ? "food-casual" : "food-dining"}`}>
      <nav className="food-nav" aria-label="Điều hướng nhà hàng">
        <a className="food-brand" href="#top">{template.name}</a>
        <div><a href="#food-menu">Thực đơn</a><a href="#food-story">Câu chuyện</a><a href="#food-booking">{cafe ? "Hẹn tại Mộc" : "Đặt bàn"} <ArrowUpRight size={14} /></a></div>
      </nav>
      <section className="food-hero">
        <div className="food-hero-copy"><span>{cafe ? "COFFEE · BAKES · SLOW DAYS" : casual ? "BẾP ẤM · CƠM NGON · MỖI NGÀY" : "CONTEMPORARY VIETNAMESE KITCHEN"}</span><h1>{template.tagline}</h1><p>{cafe ? "Một góc nhỏ để đọc vài trang sách, gặp một người bạn và thưởng thức ly cà phê vừa pha" : casual ? "Món quen từ căn bếp nhỏ, nấu bằng sự chăm chút dành cho mỗi bữa cơm" : "Nguyên liệu Việt theo mùa, bàn tay người bếp và những cuộc gặp gỡ đáng nhớ"}</p><a className="food-button" href="#food-menu">Khám phá thực đơn <ArrowUpRight size={18} /></a></div>
        <div className="food-hero-image" role="img" aria-label={cafe ? "Cà phê và không gian quán" : "Không gian ẩm thực"}><span>{cafe ? "BREWED WITH CARE" : casual ? "HÔM NAY ĂN GÌ?" : "A TASTE OF VIETNAM"}</span></div>
      </section>
      <div className="food-strip"><span>{cafe ? "Hạt rang thơm mỗi ngày" : "Nguyên liệu theo mùa"}</span><span>Chăm chút từng hương vị</span><span>{cafe ? "Một chỗ ngồi thật yên" : "Cùng nhau bên bàn ăn"}</span></div>
      <section className="food-section" id="food-menu">
        <div className="food-heading"><div><small>01 / THỰC ĐƠN</small><h2>{cafe ? "Một ly bạn thích" : casual ? "Món nhà hôm nay" : "Hương vị có câu chuyện"}</h2></div><p>Thực đơn và giá minh họa cho giao diện mẫu</p></div>
        <div className="food-filters" role="group" aria-label="Lọc thực đơn">{groups.map(group => <button key={group} aria-pressed={filter === group} onClick={() => setFilter(group)}>{group}</button>)}</div>
        <div className="food-menu-grid">{dishes.filter(dish => filter === "Tất cả" || dish.group === filter).map(dish => <article key={dish.name}><small>{dish.group}</small><h3>{dish.name}</h3><p>{dish.detail}</p><div><strong>{money(dish.price)}</strong><button aria-label={`${selected.includes(dish.name) ? "Bỏ" : "Chọn"} ${dish.name}`} aria-pressed={selected.includes(dish.name)} onClick={() => setSelected(current => current.includes(dish.name) ? current.filter(name => name !== dish.name) : [...current, dish.name])}>{selected.includes(dish.name) ? <Minus size={18} /> : <Plus size={18} />}</button></div></article>)}</div>
        <div className="food-selection" role="status">{selected.length ? <><span>{selected.length} món đã chọn · {selected.join(", ")}</span><strong>{money(total)}</strong><button onClick={() => setSelected([])}>Bỏ chọn tất cả</button></> : "Chọn món bằng dấu + để xem tổng giá tham khảo"}</div>
      </section>
      <section className="food-story food-section" id="food-story"><small>02 / CÂU CHUYỆN</small><h2>{cafe ? "Một khoảng lặng giữa phố" : casual ? "Cơm ngon là khi có nhau" : "Từ căn bếp đến bàn ăn"}</h2><p>{cafe ? "Chúng tôi dành sự tỉ mỉ cho từng mẻ rang và một chút khoảng thở cho không gian, để mỗi lần ghé là một lần bạn thấy nhẹ hơn" : casual ? "Không cần cầu kỳ, chỉ cần món ăn nóng hổi, rau tươi và một chén canh vừa vị — những điều nhỏ làm nên một bữa cơm thân thuộc" : "Ẩm thực Việt là ký ức và cảm hứng, từ hương rau thơm đến tiếng than hồng — mỗi món ăn là một lời mời khám phá lại điều thân quen"}</p></section>
      <section className="food-booking food-section" id="food-booking">
        <div><small>03 / HẸN GẶP BẠN</small><h2>{cafe ? "Giữ một góc cho bạn" : "Dành chỗ cho cuộc hẹn"}</h2><p>{cafe ? "07:00 — 22:00" : casual ? "10:30 — 21:00" : "11:00 — 14:00 / 17:30 — 22:00"}<br />Mở cửa mỗi ngày</p><p>Khu vực trung tâm TP. Hồ Chí Minh<br /><small>Địa điểm minh họa cho bản mẫu</small></p></div>
        <form onSubmit={submit} onChange={() => setConfirmed(false)}><label>Họ tên<input name="name" required autoComplete="name" placeholder="Tên của bạn" /></label><label>Số điện thoại<input name="phone" type="tel" required autoComplete="tel" pattern="[+0-9 ()-]{9,16}" placeholder="Số liên hệ" /></label><div className="food-form-row"><label>Ngày hẹn<input name="date" type="date" required /></label><label>Giờ hẹn<input name="time" type="time" required /></label><label>Số khách<select name="guests">{[1,2,3,4,5,6,8,10].map(n => <option key={n}>{n}</option>)}</select></label></div><button className="food-button" type="submit">Thử đặt bàn <ArrowUpRight size={18} /></button><p className="food-form-note" role="status">{confirmed ? "Đã hoàn tất bước đặt bàn mẫu — chưa có yêu cầu nào được gửi đến quán" : "Bản trải nghiệm giao diện, không tiếp nhận đặt bàn thực tế"}</p></form>
      </section>
      <footer className="food-footer"><a href="#top">{template.name}</a><span>Giao diện mẫu F&B · DevDes</span><a href="#food-menu">Xem thực đơn ↗</a></footer>
    </div>
  );
}
