# Inky's Study Den

Cat-themed notes / past papers / study stash site. Static: HTML + CSS + vanilla JS, no build step.

## Run
Open `index.html`, or serve the folder: `npx serve .`
(Fonts load from Google Fonts: Pirata One, Fredoka, Caveat.)

## Files
- `index.html`: structure (hero, library, My Paws, Nap Timer, reader dialog)
- `css/style.css`: theme tokens at the top (`:root` day, `[data-theme="night"]` night)
- `js/data.js`: courses + generated resources. **Set real links here** (see `OVERRIDES`, or `url` per item)
- `js/cat.js`: Inky and the stickers, all inline SVG
- `js/app.js`: filters, progress/XP/badges, timer, mascot behaviour

## Plugging in the real resources
Edit `COURSES` in `data.js` to match your university. Resources are generated from it. For real files, add entries to `OVERRIDES`:

    'n-CS201-2': { url: 'https://drive.google.com/…' }

IDs: `n-<course>-<unit>` notes, `p-<course>-<year>-<end|mid>` papers, `s-<course>-<sheet|video|practice>` stash.

## Whimsy index
Eyes follow the cursor · pet Inky (click) · double-click for chaos · paw-print cursor trail (toggle in header) · day/night mode · XP ranks, streak heatmap, collar badges · nap timer (Inky sleeps on breaks) · Konami code.

Progress is stored in `localStorage` (key `inky-den-v1`).
