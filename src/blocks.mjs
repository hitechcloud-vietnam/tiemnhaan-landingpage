// Dựng trang từ dữ liệu JSON (src/content/pages/vi/*.json) theo từng loại khối (section type).
// Chữ luôn dựng từ bản tiếng Việt; bản dịch đi qua từ điển (xem src/content.mjs). Riêng dữ liệu
// của công cụ tương tác (widget) lấy trực tiếp từ file của ngôn ngữ đang dựng.
import { site } from './data/site.mjs';
import { esc, icon, img, tel, SZ, photoUrl, photos, parentOf, creditOf } from './layout.mjs';
import { head, branchCards, signup } from './pages.mjs';
import { reserveForm } from './pages-studio.mjs';
import { JOBS } from './pages.mjs';
import { resolveImg, pageBySlug, pageData, articlesFor, articleBySlug, catById, readMinutes, curLang, hasArticle } from './content.mjs';

const T = (s = '') => esc(s);
const TE = (s = '') => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
const pic = (slot, alt, opts = {}) => img(resolveImg(slot), alt || '', opts);
const btnCls = { primary: 'btn btn--primary', ghost: 'btn btn--ghost', pink: 'btn btn--pink' };
const btn = (c) => `<a class="${btnCls[c.style] || btnCls.primary}" href="${esc(c.href)}"${/^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : ''}>${T(c.label)}</a>`;
const sectionHead = (s, center = true) => (s.title || s.eyebrow || s.lead ? head(T(s.eyebrow || ''), TE(s.title || ''), T(s.lead || ''), center ? 'shead--center' : 'shead--left') : '');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

// Trang có sẵn (ngoài src/content) để làm thẻ "liên quan"
export const KNOWN = {
  '/': ['Trang chủ', 'Tiệm Nhà An', 'home'],
  '/khong-gian': ['Không gian làm việc & học tập', '4 khu cho 4 tâm trạng', 'laptop'],
  '/dat-ban': ['Đặt bàn 24/7', 'Bàn, phòng họp, studio, tiệc', 'calendar'],
  '/chup-anh': ['Studio áo dài & Góc check-in', 'Thuê áo dài, 6 góc chụp ảnh', 'camera'],
  '/su-kien': ['Lễ Tết & sự kiện', 'Tết, Trung thu, Giáng sinh', 'calendar'],
  '/trai-nghiem': ['Trải nghiệm', 'Workshop, đặt tiệc, Nhà An Club', 'star'],
  '/chi-nhanh': ['5 chi nhánh', 'Sài Gòn · Đà Nẵng · Hội An · Duy Xuyên', 'pin'],
  '/sai-gon': ['Nhà An Sài Gòn', 'Bình Thạnh · Tân Bình', 'pin'],
  '/da-nang-quang-nam': ['Nhà An Đà Nẵng – Quảng Nam', 'Đà Nẵng · Hội An · Duy Xuyên', 'pin'],
  '/tuyen-dung': ['Tuyển dụng', '30–35k/giờ · 10–15 triệu/tháng', 'briefcase'],
  '/tin-tuc': ['Cẩm nang & tin tức', 'Bài viết từ Nhà An', 'card'],
  '/hop-tac': ['Hợp tác & Doanh nghiệp', 'Tiệc trà văn phòng, quà tặng, sự kiện', 'briefcase'],
  '/ve-chung-toi': ['Về Nhà An', 'Câu chuyện, giá trị, nguyên liệu', 'heart'],
  '/hoi-dap': ['Hỏi đáp', 'Những câu hỏi thường gặp', 'chat'],
  '/lien-he': ['Liên hệ', 'Hotline, Zalo, email', 'mail'],
  '/tin-dung-anh': ['Tín dụng hình ảnh', 'Nguồn và giấy phép ảnh', 'camera'],
  '/so-do-trang': ['Sơ đồ trang', 'Tất cả trang trên website', 'map'],
  '/chi-nhanh/binh-thanh': ['Nhà An Bình Thạnh', 'Chi nhánh 1 · TP. Hồ Chí Minh', 'pin'],
  '/chi-nhanh/tan-binh': ['Nhà An Tân Bình', 'Chi nhánh 2 · TP. Hồ Chí Minh', 'pin'],
  '/chi-nhanh/da-nang': ['Nhà An Đà Nẵng', 'Chi nhánh 3 · trung tâm Đà Nẵng', 'pin'],
  '/chi-nhanh/hoi-an': ['Nhà An Hội An', 'Chi nhánh 4 · phố cổ Hội An', 'pin'],
  '/chi-nhanh/duy-xuyen': ['Nhà An Duy Xuyên', 'Chi nhánh 5 · bên sông Thu Bồn', 'pin'],
};
export const linkInfo = (href) => {
  const path = href.split('#')[0];
  if (path.startsWith('/tin-tuc/') && articleBySlug[path.slice(9)]) {
    const a = articleBySlug[path.slice(9)];
    if (!hasArticle(a, curLang())) return null;
    return { title: a.title, desc: a.excerpt, icon: catById[a.category].icon, img: a.cover, kind: catById[a.category].name };
  }
  const p = pageBySlug[path.slice(1)];
  if (p) return { title: p.nav, desc: p.navDesc, icon: p.icon, img: p.image };
  const k = KNOWN[path];
  return k ? { title: k[0], desc: k[1], icon: k[2] } : null;
};

