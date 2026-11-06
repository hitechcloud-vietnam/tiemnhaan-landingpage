import { site } from './data/site.mjs';
import { categories, items, toppings, combos } from './data/menu.mjs';
import { esc, vnd, icon, img } from './layout.mjs';

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const count = (cat) => items.filter((i) => i.cat === cat).length;
const TAGS = { sig: 'Ký tên', best: 'Bán chạy', new: 'Mới', vegan: 'Thuần chay', hot: 'Có nóng' };

const price = (p) =>
  typeof p === 'number'
    ? `<span class="price">${vnd(p)}</span>`
    : `<span class="price price--2"><span><small>M</small> ${vnd(p.M)}</span><span><small>L</small> ${vnd(p.L)}</span></span>`;

export const card = (it, { eager = false } = {}) => `
<article class="dish" data-id="${it.id}" data-cat="${it.cat}" data-tags="${it.tags.join(' ')}" data-name="${esc((it.name + ' ' + it.en + ' ' + it.desc).toLowerCase())}">
  <button class="dish__media" type="button" data-open="${it.id}" aria-label="Xem chi tiết ${esc(it.name)}">
    ${img(it.img, it.name, { eager })}
    ${it.tags.includes('sig') ? '<span class="ribbon">Ký tên</span>' : it.tags.includes('new') ? '<span class="ribbon ribbon--new">Mới</span>' : ''}
  </button>
  <div class="dish__body">
    <h3 class="dish__name">${esc(it.name)}</h3>
    <p class="dish__en">${esc(it.en)}</p>
    <p class="dish__desc">${esc(it.desc)}</p>
    <div class="dish__foot">
      ${price(it.price)}
      <span class="badges">${it.tags.filter((t) => t !== 'sig' && t !== 'new').map((t) => `<span class="badge badge--${t}" title="${TAGS[t]}">${t === 'vegan' ? icon('sprout') : t === 'hot' ? icon('fire') : icon('heart')}<span>${TAGS[t]}</span></span>`).join('')}</span>
    </div>
  </div>
</article>`;

const sectionHead = (eyebrow, title, lead = '', center = true) => `
<div class="shead${center ? ' shead--center' : ''}">
  <p class="eyebrow">${eyebrow}</p>
  <h2>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div>`;

const newsletter = (id = 'dang-ky') => `
<section class="section signup" id="${id}">
  <div class="wrap signup__in">
    <div>
      <p class="eyebrow">Ưu đãi khai trương</p>
      <h2>Là người đầu tiên ghé Nhà An</h2>
      <p>Để lại thông tin, Nhà An sẽ báo bạn ngày khai trương tại TP.HCM và Đà Nẵng, kèm <strong>ưu đãi khai trương dành riêng</strong> cho người đăng ký sớm.</p>
      <ul class="ticks"><li>Không spam — chỉ tin khai trương và món mới</li><li>Hủy đăng ký bất kỳ lúc nào</li></ul>
    </div>
    <form class="form" data-form="signup" novalidate>
      <label>Họ và tên<input name="name" autocomplete="name" required placeholder="Nguyễn Thị An"></label>
      <label>Email hoặc số điện thoại<input name="contact" required placeholder="ban@email.com / 09xx xxx xxx"></label>
      <fieldset class="chips">
        <legend>Chi nhánh bạn quan tâm</legend>
        ${site.branches.map((b, i) => `<label class="chip"><input type="checkbox" name="branch" value="${b.short}"${i === 0 ? ' checked' : ''}><span>${b.city}</span></label>`).join('')}
      </fieldset>
      <button class="btn btn--primary btn--block" type="submit">Đăng ký nhận tin ${icon('arrow')}</button>
      <p class="form__note">Bằng việc đăng ký, bạn đồng ý nhận thông tin từ ${site.name}.</p>
    </form>
  </div>
</section>`;

