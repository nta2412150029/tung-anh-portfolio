/**
 * main.js — Application Entry Point
 * Tùng Anh Portfolio
 *
 * Handles:
 *   - Navigation scroll state
 *   - Mobile nav overlay (open/close/keyboard)
 *   - Scroll progress bar
 *   - Module initialization
 */

'use strict';

import { initReveal }    from './reveal.js';
import { initNodeLines } from './node-lines.js';

// ── DOM references ───────────────────────────────────────────
const nav           = document.getElementById('site-nav');
const menuTrigger   = document.getElementById('nav-menu-trigger');
const navOverlay    = document.getElementById('nav-overlay');
const overlayClose  = document.getElementById('nav-overlay-close');
const scrollBar     = document.getElementById('scroll-progress');

// ── Navigation: scroll state ─────────────────────────────────
function updateNavScroll() {
  if (!nav) return;
  if (window.scrollY > 24) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}

// ── Navigation: mobile overlay ───────────────────────────────
function openOverlay() {
  if (!navOverlay) return;
  navOverlay.setAttribute('data-open', 'true');
  navOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus the close button for accessibility
  setTimeout(() => {
    overlayClose?.focus();
  }, 80);
}

function closeOverlay() {
  if (!navOverlay) return;
  navOverlay.setAttribute('data-open', 'false');
  navOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to the trigger
  menuTrigger?.focus();
}

// ── Scroll progress bar ──────────────────────────────────────
function updateScrollProgress() {
  if (!scrollBar) return;
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? scrollTop / docHeight : 0;
  scrollBar.style.setProperty('--scroll-progress', progress.toFixed(4));
}

// ── Event listeners ──────────────────────────────────────────
function bindEvents() {
  // Scroll events
  window.addEventListener('scroll', () => {
    updateNavScroll();
    updateScrollProgress();
  }, { passive: true });

  // Mobile menu trigger
  menuTrigger?.addEventListener('click', openOverlay);

  // Overlay close button
  overlayClose?.addEventListener('click', closeOverlay);

  // Overlay nav links — close on click
  navOverlay?.querySelectorAll('.nav-overlay__link').forEach(link => {
    link.addEventListener('click', closeOverlay);
  });

  // Keyboard: Escape closes overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const isOpen = navOverlay?.getAttribute('data-open') === 'true';
      if (isOpen) closeOverlay();
    }
  });

  // Trap focus within overlay when open
  navOverlay?.addEventListener('keydown', trapFocus);
}

// ── Focus trap for accessibility ─────────────────────────────
function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const isOpen = navOverlay.getAttribute('data-open') === 'true';
  if (!isOpen) return;

  const focusable = navOverlay.querySelectorAll(
    'button, a[href], [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// ── Smooth scroll for anchor links ───────────────────────────
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  updateNavScroll();
  updateScrollProgress();
  bindEvents();
  initAnchorScroll();
  initNodeLines();
  initReveal();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

