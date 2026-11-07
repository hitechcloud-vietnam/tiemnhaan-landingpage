import { site } from './data/site.mjs';
import { spaces, amenities, posts, faqAll } from './data/content.mjs';
import { icon, img, tel } from './layout.mjs';
import { head, signup, contactStrip } from './pages.mjs';

// Khối 4 không gian dùng ở trang chủ
export const spacesSection = () => `
<section class="section section--focus">
  <div class="wrap">
    ${head('Nơi chạy deadline của giới trẻ', 'Việc hanh thông, <em>lòng thảnh thơi</em>', 'Không chỉ là tiệm trà: mỗi chi nhánh Nhà An có không gian làm việc và học tập riêng biệt, chia thành 4 khu theo từng tâm trạng.')}
    <div class="spaces">
      ${spaces.map((s, i) => `
      <a class="space space--${s.id}" href="/khong-gian#${s.id}">
        ${img(s.img, s.name)}
        <div class="space__body">
          <span class="space__mood">${icon(s.icon)} ${s.mood}</span>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          <span class="space__num">0${i + 1}</span>
        </div>
      </a>`).join('')}
    </div>
    <div class="amen-strip">
      ${amenities.slice(0, 4).map(([ic, t]) => `<span>${icon(ic)} ${t}</span>`).join('')}
    </div>
    <div class="center"><a class="btn btn--primary btn--lg" href="/khong-gian">Khám phá không gian ${icon('arrow')}</a></div>
  </div>
</section>`;

const bookingForm = () => `
<form class="form" data-form="booking" novalidate>
  <h2>Đặt chỗ, đặt phòng họp</h2>
  <div class="form__row">
    <label>Họ và tên<input name="name" autocomplete="name" required></label>
    <label>Số điện thoại / Zalo<input name="contact" autocomplete="tel" required></label>
  </div>
  <div class="form__row">
    <label>Khu<select name="space" id="space">${spaces.map((s) => `<option value="${s.name}">${s.name}</option>`).join('')}</select></label>
    <label>Chi nhánh<select name="branch">${site.branches.map((b) => `<option value="${b.city}">${b.city}</option>`).join('')}</select></label>
  </div>
  <div class="form__row form__row--3">
    <label>Ngày<input type="date" name="date" required></label>
    <label>Giờ<input type="time" name="time" required></label>
    <label>Số người<input type="number" name="people" min="1" max="30" value="2" required></label>
  </div>
  <label>Ghi chú<textarea name="message" rows="3" placeholder="Ví dụ: cần màn hình trình chiếu, họp 2 tiếng"></textarea></label>
  <button class="btn btn--pink btn--block" type="submit">Gửi yêu cầu đặt chỗ ${icon('arrow')}</button>
  <p class="form__note">Nhà An sẽ gọi lại xác nhận. Đặt nhanh qua Zalo <a href="${site.social.zalo}" target="_blank" rel="noopener">${site.phoneDisplay}</a></p>
</form>`;