// ───────────────────────── TRANG CHỦ ─────────────────────────
export function home() {
  const sig = ['ol02', 'ts03', 'ol05', 'bn05', 'cs01', 'cs04'].map((id) => byId[id]);
  const best = items.filter((i) => i.tags.includes('best')).slice(0, 8);
  return `
<section class="hero">
  <div class="wrap hero__in">
    <div class="hero__text">
      <p class="eyebrow">Một ly trà, một chút an</p>
      <h1>Trà ô long rang củi, bánh nướng mỗi sáng &amp; <em>đồ chay nấu như ở nhà</em></h1>
      <p class="lead">Tiệm Nhà An là căn bếp nhỏ cho những buổi sáng thong thả và buổi chiều chậm rãi: một ly trà sữa thơm, một lát cheesecake vừa ra lò, một tô phở chay nóng hổi.</p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="/thuc-don">Xem thực đơn 115 món ${icon('arrow')}</a>
        <a class="btn btn--ghost" href="/chi-nhanh">Chi nhánh sắp mở</a>
      </div>
      <dl class="stats">
        <div><dt>115</dt><dd>món trong thực đơn</dd></div>
        <div><dt>100%</dt><dd>món ăn là món chay</dd></div>
        <div><dt>2</dt><dd>chi nhánh sắp khai trương</dd></div>
      </dl>
    </div>
    <div class="hero__media">
      <figure class="hero__main">${img('tea-cup', 'Ly trà ô long nóng', { eager: true })}</figure>
      <figure class="hero__sm hero__sm--a">${img('cheesecake-3', 'Basque cheesecake')}</figure>
      <figure class="hero__sm hero__sm--b">${img('pho-2', 'Phở chay nấm đông cô')}</figure>
      <div class="hero__badge"><img src="/assets/img/brand/logo-circle.png" alt="" width="64" height="64"><span><strong>Coming Soon</strong>TP.HCM · Đà Nẵng</span></div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee__track">
${Array(2).fill(categories.map((c) => `<span>${icon(c.icon)} ${c.name}</span>`).join('')).join('')}
</div></div>

<section class="section">
  <div class="wrap">
    ${sectionHead('Món ký tên', 'Sáu món làm nên Nhà An', 'Nếu chỉ ghé một lần, hãy bắt đầu từ đây. Mỗi món là một câu chuyện nhỏ về nguyên liệu Việt.')}
    <div class="grid grid--3">${sig.map((it) => card(it)).join('')}</div>
    <div class="center"><a class="btn btn--ghost" href="/thuc-don">Xem toàn bộ thực đơn ${icon('arrow')}</a></div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Thực đơn', '8 nhóm món, 115 lựa chọn', 'Từ ly trà sữa quen thuộc đến ấm trà sen Tây Hồ, từ chiếc croissant bơ đến tô bún Huế chay.')}
    <div class="cats">
      ${categories.map((c) => `
      <a class="cat" href="/thuc-don#${c.id}">
        <span class="cat__ic">${icon(c.icon)}</span>
        <span class="cat__t"><strong>${c.name}</strong><small>${c.en}</small></span>
        <span class="cat__n">${count(c.id)} món</span>
        <span class="cat__d">${c.desc}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="split__media">
      ${img('oolong-leaves', 'Lá trà ô long sau khi rang', { cls: 'r-lg' })}
      ${img('tea-plantation', 'Đồi chè Bảo Lộc', { cls: 'split__float r-md' })}
    </div>
    <div>
      <p class="eyebrow">Câu chuyện ô long</p>
      <h2>Từ đồi chè Bảo Lộc đến ly trà trên tay bạn</h2>
      <p>Nhà An chọn ô long một tôm hai lá từ những nông hộ Bảo Lộc, rang củi nhãn theo mẻ nhỏ để trà có hương gỗ ấm và hậu ngọt như mật ong. Mỗi mẻ rang chỉ đủ cho vài ngày, nên ly trà của bạn luôn tươi.</p>
      <ol class="steps">
        <li><span>01</span><div><strong>Hái</strong><p>Búp một tôm hai lá, hái tay vào sáng sớm.</p></div></li>
        <li><span>02</span><div><strong>Ủ &amp; vò</strong><p>Ủ héo, quay thơm và vò viên theo lối thủ công.</p></div></li>
        <li><span>03</span><div><strong>Rang củi</strong><p>Rang lửa nhãn 3 lần, mỗi lần cách nhau một đêm.</p></div></li>
        <li><span>04</span><div><strong>Pha</strong><p>Pha nóng 92°C hoặc pha lạnh 12 giờ tại tiệm.</p></div></li>
      </ol>
      <a class="btn btn--primary" href="/ve-chung-toi">Đọc câu chuyện Nhà An ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${sectionHead('Một ngày ở Nhà An', 'Sáng chay, trưa an, chiều trà bánh')}
    <div class="day">
      <article class="day__c">${img('pho-1', 'Điểm tâm chay buổi sáng')}<div><span class="time">${icon('sun')} 06:30 – 10:30</span><h3>Điểm tâm chay</h3><p>Phở chay, bún Huế, bánh mì pa-tê nấm, xôi bắp và bánh bao nóng.</p><a href="/thuc-don#chay-sang">14 món sáng ${icon('arrow')}</a></div></article>
      <article class="day__c">${img('tofu-4', 'Cơm trưa chay')}<div><span class="time">${icon('bowl')} 10:30 – 14:00</span><h3>Cơm &amp; bún trưa</h3><p>Cơm gạo lứt, đậu hũ non làm tại tiệm, hộp cơm văn phòng đổi món mỗi ngày.</p><a href="/thuc-don#chay-trua">12 món trưa ${icon('arrow')}</a></div></article>
      <article class="day__c">${img('tiramisu-1', 'Trà và bánh buổi chiều')}<div><span class="time">${icon('cake')} Cả ngày tới 22:00</span><h3>Trà &amp; bánh ngọt</h3><p>Ô long, trà sữa, matcha cùng 18 loại bánh nướng mới mỗi sáng.</p><a href="/thuc-don#banh-ngot">Xem bánh ngọt ${icon('arrow')}</a></div></article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead('Được gọi nhiều', 'Những ly và món bán chạy')}
    <div class="grid grid--4">${best.map((it) => card(it)).join('')}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Lời hứa của Nhà An', 'Ngon, lành và tử tế')}
    <div class="promise">
      <div>${icon('leaf')}<h3>Nguyên liệu Việt</h3><p>Trà Bảo Lộc, Thái Nguyên, Hà Giang; rau hữu cơ Đà Lạt; trái cây theo mùa.</p></div>
      <div>${icon('sprout')}<h3>Món ăn 100% chay</h3><p>Nước dùng từ củ quả, không bột ngọt. Món thuần chay được đánh dấu riêng.</p></div>
      <div>${icon('hand')}<h3>Làm tay mỗi ngày</h3><p>Trân châu, bánh, đậu hũ, sữa chua đều làm tại tiệm trong ngày.</p></div>
      <div>${icon('heart')}<h3>Tùy chỉnh theo bạn</h3><p>Chọn mức đường 0–100%, đá, sữa tươi hoặc sữa yến mạch cho mọi ly.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead('Chi nhánh', 'Sắp có mặt tại hai thành phố')}
    <div class="branches">
      ${site.branches.map((b) => `
      <article class="branch">
        ${img(b.img, 'Không gian dự kiến chi nhánh ' + b.city)}
        <div class="branch__body">
          <span class="pill pill--soon">${icon('calendar')} Coming Soon</span>
          <h3>${b.city}</h3>
          <p>${b.note}</p>
          <a class="link" href="/chi-nhanh#${b.id}">Xem chi tiết ${icon('arrow')}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${newsletter()}

<section class="section">
  <div class="wrap narrow">
    ${sectionHead('Hỏi nhanh', 'Câu hỏi thường gặp')}
    ${faq()}
  </div>
</section>`;
}

const FAQ = [
  ['Khi nào Tiệm Nhà An khai trương?', 'Hai chi nhánh TP. Hồ Chí Minh và Đà Nẵng đang được hoàn thiện. Ngày khai trương và địa chỉ chính xác sẽ được thông báo trên website và cho những bạn đã đăng ký nhận tin.'],
  ['Đồ ăn ở tiệm có hoàn toàn là đồ chay không?', 'Có. Toàn bộ món ăn sáng và trưa là món chay, nước dùng nấu từ củ quả và không dùng bột ngọt. Một số món có trứng hoặc sữa; món thuần chay (không trứng, không sữa) được gắn nhãn “Thuần chay”.'],
  ['Có thể chọn mức đường và loại sữa không?', 'Được. Mọi ly có thể chọn 0%, 30%, 50%, 70% hoặc 100% đường, ít hoặc nhiều đá, và đổi sữa tươi sang sữa yến mạch (+5.000đ).'],
  ['Tiệm có giao hàng không?', 'Sau khi khai trương, Nhà An sẽ nhận đơn qua các ứng dụng giao đồ ăn phổ biến và đặt trước qua điện thoại cho đơn văn phòng.'],
  ['Tiệm có nhận đặt bánh và tiệc trà không?', 'Có. Nhà An nhận đặt bánh sinh nhật, hộp macaron quà tặng và set trà bánh cho văn phòng hoặc sự kiện nhỏ. Hãy để lại lời nhắn ở trang Liên hệ.'],
];
export const faq = () =>
  `<div class="faq">${FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

// ───────────────────────── THỰC ĐƠN ─────────────────────────
export function menu() {
  return `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow">Thực đơn Tiệm Nhà An</p>
    <h1>115 món cho mọi khoảnh khắc trong ngày</h1>
    <p class="lead">Đồ uống có 2 cỡ M (500ml) và L (700ml). Giá đã gồm VAT. Ảnh mang tính minh họa.</p>
  </div>
</section>

<div class="menubar" id="menubar">
  <div class="wrap">
    <div class="menubar__row">
      <label class="search">${icon('search')}<input id="q" type="search" placeholder="Tìm món: ô long, phở, cheesecake…" aria-label="Tìm món"></label>
      <div class="filters" role="group" aria-label="Lọc món">
        <button class="fchip is-on" data-filter="all">Tất cả</button>
        <button class="fchip" data-filter="sig">Ký tên</button>
        <button class="fchip" data-filter="best">Bán chạy</button>
        <button class="fchip" data-filter="new">Mới</button>
        <button class="fchip" data-filter="vegan">Thuần chay</button>
        <button class="fchip" data-filter="hot">Có nóng</button>
      </div>
    </div>
    <nav class="tabs" aria-label="Nhóm món">
      ${categories.map((c) => `<a href="#${c.id}" data-tab="${c.id}">${c.name} <small>${count(c.id)}</small></a>`).join('')}
    </nav>
  </div>
</div>

<section class="section section--tight">
  <div class="wrap">
    <p class="result" id="result" aria-live="polite">Đang hiển thị <strong>${items.length}</strong> món</p>
    ${categories.map((c) => `
    <section class="mcat" id="${c.id}" aria-labelledby="h-${c.id}">
      <header class="mcat__head">
        <span class="cat__ic">${icon(c.icon)}</span>
        <div><h2 id="h-${c.id}">${c.name}</h2><p>${c.en} · ${count(c.id)} món — ${c.desc}</p></div>
      </header>
      <div class="grid grid--4">${items.filter((i) => i.cat === c.id).map((it) => card(it)).join('')}</div>
    </section>`).join('')}
    <p class="empty" id="empty" hidden>Không tìm thấy món phù hợp. Thử từ khóa khác nhé!</p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap extras">
    <div>
      <p class="eyebrow">Thêm topping</p>
      <h2>Topping làm tại tiệm</h2>
      <ul class="tlist">${toppings.map(([n, p]) => `<li><span>${n}</span><span class="dots"></span><strong>${vnd(p)}</strong></li>`).join('')}</ul>
      <p class="muted">Đổi sang sữa yến mạch: +5.000đ · Mức đường: 0% · 30% · 50% · 70% · 100%</p>
    </div>
    <div>
      <p class="eyebrow">Combo tiết kiệm</p>
      <h2>Ghép món cho tròn bữa</h2>
      <div class="combos">${combos.map((c) => `<div class="combo"><div><h3>${c.name}</h3><p>${c.items}</p></div><strong>${vnd(c.price)}</strong></div>`).join('')}</div>
    </div>
  </div>
</section>

<dialog class="modal" id="modal" aria-labelledby="m-name">
  <button class="modal__x" type="button" data-close aria-label="Đóng">${icon('close')}</button>
  <div class="modal__media"><img id="m-img" alt="" width="960" height="720"></div>
  <div class="modal__body">
    <p class="eyebrow" id="m-cat"></p>
    <h2 id="m-name"></h2>
    <p class="dish__en" id="m-en"></p>
    <p id="m-desc"></p>
    <div id="m-badges" class="badges"></div>
    <div id="m-price" class="modal__price"></div>
    <p class="muted">Có thể chọn mức đường, đá và đổi sữa yến mạch. Món sẽ phục vụ khi chi nhánh khai trương.</p>
  </div>
</dialog>`;
}

// ───────────────────────── VỀ CHÚNG TÔI ─────────────────────────
export function about() {
  return `
<section class="phero phero--img">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Về Nhà An</p>
      <h1>Một căn tiệm nhỏ mang tên “Nhà” và “An”</h1>
      <p class="lead">“Nhà” là nơi ta trở về. “An” là bình an, là an lành trong từng món ăn. Tiệm Nhà An ra đời từ mong muốn giản dị: một chỗ ngồi ấm áp giữa thành phố, nơi ly trà được pha chậm và bữa chay được nấu tử tế.</p>
    </div>
    <div class="split__media">${img('lotus', 'Hoa sen hồng', { cls: 'r-lg', eager: true })}</div>
  </div>
</section>

<section class="section">
  <div class="wrap narrow prose">
    <p class="eyebrow">Câu chuyện</p>
    <h2>Mái nhà, đóa sen và chồi lá</h2>
    <p>Logo của Nhà An là một mái nhà che chở đóa sen hồng, bên cạnh là chồi lá non vươn lên từ ống khói. Mái nhà là sự ấm áp. Đóa sen là sự thanh tịnh của bữa chay Việt. Chồi lá là lá trà — thứ gắn kết mọi người quanh một chiếc bàn.</p>
    <p>Chúng tôi lớn lên với những buổi sáng mẹ nấu nồi phở chay ngày rằm, những buổi chiều bà ngồi pha ấm trà sen. Nhà An muốn giữ lại những điều đó và kể lại bằng ngôn ngữ của hôm nay: trà sữa ô long rang, croissant bơ, cheesecake Basque — bên cạnh tô bún Huế chay và ổ bánh mì pa-tê nấm.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Giá trị', 'Bốn điều Nhà An giữ gìn')}
    <div class="promise">
      <div>${icon('home')}<h3>Ấm như nhà</h3><p>Không gian gỗ, vải lanh, gốm và cây xanh. Wifi mạnh, ổ cắm ở mọi bàn, nhạc nhỏ.</p></div>
      <div>${icon('leaf')}<h3>Thanh như sen</h3><p>Món ăn chay, ít dầu, ít ngọt. Rau củ theo mùa, không chất bảo quản.</p></div>
      <div>${icon('sprout')}<h3>Tươi như chồi lá</h3><p>Trà rang mẻ nhỏ, bánh nướng mỗi sáng, cốt trà ủ mới mỗi 4 tiếng.</p></div>
      <div>${icon('heart')}<h3>Tử tế với nhau</h3><p>Ly giấy và ống hút giấy, giảm 5.000đ khi mang ly cá nhân. Hợp tác trực tiếp với nông hộ.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead('Nguồn nguyên liệu', 'Đi khắp dải đất hình chữ S')}
    <div class="origins">
      ${[
        ['tea-plantation', 'Bảo Lộc, Lâm Đồng', 'Ô long một tôm hai lá, rang củi nhãn.'],
        ['tea-bush', 'Tân Cương, Thái Nguyên', 'Trà xanh ướp lài tươi cho trà lài và trà sữa nhài.'],
        ['tea-set-2', 'Hồ Tây, Hà Nội', 'Gạo sen Bách Diệp để ướp trà sen.'],
        ['berry-tea', 'Đà Lạt', 'Dâu tây, atiso, rau hữu cơ cho món trưa.'],
        ['veg-tofu', 'Làng nghề đậu hũ', 'Đậu nành không biến đổi gen, đậu hũ non làm mỗi sáng.'],
        ['croissant-1', 'Bếp bánh Nhà An', 'Bột mì và bơ lên men, nướng từ 5 giờ sáng.'],
      ].map(([k, t, d]) => `<figure class="origin">${img(k, t)}<figcaption><strong>${t}</strong><span>${d}</span></figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${sectionHead('Hành trình', 'Những cột mốc của Nhà An')}
    <ol class="timeline">
      <li><span>Khởi đầu</span><h3>Gian bếp gia đình</h3><p>Những mẻ trà ô long rang thử và công thức phở chay của mẹ.</p></li>
      <li><span>Hoàn thiện</span><h3>115 món trong thực đơn</h3><p>Thử nghiệm, nếm và chọn lọc từ hàng trăm công thức trà, bánh và món chay.</p></li>
      <li><span>Sắp tới</span><h3>Khai trương TP. Hồ Chí Minh</h3><p>Chi nhánh đầu tiên — Coming Soon.</p></li>
      <li><span>Sắp tới</span><h3>Khai trương Đà Nẵng</h3><p>Tiệm trà gần biển với mì Quảng chay — Coming Soon.</p></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap brandkit">
    <div>
      <p class="eyebrow">Bộ nhận diện</p>
      <h2>Logo &amp; màu sắc</h2>
      <p>Xanh rêu của mái nhà và chồi lá, hồng của cánh sen, nền kem của giấy dó. Ba phiên bản logo cho từng mục đích.</p>
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
${newsletter()}`;
}

// ───────────────────────── CHI NHÁNH ─────────────────────────
export function branches() {
  return `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow">Chi nhánh</p>
    <h1>Nhà An sắp về TP. Hồ Chí Minh &amp; Đà Nẵng</h1>
    <p class="lead">Hai căn tiệm đầu tiên đang được hoàn thiện. Đăng ký để là người đầu tiên biết địa chỉ và nhận quà khai trương.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    ${site.branches.map((b, i) => `
    <article class="bigbranch${i % 2 ? ' bigbranch--rev' : ''}" id="${b.id}">
      <div class="bigbranch__media">${img(b.img, 'Không gian dự kiến ' + b.city, { cls: 'r-lg', eager: i === 0 })}<span class="stamp">Coming<br>Soon</span></div>
      <div class="bigbranch__body">
        <span class="pill pill--soon">${icon('calendar')} Sắp khai trương</span>
        <h2>${b.city}</h2>
        <p>${b.note}</p>
        <ul class="info">
          <li>${icon('pin')}<span><strong>Địa chỉ</strong>${b.address}</span></li>
          <li>${icon('clock')}<span><strong>Giờ mở cửa dự kiến</strong>${site.hours.map(([k, v]) => `${k}: ${v}`).join('<br>')}</span></li>
          <li>${icon('calendar')}<span><strong>Ngày khai trương</strong>Sẽ thông báo tới người đăng ký</span></li>
        </ul>
        <a class="btn btn--primary" href="#dang-ky" data-branch="${b.short}">Báo tôi khi ${b.short} mở cửa ${icon('arrow')}</a>
      </div>
    </article>`).join('')}
  </div>
</section>
<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Ở mỗi chi nhánh', 'Bạn sẽ tìm thấy')}
    <div class="promise">
      <div>${icon('cup')}<h3>Quầy trà mở</h3><p>Xem barista pha ô long và đánh matcha ngay trước mặt.</p></div>
      <div>${icon('cake')}<h3>Tủ bánh trong ngày</h3><p>Bánh nướng từ 5 giờ sáng, hết là hết.</p></div>
      <div>${icon('bowl')}<h3>Bếp chay</h3><p>Điểm tâm và cơm trưa chay cho dân văn phòng.</p></div>
      <div>${icon('leaf')}<h3>Góc sen &amp; cây xanh</h3><p>Chỗ ngồi yên tĩnh để đọc sách, làm việc.</p></div>
    </div>
  </div>
</section>
${newsletter()}`;
}

// ───────────────────────── LIÊN HỆ ─────────────────────────
export function contact() {
  return `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow">Liên hệ</p>
    <h1>Gửi lời nhắn cho Nhà An</h1>
    <p class="lead">Hợp tác, đặt bánh, tiệc trà văn phòng, tuyển dụng hay chỉ là một lời chào — Nhà An luôn muốn nghe.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap contact">
    <form class="form form--card" data-form="contact" novalidate>
      <div class="form__row">
        <label>Họ và tên<input name="name" autocomplete="name" required></label>
        <label>Email hoặc số điện thoại<input name="contact" required></label>
      </div>
      <label>Chủ đề
        <select name="topic">
          <option>Đặt bánh / tiệc trà</option><option>Hợp tác &amp; cung cấp nguyên liệu</option>
          <option>Tuyển dụng</option><option>Góp ý</option><option>Khác</option>
        </select>
      </label>
      <label>Lời nhắn<textarea name="message" rows="5" required placeholder="Nhà An có thể giúp gì cho bạn?"></textarea></label>
      <button class="btn btn--primary" type="submit">Gửi lời nhắn ${icon('arrow')}</button>
    </form>
    <aside class="contact__side">
      <div class="infocard">
        <h3>Chi nhánh</h3>
        <ul class="info">${site.branches.map((b) => `<li>${icon('pin')}<span><strong>${b.city}</strong>Coming Soon — ${b.address.toLowerCase()}</span></li>`).join('')}</ul>
      </div>
      <div class="infocard">
        <h3>Giờ mở cửa dự kiến</h3>
        <ul class="hours">${site.hours.map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`).join('')}</ul>
      </div>
      ${site.email || site.phone ? `<div class="infocard"><h3>Liên lạc trực tiếp</h3><ul class="info">
        ${site.email ? `<li>${icon('mail')}<a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>` : ''}
        ${site.phone ? `<li>${icon('phone')}<a href="tel:${esc(site.phone)}">${esc(site.phone)}</a></li>` : ''}</ul></div>` : ''}
    </aside>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap narrow">
    ${sectionHead('Hỏi nhanh', 'Câu hỏi thường gặp')}
    ${faq()}
  </div>
