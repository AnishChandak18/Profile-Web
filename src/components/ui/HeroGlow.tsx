import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  r: number; g: number; b: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

interface Ring {
  x: number; y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  r: number; g: number; b: number;
}

// ── Palette ────────────────────────────────────────────────────────────────
// [r, g, b]
const PALETTE: [number, number, number][] = [
  [129, 140, 248],  // electric-400
  [99,  102, 241],  // electric-500
  [139,  92, 246],  // neon-violet
  [34,  211, 238],  // neon-cyan
  [236,  72, 153],  // neon-pink
  [255, 255, 255],  // white
  [167, 139, 250],  // violet-400
];

// ── Glow config per click-charge level ────────────────────────────────────
const CHARGE = [
  { radius: 145, inner: [99, 102, 241, 0.22] as [number,number,number,number], mid: [99, 102, 241, 0.09] as [number,number,number,number] },
  { radius: 210, inner: [139, 92, 246, 0.34] as [number,number,number,number], mid: [99, 102, 241, 0.14] as [number,number,number,number] },
  { radius: 275, inner: [255, 255, 255, 0.5]  as [number,number,number,number], mid: [139, 92, 246, 0.28] as [number,number,number,number] },
];

// ── Component ──────────────────────────────────────────────────────────────
const HeroGlow: React.FC<{ sectionRef: React.RefObject<HTMLElement | null> }> = ({ sectionRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // ── State ──────────────────────────────────────────────────────────────
    let glowX = 0, glowY = 0;            // smoothed glow position
    let targetX = -800, targetY = -800;  // mouse target (offscreen initially)
    let clicks = 0;
    let pulsePhase = 0;
    let pulsing = false;
    let isBursting = false;
    const particles: Particle[] = [];
    const rings: Ring[] = [];
    let rafId: number;

    // ── Canvas resize ──────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Helpers ────────────────────────────────────────────────────────────
    const rgba = (r: number, g: number, b: number, a: number) =>
      `rgba(${r},${g},${b},${a.toFixed(3)})`;

    const inSection = (cx: number, cy: number): boolean => {
      const rect = canvas.getBoundingClientRect();
      return cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
    };

    const toLocal = (cx: number, cy: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: cx - rect.left, y: cy - rect.top };
    };

    // ── Spawn particles (burst) ────────────────────────────────────────────
    const spawnBurst = (x: number, y: number) => {
      const count = 320;
      for (let i = 0; i < count; i++) {
        // Evenly spaced angles with random jitter so coverage is uniform
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        // Mix of fast fliers and slow drifters
        const speed = Math.random() < 0.3
          ? 0.3 + Math.random() * 2     // slow lingerers
          : 1.5 + Math.random() * 8.5;  // fast scatterers
        const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,  // slight upward bias
          radius: 3 + Math.random() * 14,
          opacity: 0.7 + Math.random() * 0.3,
          r, g, b,
          // 3-5 second lifespan: decay ≈ 1 / (fps * seconds)
          decay: 0.0028 + Math.random() * 0.0022,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() - 0.5) * 0.07,
        });
      }
    };

    // ── Spawn charge ring ──────────────────────────────────────────────────
    const spawnRing = (x: number, y: number, charge: number) => {
      const [r, g, b] = charge === 1 ? [139, 92, 246] : [255, 255, 255];
      rings.push({ x, y, radius: CHARGE[charge - 1].radius * 0.6, maxRadius: CHARGE[charge - 1].radius * 1.8, opacity: 0.8, r, g, b });
    };

    // ── Event handlers ─────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (!inSection(e.clientX, e.clientY)) return;
      const { x, y } = toLocal(e.clientX, e.clientY);
      targetX = x;
      targetY = y;
    };

    const onMouseLeave = () => {
      targetX = -800;
      targetY = -800;
    };

    const onClick = (e: MouseEvent) => {
      if (isBursting || !inSection(e.clientX, e.clientY)) return;
      isBursting = true;
      const bx = glowX, by = glowY;
      spawnBurst(bx, by);
      setTimeout(() => { isBursting = false; }, 150);
      // Flash ring returns after particles have lingered (~3.6 s)
      setTimeout(() => {
        rings.push({ x: bx, y: by, radius: 10, maxRadius: CHARGE[1].radius * 3,   opacity: 1,   r: 255, g: 255, b: 255 });
        rings.push({ x: bx, y: by, radius: 10, maxRadius: CHARGE[1].radius * 1.8, opacity: 0.7, r: 139, g:  92, b: 246 });
      }, 3600);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    sectionRef.current?.addEventListener('mouseleave', onMouseLeave);

    // ── Draw glow orb ──────────────────────────────────────────────────────
    const drawGlow = (x: number, y: number, charge: number, scale: number) => {
      const cfg = CHARGE[charge];
      const r = cfg.radius * scale;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0,    rgba(...cfg.inner));
      grad.addColorStop(0.35, rgba(cfg.inner[0], cfg.inner[1], cfg.inner[2], cfg.mid[3]));
      grad.addColorStop(0.65, rgba(...cfg.mid));
      grad.addColorStop(1,    rgba(cfg.mid[0], cfg.mid[1], cfg.mid[2], 0));
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);

      // Bright inner core for charges 1 and 2
      if (charge >= 1) {
        const coreR = (charge === 2 ? 55 : 32) * scale;
        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreR);
        coreGrad.addColorStop(0, charge === 2
          ? `rgba(255,255,255,${0.45 * scale})`
          : `rgba(167,139,250,${0.30 * scale})`);
        coreGrad.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(x - coreR, y - coreR, coreR * 2, coreR * 2);
      }
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp glow → target
      const ease = 0.08;
      glowX += (targetX - glowX) * ease;
      glowY += (targetY - glowY) * ease;

      // Pulse progress
      if (pulsing) {
        pulsePhase += 0.14;
        if (pulsePhase >= Math.PI) { pulsing = false; pulsePhase = 0; }
      }
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.28;

      // Draw main glow
      if (!isBursting && targetX > -700) {
        drawGlow(glowX, glowY, clicks, pulseScale);
      }

      // Update + draw charge rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += (ring.maxRadius - ring.radius) * 0.07;
        ring.opacity *= 0.93;
        if (ring.opacity < 0.01) { rings.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(ring.r, ring.g, ring.b, ring.opacity);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update + draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.vx += Math.sin(p.wobble) * 0.08;
        p.vy -= 0.045;  // float up
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.decay;
        p.radius  *= 0.997;

        if (p.opacity <= 0) { particles.splice(i, 1); continue; }

        // Outer glow halo
        const haloR = p.radius * 2.8;
        const halo  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        halo.addColorStop(0,   rgba(p.r, p.g, p.b, p.opacity * 0.7));
        halo.addColorStop(0.4, rgba(p.r, p.g, p.b, p.opacity * 0.3));
        halo.addColorStop(1,   rgba(p.r, p.g, p.b, 0));
        ctx.fillStyle = halo;
        ctx.fillRect(p.x - haloR, p.y - haloR, haloR * 2, haloR * 2);

        // Bright core dot
        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 0.6);
        coreGrad.addColorStop(0, rgba(255, 255, 255, p.opacity * 0.9));
        coreGrad.addColorStop(1, rgba(p.r, p.g, p.b, p.opacity * 0.4));
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      sectionRef.current?.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [prefersReducedMotion, sectionRef]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: 'screen' }}
    />
  );
};

export default HeroGlow;
