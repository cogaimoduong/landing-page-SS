"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Circle,
  Command,
  Layers,
  Menu,
  Plus,
  Quote,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  homeContact,
  homeProjects,
  homeSections,
  homeServices,
  homeTestimonials,
  projectFilters,
  type ProjectFilter,
} from "@/lib/home-content";

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="dd-brand"
      href="#top"
      onClick={onClick}
      aria-label="DevDes.click — Về đầu trang"
    >
      <span className="dd-brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        DevDes<span className="dd-brand-suffix">.click</span>
      </span>
    </a>
  );
}

function ChromeSculpture() {
  return (
    <div className="dd-sculpture" aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient
            id="dd-chrome"
            x1="100"
            y1="80"
            x2="480"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset=".12" stopColor="#c4c4c4" />
            <stop offset=".23" stopColor="#242424" />
            <stop offset=".3" stopColor="#747474" />
            <stop offset=".36" stopColor="#ededed" />
            <stop offset=".43" stopColor="#fff" />
            <stop offset=".48" stopColor="#969696" />
            <stop offset=".53" stopColor="#171717" />
            <stop offset=".61" stopColor="#353535" />
            <stop offset=".67" stopColor="#b7b7b7" />
            <stop offset=".73" stopColor="#f9f9f9" />
            <stop offset=".8" stopColor="#8c8c8c" />
            <stop offset=".9" stopColor="#292929" />
            <stop offset="1" stopColor="#ddd" />
          </linearGradient>
          <linearGradient
            id="dd-edge"
            x1="120"
            y1="150"
            x2="450"
            y2="450"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset=".4" stopColor="#fff" stopOpacity="0" />
            <stop offset=".7" stopColor="#fff" stopOpacity=".7" />
            <stop offset="1" stopColor="#222" />
          </linearGradient>
          <filter id="dd-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="dd-depth" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="6" dy="15" stdDeviation="9" floodOpacity=".19" />
          </filter>
        </defs>
        <ellipse
          cx="305"
          cy="523"
          rx="135"
          ry="17"
          fill="#000"
          opacity=".16"
          filter="url(#dd-shadow)"
        />
        <g className="dd-sculpture-form" filter="url(#dd-depth)">
          <g transform="rotate(-31 300 285)">
            <rect
              x="127"
              y="132"
              width="347"
              height="302"
              rx="148"
              stroke="#5b5b5b"
              strokeWidth="77"
            />
            <rect
              x="125"
              y="126"
              width="347"
              height="302"
              rx="148"
              stroke="url(#dd-chrome)"
              strokeWidth="75"
            />
            <rect
              x="96"
              y="96"
              width="405"
              height="360"
              rx="178"
              stroke="url(#dd-edge)"
              strokeWidth="2"
            />
            <rect
              x="155"
              y="156"
              width="287"
              height="242"
              rx="118"
              stroke="url(#dd-edge)"
              strokeWidth="2"
            />
          </g>
          <g transform="rotate(43 300 282)">
            <rect
              x="236"
              y="72"
              width="128"
              height="417"
              rx="64"
              stroke="#555"
              strokeWidth="57"
            />
            <rect
              x="232"
              y="67"
              width="128"
              height="417"
              rx="64"
              stroke="url(#dd-chrome)"
              strokeWidth="55"
            />
            <rect
              x="207"
              y="42"
              width="178"
              height="467"
              rx="89"
              stroke="url(#dd-edge)"
              strokeWidth="2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`dd-dashboard ${compact ? "is-compact" : ""}`}
      aria-hidden="true"
    >
      <aside>
        <b>
          <Command size={16} /> flowdesk
        </b>
        <span className="dd-dash-current">
          <Layers size={12} /> Tổng quan
        </span>
        <span>◫ &nbsp; Dự án</span>
        <span>◷ &nbsp; Công việc</span>
        <span>♧ &nbsp; Đội ngũ</span>
        <div className="dd-dash-user">
          D
          <span>
            Design team<small>Workspace</small>
          </span>
        </div>
      </aside>
      <div className="dd-dash-main">
        <div className="dd-dash-nav">
          Workspace / Tổng quan <Circle size={13} />
        </div>
        <div className="dd-dash-heading">
          <div>
            <small>CHÀO BUỔI SÁNG, TEAM</small>
            <h4>Mọi thứ trong tầm tay.</h4>
          </div>
          <span>+ Tạo dự án</span>
        </div>
        <div className="dd-dash-stats">
          {[
            ["Dự án đang chạy", "12"],
            ["Công việc hoàn thành", "84"],
            ["Hiệu suất đội ngũ", "96%"],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>
                {value}
                <em>↗</em>
              </strong>
              <span>Tháng này</span>
            </div>
          ))}
        </div>
        <div className="dd-dash-chart">
          <div>
            <b>Tiến độ công việc</b>
            <span>
              Tuần này <ChevronDown size={9} />
            </span>
          </div>
          <div className="dd-chart-bars">
            {[42, 67, 52, 88, 65, 94, 76, 60, 82, 97, 73, 90].map(
              (height, index) => (
                <i style={{ height: `${height}%` }} key={index} />
              ),
            )}
          </div>
          <div className="dd-chart-labels">
            <span>Thứ 2</span>
            <span>Thứ 3</span>
            <span>Thứ 4</span>
            <span>Thứ 5</span>
            <span>Thứ 6</span>
          </div>
        </div>
        <div className="dd-dash-task">
          <span>
            <Check size={11} /> Thiết kế giao diện website
          </span>
          <small>Hoàn thành</small>
          <b>JD</b>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "flowdesk")
    return (
      <div className="dd-flowdesk-scene">
        <span className="dd-scene-label">LESS BUSYWORK. MORE FLOW.</span>
        <Dashboard />
        <span className="dd-scene-caption">Designed for a better workday.</span>
      </div>
    );
  if (visual === "muse")
    return (
      <div className="dd-muse-scene">
        <div className="dd-muse-top">
          <b>muse®</b>
          <span>INDEPENDENT DESIGN STUDIO</span>
          <ArrowUpRight size={22} />
        </div>
        <div className="dd-muse-body">
          <span>
            Good things
            <br />
            take <em>shape.</em>
          </span>
          <div className="dd-muse-shape">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="dd-muse-bottom">
          <span>STRATEGY. IDENTITY. DIGITAL.</span>
          <span>© MUSE STUDIO</span>
        </div>
      </div>
    );
  if (visual === "minto")
    return (
      <div className="dd-minto-scene">
        <span className="dd-minto-word">
          minto<span>®</span>
        </span>
        <div className="dd-phone">
          <div className="dd-phone-island" />
          <div className="dd-phone-top">
            9:41 <span>••• ▰</span>
          </div>
          <div className="dd-phone-greeting">
            <span>Xin chào, Minh 👋</span>
            <b>Cửa hàng của bạn.</b>
          </div>
          <div className="dd-phone-balance">
            <span>Doanh thu hôm nay</span>
            <strong>
              12.580.000<small>đ</small>
            </strong>
            <em>↗ 18,6% so với hôm qua</em>
            <div className="dd-phone-graph">
              {[26, 44, 33, 55, 42, 70, 56, 84, 68, 98].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="dd-phone-numbers">
            <span>
              Đơn hàng<b>48</b>
            </span>
            <span>
              Sản phẩm<b>126</b>
            </span>
          </div>
          <div className="dd-phone-order">
            <b>Đơn hàng mới</b>
            <span>Xem tất cả →</span>
          </div>
          {["Áo thun Essential", "Túi canvas Everyday"].map((name, i) => (
            <div className="dd-phone-item" key={name}>
              <i>{i ? "◫" : "✳"}</i>
              <span>
                {name}
                <small>Vừa xong · Đã thanh toán</small>
              </span>
              <Check size={12} />
            </div>
          ))}
          <div className="dd-phone-bottom">
            <Layers size={16} />
            <Circle size={16} />
            <Plus size={16} />
            <Menu size={16} />
          </div>
        </div>
        <span className="dd-minto-note">
          Small business.
          <br />
          Big possibilities.
        </span>
      </div>
    );
  return (
    <div className="dd-aurelia-scene">
      <div className="dd-aurelia-browser">
        <div className="dd-aurelia-nav">
          <b>AURELIA</b>
          <span>THE RESORT &nbsp;&nbsp; EXPERIENCES</span>
          <span>BOOK YOUR STAY ↗</span>
        </div>
        <div className="dd-aurelia-copy">
          <small>A SLOWER KIND OF LUXURY</small>
          <strong>
            Somewhere
            <br />
            you belong.
          </strong>
          <span>
            Discover your quiet escape <ArrowUpRight size={12} />
          </span>
        </div>
        <div className="dd-aurelia-bottom">
          <span>10°46′ N &nbsp; 106°41′ E</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </div>
  );
}

