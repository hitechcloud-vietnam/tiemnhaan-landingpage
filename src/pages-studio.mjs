import { site } from './data/site.mjs';
import { spaces, photoSpots, aodai, seasons, weekly } from './data/content.mjs';
import { icon, img, tel, SZ } from './layout.mjs';
import { head, signup, contactStrip } from './pages.mjs';

const AREAS = [
  'Bàn thường',
  ...spaces.map((s) => s.name),
  'Studio áo dài',
  'Góc check-in',
  'Tiệc sinh nhật / sự kiện',
];

// Form đặt bàn dùng chung
export const reserveForm = (title = 'Đặt bàn tại Nhà An', preset = '') => `
<form class="form form--reserve" data-form="reserve" novalidate>
  <h2>${title}</h2>
  <div class="form__row">
    <label>Chi nhánh<select name="branch">${site.branches.map((b) => `<option value="${b.city}">${b.city}</option>`).join('')}</select></label>
    <label>Khu vực<select name="area" id="area">${AREAS.map((a) => `<option value="${a}"${a === preset ? ' selected' : ''}>${a}</option>`).join('')}</select></label>
  </div>
  <div class="form__row form__row--3">
    <label>Ngày<input type="date" name="date" required></label>
    <label>Giờ (24/7)<input type="time" name="time" required></label>
    <label>Số khách<input type="number" name="people" min="1" max="50" value="2" required></label>
  </div>
  <div class="form__row">
    <label>Họ và tên<input name="name" autocomplete="name" required></label>
    <label>Số điện thoại / Zalo<input name="contact" autocomplete="tel" required></label>
  </div>
  <label>Ghi chú<textarea name="message" rows="3" placeholder="Ví dụ: cần ổ cắm, ngồi gần cửa sổ, thuê 2 bộ áo dài size M"></textarea></label>
  <button class="btn btn--pink btn--block btn--lg" type="submit">Gửi yêu cầu đặt bàn ${icon('arrow')}</button>
  <p class="form__note">Nhà An gọi lại xác nhận trong 15 phút (24/7). Đặt nhanh: <a href="tel:${tel()}">${site.phoneDisplay}</a> · <a href="${site.social.zalo}" target="_blank" rel="noopener">Zalo</a></p>
</form>`;

// Dải 24/7 cho trang chủ
export const open247Band = () => `
<section class="band247">
  <div class="wrap band247__in">
    <div class="band247__clock" aria-hidden="true"><b>24</b><span>/7</span></div>
    <div class="band247__text">
      <p class="eyebrow">Mở cửa 24/7</p>
      <h2>Ngày hay đêm, <em>Nhà An vẫn sáng đèn</em></h2>
      <p>Cả 5 chi nhánh mở cửa 24 giờ mỗi ngày, kể cả lễ Tết. Sáng điểm tâm chay, trưa cơm văn phòng, chiều trà bánh, đêm chạy deadline với món chay khuya.</p>
    </div>
    <div class="band247__cta">
      <a class="btn btn--pink btn--lg" href="/dat-ban">${icon('calendar')} Đặt bàn ngay</a>
      <a class="btn btn--light" href="/khong-gian#deadline">Phòng Chạy Deadline</a>
    </div>
  </div>
</section>`;

// Khối studio + sự kiện cho trang chủ
export const studioTeaser = () => `
<section class="section section--studio">
  <div class="wrap studio-teaser">
    <div class="studio-teaser__imgs">
      ${img('aodai-lotus', 'Chụp áo dài bên đầm sen', { cls: 'st-a' })}
      ${img('flower-wall', 'Tường hoa', { cls: 'st-b' })}
      ${img('tet-blossom', 'Set chụp Tết', { cls: 'st-c' })}
      <span class="sticker sticker--a sticker--narrow">Studio áo dài</span>
    </div>
    <div>
      <p class="eyebrow">Studio áo dài &amp; Góc check-in</p>
      <h2>Lưu giữ khoảnh khắc <em>trong tà áo dài</em></h2>
      <p class="lead">Cho thuê áo dài, phòng studio riêng, thợ ảnh và trang điểm. Thêm 6 góc check-in từ tường hoa, góc sen đến góc đèn lồng, set trang trí đổi theo Tết và mỗi mùa lễ.</p>
      <ul class="checks checks--lg">
        <li>Áo dài truyền thống, cách tân, áo dài đôi, trẻ em</li>
        <li>Set chụp Tết, Trung thu, Valentine, Giáng sinh</li>
        <li>In ảnh polaroid lấy liền tại quầy</li>
      </ul>
      <div class="party__btns">
        <a class="btn btn--primary" href="/chup-anh">Khám phá Studio áo dài ${icon('arrow')}</a>
        <a class="btn btn--ghost" href="/su-kien">Lịch lễ Tết &amp; sự kiện</a>
      </div>
    </div>
  </div>
</section>`;

