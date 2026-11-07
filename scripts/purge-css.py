#!/usr/bin/env python3
"""Dọn CSS không dùng tới trong public/assets/css/style.css.

Một selector bị xóa khi nó chứa class không xuất hiện trong bất kỳ trang HTML đã build
(mọi ngôn ngữ) hay chuỗi nào trong public/assets/js/*.js. Quy tắc chỉ bị xóa khi mọi
selector của nó đều bị loại. Chạy SAU `npm run build`:

    python3 scripts/purge-css.py            # in thống kê, ghi đè style.css
    python3 scripts/purge-css.py --dry-run  # chỉ in thống kê
"""
import glob
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CSS = os.path.join(ROOT, 'public/assets/css/style.css')


def used_classes():
    used = set()
    for f in glob.glob(os.path.join(ROOT, 'public/**/*.html'), recursive=True):
        for attr in re.findall(r'class="([^"]*)"', open(f, encoding='utf-8').read()):
            used.update(attr.split())
    for f in glob.glob(os.path.join(ROOT, 'public/assets/js/*.js')):
        used.update(re.findall(r'[A-Za-z_][\w-]*', open(f, encoding='utf-8').read()))
    return used


def split_blocks(css):
    """Tách CSS cấp ngoài cùng thành danh sách (loại, phần đầu, thân, văn bản gốc)."""
    out, i, n = [], 0, len(css)
    while i < n:
        if css[i].isspace():
            j = i
            while j < n and css[j].isspace():
                j += 1
            out.append(('ws', '', '', css[i:j]))
            i = j
            continue
        if css.startswith('/*', i):
            j = css.index('*/', i) + 2
            out.append(('comment', '', '', css[i:j]))
            i = j
            continue
        # đọc phần đầu tới '{' (bỏ qua chuỗi)
        j, quote = i, None
        while j < n:
            c = css[j]
            if quote:
                if c == quote:
                    quote = None
            elif c in '"\'':
                quote = c
            elif c == '{':
                break
            j += 1
        head = css[i:j]
        # đọc thân tới '}' tương ứng
        k, depth, quote = j + 1, 1, None
        while k < n and depth:
            c = css[k]
            if quote:
                if c == quote:
                    quote = None
            elif c in '"\'':
                quote = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
            k += 1
        body = css[j + 1:k - 1]
        out.append(('at' if head.lstrip().startswith('@') else 'rule', head, body, css[i:k]))
        i = k
    return out


def split_selectors(head):
    parts, depth, cur = [], 0, ''
    for c in head:
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        if c == ',' and depth == 0:
            parts.append(cur)
            cur = ''
        else:
            cur += c
    parts.append(cur)
    return parts


def selector_ok(sel, used):
    s = re.sub(r'\[[^\]]*\]', '', sel)          # bỏ [attr="..."]
    s = re.sub(r':not\([^)]*\)', '', s)          # :not(.x) không bắt buộc .x tồn tại
    return all(c in used for c in re.findall(r'\.(-?[_a-zA-Z][\w-]*)', s))


def purge(css, used, stats):
    res = []
    for kind, head, body, raw in split_blocks(css):
        if kind in ('ws', 'comment'):
            res.append(raw)
        elif kind == 'at':
            name = head.strip().split()[0]
            if name in ('@media', '@supports'):
                inner = purge(body, used, stats)
                if inner.strip():
                    res.append(f'{head}{{{inner}}}')
                else:
                    stats['at'] += 1
            else:
                res.append(raw)                    # @keyframes, @font-face… giữ nguyên
        else:
            sels = split_selectors(head)
            keep = [s for s in sels if selector_ok(s, used)]
            stats['sel'] += len(sels) - len(keep)
            if not keep:
                stats['rule'] += 1
                continue
            new_head = ','.join(keep) if len(keep) != len(sels) else head
            if len(keep) != len(sels):
                new_head = ', '.join(s.strip() for s in keep) + ' '
            res.append(f'{new_head}{{{body}}}')
    out = ''.join(res)
    return re.sub(r'\n{3,}', '\n\n', out)


if __name__ == '__main__':
    src = open(CSS, encoding='utf-8').read()
    stats = {'rule': 0, 'sel': 0, 'at': 0}
    out = purge(src, used_classes(), stats)
    print(f"Trước {len(src):,} byte → sau {len(out):,} byte | bỏ {stats['rule']} quy tắc, {stats['sel']} selector, {stats['at']} khối @media rỗng")
    if '--dry-run' not in sys.argv:
        open(CSS, 'w', encoding='utf-8').write(out)
