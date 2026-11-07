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
    desc: 'Khu làm việc và học tập tách biệt với khu trò chuyện. Bàn đơn và bàn đôi có vách ngăn, đèn bàn, ổ cắm và cổng sạc ở từng chỗ, wifi tốc độ cao. Quy tắc giờ yên lặng: nói nhỏ, tắt chuông, gọi điện ra ngoài. Mở cửa 24/7, xuyên đêm.',
    features: ['Khu yên lặng tách biệt', 'Bàn có vách ngăn, đèn bàn', 'Ổ cắm, cổng sạc từng chỗ', 'Wifi tốc độ cao', 'Mở cửa 24/7, xuyên đêm'],
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
    desc: 'Khu bàn dài và sân trước nhiều cây xanh, được nói chuyện thoải mái. Có board game, nhạc vui hơn, phù hợp học nhóm, họp lớp, sinh nhật nhỏ hay đơn giản là những buổi trò chuyện thật lâu.',
    features: ['Bàn dài 8–12 người', 'Board game miễn phí', 'Sân trước nhiều cây xanh', 'Nhạc vui, nói cười thoải mái', 'Nhận trang trí sinh nhật nhỏ'],
    best: 'Hội bạn · Học nhóm · Sinh nhật nhỏ',
  },
];

export const amenities = [
  ['laptop', 'Wifi tốc độ cao', 'Đường truyền riêng cho khu làm việc, đủ họp online và tải file nặng.'],
  ['sun', 'Ổ cắm mọi chỗ ngồi', 'Ổ điện và cổng sạc USB ở từng bàn, không phải tranh nhau.'],
  ['clock', 'Mở cửa 24/7', 'Ngày hay đêm đều có chỗ ngồi, không giới hạn thời gian.'],
  ['card', 'In ấn nhanh', 'In, scan tài liệu ngay tại quầy cho những deadline gấp.'],
  ['cup', 'Gọi món tại bàn', 'Quét mã gọi trà, bánh, cơm chay mà không cần rời chỗ.'],
  ['heart', 'Giờ yên lặng', 'Khu Deadline luôn yên tĩnh, có quy tắc nói nhỏ rõ ràng.'],
];

export const posts = [
  {
    slug: 'nha-an-sap-khai-truong-5-chi-nhanh',
    date: '2026-11-06',
    dateText: '06/11/2026',
    tag: 'Tin tiệm',
    img: 'cafe-garden',
    title: 'Tiệm Nhà An sắp khai trương 5 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam',
    excerpt: 'Bình Thạnh, Tân Bình ở Sài Gòn; trung tâm Đà Nẵng, phố cổ Hội An và Duy Xuyên bên sông Thu Bồn: 5 căn nhà đang được hoàn thiện.',
    body: [
      'Sau thời gian dài chuẩn bị, Tiệm Nhà An chính thức công bố kế hoạch khai trương 5 chi nhánh đầu tiên: Nhà An Bình Thạnh, Nhà An Tân Bình, Nhà An Đà Nẵng, Nhà An Hội An và Nhà An Duy Xuyên.',
      'Mỗi chi nhánh mang một màu riêng của vùng đất. Bình Thạnh là nhà phố có sân sen giữa phố cao tầng, Tân Bình là tiệm trà gạch bông Sài Gòn xưa gần sân bay. Ở miền Trung có ban công nhìn sông Hàn và cầu Rồng, căn nhà vàng thắp đèn lồng giữa phố cổ Hội An và nhà vườn bên sông Thu Bồn ở Duy Xuyên.',
      'Điểm chung của cả 5 căn nhà là không gian làm việc và học tập riêng biệt với 4 khu: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline và Sân Rôm Rả.',
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
      'Phòng Chạy Deadline tách biệt với khu trò chuyện, có bàn đơn và bàn đôi với vách ngăn, đèn bàn, ổ cắm và cổng sạc ở từng chỗ, wifi tốc độ cao và mở cửa 24/7.',
      'Khu này áp dụng quy tắc giờ yên lặng: nói nhỏ, tắt chuông điện thoại và ra ngoài khi cần gọi. Bạn có thể quét mã gọi trà, bánh hay cơm chay ngay tại bàn.',
      'Khi cần bàn bạc với nhóm, Phòng Họp Hanh Thông nhận đặt trước theo giờ, có màn hình trình chiếu và bảng trắng.',
    ],
  },
  {
    slug: 'tuyen-dung-nhan-vien-5-chi-nhanh',
    date: '2026-11-04',
    dateText: '04/11/2026',
    tag: 'Tuyển dụng',
    img: 'chat-friends',
    title: 'Nhà An tuyển nhân viên cho 5 chi nhánh: lương 30.000–35.000đ/giờ và 10–15 triệu/tháng',
    excerpt: 'Barista, phục vụ, thu ngân, thợ bánh, phụ bếp chay. Không cần kinh nghiệm, được đào tạo từ đầu, BHXH và BHYT đầy đủ cho nhân viên chính thức.',
    body: [
      'Để chuẩn bị cho 5 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam, Tiệm Nhà An tuyển nhiều vị trí bán thời gian và chính thức.',
      'Nhân viên bán thời gian nhận 30.000 – 35.000đ/giờ với ca linh hoạt, phù hợp sinh viên. Nhân viên chính thức nhận 10 – 15 triệu/tháng, ký hợp đồng lao động và được đóng BHXH, BHYT đầy đủ.',
      'Nhà An không yêu cầu kinh nghiệm. Bạn sẽ được đào tạo pha chế, làm bánh, nấu chay và phục vụ, có lộ trình lên ca trưởng và quản lý cửa hàng.',
      'Ứng tuyển ngay trên trang Tuyển dụng, gửi CV qua email contact@tiemnhaan.com hoặc nhắn Zalo 0865 920 041.',
    ],
  },
];

