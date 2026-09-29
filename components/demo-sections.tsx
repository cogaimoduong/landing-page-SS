"use client";

import { useState } from "react";
import type { TemplateItem } from "@/lib/templates";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

type Offering = { title: string; meta: string; price: string; items: string[] };
type Content = { eyebrow: string; title: string; intro: string; offers: Offering[]; guideTitle: string; guides: [string, string][]; faq: [string, string][] };

const vietnameseDemoContent: Record<string, Content> = {
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

const englishDemoContent: Record<string, Content> = {
  "ridenow-car-rental": {
    eyebrow: "FLEET & RENTAL PLANS", title: "The right car. The right journey.", intro: "Compare seating, luggage capacity, and mileage before choosing a car. The prices below are sample data for this demo.",
    offers: [
      { title: "Porsche 911 Carrera", meta: "Coupe · Automatic · 2+2 seats", price: "₫5,800,000 / day", items: ["2 small bags · Fuel", "200 km/day included", "₫30,000,000 security deposit"] },
      { title: "Mercedes-Benz GLC", meta: "SUV · Automatic · 5 seats", price: "₫2,400,000 / day", items: ["3 suitcases · Optional child seat", "250 km/day included", "₫15,000,000 security deposit"] },
      { title: "Mini Cooper", meta: "City car · Automatic · 4 seats", price: "₫1,500,000 / day", items: ["2 suitcases · Reverse camera", "200 km/day included", "₫10,000,000 security deposit"] },
    ],
    guideTitle: "Where to collect your car, what to prepare?", guides: [["Pickup locations", "Collect in District 1, at Tan Son Nhat Airport, or request delivery anywhere in Ho Chi Minh City. Delivery fees are confirmed before you book."], ["Documents & handover", "Bring an appropriate driver’s license and ID. Together, we record the vehicle condition, fuel level, and mileage at handover."], ["Insurance & support", "Review insurance coverage and excess in the agreement. Incident support, replacement vehicles, and a private driver are available subject to availability."]],
    faq: [["Can I drive to another province?", "You can register an interprovincial itinerary with your enquiry. Mileage limits and approved areas are stated clearly in the quote."], ["How is a late return charged?", "Let us know before your return time so we can check the schedule. Overtime and excess-mileage fees are confirmed in the agreement before collection."]],
  },
  "nestly-home-rental": {
    eyebrow: "STAY COLLECTION", title: "A place that fits you.", intro: "From a weekend in the hills to a month by the sea, choose a stay around the number of guests and amenities you need.",
    offers: [
      { title: "Pine Hill House · Da Lat", meta: "4 guests · 2 bedrooms · 2 bathrooms", price: "₫1,800,000 / night", items: ["Private kitchen, BBQ yard, parking", "Check-in 14:00 · Check-out 11:00", "2-night minimum"] },
      { title: "The Garden Loft · Hoi An", meta: "2 guests · 1 bedroom · 1 bathroom", price: "₫950,000 / night", items: ["Private garden, washer, workspace", "10 minutes by bike from the old town", "Discounts for stays of 7 nights or more"] },
      { title: "Coastal Home · Da Nang", meta: "6 guests · 3 bedrooms · 2 bathrooms", price: "₫2,600,000 / night", items: ["Sea-view balcony, fully equipped kitchen", "Five-minute walk to the beach", "Pets welcome with advance notice"] },
    ],
    guideTitle: "Live like a local.", guides: [["Da Lat · Morning among the pines", "Visit a garden café, walk by the lake early, then return to your own kitchen for dinner with friends."], ["Hoi An · A different rhythm", "Borrow a bike from your host and explore vegetable villages and local markets. A food guide is ready when you check in."], ["Your host is nearby", "Receive access instructions, Wi-Fi details, and a support contact before arrival. Requests for extra guests need the host’s approval."]],
    faq: [["Does the total include cleaning?", "Your quote separates the stay, cleaning fee, and any extra charges. You see the full cost before confirming."], ["Can I host a party?", "Each home has its own rules. Events need host approval, and quiet hours run from 22:00 to 07:00."]],
  },
  "gearup-equipment-rental": {
    eyebrow: "CATALOGUE & SPECIFICATIONS", title: "Equipment matched to the job.", intro: "Choose by load, output, and operating time. Our technical team confirms the setup before preparing a quote.",
    offers: [
      { title: "Komatsu PC200 excavator", meta: "20 tonnes · 0.8 m³ bucket", price: "Quoted per shift", items: ["Standard eight-hour shift", "Operator available on request", "Transported by specialist vehicle"] },
      { title: "Toyota 3T forklift", meta: "3-tonne capacity · 3 m lift height", price: "Quoted per day", items: ["Diesel or electric power", "Access and ground-surface assessment", "Inspection record at handover"] },
      { title: "100 kVA generator", meta: "Three phase · 380 V · Soundproof enclosure", price: "Quoted monthly", items: ["ATS panel on request", "Load and cable consultation", "Scheduled maintenance"] },
    ],
    guideTitle: "From our depot to your site.", guides: [["01 / Technical assessment", "Share the site, workload, ground conditions, and construction schedule. Our team recommends the setup and transport plan."], ["02 / Inspection & safety", "We hand over equipment documents, a safety checklist, and operating guidance. Operators are assigned only where the equipment requires them."], ["03 / Maintenance & replacement", "We record machine hours, schedule maintenance, and handle incidents. Replacement equipment is confirmed by availability and location."]],
    faq: [["Does rental include fuel?", "Quotes list rental, fuel, labour, and transport separately according to the plan. Costs are not assumed to be all-inclusive."], ["Is long-term project rental available?", "Yes. Weekly, monthly, and construction-schedule plans are available. Share your schedule for a suitable supply and maintenance plan."]],
  },
  "aurelia-luxury-hotel": {
    eyebrow: "ROOMS & PRIVILEGES", title: "A private retreat by the bay.", intro: "These sample room categories suit couples, families, and special occasions. Actual rates depend on your stay dates.",
    offers: [
      { title: "Garden Suite", meta: "65 m² · 2 adults · Garden view", price: "₫2,800,000 / night", items: ["King bed and private bath", "Breakfast for two", "Terrace in the garden"] },
      { title: "Ocean Pool Villa", meta: "120 m² · 2 adults · Ocean view", price: "₫6,500,000 / night", items: ["Private pool", "Breakfast in the villa", "Private arrival welcome"] },
      { title: "Family Residence", meta: "180 m² · 4 adults · 2 bedrooms", price: "₫9,800,000 / night", items: ["Private living and dining areas", "Children’s activities", "Private-chef option"] },
    ],
    guideTitle: "A retreat for every sense.", guides: [["Dining by the bay", "Breakfast is served from 06:30–10:00, with a seasonal seafood menu. Reserve a private beach dinner in advance."], ["Spa & restoration", "Choose a 60- or 90-minute treatment, morning yoga, and time in the relaxation space. Please reserve your preferred slot ahead of time."], ["Stay longer · 3 nights", "This sample package includes three nights, breakfast, and one dining experience. Check eligible dates and cancellation terms when booking."]],
    faq: [["How do I get to the resort?", "Our reception team can arrange travel from Cam Ranh Airport to the pier and the boat to the resort. Timing and fees are confirmed in advance."], ["Can you help with a celebration?", "You can request room décor, a cake, or a private dinner. Share your wishes before arrival so we can suggest an appropriate arrangement."]],
  },
  "sunday-boutique-hotel": {
    eyebrow: "PICK YOUR MOOD", title: "Every room brings a little joy.", intro: "Travelling solo, as a pair, or with friends? There is always a small corner for you in the middle of Saigon.",
    offers: [
      { title: "The Cozy Room", meta: "22 m² · 2 guests · Queen bed", price: "₫980,000 / night", items: ["Shower and work desk", "Welcome coffee", "Street-facing window"] },
      { title: "The Pink Room", meta: "32 m² · 2 guests · King bed", price: "₫1,450,000 / night", items: ["Bathtub and small balcony", "Breakfast for two", "In-room Bluetooth speaker"] },
      { title: "Friends Studio", meta: "45 m² · 4 guests · 2 double beds", price: "₫2,200,000 / night", items: ["Shared lounge corner", "A locker for every guest", "Board games in the lobby"] },
    ],
    guideTitle: "Hello, Saigon!", guides: [["Breakfast like a Saigon local", "Start with bánh mì and iced milk coffee at our ground-floor counter, served from 07:00–10:30."], ["Our local guide", "A round-up of cafés, bookshops, and alleys near the hotel. Reception also has ideas for rainy days."], ["Weekend on the rooftop", "Saturday acoustic sets, seasonal drinks, and a city view. Staying guests can register with reception."]],
    faq: [["Can I leave luggage before check-in?", "Yes, luggage storage is available at reception. Check-in is from 14:00 and check-out is before 12:00; early check-in depends on availability."], ["Is laundry available?", "Guests can arrange bag-based laundry service at reception. Turnaround time and cost are confirmed when we collect your items."]],
  },
  "hush-minimal-hotel": {
    eyebrow: "SPACES TO REST", title: "Stay with stillness.", intro: "Three spaces inspired by light, wood, and Kyoto gardens. Sample rates are shown in Japanese yen.",
    offers: [
      { title: "Tatami Room", meta: "24 m² · 2 guests · Futon", price: "¥18,000 / night", items: ["Tatami floor and tea corner", "Private bathroom", "Non-smoking space"] },
      { title: "Garden Room", meta: "36 m² · 2 guests · King bed", price: "¥26,000 / night", items: ["Japanese garden terrace", "Soaking tub", "Japanese-style breakfast"] },
      { title: "Hush Suite", meta: "52 m² · 2 guests · Suite", price: "¥38,000 / night", items: ["Private tea room", "Reading corner", "Personal welcome and guide"] },
    ],
    guideTitle: "Small rituals, every day.", guides: [["Seasonal breakfast", "Rice, miso soup, and local dishes are served from 07:30–09:30. Tell us about dietary needs when booking."], ["Tea & garden", "Try an afternoon tea-making experience and a quiet moment by the rock garden. Places are limited to preserve the calm."], ["Kyoto, slowly on foot", "Pick up a map of walking routes, craftspeople, and nearby sights from the welcome desk."]],
    faq: [["Is the space suitable for children?", "Please share the ages and number of children in your booking request so we can advise on room types and stay conditions."], ["Are there quiet hours?", "Please keep noise to a minimum from 21:00 to 08:00. All rooms are non-smoking; use the designated areas instead."]],
  },
  "loud-creative-agency": {
    eyebrow: "CREATIVE CAPABILITIES", title: "From big ideas to the street.", intro: "One team across creative strategy, production, and campaign delivery.",
    offers: [
      { title: "Brand launch", meta: "Strategy + creative", price: "4–6 weeks", items: ["Positioning workshop", "Big idea & key visual", "Implementation guidelines"] },
      { title: "Integrated campaign", meta: "Digital + experiences", price: "6–10 weeks", items: ["Multichannel concept", "Video, social, and OOH", "Launch and measurement plan"] },
      { title: "Content studio", meta: "Always-on production", price: "Monthly", items: ["Content calendar", "Photo & video production", "Creative reporting and optimisation"] },
    ],
    guideTitle: "Case study / ĐẬM — Street spirit", guides: [["The challenge", "A sample situation: bringing a beverage brand closer to young audiences in a crowded market."], ["The approach", "We turned street culture into a key visual, short film, and pop-up experience, carrying one idea through every touchpoint."], ["Sample result", "2.4 million reach · 18,000 interactions · 3 experience locations. These numbers are only used to demonstrate a case-study layout."]],
    faq: [["What should I prepare before our first meeting?", "Bring campaign goals, audience, expected budget, and target launch date. We can start with a conversation even without a finished brief."], ["Does the studio handle production?", "We can organise design, photography, filming, and production partners. Scope and usage rights are set out in the proposal."]],
  },
  "halo-digital-marketing": {
    eyebrow: "GROWTH SERVICES", title: "Measure every step of growth.", intro: "Find the right friction point in the customer journey, create an experimentation plan, and track the metrics that matter.",
    offers: [
      { title: "Growth audit", meta: "Foundation assessment", price: "2 weeks", items: ["Channel and tracking review", "Conversion-funnel analysis", "90-day experiment roadmap"] },
      { title: "Performance marketing", meta: "Customer acquisition", price: "Monthly", items: ["Google & Meta Ads", "Creative testing", "CAC, ROAS, and revenue reporting"] },
      { title: "SEO & lifecycle", meta: "Long-term growth", price: "3–6 month roadmap", items: ["Technical and content SEO", "Email automation", "Landing-page optimisation"] },
    ],
    guideTitle: "Case study / Finverse — Conversion optimisation", guides: [["The problem", "A sample situation: traffic is increasing, but sign-up rates are low and ad data is not connected to the CRM."], ["The experiment", "We standardised events, grouped landing pages, and tested messages by traffic source."], ["Sample results dashboard", "Conversion rate 2.1% → 3.4% · CAC down 24% · ROAS 3.8x. These are illustrative figures, not performance promises."]],
    faq: [["Is ad spend included in the service fee?", "Media spend is separate from management and production fees. The proposal shows each line item against its objective."], ["How soon can results be evaluated?", "We agree a review cadence based on channel, data quality, and conversion time. Reports include outcomes, hypotheses, and the next experiment."]],
  },
  "muse-brand-studio": {
    eyebrow: "OUR PRACTICE", title: "Brands with depth.", intro: "We connect strategy and design so every detail tells the same story.",
    offers: [
      { title: "Brand foundation", meta: "Research & positioning", price: "3–4 weeks", items: ["Context research", "Positioning, personality, and voice", "Brand story"] },
      { title: "Visual identity", meta: "Identity system", price: "4–6 weeks", items: ["Logo, typography, and colour", "Art direction & applications", "Brand guidelines"] },
      { title: "Digital presence", meta: "Brand experience", price: "6–8 weeks", items: ["Website & portfolio", "Digital packaging design", "Asset-library handover"] },
    ],
    guideTitle: "Selected story / Mộc Nhiên", guides: [["The beginning", "A sample project for a craft brand that wants to retain its natural spirit while growing into new sales channels."], ["The design language", "An earthy palette, restrained type, and material-led photography create a consistent identity from packaging to website."], ["The handover", "The identity system, a 48-page guide, packaging system, and brand website—an asset library the team can continue to use independently."]],
    faq: [["Can we start with identity only?", "Yes. The scope can begin with identity or expand to strategy, packaging, and website work as the brand develops."], ["How are source files handed over?", "The file list and image and font licences are detailed in the agreement. A handover session helps the team apply the system."]],
  },
};

/**
 * The legacy export stays English so existing client components have an
 * English-first default. New consumers should resolve content with the active
 * locale so language changes do not depend on a route refresh.
 */
export const demoContent = getDemoContent(defaultLocale);

export function getDemoContent(locale: Locale): Record<string, Content> {
  return locale === "vi" ? vietnameseDemoContent : englishDemoContent;
}

const demoSectionsCopy = {
  en: {
    expertise: "EXPERTISE",
    stay: "STAY",
    collection: "COLLECTION",
    discussService: "Discuss this service",
    chooseRoom: "Choose this room",
    chooseRental: "Choose rental package",
    behindWork: "BEHIND THE WORK",
    experienceInfo: "EXPERIENCES & INFORMATION",
    teamEyebrow: "MEET THE TEAM",
    teamTitle: "The people making it happen with you.",
    teamNote: "The team and projects are illustrative content for this studio interface.",
    policyAgencyEyebrow: "BEFORE WE WORK TOGETHER",
    policyBookingEyebrow: "BEFORE YOU BOOK",
    policyAgencyTitle: "Let’s make it clear from the start.",
    policyBookingTitle: "Set up a great experience.",
    agencyExtraQuestion: "What is the approval and payment process?",
    bookingExtraQuestion: "How do schedule changes and cancellations work?",
    agencyExtraAnswer: "The proposal clearly sets delivery milestones, revision rounds, and the payment schedule. Each stage is confirmed before the next one begins.",
    bookingExtraAnswer: "Change terms, cancellation deadlines, and deposits depend on the selected package. Your confirmation lists the conditions to check before payment.",
    talk: "LET’S TALK",
    plan: "PLAN YOUR VISIT",
    agencyFormTitle: "Tell us about your project.",
    hotelFormTitle: "Your getaway starts here.",
    rentalFormTitle: "What would you like to rent?",
    agencyFormIntro: "Share your goals, scope, and anticipated timing so we can prepare for a first conversation.",
    bookingFormIntro: "Choose your needs and timing to explore the sample enquiry flow.",
    formNote: "Demo form: nothing is sent and no real reservation is created.",
    fullName: "Full name",
    namePlaceholder: "Your name",
    serviceInterest: "Service of interest",
    roomType: "Room type",
    productOrStay: "Product / stay",
    chooseOption: "Choose an option",
    expectedStart: "Expected start",
    checkIn: "Check-in date",
    estimatedBudget: "Estimated budget",
    chooseBudget: "Choose a budget range",
    budgetUnder: "Under ₫50 million",
    budgetMid: "₫50–150 million",
    budgetOver: "Over ₫150 million",
    budgetAdvice: "I need advice",
    checkOut: "Check-out date",
    projectGoal: "Project goals & description",
    guestRequirements: "Guests / quantity & additional requests",
    projectPlaceholder: "What would you like to solve?",
    requestPlaceholder: "Tell us what you need…",
    previewBrief: "Preview brief submission",
    previewRequest: "Preview request submission",
    completed: "The sample submission for",
    completedSuffix: "is complete. This is a demo; no information has been sent to",
  },
  vi: {
    expertise: "CHUYÊN MÔN",
    stay: "LƯU TRÚ",
    collection: "DANH MỤC",
    discussService: "Trao đổi về dịch vụ",
    chooseRoom: "Chọn hạng phòng",
    chooseRental: "Chọn gói thuê",
    behindWork: "PHÍA SAU DỰ ÁN",
    experienceInfo: "TRẢI NGHIỆM & THÔNG TIN",
    teamEyebrow: "GẶP ĐỘI NGŨ",
    teamTitle: "Những người cùng bạn thực hiện.",
    teamNote: "Đội ngũ và dự án minh họa cho giao diện studio.",
    policyAgencyEyebrow: "THÔNG TIN TRƯỚC KHI HỢP TÁC",
    policyBookingEyebrow: "THÔNG TIN TRƯỚC KHI ĐẶT",
    policyAgencyTitle: "Cùng làm rõ từ đầu.",
    policyBookingTitle: "Chuẩn bị cho một trải nghiệm tốt.",
    agencyExtraQuestion: "Quy trình duyệt và thanh toán?",
    bookingExtraQuestion: "Thay đổi lịch và hủy đặt chỗ?",
    agencyExtraAnswer: "Đề xuất chia rõ mốc bàn giao, số vòng chỉnh sửa và lịch thanh toán. Mỗi giai đoạn được xác nhận trước khi chuyển sang bước tiếp theo.",
    bookingExtraAnswer: "Điều kiện thay đổi, thời hạn hủy và khoản đặt cọc phụ thuộc gói được chọn. Bản xác nhận sẽ thể hiện các điều kiện để bạn kiểm tra trước khi thanh toán.",
    talk: "CÙNG TRAO ĐỔI",
    plan: "LÊN KẾ HOẠCH",
    agencyFormTitle: "Kể chúng tôi nghe về dự án.",
    hotelFormTitle: "Kỳ nghỉ bắt đầu từ đây.",
    rentalFormTitle: "Bạn cần thuê gì?",
    agencyFormIntro: "Chia sẻ mục tiêu, phạm vi và thời gian dự kiến để chuẩn bị buổi trao đổi đầu tiên.",
    bookingFormIntro: "Chọn nhu cầu và thời gian dự kiến để xem thử quy trình gửi yêu cầu.",
    formNote: "Biểu mẫu trải nghiệm: thông tin không được gửi đi và chưa tạo đặt chỗ thực tế.",
    fullName: "Họ và tên",
    namePlaceholder: "Tên của bạn",
    serviceInterest: "Dịch vụ quan tâm",
    roomType: "Hạng phòng",
    productOrStay: "Sản phẩm / chỗ ở",
    chooseOption: "Chọn một phương án",
    expectedStart: "Dự kiến bắt đầu",
    checkIn: "Ngày nhận",
    estimatedBudget: "Ngân sách dự kiến",
    chooseBudget: "Chọn khoảng ngân sách",
    budgetUnder: "Dưới 50 triệu",
    budgetMid: "50–150 triệu",
    budgetOver: "Trên 150 triệu",
    budgetAdvice: "Cần tư vấn",
    checkOut: "Ngày trả",
    projectGoal: "Mục tiêu & mô tả dự án",
    guestRequirements: "Số khách / số lượng & yêu cầu thêm",
    projectPlaceholder: "Bạn đang muốn giải quyết điều gì?",
    requestPlaceholder: "Cho chúng tôi biết nhu cầu của bạn…",
    previewBrief: "Xem thử gửi brief",
    previewRequest: "Xem thử gửi yêu cầu",
    completed: "Đã hoàn tất bước gửi thử cho",
    completedSuffix: "Đây là bản mẫu; chưa có thông tin nào được gửi đến",
  },
} satisfies Record<Locale, Record<string, string>>;

type OfferOption = Offering & { id: string };

export function DemoSections({ template }: { template: TemplateItem }) {
  const { locale } = useLocale();
  const copy = demoSectionsCopy[locale];
  const data = getDemoContent(locale)[template.slug];
  const [selection, setSelection] = useState("");
  if (!data) return null;
  const hotel = template.category === "hotel";
  const agency = template.category === "advertising";
  const options: OfferOption[] = data.offers.map((offer, index) => ({
    ...offer,
    id: `${template.slug}-${index}`,
  }));

  return <>
    {agency && <section className="sample-content expanded-section" id="options">
      <div className="sample-section-title"><span>{data.eyebrow}</span><h2>{data.title}</h2></div>
      <p className="expanded-intro">{data.intro}</p>
      <div className="offer-grid">{options.map((offer, index) => <article className="offer-card" key={offer.id}>
        <span className="offer-number">0{index + 1} / {agency ? copy.expertise : hotel ? copy.stay : copy.collection}</span>
        <h3>{offer.title}</h3><p>{offer.meta}</p><strong>{offer.price}</strong>
        <ul>{offer.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a href="#inquiry" onClick={() => setSelection(offer.id)}>{agency ? copy.discussService : hotel ? copy.chooseRoom : copy.chooseRental} <span>↗</span></a>
      </article>)}</div>
    </section>}
    <section className="expanded-guide" id="guide"><div className="sample-content"><span>{agency ? copy.behindWork : copy.experienceInfo}</span><h2>{data.guideTitle}</h2><div className="guide-grid">{data.guides.map(([title, guideCopy]) => <article key={title}><h3>{title}</h3><p>{guideCopy}</p></article>)}</div></div></section>
    {agency && <section className="sample-content expanded-section" id="team"><div className="sample-section-title"><span>{copy.teamEyebrow}</span><h2>{copy.teamTitle}</h2></div><div className="team-grid">{[["MA", "Minh Anh", template.slug.includes("halo") ? "Growth Strategist" : "Strategy Director"], ["QH", "Quang Huy", "Creative Director"], ["TV", "Thảo Vy", template.slug.includes("halo") ? "Performance Lead" : "Design Lead"]].map(([initials, name, role]) => <article key={name}><div aria-hidden="true">{initials}</div><h3>{name}</h3><p>{role}</p></article>)}</div><p className="demo-note">{copy.teamNote}</p></section>}
    <section className="sample-content expanded-section" id="policies"><div className="sample-section-title"><span>{agency ? copy.policyAgencyEyebrow : copy.policyBookingEyebrow}</span><h2>{agency ? copy.policyAgencyTitle : copy.policyBookingTitle}</h2></div><div className="expanded-faq">{data.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<details><summary>{agency ? copy.agencyExtraQuestion : copy.bookingExtraQuestion}</summary><p>{agency ? copy.agencyExtraAnswer : copy.bookingExtraAnswer}</p></details></div></section>
    <InquiryForm template={template} locale={locale} options={options} selection={selection} onSelection={setSelection} />
  </>;
}

function InquiryForm({ template, locale, options, selection, onSelection }: { template: TemplateItem; locale: Locale; options: OfferOption[]; selection: string; onSelection: (value: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const copy = demoSectionsCopy[locale];
  const agency = template.category === "advertising";
  const hotel = template.category === "hotel";
  const selectedOption = options.find((option) => option.id === selection);
  return <section className="sample-content inquiry-section" id="inquiry"><div><span>{agency ? copy.talk : copy.plan}</span><h2>{agency ? copy.agencyFormTitle : hotel ? copy.hotelFormTitle : copy.rentalFormTitle}</h2><p>{agency ? copy.agencyFormIntro : copy.bookingFormIntro}</p><small>{copy.formNote}</small></div>
    <form onChange={() => setSubmitted(false)} onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
      <label>{copy.fullName}<input required name="name" autoComplete="name" placeholder={copy.namePlaceholder} /></label>
      <label>Email<input required type="email" name="email" autoComplete="email" placeholder="ban@example.com" /></label>
      <label className="form-wide">{agency ? copy.serviceInterest : hotel ? copy.roomType : copy.productOrStay}<select required value={selection} onChange={event => onSelection(event.target.value)}><option value="">{copy.chooseOption}</option>{options.map(option => <option key={option.id} value={option.id}>{option.title}</option>)}</select></label>
      <label>{agency ? copy.expectedStart : copy.checkIn}<input required type="date" name="start" onChange={event => { const end = event.currentTarget.form?.elements.namedItem("end") as HTMLInputElement | null; if (end) end.min = event.target.value; }} /></label>
      {agency ? <label>{copy.estimatedBudget}<select required name="budget"><option value="">{copy.chooseBudget}</option><option>{copy.budgetUnder}</option><option>{copy.budgetMid}</option><option>{copy.budgetOver}</option><option>{copy.budgetAdvice}</option></select></label> : <label>{copy.checkOut}<input required type="date" name="end" /></label>}
      <label className="form-wide">{agency ? copy.projectGoal : copy.guestRequirements}<textarea name="message" rows={4} placeholder={agency ? copy.projectPlaceholder : copy.requestPlaceholder} /></label>
      <button className="form-wide" type="submit">{agency ? copy.previewBrief : copy.previewRequest} ↗</button>
      {submitted && <p className="form-wide form-result" role="status">{copy.completed} {selectedOption?.title ?? copy.chooseOption}. {copy.completedSuffix} {template.name}.</p>}
    </form>
  </section>;
}
