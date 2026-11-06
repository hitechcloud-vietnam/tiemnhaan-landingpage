# Tiệm Nhà An — Landing Page

Website giới thiệu nhiều trang cho **Tiệm Nhà An**: trà sữa, ô long rang củi, bánh ngọt và đồ chay ăn sáng/trưa.
Chi nhánh **TP. Hồ Chí Minh** và **Đà Nẵng**: *Coming Soon*.

## Các trang

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Trang chủ: hero, 4 điều làm nên Nhà An, món ký tên ô long, góc check-in, một ngày ở Nhà An, Nhà An Club, workshop, đặt tiệc, chi nhánh, đăng ký nhận tin, FAQ |
| `/trai-nghiem` | Không gian, workshop & sự kiện, đặt tiệc & quà tặng, Nhà An Club, tuyển dụng |
| `/ve-chung-toi` | Câu chuyện thương hiệu, giá trị, nguồn nguyên liệu, hành trình, logo và màu |
| `/chi-nhanh` | TP.HCM và Đà Nẵng (Coming Soon), giờ mở cửa dự kiến, đăng ký nhận tin |
| `/lien-he` | Hotline, Zalo, email, form liên hệ, FAQ |
| `/tin-dung-anh` | Nguồn và giấy phép ảnh |

Liên hệ: hotline/Zalo **0865 920 041**, email **contact@tiemnhaan.com**. Nút gọi và Zalo nổi ở góc phải mọi trang.

## Cấu trúc

```
src/data/site.mjs     ← tên, email, điện thoại, Zalo, mạng xã hội, giờ mở cửa, chi nhánh, form endpoint
src/data/photos.json  ← danh sách ảnh, kích thước, nguồn và giấy phép
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

- `src/data/site.mjs`: thêm link Facebook/Instagram/TikTok (để trống thì website tự ẩn) và địa chỉ chi nhánh khi có.
- `formEndpoint`: dán URL nhận form (ví dụ Formspree hoặc Google Apps Script) để thật sự nhận đăng ký và lời nhắn. Khi để trống, form mở ứng dụng email của khách với nội dung soạn sẵn gửi tới contact@tiemnhaan.com.
- **Ảnh** hiện là ảnh minh họa từ Unsplash và Rawpixel (CC0), được phép dùng thương mại (xem `/tin-dung-anh`). Thay bằng ảnh thật bằng cách ghi đè file cùng tên trong `public/assets/img/photos/`.
- Nội dung marketing (nguồn trà, quy trình, Nhà An Club, workshop, tuyển dụng) là bản nháp, nên rà lại cho đúng với thực tế của tiệm.
