import os
import sys
from PIL import Image

def optimize_images(directory):
    total_saved = 0
    for root, dirs, files in os.walk(directory):
        for f in files:
            path = os.path.join(root, f)
            ext = f.lower().split('.')[-1]
            
            if ext in ['jpg', 'jpeg', 'png']:
                try:
                    original_size = os.path.getsize(path)
                    
                    with Image.open(path) as img:
                        # Convert RGBA to RGB for JPEG compatibility during optimization if necessary
                        if img.mode == 'RGBA' and ext in ['jpg', 'jpeg']:
                            img = img.convert('RGB')
                            
                        # Resize if excessively large
                        MAX_WIDTH = 1920
                        if img.width > MAX_WIDTH:
                            ratio = MAX_WIDTH / float(img.width)
                            new_h = int(float(img.height) * float(ratio))
                            img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
                            
                        # Save back over the original with optimization
                        save_kwargs = {'optimize': True}
                        if ext in ['jpg', 'jpeg']:
                            save_kwargs['quality'] = 80
                            
                        img.save(path, **save_kwargs)
                        
                    new_size = os.path.getsize(path)
                    saved = original_size - new_size
                    if saved > 0:
                        total_saved += saved
                        print(f"Optimized {f}: Saved {saved / (1024*1024):.2f} MB")
                except Exception as e:
                    print(f"Error optimizing {f}: {e}")
                    
    print(f"\\nTotal space saved: {total_saved / (1024*1024):.2f} MB")

if __name__ == '__main__':
    optimize_images('public/assets/images')
