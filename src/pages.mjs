import { site } from './data/site.mjs';
import { esc, icon, img, tel, photos } from './layout.mjs';
import { spacesSection } from './pages-more.mjs';
import { open247Band, studioTeaser, seasonStrip } from './pages-studio.mjs';
import { spaces } from './data/content.mjs';

export const head = (eyebrow, title, lead = '', cls = 'shead--center') => `
<div class="shead ${cls}">
  <p class="eyebrow">${eyebrow}</p>
  <h2>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div>`;

export const ringBadge = (text = 'TIỆM NHÀ AN • MỘT LY TRÀ • MỘT CHÚT AN • ') => `
<div class="ring" aria-hidden="true">
  <svg viewBox="0 0 120 120"><defs><path id="rp" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>
  <text><textPath href="#rp" textLength="286" lengthAdjust="spacing">${text}</textPath></text></svg>
  <img src="/assets/img/brand/logo-circle.png" alt="" width="56" height="56">
</div>`;

export const contactStrip = () => `
<section class="cstrip">
  <div class="wrap cstrip__in">
    <div><p class="eyebrow">Cần Nhà An hỗ trợ?</p><h2>Gọi, nhắn Zalo hoặc gửi email</h2></div>
    <div class="cstrip__cards">
      <a class="ccard" href="tel:${tel()}">${icon('phone')}<span><small>Hotline / Zalo</small><strong>${site.phoneDisplay}</strong></span></a>
      <a class="ccard" href="mailto:${site.email}">${icon('mail')}<span><small>Email</small><strong>${site.email}</strong></span></a>
    </div>
  </div>
</section>`;

export const signup = (id = 'dang-ky') => `
<section class="section signup" id="${id}">
  <div class="wrap signup__in">
    <div class="signup__text">
      <p class="eyebrow">Ưu đãi khai trương</p>
      <h2>Là người <em>đầu tiên</em> ghé Nhà An</h2>
      <p>Để lại thông tin, Nhà An sẽ báo bạn ngày khai trương 5 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam, kèm <strong>ưu đãi khai trương dành riêng</strong> cho người đăng ký sớm.</p>
      <ul class="ticks"><li>Chỉ gửi tin khai trương, sự kiện và món mới</li><li>Không spam, hủy bất kỳ lúc nào</li></ul>
    </div>
    <form class="form" data-form="signup" novalidate>
      <label>Họ và tên<input name="name" autocomplete="name" required placeholder="Nguyễn Thị An"></label>
      <label>Email hoặc số điện thoại<input name="contact" required placeholder="ban@email.com / 09xx xxx xxx"></label>
      <fieldset class="chips">
        <legend>Chi nhánh bạn quan tâm</legend>
        ${site.branches.map((b, i) => `<label class="chip"><input type="checkbox" name="branch" value="${b.short}"${i === 0 ? ' checked' : ''}><span>${b.city}</span></label>`).join('')}
      </fieldset>
      <button class="btn btn--primary btn--block" type="submit">Đăng ký nhận tin ${icon('arrow')}</button>
      <p class="form__note">Hoặc nhắn Zalo <a href="${site.social.zalo}" target="_blank" rel="noopener">${site.phoneDisplay}</a></p>
    </form>
  </div>
</section>`;

const FAQ = [
  ['Khi nào Tiệm Nhà An khai trương?', '5 chi nhánh (Bình Thạnh, Tân Bình tại TP. Hồ Chí Minh; trung tâm Đà Nẵng, phố cổ Hội An và Duy Xuyên) đang được hoàn thiện. Ngày khai trương và địa chỉ chính xác sẽ được thông báo trên website, Zalo và tới những bạn đã đăng ký nhận tin.'],
  ['Đồ ăn ở tiệm có hoàn toàn là đồ chay không?', 'Có. Toàn bộ món ăn sáng và trưa là món chay, nước dùng nấu từ củ quả và không dùng bột ngọt. Món thuần chay (không trứng, không sữa) được ghi chú riêng tại quầy.'],
  ['Có thể chọn mức đường và loại sữa không?', 'Được. Mọi ly có thể chọn mức đường từ 0% đến 100%, ít hoặc nhiều đá, và đổi sữa tươi sang sữa yến mạch.'],
  ['Tiệm có chỗ ngồi làm việc, học bài không?', 'Có. Mỗi chi nhánh có góc làm việc yên tĩnh với ổ cắm ở từng bàn và wifi mạnh, cùng khu bàn dài cho nhóm bạn.'],
  ['Nhà An tuyển nhân viên với mức lương thế nào?', `Bán thời gian: 30.000 – 35.000đ/giờ, ca linh hoạt. Nhân viên chính thức: 10 – 15 triệu/tháng, đóng BHXH, BHYT đầy đủ. Gửi CV tới ${site.email} hoặc nhắn Zalo ${site.phoneDisplay}.`],
  ['Tiệm có nhận đặt bánh, tiệc trà và quà tặng không?', `Có. Nhà An nhận đặt bánh sinh nhật, hộp quà trà bánh và set trà cho văn phòng hoặc sự kiện nhỏ. Gọi hoặc nhắn Zalo ${site.phoneDisplay}, hoặc email ${site.email}.`],
];
export const faq = () =>
  `<div class="faq">${FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

export const JOBS = [
  ['Barista / Pha chế', 'Bán thời gian', '30.000 – 35.000đ/giờ'],
  ['Phục vụ & thu ngân', 'Bán thời gian, ca linh hoạt', '30.000 – 35.000đ/giờ'],
  ['Barista / Pha chế', 'Nhân viên chính thức', '10 – 15 triệu/tháng'],
  ['Thợ bánh', 'Nhân viên chính thức', '10 – 15 triệu/tháng'],
  ['Phụ bếp chay', 'Nhân viên chính thức', '10 – 15 triệu/tháng'],
];

export const salaryCards = () => `
<div class="salary">
  <article class="salary__c">
    <span class="salary__tag">${icon('clock')} Bán thời gian (Part-time)</span>
    <p class="salary__num">30.000 – 35.000đ<small>/giờ</small></p>
    <ul class="checks">
      <li>Ca linh hoạt sáng, chiều, tối, phù hợp sinh viên</li>
      <li>Đăng ký ca theo tuần</li>
      <li>Được đào tạo pha chế, phục vụ từ đầu</li>
      <li>Đồ uống và bữa ăn chay trong ca</li>
    </ul>
  </article>
  <article class="salary__c salary__c--main">
    <span class="salary__tag">${icon('briefcase')} Nhân viên chính thức (Full-time)</span>
    <p class="salary__num">10 – 15 triệu<small>/tháng</small></p>
    <ul class="checks">
      <li>Đóng <strong>BHXH, BHYT đầy đủ</strong> theo quy định</li>
      <li>Ký hợp đồng lao động chính thức</li>
      <li>Lộ trình lên ca trưởng, quản lý cửa hàng</li>
      <li>Đồ uống và bữa ăn chay trong ca</li>
    </ul>
  </article>
