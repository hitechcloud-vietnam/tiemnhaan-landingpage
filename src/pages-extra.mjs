import { site } from './data/site.mjs';
import { icon, img, tel, SZ } from './layout.mjs';
import { head, signup, salaryCards, JOBS, branchCards, contactStrip } from './pages.mjs';

const sparkles = (n = 18) =>
  `<div class="sparkles" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--y:${(i * 53) % 100}%;--d:${(i % 6) * 0.7}s;--s:${4 + (i % 4) * 2}px"></i>`).join('')}</div>`;

const lanterns = (n = 9) =>
  `<div class="lanterns" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<span class="lantern lantern--${i % 3}" style="--x:${6 + i * 11}%;--h:${40 + ((i * 29) % 70)}px;--d:${(i % 5) * 0.6}s"></span>`).join('')}</div>`;

const dishGrid = (list) => `
<div class="dishes">
  ${list.map(([k, name, en, desc, tag]) => `
  <article class="rdish">
    <div class="rdish__media">${img(k, name, { sizes: SZ.card3 })}${tag ? `<span class="rdish__tag">${tag}</span>` : ''}</div>
    <div class="rdish__body"><h3>${name}</h3><p class="rdish__en">${en}</p><p>${desc}</p></div>
  </article>`).join('')}
</div>`;

const regionBranches = (id) => {
  const r = site.regions.find((x) => x.id === id);
  return `
<section class="section" id="chi-nhanh">
  <div class="wrap">
    ${head('Chi nhánh', `${site.branches.filter((b) => b.region === id).length} căn nhà tại <em>${r.name}</em>`, 'Địa chỉ và ngày khai trương sẽ được công bố sớm. Đăng ký nhận tin để là người đầu tiên biết.')}
    ${branchCards(site.branches.filter((b) => b.region === id))}
  </div>
</section>`;
};

