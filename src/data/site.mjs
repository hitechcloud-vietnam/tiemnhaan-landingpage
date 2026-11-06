// Cấu hình chung của website — sửa ở đây rồi chạy `npm run build`.
export const site = {
  name: 'Tiệm Nhà An',
  tagline: 'Một ly trà, một chút an.',
  description:
    'Tiệm Nhà An — trà sữa, ô long rang củi, bánh ngọt nướng mỗi sáng và đồ chay ăn sáng, ăn trưa. Sắp khai trương tại TP. Hồ Chí Minh và Đà Nẵng.',
  url: 'https://tiemnhaan.com',
  // Thông tin liên hệ: điền khi có thông tin chính thức. Để trống thì website ẩn mục đó.
  email: '',
  // URL nhận dữ liệu form (ví dụ Formspree: https://formspree.io/f/xxxxxx). Để trống: form chỉ hiện lời cảm ơn.
  formEndpoint: '',
  phone: '',
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    zalo: '',
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
      status: 'Coming Soon',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Không gian nhà phố với sân trước trồng sen, góc trà yên tĩnh cho dân văn phòng và khu bàn dài cho nhóm bạn.',
      img: 'interior-1',
    },
    {
      id: 'da-nang',
      city: 'Đà Nẵng',
      short: 'Đà Nẵng',
      status: 'Coming Soon',
      address: 'Địa chỉ sẽ được công bố trong thời gian tới',
      note: 'Tiệm trà gần biển với mì Quảng chay, trà ô long pha lạnh và ban công đón gió chiều.',
      img: 'interior-2',
    },
  ],
};
