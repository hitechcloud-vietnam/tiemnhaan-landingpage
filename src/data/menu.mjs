// Thực đơn Tiệm Nhà An — 115 món
// price: số nguyên (VND). sizes: { M, L } cho đồ uống có 2 cỡ.
// tags: best (bán chạy), new (món mới), sig (món ký tên), hot (uống nóng được), vegan (thuần chay, không sữa/trứng)

export const categories = [
  { id: 'tra-sua', name: 'Trà Sữa', en: 'Milk Tea', icon: 'cup', desc: 'Cốt trà ủ mới mỗi 4 tiếng, sữa tươi thanh trùng và trân châu nấu trong ngày.' },
  { id: 'o-long', name: 'Ô Long & Trà Nguyên Lá', en: 'Oolong & Whole-leaf Tea', icon: 'leaf', desc: 'Ô long rang củi theo mẻ nhỏ, pha lạnh hoặc pha nóng, thơm hương gỗ và mật ong.' },
  { id: 'tra-trai-cay', name: 'Trà Trái Cây', en: 'Fruit Tea', icon: 'citrus', desc: 'Trái cây tươi theo mùa, ít đường, nền trà xanh nhài hoặc ô long thanh.' },
  { id: 'matcha-ca-phe', name: 'Matcha & Cà Phê', en: 'Matcha & Coffee', icon: 'whisk', desc: 'Matcha Uji đánh tay và cà phê Robusta – Arabica Cầu Đất rang mộc.' },
  { id: 'da-xay', name: 'Đá Xay & Sữa Chua', en: 'Blended & Yogurt', icon: 'snow', desc: 'Mát lạnh cho trưa nắng: đá xay, sữa chua lên men tự làm, sinh tố.' },
  { id: 'banh-ngot', name: 'Bánh Ngọt', en: 'Pastries & Cakes', icon: 'cake', desc: 'Nướng mỗi sáng tại tiệm: bánh mì bơ, cheesecake, tiramisu, mochi, macaron.' },
  { id: 'chay-sang', name: 'Điểm Tâm Chay', en: 'Vegetarian Breakfast', icon: 'sun', desc: 'Phục vụ 6:30 – 10:30. Nước dùng rau củ hầm 8 tiếng, không bột ngọt.' },
  { id: 'chay-trua', name: 'Cơm & Bún Trưa Chay', en: 'Vegetarian Lunch', icon: 'bowl', desc: 'Phục vụ 10:30 – 14:00. Cơm gạo lứt, rau hữu cơ, đậu hũ non làm tại tiệm.' },
];

const T = (id, cat, name, en, desc, price, img, tags = []) => ({ id, cat, name, en, desc, price, img, tags });

