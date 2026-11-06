// Nội dung dùng chung: 4 không gian, tin tức, hỏi đáp
export const spaces = [
  {
    id: 'hop',
    name: 'Phòng Họp Hanh Thông',
    en: 'Meeting Room',
    mood: 'Hội họp',
    icon: 'users',
    img: 'meet-room',
    imgs: ['meet-team', 'meet-brick'],
    short: 'Phòng họp nhỏ cho team, đồ án và phỏng vấn. Họp xong việc chạy hanh thông.',
    desc: 'Phòng kính riêng cho 6–10 người, cách âm với khu chung, có màn hình trình chiếu, bảng trắng và bút. Hợp cho họp team, làm đồ án nhóm, phỏng vấn, thuyết trình thử. Nhận đặt trước theo giờ.',
    features: ['6–10 chỗ, phòng kính riêng', 'Màn hình trình chiếu HDMI', 'Bảng trắng, bút, giấy note', 'Đặt trước theo khung giờ', 'Trà, bánh phục vụ tận bàn'],
    best: 'Họp team · Đồ án nhóm · Phỏng vấn',
  },
  {
    id: 'am',
    name: 'Góc Ấm Nhà An',
    en: 'Cozy Corner',
    mood: 'Ấm cúng',
    icon: 'home',
    img: 'cozy-lounge',
    imgs: ['cozy-cocoa', 'cozy-sofa'],
    short: 'Sofa êm, đèn vàng, ly trà nóng. Một mình đọc sách hay hẹn hò đều dễ chịu.',
    desc: 'Góc sofa và ghế bành bên cửa sổ, đèn vàng dịu, chăn mỏng và kệ sách nhỏ. Dành cho những buổi đọc sách, viết nhật ký, gặp người thân quen hay đơn giản là ngồi một mình uống trà.',
    features: ['Sofa, ghế bành, chăn mỏng', 'Đèn vàng dịu, nhạc nhỏ', 'Kệ sách đọc tại chỗ', 'Ổ cắm cạnh ghế', 'Không gian riêng tư, ít người qua lại'],
    best: 'Đọc sách · Hẹn hò · Ngồi một mình',
  },
  {
    id: 'deadline',
    name: 'Phòng Chạy Deadline',
    en: 'Focus Zone',
    mood: 'Deadline',
    icon: 'laptop',
    img: 'focus-man',
    imgs: ['focus-laptop', 'focus-coffee'],
    short: 'Khu yên lặng tách biệt, bàn đơn, ổ cắm từng chỗ, wifi mạnh. Vào là vào guồng.',
    desc: 'Khu làm việc và học tập tách biệt với khu trò chuyện. Bàn đơn và bàn đôi có vách ngăn, đèn bàn, ổ cắm và cổng sạc ở từng chỗ, wifi tốc độ cao. Quy tắc giờ yên lặng: nói nhỏ, tắt chuông, gọi điện ra ngoài. Mở cửa tới 22:00.',
    features: ['Khu yên lặng tách biệt', 'Bàn có vách ngăn, đèn bàn', 'Ổ cắm, cổng sạc từng chỗ', 'Wifi tốc độ cao', 'Mở cửa tới 22:00'],
    best: 'Chạy deadline · Ôn thi · Làm việc từ xa',
  },
  {
    id: 'rom-ra',
    name: 'Sân Rôm Rả',
    en: 'Social Zone',
    mood: 'Rôm rả',
    icon: 'chat',
    img: 'chat-friends',
    imgs: ['chat-table', 'chat-cafe'],
    short: 'Bàn dài, board game, nói cười thoải mái. Chỗ của hội bạn và những buổi học nhóm vui.',
    desc: 'Khu bàn dài và sân trước nhiều cây xanh, được nói chuyện thoải mái. Có board game, nhạc vui hơn, phù hợp học nhóm, họp lớp, sinh nhật nhỏ hay chỉ là ngồi tám chuyện cả buổi.',
    features: ['Bàn dài 8–12 người', 'Board game miễn phí', 'Sân trước nhiều cây xanh', 'Nhạc vui, nói cười thoải mái', 'Nhận trang trí sinh nhật nhỏ'],
    best: 'Hội bạn · Học nhóm · Sinh nhật nhỏ',
  },
];

