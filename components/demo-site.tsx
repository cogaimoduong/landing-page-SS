"use client";

import { getTemplate, type TemplateItem } from "@/lib/templates";
import type { Locale } from "@/lib/i18n";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Coffee,
  Headphones,
  Menu,
  MapPin,
  Quote,
  ShieldCheck,
  Waves,
  Wifi,
} from "lucide-react";
import { useState, type CSSProperties } from "react";
import { DemoSections } from "./demo-sections";
import { ManagementWorkspace } from "./management-demo";
import { ServiceCatalog } from "./service-catalog";
import { HospitalityShowcase, AgencyPortfolio } from "./topic-showcase";
import { FoodDemo } from "./food-demo";
import { ProjectTemplateDemo } from "./project-template-demo";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import "./template-identities.css";

type DemoCopy = {
  nav: {
    about: string;
    rentalOption: string;
    hotelOption: string;
    agencyOption: string;
    rentalGuide: string;
    hotelExperience: string;
    agencyJournal: string;
    contact: string;
    carCta: string;
    homeCta: string;
    gearCta: string;
    hotelCta: string;
    agencyCta: string;
    menu: string;
  };
  rental: {
    carEyebrow: string;
    homeEyebrow: string;
    gearEyebrow: string;
    carIntro: string;
    homeIntro: string;
    gearIntro: string;
    catalogLink: string;
    bannerEyebrow: string;
    bannerTitle: string;
    steps: [string, string, string];
    benefitsEyebrow: string;
    benefitsTitle: string;
    carBenefit: string;
    homeBenefit: string;
    gearBenefit: string;
    benefitOneCopy: string;
    benefitTwo: string;
    benefitTwoCopy: string;
    benefitThree: string;
    benefitThreeCopy: string;
    storyEyebrow: string;
    storyQuote: string;
    storyBy: string;
    homeFooter: string;
    footer: string;
  };
  hotel: {
    minimalIntro: string;
    playfulIntro: string;
    defaultIntro: string;
    explore: string;
    catalogLink: string;
    welcome: string;
    playfulTitle: string;
    minimalTitle: string;
    defaultTitle: string;
    intro: string;
    amenitiesEyebrow: string;
    amenitiesTitle: string;
    minimalAmenity: string;
    playfulAmenity: string;
    defaultAmenity: string;
    minimalAmenityMeta: string;
    playfulAmenityMeta: string;
    defaultAmenityMeta: string;
    breakfast: string;
    breakfastMeta: string;
    wifi: string;
    wifiMeta: string;
    airport: string;
    airportMeta: string;
    testimonial: string;
    testimonialBy: string;
    locationEyebrow: string;
    locationTitle: string;
    minimalLocation: string;
    playfulLocation: string;
    defaultLocation: string;
    transport: string;
    footer: string;
  };
  agency: {
    loudIntro: string;
    haloIntro: string;
    museIntro: string;
    start: string;
    brands: string;
    growth: string;
    awards: string;
    serviceEyebrow: string;
    serviceTitle: string;
    serviceIntro: string;
    services: [string, string, string][];
    processEyebrow: string;
    processTitle: string;
    process: [string, string, string][];
    quote: string;
    quoteBy: string;
    quoteRole: string;
    loudFooter: string;
    haloFooter: string;
    museFooter: string;
  };
  footer: {
    eyebrow: string;
    contact: string;
    about: string;
    catalog: string;
    policies: string;
    rights: string;
  };
};

