(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Header đổ bóng khi cuộn
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const burger = $('#burger'), nav = $('#nav');
  if (burger && nav) {
    const setTop = () => document.documentElement.style.setProperty('--nav-top', header.offsetHeight + 'px');
    const toggle = (open) => {
      setTop();
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    };
    burger.addEventListener('click', () => toggle(!nav.classList.contains('is-open')));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
  }

  // Toast
  const toast = $('#toast');
  let tId;
  window.showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(tId);
    tId = setTimeout(() => toast.classList.remove('is-on'), 4200);
  };

  // Hiệu ứng xuất hiện khi cuộn
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('.shead, .cat, .promise > div, .branch, .day__c, .origin, .timeline li, .bigbranch, .split > *, .signup__in > *')
      .forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // Nút "Báo tôi khi ... mở cửa" chọn sẵn chi nhánh
  $$('[data-branch]').forEach((b) => b.addEventListener('click', () => {
    $$('input[name="branch"]').forEach((i) => (i.checked = i.value === b.dataset.branch));
  }));

  // Form
  const endpoint = document.body.dataset.endpoint || '';
  $$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = true;
      $$('[required]', form).forEach((f) => {
        const bad = !f.value.trim();
        f.classList.toggle('is-invalid', bad);
        f.setAttribute('aria-invalid', String(bad));
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return window.showToast('Bạn điền giúp Nhà An các ô còn trống nhé.');
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      const fd = new FormData(form);
      const data = Object.fromEntries(fd);
      data.branch = fd.getAll('branch').join(', ');
      data.form = form.dataset.form;
      try {
        if (endpoint) {
          const r = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
          });
          if (!r.ok) throw new Error(String(r.status));
        }
        form.reset();
        window.showToast(form.dataset.form === 'signup'
          ? `Cảm ơn ${data.name || 'bạn'}! Nhà An sẽ báo tin khai trương sớm nhất.`
          : 'Cảm ơn bạn! Nhà An đã nhận lời nhắn và sẽ phản hồi sớm.');
      } catch (err) {
        window.showToast('Gửi chưa thành công, bạn thử lại sau giây lát nhé.');
      } finally {
        btn.disabled = false;
      }
    });
  });
})();
