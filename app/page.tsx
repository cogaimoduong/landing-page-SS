"use client";

import {
  ArrowDownRight,
  ArrowRight,
  Asterisk,
  Check,
  Code2,
  ExternalLink,
  Menu,
  MoveUpRight,
  Palette,
  Quote,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    number: "01",
    type: "E-COMMERCE · 2025",
    title: "MỘC NHIÊN",
    copy: "Website bán nội thất thủ công — tối giản, ấm áp và có chút mùi gỗ.",
    color: "amber",
    mockup: "shop",
  },
  {
    number: "02",
    type: "LANDING PAGE · 2025",
    title: "KỂ STUDIO",
    copy: "Không gian số cho một studio kể chuyện thương hiệu bằng hình ảnh.",
    color: "pink",
    mockup: "studio",
  },
  {
    number: "03",
    type: "PORTFOLIO · 2024",
    title: "MINH TRÍ",
    copy: "Portfolio cá nhân cho photographer — ảnh là nhân vật chính.",
    color: "blue",
    mockup: "photo",
  },
];

const services = [
  { icon: Palette, number: "01", title: "Thiết kế giao diện", text: "Giao diện có gu, đúng cá tính thương hiệu, không dùng template đại trà." },
  { icon: Code2, number: "02", title: "Lập trình website", text: "Code sạch với Next.js, chuẩn responsive, tải nhanh và dễ mở rộng." },
  { icon: Zap, number: "03", title: "Tối ưu & chăm sóc", text: "Tối ưu SEO, tốc độ, analytics và đồng hành sau khi website lên sóng." },
];

