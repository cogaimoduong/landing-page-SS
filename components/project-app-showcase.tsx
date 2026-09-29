"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Home,
  LineChart,
  Menu,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { TemplateItem } from "@/lib/templates";
import "./project-app-showcase.css";

type AppKind = "penny" | "roomly" | "atlas";

type AppContent = {
  kind: AppKind;
  eyebrow: string;
  intro: string;
  primary: string;
  proof: [string, string][];
  steps: [string, string, string][];
  features: [string, string][];
  testimonial: string;
  person: string;
  faq: [string, string][];
};

const appContent: Record<AppKind, AppContent> = {
  penny: {
    kind: "penny",
    eyebrow: "TÀI CHÍNH CÁ NHÂN · NHẸ NHÀNG MỖI NGÀY",
    intro: "Ghi lại dòng tiền, nhìn rõ thói quen chi tiêu và dành chỗ cho những điều bạn thật sự muốn làm.",
    primary: "Khám phá ứng dụng",
    proof: [["03 phút", "để ghi lại một ngày"], ["12 nhóm", "chi tiêu dễ theo dõi"], ["100%", "dữ liệu của bạn"]],
    steps: [["01", "Ghi nhanh", "Thêm thu hoặc chi ngay sau khi phát sinh — chỉ vài chạm, không cần bảng tính."], ["02", "Nhìn rõ", "Penny tự nhóm các khoản để bạn biết tiền đang đi về đâu."], ["03", "Điều chỉnh", "Đặt một giới hạn vừa sức và để nhắc nhở giúp bạn bám sát kế hoạch."]],
    features: [["Một nơi cho mọi khoản", "Thu nhập, hoá đơn, khoản tiết kiệm và những chi tiêu nho nhỏ đều có chỗ riêng."], ["Ngân sách không áp lực", "Theo dõi theo tuần hoặc tháng, với nhịp độ phù hợp với cuộc sống của bạn."], ["Riêng tư từ nền tảng", "Khoá ứng dụng, dữ liệu cục bộ và quyền kiểm soát rõ ràng cho từng người dùng."]],
    testimonial: "“Tôi không còn né xem tài khoản vào cuối tháng. Penny làm con số trở nên dễ chịu và dễ hiểu hơn nhiều.”",
    person: "LINH AN · FREELANCER, TP.HCM",
    faq: [["Penny có kết nối với ngân hàng không?", "Bản mẫu minh hoạ luồng nhập liệu chủ động. Khi triển khai thực tế, khả năng kết nối sẽ được lựa chọn theo yêu cầu bảo mật và ngân hàng phù hợp."], ["Dữ liệu có được dùng cho mục đích khác không?", "Không. Màn hình mẫu này minh hoạ nguyên tắc dữ liệu cá nhân thuộc về người dùng; phạm vi lưu trữ và quyền truy cập luôn được công khai rõ ràng."]],
  },
  roomly: {
    kind: "roomly",
    eyebrow: "VẬN HÀNH CHỖ Ở · RÕ RÀNG TỪNG NGÀY",
    intro: "Tình trạng phòng, khách thuê, hoá đơn và việc cần làm — tất cả trong một nhịp vận hành bình tĩnh.",
    primary: "Xem không gian Roomly",
    proof: [["48 phòng", "trong tầm mắt"], ["02 phút", "tạo một hoá đơn"], ["24/7", "nắm tình trạng vận hành"]],
    steps: [["01", "Thiết lập toà nhà", "Đưa danh sách phòng, mức giá và trạng thái vào cùng một không gian trực quan."], ["02", "Đồng hành cùng khách", "Lưu hợp đồng, kỳ hạn và yêu cầu hỗ trợ để không bỏ sót một cuộc hẹn nào."], ["03", "Chốt ngày thật gọn", "Theo dõi khoản cần thu, công việc cần xử lý và báo cáo hoạt động theo ngày."]],
    features: [["Sơ đồ phòng trực quan", "Biết ngay phòng nào đang trống, sắp hết hạn hay cần được xử lý — không cần mở nhiều bảng."], ["Hợp đồng & hoá đơn theo kỳ", "Mọi mốc thanh toán nằm đúng ngữ cảnh của người thuê và căn phòng."], ["Việc vận hành có người nhận", "Phân công, theo dõi và khép lại từng yêu cầu bảo trì trong cùng một luồng làm việc."]],
    testimonial: "“Từ lúc dùng một màn hình để nắm phòng trống và hoá đơn, đội mình không còn mất cả buổi sáng chỉ để đối chiếu.”",
    person: "THUỲ DƯƠNG · QUẢN LÝ VẬN HÀNH",
    faq: [["Roomly phù hợp với mô hình nào?", "Luồng mẫu phù hợp với nhà trọ, căn hộ dịch vụ và đơn vị vận hành nhiều phòng. Các trường dữ liệu có thể tinh chỉnh theo quy trình thực tế."], ["Có thể phân quyền cho nhân viên không?", "Có. Khi phát triển bản thực tế, các vai trò như quản lý, lễ tân, kế toán và kỹ thuật có thể có quyền xem/chỉnh sửa riêng."]],
  },
  atlas: {
    kind: "atlas",
    eyebrow: "DỮ LIỆU VẬN HÀNH · ÍT NHIỄU, NHIỀU TÍN HIỆU",
    intro: "Biến dòng dữ liệu chuyên sâu thành danh sách ưu tiên rõ ràng cho đội ngũ đang cần ra quyết định nhanh.",
    primary: "Khám phá Atlas Ops",
    proof: [["18 nguồn", "được chuẩn hoá"], ["01 màn hình", "cho việc ưu tiên"], ["94%", "mục tiêu đúng hạn"]],
    steps: [["01", "Tập trung dữ liệu", "Kéo những nguồn quan trọng về một nơi, với cấu trúc và quyền xem phù hợp."], ["02", "Lọc tín hiệu", "Dùng bộ lọc theo vai trò, thời gian và trạng thái để bỏ qua phần không liên quan."], ["03", "Đưa ra hành động", "Chuyển kết quả thành việc cần làm, người phụ trách và nhịp báo cáo cụ thể."]],
    features: [["Bộ lọc dành cho công việc thật", "Lưu nhanh các góc nhìn dùng hằng ngày để mỗi người mở đúng dữ liệu mình cần."], ["Xếp hạng có ngữ cảnh", "Không chỉ là con số: mỗi thay đổi đều đi cùng nguồn, thời điểm và mức độ cần chú ý."], ["Báo cáo để quyết định", "Tóm tắt đúng phần quan trọng cho buổi họp, thay vì gửi thêm một bảng tính dài."]],
    testimonial: "“Atlas giúp cuộc họp tuần chuyển từ ‘có rất nhiều dữ liệu’ sang ‘đây là ba điều ta cần làm tiếp theo’.”",
    person: "GIA BẢO · PRODUCT OPERATIONS",
    faq: [["Atlas có thay thế kho dữ liệu hiện tại không?", "Không nhất thiết. Mẫu này mô tả một lớp làm việc rõ ràng hơn trên các nguồn dữ liệu sẵn có, tuỳ theo cách tổ chức đang vận hành."], ["Dữ liệu nhạy cảm được xử lý thế nào?", "Phân quyền theo vai trò, nhật ký truy cập và giới hạn trường dữ liệu là các nguyên tắc có thể đưa vào ngay từ giai đoạn thiết kế hệ thống."]],
  },
};