const demoCopy: Record<Locale, DemoCopy> = {
  en: {
    nav: {
      about: "About", rentalOption: "Catalogue", hotelOption: "Rooms & suites", agencyOption: "Projects", rentalGuide: "Guide", hotelExperience: "Experiences", agencyJournal: "Journal", contact: "Contact",
      carCta: "Rent a car", homeCta: "Find a home", gearCta: "Get a quote", hotelCta: "Book a room", agencyCta: "Send a brief", menu: "Menu",
    },
    rental: {
      carEyebrow: "FREEDOM ON EVERY JOURNEY", homeEyebrow: "LIVE LIKE A LOCAL", gearEyebrow: "READY EQUIPMENT · 24/7",
      carIntro: "Over 250 vehicles, a simple process, and delivery to your door.", homeIntro: "Beautiful homes, carefully selected for memorable stays.", gearIntro: "Rent genuine construction equipment with fast delivery straight to site.",
      catalogLink: "Browse the catalogue and choose your dates", bannerEyebrow: "SIMPLE · TRANSPARENT · FAST", bannerTitle: "Rent in three steps.", steps: ["Choose a product", "Choose your dates", "Receive and use"],
      benefitsEyebrow: "WHY CHOOSE", benefitsTitle: "Confidence from booking<br />to return.", carBenefit: "Full insurance", homeBenefit: "Verified stays", gearBenefit: "Inspected equipment", benefitOneCopy: "Every product is thoroughly checked before it is handed over to you.", benefitTwo: "Right on time", benefitTwoCopy: "A clear process, fast delivery, and no surprise costs.", benefitThree: "Support 24/7", benefitThreeCopy: "Our team is ready to help throughout your rental.",
      storyEyebrow: "CUSTOMER STORY", storyQuote: "“Everything was faster than I expected. I booked in minutes, received exactly what I needed, and had such thoughtful support.”", storyBy: "HOÀNG NAM · CUSTOMER SINCE 2024", homeFooter: "Stay your way.", footer: "Ready for the next journey?",
    },
    hotel: {
      minimalIntro: "Stillness set within nature.", playfulIntro: "A little hideaway for souls who love to wander.", defaultIntro: "Touch nature. Find your calm again.", explore: "Explore the hotel", catalogLink: "Choose a room and plan your stay", welcome: "WELCOME TO", playfulTitle: "Sleep well, play freely, slow down.", minimalTitle: "Less, but deeper.", defaultTitle: "A getaway shaped by thoughtful details.", intro: "Every space is thoughtfully considered so you can unwind, enjoy the moment, and take home beautiful memories.",
      amenitiesEyebrow: "AMENITIES", amenitiesTitle: "Everything you need,<br />within reach.", minimalAmenity: "Meditation garden", playfulAmenity: "Rooftop lounge", defaultAmenity: "Swimming pool", minimalAmenityMeta: "A quiet place to pause", playfulAmenityMeta: "17:00 — 22:00", defaultAmenityMeta: "06:00 — 22:00", breakfast: "Breakfast", breakfastMeta: "Served daily", wifi: "High-speed Wi-Fi", wifiMeta: "Complimentary throughout", airport: "Airport transfers", airportMeta: "Book 24 hours ahead", testimonial: "“A place that made us want to return as soon as we left.”", testimonialBy: "THẢO & MINH · HANOI",
      locationEyebrow: "LOCATION", locationTitle: "Just hidden enough,<br />just close enough.", minimalLocation: "Explore Kyoto with a walking guide and transport advice from reception.", playfulLocation: "A stop in the middle of Saigon, close to cafés and interesting streets.", defaultLocation: "Set on Ninh Van Bay. Contact us to arrange a car from the airport and the boat to the resort.", transport: "Ask about transport", footer: "Your getaway begins here.",
    },
    agency: {
      loudIntro: "Big ideas. Bold design. Real results.", haloIntro: "Bringing data, creativity, and technology together for sustainable brand growth.", museIntro: "We build brands with character and stories worth remembering.", start: "Start a project", brands: "BRANDS", growth: "AVG. GROWTH", awards: "AWARDS", serviceEyebrow: "WHAT WE DO", serviceTitle: "Good ideas need<br />the right way to shine.", serviceIntro: "From strategy to launch, our team works with you to create a consistent, influential brand.",
      services: [["01", "Brand strategy", "Positioning · Architecture · Voice"], ["02", "Identity & design", "Brand identity · Art direction"], ["03", "Website & digital experience", "UI/UX · Development · Motion"], ["04", "Communication campaigns", "Creative · Social · Performance"]],
      processEyebrow: "PROCESS", processTitle: "From the right question<br />to real results.", process: [["01", "Discover", "Listen to goals, understand customers, and explore the market context."], ["02", "Define", "Build the appropriate strategy, concept, and creative system."], ["03", "Create", "Design, test, and refine every touchpoint."], ["04", "Launch", "Support delivery, measure results, and keep optimising."]],
      quote: "“Not only does it look better—our brand finally has a real voice.”", quoteBy: "MAI PHƯƠNG", quoteRole: "MARKETING DIRECTOR · NEO GROUP", loudFooter: "Let’s make something loud.", haloFooter: "Ready to grow?", museFooter: "Make something memorable.",
    },
    footer: { eyebrow: "SEE YOU AT", contact: "Contact", about: "About", catalog: "Catalogue", policies: "Policies", rights: "© 2026 · ALL RIGHTS RESERVED" },
  },
  vi: {
    nav: {
      about: "Giới thiệu", rentalOption: "Danh mục", hotelOption: "Phòng & suite", agencyOption: "Dự án", rentalGuide: "Hướng dẫn", hotelExperience: "Trải nghiệm", agencyJournal: "Góc nhìn", contact: "Liên hệ",
      carCta: "Thuê xe", homeCta: "Tìm căn hộ", gearCta: "Nhận báo giá", hotelCta: "Đặt phòng", agencyCta: "Gửi brief", menu: "Menu",
    },
    rental: {
      carEyebrow: "TỰ DO TRÊN MỌI HÀNH TRÌNH", homeEyebrow: "SỐNG NHƯ NGƯỜI BẢN ĐỊA", gearEyebrow: "THIẾT BỊ SẴN SÀNG · 24/7",
      carIntro: "Hơn 250 mẫu xe, thủ tục đơn giản và giao xe tận nơi.", homeIntro: "Những căn nhà đẹp được tuyển chọn cho kỳ nghỉ đáng nhớ.", gearIntro: "Thuê máy móc công trình chính hãng, giao nhanh tận công trường.",
      catalogLink: "Khám phá danh mục & chọn ngày", bannerEyebrow: "ĐƠN GIẢN · MINH BẠCH · NHANH CHÓNG", bannerTitle: "Thuê trong 3 bước.", steps: ["Chọn sản phẩm", "Chọn thời gian", "Nhận và sử dụng"],
      benefitsEyebrow: "VÌ SAO CHỌN", benefitsTitle: "An tâm từ lúc đặt<br />đến khi hoàn trả.", carBenefit: "Bảo hiểm đầy đủ", homeBenefit: "Chỗ ở xác thực", gearBenefit: "Thiết bị kiểm định", benefitOneCopy: "Mọi sản phẩm đều được kiểm tra kỹ trước khi bàn giao đến bạn.", benefitTwo: "Hỗ trợ đúng giờ", benefitTwoCopy: "Quy trình rõ ràng, giao nhận nhanh và không có chi phí bất ngờ.", benefitThree: "Đồng hành 24/7", benefitThreeCopy: "Đội ngũ luôn sẵn sàng hỗ trợ trong suốt thời gian thuê.",
      storyEyebrow: "CÂU CHUYỆN KHÁCH HÀNG", storyQuote: "“Mọi thứ nhanh hơn mình nghĩ. Chỉ vài phút là đặt xong, nhận đúng thứ cần và được hỗ trợ rất nhiệt tình.”", storyBy: "HOÀNG NAM · KHÁCH HÀNG TỪ 2024", homeFooter: "Ở theo cách của bạn.", footer: "Sẵn sàng cho hành trình tiếp theo?",
    },
    hotel: {
      minimalIntro: "Tĩnh lặng nằm giữa thiên nhiên.", playfulIntro: "Một nơi nhỏ xinh cho những tâm hồn thích rong chơi.", defaultIntro: "Chạm vào thiên nhiên. Tìm lại sự bình yên.", explore: "Khám phá khách sạn", catalogLink: "Chọn phòng & lên kế hoạch lưu trú", welcome: "CHÀO MỪNG ĐẾN", playfulTitle: "Ngủ ngon, chơi vui, sống chậm.", minimalTitle: "Ít hơn, nhưng sâu hơn.", defaultTitle: "Một kỳ nghỉ được tạo nên từ những điều tinh tế.", intro: "Mỗi không gian đều được chăm chút để bạn có thể thả lỏng, tận hưởng và mang về những ký ức thật đẹp.",
      amenitiesEyebrow: "TIỆN ÍCH", amenitiesTitle: "Mọi thứ bạn cần,<br />ngay trong tầm tay.", minimalAmenity: "Vườn thiền", playfulAmenity: "Rooftop lounge", defaultAmenity: "Hồ bơi", minimalAmenityMeta: "Không gian yên tĩnh", playfulAmenityMeta: "17:00 — 22:00", defaultAmenityMeta: "06:00 — 22:00", breakfast: "Bữa sáng", breakfastMeta: "Phục vụ mỗi ngày", wifi: "Wi-Fi tốc độ cao", wifiMeta: "Miễn phí toàn khuôn viên", airport: "Đưa đón sân bay", airportMeta: "Đặt trước 24 giờ", testimonial: "“Một nơi khiến chúng tôi muốn quay lại ngay khi vừa rời đi.”", testimonialBy: "THẢO & MINH · HÀ NỘI",
      locationEyebrow: "VỊ TRÍ", locationTitle: "Ẩn mình vừa đủ,<br />gần gũi vừa hay.", minimalLocation: "Khám phá Kyoto với cẩm nang đi bộ và hướng dẫn di chuyển từ lễ tân.", playfulLocation: "Một điểm dừng giữa Sài Gòn, gần những quán cà phê và góc phố thú vị.", defaultLocation: "Tọa lạc bên vịnh Ninh Vân. Liên hệ để sắp xếp xe từ sân bay và chuyến tàu đến resort.", transport: "Hỏi về di chuyển", footer: "Kỳ nghỉ của bạn bắt đầu tại đây.",
    },
    agency: {
      loudIntro: "Ý tưởng lớn. Thiết kế táo bạo. Kết quả thật.", haloIntro: "Kết hợp dữ liệu, sáng tạo và công nghệ để thương hiệu tăng trưởng bền vững.", museIntro: "Chúng tôi xây dựng những thương hiệu có cá tính và câu chuyện đáng nhớ.", start: "Bắt đầu dự án", brands: "THƯƠNG HIỆU", growth: "TĂNG TRƯỞNG TB.", awards: "GIẢI THƯỞNG", serviceEyebrow: "CHÚNG TÔI LÀM GÌ?", serviceTitle: "Ý tưởng tốt cần<br />đúng cách để tỏa sáng.", serviceIntro: "Từ chiến lược đến triển khai, đội ngũ cùng bạn tạo ra một thương hiệu nhất quán và có sức ảnh hưởng.",
      services: [["01", "Chiến lược thương hiệu", "Định vị · Kiến trúc · Giọng nói"], ["02", "Nhận diện & thiết kế", "Brand identity · Art direction"], ["03", "Website & trải nghiệm số", "UI/UX · Development · Motion"], ["04", "Chiến dịch truyền thông", "Creative · Social · Performance"]],
      processEyebrow: "QUY TRÌNH", processTitle: "Từ câu hỏi đúng<br />đến kết quả thật.", process: [["01", "Khám phá", "Lắng nghe mục tiêu, tìm hiểu khách hàng và bối cảnh thị trường."], ["02", "Định hình", "Xây chiến lược, concept và hệ thống sáng tạo phù hợp."], ["03", "Sáng tạo", "Thiết kế, thử nghiệm và hoàn thiện từng điểm chạm."], ["04", "Ra mắt", "Đồng hành triển khai, đo lường và tiếp tục tối ưu."]],
      quote: "“Không chỉ đẹp hơn — thương hiệu của chúng tôi cuối cùng đã có một tiếng nói thật sự.”", quoteBy: "MAI PHƯƠNG", quoteRole: "MARKETING DIRECTOR · NEO GROUP", loudFooter: "Làm một thứ thật ồn ào nhé?", haloFooter: "Sẵn sàng tăng trưởng?", museFooter: "Tạo nên điều đáng nhớ.",
    },
    footer: { eyebrow: "HẸN GẶP BẠN TẠI", contact: "Liên hệ", about: "Giới thiệu", catalog: "Danh mục", policies: "Chính sách", rights: "© 2026 · ĐÃ ĐĂNG KÝ BẢN QUYỀN" },
  },
};

