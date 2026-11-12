from pathlib import Path
import base64
root=Path(__file__).resolve().parent.parent
html=(root/'dist/index.html').read_text()
css=(root/'dist/style.css').read_text()
for name in ['body','display']:
    data=base64.b64encode((root/f'dist/assets/{name}.woff2').read_bytes()).decode()
    css=css.replace(f'url(assets/{name}.woff2)',f'url(data:font/woff2;base64,{data})')
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<script defer src="app.js"></script>','<script>'+(root/'dist/app.js').read_text()+'</script>')
(root/'outputs').mkdir(exist_ok=True)
(root/'outputs/Scalio-Off-Script.html').write_text(html)
(root/'outputs/Scalio-Off-Script-02.html').write_text(html)
