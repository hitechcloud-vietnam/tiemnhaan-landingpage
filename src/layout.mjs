import { site } from './data/site.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const vnd = (n) => n.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';

const P = (d) => `<path d="${d}"/>`;
const ICONS = {
  cup: P('M6 8h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z') + P('M5 8h14') + P('M9 8l1-5h4') + P('M7 13h10'),
  leaf: P('M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z') + P('M5 19 14 10'),
  citrus: '<circle cx="12" cy="12" r="8"/>' + P('M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7'),
  whisk: P('M12 3v7') + P('M8 10h8l-1 10a2 2 0 0 1-2 1.8h-2A2 2 0 0 1 9 20Z') + P('M10 14h4'),
  snow: P('M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17') + P('M9 3.5 12 6l3-2.5M9 20.5 12 18l3 2.5'),
  cake: P('M4 21h16v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8Z') + P('M4 16c2 1.3 4 1.3 6 0s4-1.3 6 0 3 1 4 0') + P('M12 11V7') + P('M12 3.5c.8.8.8 2 0 2.5-.8-.5-.8-1.7 0-2.5Z'),
  sun: '<circle cx="12" cy="12" r="4"/>' + P('M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'),
  bowl: P('M3 11h18a9 9 0 0 1-18 0Z') + P('M8 21h8') + P('M14 3 9 11M18 4l-5 7'),
  clock: '<circle cx="12" cy="12" r="9"/>' + P('M12 7v5l3 2'),
  pin: P('M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z') + '<circle cx="12" cy="9.5" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/>' + P('m3 7 9 6 9-6'),
  phone: P('M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'),
  arrow: P('M5 12h14M13 6l6 6-6 6'),
  search: '<circle cx="11" cy="11" r="7"/>' + P('m20 20-3.5-3.5'),
  menu: P('M4 7h16M4 12h16M4 17h16'),
  close: P('M6 6l12 12M18 6 6 18'),
  heart: P('M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z'),
  sprout: P('M12 21v-9') + P('M12 12c0-4 3-7 8-7 0 5-3 7-8 7Z') + P('M12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5Z'),
  fire: P('M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2-7 2 1 3 2.5 3 4 1-1.5 1-5 1-8Z'),
  hand: P('M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 11.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 15a1.5 1.5 0 0 1 2.5-1.7L7 15V11'),
  home: P('M3 11 12 4l9 7') + P('M5 10v10h14V10') + P('M10 20v-5h4v5'),
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/>' + P('M3 10h18M8 3v4M16 3v4'),
  facebook: P('M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z'),
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  tiktok: P('M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5') + P('M14 3c.5 2.5 2.5 4.5 5 4.5'),
  chat: P('M4 5h16v11H9l-5 4V5Z'),
};
export const icon = (name, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

export const img = (key, alt, { cls = '', eager = false, w = 960, h = 720 } = {}) =>
  `<img src="/assets/img/menu/${key}.webp" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;

const NAV = [
  ['/', 'Trang chủ', 'home'],
  ['/thuc-don', 'Thực đơn', 'menu'],
  ['/ve-chung-toi', 'Về Nhà An', 'about'],
  ['/chi-nhanh', 'Chi nhánh', 'branches'],
  ['/lien-he', 'Liên hệ', 'contact'],
];

const socialLinks = () =>
  Object.entries(site.social)
    .filter(([, v]) => v)
    .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${icon(k === 'zalo' ? 'chat' : k)}</a>`)
    .join('');

export function layout({ page, title, description, path, body, scripts = [] }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} — Trà Sữa · Ô Long · Bánh Ngọt · Đồ Chay`;
  const desc = description || site.description;
  const url = site.url + (path === '/' ? '' : path);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    description: site.description,
    url: site.url,
    logo: site.url + '/assets/img/brand/logo-circle.png',
    image: site.url + '/assets/img/brand/og-image.jpg',
    servesCuisine: ['Trà sữa', 'Trà ô long', 'Bánh ngọt', 'Món chay Việt'],
    priceRange: '25.000đ – 120.000đ',
    areaServed: site.branches.map((b) => b.city),
  };
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#41593D">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/assets/img/brand/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/brand/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Dancing+Script:wght@600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body data-page="${page}"${site.formEndpoint ? ` data-endpoint="${esc(site.formEndpoint)}"` : ''}>
<a class="skip" href="#main">Bỏ qua tới nội dung</a>
<div class="topbar"><div class="wrap">${icon('sprout')}<span><strong>Sắp khai trương</strong> tại TP. Hồ Chí Minh &amp; Đà Nẵng</span><a href="/chi-nhanh#dang-ky">Nhận ưu đãi khai trương ${icon('arrow')}</a></div></div>
<header class="header" id="top">
  <div class="wrap header__in">
    <a class="brand" href="/" aria-label="${site.name} — Trang chủ"><img src="/assets/img/brand/logo-horizontal.webp" alt="${site.name}" width="660" height="210"></a>
    <nav class="nav" id="nav" aria-label="Điều hướng chính">
      <ul>${NAV.map(([href, label, key]) => `<li><a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
      <a class="btn btn--primary nav__cta" href="/thuc-don">Xem thực đơn</a>
    </nav>
    <button class="burger" id="burger" aria-label="Mở menu" aria-expanded="false" aria-controls="nav">${icon('menu')}</button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <img src="/assets/img/brand/logo-circle.png" alt="" width="88" height="88">
      <p class="script">${site.tagline}</p>
      <p>Trà sữa, ô long rang củi, bánh ngọt nướng mỗi sáng và đồ chay nấu như ở nhà.</p>
      ${socialLinks() ? `<div class="social">${socialLinks()}</div>` : ''}
    </div>
    <div>
      <h3>Khám phá</h3>
      <ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}<li><a href="/tin-dung-anh">Tín dụng hình ảnh</a></li></ul>
    </div>
    <div>
      <h3>Thực đơn</h3>
      <ul>
        <li><a href="/thuc-don#tra-sua">Trà sữa</a></li><li><a href="/thuc-don#o-long">Ô long &amp; trà lá</a></li>
        <li><a href="/thuc-don#banh-ngot">Bánh ngọt</a></li><li><a href="/thuc-don#chay-sang">Điểm tâm chay</a></li>
        <li><a href="/thuc-don#chay-trua">Cơm trưa chay</a></li>
      </ul>
    </div>
    <div>
      <h3>Chi nhánh</h3>
      <ul class="footer__branches">${site.branches.map((b) => `<li>${icon('pin')}<span><strong>${b.city}</strong><em>Coming Soon</em></span></li>`).join('')}</ul>
      ${site.email ? `<p>${icon('mail')} <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>` : ''}
      ${site.phone ? `<p>${icon('phone')} <a href="tel:${esc(site.phone.replace(/\s/g, ''))}">${esc(site.phone)}</a></p>` : ''}
    </div>
  </div>
  <div class="wrap footer__bottom">
    <span>© ${new Date().getFullYear()} ${site.name}. Nấu bằng cả tấm lòng.</span>
    <a href="#top">Lên đầu trang ↑</a>
  </div>
</footer>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="/assets/js/main.js" defer></script>
${scripts.map((s) => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}
