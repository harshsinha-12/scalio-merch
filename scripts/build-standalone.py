from pathlib import Path
import base64, json, re
root=Path(__file__).resolve().parent.parent
html=(root/'dist/index.html').read_text()
css=(root/'dist/style.css').read_text()
for name in ['body','display']:
    data=base64.b64encode((root/f'dist/assets/{name}.woff2').read_bytes()).decode()
    css=css.replace(f'url(assets/{name}.woff2)',f'url(data:font/woff2;base64,{data})')
js=(root/'dist/app.js').read_text()
match=re.search(r'const PHOTO_ASSETS = (.*?);\n',js)
if match:
    photos=json.loads(match.group(1))
    for item in photos.values():
        data=base64.b64encode((root/'dist'/item['src']).read_bytes()).decode()
        item['src']='data:image/png;base64,'+data
    js=js[:match.start()]+'const PHOTO_ASSETS = '+json.dumps(photos,separators=(',',':'))+';\n'+js[match.end():]
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<script defer src="app.js"></script>','<script>'+js+'</script>')
(root/'outputs').mkdir(exist_ok=True)
(root/'outputs/Scalio-Off-Script.html').write_text(html)
(root/'outputs/Scalio-Off-Script-02.html').write_text(html)

(root/'outputs/Scalio-Photo-Studio.html').write_text(html)
