/* English Student Games — PWA Installation UI
 * Handles:
 *   1. Service worker registration
 *   2. Android: capture beforeinstallprompt → "Instalar" button
 *   3. iOS (Safari): detection → show installation instructions
 *   4. Already installed: detect display-mode → hide everything
 *   5. "Ahora no" in localStorage (7 days) → don't show again
 */
(function () {
  'use strict';

  var INSTALL_DISMISSED_KEY = 'pwa_install_dismissed';
  var DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; /* 7 days in ms */

  /* ─── Utility ─── */

  function isIOS() {
    var ua = navigator.userAgent;
    return /iPhone|iPad/.test(ua) && !window.MSStream;
  }

  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           navigator.standalone === true; /* older iOS Safari */
  }

  function wasDismissed() {
    try {
      var stored = localStorage.getItem(INSTALL_DISMISSED_KEY);
      if (stored) {
        var ts = parseInt(stored, 10);
        return (Date.now() - ts) < DISMISS_DURATION;
      }
    } catch (e) { }
    return false;
  }

  function dismissForever() {
    try {
      localStorage.setItem(INSTALL_DISMISSED_KEY, String(Date.now()));
    } catch (e) { }
  }

  /* ─── Service Worker Registration ─── */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(function (reg) {
          if (reg.waiting) {
            reg.waiting.postMessage('SKIP_WAITING');
          }
        })
        .catch(function () { /* registration failed, site still works */ });
    });
  }

  /* ─── Android: beforeinstallprompt ─── */

  var deferredPrompt = null;
  var installBtn = null;

  /* Expose the deferred prompt so inline wiring in HTML pages can call it. */
  Object.defineProperty(window, 'deferredPWA', { get: function () { return deferredPrompt; } });

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredPrompt = event;
    showAndroidInstallUI();
  });

  function showAndroidInstallUI() {
    if (isInstalled() || wasDismissed()) return;

    installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.style.display = 'inline-block';
      installBtn.addEventListener('click', function () {
        installBtn.style.display = 'none';
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function () {
            deferredPrompt = null;
          });
        }
      });
    }

    var banner = document.getElementById('pwa-android-banner');
    if (banner) {
      banner.style.display = 'block';
      var closeBtn = banner.querySelector('[data-pwa-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          banner.style.display = 'none';
          dismissForever();
        });
      }
    }
  }

  /* ─── iOS: instructions ─── */

  function showIOSInstructions() {
    if (isInstalled() || wasDismissed()) return;

    var banner = document.getElementById('pwa-ios-banner');
    if (banner) {
      banner.style.display = 'block';
      var closeBtn = banner.querySelector('[data-pwa-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          banner.style.display = 'none';
          dismissForever();
        });
      }
    }
  }

  if (isIOS() && !isInstalled()) {
    /* iOS doesn't fire beforeinstallprompt, so we show instructions directly */
    showIOSInstructions();
  }

  /* ─── Re-check on load (e.g., after installation the page reloads in standalone mode) ─── */

  window.addEventListener('load', function () {
    if (isInstalled()) {
      /* Hide everything */
      try { document.getElementById('pwa-android-banner') && (document.getElementById('pwa-android-banner').style.display = 'none'); } catch (e) { }
      try { document.getElementById('pwa-ios-banner') && (document.getElementById('pwa-ios-banner').style.display = 'none'); } catch (e) { }
      try { document.getElementById('pwa-install-btn') && (document.getElementById('pwa-install-btn').style.display = 'none'); } catch (e) { }
    }
  });

})();
