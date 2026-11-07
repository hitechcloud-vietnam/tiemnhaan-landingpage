// Sinh website tĩnh đa ngôn ngữ vào public/ — chạy: npm run build
// Tiếng Việt là ngôn ngữ gốc. Các bản en/ja/ko/zh được dịch từ src/i18n/<lang>.json
// (khóa = chuỗi tiếng Việt, giá trị = bản dịch) cộng với từ điển sinh từ các file nội dung song song
// trong src/content/{pages,articles}/<lang>/. Chạy `npm run i18n` để xuất danh sách chuỗi cần dịch.
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { layout, photos, LANGS, langPath, ogUrl, hasOg, assetUrl, photoUrl, parentOf } from '../src/layout.mjs';
import * as P from '../src/pages.mjs';
import * as X from '../src/pages-extra.mjs';
import * as M from '../src/pages-more.mjs';
import * as S from '../src/pages-studio.mjs';
import { branchPage } from '../src/pages-branch.mjs';
import { faqAll } from '../src/data/content.mjs';
import { JOBS } from '../src/pages.mjs';
import { site } from '../src/data/site.mjs';
import { PAGES, pageBySlug, pageData, ARTICLES, CATS, catById, contentDict, warnings as contentWarnings, missingSlots, resolveImg, readMinutes, hasArticle, setLang, articlesFor } from '../src/content.mjs';
import { renderPage, faqSchemaOf, GALLERY_CATS, galleryCat } from '../src/blocks.mjs';
import { articlePage, newsIndex, categoryPage, sitemapPage, PER_PAGE } from '../src/pages-blog.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const EXTRACT = process.argv.includes('--extract');
const ALL_LANGS = LANGS.map(([l]) => l);

const missingImg = Object.keys(photos).filter((k) => !existsSync(join(out, 'assets/img/photos', k + '.webp')));
if (missingImg.length) throw new Error('Thiếu ảnh: ' + missingImg.join(', '));

// ───────────── Dữ liệu có cấu trúc ─────────────
const LICENSE_URL = (p) => ({
  cc0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  pdm: 'https://creativecommons.org/publicdomain/mark/1.0/',
  by: `https://creativecommons.org/licenses/by/${p.version || '4.0'}/`,
  'by-sa': `https://creativecommons.org/licenses/by-sa/${p.version || '4.0'}/`,
  unsplash: 'https://unsplash.com/license',
})[p.license];
const imageObject = (key, caption) => {
  const p = photos[key];
  if (!p) return null;
  const lic = LICENSE_URL(p);
  return {
    '@type': 'ImageObject', contentUrl: site.url + photoUrl(key).split('?')[0], url: site.url + photoUrl(key).split('?')[0],
    width: p.size[0], height: p.size[1], caption: caption || p.title, name: p.title,
    ...(lic ? { license: lic } : {}), acquireLicensePage: `${site.url}/tin-dung-anh`,
    creditText: p.creator ? `${p.creator} / ${p.source === 'wikimedia' ? 'Wikimedia Commons' : p.source}` : String(p.source || ''),
    ...(p.creator ? { creator: { '@type': 'Person', name: p.creator } } : {}),
    copyrightNotice: p.creator ? `© ${p.creator}` : undefined,
  };
};

