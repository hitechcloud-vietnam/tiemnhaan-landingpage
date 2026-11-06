(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const data = window.MENU || { items: [], categories: [] };
  const byId = Object.fromEntries(data.items.map((i) => [i.id, i]));
  const catName = Object.fromEntries(data.categories.map((c) => [c.id, c.name]));
  const fmt = (n) => n.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
  // Tìm kiếm không dấu: "o long" khớp "ô long"
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

  const q = $('#q'), result = $('#result'), empty = $('#empty');
  const cards = $$('.dish');
  cards.forEach((c) => (c._n = norm(c.dataset.name)));
  let filter = 'all';

  const apply = () => {
    const term = norm(q.value.trim());
    let n = 0;
    cards.forEach((c) => {
      const show = (filter === 'all' || c.dataset.tags.split(' ').includes(filter)) && (!term || c._n.includes(term));
      c.hidden = !show;
      if (show) n++;
    });
    $$('.mcat').forEach((s) => (s.hidden = !$$('.dish:not([hidden])', s).length));
    $$('.tabs a').forEach((a) => (a.hidden = document.getElementById(a.dataset.tab).hidden));
    result.innerHTML = `Đang hiển thị <strong>${n}</strong> / ${cards.length} món`;
    empty.hidden = n > 0;
  };
  q.addEventListener('input', apply);
  $$('.fchip').forEach((b) => b.addEventListener('click', () => {
    $$('.fchip').forEach((x) => x.classList.toggle('is-on', x === b));
    filter = b.dataset.filter;
    apply();
  }));

  // Đánh dấu tab của nhóm đang xem
  const tabs = $$('.tabs a');
  const tabBar = $('.tabs');
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      tabs.forEach((t) => {
        const on = t.dataset.tab === e.target.id;
        t.classList.toggle('is-active', on);
        if (on) tabBar.scrollTo({ left: t.offsetLeft - tabBar.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('.mcat').forEach((s) => io.observe(s));

  // Modal chi tiết món
  const modal = $('#modal');
  const LBL = { sig: 'Món ký tên', best: 'Bán chạy', new: 'Món mới', vegan: 'Thuần chay', hot: 'Có bản nóng' };
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => {
    const it = byId[b.dataset.open];
    if (!it || !modal.showModal) return;
    $('#m-img').src = `/assets/img/menu/${it.img}.webp`;
    $('#m-img').alt = it.name;
    $('#m-cat').textContent = catName[it.cat];
    $('#m-name').textContent = it.name;
    $('#m-en').textContent = it.en;
    $('#m-desc').textContent = it.desc;
    $('#m-badges').innerHTML = it.tags
      .map((t) => `<span class="badge badge--${t === 'sig' || t === 'new' ? 'best' : t}"><span>${LBL[t]}</span></span>`)
      .join('');
    $('#m-price').innerHTML = typeof it.price === 'number'
      ? `<span class="price">${fmt(it.price)}</span>`
      : `<span class="price"><small>M</small> ${fmt(it.price.M)}</span> &nbsp; <span class="price"><small>L</small> ${fmt(it.price.L)}</span>`;
    modal.showModal();
  }));
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-close]')) modal.close();
  });
})();