</div>`;

export const hiringTeaser = () => `
<section class="section section--green">
  <div class="wrap teaser">
    <div>
      <p class="eyebrow">Tuyển dụng</p>
      <h2>Nhà An đang <em>tìm bạn</em> đồng hành</h2>
      <p class="lead">Barista, phục vụ, thu ngân, thợ bánh, phụ bếp chay cho 5 chi nhánh tại Sài Gòn và Đà Nẵng – Quảng Nam. Không cần kinh nghiệm, được đào tạo từ đầu.</p>
      <div class="party__btns">
        <a class="btn btn--pink" href="/tuyen-dung">Xem chi tiết tuyển dụng ${icon('arrow')}</a>
        <a class="btn btn--light" href="${site.social.zalo}" target="_blank" rel="noopener">Nhắn Zalo ${site.phoneDisplay}</a>
      </div>
    </div>
    ${salaryCards()}
  </div>
</section>`;

const MARQUEE = ['Trà sữa nhà làm', 'Ô long rang củi', 'Bánh nướng mỗi sáng', 'Điểm tâm chay', 'Cơm trưa chay', 'Matcha đánh tay', 'Trà trái cây theo mùa', 'Góc sen check-in'];
export const marquee = (cls = '') => `
<div class="mq-wrap" aria-hidden="true"><div class="marquee ${cls}"><div class="marquee__track">
${Array(2).fill(MARQUEE.map((m) => `<span>${m}</span><i>✿</i>`).join('')).join('')}
</div></div></div>`;

export const branchCards = (list = site.branches) => `
<div class="branches branches--${list.length}">
  ${list.map((b) => {
    const r = site.regions.find((x) => x.id === b.region);
    return `
  <article class="branch">
    <a class="branch__media" href="/chi-nhanh/${b.id}">${img(b.img, b.city)}<span class="stamp">Coming<br>Soon</span><span class="branch__area">${icon('pin')} ${b.area}</span></a>
    <div class="branch__body">
      <p class="branch__no">Chi nhánh ${b.no}</p>
      <h3>${b.city}</h3>
      <p>${b.note}</p>
      <ul class="tags">${b.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <a class="link" href="/chi-nhanh/${b.id}">Xem chi nhánh ${icon('arrow')}</a>
    </div>
  </article>`;
  }).join('')}
</div>`;

export const regionCards = () => `
<div class="regions">
  ${site.regions.map((r) => `
  <a class="region region--${r.id}" href="${r.path}">
    ${img(r.img, r.name)}
    <div class="region__body">
      <span class="region__count">${site.branches.filter((b) => b.region === r.id).length} chi nhánh · Coming Soon</span>
      <h3>${r.name}</h3>
      <p class="script">${r.tagline}</p>
      <span class="btn btn--light">Khám phá ${r.name} ${icon('arrow')}</span>
    </div>
  </a>`).join('')}
</div>`;

// ───────────────────────── TRANG CHỦ ─────────────────────────
export function home() {
  return `
<section class="hero hero--classic">
  <div class="wrap hero__in">
    <div class="hero__text">
      <p class="eyebrow">Một ly trà, một chút an</p>
      <h1>Trà ô long rang củi, bánh nướng mỗi sáng &amp; <em>đồ chay nấu như ở nhà</em></h1>
      <p class="lead">Tiệm Nhà An là căn bếp nhỏ cho những buổi sáng thong thả và buổi chiều chậm rãi: một ly trà sữa thơm, một lát cheesecake vừa ra lò, một tô phở chay nóng hổi.</p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="/chi-nhanh#dang-ky">Nhận ưu đãi khai trương ${icon('arrow')}</a>
        <a class="btn btn--ghost" href="/dat-ban">Đặt bàn 24/7</a>
      </div>
      <dl class="stats">
        <div><dt>24/7</dt><dd>mở cửa cả ngày lẫn đêm</dd></div>
        <div><dt>100%</dt><dd>món ăn là món chay</dd></div>
        <div><dt>5</dt><dd>chi nhánh sắp khai trương</dd></div>
      </dl>
    </div>
    <div class="hero__media">
      <figure class="hero__main">${img('tea-pour', 'Rót trà ô long nóng', { eager: true })}</figure>
      <figure class="hero__sm hero__sm--a">${img('cheesecake', 'Cheesecake việt quất')}</figure>
      <figure class="hero__sm hero__sm--b">${img('pho-chay', 'Phở chay nấm')}</figure>
      <div class="hero__badge"><img src="/assets/img/brand/logo-circle.png" alt="" width="64" height="64"><span><strong>Coming Soon</strong>5 chi nhánh · Sài Gòn · Đà Nẵng</span></div>
    </div>
  </div>
