export type BackgroundTheme = "light" | "dark";

// Each block owns its theme, independently of the operating-system preference.
// Map the future CMS's Background Theme select to this typed content boundary.
export const homeSections: Record<
  "hero" | "services" | "projects" | "about" | "contact",
  { backgroundTheme: BackgroundTheme }
> = {
  hero: { backgroundTheme: "light" },
  services: { backgroundTheme: "dark" },
  projects: { backgroundTheme: "dark" },
  about: { backgroundTheme: "light" },
  contact: { backgroundTheme: "dark" },
};

export const homeContact = {
  // Existing contact address, pending the new brand's confirmed email.
  email: "hello@webdao.vn",
};

export const homeServices = [
  {
    id: "website",
    number: "01",
    title: "Website Development",
    subtitle: "Một điểm chạm, nhiều cơ hội",
    description:
      "Website dành cho doanh nghiệp muốn tạo dấu ấn và phát triển kinh doanh. Từ trang giới thiệu, thương mại điện tử đến nền tảng vận hành nội bộ — chỉn chu từ giao diện đến trải nghiệm",
    tags: [
      "UI/UX Design",
      "E-commerce",
      "Corporate Website",
      "Web Portal",
      "CMS",
    ],
  },
  {
    id: "app",
    number: "02",
    title: "App Development",
    subtitle: "Ý tưởng tốt, vận hành thông minh",
    description:
      "Ứng dụng giúp tổ chức kết nối khách hàng và quản lý công việc hiệu quả. Thiết kế theo quy trình thực tế, dễ sử dụng và sẵn sàng mở rộng cùng doanh nghiệp",
    tags: [
      "Product Design",
      "Business App",
      "CRM / ERP",
      "Internal Tools",
      "Dashboard",
    ],
  },
] as const;

export const projectFilters = [
  "All",
  "Website",
  "App",
  "Interface Design",
] as const;
export type ProjectFilter = (typeof projectFilters)[number];
type HomeProject = {
  slug: string;
  name: string;
  caption: string;
  introduction?: string;
  tags: string[];
  visual: string;
  image: string;
  href: string;
  label: string;
};

// Add each project's longer introduction when the copy is ready.
export const homeProjects: HomeProject[] = [
  {
    slug: "sensescene",
    name: "Sense & Scene Studio",
    caption: "Website studio sáng tạo về CGI, motion và trải nghiệm thị giác",
    tags: ["Website", "Interface Design"],
    visual: "sensescene",
    image: "/images/projects/sensescene.jpg",
    href: "https://sensescene.studio/",
    label: "CREATIVE STUDIO / WEBSITE",
  },
  {
    slug: "vivui",
    name: "Ví Vui",
    caption: "Ứng dụng ghi chép thu chi và đếm tiền mặt cá nhân",
    tags: ["App", "Interface Design"],
    visual: "vivui",
    image: "/images/projects/vivui.jpg",
    href: "https://vivui.vercel.app/",
    label: "PERSONAL FINANCE / WEB APP",
  },
  {
    slug: "loopix",
    name: "Loopix",
    caption: "Website giới thiệu dịch vụ tham quan không gian 360°",
    tags: ["Website", "Interface Design"],
    visual: "loopix",
    image: "/images/projects/loopix.jpg",
    href: "https://loopix-demo.vercel.app/",
    label: "VIRTUAL TOUR / WEBSITE",
  },
  {
    slug: "bao-tq-admin",
    name: "BXH tổng hợp",
    caption: "Ứng dụng quản trị, theo dõi và khai thác dữ liệu đã thu thập",
    tags: ["App", "Interface Design"],
    visual: "bao-tq-admin",
    image: "/images/projects/bao-tq-admin.jpg",
    href: "https://infomation-tq.vercel.app/",
    label: "DATA MANAGEMENT / WEB APP",
  },
  {
    slug: "kim-hien-van-tai",
    name: "Kim Hiên & Văn Tài",
    caption: "Thiệp cưới trực tuyến với hiệu ứng mở thiệp, album ảnh và lịch ngày vui",
    tags: ["Website", "Interface Design"],
    visual: "kim-hien-van-tai",
    image: "/images/projects/kim-hien-van-tai.jpg",
    href: "https://thiepmoicuoikimhien.vercel.app/",
    label: "WEDDING INVITATION / WEBSITE",
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
  },
];

// Illustrative content, labelled in the UI; replace with approved client feedback.
export const homeTestimonials = [
  {
    quote:
      "Một website đẹp là khởi đầu. Một trải nghiệm khiến khách hàng muốn quay lại mới là điều tạo nên khác biệt",
    name: "Góc nhìn thương hiệu",
    role: "Website doanh nghiệp",
    initials: "01",
  },
  {
    quote:
      "Công cụ tốt giúp đội ngũ dành ít thời gian cho thao tác lặp lại, và nhiều thời gian hơn cho những việc thực sự có ý nghĩa",
    name: "Góc nhìn vận hành",
    role: "Ứng dụng quản lý nội bộ",
    initials: "02",
  },
  {
    quote:
      "Từng chi tiết nhỏ đều góp phần tạo nên trải nghiệm lớn. Thiết kế và công nghệ cần cùng giải quyết một bài toán",
    name: "Góc nhìn sản phẩm",
    role: "Thiết kế trải nghiệm người dùng",
    initials: "03",
  },
];
