import type { Locale } from "./i18n";

export type BebeText = Record<Locale, string>;
export type BebeCategory = "all" | "baby" | "girl" | "boy" | "accessories";
export type BebeCollection = "all" | "sunny" | "school" | "dream" | "welcome";
export type BebeAge = "all" | "baby" | "toddler" | "kids";
export type BebeProduct = {
  id: number;
  name: BebeText;
  material: BebeText;
  description: BebeText;
  color: string;
  colorName: BebeText;
  price: number;
  categories: BebeCategory[];
  collections: BebeCollection[];
  ages: BebeAge[];
  sizes: string[];
  sizeType: "baby" | "clothes" | "shoes" | "accessory";
  badge?: "new" | "favorite";
};

const l = (vi: string, en: string): BebeText => ({ vi, en });
const babySizes = ["0–3M", "3–6M", "6–12M", "12–24M"];
const kidSizes = ["2Y", "3–4Y", "5–6Y", "7–8Y"];
const babyDescription = l("Mềm mại cho những ngày đầu khám phá thế giới. Thiết kế dễ thay, thoải mái khi bé nằm, lẫy và tập bò.", "A soft little layer for first discoveries. Easy to change and comfortable for lying down, rolling, and crawling.");
const playDescription = l("Phom dáng thoải mái, dễ phối cùng những món bé yêu thích. Sẵn sàng cho một ngày đi học, dạo chơi và khám phá.", "An easy, relaxed shape to mix with their favourite pieces. Made for school days, play dates, and little adventures.");
const accessoryDescription = l("Một món nhỏ xinh để hoàn thiện bộ đồ của bé, hoặc gửi tặng cùng lời nhắn yêu thương.", "A lovely little finishing touch for their outfit, or a thoughtful addition to a gift.");

