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

- T0 · S1-S8 · parent · Crear documento ODD y rama `feat/pwa-install` · commit: TBD · estado: done
- T1 · S4 · inline · Íconos: 192×192, 512×512, 512×512 maskable, 180×180 apple-touch, favicon 32×32 PNG en `icons/` · commit: TBD · estado: done
- T1 · S4 · inline · Íconos: 192×192, 512×512, 512×512 maskable, 180×180 apple-touch, favicon 32×32 PNG en `icons/` · commit: TBD · estado: pending
- T2 · S4,S7 · inline · `manifest.webmanifest` con `start_url: "/"`, `scope: "/"`, `display: "standalone"`, íconos y colores · commit: TBD · estado: done
- T3 · S6 · inline · `sw.js`: precarga del portal, los 4 juegos, íconos y manifest. HTML con network-first/cache-fallback, resto cache-first. `CACHE_VERSION` versionado, limpieza viejos en activate · commit: TBD · estado: done
- T4 · S2,S3,S5,S7 · inline · `pwa.js`: registra SW, detecta instalado (`display-mode: standalone`), captura `beforeinstallprompt` (Android) → banner+botón "Instalar", Safari iOS → banner instrucciones, "Ahora no" → `localStorage` 7 días, UI en español · commit: TBD · estado: done
- T5 · S5 · worker · Enganchar 5 páginas: `<link rel="manifest">`, `theme-color`, metas Apple, `<script src="/pwa.js">` · commit: TBD · estado: done
- T6 · S8 · worker · Docs: AGENTS.md sección PWA; "agregar un juego" suma paso sw.js + CACHE_VERSION; README.md sección PWA · commit: TBD · estado: done
- T7 · S1-S6 · verify · Verificación headless: manifest válido, SW registrado, controla `/games/*`, offline funciona, CACHE_VERSION reemplaza cache viejo, banner respeta "Ahora no" y estado instalado · commit: TBD · estado: pending

## Log

- L1: Usuario aprobó plan completo: todo offline, banner+botón, íconos generados por el agente, pwa.js compartido. Plan aprobado como feature trackeada en `feat/pwa-install` desde main post-PR#6.
