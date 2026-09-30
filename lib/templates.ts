import { defaultLocale, type Locale } from "./i18n";
import { getProjectSources, type ProjectSourceKind } from "./project-sources";

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
  originalUrl?: string;
  inDevelopment?: boolean;
};

const coreTemplates: TemplateItem[] = [
  {
    slug: "lua-viet-restaurant", category: "fnb", categoryLabel: "F&B / Nhà hàng",
    name: "Lửa Việt", tagline: "Vị Việt, kể bằng lửa",
    description: "Nhà hàng Việt đương đại với sắc nâu trầm, thực đơn theo mùa và trải nghiệm đặt bàn",
    style: "Nhà hàng / Sang trọng", tone: "#efe6d7", accent: "#b86d40", dark: "#26251f",
    image: "/images/templates/restaurant.jpg",
    features: ["Thực đơn lọc theo món", "Câu chuyện nhà hàng", "Thông tin giờ mở cửa", "Biểu mẫu đặt bàn minh họa"],
  },
  {
    slug: "com-nha-eatery", category: "fnb", categoryLabel: "F&B / Quán ăn",
    name: "Tasty Healthy", tagline: "Một bữa ngon, một ngày vui",
    description: "Quán cơm Việt với tông vàng ấm, thực đơn dễ xem và lựa chọn món yêu thích",
    style: "Quán ăn / Gần gũi", tone: "#fff4d7", accent: "#b73c26", dark: "#3c291d",
    image: "/images/templates/eatery.jpg",
    features: ["Thực đơn & giá món", "Lọc món mặn, rau và canh", "Danh sách món đã chọn", "Biểu mẫu giữ bàn minh họa"],
  },
  {
    slug: "moc-coffee", category: "fnb", categoryLabel: "F&B / Cà phê",
    name: "DripDrop Speciality Coffee", tagline: "Chậm một nhịp, thơm một ngày",
    description: "Quán cà phê với tông xanh olive, câu chuyện hạt rang và thực đơn đồ uống, bánh ngọt",
    style: "Cà phê / Tự nhiên", tone: "#f1efdf", accent: "#566842", dark: "#293428",
    image: "/images/templates/coffee.jpg",
    features: ["Thực đơn đồ uống & bánh", "Lọc theo nhóm sản phẩm", "Câu chuyện cà phê", "Biểu mẫu hẹn chỗ minh họa"],
  },
  {
    slug: "folio-template-catalog",
    category: "catalog",
    categoryLabel: "Shop thời trang",
    name: "Bebé Boutique",
    tagline: "Mặc đơn giản. Sống có gu.",
    description: "Mẫu shop thời trang tối giản với tông kem, ảnh bộ sưu tập lớn và lưới sản phẩm. Trải nghiệm chọn size, lọc sản phẩm và giỏ hàng minh họa trên máy tính lẫn điện thoại.",
    style: "Thời trang / Tối giản & thanh lịch",
    tone: "#edeae2",
    accent: "#30332a",
    dark: "#24251f",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    features: ["Bộ sưu tập theo mùa", "Lọc áo, quần và phụ kiện", "Xem sản phẩm & chọn size", "Giỏ hàng và thanh toán minh họa", "Câu chuyện thương hiệu"],
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
    features: ["Đội xe & thông số", "Giá thuê & đặt cọc", "Điểm giao nhận", "Điều kiện thuê", "Biểu mẫu yêu cầu thuê thử"],
  },
  {
    slug: "nestly-home-rental",
    category: "rental",
    categoryLabel: "Dịch vụ cho thuê",
    name: "Nestly",
    tagline: "Một căn nhà, ngàn trải nghiệm.",
    description: "Nền tảng thuê căn hộ phong cách ấm áp, thân thiện và đầy cảm hứng.",
    style: "Phong cách sống / Ấm áp",
    tone: "#f1e8dc",
    accent: "#9f5b3f",
    dark: "#283329",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    features: ["Bộ sưu tập chỗ ở", "Tiện nghi & sức chứa", "Cẩm nang địa phương", "Nội quy lưu trú", "Biểu mẫu đặt chỗ minh họa"],
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
    features: ["Danh mục & thông số máy", "Gói thuê theo ca / tháng", "Quy trình bàn giao", "Bảo trì & an toàn", "Biểu mẫu yêu cầu báo giá"],
  },
  {
    slug: "aurelia-luxury-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Aurelia",
    tagline: "Nghỉ dưỡng theo cách riêng.",
    description: "Giao diện resort cao cấp, giàu khoảng thở với trải nghiệm đặt phòng sang trọng.",
    style: "Sang trọng / Phong cách tạp chí",
    tone: "#e7ddcb",
    accent: "#a78152",
    dark: "#18211b",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    features: ["Ba hạng phòng & biệt thự", "Ẩm thực & spa", "Gói nghỉ dưỡng", "Hướng dẫn di chuyển", "Biểu mẫu đặt phòng minh họa"],
  },
  {
    slug: "sunday-boutique-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Sunday House",
    tagline: "Ở lại lâu hơn một chút.",
    description: "Khách sạn boutique trẻ trung với màu sắc vui tươi và bố cục phá cách.",
    style: "Khách sạn boutique / Tươi vui",
    tone: "#ffd5dc",
    accent: "#eb4f74",
    dark: "#193a37",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85",
    features: ["Ba hạng phòng", "Cẩm nang Sài Gòn", "Cà phê & sân thượng", "Tiện ích & chính sách", "Biểu mẫu đặt phòng minh họa"],
  },
  {
    slug: "hush-minimal-hotel",
    category: "hotel",
    categoryLabel: "Khách sạn",
    name: "Hush",
    tagline: "Không gian để thở.",
    description: "Website khách sạn tối giản kiểu Nhật, tĩnh lặng và tập trung vào hình ảnh.",
    style: "Tối giản / Thiền định",
    tone: "#e8e5de",
    accent: "#5d6c62",
    dark: "#2d302d",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    features: ["Phòng chiếu tatami & phòng suite", "Trà & ẩm thực Nhật", "Cẩm nang Kyoto", "Nội quy lưu trú", "Biểu mẫu đặt phòng minh họa"],
  },
  {
    slug: "orbit-crm-dashboard",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Orbit CRM",
    tagline: "Mọi khách hàng. Một nơi.",
    description: "Bảng điều khiển CRM hiện đại giúp đội ngũ bán hàng theo dõi quy trình cơ hội và hiệu suất tức thời.",
    style: "Phần mềm trực tuyến / Giao diện tối",
    tone: "#15172b",
    accent: "#7c6cff",
    dark: "#10111e",
    image: "",
    features: ["Quy trình bán hàng tương tác", "Thêm & lọc cơ hội", "Danh bạ khách hàng", "Lịch chăm sóc", "Báo cáo doanh số mẫu"],
  },
  {
    slug: "flowdesk-project-management",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Flowdesk",
    tagline: "Công việc trôi chảy, đội ngũ tiến tới.",
    description: "Ứng dụng quản lý dự án sạch sẽ, sáng sủa và dễ làm quen cho mọi đội nhóm.",
    style: "Gọn gàng / Hiệu suất",
    tone: "#e8f2ff",
    accent: "#2877f0",
    dark: "#172133",
    image: "",
    features: ["Bảng Kanban đổi trạng thái", "Thêm & tìm công việc", "Tiến độ dự án", "Phân bổ thành viên", "Lịch bàn giao"],
  },
  {
    slug: "minto-store-management",
    category: "management",
    categoryLabel: "Phần mềm quản lý",
    name: "Minto",
    tagline: "Cửa hàng gọn. Kinh doanh khỏe.",
    description: "Phần mềm quản lý bán hàng với bảng điều khiển thân thiện và dữ liệu dễ đọc.",
    style: "Thân thiện / Dữ liệu",
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
    description: "Website của công ty sáng tạo táo bạo, kiểu chữ lớn và chuyển động đầy năng lượng.",
    style: "Thô mộc / Táo bạo",
    tone: "#ff4d2e",
    accent: "#ff4d2e",
    dark: "#131313",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=85",
    features: ["Trưng bày chiến dịch", "Nghiên cứu tình huống chi tiết", "Gói sáng tạo & sản xuất", "Đội ngũ studio", "Biểu mẫu nhận yêu cầu minh họa"],
  },
  {
    slug: "halo-digital-marketing",
    category: "advertising",
    categoryLabel: "Website quảng cáo",
    name: "Halo Digital",
    tagline: "Tăng trưởng có chiến lược.",
    description: "Trang giới thiệu tiếp thị số theo phong cách công nghệ, tập trung thúc đẩy chuyển đổi.",
    style: "Công nghệ / Chuyển sắc",
    tone: "#dffaff",
    accent: "#4e5bff",
    dark: "#0c1024",
    image: "",
    features: ["Đánh giá tăng trưởng & tiếp thị", "Nghiên cứu tình huống chuyển đổi", "Chỉ số hiệu quả mẫu", "Đội ngũ chuyên môn", "Biểu mẫu đăng ký tư vấn"],
  },
  {
    slug: "muse-brand-studio",
    category: "advertising",
    categoryLabel: "Website quảng cáo",
    name: "Muse Studio",
    tagline: "Ý tưởng đáng để lan truyền.",
    description: "Hồ sơ năng lực của studio thương hiệu mang tinh thần tạp chí, thanh lịch và khác biệt.",
    style: "Phong cách tạp chí / Nghệ thuật",
    tone: "#f3ead8",
    accent: "#d3342f",
    dark: "#242018",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    features: ["Hồ sơ thương hiệu", "Nghiên cứu tình huống nhận diện", "Gói chiến lược & thiết kế", "Giới thiệu đội ngũ", "Biểu mẫu trao đổi dự án"],
  },
];

