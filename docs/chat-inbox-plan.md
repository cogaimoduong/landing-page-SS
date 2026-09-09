# Kế hoạch chat hỗ trợ và Inbox quản trị

## Mục tiêu đã chốt

- Khách truy cập landing page **không cần đăng nhập** để nhắn tin qua widget chat.
- Có một trang Inbox riêng cho người quản trị để xem và trả lời hội thoại, dự kiến đường dẫn `/admin/inbox`.
- Inbox là khu vực nội bộ: cần đăng nhập/phân quyền trước khi đưa lên production. Không dùng việc "ẩn đường dẫn" thay cho xác thực.
- Giai đoạn hiện tại giữ widget demo; tin nhắn đang chỉ nằm trong state của trình duyệt và phản hồi từ `lib/chat-demo.ts`.

## Luồng dự kiến

1. Lần đầu mở chat, frontend tạo `visitor_token` ngẫu nhiên và lưu trong cookie/localStorage.
2. Khi khách gửi tin, API công khai tạo (hoặc tìm) `conversation` theo `visitor_token`, rồi lưu `message`.
3. Trang `/admin/inbox` tải danh sách hội thoại, chọn một hội thoại để đọc và gửi trả lời.
4. Mỗi trả lời của admin được lưu thành `message` với `sender_type = admin`; widget khách nhận qua polling trước, sau này có thể thay bằng realtime/WebSocket.
5. Khi khách cung cấp thông tin liên hệ, lưu có chủ đích vào hồ sơ khách; không bắt buộc để bắt đầu chat.

## Cấu trúc cơ sở dữ liệu đề xuất

### `visitors`

| Trường | Gợi ý |
| --- | --- |
| `id` | UUID, khóa chính |
| `anonymous_token` | Chuỗi duy nhất, liên kết cookie của khách |
| `name`, `email`, `phone` | Nullable, chỉ có khi khách tự cung cấp |
| `first_seen_at`, `last_seen_at` | Timestamp |

### `conversations`

| Trường | Gợi ý |
| --- | --- |
| `id` | UUID, khóa chính |
| `visitor_id` | FK `visitors.id` |
| `status` | `open`, `pending`, `closed`, `spam` |
| `assigned_admin_id` | Nullable, FK người quản trị nhận xử lý |
| `last_message_at` | Timestamp, dùng để sắp xếp Inbox |
| `created_at`, `closed_at` | Timestamp |

### `messages`

| Trường | Gợi ý |
| --- | --- |
| `id` | UUID, khóa chính |
| `conversation_id` | FK `conversations.id`, cần index cùng `created_at` |
| `sender_type` | `visitor`, `admin`, `system` |
| `sender_admin_id` | Nullable, FK người quản trị |
| `body` | Nội dung text |
| `created_at`, `read_at` | Timestamp |
| `metadata` | JSON nullable: trang nguồn, UTM, thiết bị, tệp đính kèm sau này |

### `admin_users`

Dùng hệ xác thực (ví dụ Auth.js/Clerk/Supabase Auth) thay vì tự lưu mật khẩu. Bảng hồ sơ chỉ cần `id`, `display_name`, `role`, `created_at`; `id` liên kết định danh từ hệ xác thực.

## API tối thiểu khi triển khai

- `POST /api/chat/conversations` — tạo/khôi phục hội thoại bằng token ẩn danh.
- `GET /api/chat/conversations/:id/messages` — widget khách đọc tin thuộc chính token của mình.
- `POST /api/chat/conversations/:id/messages` — khách gửi tin, giới hạn tốc độ và kiểm tra độ dài.
- `GET /api/admin/conversations` — Inbox, chỉ admin.
- `PATCH /api/admin/conversations/:id` — đổi trạng thái/gán người xử lý, chỉ admin.
- `POST /api/admin/conversations/:id/messages` — admin trả lời, chỉ admin.

Không cho client tự truyền `visitor_id` hoặc đọc hội thoại theo UUID đơn thuần; API phải kiểm tra cookie/token của khách. Cần thêm rate limiting, CAPTCHA/honeypot và log chống spam trước khi mở công khai.

## Phạm vi giao diện Inbox

- Cột trái: tìm kiếm, bộ lọc trạng thái, số tin chưa đọc, danh sách hội thoại và thời gian tin mới nhất.
- Cột giữa: lịch sử tin nhắn, nhãn khách/nguồn truy cập, ô trả lời và thao tác đóng/gán hội thoại.
- Có thể bắt đầu bằng polling 10--20 giây; chỉ thêm realtime khi lượng chat cần thiết.

## Quyết định cần xác nhận trước khi làm backend

- Dịch vụ xác thực và cơ sở dữ liệu muốn dùng.
- Một hay nhiều admin trực Inbox, có cần phân công hay không.
- Có cần gửi thông báo email/Telegram khi có tin mới không.
- Chính sách lưu giữ/xóa hội thoại và thông báo quyền riêng tư cho khách.
