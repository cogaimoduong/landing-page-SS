"use client";

import { useState } from "react";
import { ArrowUpRight, Check, SlidersHorizontal, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { TemplateItem } from "@/lib/templates";
import { getDemoContent } from "./demo-sections";
import { DemoDialog } from "./demo-dialog";
import { useLocale } from "./locale-provider";

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
const groupLabels: Record<string, Record<Locale, string>> = {
  "Thể thao": { en: "Sports", vi: "Thể thao" },
  SUV: { en: "SUV", vi: "SUV" },
  "Đô thị": { en: "City", vi: "Đô thị" },
  "Đà Lạt": { en: "Da Lat", vi: "Đà Lạt" },
  "Hội An": { en: "Hoi An", vi: "Hội An" },
  "Đà Nẵng": { en: "Da Nang", vi: "Đà Nẵng" },
  "Đào & san lấp": { en: "Excavation & earthworks", vi: "Đào & san lấp" },
  "Nâng hạ": { en: "Lifting", vi: "Nâng hạ" },
  "Nguồn điện": { en: "Power", vi: "Nguồn điện" },
  Suite: { en: "Suite", vi: "Suite" },
  Villa: { en: "Villa", vi: "Villa" },
  "Gia đình": { en: "Family", vi: "Gia đình" },
  Cozy: { en: "Cozy", vi: "Cozy" },
  Signature: { en: "Signature", vi: "Signature" },
  "Nhóm bạn": { en: "Friends", vi: "Nhóm bạn" },
  Tatami: { en: "Tatami", vi: "Tatami" },
  "Hướng vườn": { en: "Garden view", vi: "Hướng vườn" },
};
const catalogCopy = {
  en: {
    checkIn: "Check-in", checkOut: "Check-out", startDate: "Start date", endDate: "End date", equipmentGroup: "Equipment group", guests: "Guests", minimumSeats: "Minimum seats", guest: "guests", seats: "seats", allEquipment: "All equipment", choices: "choices", sampleNotice: "Illustrative catalogue · Availability is not confirmed", filterAria: "Filter catalogue", all: "All", sortAria: "Sort catalogue", recommended: "Recommended for you", priceAscending: "Price: low to high", selectedStay: "CURATED STAY", technicalProfile: "TECHNICAL PROFILE", tripChoice: "TRIP PICK", certified: "Certified", contactForPrice: "Contact for pricing", details: "Details", addToCompare: "Add to comparison", noMatches: "No matching options", adjustFilters: "Try changing the guest count or category.", clearFilters: "Clear filters", selectedForComparison: "selected for comparison", compare: "Compare", clearSelection: "Clear selection", note: "Images, prices, and ratings illustrate this interface. Review terms and costs before confirming.", comparisonTitle: "Compare options", information: "Information", features: "Highlights", referencePrice: "Reference price", includes: "Included / terms", chooseOption: "Choose an option", bookingTerms: "Booking & cancellation terms", handover: "Operations & handover", requestRental: "CREATE RENTAL REQUEST", tripEstimate: "TRIP ESTIMATE", pickupDate: "Pickup date", returnDate: "Return date", duration: "Duration", chooseDates: "Choose dates", equipmentCost: "Equipment cost", baseCost: "Base cost", quotedByConfiguration: "By configuration", quoted: "Quoted", additionalService: "Additional service", estimatedTotal: "Estimated total", subtotal: "Subtotal", consultationRequired: "Consultation required", siteLocation: "Site location", sitePlaceholder: "Area, equipment delivery address", fullName: "Full name", contactEmail: "Contact email", submitRequest: "Send sample request", unpaid: "No payment is taken. This is a sample flow and does not send information externally.", createdRequest: "A sample request has been created for", noBookingConfirmed: "No booking has been confirmed.", extraEquipment: "Operator / technician included", extraHotel: "Dinner package for two", extraHome: "Additional housekeeping", extraCar: "Vehicle delivery", separateQuote: "Quoted separately", perUse: "/ use", termsEquipment: "Configuration, machine hours, transport, and operator are confirmed after a site survey. Fuel and incidental items are not included.", termsOther: "This price is illustrative. Taxes, fees, and any deposit are confirmed in the quote. Cancellation terms depend on the package; no payment is taken when sending this request.", days: "days", nights: "nights", day: "day", night: "night",
  },
  vi: {
    checkIn: "Nhận phòng", checkOut: "Trả phòng", startDate: "Ngày bắt đầu", endDate: "Ngày kết thúc", equipmentGroup: "Nhóm thiết bị", guests: "Số khách", minimumSeats: "Số chỗ tối thiểu", guest: "khách", seats: "chỗ", allEquipment: "Tất cả thiết bị", choices: "lựa chọn", sampleNotice: "Danh mục minh họa · Chưa xác nhận lịch trống", filterAria: "Lọc danh mục", all: "Tất cả", sortAria: "Sắp xếp danh mục", recommended: "Đề xuất cho bạn", priceAscending: "Giá từ thấp đến cao", selectedStay: "LƯU TRÚ TUYỂN CHỌN", technicalProfile: "HỒ SƠ KỸ THUẬT", tripChoice: "LỰA CHỌN CHO HÀNH TRÌNH", certified: "Kiểm định", contactForPrice: "Liên hệ báo giá", details: "Chi tiết", addToCompare: "Thêm vào so sánh", noMatches: "Chưa có lựa chọn phù hợp", adjustFilters: "Thử đổi số khách hoặc nhóm danh mục.", clearFilters: "Xóa bộ lọc", selectedForComparison: "mục đã chọn để so sánh", compare: "So sánh", clearSelection: "Bỏ chọn", note: "Hình ảnh, mức giá và đánh giá dùng để minh họa giao diện. Xem điều kiện và chi phí trước bước xác nhận.", comparisonTitle: "So sánh lựa chọn", information: "Thông tin", features: "Đặc điểm", referencePrice: "Giá tham khảo", includes: "Bao gồm / điều kiện", chooseOption: "Chọn phương án", bookingTerms: "Điều kiện đặt và hủy", handover: "Vận hành & bàn giao", requestRental: "LẬP YÊU CẦU THUÊ", tripEstimate: "DỰ TOÁN CHUYẾN ĐI", pickupDate: "Ngày nhận", returnDate: "Ngày trả", duration: "Thời gian", chooseDates: "Chọn ngày", equipmentCost: "Chi phí thiết bị", baseCost: "Chi phí cơ bản", quotedByConfiguration: "Theo cấu hình", quoted: "Theo báo giá", additionalService: "Dịch vụ thêm", estimatedTotal: "Tổng dự kiến", subtotal: "Tạm tính", consultationRequired: "Cần tư vấn", siteLocation: "Địa điểm công trường", sitePlaceholder: "Khu vực, địa chỉ giao máy", fullName: "Họ tên", contactEmail: "Email liên hệ", submitRequest: "Gửi yêu cầu thử", unpaid: "Chưa thanh toán. Đây là bước trải nghiệm, không gửi thông tin ra ngoài.", createdRequest: "Đã tạo yêu cầu mẫu cho", noBookingConfirmed: "Chưa xác nhận đặt chỗ.", extraEquipment: "Kèm người vận hành / kỹ thuật", extraHotel: "Gói bữa tối cho hai người", extraHome: "Dọn phòng bổ sung", extraCar: "Giao xe tận nơi", separateQuote: "Báo giá riêng", perUse: "/ lượt", termsEquipment: "Cấu hình, giờ máy, vận chuyển và người vận hành được xác nhận sau khi khảo sát. Chưa bao gồm nhiên liệu và các hạng mục phát sinh.", termsOther: "Giá là mức minh họa. Thuế, phí và tiền đặt cọc nếu có sẽ được xác nhận trong báo giá. Điều kiện hủy phụ thuộc gói; chưa thu tiền ở bước gửi yêu cầu.", days: "ngày", nights: "đêm", day: "ngày", night: "đêm",
  },
} as const;
const money = (value: number, currency: string, locale: Locale) => new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
const nextDay = (date: string) => { const d = new Date(`${date}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1); return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10); };

export function ServiceCatalog({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const copy = catalogCopy[locale];
  const content = getDemoContent(locale)[template.slug];
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
  const groupLabel = (value: string) => groupLabels[value]?.[locale] ?? value;
  const unit = data.unit === "đêm" ? (locale === "en" ? "night" : "đêm") : locale === "en" ? "day" : "ngày";
  return <section className="sample-content service-catalog" id="options">
    <div className="sample-section-title"><span>{content.eyebrow}</span><h2>{content.title}</h2></div>
    <div className="catalog-booking-strip">
      <label>{hotel || home ? copy.checkIn : copy.startDate}<input type="date" value={start} onChange={e => { setStart(e.target.value); if (end <= e.target.value) setEnd(nextDay(e.target.value)); }} /></label>
      <label>{hotel || home ? copy.checkOut : copy.endDate}<input type="date" min={nextDay(start)} value={end} onChange={e => setEnd(e.target.value)} /></label>
      <label>{equipment ? copy.equipmentGroup : hotel || home ? copy.guests : copy.minimumSeats}{equipment ? <select value={group} onChange={e => setGroup(e.target.value)}><option value="all">{copy.allEquipment}</option>{data.groups.map(g => <option key={g} value={g}>{groupLabel(g)}</option>)}</select> : <select value={capacity} onChange={e => setCapacity(Number(e.target.value))}>{[1, 2, 4, 5, 6].map(n => <option value={n} key={n}>{n} {hotel || home ? copy.guest : copy.seats}</option>)}</select>}</label>
      <div><strong>{visible.length} {copy.choices}</strong><small>{copy.sampleNotice}</small></div>
    </div>
    <div className="catalog-filter-row"><div className="catalog-chips" aria-label={copy.filterAria}>{["all", ...data.groups].map(g => <button type="button" key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>{g === "all" ? copy.all : groupLabel(g)}</button>)}</div><label className="catalog-sort"><SlidersHorizontal size={16} /><select aria-label={copy.sortAria} value={sort} onChange={e => setSort(e.target.value)}><option value="featured">{copy.recommended}</option>{!equipment && <option value="price">{copy.priceAscending}</option>}</select></label></div>
    <div className="rich-catalog-grid">{visible.map(offer => <article key={offer.title} className="rich-catalog-card">
      <button type="button" className="catalog-image" onClick={() => setSelected(offer.index)} aria-label={`${copy.details} ${offer.title}`} style={{ backgroundImage: `url(${photo(data.photos[offer.index])})` }}><span>{groupLabel(data.groups[offer.index])}</span><i><ArrowUpRight size={24} /></i></button>
      <div className="rich-card-body"><div className="rich-card-rating"><span>{hotel || home ? copy.selectedStay : equipment ? copy.technicalProfile : copy.tripChoice}</span><b><Star size={13} /> {equipment ? copy.certified : "4.9"}</b></div><h3>{offer.title}</h3><p>{offer.meta}</p><ul>{offer.items.slice(0, 2).map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="rich-card-price"><strong>{equipment ? copy.contactForPrice : money(data.rates[offer.index], data.currency, locale)}<small>{!equipment && ` / ${unit}`}</small></strong><button type="button" onClick={() => setSelected(offer.index)}>{copy.details} ↗</button></div><label className="compare-toggle"><input type="checkbox" checked={compare.includes(offer.index)} onChange={e => setCompare(e.target.checked ? [...compare, offer.index] : compare.filter(i => i !== offer.index))} />{copy.addToCompare}</label></div>
    </article>)}</div>
    {!visible.length && <div className="catalog-empty"><h3>{copy.noMatches}</h3><p>{copy.adjustFilters}</p><button onClick={() => { setGroup("all"); setCapacity(1); }}>{copy.clearFilters}</button></div>}
    {compare.length > 0 && <div className="compare-bar"><span>{compare.length} {copy.selectedForComparison}</span><button disabled={compare.length < 2} onClick={() => setComparing(true)}>{copy.compare} {compare.length} {copy.choices} ↗</button><button onClick={() => setCompare([])}>{copy.clearSelection}</button></div>}
    <p className="demo-note">{copy.note}</p>
    {comparing && <DemoDialog title={copy.comparisonTitle} onClose={() => setComparing(false)}><div className="comparison-table"><table><thead><tr><th>{copy.information}</th>{compare.map(i => <th key={i}>{content.offers[i].title}</th>)}</tr></thead><tbody><tr><th>{copy.features}</th>{compare.map(i => <td key={i}>{content.offers[i].meta}</td>)}</tr><tr><th>{copy.referencePrice}</th>{compare.map(i => <td key={i}>{content.offers[i].price}</td>)}</tr><tr><th>{copy.includes}</th>{compare.map(i => <td key={i}>{content.offers[i].items.map(item => <p key={item}>{item}</p>)}</td>)}</tr><tr><th>{copy.chooseOption}</th>{compare.map(i => <td key={i}><button onClick={() => { setComparing(false); setSelected(i); }}>{copy.details}</button></td>)}</tr></tbody></table></div></DemoDialog>}
    {selected !== null && <BookingDetail key={selected} template={template} index={selected} start={start} end={end} onClose={() => setSelected(null)} />}
  </section>;
}

function BookingDetail({ template, index, start: initialStart, end: initialEnd, onClose }: { template: TemplateItem; index: number; start: string; end: string; onClose: () => void }) {
  const { locale } = useLocale();
  const copy = catalogCopy[locale];
  const data = catalogData[template.slug];
  const offer = getDemoContent(locale)[template.slug].offers[index];
  const equipment = template.slug.includes("gearup");
  const hotel = template.category === "hotel";
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [extra, setExtra] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const days = Math.round((Date.parse(end) - Date.parse(start)) / 86400000);
  const valid = Number.isFinite(days) && days > 0;
  const extraPrice = data.currency === "JPY" ? 3000 : hotel ? 400000 : 200000;
  const extraLabel = equipment ? copy.extraEquipment : hotel ? copy.extraHotel : template.slug.includes("nestly") ? copy.extraHome : copy.extraCar;
  const unit = data.unit === "đêm" ? (locale === "en" ? "nights" : copy.nights) : copy.days;
  return <DemoDialog title={offer.title} onClose={onClose}><div className="booking-detail"><div><div className="booking-detail-photo" role="img" aria-label={`${copy.details} ${offer.title}`} style={{ backgroundImage: `url(${photo(data.photos[index])})` }} /><span className="detail-kicker">{groupLabels[data.groups[index]]?.[locale] ?? data.groups[index]} / {template.name}</span><h3>{offer.meta}</h3><ul className="detail-inclusions">{offer.items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><details className="detail-terms"><summary>{equipment ? copy.handover : copy.bookingTerms}</summary><p>{equipment ? copy.termsEquipment : copy.termsOther}</p></details></div>
      <form className="booking-detail-form" onChange={() => setSubmitted(false)} onSubmit={e => { e.preventDefault(); if (valid) setSubmitted(true); }}><span className="detail-kicker">{equipment ? copy.requestRental : copy.tripEstimate}</span><h3>{offer.price}</h3><div className="booking-date-fields"><label>{copy.pickupDate}<input required type="date" value={start} onChange={e => { setStart(e.target.value); if (end <= e.target.value) setEnd(nextDay(e.target.value)); }} /></label><label>{copy.returnDate}<input required type="date" min={nextDay(start)} value={end} onChange={e => setEnd(e.target.value)} /></label></div><label className="booking-extra"><input type="checkbox" checked={extra} onChange={e => setExtra(e.target.checked)} /><span>{extraLabel}<small>{equipment ? copy.separateQuote : `+ ${money(extraPrice, data.currency, locale)} ${copy.perUse}`}</small></span></label>
      <dl className="booking-totals"><div><dt>{copy.duration}</dt><dd>{valid ? `${days} ${unit}` : copy.chooseDates}</dd></div><div><dt>{equipment ? copy.equipmentCost : copy.baseCost}</dt><dd>{equipment ? copy.quotedByConfiguration : valid ? money(days * data.rates[index], data.currency, locale) : "—"}</dd></div>{extra && <div><dt>{copy.additionalService}</dt><dd>{equipment ? copy.quoted : money(extraPrice, data.currency, locale)}</dd></div>}<div className="total"><dt>{equipment ? copy.estimatedTotal : copy.subtotal}</dt><dd>{equipment ? copy.consultationRequired : valid ? money(days * data.rates[index] + (extra ? extraPrice : 0), data.currency, locale) : "—"}</dd></div></dl>
      {equipment && <label>{copy.siteLocation}<input required placeholder={copy.sitePlaceholder} /></label>}<label>{copy.fullName}<input required autoComplete="name" /></label><label>{copy.contactEmail}<input required type="email" autoComplete="email" /></label><button className="catalog-primary" type="submit">{copy.submitRequest} ↗</button><small>{copy.unpaid}</small>{submitted && <p className="form-result" role="status">{copy.createdRequest} {offer.title}, {locale === "en" ? "from" : "từ"} {start} {locale === "en" ? "to" : "đến"} {end}. {copy.noBookingConfirmed}</p>}</form></div></DemoDialog>;
}