// ───────────── Form ─────────────
const contactForm = (title, preset) => `
<form class="form form--card" data-form="contact" novalidate>
  <h2>${T(title)}</h2>
  <div class="form__row">
    <label>Họ và tên<input name="name" autocomplete="name" required></label>
    <label>Email hoặc số điện thoại<input name="contact" required></label>
  </div>
  <label>Công ty / tổ chức (nếu có)<input name="company" autocomplete="organization"></label>
  <label>Chủ đề<select name="topic">${[preset, 'Đặt bánh / tiệc trà', 'Hộp quà tặng', 'Hợp tác', 'Khác'].filter((x, i, a) => x && a.indexOf(x) === i).map((o) => `<option>${T(o)}</option>`).join('')}</select></label>
  <label>Lời nhắn<textarea name="message" rows="4" required placeholder="Nhà An có thể giúp gì cho bạn?"></textarea></label>
  <button class="btn btn--pink btn--block" type="submit">Gửi lời nhắn ${icon('arrow')}</button>
  <p class="form__note">Hoặc gọi, nhắn Zalo <a href="tel:${tel()}">${site.phoneDisplay}</a> · <a href="mailto:${site.email}">${site.email}</a></p>
</form>`;
const applyForm = (title, preset) => `
<form class="form form--card" data-form="apply" novalidate>
  <h2>${T(title)}</h2>
  <div class="form__row">
    <label>Họ và tên<input name="name" autocomplete="name" required></label>
    <label>Số điện thoại / Zalo<input name="contact" autocomplete="tel" required></label>
  </div>
  <div class="form__row">
    <label>Vị trí<select name="job">${JOBS.map(([j, t]) => `<option value="${T(`${j} (${t})`)}"${j === preset || `${j} (${t})`.startsWith(preset || '¤') ? ' selected' : ''}>${T(j)} (${T(t)})</option>`).join('')}</select></label>
    <label>Chi nhánh<select name="branch">${site.branches.map((b) => `<option value="${b.city}">${b.city}</option>`).join('')}</select></label>
  </div>
  <label>Năm sinh, khu vực, ca có thể làm<textarea name="message" rows="4" required placeholder="Ví dụ: 2003, Bình Thạnh, ca tối thứ 2 – thứ 6"></textarea></label>
  <label class="file">CV (không bắt buộc, PDF/DOC/DOCX/ảnh, tối đa 3 MB)<input type="file" name="cv" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,application/pdf,image/*"></label>
  <button class="btn btn--pink btn--block" type="submit">Gửi hồ sơ ${icon('arrow')}</button>
  <p class="form__note">Hoặc gửi CV tới <a href="mailto:${site.email}">${site.email}</a> · Zalo <a href="${site.social.zalo}" target="_blank" rel="noopener">${site.phoneDisplay}</a></p>
</form>`;
const feedbackForm = (title) => `
<form class="form form--card" data-form="feedback" novalidate>
  <h2>${T(title)}</h2>
  <fieldset class="rate">
    <legend>Bạn chấm Nhà An mấy sao?</legend>
    <div class="rate__stars">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="rate-${n}" name="rating" value="${n} sao"${n === 5 ? ' checked' : ''}><label for="rate-${n}" title="${n} sao">${icon('star')}<span class="sr-only">${n} sao</span></label>`).join('')}</div>
  </fieldset>
  <div class="form__row">
    <label>Họ và tên<input name="name" autocomplete="name" required></label>
    <label>Email hoặc số điện thoại<input name="contact" required></label>
  </div>
  <div class="form__row">
    <label>Chi nhánh<select name="branch"><option value="Chung">Chung / website</option>${site.branches.map((b) => `<option value="${b.city}">${b.city}</option>`).join('')}</select></label>
    <label>Chủ đề<select name="topic"><option>Đồ uống</option><option>Món ăn & bánh</option><option>Không gian</option><option>Phục vụ</option><option>Website</option><option>Khác</option></select></label>
  </div>
  <label>Góp ý của bạn<textarea name="message" rows="5" required placeholder="Điều bạn thích, điều Nhà An cần làm tốt hơn…"></textarea></label>
  <button class="btn btn--primary btn--block" type="submit">Gửi góp ý ${icon('arrow')}</button>