const faqSchema = { '@type': 'FAQPage', mainEntity: faqAll.flatMap(([, qs]) => qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))) };
const jobPosting = (job, kind, pay, i, extra = {}) => ({
  '@type': 'JobPosting',
  title: `${job} — ${kind}`,
  description: `<p>Tiệm Nhà An tuyển ${job} (${kind}) cho 5 chi nhánh tại Sài Gòn (Bình Thạnh, Tân Bình), Đà Nẵng, Hội An và Duy Xuyên. Không cần kinh nghiệm, được đào tạo từ đầu. Mức lương: ${pay}.${pay.includes('tháng') ? ' Đóng BHXH, BHYT đầy đủ.' : ' Ca linh hoạt.'}</p>`,
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
  ...extra,
});
const jobSchema = JOBS.map(([job, kind, pay], i) => jobPosting(job, kind, pay, i));
const JOB_PAGES = {
  'tuyen-dung/barista': [0, 2], 'tuyen-dung/phuc-vu-thu-ngan': [1], 'tuyen-dung/tho-banh': [3], 'tuyen-dung/phu-bep-chay': [4],
};
const articleSchema = (a) => ({
  '@type': 'BlogPosting',
  headline: a.title,
  description: a.description,
  image: [ogUrl(resolveImg(a.cover)), imageObject(resolveImg(a.cover), a.coverAlt)].filter(Boolean),
  datePublished: `${a.date}T08:00:00+07:00`,
  dateModified: `${a.date}T08:00:00+07:00`,
  author: { '@type': 'Organization', name: `Ban biên tập ${site.name}`, url: `${site.url}/ve-chung-toi` },
  publisher: { '@id': `${site.url}/#org` },
  mainEntityOfPage: `${site.url}/tin-tuc/${a.slug}`,
  articleSection: catById[a.category].name,
  keywords: (a.tags || []).join(', '),
  wordCount: a.words,
  timeRequired: `PT${readMinutes(a)}M`,
  inLanguage: 'vi',
});

// ───────────── CSS: nguồn → bản nén ─────────────
const minifyCss = (css) => {
  const strings = [];
  css = css.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (m) => `\u0000${strings.push(m) - 1}\u0000`);
  css = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/:\s+/g, ':')
    .replace(/;}/g, '}')
    .trim();
  return css.replace(/\u0000(\d+)\u0000/g, (m, i) => strings[+i]);
};
{
  const fdir = join(out, 'assets/css/features');
  const parts = [...['style.css', 'blocks.css', 'features.css'].map((f) => join(out, 'assets/css', f)), ...(existsSync(fdir) ? readdirSync(fdir).filter((f) => f.endsWith('.css')).sort().map((f) => join(fdir, f)) : [])].filter(existsSync);
  const src = parts.map((f) => readFileSync(f, 'utf8')).join('\n');
  const min = minifyCss(src);
  writeFileSync(join(out, 'assets/css/style.min.css'), min);
  console.log(`  CSS ${(src.length / 1024).toFixed(1)} KB → ${(min.length / 1024).toFixed(1)} KB (${parts.length} tệp)`);
}
const js = (name) => assetUrl(`/assets/js/${name}.js`);

