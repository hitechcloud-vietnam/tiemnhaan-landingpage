#!/usr/bin/env python3
"""Tạo ảnh nhiều kích cỡ cho website (cần Python 3 + Pillow: pip install Pillow).

Chạy lại mỗi khi thêm hoặc thay ảnh trong public/assets/img/photos/:

    python3 scripts/images.py && npm run build

- photos/w320/<tên>.webp : ảnh thu nhỏ (menu, thẻ nhỏ, điện thoại)
- photos/w800/<tên>.webp : ảnh vừa (điện thoại màn hình nét, thẻ trên máy tính)
- photos/variants.json   : mã kiểm tra của ảnh gốc. Nếu ảnh gốc bị thay mà chưa chạy lại
                           script này, website tự dùng ảnh gốc (không dùng bản thu nhỏ cũ).
- brand/logo-*.webp       : logo cỡ nhỏ cho banner, chân trang, trang giới thiệu
"""
import glob
import hashlib
import json
import os

from PIL import Image

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
    print(f'{len(manifest)} ảnh gốc, tạo mới {made} ảnh thu nhỏ')


if __name__ == '__main__':
    main()
