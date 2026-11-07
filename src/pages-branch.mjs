import { site } from './data/site.mjs';
import { spaces } from './data/content.mjs';
import { icon, img, tel } from './layout.mjs';
import { head, contactStrip } from './pages.mjs';
import { reserveForm } from './pages-studio.mjs';

// ───────────────────────── TRANG TỪNG CHI NHÁNH ─────────────────────────
export function branchPage(b) {
  const r = site.regions.find((x) => x.id === b.region);
  const others = site.branches.filter((x) => x.id !== b.id);
  return `
<section class="rhero rhero--branch rhero--${b.region}">
  ${img(b.img, b.city, { cls: 'rhero__bg', eager: true })}
  <div class="wrap rhero__in">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Trang chủ</a><span>/</span><a href="/chi-nhanh">Chi nhánh</a><span>/</span><span>${b.short}</span></nav>
    <p class="eyebrow">Chi nhánh ${b.no} · ${b.area}</p>
    <h1>${b.city}</h1>
    <p class="branch-tagline">${b.tagline}</p>
    <p class="lead">${b.note}</p>
    <div class="hero__cta"><a class="btn btn--pink btn--lg" href="#dat-ban">${icon('calendar')} Đặt bàn tại ${b.short}</a><a class="btn btn--light btn--lg" href="#ban-do">${icon('pin')} Xem bản đồ</a></div>
  </div>
</section>

<section class="facts">
  <div class="wrap facts__in">
    <div>${icon('pin')}<span><small>Khu vực</small><strong>${b.area}</strong></span></div>
    <div>${icon('clock')}<span><small>Giờ mở cửa</small><strong>24/7, cả lễ Tết</strong></span></div>
    <div>${icon('phone')}<span><small>Hotline / Zalo</small><strong><a href="tel:${tel()}">${site.phoneDisplay}</a></strong></span></div>
    <div>${icon('calendar')}<span><small>Trạng thái</small><strong>Sắp khai trương</strong></span></div>
  </div>
</section>

<section class="section">
  <div class="wrap bintro">
    <div>
      <p class="eyebrow">Về chi nhánh</p>
      <h2>${b.tagline}</h2>
      <p class="lead">${b.intro}</p>
      <ul class="tags">${b.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="bintro__gallery">
      ${b.gallery.map((k, i) => img(k, b.city, { cls: `bg-${i}` })).join('')}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    ${head('Điểm nổi bật', `Chỉ có ở <em>${b.short}</em>`)}
    <div class="promise promise--3">
      ${b.highlights.map(([ic, t, d]) => `<div>${icon(ic)}<h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Món nên thử', `Vị riêng của <em>${b.short}</em>`)}
    <div class="dishes">
      ${b.signature.map(([k, n, d]) => `
      <article class="rdish">
        <div class="rdish__media">${img(k, n)}</div>
        <div class="rdish__body"><h3>${n}</h3><p>${d}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--green">
  <div class="wrap">
    ${head('Không gian tại chi nhánh', '4 khu làm việc &amp; học tập')}
    <div class="bspaces">
      ${spaces.map((s) => `<a class="bspace" href="/khong-gian#${s.id}">${img(s.img, s.name)}<span>${icon(s.icon)} ${s.name}</span></a>`).join('')}
    </div>
    <div class="center"><a class="btn btn--light" href="/chup-anh">${icon('camera')} Studio áo dài &amp; Góc check-in</a></div>
  </div>
</section>

<section class="section" id="ban-do">
  <div class="wrap bmap">
    <div>
      <p class="eyebrow">Đường đến Nhà An</p>
      <h2>${b.area}</h2>
      <ul class="info">
        <li>${icon('pin')}<span><strong>Địa chỉ</strong>${b.address}</span></li>
        <li>${icon('clock')}<span><strong>Giờ phục vụ</strong>${site.hours.map(([k, v]) => `${k}: ${v}`).join('<br>')}</span></li>
        <li>${icon('phone')}<span><strong>Liên hệ</strong><a href="tel:${tel()}">${site.phoneDisplay}</a> · <a href="mailto:${site.email}">${site.email}</a></span></li>
      </ul>
      <p class="eyebrow eyebrow--sm">Gần đó</p>
      <ul class="checks checks--lg">${b.nearby.map((n) => `<li>${n}</li>`).join('')}</ul>
    </div>
    <div class="bmap__frame">
      <iframe title="Bản đồ ${b.area}" src="https://www.google.com/maps?q=${encodeURIComponent(b.map)}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      <a class="btn btn--primary" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(b.map)}" target="_blank" rel="noopener">${icon('pin')} Mở Google Maps</a>
    </div>
  </div>
</section>

<section class="section section--cream" id="dat-ban">
  <div class="wrap apply-wrap apply-wrap--light">
    <div>
      <p class="eyebrow">Đặt bàn · 24/7</p>
      <h2>Giữ chỗ tại <em>${b.city}</em></h2>
      <p class="lead">Đặt bàn, phòng họp, chỗ chạy deadline hay studio áo dài. Nhà An gọi lại xác nhận.</p>
    </div>
    ${reserveForm(`Đặt bàn ${b.city}`).replace(`<option value="${b.city}">`, `<option value="${b.city}" selected>`)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${head('Chi nhánh khác', 'Ghé thêm những <em>căn nhà khác</em>')}
    <div class="ominis">
      ${others.map((o) => `<a class="omini" href="/chi-nhanh/${o.id}">${img(o.img, o.city)}<span><small>Chi nhánh ${o.no} · ${o.area}</small><strong>${o.city}</strong></span></a>`).join('')}
    </div>
    <div class="center"><a class="btn btn--ghost" href="${r.path}">Khám phá ${r.name}</a></div>
  </div>
</section>
${contactStrip()}`;
}
