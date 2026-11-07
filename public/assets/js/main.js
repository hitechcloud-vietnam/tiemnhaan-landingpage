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
  let lastFocus = null;
  const setDrawer = (open) => {
    if (!drawer) return;
    const wasOpen = document.body.classList.contains('drawer-open');
    document.body.classList.toggle('drawer-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger && burger.setAttribute('aria-expanded', String(open));
    if (open && !wasOpen) {
      lastFocus = document.activeElement;
      setTimeout(() => $('.drawer__close', drawer)?.focus(), 50);
    } else if (!open && wasOpen && lastFocus && document.body.contains(lastFocus)) {
      lastFocus.focus();
      lastFocus = null;
    }
  };
  // Giữ phím Tab trong menu khi menu đang mở
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !document.body.classList.contains('drawer-open')) return;
    const items = $$('a[href], button, summary', $('.drawer__panel', drawer)).filter((x) => x.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  });
  burger && burger.addEventListener('click', () => setDrawer(!document.body.classList.contains('drawer-open')));
  drawer && drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('[data-drawer-close]') || e.target.closest('a')) setDrawer(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setDrawer(false); $$('.lang.is-open').forEach((l) => l.classList.remove('is-open')); }
  });

  // Mega menu: báo trạng thái mở/đóng cho trình đọc màn hình
  $$('.has-mega').forEach((li) => {
    const a = $('.nav__link', li);
    const set = (v) => a.setAttribute('aria-expanded', String(v));
    li.addEventListener('mouseenter', () => set(true));
    li.addEventListener('mouseleave', () => set(li.contains(document.activeElement) || li.classList.contains('is-open')));
    li.addEventListener('focusin', () => set(true));
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) set(false); });
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
    btn && btn.addEventListener('click', (e) => { e.stopPropagation(); btn.setAttribute('aria-expanded', String(l.classList.toggle('is-open'))); });
  });
  document.addEventListener('click', () => $$('.lang.is-open').forEach((l) => { l.classList.remove('is-open'); $('.lang__btn', l)?.setAttribute('aria-expanded', 'false'); }));
  $$('.lang__opt').forEach((a) => a.addEventListener('click', () => {
    try { localStorage.setItem('nhaan-lang', a.dataset.lang); } catch (err) { /* bỏ qua */ }
  }));

  // Gợi ý ngôn ngữ theo trình duyệt: hiện một lần, không tự chuyển trang
  (() => {
    let seen = null;
    try { seen = localStorage.getItem('nhaan-lang') || localStorage.getItem('nhaan-langtip'); } catch (err) { return; }
    if (seen) return;
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']).map((l) => String(l).slice(0, 2).toLowerCase());
    const want = prefs.find((l) => ['vi', 'en', 'ja', 'ko', 'zh'].includes(l));
    if (!want || want === LANG) return;
    const alt = $(`link[rel="alternate"][hreflang="${want === 'zh' ? 'zh-Hans' : want}"]`);
    if (!alt) return;
    const T = {
      vi: ['Trang này có bản tiếng Việt.', 'Xem tiếng Việt', 'Đóng'],
      en: ['This page is available in English.', 'View in English', 'Close'],
      ja: ['このページは日本語でもご覧いただけます。', '日本語で見る', '閉じる'],
      ko: ['이 페이지는 한국어로도 볼 수 있어요.', '한국어로 보기', '닫기'],
      zh: ['本页面提供中文版本。', '查看中文版', '关闭'],
    }[want];
    const remember = (k) => { try { localStorage.setItem(k, want); } catch (err) { /* bỏ qua */ } };
    const box = document.createElement('aside');
    box.className = 'langtip';
    box.lang = want === 'zh' ? 'zh-Hans' : want;
    box.setAttribute('aria-label', T[0]);
    box.innerHTML = `<span class="langtip__msg"></span><a class="langtip__go"></a><button type="button" class="langtip__x"><span aria-hidden="true">×</span></button>`;
    $('.langtip__msg', box).textContent = T[0];
    const go = $('.langtip__go', box);
    go.textContent = T[1];
    go.href = new URL(alt.href).pathname;
    go.hreflang = box.lang;
    $('.langtip__x', box).setAttribute('aria-label', T[2]);
    go.addEventListener('click', () => remember('nhaan-lang'));
    $('.langtip__x', box).addEventListener('click', () => { remember('nhaan-langtip'); box.remove(); });
    document.body.appendChild(box);
  })();

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
  preset('data-area', '#area');
  preset('data-branch', null, 'branch');

  // Sao chép liên kết bài viết
  $$('.copy-link').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.url); showToast(MSG.copied); } catch (err) { window.prompt('', b.dataset.url); }
  }));

  // Không cho chọn ngày đã qua
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  $$('input[type="date"]').forEach((d) => (d.min = today));

  // Form
  const endpoint = document.body.dataset.endpoint || '';
  const email = document.body.dataset.email || '';
  const SUBJECT = { signup: 'Đăng ký nhận tin khai trương', contact: 'Lời nhắn liên hệ', booking: 'Yêu cầu đặt chỗ / phòng họp', apply: 'Hồ sơ ứng tuyển', reserve: 'Yêu cầu đặt bàn' };
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
