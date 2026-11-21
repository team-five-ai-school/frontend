---
name: Team Five
description: An AI-learning workspace built like a desk of paper sheets, where every color is a writing tool.
colors:
  ballpoint: "#2638c9"
  ballpoint-deep: "#1c2a99"
  marker: "#ffe03d"
  marker-soft: "#fff5bf"
  pencil: "#8c92a3"
  pencil-soft: "#eceef2"
  pencil-strong: "#4b5163"
  stamp: "#1d7a4c"
  stamp-soft: "#e2f1e8"
  stamp-strong: "#165f3b"
  correction: "#cf3426"
  correction-soft: "#fbe6e3"
  correction-strong: "#a3261b"
  sticky-note: "#f08a24"
  sticky-note-soft: "#fde9d4"
  sticky-note-strong: "#8a4300"
  ink: "#171b2e"
  graphite: "#5f6577"
  desk: "#eceee8"
  paper: "#fdfdfb"
  fog: "#f4f5f1"
  line: "#d6d9d1"
  field-edge: "#858b98"
  grid: "#c9d3e6"
  ballpoint-wash: "#e7eaf9"
  progress-track: "#dfe3db"
  desk-night: "#0f1220"
  paper-night: "#181c2c"
  ink-night: "#eceef5"
  ballpoint-night: "#8e9bff"
  marker-night: "#f5d63a"
typography:
  numeral:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "7rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"SHRP\" 100"
  display:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: "3.1rem"
    letterSpacing: "-0.035em"
    fontVariation: "\"SHRP\" 60"
  headline:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: "2.3rem"
    letterSpacing: "-0.02em"
    fontVariation: "\"SHRP\" 60"
  title:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.8rem"
    letterSpacing: "-0.02em"
    fontVariation: "\"SHRP\" 60"
  body:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "1.65rem"
  label:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: "1.4rem"
  micro:
    fontFamily: "Geologica, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: "1.2rem"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.4rem"
rounded:
  strip: "3px"
  block: "8px"
  sheet: "14px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
components:
  button-primary:
    backgroundColor: "{colors.ballpoint}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.block}"
    padding: "0 16px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.block}"
    padding: "0 16px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.ballpoint-wash}"
  button-destructive:
    backgroundColor: "transparent"
    textColor: "{colors.correction-strong}"
    rounded: "{rounded.block}"
    padding: "0 16px"
    height: "44px"
  button-destructive-hover:
    backgroundColor: "{colors.correction-soft}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.strip}"
    padding: "4px 12px"
    height: "44px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "16px"
  badge-needs-you:
    backgroundColor: "{colors.marker}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.strip}"
    padding: "2px 10px"
    height: "24px"
  badge-ai:
    backgroundColor: "{colors.pencil-soft}"
    textColor: "{colors.pencil-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.strip}"
    padding: "2px 10px"
    height: "24px"
  badge-success:
    backgroundColor: "{colors.stamp-soft}"
    textColor: "{colors.stamp-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.strip}"
    padding: "2px 10px"
    height: "24px"
  choice-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.block}"
    padding: "12px 16px"
    height: "56px"
  choice-card-checked:
    backgroundColor: "{colors.ballpoint-wash}"
  segmented-control:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.sheet}"
    padding: "4px"
  segmented-control-checked:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.block}"
---

# Design System: Team Five

## Overview

**Creative North Star: "The Working Desk"**

The app is a desk, and everything the person reads or works on is a sheet of paper lying on it. The page background is the desk: a cool, slightly green office grey. Cards, panels and dialogs are sheets: near-white paper, crisp corners and a short contact shadow, as if they were set down rather than floating. Nothing glows or hovers in a haze. The desk is where work gets done, so the interface feels like a tool, not a showcase.

Color is not decoration here. Each hue is a writing tool with one job. Ballpoint blue is the person's own hand: it signs off, presses and moves on. Marker yellow is the highlighter, used only on work that still needs the person. Pencil graphite is work the AI already handles: light, quiet, done. Stamp green means progress and hours saved, and correction red means errors. A screen is read by asking which tool made each mark.

Components are tactile and feel pressed into paper. The primary button has a hard 2px edge underneath that flattens when pressed. Answer cards lift a pixel on hover. Secondary actions are outlined in ink, not filled. Density is comfortable rather than compact: a 17px body, 44px minimum targets and generous sheet padding, because people are learning here, not processing a queue. At night the same desk sits under a lamp: deep blue-black paper, a lighter ballpoint, and less marker on the page.

