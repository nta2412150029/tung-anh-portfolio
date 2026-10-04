/**
 * reveal.js — Scroll Reveal Controller
 * Tùng Anh Portfolio
 *
 * Watches .reveal elements and .node-line-svg containers.
 * Adds --visible state classes when elements enter the viewport.
 */

'use strict';

export function initReveal() {
  // ── Respect reduced motion preference ───────────────────
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('reveal--visible');
    });
    document.querySelectorAll('.nl-path').forEach(p => {
      p.classList.add('nl-path--revealed');
    });
    document.querySelectorAll('.nl-node').forEach(n => {
      n.classList.add('nl-node--revealed');
    });
    return;
  }

  // ── Reveal observer ─────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── SVG path draw observer ───────────────────────────────
  const svgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const svg = entry.target;

          // Measure and set path lengths
          svg.querySelectorAll('.nl-path').forEach(path => {
            const len = path.getTotalLength();
            path.style.setProperty('--path-length', len);

            // Force reflow, then trigger animation
            path.getBoundingClientRect();
            path.classList.add('nl-path--revealed');
          });

          // Reveal nodes with a slight delay after paths start drawing
          setTimeout(() => {
            svg.querySelectorAll('.nl-node').forEach(node => {
              node.classList.add('nl-node--revealed');
            });
          }, 600);

          svgObserver.unobserve(svg);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.node-line-svg').forEach(svg => {
    svgObserver.observe(svg);
  });
}