export function DevDesHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [activeService, setActiveService] = useState<string | null>("website");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [testimonial, setTestimonial] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const visibleProjects = homeProjects.filter(
    (project) => filter === "All" || project.tags.includes(filter),
  );
  const currentTestimonial = homeTestimonials[testimonial];

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <div className="dd-home" id="top">
      <a className="dd-skip" href="#main-content">
        Bỏ qua điều hướng
      </a>
      <header className={`dd-header ${menuOpen ? "is-open" : ""}`}>
        <div className="dd-header-inner">
          <Brand onClick={closeMenu} />
          <nav className="dd-desktop-nav" aria-label="Điều hướng chính">
            <a href="#services">Dịch vụ</a>
            <a href="#work">
              Dự án <sup>04</sup>
            </a>
            <a href="#about">Về DevDes</a>
            <Link href="/giao-dien">
              Kho giao diện <ArrowUpRight size={12} />
            </Link>
          </nav>
          <a className="dd-header-cta" href="#contact">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            className="dd-menu-button"
            ref={menuButton}
            aria-expanded={menuOpen}
            aria-controls="dd-mobile-nav"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <nav
        className="dd-mobile-nav"
        id="dd-mobile-nav"
        aria-label="Điều hướng trên điện thoại"
        hidden={!menuOpen}
      >
        <a href="#services" onClick={closeMenu}>
          Dịch vụ <ArrowUpRight />
        </a>
        <a href="#work" onClick={closeMenu}>
          Dự án <ArrowUpRight />
        </a>
        <a href="#about" onClick={closeMenu}>
          Về DevDes <ArrowUpRight />
        </a>
        <Link href="/giao-dien" onClick={closeMenu}>
          Kho giao diện <ArrowUpRight />
        </Link>
        <a href="#contact" onClick={closeMenu}>
          Bắt đầu dự án <ArrowUpRight />
        </a>
      </nav>
      <main id="main-content">
        <section
          className={`dd-hero theme-${homeSections.hero.backgroundTheme}`}
          aria-labelledby="dd-hero-title"
        >
          <div className="dd-shell dd-hero-inner">
            <div className="dd-hero-topline">
              <span>
                <i className="dd-status-dot" /> AVAILABLE FOR NEW PROJECTS
              </span>
              <span>DESIGN MEETS DEVELOPMENT®</span>
            </div>
            <div className="dd-hero-stage">
              <h1 id="dd-hero-title">
                <span>We design.</span>
                <span>
                  You grow<span className="dd-title-dot">.</span>
                </span>
              </h1>
              <ChromeSculpture />
              <span className="dd-object-note">
                A LITTLE ART.
                <br />A LOT OF PURPOSE.
              </span>
              {noticeOpen && (
                <aside className="dd-notice">
                  <div className="dd-notice-icon">
                    <Asterisk size={23} />
                  </div>
                  <div>
                    <strong>Ý tưởng của bạn, bước tiến tiếp theo.</strong>
                    <p>Cùng tạo nên một sản phẩm khác biệt.</p>
                    <a href="#contact">
                      Bắt đầu trò chuyện <ArrowUpRight size={13} />
                    </a>
                  </div>
                  <button
                    aria-label="Đóng thông báo"
                    onClick={() => setNoticeOpen(false)}
                  >
                    <X size={15} />
                  </button>
                </aside>
              )}
            </div>
            <div className="dd-hero-bottom">
              <p>
                Thiết kế có chiều sâu. Công nghệ có mục đích.
                <br />
                Website & ứng dụng đưa doanh nghiệp tiến xa.
              </p>
              <a className="dd-pill dd-pill-dark" href="#work">
                Khám phá dự án <ArrowUpRight size={17} />
              </a>
              <a className="dd-scroll-link" href="#services">
                <span>SCROLL TO EXPLORE</span>
                <ArrowDown size={18} />
              </a>
            </div>
            <div className="dd-partner-heading">
              <span>THƯƠNG HIỆU TRONG CÁC BẢN DEMO</span>
              <span>IDEAS INTO EXPERIENCES ↘</span>
            </div>
          </div>
          <div className="dd-partners">
            <div className="dd-marquee-track">
              {[0, 1].map((group) => (
                <div
                  className="dd-partner-group"
                  key={group}
                  aria-hidden={group === 1 ? true : undefined}
                >
                  <span className="dd-partner-aurelia">
                    AURELIA<span>HOTELS & RESORTS</span>
                  </span>
                  <span className="dd-partner-flow">
                    <Command /> flowdesk
                  </span>
                  <span className="dd-partner-muse">muse®</span>
                  <span className="dd-partner-orbit">
                    <Circle /> orbit
                  </span>
                  <span className="dd-partner-minto">
                    minto<span>®</span>
                  </span>
                  <span className="dd-partner-nestly">
                    <Layers /> nestly
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className={`dd-services theme-${homeSections.services.backgroundTheme}`}
          id="services"
          aria-labelledby="dd-services-title"
        >
          <div className="dd-shell">
            <div className="dd-section-top">
              <span className="dd-eyebrow">
                <i /> WHAT WE DO
              </span>
              <span className="dd-section-index">(01 — 02)</span>
            </div>
            <div className="dd-section-heading">
              <h2 id="dd-services-title">
                Precision —<br />
                <span>Crafted Designs.</span>
              </h2>
              <p>
                Hai thế mạnh. Một mục tiêu.
                <br />
                Biến bài toán của doanh nghiệp thành
                <br className="dd-desktop-break" /> những trải nghiệm số hiệu
                quả.
              </p>
            </div>
            <div className="dd-service-list">
              {homeServices.map((service) => (
                <article
                  className={`dd-service ${activeService === service.id ? "is-active" : ""}`}
                  key={service.id}
                  onMouseEnter={(event) => {
                    if (
                      window.matchMedia("(hover: hover)").matches &&
                      !event.currentTarget.contains(document.activeElement)
                    )
                      setActiveService(service.id);
                  }}
                >
                  <h3>
                    <button
                      id={`service-button-${service.id}`}
                      aria-expanded={activeService === service.id}
                      aria-controls={`service-panel-${service.id}`}
                      onClick={() =>
                        setActiveService(
                          activeService === service.id ? null : service.id,
                        )
                      }
                    >
                      <span className="dd-service-number">
                        /{service.number}
                      </span>
                      <span>{service.title}</span>
                      <ArrowDownRight
                        className="dd-service-arrow"
                        strokeWidth={1.2}
                      />
                    </button>
                  </h3>
                  <div
                    className="dd-service-panel"
                    id={`service-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`service-button-${service.id}`}
                    inert={activeService !== service.id}
                    aria-hidden={activeService !== service.id}
                  >
                    <div className="dd-service-panel-inner">
                      <div
                        className={`dd-service-art dd-service-art-${service.id}`}
                      >
                        {service.id === "website" ? (
                          <div className="dd-service-site">
                            <div>
                              <b>devdes®</b>
                              <Menu size={13} />
                            </div>
                            <strong>
                              Make it
                              <br />
                              <em>matter.</em>
                              <Asterisk />
                            </strong>
                            <small>DESIGNED TO MAKE A DIFFERENCE ↗</small>
                          </div>
                        ) : (
                          <Dashboard compact />
                        )}
                      </div>
                      <div className="dd-service-description">
                        <h4>{service.subtitle}</h4>
                        <p>{service.description}</p>
                        <div className="dd-tags">
                          {service.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <a href="#contact">
                          Trao đổi nhu cầu của bạn <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className={`dd-work theme-${homeSections.projects.backgroundTheme}`}
          id="work"
          aria-labelledby="dd-work-title"
        >
          <div className="dd-shell">
            <div className="dd-section-top">
              <span className="dd-eyebrow">
                <i /> SELECTED WORK
              </span>
              <span className="dd-section-index">CONCEPTS & DEMOS / 2026</span>
            </div>
            <div className="dd-section-heading">
              <h2 id="dd-work-title">
                Made to stand out<span>.</span>
              </h2>
              <p>
                Mỗi ý tưởng, một cách thể hiện.
                <br />
                Khám phá những sản phẩm demo của chúng mình.
              </p>
            </div>
            <div className="dd-project-toolbar">
              <div className="dd-filters" role="group" aria-label="Lọc dự án">
                {projectFilters.map((item) => (
                  <button
                    key={item}
                    aria-pressed={filter === item}
                    className={filter === item ? "is-active" : ""}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                    {item === "All" && <sup>04</sup>}
                  </button>
                ))}
              </div>
              <span className="dd-result-count" role="status">
                {String(visibleProjects.length).padStart(2, "0")} dự án
              </span>
            </div>
            <div className="dd-project-grid" key={filter}>
              {visibleProjects.map((project) => (
                <article
                  className={`dd-project dd-project-${project.visual}`}
                  key={project.slug}
                >
                  <Link
                    className="dd-project-image"
                    href={`/mau/${project.slug}`}
                    aria-label={`Khám phá demo ${project.name}`}
                  >
                    <ProjectVisual visual={project.visual} />
                    <span className="dd-project-open">
                      Khám phá demo <ArrowUpRight size={17} />
                    </span>
                    <span className="dd-project-corner">
                      <ArrowUpRight size={21} />
                    </span>
                  </Link>
                  <div className="dd-project-info">
                    <div>
                      <h3>
                        <Link href={`/mau/${project.slug}`}>
                          {project.name}
                        </Link>
                      </h3>
                      <p>{project.caption}</p>
                    </div>
                    <span>{project.label}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="dd-work-bottom">
              <span>YOUR NEXT PROJECT COULD BE HERE.</span>
              <Link className="dd-pill dd-pill-outline" href="/giao-dien">
                Xem toàn bộ giao diện <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>
        <section
          className={`dd-about theme-${homeSections.about.backgroundTheme}`}
          id="about"
          aria-labelledby="dd-about-title"
        >
          <div className="dd-shell">
            <div className="dd-section-top">
              <span className="dd-eyebrow">
                <i /> THE PEOPLE BEHIND THE PIXELS
              </span>
              <span className="dd-section-index">HELLO, WE’RE DEVDES®</span>
            </div>
            <div className="dd-about-intro">
              <h2 id="dd-about-title">
                Small team.
                <br />
                Big possibilities<span>.</span>
              </h2>
              <div>
                <p>
                  Chúng mình là DevDes — nơi tư duy thiết kế gặp kỹ thuật phát
                  triển. Một đội ngũ gọn gàng, làm việc trực tiếp và quan tâm
                  đến từng chi tiết.
                </p>
                <p>
                  Từ ý tưởng đầu tiên đến ngày ra mắt, chúng mình cùng bạn tạo
                  nên website và ứng dụng vừa đẹp, vừa giải quyết đúng vấn đề.
                </p>
                <a className="dd-underlined" href="#contact">
                  Làm quen với chúng mình <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="dd-testimonial-layout">
              <div className="dd-testimonial-aside">
                <div className="dd-about-symbol" aria-hidden="true">
                  <Asterisk strokeWidth={1} />
                </div>
                <span>
                  GOOD DESIGN.
                  <br />
                  BETTER TOGETHER.
                </span>
                <small>Góc nhìn trải nghiệm · Nội dung minh họa</small>
              </div>
              <div
                className="dd-testimonial"
                role="region"
                aria-roledescription="carousel"
                aria-label="Góc nhìn trải nghiệm"
              >
                <Quote size={32} strokeWidth={1.5} />
                <div
                  className="dd-testimonial-content"
                  key={testimonial}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <blockquote>“{currentTestimonial.quote}”</blockquote>
                  <div className="dd-testimonial-person">
                    <span>{currentTestimonial.initials}</span>
                    <div>
                      <strong>{currentTestimonial.name}</strong>
                      <small>{currentTestimonial.role}</small>
                    </div>
                  </div>
                </div>
                <div className="dd-testimonial-controls">
                  <span>
                    {String(testimonial + 1).padStart(2, "0")}{" "}
                    <i>/ {String(homeTestimonials.length).padStart(2, "0")}</i>
                  </span>
                  <div>
                    <button
                      onClick={() =>
                        setTestimonial(
                          (testimonial - 1 + homeTestimonials.length) %
                            homeTestimonials.length,
                        )
                      }
                      aria-label="Xem đánh giá trước"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setTestimonial(
                          (testimonial + 1) % homeTestimonials.length,
                        )
                      }
                      aria-label="Xem đánh giá tiếp theo"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        className={`dd-footer theme-${homeSections.contact.backgroundTheme}`}
        id="contact"
      >
        <div className="dd-shell">
          <div className="dd-section-top">
            <span className="dd-eyebrow">
              <i /> HAVE SOMETHING IN MIND?
            </span>
            <span className="dd-section-index">
              <i className="dd-status-dot" /> LET’S MAKE IT HAPPEN
            </span>
          </div>
          <a className="dd-contact-title" href={`mailto:${homeContact.email}`}>
            <h2>
              Let’s make
              <br />
              <span>something great.</span>
            </h2>
            <span className="dd-contact-arrow">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </a>
          <div className="dd-footer-grid">
            <div className="dd-footer-brand">
              <Brand />
              <p>
                Thiết kế có chiều sâu.
                <br />
                Công nghệ có mục đích.
              </p>
            </div>
            <div>
              <h3>KHÁM PHÁ</h3>
              <a href="#services">Dịch vụ</a>
              <a href="#work">Dự án</a>
              <a href="#about">Về DevDes</a>
            </div>
            <div>
              <h3>KẾT NỐI</h3>
              <a href={`mailto:${homeContact.email}`}>
                Gửi email <ArrowUpRight size={13} />
              </a>
              <Link href="/giao-dien">
                Kho giao diện <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="dd-footer-invitation">
              <h3>MỌI DỰ ÁN BẮT ĐẦU TỪ MỘT LỜI CHÀO.</h3>
              <p>
                Có ý tưởng cho website hay ứng dụng?
                <br />
                Chúng mình sẵn sàng lắng nghe.
              </p>
              <a
                className="dd-underlined"
                href={`mailto:${homeContact.email}?subject=${encodeURIComponent("Trao đổi dự án cùng DevDes")}`}
              >
                Gửi brief của bạn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="dd-footer-bottom">
            <span>© 2026 DevDes.click</span>
            <span>DESIGN WITH INTENT. BUILD WITH CARE.</span>
            <a href="#top">
              Về đầu trang <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="dd-footer-marquee" aria-hidden="true">
          <div className="dd-marquee-track">
            {[0, 1].map((group) => (
              <div key={group}>
                Creative—Agency—Gridline <Asterisk strokeWidth={1.3} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