**Key Characteristics:**
- Desk-and-sheet surfaces: grey desk background, paper sheets with hairline borders and short hard shadows.
- Color as tool roles (ballpoint, marker, pencil, stamp, correction), never as decoration.
- One variable family (Geologica), whose sharpness axis sharpens headings and numerals while body text stays soft.
- Big tabular numerals as the main graphic element on metric screens.
- Hand-made marks drawn in CSS: highlighter strokes, pencil hatching, ballpoint strike-throughs, squared notebook paper.
- Light and dark themes with the same roles; motion is short and switched off under reduced-motion.

## Colors

A cool, paper-and-ink palette: one saturated action blue, one reserved highlighter yellow, and a set of status inks, all on near-neutral greys with a faint green-blue cast.

### Primary
- **Ballpoint Blue** (`ballpoint`): every primary action, focus rings, links, the info status and streak ticks. Its deeper shade (`ballpoint-deep`) forms the button's pressed-in bottom edge and strong info/streak text. `ballpoint-wash` is the selected and hover tint for outlined controls and chosen answer cards.

### Secondary
- **Highlighter Yellow** (`marker`): the "needs you" role. It marks only work that still needs the person: a badge, a highlighted phrase in a Mentor message, the pulsing dot on a pending item. Text on it is always ink. `marker-soft` is the wash behind a needs-you row.
- **Pencil Graphite** (`pencil`): the "AI handles it" role. Used as hatching fills, quiet badges and map strips. It is deliberately low-contrast and is never used for body text; readable AI text uses `pencil-strong` on `pencil-soft`.

### Tertiary
- **Stamp Green** (`stamp`): success, progress bars and hours saved. Soft/strong pair for badges and correct answers.
- **Correction Red** (`correction`): errors and destructive actions, always as outline or soft fill with `correction-strong` text.
- **Sticky-Note Orange** (`sticky-note`): warnings. Chosen to sit clearly apart from the marker, so a warning never reads as "needs you".

### Neutral
- **Blue-Black Ink** (`ink`): all primary text and outlines on secondary buttons. A blue-black, not a neutral near-black.
- **Graphite** (`graphite`): secondary and muted text (6.3:1 on paper).
- **Desk Grey** (`desk`): the page background.
- **Paper** (`paper`): cards, popovers, sheets and the squared-paper base.
- **Fog** (`fog`): sunken surfaces, the sidebar, secondary fills and segmented-control tracks.
- **Hairline** (`line`): borders and dividers on sheets.
- **Field Edge** (`field-edge`): input and checkbox outlines, darker than the hairline so interactive borders meet 3:1 contrast.
- **Grid Blue** (`grid`): the rules of squared notebook paper.
- **Progress Track** (`progress-track`): empty part of progress bars.
- **Night desk** (`desk-night`, `paper-night`, `ink-night`, `ballpoint-night`, `marker-night`): the dark-theme counterparts. Every role keeps its meaning in dark mode; only the values shift.

### Named Rules
**The Highlighter Rule.** Yellow means "this still needs you" and nothing else. If an element doesn't need the person's action, it isn't yellow: no yellow decoration, illustration, chart accent or brand flourish.

**The Quiet Pencil Rule.** AI-handled work is drawn in pencil (gray hatching, low contrast) so it never competes with the person's own work. AI work never takes ballpoint blue or a filled primary look.

**The Role-Token Rule.** Components use role tokens (`needs-you`, `ai`, `success`, `info`, …), never raw palette hex. A new color need means a new token in `globals.css`, mirrored in `src/lib/design-tokens.ts`.

## Typography

