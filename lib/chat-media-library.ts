import catalog from "@/lib/noto-emoji-catalog.json";

export const mediaCategories = [
  ["all", "Tất cả"],
  ["Smileys and emotions", "Cảm xúc"],
  ["People", "Cử chỉ"],
  ["Animals and nature", "Động vật"],
  ["Food and drink", "Đồ ăn"],
  ["Travel and places", "Du lịch"],
  ["Activities and events", "Hoạt động"],
  ["Objects", "Đồ vật"],
  ["Symbols", "Biểu tượng"],
  ["Flags", "Cờ"],
] as const;

const vietnameseKeywords: [RegExp, string][] = [
  [/smile|grin|happy|joy|laugh|rofl/, "vui cười haha hihi"],
  [/cry|tear|sad|frown|disappointed/, "buồn khóc nước mắt"],
  [/heart|love|kiss|hug/, "yêu thương tim hôn ôm"],
  [/angry|rage|swear|triumph/, "giận tức bực"],
  [/surprise|astonish|scream|open-mouth|explod|wow/, "ngạc nhiên bất ngờ sốc"],
  [/party|confetti|balloon|celebrat|firework|tada/, "tiệc chúc mừng sinh nhật"],
  [/wave|hello/, "chào tạm biệt vẫy tay"],
  [/thumbs-up|clap|raised-hands|ok-hand|100|check/, "thích hay tuyệt đồng ý vỗ tay"],
  [/pray|folded-hands|bow/, "cảm ơn xin lỗi cầu nguyện"],
  [/sleep|zzz|yawn/, "ngủ buồn ngủ"],
  [/think|monocle|raised-eyebrow/, "suy nghĩ nghi ngờ"],
  [/cat/, "mèo"], [/dog|puppy/, "chó cún"], [/rabbit|bunny/, "thỏ"],
  [/bear/, "gấu"], [/panda/, "gấu trúc"], [/monkey/, "khỉ"],
  [/bird|chick|chicken/, "chim gà"], [/duck/, "vịt"], [/pig/, "heo lợn"],
  [/fish/, "cá"], [/butterfly/, "bướm"], [/bee/, "ong"],
  [/flower|rose|blossom|tulip/, "hoa"], [/tree|leaf|plant/, "cây lá"],
  [/fire|flame/, "lửa cháy hot"], [/star|sparkle/, "sao lấp lánh"],
  [/sun|rainbow|cloud|rain|snow/, "thời tiết trời nắng mưa cầu vồng"],
  [/coffee|tea|hot-beverage/, "cà phê trà"], [/cake/, "bánh sinh nhật"],
  [/food|pizza|burger|rice|noodle/, "đồ ăn đói cơm"],
  [/gift|present/, "quà tặng"], [/rocket/, "tên lửa"], [/car|bus|bike/, "xe"],
  [/ball|sport|trophy|medal/, "thể thao bóng chiến thắng"],
  [/music|note|guitar|headphone/, "âm nhạc hát"],
  [/computer|laptop|keyboard/, "máy tính làm việc"], [/money|dollar|cash/, "tiền"],
];

export function normalizeMediaSearch(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

type MediaCatalogItem = { codepoint: string; emoji: string; label: string; category: string; search: string; gifUrl?: string };

export const animatedEmoji: MediaCatalogItem[] = catalog.map((item) => {
  const keywords = vietnameseKeywords.filter(([pattern]) => pattern.test(item.label.replace(/ /g, "-"))).map(([, words]) => words).join(" ");
  const categoryLabel = mediaCategories.find(([id]) => id === item.category)?.[1] || "";
  return { ...item, search: normalizeMediaSearch(`${item.label} ${item.emoji} ${keywords} ${categoryLabel}`) };
});

export const reactionGifs: MediaCatalogItem[] = [
  ["3o7btPCcdNniyf0ArS", "Vui quá", "vui cười happy", "😄"],
  ["l0MYt5jPR6QX5pnqM", "Ăn mừng", "tiệc chúc mừng party", "🎉"],
  ["26gsjCZpPolPr3sBy", "Cảm ơn", "cảm ơn thank you", "🙌"],
  ["111ebonMs90YLu", "Tuyệt vời", "đồng ý thích good yes", "👍"],
  ["xT9IgG50Fb7Mi0prBC", "Xin chào", "chào tạm biệt hello wave", "👋"],
  ["MDJ9IbxxvDUQM", "Mèo dễ thương", "mèo yêu ôm cat cute", "🐱"],
  ["JIX9t2j0ZTN9S", "Mèo làm việc", "mèo máy tính cat work", "🐱"],
  ["mlvseq9yvZhba", "Ánh nhìn của mèo", "mèo nhìn cat", "🐱"],
  ["13CoXDiaCcCoyk", "Mèo tinh nghịch", "mèo vui cat", "🐱"],
].map(([id, label, keywords, emoji]) => ({ codepoint: id, label, emoji, category: emoji === "🐱" ? "Animals and nature" : "Smileys and emotions", search: normalizeMediaSearch(`${label} ${keywords} ${emoji}`), gifUrl: `https://media.giphy.com/media/${id}/giphy.gif` }));

export function emojiMediaUrl(codepoint: string, format: "gif" | "webp") {
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${codepoint}/512.${format}`;
}