export function DemoSite({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const localizedTemplate = getTemplate(template.slug, locale) ?? template;
  const usesSampleNav = ["rental", "hotel", "advertising"].includes(localizedTemplate.category);
  const style = {
    "--sample-tone": localizedTemplate.tone,
    "--sample-accent": localizedTemplate.accent,
    "--sample-dark": localizedTemplate.dark,
    "--sample-image": localizedTemplate.image ? `url(${localizedTemplate.image})` : "none",
  } as CSSProperties;

  return (
    <main
      id="top"
      className={`sample-site ${localizedTemplate.category} ${localizedTemplate.slug}`}
      style={style}
    >
      {!usesSampleNav && <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100, padding: "7px 10px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.92)", color: "#111", boxShadow: "0 4px 18px rgba(0, 0, 0, 0.16)" }}><LanguageSwitcher /></div>}
      {localizedTemplate.category === "rental" && <RentalDemo template={localizedTemplate} locale={locale} />}
      {localizedTemplate.category === "hotel" && <HotelDemo template={localizedTemplate} locale={locale} />}
      {localizedTemplate.category === "management" && <ManagementWorkspace template={localizedTemplate} />}
      {localizedTemplate.category === "advertising" && <AdvertisingDemo template={localizedTemplate} locale={locale} />}
      {localizedTemplate.category === "fnb" && <FoodDemo template={localizedTemplate} />}
      {localizedTemplate.category === "project" && <ProjectTemplateDemo template={localizedTemplate} />}
    </main>
  );
}