</form>`;

function formSection(s, lang) {
  const k = s.kind;
  if (k === 'signup') return signup(s.id || 'dang-ky');
  const form = k === 'reserve' ? reserveForm(s.title, s.preset || '') : k === 'apply' ? applyForm(s.title, s.preset) : k === 'feedback' ? feedbackForm(s.title) : contactForm(s.title, s.preset);
  return `
<section class="section section--cream bform"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap bform__in">
    <div class="bform__text">
      ${s.eyebrow ? `<p class="eyebrow">${T(s.eyebrow)}</p>` : ''}
      <p class="bform__lead">${T(s.lead)}</p>
      <ul class="info">
        <li>${icon('phone')}<span><strong>Hotline / Zalo</strong><a href="tel:${tel()}">${site.phoneDisplay}</a></span></li>
        <li>${icon('mail')}<span><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li>${icon('clock')}<span><strong>Mở cửa</strong>24/7, kể cả lễ Tết</span></li>
      </ul>
    </div>
    ${form}
  </div>
</section>`;
}

// ───────────── Công cụ tương tác: phần dựng sẵn (không cần JS) ─────────────
function widgetFallback(s) {
  const d = s.data || {};
  switch (s.name) {
    case 'brew':
      return `<div class="btable"><table><thead><tr><th scope="col">Loại trà</th><th scope="col">Lượng trà</th><th scope="col">Nhiệt độ nước</th><th scope="col">Thời gian hãm</th></tr></thead><tbody>${(d.presets || []).map((p) => `<tr><th scope="row">${T(p.name)}</th><td>${p.grams} g / 100 ml</td><td>${p.temp}°C</td><td>${(p.steeps || []).map((x) => (x >= 3600 ? `${Math.round(x / 3600)} giờ` : `${x} giây`)).join(' · ')}</td></tr>`).join('')}</tbody></table></div>`;
    case 'quiz':
      return `<ol class="quiz__static">${(d.questions || []).map((q) => `<li><strong>${T(q.q)}</strong><ul>${q.options.map((o) => `<li>${T(o.label)}</li>`).join('')}</ul></li>`).join('')}</ol>`;
    case 'calendar':
      return `<ul class="cal-list">${(d.events || []).map((e) => `<li><time datetime="${e.start}">${e.start.split('-').reverse().join('/')}</time><div><strong>${T(e.title)}</strong><p>${T(e.text || '')}</p></div></li>`).join('')}</ul>`;
    case 'focus':
      return `<p class="widget__nojs">Bật JavaScript để dùng đồng hồ tập trung. Gợi ý: ${(d.modes || []).map((m) => `${T(m.name)} ${m.work}/${m.rest} phút`).join(' · ')}.</p>`;
    case 'search':
      return `<form class="search" action="" role="search"><label class="sr-only" for="q">Tìm trên website</label><input id="q" name="q" type="search" placeholder="Tìm trà, chi nhánh, bài viết…" autocomplete="off"><button class="btn btn--primary" type="submit">Tìm</button></form>${d.popular ? `<p class="search__pop"><span>Tìm nhiều:</span> ${d.popular.map((x) => `<a href="?q=${encodeURIComponent(x)}">${T(x)}</a>`).join('')}</p>` : ''}<div class="search__res" aria-live="polite"></div>`;
    case 'gallery':
      return galleryStatic();
    default:
      return '';
  }
}

// Nhóm ảnh cho thư viện ảnh (theo tiền tố key)
export const GALLERY_CATS = [
  ['tra', 'Trà & đồ uống', /^(origin|craft|brew|lotus|leaf|drink|tea|oolong|matcha|milktea|iced|fruit-tea|phin|pink-drinks|berry|latte|cozy-tea|cozy-cocoa)/],
  ['banh', 'Bánh & món chay', /^(bake|cake|vncake|veg|market|croissant|macarons|tiramisu|pannacotta|icecream|tofu|pho-chay|mi-quang|banh|vegan|saigon-vendor)/],
  ['khong-gian', 'Không gian', /^(work|cafe|night-cafe|meet|book|cozy|focus|cowork|chat|friends|polaroid|flower-wall|cheers|night-acoustic)/],
  ['van-hoa', 'Văn hóa & lễ hội', /^(tet|trungthu|aodai|craftvn|fest|valentine|xmas|silk)/],
  ['vung-mien', 'Vùng miền', /^(hcm|danang|hoian|qnam|land|lm-|saigon|mykhe|thubon|golden|night-|hoian)/],
  ['song-xanh', 'Sống xanh & cộng đồng', /^(green|club|gift)/],
];
const THEME_CAT = { tra: 'tra', banh: 'banh', chay: 'banh', 'nguyen-lieu': 'banh', 'khong-gian': 'khong-gian', 'van-hoa': 'van-hoa', 'vung-mien': 'vung-mien', 'qua-tang': 'song-xanh', 'song-xanh': 'song-xanh' };
export const galleryCat = (k) => (photos[k] && THEME_CAT[photos[k].theme]) || (GALLERY_CATS.find(([, , re]) => re.test(k)) || ['khong-gian'])[0];
export function galleryStatic(limit = 24) {
  const keys = Object.keys(photos).sort((a, b) => (photos[b].added || '').localeCompare(photos[a].added || '') || a.localeCompare(b)).slice(0, limit);
  return `<div class="gal__filters" role="toolbar" aria-label="Lọc ảnh"><button type="button" class="chip-btn is-on" data-cat="all" aria-pressed="true">Tất cả</button>${GALLERY_CATS.map(([id, n]) => `<button type="button" class="chip-btn" data-cat="${id}" aria-pressed="false">${n}</button>`).join('')}</div>
