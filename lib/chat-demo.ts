export type ChatMessage = {
  id: string;
  sender: "user" | "admin";
  text: string;
};

export const chatSuggestions = ["Mình muốn làm website", "Tư vấn chi phí", "Chọn giao diện"];

// Replace this demo responder with the chat service when the backend is ready.
export function getDemoReply(message: string): string {
  const text = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  if (/cam on|thank/.test(text)) return "Cảm ơn bạn đã nhắn DevDes nhé! Bạn cứ chia sẻ thêm nếu có ý tưởng hoặc câu hỏi khác nha.";
  if (/gia|chi phi|bao nhieu|ngan sach/.test(text)) return "Chi phí sẽ tùy vào số trang và tính năng bạn cần. Bạn đang muốn làm landing page, website bán hàng hay phần mềm quản lý? Chia sẻ thêm để mình gợi ý hướng phù hợp nhé.";
  if (/giao dien|mau|portfolio/.test(text)) return "Bạn có thể xem các mẫu trong Kho giao diện của DevDes. Bạn thích phong cách tối giản, sang trọng hay nhiều màu sắc? Gửi mình tên mẫu bạn thích nhé!";
  if (/bao lau|thoi gian|tien do|kip/.test(text)) return "Thời gian thực hiện sẽ tùy vào phạm vi dự án và nội dung đã có. Bạn muốn website sẵn sàng vào thời điểm nào, và đã chuẩn bị logo, hình ảnh chưa?";
  if (/ban hang|san pham|cua hang/.test(text)) return "Với website bán hàng, mình có thể gợi ý phần danh mục sản phẩm, giỏ hàng và đặt hàng. Bạn kinh doanh mặt hàng gì, có cần thanh toán online không?";
  if (/khach san|phong|homestay/.test(text)) return "DevDes có các mẫu dành cho khách sạn và homestay trong kho. Bạn muốn giới thiệu phòng hay cần thêm chức năng đặt phòng trực tiếp?";
  if (/website|landing|trang web/.test(text)) return "Được nha! Bạn muốn làm website cho lĩnh vực nào? Cho mình biết mục đích chính và phong cách bạn thích, mình sẽ gợi ý hướng thiết kế phù hợp.";
  if (/xin chao|hello|^chao|^hi\b/.test(text)) return "Chào bạn! Mình là admin DevDes trong bản chat mẫu. Bạn đang cần tư vấn website mới hay muốn chỉnh sửa một website đang có?";
  return "Mình hiểu rồi! Bạn chia sẻ thêm mục đích sử dụng, các tính năng cần có hoặc một website tham khảo nhé. Mình sẽ cùng bạn hình dung rõ hơn về dự án.";
}
