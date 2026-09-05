"use client";

import { useState } from "react";
import { BarChart3, CalendarDays, CheckCircle2, Users } from "lucide-react";
import type { TemplateItem } from "@/lib/templates";

type Row = { name: string; owner: string; value: string; status: string };

export function ManagementWorkspace({ template }: { template: TemplateItem }) {
  const crm = template.slug.includes("orbit");
  const shop = template.slug.includes("minto");
  const [view, setView] = useState("overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState("");
  const [rows, setRows] = useState<Row[]>(crm ? [
    { name: "Nova Retail", owner: "Minh Anh", value: "85.000.000đ", status: "Đang trao đổi" },
    { name: "Mộc Studio", owner: "Thảo Vy", value: "42.000.000đ", status: "Đã gửi đề xuất" },
    { name: "Sun Hospitality", owner: "Quang Huy", value: "120.000.000đ", status: "Đàm phán" },
    { name: "Alpha Tech", owner: "Minh Anh", value: "64.000.000đ", status: "Thành công" },
  ] : shop ? [
    { name: "#DH1048 · Nguyễn Hoàng", owner: "Website", value: "1.280.000đ", status: "Chờ xác nhận" },
    { name: "#DH1047 · Lê Thanh Hà", owner: "Shopee", value: "890.000đ", status: "Đang đóng gói" },
    { name: "#DH1046 · Trần Gia Bảo", owner: "Cửa hàng", value: "2.450.000đ", status: "Đang giao" },
    { name: "#DH1045 · Phạm Minh Tâm", owner: "Website", value: "650.000đ", status: "Hoàn thành" },
  ] : [
    { name: "Hoàn thiện giao diện checkout", owner: "Minh Anh", value: "08/09/2026", status: "Cần làm" },
    { name: "Kiểm thử responsive", owner: "Quang Huy", value: "09/09/2026", status: "Đang làm" },
    { name: "Duyệt nội dung trang chủ", owner: "Thảo Vy", value: "10/09/2026", status: "Chờ duyệt" },
    { name: "Bàn giao design system", owner: "Minh Anh", value: "12/09/2026", status: "Hoàn thành" },
  ]);
  const stages = crm ? ["Đang trao đổi", "Đã gửi đề xuất", "Đàm phán", "Thành công"] : shop ? ["Chờ xác nhận", "Đang đóng gói", "Đang giao", "Hoàn thành"] : ["Cần làm", "Đang làm", "Chờ duyệt", "Hoàn thành"];
  const tabs = [{ id: "overview", label: "Tổng quan", icon: BarChart3 }, { id: "work", label: crm ? "Sales pipeline" : shop ? "Đơn hàng" : "Bảng công việc", icon: CheckCircle2 }, { id: "resources", label: crm ? "Khách hàng" : shop ? "Kho hàng" : "Thành viên", icon: Users }, { id: "calendar", label: crm ? "Lịch chăm sóc" : shop ? "Lịch vận hành" : "Lịch dự án", icon: CalendarDays }];
  const visible = rows.filter(row => `${row.name} ${row.owner}`.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")) && (filter === "all" || row.status === filter));
  const metrics = crm ? [["Doanh số tháng", "311 triệu", "4 cơ hội trong pipeline"], ["Khách hàng mới", "28", "+8 khách so với tháng trước"], ["Tỷ lệ chốt", "32%", "+4 điểm phần trăm"]] : shop ? [["Doanh thu hôm nay", "18,6 triệu", "32 đơn đã thanh toán"], ["Đơn cần xử lý", "12", "4 đơn ưu tiên giao hôm nay"], ["Sản phẩm sắp hết", "3", "Cần bổ sung tồn kho"]] : [["Công việc hoàn thành", "24 / 36", "67% khối lượng dự án"], ["Sắp đến hạn", "5", "Trong 7 ngày tới"], ["Thành viên", "8", "3 nhóm đang cộng tác"]];
  return <div className="dashboard-shell workspace">
    <aside className="dashboard-sidebar"><div className="dashboard-logo">{template.name}<i>.</i></div><nav aria-label="Điều hướng quản lý">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? "active" : ""} aria-current={view === id ? "page" : undefined} onClick={() => setView(id)}><Icon size={17} />{label}</button>)}</nav><div className="workspace-user"><b>MA</b><span>Minh Anh<small>Quản trị viên</small></span></div></aside>
    <section className="dashboard-main">
      <header><div><small>KHÔNG GIAN LÀM VIỆC / {template.name.toUpperCase()}</small><h1>{tabs.find(tab => tab.id === view)?.label}</h1></div><button className="workspace-primary" onClick={() => setCreating(!creating)}>{creating ? "Đóng biểu mẫu" : `+ ${crm ? "Thêm cơ hội" : shop ? "Tạo đơn hàng" : "Thêm công việc"}`}</button></header>
      <p className="demo-note">Dữ liệu minh họa · Bạn có thể tìm kiếm, thêm và đổi trạng thái trong phiên xem thử.</p>
      {creating && <form className="workspace-create" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); setRows([...rows, { name: String(data.get("name")).trim(), owner: String(data.get("owner")).trim(), value: String(data.get("value")), status: stages[0] }]); setCreating(false); setView("work"); setQuery(""); setFilter("all"); setNotice("Đã thêm vào dữ liệu xem thử. Thay đổi sẽ mất khi tải lại trang."); }}>
        <label>{crm ? "Tên cơ hội" : shop ? "Mã đơn & khách hàng" : "Tên công việc"}<input name="name" required pattern=".*\S.*" /></label><label>{shop ? "Kênh bán" : "Phụ trách"}<input name="owner" required pattern=".*\S.*" /></label><label>{crm || shop ? "Giá trị (VNĐ)" : "Hạn hoàn thành"}<input name="value" type={crm || shop ? "number" : "date"} min={crm || shop ? "0" : undefined} required /></label><button type="submit" className="workspace-primary">Lưu bản mẫu</button>
      </form>}
      {notice && <p role="status" className="workspace-notice">{notice}</p>}
      {view === "overview" && <><div className="metric-grid">{metrics.map(([title, number, note]) => <article key={title}><span>{title}</span><strong>{number}</strong><small>{note}</small></article>)}</div><div className="workspace-overview"><article className="workspace-panel"><h2>{crm ? "Doanh số 6 tháng" : shop ? "Doanh thu 6 tháng" : "Công việc hoàn thành theo tháng"}</h2><p>{crm || shop ? "Đơn vị: triệu đồng" : "Đơn vị: công việc"}</p><div className="workspace-chart">{[24, 38, 32, 52, 45, 64].map((value, i) => <div key={i}><b>{value}</b><i style={{ height: value * 2 }} /><span>T{i + 1}</span></div>)}</div></article><article className="workspace-panel"><h2>{crm ? "Mục tiêu bán hàng" : shop ? "Cơ cấu kênh bán" : "Tiến độ dự án"}</h2>{(crm ? [["Minh Anh", 82], ["Quang Huy", 64], ["Thảo Vy", 75]] : shop ? [["Website", 48], ["Shopee", 32], ["Cửa hàng", 20]] : [["Website thương hiệu", 75], ["Ứng dụng khách hàng", 48], ["Design system", 90]]).map(([label, amount]) => <div className="workspace-progress" key={label}><span>{label}<b>{amount}%</b></span><progress value={Number(amount)} max={100}>{amount}%</progress></div>)}</article></div></>}
      {(view === "overview" || view === "work") && <article className="workspace-panel"><div className="workspace-toolbar"><h2>{crm ? "Cơ hội kinh doanh" : shop ? "Đơn hàng đa kênh" : "Công việc của nhóm"} <small>({visible.length})</small></h2><input aria-label="Tìm kiếm" placeholder="Tìm tên, người phụ trách…" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="Lọc trạng thái" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Tất cả trạng thái</option>{stages.map(stage => <option key={stage}>{stage}</option>)}</select></div>
        {view === "work" && !shop ? <div className="workspace-board">{stages.map(stage => <section key={stage}><h3>{stage} <span>{visible.filter(r => r.status === stage).length}</span></h3>{visible.filter(r => r.status === stage).map(row => <article key={rows.indexOf(row)}><h4>{row.name}</h4><p>{row.value}</p><small>{row.owner}</small><select aria-label={`Trạng thái ${row.name}`} value={row.status} onChange={e => setRows(rows.map(r => r === row ? { ...r, status: e.target.value } : r))}>{stages.map(s => <option key={s}>{s}</option>)}</select></article>)}</section>)}</div> : <div className="workspace-table-wrap"><table><thead><tr><th>{crm ? "Cơ hội" : shop ? "Đơn hàng" : "Công việc"}</th><th>{shop ? "Kênh bán" : "Phụ trách"}</th><th>{crm || shop ? "Giá trị" : "Hạn hoàn thành"}</th><th>Trạng thái</th></tr></thead><tbody>{visible.map((row) => <tr key={rows.indexOf(row)}><td>{row.name}</td><td>{row.owner}</td><td>{row.value}</td><td><select aria-label={`Trạng thái ${row.name}`} value={row.status} onChange={e => setRows(rows.map(r => r === row ? { ...r, status: e.target.value } : r))}>{stages.map(s => <option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div>}
        {visible.length === 0 && <p className="workspace-empty">Không tìm thấy kết quả phù hợp. Thử đổi từ khóa hoặc bộ lọc.</p>}
      </article>}
      {view === "resources" && <ResourcePanel crm={crm} shop={shop} />}
      {(view === "calendar" || view === "overview") && <article className="workspace-panel"><h2>{crm ? "Lịch hẹn & chăm sóc" : shop ? "Lịch giao hàng & nhập kho" : "Mốc bàn giao sắp tới"}</h2><div className="workspace-agenda">{(crm ? [["07/09", "09:00", "Demo giải pháp cho Nova Retail", "Minh Anh · Google Meet"], ["08/09", "14:30", "Theo dõi đề xuất Mộc Studio", "Thảo Vy · Gọi điện"], ["10/09", "10:00", "Trao đổi hợp đồng Sun Hospitality", "Quang Huy · Văn phòng"]] : shop ? [["07/09", "08:00", "Nhập 120 sản phẩm bộ sưu tập mới", "Kho trung tâm · Phiếu NK028"], ["07/09", "15:00", "Bàn giao 8 đơn cho đơn vị vận chuyển", "Website & Shopee"], ["08/09", "09:00", "Kiểm kê nhóm sản phẩm sắp hết", "Kho trung tâm · 3 SKU"]] : [["07/09", "09:00", "Sprint planning · Tuần 37", "Toàn nhóm · 45 phút"], ["09/09", "14:00", "Review giao diện checkout", "Thiết kế & lập trình"], ["12/09", "16:00", "Bàn giao design system", "Minh Anh · Milestone 03"]]).map(([date, time, title, note]) => <div key={title}><b>{date}<small>{time}</small></b><span><strong>{title}</strong><small>{note}</small></span></div>)}</div></article>}
    </section>
  </div>;
}

function ResourcePanel({ crm, shop }: { crm: boolean; shop: boolean }) {
  const [query, setQuery] = useState("");
  const headers = crm ? ["Khách hàng", "Liên hệ", "Phân nhóm", "Lần liên hệ cuối"] : shop ? ["Sản phẩm / SKU", "Tồn kho", "Giá bán", "Tình trạng"] : ["Thành viên", "Vai trò", "Công việc", "Khối lượng"];
  const data = crm ? [["Nova Retail", "hello@nova.example", "Bán lẻ · Tiềm năng", "05/09/2026"], ["Mộc Studio", "team@moc.example", "Thiết kế · Đang tư vấn", "04/09/2026"], ["Sun Hospitality", "sales@sun.example", "Khách sạn · VIP", "03/09/2026"]] : shop ? [["Áo thun Essential / AT001", "8", "290.000đ", "Sắp hết"], ["Túi Canvas / TC002", "42", "185.000đ", "Còn hàng"], ["Mũ Everyday / ME003", "4", "220.000đ", "Sắp hết"], ["Áo Linen / AL004", "0", "490.000đ", "Hết hàng"]] : [["Minh Anh", "Product Designer", "8 công việc", "80%"], ["Quang Huy", "Frontend Developer", "6 công việc", "60%"], ["Thảo Vy", "Content Designer", "4 công việc", "40%"]];
  const visible = data.filter(row => row.join(" ").toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")));
  return <article className="workspace-panel"><div className="workspace-toolbar"><h2>{crm ? "Danh bạ khách hàng" : shop ? "Kiểm soát tồn kho" : "Nguồn lực của nhóm"}</h2><input aria-label="Tìm trong danh sách" placeholder="Tìm kiếm…" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="workspace-table-wrap"><table><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{visible.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>{!visible.length && <p className="workspace-empty">Không tìm thấy kết quả phù hợp.</p>}</article>;
}
