# englishstudentgames

## What this is

Portal with HTML games for learning English. All UI in **Spanish**. Deployed via GitHub Pages at `englishstudentgames.com` (set in `CNAME`).

### Portal
- `index.html` at root — game launcher with responsive grid of game cards.
- Each game lives in its own `games/<name>/` directory.
- Adding a new game: drop it in `games/<name>/index.html` and add a card to the portal grid.

### Phrasal Verbs game (`games/phrasal-verbs/index.html`)
- Single-page HTML memory game for learning B2 English phrasal verbs.
- **No build step, no framework, no tests, no CI.** Just inline CSS + JS.
- Game data (92 phrasal verbs, meanings in Spanish, example sentences) lives in the `PHRASAL_VERBS` array at `games/phrasal-verbs/index.html:179`.
- 3 game modes — MEANING, BLANK, REVERSE — defined in `MODES` array at `games/phrasal-verbs/index.html:272`.
- Wrong answers re-queue the card (spaced-repetition loop).
- Timer, streak counter, and end-of-round error review are all in the same inline script.
- To preview: open `index.html` (portal) or open `games/phrasal-verbs/index.html` directly in a browser, or use any static file server (`npx serve .`, `python -m http.server`, etc.).
- To update the subtitle count at `games/phrasal-verbs/index.html:119`, change it manually when the `PHRASAL_VERBS` array length changes.
