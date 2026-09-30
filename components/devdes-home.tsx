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
  Quote,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { useScrollTheme } from "@/components/use-scroll-theme";
import {
  getHomeContent,
  homeContact,
  homeSections,
  type HomeFilterId,
} from "@/lib/home-i18n";

function Brand({ onClick, label }: { onClick?: () => void; label: string }) {
  return (
    <a
      className="dd-brand"
      href="#top"
      onClick={(event) => { event.preventDefault(); onClick?.(); window.dispatchEvent(new Event("devdes-open-chat")); }}
      aria-label={label}
    >
      <BrandLogo />
    </a>
  );
}

function ProjectMobileArtwork({ name, accent, dark }: { name: string; accent: string; dark: string }) {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? { app: "MOBILE APP", development: "IN DEVELOPMENT", overview: "TODAY'S OVERVIEW", tracked: "items tracked" }
    : { app: "ỨNG DỤNG ĐIỆN THOẠI", development: "ĐANG PHÁT TRIỂN", overview: "TỔNG QUAN HÔM NAY", tracked: "mục đang theo dõi" };

  return (
    <div className="dd-project-mobile-scene" style={{ "--project-app-accent": accent, "--project-app-dark": dark } as CSSProperties} aria-hidden="true">
      <div className="dd-project-mobile-phone">
        <i className="dd-project-mobile-notch" />
        <header><small>{copy.app}</small><b>{name}</b></header>
        <span className="dd-project-mobile-status">{copy.development}</span>
        <section><small>{copy.overview}</small><strong>12</strong><span>{copy.tracked}</span></section>
        <div className="dd-project-mobile-stats"><b>86%</b><i /><b>24</b></div>
        <div className="dd-project-mobile-list"><i /><i /><i /></div>
        <footer><i /><i className="active" /><i /></footer>
      </div>
    </div>
  );
}

function Dashboard({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).copy.dashboard;

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
          <Layers size={12} /> {copy.overview}
        </span>
        <span>◫ &nbsp; {copy.projects}</span>
        <span>◷ &nbsp; {copy.tasks}</span>
        <span>♧ &nbsp; {copy.team}</span>
        <div className="dd-dash-user">
          D
          <span>
            {locale === "en" ? "Design team" : "Nhóm thiết kế"}<small>{copy.workspace}</small>
          </span>
        </div>
      </aside>
      <div className="dd-dash-main">
        <div className="dd-dash-nav">
          {copy.workspace} / {copy.overview} <Circle size={13} />
        </div>
        <div className="dd-dash-heading">
          <div>
            <small>{copy.greeting}</small>
            <h4>{copy.heading}</h4>
          </div>
          <span>+ {copy.createProject}</span>
        </div>
        <div className="dd-dash-stats">
          {[
            [copy.activeProjects, "12"],
            [copy.completedTasks, "84"],
            [copy.teamPerformance, "96%"],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>
                {value}
                <em>↗</em>
              </strong>
              <span>{copy.thisMonth}</span>
            </div>
          ))}
        </div>
        <div className="dd-dash-chart">
          <div>
            <b>{copy.progress}</b>
            <span>
              {copy.thisWeek} <ChevronDown size={9} />
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
            <span>{copy.monday}</span>
            <span>{copy.tuesday}</span>
            <span>{copy.wednesday}</span>
            <span>{copy.thursday}</span>
            <span>{copy.friday}</span>
          </div>
        </div>
        <div className="dd-dash-task">
          <span>
            <Check size={11} /> {copy.task}
          </span>
          <small>{copy.completed}</small>
          <b>JD</b>
        </div>
      </div>
    </div>
  );
}

