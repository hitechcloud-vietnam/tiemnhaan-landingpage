// Vercel Function: nhận form (đăng ký nhận tin, liên hệ, đặt chỗ, ứng tuyển) và gửi email qua Resend.
// Cấu hình trên Vercel → Settings → Environment Variables:
//   RESEND_API_KEY  (bắt buộc để gửi mail — tạo tại https://resend.com)
//   CONTACT_TO      (mặc định contact@tiemnhaan.com)
//   CONTACT_FROM    (mặc định "Website Tiệm Nhà An <noreply@tiemnhaan.com>", tên miền phải được xác minh trên Resend)
// Khi chưa có RESEND_API_KEY, API trả 503 và trình duyệt tự chuyển sang mở ứng dụng email.

const FORMS = {
  signup: 'Đăng ký nhận tin khai trương',
  contact: 'Lời nhắn liên hệ',
  booking: 'Yêu cầu đặt chỗ / phòng họp',
  apply: 'Hồ sơ ứng tuyển',
  reserve: 'Yêu cầu đặt bàn',
};
const LABELS = {
  name: 'Họ và tên', contact: 'Liên hệ', company: 'Công ty', branch: 'Chi nhánh', topic: 'Chủ đề', job: 'Vị trí',
  space: 'Khu', area: 'Khu vực', date: 'Ngày', time: 'Giờ', people: 'Số người', message: 'Lời nhắn', lang: 'Ngôn ngữ trang', page: 'Trang gửi',
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  let data = req.body;
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch { data = {}; }
  }
  data = data || {};

  // Chống spam: trường ẩn "website" phải để trống
  if (data.website) return res.status(200).json({ ok: true });

  const form = FORMS[data.form] ? data.form : 'contact';
  const name = String(data.name || '').trim().slice(0, 120);
  const contact = String(data.contact || '').trim().slice(0, 160);
  if (!name || !contact) return res.status(400).json({ ok: false, error: 'missing_fields' });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });

  const rows = Object.entries(LABELS)
    .filter(([k]) => data[k])
    .map(([k, label]) => `<tr><td style="padding:6px 12px;color:#6B6458">${label}</td><td style="padding:6px 12px"><b>${esc(String(data[k]).slice(0, 4000)).replace(/\n/g, '<br>')}</b></td></tr>`)
    .join('');
  const subject = `[Website] ${FORMS[form]} — ${name}`;
  const html = `<div style="font-family:Arial,sans-serif;color:#31492E"><h2>${FORMS[form]}</h2><table>${rows}</table><p style="color:#6B6458;font-size:12px">Gửi từ tiemnhaan.com</p></div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Website Tiệm Nhà An <noreply@tiemnhaan.com>',
        to: [process.env.CONTACT_TO || 'contact@tiemnhaan.com'],
        reply_to: /@/.test(contact) ? contact : undefined,
        subject,
        html,
      }),
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
