# Tiệm Nhà An — Website chính thức

Website giới thiệu nhiều trang cho **Tiệm Nhà An**: trà sữa, ô long rang củi, bánh ngọt và đồ chay ăn sáng/trưa.
Chi nhánh **TP. Hồ Chí Minh** và **Đà Nẵng**: *Coming Soon*.

## Website

Website chính thức của **Tiệm Nhà An**, có 5 ngôn ngữ: tiếng Việt (`/`), English (`/en`), 日本語 (`/ja`), 한국어 (`/ko`) và 中文 (`/zh`).

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ: banner, 4 khu làm việc, 4 điều làm nên Nhà An, món ký tên, góc check-in, một ngày ở Nhà An, Club, workshop, đặt tiệc, chi nhánh, tuyển dụng, đăng ký nhận tin, FAQ |
| `/dat-ban` | Đặt bàn 24/7: bàn thường, 4 khu làm việc, studio áo dài, tiệc và sự kiện |
| `/khong-gian` | 4 khu làm việc và học tập: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline, Sân Rôm Rả |
| `/chup-anh` | Studio áo dài và 6 góc check-in, gói chụp, đặt lịch |
| `/su-kien` | Lịch lễ Tết và sự kiện cả năm, hoạt động hằng tuần |
| `/trai-nghiem` | Workshop, đặt tiệc và quà tặng, Nhà An Club |
| `/chi-nhanh` | 5 chi nhánh (Coming Soon) |
| `/chi-nhanh/binh-thanh`, `/tan-binh`, `/da-nang`, `/hoi-an`, `/duy-xuyen` | Trang riêng từng chi nhánh: giới thiệu, món riêng, bản đồ, đặt bàn |
| `/sai-gon`, `/da-nang-quang-nam` | Trang vùng miền |
| `/tuyen-dung` | Lương, phúc lợi, vị trí và form ứng tuyển |
| `/hop-tac` | Hợp tác và doanh nghiệp: tiệc trà văn phòng, quà tặng, thuê không gian, đối tác |
| `/tin-tuc`, `/tin-tuc/<bài>` | Tin tức (6 bài) |
| `/ve-chung-toi`, `/hoi-dap`, `/lien-he` | Câu chuyện, hỏi đáp, liên hệ |
| `/chinh-sach-bao-mat`, `/dieu-khoan`, `/tin-dung-anh` | Pháp lý và nguồn ảnh |

Tiệm mở cửa **24/7**. Liên hệ: hotline/Zalo **0865 920 041**, email **contact@tiemnhaan.com**.

## Cấu trúc

```
src/data/site.mjs      ← thông tin tiệm, liên hệ, giờ mở cửa, vùng miền, SEO
src/data/branches.mjs  ← 5 chi nhánh (địa chỉ, ảnh, món riêng, điểm nổi bật)
src/data/content.mjs   ← 4 không gian, góc check-in, áo dài, sự kiện, tin tức, hỏi đáp
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

Mọi form (đặt bàn, đăng ký nhận tin, liên hệ, đặt chỗ, ứng tuyển, hợp tác) gửi tới `/api/contact`. Để nhận email thật, vào **Vercel → Settings → Environment Variables** và thêm:

- `RESEND_API_KEY`: tạo tài khoản và key tại resend.com, rồi xác minh tên miền `tiemnhaan.com` trên Resend.
- `CONTACT_TO` (tùy chọn): mặc định là `contact@tiemnhaan.com`.
- `CONTACT_FROM` (tùy chọn): mặc định là `Website Tiệm Nhà An <noreply@tiemnhaan.com>`.

Khi chưa cấu hình, form tự mở ứng dụng email của khách với nội dung soạn sẵn.

## Thống kê

Website đã gắn **Vercel Web Analytics** và **Speed Insights**. Bật hai mục này trong tab Analytics và Speed Insights của project trên Vercel, rồi deploy lại.

## Chạy và build

Cần Node 18 trở lên, không cần cài thư viện.

```bash
npm run build   # sinh lại public/ (5 ngôn ngữ), nén CSS, sitemap.xml, rss.xml
npm run i18n    # xuất danh sách câu cần dịch
npm run dev     # build và chạy thử tại http://localhost:3000
```

## Thay ảnh thật của tiệm

1. Ghi đè file cùng tên trong `public/assets/img/photos/` (định dạng `.webp`), hoặc thêm ảnh mới và khai báo trong `src/data/photos.json`.
2. Tạo các cỡ ảnh nhỏ cho điện thoại và menu (cần Python 3 và Pillow: `pip install Pillow`):

```bash
python3 scripts/images.py
```

3. Chạy `npm run build`.

Nếu quên bước 2, website vẫn hiển thị đúng ảnh mới (chỉ là nặng hơn trên điện thoại), vì mỗi ảnh thu nhỏ được đối chiếu mã kiểm tra với ảnh gốc.

## Hiệu năng và bộ nhớ đệm

- CSS nguồn ở `public/assets/css/style.css`; bản build tự nén thành `style.min.css`.
- Mọi CSS, JS, ảnh đều được gắn mã phiên bản (`?v=...`), nên trình duyệt lưu đệm 1 năm nhưng vẫn nhận bản mới ngay sau mỗi lần cập nhật.
- Dọn CSS không còn dùng (sau khi build): `python3 scripts/purge-css.py --dry-run` để xem trước, bỏ `--dry-run` để áp dụng.

## Deploy lên Vercel

1. Vào vercel.com, chọn **Add New → Project** rồi import repo GitHub này.
2. Giữ nguyên cài đặt. `vercel.json` đã khai báo build `npm run build`, output `public` và URL gọn (`/trai-nghiem`).
3. Bấm **Deploy**.
4. Gắn tên miền `tiemnhaan.com` và trỏ DNS: xem [docs/HUONG-DAN-TEN-MIEN.md](docs/HUONG-DAN-TEN-MIEN.md).

## Cần cập nhật trước khi chạy chính thức

- `src/data/branches.mjs`: điền số nhà, đường cho từng chi nhánh khi có (trường `address` và `map` cho bản đồ).
- `src/data/site.mjs`: thêm link Facebook/Instagram/TikTok (để trống thì website tự ẩn) và mã xác minh Google, Bing, Facebook, Zalo.
- Vercel → Environment Variables: thêm `RESEND_API_KEY` để form gửi email thật (xem mục Form và email).
- **Ảnh** hiện là ảnh minh họa từ Unsplash, Rawpixel và Flickr, đều cho phép dùng thương mại (nguồn và tác giả ở `/tin-dung-anh`). Khi có ảnh thật của tiệm, ghi đè file cùng tên trong `public/assets/img/photos/` rồi chạy `npm run build`.
- Nội dung marketing (nguồn trà, giờ bếp, Nhà An Club, gói chụp áo dài, workshop, quyền lợi tuyển dụng, dịch vụ doanh nghiệp) là bản nháp, nên rà lại cho đúng với thực tế của tiệm.
- Bản dịch Anh, Nhật, Hàn, Trung do AI thực hiện; nên nhờ người bản xứ đọc lại trước khi quảng bá ra nước ngoài.