</section>

${marquee()}

${spacesSection()}

${open247Band()}

<section class="section">
  <div class="wrap">
    ${head('Nhà An có gì?', 'Bốn điều làm nên <em>Nhà An</em>', 'Một tiệm nhỏ cho mọi khung giờ trong ngày, từ bữa sáng chay nóng hổi đến ly trà sữa lúc tan làm.')}
    <div class="bento">
      <a class="tile tile--a" href="/trai-nghiem#khong-gian">
        ${img('iced-milktea-duo', 'Hai ly trà sữa đá')}
        <div class="tile__body"><span class="tile__tag">${icon('cup')} Trà sữa &amp; trà trái cây</span><h3>Trà sữa nhà làm, trân châu nấu trong ngày</h3><p>Cốt trà ủ mới mỗi 4 tiếng, sữa tươi thanh trùng, trái cây theo mùa. Chọn mức đường tùy thích.</p></div>
      </a>
      <a class="tile tile--b" href="/ve-chung-toi#o-long">
        ${img('oolong-set', 'Ấm trà ô long')}
        <div class="tile__body"><span class="tile__tag">${icon('leaf')} Ô long rang củi</span><h3>Hương gỗ, hậu ngọt mật ong</h3></div>
      </a>
      <a class="tile tile--c" href="/trai-nghiem#dat-tiec">
        ${img('croissants', 'Bánh croissant')}
        <div class="tile__body"><span class="tile__tag">${icon('cake')} Bánh ngọt</span><h3>Nướng từ 5 giờ sáng</h3></div>
      </a>
      <a class="tile tile--d" href="/ve-chung-toi">
        ${img('vegan-bowl', 'Tô salad chay nhiều màu')}
        <div class="tile__body"><span class="tile__tag">${icon('sprout')} Đồ chay sáng &amp; trưa</span><h3>Chay thanh, ăn an lành</h3><p>Nước dùng củ quả hầm 8 tiếng, rau hữu cơ, đậu hũ non làm tại tiệm.</p></div>
      </a>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap feature">
    <div class="feature__media">
      ${img('tea-pour', 'Rót trà ô long', { cls: 'feature__img' })}
      <div class="feature__card">${icon('leaf')}<strong>Rang củi nhãn 3 lần</strong><span>Mỗi mẻ chỉ đủ dùng vài ngày</span></div>
    </div>
    <div>
      <p class="eyebrow">Món ký tên</p>
      <h2>Ô long sữa <em>kem mây</em></h2>
      <p class="lead">Ô long Bảo Lộc rang củi, pha lạnh 12 giờ, phủ lớp kem sữa tươi đánh bông như mây. Ly đầu tiên bạn nên thử ở Nhà An.</p>
      <ol class="steps">
        <li><span>01</span><div><strong>Hái</strong><p>Búp một tôm hai lá, hái tay lúc sáng sớm.</p></div></li>
        <li><span>02</span><div><strong>Ủ &amp; vò</strong><p>Ủ héo, quay thơm, vò viên thủ công.</p></div></li>
        <li><span>03</span><div><strong>Rang củi</strong><p>Lửa nhãn 3 lần, mỗi lần cách một đêm.</p></div></li>
        <li><span>04</span><div><strong>Pha</strong><p>Pha nóng 92°C hoặc pha lạnh 12 giờ.</p></div></li>
      </ol>
      <a class="btn btn--primary" href="/ve-chung-toi">Đọc câu chuyện Nhà An ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Góc check-in', 'Chụp một tấm, <em>an cả ngày</em>', 'Ánh nắng, cây xanh, góc sen và những ly nước xinh xắn. Gắn #NhàAn khi bạn ghé nhé!')}
    <div class="gallery">
      ${[
        ['cafe-garden', 'Góc cây xanh', 'g--tall'],
        ['pink-drinks', 'Trà trái cây hồng', ''],
        ['latte-plants', 'Latte bên cửa sổ', ''],
        ['macarons', 'Macaron pastel', 'g--wide'],
        ['cozy-tea', 'Trà chiều', ''],
        ['berry-soda', 'Soda dâu', 'g--tall'],
        ['lotus', 'Góc sen', 'g--wide'],
        ['icecream', 'Kem ốc quế', ''],
      ].map(([k, t, c]) => `<figure class="g ${c}">${img(k, t)}<figcaption>${t}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${head('24 giờ ở Nhà An', 'Sáng chay · Trưa an · Chiều trà · <em>Đêm chạy deadline</em>', 'Nhà An mở cửa 24/7, kể cả lễ Tết. Lúc nào cần một chỗ ngồi, một ly trà, đèn ở Nhà An vẫn sáng.')}
    <div class="day">
      ${[
        ['sun', '06:00', 'Điểm tâm chay', 'Phở chay nấm đông cô, bánh mì pa-tê nấm, xôi bắp, cháo hạt sen.', 'pho-chay'],
        ['bowl', '11:00', 'Cơm trưa văn phòng', 'Cơm gạo lứt, đậu hũ non, canh rau củ, hộp cơm đổi món mỗi ngày.', 'tofu-bowl'],
        ['cake', '15:00', 'Trà chiều', 'Ô long, matcha, trà sữa cùng cheesecake, tiramisu, croissant.', 'tiramisu'],
        ['moon', '22:00', 'Đêm 24/7', 'Đèn vẫn sáng cho deadline xuyên đêm: trà, soda, món chay khuya và góc yên lặng.', 'night-cafe'],
      ].map(([ic, t, h, p, k]) => `
      <article class="day__c">${img(k, h)}<div><span class="time">${icon(ic)} ${t}</span><h3>${h}</h3><p>${p}</p></div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap club">
    <div class="club__card" aria-hidden="true">
      <div class="mcard">
        <div class="mcard__top"><img src="/assets/img/brand/logo-circle.png" alt="" width="48" height="48"><span>NHÀ AN CLUB</span></div>
        <div class="mcard__dots">${Array(10).fill(0).map((_, i) => `<i class="${i < 7 ? 'on' : ''}"></i>`).join('')}</div>
        <div class="mcard__foot"><span>Thành viên</span><strong>Ly thứ 10 · Quà từ Nhà An</strong></div>
      </div>
      <span class="sticker sticker--c">Sắp ra mắt</span>
    </div>
    <div>
      <p class="eyebrow">Nhà An Club</p>
      <h2>Ghé thường xuyên, <em>nhận quà</em> thường xuyên</h2>
      <p class="lead">Thẻ thành viên điện tử ngay trên Zalo, không cần tải app.</p>
      <ul class="perks">
        <li>${icon('star')}<div><strong>Tích điểm mỗi ly</strong><span>Đủ dấu là có quà từ Nhà An.</span></div></li>
        <li>${icon('gift')}<div><strong>Quà sinh nhật</strong><span>Một món ngọt nhỏ trong tuần sinh nhật của bạn.</span></div></li>
        <li>${icon('laptop')}<div><strong>Ưu đãi giờ học, giờ làm</strong><span>Dành cho bạn ngồi lại học bài, làm việc.</span></div></li>
        <li>${icon('leaf')}<div><strong>Mang ly cá nhân</strong><span>Sống xanh cùng Nhà An, nhận thêm ưu đãi.</span></div></li>
      </ul>
      <a class="btn btn--primary" href="/trai-nghiem#club">Tìm hiểu Nhà An Club ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    ${head('Workshop & sự kiện', 'Cuối tuần ở Nhà An có gì vui?', 'Lịch cụ thể sẽ cập nhật sau khai trương. Đăng ký nhận tin để giữ chỗ sớm.')}
    <div class="events">
      ${[
        ['matcha-whisk', 'Workshop', 'Pha trà ô long &amp; đánh matcha', 'Học cách pha trà nóng, pha lạnh và đánh matcha đúng chuẩn, mang về một túi trà nhỏ.'],
        ['cake', 'Lớp bánh', 'Bánh ngọt cuối tuần', 'Cùng thợ bánh của Nhà An làm cheesecake, mochi và bánh chuối thuần chay.'],
        ['friends-laptop', 'Đêm nhạc', 'Acoustic &amp; board game', 'Tối cuối tuần nhạc mộc, board game và trà trái cây cho cả hội.'],
      ].map(([k, tag, h, p]) => `
      <article class="event">${img(k, h)}<div><span class="tile__tag">${icon('calendar')} ${tag}</span><h3>${h}</h3><p>${p}</p></div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap"><div class="party">
    <div class="party__media">${img('cheers', 'Cụng ly latte cùng bạn bè')}</div>
    <div class="party__body">
      <p class="eyebrow">Đặt tiệc &amp; quà tặng</p>
      <h2>Sinh nhật, họp nhóm, <em>tiệc trà</em> văn phòng</h2>
      <p>Nhà An nhận đặt bánh sinh nhật, hộp quà trà và bánh, set trà chiều cho văn phòng và tiệc nhỏ đến 30 khách tại tiệm.</p>
      <div class="party__btns">
        <a class="btn btn--pink" href="tel:${tel()}">${icon('phone')} Gọi ${site.phoneDisplay}</a>
        <a class="btn btn--ghost" href="mailto:${site.email}?subject=${encodeURIComponent('Đặt tiệc / quà tặng tại Tiệm Nhà An')}">${icon('mail')} Gửi email</a>
      </div>
    </div>
  </div></div>
</section>

${studioTeaser()}

${seasonStrip()}

<section class="section section--cream">
  <div class="wrap">
    ${head('Chi nhánh', '5 chi nhánh, <em>hai miền thương nhớ</em>', 'Bình Thạnh và Tân Bình ở Sài Gòn; trung tâm Đà Nẵng, phố cổ Hội An và Duy Xuyên ở miền Trung. Mỗi nơi mang một màu riêng của vùng đất.')}
    ${regionCards()}
    <div class="gap"></div>
    ${branchCards()}
  </div>
</section>

${hiringTeaser()}

<section class="numbers">
  <div class="wrap numbers__in">
    <div><strong>5</strong><span>chi nhánh sắp mở</span></div>
    <div><strong>100%</strong><span>món ăn là món chay</span></div>
    <div><strong>24/7</strong><span>mở cửa cả ngày lẫn đêm</span></div>
    <div><strong>5:00</strong><span>bánh bắt đầu ra lò</span></div>
  </div>
</section>

${signup()}

<section class="section">
  <div class="wrap narrow">
    ${head('Hỏi nhanh', 'Câu hỏi thường gặp')}
    ${faq()}
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── TRẢI NGHIỆM ─────────────────────────
export function experience() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Trải nghiệm</p>
      <h1>Không chỉ là ly trà, mà là <em>một chỗ để về</em></h1>
      <p class="lead">Bốn khu làm việc và học tập riêng biệt, workshop cuối tuần, tiệc nhỏ và câu lạc bộ thành viên: Nhà An là nơi bạn muốn quay lại mỗi ngày.</p>
      <nav class="jump" aria-label="Mục trong trang">
        <a href="#khong-gian">Không gian</a><a href="#workshop">Workshop</a><a href="#dat-tiec">Đặt tiệc</a><a href="#club">Nhà An Club</a><a href="/tuyen-dung">Tuyển dụng</a>
      </nav>
    </div>
    <figure class="phero__img">${img('cafe-bright', 'Không gian quán sáng sủa', { eager: true })}</figure>
  </div>
</section>

<section class="section" id="khong-gian">
  <div class="wrap">
    ${head('Không gian', 'Bốn góc, <em>bốn tâm trạng</em>', 'Xem chi tiết 4 khu làm việc, học tập và đặt chỗ tại trang <a class="link" href="/khong-gian">Không gian</a>.')}
    <div class="zones">
      ${spaces.map((sp) => `<a class="zone" href="/khong-gian#${sp.id}">${img(sp.img, sp.name)}<div class="zone__body">${icon(sp.icon)}<h3>${sp.name}</h3><p>${sp.short}</p></div></a>`).join('')}
    </div>
  </div>
</section>

${marquee('marquee--pink')}

<section class="section section--cream" id="workshop">
  <div class="wrap">
    ${head('Workshop & sự kiện', 'Học một điều mới, <em>gặp một người bạn mới</em>', 'Lịch chi tiết sẽ công bố sau khai trương. Số chỗ mỗi buổi có hạn.')}
    <div class="events events--list">
      ${[
        ['matcha-whisk', 'Workshop trà', 'Pha trà ô long &amp; đánh matcha', ['Phân biệt ô long rang, lài, sen', 'Pha nóng và pha lạnh tại nhà', 'Đánh matcha bằng chổi tre', 'Mang về một túi trà nhỏ']],
        ['cake', 'Lớp bánh', 'Bánh ngọt cuối tuần', ['Cheesecake, mochi, bánh chuối thuần chay', 'Làm theo nhóm nhỏ', 'Mang bánh về nhà', 'Phù hợp cả người mới']],
        ['friends-group', 'Đêm nhạc', 'Acoustic &amp; board game', ['Nhạc mộc tối cuối tuần', 'Board game cho cả hội', 'Trà trái cây và soda', 'Không gian ấm, ánh đèn vàng']],
        ['veg-noodles', 'Bếp chay', 'Nấu chay ngon tại nhà', ['Nước dùng rau củ không bột ngọt', 'Đậu hũ non tự làm', 'Món chay cho bữa cơm gia đình', 'Công thức mang về']],
      ].map(([k, tag, h, li]) => `
      <article class="event">${img(k, h)}<div><span class="tile__tag">${icon('calendar')} ${tag}</span><h3>${h}</h3><ul class="checks">${li.map((x) => `<li>${x}</li>`).join('')}</ul></div></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="dat-tiec">
  <div class="wrap">
    ${head('Đặt tiệc & quà tặng', 'Để Nhà An lo phần <em>ngọt ngào</em>')}
    <div class="offers">
      ${[
        ['cake', 'Bánh sinh nhật', 'Bánh kem, cheesecake và mille crêpe theo yêu cầu. Đặt trước 2 ngày.', 'cake'],
        ['macarons', 'Hộp quà trà &amp; bánh', 'Trà ô long đóng túi cùng macaron, cookie, phù hợp làm quà tặng, quà Tết.', 'gift'],
        ['tea-flatlay', 'Tiệc trà văn phòng', 'Set trà chiều giao tận nơi cho buổi họp, sự kiện nội bộ.', 'briefcase'],
        ['friends-laptop', 'Tiệc nhỏ tại tiệm', 'Sinh nhật, họp lớp, tiệc chia tay đến 30 khách, có trang trí.', 'users'],
      ].map(([k, h, p, ic]) => `<article class="offer">${img(k, h)}<div>${icon(ic)}<h3>${h}</h3><p>${p}</p></div></article>`).join('')}
    </div>
    <div class="callout">
      <div><h3>Đặt tiệc, đặt bánh, đặt quà?</h3><p>Gọi hoặc nhắn Zalo cho Nhà An, hoặc gửi email kèm ngày giờ và số khách.</p></div>
      <div class="callout__btns">
        <a class="btn btn--pink" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a>
        <a class="btn btn--light" href="mailto:${site.email}?subject=${encodeURIComponent('Đặt tiệc / quà tặng tại Tiệm Nhà An')}">${icon('mail')} ${site.email}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--green" id="club">
  <div class="wrap club club--dark">
    <div class="club__card" aria-hidden="true">
      <div class="mcard">
        <div class="mcard__top"><img src="/assets/img/brand/logo-circle.png" alt="" width="48" height="48"><span>NHÀ AN CLUB</span></div>
        <div class="mcard__dots">${Array(10).fill(0).map((_, i) => `<i class="${i < 4 ? 'on' : ''}"></i>`).join('')}</div>
        <div class="mcard__foot"><span>Thành viên</span><strong>Ghé đều, quà đều</strong></div>
      </div>
      <span class="sticker sticker--c">Sắp ra mắt</span>
    </div>
    <div>
      <p class="eyebrow">Nhà An Club</p>
      <h2>Câu lạc bộ của những người <em>thích chậm</em></h2>
      <p class="lead">Thẻ thành viên điện tử qua Zalo, ra mắt cùng ngày khai trương.</p>
      <ol class="how">
        <li><span>1</span>Quét mã tại quầy hoặc nhắn Zalo ${site.phoneDisplay}</li>
        <li><span>2</span>Tích dấu sau mỗi lần ghé tiệm</li>
        <li><span>3</span>Đổi quà, nhận ưu đãi sinh nhật và sự kiện riêng</li>
      </ol>
      <a class="btn btn--pink" href="${site.social.zalo}" target="_blank" rel="noopener">Nhắn Zalo đăng ký trước ${icon('arrow')}</a>
    </div>
  </div>
</section>

${hiringTeaser()}
${signup()}`;
}

// ───────────────────────── VỀ CHÚNG TÔI ─────────────────────────
export function about() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Về Nhà An</p>
      <h1>Một tiệm nhỏ mang tên “<em>Nhà</em>” và “<em>An</em>”</h1>
      <p class="lead">“Nhà” là nơi ta trở về. “An” là bình an, là an lành trong từng món ăn. Nhà An ra đời từ mong muốn giản dị: một chỗ ngồi ấm áp giữa thành phố, nơi ly trà được pha chậm và bữa chay được nấu tử tế.</p>
    </div>
    <figure class="phero__img">${img('lotus', 'Hoa sen hồng', { eager: true })}</figure>
  </div>
</section>

<section class="section">
  <div class="wrap story">
    <div class="story__text">
      <p class="eyebrow">Câu chuyện</p>
      <h2>Mái nhà, đóa sen và <em>chồi lá</em></h2>
      <p>Logo của Nhà An là một mái nhà che chở đóa sen hồng, bên cạnh là chồi lá non vươn lên từ ống khói. Mái nhà là sự ấm áp. Đóa sen là sự thanh tịnh của bữa chay Việt. Chồi lá là lá trà, thứ gắn kết mọi người quanh một chiếc bàn.</p>
      <p>Chúng tôi lớn lên với những buổi sáng mẹ nấu nồi phở chay ngày rằm, những buổi chiều bà ngồi pha ấm trà sen. Nhà An muốn giữ lại những điều đó và kể lại bằng ngôn ngữ của hôm nay: trà sữa ô long, matcha đánh tay, croissant bơ, bên cạnh tô bún Huế chay và ổ bánh mì pa-tê nấm.</p>
    </div>
    <div class="story__imgs">${img('tea-glass', 'Ly trà nóng')}${img('cozy-tea', 'Trà sữa nóng')}</div>
  </div>
</section>

<section class="section section--cream" id="o-long">
  <div class="wrap">
    ${head('Giá trị', 'Bốn điều Nhà An giữ gìn')}
    <div class="promise">
      <div>${icon('home')}<h3>Ấm như nhà</h3><p>Gỗ, vải lanh, gốm và cây xanh. Wifi mạnh, ổ cắm ở mọi bàn, nhạc nhỏ.</p></div>
      <div>${icon('leaf')}<h3>Thanh như sen</h3><p>Món ăn chay, ít dầu, ít ngọt. Rau củ theo mùa, không chất bảo quản.</p></div>
      <div>${icon('sprout')}<h3>Tươi như chồi lá</h3><p>Trà rang mẻ nhỏ, bánh nướng mỗi sáng, cốt trà ủ mới mỗi 4 tiếng.</p></div>
      <div>${icon('heart')}<h3>Tử tế với nhau</h3><p>Ly và ống hút giấy, khuyến khích mang ly cá nhân, làm việc trực tiếp với nông hộ.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Nguồn nguyên liệu', 'Đi khắp <em>dải đất hình chữ S</em>')}
    <div class="origins">
      ${[
        ['tea-leaves', 'Bảo Lộc, Lâm Đồng', 'Ô long một tôm hai lá, rang củi nhãn.'],
        ['oolong-set', 'Tân Cương, Thái Nguyên', 'Trà xanh ướp lài cho trà lài và trà sữa nhài.'],
        ['lotus', 'Hồ Tây, Hà Nội', 'Gạo sen Bách Diệp để ướp trà sen.'],
        ['fruit-tea', 'Trái cây theo mùa', 'Dâu Đà Lạt, vải Lục Ngạn, xoài Hòa Lộc.'],
        ['tofu-noodle', 'Bếp chay Nhà An', 'Đậu hũ non làm mỗi sáng, rau hữu cơ.'],
        ['croissant', 'Bếp bánh Nhà An', 'Bột mì và bơ lên men, nướng từ 5 giờ sáng.'],
      ].map(([k, t, d]) => `<figure class="origin">${img(k, t)}<figcaption><strong>${t}</strong><span>${d}</span></figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${head('Hành trình', 'Những cột mốc của Nhà An')}
    <ol class="timeline">
      <li><span>Khởi đầu</span><h3>Gian bếp gia đình</h3><p>Những mẻ trà ô long rang thử và công thức phở chay của mẹ.</p></li>
      <li><span>Hoàn thiện</span><h3>Thử và chọn công thức</h3><p>Nếm và chọn lọc từ hàng trăm công thức trà, bánh và món chay.</p></li>
      <li><span>Sắp tới</span><h3>Bình Thạnh &amp; Tân Bình</h3><p>2 chi nhánh Sài Gòn: nhà phố có góc sen và tiệm trà gạch bông, Coming Soon.</p></li>
      <li><span>Sắp tới</span><h3>Đà Nẵng, Hội An &amp; Duy Xuyên</h3><p>Bên sông Hàn, giữa phố cổ và bên dòng Thu Bồn, Coming Soon.</p></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap brandkit">
    <div>
      <p class="eyebrow">Bộ nhận diện</p>
      <h2>Logo &amp; màu sắc</h2>
      <p class="lead">Xanh rêu của mái nhà và chồi lá, hồng của cánh sen, nền kem của giấy dó.</p>
      <div class="swatches">
        <span style="--c:#31492E">Xanh rêu<br><small>#31492E</small></span>
        <span style="--c:#41593D">Xanh lá<br><small>#41593D</small></span>
        <span style="--c:#F5747E">Hồng sen<br><small>#F5747E</small></span>
        <span style="--c:#FBB2B0" class="light">Hồng phấn<br><small>#FBB2B0</small></span>
        <span style="--c:#FCFAF5" class="light">Kem<br><small>#FCFAF5</small></span>
      </div>
    </div>
    <div class="logos">
      <figure class="logos__wide"><img src="/assets/img/brand/logo-horizontal.webp" alt="Logo ngang Tiệm Nhà An" width="660" height="210" loading="lazy"></figure>
      <figure><img src="/assets/img/brand/logo-circle.png" alt="Logo tròn Tiệm Nhà An" width="328" height="328" loading="lazy"></figure>
      <figure><img src="/assets/img/brand/logo-app.png" alt="Biểu tượng ứng dụng Tiệm Nhà An" width="342" height="342" loading="lazy"></figure>
    </div>
  </div>
</section>
${contactStrip()}`;
}

// ───────────────────────── CHI NHÁNH ─────────────────────────
export function branches() {
  return `
<section class="phero">
  <div class="wrap phero__in">
    <div>
      <p class="eyebrow">Chi nhánh</p>
      <h1>5 căn nhà, <em>hai miền thương nhớ</em></h1>
      <p class="lead">2 chi nhánh tại Sài Gòn (Bình Thạnh, Tân Bình) và 3 chi nhánh tại Đà Nẵng – Quảng Nam (trung tâm Đà Nẵng, phố cổ Hội An, Duy Xuyên) đang được hoàn thiện. Đăng ký để là người đầu tiên biết địa chỉ và nhận ưu đãi khai trương.</p>
      <div class="hero__cta"><a class="btn btn--primary btn--lg" href="#dang-ky">Đăng ký nhận tin ${icon('arrow')}</a><a class="btn btn--ghost btn--lg" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a></div>
    </div>
    <figure class="phero__img">${img('cafe-counter', 'Quầy pha chế', { eager: true })}</figure>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    ${regionCards()}
  </div>
</section>
${site.regions.map((r, ri) => `
<section class="section ${ri % 2 ? '' : 'section--cream'}" id="${r.id}">
  <div class="wrap">
    ${head(r.full, r.name, r.tagline)}
    ${site.branches.filter((b) => b.region === r.id).map((b, i) => `
    <article class="bigbranch${i % 2 ? ' bigbranch--rev' : ''}" id="${b.id}">
      <div class="bigbranch__media">${img(b.img, b.city)}<span class="stamp">Coming<br>Soon</span></div>
      <div class="bigbranch__body">
        <span class="pill pill--soon">${icon('calendar')} Chi nhánh ${b.no} · Sắp khai trương</span>
        <h2>${b.city}</h2>
        <p class="branch-area">${icon('pin')} ${b.area}</p>
        <p class="lead">${b.note}</p>
        <ul class="tags">${b.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        <ul class="info">
          <li>${icon('pin')}<span><strong>Địa chỉ</strong>${b.address}</span></li>
          <li>${icon('clock')}<span><strong>Giờ mở cửa dự kiến</strong>${site.hours.map(([k, v]) => `${k}: ${v}`).join('<br>')}</span></li>
          <li>${icon('phone')}<span><strong>Hotline</strong><a href="tel:${tel()}">${site.phoneDisplay}</a> · <a href="mailto:${site.email}">${site.email}</a></span></li>
        </ul>
        <div class="party__btns"><a class="btn btn--primary" href="#dang-ky" data-branch="${b.short}">Báo tôi khi mở cửa ${icon('arrow')}</a><a class="btn btn--ghost" href="/chi-nhanh/${b.id}">Xem trang chi nhánh</a></div>
      </div>
    </article>`).join('')}
  </div>
</section>`).join('')}
<section class="section section--green">
  <div class="wrap">
    ${head('Ở mỗi chi nhánh', 'Bạn sẽ tìm thấy')}
    <div class="promise promise--dark">
      <div>${icon('cup')}<h3>Quầy trà mở</h3><p>Xem barista pha ô long và đánh matcha ngay trước mặt.</p></div>
      <div>${icon('cake')}<h3>Tủ bánh trong ngày</h3><p>Bánh nướng mới mỗi sáng từ 5 giờ, số lượng có hạn mỗi ngày.</p></div>
      <div>${icon('bowl')}<h3>Bếp chay</h3><p>Điểm tâm và cơm trưa chay, thêm món riêng của từng vùng.</p></div>
      <div>${icon('camera')}<h3>Góc check-in</h3><p>Góc sen, gạch bông Sài Gòn, đèn lồng Hội An.</p></div>
    </div>
  </div>
</section>
${signup()}`;
}

// ───────────────────────── LIÊN HỆ ─────────────────────────
export function contact() {
  return `
<section class="phero phero--short">
  <div class="wrap">
    <p class="eyebrow">Liên hệ</p>
    <h1>Gửi lời nhắn cho <em>Nhà An</em></h1>
    <p class="lead">Hợp tác, đặt bánh, tiệc trà văn phòng, tuyển dụng hay chỉ là một lời chào. Nhà An luôn muốn nghe.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    <div class="cbig">
      <a class="cbig__c" href="tel:${tel()}">${icon('phone')}<small>Hotline</small><strong>${site.phoneDisplay}</strong><span>Gọi trực tiếp</span></a>
      <a class="cbig__c" href="${site.social.zalo}" target="_blank" rel="noopener"><b class="zalo-txt">Zalo</b><small>Nhắn Zalo</small><strong>${site.phoneDisplay}</strong><span>Phản hồi nhanh nhất</span></a>
      <a class="cbig__c" href="mailto:${site.email}">${icon('mail')}<small>Email</small><strong>${site.email}</strong><span>Hợp tác, đặt tiệc, tuyển dụng</span></a>
    </div>
    <div class="contact">
      <form class="form form--card" data-form="contact" novalidate>
        <h2>Viết cho Nhà An</h2>
        <div class="form__row">
          <label>Họ và tên<input name="name" autocomplete="name" required></label>
          <label>Email hoặc số điện thoại<input name="contact" required></label>
        </div>
        <label>Chủ đề
          <select name="topic">
            <option>Đặt bánh / tiệc trà</option><option>Hộp quà tặng</option><option>Hợp tác &amp; cung cấp nguyên liệu</option>
            <option>Tuyển dụng</option><option>Góp ý</option><option>Khác</option>
          </select>
        </label>
        <label>Lời nhắn<textarea name="message" rows="5" required placeholder="Nhà An có thể giúp gì cho bạn?"></textarea></label>
        <button class="btn btn--primary" type="submit">Gửi lời nhắn ${icon('arrow')}</button>
      </form>
      <aside class="contact__side">
        <div class="infocard">
          <h3>Chi nhánh</h3>
          <ul class="info">${site.branches.map((b) => `<li>${icon('pin')}<span><strong>${b.city}</strong>Coming Soon. ${b.address}.</span></li>`).join('')}</ul>
        </div>
        <div class="infocard">
          <h3>Giờ mở cửa dự kiến</h3>
          <ul class="hours">${site.hours.map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`).join('')}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>
<section class="section section--cream">
  <div class="wrap narrow">
    ${head('Hỏi nhanh', 'Câu hỏi thường gặp')}
    ${faq()}
  </div>
</section>`;
}

// ───────────────────────── TÍN DỤNG ẢNH ─────────────────────────
export function credits() {
  const lic = (p) =>
    p.license === 'unsplash'
      ? '<a href="https://unsplash.com/license" target="_blank" rel="noopener license">Unsplash License</a>'
      : p.license === 'pdm'
        ? '<a href="https://creativecommons.org/publicdomain/mark/1.0/" target="_blank" rel="noopener license">Public Domain</a>'
        : p.license === 'cc0'
        ? '<a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener license">CC0</a>'
        : `<a href="https://creativecommons.org/licenses/${p.license}/${p.version}/" target="_blank" rel="noopener license">CC ${p.license.toUpperCase()} ${p.version}</a>`;
  return `
<section class="phero phero--short">
  <div class="wrap">
    <p class="eyebrow">Tín dụng hình ảnh</p>
    <h1>Cảm ơn các nhiếp ảnh gia</h1>
    <p class="lead">Ảnh trên website là ảnh minh họa từ Unsplash (Unsplash License), Rawpixel (CC0) và Flickr (Creative Commons, ghi công tác giả bên dưới), đều được phép dùng thương mại. Ảnh thật của Nhà An sẽ được cập nhật khi khai trương.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    <div class="credits">
      ${Object.entries(photos).map(([k, p]) => `
      <figure>${img(k, p.title || k)}<figcaption>
        <strong>${esc(p.title || k)}</strong>
        <span>${p.creator ? esc(p.creator) + ' · ' : ''}${p.source === 'Unsplash' ? 'Unsplash' : p.source === 'flickr' ? 'Flickr' : 'Rawpixel'} · ${lic(p)} · <a href="${esc(p.url)}" target="_blank" rel="noopener">Nguồn</a></span>
      </figcaption></figure>`).join('')}
    </div>
  </div>
</section>`;
}

export function notFound() {
  return `
<section class="section nf">
  <div class="wrap narrow center">
    <img src="/assets/img/brand/logo-app.png" alt="" width="160" height="160">
    <p class="eyebrow">Lạc đường rồi</p>
    <h1>Trang này đã đi <em>pha trà</em> mất rồi</h1>
    <p class="lead">Không tìm thấy trang bạn cần. Quay về nhà nhé!</p>
    <div class="hero__cta center"><a class="btn btn--primary" href="/">Về trang chủ</a><a class="btn btn--ghost" href="/trai-nghiem">Khám phá trải nghiệm</a></div>
  </div>
</section>`;
}