// ───────────── Danh sách trang ─────────────
const GROUP_PAGE = { tea: 'tea', space: 'space', community: 'community', season: 'season', tools: 'tools', brand: 'brand', careers: 'careers' };
const contentPages = PAGES.map((p) => {
  const jobs = JOB_PAGES[p.slug];
  const imgKey = resolveImg(p.image || p.hero.img);
  return {
    file: `${p.slug}.html`, path: p.path, page: GROUP_PAGE[p.group] || 'tools', title: p.title, description: p.description,
    image: imgKey, imageAlt: p.hero.alt,
    schema: [...faqSchemaOf(p.slug), ...(jobs ? jobs.map((i) => jobPosting(...JOBS[i], i)) : []), imageObject(resolveImg(p.hero.img), p.hero.alt)].filter(Boolean),
    body: (lang) => renderPage(p.slug, lang),
    // Ngôn ngữ đã có bản dịch: được lập chỉ mục. Ngôn ngữ chưa dịch vẫn dựng trang (menu không gãy) nhưng noindex.
    trLangs: ALL_LANGS.filter((l) => l === 'vi' || existsSync(join(root, 'src/content/pages', l, p.slug.replace(/\//g, '__') + '.json'))),
  };
});

const blogPages = [];
{
  const total = Math.ceil(ARTICLES.length / PER_PAGE);
  for (let n = 1; n <= total; n++) {
    blogPages.push({
      file: n === 1 ? 'tin-tuc.html' : `tin-tuc/trang-${n}.html`, path: n === 1 ? '/tin-tuc' : `/tin-tuc/trang-${n}`, page: 'news',
      title: n === 1 ? 'Cẩm nang & tin tức' : `Cẩm nang & tin tức — Trang ${n}`,
      description: n === 1 ? 'Cẩm nang Nhà An: trà Việt, món chay, bánh, mẹo làm việc và học tập, vùng miền, văn hóa, sống xanh và tin tức từ Tiệm Nhà An.' : `Cẩm nang Nhà An — trang ${n}: bài viết về trà, bếp chay, làm việc, vùng miền, văn hóa và sống xanh.`,
      image: 'tea-flatlay', body: () => ({ html: newsIndex(n), scripts: ['tilt3d'] }),
      pageN: n, robots: n > 1 ? 'noindex, follow' : undefined,
    });
  }
  for (const c of CATS) {
    blogPages.push({ file: `tin-tuc/chu-de/${c.id}.html`, path: `/tin-tuc/chu-de/${c.id}`, page: 'category', title: `${c.name} — Cẩm nang Nhà An`, description: `${c.desc}. Bài viết chủ đề ${c.name} từ Tiệm Nhà An.`, image: resolveImg((ARTICLES.find((a) => a.category === c.id) || {}).cover || 'tea-flatlay'), body: () => ({ html: categoryPage(c.id), scripts: ['tilt3d'] }) });
  }
  for (const a of ARTICLES) {
    blogPages.push({
      file: `tin-tuc/${a.slug}.html`, path: `/tin-tuc/${a.slug}`, page: 'article', type: 'article', date: a.date, schema: [articleSchema(a)],
      title: a.title, description: a.description, image: resolveImg(a.cover), imageAlt: a.coverAlt,
      body: () => ({ html: articlePage(a), scripts: ['article', 'lightbox'] }),
      langs: ALL_LANGS.filter((l) => hasArticle(a, l)), article: a,
    });
  }
}

const pages = [
  { file: 'index.html', path: '/', page: 'home', body: P.home() },
  { file: 'khong-gian.html', path: '/khong-gian', page: 'spaces', title: 'Không gian làm việc & học tập — Nơi chạy deadline của giới trẻ', description: '4 khu làm việc, học tập riêng biệt tại Tiệm Nhà An: Phòng Họp Hanh Thông, Góc Ấm Nhà An, Phòng Chạy Deadline, Sân Rôm Rả. Wifi mạnh, ổ cắm mọi chỗ, mở cửa 24/7.', body: M.spacesPage(), image: 'cowork-cafe' },
  { file: 'dat-ban.html', path: '/dat-ban', page: 'reserve', title: 'Đặt bàn 24/7', description: 'Đặt bàn tại Tiệm Nhà An 24/7: bàn thường, bàn nhóm, phòng họp, Phòng Chạy Deadline, studio áo dài, tiệc và sự kiện. Gọi/Zalo 0865 920 041.', body: S.reserve(), image: 'cafe-long' },
  { file: 'chup-anh.html', path: '/chup-anh', page: 'studio', title: 'Studio áo dài & Góc check-in', description: 'Cho thuê áo dài, studio chụp ảnh riêng, thợ ảnh và trang điểm, 6 góc check-in tại Tiệm Nhà An. Set chụp Tết, Trung thu, Valentine, Giáng sinh.', body: S.studio(), image: 'aodai-lantern' },
  { file: 'su-kien.html', path: '/su-kien', page: 'events', title: 'Lễ Tết & sự kiện', description: 'Lịch sự kiện cả năm tại Tiệm Nhà An: Tết Nguyên Đán, Valentine, 8/3, mùa thi, Trung thu, 20/10, Giáng sinh, đêm acoustic và workshop hằng tuần.', body: S.events(), image: 'tet-fireworks' },
  { file: 'trai-nghiem.html', path: '/trai-nghiem', page: 'experience', title: 'Trải nghiệm — Workshop, Đặt tiệc, Nhà An Club', description: 'Không gian, workshop pha trà và làm bánh, đặt tiệc và quà tặng, Nhà An Club tại Tiệm Nhà An.', body: P.experience(), image: 'cafe-bright' },
  { file: 'chi-nhanh.html', path: '/chi-nhanh', page: 'branches', title: '5 chi nhánh: Bình Thạnh, Tân Bình, Đà Nẵng, Hội An, Duy Xuyên', description: 'Tiệm Nhà An sắp khai trương 5 chi nhánh mở cửa 24/7: Bình Thạnh và Tân Bình (TP. Hồ Chí Minh), trung tâm Đà Nẵng, phố cổ Hội An và Duy Xuyên.', body: P.branches(), image: 'lm-landmark81-night' },
  ...site.branches.map((b) => ({ file: `chi-nhanh/${b.id}.html`, path: `/chi-nhanh/${b.id}`, page: 'branch', title: `${b.city} — Chi nhánh ${b.no}, ${b.area}`, description: `${b.city} (${b.area}): ${b.note} Mở cửa 24/7. Hotline/Zalo ${site.phoneDisplay}.`, body: branchPage(b), image: b.img })),
  { file: 'sai-gon.html', path: '/sai-gon', page: 'saigon', title: 'Nhà An Sài Gòn — 2 chi nhánh TP.HCM', description: 'Nhà An Sài Gòn: 2 chi nhánh tại TP. Hồ Chí Minh, món mang chất Sài Gòn như bạc xỉu ô long, trà tắc xí muội, cà phê phin muối. Coming Soon.', body: X.saigon(), image: 'lm-benthanh-night' },
  { file: 'da-nang-quang-nam.html', path: '/da-nang-quang-nam', page: 'mientrung', title: 'Nhà An Đà Nẵng – Quảng Nam — Đà Nẵng, Hội An, Duy Xuyên', description: 'Nhà An Đà Nẵng – Quảng Nam: chi nhánh trung tâm Đà Nẵng, căn nhà vàng phố cổ Hội An và nhà vườn Duy Xuyên, mì Quảng chay, trà sen Hội An. Coming Soon.', body: X.mientrung(), image: 'hoian-lanterns' },
  { file: 'tuyen-dung.html', path: '/tuyen-dung', page: 'hiring', schema: jobSchema, title: 'Tuyển dụng — Lương 30.000–35.000đ/giờ, 10–15 triệu/tháng', description: 'Tiệm Nhà An tuyển barista, phục vụ, thu ngân, thợ bánh, phụ bếp chay. Part-time 30.000–35.000đ/giờ, chính thức 10–15 triệu/tháng, BHXH, BHYT đầy đủ.', body: X.hiring(), image: 'chat-friends' },
  ...blogPages,
  { file: 'hop-tac.html', path: '/hop-tac', page: 'partners', title: 'Hợp tác & Doanh nghiệp', description: 'Hợp tác với Tiệm Nhà An: tiệc trà văn phòng, quà tặng doanh nghiệp, thuê không gian sự kiện, gói làm việc cho đội nhóm, đối tác nguyên liệu và truyền thông.', body: S.partners(), image: 'meet-team' },
  { file: 've-chung-toi.html', path: '/ve-chung-toi', page: 'about', title: 'Về Nhà An', description: 'Câu chuyện, giá trị và nguồn nguyên liệu của Tiệm Nhà An — trà, bánh và bữa chay nấu như ở nhà.', body: P.about(), image: 'lotus' },
  { file: 'hoi-dap.html', path: '/hoi-dap', page: 'faq', schema: [faqSchema], title: 'Hỏi đáp', description: 'Câu hỏi thường gặp về Tiệm Nhà An: khai trương, không gian làm việc, đặt tiệc, tuyển dụng.', body: M.faqPage(), image: 'cozy-tea' },
  { file: 'lien-he.html', path: '/lien-he', page: 'contact', title: 'Liên hệ', description: `Liên hệ Tiệm Nhà An: hotline/Zalo ${site.phoneDisplay}, email ${site.email}. Đặt bánh, tiệc trà, hợp tác và tuyển dụng.`, body: P.contact(), image: 'cafe-counter' },
  { file: 'chinh-sach-bao-mat.html', path: '/chinh-sach-bao-mat', page: 'legal', title: 'Chính sách bảo mật', description: 'Chính sách bảo mật thông tin cá nhân của Tiệm Nhà An.', body: M.privacy() },
  { file: 'dieu-khoan.html', path: '/dieu-khoan', page: 'legal', title: 'Điều khoản sử dụng', description: 'Điều khoản sử dụng website Tiệm Nhà An.', body: M.terms() },
  { file: 'tin-dung-anh.html', path: '/tin-dung-anh', page: 'credits', title: 'Tín dụng hình ảnh', description: 'Nguồn và giấy phép của hình ảnh minh họa trên website Tiệm Nhà An.', body: P.credits() },
  ...contentPages,
  { file: 'so-do-trang.html', path: '/so-do-trang', page: 'sitemap', title: 'Sơ đồ trang', description: 'Sơ đồ toàn bộ trang và bài viết trên website Tiệm Nhà An: trà, bếp, không gian, sự kiện, chi nhánh, tuyển dụng, cẩm nang.', body: () => ({ html: sitemapPage([]) }), image: 'cafe-garden' },
  { file: 'offline.html', path: '/offline', page: 'offline', title: 'Bạn đang ngoại tuyến', robots: 'noindex, follow', body: P.notFound().replace(/Không tìm thấy trang/g, 'Bạn đang ngoại tuyến') },
  { file: '404.html', path: '/404', page: '404', title: 'Không tìm thấy trang', body: P.notFound() },
];

// Kiểm tra trùng tiêu đề / mô tả (mỗi trang phải có meta riêng)
{
  const seenT = new Map(), seenD = new Map();
  for (const p of pages) {
    if (p.title) { if (seenT.has(p.title)) console.log(`  ⚠ trùng tiêu đề: ${p.path} = ${seenT.get(p.title)}`); seenT.set(p.title, p.path); }
    if (p.description) { if (seenD.has(p.description)) console.log(`  ⚠ trùng mô tả: ${p.path} = ${seenD.get(p.description)}`); seenD.set(p.description, p.path); }
  }
}

// ───────────── Dịch ─────────────
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
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
  part = part.replace(/(\s(?:alt|placeholder|aria-label|title|data-caption|data-title)=")([^"]*)(")/g, (m, a, v, b) => {
    const t = tr(v);
    return t === null ? m : a + encodeAttr(t) + b;
  });
  part = part.replace(/(<meta (?:name|property)="(?:description|keywords|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)" content=")([^"]*)(")/g, (m, a, v, b) => {
    const t = tr(v);
    return t === null ? m : a + encodeAttr(t) + b;
  });
  if (lang !== 'vi') {
    // Liên kết nội bộ sang thư mục ngôn ngữ
    part = part.replace(/<(a|link|form)\b[^>]*>/g, (tag) => {
      if (tag.includes('data-nolocal') || tag.includes('data-canonical')) return tag;
      return tag.replace(/(href|action)="(\/(?!\/|assets\/|api\/|favicon|site\.webmanifest|rss|sw\.js)[^"]*)"/, (mm, attr, href) => `${attr}="${langPath(lang, href)}"`);
    });
  }
  return part.replace(/<!--K(\d+)-->/g, (m, i) => kept[+i]);
}

