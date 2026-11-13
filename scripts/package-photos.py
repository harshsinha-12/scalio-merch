"""Package only the current photo selections; verify PNGs and preserve their bytes."""
from pathlib import Path
import hashlib
import json
import re
import shutil
import struct
import zipfile

root = Path(__file__).resolve().parent.parent
assets = json.loads(re.search(r'const PHOTO_ASSETS = (.*?);\n', (root / 'dist/app.js').read_text())[1])
assert len(assets) == 64
out = root / 'outputs'
photos = out / 'ai-photos'
photos.mkdir(parents=True, exist_ok=True)
current = {item['filename'] for item in assets.values()}
for old in photos.glob('*.png'):
    if old.name not in current:
        old.unlink()
manifest = []
for key, item in assets.items():
    source = root / 'dist' / item['src']
    data = source.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', source
    width, height = struct.unpack('>II', data[16:24])
    assert min(width, height) >= 1000, source
    shutil.copyfile(source, photos / item['filename'])
    manifest.append(dict(key=key, filename=item['filename'], width=width, height=height,
                         sha256=hashlib.sha256(data).hexdigest()))
(out / 'photo-manifest.json').write_text(json.dumps(manifest, indent=2))
for garment in [None, 'tee', 'polo', 'hoodie', 'bomber']:
    name = 'scalio-all-colors-photo-pack.zip' if garment is None else f'scalio-{garment}-photo-pack.zip'
    with zipfile.ZipFile(out / name, 'w', zipfile.ZIP_STORED) as pack:
        for key, item in assets.items():
            kind, color = key.split('-')[:2]
            if garment is None or kind == garment:
                pack.write(root / 'dist' / item['src'], f'{kind}/{color}/{item["filename"]}')
        pack.write(out / 'photo-manifest.json', 'photo-manifest.json')
with zipfile.ZipFile(out / 'scalio-off-script-source.zip', 'w', zipfile.ZIP_DEFLATED) as pack:
    for folder in ['dist', 'scripts']:
        for source in (root / folder).rglob('*'):
            if source.is_file():
                pack.write(source, source.relative_to(root))
    for name in ['README.md', 'vercel.json', '.gitignore']:
        pack.write(root / name, name)
print('Packaged 64 verified PNGs, five photo ZIPs, manifest, and editable source.')
