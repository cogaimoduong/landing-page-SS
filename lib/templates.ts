import { projectSources, type ProjectSourceKind } from "./project-sources";

export type TemplateCategory = "rental" | "hotel" | "management" | "advertising" | "catalog" | "fnb" | "project";

export type TemplateItem = {
  slug: string;
  category: TemplateCategory;
  categoryLabel: string;
  name: string;
  tagline: string;
  description: string;
  style: string;
  tone: string;
  accent: string;
  dark: string;
  image: string;
  features: string[];
  sourceKind?: ProjectSourceKind;
  inDevelopment?: boolean;
};

const coreTemplates: TemplateItem[] = [
  {
    slug: "lua-viet-restaurant", category: "fnb", categoryLabel: "F&B / Nhà hàng",
    name: "Lửa Việt", tagline: "Vị Việt, kể bằng lửa",
    description: "Nhà hàng Việt đương đại với sắc nâu trầm, thực đơn theo mùa và trải nghiệm đặt bàn",
    style: "Nhà hàng / Sang trọng", tone: "#efe6d7", accent: "#b86d40", dark: "#26251f",
    image: "/images/templates/restaurant.jpg",
    features: ["Thực đơn lọc theo món", "Câu chuyện nhà hàng", "Thông tin giờ mở cửa", "Form đặt bàn minh họa"],
  },
  {
    slug: "com-nha-eatery", category: "fnb", categoryLabel: "F&B / Quán ăn",
    name: "Cơm Nhà", tagline: "Một bữa ngon, một ngày vui",
    description: "Quán cơm Việt với tông vàng ấm, thực đơn dễ xem và lựa chọn món yêu thích",
    style: "Quán ăn / Gần gũi", tone: "#fff4d7", accent: "#b73c26", dark: "#3c291d",
    image: "/images/templates/eatery.jpg",
    features: ["Thực đơn & giá món", "Lọc món mặn, rau và canh", "Danh sách món đã chọn", "Form giữ bàn minh họa"],
  },
  {
    slug: "moc-coffee", category: "fnb", categoryLabel: "F&B / Cà phê",
    name: "Mộc Coffee", tagline: "Chậm một nhịp, thơm một ngày",
    description: "Quán cà phê với tông xanh olive, câu chuyện hạt rang và thực đơn đồ uống, bánh ngọt",
    style: "Cà phê / Tự nhiên", tone: "#f1efdf", accent: "#566842", dark: "#293428",
    image: "/images/templates/coffee.jpg",
    features: ["Thực đơn đồ uống & bánh", "Lọc theo nhóm sản phẩm", "Câu chuyện cà phê", "Form hẹn chỗ minh họa"],
  },
  {
    slug: "folio-template-catalog",
    category: "catalog",
    categoryLabel: "Kho giao diện / Portfolio",
    name: "Folio Catalog",
    tagline: "Chọn một giao diện. Biến nó thành của bạn.",
    description: "Mẫu website trưng bày bộ sưu tập giao diện với nền kem, điểm nhấn tím và typography khổ lớn. Phù hợp cho studio, thư viện sản phẩm số và portfolio sáng tạo.",
    style: "Editorial / Kem & tím",
    tone: "#e7e1f5",
    accent: "#7460ff",
    dark: "#151513",
    image: "",
    features: ["Trang giới thiệu bộ sưu tập", "Bộ lọc theo lĩnh vực", "Lưới giao diện & liên kết chi tiết", "Xem trước trên nhiều thiết bị", "Khu vực liên hệ nổi bật"],
  },
  {
    slug: "ridenow-car-rental",
    category: "rental",
    categoryLabel: "Dịch vụ cho thuê",
    name: "RideNow",
    tagline: "Thuê xe. Đi bất cứ đâu.",
    description: "Website thuê xe thể thao với trải nghiệm đặt xe nhanh, trẻ và mạnh mẽ.",
    style: "Thể thao / Tương phản",
    tone: "#f4ff3d",
    accent: "#111111",
    dark: "#111111",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=85",
    features: ["Đội xe & thông số", "Giá thuê & đặt cọc", "Điểm giao nhận", "Điều kiện thuê", "Form yêu cầu thuê thử"],
  },
  {
    slug: "nestly-home-rental",
    category: "rental",
    categoryLabel: "Dịch vụ cho thuê",
    name: "Nestly",
    tagline: "Một căn nhà, ngàn trải nghiệm.",
    description: "Nền tảng thuê căn hộ phong cách ấm áp, thân thiện và đầy cảm hứng.",
    style: "Lifestyle / Ấm áp",
    tone: "#f1e8dc",
    accent: "#9f5b3f",
    dark: "#283329",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    features: ["Bộ sưu tập chỗ ở", "Tiện nghi & sức chứa", "Cẩm nang địa phương", "Nội quy lưu trú", "Form đặt chỗ thử"],
  },
  {
    slug: "gearup-equipment-rental",
    category: "rental",
    categoryLabel: "Dịch vụ cho thuê",
    name: "GearUp",
    tagline: "Đúng thiết bị. Đúng thời điểm.",
    description: "Website cho thuê thiết bị công trình với giao diện công nghiệp, chắc chắn.",
    style: "Công nghiệp / Đậm",
    tone: "#ff6b00",
    accent: "#ff6b00",
    dark: "#171717",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
    features: ["Danh mục & thông số máy", "Gói thuê theo ca / tháng", "Quy trình bàn giao", "Bảo trì & an toàn", "Form yêu cầu báo giá"],
  },
  {
    slug: "aurelia-luxury-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Aurelia",
    tagline: "Nghỉ dưỡng theo cách riêng.",
    description: "Giao diện resort cao cấp, giàu khoảng thở với trải nghiệm đặt phòng sang trọng.",
    style: "Luxury / Editorial",
    tone: "#e7ddcb",
    accent: "#a78152",
    dark: "#18211b",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    features: ["Ba hạng phòng & villa", "Ẩm thực & spa", "Gói nghỉ dưỡng", "Hướng dẫn di chuyển", "Form đặt phòng thử"],
  },
  {
    slug: "sunday-boutique-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Sunday House",
    tagline: "Ở lại lâu hơn một chút.",
    description: "Khách sạn boutique trẻ trung với màu sắc vui tươi và bố cục phá cách.",
    style: "Boutique / Playful",
    tone: "#ffd5dc",
    accent: "#eb4f74",
    dark: "#193a37",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85",
    features: ["Ba hạng phòng", "Local guide Sài Gòn", "Café & rooftop", "Tiện ích & chính sách", "Form đặt phòng thử"],
  },
  {
    slug: "hush-minimal-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Hush",
    tagline: "Không gian để thở.",
    description: "Website khách sạn tối giản kiểu Nhật, tĩnh lặng và tập trung vào hình ảnh.",
    style: "Minimal / Zen",
    tone: "#e8e5de",
    accent: "#5d6c62",
    dark: "#2d302d",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    features: ["Phòng Tatami & Suite", "Trà & ẩm thực Nhật", "Cẩm nang Kyoto", "Nội quy lưu trú", "Form đặt phòng thử"],
  },
  {
    slug: "orbit-crm-dashboard",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Orbit CRM",
    tagline: "Mọi khách hàng. Một nơi.",
    description: "Dashboard CRM hiện đại giúp đội sales theo dõi pipeline và hiệu suất tức thời.",
    style: "SaaS / Dark mode",
    tone: "#15172b",
    accent: "#7c6cff",
    dark: "#10111e",
    image: "",
    features: ["Sales pipeline tương tác", "Thêm & lọc cơ hội", "Danh bạ khách hàng", "Lịch chăm sóc", "Báo cáo doanh số mẫu"],
  },
  {
    slug: "flowdesk-project-management",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Flowdesk",
    tagline: "Công việc trôi, team tiến tới.",
    description: "Ứng dụng quản lý dự án sạch sẽ, sáng sủa và dễ làm quen cho mọi đội nhóm.",
    style: "Clean / Productivity",
    tone: "#e8f2ff",
    accent: "#2877f0",
    dark: "#172133",
    image: "",
    features: ["Kanban đổi trạng thái", "Thêm & tìm công việc", "Tiến độ dự án", "Phân bổ thành viên", "Lịch bàn giao"],
  },
  {
    slug: "minto-store-management",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Minto",
    tagline: "Cửa hàng gọn. Kinh doanh khỏe.",
    description: "Phần mềm quản lý bán hàng với dashboard thân thiện và dữ liệu dễ đọc.",
    style: "Friendly / Data",
    tone: "#dff7e9",
    accent: "#188f62",
    dark: "#17342a",
    image: "",
    features: ["Doanh thu theo kênh", "Tạo & lọc đơn hàng", "Cập nhật trạng thái", "Tồn kho & cảnh báo", "Lịch vận hành"],
  },
  {
    slug: "loud-creative-agency",
    category: "advertising",
    categoryLabel: "Website quảng cáo",
    name: "LOUD!",
    tagline: "Thương hiệu phải được nhìn thấy.",
    description: "Website creative agency táo bạo, typography lớn và chuyển động đầy năng lượng.",
    style: "Brutal / Bold",
    tone: "#ff4d2e",
    accent: "#ff4d2e",
    dark: "#131313",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=85",
    features: ["Showcase chiến dịch", "Case study chi tiết", "Gói sáng tạo & sản xuất", "Đội ngũ studio", "Form nhận brief thử"],
  },
  {
    slug: "halo-digital-marketing",
    category: "advertising",
    categoryLabel: "Website quảng cáo",
    name: "Halo Digital",
    tagline: "Tăng trưởng có chiến lược.",
    description: "Landing page digital marketing theo phong cách công nghệ và định hướng chuyển đổi.",
    style: "Tech / Gradient",
    tone: "#dffaff",
    accent: "#4e5bff",
    dark: "#0c1024",
    image: "",
    features: ["Growth audit & marketing", "Case study chuyển đổi", "Chỉ số hiệu quả mẫu", "Đội ngũ chuyên môn", "Form đăng ký tư vấn"],
  },
  {
    slug: "muse-brand-studio",
    category: "advertising",
    categoryLabel: "Website quảng cáo",
    name: "Muse Studio",
    tagline: "Ý tưởng đáng để lan truyền.",
    description: "Portfolio studio thương hiệu mang tinh thần tạp chí, thanh lịch và khác biệt.",
    style: "Editorial / Artistic",
    tone: "#f3ead8",
    accent: "#d3342f",
    dark: "#242018",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    features: ["Portfolio thương hiệu", "Case study nhận diện", "Gói chiến lược & thiết kế", "Giới thiệu đội ngũ", "Form trao đổi dự án"],
  },
];

const projectTemplates: TemplateItem[] = projectSources.map((project) => ({
  ...project.template,
  category: "project",
  image: project.image,
  inDevelopment: project.inDevelopment || project.template.inDevelopment,
}));

export const templates: TemplateItem[] = [...projectTemplates, ...coreTemplates];

export const categories = ([
  { id: "all", label: "Tất cả" },
  { id: "rental", label: "Dịch vụ cho thuê" },
  { id: "hotel", label: "Khách sạn" },
  { id: "fnb", label: "F&B / Nhà hàng & quán ăn" },
  { id: "project", label: "Từ dự án thực tế" },
  { id: "management", label: "Phần mềm quản lý" },
  { id: "advertising", label: "Website quảng cáo" },
  { id: "catalog", label: "Kho giao diện / Portfolio" },
] as const).map((category) => ({
  ...category,
  count: category.id === "all" ? templates.length : templates.filter((template) => template.category === category.id).length,
}));

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}
