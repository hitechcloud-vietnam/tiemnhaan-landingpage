import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { site } from './data/site.mjs';

const photos = JSON.parse(readFileSync(new URL('./data/photos.json', import.meta.url), 'utf8'));
export { photos };

// Gắn mã phiên bản (hash nội dung) vào URL tài nguyên để trình duyệt luôn lấy bản mới nhất
const PUBLIC = new URL('../public/', import.meta.url);
const hashes = new Map();
export const fileHash = (path) => {
  if (!hashes.has(path)) {
    const f = new URL('.' + path, PUBLIC);
    hashes.set(path, existsSync(f) ? createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 10) : '');
  }
  return hashes.get(path);
};
export const assetUrl = (path) => (fileHash(path) ? `${path}?v=${fileHash(path)}` : path);

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const tel = () => '+84' + site.phone.replace(/\D/g, '').replace(/^0/, '');

const P = (d) => `<path d="${d}"/>`;
const ICONS = {
  cup: P('M6 8h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z') + P('M5 8h14') + P('M9 8l1-5h4') + P('M7 13h10'),
  leaf: P('M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z') + P('M5 19 14 10'),
  whisk: P('M12 3v7') + P('M8 10h8l-1 10a2 2 0 0 1-2 1.8h-2A2 2 0 0 1 9 20Z') + P('M10 14h4'),
  cake: P('M4 21h16v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8Z') + P('M4 16c2 1.3 4 1.3 6 0s4-1.3 6 0 3 1 4 0') + P('M12 11V7') + P('M12 3.5c.8.8.8 2 0 2.5-.8-.5-.8-1.7 0-2.5Z'),
  sun: '<circle cx="12" cy="12" r="4"/>' + P('M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'),
  moon: P('M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z'),
  bowl: P('M3 11h18a9 9 0 0 1-18 0Z') + P('M8 21h8') + P('M14 3 9 11M18 4l-5 7'),
  clock: '<circle cx="12" cy="12" r="9"/>' + P('M12 7v5l3 2'),
  pin: P('M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z') + '<circle cx="12" cy="9.5" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/>' + P('m3 7 9 6 9-6'),
  phone: P('M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'),
  arrow: P('M5 12h14M13 6l6 6-6 6'),
  menu: P('M4 7h16M4 12h16M4 17h16'),
  close: P('M6 6l12 12M18 6 6 18'),
  heart: P('M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z'),
  sprout: P('M12 21v-9') + P('M12 12c0-4 3-7 8-7 0 5-3 7-8 7Z') + P('M12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5Z'),
  hand: P('M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 11.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 15a1.5 1.5 0 0 1 2.5-1.7L7 15V11'),
  home: P('M3 11 12 4l9 7') + P('M5 10v10h14V10') + P('M10 20v-5h4v5'),
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/>' + P('M3 10h18M8 3v4M16 3v4'),
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/>' + P('M5 13v8h14v-8M12 8v13') + P('M12 8C10 4 6 4 6.5 6.5S12 8 12 8Zm0 0c2-4 6-4 5.5-1.5S12 8 12 8Z'),
  star: P('m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z'),
  camera: P('M4 8h3l2-3h6l2 3h3v12H4Z') + '<circle cx="12" cy="13.5" r="3.5"/>',
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/>' + P('M2 19h20'),
  users: '<circle cx="9" cy="8" r="3.5"/>' + P('M2.5 20a6.5 6.5 0 0 1 13 0') + P('M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6'),
  music: P('M9 18V5l11-2v13') + '<circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/>' + P('M2.5 10h19M6 15h4'),
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/>' + P('M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18'),
  facebook: P('M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z'),
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  tiktok: P('M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5') + P('M14 3c.5 2.5 2.5 4.5 5 4.5'),
  chat: P('M4 5h16v11H9l-5 4V5Z') + P('M8 10h8M8 13h5'),
  globe: '<circle cx="12" cy="12" r="9"/>' + P('M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z'),
};
export const icon = (name, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

// Ảnh nhiều kích cỡ do scripts/images.py tạo (w320, w800). Chỉ dùng bản thu nhỏ khi nó
// được tạo từ đúng ảnh gốc hiện tại (so mã hash), tránh hiển thị ảnh cũ sau khi thay ảnh.
const VARIANTS_FILE = new URL('../public/assets/img/photos/variants.json', import.meta.url);
const variants = existsSync(VARIANTS_FILE) ? JSON.parse(readFileSync(VARIANTS_FILE, 'utf8')) : {};
const hasVariant = (key, size) => {
  const v = variants[key];
  return !!(v && v[size] && v.hash === fileHash(`/assets/img/photos/${key}.webp`));
};
export const photoUrl = (key, size) => {
  if (!photos[key]) throw new Error('Không có ảnh: ' + key);
  const v = fileHash(`/assets/img/photos/${key}.webp`);
  return size && hasVariant(key, size) ? `/assets/img/photos/${size}/${key}.webp?v=${v}` : `/assets/img/photos/${key}.webp?v=${v}`;
};

export const img = (key, alt, { cls = '', eager = false, sizes = '(max-width: 700px) 92vw, 600px' } = {}) => {
  const p = photos[key];
  if (!p) throw new Error('Không có ảnh: ' + key);
  const [w, h] = p.size;
  const set = [];
  if (hasVariant(key, 'w320')) set.push(`${photoUrl(key, 'w320')} 320w`);
  if (hasVariant(key, 'w800')) set.push(`${photoUrl(key, 'w800')} 800w`);
  set.push(`${photoUrl(key)} ${w}w`);
  const srcset = set.length > 1 ? ` srcset="${set.join(', ')}" sizes="${sizes}"` : '';
  return `<img src="${photoUrl(key)}"${srcset} alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
};

// Cỡ hiển thị chuẩn của các lưới ảnh (giúp trình duyệt chọn bản ảnh vừa đủ nét)
export const SZ = {
  card3: '(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 380px',
  card4: '(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 290px',
  tile: '(max-width: 860px) 46vw, 300px',
  small: '(max-width: 600px) 46vw, 240px',
};

// Logo cỡ nhỏ (webp) cho màn hình thường và màn hình nét
export const logoImg = (kind, display, alt = '', attrs = '') => {
  const [a, b] = kind === 'app' ? ['/assets/img/brand/logo-app-320.webp', '/assets/img/brand/logo-app-320.webp'] : display <= 48 ? ['/assets/img/brand/logo-circle-96.webp', '/assets/img/brand/logo-circle-192.webp'] : ['/assets/img/brand/logo-circle-192.webp', '/assets/img/brand/logo-circle-192.webp'];
  const srcset = a !== b ? ` srcset="${assetUrl(a)} 1x, ${assetUrl(b)} 2x"` : '';
  return `<img src="${assetUrl(a)}"${srcset} alt="${esc(alt)}" width="${display}" height="${display}"${attrs ? ' ' + attrs : ''}>`;
};


export const LANGS = [
  ['vi', 'Tiếng Việt', 'VI', 'vi_VN'],
  ['en', 'English', 'EN', 'en_US'],
  ['ja', '日本語', 'JA', 'ja_JP'],
  ['ko', '한국어', 'KO', 'ko_KR'],
  ['zh', '中文', '中文', 'zh_CN'],
];
export const langPath = (lang, path) => (lang === 'vi' ? path : `/${lang}${path === '/' ? '/' : path}`);

const SPACES = [
  ['hop', 'Phòng Họp Hanh Thông', 'Họp team, đồ án, phỏng vấn', 'meet-room'],
  ['am', 'Góc Ấm Nhà An', 'Sofa, đèn vàng, đọc sách', 'cozy-lounge'],
  ['deadline', 'Phòng Chạy Deadline', 'Yên lặng, tập trung, mở 24/7', 'focus-man'],
  ['rom-ra', 'Sân Rôm Rả', 'Hội bạn, học nhóm, board game', 'chat-friends'],
];

const thumb = (k) => `<img src="${photoUrl(k, 'w320')}" alt="" width="64" height="64" loading="lazy" decoding="async">`;

const megaExplore = () => `
<div class="mega" role="region" aria-label="Khám phá">
  <div class="mega__in mega__in--3">
    <div>
      <p class="mega__title">Không gian làm việc &amp; học tập</p>
      <ul class="mega__list mega__list--thumb">
        ${SPACES.map(([id, n, d, k]) => `<li><a href="/khong-gian#${id}">${thumb(k)}<span><strong>${n}</strong><small>${d}</small></span></a></li>`).join('')}
      </ul>
    </div>
    <div>
      <p class="mega__title">Trải nghiệm</p>
      <ul class="mega__list">
        <li><a href="/khong-gian">${icon('laptop')}<span><strong>Tất cả không gian</strong><small>4 khu cho 4 tâm trạng</small></span></a></li>
        <li><a href="/chup-anh">${icon('camera')}<span><strong>Studio áo dài &amp; Góc check-in</strong><small>Thuê áo dài, 6 góc chụp ảnh</small></span></a></li>
        <li><a href="/su-kien">${icon('calendar')}<span><strong>Lễ Tết &amp; sự kiện</strong><small>Tết, Trung thu, Giáng sinh</small></span></a></li>
        <li><a href="/dat-ban">${icon('cup')}<span><strong>Đặt bàn 24/7</strong><small>Bàn, phòng họp, studio, tiệc</small></span></a></li>
        <li><a href="/trai-nghiem#club">${icon('star')}<span><strong>Nhà An Club</strong><small>Tích điểm, quà sinh nhật</small></span></a></li>
      </ul>
    </div>
    <a class="mega__card" href="/khong-gian">
      <img src="${photoUrl('cowork-cafe', 'w800')}" alt="" width="400" height="260" loading="lazy" decoding="async">
      <span class="mega__card-body"><small>Mới</small><strong>Nơi chạy deadline của giới trẻ</strong><em>Khám phá ngay →</em></span>
    </a>
  </div>
</div>`;

const megaBranches = () => `
<div class="mega" role="region" aria-label="Chi nhánh">
  <div class="mega__in mega__in--3">
    ${site.regions.map((r) => `
    <div>
      <a class="mega__region" href="${r.path}"><img src="${photoUrl(r.img, 'w800')}" alt="" width="400" height="200" loading="lazy" decoding="async"><span>${r.name}</span></a>
      <ul class="mega__list">
        ${site.branches.filter((b) => b.region === r.id).map((b) => `<li><a href="/chi-nhanh/${b.id}">${icon('pin')}<span><strong>${b.city}</strong><small>${b.area}</small></span></a></li>`).join('')}
      </ul>
    </div>`).join('')}
    <div class="mega__aside">
      <p class="mega__title">5 chi nhánh · 2 miền</p>
      <p>Bình Thạnh, Tân Bình ở Sài Gòn; trung tâm Đà Nẵng, phố cổ Hội An, Duy Xuyên ở miền Trung. Mở cửa 24/7.</p>
      <a class="btn btn--primary" href="/chi-nhanh">Tất cả chi nhánh</a>
      <a class="btn btn--ghost" href="/chi-nhanh#dang-ky">Nhận tin khai trương</a>
    </div>
  </div>
</div>`;

const megaAbout = () => `
<div class="mega mega--sm" role="region" aria-label="Về Nhà An">
  <div class="mega__in mega__in--2">
    <ul class="mega__list">
      <li><a href="/ve-chung-toi">${icon('home')}<span><strong>Câu chuyện Nhà An</strong><small>Mái nhà, đóa sen, chồi lá</small></span></a></li>
      <li><a href="/tin-tuc">${icon('card')}<span><strong>Tin tức</strong><small>Khai trương, sự kiện, câu chuyện</small></span></a></li>
      <li><a href="/hoi-dap">${icon('chat')}<span><strong>Hỏi đáp</strong><small>Những câu hỏi thường gặp</small></span></a></li>
      <li><a href="/hop-tac">${icon('briefcase')}<span><strong>Hợp tác &amp; Doanh nghiệp</strong><small>Tiệc trà văn phòng, quà tặng, sự kiện</small></span></a></li>
      <li><a href="/tuyen-dung">${icon('briefcase')}<span><strong>Tuyển dụng</strong><small>30–35k/giờ · 10–15 triệu/tháng</small></span></a></li>
    </ul>
    <a class="mega__card" href="/tuyen-dung">
      <img src="${photoUrl('chat-friends', 'w800')}" alt="" width="400" height="260" loading="lazy" decoding="async">
      <span class="mega__card-body"><small>Đang tuyển</small><strong>Về làm nhà với Nhà An</strong><em>BHXH, BHYT đầy đủ →</em></span>
    </a>
  </div>
</div>`;

const NAV = [
  ['/khong-gian', 'Khám phá', 'explore', megaExplore, ['spaces', 'experience', 'studio', 'events', 'reserve']],
  ['/chi-nhanh', 'Chi nhánh', 'branches', megaBranches, ['branches', 'saigon', 'mientrung', 'branch']],
  ['/tuyen-dung', 'Tuyển dụng', 'hiring'],
  ['/tin-tuc', 'Tin tức', 'news', null, ['news', 'article']],
  ['/ve-chung-toi', 'Về Nhà An', 'about', megaAbout, ['about', 'faq', 'partners']],
  ['/lien-he', 'Liên hệ', 'contact'],
];

const navItem = (page) => ([href, label, key, mega, keys = [key]]) => {
  const cur = keys.includes(page);
  if (!mega) return `<li><a class="nav__link" href="${href}"${cur ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<li class="has-mega"><a class="nav__link" href="${href}"${cur ? ' aria-current="page"' : ''} aria-haspopup="true" aria-expanded="false">${label} <span class="caret" aria-hidden="true">▾</span></a>${mega()}</li>`;
};

const langSwitch = (path, cls = '') => `
<div class="lang ${cls}">
  <button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Ngôn ngữ: </span>${icon('globe')}<span class="lang__cur">VI</span></button>
  <ul class="lang__menu">${LANGS.map(([l, name, short]) => `<li><a class="lang__opt" data-nolocal data-lang="${l}" hreflang="${l}" href="${langPath(l, path)}"><b>${short}</b> ${name}</a></li>`).join('')}</ul>
</div>`;

const drawer = (path, page) => `
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer__head">
      <a href="/"><img src="${assetUrl('/assets/img/brand/logo-horizontal-360.webp')}" srcset="${assetUrl('/assets/img/brand/logo-horizontal-360.webp')} 360w, ${assetUrl('/assets/img/brand/logo-horizontal.webp')} 660w" sizes="180px" alt="${site.name}" width="660" height="204"></a>
      <button class="drawer__close" type="button" data-drawer-close aria-label="Đóng menu">${icon('close')}</button>
    </div>
    <div class="drawer__langs">${LANGS.map(([l, , short]) => `<a class="lang__opt" data-nolocal data-lang="${l}" hreflang="${l}" href="${langPath(l, path)}">${short}</a>`).join('')}</div>
    <nav class="drawer__nav" aria-label="Menu di động">
      <a class="drawer__link${page === 'home' ? ' is-cur' : ''}" href="/">${icon('home')} Trang chủ</a>
      <a class="drawer__link drawer__link--hot${page === 'reserve' ? ' is-cur' : ''}" href="/dat-ban">${icon('calendar')} Đặt bàn <em class="drawer__badge">24/7</em></a>
      <details${['spaces', 'experience', 'studio', 'events'].includes(page) ? ' open' : ''}><summary>${icon('laptop')} Khám phá</summary>
        <div class="drawer__sub">
          ${SPACES.map(([id, n, d, k]) => `<a href="/khong-gian#${id}">${thumb(k)}<span><strong>${n}</strong><small>${d}</small></span></a>`).join('')}
          <a href="/chup-anh">${icon('camera')}<span><strong>Studio áo dài &amp; Góc check-in</strong><small>Thuê áo dài, 6 góc chụp ảnh</small></span></a>
          <a href="/su-kien">${icon('calendar')}<span><strong>Lễ Tết &amp; sự kiện</strong><small>Tết, Trung thu, Giáng sinh</small></span></a>
          <a href="/trai-nghiem">${icon('star')}<span><strong>Trải nghiệm</strong><small>Workshop, đặt tiệc, Nhà An Club</small></span></a>
        </div>
      </details>
      <details${['branches', 'saigon', 'mientrung', 'branch'].includes(page) ? ' open' : ''}><summary>${icon('pin')} Chi nhánh</summary>
        <div class="drawer__sub">
          ${site.regions.map((r) => `<a href="${r.path}">${thumb(r.img)}<span><strong>${r.name}</strong><small>${site.branches.filter((b) => b.region === r.id).map((b) => b.short).join(' · ')}</small></span></a>`).join('')}
          ${site.branches.map((b) => `<a href="/chi-nhanh/${b.id}">${thumb(b.img)}<span><strong>${b.city}</strong><small>${b.area}</small></span></a>`).join('')}
          <a href="/chi-nhanh">${icon('pin')}<span><strong>Tất cả 5 chi nhánh</strong><small>Sài Gòn · Đà Nẵng · Hội An · Duy Xuyên</small></span></a>
        </div>
      </details>
      <a class="drawer__link${page === 'hiring' ? ' is-cur' : ''}" href="/tuyen-dung">${icon('briefcase')} Tuyển dụng <em class="drawer__badge">Đang tuyển</em></a>
      <a class="drawer__link${['news', 'article'].includes(page) ? ' is-cur' : ''}" href="/tin-tuc">${icon('card')} Tin tức</a>
      <details${['about', 'faq', 'partners'].includes(page) ? ' open' : ''}><summary>${icon('heart')} Về Nhà An</summary>
        <div class="drawer__sub drawer__sub--plain">
          <a href="/ve-chung-toi">Câu chuyện Nhà An</a><a href="/hoi-dap">Hỏi đáp</a><a href="/hop-tac">Hợp tác &amp; Doanh nghiệp</a><a href="/tin-dung-anh">Tín dụng hình ảnh</a>
        </div>
      </details>
      <a class="drawer__link${page === 'contact' ? ' is-cur' : ''}" href="/lien-he">${icon('mail')} Liên hệ</a>
    </nav>
    <div class="drawer__foot">
      <a class="btn btn--pink btn--block" href="/dat-ban">${icon('calendar')} Đặt bàn 24/7</a>
      <div class="drawer__contact"><a href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a><a href="mailto:${site.email}">${icon('mail')} Email</a></div>
    </div>
  </div>
</div>`;

const tabbar = (page) => `
<nav class="tabbar" aria-label="Thanh điều hướng nhanh">
  <a href="/"${page === 'home' ? ' aria-current="page"' : ''}>${icon('home')}<span>Trang chủ</span></a>
  <a href="/khong-gian"${page === 'spaces' ? ' aria-current="page"' : ''}>${icon('laptop')}<span>Không gian</span></a>
  <a class="tabbar__call" href="tel:${tel()}" aria-label="Gọi ${site.phoneDisplay}">${icon('phone')}</a>
  <a href="/dat-ban"${page === 'reserve' ? ' aria-current="page"' : ''}>${icon('calendar')}<span>Đặt bàn</span></a>
  <a href="${site.social.zalo}" target="_blank" rel="noopener"><b class="zalo-txt">Zalo</b><span>Nhắn tin</span></a>
</nav>`;

const socialLinks = () =>
  Object.entries(site.social)
    .filter(([, v]) => v)
    .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k === 'zalo' ? 'Zalo' : k}">${k === 'zalo' ? '<b class="zalo-txt">Zalo</b>' : icon(k)}</a>`)
    .join('');

export function layout({ page, title, description, path, body, scripts = [], image, schema = [], type = 'website', date }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} — Trà Sữa · Ô Long · Bánh Ngọt · Đồ Chay`;
  const desc = description || site.description;
  const url = site.url + (path === '/' ? '' : path);
  const ogImg = image && existsSync(new URL(`../public/assets/img/og/${image}.jpg`, import.meta.url))
    ? `${site.url}/assets/img/og/${image}.jpg`
    : `${site.url}/assets/img/brand/og-image.jpg`;
  const seo = site.seo || {};
  const org = {
    '@type': 'Organization',
    '@id': `${site.url}/#org`,
    name: site.name,
    url: site.url,
    logo: { '@type': 'ImageObject', url: `${site.url}/assets/img/brand/logo-circle.png`, width: 328, height: 328 },
    email: site.email,
    telephone: tel(),
    sameAs: Object.values(site.social).filter(Boolean),
    contactPoint: [{ '@type': 'ContactPoint', telephone: tel(), email: site.email, contactType: 'customer service', areaServed: 'VN', availableLanguage: ['Vietnamese', 'English', 'Japanese', 'Korean', 'Chinese'] }],
  };
  const shops = site.branches.map((b) => ({
    '@type': 'CafeOrCoffeeShop',
    '@id': `${site.url}/chi-nhanh/${b.id}`,
    name: `${site.name} — ${b.city}`,
    url: `${site.url}/chi-nhanh/${b.id}`,
    image: `${site.url}${photoUrl(b.img, 'w800')}`,
    telephone: tel(),
    email: site.email,
    priceRange: '25.000đ – 120.000đ',
    servesCuisine: ['Trà sữa', 'Trà ô long', 'Bánh ngọt', 'Món chay Việt'],
    address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.region === 'sai-gon' ? 'Thành phố Hồ Chí Minh' : 'Đà Nẵng', addressCountry: 'VN' },
    openingHours: 'Mo-Su 00:00-23:59',
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
    parentOrganization: { '@id': `${site.url}/#org` },
    amenityFeature: ['Wifi tốc độ cao', 'Ổ cắm mọi chỗ ngồi', 'Phòng họp', 'Khu yên lặng'].map((n) => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
  }));
  const parent = [['/tin-tuc/', 'Tin tức', '/tin-tuc'], ['/chi-nhanh/', 'Chi nhánh', '/chi-nhanh']].find(([pre]) => path.startsWith(pre));
  const crumbs = path === '/' ? [] : [
    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${site.url}/` },
    ...(parent ? [{ '@type': 'ListItem', position: 2, name: parent[1], item: `${site.url}${parent[2]}` }] : []),
    { '@type': 'ListItem', position: parent ? 3 : 2, name: title || site.name, item: url },
  ];
  const graph = [
    org,
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, inLanguage: ['vi', 'en', 'ja', 'ko', 'zh-Hans'], publisher: { '@id': `${site.url}/#org` } },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: full, description: desc, isPartOf: { '@id': `${site.url}/#website` }, primaryImageOfPage: ogImg, inLanguage: 'vi' },
    ...(page === 'home' || page === 'branches' ? shops : page === 'branch' ? shops.filter((x) => x['@id'].endsWith('/' + path.split('/').pop())) : []),
    ...(crumbs.length ? [{ '@type': 'BreadcrumbList', itemListElement: crumbs }] : []),
    ...schema,
  ];
  const ld = { '@context': 'https://schema.org', '@graph': graph };
  const verify = [
    seo.googleVerification && `<meta name="google-site-verification" content="${esc(seo.googleVerification)}">`,
    seo.bingVerification && `<meta name="msvalidate.01" content="${esc(seo.bingVerification)}">`,
    seo.facebookDomainVerification && `<meta name="facebook-domain-verification" content="${esc(seo.facebookDomainVerification)}">`,
    seo.zaloVerification && `<meta name="zalo-platform-site-verification" content="${esc(seo.zaloVerification)}">`,
    seo.facebookAppId && `<meta property="fb:app_id" content="${esc(seo.facebookAppId)}">`,
    seo.twitter && `<meta name="twitter:site" content="${esc(seo.twitter)}">`,
  ].filter(Boolean).join('\n');
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="${esc(seo.keywords || '')}">
<meta name="author" content="${site.name}">
<meta name="robots" content="${page === '404' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<meta name="application-name" content="${site.name}">
<meta name="apple-mobile-web-app-title" content="${site.name}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=yes">
<meta name="msapplication-TileColor" content="#41593D">
<meta name="color-scheme" content="light">
<meta name="geo.region" content="VN">
<meta name="geo.placename" content="Hồ Chí Minh, Đà Nẵng, Hội An">
${verify}
<link rel="canonical" href="${url}" data-canonical>
${LANGS.map(([l]) => `<link rel="alternate" hreflang="${l === 'zh' ? 'zh-Hans' : l}" href="${site.url}${langPath(l, path) === '/' ? '' : langPath(l, path)}" data-nolocal>`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${url}" data-nolocal>
<link rel="alternate" type="application/rss+xml" title="${site.name} — Tin tức" href="${site.url}/rss.xml" data-nolocal>
<meta name="theme-color" content="#41593D">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="vi_VN">
${LANGS.slice(1).map(([, , , loc]) => `<meta property="og:locale:alternate" content="${loc}">`).join('\n')}
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:secure_url" content="${ogImg}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(full)}">
${type === 'article' && date ? `<meta property="article:published_time" content="${date}T08:00:00+07:00">\n<meta property="article:author" content="${site.name}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="twitter:image:alt" content="${esc(full)}">
<meta name="pinterest-rich-pin" content="true">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/brand/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Dancing+Script:wght@600;700&family=Lora:ital,wght@0,600;1,500;1,600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Dancing+Script:wght@600;700&family=Lora:ital,wght@0,600;1,500;1,600&display=swap"></noscript>
<!--cjk-fonts-->
<link rel="stylesheet" href="${assetUrl('/assets/css/style.min.css')}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); }; window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</head>
<body data-page="${page}" data-email="${esc(site.email)}"${site.formEndpoint ? ` data-endpoint="${esc(site.formEndpoint)}"` : ''}>
<a class="skip" href="#main">Bỏ qua tới nội dung</a>
<aside class="topbar" aria-label="Thông báo"><div class="wrap topbar__in">
  <span class="topbar__news">${icon('clock')}<strong>Mở cửa 24/7</strong> · ${icon('sprout')}<strong>Sắp khai trương</strong> 5 chi nhánh Sài Gòn &amp; Đà Nẵng – Quảng Nam · <a href="/chi-nhanh#dang-ky">Nhận ưu đãi ${icon('arrow')}</a></span>
  <span class="topbar__contact"><a href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a><a href="mailto:${site.email}">${icon('mail')} ${site.email}</a></span>
</div></aside>
<header class="header" id="top">
  <div class="wrap header__in">
    <a class="brand" href="/" aria-label="${site.name} — Trang chủ"><img src="${assetUrl('/assets/img/brand/logo-horizontal-360.webp')}" srcset="${assetUrl('/assets/img/brand/logo-horizontal-360.webp')} 360w, ${assetUrl('/assets/img/brand/logo-horizontal.webp')} 660w" sizes="180px" alt="${site.name}" width="660" height="204"></a>
    <nav class="nav" id="nav" aria-label="Điều hướng chính">
      <ul class="nav__list">${NAV.map(navItem(page)).join('')}</ul>
    </nav>
    <div class="header__tools">
      ${langSwitch(path)}
      <a class="btn btn--pink nav__cta" href="/dat-ban">${icon('calendar')} Đặt bàn</a>
      <button class="burger" id="burger" aria-label="Mở menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
${drawer(path, page)}
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap footer__cta">
    <h2>Hẹn bạn ở <em>Nhà An</em> nhé!</h2>
    <div class="footer__cta-btns">
      <a class="btn btn--pink" href="tel:${tel()}">${icon('phone')} ${site.phoneDisplay}</a>
      <a class="btn btn--light" href="mailto:${site.email}">${icon('mail')} ${site.email}</a>
    </div>
  </div>
  <div class="wrap footer__grid">
    <div class="footer__brand">
      ${logoImg('circle', 72)}
      <p class="script">${site.tagline}</p>
      <p>Trà sữa, ô long rang củi, bánh ngọt, đồ chay và không gian chạy deadline cho giới trẻ.</p>
      <div class="social">${socialLinks()}</div>
    </div>
    <div>
      <h3>Khám phá</h3>
      <ul>
        <li><a href="/dat-ban">Đặt bàn 24/7</a></li><li><a href="/khong-gian">Không gian làm việc</a></li>
        <li><a href="/chup-anh">Studio áo dài &amp; Góc check-in</a></li><li><a href="/su-kien">Lễ Tết &amp; sự kiện</a></li><li><a href="/trai-nghiem">Trải nghiệm</a></li>
        <li><a href="/trai-nghiem#workshop">Workshop &amp; sự kiện</a></li><li><a href="/trai-nghiem#dat-tiec">Đặt tiệc &amp; quà tặng</a></li>
        <li><a href="/trai-nghiem#club">Nhà An Club</a></li>
      </ul>
    </div>
    <div>
      <h3>Chi nhánh</h3>
      <ul>
        <li><a href="/chi-nhanh">Tất cả 5 chi nhánh</a></li>
        ${site.regions.map((r) => `<li><a href="${r.path}">Nhà An ${r.name}</a></li>`).join('')}
        ${site.branches.map((b) => `<li class="footer__branch">${icon('pin')}<a href="/chi-nhanh/${b.id}">${b.city}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h3>Về Nhà An</h3>
      <ul>
        <li><a href="/ve-chung-toi">Câu chuyện</a></li><li><a href="/tin-tuc">Tin tức</a></li><li><a href="/tuyen-dung">Tuyển dụng</a></li>
        <li><a href="/hoi-dap">Hỏi đáp</a></li><li><a href="/hop-tac">Hợp tác &amp; Doanh nghiệp</a></li><li><a href="/lien-he">Liên hệ</a></li>
      </ul>
    </div>
    <div>
      <h3>Liên hệ</h3>
      <ul class="footer__contact">
        <li>${icon('phone')}<a href="tel:${tel()}">${site.phoneDisplay}</a></li>
        <li>${icon('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
        <li>${icon('clock')}<span>Mở cửa 24/7</span></li>
      </ul>
      ${langSwitch(path, 'lang--footer')}
    </div>
  </div>
  <div class="wrap footer__bottom">
    <span>© ${new Date().getFullYear()} ${site.name}. Nấu bằng cả tấm lòng.</span>
    <span class="footer__legal"><a href="/chinh-sach-bao-mat">Chính sách bảo mật</a><a href="/dieu-khoan">Điều khoản sử dụng</a><a href="/tin-dung-anh">Tín dụng hình ảnh</a></span>
  </div>
</footer>
<aside class="fab" aria-label="Liên hệ nhanh">
  <a class="fab__btn fab__btn--zalo" href="${esc(site.social.zalo)}" target="_blank" rel="noopener" aria-label="Chat Zalo với Nhà An">Zalo</a>
  <a class="fab__btn fab__btn--call" href="tel:${tel()}" aria-label="Gọi ${site.phoneDisplay}">${icon('phone')}</a>
</aside>
${tabbar(page)}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="${assetUrl('/assets/js/main.js')}" defer></script>
${scripts.map((s) => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}
