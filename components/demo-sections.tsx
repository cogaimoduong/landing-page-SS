"use client";

import { useState } from "react";
import type { TemplateItem } from "@/lib/templates";

type Offering = { title: string; meta: string; price: string; items: string[] };
type Content = { eyebrow: string; title: string; intro: string; offers: Offering[]; guideTitle: string; guides: [string, string][]; faq: [string, string][] };

export const demoContent: Record<string, Content> = {
  "ridenow-car-rental": {
    eyebrow: "ĐỘI XE & GÓI THUÊ", title: "Đúng chiếc xe. Đúng chuyến đi.", intro: "So sánh số chỗ, hành lý và hạn mức di chuyển trước khi chọn xe. Giá dưới đây là dữ liệu minh họa cho bản mẫu.",
    offers: [
      { title: "Porsche 911 Carrera", meta: "Coupe · Tự động · 2+2 chỗ", price: "5.800.000đ / ngày", items: ["2 hành lý nhỏ · Xăng", "Giới hạn 200 km/ngày", "Đặt cọc 30.000.000đ"] },
      { title: "Mercedes-Benz GLC", meta: "SUV · Tự động · 5 chỗ", price: "2.400.000đ / ngày", items: ["3 vali · Ghế trẻ em tùy chọn", "Giới hạn 250 km/ngày", "Đặt cọc 15.000.000đ"] },
      { title: "Mini Cooper", meta: "Đô thị · Tự động · 4 chỗ", price: "1.500.000đ / ngày", items: ["2 vali · Camera lùi", "Giới hạn 200 km/ngày", "Đặt cọc 10.000.000đ"] },
    ],
    guideTitle: "Nhận xe ở đâu, chuẩn bị những gì?", guides: [["Điểm giao nhận", "Nhận tại Quận 1, sân bay Tân Sơn Nhất hoặc yêu cầu giao tận nơi trong TP.HCM. Phí giao nhận được xác nhận trước khi đặt."], ["Hồ sơ & bàn giao", "Chuẩn bị giấy phép lái xe phù hợp và giấy tờ định danh. Hai bên ghi nhận tình trạng xe, mức nhiên liệu và số kilomet khi giao nhận."], ["Bảo hiểm & hỗ trợ", "Xem phạm vi bảo hiểm và mức miễn thường trong hợp đồng. Có hỗ trợ sự cố, đổi xe theo tình trạng thực tế và lựa chọn tài xế riêng."]],
    faq: [["Có được đi tỉnh không?", "Có thể đăng ký hành trình liên tỉnh khi gửi yêu cầu. Hạn mức kilomet và khu vực sử dụng được ghi rõ trong báo giá."], ["Trả xe trễ được tính thế nào?", "Thông báo trước giờ trả để kiểm tra lịch xe. Phí quá giờ và vượt kilomet được xác nhận trong hợp đồng trước khi nhận xe."]],
  },
  "nestly-home-rental": {
    eyebrow: "BỘ SƯU TẬP CHỖ Ở", title: "Một nơi vừa vặn với bạn.", intro: "Từ cuối tuần trên đồi đến một tháng sống cạnh biển, chọn chỗ ở theo số khách và tiện nghi bạn cần.",
    offers: [
      { title: "Pine Hill House · Đà Lạt", meta: "4 khách · 2 phòng ngủ · 2 phòng tắm", price: "1.800.000đ / đêm", items: ["Bếp riêng, sân BBQ, chỗ đỗ xe", "Nhận phòng 14:00 · Trả phòng 11:00", "Tối thiểu 2 đêm"] },
      { title: "The Garden Loft · Hội An", meta: "2 khách · 1 phòng ngủ · 1 phòng tắm", price: "950.000đ / đêm", items: ["Vườn riêng, máy giặt, bàn làm việc", "Cách phố cổ 10 phút đạp xe", "Ưu đãi cho kỳ ở từ 7 đêm"] },
      { title: "Coastal Home · Đà Nẵng", meta: "6 khách · 3 phòng ngủ · 2 phòng tắm", price: "2.600.000đ / đêm", items: ["Ban công nhìn biển, bếp đầy đủ", "Đi bộ 5 phút đến bãi biển", "Cho phép thú cưng khi báo trước"] },
    ],
    guideTitle: "Sống như người địa phương.", guides: [["Đà Lạt · Sáng giữa rừng thông", "Ghé quán cà phê trong vườn, dạo hồ lúc sớm và trở về căn bếp riêng cho bữa tối cùng bạn bè."], ["Hội An · Một nhịp sống khác", "Mượn xe đạp từ chủ nhà, khám phá làng rau và chợ địa phương. Cẩm nang ăn uống có sẵn khi nhận phòng."], ["Chủ nhà luôn ở gần", "Nhận hướng dẫn vào nhà, mật khẩu Wi-Fi và đầu mối hỗ trợ trước ngày đến. Các yêu cầu thêm khách cần được chủ nhà xác nhận."]],
    faq: [["Tổng tiền có bao gồm phí dọn dẹp?", "Báo giá tách rõ tiền phòng, phí dọn dẹp và phụ thu nếu có. Bạn xem tổng chi phí trước khi xác nhận."], ["Có thể tổ chức tiệc không?", "Mỗi căn có nội quy riêng. Không tổ chức sự kiện khi chưa được chủ nhà chấp thuận; giữ yên tĩnh từ 22:00 đến 07:00."]],
  },
  "gearup-equipment-rental": {
    eyebrow: "DANH MỤC & THÔNG SỐ", title: "Thiết bị phù hợp tải công việc.", intro: "Chọn theo tải trọng, công suất và thời gian vận hành. Đội kỹ thuật xác nhận cấu hình trước khi lập báo giá.",
    offers: [
      { title: "Máy xúc Komatsu PC200", meta: "20 tấn · Gầu 0,8 m³", price: "Báo giá theo ca", items: ["Ca tiêu chuẩn 8 giờ", "Tùy chọn kèm người vận hành", "Vận chuyển bằng xe chuyên dụng"] },
      { title: "Xe nâng Toyota 3T", meta: "Tải trọng 3 tấn · Nâng cao 3 m", price: "Báo giá theo ngày", items: ["Chọn động cơ dầu hoặc điện", "Khảo sát lối vào và mặt nền", "Biên bản kiểm tra khi bàn giao"] },
      { title: "Máy phát điện 100 kVA", meta: "3 pha · 380 V · Vỏ chống ồn", price: "Báo giá theo tháng", items: ["Tủ ATS theo yêu cầu", "Tư vấn tải và cáp đấu nối", "Lịch bảo dưỡng định kỳ"] },
    ],
    guideTitle: "Từ kho máy đến công trường.", guides: [["01 / Khảo sát kỹ thuật", "Cung cấp địa điểm, tải công việc, mặt bằng và lịch thi công. Kỹ thuật tư vấn cấu hình và phương án vận chuyển."], ["02 / Kiểm định & an toàn", "Bàn giao hồ sơ thiết bị, checklist an toàn và hướng dẫn sử dụng. Chỉ bố trí người vận hành đáp ứng yêu cầu của thiết bị."], ["03 / Bảo trì & thay thế", "Ghi nhận giờ máy, hẹn bảo dưỡng và tiếp nhận sự cố. Phương án máy thay thế được xác nhận theo khu vực và tồn kho."]],
    faq: [["Giá thuê có bao gồm nhiên liệu?", "Báo giá thể hiện riêng tiền thuê, nhiên liệu, nhân công và vận chuyển tùy gói. Không mặc định tất cả chi phí đã bao gồm."], ["Có thuê dài hạn cho dự án không?", "Có gói theo tuần, tháng và tiến độ công trình. Gửi lịch sử dụng để nhận phương án cung ứng và bảo trì phù hợp."]],
  },
  "aurelia-luxury-hotel": {
    eyebrow: "PHÒNG & ĐẶC QUYỀN", title: "Một khoảng riêng bên vịnh.", intro: "Các hạng phòng minh họa dành cho kỳ nghỉ đôi, gia đình và những dịp đặc biệt. Giá thực tế phụ thuộc ngày lưu trú.",
    offers: [
      { title: "Garden Suite", meta: "65 m² · 2 người lớn · Hướng vườn", price: "2.800.000đ / đêm", items: ["Giường King, bồn tắm riêng", "Bữa sáng cho 2 khách", "Sân hiên giữa khu vườn"] },
      { title: "Ocean Pool Villa", meta: "120 m² · 2 người lớn · Hướng biển", price: "6.500.000đ / đêm", items: ["Hồ bơi riêng", "Bữa sáng tại villa", "Đón tiếp riêng khi đến"] },
      { title: "Family Residence", meta: "180 m² · 4 người lớn · 2 phòng ngủ", price: "9.800.000đ / đêm", items: ["Phòng khách và bàn ăn riêng", "Hoạt động dành cho trẻ nhỏ", "Tùy chọn đầu bếp riêng"] },
    ],
    guideTitle: "Nghỉ dưỡng bằng mọi giác quan.", guides: [["Ẩm thực bên vịnh", "Nhà hàng phục vụ bữa sáng 06:30–10:00 và thực đơn hải sản theo mùa. Đặt trước bữa tối riêng bên biển."], ["Spa & tái tạo năng lượng", "Liệu trình 60 hoặc 90 phút, yoga buổi sáng và không gian thư giãn. Vui lòng hẹn trước để chọn khung giờ."], ["Stay longer · 3 đêm", "Gói minh họa gồm 3 đêm, bữa sáng và một trải nghiệm ẩm thực. Kiểm tra ngày áp dụng và điều kiện hủy khi đặt."]],
    faq: [["Di chuyển đến resort thế nào?", "Đội lễ tân hỗ trợ sắp xếp hành trình từ sân bay Cam Ranh đến bến tàu và chuyến tàu đến resort. Lịch và phí được xác nhận trước."], ["Có hỗ trợ dịp kỷ niệm không?", "Có thể yêu cầu trang trí phòng, bánh hoặc bữa tối riêng. Gửi mong muốn trước ngày đến để nhận phương án phù hợp."]],
  },
  "sunday-boutique-hotel": {
    eyebrow: "PICK YOUR MOOD", title: "Mỗi phòng, một chút vui.", intro: "Đi một mình, đi hai người hay cùng hội bạn — luôn có một góc nhỏ dành cho bạn giữa Sài Gòn.",
    offers: [
      { title: "The Cozy Room", meta: "22 m² · 2 khách · Queen bed", price: "980.000đ / đêm", items: ["Vòi sen, bàn làm việc", "Cà phê chào mừng", "Cửa sổ nhìn phố"] },
      { title: "The Pink Room", meta: "32 m² · 2 khách · King bed", price: "1.450.000đ / đêm", items: ["Bồn tắm, ban công nhỏ", "Bữa sáng cho hai người", "Loa Bluetooth trong phòng"] },
      { title: "Friends Studio", meta: "45 m² · 4 khách · 2 giường đôi", price: "2.200.000đ / đêm", items: ["Góc ngồi chung", "Tủ đồ riêng cho từng khách", "Board game tại sảnh"] },
    ],
    guideTitle: "Hello, Sài Gòn!", guides: [["Ăn sáng như người Sài Gòn", "Bắt đầu với bánh mì và cà phê sữa đá tại quầy tầng trệt, phục vụ 07:00–10:30."], ["Local guide của tụi mình", "Một vòng các quán cà phê, tiệm sách và những con hẻm gần khách sạn. Lễ tân có gợi ý cho cả ngày mưa."], ["Cuối tuần trên rooftop", "Acoustic tối thứ Bảy, đồ uống theo mùa và góc ngắm thành phố. Khách lưu trú có thể đăng ký tại lễ tân."]],
    faq: [["Có gửi hành lý trước giờ nhận phòng?", "Có khu vực gửi hành lý tại lễ tân. Nhận phòng từ 14:00 và trả phòng trước 12:00; nhận sớm tùy phòng trống."], ["Có giặt đồ không?", "Khách có thể đăng ký dịch vụ giặt theo túi tại lễ tân. Thời gian trả và chi phí được báo trước khi nhận đồ."]],
  },
  "hush-minimal-hotel": {
    eyebrow: "SPACES TO REST", title: "Ở lại cùng sự tĩnh lặng.", intro: "Ba không gian lấy cảm hứng từ ánh sáng, gỗ và khu vườn Kyoto. Giá minh họa được niêm yết bằng yên Nhật.",
    offers: [
      { title: "Tatami Room", meta: "24 m² · 2 khách · Futon", price: "¥18.000 / đêm", items: ["Sàn tatami, góc trà", "Phòng tắm riêng", "Không gian không hút thuốc"] },
      { title: "Garden Room", meta: "36 m² · 2 khách · King bed", price: "¥26.000 / đêm", items: ["Hiên nhìn vườn Nhật", "Bồn tắm ngâm", "Bữa sáng kiểu Nhật"] },
      { title: "Hush Suite", meta: "52 m² · 2 khách · Suite", price: "¥38.000 / đêm", items: ["Phòng trà riêng", "Góc đọc sách", "Đón tiếp và hướng dẫn riêng"] },
    ],
    guideTitle: "Những nghi thức nhỏ mỗi ngày.", guides: [["Bữa sáng theo mùa", "Cơm, súp miso và món ăn địa phương phục vụ 07:30–09:30. Báo trước các yêu cầu ăn uống khi đặt phòng."], ["Trà & khu vườn", "Trải nghiệm pha trà vào buổi chiều và khoảng lặng bên vườn đá. Số chỗ giới hạn để giữ không gian yên tĩnh."], ["Kyoto, đi bộ thật chậm", "Nhận bản đồ các đường đi bộ, cửa hàng thủ công và điểm tham quan lân cận tại quầy đón tiếp."]],
    faq: [["Không gian có phù hợp trẻ em?", "Vui lòng cho biết độ tuổi và số trẻ trong yêu cầu đặt phòng để được tư vấn hạng phòng và điều kiện lưu trú."], ["Có quy định giờ yên tĩnh?", "Giữ yên tĩnh từ 21:00 đến 08:00. Toàn bộ phòng không hút thuốc; vui lòng dùng khu vực được chỉ dẫn."]],
  },
  "loud-creative-agency": {
    eyebrow: "CREATIVE CAPABILITIES", title: "Từ ý tưởng lớn đến đường phố.", intro: "Một đội ngũ xuyên suốt từ chiến lược sáng tạo, sản xuất đến triển khai chiến dịch.",
    offers: [
      { title: "Brand launch", meta: "Chiến lược + sáng tạo", price: "4–6 tuần", items: ["Workshop định vị", "Big idea & key visual", "Bộ hướng dẫn triển khai"] },
      { title: "Integrated campaign", meta: "Digital + trải nghiệm", price: "6–10 tuần", items: ["Concept đa kênh", "Video, social, OOH", "Kế hoạch ra mắt & đo lường"] },
      { title: "Content studio", meta: "Sản xuất liên tục", price: "Theo tháng", items: ["Lịch nội dung", "Photo & video production", "Báo cáo và tối ưu sáng tạo"] },
    ],
    guideTitle: "Case study / ĐẬM — Chất đường phố", guides: [["Thách thức", "Tình huống minh họa: đưa một thương hiệu đồ uống đến gần nhóm khách hàng trẻ giữa thị trường nhiều tiếng nói."], ["Cách làm", "Biến chất liệu đường phố thành key visual, phim ngắn và trải nghiệm pop-up; giữ một ý tưởng xuyên suốt mọi điểm chạm."], ["Kết quả mẫu", "2,4 triệu lượt tiếp cận · 18.000 tương tác · 3 điểm trải nghiệm. Các số liệu chỉ dùng để trình bày bố cục case study."]],
    faq: [["Cần chuẩn bị gì trước buổi gặp?", "Mục tiêu chiến dịch, đối tượng, ngân sách dự kiến và thời điểm ra mắt. Chưa có brief hoàn chỉnh vẫn có thể bắt đầu từ buổi trao đổi."], ["Studio có phụ trách sản xuất không?", "Có thể tổ chức thiết kế, chụp ảnh, quay phim và phối hợp đối tác sản xuất. Phạm vi và bản quyền được xác định trong đề xuất."]],
  },
  "halo-digital-marketing": {
    eyebrow: "GROWTH SERVICES", title: "Đo lường ở từng bước tăng trưởng.", intro: "Chọn đúng điểm nghẽn trong hành trình khách hàng, xây kế hoạch thử nghiệm và theo dõi chỉ số phù hợp.",
    offers: [
      { title: "Growth audit", meta: "Đánh giá nền tảng", price: "2 tuần", items: ["Kiểm tra kênh và tracking", "Phân tích funnel chuyển đổi", "Lộ trình thử nghiệm 90 ngày"] },
      { title: "Performance marketing", meta: "Thu hút khách hàng", price: "Theo tháng", items: ["Google & Meta Ads", "Creative testing", "Báo cáo CAC, ROAS và doanh thu"] },
      { title: "SEO & lifecycle", meta: "Tăng trưởng dài hạn", price: "Lộ trình 3–6 tháng", items: ["SEO kỹ thuật và nội dung", "Email automation", "Tối ưu landing page"] },
    ],
    guideTitle: "Case study / Finverse — Tối ưu chuyển đổi", guides: [["Bài toán", "Tình huống minh họa: lưu lượng truy cập tăng nhưng tỷ lệ đăng ký thấp, dữ liệu quảng cáo chưa nối với CRM."], ["Thử nghiệm", "Chuẩn hóa sự kiện, phân nhóm landing page và thử nghiệm thông điệp theo từng nguồn truy cập."], ["Dashboard kết quả mẫu", "Tỷ lệ chuyển đổi 2,1% → 3,4% · CAC giảm 24% · ROAS 3,8x. Số liệu minh họa, không phải cam kết hiệu quả."]],
    faq: [["Ngân sách quảng cáo có nằm trong phí dịch vụ?", "Ngân sách mua quảng cáo được tách riêng khỏi phí quản lý và sản xuất. Đề xuất thể hiện từng khoản theo mục tiêu."], ["Bao lâu có thể đánh giá hiệu quả?", "Thống nhất chu kỳ đánh giá theo kênh, chất lượng dữ liệu và thời gian chuyển đổi. Báo cáo gồm kết quả, giả thuyết và bước thử nghiệm tiếp theo."]],
  },
  "muse-brand-studio": {
    eyebrow: "OUR PRACTICE", title: "Thương hiệu có chiều sâu.", intro: "Chúng tôi kết nối chiến lược và thiết kế để mỗi chi tiết đều kể cùng một câu chuyện.",
    offers: [
      { title: "Brand foundation", meta: "Nghiên cứu & định vị", price: "3–4 tuần", items: ["Nghiên cứu bối cảnh", "Định vị, tính cách, giọng nói", "Câu chuyện thương hiệu"] },
      { title: "Visual identity", meta: "Hệ thống nhận diện", price: "4–6 tuần", items: ["Logo, typography, màu sắc", "Art direction & ứng dụng", "Brand guidelines"] },
      { title: "Digital presence", meta: "Trải nghiệm thương hiệu", price: "6–8 tuần", items: ["Website & portfolio", "Thiết kế bao bì số", "Bàn giao thư viện tài sản"] },
    ],
    guideTitle: "Selected story / Mộc Nhiên", guides: [["Khởi đầu", "Dự án minh họa cho một thương hiệu đồ thủ công muốn giữ tinh thần mộc mạc khi mở rộng sang kênh bán hàng mới."], ["Ngôn ngữ thiết kế", "Bảng màu đất, kiểu chữ tiết chế và nhiếp ảnh chất liệu tạo nên hệ thống nhận diện nhất quán từ bao bì đến website."], ["Bàn giao", "Bộ nhận diện, hướng dẫn 48 trang, hệ thống bao bì và website giới thiệu. Một thư viện để đội ngũ tiếp tục sử dụng độc lập."]],
    faq: [["Có thể chỉ làm bộ nhận diện?", "Có. Phạm vi có thể bắt đầu từ nhận diện hoặc mở rộng đến chiến lược, bao bì và website tùy giai đoạn của thương hiệu."], ["File gốc được bàn giao thế nào?", "Danh mục file, quyền sử dụng font và hình ảnh được ghi rõ trong hợp đồng. Buổi bàn giao hướng dẫn đội ngũ áp dụng hệ thống."]],
  },
};