export const faqAll = [
  ['Về tiệm', [
    ['Khi nào Tiệm Nhà An khai trương?', '5 chi nhánh (Bình Thạnh, Tân Bình tại TP. Hồ Chí Minh; trung tâm Đà Nẵng, phố cổ Hội An và Duy Xuyên) đang được hoàn thiện. Ngày khai trương và địa chỉ chính xác sẽ được thông báo trên website, Zalo và tới những bạn đã đăng ký nhận tin.'],
    ['Đồ ăn ở tiệm có hoàn toàn là đồ chay không?', 'Có. Toàn bộ món ăn sáng và trưa là món chay, nước dùng nấu từ củ quả và không dùng bột ngọt. Món thuần chay (không trứng, không sữa) được ghi chú riêng tại quầy.'],
    ['Có thể chọn mức đường và loại sữa không?', 'Được. Mọi ly có thể chọn mức đường từ 0% đến 100%, ít hoặc nhiều đá, và đổi sữa tươi sang sữa yến mạch.'],
  ]],
  ['Không gian làm việc & học tập', [
    ['Nhà An có mấy khu ngồi?', 'Mỗi chi nhánh có 4 khu: Phòng Họp Hanh Thông (họp nhóm), Góc Ấm Nhà An (ấm cúng), Phòng Chạy Deadline (yên lặng, tập trung) và Sân Rôm Rả (trò chuyện thoải mái).'],
    ['Có giới hạn thời gian ngồi không?', 'Không. Nhà An mở cửa 24/7, bạn có thể ngồi làm việc, học tập thoải mái cả ngày lẫn đêm.'],
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

// ───────── Góc check-in & studio áo dài ─────────
export const photoSpots = [
  { id: 'tuong-hoa', name: 'Tường Hoa Nhà An', img: 'flower-wall', desc: 'Bức tường hoa nhiều màu đổi theo mùa, ánh sáng tự nhiên cả buổi sáng.', tip: 'Đẹp nhất 07:00 – 10:00' },
  { id: 'goc-sen', name: 'Góc Sen Hồng', img: 'lotus', desc: 'Chậu sen hồng giữa sân, mặt nước phản chiếu, đúng chất logo Nhà An.', tip: 'Đẹp nhất lúc nắng sớm' },
  { id: 'polaroid', name: 'Tường Polaroid', img: 'polaroid-wall', desc: 'Chụp xong in polaroid tại quầy, ghim lên tường kỷ niệm của Nhà An.', tip: 'In ảnh lấy liền tại quầy' },
  { id: 'den-dem', name: 'Góc Đèn Đêm', img: 'night-cafe', desc: 'Đèn vàng, đèn dây lấp lánh, hợp những tấm ảnh ấm áp buổi tối và đêm khuya.', tip: 'Đẹp nhất sau 19:00' },
  { id: 'ban-tra', name: 'Bàn Trà Gốm', img: 'oolong-set', desc: 'Bàn trà gỗ, ấm gốm Bát Tràng, chén trà ô long cho những tấm ảnh flat-lay.', tip: 'Gọi một ấm trà để chụp' },
  { id: 'den-long', name: 'Góc Đèn Lồng', img: 'hoian-lanterns-2', desc: 'Đèn lồng Hội An đủ màu, thắp sáng mỗi tối, có nhiều nhất ở chi nhánh Hội An.', tip: 'Đẹp nhất sau 18:00' },
];

export const aodai = {
  services: [
    ['Cho thuê áo dài', 'Áo dài truyền thống, cách tân, áo dài đôi và áo dài trẻ em, nhiều màu và size. Có nón lá, quạt, giỏ hoa đi kèm.', 'gift'],
    ['Phòng chụp ảnh riêng', 'Phòng studio có đèn chụp, phông nền và set trang trí thay đổi theo mùa, đặt theo khung giờ.', 'camera'],
    ['Thợ ảnh & trang điểm', 'Đặt kèm thợ chụp ảnh và trang điểm, làm tóc khi cần. Ảnh được chỉnh màu và gửi qua Zalo hoặc Google Drive.', 'star'],
    ['Combo trà & ảnh', 'Chụp xong ngồi lại thưởng trà ô long và bánh, có chỗ thay đồ và gửi đồ riêng.', 'cup'],
  ],
  packages: [
    { name: 'Gói Tự Chụp', who: '1 – 2 người', items: ['Thuê 1 bộ áo dài / người', 'Phụ kiện nón lá, quạt', 'Chụp tự do ở các góc check-in', 'Tặng 1 ly trà'] },
    { name: 'Gói Studio', who: '1 – 4 người', items: ['Thuê áo dài và phụ kiện', 'Phòng studio riêng theo giờ', 'Set trang trí theo mùa', 'Chỗ thay đồ riêng'], hot: true },
    { name: 'Gói Trọn Gói', who: 'Cá nhân, nhóm bạn, gia đình', items: ['Áo dài, trang điểm, làm tóc', 'Thợ chụp ảnh chuyên nghiệp', 'Ảnh đã chỉnh màu', 'Trà và bánh cho cả nhóm'] },
  ],
  steps: ['Chọn gói và khung giờ, đặt lịch qua form hoặc Zalo', 'Nhà An gọi xác nhận, tư vấn mẫu áo và size', 'Đến tiệm thay đồ, trang điểm nếu có', 'Chụp ảnh, nghỉ ngơi với trà và bánh'],
};

// ───────── Lễ Tết & sự kiện trong năm ─────────
export const seasons = [
  { id: 'tet', month: 'Tháng 1 – 2', name: 'Tết Nguyên Đán', img: 'tet-blossom', desc: 'Set chụp áo dài với hoa đào, hoa mai, câu đối đỏ. Hộp quà trà ô long và mứt Tết, mở cửa xuyên Tết.', tags: ['Chụp áo dài Tết', 'Hộp quà Tết', 'Mở cửa xuyên Tết'] },
  { id: 'valentine', month: 'Tháng 2', name: 'Valentine', img: 'valentine-roses', desc: 'Góc hoa hồng, set trà đôi và bánh cho hai người, chụp ảnh đôi với áo dài cặp.', tags: ['Set trà đôi', 'Áo dài cặp', 'Góc hoa hồng'] },
  { id: '8-3', month: 'Tháng 3', name: 'Quốc tế Phụ nữ 8/3', img: 'aodai-lake', desc: 'Tặng hoa cho khách nữ, chụp áo dài cùng mẹ, chị em và bạn bè.', tags: ['Tặng hoa', 'Chụp áo dài cùng mẹ'] },
  { id: 'he', month: 'Tháng 5 – 7', name: 'Mùa hè & mùa thi', img: 'focus-man', desc: 'Mùa ôn thi, chạy deadline xuyên đêm 24/7. Ưu đãi cho học sinh, sinh viên mùa thi.', tags: ['Ôn thi 24/7', 'Ưu đãi mùa thi'] },
  { id: 'trung-thu', month: 'Tháng 9', name: 'Trung Thu', img: 'trungthu-lanterns', desc: 'Phố đèn lồng, bánh trung thu chay nhà làm, đêm rước đèn cho các bé và workshop làm lồng đèn.', tags: ['Bánh trung thu chay', 'Workshop lồng đèn', 'Chụp ảnh đèn lồng'] },
  { id: '20-10', month: 'Tháng 10', name: 'Phụ nữ Việt Nam 20/10', img: 'aodai-pink', desc: 'Set chụp áo dài, quà tặng hoa và trà cho những người phụ nữ thân yêu.', tags: ['Chụp áo dài', 'Quà tặng'] },
  { id: 'noel', month: 'Tháng 12', name: 'Giáng sinh & Năm mới', img: 'xmas-lights', desc: 'Cây thông, đèn dây lấp lánh, đêm nhạc acoustic, đếm ngược đón năm mới tại tiệm.', tags: ['Đêm nhạc Noel', 'Đếm ngược năm mới'] },
];

export const weekly = [
  ['T2 – T6', 'Giờ yên lặng chạy deadline', 'Khu Deadline yên tĩnh suốt ngày đêm, có ưu đãi cho người ngồi làm việc đêm khuya.'],
  ['Thứ 6', 'Đêm acoustic', 'Nhạc mộc, trà trái cây và hội bạn từ 20:00.'],
  ['Thứ 7', 'Workshop pha trà & làm bánh', 'Lớp nhỏ học pha ô long, đánh matcha, làm bánh chay.'],
  ['Chủ nhật', 'Board game & chụp áo dài', 'Board game ở Sân Rôm Rả, studio áo dài mở cả ngày.'],
];

export const morePosts = [
  {
    slug: 'nha-an-mo-cua-24-7',
    date: '2026-11-07',
    dateText: '07/11/2026',
    tag: 'Tin tiệm',
    img: 'night-cafe',
    title: 'Tiệm Nhà An mở cửa 24/7: đèn vẫn sáng cho những deadline xuyên đêm',
    excerpt: 'Cả 5 chi nhánh mở cửa 24 giờ mỗi ngày, 7 ngày mỗi tuần, kể cả lễ Tết. Có món chay khuya và khu yên lặng cho người làm việc đêm.',
    body: [
      'Nhiều bạn trẻ làm việc, học tập theo nhịp riêng: có người tập trung nhất lúc sáng sớm, có người chỉ vào guồng sau nửa đêm. Vì vậy Tiệm Nhà An quyết định mở cửa 24/7 ở cả 5 chi nhánh.',
      'Ban đêm, Phòng Chạy Deadline vẫn yên tĩnh với ổ cắm, đèn bàn và wifi mạnh. Quầy trà phục vụ suốt đêm, bếp có món chay khuya từ 22:00 đến 04:00.',
      'Nhà An có nhân viên trực suốt 24 giờ và mở cửa cả những ngày lễ Tết, để ai xa nhà cũng có một chỗ để về.',
    ],
  },
  {
    slug: 'studio-ao-dai-va-goc-check-in',
    date: '2026-11-07',
    dateText: '07/11/2026',
    tag: 'Chụp ảnh',
    img: 'aodai-hoian',
    title: 'Studio áo dài và 6 góc check-in tại Tiệm Nhà An',
    excerpt: 'Cho thuê áo dài, phòng studio riêng, thợ ảnh và trang điểm, cùng 6 góc check-in được thiết kế riêng, từ tường hoa đến góc đèn lồng.',
    body: [
      'Ngoài trà và không gian làm việc, mỗi chi nhánh Nhà An có một studio nhỏ để chụp ảnh áo dài, cùng nhiều góc check-in trong tiệm.',
      'Bạn có thể thuê áo dài truyền thống, cách tân, áo dài đôi hay áo dài trẻ em kèm nón lá, quạt và giỏ hoa. Studio có đèn chụp, phông nền và set trang trí thay theo mùa: hoa đào ngày Tết, đèn lồng Trung thu, cây thông Giáng sinh.',
      'Sáu góc check-in gồm Tường Hoa, Góc Sen Hồng, Tường Polaroid, Góc Đèn Đêm, Bàn Trà Gốm và Góc Đèn Lồng. Chụp xong, bạn có thể in ảnh polaroid lấy liền tại quầy.',
      'Đặt lịch chụp trên trang Studio áo dài & Góc check-in hoặc nhắn Zalo 0865 920 041.',
    ],
  },
  {
    slug: 'tet-va-su-kien-tai-nha-an',
    date: '2026-11-06',
    dateText: '06/11/2026',
    tag: 'Sự kiện',
    img: 'tet-blossom',
    title: 'Một năm ở Nhà An: Tết, Trung thu, Giáng sinh và những đêm acoustic',
    excerpt: 'Lịch sự kiện cả năm: chụp áo dài Tết, Valentine, 8/3, mùa thi, Trung thu, 20/10, Giáng sinh và hoạt động mỗi tuần.',
    body: [
      'Mỗi mùa trong năm, Nhà An thay đổi trang trí và có những hoạt động riêng.',
      'Dịp Tết Nguyên Đán, tiệm có set chụp áo dài với hoa đào, hoa mai, hộp quà trà Tết và mở cửa xuyên Tết. Trung thu có phố đèn lồng, bánh trung thu chay nhà làm và workshop làm lồng đèn.',
      'Mùa thi, Nhà An có ưu đãi cho học sinh, sinh viên ôn thi xuyên đêm. Giáng sinh và năm mới có đêm nhạc acoustic và đếm ngược tại tiệm.',
      'Hằng tuần còn có đêm acoustic thứ 6, workshop pha trà và làm bánh thứ 7, board game và studio áo dài ngày chủ nhật.',
    ],
  },
];

export const faqMore = [
  ['Mở cửa & đặt bàn', [
    ['Nhà An có mở cửa 24/7 không?', 'Có. Cả 5 chi nhánh mở cửa 24 giờ mỗi ngày, 7 ngày mỗi tuần, kể cả lễ Tết. Bếp có món chay khuya từ 22:00 đến 04:00.'],
    ['Đặt bàn như thế nào?', 'Bạn đặt bàn trên trang Đặt bàn, gọi hoặc nhắn Zalo 0865 920 041. Nhà An sẽ gọi lại xác nhận. Nhận đặt bàn thường, bàn nhóm, phòng họp, studio và tiệc.'],
    ['Có cần đặt bàn trước không?', 'Không bắt buộc. Nên đặt trước vào cuối tuần, dịp lễ Tết, khi đi nhóm đông hoặc cần phòng họp, studio.'],
  ]],
  ['Chụp ảnh & áo dài', [
    ['Có cho thuê áo dài không?', 'Có. Nhà An cho thuê áo dài truyền thống, cách tân, áo dài đôi và trẻ em, kèm nón lá, quạt, giỏ hoa. Có thể đặt thêm thợ ảnh và trang điểm.'],
    ['Chụp ảnh ở các góc check-in có mất phí không?', 'Không. Các góc check-in trong tiệm dành cho khách của Nhà An. Studio riêng và các gói áo dài cần đặt lịch trước, vui lòng liên hệ để nhận báo giá.'],
  ]],
];

// Gộp bài viết và hỏi đáp mới (bài mới nhất lên đầu)
posts.unshift(...morePosts);
faqAll.splice(1, 0, faqMore[0]);
faqAll.push(faqMore[1]);
