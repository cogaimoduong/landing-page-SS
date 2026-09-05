"use client";

import type { TemplateItem } from "@/lib/templates";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Clock3,
  Coffee,
  Headphones,
  Menu,
  MapPin,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
  Wifi,
} from "lucide-react";
import { useState, type CSSProperties } from "react";
import { DemoSections } from "./demo-sections";
import { ManagementWorkspace } from "./management-demo";

export function DemoSite({ template }: { template: TemplateItem }) {
  const style = {
    "--sample-tone": template.tone,
    "--sample-accent": template.accent,
    "--sample-dark": template.dark,
    "--sample-image": template.image ? `url(${template.image})` : "none",
  } as CSSProperties;

  return (
    <main
      id="top"
      className={`sample-site ${template.category} ${template.slug}`}
      style={style}
    >
      {template.category === "rental" && <RentalDemo template={template} />}
      {template.category === "hotel" && <HotelDemo template={template} />}
      {template.category === "management" && <ManagementWorkspace template={template} />}
      {template.category === "advertising" && <AdvertisingDemo template={template} />}
    </main>
  );
}

function SampleNav({ name, cta = "Đặt ngay" }: { name: string; cta?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sample-nav">
      <a href="#top" className="sample-brand">{name}<i>.</i></a>
      <div className={`sample-links ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}><a href="#about">Giới thiệu</a><a href="#options">Danh mục & gói</a><a href="#guide">Khám phá</a><a href="#inquiry">Liên hệ</a></div>
      <a href="#inquiry" className="sample-nav-cta">{cta} <ArrowRight /></a>
      <button className="sample-menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><Menu /></button>
    </nav>
  );
}

function RentalDemo({ template }: { template: TemplateItem }) {
  const isCar = template.slug.includes("ridenow");
  const isHome = template.slug.includes("nestly");
  return (
    <>
      <section className="sample-hero image-hero">
        <SampleNav name={template.name} cta={isCar ? "Thuê xe" : isHome ? "Tìm căn hộ" : "Nhận báo giá"} />
        <div className="sample-hero-copy">
          <span>{isCar ? "TỰ DO TRÊN MỌI HÀNH TRÌNH" : isHome ? "SỐNG NHƯ NGƯỜI BẢN ĐỊA" : "THIẾT BỊ SẴN SÀNG · 24/7"}</span>
          <h1>{template.tagline}</h1>
          <p>{isCar ? "Hơn 250 mẫu xe, thủ tục đơn giản và giao xe tận nơi." : isHome ? "Những căn nhà đẹp được tuyển chọn cho kỳ nghỉ đáng nhớ." : "Thuê máy móc công trình chính hãng, giao nhanh tận công trường."}</p>
        </div>
        <div className="rental-search">
          <label><span>{isHome ? "Bạn muốn ở đâu?" : "Bạn cần thuê gì?"}</span><b>{isCar ? "Porsche 911" : isHome ? "Đà Lạt, Việt Nam" : "Máy xúc, xe nâng..."}</b></label>
          <label><span>Ngày bắt đầu</span><b>28 / 08 / 2026</b></label>
          <label><span>Ngày kết thúc</span><b>31 / 08 / 2026</b></label>
          <button onClick={() => document.getElementById("options")?.scrollIntoView({ behavior: "smooth" })}><Search /> <span>Tìm ngay</span></button>
        </div>
      </section>
      <section className="sample-content" id="service">
        <div className="sample-section-title"><span>ĐƯỢC YÊU THÍCH</span><h2>{isCar ? "Chọn xe cho chuyến đi" : isHome ? "Ở đâu cũng thấy như nhà" : "Thiết bị được thuê nhiều"}</h2><a href="#options">Xem tất cả <ArrowRight /></a></div>
        <div className="rental-cards">
          {["Lựa chọn 01", "Lựa chọn 02", "Lựa chọn 03"].map((name, index) => <article key={name}><div className={`rental-image image-${index + 1}`}><span>{index === 0 ? "NỔI BẬT" : "CÒN TRỐNG"}</span></div><small>{isCar ? (index === 0 ? "TỰ ĐỘNG · 2+2 CHỖ" : index === 1 ? "TỰ ĐỘNG · 5 CHỖ" : "TỰ ĐỘNG · 4 CHỖ") : isHome ? (["4 KHÁCH · 2 PHÒNG", "2 KHÁCH · 1 PHÒNG", "6 KHÁCH · 3 PHÒNG"][index]) : "THEO NGÀY / THÁNG"}</small><h3>{isCar ? ["Porsche 911", "Mercedes GLC", "Mini Cooper"][index] : isHome ? ["Pine Hill House", "The Garden Loft", "Coastal Home"][index] : ["Máy xúc Komatsu", "Xe nâng Toyota", "Máy phát điện"][index]}</h3><p><a href="#options">Xem thông số & giá thuê ↗</a></p></article>)}
        </div>
      </section>
      <section className="sample-banner"><span>ĐƠN GIẢN · MINH BẠCH · NHANH CHÓNG</span><h2>Thuê trong 3 bước.</h2><div><b>01 <small>Chọn sản phẩm</small></b><b>02 <small>Chọn thời gian</small></b><b>03 <small>Nhận và sử dụng</small></b></div></section>
      <section className="rental-benefits sample-content" id="about">
        <div className="sample-section-title"><span>VÌ SAO CHỌN {template.name.toUpperCase()}</span><h2>An tâm từ lúc đặt<br />đến khi hoàn trả.</h2></div>
        <div className="benefit-grid">
          <article><ShieldCheck /><b>{isCar ? "Bảo hiểm đầy đủ" : isHome ? "Chỗ ở xác thực" : "Thiết bị kiểm định"}</b><p>Mọi sản phẩm đều được kiểm tra kỹ trước khi bàn giao đến bạn.</p></article>
          <article><Clock3 /><b>Hỗ trợ đúng giờ</b><p>Quy trình rõ ràng, giao nhận nhanh và không có chi phí bất ngờ.</p></article>
          <article><Headphones /><b>Đồng hành 24/7</b><p>Đội ngũ luôn sẵn sàng hỗ trợ trong suốt thời gian thuê.</p></article>
        </div>
      </section>
      <section className="rental-story">
        <div className="story-photo" />
        <div className="story-copy"><span>CÂU CHUYỆN KHÁCH HÀNG</span><Quote /><blockquote>“Mọi thứ nhanh hơn mình nghĩ. Chỉ vài phút là đặt xong, nhận đúng thứ cần và được hỗ trợ rất nhiệt tình.”</blockquote><b>HOÀNG NAM · KHÁCH HÀNG TỪ 2024</b></div>
      </section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line={isHome ? "Ở theo cách của bạn." : "Sẵn sàng cho hành trình tiếp theo?"} />
    </>
  );
}

function HotelDemo({ template }: { template: TemplateItem }) {
  const playful = template.slug.includes("sunday");
  const minimal = template.slug.includes("hush");
  return (
    <>
      <section className="sample-hero hotel-hero">
        <SampleNav name={template.name} cta="Đặt phòng" />
        <div className="hotel-copy"><span>{minimal ? "KYOTO · JAPAN" : playful ? "SAIGON · VIETNAM" : "NINH VÂN BAY · VIETNAM"}</span><h1>{template.tagline}</h1><p>{minimal ? "Tĩnh lặng nằm giữa thiên nhiên." : playful ? "Một nơi nhỏ xinh cho những tâm hồn thích rong chơi." : "Chạm vào thiên nhiên. Tìm lại sự bình yên."}</p><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>Khám phá khách sạn <ArrowRight /></button></div>
        <div className="booking-bar"><label><span>NHẬN PHÒNG</span><b>28 Tháng 08</b></label><label><span>TRẢ PHÒNG</span><b>31 Tháng 08</b></label><label><span>KHÁCH</span><b>02 Người</b></label><button onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}>Kiểm tra phòng</button></div>
      </section>
      <section className="hotel-intro sample-content" id="about"><span>CHÀO MỪNG ĐẾN {template.name.toUpperCase()}</span><h2>{playful ? "Ngủ ngon, chơi vui, sống chậm." : minimal ? "Ít hơn, nhưng sâu hơn." : "Một kỳ nghỉ được tạo nên từ những điều tinh tế."}</h2><p>Mỗi không gian đều được chăm chút để bạn có thể thả lỏng, tận hưởng và mang về những ký ức thật đẹp.</p></section>
      <section className="room-section sample-content" id="service"><div className="sample-section-title"><span>PHÒNG & SUITE</span><h2>Chọn không gian của bạn</h2></div><div className="room-grid"><div className="main-room room-image"><span>01 / SUITE</span><h3>{minimal ? "Garden Room" : playful ? "The Pink Room" : "Ocean Pool Villa"}</h3><p>{minimal ? "Từ ¥26.000 / đêm" : playful ? "Từ 1.450.000đ / đêm" : "Từ 6.500.000đ / đêm"}</p></div><div className="room-side"><div><BedDouble /><b>Giường King</b><span>2 khách</span></div><div><Sparkles /><b>Tiện nghi riêng</b><span>Đầy đủ dịch vụ</span></div><button onClick={() => document.getElementById("options")?.scrollIntoView({ behavior: "smooth" })}>Xem tất cả phòng <ArrowRight /></button></div></div></section>
      <section className="hotel-experience">
        <div className="experience-copy"><span>TRẢI NGHIỆM</span><h2>Một ngày thật chậm, chỉ dành cho bạn.</h2><p>Từ bữa sáng bên vườn đến buổi chiều thư giãn tại hồ bơi, mọi khoảnh khắc đều được chuẩn bị với sự tận tâm.</p><button onClick={() => document.getElementById("guide")?.scrollIntoView({ behavior: "smooth" })}>Khám phá trải nghiệm <ArrowRight /></button></div>
        <div className="experience-gallery"><div className="exp-image exp-one" /><div className="exp-image exp-two" /></div>
      </section>
      <section className="hotel-amenities sample-content"><div className="sample-section-title"><span>TIỆN ÍCH</span><h2>Mọi thứ bạn cần,<br />ngay trong tầm tay.</h2></div><div className="amenity-grid"><article><Waves /><b>Hồ bơi</b><span>06:00 — 22:00</span></article><article><Coffee /><b>Bữa sáng</b><span>Phục vụ mỗi ngày</span></article><article><Wifi /><b>Wi-Fi tốc độ cao</b><span>Miễn phí toàn khuôn viên</span></article><article><MapPin /><b>Đưa đón sân bay</b><span>Đặt trước 24 giờ</span></article></div></section>
      <section className="hotel-testimonial"><Quote /><blockquote>“Một nơi khiến chúng tôi muốn quay lại ngay khi vừa rời đi.”</blockquote><div><span>★★★★★</span><b>THẢO & MINH · HÀ NỘI</b></div></section>
      <section className="hotel-location sample-content"><div className="location-map"><i>●</i><span>{minimal ? "KYOTO" : playful ? "SAIGON" : "NINH VÂN BAY"}</span></div><div><span>VỊ TRÍ</span><h2>Ẩn mình vừa đủ,<br />gần gũi vừa hay.</h2><p>{minimal ? "Khám phá Kyoto với cẩm nang đi bộ và hướng dẫn di chuyển từ lễ tân." : playful ? "Một điểm dừng giữa Sài Gòn, gần những quán cà phê và góc phố thú vị." : "Tọa lạc bên vịnh Ninh Vân. Liên hệ để sắp xếp xe từ sân bay và chuyến tàu đến resort."}</p><a href="#inquiry">Hỏi về di chuyển <ArrowUpRight /></a></div></section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line="Kỳ nghỉ của bạn bắt đầu tại đây." />
    </>
  );
}

function AdvertisingDemo({ template }: { template: TemplateItem }) {
  const loud = template.slug.includes("loud");
  const halo = template.slug.includes("halo");
  return (
    <>
      <section className="sample-hero advertising-hero"><SampleNav name={template.name} cta="Gửi brief" /><div className="ad-orb" /><div className="ad-copy"><span>{loud ? "CREATIVE AGENCY · SAIGON" : halo ? "GROWTH MARKETING STUDIO" : "INDEPENDENT BRAND STUDIO"}</span><h1>{template.tagline}</h1><p>{loud ? "Ý tưởng lớn. Thiết kế táo bạo. Kết quả thật." : halo ? "Kết hợp dữ liệu, sáng tạo và công nghệ để thương hiệu tăng trưởng bền vững." : "Chúng tôi xây dựng những thương hiệu có cá tính và câu chuyện đáng nhớ."}</p><button onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}>Bắt đầu dự án <ArrowRight /></button></div><div className="ad-stats"><div><strong>48+</strong><span>THƯƠNG HIỆU</span></div><div><strong>120%</strong><span>TĂNG TRƯỞNG TB.</span></div><div><strong>08</strong><span>GIẢI THƯỞNG</span></div></div></section>
      <section className="ad-work sample-content"><div className="sample-section-title"><span>DỰ ÁN TIÊU BIỂU</span><h2>Công việc nói thay lời.</h2><a href="#options">Xem tất cả <ArrowRight /></a></div><div className="ad-projects"><article><div className="ad-project-art art-one"><span>01</span><b>{loud ? "ĐẬM" : halo ? "GROW" : "FORM"}</b></div><small>BRANDING · CAMPAIGN</small><h3>{loud ? "Bia Sài Gòn — Chất đường phố" : halo ? "Finverse — Go beyond" : "Mộc Nhiên — Made slowly"}</h3></article><article><div className="ad-project-art art-two"><span>02</span><b>{loud ? "CHƠI" : halo ? "MOVE" : "MUSE"}</b></div><small>DIGITAL · EXPERIENCE</small><h3>{loud ? "Deli — Ăn vui mỗi ngày" : halo ? "Movee — The new commute" : "An Nam — A quiet story"}</h3></article></div></section>
      <section className="ad-services" id="service"><div className="ad-service-intro"><span>CHÚNG TÔI LÀM GÌ?</span><h2>Ý tưởng tốt cần<br />đúng cách để tỏa sáng.</h2><p>Từ chiến lược đến triển khai, đội ngũ cùng bạn tạo ra một thương hiệu nhất quán và có sức ảnh hưởng.</p></div><div className="ad-service-list">{[["01", "Chiến lược thương hiệu", "Định vị · Kiến trúc · Giọng nói"], ["02", "Nhận diện & thiết kế", "Brand identity · Art direction"], ["03", "Website & trải nghiệm số", "UI/UX · Development · Motion"], ["04", "Chiến dịch truyền thông", "Creative · Social · Performance"]].map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><ArrowUpRight /></article>)}</div></section>
      <section className="ad-process sample-content" id="about"><div className="sample-section-title"><span>QUY TRÌNH</span><h2>Từ câu hỏi đúng<br />đến kết quả thật.</h2></div><div className="ad-process-grid">{[["01", "Khám phá", "Lắng nghe mục tiêu, tìm hiểu khách hàng và bối cảnh thị trường."], ["02", "Định hình", "Xây chiến lược, concept và hệ thống sáng tạo phù hợp."], ["03", "Sáng tạo", "Thiết kế, thử nghiệm và hoàn thiện từng điểm chạm."], ["04", "Ra mắt", "Đồng hành triển khai, đo lường và tiếp tục tối ưu."]].map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div></section>
      <section className="ad-quote"><Quote /><blockquote>“Không chỉ đẹp hơn — thương hiệu của chúng tôi cuối cùng đã có một tiếng nói thật sự.”</blockquote><div><b>MAI PHƯƠNG</b><span>MARKETING DIRECTOR · NEO GROUP</span></div></section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line={loud ? "Làm một thứ thật ồn ào nhé?" : halo ? "Sẵn sàng tăng trưởng?" : "Tạo nên điều đáng nhớ."} />
    </>
  );
}

function DemoFooter({ name, line }: { name: string; line: string }) {
  return (
    <footer className="demo-footer" id="contact">
      <div className="footer-cta"><span>HẸN GẶP BẠN TẠI {name.toUpperCase()}</span><h2>{line}</h2><a href="#inquiry">Li?n h? v?i {name} <ArrowUpRight /></a></div>
      <div className="footer-bottom"><b>{name}<i>.</i></b><div><a href="#about">Giới thiệu</a><a href="#options">Danh mục</a><a href="#policies">Chính sách</a></div><small>© 2026 · ALL RIGHTS RESERVED</small></div>
    </footer>
  );
}