function SampleNav({ name, locale, variant, cta: ctaOverride }: { name: string; locale: Locale; variant: "rental" | "hotel" | "agency"; cta?: string }) {
  const [open, setOpen] = useState(false);
  const copy = demoCopy[locale].nav;
  const hotel = variant === "hotel";
  const agency = variant === "agency";
  const cta = ctaOverride ?? (agency ? copy.agencyCta : hotel ? copy.hotelCta : copy.carCta);

  return (
    <nav className="sample-nav">
      <a href="#top" className="sample-brand">{name}<i>.</i></a>
      <div className={`sample-links ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}><a href="#about">{copy.about}</a><a href={agency ? "#portfolio" : "#options"}>{agency ? copy.agencyOption : hotel ? copy.hotelOption : copy.rentalOption}</a><a href={hotel ? "#experiences" : agency ? "#journal" : "#guide"}>{hotel ? copy.hotelExperience : agency ? copy.agencyJournal : copy.rentalGuide}</a><a href="#inquiry">{copy.contact}</a></div>
      <div className="sample-nav-actions" style={{ display: "flex", alignItems: "center", justifySelf: "end", gap: "16px" }}>
        <LanguageSwitcher />
        <a href="#inquiry" className="sample-nav-cta">{cta} <ArrowRight /></a>
        <button className="sample-menu" aria-label={copy.menu} aria-expanded={open} onClick={() => setOpen(!open)}><Menu /></button>
      </div>
    </nav>
  );
}

function RentalDemo({ template, locale }: { template: TemplateItem; locale: Locale }) {
  const isCar = template.slug.includes("ridenow");
  const isHome = template.slug.includes("nestly");
  const copy = demoCopy[locale].rental;
  const nav = demoCopy[locale].nav;
  const cta = isCar ? nav.carCta : isHome ? nav.homeCta : nav.gearCta;
  return (
    <>
      <section className="sample-hero image-hero">
        <SampleNav name={template.name} locale={locale} variant="rental" cta={cta} />
        <div className="sample-hero-copy">
          <span>{isCar ? copy.carEyebrow : isHome ? copy.homeEyebrow : copy.gearEyebrow}</span>
          <h1>{template.tagline}</h1>
          <p>{isCar ? copy.carIntro : isHome ? copy.homeIntro : copy.gearIntro}</p>
        </div>
        <a className="hero-catalog-link" href="#options">{copy.catalogLink} <ArrowRight /></a>
      </section>
      <ServiceCatalog template={template} />
      <section className="sample-banner"><span>{copy.bannerEyebrow}</span><h2>{copy.bannerTitle}</h2><div><b>01 <small>{copy.steps[0]}</small></b><b>02 <small>{copy.steps[1]}</small></b><b>03 <small>{copy.steps[2]}</small></b></div></section>
      <section className="rental-benefits sample-content" id="about">
        <div className="sample-section-title"><span>{copy.benefitsEyebrow} {template.name.toUpperCase()}</span><h2>{copy.benefitsTitle.split("<br />")[0]}<br />{copy.benefitsTitle.split("<br />")[1]}</h2></div>
        <div className="benefit-grid">
          <article><ShieldCheck /><b>{isCar ? copy.carBenefit : isHome ? copy.homeBenefit : copy.gearBenefit}</b><p>{copy.benefitOneCopy}</p></article>
          <article><Clock3 /><b>{copy.benefitTwo}</b><p>{copy.benefitTwoCopy}</p></article>
          <article><Headphones /><b>{copy.benefitThree}</b><p>{copy.benefitThreeCopy}</p></article>
        </div>
      </section>
      <section className="rental-story">
        <div className="story-photo" />
        <div className="story-copy"><span>{copy.storyEyebrow}</span><Quote /><blockquote>{copy.storyQuote}</blockquote><b>{copy.storyBy}</b></div>
      </section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line={isHome ? copy.homeFooter : copy.footer} locale={locale} />
    </>
  );
}

function HotelDemo({ template, locale }: { template: TemplateItem; locale: Locale }) {
  const playful = template.slug.includes("sunday");
  const minimal = template.slug.includes("hush");
  const copy = demoCopy[locale].hotel;
  return (
    <>
      <section className="sample-hero hotel-hero">
        <SampleNav name={template.name} locale={locale} variant="hotel" />
        <div className="hotel-copy"><span>{minimal ? "KYOTO · JAPAN" : playful ? "SAIGON · VIETNAM" : "NINH VÂN BAY · VIETNAM"}</span><h1>{template.tagline}</h1><p>{minimal ? copy.minimalIntro : playful ? copy.playfulIntro : copy.defaultIntro}</p><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>{copy.explore} <ArrowRight /></button></div>
        <a className="hero-catalog-link hotel-catalog-link" href="#options">{copy.catalogLink} <ArrowRight /></a>
      </section>
      <section className="hotel-intro sample-content" id="about"><span>{copy.welcome} {template.name.toUpperCase()}</span><h2>{playful ? copy.playfulTitle : minimal ? copy.minimalTitle : copy.defaultTitle}</h2><p>{copy.intro}</p></section>
      <ServiceCatalog template={template} />
      <HospitalityShowcase template={template} />
      <section className="hotel-amenities sample-content"><div className="sample-section-title"><span>{copy.amenitiesEyebrow}</span><h2>{copy.amenitiesTitle.split("<br />")[0]}<br />{copy.amenitiesTitle.split("<br />")[1]}</h2></div><div className="amenity-grid"><article><Waves /><b>{minimal ? copy.minimalAmenity : playful ? copy.playfulAmenity : copy.defaultAmenity}</b><span>{minimal ? copy.minimalAmenityMeta : playful ? copy.playfulAmenityMeta : copy.defaultAmenityMeta}</span></article><article><Coffee /><b>{copy.breakfast}</b><span>{copy.breakfastMeta}</span></article><article><Wifi /><b>{copy.wifi}</b><span>{copy.wifiMeta}</span></article><article><MapPin /><b>{copy.airport}</b><span>{copy.airportMeta}</span></article></div></section>
      <section className="hotel-testimonial"><Quote /><blockquote>{copy.testimonial}</blockquote><div><span>★★★★★</span><b>{copy.testimonialBy}</b></div></section>
      <section className="hotel-location sample-content"><div className="location-map"><i>●</i><span>{minimal ? "KYOTO" : playful ? "SAIGON" : "NINH VÂN BAY"}</span></div><div><span>{copy.locationEyebrow}</span><h2>{copy.locationTitle.split("<br />")[0]}<br />{copy.locationTitle.split("<br />")[1]}</h2><p>{minimal ? copy.minimalLocation : playful ? copy.playfulLocation : copy.defaultLocation}</p><a href="#inquiry">{copy.transport} <ArrowUpRight /></a></div></section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line={copy.footer} locale={locale} />
    </>
  );
}

function AdvertisingDemo({ template, locale }: { template: TemplateItem; locale: Locale }) {
  const loud = template.slug.includes("loud");
  const halo = template.slug.includes("halo");
  const copy = demoCopy[locale].agency;
  return (
    <>
      <section className="sample-hero advertising-hero"><SampleNav name={template.name} locale={locale} variant="agency" /><div className="ad-orb" /><div className="ad-copy"><span>{loud ? "CREATIVE AGENCY · SAIGON" : halo ? "GROWTH MARKETING STUDIO" : "INDEPENDENT BRAND STUDIO"}</span><h1>{template.tagline}</h1><p>{loud ? copy.loudIntro : halo ? copy.haloIntro : copy.museIntro}</p><button onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}>{copy.start} <ArrowRight /></button></div><div className="ad-stats"><div><strong>48+</strong><span>{copy.brands}</span></div><div><strong>120%</strong><span>{copy.growth}</span></div><div><strong>08</strong><span>{copy.awards}</span></div></div></section>
      <AgencyPortfolio template={template} />
      <section className="ad-services" id="service"><div className="ad-service-intro"><span>{copy.serviceEyebrow}</span><h2>{copy.serviceTitle.split("<br />")[0]}<br />{copy.serviceTitle.split("<br />")[1]}</h2><p>{copy.serviceIntro}</p></div><div className="ad-service-list">{copy.services.map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><ArrowUpRight /></article>)}</div></section>
      <section className="ad-process sample-content" id="about"><div className="sample-section-title"><span>{copy.processEyebrow}</span><h2>{copy.processTitle.split("<br />")[0]}<br />{copy.processTitle.split("<br />")[1]}</h2></div><div className="ad-process-grid">{copy.process.map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div></section>
      <section className="ad-quote"><Quote /><blockquote>{copy.quote}</blockquote><div><b>{copy.quoteBy}</b><span>{copy.quoteRole}</span></div></section>
      <DemoSections template={template} />
      <DemoFooter name={template.name} line={loud ? copy.loudFooter : halo ? copy.haloFooter : copy.museFooter} locale={locale} />
    </>
  );
}

function DemoFooter({ name, line, locale }: { name: string; line: string; locale: Locale }) {
  const copy = demoCopy[locale].footer;
  return (
    <footer className="demo-footer" id="contact">
      <div className="footer-cta"><span>{copy.eyebrow} {name.toUpperCase()}</span><h2>{line}</h2><a href="#inquiry">{copy.contact} {name} <ArrowUpRight /></a></div>
      <div className="footer-bottom"><b>{name}<i>.</i></b><div><a href="#about">{copy.about}</a><a href="#options">{copy.catalog}</a><a href="#policies">{copy.policies}</a></div><small>{copy.rights}</small></div>
    </footer>
  );
}
