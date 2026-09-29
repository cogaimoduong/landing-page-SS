"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  Mail,
  MapPin,
  Menu,
  MoveRight,
  Phone,
  Play,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import type { TemplateItem } from "@/lib/templates";
import "./project-website-showcase.css";

type WebsiteKind = "kinetic" | "vista" | "evermore" | "form";

const kindBySlug: Record<string, WebsiteKind> = {
  "kinetic-creative-studio": "kinetic",
  "vista-virtual-tour": "vista",
  "evermore-invitation": "evermore",
  "form-architecture": "form",
};

type NavItem = { label: string; href: string };

function WebsiteNav({ name, items, cta, ctaHref }: { name: string; items: NavItem[]; cta: string; ctaHref: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="pws-nav">
      <a className="pws-brand" href="#top" aria-label={`${name} - trang chủ`}>{name}<i>.</i></a>
      <nav className={open ? "is-open" : ""} aria-label="Điều hướng chính">
        {items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <a className="pws-nav-cta" href={ctaHref}>{cta} <ArrowUpRight size={15} /></a>
      <button className="pws-menu" type="button" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} onClick={() => setOpen(!open)}><Menu size={21} /></button>
    </header>
  );
}

function SiteFooter({ name, note, tone = "light" }: { name: string; note: string; tone?: "light" | "dark" }) {
  return <footer className={`pws-footer pws-footer--${tone}`}>
    <a href="#top" className="pws-brand">{name}<i>.</i></a>
    <p>{note}</p>
    <small>© 2026 · All rights reserved</small>
  </footer>;
}