// ───────────────────────── SÀI GÒN ─────────────────────────
export function saigon() {
  return `
<section class="rhero rhero--saigon">
  ${img('lm-benthanh-night', 'Chợ Bến Thành về đêm', { cls: 'rhero__bg', eager: true, sizes: '100vw' })}
  ${sparkles(24)}
  <div class="wrap rhero__in">
    <p class="eyebrow">Nhà An Sài Gòn</p>
    <h1>Sài Gòn <em>hoa lệ</em>,<br>một ly trà an</h1>
    <p class="lead">Giữa nhịp phố không ngủ, hai căn nhà của Nhà An là chỗ để bạn chậm lại: một ly bạc xỉu ô long, ổ bánh mì chay giòn rụm và góc sen xanh mát giữa lòng thành phố.</p>
    <div class="hero__cta"><a class="btn btn--pink btn--lg" href="#chi-nhanh">2 chi nhánh Sài Gòn ${icon('arrow')}</a><a class="btn btn--light btn--lg" href="#dang-ky">Nhận tin khai trương</a></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Vị Sài Gòn', 'Những món mang <em>chất Sài Gòn</em>', 'Món đặc trưng chỉ có tại hai chi nhánh Bình Thạnh và Tân Bình, lấy cảm hứng từ ly cà phê vỉa hè và gánh hàng rong quen thuộc.')}
    ${dishGrid([
      ['phin-1', 'Bạc xỉu ô long', 'Oolong Bạc Xỉu', 'Bạc xỉu Sài Gòn thêm một shot ô long rang củi, béo mà thanh.', 'Chỉ có ở Sài Gòn'],
      ['iced-tea', 'Trà tắc xí muội', 'Kumquat & Salted Plum Tea', 'Ly trà đá vỉa hè nâng cấp: tắc tươi, xí muội, ô long thanh.', ''],
      ['phin-2', 'Cà phê phin muối', 'Salted Cream Phin Coffee', 'Phin Robusta đậm, lớp kem muối mằn mặn kiểu Sài Gòn mới.', 'Bán chạy'],
      ['saigon-vendor', 'Xôi bắp gánh', 'Corn Sticky Rice', 'Xôi bắp đậu xanh, mỡ hành chay, mè đậu phộng như gánh xôi đầu hẻm.', ''],
      ['pho-chay', 'Hủ tiếu Nam Vang chay', 'Vegetarian Phnom Penh Noodles', 'Nước lèo củ cải ngọt thanh, nấm, tàu hũ ky, hẹ.', ''],
      ['milktea-bottles', 'Trà sữa chai Sài Gòn', 'Bottled Milk Tea', 'Trà sữa đóng chai mang đi cho những ngày kẹt xe.', 'Mang đi'],
    ])}
  </div>
</section>

<div class="mq-wrap"><div class="marquee marquee--sunset"><div class="marquee__track">
${Array(2).fill(['Phố đi bộ', 'Cà phê phin', 'Gạch bông', 'Vespa xưa', 'Chợ Bến Thành', 'Hẻm nhỏ', 'Đèn đường', 'Sài Gòn lên đèn'].map((m) => `<span>${m}</span><i>✦</i>`).join('')).join('')}
</div></div></div>

<section class="section section--night">
  ${sparkles(30)}
  <div class="wrap">
    ${head('Sài Gòn trong mắt Nhà An', 'Phố xưa, <em>đèn mới</em>')}
    <div class="gallery">
      ${[
        ['lm-landmark81-night', 'Landmark 81 về đêm', 'g--wide'],
        ['lm-notre-dame', 'Nhà thờ Đức Bà', 'g--tall'],
        ['saigon-night-street', 'Phố đêm Sài Gòn', ''],
        ['lm-landmark81-fountain', 'Nhạc nước Vinhomes Central Park', ''],
        ['lm-postoffice', 'Bưu điện Trung tâm', 'g--tall'],
        ['lm-saigon-bridge', 'Cầu Sài Gòn', 'g--wide'],
        ['phin-1', 'Cà phê phin', ''],
        ['cafe-bright', 'Tiệm trà gạch bông', ''],
      ].map(([k, t, c]) => `<figure class="g ${c}">${img(k, t, { sizes: c.includes('wide') ? undefined : SZ.tile })}<figcaption>${t}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Một ngày Sài Gòn', 'Nhịp sống <em>không ngủ</em>')}
    <ol class="rtimeline">
      <li><span>06:30</span><h3>Sáng sớm</h3><p>Ổ bánh mì chay pa-tê nấm, ly cà phê phin trước giờ vào làm.</p></li>
      <li><span>11:30</span><h3>Trưa văn phòng</h3><p>Hộp cơm chay giao tận nơi cho dân văn phòng quận trung tâm.</p></li>
      <li><span>16:00</span><h3>Chiều tan ca</h3><p>Trà tắc xí muội, bánh ngọt và chiếc ghế cạnh cửa sổ.</p></li>
      <li><span>20:00</span><h3>Tối lên đèn</h3><p>Acoustic cuối tuần, trà trái cây và hội bạn thân.</p></li>
    </ol>
  </div>
</section>

${regionBranches('sai-gon')}
${signup()}
${contactStrip()}`;
}

// ───────────────────────── ĐÀ NẴNG – QUẢNG NAM ─────────────────────────
export function mientrung() {
  return `
<section class="rhero rhero--hoian">
  ${img('hoian-lanterns', 'Đèn lồng Hội An', { cls: 'rhero__bg', eager: true, sizes: '100vw' })}
  ${lanterns(9)}
  ${sparkles(28)}
  <div class="wrap rhero__in">
    <p class="eyebrow">Nhà An Đà Nẵng – Quảng Nam</p>
    <h1>Phố biển, <em>phố đèn lồng</em>,<br>một chút an</h1>
    <p class="lead">Một căn nhà gần biển Mỹ Khê, một căn nhà vàng giữa phố cổ Hội An. Ở miền Trung, Nhà An pha trà sen, nấu mì Quảng chay và thắp đèn lồng mỗi tối.</p>
    <div class="hero__cta"><a class="btn btn--pink btn--lg" href="#chi-nhanh">Đà Nẵng &amp; Hội An ${icon('arrow')}</a><a class="btn btn--light btn--lg" href="#dang-ky">Nhận tin khai trương</a></div>
  </div>
</section>

<section class="section section--sand">
  <div class="wrap">
    ${head('Vị miền Trung', 'Đậm đà <em>xứ Quảng</em>', 'Những món chay mang hồn miền Trung, chỉ có tại ba chi nhánh Đà Nẵng, Hội An và Duy Xuyên.')}
    ${dishGrid([
      ['mi-quang', 'Mì Quảng chay', 'Vegetarian Quang Noodles', 'Sợi mì vàng nghệ, nấm, đậu phộng rang, bánh tráng mè nướng giòn. Ảnh minh họa.', 'Đặc sản'],
      ['banh-xeo', 'Bánh xèo chay miền Trung', 'Central-style Crispy Pancake', 'Bánh nhỏ đổ khuôn đất, nhân giá nấm, cuốn rau rừng chấm tương đậu.', ''],
      ['lotus', 'Trà sen Hội An', 'Hoi An Lotus Tea', 'Ô long ướp sen thả trong ấm gốm Thanh Hà, uống bên đèn lồng.', 'Chỉ có ở Hội An'],
      ['mykhe-1', 'Ô long biển xanh', 'Sea Breeze Cold-brew Oolong', 'Ô long pha lạnh, thơm, chanh dây Quảng Nam và muối biển Sa Huỳnh.', 'Chỉ có ở Đà Nẵng'],
      ['tea-flatlay', 'Trà gừng Trà Quế', 'Ginger Tea with Tra Que Herbs', 'Gừng, sả, húng quế làng rau Trà Quế, ấm bụng ngày mưa miền Trung.', ''],
      ['pannacotta', 'Chè bắp Cẩm Nam', 'Cam Nam Sweet Corn Pudding', 'Bắp nếp Cẩm Nam nấu nước cốt dừa, món ngọt quen của người Hội An.', ''],
    ])}
  </div>
</section>

<div class="mq-wrap"><div class="marquee marquee--sea"><div class="marquee__track">
${Array(2).fill(['Biển Mỹ Khê', 'Cầu Rồng', 'Cầu Vàng Bà Nà', 'Phố cổ Hội An', 'Đèn lồng', 'Sông Hoài', 'Làng rau Trà Quế', 'Mì Quảng'].map((m) => `<span>${m}</span><i>✦</i>`).join('')).join('')}
</div></div></div>

<section class="section section--lantern">
  ${lanterns(7)}
  ${sparkles(30)}
  <div class="wrap">
    ${head('Miền Trung trong mắt Nhà An', 'Lung linh <em>đêm phố cổ</em>')}
    <div class="gallery">
      ${[
        ['lm-dragon-night', 'Cầu Rồng về đêm', 'g--wide'],
        ['lm-japanese-bridge', 'Chùa Cầu, Hội An', 'g--tall'],
        ['lm-linhung-stairs', 'Chùa Linh Ứng', ''],
        ['lm-nguhanhson', 'Ngũ Hành Sơn', ''],
        ['lm-mykhe', 'Biển Mỹ Khê', 'g--wide'],
        ['lm-hoian-lanterns', 'Đèn lồng Hội An', 'g--tall'],
        ['golden-bridge', 'Cầu Vàng Bà Nà', ''],
        ['lm-myson-aerial', 'Thánh địa Mỹ Sơn', ''],
      ].map(([k, t, c]) => `<figure class="g ${c}">${img(k, t, { sizes: c.includes('wide') ? undefined : SZ.tile })}<figcaption>${t}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap two-cities">
    <article class="city city--sea">
      ${img('lm-mykhe', 'Biển Mỹ Khê, Đà Nẵng')}
      <div class="city__body"><span class="pill pill--soon">${icon('pin')} Đà Nẵng</span><h3>Thành phố biển</h3><p>Sáng đi biển Mỹ Khê, ghé Nhà An ăn tô mì Quảng chay, chiều ngồi ban công uống ô long pha lạnh nhìn hoàng hôn trên sông Hàn.</p></div>
    </article>
    <article class="city city--lantern">
      ${img('lm-japanese-bridge-2', 'Phố cổ Hội An')}
      <div class="city__body"><span class="pill pill--soon">${icon('pin')} Hội An, Quảng Nam</span><h3>Phố đèn lồng</h3><p>Căn nhà vàng giữa phố cổ. Tối đến thắp đèn lồng, pha trà sen, thả hoa đăng trên sông Hoài cùng khách ghé thăm.</p></div>
    </article>
  </div>
</section>

${regionBranches('mien-trung')}
${signup()}
${contactStrip()}`;
}

// ───────────────────────── TUYỂN DỤNG ─────────────────────────
export function hiring() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Tuyển dụng</p>
      <h1>Về làm nhà với <em>Nhà An</em></h1>
      <p class="lead">Nhà An đang tìm những người bạn đồng hành cho 5 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam. Không cần kinh nghiệm, chỉ cần thật lòng và chăm chỉ, Nhà An sẽ đào tạo từ đầu.</p>
      <div class="hero__cta">
        <a class="btn btn--primary btn--lg" href="#ung-tuyen">Ứng tuyển ngay ${icon('arrow')}</a>
        <a class="btn btn--ghost btn--lg" href="${site.social.zalo}" target="_blank" rel="noopener">Nhắn Zalo ${site.phoneDisplay}</a>
      </div>
    </div>
    <figure class="phero__img">${img('friends-laptop', 'Đồng nghiệp trò chuyện', { eager: true })}</figure>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Mức lương', 'Thu nhập rõ ràng, <em>quyền lợi đầy đủ</em>')}
    ${salaryCards()}
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    ${head('Vị trí đang tuyển', 'Chọn vị trí <em>hợp với bạn</em>', 'Tuyển cho cả 5 chi nhánh: Bình Thạnh, Tân Bình, Đà Nẵng, Hội An và Duy Xuyên.')}
    <ul class="jobs jobs--wide">
      ${JOBS.map(([j, t, pay]) => `<li><div><strong>${j}</strong><span>${t} · Sài Gòn / Đà Nẵng / Hội An / Duy Xuyên</span></div><b class="jobs__pay">${pay}</b><a class="link" href="#ung-tuyen" data-job="${j} (${t})">Ứng tuyển ${icon('arrow')}</a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Phúc lợi', 'Ở Nhà An, bạn được gì?')}
    <div class="promise">
      <div>${icon('card')}<h3>Lương đúng hẹn</h3><p>Part-time 30.000 – 35.000đ/giờ, chính thức 10 – 15 triệu/tháng.</p></div>
      <div>${icon('heart')}<h3>BHXH, BHYT đầy đủ</h3><p>Nhân viên chính thức được đóng bảo hiểm theo quy định.</p></div>
      <div>${icon('sprout')}<h3>Đào tạo từ đầu</h3><p>Pha chế, làm bánh, nấu chay, phục vụ, có người kèm cặp.</p></div>
      <div>${icon('star')}<h3>Lộ trình thăng tiến</h3><p>Từ nhân viên lên ca trưởng, quản lý cửa hàng.</p></div>
      <div>${icon('bowl')}<h3>Ăn uống trong ca</h3><p>Đồ uống và bữa ăn chay miễn phí trong ca làm.</p></div>
      <div>${icon('clock')}<h3>Ca linh hoạt</h3><p>Đăng ký ca theo tuần, phù hợp sinh viên.</p></div>
      <div>${icon('gift')}<h3>Thưởng lễ Tết</h3><p>Thưởng theo kết quả kinh doanh và dịp lễ.</p></div>
      <div>${icon('users')}<h3>Đội ngũ ấm áp</h3><p>Môi trường trẻ, tử tế, như một gia đình.</p></div>
    </div>
  </div>
</section>

<section class="section section--green" id="ung-tuyen">
  <div class="wrap apply-wrap">
    <div>
      <p class="eyebrow">Ứng tuyển</p>
      <h2>Gửi thông tin cho <em>Nhà An</em></h2>
      <ol class="how">
        <li><span>1</span>Điền form hoặc gửi CV tới ${site.email}</li>
        <li><span>2</span>Nhà An gọi lại hẹn phỏng vấn trong 3 ngày làm việc</li>
        <li><span>3</span>Học việc có hướng dẫn, nhận lương từ ngày đầu</li>
      </ol>
      <p>Hoặc gọi, nhắn Zalo <a class="link link--light" href="tel:${tel()}">${site.phoneDisplay}</a></p>
    </div>
    <form class="form" data-form="apply" novalidate>
      <div class="form__row">
        <label>Họ và tên<input name="name" autocomplete="name" required></label>
        <label>Số điện thoại / Zalo<input name="contact" autocomplete="tel" required></label>
      </div>
      <div class="form__row">
        <label>Vị trí<select name="job" id="job">${JOBS.map(([j, t]) => `<option value="${j} (${t})">${j} (${t})</option>`).join('')}</select></label>
        <label>Chi nhánh<select name="branch">${site.branches.map((b) => `<option value="${b.city}">${b.city}</option>`).join('')}</select></label>
      </div>
      <label>Năm sinh, khu vực, ca có thể làm<textarea name="message" rows="4" required placeholder="Ví dụ: 2003, Quận 3, ca tối T2–T6"></textarea></label>
      <button class="btn btn--pink btn--block" type="submit">Gửi hồ sơ ${icon('arrow')}</button>
    </form>
  </div>
</section>`;
}