export const amenities = [
  ['laptop', 'Wifi tốc độ cao', 'Đường truyền riêng cho khu làm việc, đủ họp online và tải file nặng.'],
  ['sun', 'Ổ cắm mọi chỗ ngồi', 'Ổ điện và cổng sạc USB ở từng bàn, không phải tranh nhau.'],
  ['clock', 'Mở cửa tới 22:00', 'Ngồi lâu thoải mái, không giới hạn thời gian.'],
  ['card', 'In ấn nhanh', 'In, scan tài liệu ngay tại quầy cho những deadline gấp.'],
  ['cup', 'Gọi món tại bàn', 'Quét mã gọi trà, bánh, cơm chay mà không cần rời chỗ.'],
  ['heart', 'Giờ yên lặng', 'Khu Deadline luôn yên tĩnh, có quy tắc nói nhỏ rõ ràng.'],
];

export const posts = [
  {
    slug: 'nha-an-sap-khai-truong-4-chi-nhanh',
    date: '2026-11-06',
    dateText: '06/11/2026',
    tag: 'Tin tiệm',
    img: 'cafe-garden',
    title: 'Tiệm Nhà An sắp khai trương 4 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam',
    excerpt: 'Hai chi nhánh tại Sài Gòn, một chi nhánh gần biển Đà Nẵng và một căn nhà vàng giữa phố cổ Hội An đang được hoàn thiện.',
    body: [
      'Sau thời gian dài chuẩn bị, Tiệm Nhà An chính thức công bố kế hoạch khai trương 4 chi nhánh đầu tiên: Nhà An Sài Gòn 1, Nhà An Sài Gòn 2, Nhà An Đà Nẵng và Nhà An Hội An.',
      'Mỗi chi nhánh mang một màu riêng của vùng đất. Ở Sài Gòn là nhà phố có góc sen và tiệm trà gạch bông Sài Gòn xưa. Ở miền Trung là ban công đón gió biển Mỹ Khê và căn nhà vàng thắp đèn lồng bên sông Hoài.',
      'Điểm chung của cả 4 căn nhà là không gian làm việc và học tập riêng biệt với 4 khu: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline và Sân Rôm Rả.',
      'Địa chỉ và ngày khai trương cụ thể sẽ được công bố trên website và Zalo của Nhà An. Hãy đăng ký nhận tin để là người đầu tiên biết và nhận ưu đãi khai trương.',
    ],
  },
  {
    slug: 'khong-gian-chay-deadline-cho-gioi-tre',
    date: '2026-11-05',
    dateText: '05/11/2026',
    tag: 'Không gian',
    img: 'focus-man',
    title: 'Phòng Chạy Deadline: nơi làm việc, học tập riêng biệt cho giới trẻ',
    excerpt: 'Khu yên lặng tách biệt, bàn có vách ngăn, ổ cắm từng chỗ và wifi mạnh. Nhà An muốn mọi deadline của bạn đều chạy hanh thông.',
    body: [
      'Nhiều bạn trẻ chọn quán cà phê để làm việc và học tập, nhưng thường gặp cảnh ồn ào, thiếu ổ cắm, wifi chập chờn. Nhà An thiết kế riêng một khu cho những giờ cần tập trung.',
      'Phòng Chạy Deadline tách biệt với khu trò chuyện, có bàn đơn và bàn đôi với vách ngăn, đèn bàn, ổ cắm và cổng sạc ở từng chỗ, wifi tốc độ cao và mở cửa tới 22:00.',
      'Khu này áp dụng quy tắc giờ yên lặng: nói nhỏ, tắt chuông điện thoại và ra ngoài khi cần gọi. Bạn có thể quét mã gọi trà, bánh hay cơm chay ngay tại bàn.',
      'Khi cần bàn bạc với nhóm, Phòng Họp Hanh Thông nhận đặt trước theo giờ, có màn hình trình chiếu và bảng trắng.',
    ],
  },
  {
    slug: 'tuyen-dung-nhan-vien-4-chi-nhanh',
    date: '2026-11-04',
    dateText: '04/11/2026',
    tag: 'Tuyển dụng',
    img: 'chat-friends',
    title: 'Nhà An tuyển nhân viên cho 4 chi nhánh: lương 30.000–35.000đ/giờ và 10–15 triệu/tháng',
    excerpt: 'Barista, phục vụ, thu ngân, thợ bánh, phụ bếp chay. Không cần kinh nghiệm, được đào tạo từ đầu, BHXH và BHYT đầy đủ cho nhân viên chính thức.',
    body: [
      'Để chuẩn bị cho 4 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam, Tiệm Nhà An tuyển nhiều vị trí bán thời gian và chính thức.',
      'Nhân viên bán thời gian nhận 30.000 – 35.000đ/giờ với ca linh hoạt, phù hợp sinh viên. Nhân viên chính thức nhận 10 – 15 triệu/tháng, ký hợp đồng lao động và được đóng BHXH, BHYT đầy đủ.',
      'Nhà An không yêu cầu kinh nghiệm. Bạn sẽ được đào tạo pha chế, làm bánh, nấu chay và phục vụ, có lộ trình lên ca trưởng và quản lý cửa hàng.',
      'Ứng tuyển ngay trên trang Tuyển dụng, gửi CV qua email contact@tiemnhaan.com hoặc nhắn Zalo 0865 920 041.',
    ],
  },
];

