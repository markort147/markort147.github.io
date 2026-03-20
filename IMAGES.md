## Home carousel image workflow

Keep the image directory minimal and high-contrast by generating lightweight derivatives before committing.

1. Export your originals (JPG, PNG, HEIC) into `assets/img/home-carousel/originals/` to preserve the source.
2. Use [ImageMagick](https://imagemagick.org) to create 1600 px WebP derivatives with stripped metadata:

   ```bash
   mkdir -p assets/img/home-carousel/webp
   magick mogrify \
     -format webp \
     -define webp:method=6 \
     -quality 82 \
     -strip \
     -resize 1600x1600\> \
     -path assets/img/home-carousel/webp \
     assets/img/home-carousel/*.{JPG,JPEG,PNG,HEIC}
   ```

3. Replace the originals referenced by the carousel with the generated files (or update the script to point to the `webp/` folder) and keep only the versions you actually display.

This keeps each image well below 400 KB, removes EXIF data, and gives the monochrome treatment in CSS a clean starting point.
