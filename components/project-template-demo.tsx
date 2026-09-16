"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Bell, Check, ChevronRight, CircleDollarSign, House, Menu, PieChart, Sparkles, UsersRound } from "lucide-react";
import Link from "next/link";
import type { TemplateItem } from "@/lib/templates";
import "./project-template-demo.css";
import "./project-mobile-preview.css";

const genericMetrics = [
  ["12", "hạng mục đang theo dõi"],
  ["86%", "mục tiêu trong tiến độ"],
  ["24/7", "dữ liệu luôn sẵn sàng"],
];

function MobileAppPreview({ template, active, setActive }: { template: TemplateItem; active: string; setActive: (tab: string) => void }) {
  const tabs = ["Tổng quan", "Vận hành", "Báo cáo"];
  const summary = active === "Vận hành" ? ["08", "đầu việc hôm nay"] : active === "Báo cáo" ? ["94%", "mục tiêu hoàn thành"] : ["12", "mục đang theo dõi"];
  return <section className="project-mobile-preview" id="workspace">
    <div className="project-mobile-intro"><span>01 / MOBILE APP</span><h2>Gọn trong tay, rõ trong từng thao tác.</h2><p>Đây là bản mô phỏng giao diện điện thoại. Nội dung và tính năng thực tế sẽ tiếp tục được hoàn thiện theo quy trình sử dụng.</p><div className="project-app-development"><Sparkles size={14} /> App đang trong quá trình phát triển</div><ul>{template.features.map(feature => <li key={feature}><Check size={15} /> {feature}</li>)}</ul></div>
    <div className="project-phone-stage"><div className="project-phone"><div className="project-phone-notch" /><div className="project-phone-screen"><header><div><small>CHÀO BUỔI SÁNG</small><b>{template.name}</b></div><button type="button" aria-label="Thông báo"><Bell size={16} /></button></header><div className="project-phone-development"><Sparkles size={12} /> Đang phát triển</div><div className="project-phone-tabs">{tabs.map(tab => <button type="button" key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div><article className="project-phone-summary"><span>{active === "Tổng quan" ? <House size={18} /> : active === "Vận hành" ? <UsersRound size={18} /> : <PieChart size={18} />}</span><small>{summary[1].toUpperCase()}</small><b>{summary[0]}</b><i>+12% tuần này</i></article><div className="project-phone-stats"><article><span>TIẾN ĐỘ</span><b>86%</b><i><em /></i></article><article><span>GHI NHẬN</span><b>24</b><i><em /></i></article></div><section className="project-phone-activity"><div><span>HOẠT ĐỘNG GẦN ĐÂY</span><a href="#workspace">Xem tất cả <ChevronRight size={14} /></a></div>{["Cập nhật trạng thái mới", "Một yêu cầu đang chờ", "Lịch nhắc đã sẵn sàng"].map((item, index) => <button type="button" key={item}><i>{index === 0 ? <CircleDollarSign size={15} /> : index === 1 ? <UsersRound size={15} /> : <Check size={15} />}</i><span>{item}<small>Vừa xong</small></span><ChevronRight size={14} /></button>)}</section><footer><button type="button" className="active"><House size={16} /><span>Trang chủ</span></button><button type="button"><UsersRound size={16} /><span>Danh mục</span></button><button type="button"><PieChart size={16} /><span>Thống kê</span></button></footer></div></div></div>
  </section>;
}

export function ProjectTemplateDemo({ template }: { template: TemplateItem }) {
  const app = template.sourceKind === "app";
  const [active, setActive] = useState("Tổng quan");

  if (app) {
    return <main className="project-template-demo is-app" id="top"><MobileAppPreview template={template} active={active} setActive={setActive} /></main>;
  }

  const tabs = app ? ["Tổng quan", "Vận hành", "Báo cáo"] : ["Giới thiệu", "Giải pháp", "Liên hệ"];

  return <main className={`project-template-demo ${app ? "is-app" : "is-site"}`} id="top">
    <header className="project-template-nav">
      <a href="#top" className="project-template-brand">{template.name}<i>.</i></a>
      <nav aria-label="Điều hướng giao diện mẫu">{tabs.map(tab => <a href={app ? "#workspace" : "#solutions"} key={tab}>{tab}</a>)}</nav>
      <a href="#contact" className="project-template-nav-cta">{app ? "Bắt đầu dùng" : "Nhận tư vấn"} <ArrowUpRight size={15} /></a>
      <button className="project-template-menu" type="button" aria-label="Mở menu"><Menu size={20} /></button>
    </header>

    <section className="project-template-hero">
      <div className="project-template-copy"><span><Sparkles size={13} /> {app ? "GIAO DIỆN APP · ĐANG TRONG QUÁ TRÌNH PHÁT TRIỂN" : "GIAO DIỆN MẪU · NỘI DUNG MINH HỌA"}</span><h1>{template.tagline}</h1><p>{template.description}</p><div><a href={app ? "#workspace" : "#solutions"} className="project-template-primary">{app ? "Khám phá giao diện app" : "Khám phá giải pháp"} <ArrowRight size={17} /></a><a href="#contact" className="project-template-secondary">{app ? "Xem tính năng" : "Xem cấu trúc trang"}</a></div></div>
      <div className="project-template-cover"><span>{app ? "MOBILE EXPERIENCE / 2026" : "DESIGN SYSTEM / 2026"}</span><i>{template.name.slice(0, 2).toUpperCase()}</i></div>
    </section>

    {app ? <MobileAppPreview template={template} active={active} setActive={setActive} /> : <>
      <section className="project-proof"><span>ĐƯỢC XÂY DỰNG ĐỂ KỂ MỘT CÂU CHUYỆN RÕ RÀNG</span><div>{genericMetrics.map(([value, label]) => <article key={label}><b>{value}</b><small>{label}</small></article>)}</div></section>
      <section className="project-solutions" id="solutions"><div className="project-section-heading"><span>01 / CẤU TRÚC MẪU</span><h2>Từ điểm chạm đầu tiên đến hành động rõ ràng.</h2><p>Bố cục được thiết kế để hình ảnh dẫn dắt cảm xúc, trong khi nội dung giúp khách hàng ra quyết định nhanh hơn.</p></div><div className="project-solution-grid">{template.features.slice(0, 4).map((feature, index) => <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><p>Khối nội dung minh họa có thể tùy chỉnh theo thương hiệu, khách hàng và mục tiêu kinh doanh của bạn.</p><ArrowUpRight size={18} /></article>)}</div></section>
      <section className="project-showcase"><div className="project-showcase-image"><span>HÌNH ẢNH LÀ ĐIỂM BẮT ĐẦU</span></div><div><span>02 / TRẢI NGHIỆM</span><h2>Một giao diện có nhịp điệu riêng.</h2><p>Từng phần nội dung được đặt đúng thời điểm để người xem luôn biết cần nhìn gì và làm gì tiếp theo.</p><a href="#contact">Trao đổi về mẫu này <ArrowRight size={17} /></a></div></section>
    </>}

    <section className="project-template-contact" id="contact"><span>03 / CÙNG BẮT ĐẦU</span><h2>{app ? "Một không gian gọn hơn cho đội ngũ của bạn." : "Biến giao diện này thành câu chuyện của bạn."}</h2><Link href="/#contact">Trao đổi cùng DevDes <ArrowUpRight size={19} /></Link></section>
    <footer><a href="#top">{template.name}<i>.</i></a><span>Giao diện mẫu lấy cảm hứng từ dự án thực tế</span><small>© 2026 DevDes.click</small></footer>
  </main>;
}
