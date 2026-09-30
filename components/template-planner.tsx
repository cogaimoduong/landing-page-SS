"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Compass } from "lucide-react";
import type { TemplateItem } from "@/lib/templates";
import { useLocale } from "./locale-provider";

const plans = {
  rental: {
    vi: { eyebrow: "CHUẨN BỊ CHO HÀNH TRÌNH", title: "Bắt đầu từ nhu cầu của bạn.", intro: "Một vài chi tiết nhỏ giúp bạn chọn đúng ngay từ đầu.", tabs: ["Chọn phương án", "Dự trù chi phí", "Trước khi nhận"], descriptions: ["Xem thông số và so sánh các lựa chọn trước khi gửi yêu cầu.", "Dành một khoảng ngân sách rõ ràng cho toàn bộ thời gian sử dụng.", "Kiểm tra thông tin bàn giao để hành trình diễn ra thuận lợi."], items: [["Số người hoặc khối lượng sử dụng", "Địa điểm và thời gian dự kiến", "Các tiện ích thực sự cần thiết"], ["Giá cơ bản theo ngày hoặc đêm", "Phí giao nhận và dịch vụ thêm", "Khoản đặt cọc và điều kiện hoàn trả"], ["Giấy tờ và thông tin liên hệ", "Tình trạng thực tế khi bàn giao", "Đầu mối hỗ trợ trong thời gian thuê"]], cta: "Khám phá các lựa chọn" },
    en: { eyebrow: "PLAN YOUR NEXT MOVE", title: "Start with what you need.", intro: "A few thoughtful details make choosing much easier.", tabs: ["Find your fit", "Plan your budget", "Before you arrive"], descriptions: ["Review specifications and compare options before sending a request.", "Set a clear budget for the entire length of your rental.", "Check the handover details for a smooth start."], items: [["Capacity or expected workload", "Location and preferred dates", "The amenities you actually need"], ["Base daily or nightly rate", "Delivery and optional services", "Deposit and refund conditions"], ["Documents and contact details", "Condition at handover", "Your support contact during the rental"]], cta: "Explore the collection" },
  },
  hotel: {
    vi: { eyebrow: "MỘT KỲ NGHỈ THEO Ý BẠN", title: "Ở lại. Và tận hưởng nhiều hơn.", intro: "Chọn nhịp điệu cho chuyến đi, chúng tôi gợi ý những điều cần chuẩn bị.", tabs: ["Nghỉ ngơi", "Khám phá", "Đi cùng nhau"], descriptions: ["Một khoảng thời gian dành riêng cho sự thư thái.", "Dành chỗ trong lịch trình cho những trải nghiệm địa phương.", "Những kỷ niệm đẹp bắt đầu từ một không gian vừa vặn."], items: [["Ưu tiên phòng yên tĩnh, hướng vườn", "Xem dịch vụ ăn sáng và thư giãn", "Trao đổi giờ nhận, trả phòng"], ["Xem cẩm nang khu vực xung quanh", "Hỏi về phương tiện di chuyển", "Chừa thời gian cho một buổi đi bộ"], ["Kiểm tra sức chứa và loại giường", "Ghi chú độ tuổi của trẻ đi cùng", "Trao đổi nhu cầu phòng gần nhau"]], cta: "Tìm căn phòng của bạn" },
    en: { eyebrow: "A STAY AT YOUR OWN PACE", title: "Stay a little. Enjoy a little more.", intro: "Choose the mood of your trip and make room for the details that matter.", tabs: ["Unwind", "Explore", "Come together"], descriptions: ["A little time dedicated entirely to slowing down.", "Leave space in your itinerary for local discoveries.", "Shared memories begin with a space that fits."], items: [["Consider a quiet, garden-facing room", "Explore breakfast and wellness options", "Confirm arrival and departure times"], ["Read the neighbourhood guide", "Ask about local transport", "Leave time for an unplanned walk"], ["Check capacity and bed arrangements", "Include the ages of children travelling", "Ask about rooms close to each other"]], cta: "Find your room" },
  },
  advertising: {
    vi: { eyebrow: "TỪ Ý TƯỞNG ĐẾN BẢN BRIEF", title: "Một điểm bắt đầu thật rõ ràng.", intro: "Chưa cần có mọi câu trả lời. Bắt đầu bằng điều bạn muốn thay đổi.", tabs: ["Xây thương hiệu", "Ra mắt sản phẩm", "Tăng trưởng"], descriptions: ["Đặt nền tảng cho một thương hiệu có tiếng nói riêng.", "Kết nối câu chuyện, hình ảnh và trải nghiệm ra mắt.", "Tìm đúng điểm cần cải thiện trong hành trình khách hàng."], items: [["Khách hàng bạn muốn tiếp cận", "Điều khiến thương hiệu khác biệt", "Những điểm chạm cần đồng bộ"], ["Thông điệp và lợi ích sản phẩm", "Mốc ra mắt và kênh truyền thông", "Danh sách ấn phẩm cần bàn giao"], ["Mục tiêu và chỉ số hiện tại", "Kênh đang hoạt động hiệu quả", "Ngân sách và thời gian thử nghiệm"]], cta: "Cùng trao đổi về dự án" },
    en: { eyebrow: "FROM AN IDEA TO A BRIEF", title: "A clearer place to begin.", intro: "You do not need every answer. Start with the change you want to make.", tabs: ["Build a brand", "Launch a product", "Grow your reach"], descriptions: ["Lay the groundwork for a brand with its own voice.", "Connect the story, visuals, and launch experience.", "Find the right opportunity in your customer journey."], items: [["The audience you want to reach", "What makes your brand different", "Touchpoints that need consistency"], ["The message and product benefits", "Launch date and communication channels", "The deliverables your team needs"], ["Your goals and current metrics", "Channels already working well", "Budget and experimentation timeline"]], cta: "Tell us about your project" },
  },
};

export function TemplatePlanner({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const category = template.category as keyof typeof plans;
  const copy = plans[category]?.[locale];
  if (!copy) return null;
  return <section className="template-planner sample-content" aria-labelledby="planner-title">
    <div className="planner-heading"><span><Compass size={16} /> {copy.eyebrow}</span><h2 id="planner-title">{copy.title}</h2><p>{copy.intro}</p><a href={category === "advertising" ? "#inquiry" : "#options"}>{copy.cta} <ArrowUpRight size={18} /></a></div>
    <div className="planner-card">
      <div className="planner-options" aria-label={copy.eyebrow}>{copy.tabs.map((tab, index) => <button type="button" key={tab} aria-pressed={active === index} aria-controls="planner-content" onClick={() => setActive(index)}>{tab}</button>)}</div>
      <div id="planner-content" className="planner-content" aria-live="polite"><span className="planner-number">0{active + 1} / 03</span><h3>{copy.tabs[active]}</h3><p>{copy.descriptions[active]}</p><ul>{copy.items[active].map(item => <li key={item}><Check size={16} />{item}</li>)}</ul></div>
      <div className="planner-signature"><span>{template.name}</span><span>{locale === "en" ? "GOOD THINGS START HERE ↗" : "ĐIỀU TỐT ĐẸP BẮT ĐẦU TỪ ĐÂY ↗"}</span></div>
    </div>
  </section>;
}