type CoreTemplateTranslation = Pick<
  TemplateItem,
  "categoryLabel" | "tagline" | "description" | "style" | "features"
>;

const englishCoreTemplateTranslations: Record<string, CoreTemplateTranslation> = {
  "lua-viet-restaurant": {
    categoryLabel: "F&B / Restaurant",
    tagline: "Vietnamese flavor, told through fire.",
    description: "A contemporary Vietnamese restaurant with deep brown tones, a seasonal menu, and a table-booking experience.",
    style: "Restaurant / Refined",
    features: ["Filterable menu", "Restaurant story", "Opening hours", "Sample booking form"],
  },
  "com-nha-eatery": {
    categoryLabel: "F&B / Eatery",
    tagline: "A good meal, a brighter day.",
    description: "A Vietnamese rice eatery with warm yellow tones, an easy-to-browse menu, and favorite dishes.",
    style: "Eatery / Welcoming",
    features: ["Menu & prices", "Mains, vegetables & soup filters", "Selected dishes", "Sample table-hold form"],
  },
  "moc-coffee": {
    categoryLabel: "F&B / Coffee",
    tagline: "Slow down a little, savor the day.",
    description: "A coffee shop in olive tones, with a roasted-bean story and a drinks-and-pastries menu.",
    style: "Coffee / Natural",
    features: ["Drinks & pastry menu", "Product-group filters", "Coffee story", "Sample reservation form"],
  },
  "folio-template-catalog": {
    categoryLabel: "Fashion shop",
    tagline: "Wear less. Mean more.",
    description: "A minimal fashion storefront with warm cream tones, large collection photography, product filters, size selection, and a demo shopping bag across desktop and mobile.",
    style: "Fashion / Minimal & elegant",
    features: ["Seasonal collections", "Tops, bottoms & accessories filters", "Product details & size selection", "Demo shopping bag & checkout", "Brand story"],
  },
  "ridenow-car-rental": {
    categoryLabel: "Rental service",
    tagline: "Rent a car. Go anywhere.",
    description: "A sporty car-rental website with a fast, youthful, confident booking experience.",
    style: "Sport / High contrast",
    features: ["Fleet & specifications", "Rates & deposit", "Pickup locations", "Rental terms", "Sample enquiry form"],
  },
  "nestly-home-rental": {
    categoryLabel: "Rental service",
    tagline: "One home, a thousand experiences.",
    description: "A warm, friendly, inspiring apartment-rental platform.",
    style: "Lifestyle / Warm",
    features: ["Stay collection", "Amenities & capacity", "Local guide", "House rules", "Sample booking form"],
  },
  "gearup-equipment-rental": {
    categoryLabel: "Rental service",
    tagline: "The right equipment. Right on time.",
    description: "A robust industrial interface for construction-equipment rental.",
    style: "Industrial / Bold",
    features: ["Machine catalogue & specs", "Shift / monthly plans", "Handover process", "Maintenance & safety", "Sample quote form"],
  },
  "aurelia-luxury-hotel": {
    categoryLabel: "Hotel",
    tagline: "Retreat in your own way.",
    description: "A spacious luxury-resort interface with a premium room-booking experience.",
    style: "Luxury / Editorial",
    features: ["Three room & villa types", "Dining & spa", "Retreat packages", "Travel guide", "Sample booking form"],
  },
  "sunday-boutique-hotel": {
    categoryLabel: "Hotel",
    tagline: "Stay a little longer.",
    description: "A playful boutique hotel with upbeat color and unconventional layouts.",
    style: "Boutique / Playful",
    features: ["Three room types", "Saigon local guide", "Café & rooftop", "Amenities & policies", "Sample booking form"],
  },
  "hush-minimal-hotel": {
    categoryLabel: "Hotel",
    tagline: "A space to breathe.",
    description: "A quiet, image-focused Japanese minimal hotel website.",
    style: "Minimal / Zen",
    features: ["Tatami & suite rooms", "Japanese tea & dining", "Kyoto guide", "Stay policy", "Sample booking form"],
  },
  "orbit-crm-dashboard": {
    categoryLabel: "Management software",
    tagline: "Every customer. One place.",
    description: "A modern CRM dashboard for tracking sales pipelines and performance at a glance.",
    style: "SaaS / Dark mode",
    features: ["Interactive sales pipeline", "Add & filter opportunities", "Customer directory", "Follow-up schedule", "Sample sales report"],
  },
  "flowdesk-project-management": {
    categoryLabel: "Management software",
    tagline: "Work flows. Teams move forward.",
    description: "A bright, approachable project-management app for teams of every kind.",
    style: "Clean / Productivity",
    features: ["Status-changing kanban", "Add & search work", "Project progress", "Team allocation", "Delivery calendar"],
  },
  "minto-store-management": {
    categoryLabel: "Management software",
    tagline: "A tidier store. A healthier business.",
    description: "Friendly sales-management software with an approachable dashboard and readable data.",
    style: "Friendly / Data",
    features: ["Revenue by channel", "Create & filter orders", "Status updates", "Inventory & alerts", "Operations calendar"],
  },
  "loud-creative-agency": {
    categoryLabel: "Advertising website",
    tagline: "Brands deserve to be seen.",
    description: "A bold creative-agency website with oversized typography and energetic motion.",
    style: "Brutal / Bold",
    features: ["Campaign showcase", "Detailed case studies", "Creative & production packages", "Studio team", "Sample brief form"],
  },
  "halo-digital-marketing": {
    categoryLabel: "Advertising website",
    tagline: "Growth with a strategy.",
    description: "A conversion-oriented, technology-led digital-marketing landing page.",
    style: "Tech / Gradient",
    features: ["Growth audit & marketing", "Conversion case studies", "Sample performance metrics", "Specialist team", "Consultation form"],
  },
  "muse-brand-studio": {
    categoryLabel: "Advertising website",
    tagline: "Ideas worth spreading.",
    description: "An elegant, distinctive editorial brand-studio portfolio.",
    style: "Editorial / Artistic",
    features: ["Brand portfolio", "Identity case studies", "Strategy & design packages", "Team introduction", "Project conversation form"],
  },
};

