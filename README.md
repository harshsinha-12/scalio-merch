# Scalio — OFF SCRIPT

A standalone WebGL streetwear concept in Scalio orange, cream, and ink.

Open `outputs/Scalio-Off-Script.html` directly in a browser. It contains all scripts, styles, fonts and artwork. The editable website is `dist/index.html`; serve `dist/` through any static host. No dependencies or build required.

## Revision 2

The original disconnected sleeve cylinders and shoulder panels have been replaced with a single garment outline, front/back shells and sewn side edges. Collar, cuffs and hem remain open. Adaptive triangulation resolves long diagonal shading artifacts, with shared normals and more consistent seam lighting.

The new OFF SCRIPT capsule uses a quiet chest signature and an oversized three-pass mascot poster on the back. Includes distressed ink, a graph-paper field, small woven-label detail, and screenprint-style color treatments. The studio includes flat artwork proofs, immediate color controls, and front/back/side/detail presets. Drag, keyboard rotation, scroll rotation, custom artwork upload and 2000 × 2400 PNG export remain available.

## Design references

- [Perplexity Classic Logo Tee](https://perplexity.supply/collections/all-products/products/classic-logo-tee): front signature / back wordmark hierarchy and discreet labeling.
- [Perplexity Curious Tee](https://perplexity.supply/products/curious-tee): coherent artwork and garment details.
- [The Souled Store oversized collection](https://www.thesouledstore.com/explore/super-oversized-t-shirts): relaxed, dropped-shoulder proportions and substantial graphic placement.
- [Bewakoof oversized collection](https://www.bewakoof.com/oversized-t-shirts-for-men-explore-all): expressive typography and graphic-print vocabulary.

Original Scalio artwork; no competitor graphics copied. Mascot geometry adapted from the local Scalio mobile IntroMascot component. Font licenses are included in dist/assets.

## Validation

`node --check dist/app.js` and `node scripts/verify-mesh.cjs` pass. Geometry validation checks finite coordinates and unit normals. Native Safari review covered rebuilt front/back views, ink/cream colorways and updated graphic contrast. A 2000 × 2400 campaign PNG was downloaded and inspected. Final seam-normal refinement and the new side preset loaded, but the screen-capture service failed during the last side-view review. Mobile and custom upload were not retested in this revision. This is a stylized procedural apparel visualization, not a physical cloth simulation or manufacturing file.

Run `python3 scripts/build-standalone.py` to rebuild the self-contained HTML.

## Hosting

Existing private Sites identity is preserved in `.openai/hosting.json`. Publication remains blocked because the execution environment cannot resolve git.chatgpt-team.site. No live deployment is claimed.
