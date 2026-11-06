(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const LANG = (document.documentElement.lang || 'vi').slice(0, 2);

  // Thông báo theo ngôn ngữ
  const MSG = {
    vi: { fill: 'Bạn điền giúp Nhà An các ô còn trống nhé.', thanks: 'Cảm ơn {n}! Nhà An đã nhận và sẽ liên hệ sớm.', signup: 'Cảm ơn {n}! Nhà An sẽ báo tin khai trương sớm nhất.', mail: 'Đang mở ứng dụng email để gửi tới Nhà An…', fail: 'Gửi chưa thành công, bạn thử lại hoặc nhắn Zalo nhé.', copied: 'Đã sao chép liên kết!', you: 'bạn' },
    en: { fill: 'Please fill in the empty fields.', thanks: 'Thank you, {n}! Nhà An has received it and will contact you soon.', signup: 'Thank you, {n}! We will let you know as soon as we open.', mail: 'Opening your email app to send to Nhà An…', fail: 'Sending failed. Please try again or message us on Zalo.', copied: 'Link copied!', you: 'friend' },
    ja: { fill: '未入力の項目をご記入ください。', thanks: '{n}さん、ありがとうございます！近日中にご連絡します。', signup: '{n}さん、ありがとうございます！オープン情報をいち早くお届けします。', mail: 'メールアプリを開いています…', fail: '送信できませんでした。もう一度お試しいただくか、Zaloでご連絡ください。', copied: 'リンクをコピーしました！', you: 'お客様' },
    ko: { fill: '빈 칸을 채워 주세요.', thanks: '{n}님, 감사합니다! 곧 연락드릴게요.', signup: '{n}님, 감사합니다! 오픈 소식을 가장 먼저 알려드릴게요.', mail: '이메일 앱을 여는 중이에요…', fail: '전송에 실패했어요. 다시 시도하거나 Zalo로 문의해 주세요.', copied: '링크가 복사되었어요!', you: '고객' },
    zh: { fill: '请填写空白栏位。', thanks: '谢谢{n}！我们已收到，会尽快联系您。', signup: '谢谢{n}！开业消息会第一时间通知您。', mail: '正在打开邮件应用…', fail: '发送失败，请重试或通过 Zalo 联系我们。', copied: '链接已复制！', you: '您' },
  }[LANG] || {};

  // Header đổ bóng khi cuộn
  const header = $('.header');
  const onScroll = () => {
    header && header.classList.toggle('is-scrolled', window.scrollY > 8);
    document.body.classList.toggle('scrolled-down', window.scrollY > 400);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Drawer menu di động
  const burger = $('#burger'), drawer = $('#drawer');
  const setDrawer = (open) => {
    if (!drawer) return;
    document.body.classList.toggle('drawer-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger && burger.setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => $('.drawer__close', drawer)?.focus(), 50);
  };
  burger && burger.addEventListener('click', () => setDrawer(!document.body.classList.contains('drawer-open')));
  drawer && drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('[data-drawer-close]') || e.target.closest('a')) setDrawer(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setDrawer(false); $$('.lang.is-open').forEach((l) => l.classList.remove('is-open')); }
  });

  // Mega menu: mở bằng bàn phím/chạm
  $$('.has-mega > .nav__link').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        const li = a.parentElement;
        if (!li.classList.contains('is-open')) { e.preventDefault(); $$('.has-mega.is-open').forEach((x) => x !== li && x.classList.remove('is-open')); li.classList.add('is-open'); }
      }
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.has-mega')) $$('.has-mega.is-open').forEach((x) => x.classList.remove('is-open')); });

  // Chọn ngôn ngữ
  $$('.lang').forEach((l) => {
    const btn = $('.lang__btn', l);
    btn && btn.addEventListener('click', (e) => { e.stopPropagation(); l.classList.toggle('is-open'); });
  });
  document.addEventListener('click', () => $$('.lang.is-open').forEach((l) => l.classList.remove('is-open')));
  $$('.lang__opt').forEach((a) => a.addEventListener('click', () => {
    try { localStorage.setItem('nhaan-lang', a.dataset.lang); } catch (err) { /* bỏ qua */ }
  }));

  // Toast
  const toast = $('#toast');
  let tId;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(tId);
    tId = setTimeout(() => toast.classList.remove('is-on'), 4500);
  };
  window.showToast = showToast;

  // Hiệu ứng xuất hiện khi cuộn
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('.shead, .tile, .g, .promise > div, .branch, .day__c, .origin, .timeline li, .bigbranch, .feature > *, .club > *, .event, .zone, .offer, .party, .signup__in > *, .cbig__c, .jobs li, .story > *, .space, .mood, .zd > *, .post, .rdish, .region, .rtimeline li, .city')
      .forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // Chọn sẵn giá trị form từ nút bấm
  const preset = (attr, sel, name) => $$(`[${attr}]`).forEach((b) => b.addEventListener('click', () => {
    const s = $(sel);
    if (s) s.value = b.getAttribute(attr);
    if (name) $$(`input[name="${name}"]`).forEach((i) => (i.checked = i.value === b.getAttribute(attr)));
  }));
  preset('data-job', '#job');
  preset('data-space', '#space');
  preset('data-branch', null, 'branch');

  // Sao chép liên kết bài viết
  $$('.copy-link').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.url); showToast(MSG.copied); } catch (err) { window.prompt('', b.dataset.url); }
  }));

  // Không cho chọn ngày đã qua
  const today = new Date().toISOString().slice(0, 10);
  $$('input[type="date"]').forEach((d) => (d.min = today));

  // Form
  const endpoint = document.body.dataset.endpoint || '';
  const email = document.body.dataset.email || '';
  const SUBJECT = { signup: 'Đăng ký nhận tin khai trương', contact: 'Lời nhắn liên hệ', booking: 'Yêu cầu đặt chỗ / phòng họp', apply: 'Hồ sơ ứng tuyển' };
  const mailto = (data) => {
    const lines = Object.entries(data).filter(([k, v]) => v && !['form', 'website'].includes(k)).map(([k, v]) => `${k}: ${v}`);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`[Website] ${SUBJECT[data.form] || 'Liên hệ'} — ${data.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    showToast(MSG.mail);
  };

  $$('form[data-form]').forEach((form) => {
    // Trường ẩn chống spam
    const hp = document.createElement('input');
    hp.type = 'text'; hp.name = 'website'; hp.tabIndex = -1; hp.autocomplete = 'off';
    hp.className = 'hp'; hp.setAttribute('aria-hidden', 'true');
    form.appendChild(hp);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = true;
      $$('[required]', form).forEach((f) => {
        const bad = !String(f.value).trim();
        f.classList.toggle('is-invalid', bad);
        f.setAttribute('aria-invalid', String(bad));
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return showToast(MSG.fill);
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.classList.add('is-loading');
      const fd = new FormData(form);
      const data = Object.fromEntries(fd);
      data.branch = fd.getAll('branch').join(', ');
      data.form = form.dataset.form;
      data.lang = LANG;
      data.page = location.pathname;
      const done = () => {
        form.reset();
        const n = data.name || MSG.you;
        showToast((data.form === 'signup' ? MSG.signup : MSG.thanks).replace('{n}', n));
      };
      try {
        if (!endpoint) { mailto(data); return; }
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (r.ok) done();
        else if (r.status === 503 || r.status === 404 || r.status === 405) mailto(data); // API chưa cấu hình
        else throw new Error(String(r.status));
      } catch (err) {
        showToast(MSG.fail);
      } finally {
        btn.disabled = false;
        btn.classList.remove('is-loading');
      }
    });
  });
})();
