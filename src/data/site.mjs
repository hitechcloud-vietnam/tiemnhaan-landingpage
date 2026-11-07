import { branches } from './branches.mjs';
// Cấu hình chung của website — sửa ở đây rồi chạy `npm run build`.
export const site = {
  name: 'Tiệm Nhà An',
  tagline: 'Một ly trà, một chút an.',
  description:
    'Tiệm Nhà An — trà sữa, ô long rang củi, bánh ngọt nướng mỗi sáng và đồ chay ăn sáng, ăn trưa. Sắp khai trương tại TP. Hồ Chí Minh và Đà Nẵng.',
  url: 'https://tiemnhaan.com',
  email: 'contact@tiemnhaan.com',
  phone: '0865920041', // số dùng cho tel: và Zalo
  phoneDisplay: '0865 920 041',
  // API nhận form (Vercel Function /api/contact, gửi email qua Resend khi có RESEND_API_KEY).
  // Nếu API chưa cấu hình, form tự mở ứng dụng email với nội dung soạn sẵn gửi tới `email`.
  formEndpoint: '/api/contact',
  // SEO & mạng xã hội. Dán mã xác minh khi đăng ký Google Search Console, Bing, Facebook…
  seo: {
    keywords: 'Tiệm Nhà An, trà sữa, trà ô long, ô long rang củi, bánh ngọt, đồ chay, cơm chay, quán cà phê làm việc, không gian học tập, chạy deadline, cafe Sài Gòn, cafe Đà Nẵng, cafe Hội An, tuyển dụng barista',
    googleVerification: '',
    bingVerification: '',
    facebookAppId: '',
    facebookDomainVerification: '',
    zaloVerification: '',
    twitter: '',
  },
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    zalo: 'https://zalo.me/0865920041',
  },
  open247: true,
  hours: [
    ['Mở cửa', '24/7, cả ngày lẫn đêm'],
    ['Trà, bánh & đồ uống', '24/7'],
    ['Điểm tâm chay', '06:00 – 10:30'],
    ['Cơm & bún trưa chay', '10:30 – 14:00'],
    ['Món chay khuya', '22:00 – 04:00'],
  ],
  regions: [
    { id: 'sai-gon', name: 'Sài Gòn', full: 'TP. Hồ Chí Minh', path: '/sai-gon', img: 'saigon-dusk', tagline: 'Sài Gòn hoa lệ, một ly trà an' },
    { id: 'mien-trung', name: 'Đà Nẵng – Quảng Nam', full: 'Đà Nẵng, Hội An & Duy Xuyên', path: '/da-nang-quang-nam', img: 'hoian-lanterns', tagline: 'Phố biển, phố đèn lồng, một chút an' },
  ],
  // 5 chi nhánh — xem src/data/branches.mjs
  branches,
};
