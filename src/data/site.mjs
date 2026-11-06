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
  // URL nhận dữ liệu form (ví dụ Formspree: https://formspree.io/f/xxxxxx).
  // Để trống: form mở ứng dụng email với nội dung soạn sẵn gửi tới `email`.
  formEndpoint: '',
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
  branches: [
    {
      id: 'hcm',
      city: 'Thành phố Hồ Chí Minh',
      short: 'TP.HCM',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Nhà phố nhiều cây xanh với sân trước trồng sen, góc làm việc yên tĩnh và bàn dài cho cả hội bạn.',
      img: 'cafe-garden',
      tags: ['Góc sen', 'Bàn dài nhóm bạn', 'Góc làm việc', 'Workshop cuối tuần'],
    },
    {
      id: 'da-nang',
      city: 'Đà Nẵng',
      short: 'Đà Nẵng',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Tiệm trà gần biển, ban công đón gió chiều, ô long pha lạnh và mì Quảng chay cho bữa sáng.',
      img: 'cafe-plants',
      tags: ['Ban công đón gió', 'Mì Quảng chay', 'Ô long pha lạnh', 'Chill night'],
    },
  ],
};