function projectTemplates(locale: Locale): TemplateItem[] {
  return getProjectSources(locale).map((project) => ({
    ...project.template,
    ...(project.external
      ? { name: project.name, description: project.caption, originalUrl: project.href }
      : {}),
    category: "project",
    image: project.image,
    inDevelopment: project.inDevelopment || project.template.inDevelopment,
  }));
}

function localizedCoreTemplates(locale: Locale): TemplateItem[] {
  if (locale === "vi") return coreTemplates;
  return coreTemplates.map((template) => ({
    ...template,
    ...englishCoreTemplateTranslations[template.slug],
  }));
}

export function getTemplates(locale: Locale = defaultLocale): TemplateItem[] {
  return [...projectTemplates(locale), ...localizedCoreTemplates(locale)];
}

export const templates = getTemplates();

const categoryLabels = {
  en: [
    { id: "all", label: "All" },
    { id: "rental", label: "Rental services" },
    { id: "hotel", label: "Hotels" },
    { id: "fnb", label: "F&B / Restaurants & eateries" },
    { id: "project", label: "From real projects" },
    { id: "management", label: "Management software" },
    { id: "advertising", label: "Advertising websites" },
    { id: "catalog", label: "Fashion shops" },
  ],
  vi: [
    { id: "all", label: "Tất cả" },
    { id: "rental", label: "Dịch vụ cho thuê" },
    { id: "hotel", label: "Khách sạn" },
    { id: "fnb", label: "F&B / Nhà hàng & quán ăn" },
    { id: "project", label: "Từ dự án thực tế" },
    { id: "management", label: "Phần mềm quản lý" },
    { id: "advertising", label: "Website quảng cáo" },
    { id: "catalog", label: "Shop thời trang" },
  ],
} as const;

export function getCategories(locale: Locale = defaultLocale) {
  const localizedTemplates = getTemplates(locale);
  return categoryLabels[locale].map((category) => ({
    ...category,
    count:
      category.id === "all"
        ? localizedTemplates.length
        : localizedTemplates.filter((template) => template.category === category.id)
            .length,
  }));
}

export const categories = getCategories();

export function getTemplate(slug: string, locale: Locale = defaultLocale) {
  return getTemplates(locale).find((template) => template.slug === slug);
}