function getKind(template: TemplateItem): AppKind {
  if (template.slug.includes("roomly")) return "roomly";
  if (template.slug.includes("atlas")) return "atlas";
  return "penny";
}

function PhonePreview({ kind, active, setActive }: { kind: AppKind; active: number; setActive: (value: number) => void }) {
  const tabs = kind === "penny" ? ["Tổng quan", "Dòng tiền", "Kế hoạch"] : kind === "roomly" ? ["Toà nhà", "Khách thuê", "Công việc"] : ["Tổng quan", "Dữ liệu", "Báo cáo"];
  const header = kind === "penny" ? "Chào buổi sáng, An" : kind === "roomly" ? "Toà nhà Thảo Điền" : "Atlas / Hôm nay";

  return <div className="app-phone-stage" aria-label={`Xem trước ứng dụng ${kind}`}>
    <div className="app-phone-shadow" />
    <div className="app-phone">
      <div className="app-phone-island" />
      <div className="app-phone-screen">
        <header className="app-phone-header"><div><small>{kind === "penny" ? "THỨ BA, 29 THÁNG 9" : kind === "roomly" ? "VẬN HÀNH HÔM NAY" : "TÍN HIỆU MỚI CẬP NHẬT"}</small><b>{header}</b></div><button type="button" aria-label="Thông báo"><Bell size={16} /></button></header>
        <div className="app-phone-tabs" role="tablist" aria-label="Màn hình ứng dụng">{tabs.map((tab, index) => <button key={tab} type="button" role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}>{tab}</button>)}</div>
        {kind === "penny" ? <PennyScreen active={active} /> : kind === "roomly" ? <RoomlyScreen active={active} /> : <AtlasScreen active={active} />}
        <footer className="app-phone-footer"><button type="button" className="active" aria-label="Trang chủ"><Home size={16} /></button><button type="button" aria-label="Danh mục"><KindIcon kind={kind} /></button><button type="button" aria-label="Báo cáo"><LineChart size={16} /></button><button type="button" aria-label="Tài khoản"><span>MA</span></button></footer>
      </div>
    </div>
  </div>;
}