export const items = [
  // ───────── TRÀ SỮA (20) ─────────
  T('ts01', 'tra-sua', 'Trà Sữa Nhà An', 'House Milk Tea', 'Hồng trà Assam ủ đậm, sữa tươi, kem cheese mặn nhẹ — ly đầu tiên nên thử.', { M: 39000, L: 45000 }, 'bubble-4', ['sig', 'best']),
  T('ts02', 'tra-sua', 'Trà Sữa Trân Châu Đường Đen', 'Brown Sugar Boba Milk', 'Trân châu đường đen nấu liu riu 45 phút, sữa tươi lạnh, vệt đường hổ.', { M: 42000, L: 49000 }, 'bubble-1', ['best']),
  T('ts03', 'tra-sua', 'Trà Sữa Ô Long Rang', 'Roasted Oolong Milk Tea', 'Ô long rang củi đậm khói, sữa tươi, hậu vị caramel.', { M: 45000, L: 52000 }, 'milk-tea-hot', ['sig', 'best', 'hot']),
  T('ts04', 'tra-sua', 'Trà Sữa Nhài Sữa Yến Mạch', 'Jasmine Oat Milk Tea', 'Trà xanh ướp nhài, sữa yến mạch — thuần chay, nhẹ và thơm.', { M: 45000, L: 52000 }, 'milk-tea-cup', ['vegan', 'new']),
  T('ts05', 'tra-sua', 'Trà Sữa Khoai Môn', 'Taro Milk Tea', 'Khoai môn Đà Lạt nghiền tay, hồng trà, sữa tươi.', { M: 42000, L: 49000 }, 'bubble-2'),
  T('ts06', 'tra-sua', 'Trà Sữa Thái Xanh', 'Thai Green Milk Tea', 'Trà xanh Thái thơm lá dứa, sữa đặc nhẹ ngọt.', { M: 39000, L: 45000 }, 'bubble-5'),
  T('ts07', 'tra-sua', 'Trà Sữa Thái Đỏ', 'Thai Red Milk Tea', 'Trà Thái đỏ cam truyền thống, béo và thơm vani.', { M: 39000, L: 45000 }, 'thai-tea'),
  T('ts08', 'tra-sua', 'Hồng Trà Sữa Kem Trứng Nướng', 'Brûlée Milk Tea', 'Hồng trà sữa phủ kem trứng khè lửa giòn mặt.', { M: 49000, L: 56000 }, 'bubble-3', ['best']),
  T('ts09', 'tra-sua', 'Trà Sữa Matcha Đậu Đỏ', 'Matcha Red Bean Milk Tea', 'Matcha Uji, đậu đỏ Hokkaido sên mật, sữa tươi.', { M: 49000, L: 56000 }, 'matcha-1'),
  T('ts10', 'tra-sua', 'Trà Sữa Socola Bạc Hà', 'Choco Mint Milk Tea', 'Cacao Bến Tre, lá bạc hà tươi, sữa tươi.', { M: 45000, L: 52000 }, 'bubble-4'),
  T('ts11', 'tra-sua', 'Trà Sữa Hoa Đậu Biếc', 'Butterfly Pea Milk Tea', 'Màu xanh tím tự nhiên từ hoa đậu biếc, trà nhài, sữa dừa.', { M: 42000, L: 49000 }, 'bubble-2', ['vegan']),
  T('ts12', 'tra-sua', 'Trà Sữa Gạo Rang', 'Roasted Rice Milk Tea', 'Gạo lứt rang thơm như cốm, trà xanh, sữa tươi.', { M: 42000, L: 49000 }, 'milk-tea-cup', ['new']),
  T('ts13', 'tra-sua', 'Trà Sữa Caramel Muối', 'Salted Caramel Milk Tea', 'Caramel tự nấu, muối hồng, hồng trà Ceylon.', { M: 45000, L: 52000 }, 'bubble-1'),
  T('ts14', 'tra-sua', 'Trà Sữa Dừa Nướng', 'Toasted Coconut Milk Tea', 'Cơm dừa Bến Tre nướng, nước cốt dừa, trà ô long — thuần chay.', { M: 45000, L: 52000 }, 'thai-tea', ['vegan']),
  T('ts15', 'tra-sua', 'Trà Sữa Mè Đen', 'Black Sesame Milk Tea', 'Mè đen rang xay mịn, sữa tươi, ngậy bùi.', { M: 45000, L: 52000 }, 'milk-tea-hot', ['hot']),
  T('ts16', 'tra-sua', 'Trà Sữa Hạt Sen', 'Lotus Seed Milk Tea', 'Hạt sen Huế hầm mềm, trà sen, sữa tươi — vị của Nhà An.', { M: 49000, L: 56000 }, 'bubble-5', ['sig']),
  T('ts17', 'tra-sua', 'Trà Sữa Bí Đỏ Quế', 'Pumpkin Cinnamon Milk Tea', 'Bí đỏ nghiền, quế Trà My, hồng trà — món theo mùa thu.', { M: 45000, L: 52000 }, 'thai-tea', ['new', 'hot']),
  T('ts18', 'tra-sua', 'Trà Sữa Pudding Trứng', 'Egg Pudding Milk Tea', 'Pudding trứng hấp mềm mịn, hồng trà sữa.', { M: 45000, L: 52000 }, 'bubble-3'),
  T('ts19', 'tra-sua', 'Sữa Tươi Trân Châu Đường Đen', 'Brown Sugar Fresh Milk', 'Không trà — sữa tươi thanh trùng và trân châu đường đen.', { M: 42000, L: 49000 }, 'bubble-1'),
  T('ts20', 'tra-sua', 'Trà Sữa Nướng Nóng', 'Hot Roasted Milk Tea', 'Hồng trà nấu cùng đường thốt nốt, uống nóng cho ngày mưa.', { M: 42000, L: 49000 }, 'milk-tea-hot', ['hot']),

  // ───────── Ô LONG & TRÀ NGUYÊN LÁ (18) ─────────
  T('ol01', 'o-long', 'Ô Long Rang Củi', 'Wood-fired Oolong', 'Ô long Bảo Lộc rang củi nhãn 3 lần, hương gỗ, hậu ngọt mật ong.', { M: 45000, L: 55000 }, 'oolong-leaves', ['sig', 'best', 'hot']),
  T('ol02', 'o-long', 'Ô Long Sữa Kem Mây', 'Cloud Cream Oolong', 'Ô long rang pha lạnh 12 giờ, lớp kem sữa tươi đánh bông như mây.', { M: 52000, L: 62000 }, 'tea-cup', ['sig', 'best']),
  T('ol03', 'o-long', 'Ô Long Nhài Sữa', 'Jasmine Oolong Latte', 'Ô long ướp nhài thủ công, sữa tươi ít ngọt.', { M: 49000, L: 59000 }, 'milk-tea-hot', ['best']),
  T('ol04', 'o-long', 'Ô Long Đào Hồng', 'Pink Peach Oolong', 'Ô long thanh, đào ngâm, lát đào tươi và hoa hồng khô.', { M: 49000, L: 59000 }, 'iced-tea-1', ['new']),
  T('ol05', 'o-long', 'Ô Long Sen Vàng', 'Golden Lotus Oolong', 'Ô long ướp gạo sen Hồ Tây, thanh mát, hương sen dịu.', { M: 55000, L: 65000 }, 'lotus', ['sig', 'hot']),
  T('ol06', 'o-long', 'Ô Long Quế Hoa', 'Osmanthus Oolong', 'Ô long và hoa quế khô, ngọt hương tự nhiên.', { M: 49000, L: 59000 }, 'tea-tray', ['hot']),
  T('ol07', 'o-long', 'Ô Long Mật Ong Chanh Dây', 'Honey Passion Oolong', 'Ô long pha lạnh, mật ong rừng, chanh dây Lâm Đồng.', { M: 45000, L: 55000 }, 'iced-tea-3'),
  T('ol08', 'o-long', 'Ô Long Kem Muối Phô Mai', 'Cheese Foam Oolong', 'Ô long rang, lớp kem phô mai muối hồng béo mặn.', { M: 52000, L: 62000 }, 'tea-cup', ['best']),
  T('ol09', 'o-long', 'Ô Long Lạnh Nguyên Vị', 'Cold-brew Oolong', 'Pha lạnh 12 giờ, không đường, rót từ bình gốm.', { M: 39000, L: 45000 }, 'iced-tea-3', ['vegan']),
  T('ol10', 'o-long', 'Bình Ô Long Nóng (2 người)', 'Hot Oolong Pot for Two', 'Ấm gốm Bát Tràng, châm nước 3 lần, kèm mứt gừng.', 89000, 'tea-set-1', ['hot', 'vegan']),
  T('ol11', 'o-long', 'Trà Lài Thái Nguyên', 'Thai Nguyen Jasmine Tea', 'Trà xanh Tân Cương ướp lài tươi, xanh và thơm.', { M: 35000, L: 42000 }, 'tea-bush', ['hot', 'vegan']),
  T('ol12', 'o-long', 'Trà Shan Tuyết Cổ Thụ', 'Ancient Shan Tuyet Tea', 'Búp trà trên cây cổ thụ Hà Giang, ngọt hậu sâu.', 69000, 'tea-plantation', ['hot', 'vegan', 'new']),
  T('ol13', 'o-long', 'Hồng Trà Mộc', 'Vietnamese Black Tea', 'Hồng trà Lâm Đồng lên men tự nhiên, vị mạch nha.', { M: 35000, L: 42000 }, 'tea-pour', ['hot', 'vegan']),
  T('ol14', 'o-long', 'Trà Sen Tây Hồ', 'West Lake Lotus Tea', 'Trà ướp trong bông sen Bách Diệp, một ấm cho buổi chiều tĩnh.', 120000, 'tea-set-2', ['hot', 'vegan', 'sig']),
  T('ol15', 'o-long', 'Trà Gừng Sả Mật Ong', 'Ginger Lemongrass Tea', 'Gừng già, sả, mật ong — ấm bụng ngày se lạnh.', { M: 35000, L: 42000 }, 'tea-cup', ['hot']),
  T('ol16', 'o-long', 'Trà Atiso Đà Lạt', 'Dalat Artichoke Tea', 'Atiso đỏ, la hán quả, thanh mát gan.', { M: 35000, L: 42000 }, 'iced-tea-2', ['vegan']),
  T('ol17', 'o-long', 'Ô Long Tắc Xí Muội', 'Kumquat Plum Oolong', 'Ô long, tắc tươi, xí muội — chua mặn ngọt.', { M: 42000, L: 49000 }, 'iced-tea-1', ['vegan']),
  T('ol18', 'o-long', 'Set Thử Trà 4 Vị', 'Tea Tasting Flight', '4 chén nhỏ: lài, ô long rang, ô long sen, hồng trà mộc.', 99000, 'oolong-hand', ['hot', 'vegan']),

  // ───────── TRÀ TRÁI CÂY (15) ─────────
  T('tc01', 'tra-trai-cay', 'Trà Vải Hoa Hồng', 'Lychee Rose Tea', 'Vải thiều Lục Ngạn, hoa hồng, trà nhài.', { M: 42000, L: 49000 }, 'berry-tea', ['best', 'vegan']),
  T('tc02', 'tra-trai-cay', 'Trà Đào Cam Sả', 'Peach Orange Lemongrass', 'Đào ngâm, cam vàng, sả cây đập dập.', { M: 42000, L: 49000 }, 'iced-tea-1', ['best', 'vegan']),
  T('tc03', 'tra-trai-cay', 'Trà Dâu Tây Đà Lạt', 'Dalat Strawberry Tea', 'Dâu tây dầm tay, trà xanh, thạch dâu.', { M: 45000, L: 52000 }, 'berry-tea', ['vegan']),
  T('tc04', 'tra-trai-cay', 'Trà Chanh Dây Hạt Chia', 'Passion Fruit Chia Tea', 'Chanh dây, hạt chia, trà xanh nhài.', { M: 39000, L: 45000 }, 'fruit-tea-1', ['vegan']),
  T('tc05', 'tra-trai-cay', 'Trà Bưởi Hồng Mật Ong', 'Pink Pomelo Honey Tea', 'Tép bưởi da xanh, mật ong, trà ô long.', { M: 45000, L: 52000 }, 'fruit-tea-1', ['new']),
  T('tc06', 'tra-trai-cay', 'Trà Xoài Chanh Dây', 'Mango Passion Tea', 'Xoài cát Hòa Lộc, chanh dây, thạch trái cây.', { M: 45000, L: 52000 }, 'iced-tea-3', ['vegan']),
  T('tc07', 'tra-trai-cay', 'Trà Ổi Hồng Muối Ớt', 'Pink Guava Chili Salt', 'Ổi hồng ép, muối ớt Tây Ninh viền ly.', { M: 42000, L: 49000 }, 'iced-tea-2', ['vegan', 'new']),
  T('tc08', 'tra-trai-cay', 'Trà Thơm Hồng Trà', 'Pineapple Black Tea', 'Thơm nướng, hồng trà, quế.', { M: 39000, L: 45000 }, 'iced-tea-3', ['vegan']),
  T('tc09', 'tra-trai-cay', 'Trà Mãng Cầu Xiêm', 'Soursop Tea', 'Mãng cầu xiêm Bến Tre dầm tay, trà xanh.', { M: 45000, L: 52000 }, 'fruit-tea-1', ['best', 'vegan']),
  T('tc10', 'tra-trai-cay', 'Trà Nho Mẫu Đơn', 'Grape Peony Tea', 'Nho xanh không hạt, trà bạch mẫu đơn.', { M: 49000, L: 56000 }, 'iced-tea-2', ['vegan']),
  T('tc11', 'tra-trai-cay', 'Trà Dưa Hấu Bạc Hà', 'Watermelon Mint Tea', 'Dưa hấu ép tươi, bạc hà, trà nhài.', { M: 39000, L: 45000 }, 'berry-tea', ['vegan']),
  T('tc12', 'tra-trai-cay', 'Trà Táo Xanh Quế', 'Green Apple Cinnamon Tea', 'Táo xanh, quế, hồng trà — uống nóng hoặc lạnh.', { M: 42000, L: 49000 }, 'iced-tea-1', ['hot', 'vegan']),
  T('tc13', 'tra-trai-cay', 'Trà Tắc Mật Ong', 'Kumquat Honey Tea', 'Tắc tươi, mật ong, trà xanh.', { M: 35000, L: 42000 }, 'fruit-tea-1'),
  T('tc14', 'tra-trai-cay', 'Trà Hibiscus Việt Quất', 'Hibiscus Blueberry Tea', 'Atiso đỏ, việt quất, màu đỏ ruby tự nhiên.', { M: 45000, L: 52000 }, 'berry-tea', ['vegan']),
  T('tc15', 'tra-trai-cay', 'Trà Trái Cây Nhiệt Đới', 'Tropical Fruit Tea', 'Thơm, xoài, cam, chanh dây, kiwi — một ly đầy nắng.', { M: 49000, L: 56000 }, 'iced-tea-3', ['vegan']),

  // ───────── MATCHA & CÀ PHÊ (10) ─────────
  T('mc01', 'matcha-ca-phe', 'Matcha Latte Đánh Tay', 'Ceremonial Matcha Latte', 'Matcha Uji đánh tay bằng chổi tre, sữa tươi.', { M: 52000, L: 59000 }, 'matcha-1', ['best', 'hot']),
  T('mc02', 'matcha-ca-phe', 'Matcha Yến Mạch', 'Matcha Oat Latte', 'Matcha và sữa yến mạch — thuần chay.', { M: 55000, L: 62000 }, 'matcha-2', ['vegan', 'hot']),
  T('mc03', 'matcha-ca-phe', 'Matcha Kem Muối', 'Salted Cream Matcha', 'Matcha lạnh, kem muối béo nhẹ.', { M: 55000, L: 62000 }, 'matcha-1', ['sig']),
  T('mc04', 'matcha-ca-phe', 'Hojicha Latte', 'Roasted Green Tea Latte', 'Trà xanh rang Nhật, vị khói nhẹ, sữa tươi.', { M: 52000, L: 59000 }, 'latte-3', ['hot', 'new']),
  T('mc05', 'matcha-ca-phe', 'Cà Phê Sữa Đá', 'Vietnamese Iced Coffee', 'Phin Robusta Cầu Đất, sữa đặc.', { M: 32000, L: 39000 }, 'latte-2', ['best']),
  T('mc06', 'matcha-ca-phe', 'Bạc Xỉu Ô Long', 'Oolong Bạc Xỉu', 'Bạc xỉu và một shot ô long rang — đặc sản Nhà An.', { M: 42000, L: 49000 }, 'latte-1', ['sig']),
  T('mc07', 'matcha-ca-phe', 'Cà Phê Muối', 'Salted Cream Coffee', 'Cà phê phin, kem muối kiểu Huế.', { M: 39000, L: 45000 }, 'latte-2'),
  T('mc08', 'matcha-ca-phe', 'Cà Phê Dừa', 'Coconut Coffee', 'Cốt dừa đá xay và espresso.', { M: 45000, L: 52000 }, 'latte-3', ['vegan']),
  T('mc09', 'matcha-ca-phe', 'Latte Nóng', 'Hot Latte', 'Espresso Arabica Cầu Đất, sữa tươi đánh mịn.', { M: 45000, L: 52000 }, 'latte-1', ['hot']),
  T('mc10', 'matcha-ca-phe', 'Americano Mật Ong', 'Honey Americano', 'Espresso, nước, chút mật ong hoa cà phê.', { M: 39000, L: 45000 }, 'latte-2', ['hot', 'vegan']),

  // ───────── ĐÁ XAY & SỮA CHUA (8) ─────────
  T('dx01', 'da-xay', 'Matcha Đá Xay', 'Matcha Frappe', 'Matcha, sữa, đá xay mịn, kem tươi.', { M: 55000, L: 62000 }, 'matcha-2'),
  T('dx02', 'da-xay', 'Socola Đá Xay', 'Chocolate Frappe', 'Cacao Bến Tre, bánh quy giòn, kem tươi.', { M: 52000, L: 59000 }, 'choc-cake'),
  T('dx03', 'da-xay', 'Ô Long Đá Xay Caramel', 'Oolong Caramel Frappe', 'Ô long rang, caramel muối, đá xay.', { M: 55000, L: 62000 }, 'tea-cup', ['sig']),
  T('dx04', 'da-xay', 'Sữa Chua Dâu Tằm', 'Mulberry Yogurt', 'Sữa chua lên men tại tiệm, mứt dâu tằm Đà Lạt.', { M: 45000, L: 52000 }, 'berry-tea', ['best']),
  T('dx05', 'da-xay', 'Sữa Chua Xoài Nếp Cẩm', 'Mango Black Rice Yogurt', 'Sữa chua, xoài chín, nếp cẩm dẻo.', { M: 49000, L: 56000 }, 'fruit-tea-1'),
  T('dx06', 'da-xay', 'Sinh Tố Bơ Dừa', 'Avocado Coconut Smoothie', 'Bơ sáp Đắk Lắk, nước cốt dừa — thuần chay.', { M: 49000, L: 56000 }, 'matcha-2', ['vegan']),
  T('dx07', 'da-xay', 'Sữa Chua Việt Quất Granola', 'Blueberry Granola Yogurt', 'Sữa chua, việt quất, granola yến mạch rang mật ong.', { M: 52000, L: 59000 }, 'cheesecake-2', ['new']),
  T('dx08', 'da-xay', 'Dừa Đá Xay Lá Dứa', 'Pandan Coconut Frappe', 'Nước cốt dừa, lá dứa, thạch dừa — thuần chay.', { M: 49000, L: 56000 }, 'bubble-5', ['vegan']),

  // ───────── BÁNH NGỌT (18) ─────────
  T('bn01', 'banh-ngot', 'Croissant Bơ Pháp', 'Butter Croissant', 'Bơ lên men Pháp, 27 lớp, nướng mỗi sáng.', 35000, 'croissant-1', ['best']),
  T('bn02', 'banh-ngot', 'Croissant Hạnh Nhân', 'Almond Croissant', 'Nhân kem hạnh nhân, phủ hạnh nhân lát.', 45000, 'croissant-3'),
  T('bn03', 'banh-ngot', 'Croissant Matcha', 'Matcha Croissant', 'Vỏ giòn hai màu, nhân kem matcha.', 49000, 'croissant-4', ['new']),
  T('bn04', 'banh-ngot', 'Pain au Chocolat', 'Chocolate Croissant', 'Hai thanh socola đen 55% trong vỏ bánh bơ.', 42000, 'croissant-2'),
  T('bn05', 'banh-ngot', 'Basque Cheesecake', 'Burnt Basque Cheesecake', 'Mặt cháy caramel, ruột kem phô mai mềm chảy.', 59000, 'cheesecake-3', ['sig', 'best']),
  T('bn06', 'banh-ngot', 'Cheesecake Việt Quất', 'Blueberry Cheesecake', 'Phô mai kem New York, sốt việt quất.', 59000, 'cheesecake-2'),
  T('bn07', 'banh-ngot', 'Cheesecake Ô Long', 'Oolong Cheesecake', 'Phô mai ướp ô long rang, đế bánh quy bơ.', 62000, 'cheesecake-1', ['sig']),
  T('bn08', 'banh-ngot', 'Tiramisu Cà Phê Phin', 'Phin Coffee Tiramisu', 'Mascarpone, bánh ladyfinger thấm cà phê phin.', 59000, 'tiramisu-1', ['best']),
  T('bn09', 'banh-ngot', 'Tiramisu Matcha', 'Matcha Tiramisu', 'Mascarpone matcha, rắc bột matcha Uji.', 62000, 'tiramisu-2'),
  T('bn10', 'banh-ngot', 'Mille Crêpe Ô Long', 'Oolong Mille Crêpe', '20 lớp crêpe mỏng, kem tươi ô long.', 65000, 'tiramisu-3', ['new']),
  T('bn11', 'banh-ngot', 'Bánh Socola Ẩm', 'Chocolate Fudge Cake', 'Socola đen 70%, mềm ẩm, kem ganache.', 55000, 'choc-cake'),
  T('bn12', 'banh-ngot', 'Macaron Hộp 6', 'Macaron Box of 6', '6 vị: vải hoa hồng, ô long, matcha, dừa, chanh dây, socola.', 99000, 'macaron-2', ['best']),
  T('bn13', 'banh-ngot', 'Macaron Lẻ', 'Single Macaron', 'Chọn vị trong tủ bánh hôm nay.', 18000, 'macaron-3'),
  T('bn14', 'banh-ngot', 'Mochi Trà Xanh Đậu Đỏ', 'Matcha Red Bean Mochi', 'Vỏ nếp dẻo, nhân đậu đỏ và kem matcha.', 32000, 'mochi-1'),
  T('bn15', 'banh-ngot', 'Mochi Kem Dâu', 'Strawberry Cream Mochi', 'Dâu tây Đà Lạt nguyên trái, kem tươi.', 35000, 'mochi-2', ['new']),
  T('bn16', 'banh-ngot', 'Bánh Bông Lan Lá Dứa', 'Pandan Chiffon', 'Bông lan nước cốt lá dứa, mềm xốp, không bơ.', 38000, 'mochi-3'),
  T('bn17', 'banh-ngot', 'Bánh Su Kem Vani', 'Vanilla Cream Puff', 'Vỏ choux giòn, kem trứng vani Madagascar.', 25000, 'macaron-4'),
  T('bn18', 'banh-ngot', 'Bánh Chuối Nướng Thuần Chay', 'Vegan Banana Bread', 'Chuối xiêm chín, đường thốt nốt, óc chó — không trứng sữa.', 39000, 'croissant-2', ['vegan']),

  // ───────── ĐIỂM TÂM CHAY (14) ─────────
  T('cs01', 'chay-sang', 'Phở Chay Nấm Đông Cô', 'Shiitake Vegetarian Pho', 'Nước dùng củ quả hầm 8 tiếng, nấm đông cô, đậu hũ non.', 55000, 'pho-2', ['sig', 'best', 'vegan']),
  T('cs02', 'chay-sang', 'Bún Huế Chay', 'Hue Spicy Noodle Soup', 'Sả, ớt sa tế, chả chay, nấm rơm — cay nồng xứ Huế.', 55000, 'veg-soup', ['best', 'vegan']),
  T('cs03', 'chay-sang', 'Hủ Tiếu Nam Vang Chay', 'Phnom Penh Noodle', 'Hủ tiếu dai, nước lèo củ cải, nấm, tàu hũ ky.', 52000, 'pho-1', ['vegan']),
  T('cs04', 'chay-sang', 'Bánh Mì Chay Nhà An', 'House Vegetarian Bánh Mì', 'Pa-tê nấm, chả lụa chay, đồ chua, rau thơm.', 35000, 'banhmi-2', ['sig', 'best', 'vegan']),
  T('cs05', 'chay-sang', 'Bánh Mì Ốp La Chay', 'Bánh Mì with Tofu "Egg"', 'Đậu hũ non áp chảo nghệ, nước tương tỏi.', 35000, 'banhmi-1', ['vegan']),
  T('cs06', 'chay-sang', 'Xôi Bắp Đậu Xanh', 'Corn & Mung Bean Sticky Rice', 'Nếp dẻo, bắp nếp, đậu xanh, hành phi, mè đậu phộng.', 30000, 'rice-1', ['vegan']),
  T('cs07', 'chay-sang', 'Bánh Cuốn Nấm Mèo', 'Steamed Rice Rolls', 'Bánh cuốn tráng tay, nhân nấm mèo, củ sắn.', 45000, 'spring-3', ['vegan']),
  T('cs08', 'chay-sang', 'Cháo Nấm Hạt Sen', 'Lotus Seed Mushroom Porridge', 'Cháo gạo lứt, hạt sen, nấm rơm, gừng.', 45000, 'veg-soup', ['vegan', 'hot']),
  T('cs09', 'chay-sang', 'Bánh Bao Chay Nhân Rau Củ', 'Vegetable Bao', 'Vỏ bột mềm, nhân củ sắn, nấm, miến.', 25000, 'bao-1', ['vegan']),
  T('cs10', 'chay-sang', 'Bánh Bao Kim Sa Đậu Xanh', 'Mung Bean Custard Bao', 'Nhân đậu xanh chảy kiểu kim sa.', 28000, 'bao-2'),
  T('cs11', 'chay-sang', 'Gỏi Cuốn Chay', 'Fresh Spring Rolls', 'Đậu hũ, bún, rau thơm, chấm tương đậu phộng.', 39000, 'spring-1', ['vegan']),
  T('cs12', 'chay-sang', 'Mì Quảng Chay', 'Quang Noodle', 'Sợi mì vàng nghệ, nấm, đậu phộng, bánh tráng mè — đặc sản Đà Nẵng.', 55000, 'noodle-1', ['vegan', 'new']),
  T('cs13', 'chay-sang', 'Bánh Xèo Chay Mini', 'Mini Crispy Pancakes', '4 cái bánh xèo giòn, nhân giá nấm, rau rừng.', 49000, 'spring-2', ['vegan']),
  T('cs14', 'chay-sang', 'Set Điểm Tâm Nhà An', 'Nhà An Breakfast Set', 'Bánh mì chay + chén cháo nấm + ly trà lài nóng.', 69000, 'banhmi-3', ['sig', 'vegan']),

  // ───────── CƠM & BÚN TRƯA CHAY (12) ─────────
  T('ct01', 'chay-trua', 'Cơm Gạo Lứt Đậu Hũ Sốt Cà', 'Brown Rice, Tofu in Tomato', 'Đậu hũ non chiên sốt cà chua, rau luộc, canh rong biển.', 59000, 'tofu-4', ['best', 'vegan']),
  T('ct02', 'chay-trua', 'Cơm Chiên Thập Cẩm Chay', 'Vegetarian Fried Rice', 'Cơm gạo thơm, đậu Hà Lan, cà rốt, nấm, chà bông nấm.', 55000, 'rice-2', ['vegan']),
  T('ct03', 'chay-trua', 'Cơm Âm Phủ Chay', 'Hue Mixed Rice Plate', 'Cơm trộn kiểu Huế: chả chay, trứng chiên (tuỳ chọn), rau thơm, nước mắm chay.', 65000, 'veg-1', ['sig']),
  T('ct04', 'chay-trua', 'Cơm Nấm Kho Tiêu', 'Peppered Braised Mushroom', 'Nấm đùi gà kho tiêu sọ Phú Quốc, dưa leo, canh bí.', 62000, 'tofu-3', ['vegan']),
  T('ct05', 'chay-trua', 'Cơm Cà Ri Rau Củ', 'Vegetable Curry Rice', 'Cà ri nước cốt dừa, khoai lang, đậu hũ, sả.', 62000, 'tofu-2', ['vegan']),
  T('ct06', 'chay-trua', 'Bún Trộn Chả Giò Chay', 'Vermicelli & Spring Roll Bowl', 'Bún, chả giò khoai môn, rau sống, nước mắm chay chua ngọt.', 59000, 'noodle-4', ['best', 'vegan']),
  T('ct07', 'chay-trua', 'Bún Riêu Chay', 'Tomato Tofu Noodle Soup', 'Riêu đậu hũ non, cà chua, đậu bắp, rau muống chẻ.', 55000, 'noodle-5', ['vegan']),
  T('ct08', 'chay-trua', 'Miến Xào Rau Củ', 'Stir-fried Glass Noodles', 'Miến dong, nấm mèo, cà rốt, cải thìa.', 55000, 'noodle-2', ['vegan']),
  T('ct09', 'chay-trua', 'Mì Xào Giòn Chay', 'Crispy Noodles', 'Mì chiên giòn, rau củ xào sốt nấm.', 62000, 'noodle-3', ['vegan']),
  T('ct10', 'chay-trua', 'Lẩu Nấm Mini (1 người)', 'Mushroom Hot Pot for One', '6 loại nấm, nước dùng củ quả, bún tươi, rau.', 89000, 'veg-noodle', ['vegan', 'hot', 'new']),
  T('ct11', 'chay-trua', 'Salad Bơ Đậu Hũ Mè Rang', 'Avocado Tofu Salad', 'Rau hữu cơ Đà Lạt, bơ, đậu hũ, sốt mè rang.', 65000, 'tofu-1', ['vegan', 'new']),
  T('ct12', 'chay-trua', 'Hộp Cơm Văn Phòng', 'Office Lunch Box', '3 món thay đổi mỗi ngày, cơm gạo lứt, canh, tráng miệng.', 69000, 'bento', ['sig', 'vegan']),
];

export const toppings = [
  ['Trân châu đen', 8000], ['Trân châu trắng ngọc trai', 8000], ['Trân châu đường đen', 10000], ['Thạch ô long', 10000],
  ['Thạch đào', 8000], ['Pudding trứng', 10000], ['Kem cheese', 12000], ['Kem mây (sữa tươi đánh bông)', 12000],
  ['Đậu đỏ', 8000], ['Hạt sen', 10000], ['Nha đam', 8000], ['Thạch dừa', 8000],
];

export const combos = [
  { name: 'Sáng An Lành', items: 'Phở chay hoặc Bún Huế chay + Trà lài nóng', price: 69000 },
  { name: 'Trưa Văn Phòng', items: 'Hộp cơm văn phòng + Ô long lạnh nguyên vị (M)', price: 89000 },
  { name: 'Chiều Trà Bánh', items: 'Ô long sữa kem mây (M) + Basque cheesecake', price: 99000 },
  { name: 'Hẹn Hò Hai Người', items: '2 trà sữa (M) + Macaron hộp 6', price: 169000 },
];

if (items.length !== 115) throw new Error(`Menu must have 115 items, has ${items.length}`);
