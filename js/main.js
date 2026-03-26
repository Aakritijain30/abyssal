import { initScene }        from './scene.js';
import { initScrollReveal, initDepthHUD, initDepthSlider, initCounters, initBcardGlow } from './ui.js';

/* ─── LOADER ───────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    initAll();
  }, 3400);
});

/* ─── BOOT ─────────────────────────────────── */
function initAll() {
  initScene();
  initScrollReveal();
  initDepthHUD();
  initDepthSlider();
  initCounters();
  initBcardGlow();
}
