#!/usr/bin/env python3
"""
تجهيز صور الأعمال للموقع — Prepare portfolio images for the web.

بيحوّل أي صور (JPG/PNG/WebP) لنسختين WebP:
  <slug>.webp        الحجم الكامل للايت بوكس (أقصى ضلع 1400px)
  <slug>-thumb.webp  الصورة المصغّرة للشبكة (أقصى ضلع 700px)

الاستخدام — Usage:
    python3 tools/optimize-images.py <مجلد-الصور> <بادئة-الاسم>

مثال — Example:
    python3 tools/optimize-images.py ~/Downloads/legend legend

بيطلع أسماء: legend-01, legend-02 ... وبيطبع لك مقتطف جاهز تلصقه في assets/js/data.js

المتطلبات — Requires: pip install Pillow
"""

import sys
import pathlib

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is not installed.  Run:  pip install Pillow")

FULL_MAX, FULL_Q = 1400, 82
THUMB_MAX, THUMB_Q = 700, 78
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
DEST = pathlib.Path(__file__).resolve().parent.parent / "assets" / "img" / "projects"


def save(im, path, max_side, quality):
    out = im.copy()
    out.thumbnail((max_side, max_side), Image.LANCZOS)
    out.save(path, "WEBP", quality=quality, method=6)
    return out.size, path.stat().st_size


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    src = pathlib.Path(sys.argv[1]).expanduser()
    prefix = sys.argv[2].strip().strip("-")

    if not src.is_dir():
        sys.exit(f"Not a directory: {src}")

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXTS and p.is_file())
    if not files:
        sys.exit(f"No images found in {src}")

    DEST.mkdir(parents=True, exist_ok=True)

    # Skip byte-identical duplicates — phone exports are full of them.
    seen, entries, before, after = set(), [], 0, 0

    for path in files:
        raw = path.read_bytes()
        digest = hash(raw)
        if digest in seen:
            print(f"  skip (duplicate)  {path.name}")
            continue
        seen.add(digest)

        slug = f"{prefix}-{len(entries) + 1:02d}"
        im = Image.open(path).convert("RGB")
        before += len(raw)

        (fw, fh), fs = save(im, DEST / f"{slug}.webp", FULL_MAX, FULL_Q)
        _, ts = save(im, DEST / f"{slug}-thumb.webp", THUMB_MAX, THUMB_Q)
        after += fs + ts
        entries.append(slug)

        print(f"  {slug:22s} {im.size[0]}x{im.size[1]} -> {fw}x{fh}  "
              f"{fs // 1024}KB + {ts // 1024}KB thumb")

    print(f"\n{len(entries)} image(s):  {before // 1024}KB  ->  {after // 1024}KB\n")
    print("الصق هذا في assets/js/data.js داخل WASLA.projects — "
          "Paste this into WASLA.projects in assets/js/data.js:\n")
    print("  {")
    print(f"    id: '{prefix}',")
    print("    client: '',")
    print("    title: { ar: '', en: '' },")
    print("    category: ['graphic'],")
    print(f"    cover: '{entries[0]}',")
    print("    summary: { ar: '', en: '' },")
    print("    tags: { ar: [], en: [] },")
    print("    images: [")
    for slug in entries:
        print(f"      {{ file: '{slug}', caption: {{ ar: '', en: '' }} }},")
    print("    ],")
    print("  },")


if __name__ == "__main__":
    main()