function Logo() {
  return <a className="logo" href="#top" aria-label="Về đầu trang">web<span>dao</span><i>.</i></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <nav className="nav shell">
        <Logo />
        <button className="menu-button" aria-label="Mở menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/giao-dien" onClick={closeMenu}>Kho giao diện</Link>
          <a href="#work" onClick={closeMenu}>Dự án</a>
          <a href="#services" onClick={closeMenu}>Dịch vụ</a>
          <a href="#about" onClick={closeMenu}>Về tui</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Bắt đầu dự án <ArrowDownRight size={17} /></a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-kicker reveal"><span className="status-dot" /> NHẬN DỰ ÁN MỚI · 08/2026</div>
        <h1 className="hero-title reveal delay-1">
          TUI LÀM WEB<br />
          <span className="scribble-wrap">XỊN</span> CHO NGƯỜI
          <br />LÀM ĐIỀU <span className="good-word">TỬ TẾ<svg viewBox="0 0 280 28" aria-hidden="true"><path d="M3 18C58 4 102 26 158 14S230 6 276 17" /></svg></span>.
        </h1>
        <div className="hero-bottom reveal delay-2">
          <p>Thiết kế có gu. Code có tâm.<br />Website chạy nhanh như deadline dí.</p>
          <a className="circle-link" href="#work" aria-label="Xem các dự án"><ArrowDownRight size={31} /></a>
        </div>
        <div className="hero-sticker" aria-hidden="true"><span>ĐẸP</span><span>NHANH</span><span>MƯỢT</span><Sparkles size={22} /></div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="marquee-group" key={group}>
              <span>THIẾT KẾ CÓ GU</span><Asterisk /><span>CODE CÓ TÂM</span><Asterisk /><span>CHẠY SIÊU NHANH</span><Asterisk />
            </div>
          ))}
        </div>
      </div>

      <section className="work shell section" id="work">
        <div className="section-head">
          <div><span className="eyebrow">/ DỰ ÁN MỚI NHẤT</span><h2>Mấy chiếc web<br />tui từng làm.</h2></div>
          <p>Mỗi dự án là một câu chuyện riêng.<br />Không copy, không công thức.</p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <div className={`project-visual ${project.color}`}>
                <span className="project-number">{project.number}</span>
                <div className={`browser ${project.mockup}`}>
                  <div className="browser-top"><i /><i /><i /><b>webdao.site/{project.title.toLowerCase().replace(" ", "-")}</b></div>
                  {project.mockup === "shop" && <div className="shop-ui"><small>NỘI THẤT THỦ CÔNG</small><strong>Chạm vào<br />sự mộc mạc.</strong><button>Khám phá ngay →</button><div className="chair">◒</div></div>}
                  {project.mockup === "studio" && <div className="studio-ui"><span>KỂ</span><div><small>BRAND STORYTELLING</small><strong>Chuyện hay<br />nên được kể.</strong></div><i>✦</i></div>}
                  {project.mockup === "photo" && <div className="photo-ui"><div className="photo-card one" /><div className="photo-card two" /><strong>MINH<br />TRÍ</strong><small>PHOTOGRAPHY / SAIGON</small></div>}
                </div>
              </div>
              <div className="project-info">
                <span>{project.type}</span>
                <div><h3>{project.title}</h3><p>{project.copy}</p></div>
                <button aria-label={`Xem dự án ${project.title}`}><MoveUpRight /></button>
              </div>
            </article>
          ))}
        </div>
        <a className="text-link" href="#contact">Xem thêm dự án <ArrowRight size={17} /></a>
      </section>

      <section className="services section" id="services">
        <div className="shell">
          <div className="section-head light">
            <div><span className="eyebrow">/ TUI LÀM GÌ?</span><h2>Từ ý tưởng<br />tới website.</h2></div>
            <p>Bạn mang ý tưởng tới.<br />Phần còn lại để tui lo.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, number, title, text }) => (
              <article className="service-card" key={title}>
                <div className="service-icon"><Icon /></div><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowDownRight className="service-arrow" />
              </article>
            ))}
          </div>
          <div className="tech-line"><span>Công nghệ tui tin dùng</span><b>Next.js</b><b>React</b><b>TypeScript</b><b>Figma</b><b>Vercel</b></div>
        </div>
      </section>

      <section className="process shell section" id="about">
        <div className="section-head">
          <div><span className="eyebrow">/ LÀM VIỆC THẾ NÀO?</span><h2>Đơn giản thôi,<br />không lòng vòng.</h2></div>
        </div>
        <div className="steps">
          <div className="step"><span>01</span><div><small>LÀM QUEN</small><h3>Kể tui nghe<br />ý tưởng của bạn.</h3><p>Mình cùng ngồi lại, làm rõ mục tiêu, người dùng và những gì website cần làm.</p></div></div>
          <div className="step featured"><span>02</span><div><small>THỰC HIỆN</small><h3>Tui thiết kế<br />và viết code.</h3><p>Bạn được cập nhật thường xuyên, xem bản demo và góp ý trong suốt quá trình.</p></div><div className="spin-badge">ĐANG LÀM<br /><Code2 /></div></div>
          <div className="step"><span>03</span><div><small>LÊN SÓNG</small><h3>Bấm nút và<br />website chạy!</h3><p>Kiểm thử kỹ, hướng dẫn sử dụng và hỗ trợ tận tình sau bàn giao.</p></div></div>
        </div>
      </section>

      <section className="quote-section">
        <div className="shell quote-wrap">
          <Quote className="quote-icon" />
          <blockquote>“Làm việc với webdao rất <em>nhẹ đầu</em>. Brief một lần là hiểu, sản phẩm ra đẹp hơn cả những gì tụi mình tưởng tượng.”</blockquote>
          <div className="quote-person"><div className="avatar">YL</div><div><strong>YẾN LINH</strong><span>Founder, Kể Studio</span></div></div>
        </div>
      </section>

      <section className="pricing shell section">
        <div className="section-head">
          <div><span className="eyebrow">/ CHI PHÍ THẾ NÀO?</span><h2>Giá rõ ràng.<br />Không úp mở.</h2></div>
          <p>Mỗi dự án sẽ có báo giá chi tiết.<br />Dưới đây là mức để mình bắt đầu.</p>
        </div>
        <div className="price-grid">
          <article className="price-card"><span>LANDING PAGE</span><div className="price"><small>TỪ</small><strong>8TR</strong></div><p>Phù hợp cho chiến dịch, sản phẩm mới hoặc giới thiệu dịch vụ.</p><ul><li><Check /> 01 trang thiết kế riêng</li><li><Check /> Responsive mọi thiết bị</li><li><Check /> Tối ưu SEO & tốc độ</li><li><Check /> Bàn giao trong 7–10 ngày</li></ul><a href="#contact">Chọn gói này <ArrowRight /></a></article>
          <article className="price-card popular"><div className="popular-tag">PHỔ BIẾN NHẤT ✦</div><span>WEBSITE DOANH NGHIỆP</span><div className="price"><small>TỪ</small><strong>18TR</strong></div><p>Website đầy đủ để thương hiệu hiện diện chuyên nghiệp trên internet.</p><ul><li><Check /> 05–07 trang thiết kế riêng</li><li><Check /> CMS quản trị nội dung</li><li><Check /> Analytics & SEO cơ bản</li><li><Check /> Hỗ trợ 30 ngày sau bàn giao</li></ul><a href="#contact">Chọn gói này <ArrowRight /></a></article>
          <article className="price-card"><span>WEB THEO YÊU CẦU</span><div className="price custom"><strong>TÙY<br />ĐỘ KHÓ</strong></div><p>Dành cho ý tưởng đặc biệt cần tính năng và trải nghiệm riêng.</p><ul><li><Check /> Tư vấn giải pháp kỹ thuật</li><li><Check /> UI/UX chuyên sâu</li><li><Check /> Tích hợp tính năng riêng</li><li><Check /> Bảo trì linh hoạt</li></ul><a href="#contact">Kể tui nghe <ArrowRight /></a></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-inner">
          <span className="eyebrow">/ CÓ Ý TƯỞNG HAY?</span>
          <h2>Mình làm nó<br /><em>thành thật</em> nhé?</h2>
          <a href="mailto:hello@webdao.vn"><span>hello@webdao.vn</span><ExternalLink /></a>
          <p>Hoặc nhắn tui qua <a href="#">Messenger</a> / <a href="#">Zalo</a></p>
        </div>
        <div className="footer shell"><Logo /><span>© 2026 WEBDAO. MADE WITH ♥ IN SAIGON.</span><a href="#top">LÊN ĐẦU TRANG ↑</a></div>
      </section>
    </main>
  );
}