// JSON-LD: dịch chuỗi và đổi URL sang thư mục ngôn ngữ
function localizeLd(html, lang, dict, path) {
  if (lang === 'vi') return html;
  const pageUrl = site.url + path;
  const locUrl = site.url + (langPath(lang, path) === '/' ? '' : langPath(lang, path));
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (m, j) => {
    const walk = (v, k) => {
      if (typeof v === 'string') {
        if (v === pageUrl || v === pageUrl + '#webpage') return v.replace(pageUrl, locUrl);
        if (['name', 'headline', 'description', 'caption', 'text', 'articleSection', 'title'].includes(k)) {
          const core = v.replace(/\s+/g, ' ').trim();
          if (dict[core]) return dict[core];
          if (k === 'name' && core.endsWith(` | ${site.name}`) && dict[core.slice(0, -(site.name.length + 3))]) return `${dict[core.slice(0, -(site.name.length + 3))]} | ${site.name}`;
        }
        return v;
      }
      if (Array.isArray(v)) return v.map((x) => walk(x, k));
      if (v && typeof v === 'object') {
        const o = {};
        for (const [kk, vv] of Object.entries(v)) o[kk] = kk === 'inLanguage' && typeof vv === 'string' ? (lang === 'zh' ? 'zh-Hans' : lang) : walk(vv, kk);
        return o;
      }
      return v;
    };
    try { return `<script type="application/ld+json">${JSON.stringify(walk(JSON.parse(j))).replace(/</g, '\\u003c')}</script>`; } catch { return m; }
  });
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
  return html;
}