export function DevDesHome() {
  const { locale } = useLocale();
  const content = getHomeContent(locale);
  const { copy, filters, pricingPlans, projects, services, testimonials } = content;
  const homeRef = useScrollTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>("website");
  const [filter, setFilter] = useState<HomeFilterId>("all");
  const [testimonial, setTestimonial] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const goToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    event.preventDefault();
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", "#contact");
  };
  const activeFilter = filters.find((item) => item.id === filter);
  const visibleProjects = projects.filter(
    (project) => !activeFilter?.tag || project.tags.includes(activeFilter.tag),
  );
  const currentTestimonial = testimonials[testimonial];

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
    <div className="dd-home" id="top" ref={homeRef}>
      <a className="dd-skip" href="#main-content">
        {copy.skipToContent}
      </a>
      <header className={`dd-header ${menuOpen ? "is-open" : ""}`}>
        <div className="dd-header-inner">
          <Brand onClick={closeMenu} label={copy.brandChatLabel} />
          <nav className="dd-desktop-nav" aria-label={copy.desktopNavigation}>
            <a href="#services">{copy.nav.services}</a>
            <a href="#work">
              {copy.nav.projects} <sup>{String(projects.length).padStart(2, "0")}</sup>
            </a>
            <a href="#about">{copy.nav.about}</a>
            <Link href="/giao-dien">
              {copy.nav.templates} <ArrowUpRight size={12} />
            </Link>
          </nav>
          <LanguageSwitcher className="dd-language-switcher" />
          <a className="dd-header-cta" href="#contact" onClick={goToContact}>
            {copy.talk} <ArrowUpRight size={17} />
          </a>
          <button
            className="dd-menu-button"
            ref={menuButton}
            aria-expanded={menuOpen}
            aria-controls="dd-mobile-nav"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <nav
        className="dd-mobile-nav"
        id="dd-mobile-nav"
        aria-label={copy.mobileNavigation}
        hidden={!menuOpen}
      >
        <a href="#services" onClick={closeMenu}>
          {copy.nav.services} <ArrowUpRight />
        </a>
        <a href="#work" onClick={closeMenu}>
          {copy.nav.projects} <ArrowUpRight />
        </a>
        <a href="#about" onClick={closeMenu}>
          {copy.nav.about} <ArrowUpRight />
        </a>
        <Link href="/giao-dien" onClick={closeMenu}>
          {copy.nav.templates} <ArrowUpRight />
        </Link>
        <a href="#contact" onClick={(event) => { closeMenu(); goToContact(event); }}>
          {copy.nav.startProject} <ArrowUpRight />
        </a>
        <LanguageSwitcher className="dd-mobile-language-switcher" />
      </nav>
      <main id="main-content">
        <section
          className={`dd-hero theme-${homeSections.hero.backgroundTheme}`}
          aria-label="DevDes"
        >
          <div className="dd-shell dd-hero-inner">
            <div className="dd-hero-topline">
              <span>
                <i className="dd-status-dot" /> {copy.hero.availability}
              </span>
              <span>DESIGN MEETS DEVELOPMENT®</span>
            </div>
            <div className="dd-hero-stage">
              <h1 className="dd-hero-title" lang="en" translate="no">
                <span>We <em>design</em></span>
                <span>You <em>grow</em></span>
              </h1>
              <HeroSpotlight />
            </div>
            <div className="dd-hero-bottom">
              <p>
                {copy.hero.descriptionLineOne}
                <br />
                {copy.hero.descriptionLineTwo}
              </p>
              <a className="dd-pill dd-pill-dark" href="#work">
                {copy.hero.exploreProjects} <ArrowUpRight size={17} />
              </a>
              <a className="dd-scroll-link" href="#services">
                <span>{copy.hero.scroll}</span>
                <ArrowDown size={18} />
              </a>
            </div>
            <div className="dd-partner-heading">
              <span>{copy.hero.completedProjects}</span>
              <span>{locale === "en" ? "IDEAS INTO EXPERIENCES ↘" : "Ý TƯỞNG THÀNH TRẢI NGHIỆM ↘"}</span>
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
                  {projects.map((project) => (
                    <span key={project.slug}>{project.name.split(" / ").at(-1)}</span>
                  ))}
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
                <i /> {copy.services.eyebrow}
              </span>
              <span className="dd-section-index">(01 — 02)</span>
            </div>
            <div className="dd-section-heading">
              <h2 id="dd-services-title">
                {copy.services.headingLineOne}<br />
                <span>{copy.services.headingLineTwo}</span>
              </h2>
              <p>
                {copy.services.descriptionLineOne}
                <br />
                {copy.services.descriptionLineTwo}
                <br className="dd-desktop-break" /> {copy.services.descriptionLineThree}
              </p>
            </div>
            <div className="dd-service-list">
              {services.map((service) => (
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
                              <em>matter</em>
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
                        <a href="#contact" onClick={goToContact}>
                          {copy.services.contact} <ArrowUpRight size={16} />
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
                <i /> {copy.work.eyebrow}
              </span>
              <span className="dd-section-index">{copy.work.index}</span>
            </div>
            <div className="dd-section-heading">
              <h2 id="dd-work-title">
                {copy.work.heading}
              </h2>
              <p>
                {copy.work.descriptionLineOne}
                <br />
                {copy.work.descriptionLineTwo}
              </p>
            </div>
            <div className="dd-project-toolbar">
              <div className="dd-filters" role="group" aria-label={copy.work.filterLabel}>
                {filters.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={filter === item.id}
                    className={filter === item.id ? "is-active" : ""}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                    {item.id === "all" && <sup>{String(projects.length).padStart(2, "0")}</sup>}
                  </button>
                ))}
              </div>
              <span className="dd-result-count" role="status">
                {String(visibleProjects.length).padStart(2, "0")} {copy.work.projectCount}
              </span>
            </div>
            <div className="dd-project-list" key={filter}>
              {visibleProjects.map((project, index) => (
                <article
                  className={`dd-project dd-project-row dd-project-${project.visual}`}
                  key={project.slug}
                >
                  <Link
                    className="dd-project-image"
                    href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}
                    aria-label={`${project.linkLabel} ${project.name}${project.external ? ` ${copy.work.openInNewTab}` : ""}`}
                  >
                    <div className="dd-project-preview">
                      {project.template.sourceKind === "app" ? <ProjectMobileArtwork name={project.name} accent={project.template.accent} dark={project.template.dark} /> : <Image src={project.image} alt={project.name} fill sizes="(max-width: 760px) 100vw, 55vw" />}
                    </div>
                    <span className="dd-project-open">
                      {project.linkLabel} <ArrowUpRight size={17} />
                    </span>
                    <span className="dd-project-corner">
                      <ArrowUpRight size={21} />
                    </span>
                  </Link>
                  <div className="dd-project-copy">
                    <span className="dd-project-kicker">{String(index + 1).padStart(2, "0")} / {project.label}</span>
                    <h3>
                      <Link href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}>
                        {project.name}
                      </Link>
                    </h3>
                    <p>{project.caption}</p>
                    {project.inDevelopment && <span className="dd-project-development">{copy.work.inDevelopment}</span>}
                    {project.introduction && <p className="dd-project-introduction">{project.introduction}</p>}
                    <Link className="dd-underlined dd-project-visit" href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}>
                      {project.linkLabel} <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="dd-work-bottom">
              <span>{copy.work.nextProject}</span>
              <Link className="dd-pill dd-pill-outline" href="/giao-dien">
                {copy.work.viewAll} <ArrowUpRight size={17} />
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
                <i /> {copy.about.eyebrow}
              </span>
              <span className="dd-section-index">{copy.about.index}</span>
            </div>
            <div className="dd-about-intro">
              <h2 id="dd-about-title">
                {copy.about.headingLineOne}
                <br />
                {copy.about.headingLineTwo}
              </h2>
              <div>
                <p>
                  {copy.about.firstParagraph}
                </p>
                <p>
                  {copy.about.secondParagraph}
                </p>
                <a className="dd-underlined" href="#contact" onClick={goToContact}>
                  {copy.about.meetUs} <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="dd-testimonial-layout">
              <div className="dd-testimonial-aside">
                <div className="dd-about-symbol" aria-hidden="true">
                  <Asterisk strokeWidth={1} />
                </div>
                <span>
                  {copy.about.togetherLineOne}
                  <br />
                  {copy.about.togetherLineTwo}
                </span>
                <small>{copy.about.testimonialNote}</small>
              </div>
              <div
                className="dd-testimonial"
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.about.testimonialRegion}
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
                    <i>/ {String(testimonials.length).padStart(2, "0")}</i>
                  </span>
                  <div>
                    <button
                      onClick={() =>
                        setTestimonial(
                          (testimonial - 1 + testimonials.length) %
                            testimonials.length,
                        )
                      }
                      aria-label={copy.about.previousTestimonial}
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setTestimonial(
                          (testimonial + 1) % testimonials.length,
                        )
                      }
                      aria-label={copy.about.nextTestimonial}
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
      <section className="dd-pricing theme-dark" id="pricing" aria-labelledby="dd-pricing-title">
        <div className="dd-shell">
          <div className="dd-section-top">
            <span className="dd-eyebrow"><i /> {copy.pricing.eyebrow}</span>
            <span className="dd-section-index">{copy.pricing.index}</span>
          </div>
          <div className="dd-pricing-heading">
          <h2 id="dd-pricing-title">{copy.pricing.headingLineOne}<br /><span>{copy.pricing.headingLineTwo}</span></h2>
          <p>{copy.pricing.description}</p>
          </div>
          <div className="dd-pricing-grid">
            {pricingPlans.map((plan) => (
              <article className={`dd-pricing-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>
                {plan.featured && <span className="dd-pricing-badge">{copy.pricing.mostPopular}</span>}
                <h3>{plan.name}</h3>
                <p>{plan.audience}</p>
                <strong>{plan.price}</strong>
                <ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                <a className="dd-pill dd-pill-outline" href="#contact" onClick={goToContact}>{copy.pricing.choosePlan} <ArrowUpRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <footer
        className={`dd-footer theme-${homeSections.contact.backgroundTheme}`}
        id="contact"
      >
        <div className="dd-shell">
          <div className="dd-section-top">
            <span className="dd-eyebrow">
              <i /> {copy.footer.eyebrow}
            </span>
            <span className="dd-section-index">
              <i className="dd-status-dot" /> {copy.footer.status}
            </span>
          </div>
          <a className="dd-contact-title" href={`mailto:${homeContact.email}`}>
            <h2>
              {copy.footer.contactTitleLineOne}
              <br />
              <span>{copy.footer.contactTitleLineTwo}</span>
            </h2>
            <span className="dd-contact-arrow">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </a>
          <div className="dd-footer-grid">
            <div className="dd-footer-brand">
              <Brand label={copy.brandChatLabel} />
              <p>
                {copy.footer.brandLineOne}
                <br />
                {copy.footer.brandLineTwo}
              </p>
            </div>
            <div>
              <h3>{copy.footer.explore}</h3>
              <a href="#services">{copy.nav.services}</a>
              <a href="#work">{copy.nav.projects}</a>
              <a href="#about">{copy.nav.about}</a>
            </div>
            <div>
              <h3>{copy.footer.connect}</h3>
              <a href={`mailto:${homeContact.email}`}>
                {copy.footer.email} <ArrowUpRight size={13} />
              </a>
              <Link href="/giao-dien">
                {copy.nav.templates} <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="dd-footer-invitation">
              <h3>{copy.footer.projectIntro}</h3>
              <p>
                {copy.footer.projectQuestionLineOne}
                <br />
                {copy.footer.projectQuestionLineTwo}
              </p>
              <a
                className="dd-underlined"
                href={`mailto:${homeContact.email}?subject=${encodeURIComponent(copy.footer.briefSubject)}`}
              >
                {copy.footer.sendBrief} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="dd-footer-bottom">
            <span>Copyright © 2026 Sense &amp; Scene Studio. All right reserved</span>
            <span>DESIGN WITH INTENT · BUILD WITH CARE</span>
            <a href="#top">
              {copy.footer.backToTop} <ArrowUpRight size={13} />
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