export const faqAll = [
  ['Về tiệm', [
    ['Khi nào Tiệm Nhà An khai trương?', '4 chi nhánh (2 tại TP. Hồ Chí Minh, 2 tại Đà Nẵng – Quảng Nam) đang được hoàn thiện. Ngày khai trương và địa chỉ chính xác sẽ được thông báo trên website, Zalo và tới những bạn đã đăng ký nhận tin.'],
    ['Đồ ăn ở tiệm có hoàn toàn là đồ chay không?', 'Có. Toàn bộ món ăn sáng và trưa là món chay, nước dùng nấu từ củ quả và không dùng bột ngọt. Món thuần chay (không trứng, không sữa) được ghi chú riêng tại quầy.'],
    ['Có thể chọn mức đường và loại sữa không?', 'Được. Mọi ly có thể chọn mức đường từ 0% đến 100%, ít hoặc nhiều đá, và đổi sữa tươi sang sữa yến mạch.'],
  ]],
  ['Không gian làm việc & học tập', [
    ['Nhà An có mấy khu ngồi?', 'Mỗi chi nhánh có 4 khu: Phòng Họp Hanh Thông (họp nhóm), Góc Ấm Nhà An (ấm cúng), Phòng Chạy Deadline (yên lặng, tập trung) và Sân Rôm Rả (trò chuyện thoải mái).'],
    ['Có giới hạn thời gian ngồi không?', 'Không. Bạn có thể ngồi làm việc, học tập thoải mái tới giờ đóng cửa 22:00.'],
    ['Làm sao để đặt phòng họp?', 'Phòng Họp Hanh Thông nhận đặt trước theo khung giờ. Bạn có thể gửi yêu cầu qua form trên trang Không gian, gọi hoặc nhắn Zalo 0865 920 041.'],
    ['Wifi và ổ cắm có đủ không?', 'Mỗi chỗ ngồi đều có ổ cắm và cổng sạc USB. Khu làm việc có đường truyền wifi riêng tốc độ cao.'],
  ]],
  ['Đặt tiệc & quà tặng', [
    ['Tiệm có nhận đặt bánh, tiệc trà và quà tặng không?', 'Có. Nhà An nhận đặt bánh sinh nhật, hộp quà trà bánh và set trà cho văn phòng hoặc sự kiện nhỏ. Gọi hoặc nhắn Zalo 0865 920 041, hoặc email contact@tiemnhaan.com.'],
    ['Có nhận tổ chức sinh nhật tại tiệm không?', 'Có. Sân Rôm Rả nhận tiệc nhỏ đến 30 khách, có trang trí đơn giản. Vui lòng đặt trước ít nhất 2 ngày.'],
  ]],
  ['Tuyển dụng', [
    ['Nhà An tuyển nhân viên với mức lương thế nào?', 'Bán thời gian: 30.000 – 35.000đ/giờ, ca linh hoạt. Nhân viên chính thức: 10 – 15 triệu/tháng, đóng BHXH, BHYT đầy đủ.'],
    ['Chưa có kinh nghiệm có ứng tuyển được không?', 'Được. Nhà An đào tạo từ đầu về pha chế, làm bánh, nấu chay và phục vụ.'],
  ]],
];
