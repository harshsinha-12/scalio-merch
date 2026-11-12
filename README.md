# Scalio — Made of Possibility

A standalone, dependency-free WebGL apparel concept in Scalio orange, cream, and ink.

Open `dist/index.html` in Safari or another WebGL-capable browser. Alternatively serve `dist/` with any static HTTP server. No build or installation is required.

## Features

- Procedural volumetric tee with open collar, sleeves, cotton grain, and directional lighting.
- Scroll-driven full turn; pointer drag and keyboard arrows; front, back, detail, and automatic rotation.
- Ink, cream, and orange colorways.
- Local PNG/JPEG artwork upload and reset.
- Campaign PNG export at 2000 × 2400 with three background treatments.
- Local fonts and embedded mascot; no remote runtime dependencies.

## Brand sources

Mascot geometry adapted from the existing Scalio mobile `IntroMascot.tsx` component. This could not be compared with the supplied Claude artifact because that URL was inaccessible. Orange palette explicitly selected by the user. Bricolage Grotesque and Hanken Grotesk files from the local Scalio web project; their OFL licenses are included in assets.

## Verification and limits

JavaScript syntax checked with `node --check dist/app.js`. Native Safari rendered the 3D garment and controls. A campaign PNG downloaded successfully. The shoulder geometry, cuff intersections, hidden-element styling, and export framing were refined after visual inspection; these final refinements have not been visually rechecked. Mobile layout and custom artwork upload require further browser testing. This is a stylized procedural concept model, not a manufacturing-ready garment mesh or physical cloth simulation. Competition screenshots were unavailable, so contest requirements are not verified.

## Hosting

The private Sites project ID is retained in `.openai/hosting.json`. Publication could not complete because the execution environment could not resolve `git.chatgpt-team.site`. No live deployment is claimed. The local website works independently.
