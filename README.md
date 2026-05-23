# englishstudentgames

Portal with games for English students. Deployed at [englishstudentgames.com](https://englishstudentgames.com).

## Structure

```
/
├── index.html                    # Portal — game launcher
├── CNAME                         # GitHub Pages domain
├── README.md
├── AGENTS.md
└── games/
    └── phrasal-verbs/
        └── index.html            # Phrasal Verbs Memory Game — B2 First
```

Adding a new game: create `games/<game-name>/index.html` and add a card to the portal grid in `index.html`.

## Games

### Phrasal Verbs — Memorización

Single-page HTML memory game for learning B2 English phrasal verbs.  
All UI in **Spanish**.

- **No build step, no framework** — just inline CSS + JS.
- 92 phrasal verbs with meanings in Spanish and example sentences.
- 3 game modes: MEANING, BLANK, REVERSE.
- Wrong answers re-queue the card (spaced-repetition loop).
- Timer, streak counter, and end-of-round error review.
- Play at `games/phrasal-verbs/` or from the portal.

To preview: open `index.html` (portal) or `games/phrasal-verbs/index.html` directly in a browser, or use any static file server (`npx serve .`, `python -m http.server`, etc.).