<div class="gal__grid">${keys.map((k) => `<figure class="gal__i" data-cat="${galleryCat(k)}"><a href="${photoUrl(k)}" data-lightbox="gal" data-caption="${esc(photos[k].title || '')}" data-credit="${esc(creditOf(k))}">${img(k, photos[k].title || '', { sizes: SZ.small })}</a><figcaption>${T(photos[k].title || '')}</figcaption></figure>`).join('')}</div>
<p class="gal__more"><button type="button" class="btn btn--ghost" data-more hidden>Xem thêm ảnh</button></p>`;
}

const WIDGET_JS = { brew: 'brew', focus: 'focus', quiz: 'quiz', giftfinder: 'quiz', seatfinder: 'quiz', calendar: 'calendar', search: 'search', gallery: 'gallery', caffeine: 'caffeine', sugar: 'sugar', countdown: 'countdown', lunar: 'lunar', split: 'split', card: 'card', randomizer: 'randomizer', planner: 'planner' };
// Ô ảnh trong dữ liệu công cụ → đường dẫn ảnh thật (JS phía trình duyệt không tự đổi được)
const resolveData = (v, k) => {
  if (Array.isArray(v)) return v.map((x) => resolveData(x, k));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([kk, vv]) => [kk, resolveData(vv, kk)]));
  if (k === 'img' && typeof v === 'string') return photoUrl(resolveImg(v), 'w800');
  return v;
};
function widgetSection(s, lang, slug) {
  const tr = pageData(slug, lang);
  const ts = (tr.sections || []).find((x) => x.type === 'widget' && x.name === s.name) || s;
  return `
