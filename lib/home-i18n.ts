import { homeContact, homeSections } from "./home-content";
import { getProjectSources, type ProjectSource } from "./project-sources";
import type { Locale } from "./i18n";

export { homeContact, homeSections };

export type HomeFilterId = "all" | "website" | "app" | "interface";

export type HomeService = {
  id: "website" | "app";
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export type PricingPlan = {
  name: string;
  audience: string;
  price: string;
  features: string[];
  featured: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const copy = {
  en: {
    skipToContent: "Skip to content",
    brandChatLabel: "Chat with DevDes",
    desktopNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    nav: {
      services: "Services",
      projects: "Projects",
      about: "About DevDes",
      templates: "Template library",
      startProject: "Start a project",
    },
    talk: "Let's talk",
    hero: {
      availability: "AVAILABLE FOR NEW PROJECTS",
      descriptionLineOne: "Thoughtful design, purposeful technology",
      descriptionLineTwo: "Websites & apps that move businesses forward",
      exploreProjects: "Explore projects",
      scroll: "SCROLL TO EXPLORE",
      completedProjects: "COMPLETED PROJECTS",
    },
    services: {
      eyebrow: "WHAT WE DO",
      headingLineOne: "Precision —",
      headingLineTwo: "Crafted Designs",
      descriptionLineOne: "Two strengths, one goal",
      descriptionLineTwo: "Turn business challenges into",
      descriptionLineThree: "effective digital experiences",
      contact: "Talk through your needs",
    },
    dashboard: {
      overview: "Overview",
      projects: "Projects",
      tasks: "Tasks",
      team: "Team",
      workspace: "Workspace",
      greeting: "GOOD MORNING, TEAM",
      heading: "Everything within reach",
      createProject: "Create project",
      activeProjects: "Active projects",
      completedTasks: "Completed tasks",
      teamPerformance: "Team performance",
      thisMonth: "This month",
      progress: "Project progress",
      thisWeek: "This week",
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      task: "Design website interface",
      completed: "Completed",
    },
    work: {
      eyebrow: "SELECTED WORK",
      index: "SELECTED PROJECTS",
      heading: "Made to stand out",
      descriptionLineOne: "Every idea deserves its own expression",
      descriptionLineTwo: "Explore the work we have brought to life",
      filterLabel: "Filter projects",
      projectCount: "projects",
      openInNewTab: "(opens in a new tab)",
      inDevelopment: "App currently in development",
      nextProject: "YOUR NEXT PROJECT COULD BE HERE",
      viewAll: "View all interfaces",
    },
    about: {
      eyebrow: "THE PEOPLE BEHIND THE PIXELS",
      index: "HELLO, WE’RE DEVDES®",
      headingLineOne: "Small team",
      headingLineTwo: "Big possibilities",
      togetherLineOne: "GOOD DESIGN",
      togetherLineTwo: "BETTER TOGETHER",
      firstParagraph:
        "We are DevDes — where design thinking meets development craft. A compact, hands-on team that cares about every detail.",
      secondParagraph:
        "From the first idea to launch day, we make websites and apps that look good and solve the right problem.",
      meetUs: "Get to know us",
      testimonialNote: "Experience perspective · Illustrative content",
      testimonialRegion: "Experience perspective",
      previousTestimonial: "View previous testimonial",
      nextTestimonial: "View next testimonial",
    },
    pricing: {
      eyebrow: "PRICING",
      index: "START WITH CLARITY",
      headingLineOne: "Use your budget well,",
      headingLineTwo: "elevate your brand.",
      description:
        "Professional web and app design for individuals and businesses — from VND 3,000,000.",
      mostPopular: "MOST POPULAR",
      choosePlan: "Choose this plan",
    },
    footer: {
      eyebrow: "HAVE SOMETHING IN MIND?",
      status: "LET’S MAKE IT HAPPEN",
      contactTitleLineOne: "Let’s make",
      contactTitleLineTwo: "something great",
      brandLineOne: "Thoughtful design",
      brandLineTwo: "Purposeful technology",
      explore: "EXPLORE",
      connect: "CONNECT",
      email: "Send email",
      projectIntro: "EVERY PROJECT STARTS WITH A HELLO",
      projectQuestionLineOne: "Have an idea for a website or app?",
      projectQuestionLineTwo: "We are ready to listen.",
      sendBrief: "Send your brief",
      briefSubject: "Discuss a project with DevDes",
      backToTop: "Back to top",
    },
  },
  vi: {
    skipToContent: "Bỏ qua điều hướng",
    brandChatLabel: "Mở chat với DevDes",
    desktopNavigation: "Điều hướng chính",
    mobileNavigation: "Điều hướng trên điện thoại",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    nav: {
      services: "Dịch vụ",
      projects: "Dự án",
      about: "Về DevDes",
      templates: "Kho giao diện",
      startProject: "Bắt đầu dự án",
    },
    talk: "Trao đổi",
    hero: {
      availability: "SẴN SÀNG CHO DỰ ÁN MỚI",
      descriptionLineOne: "Thiết kế có chiều sâu, công nghệ có mục đích",
      descriptionLineTwo: "Website & ứng dụng đưa doanh nghiệp tiến xa",
      exploreProjects: "Khám phá dự án",
      scroll: "KHÁM PHÁ THÊM",
      completedProjects: "DỰ ÁN ĐÃ THỰC HIỆN",
    },
    services: {
      eyebrow: "CHÚNG TÔI LÀM GÌ",
      headingLineOne: "Chỉn chu —",
      headingLineTwo: "từ từng chi tiết",
      descriptionLineOne: "Hai thế mạnh, một mục tiêu",
      descriptionLineTwo: "Biến bài toán của doanh nghiệp thành",
      descriptionLineThree: "những trải nghiệm số hiệu quả",
      contact: "Trao đổi nhu cầu của bạn",
    },
    dashboard: {
      overview: "Tổng quan",
      projects: "Dự án",
      tasks: "Công việc",
      team: "Đội ngũ",
      workspace: "Không gian làm việc",
      greeting: "CHÀO BUỔI SÁNG, ĐỘI NGŨ",
      heading: "Mọi thứ trong tầm tay",
      createProject: "Tạo dự án",
      activeProjects: "Dự án đang chạy",
      completedTasks: "Công việc hoàn thành",
      teamPerformance: "Hiệu suất đội ngũ",
      thisMonth: "Tháng này",
      progress: "Tiến độ công việc",
      thisWeek: "Tuần này",
      monday: "Thứ 2",
      tuesday: "Thứ 3",
      wednesday: "Thứ 4",
      thursday: "Thứ 5",
      friday: "Thứ 6",
      task: "Thiết kế giao diện website",
      completed: "Hoàn thành",
    },
    work: {
      eyebrow: "DỰ ÁN TIÊU BIỂU",
      index: "DỰ ÁN ĐÃ THỰC HIỆN",
      heading: "Tạo để khác biệt",
      descriptionLineOne: "Mỗi ý tưởng, một cách thể hiện",
      descriptionLineTwo: "Khám phá những dự án chúng tôi đã thực hiện",
      filterLabel: "Lọc dự án",
      projectCount: "dự án",
      openInNewTab: "(mở trong tab mới)",
      inDevelopment: "Ứng dụng đang trong quá trình phát triển",
      nextProject: "DỰ ÁN TIẾP THEO CÓ THỂ LÀ CỦA BẠN",
      viewAll: "Xem toàn bộ giao diện",
    },
    about: {
      eyebrow: "NHỮNG NGƯỜI ĐỨNG SAU THIẾT KẾ",
      index: "XIN CHÀO, CHÚNG TÔI LÀ DEVDES®",
      headingLineOne: "Đội ngũ gọn",
      headingLineTwo: "Khả năng lớn",
      togetherLineOne: "THIẾT KẾ TỐT",
      togetherLineTwo: "TỐT HƠN KHI CÙNG NHAU",
      firstParagraph:
        "Chúng tôi là DevDes — nơi tư duy thiết kế gặp kỹ thuật phát triển. Một đội ngũ gọn gàng, làm việc trực tiếp và quan tâm đến từng chi tiết.",
      secondParagraph:
        "Từ ý tưởng đầu tiên đến ngày ra mắt, chúng tôi cùng bạn tạo nên website và ứng dụng vừa đẹp, vừa giải quyết đúng vấn đề.",
      meetUs: "Làm quen với chúng tôi",
      testimonialNote: "Góc nhìn trải nghiệm · Nội dung minh họa",
      testimonialRegion: "Góc nhìn trải nghiệm",
      previousTestimonial: "Xem đánh giá trước",
      nextTestimonial: "Xem đánh giá tiếp theo",
    },
    pricing: {
      eyebrow: "BẢNG GIÁ",
      index: "BẮT ĐẦU RÕ RÀNG",
      headingLineOne: "Tối ưu ngân sách,",
      headingLineTwo: "nâng tầm thương hiệu.",
      description:
        "Giải pháp thiết kế website và ứng dụng chuyên nghiệp dành cho cá nhân, doanh nghiệp — chỉ từ 3.000.000 VNĐ.",
      mostPopular: "PHỔ BIẾN NHẤT",
      choosePlan: "Chọn gói này",
    },
    footer: {
      eyebrow: "BẠN ĐANG ẤP Ủ ĐIỀU GÌ?",
      status: "CÙNG BIẾN NÓ THÀNH HIỆN THỰC",
      contactTitleLineOne: "Cùng tạo nên",
      contactTitleLineTwo: "điều tuyệt vời",
      brandLineOne: "Thiết kế có chiều sâu",
      brandLineTwo: "Công nghệ có mục đích",
      explore: "KHÁM PHÁ",
      connect: "KẾT NỐI",
      email: "Gửi email",
      projectIntro: "MỌI DỰ ÁN BẮT ĐẦU TỪ MỘT LỜI CHÀO",
      projectQuestionLineOne: "Có ý tưởng cho website hay ứng dụng?",
      projectQuestionLineTwo: "Chúng tôi sẵn sàng lắng nghe.",
      sendBrief: "Gửi yêu cầu dự án",
      briefSubject: "Trao đổi dự án cùng DevDes",
      backToTop: "Về đầu trang",
    },
  },
} as const;

const services: Record<Locale, HomeService[]> = {
  en: [
    {
      id: "website",
      number: "01",
      title: "Website Development",
      subtitle: "One touchpoint, more opportunity",
      description:
        "Websites for businesses that want to make a memorable impression and grow with confidence — from company sites and ecommerce to internal operating platforms, refined from interface to experience.",
      tags: ["UI/UX Design", "E-commerce", "Corporate Website", "Web Portal", "CMS"],
    },
    {
      id: "app",
      number: "02",
      title: "App Development",
      subtitle: "Good ideas, smarter operations",
      description:
        "Applications that help teams connect with customers and manage work efficiently. Designed around real workflows, easy to use, and ready to grow with your business.",
      tags: ["Product Design", "Business App", "CRM / ERP", "Internal Tools", "Dashboard"],
    },
  ],
  vi: [
    {
      id: "website",
      number: "01",
      title: "Thiết kế website",
      subtitle: "Một điểm chạm, nhiều cơ hội",
      description:
        "Website dành cho doanh nghiệp muốn tạo dấu ấn và phát triển kinh doanh. Từ trang giới thiệu, thương mại điện tử đến nền tảng vận hành nội bộ — chỉn chu từ giao diện đến trải nghiệm.",
      tags: ["UI/UX", "Thương mại điện tử", "Website doanh nghiệp", "Cổng thông tin", "CMS"],
    },
    {
      id: "app",
      number: "02",
      title: "Thiết kế ứng dụng",
      subtitle: "Ý tưởng tốt, vận hành thông minh",
      description:
        "Ứng dụng giúp tổ chức kết nối khách hàng và quản lý công việc hiệu quả. Thiết kế theo quy trình thực tế, dễ sử dụng và sẵn sàng mở rộng cùng doanh nghiệp.",
      tags: ["Thiết kế sản phẩm", "Ứng dụng doanh nghiệp", "CRM / ERP", "Công cụ nội bộ", "Bảng điều khiển"],
    },
  ],
};

const filters: Record<Locale, { id: HomeFilterId; label: string; tag?: string }[]> = {
  en: [
    { id: "all", label: "All" },
    { id: "website", label: "Website", tag: "Website" },
    { id: "app", label: "App", tag: "App" },
    { id: "interface", label: "Interface Design", tag: "Interface Design" },
  ],
  vi: [
    { id: "all", label: "Tất cả" },
    { id: "website", label: "Website", tag: "Website" },
    { id: "app", label: "Ứng dụng", tag: "App" },
    { id: "interface", label: "Thiết kế giao diện", tag: "Interface Design" },
  ],
};

const testimonials: Record<Locale, Testimonial[]> = {
  en: [
    {
      quote:
        "A beautiful website is a beginning. An experience that makes customers want to return is what creates the difference.",
      name: "Brand perspective",
      role: "Business website",
      initials: "01",
    },
    {
      quote:
        "The right tools give teams less time on repetitive work and more time for work that genuinely matters.",
      name: "Operations perspective",
      role: "Internal management application",
      initials: "02",
    },
    {
      quote:
        "Every small detail contributes to a larger experience. Design and technology should solve the same problem together.",
      name: "Product perspective",
      role: "User-experience design",
      initials: "03",
    },
  ],
  vi: [
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
  ],
};

const pricingPlans: Record<Locale, PricingPlan[]> = {
  en: [
    {
      name: "Starter",
      audience: "Individuals, startups, landing pages, and simple websites",
      price: "From VND 3,000,000",
      features: ["Brand-aligned design", "Responsive on every device", "Essential speed optimization"],
      featured: false,
    },
    {
      name: "Growth",
      audience: "Businesses and straightforward mobile apps",
      price: "From VND 8,000,000",
      features: ["Workflow-led UI/UX", "Interactive prototype", "Development-ready design handoff"],
      featured: true,
    },
    {
      name: "Custom",
      audience: "Complex systems and specialized mobile applications",
      price: "Tailored quote",
      features: ["Discovery & solution consulting", "Scalable system design", "Implementation partnership"],
      featured: false,
    },
  ],
  vi: [
    {
      name: "Starter",
      audience: "Cá nhân, công ty khởi nghiệp, trang giới thiệu và website đơn giản",
      price: "Từ 3.000.000 VNĐ",
      features: ["Thiết kế theo nhận diện", "Hiển thị tốt trên mọi thiết bị", "Tối ưu tốc độ cơ bản"],
      featured: false,
    },
    {
      name: "Growth",
      audience: "Doanh nghiệp, ứng dụng di động cơ bản",
      price: "Từ 8.000.000 VNĐ",
      features: ["UI/UX theo quy trình nghiệp vụ", "Bản mẫu tương tác", "Bàn giao thiết kế để phát triển"],
      featured: true,
    },
    {
      name: "Custom",
      audience: "Hệ thống phức tạp, ứng dụng di động theo yêu cầu riêng",
      price: "Báo giá riêng",
      features: ["Khảo sát & tư vấn giải pháp", "Thiết kế hệ thống mở rộng", "Đồng hành triển khai"],
      featured: false,
    },
  ],
};

export function getHomeContent(locale: Locale): {
  copy: (typeof copy)[Locale];
  services: HomeService[];
  filters: { id: HomeFilterId; label: string; tag?: string }[];
  projects: ProjectSource[];
  testimonials: Testimonial[];
  pricingPlans: PricingPlan[];
} {
  return {
    copy: copy[locale],
    services: services[locale],
    filters: filters[locale],
    projects: getProjectSources(locale),
    testimonials: testimonials[locale],
    pricingPlans: pricingPlans[locale],
  };
}
