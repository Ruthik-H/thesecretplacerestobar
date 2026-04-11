import os
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for f in files:
            ext = f.lower().split('.')[-1]
            if ext in ['jpg', 'jpeg', 'png']:
                path = os.path.join(root, f)
                new_path = os.path.splitext(path)[0] + '.webp'
                
                # Special cases: don't double convert if webp exists
                if os.path.exists(new_path) and path != new_path:
                    continue
                    
                try:
                    with Image.open(path) as img:
                        # Max 1000px width for fast loading
                        MAX_WIDTH = 1000
                        if img.width > MAX_WIDTH:
                            ratio = MAX_WIDTH / float(img.width)
                            new_h = int(float(img.height) * float(ratio))
                            img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
                        
                        img.save(new_path, "WEBP", quality=60)
                        print(f"Converted & Compressed: {new_path}")
                except Exception as e:
                    print(f"Error converting {path}: {e}")

if __name__ == '__main__':
    convert_to_webp('public/assets')
