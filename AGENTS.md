# Manimation — Motion Design Portfolio

## Project Overview
A dark-themed, cinematic motion design portfolio showcasing logo animations, UI/UX motion, explainer videos, and viral social media content. Built as a single-file HTML portfolio with embedded CSS and vanilla JavaScript.

---

## Design System

### Colors (CSS Variables)
```css
--gold: #C9A84C           /* Primary accent */
--gold-light: #E8C97A     /* Hover states */
--gold-dim: #7a6230       /* Borders, subtle accents */
--black: #050505          /* Main background */
--surface: #141414        /* Cards, sections */
--surface2: #1c1c1c       /* Borders, dividers */
--text: #e8e0d0           /* Primary text */
--text-dim: #7a7060       /* Secondary text */
--white: #faf6ee          /* Headlines */
```

### Typography
- **Headlines**: `'Cormorant Garamond', serif` — italic for emphasis
- **Body/UI**: `'Syne', sans-serif` — uppercase with letter-spacing for labels
- **Sizes**: Use `clamp()` for responsive scaling

### Visual Style
- Dark, premium aesthetic with gold accents
- Animated background shapes (ellipses, orbs, sparkles)
- Fixed navigation with gradient background
- Section dividers: `divider` class with gold gradient
- **NEW**: Logo image in hero section (replaces text title)
- **NEW**: Stylized dropdown buttons with shimmer effects
- **NEW**: Refined CTA button with gradient background and hover animations
- **NEW**: Removed subtitle and tags from hero section for cleaner layout

---

## Section Structure

| Section ID | Style Class | Layout | Description |
|------------|-------------|--------|-------------|
| `#home` | `.hero` | Full viewport | Name, tagline, CTA |
| `#logos` | `.port` | 3-col grid | Logo animation projects (landscape) |
| `#uiux` | `.portdark` | Mixed grid | UI/UX motion (16:9, some wide) |
| `#interaction` | `.portdark` | 2-col portrait | App/Web interactions (9:16) |
| `#explainer` | `.portdark` | 2-col landscape | Product/brand explainers (16:9) |
| `#product3d` | `.portdark` | 2-col landscape | 3D product advertisements (16:9) |
| `#viral` | `.port` | 2-col portrait | Social media content (9:16) |
| `#about` | — | 2-col text | Bio, skills, tools, services |
| `#process` | `.proc` | 4-col steps | 4-step workflow |
| `#contact` | `.contact` | 2-col | Email, social links |
| `#pricing` | *(pending)* | 4-col cards | Pricing by category (test file ready) |

**Section backgrounds:**
- `.port`: `rgba(5,5,5,.7)` — lighter dark
- `.portdark`: `rgba(8,7,4,.78)` — warmer dark
- `.proc`: `rgba(10,8,5,.82)` — warm amber dark

---

## Video Grid Layouts

### Landscape (16:9) — Logos, Explainer, UI/UX
```css
.vg { grid-template-columns: repeat(3, 1fr); gap: 3px; }
.vc { aspect-ratio: 16/9; }
```

### Portrait (9:16) — Interaction, Viral
```css
#sectionId { grid-template-columns: repeat(2, 1fr); max-width: 600px; }
#sectionId .vc { aspect-ratio: 9/16; }
```

### Mixed — UI/UX
Uses `.ug` class with `.wide` class for 2-column spans.

---

## Adding New Videos

### 1. Copy video to project root
Rename to simple format: `project_name.mp4` (no spaces, lowercase)

### 2. Add video data to JavaScript deck
```javascript
var SECTIONNAME=[
  {src:'./project_name.mp4',title:'Project Name — Description'},
  // ... existing videos
];
```

### 3. Update getDeck() function
Add: `deck==='sectionname'?SECTIONNAME:`

### 4. Add HTML grid item
```html
<div class="vc" data-idx="N" data-deck="sectionname" data-title="Project Name">
  <video src="./project_name.mp4" autoplay muted loop playsinline preload="metadata" loading="lazy"></video>
  <div class="vo">
    <div class="vt">Project Name</div>
    <div class="vtg">Category · Type</div>
  </div>
</div>
```

### 5. Update project count
Change the `.pn` number in the section header.

---

## HTML Component Patterns

### Section Header
```html
<div class="phdr">
  <div>
    <div class="slabel">Label Text</div>
    <h2 class="ph">Line 1<br/><em>Emphasis</em></h2>
  </div>
  <div class="pn">N</div>
</div>
<p class="pdesc">Description paragraph...</p>
```

### Video Card
```html
<div class="vc" data-idx="0" data-deck="deckname" data-title="Title">
  <video src="./filename.mp4" autoplay muted loop playsinline preload="metadata" loading="lazy"></video>
  <div class="vo">
    <div class="vt">Title</div>
    <div class="vtg">Category · Type</div>
  </div>
</div>
```

### Dropdown Button (NEW)
```html
<button class="video-toggle">See Examples <span class="arrow">▼</span></button>
<div class="video-grid-wrapper">
  <!-- Video grid here -->
</div>
```

### Service List Item
```html
<li>Service Name <span>Tag</span></li>
```

### Skill Pill
```html
<span class="ptag">Skill Name</span>
```

---

## Navigation Links
Update nav `<ul>` when adding sections:
```html
<li><a href="#sectionid">Display Name</a></li>
```

---

## Responsive Breakpoints

- **Desktop**: 900px+
- **Tablet**: 560px–900px (2-col grids → 2-col, nav hides)
- **Mobile**: <560px (1-col, portrait grids → 1-col)

---