export const seasonStrip = () => `
<section class="section section--cream">
  <div class="wrap">
    ${head('Lễ Tết & sự kiện', 'Mỗi mùa một <em>câu chuyện</em>', 'Trang trí, set chụp ảnh và hoạt động thay đổi theo từng dịp lễ trong năm.')}
    <div class="seasons seasons--strip">
      ${seasons.map((s) => `<a class="season" href="/su-kien#${s.id}">${img(s.img, s.name, { sizes: SZ.small })}<span class="season__body"><small>${s.month}</small><strong>${s.name}</strong></span></a>`).join('')}
    </div>
    <div class="center"><a class="btn btn--primary" href="/su-kien">Xem lịch sự kiện ${icon('arrow')}</a></div>
  </div>
</section>`;

// ───────────────────────── STUDIO & SỐNG ẢO ─────────────────────────
export function studio() {
  return `
<section class="rhero rhero--aodai">
  ${img('aodai-lantern', 'Chụp ảnh áo dài với đèn lồng', { cls: 'rhero__bg', eager: true, sizes: '100vw' })}
  <div class="wrap rhero__in">
    <p class="eyebrow">Studio áo dài &amp; Góc check-in</p>
    <h1>Tà áo dài<br><em>giữa hương trà</em></h1>
    <p class="lead">Cho thuê áo dài, phòng studio riêng, thợ ảnh và trang điểm, cùng 6 góc check-in trong tiệm. Set trang trí đổi theo Tết, Trung thu, Valentine, Giáng sinh.</p>
    <div class="hero__cta"><a class="btn btn--pink btn--lg" href="#dat-lich">Đặt lịch chụp ${icon('arrow')}</a><a class="btn btn--light btn--lg" href="#check-in">6 góc check-in</a></div>
  </div>
</section>

<section class="section" id="ao-dai">
  <div class="wrap">
    ${head('Studio áo dài', 'Áo dài cho mọi <em>khoảnh khắc</em>', 'Chụp kỷ yếu, ảnh Tết, ảnh đôi, ảnh gia đình hay chỉ đơn giản là lưu lại một ngày đẹp trời ở Nhà An.')}
    <div class="aodai-gallery">
      ${[['aodai-tet', 'g--tall'], ['aodai-blue', 'g--wide'], ['aodai-duo', ''], ['aodai-steps', ''], ['aodai-lake', 'g--wide g--top']]
        .map(([k, c]) => `<figure class="g ${c}">${img(k, 'Chụp ảnh áo dài', { sizes: c.includes('wide') ? undefined : SZ.tile })}</figure>`).join('')}
    </div>
    <div class="services">
      ${aodai.services.map(([t, d, ic]) => `<div class="service">${icon(ic)}<h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    ${head('Gói chụp', 'Chọn gói <em>hợp với bạn</em>', 'Liên hệ để nhận báo giá theo số người, khung giờ và mùa lễ.')}
    <div class="packages">
      ${aodai.packages.map((p) => `
      <article class="package${p.hot ? ' package--hot' : ''}">
        ${p.hot ? '<span class="package__badge">Được chọn nhiều</span>' : ''}
        <h3>${p.name}</h3>
        <p class="package__who">${icon('users')} ${p.who}</p>
        <ul class="checks">${p.items.map((x) => `<li>${x}</li>`).join('')}</ul>
        <a class="btn ${p.hot ? 'btn--pink' : 'btn--ghost'} btn--block" href="#dat-lich" data-area="Studio áo dài">Nhận báo giá &amp; đặt lịch</a>
      </article>`).join('')}
    </div>
    <ol class="flow">${aodai.steps.map((t, i) => `<li><span>${i + 1}</span>${t}</li>`).join('')}</ol>
  </div>
</section>

<section class="section section--night" id="check-in">
  <div class="wrap">
    ${head('Góc check-in', '6 góc chụp ảnh <em>đẹp nhất</em> Nhà An', 'Được thiết kế cho khách của tiệm, mở cửa đón bạn cả ngày lẫn đêm.')}
    <div class="spots" tabindex="0" role="region" aria-label="6 góc check-in">
      ${photoSpots.map((p, i) => `
      <article class="spot">
        ${img(p.img, p.name, { sizes: SZ.card3 })}
        <div class="spot__body"><span class="spot__n">0${i + 1}</span><h3>${p.name}</h3><p>${p.desc}</p><small>${icon('sun')} ${p.tip}</small></div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Set chụp theo mùa', 'Tết, Trung thu, <em>Giáng sinh</em>')}
    <div class="seasons seasons--strip">
      ${seasons.filter((s) => ['tet', 'valentine', 'trung-thu', '20-10', 'noel'].includes(s.id)).map((s) => `<a class="season" href="/su-kien#${s.id}">${img(s.img, s.name, { sizes: SZ.small })}<span class="season__body"><small>${s.month}</small><strong>${s.name}</strong></span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--cream" id="dat-lich">
  <div class="wrap apply-wrap apply-wrap--light">
    <div>
      <p class="eyebrow">Đặt lịch chụp</p>
      <h2>Giữ một khung giờ <em>thật đẹp</em></h2>
      <p class="lead">Chọn chi nhánh, ngày giờ và số người. Nhà An sẽ gọi lại tư vấn mẫu áo, size và gửi báo giá.</p>
      <ul class="checks checks--lg"><li>Studio mở cửa 24/7, nên đặt trước dịp lễ Tết</li><li>Nhận chụp nhóm, gia đình, kỷ yếu</li><li>Ảnh gửi qua Zalo hoặc Google Drive</li></ul>
    </div>
    ${reserveForm('Đặt lịch chụp ảnh', 'Studio áo dài')}
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── LỄ TẾT & SỰ KIỆN ─────────────────────────
export function events() {
  return `
<section class="rhero rhero--tet">
  ${img('tet-fireworks', 'Pháo hoa năm mới', { cls: 'rhero__bg', eager: true, sizes: '100vw' })}
  <div class="wrap rhero__in">
    <p class="eyebrow">Lễ Tết &amp; sự kiện</p>
    <h1>Một năm ở Nhà An,<br><em>mùa nào cũng vui</em></h1>
    <p class="lead">Từ Tết Nguyên Đán, Trung thu đến Giáng sinh, Nhà An thay áo mới cho tiệm, mở set chụp áo dài, workshop và những đêm nhạc. Và vì mở cửa 24/7, Nhà An đón cả những phút giao thừa cùng bạn.</p>
    <div class="hero__cta"><a class="btn btn--pink btn--lg" href="#lich">Lịch sự kiện ${icon('arrow')}</a><a class="btn btn--light btn--lg" href="/dat-ban">Đặt bàn dịp lễ</a></div>
  </div>
</section>

<section class="section" id="lich">
  <div class="wrap">
    ${head('Lịch cả năm', 'Mỗi mùa một <em>câu chuyện</em>')}
    <div class="calendar">
      ${seasons.map((s, i) => `
      <article class="cal${i % 2 ? ' cal--rev' : ''}" id="${s.id}">
        <div class="cal__media">${img(s.img, s.name)}<span class="cal__month">${s.month}</span></div>
        <div class="cal__body">
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <ul class="tags">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${head('Mỗi tuần', 'Lịch hoạt động <em>hằng tuần</em>')}
    <div class="weekly">
      ${weekly.map(([d, t, p]) => `<div class="week"><span class="week__day">${d}</span><h3>${t}</h3><p>${p}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap party-wrap"><div class="party">
    <div class="party__media">${img('night-acoustic', 'Đêm nhạc acoustic')}</div>
    <div class="party__body">
      <p class="eyebrow">Tổ chức sự kiện</p>
      <h2>Sinh nhật, họp lớp, <em>ra mắt sản phẩm</em></h2>
      <p>Sân Rôm Rả và Phòng Họp Hanh Thông nhận tổ chức sự kiện nhỏ đến 50 khách: sinh nhật, họp lớp, workshop, buổi ra mắt, tiệc công ty. Có hỗ trợ trang trí, âm thanh và set trà bánh.</p>
      <div class="party__btns">
        <a class="btn btn--pink" href="/dat-ban#dat-ban" data-area="Tiệc sinh nhật / sự kiện">${icon('calendar')} Đặt sự kiện</a>
        <a class="btn btn--ghost" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a>
      </div>
    </div>
  </div></div>
</section>
${signup()}`;
}

// ───────────────────────── ĐẶT BÀN ─────────────────────────
export function reserve() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Đặt bàn · 24/7</p>
      <h1>Giữ chỗ ở <em>Nhà An</em></h1>
      <p class="lead">Đặt bàn thường, bàn nhóm, phòng họp, chỗ chạy deadline, studio áo dài hay tiệc sự kiện. Nhà An mở cửa 24/7 nên bạn đặt giờ nào cũng được.</p>
      <div class="quick">
        <a class="quick__c" href="tel:${tel()}">${icon('phone')}<span><small>Gọi đặt bàn</small><strong>${site.phoneDisplay}</strong></span></a>
        <a class="quick__c" href="${site.social.zalo}" target="_blank" rel="noopener"><b class="zalo-txt">Zalo</b><span><small>Nhắn Zalo</small><strong>${site.phoneDisplay}</strong></span></a>
      </div>
    </div>
    <figure class="phero__img">${img('cafe-long', 'Bàn dài ở Nhà An', { eager: true })}</figure>
  </div>
</section>

<section class="section section--tight" id="dat-ban">
  <div class="wrap reserve">
    ${reserveForm()}
    <div class="reserve__side">
      <div class="infocard">
        <h3>Chọn khu phù hợp</h3>
        <ul class="area-list">
          <li>${icon('cup')}<span><strong>Bàn thường</strong>Uống trà, ăn sáng, ăn trưa</span></li>
          ${spaces.map((s) => `<li>${icon(s.icon)}<span><strong>${s.name}</strong>${s.best}</span></li>`).join('')}
          <li>${icon('camera')}<span><strong>Studio áo dài</strong>Thuê áo dài, chụp ảnh, trang điểm</span></li>
          <li>${icon('gift')}<span><strong>Tiệc &amp; sự kiện</strong>Sinh nhật, họp lớp, đến 50 khách</span></li>
        </ul>
      </div>
      <div class="infocard">
        <h3>Giờ phục vụ</h3>
        <ul class="hours">${site.hours.map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`).join('')}</ul>
      </div>
      <div class="infocard infocard--note">
        <h3>Lưu ý</h3>
        <ul class="checks"><li>Giữ bàn 15 phút sau giờ hẹn</li><li>Nhóm từ 10 người, tiệc và studio nên đặt trước 1 ngày</li><li>Dịp lễ Tết nên đặt sớm</li></ul>
      </div>
    </div>
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── HỢP TÁC & DOANH NGHIỆP ─────────────────────────
const B2B = [
  ['briefcase', 'Tiệc trà văn phòng', 'Set trà, bánh ngọt và món chay giao tận nơi cho buổi họp, hội nghị, tea break. Nhận đơn từ 10 phần, xuất hóa đơn VAT.', 'tea-flatlay'],
  ['gift', 'Quà tặng doanh nghiệp', 'Hộp quà trà ô long, bánh và mứt cho dịp Tết, Trung thu, tri ân khách hàng. In logo và thiệp theo yêu cầu.', 'macarons'],
  ['users', 'Thuê không gian sự kiện', 'Phòng Họp Hanh Thông và Sân Rôm Rả cho workshop, đào tạo nội bộ, ra mắt sản phẩm, team building đến 50 khách.', 'cowork-team'],
  ['laptop', 'Gói làm việc cho đội nhóm', 'Gói chỗ ngồi theo tháng tại Phòng Chạy Deadline cho startup, freelancer và đội làm việc từ xa, mở cửa 24/7.', 'cowork-space'],
  ['leaf', 'Đối tác nguyên liệu', 'Nhà An tìm nông hộ trà, rau hữu cơ, trái cây theo mùa và làng nghề thủ công để hợp tác lâu dài.', 'tea-leaves'],
  ['camera', 'Truyền thông & nhà sáng tạo', 'Hợp tác với báo chí, nhà sáng tạo nội dung và thương hiệu có cùng giá trị: sống xanh, văn hóa Việt, ẩm thực chay.', 'aodai-lantern'],
];

export function partners() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Hợp tác &amp; Doanh nghiệp</p>
      <h1>Cùng Nhà An <em>lan tỏa sự an lành</em></h1>
      <p class="lead">Tiệc trà văn phòng, quà tặng doanh nghiệp, không gian sự kiện, gói làm việc cho đội nhóm và cơ hội trở thành đối tác cung cấp nguyên liệu của Tiệm Nhà An.</p>
      <div class="hero__cta"><a class="btn btn--primary btn--lg" href="#lien-he-hop-tac">Gửi đề xuất hợp tác ${icon('arrow')}</a><a class="btn btn--ghost btn--lg" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a></div>
    </div>
    <figure class="phero__img">${img('meet-team', 'Họp bàn hợp tác', { eager: true })}</figure>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Hình thức hợp tác', 'Nhà An có thể <em>đồng hành cùng bạn</em>')}
    <div class="offers offers--3">
      ${B2B.map(([ic, t, d, k]) => `<article class="offer">${img(k, t, { sizes: SZ.card3 })}<div>${icon(ic)}<h3>${t}</h3><p>${d}</p></div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${head('Vì sao chọn Nhà An', 'Đối tác <em>tin cậy</em>')}
    <div class="promise promise--dark">
      <div>${icon('clock')}<h3>Phục vụ 24/7</h3><p>5 chi nhánh mở cửa xuyên ngày đêm, kể cả lễ Tết.</p></div>
      <div>${icon('leaf')}<h3>Nguyên liệu rõ nguồn gốc</h3><p>Trà từ nông hộ Việt, rau hữu cơ, không bột ngọt.</p></div>
      <div>${icon('card')}<h3>Hóa đơn đầy đủ</h3><p>Hợp đồng, báo giá và hóa đơn VAT cho doanh nghiệp.</p></div>
      <div>${icon('pin')}<h3>Hai miền, năm điểm</h3><p>Sài Gòn, Đà Nẵng, Hội An và Duy Xuyên.</p></div>
    </div>
  </div>
</section>

<section class="section section--cream" id="lien-he-hop-tac">
  <div class="wrap apply-wrap apply-wrap--light">
    <div>
      <p class="eyebrow">Liên hệ hợp tác</p>
      <h2>Gửi đề xuất cho <em>Nhà An</em></h2>
      <p class="lead">Cho Nhà An biết bạn cần gì, số lượng, thời gian và chi nhánh. Bộ phận hợp tác sẽ phản hồi trong 1 ngày làm việc.</p>
      <ul class="info">
        <li>${icon('mail')}<span><strong>Email</strong><a href="mailto:${site.email}?subject=${encodeURIComponent('Hợp tác với Tiệm Nhà An')}">${site.email}</a></span></li>
        <li>${icon('phone')}<span><strong>Hotline / Zalo</strong><a href="tel:${tel()}">${site.phoneDisplay}</a></span></li>
      </ul>
    </div>
    <form class="form" data-form="contact" novalidate>
      <h2>Đề xuất hợp tác</h2>
      <div class="form__row">
        <label>Họ và tên<input name="name" autocomplete="name" required></label>
        <label>Email hoặc số điện thoại<input name="contact" required></label>
      </div>
      <label>Công ty / tổ chức<input name="company" autocomplete="organization"></label>
      <label>Hình thức hợp tác
        <select name="topic">${B2B.map(([, t]) => `<option value="Hợp tác: ${t}">${t}</option>`).join('')}<option value="Hợp tác: Khác">Khác</option></select>
      </label>
      <label>Nội dung<textarea name="message" rows="4" required placeholder="Ví dụ: tiệc trà 40 phần cho hội nghị ngày 15/12 tại Đà Nẵng"></textarea></label>
      <button class="btn btn--pink btn--block" type="submit">Gửi đề xuất ${icon('arrow')}</button>
    </form>
  </div>
</section>`;
}
