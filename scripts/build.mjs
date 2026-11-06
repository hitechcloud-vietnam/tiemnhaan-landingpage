// Sinh website tĩnh đa ngôn ngữ vào public/ — chạy: npm run build
// Tiếng Việt là ngôn ngữ gốc. Các bản en/ja/ko/zh được dịch từ src/i18n/<lang>.json
// (khóa = chuỗi tiếng Việt, giá trị = bản dịch). Chạy `npm run i18n` để xuất danh sách chuỗi cần dịch.
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, photos, LANGS, langPath } from '../src/layout.mjs';
import * as P from '../src/pages.mjs';
import * as X from '../src/pages-extra.mjs';
import * as M from '../src/pages-more.mjs';
import { posts, faqAll } from '../src/data/content.mjs';
import { JOBS } from '../src/pages.mjs';
import { site } from '../src/data/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const EXTRACT = process.argv.includes('--extract');

const missingImg = Object.keys(photos).filter((k) => !existsSync(join(out, 'assets/img/photos', k + '.webp')));
if (missingImg.length) throw new Error('Thiếu ảnh: ' + missingImg.join(', '));

const faqSchema = { '@type': 'FAQPage', mainEntity: faqAll.flatMap(([, qs]) => qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))) };
const jobSchema = JOBS.map(([job, kind, pay], i) => ({
  '@type': 'JobPosting',
  title: `${job} — ${kind}`,
  description: `<p>Tiệm Nhà An tuyển ${job} (${kind}) cho 4 chi nhánh tại Sài Gòn, Đà Nẵng và Hội An. Không cần kinh nghiệm, được đào tạo từ đầu. Mức lương: ${pay}.${pay.includes('tháng') ? ' Đóng BHXH, BHYT đầy đủ.' : ' Ca linh hoạt.'}</p>`,
  identifier: { '@type': 'PropertyValue', name: site.name, value: `job-${i + 1}` },
  datePosted: '2026-11-04',
  validThrough: '2027-03-31T23:59:59+07:00',
  employmentType: pay.includes('giờ') ? 'PART_TIME' : 'FULL_TIME',
  hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: site.url, logo: `${site.url}/assets/img/brand/logo-circle.png` },
  jobLocation: [
    { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Thành phố Hồ Chí Minh', addressRegion: 'Hồ Chí Minh', addressCountry: 'VN' } },
    { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Đà Nẵng', addressRegion: 'Đà Nẵng', addressCountry: 'VN' } },
  ],
  baseSalary: pay.includes('giờ')
    ? { '@type': 'MonetaryAmount', currency: 'VND', value: { '@type': 'QuantitativeValue', minValue: 30000, maxValue: 35000, unitText: 'HOUR' } }
    : { '@type': 'MonetaryAmount', currency: 'VND', value: { '@type': 'QuantitativeValue', minValue: 10000000, maxValue: 15000000, unitText: 'MONTH' } },
}));
const articleSchema = (p) => ({
  '@type': 'NewsArticle',
  headline: p.title,
  description: p.excerpt,
  image: [`${site.url}/assets/img/og/${p.img}.jpg`],
  datePublished: `${p.date}T08:00:00+07:00`,
  dateModified: `${p.date}T08:00:00+07:00`,
  author: { '@type': 'Organization', name: site.name, url: site.url },
  publisher: { '@id': `${site.url}/#org` },
  mainEntityOfPage: `${site.url}/tin-tuc/${p.slug}`,
});

const pages = [
  { file: 'index.html', path: '/', page: 'home', body: P.home() },
  { file: 'khong-gian.html', path: '/khong-gian', page: 'spaces', title: 'Không gian làm việc & học tập — Nơi chạy deadline của giới trẻ', description: '4 khu làm việc, học tập riêng biệt tại Tiệm Nhà An: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline, Sân Rôm Rả. Wifi mạnh, ổ cắm mọi chỗ, mở tới 22:00.', body: M.spacesPage(), image: 'cowork-cafe' },
  { file: 'trai-nghiem.html', path: '/trai-nghiem', page: 'experience', title: 'Trải nghiệm — Workshop, Đặt tiệc, Nhà An Club', description: 'Không gian, workshop pha trà và làm bánh, đặt tiệc và quà tặng, Nhà An Club tại Tiệm Nhà An.', body: P.experience() },
  { file: 'chi-nhanh.html', path: '/chi-nhanh', page: 'branches', title: '4 chi nhánh Sài Gòn & Đà Nẵng – Quảng Nam — Coming Soon', description: 'Tiệm Nhà An sắp khai trương 4 chi nhánh: 2 tại TP. Hồ Chí Minh, Đà Nẵng và Hội An. Đăng ký nhận tin và ưu đãi khai trương.', body: P.branches() },
  { file: 'sai-gon.html', path: '/sai-gon', page: 'saigon', title: 'Nhà An Sài Gòn — 2 chi nhánh TP.HCM', description: 'Nhà An Sài Gòn: 2 chi nhánh tại TP. Hồ Chí Minh, món mang chất Sài Gòn như bạc xỉu ô long, trà tắc xí muội, cà phê phin muối. Coming Soon.', body: X.saigon(), image: 'saigon-dusk' },
  { file: 'da-nang-quang-nam.html', path: '/da-nang-quang-nam', page: 'mientrung', title: 'Nhà An Đà Nẵng – Quảng Nam — Đà Nẵng & Hội An', description: 'Nhà An Đà Nẵng – Quảng Nam: chi nhánh gần biển Mỹ Khê và căn nhà vàng phố cổ Hội An, mì Quảng chay, trà sen Hội An. Coming Soon.', body: X.mientrung(), image: 'hoian-lanterns' },
  { file: 'tuyen-dung.html', path: '/tuyen-dung', page: 'hiring', schema: jobSchema, title: 'Tuyển dụng — Lương 30.000–35.000đ/giờ, 10–15 triệu/tháng', description: 'Tiệm Nhà An tuyển barista, phục vụ, thu ngân, thợ bánh, phụ bếp chay. Part-time 30.000–35.000đ/giờ, chính thức 10–15 triệu/tháng, BHXH, BHYT đầy đủ.', body: X.hiring() },
  { file: 'tin-tuc.html', path: '/tin-tuc', page: 'news', title: 'Tin tức', description: 'Tin khai trương, không gian, workshop, tuyển dụng và câu chuyện từ Tiệm Nhà An.', body: M.news() },
  ...posts.map((p) => ({ file: `tin-tuc/${p.slug}.html`, path: `/tin-tuc/${p.slug}`, page: 'article', type: 'article', date: p.date, schema: [articleSchema(p)], title: p.title, description: p.excerpt, body: M.article(p), image: p.img })),
  { file: 've-chung-toi.html', path: '/ve-chung-toi', page: 'about', title: 'Về Nhà An', description: 'Câu chuyện, giá trị và nguồn nguyên liệu của Tiệm Nhà An — trà, bánh và bữa chay nấu như ở nhà.', body: P.about() },
  { file: 'hoi-dap.html', path: '/hoi-dap', page: 'faq', schema: [faqSchema], title: 'Hỏi đáp', description: 'Câu hỏi thường gặp về Tiệm Nhà An: khai trương, không gian làm việc, đặt tiệc, tuyển dụng.', body: M.faqPage() },
  { file: 'lien-he.html', path: '/lien-he', page: 'contact', title: 'Liên hệ', description: `Liên hệ Tiệm Nhà An: hotline/Zalo ${site.phoneDisplay}, email ${site.email}. Đặt bánh, tiệc trà, hợp tác và tuyển dụng.`, body: P.contact() },
  { file: 'chinh-sach-bao-mat.html', path: '/chinh-sach-bao-mat', page: 'legal', title: 'Chính sách bảo mật', description: 'Chính sách bảo mật thông tin cá nhân của Tiệm Nhà An.', body: M.privacy() },
  { file: 'dieu-khoan.html', path: '/dieu-khoan', page: 'legal', title: 'Điều khoản sử dụng', description: 'Điều khoản sử dụng website Tiệm Nhà An.', body: M.terms() },
  { file: 'tin-dung-anh.html', path: '/tin-dung-anh', page: 'credits', title: 'Tín dụng hình ảnh', description: 'Nguồn và giấy phép của hình ảnh minh họa trên website Tiệm Nhà An.', body: P.credits() },
  { file: '404.html', path: '/404', page: '404', title: 'Không tìm thấy trang', body: P.notFound() },
];

// ───────────── Dịch ─────────────
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const encode = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const encodeAttr = (s) => encode(s).replace(/"/g, '&quot;');
const translatable = (s) => /\p{L}/u.test(s) && !/^[\w.+-]+@[\w.-]+$/.test(s) && !/^https?:/.test(s);

function translateHtml(html, lang, dict, seen) {
  const tr = (raw) => {
    const core = decode(raw).replace(/\s+/g, ' ').trim();
    if (!core || !translatable(core)) return null;
    seen.add(core);
    if (lang === 'vi') return null;
    const t = dict[core];
    return t === undefined ? null : t;
  };
  // Thay các khối không dịch (script, style, icon SVG) bằng chú thích giữ chỗ để không cắt rời đoạn chữ
  const kept = [];
  let part = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, (m) => `<!--K${kept.push(m) - 1}-->`);
  // Nội dung chữ
  part = part.replace(/>([^<>]+)</g, (m, text) => {
    const t = tr(text);
    if (t === null) return m;
    const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
    return `>${lead}${encode(t)}${trail}<`;
  });
  // Thuộc tính
  part = part.replace(/(\s(?:alt|placeholder|aria-label|title)=")([^"]*)(")/g, (m, a, v, b) => {
    const t = tr(v);
    return t === null ? m : a + encodeAttr(t) + b;
  });
  part = part.replace(/(<meta (?:name|property)="(?:description|keywords|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)" content=")([^"]*)(")/g, (m, a, v, b) => {
    const t = tr(v);
    return t === null ? m : a + encodeAttr(t) + b;
  });
  if (lang !== 'vi') {
    // Liên kết nội bộ sang thư mục ngôn ngữ
    part = part.replace(/<(a|link)\b[^>]*>/g, (tag) => {
      if (tag.includes('data-nolocal') || tag.includes('data-canonical')) return tag;
      return tag.replace(/href="(\/(?!\/|assets\/|api\/|favicon|site\.webmanifest)[^"]*)"/, (mm, href) => `href="${langPath(lang, href)}"`);
    });
  }
  return part.replace(/<!--K(\d+)-->/g, (m, i) => kept[+i]);
}

