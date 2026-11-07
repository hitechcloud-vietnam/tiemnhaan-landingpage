// Cẩm nang (blog): trang bài viết, danh sách có phân trang, trang theo chủ đề, sơ đồ trang
import { site } from './data/site.mjs';
import { esc, icon, img, photoUrl, SZ } from './layout.mjs';
import { head, signup } from './pages.mjs';
import { articlesFor, CATS, catById, resolveImg, readMinutes, PAGES } from './content.mjs';
import { postCard, crumbsHtml, relatedSection, KNOWN } from './blocks.mjs';

const T = (s = '') => esc(s);
export const PER_PAGE = 12;
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const dateText = (d) => d.split('-').reverse().join('/');

const catChips = (cur) => `
<nav class="catnav" aria-label="Chủ đề cẩm nang">
  <a href="/tin-tuc"${cur === 'all' ? ' aria-current="page"' : ''}>Tất cả</a>
  ${CATS.map((c) => `<a href="/tin-tuc/chu-de/${c.id}"${cur === c.id ? ' aria-current="page"' : ''}>${icon(c.icon)}${T(c.name)}</a>`).join('')}
</nav>`;

function blockHtml(b, ids) {
  switch (b.t) {
    case 'h2': {
      let id = slugify(b.text) || 'muc';
      while (ids.has(id)) id += '-2';
      ids.add(id);
      return `<h2 id="${id}">${T(b.text)}</h2>`;
    }
    case 'h3': return `<h3>${T(b.text)}</h3>`;
    case 'ul': return `<ul>${b.items.map((x) => `<li>${T(x)}</li>`).join('')}</ul>`;
    case 'ol': return `<ol>${b.items.map((x) => `<li>${T(x)}</li>`).join('')}</ol>`;
    case 'quote': return `<blockquote class="art__quote"><p>${T(b.text)}</p></blockquote>`;
    case 'img': {
      const k = resolveImg(b.src);
      return `<figure class="art__fig"><a href="${photoUrl(k)}" data-lightbox="art" data-caption="${esc(b.cap || b.alt)}">${img(k, b.alt, { sizes: '(max-width: 760px) 92vw, 720px' })}</a>${b.cap ? `<figcaption>${T(b.cap)}</figcaption>` : ''}</figure>`;
    }
    case 'link': return `<a class="art__link" href="${esc(b.href)}">${icon('arrow')}<span><small>Đọc thêm</small><strong>${T(b.text)}</strong></span></a>`;
    case 'tip': return `<aside class="art__tip">${icon('spark')}<div>${b.title ? `<p class="art__tip-t">${T(b.title)}</p>` : ''}<p>${T(b.text)}</p></div></aside>`;
    default: return `<p>${T(b.text)}</p>`;
  }
}

export function articlePage(a) {
  const ids = new Set();
  const body = a.blocks.map((b) => blockHtml(b, ids)).join('\n');
  const h2s = a.blocks.filter((b) => b.t === 'h2');
  const toc = h2s.length >= 3 ? `<nav class="art__toc" aria-label="Mục lục"><p class="art__toc-t">Mục lục</p><ol>${[...ids].map((id, i) => `<li><a href="#${id}">${T(h2s[i].text)}</a></li>`).join('')}</ol></nav>` : '';
  const url = `${site.url}/tin-tuc/${a.slug}`;
  const cat = catById[a.category];
  const all = articlesFor();
  const same = all.filter((x) => x.slug !== a.slug && x.category === a.category);
  const more = [...same, ...all.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3);
  const cover = resolveImg(a.cover);
  return `
<div class="readbar" aria-hidden="true"><span></span></div>
<article class="article art">
  <header class="article__head">
    <div class="wrap narrow">
      ${crumbsHtml(`/tin-tuc/${a.slug}`, a.title)}
      <span class="post__meta"><a href="/tin-tuc/chu-de/${cat.id}">${T(cat.name)}</a> · <time datetime="${a.date}">${dateText(a.date)}</time> · ${readMinutes(a)} phút đọc</span>
      <h1>${T(a.title)}</h1>
      <p class="lead">${T(a.excerpt)}</p>
    </div>
  </header>
  <div class="wrap article__img">${img(cover, a.coverAlt || a.title, { eager: true, sizes: '(max-width: 1240px) 96vw, 1180px' })}</div>
  <div class="wrap art__layout${toc ? '' : ' art__layout--solo'}">
    ${toc ? `<aside class="art__side">${toc}</aside>` : ''}
    <div class="article__body art__body">
      ${body}
      <div class="share">
        <span>Chia sẻ:</span>
        <button type="button" class="share-native" data-url="${url}" data-title="${esc(a.title)}">${icon('arrow')} Chia sẻ</button>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener">${icon('facebook')} Facebook</a>
        <button type="button" class="copy-link" data-url="${url}">${icon('card')} Sao chép liên kết</button>
      </div>
      ${a.tags && a.tags.length ? `<p class="art__tags">${icon('leaf')}${a.tags.map((t) => `<span>${T(t)}</span>`).join('')}</p>` : ''}
    </div>
  </div>
</article>
<section class="section section--cream">
  <div class="wrap">
    ${head('Đọc tiếp', `Thêm từ <em>${T(cat.name)}</em>`)}
    <div class="posts">${more.map((x) => postCard(x)).join('')}</div>
    <p class="center"><a class="btn btn--ghost" href="/tin-tuc/chu-de/${cat.id}">Tất cả bài ${T(cat.name)} ${icon('arrow')}</a></p>
  </div>
</section>
${signup()}`;
}