function KindIcon({ kind }: { kind: AppKind }) {
  if (kind === "penny") return <WalletCards size={16} />;
  if (kind === "roomly") return <Building2 size={16} />;
  return <Search size={16} />;
}

function PennyScreen({ active }: { active: number }) {
  const heading = active === 1 ? "Dòng tiền tháng 9" : active === 2 ? "Mục tiêu tháng này" : "Số dư khả dụng";
  const value = active === 1 ? "12.480.000đ" : active === 2 ? "72%" : "8.250.000đ";
  return <div className="app-phone-body penny-screen"><section className="phone-balance"><small>{heading.toUpperCase()}</small><strong>{value}</strong><span>{active === 2 ? "Đang đi đúng kế hoạch" : "+ 1.240.000đ so với tuần trước"}</span><i><em style={{ width: active === 2 ? "72%" : "58%" }} /></i></section><div className="phone-actions"><button type="button"><span><CircleDollarSign size={16} /></span>Thu</button><button type="button"><span><ReceiptText size={16} /></span>Chi</button><button type="button"><span><WalletCards size={16} /></span>Quỹ</button></div><section className="phone-list"><div><b>{active === 1 ? "Khoản vừa ghi" : "Chi tiêu hôm nay"}</b><button type="button">Xem tất cả <ChevronRight size={13} /></button></div>{[["Cà phê sáng", "Ăn uống", "45.000đ"], ["Chuyến xe về nhà", "Di chuyển", "32.000đ"], ["Lương dự án", "Thu nhập", "+ 4.500.000đ"]].map(([name, category, amount], index) => <article key={name}><i className={`penny-dot dot-${index}`}><ReceiptText size={14} /></i><span><b>{name}</b><small>{category}</small></span><strong>{amount}</strong></article>)}</section></div>;
}

