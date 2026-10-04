/**
 * node-lines.js — SVG Node / Line System Renderer
 * Tùng Anh Portfolio
 *
 * Generates inline SVG diagrams that evolve through each section.
 * Each config defines nodes (points) and paths (connections).
 * Complexity increases as the narrative progresses.
 */

'use strict';

/**
 * Color tokens (mirrored from CSS for SVG rendering)
 */
const COLORS = {
  line:    'var(--color-line)',
  brass:   'var(--color-brass)',
  dim:     'var(--color-line-dim)',
  emerald: 'var(--color-emerald)',
};

/**
 * Section configs — each entry describes what the SVG should show.
 * `selector` targets the container element.
 * `nodes` defines point positions (cx, cy in viewBox units).
 * `paths` defines d-strings connecting nodes.
 */
const SECTION_CONFIGS = [
  // ── §2 Introduction: single horizontal signal, minimal ──────
  {
    id: 'intro-svg',
    width: '100%',
    height: 48,
    viewBox: '0 0 400 48',
    preserveAspectRatio: 'xMinYMid meet',
    nodes: [
      { cx: 16,  cy: 24, r: 3 },
      { cx: 200, cy: 24, r: 2.5 },
      { cx: 384, cy: 24, r: 3 },
    ],
    paths: [
      { d: 'M 16 24 L 200 24' },
      { d: 'M 200 24 L 384 24' },
    ],
  },

  // ── Nav overlay: sparse architectural mesh ──────────────────
  {
    id: 'nav-overlay-svg',
    width: '100%',
    height: '100%',
    viewBox: '0 0 800 600',
    preserveAspectRatio: 'xMidYMid slice',
    nodes: [
      { cx: 160, cy: 180, r: 3 },
      { cx: 400, cy: 80,  r: 3 },
      { cx: 640, cy: 240, r: 3 },
      { cx: 300, cy: 420, r: 3 },
      { cx: 500, cy: 500, r: 3 },
    ],
    paths: [
      { d: 'M 160 180 L 400 80 L 640 240' },
      { d: 'M 400 80 L 300 420 L 500 500' },
      { d: 'M 160 180 L 300 420' },
    ],
  },

  // ── Project 01: Viettel — horizontal pipeline ───────────────
  // raw info → validation → processing → structured output
  {
    id: 'diagram-viettel',
    width: '100%',
    height: 56,
    viewBox: '0 0 520 56',
    preserveAspectRatio: 'xMinYMid meet',
    nodes: [
      { cx: 16,  cy: 28, r: 3 },   // input
      { cx: 146, cy: 28, r: 2.5 }, // validation
      { cx: 276, cy: 28, r: 2.5 }, // processing
      { cx: 406, cy: 28, r: 2.5 }, // structuring
      { cx: 504, cy: 28, r: 3 },   // output
    ],
    paths: [
      { d: 'M 16 28 L 146 28' },
      { d: 'M 146 28 L 276 28' },
      { d: 'M 276 28 L 406 28' },
      { d: 'M 406 28 L 504 28' },
    ],
  },

  // End of configs
];


/**
 * Build an SVG string from a config.
 */
function buildSVG(config) {
  const { width, height, viewBox, preserveAspectRatio, nodes, paths, labels, rects } = config;

  const pAR = preserveAspectRatio
    ? ` preserveAspectRatio="${preserveAspectRatio}"`
    : '';

  const [vbX, vbY, vbW, vbH] = viewBox.split(' ').map(Number);

  const rectEls = (rects || [])
    .map(
      r =>
        `<rect class="nl-rect ${r.reveal ? `reveal ${r.delayClass || ''}` : ''}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="${r.rx || 0}" fill="${r.fill || 'none'}" stroke="${r.stroke || COLORS.line}" stroke-width="${r.strokeWidth || 1}" ${r.strokeDasharray ? `stroke-dasharray="${r.strokeDasharray}"` : ''} />`
    )
    .join('\n    ');

  const pathEls = (paths || [])
    .map(
      p => {
        let arrowId = '';
        if (p.arrow) {
          if (p.color === COLORS.brass) arrowId = 'arrow-brass';
          else if (p.color === COLORS.emerald) arrowId = 'arrow-emerald';
          else arrowId = 'arrow-line';
        }
        return `<path class="nl-path ${p.reveal ? `reveal ${p.delayClass || ''}` : ''}" d="${p.d}" stroke="${p.color || COLORS.line}" stroke-width="${p.width || 1}" fill="none" ${p.arrow ? `marker-end="url(#${arrowId})"` : ''}/>`
      }
    )
    .join('\n    ');

  const nodeEls = (nodes || [])
    .map(
      n =>
        `<circle class="nl-node ${n.reveal ? `reveal ${n.delayClass || ''}` : ''}" cx="${n.cx}" cy="${n.cy}" r="${n.r}" fill="${n.color || COLORS.brass}"/>`
    )
    .join('\n    ');

  return `<div class="nl-wrapper" style="position: relative; width: 100%; aspect-ratio: ${vbW} / ${vbH};">
    <svg
      class="node-line-svg"
      width="100%"
      height="100%"
      viewBox="${viewBox}"${pAR}
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-brass" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-brass)" />
        </marker>
        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-emerald)" />
        </marker>
        <marker id="arrow-line" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-line)" />
        </marker>
      </defs>
      <g class="nl-rects">
        ${rectEls}
      </g>
      <g class="nl-paths">
        ${pathEls}
      </g>
      <g class="nl-nodes">
        ${nodeEls}
      </g>
    </svg>
  </div>`;
}

/**
 * Inject SVGs into their target containers.
 */
export function initNodeLines() {
  SECTION_CONFIGS.forEach(config => {
    const container = document.getElementById(config.id);
    if (!container) return;
    container.innerHTML = buildSVG(config);
  });
}

