import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
ims = [Image.open(f).convert('RGB') for f in files]
w, h = ims[0].size
cols = 2
rows = (len(ims) + 1) // 2
S = Image.new('RGB', (w * cols, h * rows), 'white')
for i, im in enumerate(ims):
    S.paste(im, ((i % cols) * w, (i // cols) * h))
    ImageDraw.Draw(S).text(((i % cols) * w + 6, (i // cols) * h + 4), files[i].split('-')[-1], fill='red')
S.save(out)