<section class="section bwidget"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="widget widget--${s.name}" data-widget="${s.name}">
      <script type="application/json" class="widget__data">${json(resolveData(ts.data || {}))}</script>
      <div class="widget__mount">${widgetFallback(s)}</div>
    </div>
  </div>
</section>`;
}

// ───────────── Các khối ─────────────
const postCard = (a, cls = 'post') => `
<a class="${cls}" href="/tin-tuc/${a.slug}">
  ${img(resolveImg(a.cover), a.coverAlt || a.title, { sizes: SZ.card3 })}
  <div class="post__body">
    <span class="post__meta"><b>${T(catById[a.category].name)}</b> · ${readMinutes(a)} phút đọc</span>
    <h3 class="post__title">${T(a.title)}</h3>
    <p>${T(a.excerpt)}</p>
  </div>
</a>`;
export { postCard };

const RENDER = {
  intro: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap bsplit${s.reverse ? ' bsplit--rev' : ''}">
    <div class="bsplit__text">
      ${s.eyebrow ? `<p class="eyebrow">${T(s.eyebrow)}</p>` : ''}
      <h2>${TE(s.title)}</h2>
      ${(s.paras || []).map((p) => `<p>${T(p)}</p>`).join('')}
      ${s.bullets && s.bullets.length ? `<ul class="ticks">${s.bullets.map((b) => `<li>${T(b)}</li>`).join('')}</ul>` : ''}
      ${s.cta ? `<p class="bsplit__cta">${btn({ style: 'primary', ...s.cta })}</p>` : ''}
    </div>
    <figure class="bsplit__img">${pic(s.img, s.alt, { sizes: '(max-width: 900px) 92vw, 560px' })}</figure>
  </div>
</section>`,
  features: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="bfeat bfeat--${Math.min(s.items.length, 4) === 3 || s.items.length === 6 || s.items.length === 5 ? 3 : Math.min(s.items.length, 4)}">
      ${s.items.map((it) => `<div class="bfeat__i">${icon(it.icon)}<h3>${T(it.title)}</h3><p>${T(it.text)}</p></div>`).join('')}
    </div>
  </div>
</section>`,
  cards: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="bcards bcards--${s.items.length % 3 === 0 || s.items.length === 5 ? 3 : s.items.length === 4 ? 4 : 2}">
      ${s.items.map((it) => {
        const inner = `${pic(it.img, it.alt, { sizes: SZ.card3 })}<div class="bcard__body">${it.tag ? `<span class="tile__tag">${T(it.tag)}</span>` : ''}<h3>${T(it.title)}</h3><p>${T(it.text)}</p>${it.href ? `<span class="bcard__more">Xem thêm ${icon('arrow')}</span>` : ''}</div>`;
        return it.href ? `<a class="bcard" href="${esc(it.href)}">${inner}</a>` : `<article class="bcard">${inner}</article>`;
      }).join('')}
    </div>
  </div>
</section>`,
  gallery: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="bgal bgal--${Math.min(s.items.length, 8)}">
      ${s.items.map((it) => { const k = resolveImg(it.img); return `<figure class="bgal__i"><a href="${photoUrl(k)}" data-lightbox="g" data-caption="${esc(it.caption || '')}" data-credit="${esc(creditOf(k))}">${img(k, it.caption || '', { sizes: SZ.tile })}</a><figcaption>${T(it.caption || '')}</figcaption></figure>`; }).join('')}
    </div>
  </div>
