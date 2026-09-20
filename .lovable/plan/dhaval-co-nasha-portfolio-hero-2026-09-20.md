# Dhaval.co / Nasha Portfolio Hero

## Goal
Build the supplied full-screen dark portfolio hero at `/`, using the two uploaded portraits and the specified cursor-following reveal effect.

## Implementation
- Add the uploaded black-outfit portrait as `public/images/Base_image.png` and the light-outfit portrait as `public/images/Reveal_image.png`.
- Replace the starter page with the layered 100dvh hero: fixed navigation, centered left-aligned name and role, and both bottom text blocks.
- Build a reusable `RevealLayer` that draws the requested soft radial mask to an off-screen canvas and smoothly follows the pointer with requestAnimationFrame interpolation.
- Define the Inter/Playfair typography, dark palette, image layers, responsive behavior, and staggered entrance/zoom animations in the shared design system.
- Add page-specific title, description, Open Graph, and Twitter metadata.

## Validation
- Verify the page at desktop and mobile sizes.
- Confirm the spotlight follows the cursor, both image layers render, navigation adapts, text does not overlap, and reduced-motion behavior remains usable.
- Confirm the production output includes both image files. Publishing to a public URL will require the separate publish action after validation.