function RoomlyScreen({ active }: { active: number }) {
  const rooms = active === 1 ? [["A-201", "Đang ở"], ["A-202", "Gia hạn"], ["A-203", "Đang ở"], ["A-204", "Trống"]] : [["A-201", "Đã thu"], ["A-202", "Cần nhắc"], ["A-203", "Đã thu"], ["A-204", "Trống"]];
  return <div className="app-phone-body roomly-screen"><section className="roomly-summary"><div><small>PHÒNG ĐANG Ở</small><strong>42 <span>/ 48</span></strong></div><i><em /></i><span><Check size={13} /> 6 yêu cầu đã khép lại</span></section><section className="room-grid"><div><b>{active === 2 ? "Việc cần xử lý" : "Tầng A · tuần này"}</b><button type="button"><CalendarDays size={14} /> 09/2026</button></div><div className="room-cells">{rooms.map(([room, status], index) => <button type="button" key={room} className={index === 1 ? "alert" : index === 3 ? "empty" : ""}><b>{room}</b><small>{status}</small></button>)}</div></section><section className="roomly-task"><i><ReceiptText size={16} /></i><div><b>{active === 2 ? "Kiểm tra điều hoà A-202" : "Hoá đơn A-202 sắp đến hạn"}</b><small>{active === 2 ? "Giao cho Huy · trước 16:00" : "Cần nhắc trước 17:00 hôm nay"}</small></div><ChevronRight size={15} /></section></div>;
}

function AtlasScreen({ active }: { active: number }) {
  const title = active === 1 ? "Bộ lọc đang lưu" : active === 2 ? "Tóm tắt vận hành" : "Tín hiệu cần chú ý";
  return <div className="app-phone-body atlas-screen"><section className="atlas-search"><Search size={15} /><span>Tìm theo nguồn, nhãn, người phụ trách</span></section><section className="atlas-heading"><div><small>{title.toUpperCase()}</small><strong>{active === 2 ? "06" : "12"}</strong><span>{active === 2 ? "điểm có thể đưa vào báo cáo" : "mục thay đổi từ lần kiểm tra gần nhất"}</span></div><i><Sparkles size={16} /></i></section><section className="atlas-signal-list">{[["Chuyển đổi kênh web", "+18,4%", "success"], ["Nhóm dữ liệu chờ duyệt", "04 mục", "warning"], ["Lượt quay lại tuần này", "+6,2%", "neutral"]].map(([name, value, tone]) => <article key={name}><i className={tone}><LineChart size={14} /></i><span><b>{name}</b><small>Cập nhật 12 phút trước</small></span><strong>{value}</strong></article>)}</section><section className="atlas-brief"><span>BRIEF HÔM NAY</span><b>{active === 2 ? "Ưu tiên 3 điều có thể tác động trong tuần." : "Dữ liệu sạch hơn, quyết định nhanh hơn."}</b><ChevronRight size={15} /></section></div>;
}

function AppNav({ template }: { template: TemplateItem }) {
  return <header className="app-template-nav"><a href="#top" className="app-template-brand">{template.name}<i>.</i></a><nav aria-label="Điều hướng mẫu ứng dụng"><a href="#features">Tính năng</a><a href="#workflow">Cách hoạt động</a><a href="#questions">Câu hỏi</a></nav><a href="#get-started" className="app-template-nav-cta">Trải nghiệm bản mẫu <ArrowUpRight size={15} /></a><button type="button" className="app-template-menu" aria-label="Mở menu"><Menu size={20} /></button></header>;
}

