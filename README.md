# Dhaval's Spotlight

Build a full-screen, dark-themed hero section for a personal portfolio brand called ==Dhaval.co==, using React 18 + TypeScript + Vite + Tailwind CSS and lucide-react for icons. The signature feature is a cursor-following spotlight that reveals a second image through a soft circular mask on top of a base image. Match every detail below exactly.

**Fonts**

Add this to the top of src/index.css, then @tailwind base/components/utilities:

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');

- { font-family: 'Inter', sans-serif; }

.font-playfair { font-family: 'Playfair Display', serif; }

Body/UI font: Inter.

Display/wordmark accent: Playfair Display, italic.

**Asset URLs (use these exactly)**

Base image (Base_image): Base_image.png — portrait with black blazer against a dark red background.

Reveal image (Reveal_image): Reveal_image.png — portrait with silver outfit and visor sunglasses.

Place both files in public/images/ and reference them as ./images/Base_image.png and ./images/Reveal_image.png.

**Layout & structure**

Root wrapper: min-h-screen bg-white tracking-[-0.02em], inline fontFamily: "'Inter', sans-serif".

Section (

): relative w-full overflow-hidden h-screen bg-black, inline style={{ height: '100dvh' }}. Layers, by z-index:

1. Base image (z-10): absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom, background = Base_image
2. Reveal layer (z-30): a RevealLayer component (see below) showing Reveal_image.
3. Heading (z-50): absolute top-1/2 -translate-y-1/2 flex flex-col items-start text-left px-5 pointer-events-none, inline style={{ left: '80px' }} (text content therefore begins at 100px from the left edge thanks to the px-5 padding). Contains: 

 with two block spans + one inline subtitle:
    - Line 1: block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl, inline letterSpacing: '-0.05em', text "I'm".
    - Line 2: block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1, inline letterSpacing: '-0.08em', text "==NASHA==".
    - Subtitle (new line, directly under the heading): font-playfair italic text-white/90 text-base sm:text-lg md:text-xl mt-3 sm:mt-4, inline letterSpacing: '-0.02em', text "==UXUI Designer==".
4. Bottom-left paragraph (z-50): hidden sm:block absolute bottom-14 max-w-[260px]. Inline style={{ left: '100px' }} so it sits flush with the heading's visible text-start. 

 — "==I design with curiosity and build with code. Obsessed with AI tools, live coding, and finding new ways to make digital experiences feel alive.=="
5. Bottom-right block (z-50): absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5. Contains a single 

 — "==UX/UI designer who codes. I use AI to design faster, build smarter, and create digital experiences that actually work.==" (No CTA button.)

**The cursor spotlight reveal (core mechanic)**

In the parent, define const SPOTLIGHT_R = 260; and track the mouse with smoothing:

- Refs: mouse (raw), smooth (eased), rafRef; state cursorPos (init {x:-999,y:-999}).
- mousemove listener stores raw e.clientX/clientY.
- A requestAnimationFrame loop lerps: smooth.x += (mouse.x - smooth.x) * 0.1 (same for y), then setCursorPos. Clean up listener + cancel RAF on unmount.

RevealLayer({ image, cursorX, cursorY, radius }):

- Holds a hidden 

 (absolute inset-0 pointer-events-none, style={{display:'none'}}) sized to window.innerWidth/Height on mount + resize.
- A reveal 

 (absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none) with the reveal image as background.
- On every render: clear canvas, build a radial gradient at (cursorX, cursorY) from radius 0 → SPOTLIGHT_R with stops: 0 → rgba(255,255,255,1), 0.4 → 1, 0.6 → 0.75, 0.75 → 0.4, 0.88 → 0.12, 1 → 0. Fill an arc of radius SPOTLIGHT_R with it. Then canvas.toDataURL() and apply it as maskImage/webkitMaskImage on the reveal div with maskSize: '100% 100%', maskRepeat: 'no-repeat'. This makes the second image visible only inside the soft glowing circle that trails the cursor.

**Navigation (fixed, over hero)**

:

- Left: an inline SVG logo (26×26, viewBox 0 0 256 256, fill="#ffffff", path M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z) + wordmark ====.
- Center pill (hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1): buttons About (full white text), then Projects, Contact (text-white/80 ... hover:bg-white/20 hover:text-white transition-colors, px-4 py-1.5 rounded-full text-sm font-medium).
- Right (desktop): hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 — "Let's talk".
- Right (mobile): md:hidden hamburger (lucide-react's Menu) on a text-white p-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 button.

**Animations (premium, on load)**

Add to index.css:

@keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }

@keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }

@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }

.hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }

.hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }

.hero-fade { animation-name:heroFadeUp; animation-duration:1s; }

.hero-zoom { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

@media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }

Apply:

- Base image div → hero-zoom (slow Ken Burns zoom-out).
- Heading line 1 → hero-anim hero-reveal, inline animationDelay: '0.25s'; line 2 → same with '0.42s'; subtitle → same with '0.58s' (blur-rise, staggered).
- Bottom-left paragraph wrapper → hero-anim hero-fade, animationDelay: '0.7s'.
- Bottom-right wrapper → hero-anim hero-fade, animationDelay: '0.85s'.

**Responsiveness**

- Heading scales text-5xl → sm:text-7xl → md:text-8xl; subtitle scales text-base → sm:text-lg → md:text-xl.
- Heading is left-aligned at left: 80px and vertically centered at all breakpoints.
- Center nav pill and desktop "Let's talk" are hidden below md; the mobile hamburger is md:hidden.
- Bottom-left paragraph is hidden sm:block; bottom-right block is full-width on mobile (left-5 right-5) and right-anchored from sm.
- Use 100dvh so mobile browser chrome doesn't clip the section.

**Build & deploy**

After npm run build, deploy the contents of dist/ (with images/Base_image.png and images/Reveal_image.png copied into dist/images/) to a public static-host URL.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://radiant-mask.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf77a6e7-958c-44f9-ab74-5f4146e921b1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