## File Structure
```
website portfolio/
├── index.html          # Single file with all HTML/CSS/JS
├── AGENTS.md           # This file
├── Mavin logo animation.mp4
├── Quil Flare logo animation.mp4
├── ... (11 logo videos)
├── first c ui an.mp4
├── ... (5 UI videos)
├── app_ux_animation.mp4
├── web_ux_animation.mp4
├── claude_explainer.mp4
├── atb_explainer.mp4
├── 3d_soda_ad.mp4
├── christian_dior_sneakers_3d_ad.mp4
├── viral_podcast.mp4
└── viral_realestate.mp4
```

---

## Current Video Inventory

### Logo Animation (11 videos)
1. Mavin — 2D
2. Quil Flare — 2D
3. AG Studio — 2D
4. Cleanex — 2D
5. Delicio — Typography
6. Eleict Point — 2D
7. Holiday — 2D
8. Lobster — 2D
9. Arames — 3D
10. Orbix — 2D
11. Serelle — Typography

### UI/UX Motion (5 videos)
1. Quick Cart (wide)
2. Nexa Bank
3. Google Drive
4. Uber
5. Spark (wide)

### Interaction Design (2 videos) — Portrait
1. App Interaction
2. Web Interaction

### Explainer Motion (2 videos) — Landscape
1. Codex UI
2. ATB

### 3D Product Ads (2 videos) — Landscape
1. 3D Soda Ad
2. Christian Dior Sneakers 3D Ad

### Viral Social Media (2 videos) — Portrait
1. Podcast Reel
2. Real Estate Reel

---

## Tools Used (SVG Icons in About)
- After Effects
- Illustrator
- Photoshop
- Figma

---

## Lightbox Behavior
- Click video → opens lightbox with title
- Arrow keys: ← Previous, → Next
- Escape: Close
- Click outside: Close
- Navigation buttons: Previous / Next

---

## JavaScript Features
- **Video lazy loading**: Videos pause when not visible
- **Lightbox**: Keyboard navigable video viewer
- **Email copy**: Click to copy email address
- **Filter**: Logo section has category filters (All, 2D, 3D, Typography)
- **Dropdown toggle**: All video sections have "See Examples" buttons that reveal videos

---

## Recent Updates

### Dropdown Toggle Implementation
- **Added to all sections**: Logo, UI/UX, Interaction, Explainer, 3D Product, Viral
- **Stylized buttons**: Premium gold gradient design with shimmer effects
- **Smooth animations**: Custom cubic-bezier transitions
- **Space added**: 30px margin between button and video grid

### Hero Section Updates
- **Logo replacement**: Text title replaced with image logo
- **Size adjustments**: Logo scales from 500px to 1200px
- **Positioning**: Centered with auto margins
- **Visual effects**: Drop shadow and scale transform
- **Subtitle removed**: Clean minimalist hero with only logo and CTA button
- **Tags removed**: Removed "Logo Animation, UI/UX Motion, Social Media, SaaS Design" tags

### CSS Enhancements
- **Video toggle button**: Advanced styling with gradient backgrounds
- **Hover effects**: Shimmer animation and glowing borders
- **Active states**: Gold background with proper contrast
- **Responsive design**: Maintains elegance across all screen sizes

### File Updates
- **Logo image**: Changed to `2nd manimation log.png` (corrected spelling)
- **JavaScript fixes**: Completed incomplete FILTER section
- **HTML structure**: Added wrapper divs for toggle functionality

---

## When Making Changes

1. **Keep existing class names** — Don't rename CSS classes
2. **Follow aspect ratio pattern** — Match section's existing format
3. **Update project counts** — The `.pn` number in headers
4. **Add to lightbox deck** — Or video won't open in lightbox
5. **Test responsive** — Check mobile breakpoints
6. **Keep nav updated** — Add new section links

---

## Pricing Section (In Development)

A pricing section has been designed in `pricing_test.html` with the following structure:

### Pricing Categories (4 tiers)

| Category | Price | Duration | Delivery | Includes |
|----------|-------|----------|----------|----------|
| **Logo Animation** | $15 – $50 | 5–15 sec | 1–4 days | 2D reveal, transparent BG, social formats, 2 revisions |
| **UI Motion Ads** | From $180 | 15–45 sec | 3–7 days | Product showcase, screen recording + motion, music, 2 revisions |
| **Explainer Videos** | From $400 | 45–90 sec | 7–12 days | Full storyboard, custom graphics, sound design, 3 revisions |
| **Viral Reels** | From $150 | 15–60 sec | 2–4 days | Fast-paced editing, captions, multi-format, 2 revisions |

### Pricing Notes
- **Payment**: Wise only (50% upfront, 50% on delivery)
- **Under $100 projects**: Full payment upfront
- **Revisions**: 2 rounds included (additional: $25 each)
- **Source files**: Available for +$30
- **Bulk discounts**: 5+ videos = 10% off, 10+ videos = 15% off
- **Files delivered**: MP4 (web), MOV (transparent for logos), social formats

### Integration Status
- ✅ Design complete in `pricing_test.html`
- ✅ FAQ section included
- ⏳ Pending: Integration into `index.html`
- ⏳ Pending: Add `#pricing` to navigation

### Pricing Design Classes
```css
.pricing          /* 4-column grid container */
.pcard            /* Individual pricing card */
.ptitle           /* Card title (Cormorant Garamond) */
.psub             /* Duration subtitle */
.pprice           /* Price display container */
.pamount          /* Price number */
.pcurrency        /* Dollar sign */
.prange           /* Price range (e.g., "– 50") */
.pbest            /* "Per project" label */
.pfeat            /* Feature list */
.pcta             /* CTA button */
.faqwrap          /* FAQ container */
.faqitem          /* FAQ question/answer pair */
.faqq             /* Question text */
.faqans           /* Answer text */
```
