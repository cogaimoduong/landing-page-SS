"use client";

import type { TemplateItem } from "@/lib/templates";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BedDouble,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Coffee,
  Headphones,
  Menu,
  MapPin,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Wifi,
} from "lucide-react";
import type { CSSProperties } from "react";

export function DemoSite({ template }: { template: TemplateItem }) {
  const style = {
    "--sample-tone": template.tone,
    "--sample-accent": template.accent,
    "--sample-dark": template.dark,
    "--sample-image": template.image ? `url(${template.image})` : "none",
  } as CSSProperties;

  return (
    <main
      className={`sample-site ${template.category} ${template.slug}`}
      style={style}
      onClick={(event) => event.preventDefault()}
    >
      {template.category === "rental" && <RentalDemo template={template} />}
      {template.category === "hotel" && <HotelDemo template={template} />}
      {template.category === "management" && <ManagementDemo template={template} />}
      {template.category === "advertising" && <AdvertisingDemo template={template} />}
    </main>
  );
}

function SampleNav({ name, cta = "Đặt ngay" }: { name: string; cta?: string }) {
  return (
    <nav className="sample-nav">
      <a href="#" className="sample-brand">{name}<i>.</i></a>
      <div className="sample-links"><a href="#about">Giới thiệu</a><a href="#service">Dịch vụ</a><a href="#contact">Liên hệ</a></div>
      <button className="sample-nav-cta">{cta} <ArrowRight /></button>
      <button className="sample-menu" aria-label="Menu"><Menu /></button>
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
          <button><Search /> <span>Tìm ngay</span></button>
        </div>
      </section>
      <section className="sample-content" id="service">
        <div className="sample-section-title"><span>ĐƯỢC YÊU THÍCH</span><h2>{isCar ? "Chọn xe cho chuyến đi" : isHome ? "Ở đâu cũng thấy như nhà" : "Thiết bị được thuê nhiều"}</h2><a href="#">Xem tất cả <ArrowRight /></a></div>
        <div className="rental-cards">
          {["Lựa chọn 01", "Lựa chọn 02", "Lựa chọn 03"].map((name, index) => <article key={name}><div className={`rental-image image-${index + 1}`}><span>{index === 0 ? "NỔI BẬT" : "CÒN TRỐNG"}</span></div><small>{isCar ? "TỰ ĐỘNG · 4 CHỖ" : isHome ? "2 KHÁCH · 1 PHÒNG" : "THEO NGÀY / THÁNG"}</small><h3>{isCar ? ["Porsche 911", "Mercedes GLC", "Mini Cooper"][index] : isHome ? ["Pine Hill House", "The Garden Loft", "Coastal Home"][index] : ["Máy xúc Komatsu", "Xe nâng Toyota", "Máy phát điện"][index]}</h3><p>Từ <b>{["1.200.000đ", "890.000đ", "650.000đ"][index]}</b> / ngày</p></article>)}
        </div>
      </section>
      <section className="sample-banner"><span>ĐƠN GIẢN · MINH BẠCH · NHANH CHÓNG</span><h2>Thuê trong 3 bước.</h2><div><b>01 <small>Chọn sản phẩm</small></b><b>02 <small>Chọn thời gian</small></b><b>03 <small>Nhận và sử dụng</small></b></div></section>
      <section className="rental-benefits sample-content">
        <div className="sample-section-title"><span>VÌ SAO CHỌN {template.name.toUpperCase()}</span><h2>An tâm từ lúc đặt<br />đến khi hoàn trả.</h2></div>
        <div className="benefit-grid">
          <article><ShieldCheck /><b>{isCar ? "Bảo hiểm đầy đủ" : isHome ? "Chỗ ở xác thực" : "Thiết bị kiểm định"}</b><p>Mọi sản phẩm đều được kiểm tra kỹ trước khi bàn giao đến bạn.</p></article>
          <article><Clock3 /><b>Hỗ trợ đúng giờ</b><p>Quy trình rõ ràng, giao nhận nhanh và không có chi phí bất ngờ.</p></article>
          <article><Headphones /><b>Đồng hành 24/7</b><p>Đội ngũ luôn sẵn sàng hỗ trợ trong suốt thời gian thuê.</p></article>
        </div>
      </section>
      <section className="rental-story">
        <div className="story-photo" />
        <div className="story-copy"><span>CÂU CHUYỆN KHÁCH HÀNG</span><Quote /><blockquote>“Mọi thứ nhanh hơn mình nghĩ. Chỉ vài phút là đặt xong, nhận đúng thứ cần và được hỗ trợ rất nhiệt tình.”</blockquote><b>HOÀNG NAM · KHÁCH HÀNG TỪ 2024</b><div><button>←</button><button>→</button></div></div>
      </section>
      <section className="sample-faq sample-content">
        <div><span>CÂU HỎI THƯỜNG GẶP</span><h2>Bạn hỏi,<br />tụi mình trả lời.</h2><p>Chưa tìm thấy câu trả lời? Đội ngũ hỗ trợ luôn sẵn sàng.</p><button>Liên hệ hỗ trợ <ArrowUpRight /></button></div>
        <div className="faq-list">{["Tôi cần chuẩn bị giấy tờ gì?", "Có thể thay đổi thời gian thuê không?", "Chi phí đã bao gồm những gì?", "Chính sách hủy và hoàn tiền ra sao?"].map((question, index) => <article key={question}><span>0{index + 1}</span><b>{question}</b><Plus /></article>)}</div>
      </section>
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
        <div className="hotel-copy"><span>{minimal ? "KYOTO · JAPAN" : playful ? "SAIGON · VIETNAM" : "NINH VÂN BAY · VIETNAM"}</span><h1>{template.tagline}</h1><p>{minimal ? "Tĩnh lặng nằm giữa thiên nhiên." : playful ? "Một nơi nhỏ xinh cho những tâm hồn thích rong chơi." : "Chạm vào thiên nhiên. Tìm lại sự bình yên."}</p><button>Khám phá khách sạn <ArrowRight /></button></div>
        <div className="booking-bar"><label><span>NHẬN PHÒNG</span><b>28 Tháng 08</b></label><label><span>TRẢ PHÒNG</span><b>31 Tháng 08</b></label><label><span>KHÁCH</span><b>02 Người</b></label><button>Kiểm tra phòng</button></div>
      </section>
      <section className="hotel-intro sample-content"><span>CHÀO MỪNG ĐẾN {template.name.toUpperCase()}</span><h2>{playful ? "Ngủ ngon, chơi vui, sống chậm." : minimal ? "Ít hơn, nhưng sâu hơn." : "Một kỳ nghỉ được tạo nên từ những điều tinh tế."}</h2><p>Mỗi không gian đều được chăm chút để bạn có thể thả lỏng, tận hưởng và mang về những ký ức thật đẹp.</p></section>
      <section className="room-section sample-content"><div className="sample-section-title"><span>PHÒNG & SUITE</span><h2>Chọn không gian của bạn</h2></div><div className="room-grid"><div className="main-room room-image"><span>01 / SUITE</span><h3>{minimal ? "Garden Room" : playful ? "The Pink Room" : "Ocean Pool Villa"}</h3><p>Từ 2.800.000đ / đêm</p></div><div className="room-side"><div><BedDouble /><b>Giường King</b><span>2 khách</span></div><div><Sparkles /><b>Tiện nghi riêng</b><span>Đầy đủ dịch vụ</span></div><button>Xem tất cả phòng <ArrowRight /></button></div></div></section>
      <section className="hotel-experience">
        <div className="experience-copy"><span>TRẢI NGHIỆM</span><h2>Một ngày thật chậm, chỉ dành cho bạn.</h2><p>Từ bữa sáng bên vườn đến buổi chiều thư giãn tại hồ bơi, mọi khoảnh khắc đều được chuẩn bị với sự tận tâm.</p><button>Khám phá trải nghiệm <ArrowRight /></button></div>
        <div className="experience-gallery"><div className="exp-image exp-one" /><div className="exp-image exp-two" /></div>
      </section>
      <section className="hotel-amenities sample-content"><div className="sample-section-title"><span>TIỆN ÍCH</span><h2>Mọi thứ bạn cần,<br />ngay trong tầm tay.</h2></div><div className="amenity-grid"><article><Waves /><b>Hồ bơi</b><span>06:00 — 22:00</span></article><article><Coffee /><b>Bữa sáng</b><span>Phục vụ mỗi ngày</span></article><article><Wifi /><b>Wi-Fi tốc độ cao</b><span>Miễn phí toàn khuôn viên</span></article><article><MapPin /><b>Đưa đón sân bay</b><span>Đặt trước 24 giờ</span></article></div></section>
      <section className="hotel-testimonial"><Quote /><blockquote>“Một nơi khiến chúng tôi muốn quay lại ngay khi vừa rời đi.”</blockquote><div><span>★★★★★</span><b>THẢO & MINH · HÀ NỘI</b></div></section>
      <section className="hotel-location sample-content"><div className="location-map"><i>●</i><span>{minimal ? "KYOTO" : playful ? "SAIGON" : "NINH VÂN BAY"}</span></div><div><span>VỊ TRÍ</span><h2>Ẩn mình vừa đủ,<br />gần gũi vừa hay.</h2><p>Chúng tôi cách trung tâm khoảng 20 phút và luôn sẵn sàng hỗ trợ bạn lên kế hoạch khám phá địa phương.</p><button>Chỉ đường <ArrowUpRight /></button></div></section>
      <DemoFooter name={template.name} line="Kỳ nghỉ của bạn bắt đầu tại đây." />
    </>
  );
}

