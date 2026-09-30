"use client";

import { ArrowUpRight } from "lucide-react";
import { useLocale } from "./locale-provider";

export function FoodVisitDetails({ coffee = false }: { coffee?: boolean }) {
  const { locale } = useLocale();
  const en = locale === "en";
  const questions = en ? [
    ["Can I visit without a reservation?", "Walk-ins are welcome. For a group or a preferred time, leave a reservation request so the team can arrange a suitable table."],
    ["Are there vegetarian options?", "Please share dietary preferences and allergies in your booking note. The team can help you choose suitable dishes or drinks."],
    [coffee ? "Can I bring my laptop?" : "Can I book for a special occasion?", coffee ? "Choose a quiet corner and check with the team about power outlets and busy periods when planning a longer visit." : "Tell us your group size, occasion, and any setup requests. Availability and additional costs should be confirmed in advance."],
  ] : [
    ["Mình có cần đặt bàn trước không?", "Bạn có thể ghé trực tiếp. Nếu đi theo nhóm hoặc muốn chọn giờ cụ thể, hãy để lại lời hẹn để quán sắp xếp bàn phù hợp."],
    ["Quán có lựa chọn cho người ăn chay không?", "Hãy ghi chú chế độ ăn và các thành phần dị ứng khi đặt bàn. Đội ngũ sẽ tư vấn món ăn, thức uống phù hợp với nhu cầu của bạn."],
    [coffee ? "Mình có thể mang laptop đến không?" : "Có thể đặt bàn cho dịp đặc biệt không?", coffee ? "Bạn có thể chọn một góc yên tĩnh. Hỏi thêm về vị trí ổ cắm và khung giờ đông khách nếu dự định ngồi lâu." : "Cho quán biết số người, dịp kỷ niệm và nhu cầu trang trí. Tình trạng bàn cùng chi phí phát sinh cần được xác nhận trước."],
  ];
  return <section className="food-visit-details" id="food-faq"><div><span>{en ? "BEFORE YOUR VISIT" : "TRƯỚC KHI GHÉ QUÁN"}</span><h2>{en ? "A few little things to know." : "Một vài điều nhỏ, để buổi hẹn trọn vẹn."}</h2><a href="#food-booking">{en ? "Save your favourite spot" : "Giữ một chỗ bạn thích"} <ArrowUpRight size={18} /></a></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>;
}
