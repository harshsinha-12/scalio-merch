# Scalio — OFF SCRIPT

An interactive apparel studio with T-shirt and polo options, plus a saved AI product-photo library.

Open `outputs/Scalio-Photo-Studio.html` directly in a browser. This self-contained file includes scripts, fonts and all 32 original photos (about 84 MB). The editable website is `dist/index.html`; serve `dist/` with any static host for individual image loading. No runtime dependencies.

## Garments and colors

Switch between the oversized round-neck T-shirt and relaxed polo. The polo has separate folded collar geometry, a raised placket and two buttons. Both support scroll/drag/keyboard rotation, front/back/side/detail cameras, lighting presets, custom front artwork and the same export options.

Four colors are available in 3D and the photo library: Ink Black, Cream, Burnt Orange (#BD6A45) and Ash Gray (#B3B4AD). The original vivid orange garment photos have been replaced with a quieter terracotta tone.

Stone, Signal and Graphite select the visible 3D stage background and the background of single-view 3D exports. The paired supplier sheet keeps a neutral background. AI photos retain their photographed studio background.

## Images and downloads

There are 32 saved original AI PNGs: 2 garments × 4 colors × 4 views (garment-only front/back and on-model front/back). Selecting a garment or color updates thumbnails, full-size previews and download destinations together. Download buttons deliver image files, not HTML or screenshots. Lighting changes and custom artwork apply to the 3D model, not these pre-generated photos.

- `dist/assets/photos/`: website image assets.
- `outputs/ai-photos/`: all 32 original PNGs for direct sharing.
- `outputs/scalio-all-colors-photo-pack.zip`: all photos organized by garment and color.
- `outputs/scalio-polo-photo-pack.zip`: the 16 polo images.
- `outputs/scalio-off-script-source.zip`: editable source and assets.

Built-in image_gen was used throughout. Exact prompt sets are in `scripts/photo-prompts.json`, `scripts/polo-photo-prompts.json`, `scripts/color-photo-prompts.json` and `scripts/muted-orange-prompts.json`.

The secondary “3D mockups & artwork references” panel provides fixed front/back PNGs at 2400 × 2800, a 3600 × 2600 supplier sheet, current-angle PNGs and transparent 4096 × 4096 flat artwork. Filenames identify garment, color and view. Camera exports restore the interactive pose. These are design references; production dimensions and ink choices remain to be agreed with the supplier.

## Design references

- [Perplexity Classic Logo Tee](https://perplexity.supply/collections/all-products/products/classic-logo-tee): front signature / back wordmark hierarchy and discreet labeling.
- [Perplexity Curious Tee](https://perplexity.supply/products/curious-tee): coherent artwork and garment details.
- [The Souled Store oversized collection](https://www.thesouledstore.com/explore/super-oversized-t-shirts): relaxed, dropped-shoulder proportions and substantial graphic placement.
- [Bewakoof oversized collection](https://www.bewakoof.com/oversized-t-shirts-for-men-explore-all): expressive typography and graphic-print vocabulary.

Original Scalio artwork; no competitor graphics copied. Mascot geometry adapted from the local Scalio mobile IntroMascot component. Font licenses are included in dist/assets.

## Validation

- `node --check dist/app.js`: JavaScript syntax.
- `node scripts/verify-mesh.cjs`: both garment meshes have finite vertices and unit normals; polo trim and buttons are present.
- `node scripts/verify-selections.cjs`: runs the actual selection/download handlers in a minimal DOM without a GPU, covering all 32 combinations and three background transitions.
- Every standalone embedded PNG was compared byte-for-byte to its original asset.
- Native Safari review covered garment switching, gray polo rendering, Graphite stage background, photo preview and a gray polo image download. The downloaded PNG was compared to its original asset. All generated images were visually reviewed. Mobile interaction was not browser-tested.

Run `python3 scripts/build-standalone.py` to rebuild the self-contained HTML.

## Hosting

For Vercel, import `harshsinha-12/scalio-merch` with the repository root as the Root Directory and Framework Preset **Other**. The committed `vercel.json` runs `node scripts/build-site.cjs`, skips installation and serves the generated `build` directory. No packages are required. Only the static website and its assets are served.

### Social sharing

The page contains Open Graph and Twitter large-image card metadata, with a dedicated branded image at `dist/assets/social/scalio-off-script.png`. The image was created with built-in image_gen; the final prompt is in `scripts/social-image-prompt.json`.

The build injects absolute image, canonical and `og:url` URLs into the HTML before deployment. It uses `SITE_URL` when explicitly set, otherwise Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`. Keep Vercel's system environment variables enabled; set `SITE_URL=https://your-custom-domain.com` if you want an explicit canonical domain. The source `dist/index.html` uses relative URLs for local previews. Outside Vercel, supply `SITE_URL` when running the build and publish `build/`.

Run `node scripts/verify-social.cjs` to check URL selection, tag uniqueness, image dimensions and the Twitter card. Live social-platform scraping can only be checked after public deployment. Domain handling follows [Vercel's system variable documentation](https://vercel.com/docs/environment-variables/system-environment-variables); metadata follows the [Open Graph protocol](https://ogp.me/).

Configuration follows [Vercel's static build guidance](https://vercel.com/docs/builds) and [vercel.json reference](https://vercel.com/docs/project-configuration/vercel-json). The standalone HTML and ZIP files under `outputs/` are local sharing artifacts and are not committed or deployed.
