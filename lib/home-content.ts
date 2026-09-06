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
    subtitle: "Một điểm chạm. Nhiều cơ hội.",
    description:
      "Website dành cho doanh nghiệp muốn tạo dấu ấn và phát triển kinh doanh. Từ trang giới thiệu, thương mại điện tử đến nền tảng vận hành nội bộ — chỉn chu từ giao diện đến trải nghiệm.",
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
    subtitle: "Ý tưởng tốt. Vận hành thông minh.",
    description:
      "Ứng dụng giúp tổ chức kết nối khách hàng và quản lý công việc hiệu quả. Thiết kế theo quy trình thực tế, dễ sử dụng và sẵn sàng mở rộng cùng doanh nghiệp.",
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
export const homeProjects = [
  {
    slug: "aurelia-luxury-hotel",
    name: "Aurelia",
    caption: "Một trải nghiệm nghỉ dưỡng tinh tế.",
    tags: ["Website", "Interface Design"],
    visual: "aurelia",
    label: "HOSPITALITY / WEBSITE",
  },
  {
    slug: "flowdesk-project-management",
    name: "Flowdesk",
    caption: "Công việc trôi. Đội ngũ tiến tới.",
    tags: ["App", "Interface Design"],
    visual: "flowdesk",
    label: "PRODUCTIVITY / WEB APP",
  },
  {
    slug: "muse-brand-studio",
    name: "Muse Studio",
    caption: "Không gian cho những ý tưởng khác biệt.",
    tags: ["Website"],
    visual: "muse",
    label: "CREATIVE STUDIO / WEBSITE",
  },
  {
    slug: "minto-store-management",
    name: "Minto",
    caption: "Quản lý gọn gàng. Kinh doanh nhẹ nhàng.",
    tags: ["App", "Interface Design"],
    visual: "minto",
    label: "COMMERCE / BUSINESS APP",
  },
];

// Illustrative content, labelled in the UI; replace with approved client feedback.
export const homeTestimonials = [
  {
    quote:
      "Một website đẹp là khởi đầu. Một trải nghiệm khiến khách hàng muốn quay lại mới là điều tạo nên khác biệt.",
    name: "Góc nhìn thương hiệu",
    role: "Website doanh nghiệp",
    initials: "01",
  },
  {
    quote:
      "Công cụ tốt giúp đội ngũ dành ít thời gian cho thao tác lặp lại, và nhiều thời gian hơn cho những việc thực sự có ý nghĩa.",
    name: "Góc nhìn vận hành",
    role: "Ứng dụng quản lý nội bộ",
    initials: "02",
  },
  {
    quote:
      "Từng chi tiết nhỏ đều góp phần tạo nên trải nghiệm lớn. Thiết kế và công nghệ cần cùng giải quyết một bài toán.",
    name: "Góc nhìn sản phẩm",
    role: "Thiết kế trải nghiệm người dùng",
    initials: "03",
  },
];