</section>`;
}

// ───────────────────────── TÍN DỤNG ẢNH ─────────────────────────
export function credits(credits) {
  const L = { by: 'CC BY', 'by-sa': 'CC BY-SA', cc0: 'CC0', pdm: 'Public Domain' };
  return `
<section class="phero">
  <div class="wrap">
    <p class="eyebrow">Tín dụng hình ảnh</p>
    <h1>Cảm ơn các nhiếp ảnh gia</h1>
    <p class="lead">Ảnh món ăn trên website là ảnh minh họa có giấy phép Creative Commons, được cắt và nén lại để hiển thị. Ảnh thật của Nhà An sẽ được cập nhật khi khai trương.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    <div class="credits">
      ${Object.entries(credits).map(([k, c]) => `
      <figure>${img(k, c.title || k)}<figcaption>
        <strong>${esc(c.title || k)}</strong>
        <span>${esc(c.creator || 'Không rõ tác giả')} · <a href="https://creativecommons.org/licenses/${c.license === 'cc0' ? 'publicdomain/zero/1.0' : c.license === 'pdm' ? 'publicdomain/mark/1.0' : c.license + '/' + c.version}/" target="_blank" rel="noopener license">${L[c.license] || c.license.toUpperCase()} ${c.license.startsWith('by') ? c.version : ''}</a> · <a href="${esc(c.source)}" target="_blank" rel="noopener">Nguồn</a></span>
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
    <h1>Trang này đã đi pha trà mất rồi</h1>
    <p class="lead">Không tìm thấy trang bạn cần. Quay về nhà nhé!</p>
    <div class="hero__cta center"><a class="btn btn--primary" href="/">Về trang chủ</a><a class="btn btn--ghost" href="/thuc-don">Xem thực đơn</a></div>
  </div>
</section>`;
}
