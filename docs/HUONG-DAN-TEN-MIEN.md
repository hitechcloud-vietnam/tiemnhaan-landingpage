# Hướng dẫn gắn tên miền tiemnhaan.com trên Vercel

Website đã được cấu hình sẵn cho `https://tiemnhaan.com`: link chuẩn (canonical), sitemap, ảnh chia sẻ, và tự chuyển `www.tiemnhaan.com` về `tiemnhaan.com`.

## Bước 1: Deploy lên Vercel

1. Đăng nhập https://vercel.com bằng tài khoản GitHub.
2. Chọn **Add New… → Project**, chọn repo `hitechcloud-vietnam/tiemnhaan-landingpage` (website chính thức) rồi bấm **Import**.
3. Giữ nguyên cài đặt (Framework: *Other*; `vercel.json` đã khai báo build và thư mục `public`).
4. Bấm **Deploy**. Vài chục giây sau site chạy tại `tiemnhaan-landingpage.vercel.app`.
5. Vào **Settings → Git** và kiểm tra **Production Branch** là `main`.

## Bước 2: Thêm tên miền trong Vercel

1. Mở project, vào **Settings → Domains**.
2. Nhập `tiemnhaan.com` rồi bấm **Add**. Nếu được hỏi, chọn phương án *thêm cả `www.tiemnhaan.com` và chuyển hướng về `tiemnhaan.com`*.
3. Nếu chưa được thêm tự động, nhập tiếp `www.tiemnhaan.com` và chọn **Redirect to tiemnhaan.com (308)**.
4. Vercel sẽ hiện các bản ghi DNS cần tạo (trạng thái *Invalid Configuration* cho đến khi bạn trỏ DNS xong).

## Bước 3: Trỏ DNS tại nhà cung cấp tên miền

Đăng nhập trang quản lý DNS nơi bạn mua tên miền (Mắt Bão, P.A Việt Nam, Nhân Hòa, iNET, Tenten, GoDaddy, Namecheap, Cloudflare…), mở **Quản lý DNS / DNS Records** của `tiemnhaan.com` và tạo:

| Loại (Type) | Tên / Host | Giá trị (Value) | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `216.198.79.1` | 3600 (hoặc Auto) |
| `CNAME` | `www` | `3ebc759da879a33a.vercel-dns-017.com.` | 3600 (hoặc Auto) |

> Đây là giá trị Vercel cấp cho project Tiệm Nhà An và đã được xác nhận hoạt động ngày 07/11/2026. Giá trị cũ `76.76.21.21` / `cname.vercel-dns.com` vẫn dùng được. **Nếu màn hình Domains của Vercel ghi giá trị khác, hãy dùng đúng giá trị Vercel hiển thị.**

Lưu ý quan trọng:

- **Xóa các bản ghi cũ trùng tên**: các bản ghi `A`/`AAAA` khác của `@`, và `A`/`CNAME` khác của `www` (thường là "trang mặc định / parking" của nhà cung cấp). Bản ghi trùng sẽ làm Vercel báo lỗi.
- **Không xóa** bản ghi `MX` và `TXT` nếu bạn đang dùng email theo tên miền (Google Workspace, Zoho…).
- Có nhà cung cấp yêu cầu ô Tên để trống thay cho `@`, hoặc ghi đầy đủ `tiemnhaan.com`.
- **Nếu dùng Cloudflare**: đặt 2 bản ghi ở chế độ **DNS only** (đám mây xám), không bật Proxy (đám mây cam), để Vercel cấp chứng chỉ SSL.

### Cách khác: dùng Nameserver của Vercel

Bạn có thể đổi Nameserver của tên miền sang `ns1.vercel-dns.com` và `ns2.vercel-dns.com`. Khi đó Vercel quản lý toàn bộ DNS, và bạn phải tạo lại các bản ghi email (MX/TXT) trong Vercel. Nếu không chắc, hãy dùng cách bản ghi A/CNAME ở trên.

## Bước 4: Kiểm tra

- DNS thường cập nhật trong 5–30 phút, có khi tới 24–48 giờ.
- Kiểm tra trên https://dnschecker.org với `tiemnhaan.com` (loại A, phải ra `216.198.79.1` hoặc một IP thuộc dải `216.198.79.x` / `64.29.17.x` của Vercel) và `www.tiemnhaan.com` (loại CNAME).
- Hoặc dùng lệnh:

```bash
nslookup tiemnhaan.com
```

```bash
nslookup www.tiemnhaan.com
```

- Khi màn hình **Settings → Domains** hiện dấu tick xanh *Valid Configuration*, Vercel sẽ tự cấp SSL (https). Truy cập `https://tiemnhaan.com` là xong.

## Sau khi có tên miền

- Khai báo trang với Google Search Console (https://search.google.com/search-console): thêm `tiemnhaan.com`, xác minh bằng bản ghi `TXT`, rồi gửi sitemap `https://tiemnhaan.com/sitemap.xml`.
- Mỗi lần push lên nhánh `main`, Vercel tự deploy lại.
