# englishstudentgames

Portal with games for English students. Deployed at [englishstudentgames.com](https://englishstudentgames.com).

All game UI is in **Spanish**; this documentation and the code stay in English.

## Stack

Plain HTML. **No build step, no framework, no dependencies, no tests, no CI.** Each page is a single self-contained file with inline CSS and inline JS, served directly by GitHub Pages.

## Structure

```
/
├── index.html                        # Portal — launcher, theme filters, game grid
├── CNAME                             # GitHub Pages custom domain
├── .gitattributes                    # LF line endings
├── README.md
├── AGENTS.md                         # Notes for coding agents working in this repo
└── games/
    ├── phrasal-verbs/
    │   ├── game1.html                # Phrasal Verbs — Memorización (served from the portal)
    │   ├── game2.html                # Phrasal Verbs — Memory (served from the portal)
    │   └── game4.html                # Phrasal Verbs — Significados (served from the portal)
    └── gerund-infinitive/
        └── game3.html                # Gerund & Infinitive Trainer (served from the portal)
```

The portal grid, its filter buttons and the card links are **static HTML** — there is no JS registry. See `AGENTS.md` for the per-game mechanics, the data arrays and the hand-maintained counts you may need to update.

## Games

### Phrasal Verbs — Memorización (`games/phrasal-verbs/game1.html`)

Memory game for B2 phrasal verbs: meanings in Spanish plus example sentences. **90 items.**

- Three modes — MEANING, BLANK, REVERSE — drawn at random per card.
- Multiple choice; a wrong answer re-queues the card, so a round ends when every card was answered right.
- Timer, streak counter and an end screen that reviews your mistakes.

### Phrasal Verbs — Memory (`games/phrasal-verbs/game2.html`)

Classification game: sort phrasal verbs into six themes (people, communication, money, movement, life, body). **91 items.**

- Streak tracking with best-streak, progress bar, and a percentage grade band.
- No timer and no re-queue: misses are collected and listed for review at the end.

### Gerund & Infinitive Trainer (`games/gerund-infinitive/game3.html`)

Pick between gerund, infinitive with *to* and bare infinitive, with a rule and an example per item. **84 items.**

- Per-item hint, round counter, streak combos and a per-category breakdown.
- Keyboard play: `1`/`2`/`3` to answer, `Enter`/`Space` to continue.
- Missed items from the previous round come back three times in the next one as reinforcement.

### Phrasal Verbs — Significados (`games/phrasal-verbs/game4.html`)

Meaning-matching game for B2 phrasal verbs, with the contextual sense of each one plus its secondary meanings. **150 items.**

- Pick the round size at the start: 10, 15 or 20 cards dealt from a shuffled pool of all 150.
- Four options per card; distractors skip equivalent meanings and entries sharing the same anti-ambiguity group.
- A wrong answer re-queues the card, so a round ends when every card was answered right at least once.
- After answering, the feedback shows the English example with the target form highlighted, its Spanish translation and the other meanings.
- HUD with hits, queue, errors, streak and time; the end screen reports accuracy, attempts, best streak and a review block.

## Adding a game

1. Create `games/<theme>/gameN.html` as a self-contained page (inline CSS + JS, Spanish UI).
2. In `index.html`, add one `<div class="game-card" data-category="<theme>">` with the game's `<a href>`, description and tags.
3. If the theme is new, add a filter button `<button data-filter="<theme>">` next to the existing ones.
4. Update the `N` in the portal header counter (`<span>N</span> juegos disponibles`).
5. Update the hand-maintained counts table in `AGENTS.md` and the Games section above — the copy drifts whenever a data array changes.
6. Add the new game's path to the `PRECACHE` array in `sw.js` and bump `CACHE_VERSION` at the top of that file.

## Preview

Serve the repo over HTTP and open the portal:

```bash
python -m http.server 8000    # or: npx serve .
```

Opening the files directly with `file://` mostly works, but the portal footer links `href="/"`, which then points at your filesystem root instead of the site root. Judge layout from the server.

## PWA

The site is installable as a Progressive Web App on Android and iOS. Once installed, it runs at full screen with an app icon and works **offline**.

- **Android:** an install banner appears automatically; tap "Instalar" and confirm.
- **iOS (Safari):** use the Share button → "Add to Home Screen".
- After installation, the banner no longer appears.
