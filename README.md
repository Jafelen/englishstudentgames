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
    │   └── index.html                # Unreferenced duplicate of game1.html — do not edit
    └── gerund-infinitive/
        └── game3.html                # Gerund & Infinitive Trainer (served from the portal)
```

The portal grid, its filter buttons and the card links are **static HTML** — there is no JS registry. See `AGENTS.md` for the per-game mechanics, the data arrays and the hand-maintained counts you may need to update.

## Games

### Phrasal Verbs — Memorización (`games/phrasal-verbs/game1.html`)

Memory game for B2 phrasal verbs: meanings in Spanish plus example sentences.

- Three modes — MEANING, BLANK, REVERSE — drawn at random per card.
- Multiple choice; a wrong answer re-queues the card, so a round ends when every card was answered right.
- Timer, streak counter and an end screen that reviews your mistakes.

### Phrasal Verbs — Memory (`games/phrasal-verbs/game2.html`)

Classification game: sort phrasal verbs into six themes (people, communication, money, movement, life, body).

- Streak tracking with best-streak, progress bar, and a percentage grade band.
- No timer and no re-queue: misses are collected and listed for review at the end.

### Gerund & Infinitive Trainer (`games/gerund-infinitive/game3.html`)

Pick between gerund, infinitive with *to* and bare infinitive, with a rule and an example per item.

- Per-item hint, round counter, streak combos and a per-category breakdown.
- Keyboard play: `1`/`2`/`3` to answer, `Enter`/`Space` to continue.
- Missed items from the previous round come back three times in the next one as reinforcement.

## Adding a game

1. Create `games/<theme>/gameN.html` as a self-contained page (inline CSS + JS, Spanish UI).
2. In `index.html`, add one `<div class="game-card" data-category="<theme>">` with the game's `<a href>`, description and tags.
3. If the theme is new, add a filter button `<button data-filter="<theme>">` next to the existing ones.
4. Update the `N` in the portal header counter (`<span>N</span> juegos disponibles`).

## Preview

Serve the repo over HTTP and open the portal:

```bash
python -m http.server 8000    # or: npx serve .
```

Opening the files directly with `file://` mostly works, but the portal footer links `href="/"`, which then points at your filesystem root instead of the site root. Judge layout from the server.
