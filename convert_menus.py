import fitz  # PyMuPDF
import os

OUTPUT_DIR = r"c:\secretpalacedone\public\assets\images\menu"

PDFS = [
    {
        "path": os.path.join(OUTPUT_DIR, "new food menu.pdf"),
        "prefix": "food-menu",
    },
    {
        "path": os.path.join(OUTPUT_DIR, "LIQ MENU  MMMM.pdf"),
        "prefix": "liquor-menu",
    },
]

for pdf_info in PDFS:
    pdf_path = pdf_info["path"]
    prefix = pdf_info["prefix"]

    if not os.path.exists(pdf_path):
        print(f"[SKIP] Not found: {pdf_path}")
        continue

    doc = fitz.open(pdf_path)
    print(f"[INFO] '{os.path.basename(pdf_path)}' has {len(doc)} pages")

    for page_num in range(len(doc)):
        page = doc[page_num]
        # 3x zoom = ~216 DPI for crisp quality
        mat = fitz.Matrix(3, 3)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out_file = os.path.join(OUTPUT_DIR, f"{prefix}-page{page_num + 1}.jpg")
        pix.save(out_file, jpg_quality=92)
        print(f"  Saved: {out_file} ({pix.width}x{pix.height})")

    doc.close()

print("\nDone!")