const dicts = Object.fromEntries(LANGS.map(([l]) => {
  const f = join(root, 'src/i18n', `${l}.json`);
  const base = l !== 'vi' && existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  return [l, l === 'vi' ? {} : { ...contentDict(l), ...base }];
}));
const T = (lang, s) => (lang === 'vi' ? s : dicts[lang][String(s).replace(/\s+/g, ' ').trim()] ?? s);

// Trang tồn tại theo từng ngôn ngữ → liên kết tới trang chưa có (đang viết/dịch) được chuyển về trang cha gần nhất
const EXIST = Object.fromEntries(ALL_LANGS.map((l) => [l, new Set(pages.filter((p) => (p.langs || ALL_LANGS).includes(l)).map((p) => p.path))]));
const healed = new Map();
const heal = (html, lang) => html.replace(/<a\b([^>]*?)href="(\/[^"#?]*)([^"]*)"/g, (m, pre, path, rest) => {
  if (pre.includes('data-nolocal') || EXIST[lang].has(path) || /^\/(assets|api|_vercel)\//.test(path) || /\.(xml|txt|ics|json|webmanifest|ico|js|css|webp|jpg|png|pdf)$/.test(path)) return m;
  let p = path;
  while (p !== '/' && !EXIST[lang].has(p)) p = p.slice(0, p.lastIndexOf('/')) || '/';
  healed.set(path, (healed.get(path) || 0) + 1);
  return `<a${pre}href="${p}${p === path ? rest : ''}"`;
});

