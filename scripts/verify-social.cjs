const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {siteOrigin, renderHtml} = require('./build-site.cjs');
const root = path.join(__dirname, '..');
assert.equal(siteOrigin({VERCEL_PROJECT_PRODUCTION_URL:'studio.example',VERCEL_URL:'preview.example'}), 'https://studio.example');
assert.equal(siteOrigin({SITE_URL:'https://custom.example/',VERCEL_PROJECT_PRODUCTION_URL:'studio.example'}), 'https://custom.example');
assert.equal(siteOrigin({VERCEL_URL:'preview.example'}), 'https://preview.example');
for (const env of [{},{SITE_URL:'ftp://bad.example'},{SITE_URL:'https://user:password@bad.example'},{SITE_URL:'https://bad.example/path'}]) assert.throws(()=>siteOrigin(env));
const source = fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const html = renderHtml(source,'https://studio.example');
assert.equal(renderHtml(html,'https://studio.example'),html,'Build must not duplicate tags');
for (const field of ['og:title','og:type','og:description','og:url','og:image','og:image:alt','og:image:width','og:image:height']) {
  assert.equal((html.match(new RegExp(`property="${field}"`, 'g')) || []).length,1,field);
}
assert(html.includes('<meta property="og:url" content="https://studio.example/">'));
assert(html.includes('<link rel="canonical" href="https://studio.example/">'));
assert(html.includes('<meta name="twitter:card" content="summary_large_image">'));
const imageUrl = html.match(/property="og:image" content="([^"]+)"/)[1];
assert.equal(html.match(/name="twitter:image" content="([^"]+)"/)[1],imageUrl);
const png = fs.readFileSync(path.join(root,'dist',new URL(imageUrl).pathname));
assert.equal(Number(html.match(/property="og:image:width" content="(\d+)"/)[1]),png.readUInt32BE(16));
assert.equal(Number(html.match(/property="og:image:height" content="(\d+)"/)[1]),png.readUInt32BE(20));
assert(png.length<5*1024*1024,'Social image exceeds 5 MB');
console.log(`Social metadata passed: absolute URLs, canonical, unique tags, Twitter large card, ${png.readUInt32BE(16)} × ${png.readUInt32BE(20)} PNG (${Math.round(png.length/1024)} KB).`);
