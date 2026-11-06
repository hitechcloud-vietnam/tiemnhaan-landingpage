# Tiệm Nhà An — Landing Page

Website giới thiệu nhiều trang cho **Tiệm Nhà An**: trà sữa, ô long rang củi, bánh ngọt và đồ chay ăn sáng/trưa.
Chi nhánh **TP. Hồ Chí Minh** và **Đà Nẵng**: *Coming Soon*.

## Website

Website chính thức của **Tiệm Nhà An**, có 5 ngôn ngữ: tiếng Việt (`/`), English (`/en`), 日本語 (`/ja`), 한국어 (`/ko`) và 中文 (`/zh`).

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ: banner, 4 khu làm việc, 4 điều làm nên Nhà An, món ký tên, góc check-in, một ngày ở Nhà An, Club, workshop, đặt tiệc, chi nhánh, tuyển dụng, đăng ký nhận tin, FAQ |
| `/khong-gian` | Không gian làm việc và học tập, 4 khu: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline, Sân Rôm Rả. Có tiện ích, quy tắc và form đặt chỗ |
| `/trai-nghiem` | Workshop, đặt tiệc và quà tặng, Nhà An Club |
| `/chi-nhanh` | 4 chi nhánh (Coming Soon): Sài Gòn 1, Sài Gòn 2, Đà Nẵng, Hội An |
| `/sai-gon`, `/da-nang-quang-nam` | Trang vùng miền với món đặc trưng, hình ảnh và chi nhánh |
| `/tuyen-dung` | Lương, phúc lợi, vị trí và form ứng tuyển |
| `/tin-tuc`, `/tin-tuc/<bài>` | Tin tức |
| `/ve-chung-toi`, `/hoi-dap`, `/lien-he` | Câu chuyện, hỏi đáp, liên hệ |
| `/chinh-sach-bao-mat`, `/dieu-khoan`, `/tin-dung-anh` | Pháp lý và nguồn ảnh |

Liên hệ: hotline/Zalo **0865 920 041**, email **contact@tiemnhaan.com**.

## Cấu trúc

```
src/data/site.mjs      ← thông tin tiệm, liên hệ, vùng miền, 4 chi nhánh, giờ mở cửa
src/data/content.mjs   ← 4 không gian, tiện ích, tin tức, hỏi đáp
src/data/photos.json   ← ảnh, kích thước, nguồn và giấy phép
src/layout.mjs         ← head, header + mega menu, menu di động, tab bar, footer
src/pages*.mjs         ← nội dung từng trang (viết bằng tiếng Việt)
src/i18n/<lang>.json   ← bản dịch: khóa là câu tiếng Việt, giá trị là bản dịch
scripts/build.mjs      ← sinh HTML tĩnh 5 ngôn ngữ vào public/
api/contact.js         ← Vercel Function nhận form và gửi email
public/                ← site tĩnh hoàn chỉnh
```

## Thêm hoặc sửa nội dung, bản dịch

1. Sửa nội dung tiếng Việt trong `src/`.
2. Chạy `npm run i18n` để xuất danh sách câu cần dịch. File `src/i18n/missing-<lang>.json` liệt kê các câu còn thiếu.
3. Thêm bản dịch vào `src/i18n/<lang>.json`, rồi chạy `npm run build`. Câu nào chưa dịch sẽ tạm hiển thị tiếng Việt và được báo khi build.

## Form và email

Mọi form (đăng ký nhận tin, liên hệ, đặt chỗ, ứng tuyển) gửi tới `/api/contact`. Để nhận email thật, vào **Vercel → Settings → Environment Variables** và thêm:

- `RESEND_API_KEY`: tạo tài khoản và key tại resend.com, rồi xác minh tên miền `tiemnhaan.com` trên Resend.
- `CONTACT_TO` (tùy chọn): mặc định là `contact@tiemnhaan.com`.
- `CONTACT_FROM` (tùy chọn): mặc định là `Website Tiệm Nhà An <noreply@tiemnhaan.com>`.

Khi chưa cấu hình, form tự mở ứng dụng email của khách với nội dung soạn sẵn.

## Thống kê

Website đã gắn **Vercel Web Analytics** và **Speed Insights**. Bật hai mục này trong tab Analytics và Speed Insights của project trên Vercel, rồi deploy lại.

## Chạy và build

Không cần cài thư viện, chỉ cần Node 18 trở lên.

```bash
npm run build   # sinh lại public/ (5 ngôn ngữ), sitemap.xml, robots.txt
npm run i18n    # xuất danh sách câu cần dịch
npm run dev     # build và chạy thử tại http://localhost:3000
```

## Deploy lên Vercel

1. Vào vercel.com, chọn **Add New → Project** rồi import repo GitHub này.
2. Giữ nguyên cài đặt. `vercel.json` đã khai báo build `npm run build`, output `public` và URL gọn (`/trai-nghiem`).
3. Bấm **Deploy**.
4. Gắn tên miền `tiemnhaan.com` và trỏ DNS: xem [docs/HUONG-DAN-TEN-MIEN.md](docs/HUONG-DAN-TEN-MIEN.md).

## Cần cập nhật trước khi chạy chính thức

- `src/data/site.mjs`: thêm link Facebook/Instagram/TikTok (để trống thì website tự ẩn) và địa chỉ chi nhánh khi có.
- `formEndpoint`: dán URL nhận form (ví dụ Formspree hoặc Google Apps Script) để thật sự nhận đăng ký và lời nhắn. Khi để trống, form mở ứng dụng email của khách với nội dung soạn sẵn gửi tới contact@tiemnhaan.com.
- **Ảnh** hiện là ảnh minh họa từ Unsplash và Rawpixel (CC0), được phép dùng thương mại (xem `/tin-dung-anh`). Thay bằng ảnh thật bằng cách ghi đè file cùng tên trong `public/assets/img/photos/`.
- Nội dung marketing (nguồn trà, quy trình, Nhà An Club, workshop, tuyển dụng) là bản nháp, nên rà lại cho đúng với thực tế của tiệm.
