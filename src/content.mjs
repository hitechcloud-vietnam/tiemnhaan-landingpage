// Nội dung mới dạng dữ liệu: trang (JSON) và bài viết (Markdown) trong src/content/
//   src/content/pages/<lang>/<slug với "/" → "__">.json
//   src/content/articles/<lang>/<slug>.md
// Tiếng Việt là bản gốc. Bản dịch là file CÙNG CẤU TRÚC ở thư mục ngôn ngữ khác; khi build, các chuỗi
// được ghép cặp theo vị trí để sinh từ điển dịch (khóa = chuỗi tiếng Việt), dùng chung cơ chế dịch của website.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { photos } from './layout.mjs';
import { posts as legacyPosts, morePosts } from './data/content.mjs';

const DIR = new URL('./content/', import.meta.url);
const read = (rel) => readFileSync(new URL(rel, DIR), 'utf8');
const has = (rel) => existsSync(new URL(rel, DIR));
const list = (rel, ext) => (has(rel) ? readdirSync(new URL(rel, DIR)).filter((f) => f.endsWith(ext)).sort() : []);

export const warnings = [];

// ───────────── Ảnh: ô ảnh "@chủ-đề|mô tả" → key ảnh thật ─────────────
const IMAGE_MAP = has('image-map.json') ? JSON.parse(read('image-map.json')) : {};
const THEME_FALLBACK = {
  origin: 'tea-leaves', craft: 'tea-leaves', brew: 'tea-pour', lotus: 'lotus', leaf: 'tea-leaves', drinks: 'milktea-cup',
  bake: 'croissants', cake: 'cake', vietcake: 'cake', veg: 'tofu-noodle', market: 'fruit-tea', work: 'focus-laptop',
  cafe: 'cafe-bright', night: 'night-cafe', meet: 'meet-room', books: 'cozy-lounge', tet: 'tet-blossom',
  trungthu: 'trungthu-lanterns', aodai: 'aodai-lotus', craftvn: 'silk', festival: 'lm-hoian-night-boat',
  hcm: 'lm-landmark81-night', danang: 'lm-dragon-night', hoian: 'lm-hoian-riverside', quangnam: 'lm-myson-towers',
  landscape: 'thubon-sunset', green: 'latte-plants', club: 'friends-group', gift: 'macarons',
};
export const missingSlots = new Map();
export const usedKeys = new Set();
export const resolveImg = (v) => {
  if (!v) return null;
  let key;
  if (!v.startsWith('@')) key = photos[v] ? v : null;
  else if (IMAGE_MAP[v] && photos[IMAGE_MAP[v]]) key = IMAGE_MAP[v];
  if (!key) {
    missingSlots.set(v, (missingSlots.get(v) || 0) + 1);
    key = THEME_FALLBACK[v.startsWith('@') ? v.slice(1).split('|')[0] : ''] || 'cafe-bright';
  }
  usedKeys.add(key);
  return key;
};