const pager = (n, total) => (total <= 1 ? '' : `
<nav class="pager" aria-label="Phân trang">
  ${n > 1 ? `<a class="pager__nav" href="${n === 2 ? '/tin-tuc' : `/tin-tuc/trang-${n - 1}`}" rel="prev">← Trang trước</a>` : ''}
  ${Array.from({ length: total }, (_, i) => i + 1).map((i) => `<a href="${i === 1 ? '/tin-tuc' : `/tin-tuc/trang-${i}`}"${i === n ? ' aria-current="page"' : ''}>${i}</a>`).join('')}
  ${n < total ? `<a class="pager__nav" href="/tin-tuc/trang-${n + 1}" rel="next">Trang sau →</a>` : ''}
</nav>`);

export const newsPages = (lang) => Math.ceil(articlesFor(lang).length / PER_PAGE);
export function newsIndex(n = 1) {
  const ALL = articlesFor();
  const total = Math.ceil(ALL.length / PER_PAGE);
  const list = ALL.slice((n - 1) * PER_PAGE, n * PER_PAGE);
  const [first, ...rest] = list;
  return `
<section class="phero phero--short">
  <div class="wrap">
    ${n > 1 ? crumbsHtml(`/tin-tuc/trang-${n}`, `Trang ${n}`) : ''}
    <p class="eyebrow">Cẩm nang Nhà An</p>
    <h1>Chuyện trà, chuyện bếp <em>và chuyện mình</em></h1>
    <p class="lead">${ALL.length} bài viết về trà Việt, món chay, bánh, mẹo chạy deadline, những vùng đất Nhà An sắp về và tin tức từ tiệm.</p>
    <p class="news__search"><a class="btn btn--ghost" href="/tim-kiem">${icon('search')} Tìm bài viết</a></p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    ${catChips('all')}
    ${n === 1 && first ? `<div class="posts posts--feature">${postCard(first, 'post post--big')}</div>` : ''}
    <div class="posts">${(n === 1 ? rest : list).map((a) => postCard(a)).join('')}</div>
    ${pager(n, total)}
  </div>
</section>
${n === 1 ? signup() : ''}`;
}

export function categoryPage(id) {
  const c = catById[id];
  const list = articlesFor().filter((a) => a.category === id);
  return `
<section class="phero phero--short">
  <div class="wrap">
    ${crumbsHtml(`/tin-tuc/chu-de/${id}`, c.name)}
    <p class="eyebrow">Chủ đề</p>
    <h1>${T(c.name)}</h1>
    <p class="lead">${T(c.desc)}. ${list.length} bài viết.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap">
    ${catChips(id)}
    <div class="posts">${list.map((a) => postCard(a)).join('')}</div>
  </div>
</section>`;
}

// Sơ đồ trang (HTML)
export function sitemapPage(extra) {
  const groups = [
    ['Trà & Bếp', 'tea'], ['Không gian & dịch vụ', 'space'], ['Cộng đồng', 'community'], ['Mùa lễ hội', 'season'],
    ['Tiện ích', 'tools'], ['Thương hiệu', 'brand'], ['Tuyển dụng', 'careers'],
  ];
  const known = Object.entries(KNOWN).filter(([p]) => p !== '/so-do-trang');
  return `
<section class="phero phero--short">
  <div class="wrap">
    ${crumbsHtml('/so-do-trang', 'Sơ đồ trang')}
    <p class="eyebrow">Sơ đồ trang</p>
    <h1>Mọi ngả đường <em>về Nhà An</em></h1>
    <p class="lead">Danh sách đầy đủ các trang và bài viết trên website Tiệm Nhà An.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="wrap smap">
    <div class="smap__g"><h2>Trang chính</h2><ul>${known.map(([p, [t]]) => `<li><a href="${p}">${T(t)}</a></li>`).join('')}${extra.map(([p, t]) => `<li><a href="${p}">${T(t)}</a></li>`).join('')}</ul></div>
    ${groups.map(([name, g]) => { const ps = PAGES.filter((p) => p.group === g); return ps.length ? `<div class="smap__g"><h2>${name}</h2><ul>${ps.map((p) => `<li><a href="${p.path}">${T(p.nav)}</a></li>`).join('')}</ul></div>` : ''; }).join('')}
    ${CATS.map((c) => `<div class="smap__g"><h2><a href="/tin-tuc/chu-de/${c.id}">${T(c.name)}</a></h2><ul>${articlesFor().filter((a) => a.category === c.id).map((a) => `<li><a href="/tin-tuc/${a.slug}">${T(a.title)}</a></li>`).join('')}</ul></div>`).join('')}
  </div>
</section>`;
}