// ───────────────────────── KHÔNG GIAN ─────────────────────────
export function spacesPage() {
  return `
<section class="rhero rhero--focus">
  ${img('cowork-cafe', 'Không gian làm việc tại Nhà An', { cls: 'rhero__bg', eager: true })}
  <div class="wrap rhero__in">
    <p class="eyebrow">Không gian làm việc &amp; học tập</p>
    <h1>Nơi chạy deadline <em>của giới trẻ</em></h1>
    <p class="lead">Việc hanh thông, lòng thảnh thơi. Bốn khu riêng biệt cho bốn tâm trạng: họp nhóm, ấm cúng, tập trung chạy deadline và rôm rả cùng hội bạn.</p>
    <nav class="jump jump--light" aria-label="Bốn khu">${spaces.map((s) => `<a href="#${s.id}">${s.name}</a>`).join('')}</nav>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('4 khu, 4 tâm trạng', 'Hôm nay bạn <em>cần gì</em>?')}
    <div class="moods">
      ${spaces.map((s, i) => `<a class="mood mood--${s.id}" href="#${s.id}"><span class="mood__n" data-n="0${i + 1}" aria-hidden="true"></span>${icon(s.icon)}<strong>${s.mood}</strong><small>${s.best}</small></a>`).join('')}
    </div>
  </div>
</section>

${spaces.map((s, i) => `
<section class="section ${i % 2 ? '' : 'section--cream'} zone-detail zone-detail--${s.id}" id="${s.id}">
  <div class="wrap zd${i % 2 ? ' zd--rev' : ''}">
    <div class="zd__media">
      ${img(s.img, s.name, { cls: 'zd__main' })}
      <div class="zd__thumbs">${s.imgs.map((k) => img(k, s.name)).join('')}</div>
    </div>
    <div class="zd__body">
      <span class="space__mood">${icon(s.icon)} ${s.mood} · ${s.en}</span>
      <h2>${s.name}</h2>
      <p class="lead">${s.desc}</p>
      <ul class="checks checks--lg">${s.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      <p class="zd__best">${icon('star')} Hợp nhất cho: <strong>${s.best}</strong></p>
      <a class="btn btn--primary" href="#dat-cho" data-space="${s.name}">Đặt chỗ khu này ${icon('arrow')}</a>
    </div>
  </div>
</section>`).join('')}

<section class="section section--green">
  <div class="wrap">
    ${head('Tiện ích', 'Mọi thứ cho một ngày <em>làm việc trọn vẹn</em>')}
    <div class="promise promise--dark promise--3">
      ${amenities.map(([ic, t, d]) => `<div>${icon(ic)}<h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap rules">
    <div>
      <p class="eyebrow">Quy tắc nhỏ</p>
      <h2>Để ai cũng <em>thoải mái</em></h2>
      <ol class="rule-list">
        <li><strong>Khu Deadline:</strong> nói nhỏ, tắt chuông, ra ngoài khi gọi điện.</li>
        <li><strong>Phòng Họp:</strong> đặt trước, đến đúng giờ, trả phòng gọn gàng.</li>
        <li><strong>Sân Rôm Rả:</strong> thoải mái nói cười, giữ âm lượng vừa phải sau 21:00.</li>
        <li><strong>Mọi khu:</strong> giữ bàn sạch, mang ly cá nhân để sống xanh cùng Nhà An.</li>
      </ol>
    </div>
    <div class="rules__img">${img('cowork-top', 'Bàn làm việc nhóm')}</div>
  </div>
</section>

<section class="section section--cream" id="dat-cho">
  <div class="wrap apply-wrap apply-wrap--light">
    <div>
      <p class="eyebrow">Đặt chỗ</p>
      <h2>Giữ chỗ cho buổi <em>chạy deadline</em> tới</h2>
      <p class="lead">Đặt phòng họp, bàn nhóm ở Sân Rôm Rả hoặc chỗ ngồi ở Phòng Chạy Deadline. Nhận đặt sau khi chi nhánh khai trương, bạn có thể gửi yêu cầu trước.</p>
      <div class="party__btns"><a class="btn btn--primary" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a><a class="btn btn--ghost" href="${site.social.zalo}" target="_blank" rel="noopener">Nhắn Zalo</a></div>
    </div>
    ${bookingForm()}
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── TIN TỨC ─────────────────────────
const postCard = (p, big = false) => `
<a class="post${big ? ' post--big' : ''}" href="/tin-tuc/${p.slug}">
  ${img(p.img, p.title)}
  <div class="post__body">
    <span class="post__meta"><b>${p.tag}</b> · <time datetime="${p.date}">${p.dateText}</time></span>
    <h2 class="post__title">${p.title}</h2>
    <p>${p.excerpt}</p>
    <span class="link">Đọc tiếp ${icon('arrow')}</span>
  </div>
</a>`;

export function news() {
  return `
<section class="phero phero--short">
  <div class="wrap">
    <p class="eyebrow">Tin tức</p>
    <h1>Chuyện nhà <em>Nhà An</em></h1>
    <p class="lead">Tin khai trương, không gian mới, workshop, tuyển dụng và những câu chuyện nhỏ từ bếp trà Nhà An.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    <div class="posts">
      ${posts.map((p, i) => postCard(p, i === 0)).join('')}
    </div>
  </div>
</section>
${signup()}`;
}

export function article(p) {
  const others = posts.filter((x) => x.slug !== p.slug);
  return `
<article class="article">
  <header class="article__head">
    <div class="wrap narrow">
      <a class="link" href="/tin-tuc">← Tin tức</a>
      <span class="post__meta"><b>${p.tag}</b> · <time datetime="${p.date}">${p.dateText}</time></span>
      <h1>${p.title}</h1>
      <p class="lead">${p.excerpt}</p>
    </div>
  </header>
  <div class="wrap article__img">${img(p.img, p.title, { eager: true })}</div>
  <div class="wrap narrow article__body">
    ${p.body.map((t) => `<p>${t}</p>`).join('')}
    <div class="share">
      <span>Chia sẻ:</span>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(site.url + '/tin-tuc/' + p.slug)}" target="_blank" rel="noopener">${icon('facebook')} Facebook</a>
      <a href="https://zalo.me/share?url=${encodeURIComponent(site.url + '/tin-tuc/' + p.slug)}" target="_blank" rel="noopener">${icon('chat')} Zalo</a>
      <button type="button" class="copy-link" data-url="${site.url}/tin-tuc/${p.slug}">${icon('card')} Sao chép liên kết</button>
    </div>
  </div>
</article>
<section class="section section--cream">
  <div class="wrap">
    ${head('Đọc thêm', 'Tin khác từ Nhà An')}
    <div class="posts posts--2">${others.map((x) => postCard(x)).join('')}</div>
  </div>
</section>`;
}

// ───────────────────────── HỎI ĐÁP ─────────────────────────
export function faqPage() {
  return `
<section class="phero phero--short">
  <div class="wrap">
    <p class="eyebrow">Hỏi đáp</p>
    <h1>Bạn hỏi, <em>Nhà An</em> trả lời</h1>
    <p class="lead">Không tìm thấy câu trả lời? Gọi hoặc nhắn Zalo ${site.phoneDisplay}, hoặc gửi email ${site.email}.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap faq-page">
    <nav class="faq-nav" aria-label="Chủ đề">${faqAll.map(([g], i) => `<a href="#faq-${i}">${g}</a>`).join('')}</nav>
    <div>
      ${faqAll.map(([g, qs], i) => `
      <div class="faq-group" id="faq-${i}">
        <h2>${g}</h2>
        <div class="faq">${qs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      </div>`).join('')}
    </div>
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── PHÁP LÝ ─────────────────────────
const legal = (title, lead, sections) => `
<section class="phero phero--short">
  <div class="wrap narrow">
    <p class="eyebrow">Thông tin pháp lý</p>
    <h1>${title}</h1>
    <p class="lead">${lead}</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap narrow legal">
    ${sections.map(([h, ps]) => `<h2>${h}</h2>${ps.map((t) => `<p>${t}</p>`).join('')}`).join('')}
    <p class="muted">Cập nhật lần cuối: 07/11/2026. Mọi thắc mắc xin gửi về ${site.email} hoặc ${site.phoneDisplay}.</p>
  </div>
</section>`;

export function privacy() {
  return legal('Chính sách bảo mật', 'Tiệm Nhà An tôn trọng và bảo vệ thông tin cá nhân của bạn khi sử dụng website tiemnhaan.com.', [
    ['1. Thông tin chúng tôi thu thập', ['Khi bạn gửi form đăng ký nhận tin, liên hệ, đặt chỗ hoặc ứng tuyển, chúng tôi thu thập các thông tin bạn cung cấp: họ tên, số điện thoại, email, chi nhánh quan tâm và nội dung lời nhắn.', 'Website không sử dụng cookie quảng cáo. Trình duyệt của bạn có thể lưu lựa chọn ngôn ngữ để lần sau hiển thị đúng.']],
    ['2. Mục đích sử dụng', ['Thông tin chỉ được dùng để phản hồi yêu cầu của bạn, xác nhận đặt chỗ, liên hệ phỏng vấn và gửi tin khai trương, sự kiện, ưu đãi khi bạn đã đăng ký.']],
    ['3. Chia sẻ thông tin', ['Tiệm Nhà An không bán hay cho thuê thông tin cá nhân. Thông tin chỉ được chia sẻ với nhà cung cấp dịch vụ gửi email phục vụ việc liên lạc, hoặc khi pháp luật yêu cầu.']],
    ['4. Lưu trữ và bảo mật', ['Thông tin được lưu trữ trong thời gian cần thiết cho mục đích nêu trên và được bảo vệ bằng các biện pháp kỹ thuật phù hợp.']],
    ['5. Quyền của bạn', ['Bạn có thể yêu cầu xem, sửa hoặc xóa thông tin cá nhân, hoặc hủy nhận tin bất kỳ lúc nào bằng cách liên hệ với chúng tôi.']],
  ]);
}

export function terms() {
  return legal('Điều khoản sử dụng', 'Khi truy cập tiemnhaan.com, bạn đồng ý với các điều khoản dưới đây.', [
    ['1. Nội dung website', ['Thông tin về chi nhánh, không gian, món, sự kiện, tuyển dụng có thể thay đổi trước khi khai trương. Hình ảnh trên website là ảnh minh họa, nguồn ảnh được ghi tại trang Tín dụng hình ảnh.']],
    ['2. Đặt chỗ và đặt tiệc', ['Yêu cầu đặt chỗ, đặt phòng họp, đặt tiệc chỉ có hiệu lực khi Nhà An gọi lại hoặc nhắn xác nhận. Vui lòng báo trước nếu thay đổi hoặc hủy.']],
    ['3. Sử dụng không gian', ['Khách hàng vui lòng tuân thủ quy tắc của từng khu, đặc biệt là giờ yên lặng tại Phòng Chạy Deadline, và giữ gìn tài sản chung.']],
    ['4. Sở hữu trí tuệ', ['Tên, logo và bộ nhận diện Tiệm Nhà An thuộc quyền sở hữu của Tiệm Nhà An. Vui lòng không sử dụng khi chưa có sự đồng ý.']],
  ]);
}