function ManagementDemo({ template }: { template: TemplateItem }) {
  const crm = template.slug.includes("orbit");
  const store = template.slug.includes("minto");
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar"><div className="dashboard-logo">{template.name}<i>.</i></div><nav><a className="active"><BarChart3 /> Tổng quan</a><a><Users /> {crm ? "Khách hàng" : store ? "Đơn hàng" : "Nhóm của tôi"}</a><a><CalendarDays /> Lịch làm việc</a><a><CheckCircle2 /> Công việc</a></nav><div className="sidebar-user"><CircleUserRound /><span><b>Minh Anh</b><small>Quản trị viên</small></span><ChevronDown /></div></aside>
      <section className="dashboard-main"><header><div><small>THỨ BA, 25 THÁNG 08</small><h1>Chào buổi sáng, Minh Anh!</h1></div><div><button><Search /></button><button><Bell /></button><span>MA</span></div></header><div className="dashboard-tabs"><b>Tổng quan</b><span>Báo cáo</span><span>Hiệu suất</span><button>+ Tạo mới</button></div><div className="metric-grid">{[[store ? "Doanh thu" : crm ? "Doanh số" : "Công việc hoàn thành", "128,4M", "+12.5%"], [store ? "Đơn hàng" : crm ? "Khách hàng mới" : "Thời gian trung bình", "1.284", "+8.2%"], [store ? "Sản phẩm" : crm ? "Tỷ lệ chuyển đổi" : "Thành viên", "86.4%", "+4.1%"]].map(item => <article key={item[0]}><span>{item[0]}</span><strong>{item[1]}</strong><small>{item[2]} so với tháng trước</small></article>)}</div><div className="dashboard-grid"><article className="chart-panel"><div><h2>{crm ? "Doanh số theo tháng" : store ? "Tổng quan doanh thu" : "Tiến độ dự án"}</h2><button>6 tháng <ChevronDown /></button></div><div className="fake-chart">{[42, 60, 48, 78, 66, 92, 74, 100].map((height, i) => <i style={{ height: `${height}%` }} key={i} />)}</div><div className="chart-labels"><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span></div></article><article className="activity-panel"><h2>Hoạt động gần đây</h2>{["Đơn hàng mới được tạo", "Khách hàng vừa cập nhật", "Nhiệm vụ đã hoàn thành", "Báo cáo tuần đã sẵn sàng"].map((text, index) => <div key={text}><i>{index + 1}</i><p><b>{text}</b><span>{index + 2} phút trước</span></p></div>)}</article></div>
        <article className="data-table-panel"><div className="table-head"><div><h2>{store ? "Đơn hàng mới nhất" : crm ? "Cơ hội đang theo dõi" : "Công việc ưu tiên"}</h2><span>Dữ liệu cập nhật vài giây trước</span></div><button>Xem tất cả <ArrowRight /></button></div><div className="data-table"><div className="table-row labels"><span>MÃ</span><span>{store ? "KHÁCH HÀNG" : crm ? "CƠ HỘI" : "CÔNG VIỆC"}</span><span>PHỤ TRÁCH</span><span>GIÁ TRỊ</span><span>TRẠNG THÁI</span></div>{[["#1048", store ? "Nguyễn Hoàng" : crm ? "Website Alpha" : "Hoàn thiện UI", "Minh Anh", "24.800.000đ", "Đang xử lý"], ["#1047", store ? "Lê Thanh Hà" : crm ? "Nova Retail" : "Kiểm thử mobile", "Quang Huy", "18.200.000đ", "Đã xác nhận"], ["#1046", store ? "Trần Gia Bảo" : crm ? "Mộc Studio" : "Bàn giao nội dung", "Thảo Vy", "12.500.000đ", "Chờ duyệt"], ["#1045", store ? "Phạm Minh Tâm" : crm ? "Sun Hospitality" : "Phân tích dữ liệu", "Hải Nam", "9.800.000đ", "Hoàn thành"]].map(row => <div className="table-row" key={row[0]}>{row.map((cell, index) => <span key={cell} className={index === 4 ? "status-pill" : ""}>{cell}</span>)}</div>)}</div></article>
      </section>
    </div>
  );
}