function KineticStudio({ template }: { template: TemplateItem }) {
  const works = [
    { id: "01", name: "Afterglow", type: "CGI film / launch", mark: "A/G", copy: "Một thế giới ánh sáng chuyển động cho chiến dịch ra mắt bộ sưu tập mới.", stat: "3.2M lượt xem trong 14 ngày" },
    { id: "02", name: "Luma Objects", type: "Identity / e-commerce", mark: "L/O", copy: "Nhận diện số giúp một thương hiệu vật thể đương đại kể chuyện bằng nhịp độ riêng.", stat: "+41% thời gian khám phá bộ sưu tập" },
    { id: "03", name: "Field Notes", type: "Editorial / motion", mark: "F/N", copy: "Hệ thống hình ảnh linh hoạt cho những lát cắt về con người, vật liệu và không gian.", stat: "18 nội dung chuyển động được sản xuất" },
  ];
  const [active, setActive] = useState(0);
  const work = works[active];

  return <main className="project-website-showcase pws-kinetic" id="top">
    <WebsiteNav name={template.name} items={[{ label: "Dự án", href: "#work" }, { label: "Dịch vụ", href: "#services" }, { label: "Studio", href: "#studio" }]} cta="Bắt đầu dự án" ctaHref="#contact" />
    <section className="pws-kinetic-hero">
      <div className="pws-kinetic-orb pws-orb-one" /><div className="pws-kinetic-orb pws-orb-two" />
      <div className="pws-hero-copy">
        <span className="pws-kicker"><Sparkles size={14} /> CREATIVE STUDIO · SAIGON / EVERYWHERE</span>
        <h1>Biến ý tưởng<br /><em>thành cảm giác.</em></h1>
        <p>Kinetic Studio tạo nên hình ảnh, chuyển động và trải nghiệm số cho những thương hiệu muốn được nhớ lâu hơn một lần lướt qua.</p>
        <div className="pws-hero-actions"><a href="#work" className="pws-button pws-button--light">Xem dự án <ArrowRight size={17} /></a><button type="button" className="pws-play" onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}><Play size={14} fill="currentColor" /> Xem showreel 01:24</button></div>
      </div>
      <div className="pws-kinetic-hero-art" style={{ backgroundImage: `linear-gradient(145deg, #0b0c1226, #0b0c12a8), url(${template.image})` }}>
        <span>DESIGN WITH<br />A PULSE</span><i>KS</i><small>FRAME 01 / 03</small>
      </div>
    </section>
    <div className="pws-marquee" aria-hidden="true"><div>KINETIC STUDIO <i>✦</i> BRAND WORLDS <i>✦</i> MOTION WITH MEANING <i>✦</i> KINETIC STUDIO <i>✦</i> BRAND WORLDS <i>✦</i></div></div>
    <section className="pws-kinetic-work" id="work">
      <div className="pws-section-head pws-section-head--dark"><span>01 / SELECTED WORK</span><h2>Không chỉ để nhìn.<br />Để <em>cảm</em> thấy.</h2><p>Mỗi dự án bắt đầu từ một điều thương hiệu cần khiến người khác tin, nhớ hoặc muốn làm.</p></div>
      <div className="pws-work-layout">
        <div className="pws-work-list">{works.map((item, index) => <button type="button" className={active === index ? "is-active" : ""} aria-pressed={active === index} key={item.id} onClick={() => setActive(index)}><span>{item.id}</span><b>{item.name}</b><small>{item.type}</small><ChevronRight size={18} /></button>)}</div>
        <article className="pws-active-work">
          <div className={`pws-work-art pws-work-art--${active}`}><span>{work.type}</span><strong>{work.mark}</strong><i>{work.id}</i></div>
          <div><span>CASE STUDY / {work.id}</span><h3>{work.name}</h3><p>{work.copy}</p><b>{work.stat}</b><a href="#contact">Xem câu chuyện đầy đủ <ArrowUpRight size={16} /></a></div>
        </article>
      </div>
    </section>
    <section className="pws-kinetic-services" id="services">
      <div><span>02 / WHAT WE DO</span><h2>Một ý tưởng tốt cần đúng hình thức để đi xa.</h2></div>
      <div className="pws-kinetic-service-grid">{[
        ["01", "Brand worlds", "Chiến lược, định vị và hệ thống hình ảnh để thương hiệu có một thế giới riêng."],
        ["02", "Digital experiences", "Website, tương tác và sản phẩm số được xây dựng từ hành vi thật của người xem."],
        ["03", "Motion & CGI", "Chuyển động tạo nhịp điệu, từ phim ra mắt đến những chi tiết khiến giao diện sống động."],
      ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={19} /></article>)}</div>
    </section>
    <section className="pws-studio-note" id="studio"><div><span>03 / THE STUDIO</span><Quote size={34} /><blockquote>“Chúng tôi không trang trí một câu chuyện. Chúng tôi tìm ra nhịp điệu đã có sẵn trong nó.”</blockquote><b>LAN ANH · CREATIVE DIRECTOR</b></div><div className="pws-studio-figures"><strong>12</strong><span>người làm hình ảnh, chữ, chuyển động và công nghệ cùng một bàn</span><strong>06</strong><span>quốc gia nơi dự án của khách hàng đã chạm tới</span></div></section>
    <section className="pws-kinetic-contact" id="contact"><span>LET&apos;S MAKE SOMETHING THAT MOVES</span><h2>Bạn có câu chuyện.<br /><em>Ta tìm nhịp điệu.</em></h2><a href="mailto:hello@kinetic.example">hello@kinetic.example <MoveRight /></a></section>
    <SiteFooter name={template.name} note="Independent creative studio for brands in motion." tone="dark" />
  </main>;
}