const seen = new Set();
const report = {};
const searchIndex = Object.fromEntries(ALL_LANGS.map((l) => [l, []]));
const pageImages = new Map();
const built = new Set();
for (const [lang] of LANGS) {
  const used = new Set();
  setLang(lang);
  for (const p of pages) {
    const langs = p.langs || ALL_LANGS;
    if (!langs.includes(lang)) continue;
    const b = typeof p.body === 'function' ? p.body(lang) : p.body;
    const body = typeof b === 'string' ? b : b.html;
    const scripts = [...new Set([...(p.scripts || []), ...((b && b.scripts) || []), 'tilt3d'])].map(js);
    const robots = p.trLangs && !p.trLangs.includes(lang) ? 'noindex, follow' : p.robots;
    let html = heal(layout({ ...p, body, scripts, langs, robots }), lang);
    html = translateHtml(html, lang, dicts[lang], used);
    html = localizeLd(html, lang, dicts[lang], p.path);
    if (lang !== 'vi') html = localize(html, lang, p.path);
    else html = html.replace(/class="lang__opt" data-nolocal data-lang="vi"/g, 'class="lang__opt is-cur" aria-current="true" data-nolocal data-lang="vi"');
    html = html.replace('<!--cjk-fonts-->\n', '');
    if (lang === 'vi') pageImages.set(p.path, [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/img\/photos\/[a-z0-9-]+\.webp)/g)].map((m) => m[1]))]);
    if (!['404', 'offline'].includes(p.page) && !robots) {
      const url = langPath(lang, p.path);
      const h2 = p.article ? p.article.blocks.filter((x) => x.t === 'h2').map((x) => T(lang, x.text)).join(' · ') : '';
      searchIndex[lang].push({ t: T(lang, p.title || site.name), u: url, d: T(lang, p.description || ''), c: T(lang, p.article ? catById[p.article.category].name : ({ article: 'Cẩm nang', news: 'Cẩm nang', category: 'Cẩm nang', branch: 'Chi nhánh', tea: 'Trà & Bếp', space: 'Không gian', community: 'Cộng đồng', season: 'Sự kiện', tools: 'Tiện ích', careers: 'Tuyển dụng', brand: 'Về Nhà An', hiring: 'Tuyển dụng' })[p.page] || 'Nhà An'), h: h2 });
    }
    if (EXTRACT) continue;
    const file = lang === 'vi' ? join(out, p.file) : join(out, lang, p.file);
    built.add(file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  if (lang === 'vi') used.forEach((s) => seen.add(s));
  else report[lang] = [...used].filter((s) => dicts[lang][s] === undefined).length;
}
setLang('vi');

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

// Dọn các trang HTML cũ không còn được sinh ra (ví dụ bài viết đổi đường dẫn)
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'assets' ? [] : walk(join(dir, e.name))) : e.name.endsWith('.html') ? [join(dir, e.name)] : []));
for (const f of walk(out)) if (!built.has(f)) { unlinkSync(f); console.log('  – xóa trang cũ', f.replace(out, '')); }