function localize(html, lang, path) {
  const [, , short, locale] = LANGS.find((l) => l[0] === lang);
  const url = site.url + (langPath(lang, path) === '/' ? '' : langPath(lang, path));
  html = html.replace('<html lang="vi">', `<html lang="${lang === 'zh' ? 'zh-Hans' : lang}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*" data-canonical>/, `<link rel="canonical" href="${url}" data-canonical>`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  html = html.replace('<meta property="og:locale" content="vi_VN">', `<meta property="og:locale" content="${locale}">`);
  html = html.replace(`<meta property="og:locale:alternate" content="${locale}">`, '<meta property="og:locale:alternate" content="vi_VN">');
  html = html.replace(/<span class="lang__cur">VI<\/span>/g, `<span class="lang__cur">${short}</span>`);
  html = html.replace(new RegExp(`class="lang__opt" data-nolocal data-lang="${lang}"`, 'g'), `class="lang__opt is-cur" aria-current="true" data-nolocal data-lang="${lang}"`);
  const cjk = { ja: 'Noto+Sans+JP', ko: 'Noto+Sans+KR', zh: 'Noto+Sans+SC' }[lang];
  if (cjk) html = html.replace('<link rel="stylesheet" href="/assets/css/style.css">', `<link href="https://fonts.googleapis.com/css2?family=${cjk}:wght@400;500;700;800&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="/assets/css/style.css">`);
  return html;
}

const dicts = Object.fromEntries(LANGS.map(([l]) => {
  const f = join(root, 'src/i18n', `${l}.json`);
  return [l, l !== 'vi' && existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}];
}));

