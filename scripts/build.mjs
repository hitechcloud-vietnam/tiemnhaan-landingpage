// Sinh các trang HTML tĩnh vào thư mục public/ — chạy: npm run build
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, photos } from '../src/layout.mjs';
import * as P from '../src/pages.mjs';
import { site } from '../src/data/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');

const missing = Object.keys(photos).filter((k) => !existsSync(join(out, 'assets/img/photos', k + '.webp')));
if (missing.length) throw new Error('Thiếu ảnh: ' + missing.join(', '));

const pages = [
  { file: 'index.html', path: '/', page: 'home', body: P.home() },
  { file: 'trai-nghiem.html', path: '/trai-nghiem', page: 'experience', title: 'Trải nghiệm — Không gian, Workshop, Đặt tiệc', description: 'Không gian, workshop pha trà và làm bánh, đặt tiệc và quà tặng, Nhà An Club và tuyển dụng tại Tiệm Nhà An.', body: P.experience() },
  { file: 've-chung-toi.html', path: '/ve-chung-toi', page: 'about', title: 'Về Nhà An', description: 'Câu chuyện, giá trị và nguồn nguyên liệu của Tiệm Nhà An — trà, bánh và bữa chay nấu như ở nhà.', body: P.about() },
  { file: 'chi-nhanh.html', path: '/chi-nhanh', page: 'branches', title: 'Chi nhánh TP.HCM & Đà Nẵng — Coming Soon', description: 'Tiệm Nhà An sắp khai trương tại TP. Hồ Chí Minh và Đà Nẵng. Đăng ký nhận tin và ưu đãi khai trương.', body: P.branches() },
  { file: 'lien-he.html', path: '/lien-he', page: 'contact', title: 'Liên hệ', description: `Liên hệ Tiệm Nhà An: hotline/Zalo ${site.phoneDisplay}, email ${site.email}. Đặt bánh, tiệc trà, hợp tác và tuyển dụng.`, body: P.contact() },
  { file: 'tin-dung-anh.html', path: '/tin-dung-anh', page: 'credits', title: 'Tín dụng hình ảnh', description: 'Nguồn và giấy phép của hình ảnh minh họa trên website Tiệm Nhà An.', body: P.credits() },
  { file: '404.html', path: '/404', page: '404', title: 'Không tìm thấy trang', body: P.notFound() },
];
mkdirSync(out, { recursive: true });
for (const p of pages) writeFileSync(join(out, p.file), layout(p));

const now = new Date().toISOString().slice(0, 10);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => p.page !== '404').map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${now}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(join(out, 'site.webmanifest'), JSON.stringify({ name: site.name, short_name: 'Nhà An', start_url: '/', display: 'standalone', background_color: '#FCFAF5', theme_color: '#41593D', icons: [{ src: '/assets/img/brand/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/brand/favicon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));
console.log(`✔ ${pages.length} trang, ${Object.keys(photos).length} ảnh`);
