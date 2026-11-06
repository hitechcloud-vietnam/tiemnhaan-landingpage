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
  hours: [
    ['Điểm tâm chay', '06:30 – 10:30'],
    ['Cơm & bún trưa chay', '10:30 – 14:00'],
    ['Trà & bánh ngọt', '06:30 – 22:00'],
  ],
  regions: [
    { id: 'sai-gon', name: 'Sài Gòn', full: 'TP. Hồ Chí Minh', path: '/sai-gon', img: 'saigon-dusk', tagline: 'Sài Gòn hoa lệ, một ly trà an' },
    { id: 'mien-trung', name: 'Đà Nẵng – Quảng Nam', full: 'Đà Nẵng & Hội An', path: '/da-nang-quang-nam', img: 'hoian-lanterns', tagline: 'Phố biển, phố đèn lồng, một chút an' },
  ],
  // 4 chi nhánh: 2 tại TP.HCM, 2 tại Đà Nẵng – Quảng Nam
  branches: [
    {
      id: 'sai-gon-1',
      region: 'sai-gon',
      city: 'Nhà An Sài Gòn 1',
      area: 'TP. Hồ Chí Minh',
      short: 'Sài Gòn 1',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Nhà phố giữa lòng Sài Gòn, sân trước trồng sen, góc làm việc yên tĩnh cho dân văn phòng và bàn dài cho cả hội bạn.',
      img: 'cafe-garden',
      tags: ['Góc sen', 'Góc làm việc', 'Bàn dài nhóm bạn', 'Workshop cuối tuần'],
    },
    {
      id: 'sai-gon-2',
      region: 'sai-gon',
      city: 'Nhà An Sài Gòn 2',
      area: 'TP. Hồ Chí Minh',
      short: 'Sài Gòn 2',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Tiệm trà kiểu Sài Gòn xưa: gạch bông, cửa sổ gỗ, phin cà phê và ly trà ô long đá cho buổi chiều tan ca.',
      img: 'cafe-bright',
      tags: ['Gạch bông Sài Gòn xưa', 'Bạc xỉu ô long', 'Mở tới 22:00', 'Chill night'],
    },
    {
      id: 'da-nang',
      region: 'mien-trung',
      city: 'Nhà An Đà Nẵng',
      area: 'Đà Nẵng – Quảng Nam',
      short: 'Đà Nẵng',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Tiệm trà gần biển Mỹ Khê, ban công đón gió chiều, ô long pha lạnh và mì Quảng chay cho bữa sáng.',
      img: 'mykhe-2',
      tags: ['Gần biển', 'Ban công đón gió', 'Mì Quảng chay', 'Ô long pha lạnh'],
    },
    {
      id: 'hoi-an',
      region: 'mien-trung',
      city: 'Nhà An Hội An',
      area: 'Đà Nẵng – Quảng Nam',
      short: 'Hội An',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Căn nhà vàng bên phố đèn lồng, trà sen thả hoa đăng buổi tối và bánh xèo chay giòn rụm.',
      img: 'hoian-street',
      tags: ['Phố đèn lồng', 'Trà sen Hội An', 'Bánh xèo chay', 'Đêm phố cổ'],
    },
  ],
};