// ───────────── Dữ liệu cho công cụ: chỉ mục tìm kiếm, thư viện ảnh, lịch ─────────────
mkdirSync(join(out, 'assets/data'), { recursive: true });
for (const l of ALL_LANGS) writeFileSync(join(out, `assets/data/search-${l}.json`), JSON.stringify(searchIndex[l]));
{
  const keys = Object.keys(photos).sort((a, b) => (photos[b].added || '').localeCompare(photos[a].added || '') || a.localeCompare(b));
  for (const l of ALL_LANGS) {
    const cats = GALLERY_CATS.map(([id, n]) => ({ id, n: T(l, n) }));
    const items = keys.map((k) => ({ k, c: galleryCat(k), t: T(l, photos[k].title || ''), w: photos[k].size[0], h: photos[k].size[1], s: photoUrl(k, 'w320'), m: photoUrl(k, 'w800'), u: photoUrl(k), by: photos[k].creator || '', lic: photos[k].license || '' }));
    writeFileSync(join(out, `assets/data/gallery-${l}.json`), JSON.stringify({ cats, items }));
  }
}
{
  // Lịch sự kiện .ics (đăng ký hoặc tải về)
  const cal = pageBySlug['lich-su-kien'];
  const w = cal && (cal.sections || []).find((s) => s.type === 'widget' && s.name === 'calendar');
  const ev = (w && w.data && w.data.events) || [];
  const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const d8 = (s) => s.replace(/-/g, '');
  const next = (s) => { const d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };
  const fold = (line) => line.match(/.{1,70}/gu).join('\r\n ');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tiem Nha An//Lich su kien//VI', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Tiệm Nhà An — Lịch sự kiện', 'X-WR-TIMEZONE:Asia/Ho_Chi_Minh'];
  for (const e of ev) {
    lines.push('BEGIN:VEVENT', `UID:${createHash('md5').update(e.start + e.title).digest('hex')}@tiemnhaan.com`, 'DTSTAMP:20261107T000000Z', `DTSTART;VALUE=DATE:${d8(e.start)}`, `DTEND;VALUE=DATE:${d8(next(e.end || e.start))}`, fold(`SUMMARY:${esc(e.title)}`), fold(`DESCRIPTION:${esc((e.text || '') + ' — ' + site.url + '/lich-su-kien')}`), `URL:${site.url}${e.href || '/lich-su-kien'}`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  writeFileSync(join(out, 'assets/data/lich-nha-an.ics'), lines.join('\r\n') + '\r\n');
}

// ───────────── Sơ đồ website (kèm ảnh), RSS, robots, manifest, service worker ─────────────
const now = new Date().toISOString().slice(0, 10);
const abs = (l, p) => site.url + (langPath(l, p) === '/' ? '/' : langPath(l, p));
const xml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const smPages = pages.filter((p) => !['404', 'offline'].includes(p.page) && !p.robots);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${smPages.flatMap((p) => { const langs = p.trLangs || p.langs || ALL_LANGS; const imgs = (pageImages.get(p.path) || []).slice(0, 20); return langs.map((l) => `  <url><loc>${abs(l, p.path)}</loc><lastmod>${p.date || now}</lastmod>${langs.map((x) => `<xhtml:link rel="alternate" hreflang="${x === 'zh' ? 'zh-Hans' : x}" href="${abs(x, p.path)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${abs('vi', p.path)}"/>${imgs.map((u) => `<image:image><image:loc>${site.url}${u}</image:loc></image:image>`).join('')}</url>`); }).join('\n')}
</urlset>
`);
const rssItems = (list) => list.map((a) => `<item><title>${xml(a.title)}</title><link>${site.url}/tin-tuc/${a.slug}</link><guid>${site.url}/tin-tuc/${a.slug}</guid><pubDate>${new Date(a.date + 'T08:00:00+07:00').toUTCString()}</pubDate><category>${xml(catById[a.category].name)}</category><description>${xml(a.excerpt)}</description></item>`).join('\n');
const rss = (title, link, list) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xml(title)}</title>
<link>${link}</link>
<atom:link href="${link.replace(/\/tin-tuc.*/, '')}/rss.xml" rel="self" type="application/rss+xml"/>
<description>${xml(site.description)}</description>
<language>vi</language>
${rssItems(list)}
</channel>
</rss>
`;
writeFileSync(join(out, 'rss.xml'), rss(`${site.name} — Cẩm nang & tin tức`, `${site.url}/tin-tuc`, ARTICLES.slice(0, 60)));
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(join(out, 'opensearch.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
<ShortName>Tiệm Nhà An</ShortName>
<Description>Tìm trên website Tiệm Nhà An</Description>
<InputEncoding>UTF-8</InputEncoding>
<Image width="32" height="32" type="image/png">${site.url}/assets/img/brand/favicon-32.png</Image>
<Url type="text/html" template="${site.url}/tim-kiem?q={searchTerms}"/>
</OpenSearchDescription>
`);
writeFileSync(join(out, 'site.webmanifest'), JSON.stringify({
  name: site.name, short_name: 'Nhà An', description: site.description, lang: 'vi', dir: 'ltr', id: '/', start_url: '/?source=pwa', scope: '/', display: 'standalone', orientation: 'portrait', background_color: '#FCFAF5', theme_color: '#41593D', categories: ['food', 'lifestyle'],
  icons: [{ src: '/assets/img/brand/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/brand/favicon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/assets/img/brand/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }],
  shortcuts: [{ name: 'Đặt bàn', url: '/dat-ban' }, { name: 'Không gian', url: '/khong-gian' }, { name: 'Góc tập trung', url: '/tap-trung' }, { name: 'Tìm kiếm', url: '/tim-kiem' }],
}, null, 2));
{
  // Service worker: trang HTML lấy mạng trước (có bản lưu dự phòng), tài nguyên có mã phiên bản lấy bộ nhớ đệm trước
  const ver = createHash('md5').update(readFileSync(join(out, 'assets/css/style.min.css'))).update(readFileSync(join(out, 'assets/js/main.js'))).digest('hex').slice(0, 8);
  const sw = readFileSync(join(root, 'src/sw.js'), 'utf8').replace('__VERSION__', ver).replace('__PRECACHE__', JSON.stringify(['/offline', assetUrl('/assets/css/style.min.css'), assetUrl('/assets/js/main.js'), '/assets/img/brand/logo-circle-96.webp']));
  writeFileSync(join(out, 'sw.js'), sw);
}
mkdirSync(join(out, '.well-known'), { recursive: true });
writeFileSync(join(out, '.well-known/security.txt'), `Contact: mailto:${site.email}\nPreferred-Languages: vi, en\nCanonical: ${site.url}/.well-known/security.txt\nExpires: 2027-12-31T23:59:59Z\n`);
writeFileSync(join(out, 'humans.txt'), `/* TEAM */\nTiệm Nhà An — ${site.email} — ${site.phoneDisplay}\n/* SITE */\nNgôn ngữ: Tiếng Việt, English, 日本語, 한국어, 中文\n`);

// ───────────── Báo cáo ─────────────
const need = [...new Set(pages.map((p) => p.image).filter((k) => k && !hasOg(k)))];
if (need.length) console.log(`  ⚠ ${need.length} trang thiếu ảnh chia sẻ riêng, chạy: python3 scripts/images.py --og ${need.join(' ')}`);
if (missingSlots.size) console.log(`  ⚠ ${missingSlots.size} ô ảnh chưa gán ảnh thật (đang dùng ảnh dự phòng)`);
if (healed.size) console.log(`  ⚠ ${healed.size} liên kết tới trang chưa có đã tạm trỏ về trang cha: ${[...healed.keys()].slice(0, 12).join(', ')}${healed.size > 12 ? '…' : ''}`);
for (const w of contentWarnings) console.log('  ⚠ ' + w);
const counts = ALL_LANGS.map((l) => `${l} ${pages.filter((p) => (p.langs || ALL_LANGS).includes(l)).length}`).join(', ');
console.log(`✔ ${pages.length} trang (${counts}), ${ARTICLES.length} bài viết, ${Object.keys(photos).length} ảnh`);
for (const [l, n] of Object.entries(report)) if (n) console.log(`  ⚠ ${l}: còn ${n} chuỗi chưa dịch (đang hiển thị tiếng Việt)`);