function VistaTour({ template }: { template: TemplateItem }) {
  const spaces = [
    { title: "Bất động sản", label: "01 / PROPERTY", copy: "Đưa người xem đi qua căn nhà trước cả cuộc hẹn đầu tiên.", metric: "+28% lượt đặt lịch xem" },
    { title: "Showroom & bán lẻ", label: "02 / RETAIL", copy: "Biến mỗi điểm chạm thành một hành trình khám phá sản phẩm có định hướng.", metric: "2.4× thời gian ở lại" },
    { title: "Khách sạn & điểm đến", label: "03 / HOSPITALITY", copy: "Gợi mở cảm giác về nơi chốn bằng một chuyến tham quan không vội vã.", metric: "72% xem hết tour" },
  ];
  const [active, setActive] = useState(0);
  const space = spaces[active];

  return <main className="project-website-showcase pws-vista" id="top">
    <WebsiteNav name={template.name} items={[{ label: "Giải pháp", href: "#solutions" }, { label: "Dự án", href: "#spaces" }, { label: "Quy trình", href: "#process" }]} cta="Nhận tư vấn" ctaHref="#contact" />
    <section className="pws-vista-hero" style={{ backgroundImage: `linear-gradient(90deg, #0e2139de 0%, #0e213962 58%, #0e213927), url(${template.image})` }}>
      <div className="pws-vista-compass"><Compass /><span>360°</span></div>
      <div className="pws-vista-hero-copy"><span className="pws-kicker">VIRTUAL TOUR · 3D SCAN · INTERACTIVE SPACE</span><h1>Không gian bắt đầu<br />trước khi bạn <em>đến.</em></h1><p>Vista tạo chuyến tham quan số giàu cảm giác cho bất động sản, showroom và những nơi cần được khám phá bằng chính nhịp đi của người xem.</p><a href="#spaces" className="pws-button">Khám phá không gian <ArrowRight size={17} /></a></div>
      <div className="pws-vista-location"><MapPin size={15} /><span>KHÁM PHÁ MẪU TOUR</span><b>THE LOFT / Q.2</b><small>Kéo để bắt đầu hành trình ↗</small></div>
    </section>
    <section className="pws-vista-intro" id="solutions"><div><span>01 / A NEW WAY TO LOOK</span><h2>Một khung hình<br />không bao giờ đủ.</h2></div><p>Ảnh đẹp tạo ấn tượng. Tour tương tác tạo sự tin tưởng. Chúng tôi kết hợp scan 3D, hình ảnh và điểm chạm nội dung để người xem tự tìm câu trả lời của họ.</p><div className="pws-vista-proof"><b>360°</b><span>tự do khám phá<br />mỗi không gian</span><b>01</b><span>link dễ chia sẻ<br />trên mọi thiết bị</span></div></section>
    <section className="pws-vista-spaces" id="spaces"><div className="pws-section-head"><span>02 / BUILT FOR PLACES</span><h2>Không gian nào cũng có<br />một góc nhìn <em>riêng.</em></h2></div><div className="pws-vista-space-grid">{spaces.map((item, index) => <button type="button" className={active === index ? "is-active" : ""} key={item.title} onClick={() => setActive(index)} aria-pressed={active === index}><span>{item.label}</span><strong>{item.title}</strong><i>↗</i></button>)}</div><article className="pws-vista-space-detail"><div className={`pws-vista-space-art pws-vista-space-art--${active}`} style={{ backgroundImage: `linear-gradient(135deg, #17345144, #173451a8), url(${template.image})` }}><span>LIVE DEMO</span><button type="button" aria-label="Mở tour mẫu"><Play size={20} fill="currentColor" /></button><small>01:37 phút khám phá</small></div><div><span>{space.label}</span><h3>{space.title}</h3><p>{space.copy}</p><b>{space.metric}</b><a href="#contact">Xem giải pháp cho lĩnh vực này <ArrowUpRight size={16} /></a></div></article></section>
    <section className="pws-vista-process" id="process"><div><span>03 / HOW IT WORKS</span><h2>Từ không gian thật<br />đến trải nghiệm số.</h2></div><ol>{[
      ["01", "Khảo sát", "Xác định tuyến tham quan, điểm nhấn và câu hỏi người xem cần được giải đáp."],
      ["02", "Ghi hình & scan", "Đội ngũ ghi nhận không gian với thiết bị phù hợp, gọn gàng trong một buổi."],
      ["03", "Dựng trải nghiệm", "Kết hợp model, ảnh, bản đồ và thông tin thành tour mượt mà trên mọi màn hình."],
      ["04", "Ra mắt & đo lường", "Gắn tour vào website, chiến dịch và theo dõi hành vi để tiếp tục tối ưu."],
    ].map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
    <section className="pws-vista-testimonial"><div><span>KHÁCH HÀNG NÓI GÌ</span><blockquote>“Khách đến xem nhà đã biết họ thích gì từ trước. Cuộc hẹn vì thế chất lượng hơn hẳn.”</blockquote><b>THU NGÂN · SALES LEAD, ORCHARD LIVING</b></div><div className="pws-vista-testimonial-metric"><strong>4.9/5</strong><span><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span><small>đánh giá trải nghiệm tour</small></div></section>
    <section className="pws-vista-contact" id="contact"><span>BẮT ĐẦU TỪ MỘT KHÔNG GIAN THẬT</span><h2>Cho chúng tôi xem<br />nơi bạn muốn kể.</h2><a href="mailto:hello@vista.example">Nhận buổi tư vấn 30 phút <ArrowUpRight /></a></section>
    <SiteFooter name={template.name} note="Virtual tours that let people feel a place before arriving." />
  </main>;
}

function EvermoreInvitation({ template }: { template: TemplateItem }) {
  const [sent, setSent] = useState(false);
  const submitRsvp = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <main className="project-website-showcase pws-evermore" id="top">
    <WebsiteNav name={template.name} items={[{ label: "Câu chuyện", href: "#story" }, { label: "Ngày vui", href: "#schedule" }, { label: "Xác nhận", href: "#rsvp" }]} cta="Xác nhận tham dự" ctaHref="#rsvp" />
    <section className="pws-evermore-hero" style={{ backgroundImage: `linear-gradient(180deg, #54182a22, #54182ab5), url(${template.image})` }}><div className="pws-evermore-hero-card"><span>TRÂN TRỌNG KÍNH MỜI</span><i>H &amp; V</i><h1>Kim Hiền<br /><em>&amp;</em> Văn Tài</h1><p>12 · 11 · 2026</p><a href="#story">Cuộn để mở thiệp <ArrowRight size={16} /></a></div><small>THÀNH PHỐ HỒ CHÍ MINH · VIỆT NAM</small></section>
    <section className="pws-evermore-story" id="story"><div><span>01 / CHUYỆN CHÚNG MÌNH</span><h2>Một lời chào<br />từ ngày đầu <em>gặp gỡ.</em></h2><p>Chúng mình đã đi qua nhiều ngày bình thường thật đẹp: những cuộc hẹn trễ giờ, những chuyến đi không kế hoạch và rất nhiều lần cùng nhau chọn ở lại.</p><p>Ngày vui này sẽ trọn vẹn hơn khi có sự hiện diện của những người chúng mình yêu quý.</p><a href="#rsvp">Gửi lời chúc cho tụi mình <Heart size={16} fill="currentColor" /></a></div><div className="pws-evermore-photo-stack"><div style={{ backgroundImage: `url(${template.image})` }} /><span>TOGETHER<br />IS A BEAUTIFUL<br />PLACE TO BE</span><i>2018 — 2026</i></div></section>
    <section className="pws-evermore-countdown"><span>CHỈ CÒN</span><div><b>42<small>NGÀY</small></b><b>08<small>GIỜ</small></b><b>16<small>PHÚT</small></b></div><p>Rất mong được gặp bạn trong ngày chúng mình chính thức về chung một nhà.</p></section>
    <section className="pws-evermore-schedule" id="schedule"><div className="pws-section-head"><span>02 / LỊCH TRÌNH NGÀY VUI</span><h2>Một ngày để<br />nhớ <em>thật lâu.</em></h2></div><div className="pws-event-grid"><article><div><CalendarDays size={22} /><span>THỨ NĂM · 12.11.2026</span></div><h3>Lễ thành hôn</h3><p>08:30 — 10:00<br />Tư gia nhà gái · Quận 3, TP.HCM</p><a href="#rsvp">Xem chỉ đường <MapPin size={15} /></a></article><article className="is-featured"><div><Heart size={22} fill="currentColor" /><span>THỨ NĂM · 12.11.2026</span></div><h3>Tiệc cưới</h3><p>18:00 đón khách · 18:30 khai tiệc<br />The White Palace · 194 Hoàng Văn Thụ</p><a href="#rsvp">Lưu vào lịch <CalendarDays size={15} /></a></article><article><div><Clock3 size={22} /><span>TRANG PHỤC GỢI Ý</span></div><h3>Pastel &amp; dịu dàng</h3><p>Ưu tiên những màu nhẹ như kem, hồng phấn, xanh sage hoặc màu bạn thấy tự tin nhất.</p><a href="#rsvp">Xem bảng màu <ArrowUpRight size={15} /></a></article></div></section>
    <section className="pws-evermore-gallery"><div><span>03 / KỶ NIỆM NHỎ</span><h2>Những ngày<br />mình đã <em>đi qua.</em></h2></div><div className="pws-evermore-gallery-grid">{["N", "H", "T", "♥"].map((letter, index) => <div className={`pws-evermore-gallery-item item-${index}`} key={letter} style={{ backgroundImage: `linear-gradient(135deg, #6c263426, #6c26349c), url(${template.image})` }}><span>{letter}</span><small>{["Nha Trang · 2020", "Đà Lạt · 2022", "Sài Gòn · 2024", "Hẹn mãi về sau"][index]}</small></div>)}</div></section>
    <section className="pws-rsvp" id="rsvp"><div><span>04 / RSVP</span><h2>Sự có mặt của bạn<br />là món quà <em>quý giá.</em></h2><p>Vui lòng xác nhận trước ngày 02.11 để chúng mình chuẩn bị chu đáo cho bạn.</p><div className="pws-rsvp-contact"><Phone size={17} /><span>Hiền: 090 123 4567<br />Tài: 090 765 4321</span></div></div><form onSubmit={submitRsvp} onChange={() => setSent(false)}><label>Họ và tên<input name="name" required placeholder="Tên của bạn" /></label><label>Bạn sẽ tham dự?<select name="attendance" required defaultValue=""><option value="" disabled>Chọn một phương án</option><option>Có, mình rất vui được tham dự</option><option>Tiếc quá, mình không thể đến</option></select></label><label>Số người tham dự<select name="guests" defaultValue="1"><option>1 người</option><option>2 người</option><option>3 người</option></select></label><label>Lời chúc gửi cô dâu chú rể<textarea name="wish" rows={3} placeholder="Viết vài lời thật ấm áp…" /></label><button type="submit">Gửi xác nhận <Heart size={16} fill="currentColor" /></button>{sent && <p className="pws-form-success" role="status">Cảm ơn bạn! Tụi mình đã nhận được lời hồi đáp và rất mong gặp bạn.</p>}</form></section>
    <SiteFooter name={template.name} note="Made with love for Hiền & Tài." />
  </main>;
}

function FormArchitecture({ template }: { template: TemplateItem }) {
  const projects = [
    { title: "An Nhiên House", type: "NHÀ Ở / ĐỒNG NAI", figure: "01", detail: "Ngôi nhà mở ra khu vườn, tổ chức ánh sáng và thông gió quanh những khoảng ở chung." },
    { title: "Mộc Riverside", type: "LƯU TRÚ / BÌNH DƯƠNG", figure: "02", detail: "Một hệ không gian lưu trú nhỏ gọn, dùng vật liệu thô để đưa thiên nhiên đến gần hơn." },
    { title: "Nở Café", type: "F&B / THỦ ĐỨC", figure: "03", detail: "Không gian đa lớp cho nhịp làm việc ban ngày và những buổi gặp gỡ kéo dài về tối." },
  ];
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return <main className="project-website-showcase pws-form" id="top">
    <WebsiteNav name={template.name} items={[{ label: "Dự án", href: "#projects" }, { label: "Năng lực", href: "#expertise" }, { label: "Về chúng tôi", href: "#about" }]} cta="Trao đổi dự án" ctaHref="#contact" />
    <section className="pws-form-hero" style={{ backgroundImage: `linear-gradient(90deg, #132230c9 0%, #1322303b 68%, #13223078), url(${template.image})` }}><div><span className="pws-kicker">ARCHITECTURE · INTERIOR · CONSTRUCTION</span><h1>Không gian được tạo nên<br />có <em>chủ đích.</em></h1><p>Form Architecture đồng hành từ ý tưởng đến công trình hoàn thiện, để mỗi nơi chốn vừa đúng với đời sống, vừa bền vững cùng thời gian.</p><a className="pws-button" href="#projects">Khám phá công trình <ArrowRight size={17} /></a></div><div className="pws-form-hero-caption"><span>AN NHIÊN HOUSE</span><small>ĐỒNG NAI · 2026</small></div></section>
    <section className="pws-form-intro" id="about"><span>01 / OUR POINT OF VIEW</span><h2>Thiết kế tốt không<br />cần nói quá <em>to.</em></h2><p>Chúng tôi quan sát cách ánh sáng đi qua một buổi sáng, cách mọi người gặp nhau trong nhà và những vật liệu sẽ già đi ra sao. Những điều nhỏ ấy là nền móng của một công trình có lý do để tồn tại.</p><div><b>09</b><small>năm làm nghề<br />và học từ công trình</small><b>47</b><small>không gian đã<br />được đưa vào sử dụng</small></div></section>
    <section className="pws-form-projects" id="projects"><div className="pws-section-head pws-section-head--light"><span>02 / SELECTED PROJECTS</span><h2>Mỗi công trình là<br />một cách <em>lắng nghe.</em></h2></div><div className="pws-form-project-layout"><div className="pws-form-project-selector">{projects.map((item, index) => <button type="button" key={item.figure} className={selected === index ? "is-active" : ""} onClick={() => setSelected(index)}><span>{item.figure}</span><b>{item.title}</b><small>{item.type}</small><ArrowUpRight size={16} /></button>)}</div><article className="pws-form-project-feature"><div className={`pws-form-project-image pws-form-project-image--${selected}`} style={{ backgroundImage: `linear-gradient(135deg, #16283927, #1628398d), url(${template.image})` }}><span>{project.type}</span><strong>{project.figure}</strong></div><div><span>PROJECT {project.figure}</span><h3>{project.title}</h3><p>{project.detail}</p><ul><li><Check size={15} />Kiến trúc &amp; nội thất đồng bộ</li><li><Check size={15} />Vật liệu phù hợp khí hậu địa phương</li><li><Check size={15} />Giám sát tác giả xuyên suốt công trình</li></ul><a href="#contact">Xem hồ sơ dự án <ArrowUpRight size={16} /></a></div></article></div></section>
    <section className="pws-form-expertise" id="expertise"><div><span>03 / EXPERTISE</span><h2>Từ bản vẽ đầu tiên<br />đến ngày bật <em>đèn.</em></h2></div><div>{[
      ["Kiến trúc", "Quy hoạch mặt bằng, mặt đứng và vật liệu bắt đầu từ cách bạn muốn sống hoặc vận hành."],
      ["Nội thất", "Không gian bên trong được tổ chức nhất quán với kiến trúc, ngân sách và thói quen sử dụng."],
      ["Thi công", "Hồ sơ rõ ràng, phối hợp sát công trường và các mốc kiểm soát chất lượng có thể theo dõi."],
    ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="pws-form-process"><div><span>04 / WORKING TOGETHER</span><h2>Một quy trình rõ ràng<br />để cùng đi <em>xa.</em></h2></div><ol>{[["Lắng nghe", "Tìm hiểu khu đất, mục tiêu, ngân sách và những điều bạn không muốn thỏa hiệp."], ["Định hình", "Phát triển phương án, không gian và ngôn ngữ vật liệu phù hợp nhất."], ["Triển khai", "Hoàn thiện hồ sơ kỹ thuật, dự toán và kế hoạch phối hợp thi công."], ["Đồng hành", "Có mặt ở những cột mốc cần thiết để ý tưởng được thực hiện đúng tinh thần ban đầu."]].map(([title, copy], index) => <li key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></section>
    <section className="pws-form-quote"><Quote /><blockquote>“Đội ngũ không chỉ hiểu ngôi nhà chúng tôi muốn xây, mà còn hiểu cách gia đình muốn sống trong đó.”</blockquote><div><b>GIA ĐÌNH AN · AN NHIÊN HOUSE</b><span>ĐỒNG NAI, 2026</span></div></section>
    <section className="pws-form-contact" id="contact"><span>BẠN ĐANG CÓ MỘT KHU ĐẤT, MỘT Ý TƯỞNG?</span><h2>Hãy bắt đầu bằng<br />một cuộc <em>trò chuyện.</em></h2><a href="mailto:hello@formarchitecture.example">hello@formarchitecture.example <Mail size={18} /></a></section>
    <SiteFooter name={template.name} note="Architecture for life, work and the spaces in between." tone="dark" />
  </main>;
}

export function ProjectWebsiteShowcase({ template }: { template: TemplateItem }) {
  const kind = kindBySlug[template.slug];
  const style = {
    "--pws-accent": template.accent,
    "--pws-dark": template.dark,
    "--pws-tone": template.tone,
  } as CSSProperties;

  if (!kind) return null;
  return <div style={style}>{kind === "kinetic" ? <KineticStudio template={template} /> : kind === "vista" ? <VistaTour template={template} /> : kind === "evermore" ? <EvermoreInvitation template={template} /> : <FormArchitecture template={template} />}</div>;
}
