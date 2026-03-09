'use client';

import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

const GRID_SIZE = 48;    // must match global.scss background-size: 48px 48px
const DOT_COUNT = 8;    // how many pulses on screen at once
const DOT_RADIUS = 1.5;   // size of the pulse dot
const TRAIL_STEPS = 5;    // how many trail dots behind the head
const SPEED_MIN = 40;    // px per second (slowest pulse)
const SPEED_MAX = 100;   // px per second (fastest pulse)

// Pulse colors — matches your portfolio palette
const COLORS = [
    'rgba(110, 158, 245, 0.3)',  // blue   — primary
    'rgba(94,  203, 138, 0.28)', // green  — success
    'rgba(167, 139, 250, 0.25)', // purple
    'rgba(45,  212, 191, 0.25)', // teal
    'rgba(251, 113, 133, 0.22)', // rose
    'rgba(251, 191, 36,  0.22)', // amber
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));
const pick = (arr) => arr[randInt(0, arr.length)];

// Snap a value to the nearest grid line
const snapToGrid = (val) => Math.round(val / GRID_SIZE) * GRID_SIZE;

// Replace opacity in rgba string
const withOpacity = (color, opacity) =>
    color.replace(/[\d.]+\)$/, `${Math.max(0, opacity).toFixed(3)})`);

// ─────────────────────────────────────────────
// PULSE FACTORY
// Each pulse lives on a grid line and moves in
// one direction (up / down / left / right)
// ─────────────────────────────────────────────

const createPulse = (canvasW, canvasH) => {
    // Randomly choose horizontal or vertical movement
    const isHorizontal = Math.random() > 0.5;
    const color = pick(COLORS);
    const speed = rand(SPEED_MIN, SPEED_MAX);

    let x, y, dx, dy;

    if (isHorizontal) {
        // Snap to a horizontal grid line (random row)
        const row = randInt(1, Math.floor(canvasH / GRID_SIZE));
        y = row * GRID_SIZE;
        dx = Math.random() > 0.5 ? 1 : -1; // left or right
        dy = 0;
        // Start from the edge the pulse moves away from
        x = dx > 0 ? -DOT_RADIUS : canvasW + DOT_RADIUS;
    } else {
        // Snap to a vertical grid line (random column)
        const col = randInt(1, Math.floor(canvasW / GRID_SIZE));
        x = col * GRID_SIZE;
        dy = Math.random() > 0.5 ? 1 : -1; // up or down
        dx = 0;
        // Start from the edge the pulse moves away from
        y = dy > 0 ? -DOT_RADIUS : canvasH + DOT_RADIUS;
    }

    return {
        x, y, dx, dy,
        speed, color,
        // trail: array of {x, y} positions
        trail: Array(TRAIL_STEPS).fill({ x, y }),
    };
};

// Check if a pulse has left the canvas
const isOffScreen = (pulse, w, h) => {
    const margin = DOT_RADIUS + TRAIL_STEPS * 2;
    return (
        pulse.x < -margin ||
        pulse.x > w + margin ||
        pulse.y < -margin ||
        pulse.y > h + margin
    );
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const GridPulse = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Resize canvas to fill viewport
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Spawn initial pulses spread across time
        // (staggered so they don't all appear at once)
        let pulses = Array.from({ length: DOT_COUNT }, (_, i) => {
            const p = createPulse(canvas.width, canvas.height);
            // Move each pulse forward in time so they're already mid-journey
            const preadvance = (i / DOT_COUNT) * 3;
            p.x += p.dx * p.speed * preadvance;
            p.y += p.dy * p.speed * preadvance;
            p.trail = p.trail.map(() => ({ x: p.x, y: p.y }));
            return p;
        });

        // ── Animation loop ────────────────────────
        let animId;
        let lastTime = performance.now();

        const draw = (now) => {
            const delta = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms
            lastTime = now;

            // Clear canvas fully each frame — trails are drawn explicitly below
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pulses.forEach(p => {

                // ── Move pulse ──
                p.x += p.dx * p.speed * delta;
                p.y += p.dy * p.speed * delta;

                // ── Update trail ──
                // unshift adds current position to front, pop removes oldest
                p.trail.unshift({ x: p.x, y: p.y });
                p.trail.pop();

                // ── Draw trail (oldest to newest so head renders on top) ──
                for (let i = p.trail.length - 1; i >= 0; i--) {
                    const t = p.trail[i];
                    // i=0 is the head (brightest), i=last is the tail (faintest)
                    const opacity = (1 - i / p.trail.length) * 0.2;
                    const radius = DOT_RADIUS * (1 - i / p.trail.length * 0.7);

                    ctx.beginPath();
                    ctx.arc(t.x, t.y, Math.max(0.3, radius), 0, Math.PI * 2);
                    ctx.fillStyle = withOpacity(p.color, opacity);
                    ctx.fill();
                }

                // ── Draw head dot with glow ──
                ctx.beginPath();
                ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.shadowBlur = 0; // always reset after glow

                // ── Replace pulse when it leaves the screen ──
                if (isOffScreen(p, canvas.width, canvas.height)) {
                    const idx = pulses.indexOf(p);
                    pulses[idx] = createPulse(canvas.width, canvas.height);
                }
            });

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // never blocks clicks
                zIndex: 0,      // behind all content
            }}
        />
    );
};

export default GridPulse;