</section>`,
  steps: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <ol class="bsteps bsteps--${s.items.length > 4 ? 3 : s.items.length}">
      ${s.items.map((it, i) => `<li><span class="bsteps__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${T(it.title)}</h3><p>${T(it.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>`,
  stats: (s) => `
<section class="bstats"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap"><dl class="bstats__in">${s.items.map((it) => `<div><dt>${T(it.num)}</dt><dd>${T(it.label)}</dd></div>`).join('')}</dl></div>
</section>`,
  quote: (s) => `
<section class="section bquote"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap narrow"><figure>${icon('quote')}<blockquote><p>${T(s.text)}</p></blockquote>${s.cite ? `<figcaption>${T(s.cite)}</figcaption>` : ''}</figure></div>
</section>`,
  faq: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap narrow">
    ${sectionHead(s)}
    <div class="faq">${s.items.map((it, i) => `<details${i === 0 ? ' open' : ''}><summary>${T(it.q)}</summary><p>${T(it.a)}</p></details>`).join('')}</div>
  </div>
</section>`,
  cta: (s) => `
<section class="section section--tight"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    <div class="callout bcta"><div><h2 class="bcta__t">${TE(s.title)}</h2><p>${T(s.text)}</p></div><div class="callout__btns">${(s.ctas || []).map((c) => `<a class="btn ${c.style === 'ghost' ? 'btn--light' : 'btn--pink'}" href="${esc(c.href)}"${/^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : ''}>${T(c.label)}</a>`).join('')}</div></div>
  </div>
</section>`,
  checklist: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="bcheck bcheck--${s.cols.length}">
      ${s.cols.map((c) => `<div class="bcheck__c">${c.icon ? icon(c.icon) : ''}<h3>${T(c.title)}</h3><ul class="checks">${c.items.map((x) => `<li>${T(x)}</li>`).join('')}</ul></div>`).join('')}
    </div>
  </div>
</section>`,
  table: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <div class="btable" role="region" aria-label="${T(s.title.replace(/\*/g, ''))}" tabindex="0"><table>
      <thead><tr>${s.head.map((h) => `<th scope="col">${T(h)}</th>`).join('')}</tr></thead>
      <tbody>${s.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${T(c)}</th>` : `<td>${T(c)}</td>`)).join('')}</tr>`).join('')}</tbody>
    </table></div>
  </div>
</section>`,
  timeline: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead(s)}
    <ol class="btime">
      ${s.items.map((it) => `<li class="btime__i${it.img ? ' btime__i--img' : ''}"><span class="btime__label">${T(it.label)}</span><div class="btime__body"><h3>${T(it.title)}</h3><p>${T(it.text)}</p></div>${it.img ? `<figure class="btime__img">${pic(it.img, it.alt || it.title, { sizes: SZ.small })}</figure>` : ''}</li>`).join('')}
    </ol>
  </div>
</section>`,
  posts: (s) => {
    const list = articlesFor().filter((a) => (!s.category || a.category === s.category) && (!s.tag || a.tags.includes(s.tag))).slice(0, s.limit || 3);
    if (!list.length) return '';
    return `
<section class="section section--cream"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead({ eyebrow: s.eyebrow || 'Cẩm nang', title: s.title, lead: s.lead })}
    <div class="posts">${list.map((a) => postCard(a)).join('')}</div>
    <p class="center"><a class="btn btn--ghost" href="${s.category ? `/tin-tuc/chu-de/${s.category}` : '/tin-tuc'}">Xem tất cả bài viết ${icon('arrow')}</a></p>
  </div>
</section>`;
  },
  branches: (s) => `
<section class="section"${s.id ? ` id="${s.id}"` : ''}>
  <div class="wrap">
    ${sectionHead({ eyebrow: s.eyebrow || 'Chi nhánh', title: s.title || '5 chi nhánh, *mở cửa 24/7*', lead: s.lead })}
    ${branchCards()}
  </div>
</section>`,
  note: (s) => `<div class="wrap"><p class="bnote">${icon('spark')}<span>${T(s.text)}</span></p></div>`,
};

export const crumbsHtml = (path, title, cls = 'bcrumbs') => {
  const parent = parentOf(path);
  return `<nav class="${cls}" aria-label="Đường dẫn"><a href="/">Trang chủ</a><span aria-hidden="true">/</span>${parent ? `<a href="${parent[2]}">${parent[1]}</a><span aria-hidden="true">/</span>` : ''}<span aria-current="page">${T(title)}</span></nav>`;
};