**Display Font:** Geologica (with ui-sans-serif, system-ui)
**Body Font:** Geologica (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono, only for prompts and code the person copies

**Character:** A single variable, Cyrillic-ready family carries everything. Its sharpness axis (SHRP) is the typographic signature: headings get crisp ink-trap corners at SHRP 60, big numerals go fully sharp at SHRP 100, and body text stays soft at the default.

### Hierarchy
The scale is a 1.25 modular scale on a 17px body (Tailwind `text-xs` … `text-6xl`).
- **Numeral** (800, 7rem down to 3rem, line-height 1): hours, streaks and percentages, the main graphic element of a metric screen. Tabular figures and tight tracking (utility: `numeral`).
- **Display** (700, 3rem / 4.5rem for the hero): the one headline on a page (`h1`), tracking −0.035em, balanced wrapping.
- **Headline** (600, 1.875–2.375rem): section headings (`h2`).
- **Title** (600, 1.25rem): card titles and panel headings.
- **Body** (400, 1.0625rem / 1.65rem): all reading text, pretty-wrapped; lead paragraphs step up to 1.25rem and keep within ~65ch (`max-w-prose`).
- **Label** (500, 0.9375rem): buttons at small size, badges, nav links, field labels and descriptions.
- **Micro** (500, 0.8125rem): timestamps and dense metadata only.

### Named Rules
**The One Family Rule.** Hierarchy comes from Geologica's weight, size and sharpness, not from a second display face. Mono is for copyable text only, never for labels or decoration.

**The Numbers-as-Image Rule.** When a screen has a key number, set it as a numeral and let it be the screen's main visual, instead of adding an illustration or chart.

## Layout

Single-column, centered reading layouts on the desk. The site header is a sticky 56px bar, blurred over the desk, with content capped at `max-w-5xl` and 16px gutters (24px from `sm`). Reading pages narrow to `max-w-2xl` with generous vertical padding (64px, 96px from `sm`). Spacing uses Tailwind's 4px scale, in practice the steps 4, 8, 12, 16, 24, 32, 48 and 64px; sheets use 16px internal padding (12px for the small card size), and stacked page sections sit 40px apart.

Design and QA happen at 360, 768 and 1280px, against Tailwind's default breakpoints (sm 640, md 768, lg 1024, xl 1280). Components that change shape, like the chaos map, use container queries (`@container`) instead of viewport breakpoints: vertical lanes on narrow containers, a 16:11 horizontal map from `@2xl`. Sheets become bottom drawers on mobile (responsive sheet). Every interactive target is at least 44px (`--target-min`).

## Elevation & Depth

Depth is physical and shallow: sheets lie on the desk, and a few things are lifted off it. Shadows are short and hard, never soft blur clouds. Layering is mostly tonal (desk → paper → fog) with a hairline border on every sheet.

### Shadow Vocabulary
- **Paper** (`box-shadow: 0 1px 0 rgb(23 27 46 / 0.06), 0 3px 0 -1px rgb(23 27 46 / 0.06)`): the default for any sheet: cards, answer cards, checked segments, the chaos map.
- **Lifted** (`box-shadow: 0 1px 0 rgb(23 27 46 / 0.06), 0 10px 24px -10px rgb(23 27 46 / 0.28)`): popovers, menus and dialogs: a sheet picked up off the desk.
- **Pressed edge** (`box-shadow: 0 2px 0 0 var(--info-strong)`): the primary button's ballpoint edge; it disappears on `:active` along with a 1px drop.

Dark theme uses the same geometry with black at 0.3–0.6 opacity.

### Named Rules
**The Set-Down Rule.** A sheet at rest gets the paper shadow and nothing more. Only things that are temporarily picked up (popovers, menus, dialogs) get the lifted shadow. No glows, no colored shadows, no blur behind cards.

## Shapes

Radius follows hierarchy, in three steps. **Strip** (3px) for small, flat things: inputs, badges, tags. **Block** (8px) for buttons, answer cards, chips and nested blocks. **Sheet** (14px) for cards, panels, the chaos map and screen-level containers. Full rounding is reserved for avatars, radio indicators and dots. Paper keeps crisp corners; only controls are softened.

Borders are hairlines (1px) on sheets and 2px on indicators. Dashed borders carry meaning: a disabled button, a card footer's tear line and a "missed" correct answer all use dashed strokes. Hand-drawn marks are part of the form language: a highlighter stroke with uneven chisel-tip corners (`highlight`), 45° pencil hatching (`hatch`), a 20px squared-notebook grid (`squared`) and a ballpoint strike-through (`struck`).

## Components

### Buttons
Tactile and decisive: they feel pressed into the paper.
- **Shape:** gently curved (8px), 44px tall by default (36px `sm`, 48px `lg`, 32px `xs`), label in body size at 500 weight.
- **Primary:** ballpoint fill, white label, a 2px `ballpoint-deep` edge below. Hover lightens slightly; press removes the edge and drops the button by 1px.
- **Outline / Secondary:** paper fill with a 70%-ink outline. Hover and open state wash to `ballpoint-wash`. Secondary actions are always outlined, never filled.
- **Ghost:** transparent; hover adds a 6% ink tint.
- **Destructive:** red ink outline with `correction-strong` text; hover gets `correction-soft`. Never a solid red slab.
- **Disabled:** dashed field-edge outline, transparent fill, muted text, no shadow.
- **Loading:** a spinner before the label, keeping the width so nothing shifts; `aria-busy` sets a progress cursor.
- **Focus:** 2px ballpoint outline with a 2px offset.

### Chips & Badges
- **Badges:** 24px tall, 3px corners, label type. Role variants: `needs-you` (marker fill, ink text), `ai` (pencil hatching, pencil-strong text, half-strength pencil border), and soft/strong pairs for success, warning, info and streak.
- **Suggestion chips** (Mentor): outlined blocks (8px, field-edge border, paper fill), 44px tall, label type; hover to fog.

### Cards / Containers
- **Corner Style:** sheet (14px).
- **Background:** paper on the desk.
- **Shadow Strategy:** paper shadow (see Elevation).
- **Border:** 1px hairline. Footers are separated by a dashed tear line.
- **Internal Padding:** 16px (12px for the small size), gap between parts equal to the padding.

### Inputs / Fields
- **Style:** 44px tall, 3px corners, 1px field-edge outline, transparent fill (a faint field-edge tint in dark mode), body-size text, graphite placeholder.
- **Focus:** border turns ballpoint with a 3px, 50%-ballpoint ring.
- **Error / Disabled:** red border with a 3px, 20%-red ring; disabled fields fade to 50% with a tinted fill.

### Navigation
- **Site header:** sticky, 56px, translucent desk with backdrop blur and a hairline bottom border. The wordmark is set in the heading face at 600; nav links are label-size graphite, turning ink on hover; the nav scrolls horizontally on narrow screens, with the theme toggle and account menu on the right.
- **Segmented control:** for 2–4 views of one thing (e.g. "Now" / "With AI"). Fog track with a 15% ink border and 4px inset; the checked segment becomes a paper sheet with the paper shadow and ink text; the rest stay graphite. Arrow keys move the selection.

### Choice Cards (signature)
Large tappable answer cards for quizzes, exercises and the role picker, built on native radio/checkbox inputs. Each is a paper block (8px, min 56px tall, 20%-ink border, paper shadow) that lifts 1px and darkens its border on hover. Selected: ballpoint border on `ballpoint-wash`. After checking: correct gets a stamp border on stamp-soft with a check, incorrect gets a red border on correction-soft with a cross, and a missed correct answer gets a dashed stamp border. Every mark carries an icon, never color alone.

### Chaos Map (signature)
The person's work flows drawn on squared notebook paper (`squared`) inside a sheet. AI-handled steps are pencil-hatched strips; steps that need the person are marked with the highlighter. It reflows from vertical lanes to a horizontal map through container queries, and its transitions use the slow 900ms chaos duration.

### Mentor Message (signature)
The AI mentor speaks in plain paper blocks: an ink avatar with a marker letter (in both themes), body text with key phrases highlighted by the marker stroke, numbered steps with bold tabular numerals, and quoted examples in a bordered paper figure. The person's own messages are right-aligned paper bubbles at max 85% width. A typing indicator pulses three dots (`mentor-dot`, 1.2s).

## Do's and Don'ts

### Do:
- **Do** put content on paper sheets (`sheet`, or Card) over the desk background; the page itself is never a white canvas.
- **Do** use role tokens (`bg-needs-you`, `text-ai-strong`, `bg-success-soft`) and add new tokens to `globals.css` and `src/lib/design-tokens.ts`, never hardcoded hex in components.
- **Do** set ink text on marker yellow, and switch to a marker underline in dark mode so light text never sits on yellow (the `highlight` utility does this).
- **Do** pair every status color with an icon or text; correct, incorrect and missed answers each carry a mark.
- **Do** keep targets at least 44px and focus always visible (2px ballpoint outline, 2px offset).
- **Do** keep motion short (120/200/320ms with the standard easing `cubic-bezier(0.2, 0, 0, 1)`) and rely on the global reduced-motion override; use `prefersReducedMotion()` for imperative animations.
- **Do** design and check at 360, 768 and 1280px, in both themes.

### Don't:
- **Don't** use marker yellow for anything that doesn't need the person: no decorative yellow, no yellow chart accents, no yellow warnings (warnings are sticky-note orange).
- **Don't** give AI-handled work ballpoint blue, a filled button or high contrast; it stays in pencil.
- **Don't** use pencil (`pencil`) for body text; it is decorative-only contrast.
- **Don't** fill secondary or destructive buttons; they are outlined in ink or red ink.
- **Don't** use soft blurry drop shadows, glows or colored shadows on resting sheets.
- **Don't** add a second display typeface, or use JetBrains Mono for labels.
- **Don't** round paper beyond the sheet radius (14px) or make cards pill-shaped.
