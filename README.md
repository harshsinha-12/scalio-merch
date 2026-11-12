# Scalio — OFF SCRIPT

A standalone WebGL streetwear concept in Scalio orange, cream, and ink.

Open `outputs/Scalio-Off-Script.html` directly in a browser. It contains all scripts, styles, fonts and artwork. The editable website is `dist/index.html`; serve `dist/` through any static host. No dependencies or build required.

## Revision 3 — Apparel studio

The interface is a professional product workspace with a neutral stage, dark inspector, lighting presets (Softbox, Gallery, Contrast), three environment treatments and immediate garment controls. Scroll/drag rotation and camera presets remain available. The garment has a higher back neckline, more relaxed sleeve drop, softer directional fill light and reduced artwork distress. The mascot's curved eyes return to the original friendly expression.

Downloads:

- Front PNG: 2400 × 2800, fixed straight-on camera.
- Back PNG: 2400 × 2800, fixed straight-on camera.
- Front + back sheet: 3600 × 2600, labeled views on a neutral background.
- Current studio angle: 2400 × 2800, selected environment.
- Front/back flat artwork: 4096 × 4096, transparent PNGs rendered at native resolution.

Fixed-view exports preserve the user's interactive pose. The supplier sheet is a placement/design reference; print dimensions, garment measurements and ink choices are to be agreed with the supplier. No manufacturing measurements are invented.

## Design references

- [Perplexity Classic Logo Tee](https://perplexity.supply/collections/all-products/products/classic-logo-tee): front signature / back wordmark hierarchy and discreet labeling.
- [Perplexity Curious Tee](https://perplexity.supply/products/curious-tee): coherent artwork and garment details.
- [The Souled Store oversized collection](https://www.thesouledstore.com/explore/super-oversized-t-shirts): relaxed, dropped-shoulder proportions and substantial graphic placement.
- [Bewakoof oversized collection](https://www.bewakoof.com/oversized-t-shirts-for-men-explore-all): expressive typography and graphic-print vocabulary.

Original Scalio artwork; no competitor graphics copied. Mascot geometry adapted from the local Scalio mobile IntroMascot component. Font licenses are included in dist/assets.

## Validation

`node --check dist/app.js` and `node scripts/verify-mesh.cjs` pass. Geometry validation checks finite coordinates and unit normals. Native Safari review covered the studio layout and updated cream back view. Front, back and paired-sheet PNGs were downloaded successfully, and the paired sheet was visually inspected. Exported image dimensions were verified. Flat artwork export and mobile interaction were not browser-tested in this revision. The model is a stylized procedural apparel visualization.

Run `python3 scripts/build-standalone.py` to rebuild the self-contained HTML.

## Hosting

Existing private Sites identity is preserved in `.openai/hosting.json`. Publication remains blocked because the execution environment cannot resolve git.chatgpt-team.site. No live deployment is claimed.