const seen = new Set();
const report = {};
for (const [lang] of LANGS) {
  const used = new Set();
  for (const p of pages) {
    let html = layout(p);
    html = translateHtml(html, lang, dicts[lang], used);
    if (lang !== 'vi') html = localize(html, lang, p.path);
    else html = html.replace(/class="lang__opt" data-nolocal data-lang="vi"/g, 'class="lang__opt is-cur" aria-current="true" data-nolocal data-lang="vi"');
    if (EXTRACT) continue;
    const file = lang === 'vi' ? join(out, p.file) : join(out, lang, p.file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  if (lang === 'vi') used.forEach((s) => seen.add(s));
  else report[lang] = [...used].filter((s) => dicts[lang][s] === undefined).length;
}

if (EXTRACT) {
  mkdirSync(join(root, 'src/i18n'), { recursive: true });
  writeFileSync(join(root, 'src/i18n/strings.json'), JSON.stringify([...seen], null, 1));
  for (const [l] of LANGS.slice(1)) {
    const miss = [...seen].filter((s) => dicts[l][s] === undefined);
    writeFileSync(join(root, `src/i18n/missing-${l}.json`), JSON.stringify(miss, null, 1));
  }
  console.log(`✔ ${seen.size} chuỗi tiếng Việt → src/i18n/strings.json`);
  process.exit(0);
}

// sitemap đa ngôn ngữ
const now = new Date().toISOString().slice(0, 10);
const abs = (l, p) => site.url + (langPath(l, p) === '/' ? '/' : langPath(l, p));
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.filter((p) => p.page !== '404').flatMap((p) => LANGS.map(([l]) => `  <url><loc>${abs(l, p.path)}</loc><lastmod>${now}</lastmod>${LANGS.map(([x]) => `<xhtml:link rel="alternate" hreflang="${x === 'zh' ? 'zh-Hans' : x}" href="${abs(x, p.path)}"/>`).join('')}</url>`)).join('\n')}
</urlset>
`);
const xml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
writeFileSync(join(out, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${site.name} — Tin tức</title>
<link>${site.url}/tin-tuc</link>
<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
<description>${xml(site.description)}</description>
<language>vi</language>
${posts.map((p) => `<item><title>${xml(p.title)}</title><link>${site.url}/tin-tuc/${p.slug}</link><guid>${site.url}/tin-tuc/${p.slug}</guid><pubDate>${new Date(p.date + 'T08:00:00+07:00').toUTCString()}</pubDate><description>${xml(p.excerpt)}</description></item>`).join('\n')}
</channel>
</rss>
`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(join(out, 'site.webmanifest'), JSON.stringify({
  name: site.name, short_name: 'Nhà An', description: site.description, lang: 'vi', dir: 'ltr', start_url: '/?source=pwa', scope: '/', display: 'standalone', orientation: 'portrait', background_color: '#FCFAF5', theme_color: '#41593D', categories: ['food', 'lifestyle'],
  icons: [{ src: '/assets/img/brand/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/brand/favicon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/assets/img/brand/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }],
  shortcuts: [{ name: 'Không gian', url: '/khong-gian' }, { name: 'Chi nhánh', url: '/chi-nhanh' }, { name: 'Tuyển dụng', url: '/tuyen-dung' }, { name: 'Liên hệ', url: '/lien-he' }],
}, null, 2));
mkdirSync(join(out, '.well-known'), { recursive: true });
writeFileSync(join(out, '.well-known/security.txt'), `Contact: mailto:${site.email}\nPreferred-Languages: vi, en\nCanonical: ${site.url}/.well-known/security.txt\nExpires: 2027-12-31T23:59:59Z\n`);
writeFileSync(join(out, 'humans.txt'), `/* TEAM */\nTiệm Nhà An — ${site.email} — ${site.phoneDisplay}\n/* SITE */\nNgôn ngữ: Tiếng Việt, English, 日本語, 한국어, 中文\n`);
console.log(`✔ ${pages.length} trang × ${LANGS.length} ngôn ngữ, ${Object.keys(photos).length} ảnh`);
for (const [l, n] of Object.entries(report)) if (n) console.log(`  ⚠ ${l}: còn ${n} chuỗi chưa dịch (đang hiển thị tiếng Việt)`);
