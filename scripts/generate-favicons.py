#!/usr/bin/env python3
"""Generate the site favicon set from the brand logo.

The logo is a wide lockup (vehicle mark + wordmark). At favicon sizes the
wordmark is unreadable, so we crop the vehicle mark, recolor it white, and
set it on the brand dark square (#1C1C1E, same as the page theme-color).

Usage: python3 scripts/generate-favicons.py
Requires Pillow. Writes into public/.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src/assets/logo.png"
OUT = ROOT / "public"

BG = (28, 28, 30, 255)  # #1C1C1E
FG = (255, 255, 255)
MARK_BOX = (0, 0, 88, 143)  # left portion of the lockup: vehicle mark only
MARK_WIDTH_RATIO = 0.74  # mark width as a fraction of the square canvas


def load_mark() -> Image.Image:
    """Return the vehicle mark as a white silhouette with a tight bounding box."""
    lockup = Image.open(SOURCE).convert("RGBA")
    mark = lockup.crop(MARK_BOX)
    mark = mark.crop(mark.getbbox())
    alpha = mark.split()[3]
    silhouette = Image.new("RGBA", mark.size, FG + (0,))
    silhouette.putalpha(alpha)
    return silhouette


def render(mark: Image.Image, size: int, padded: bool = False) -> Image.Image:
    """Compose the mark on the brand square at the given size.

    `padded` shrinks the mark for maskable icons, whose outer ~10% can be
    cropped away by the launcher.
    """
    canvas = Image.new("RGBA", (size, size), BG)
    width_ratio = MARK_WIDTH_RATIO * (0.78 if padded else 1.0)
    w = round(size * width_ratio)
    h = round(w * mark.height / mark.width)
    # Upscaled from a 61px-wide source, so re-sharpen the alpha edge afterwards.
    scaled = mark.resize((w, h), Image.LANCZOS)
    alpha = scaled.split()[3].point(lambda v: 0 if v < 100 else (255 if v > 155 else (v - 100) * 255 // 55))
    scaled.putalpha(alpha)
    canvas.alpha_composite(scaled, ((size - w) // 2, (size - h) // 2))
    return canvas


def main() -> None:
    OUT.mkdir(exist_ok=True)
    mark = load_mark()

    for name, size in [
        ("favicon-96x96.png", 96),
        ("apple-touch-icon.png", 180),
        ("icon-192.png", 192),
        ("icon-512.png", 512),
    ]:
        render(mark, size).save(OUT / name)

    render(mark, 512, padded=True).save(OUT / "icon-maskable-512.png")

    render(mark, 256).save(
        OUT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )

    print(f"wrote favicon set to {OUT}")


if __name__ == "__main__":
    main()
