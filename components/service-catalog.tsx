"use client";

import { useState } from "react";
import { ArrowUpRight, Check, SlidersHorizontal, Star } from "lucide-react";
import type { TemplateItem } from "@/lib/templates";
import { demoContent } from "./demo-sections";
import { DemoDialog } from "./demo-dialog";

type CatalogDetail = { groups: string[]; photos: string[]; rates: number[]; capacity: number[]; unit: string; currency: string };
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;
const rooms = ["photo-1611892440504-42a792e24d32", "photo-1582719478250-c89cae4dc85b", "photo-1566073771259-6a8506099945"];
const catalogData: Record<string, CatalogDetail> = {
  "ridenow-car-rental": { groups: ["Thể thao", "SUV", "Đô thị"], photos: ["photo-1503376780353-7e6692767b70", "photo-1618843479313-40f8afb4b4d8", "photo-1441148345475-03a2e82f9719"], rates: [5800000, 2400000, 1500000], capacity: [4, 5, 4], unit: "ngày", currency: "VND" },
  "nestly-home-rental": { groups: ["Đà Lạt", "Hội An", "Đà Nẵng"], photos: ["photo-1449158743715-0a90ebb6d2d8", "photo-1600607687939-ce8a6c25118c", "photo-1499793983690-e29da59ef1c2"], rates: [1800000, 950000, 2600000], capacity: [4, 2, 6], unit: "đêm", currency: "VND" },
  "gearup-equipment-rental": { groups: ["Đào & san lấp", "Nâng hạ", "Nguồn điện"], photos: ["photo-1580901368919-7738efb0f87e", "photo-1504307651254-35680f356dfd", "photo-1581092921461-eab62e97a780"], rates: [0, 0, 0], capacity: [1, 1, 1], unit: "ngày", currency: "VND" },
  "aurelia-luxury-hotel": { groups: ["Suite", "Villa", "Gia đình"], photos: rooms, rates: [2800000, 6500000, 9800000], capacity: [2, 2, 4], unit: "đêm", currency: "VND" },
  "sunday-boutique-hotel": { groups: ["Cozy", "Signature", "Nhóm bạn"], photos: [rooms[1], rooms[0], "photo-1600607687920-4e2a09cf159d"], rates: [980000, 1450000, 2200000], capacity: [2, 2, 4], unit: "đêm", currency: "VND" },
  "hush-minimal-hotel": { groups: ["Tatami", "Hướng vườn", "Suite"], photos: ["photo-1615874959474-d609969a20ed", rooms[1], rooms[0]], rates: [18000, 26000, 38000], capacity: [2, 2, 2], unit: "đêm", currency: "JPY" },
};
const money = (value: number, currency: string) => new Intl.NumberFormat("vi-VN", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
const nextDay = (date: string) => { const d = new Date(`${date}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10); };

export function ServiceCatalog({ template }: { template: TemplateItem }) {
  const content = demoContent[template.slug];
  const data = catalogData[template.slug];
  const hotel = template.category === "hotel";
  const equipment = template.slug.includes("gearup");
  const home = template.slug.includes("nestly");
  const [group, setGroup] = useState("all");
  const [capacity, setCapacity] = useState(1);
  const [sort, setSort] = useState("featured");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [compare, setCompare] = useState<number[]>([]);
  const [comparing, setComparing] = useState(false);
  const visible = content.offers.map((offer, index) => ({ ...offer, index })).filter(({ index }) => (group === "all" || data.groups[index] === group) && (equipment || data.capacity[index] >= capacity)).sort((a, b) => sort === "price" ? data.rates[a.index] - data.rates[b.index] : a.index - b.index);
  return <section className="sample-content service-catalog" id="options">
    <div className="sample-section-title"><span>{content.eyebrow}</span><h2>{content.title}</h2></div>
    <div className="catalog-booking-strip">
      <label>{hotel || home ? "Nhận phòng" : "Ngày bắt đầu"}<input type="date" value={start} onChange={e => { setStart(e.target.value); if (end <= e.target.value) setEnd(nextDay(e.target.value)); }} /></label>
      <label>{hotel || home ? "Trả phòng" : "Ngày kết thúc"}<input type="date" min={nextDay(start)} value={end} onChange={e => setEnd(e.target.value)} /></label>
      <label>{equipment ? "Nhóm thiết bị" : hotel || home ? "Số khách" : "Số chỗ tối thiểu"}>{equipment ? <select value={group} onChange={e => setGroup(e.target.value)}><option value="all">Tất cả thiết bị</option>{data.groups.map(g => <option key={g}>{g}</option>)}</select> : <select value={capacity} onChange={e => setCapacity(Number(e.target.value))}>{[1, 2, 4, 5, 6].map(n => <option value={n} key={n}>{n} {hotel || home ? "khách" : "chỗ"}</option>)}</select>}</label>
      <div><strong>{visible.length} lựa chọn</strong><small>Danh mục minh họa · Chưa xác nhận lịch trống</small></div>
    </div>
    <div className="catalog-filter-row"><div className="catalog-chips" aria-label="Lọc danh mục">{["all", ...data.groups].map(g => <button type="button" key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>{g === "all" ? "Tất cả" : g}</button>)}</div><label className="catalog-sort"><SlidersHorizontal size={16} /><select aria-label="Sắp xếp danh mục" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Đề xuất cho bạn</option>{!equipment && <option value="price">Giá từ thấp đến cao</option>}</select></label></div>
    <div className="rich-catalog-grid">{visible.map(offer => <article key={offer.title} className="rich-catalog-card">
      <button type="button" className="catalog-image" onClick={() => setSelected(offer.index)} aria-label={`Xem chi tiết ${offer.title}`} style={{ backgroundImage: `url(${photo(data.photos[offer.index])})` }}><span>{data.groups[offer.index]}</span><i><ArrowUpRight size={24} /></i></button>
      <div className="rich-card-body"><div className="rich-card-rating"><span>{hotel || home ? "LƯU TRÚ TUYỂN CHỌN" : equipment ? "HỒ SƠ KỸ THUẬT" : "LỰA CHỌN CHO HÀNH TRÌNH"}</span><b><Star size={13} /> {equipment ? "Kiểm định" : "4.9"}</b></div><h3>{offer.title}</h3><p>{offer.meta}</p><ul>{offer.items.slice(0, 2).map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="rich-card-price"><strong>{equipment ? "Liên hệ báo giá" : money(data.rates[offer.index], data.currency)}<small>{!equipment && ` / ${data.unit}`}</small></strong><button type="button" onClick={() => setSelected(offer.index)}>Chi tiết ↗</button></div><label className="compare-toggle"><input type="checkbox" checked={compare.includes(offer.index)} onChange={e => setCompare(e.target.checked ? [...compare, offer.index] : compare.filter(i => i !== offer.index))} />Thêm vào so sánh</label></div>
    </article>)}</div>
    {!visible.length && <div className="catalog-empty"><h3>Chưa có lựa chọn phù hợp</h3><p>Thử đổi số khách hoặc nhóm danh mục.</p><button onClick={() => { setGroup("all"); setCapacity(1); }}>Xóa bộ lọc</button></div>}
    {compare.length > 0 && <div className="compare-bar"><span>Đã chọn {compare.length} mục để so sánh</span><button disabled={compare.length < 2} onClick={() => setComparing(true)}>So sánh {compare.length} lựa chọn ↗</button><button onClick={() => setCompare([])}>Bỏ chọn</button></div>}
    <p className="demo-note">Hình ảnh, mức giá và đánh giá dùng để minh họa giao diện. Xem điều kiện và chi phí trước bước xác nhận.</p>
    {comparing && <DemoDialog title="So sánh lựa chọn" onClose={() => setComparing(false)}><div className="comparison-table"><table><thead><tr><th>Thông tin</th>{compare.map(i => <th key={i}>{content.offers[i].title}</th>)}</tr></thead><tbody><tr><th>Đặc điểm</th>{compare.map(i => <td key={i}>{content.offers[i].meta}</td>)}</tr><tr><th>Giá tham khảo</th>{compare.map(i => <td key={i}>{content.offers[i].price}</td>)}</tr><tr><th>Bao gồm / điều kiện</th>{compare.map(i => <td key={i}>{content.offers[i].items.map(item => <p key={item}>{item}</p>)}</td>)}</tr><tr><th>Chọn phương án</th>{compare.map(i => <td key={i}><button onClick={() => { setComparing(false); setSelected(i); }}>Xem chi tiết</button></td>)}</tr></tbody></table></div></DemoDialog>}
    {selected !== null && <BookingDetail key={selected} template={template} index={selected} start={start} end={end} onClose={() => setSelected(null)} />}
  </section>;
}

function BookingDetail({ template, index, start: initialStart, end: initialEnd, onClose }: { template: TemplateItem; index: number; start: string; end: string; onClose: () => void }) {
  const data = catalogData[template.slug];
  const offer = demoContent[template.slug].offers[index];
  const equipment = template.slug.includes("gearup");
  const hotel = template.category === "hotel";
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [extra, setExtra] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const days = Math.round((Date.parse(end) - Date.parse(start)) / 86400000);
  const valid = Number.isFinite(days) && days > 0;
  const extraPrice = data.currency === "JPY" ? 3000 : hotel ? 400000 : 200000;
  const extraLabel = equipment ? "Kèm người vận hành / kỹ thuật" : hotel ? "Gói bữa tối cho hai người" : template.slug.includes("nestly") ? "Dọn phòng bổ sung" : "Giao xe tận nơi";
  return <DemoDialog title={offer.title} onClose={onClose}><div className="booking-detail"><div><div className="booking-detail-photo" role="img" aria-label={`Hình minh họa ${offer.title}`} style={{ backgroundImage: `url(${photo(data.photos[index])})` }} /><span className="detail-kicker">{data.groups[index]} / {template.name}</span><h3>{offer.meta}</h3><ul className="detail-inclusions">{offer.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><details className="detail-terms"><summary>{equipment ? "Vận hành & bàn giao" : "Điều kiện đặt và hủy"}</summary><p>{equipment ? "Cấu hình, giờ máy, vận chuyển và người vận hành được xác nhận sau khi khảo sát. Chưa bao gồm nhiên liệu và các hạng mục phát sinh." : "Giá là mức minh họa. Thuế, phí và tiền đặt cọc nếu có sẽ được xác nhận trong báo giá. Điều kiện hủy phụ thuộc gói; chưa thu tiền ở bước gửi yêu cầu."}</p></details></div>
      <form className="booking-detail-form" onChange={() => setSubmitted(false)} onSubmit={e => { e.preventDefault(); if (valid) setSubmitted(true); }}><span className="detail-kicker">{equipment ? "LẬP YÊU CẦU THUÊ" : "DỰ TOÁN CHUYẾN ĐI"}</span><h3>{offer.price}</h3><div className="booking-date-fields"><label>Ngày nhận<input required type="date" value={start} onChange={e => { setStart(e.target.value); if (end <= e.target.value) setEnd(nextDay(e.target.value)); }} /></label><label>Ngày trả<input required type="date" min={nextDay(start)} value={end} onChange={e => setEnd(e.target.value)} /></label></div><label className="booking-extra"><input type="checkbox" checked={extra} onChange={e => setExtra(e.target.checked)} /><span>{extraLabel}<small>{equipment ? "Báo giá riêng" : `+ ${money(extraPrice, data.currency)} / lượt`}</small></span></label>
      <dl className="booking-totals"><div><dt>Thời gian</dt><dd>{valid ? `${days} ${data.unit}` : "Chọn ngày"}</dd></div><div><dt>{equipment ? "Chi phí thiết bị" : "Chi phí cơ bản"}</dt><dd>{equipment ? "Theo cấu hình" : valid ? money(days * data.rates[index], data.currency) : "—"}</dd></div>{extra && <div><dt>Dịch vụ thêm</dt><dd>{equipment ? "Theo báo giá" : money(extraPrice, data.currency)}</dd></div>}<div className="total"><dt>{equipment ? "Tổng dự kiến" : "Tạm tính"}</dt><dd>{equipment ? "Cần tư vấn" : valid ? money(days * data.rates[index] + (extra ? extraPrice : 0), data.currency) : "—"}</dd></div></dl>
      {equipment && <label>Địa điểm công trường<input required placeholder="Khu vực, địa chỉ giao máy" /></label>}<label>Họ tên<input required autoComplete="name" /></label><label>Email liên hệ<input required type="email" autoComplete="email" /></label><button className="catalog-primary" type="submit">Gửi yêu cầu thử ↗</button><small>Chưa thanh toán. Đây là bước trải nghiệm, không gửi thông tin ra ngoài.</small>{submitted && <p className="form-result" role="status">Đã tạo yêu cầu mẫu cho {offer.title}, từ {start} đến {end}. Chưa xác nhận đặt chỗ.</p>}</form></div></DemoDialog>;
}