export function ProjectAppShowcase({ template }: { template: TemplateItem }) {
  const kind = getKind(template);
  const content = appContent[kind];
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  return <div className={`app-template app-template-${kind}`} id="top">
    <AppNav template={template} />
    <section className="app-template-hero">
      <div className="app-template-hero-copy"><span className="app-template-eyebrow"><Sparkles size={14} /> {content.eyebrow}</span><h1>{template.tagline}</h1><p>{content.intro}</p><div className="app-template-actions"><a href="#features" className="app-template-primary">{content.primary} <ArrowRight size={17} /></a><button type="button" className="app-template-play" onClick={() => setStarted(true)}><span>01</span> Xem luồng sử dụng</button></div>{started && <p className="app-template-note" role="status"><Check size={15} /> Bản xem trước đã sẵn sàng ở màn hình bên cạnh — thử chuyển các tab để xem luồng nội dung.</p>}</div>
      <PhonePreview kind={kind} active={active} setActive={setActive} />
    </section>
    <section className="app-proof"><span>ĐƯỢC THIẾT KẾ CHO NHỊP VẬN HÀNH THẬT</span><div>{content.proof.map(([value, label]) => <article key={label}><b>{value}</b><small>{label}</small></article>)}</div></section>
    <section className="app-features app-template-shell" id="features"><div className="app-section-heading"><span>01 / NƠI MỌI THỨ TRỞ NÊN RÕ RÀNG</span><h2>{kind === "penny" ? "Ít áp lực hơn khi hiểu được dòng tiền." : kind === "roomly" ? "Một nhịp vận hành gọn cho cả toà nhà." : "Dữ liệu đúng lúc để đội ngũ đi tiếp."}</h2><p>Không chỉ là một màn hình đẹp. Mỗi khối thông tin đều được đặt để giúp người dùng biết điều gì cần ưu tiên ngay lúc này.</p></div><div className="app-feature-grid">{content.features.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><i>{index === 0 ? <ClipboardCheck size={21} /> : index === 1 ? <LineChart size={21} /> : <ShieldCheck size={21} />}</i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="app-workflow" id="workflow"><div className="app-template-shell"><div className="app-section-heading app-section-heading-light"><span>02 / TỪ ĐIỀU NHỎ ĐẾN BỨC TRANH LỚN</span><h2>Khởi đầu đơn giản. Duy trì có nhịp.</h2></div><div className="app-workflow-grid">{content.steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowRight size={18} /></article>)}</div></div></section>
    <section className="app-reassurance app-template-shell"><div className="app-reassurance-card"><span><ShieldCheck size={17} /> MINH BẠCH & AN TÂM</span><h2>{kind === "atlas" ? "Bảo mật là một phần của luồng làm việc." : kind === "roomly" ? "Mỗi vai trò thấy đúng điều mình cần." : "Một không gian riêng cho những quyết định của bạn."}</h2><p>{kind === "atlas" ? "Quyền truy cập, dấu vết thay đổi và cách chia sẻ dữ liệu được tính từ đầu để đội ngũ có thể làm việc tự tin hơn." : kind === "roomly" ? "Phân quyền theo công việc, lịch sử thao tác và những lời nhắc đúng lúc giúp cả đội phối hợp mà không phải hỏi nhau liên tục." : "Các nguyên tắc về quyền riêng tư không nằm ở một dòng chữ nhỏ. Chúng là điều người dùng cảm thấy trong từng thao tác."}</p><div><span><Check size={15} /> Luồng minh hoạ theo nhu cầu thực tế</span><span><Check size={15} /> Có thể mở rộng theo thương hiệu</span></div></div><blockquote>{content.testimonial}<footer>{content.person}</footer></blockquote></section>
    <section className="app-questions app-template-shell" id="questions"><div className="app-section-heading"><span>03 / CÂU HỎI THƯỜNG GẶP</span><h2>Những điều nên rõ ngay từ đầu.</h2></div><div className="app-faq">{content.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight size={18} /></summary><p>{answer}</p></details>)}</div></section>
    <section className="app-final" id="get-started"><div className="app-template-shell"><span>04 / CÙNG BẮT ĐẦU</span><h2>{kind === "penny" ? "Tạo một mối quan hệ nhẹ nhàng hơn với tiền." : kind === "roomly" ? "Để việc vận hành có thêm thời gian cho con người." : "Để dữ liệu dẫn tới một bước đi rõ ràng."}</h2><Link href="/#contact">Trao đổi về mẫu này <ArrowUpRight size={20} /></Link></div></section>
    <footer className="app-template-footer"><a href="#top">{template.name}<i>.</i></a><span>Giao diện mẫu dành cho trải nghiệm ứng dụng thực tế</span><small>© 2026 DevDes.click</small></footer>
  </div>;
}
