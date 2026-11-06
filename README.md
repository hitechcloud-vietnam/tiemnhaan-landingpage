# Tiệm Nhà An — Landing Page

Website giới thiệu nhiều trang cho **Tiệm Nhà An**: trà sữa, ô long rang củi, bánh ngọt và đồ chay ăn sáng/trưa.
Chi nhánh **TP. Hồ Chí Minh** và **Đà Nẵng**: *Coming Soon*.

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ: hero, 6 món ký tên, 8 nhóm món, câu chuyện ô long, một ngày ở Nhà An, món bán chạy, lời hứa, chi nhánh, đăng ký nhận tin, FAQ |
| `/thuc-don` | Thực đơn **115 món** kèm giá: tìm kiếm không dấu, lọc (Ký tên, Bán chạy, Mới, Thuần chay, Có nóng), tab nhóm món, xem chi tiết từng món, topping, combo |
| `/ve-chung-toi` | Câu chuyện thương hiệu, giá trị, nguồn nguyên liệu, hành trình, bộ nhận diện logo và màu |
| `/chi-nhanh` | TP.HCM và Đà Nẵng (Coming Soon), giờ mở cửa dự kiến, form đăng ký nhận tin |
| `/lien-he` | Form liên hệ, giờ mở cửa, FAQ |
| `/tin-dung-anh` | Nguồn và giấy phép ảnh minh họa |

## Cấu trúc

```
src/data/menu.mjs     ← 115 món, topping, combo (sửa món/giá ở đây)
src/data/site.mjs     ← tên, email, điện thoại, mạng xã hội, giờ mở cửa, chi nhánh, form endpoint
src/data/credits.json ← tín dụng ảnh
src/layout.mjs        ← head/header/footer dùng chung
src/pages.mjs         ← nội dung từng trang
scripts/build.mjs     ← sinh HTML tĩnh vào public/
public/               ← site tĩnh hoàn chỉnh (Vercel phục vụ thư mục này)
```

## Chạy và build

Không cần cài thư viện, chỉ cần Node 18 trở lên.

```bash
npm run build   # sinh lại public/*.html, sitemap.xml, robots.txt
npm run dev     # build và chạy thử tại http://localhost:3000
```

## Deploy lên Vercel

1. Vào vercel.com, chọn **Add New → Project** rồi import repo GitHub này.
2. Giữ nguyên cài đặt. `vercel.json` đã khai báo build `npm run build`, output `public` và URL gọn (`/thuc-don`).
3. Bấm **Deploy**.
4. Gắn tên miền `tiemnhaan.com` và trỏ DNS: xem [docs/HUONG-DAN-TEN-MIEN.md](docs/HUONG-DAN-TEN-MIEN.md).

## Cần cập nhật trước khi chạy chính thức

- `src/data/site.mjs`: điền `email`, `phone`, link `social` (để trống thì website tự ẩn) và địa chỉ chi nhánh khi có.
- `formEndpoint`: dán URL nhận form (ví dụ Formspree hoặc Google Apps Script) để thật sự nhận đăng ký và lời nhắn. Khi để trống, form chỉ hiện lời cảm ơn.
- **Ảnh món** hiện là ảnh minh họa có giấy phép Creative Commons (xem `/tin-dung-anh`). Thay bằng ảnh thật bằng cách ghi đè file cùng tên trong `public/assets/img/menu/`.
- Nội dung marketing (nguồn trà, quy trình, giá) là bản nháp, nên rà lại cho đúng với thực tế của tiệm.