// ───────────── Trang ─────────────
const fileOf = (slug) => slug.replace(/\//g, '__') + '.json';
const tryJson = (rel) => { try { return JSON.parse(read(rel)); } catch (e) { warnings.push(`bỏ qua ${rel}: JSON lỗi (${e.message.slice(0, 60)})`); return null; } };
export const PAGES = list('pages/vi/', '.json').map((f) => {
  const data = tryJson('pages/vi/' + f);
  if (!data || !data.slug || !data.hero || !Array.isArray(data.sections)) { if (data) warnings.push(`bỏ qua pages/vi/${f}: thiếu slug/hero/sections`); return null; }
  return { ...data, path: '/' + data.slug };
}).filter(Boolean);
export const pageBySlug = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
export const pageData = (slug, lang) => {
  if (lang !== 'vi' && has(`pages/${lang}/${fileOf(slug)}`)) return tryJson(`pages/${lang}/${fileOf(slug)}`) || pageBySlug[slug];
  return pageBySlug[slug];
};

// ───────────── Bài viết (Markdown đơn giản, chỉ khối) ─────────────
const IMG_RE = /^!\[([^\]]+)\]\((\S+?)(?:\|([^"]+?))?(?: "([^"]+)")?\)$/;
export function parseMd(src, name = '') {
  const m = src.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('Bài viết thiếu front matter: ' + name);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const blocks = [];
  for (const raw of m[2].split(/\n[ \t]*\n/)) {
    const b = raw.trim();
    if (!b) continue;
    const lines = b.split('\n').map((l) => l.trim());
    if (b.startsWith(':::tip')) {
      blocks.push({ t: 'tip', title: lines[0].replace(/^:::tip\s*/, ''), text: lines.slice(1, -1).join(' ').trim() });
    } else if (b.startsWith('### ')) blocks.push({ t: 'h3', text: b.slice(4).trim() });
    else if (b.startsWith('## ')) blocks.push({ t: 'h2', text: b.slice(3).trim() });
    else if (b.startsWith('![')) {
      const mm = b.match(IMG_RE);
      if (!mm) throw new Error(`Ảnh sai cú pháp trong ${name}: ${b}`);
      blocks.push({ t: 'img', alt: mm[1], src: mm[2] + (mm[3] ? '|' + mm[3] : ''), cap: mm[4] || '' });
    } else if (b.startsWith('[[')) {
      const mm = b.match(/^\[\[(\S+)\|([^\]]+)\]\]$/);
      if (!mm) throw new Error(`Liên kết sai cú pháp trong ${name}: ${b}`);
      blocks.push({ t: 'link', href: mm[1], text: mm[2].trim() });
    } else if (lines.every((l) => /^- /.test(l))) blocks.push({ t: 'ul', items: lines.map((l) => l.slice(2).trim()) });
    else if (lines.every((l) => /^\d+\.\s/.test(l))) blocks.push({ t: 'ol', items: lines.map((l) => l.replace(/^\d+\.\s*/, '').trim()) });
    else if (b.startsWith('>')) blocks.push({ t: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ').trim() });
    else blocks.push({ t: 'p', text: lines.join(' ') });
  }
  return { fm, blocks };
}

export const CATS = [
  { id: 'tra', name: 'Trà', icon: 'leaf', desc: 'Kiến thức trà Việt, cách pha và thưởng thức' },
  { id: 'bep', name: 'Bánh & Bếp chay', icon: 'bowl', desc: 'Món chay Việt, lò bánh và những công thức nhỏ' },
  { id: 'lam-viec', name: 'Làm việc & Học tập', icon: 'laptop', desc: 'Mẹo chạy deadline, học nhóm, tập trung' },
  { id: 'vung-mien', name: 'Vùng miền & Du lịch', icon: 'map', desc: 'Sài Gòn, Đà Nẵng, Hội An, Duy Xuyên' },
  { id: 'van-hoa', name: 'Văn hóa & Lễ hội', icon: 'flower', desc: 'Tết, Trung thu, áo dài, làng nghề' },
  { id: 'song-xanh', name: 'Sống xanh', icon: 'recycle', desc: 'Những thói quen nhỏ cho một hành tinh xanh' },
  { id: 'nha-an', name: 'Tin Nhà An', icon: 'home', desc: 'Khai trương, sự kiện, tuyển dụng, câu chuyện' },
];
export const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));

const wordsOf = (blocks) => blocks.map((b) => [b.text, b.title, b.alt, b.cap, ...(b.items || [])].filter(Boolean).join(' ')).join(' ').split(/\s+/).filter(Boolean).length;
const LEGACY_CAT = { 'Tin tiệm': 'nha-an', 'Không gian': 'lam-viec', 'Tuyển dụng': 'nha-an', 'Chụp ảnh': 'van-hoa', 'Sự kiện': 'nha-an' };

const fresh = list('articles/vi/', '.md').map((f) => {
  const slug = f.slice(0, -3);
  let parsed;
  try { parsed = parseMd(read('articles/vi/' + f), f); } catch (e) { warnings.push(`bỏ qua articles/vi/${f}: ${e.message.slice(0, 80)}`); return null; }
  const { fm, blocks } = parsed;
  if (!fm.title || !blocks.length) { warnings.push(`bỏ qua articles/vi/${f}: thiếu tiêu đề/nội dung`); return null; }
  if (!catById[fm.category]) warnings.push(`bài ${slug}: danh mục lạ "${fm.category}"`);
  return {
    slug, title: fm.title, description: fm.description || fm.excerpt, excerpt: fm.excerpt || fm.description,
    category: catById[fm.category] ? fm.category : 'nha-an', tags: (fm.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
    cover: fm.cover, coverAlt: fm.coverAlt || fm.title, date: fm.date || '2026-11-07', blocks, words: wordsOf(blocks),
  };
}).filter(Boolean);
const legacy = [...legacyPosts, ...morePosts].filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i).map((p) => ({
  slug: p.slug, title: p.title, description: p.excerpt, excerpt: p.excerpt, category: LEGACY_CAT[p.tag] || 'nha-an', tags: [p.tag],
  cover: p.img, coverAlt: p.title, date: p.date, blocks: p.body.map((t) => ({ t: 'p', text: t })), words: wordsOf(p.body.map((t) => ({ t: 'p', text: t }))), legacy: true,
}));
// Thứ tự hiển thị: mới nhất trước; cùng ngày thì xen kẽ các danh mục cho trang tin đa dạng
const interleave = (arr) => {
  const byCat = CATS.map((c) => arr.filter((a) => a.category === c.id));
  const outList = [];
  for (let i = 0; outList.length < arr.length; i++) byCat.forEach((g) => g[i] && outList.push(g[i]));
  return outList;
};
const dates = [...new Set([...fresh, ...legacy].map((a) => a.date))].sort().reverse();
export const ARTICLES = dates.flatMap((d) => [...interleave(legacy.filter((a) => a.date === d)), ...interleave(fresh.filter((a) => a.date === d))]);
export const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
// Bài viết có bản dịch cho ngôn ngữ đang dựng (bài cũ dịch qua từ điển chung nên luôn có)
export const hasArticle = (a, lang) => lang === 'vi' || a.legacy || has(`articles/${lang}/${a.slug}.md`);
let CUR = 'vi';
export const setLang = (l) => { CUR = l; };
export const curLang = () => CUR;
export const articlesFor = (lang = CUR) => ARTICLES.filter((a) => hasArticle(a, lang));
export const readMinutes = (a) => Math.max(2, Math.round(a.words / 200));

export const articleData = (slug, lang) => {
  const a = articleBySlug[slug];
  if (lang === 'vi' || a.legacy || !has(`articles/${lang}/${slug}.md`)) return a;
  let parsed;
  try { parsed = parseMd(read(`articles/${lang}/${slug}.md`), `${lang}/${slug}.md`); } catch (e) { warnings.push(`bỏ qua bản dịch ${lang}/${slug}.md`); return a; }
  const { fm, blocks } = parsed;
  return { ...a, title: fm.title, description: fm.description, excerpt: fm.excerpt, coverAlt: fm.coverAlt, blocks, words: wordsOf(blocks) };
};

// ───────────── Từ điển dịch sinh từ các file song song ─────────────
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
const SKIP = new Set(['img', 'image', 'href', 'icon', 'type', 'slug', 'group', 'style', 'id', 'kind', 'start', 'end', 'day', 'related', 'grams', 'temp', 'steeps', 'work', 'rest', 'scores', 'src', 'cover', 'category', 'date', 'ml']);
function addPair(dict, vi, tr, where) {
  if (typeof vi !== 'string' || typeof tr !== 'string') return;
  const a = norm(vi), b = norm(tr);
  if (!a || !/\p{L}/u.test(a) || !b) return;
  if (a.includes('*') || b.includes('*')) {
    const pa = a.split('*').map(norm), pb = b.split('*').map(norm);
    if (pa.length !== pb.length) { warnings.push(`${where}: số cụm *...* khác bản gốc: "${a}" ↔ "${b}"`); return; }
    pa.forEach((x, i) => {
      if (!x) return;
      if (!pb[i]) { warnings.push(`${where}: thiếu cụm dịch cho "${x}"`); return; }
      if (/\p{L}/u.test(x)) dict[x] ??= pb[i];
    });
    return;
  }
  dict[a] ??= b;
}
function walkPair(dict, vi, tr, where, key = '') {
  if (SKIP.has(key)) return;
  if (Array.isArray(vi)) {
    if (!Array.isArray(tr) || tr.length !== vi.length) { warnings.push(`${where}.${key}: số phần tử khác bản gốc`); return; }
    vi.forEach((x, i) => walkPair(dict, x, tr[i], where, key));
  } else if (vi && typeof vi === 'object') {
    if (!tr || typeof tr !== 'object') { warnings.push(`${where}.${key}: thiếu`); return; }
    for (const k of Object.keys(vi)) walkPair(dict, vi[k], tr[k], where, k);
  } else addPair(dict, vi, tr, where);
}
export function contentDict(lang) {
  const dict = {};
  for (const p of PAGES) {
    const f = `pages/${lang}/${fileOf(p.slug)}`;
    const t = has(f) ? tryJson(f) : null;
    if (t) walkPair(dict, pageBySlug[p.slug], t, `${lang}/${fileOf(p.slug)}`);
  }
  for (const a of ARTICLES) {
    if (a.legacy || !has(`articles/${lang}/${a.slug}.md`)) continue;
    const t = articleData(a.slug, lang);
    const where = `${lang}/${a.slug}.md`;
    ['title', 'description', 'excerpt', 'coverAlt'].forEach((k) => addPair(dict, a[k], t[k], where));
    if (t.blocks.length !== a.blocks.length) { warnings.push(`${where}: ${t.blocks.length} khối, bản gốc ${a.blocks.length} khối`); continue; }
    a.blocks.forEach((b, i) => {
      const x = t.blocks[i];
      if (x.t !== b.t) { warnings.push(`${where}: khối ${i} là ${x.t}, bản gốc ${b.t}`); return; }
      ['text', 'title', 'alt', 'cap'].forEach((k) => addPair(dict, b[k], x[k], where));
      if (b.items) (b.items.length === (x.items || []).length ? b.items.forEach((it, j) => addPair(dict, it, x.items[j], where)) : warnings.push(`${where}: danh sách khối ${i} khác số dòng`));
    });
  }
  return dict;
}