export const bebeProducts: BebeProduct[] = [
  { id: 0, name: l("Bodysuit Nắng Nhỏ", "Little Sunshine Bodysuit"), material: l("Cotton mềm", "Soft cotton"), description: babyDescription, color: "#efe8d6", colorName: l("Kem sữa", "Milk cream"), price: 189000, categories: ["baby"], collections: ["welcome", "dream"], ages: ["baby"], sizes: babySizes, sizeType: "baby", badge: "favorite" },
  { id: 1, name: l("Romper Mầm Xanh", "Little Sprout Romper"), material: l("Cotton muslin", "Cotton muslin"), description: babyDescription, color: "#99aa94", colorName: l("Xanh xô thơm", "Sage"), price: 259000, categories: ["baby"], collections: ["welcome", "sunny"], ages: ["baby"], sizes: babySizes, sizeType: "baby", badge: "new" },
  { id: 2, name: l("Cardigan Mây Hồng", "Rosy Cloud Cardigan"), material: l("Cotton dệt kim", "Cotton knit"), description: babyDescription, color: "#ca8b85", colorName: l("Hồng đất", "Dusty rose"), price: 329000, categories: ["baby"], collections: ["welcome"], ages: ["baby"], sizes: babySizes, sizeType: "baby" },
  { id: 3, name: l("Khăn Sao Êm", "Sleepy Stars Blanket"), material: l("Muslin nhiều lớp", "Layered muslin"), description: accessoryDescription, color: "#e9dec6", colorName: l("Kem sao vàng", "Cream & gold"), price: 219000, categories: ["baby", "accessories"], collections: ["welcome", "dream"], ages: ["baby"], sizes: ["100 × 100 cm"], sizeType: "accessory" },
  { id: 4, name: l("Váy Vườn Đào", "Peach Garden Dress"), material: l("Cotton thoáng nhẹ", "Airy cotton"), description: playDescription, color: "#db8d7e", colorName: l("Hồng đào", "Peach"), price: 359000, categories: ["girl"], collections: ["sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes", badge: "new" },
  { id: 5, name: l("Váy Caro Tím Mơ", "Lilac Picnic Dress"), material: l("Cotton caro", "Gingham cotton"), description: playDescription, color: "#b8a5cd", colorName: l("Tím lilac", "Lilac"), price: 339000, categories: ["girl"], collections: ["sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes" },
  { id: 6, name: l("Áo Thun Mặt Trời", "Happy Sun Tee"), material: l("Cotton jersey", "Cotton jersey"), description: playDescription, color: "#e9d18b", colorName: l("Vàng bơ", "Butter yellow"), price: 179000, categories: ["girl", "boy"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes", badge: "favorite" },
  { id: 7, name: l("Pijama Kẹo Sữa", "Milk Candy Pyjamas"), material: l("Cotton mềm", "Soft cotton"), description: l("Bộ đồ dài tay nhẹ nhàng cho giờ đọc truyện và những tối cả nhà ở bên nhau. Cạp quần co giãn, dễ mặc.", "A soft long-sleeved set for story time and cosy family evenings. Finished with an easy elastic waistband."), color: "#eab9a4", colorName: l("Sọc đào", "Peach stripe"), price: 299000, categories: ["girl", "boy"], collections: ["dream"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes" },
  { id: 8, name: l("Yếm Ngày Nắng", "Sunny Days Dungarees"), material: l("Cotton twill", "Cotton twill"), description: playDescription, color: "#e4c16c", colorName: l("Vàng nắng", "Sunshine"), price: 389000, categories: ["girl", "boy"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes", badge: "favorite" },
  { id: 9, name: l("Sơ Mi Trời Xanh", "Blue Sky Shirt"), material: l("Vải pha linen", "Linen blend"), description: playDescription, color: "#9fb9cd", colorName: l("Xanh trời", "Sky blue"), price: 269000, categories: ["boy"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes", badge: "new" },
  { id: 10, name: l("Quần Short Lá Non", "Little Leaf Shorts"), material: l("Cotton muslin", "Cotton muslin"), description: playDescription, color: "#a6af96", colorName: l("Xanh lá non", "Soft sage"), price: 219000, categories: ["girl", "boy"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes" },
  { id: 11, name: l("Áo Thun Sọc Kem", "Peaches & Cream Tee"), material: l("Cotton jersey", "Cotton jersey"), description: playDescription, color: "#e4ad95", colorName: l("Sọc kem đào", "Peach & cream"), price: 189000, categories: ["girl", "boy"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: kidSizes, sizeType: "clothes" },
  { id: 12, name: l("Mũ Bucket Nắng Mai", "Morning Sun Bucket Hat"), material: l("Cotton twill", "Cotton twill"), description: accessoryDescription, color: "#ead084", colorName: l("Vàng nhạt", "Pale yellow"), price: 149000, categories: ["accessories"], collections: ["sunny"], ages: ["toddler", "kids"], sizes: ["48 cm", "52 cm"], sizeType: "accessory", badge: "new" },
  { id: 13, name: l("Balo Mầm Non", "Little Explorer Backpack"), material: l("Canvas", "Canvas"), description: accessoryDescription, color: "#9eab95", colorName: l("Xanh xô thơm", "Sage"), price: 329000, categories: ["accessories"], collections: ["school"], ages: ["toddler", "kids"], sizes: ["22 × 28 cm"], sizeType: "accessory" },
  { id: 14, name: l("Tất Búp Bê", "Rosy Little Socks"), material: l("Cotton dệt gân", "Ribbed cotton"), description: accessoryDescription, color: "#e9b8b2", colorName: l("Hồng phấn", "Blush pink"), price: 79000, categories: ["baby", "accessories"], collections: ["welcome", "dream"], ages: ["baby"], sizes: ["0–6M", "6–12M", "12–24M"], sizeType: "baby" },
  { id: 15, name: l("Giày Bước Nhỏ", "Little Steps Sneakers"), material: l("Canvas & đế cao su", "Canvas & rubber sole"), description: accessoryDescription, color: "#e3d8c2", colorName: l("Kem", "Cream"), price: 349000, categories: ["accessories"], collections: ["school", "sunny"], ages: ["toddler", "kids"], sizes: ["EU 24", "EU 26", "EU 28", "EU 30"], sizeType: "shoes" },
];

export const bebeCategories: { id: BebeCategory; label: BebeText; ages: BebeText; image: number }[] = [
  { id: "baby", label: l("Bé sơ sinh", "Baby"), ages: l("0–24 tháng", "0–24 months"), image: 0 },
  { id: "girl", label: l("Bé gái", "Girls"), ages: l("2–8 tuổi", "2–8 years"), image: 4 },
  { id: "boy", label: l("Bé trai", "Boys"), ages: l("2–8 tuổi", "2–8 years"), image: 8 },
  { id: "accessories", label: l("Phụ kiện nhỏ xinh", "Little extras"), ages: l("Hoàn thiện bộ đồ", "The finishing touches"), image: 12 },
];

export const bebeCollections: { id: Exclude<BebeCollection, "all">; name: BebeText; description: BebeText; images: number[]; color: string; eyebrow: string }[] = [
  { id: "sunny", name: l("Ngày nắng rong chơi", "Little sunny days"), description: l("Cho những bước chân không biết mỏi.", "For feet that never stop exploring."), images: [4, 12], color: "peach", eyebrow: "LET'S PLAY OUTSIDE" },
  { id: "school", name: l("Bé vui đến lớp", "Off to little school"), description: l("Thoải mái học, vui hết mình chơi.", "Ready to learn, made to play."), images: [8, 13], color: "sage", eyebrow: "BACK TO LITTLE SCHOOL" },
  { id: "dream", name: l("Chúc bé ngủ ngon", "Sweet little dreams"), description: l("Ôm trọn những giấc mơ mềm mại.", "A little softness at the end of the day."), images: [7, 3], color: "lilac", eyebrow: "SLEEPY TIME STORIES" },
  { id: "welcome", name: l("Chào con đến nhà", "Hello, little one"), description: l("Những món đầu tiên, thật nhiều yêu thương.", "First favourites, wrapped in love."), images: [1, 14], color: "butter", eyebrow: "A BEAUTIFUL BEGINNING" },
];

export const bebeSizeRows = {
  baby: [["0–3M", "50–62 cm"], ["3–6M", "62–68 cm"], ["6–12M", "68–80 cm"], ["12–24M", "80–92 cm"]],
  clothes: [["2Y", "86–92 cm"], ["3–4Y", "98–104 cm"], ["5–6Y", "110–116 cm"], ["7–8Y", "122–128 cm"]],
  shoes: [["EU 24", "14.5 cm"], ["EU 26", "15.8 cm"], ["EU 28", "17.1 cm"], ["EU 30", "18.4 cm"]],
};