export function relatedSection(hrefs, title = 'Có thể bạn *quan tâm*') {
  const items = (hrefs || []).map((h) => [h, linkInfo(h)]).filter(([, x]) => x);
  if (!items.length) return '';
  return `
<section class="section section--tight brel">
  <div class="wrap">
    ${head('Xem tiếp', TE(title))}
    <div class="brel__grid">${items.map(([h, x]) => `<a class="brel__i" href="${esc(h)}">${icon(x.icon || 'arrow')}<span><strong>${T(x.title)}</strong><small>${T(x.desc || '')}</small></span>${icon('arrow', 'ic brel__go')}</a>`).join('')}</div>
  </div>
</section>`;
}

// Bộ nhận diện cho trang Báo chí: tải logo, bấm để sao chép mã màu
const brandKit = () => `
<section class="section bkit" id="bo-nhan-dien">
  <div class="wrap">
    ${head('Tải về', 'Logo &amp; *màu thương hiệu*'.replace(/\*([^*]+)\*/g, '<em>$1</em>'), 'Dùng đúng file gốc, không đổi màu, không kéo méo, chừa khoảng trống quanh logo.')}
    <div class="bkit__logos">
      ${[['logo-horizontal.png', 'Logo ngang', 'PNG nền trong suốt'], ['logo-circle.png', 'Logo tròn', 'PNG 328 × 328'], ['logo-app.png', 'Biểu tượng ứng dụng', 'PNG vuông']].map(([f, n, d]) => `<a class="bkit__logo" href="/assets/img/brand/${f}" download data-nolocal><span class="bkit__prev"><img src="/assets/img/brand/${f}" alt="${n} Tiệm Nhà An" loading="lazy" decoding="async"></span><strong>${n}</strong><small>${d}</small><span class="bkit__dl">${icon('download')} Tải về</span></a>`).join('')}
    </div>
    <div class="bkit__colors">
      ${[['Xanh rêu', '#31492E'], ['Xanh lá', '#41593D'], ['Hồng sen', '#F5747E'], ['Hồng phấn', '#FBB2B0'], ['Kem', '#FCFAF5']].map(([n, c]) => `<button type="button" class="bkit__c" data-copy="${c}" style="--c:${c}"><span class="bkit__sw" aria-hidden="true"></span><strong>${n}</strong><code>${c}</code><small>Bấm để sao chép</small></button>`).join('')}
    </div>
  </div>
</section>`;

// Trang hoàn chỉnh từ dữ liệu JSON
export function renderPage(slug, lang = 'vi') {
  const p = pageBySlug[slug];
  const h = p.hero;
  const scripts = new Set();
  const body = (p.sections || []).map((s) => {
    if (s.type === 'form') return formSection(s, lang);
    if (s.type === 'widget') { scripts.add(WIDGET_JS[s.name]); return widgetSection(s, lang, slug); }
    if (s.type === 'gallery') scripts.add('lightbox');
    const r = RENDER[s.type];
    return r ? r(s) : '';
  }).join('');
  const html = `
<section class="phero bhero">
  <div class="wrap phero__in">
    <div>
      ${crumbsHtml(p.path, p.nav)}
      <p class="eyebrow">${T(h.eyebrow)}</p>
      <h1>${TE(h.title)}</h1>
      <p class="lead">${T(h.lead)}</p>
      ${h.ctas && h.ctas.length ? `<div class="hero__cta">${h.ctas.map(btn).join('')}</div>` : ''}
    </div>
    <figure class="phero__img">${pic(h.img, h.alt, { eager: true, sizes: '(max-width: 900px) 92vw, 560px' })}</figure>
  </div>
</section>
${body}
${slug === 'bao-chi' ? brandKit() : ''}
${relatedSection(p.related)}`;
  return { html, scripts: [...scripts].filter(Boolean) };
}

export const faqSchemaOf = (slug) => {
  const items = (pageBySlug[slug].sections || []).filter((s) => s.type === 'faq').flatMap((s) => s.items);
  return items.length ? [{ '@type': 'FAQPage', mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) }] : [];
};