function AdvertisingDemo({ template }: { template: TemplateItem }) {
  const loud = template.slug.includes("loud");
  const halo = template.slug.includes("halo");
  return (
    <>
      <section className="sample-hero advertising-hero"><SampleNav name={template.name} cta="Gửi brief" /><div className="ad-orb" /><div className="ad-copy"><span>{loud ? "CREATIVE AGENCY · SAIGON" : halo ? "GROWTH MARKETING STUDIO" : "INDEPENDENT BRAND STUDIO"}</span><h1>{template.tagline}</h1><p>{loud ? "Ý tưởng lớn. Thiết kế táo bạo. Kết quả thật." : halo ? "Kết hợp dữ liệu, sáng tạo và công nghệ để thương hiệu tăng trưởng bền vững." : "Chúng tôi xây dựng những thương hiệu có cá tính và câu chuyện đáng nhớ."}</p><button>Bắt đầu dự án <ArrowRight /></button></div><div className="ad-stats"><div><strong>48+</strong><span>THƯƠNG HIỆU</span></div><div><strong>120%</strong><span>TĂNG TRƯỞNG TB.</span></div><div><strong>08</strong><span>GIẢI THƯỞNG</span></div></div></section>
      <section className="ad-work sample-content"><div className="sample-section-title"><span>DỰ ÁN TIÊU BIỂU</span><h2>Công việc nói thay lời.</h2><a href="#">Xem tất cả <ArrowRight /></a></div><div className="ad-projects"><article><div className="ad-project-art art-one"><span>01</span><b>{loud ? "ĐẬM" : halo ? "GROW" : "FORM"}</b></div><small>BRANDING · CAMPAIGN</small><h3>{loud ? "Bia Sài Gòn — Chất đường phố" : halo ? "Finverse — Go beyond" : "Mộc Nhiên — Made slowly"}</h3></article><article><div className="ad-project-art art-two"><span>02</span><b>{loud ? "CHƠI" : halo ? "MOVE" : "MUSE"}</b></div><small>DIGITAL · EXPERIENCE</small><h3>{loud ? "Deli — Ăn vui mỗi ngày" : halo ? "Movee — The new commute" : "An Nam — A quiet story"}</h3></article></div></section>
      <section className="ad-services"><div className="ad-service-intro"><span>CHÚNG TÔI LÀM GÌ?</span><h2>Ý tưởng tốt cần<br />đúng cách để tỏa sáng.</h2><p>Từ chiến lược đến triển khai, đội ngũ cùng bạn tạo ra một thương hiệu nhất quán và có sức ảnh hưởng.</p></div><div className="ad-service-list">{[["01", "Chiến lược thương hiệu", "Định vị · Kiến trúc · Giọng nói"], ["02", "Nhận diện & thiết kế", "Brand identity · Art direction"], ["03", "Website & trải nghiệm số", "UI/UX · Development · Motion"], ["04", "Chiến dịch truyền thông", "Creative · Social · Performance"]].map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><ArrowUpRight /></article>)}</div></section>
      <section className="ad-process sample-content"><div className="sample-section-title"><span>QUY TRÌNH</span><h2>Từ câu hỏi đúng<br />đến kết quả thật.</h2></div><div className="ad-process-grid">{[["01", "Khám phá", "Lắng nghe mục tiêu, tìm hiểu khách hàng và bối cảnh thị trường."], ["02", "Định hình", "Xây chiến lược, concept và hệ thống sáng tạo phù hợp."], ["03", "Sáng tạo", "Thiết kế, thử nghiệm và hoàn thiện từng điểm chạm."], ["04", "Ra mắt", "Đồng hành triển khai, đo lường và tiếp tục tối ưu."]].map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div></section>
      <section className="ad-quote"><Quote /><blockquote>“Không chỉ đẹp hơn — thương hiệu của chúng tôi cuối cùng đã có một tiếng nói thật sự.”</blockquote><div><b>MAI PHƯƠNG</b><span>MARKETING DIRECTOR · NEO GROUP</span></div></section>
      <DemoFooter name={template.name} line={loud ? "Làm một thứ thật ồn ào nhé?" : halo ? "Sẵn sàng tăng trưởng?" : "Tạo nên điều đáng nhớ."} />
    </>
  );
}

function DemoFooter({ name, line }: { name: string; line: string }) {
  return (
    <footer className="demo-footer" id="contact">
      <div className="footer-cta"><span>CÓ MỘT Ý TƯỞNG?</span><h2>{line}</h2><button>hello@{name.toLowerCase().replaceAll(" ", "")}.vn <ArrowUpRight /></button></div>
      <div className="footer-bottom"><b>{name}<i>.</i></b><div><span>Giới thiệu</span><span>Dịch vụ</span><span>Liên hệ</span></div><small>© 2026 · ALL RIGHTS RESERVED</small></div>
    </footer>
  );
}
