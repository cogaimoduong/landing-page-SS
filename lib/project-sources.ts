export type ProjectSourceKind = "website" | "app";

export type ProjectTemplateSource = {
  slug: string;
  categoryLabel: string;
  name: string;
  tagline: string;
  description: string;
  style: string;
  tone: string;
  accent: string;
  dark: string;
  features: string[];
  sourceKind: ProjectSourceKind;
  inDevelopment?: boolean;
};

export type ProjectSource = {
  slug: string;
  name: string;
  caption: string;
  introduction?: string;
  tags: string[];
  visual: string;
  image: string;
  href: string;
  label: string;
  linkLabel: string;
  external?: boolean;
  inDevelopment?: boolean;
  template: ProjectTemplateSource;
};

// A single source of truth: project cards use the real-project fields above,
// while the template catalog uses the generic `template` fields below.
export const projectSources: ProjectSource[] = [
  {
    slug: "sensescene",
    name: "Sense & Scene Studio",
    caption: "Website cho studio sáng tạo — chuyên cung cấp các ứng dụng di động giải trí, các sản phẩm hình ảnh cùng trải nghiệm nghệ thuật thị giác.",
    tags: ["Website", "Interface Design"],
    visual: "sensescene",
    image: "/images/projects/sensescene.jpg",
    href: "https://sensescene.studio/",
    label: "CREATIVE STUDIO / WEBSITE",
    linkLabel: "Xem website",
    external: true,
    template: {
      slug: "kinetic-creative-studio",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Kinetic Studio",
      tagline: "Biến ý tưởng thành trải nghiệm thị giác.",
      description: "Mẫu website studio sáng tạo với bố cục đậm chất hình ảnh, phù hợp cho đội ngũ CGI, motion, phim hoặc thương hiệu sáng tạo.",
      style: "Creative / Immersive",
      tone: "#0b0c12",
      accent: "#c3b2ff",
      dark: "#0b0c12",
      features: ["Hero giàu hình ảnh", "Showreel & dự án nổi bật", "Dịch vụ studio", "Form nhận brief"],
      sourceKind: "website",
    },
  },
  {
    slug: "vivui",
    name: "Ví Vui",
    caption: "Ứng dụng ghi chép thu chi và đếm tiền mặt cá nhân",
    tags: ["App", "Interface Design"],
    visual: "vivui",
    image: "/images/projects/vivui.jpg",
    href: "https://vivui.vercel.app/",
    label: "PERSONAL FINANCE / MOBILE APP",
    linkLabel: "Xem ứng dụng",
    external: true,
    inDevelopment: true,
    template: {
      slug: "penny-personal-finance",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Penny",
      tagline: "Tài chính gọn, ngày nhẹ hơn.",
      description: "Mẫu ứng dụng điện thoại ghi chép tài chính cá nhân, với luồng onboarding rõ ràng, tổng quan thu chi và các thẻ thông tin dễ đọc.",
      style: "Mobile Finance App / Calm",
      tone: "#e7f0df",
      accent: "#267350",
      dark: "#183f31",
      features: ["Màn hình onboarding", "Tổng quan thu chi", "Ngân sách theo nhóm", "Lịch sử giao dịch"],
      sourceKind: "app",
      inDevelopment: true,
    },
  },
  {
    slug: "loopix",
    name: "Loopix",
    caption: "Website giới thiệu dịch vụ trải nghiệm không gian số hoá, đa dạng mô hình — Virtual 360 & Scan 3D.",
    tags: ["Website", "Interface Design"],
    visual: "loopix",
    image: "/images/projects/loopix.jpg",
    href: "https://loopix-demo.vercel.app/",
    label: "VIRTUAL TOUR / WEBSITE",
    linkLabel: "Xem website",
    external: true,
    template: {
      slug: "vista-virtual-tour",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Vista 360",
      tagline: "Mở ra không gian trước khi bạn đến.",
      description: "Mẫu website cho dịch vụ tham quan 360°, bất động sản, showroom hoặc không gian cần kể chuyện bằng hình ảnh.",
      style: "Service / Cinematic",
      tone: "#edf0f0",
      accent: "#315682",
      dark: "#182739",
      features: ["Hero toàn màn hình", "Thư viện không gian", "Quy trình triển khai", "Form nhận báo giá"],
      sourceKind: "website",
    },
  },
  {
    slug: "room-management",
    name: "App Quản Lý Căn Hộ Dịch Vụ / Serviced Apartment Mobile App",
    caption: "Quản lý người cư trú, hoạt động kinh doanh và bộ máy nội bộ tích hợp thanh toán, hoá đơn — tất cả trong một.",
    tags: ["App", "Interface Design"],
    visual: "room-management",
    image: "/images/projects/room-management-app.png",
    href: "/giao-dien/roomly-property-manager",
    label: "PROPERTY MANAGEMENT / APP",
    linkLabel: "Xem giao diện mẫu",
    inDevelopment: true,
    template: {
      slug: "roomly-property-manager",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Roomly",
      tagline: "Quản lý chỗ ở, rõ ràng từng ngày.",
      description: "Mẫu ứng dụng điện thoại quản lý phòng trọ, căn hộ cho thuê và thu tiền định kỳ với các thao tác vận hành gọn trong một màn hình.",
      style: "Mobile Property App / Clear",
      tone: "#eaf3ff",
      accent: "#2874d0",
      dark: "#122b4b",
      features: ["Tình trạng phòng trực quan", "Khách thuê & hợp đồng", "Hóa đơn định kỳ", "Theo dõi doanh thu"],
      sourceKind: "app",
      inDevelopment: true,
    },
  },
  {
    slug: "bao-tq-admin",
    name: "App Dữ Liệu & Bảng Xếp Hạng Chuyên Sâu / Niche Product Analytics & Ranking App",
    caption: "Tra cứu dữ liệu chuyên sâu & cung cấp bảng xếp hạng cho sản phẩm đặc thù.",
    tags: ["App", "Interface Design"],
    visual: "bao-tq-admin",
    image: "/images/projects/bao-tq-admin.jpg",
    href: "https://infomation-tq.vercel.app/",
    label: "DATA MANAGEMENT / MOBILE APP",
    linkLabel: "Xem ứng dụng",
    external: true,
    inDevelopment: true,
    template: {
      slug: "atlas-content-ops",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Atlas Ops",
      tagline: "Dữ liệu nhiều, vận hành vẫn gọn.",
      description: "Mẫu ứng dụng điện thoại giúp theo dõi, phân loại và khai thác dữ liệu quan trọng ngay khi đang vận hành.",
      style: "Mobile Data App / Focused",
      tone: "#edf1f8",
      accent: "#5a54b5",
      dark: "#182d49",
      features: ["Kho dữ liệu tập trung", "Bộ lọc linh hoạt", "Quyền theo vai trò", "Báo cáo vận hành"],
      sourceKind: "app",
      inDevelopment: true,
    },
  },
  {
    slug: "kim-hien-van-tai",
    name: "E-Wedding Website",
    caption: "Thiệp cưới trực tuyến với hiệu ứng mở thiệp, album ảnh và lịch ngày vui",
    tags: ["Website", "Interface Design"],
    visual: "kim-hien-van-tai",
    image: "/images/projects/kim-hien-van-tai.jpg",
    href: "https://thiepmoicuoikimhien.vercel.app/",
    label: "WEDDING INVITATION / WEBSITE",
    linkLabel: "Xem website",
    external: true,
    template: {
      slug: "evermore-invitation",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Evermore",
      tagline: "Lời mời dành cho ngày đáng nhớ.",
      description: "Mẫu website thiệp cưới hoặc sự kiện cá nhân với hero cảm xúc, lịch trình, album và form xác nhận tham dự.",
      style: "Event / Romantic",
      tone: "#f5e4e4",
      accent: "#9f2f48",
      dark: "#551b2c",
      features: ["Mở thiệp trực tuyến", "Lịch trình sự kiện", "Album ảnh", "Form xác nhận tham dự"],
      sourceKind: "website",
    },
  },
  {
    slug: "saint-cons",
    name: "SaintCons",
    caption: "Website giới thiệu doanh nghiệp thiết kế kiến trúc và thi công xây dựng tại Đồng Nai",
    tags: ["Website", "Interface Design"],
    visual: "saint-cons",
    image: "/images/projects/saint-cons.jpg",
    href: "https://saint-cons.vercel.app/",
    label: "ARCHITECTURE & CONSTRUCTION / WEBSITE",
    linkLabel: "Xem website",
    external: true,
    template: {
      slug: "form-architecture",
      categoryLabel: "Giao diện từ dự án thực tế",
      name: "Form Architecture",
      tagline: "Không gian được tạo nên có chủ đích.",
      description: "Mẫu website kiến trúc và xây dựng với hình ảnh công trình nổi bật, năng lực dịch vụ và form tư vấn dự án.",
      style: "Architecture / Premium",
      tone: "#e8e2d8",
      accent: "#c4a54c",
      dark: "#172333",
      features: ["Hero công trình toàn màn hình", "Danh mục dự án", "Dịch vụ & quy trình", "Form tư vấn"],
      sourceKind: "website",
    },
  },
];
