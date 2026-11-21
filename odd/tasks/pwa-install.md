# PWA Install

Rama: `feat/pwa-install` (desde `main` @ `0f6dca6`) · Estado: en progreso

## Specs

- S1: «Los juegos tienen que funcionar sin conexión una vez instalada la app» → todo offline
- S2: «Banner + botón en el header» → Android: `beforeinstallprompt` captura → botón "Instalar"; iOS: banner con instrucciones "Compartir → Agregar a inicio"
- S3: «Ahora no se recuerda» → flag en `localStorage`, no vuelve por 7 días
- S4: «Los genero yo (texto/emoji)» → monograma "ESG" sobre degradado violeta; íconos 192, 512, 512 maskable, 180 apple-touch, favicon
- S5: «Archivo compartido pwa.js» → 5 páginas cargan `<script src="/pwa.js">`, rompen la regla de "autocontenida"
- S6: «Network-first HTML, cache-first assets» → `sw.js` con `CACHE_VERSION` versionado, limpieza de caches viejos en `activate`
- S7: «Name: English Student Games; short_name: ESGames; background: #0f0c29; theme_color: #302b63»
- S8: «Docs: AGENTS.md y README.md se actualizan con PWA, agregar juego suma paso de listarlo en sw.js, cada release suma subir CACHE_VERSION»

## Tasks

- T0 · S1-S8 · parent · Crear documento ODD y rama `feat/pwa-install` · commit: n/a · estado: done
- T1 · S4 · inline · Íconos: 192×192, 512×512, 512×512 maskable, 180×180 apple-touch, favicon 32×32 PNG en `icons/` · commit: 42e5d6f · estado: done
- T2 · S4,S7 · inline · `manifest.webmanifest` con `start_url: "/"`, `scope: "/"`, `display: "standalone"`, íconos y colores · commit: 42e5d6f · estado: done
- T3 · S6 · inline · `sw.js`: precarga del portal, los 4 juegos, íconos y manifest. HTML con network-first/cache-fallback, resto cache-first. `CACHE_VERSION` versionado, limpieza viejos en activate · commit: 5fd86e1 · estado: done
- T4 · S2,S3,S5,S7 · inline · `pwa.js`: registra SW, detecta instalado (`display-mode: standalone`), captura `beforeinstallprompt` (Android) → banner+botón "Instalar", Safari iOS → banner instrucciones, "Ahora no" → `localStorage` 7 días, UI en español · commit: 28b4e81 · estado: done
- T5 · S5 · worker · Enganchar 5 páginas: `<link rel="manifest">`, `theme-color`, metas Apple, `<script src="/pwa.js">` · commit: 28b4e81 · estado: done
- T6 · S8 · worker · Docs: AGENTS.md sección PWA; "agregar un juego" suma paso sw.js + CACHE_VERSION; README.md sección PWA · commit: 28b4e81 · estado: done
- T7 · S1-S6 · parent · Verificación estructural: manifest válido JSON, 3 íconos, 5 páginas OK en 6 checks, HTTP 200 para manifest/sw.js/pwa.js, Chrome headless no disponible (prueba en teléfono real pendiente del usuario) · commit: n/a · estado: done
- T8 · S2,S4 · inline · Swap de assets provistos por usuario (libro-control): 19 íconos (incluye maskable-192, monochrome, SVG, favicons 16/32/48), 14 splash screens iOS, favicon.ico multi-tamaño. Renombrar `manifest.webmanifest` → `manifest.json` con `short_name: "ES Games"`. Reemplazar head de las 5 páginas con snippet completo (favicons + iOS + PWA meta + 14 splash screens). Quitar `#pwa-install-btn` de `index.html`. Bumpear `CACHE_VERSION` v1→v2 y sumar todos los assets nuevos al `PRECACHE` · commits: 8451a8a (assets+manifest), 047c65e (heads+botón), 4bcf4e2 (sw.js) · estado: done

## Log

- L1: Usuario aprobó plan completo: todo offline, banner+botón, íconos generados por el agente, pwa.js compartido. Plan aprobado como feature trackeada en `feat/pwa-install` desde main post-PR#6.
- L2: Bug corregido en pwa.js: `deferredPrompt` era variable local, pero el código inline en las 5 páginas consultaba `window.deferredPWA`. Se expuso como getter para que el botón "Instalar" del banner funcione en Android.
- L3: Usuario pidió sacar el botón "Instalar en tu teléfono" del header (solo deja el banner). Acepté.
- L4: Usuario pidió cambiar el ícono PWA porque el monograma ESG generado se veía horrible. Acepté. Propuse 3 opciones propias (dado, carta "A", pieza de puzzle) — ninguna le gustó.
- L5: Usuario pasó sus propios assets en `C:\tmp\pwa-options\assets\`: ícono libro-control con D-pad + botones, paleta del sitio. Acompañado de `manifest-icons.json` (icons + theme/bg), `head-snippet.html` (favicons + iOS + PWA meta + 14 splash screens), `LEEME.md` con instrucciones. Integré siguiendo su plan: copié assets, renombré manifest a `manifest.json`, reemplacé heads de las 5 páginas, saqué el botón, bumpeé `CACHE_VERSION` v1→v2.