export function DemoSections({ template }: { template: TemplateItem }) {
  const data = demoContent[template.slug];
  const [selection, setSelection] = useState("");
  if (!data) return null;
  const hotel = template.category === "hotel";
  const agency = template.category === "advertising";
  return <>
    {agency && <section className="sample-content expanded-section" id="options">
      <div className="sample-section-title"><span>{data.eyebrow}</span><h2>{data.title}</h2></div>
      <p className="expanded-intro">{data.intro}</p>
      <div className="offer-grid">{data.offers.map((offer, index) => <article className="offer-card" key={offer.title}>
        <span className="offer-number">0{index + 1} / {agency ? "EXPERTISE" : hotel ? "STAY" : "COLLECTION"}</span>
        <h3>{offer.title}</h3><p>{offer.meta}</p><strong>{offer.price}</strong>
        <ul>{offer.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a href="#inquiry" onClick={() => setSelection(offer.title)}>{agency ? "Trao đổi về dịch vụ" : hotel ? "Chọn hạng phòng" : "Chọn gói thuê"} <span>↗</span></a>
      </article>)}</div>
    </section>}
    <section className="expanded-guide" id="guide"><div className="sample-content"><span>{agency ? "BEHIND THE WORK" : "TRẢI NGHIỆM & THÔNG TIN"}</span><h2>{data.guideTitle}</h2><div className="guide-grid">{data.guides.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    {agency && <section className="sample-content expanded-section" id="team"><div className="sample-section-title"><span>MEET THE TEAM</span><h2>Những người cùng bạn thực hiện.</h2></div><div className="team-grid">{[["MA", "Minh Anh", template.slug.includes("halo") ? "Growth Strategist" : "Strategy Director"], ["QH", "Quang Huy", "Creative Director"], ["TV", "Thảo Vy", template.slug.includes("halo") ? "Performance Lead" : "Design Lead"]].map(([initials, name, role]) => <article key={name}><div aria-hidden="true">{initials}</div><h3>{name}</h3><p>{role}</p></article>)}</div><p className="demo-note">Đội ngũ và dự án minh họa cho giao diện studio.</p></section>}
    <section className="sample-content expanded-section" id="policies"><div className="sample-section-title"><span>THÔNG TIN TRƯỚC KHI {agency ? "HỢP TÁC" : "ĐẶT"}</span><h2>{agency ? "Cùng làm rõ từ đầu." : "Chuẩn bị cho một trải nghiệm tốt."}</h2></div><div className="expanded-faq">{data.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<details><summary>{agency ? "Quy trình duyệt và thanh toán?" : "Thay đổi lịch và hủy đặt chỗ?"}</summary><p>{agency ? "Đề xuất chia rõ mốc bàn giao, số vòng chỉnh sửa và lịch thanh toán. Mỗi giai đoạn được xác nhận trước khi chuyển sang bước tiếp theo." : "Điều kiện thay đổi, thời hạn hủy và khoản đặt cọc phụ thuộc gói được chọn. Bản xác nhận sẽ thể hiện các điều kiện để bạn kiểm tra trước khi thanh toán."}</p></details></div></section>
    <InquiryForm template={template} options={data.offers.map(o => o.title)} selection={selection} onSelection={setSelection} />
  </>;
}

function InquiryForm({ template, options, selection, onSelection }: { template: TemplateItem; options: string[]; selection: string; onSelection: (value: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const agency = template.category === "advertising";
  const hotel = template.category === "hotel";
  return <section className="sample-content inquiry-section" id="inquiry"><div><span>{agency ? "LET’S TALK" : "LÊN KẾ HOẠCH"}</span><h2>{agency ? "Kể chúng tôi nghe về dự án." : hotel ? "Kỳ nghỉ bắt đầu từ đây." : "Bạn cần thuê gì?"}</h2><p>{agency ? "Chia sẻ mục tiêu, phạm vi và thời gian dự kiến để chuẩn bị buổi trao đổi đầu tiên." : "Chọn nhu cầu và thời gian dự kiến để xem thử quy trình gửi yêu cầu."}</p><small>Biểu mẫu trải nghiệm: thông tin không được gửi đi và chưa tạo đặt chỗ thực tế.</small></div>
    <form onChange={() => setSubmitted(false)} onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
      <label>Họ và tên<input required name="name" autoComplete="name" placeholder="Tên của bạn" /></label>
      <label>Email<input required type="email" name="email" autoComplete="email" placeholder="ban@example.com" /></label>
      <label className="form-wide">{agency ? "Dịch vụ quan tâm" : hotel ? "Hạng phòng" : "Sản phẩm / chỗ ở"}<select required value={selection} onChange={event => onSelection(event.target.value)}><option value="">Chọn một phương án</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>
      <label>{agency ? "Dự kiến bắt đầu" : "Ngày nhận"}<input required type="date" name="start" onChange={event => { const end = event.currentTarget.form?.elements.namedItem("end") as HTMLInputElement | null; if (end) end.min = event.target.value; }} /></label>
      {agency ? <label>Ngân sách dự kiến<select required name="budget"><option value="">Chọn khoảng ngân sách</option><option>Dưới 50 triệu</option><option>50–150 triệu</option><option>Trên 150 triệu</option><option>Cần tư vấn</option></select></label> : <label>Ngày trả<input required type="date" name="end" /></label>}
      <label className="form-wide">{agency ? "Mục tiêu & mô tả dự án" : "Số khách / số lượng & yêu cầu thêm"}<textarea name="message" rows={4} placeholder={agency ? "Bạn đang muốn giải quyết điều gì?" : "Cho chúng tôi biết nhu cầu của bạn…"} /></label>
      <button className="form-wide" type="submit">{agency ? "Xem thử gửi brief" : "Xem thử gửi yêu cầu"} ↗</button>
      {submitted && <p className="form-wide form-result" role="status">Đã hoàn tất bước gửi thử cho {selection}. Đây là bản mẫu; chưa có thông tin nào được gửi đến {template.name}.</p>}
    </form>
  </section>;
}
