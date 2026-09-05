"use client";

import { useState } from "react";
import { DemoDialog } from "./demo-dialog";

type RecordItem = { name: string; owner: string; value: string; status: string };

export function WorkspaceReports({ rows, shop, crm }: { rows: RecordItem[]; shop: boolean; crm: boolean }) {
  const [owner, setOwner] = useState("all");
  const records = rows.filter(row => owner === "all" || row.owner === owner);
  const statuses = [...new Set(rows.map(row => row.status))];
  const total = records.reduce((sum, row) => sum + (Number(row.value.replace(/\D/g, "")) || 0), 0);
  const complete = records.filter(row => row.status === "Hoàn thành" || row.status === "Thành công").length;
  const download = () => {
    const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const csv = "\uFEFF" + [["Tên", shop ? "Kênh bán" : "Phụ trách", crm || shop ? "Giá trị" : "Hạn", "Trạng thái"], ...records.map(row => [row.name, row.owner, row.value, row.status])].map(row => row.map(escape).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a"); link.href = url; link.download = "bao-cao-demo.csv"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <><article className="workspace-panel"><div className="workspace-toolbar"><h2>{crm ? "Phân tích pipeline" : shop ? "Báo cáo xử lý đơn hàng" : "Báo cáo tiến độ công việc"}</h2><select aria-label={shop ? "Lọc kênh bán" : "Lọc người phụ trách"} value={owner} onChange={e => setOwner(e.target.value)}><option value="all">{shop ? "Tất cả kênh bán" : "Tất cả người phụ trách"}</option>{[...new Set(rows.map(row => row.owner))].map(name => <option key={name}>{name}</option>)}</select><button className="workspace-primary" onClick={download}>Xuất CSV ↓</button></div><p>Báo cáo tính từ dữ liệu đang có trong phiên xem thử.</p><div className="report-summary"><div><span>Tổng bản ghi</span><strong>{records.length}</strong></div><div><span>{crm || shop ? "Tổng giá trị" : "Đã hoàn thành"}</span><strong>{crm || shop ? `${new Intl.NumberFormat("vi-VN").format(total)}đ` : complete}</strong></div><div><span>Tỷ lệ hoàn tất</span><strong>{records.length ? Math.round(complete / records.length * 100) : 0}%</strong></div></div><div className="report-breakdown">{statuses.map(status => { const count = records.filter(row => row.status === status).length; return <div key={status}><span>{status}</span><progress value={count} max={Math.max(records.length, 1)} /><b>{count}</b></div>; })}</div></article><article className="workspace-panel"><h2>{shop ? "Đối soát theo kênh" : "Phân bổ theo người phụ trách"}</h2><div className="workspace-table-wrap"><table><thead><tr><th>{shop ? "Kênh" : "Người phụ trách"}</th><th>Tổng</th><th>Đã hoàn tất</th><th>Cần theo dõi</th></tr></thead><tbody>{[...new Set(records.map(row => row.owner))].map(name => { const group = records.filter(row => row.owner === name); const done = group.filter(row => row.status === "Hoàn thành" || row.status === "Thành công").length; return <tr key={name}><td>{name}</td><td>{group.length}</td><td>{done}</td><td>{group.length - done}</td></tr>; })}</tbody></table></div></article></>;
}

export function WorkspaceDocuments({ shop, crm }: { shop: boolean; crm: boolean }) {
  const documents = shop ? [
    { title: "Phiếu nhập kho NK028", type: "Nhập hàng", date: "07/09/2026", owner: "Kho trung tâm", items: ["Áo thun Essential · 60 sản phẩm", "Túi Canvas · 40 sản phẩm", "Mũ Everyday · 20 sản phẩm"], note: "Kiểm đếm số lượng, đối chiếu phiếu giao và ghi nhận chất lượng trước khi nhập kho." },
    { title: "Phiếu đóng gói DH1048", type: "Xuất hàng", date: "07/09/2026", owner: "Nguyễn Hoàng", items: ["Xác nhận địa chỉ giao hàng", "Đối chiếu sản phẩm với đơn", "In nhãn vận chuyển và niêm phong"], note: "Bàn giao đơn cho đối tác vận chuyển lúc 15:00. Đây là chứng từ minh họa." },
  ] : crm ? [
    { title: "Đề xuất giải pháp / Nova Retail", type: "Báo giá", date: "05/09/2026", owner: "Minh Anh", items: ["Khảo sát quy trình bán hàng", "Thiết lập CRM và chuyển dữ liệu", "Đào tạo đội ngũ trong 2 buổi"], note: "Giá trị cơ hội 85.000.000đ. Chờ khách hàng phản hồi phạm vi để hoàn thiện báo giá." },
    { title: "Biên bản trao đổi / Sun Hospitality", type: "Ghi chú khách hàng", date: "04/09/2026", owner: "Quang Huy", items: ["Khách cần tích hợp nguồn lead từ website", "Báo cáo theo chi nhánh và nhân viên", "Buổi trao đổi tiếp theo ngày 10/09"], note: "Theo dõi người quyết định, phạm vi tích hợp và thời điểm triển khai." },
  ] : [
    { title: "Design system / Bản bàn giao", type: "Thiết kế", date: "05/09/2026", owner: "Minh Anh", items: ["Color & typography tokens", "Button, input và form states", "Components cho desktop và mobile"], note: "Checklist để đội lập trình đối chiếu khi triển khai giao diện." },
    { title: "Sprint 37 / Tiêu chí nghiệm thu", type: "Tài liệu dự án", date: "06/09/2026", owner: "Quang Huy", items: ["Checkout hiển thị đúng trên mobile", "Form có kiểm tra dữ liệu đầu vào", "Không có lỗi ở console khi thao tác"], note: "Hoàn tất checklist trước buổi review và ghi lại các hạng mục cần theo dõi." },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  return <article className="workspace-panel"><h2>{shop ? "Chứng từ vận hành" : crm ? "Báo giá & lịch sử trao đổi" : "Tài liệu & bàn giao"}</h2><div className="workspace-document-grid">{documents.map((document, index) => <button key={document.title} onClick={() => setSelected(index)}><span>{document.type}</span><h3>{document.title}</h3><p>{document.owner} · {document.date}</p><b>Mở hồ sơ ↗</b></button>)}</div>{selected !== null && <DemoDialog title={documents[selected].title} onClose={() => setSelected(null)}><div className="document-detail"><span>{documents[selected].type} / {documents[selected].date}</span><p>{documents[selected].note}</p><h3>{shop ? "Nội dung xử lý" : "Phạm vi & ghi chú"}</h3><ul>{documents[selected].items.map(item => <li key={item}>{item}</li>)}</ul><p>Phụ trách: <strong>{documents[selected].owner}</strong></p></div></DemoDialog>}</article>;
}

export function WorkspaceSettings({ name, shop, crm }: { name: string; shop: boolean; crm: boolean }) {
  const [saved, setSaved] = useState(false);
  return <article className="workspace-panel"><h2>Thiết lập không gian làm việc</h2><form className="workspace-settings" onChange={() => setSaved(false)} onSubmit={e => { e.preventDefault(); setSaved(true); }}><label>{shop ? "Tên cửa hàng" : "Tên tổ chức"}<input defaultValue={name} required /></label><label>Email nhận thông báo<input type="email" defaultValue="team@example.com" required /></label><label>Múi giờ<select defaultValue="vn"><option value="vn">Việt Nam · UTC+7</option><option value="jp">Nhật Bản · UTC+9</option></select></label><label>Ngôn ngữ<select defaultValue="vi"><option value="vi">Tiếng Việt</option><option value="en">English</option></select></label><fieldset><legend>Thông báo</legend><label><input type="checkbox" defaultChecked />{shop ? "Sản phẩm sắp hết hàng" : crm ? "Cơ hội cần theo dõi" : "Công việc sắp đến hạn"}</label><label><input type="checkbox" defaultChecked />Bản tổng kết mỗi tuần</label><label><input type="checkbox" />Thông báo thay đổi từ thành viên</label></fieldset><div className="settings-permissions"><h3>Vai trò & quyền truy cập</h3><p><b>Quản trị viên</b> · Quản lý thành viên và thiết lập</p><p><b>{shop ? "Nhân viên bán hàng" : crm ? "Nhân viên kinh doanh" : "Thành viên"}</b> · Xử lý dữ liệu được phân công</p><p><b>Người xem</b> · Xem báo cáo và tài liệu</p></div><button className="workspace-primary" type="submit">Lưu thiết lập thử</button>{saved && <p className="workspace-notice" role="status">Đã ghi nhận thiết lập trong biểu mẫu. Bản demo chưa áp dụng thay đổi ngôn ngữ, gửi thông báo hoặc lưu lâu dài.</p>}</form></article>;
}
