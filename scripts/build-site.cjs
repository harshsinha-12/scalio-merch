const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const imagePath = 'assets/social/scalio-off-script.png';
const title = 'Scalio — OFF SCRIPT Apparel Studio';
const description = 'Explore the OFF SCRIPT T-shirt and polo in 3D. Four colorways, front and back views, and studio images ready to share.';
const alt = 'Scalio OFF SCRIPT apparel studio with a cream graphic T-shirt on a warm neutral background.';
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function siteOrigin(env) {
  const raw = env.SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  if (!raw) throw new Error('Set SITE_URL to your public site URL, or build on Vercel with system environment variables enabled.');
  const url = new URL(raw.includes('://') ? raw : `https://${raw}`);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('The site URL must be an HTTP(S) origin without credentials, path, query or fragment.');
  }
  return url.origin;
}

function sharingMetadata(origin = '') {
  const png = fs.readFileSync(path.join(root, 'dist', imagePath));
  if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Social image must be a PNG.');
  const imageUrl = `${origin}/${imagePath}`;
  return `<!-- social-preview:start -->
<link rel="canonical" href="${escape(origin + '/')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Scalio Apparel Studio">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(origin + '/')}">
<meta property="og:image" content="${escape(imageUrl)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="${png.readUInt32BE(16)}">
<meta property="og:image:height" content="${png.readUInt32BE(20)}">
<meta property="og:image:alt" content="${escape(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${escape(imageUrl)}">
<meta name="twitter:image:alt" content="${escape(alt)}">
<!-- social-preview:end -->`;
}

function renderHtml(html, origin = '') {
  const block = sharingMetadata(origin);
  const marker = /<!-- social-preview:start -->[\s\S]*?<!-- social-preview:end -->/;
  return (marker.test(html) ? html.replace(marker, block) : html.replace('</head>', `${block}\n</head>`))
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(description)}">`);
}

if (require.main === module) {
  const origin = siteOrigin(process.env);
  const output = path.join(root, 'build');
  fs.mkdirSync(output, {recursive:true});
  fs.cpSync(path.join(root, 'dist'), output, {recursive:true});
  const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  fs.writeFileSync(path.join(output, 'index.html'), renderHtml(html, origin));
  console.log(`Static site built with sharing URLs for ${origin}`);
}

module.exports = {siteOrigin, sharingMetadata, renderHtml};
