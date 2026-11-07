#!/usr/bin/env python3
"""Tạo ảnh nhiều kích cỡ cho website (cần Python 3 + Pillow: pip install Pillow).

Chạy lại mỗi khi thêm hoặc thay ảnh trong public/assets/img/photos/:

    python3 scripts/images.py && npm run build

- photos/w320/<tên>.webp : ảnh thu nhỏ (menu, thẻ nhỏ, điện thoại)
- photos/w800/<tên>.webp : ảnh vừa (điện thoại màn hình nét, thẻ trên máy tính)
- photos/variants.json   : mã kiểm tra của ảnh gốc. Nếu ảnh gốc bị thay mà chưa chạy lại
                           script này, website tự dùng ảnh gốc (không dùng bản thu nhỏ cũ).
- brand/logo-*.webp       : logo cỡ nhỏ cho banner, chân trang, trang giới thiệu

Ảnh chia sẻ mạng xã hội (Facebook, Zalo, X…) cho trang dùng ảnh riêng — bản build sẽ nhắc
những ảnh còn thiếu:

    python3 scripts/images.py --og <tên-ảnh> [<tên-ảnh> …]
"""
import glob
import hashlib
import json
import os
import sys

from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'assets', 'img')
PHOTOS = os.path.join(ROOT, 'photos')
SIZES = {'w320': (320, 72), 'w800': (800, 74)}


def md5(path):
    return hashlib.md5(open(path, 'rb').read()).hexdigest()[:10]


def main():
    manifest_path = os.path.join(PHOTOS, 'variants.json')
    old = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
    manifest, made = {}, 0
    for f in sorted(glob.glob(os.path.join(PHOTOS, '*.webp'))):
        key = os.path.basename(f)[:-5]
        h = md5(f)
        entry = {'hash': h}
        with Image.open(f) as im:
            im = im.convert('RGB')
            for name, (width, quality) in SIZES.items():
                if im.width <= width * 1.15:
                    continue
                out = os.path.join(PHOTOS, name, key + '.webp')
                entry[name] = True
                if old.get(key, {}).get('hash') == h and os.path.exists(out):
                    continue
                os.makedirs(os.path.dirname(out), exist_ok=True)
                small = im.copy()
                small.thumbnail((width, width * 4), Image.LANCZOS)
                small.save(out, 'WEBP', quality=quality, method=6)
                made += 1
        manifest[key] = entry
    # xóa bản thu nhỏ của ảnh gốc không còn tồn tại
    for name in SIZES:
        for f in glob.glob(os.path.join(PHOTOS, name, '*.webp')):
            k = os.path.basename(f)[:-5]
            if k not in manifest or not manifest[k].get(name):
                os.remove(f)
    json.dump(manifest, open(manifest_path, 'w'), indent=1, sort_keys=True)

    brand = os.path.join(ROOT, 'brand')
    for src, out, size in [('logo-circle.png', 'logo-circle-96.webp', 96), ('logo-circle.png', 'logo-circle-192.webp', 192),
                           ('logo-app.png', 'logo-app-320.webp', 320), ('logo-horizontal-transparent.png', 'logo-horizontal-360.webp', 360)]:
        with Image.open(os.path.join(brand, src)) as im:
            im = im.convert('RGBA')
            im.thumbnail((size, size), Image.LANCZOS)
            im.save(os.path.join(brand, out), 'WEBP', quality=88, method=6)
    # Biểu tượng màn hình chính: nền xanh thương hiệu phủ kín, logo nằm trong vùng an toàn
    with Image.open(os.path.join(brand, 'logo-circle.png')) as im:
        im = im.convert('RGBA')
        # Mép đĩa logo có điểm ảnh bán trong suốt màu kem → tô lại màu nền để không lộ viền sáng
        px = im.load()
        for y in range(im.height):
            for x in range(im.width):
                r, g, b, a = px[x, y]
                if a < 250:
                    px[x, y] = (65, 89, 61, a)
        for out, size, scale in [('icon-maskable-512.png', 512, 0.86), ('apple-touch-icon.png', 180, 0.92)]:
            canvas = Image.new('RGBA', (size, size), (65, 89, 61, 255))
            logo = im.resize((round(size * scale), round(size * scale)), Image.LANCZOS)
            canvas.alpha_composite(logo, ((size - logo.width) // 2, (size - logo.height) // 2))
            canvas.convert('RGB').save(os.path.join(brand, out), optimize=True)
    print(f'{len(manifest)} ảnh gốc, tạo mới {made} ảnh thu nhỏ')


def make_og(keys):
    """Ảnh 1200x630: ảnh gốc cắt vừa khung, phủ tối phía dưới, huy hiệu logo góc trái."""
    out_dir = os.path.join(ROOT, 'og')
    os.makedirs(out_dir, exist_ok=True)
    logo = Image.open(os.path.join(ROOT, 'brand', 'logo-horizontal-transparent.png')).convert('RGBA')
    logo.thumbnail((380, 110), Image.LANCZOS)
    pill = Image.new('RGBA', (420, 130), (0, 0, 0, 0))
    ImageDraw.Draw(pill).rounded_rectangle((0, 0, 419, 129), 30, fill=(252, 250, 245, 240))
    pill.alpha_composite(logo, ((420 - logo.width) // 2, (130 - logo.height) // 2))
    shade = Image.new('L', (1, 630))
    for y in range(630):
        shade.putpixel((0, y), int(170 * max(0, (y - 300) / 330)))
    shade = shade.resize((1200, 630))
    dark = Image.new('RGBA', (1200, 630), (20, 30, 18, 255))
    dark.putalpha(shade)
    for key in keys:
        src = os.path.join(PHOTOS, key + '.webp')
        if not os.path.exists(src):
            print('  bỏ qua (không có ảnh gốc):', key)
            continue
        with Image.open(src) as im:
            im = im.convert('RGB')
            r = max(1200 / im.width, 630 / im.height)
            im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
            x, y = (im.width - 1200) // 2, (im.height - 630) // 2
            im = im.crop((x, y, x + 1200, y + 630)).convert('RGBA')
        im.alpha_composite(dark)
        im.alpha_composite(pill, (48, 452))
        im.convert('RGB').save(os.path.join(out_dir, key + '.jpg'), quality=85, optimize=True)
        print('  ảnh chia sẻ:', key)


if __name__ == '__main__':
    if '--og' in sys.argv:
        make_og(sys.argv[sys.argv.index('--og') + 1:])
    else:
        main()
