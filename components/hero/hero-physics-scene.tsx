"use client";

import { useCallback, useEffect, useRef } from "react";
import Matter from "matter-js";
import { heroArtifacts } from "@/content/hero-visual";
import { ArtifactPill } from "@/components/hero/artifact-pill";

const BODY_RADIUS = 20;
const TIMESTEP = 1000 / 60;
const IDLE_MS = 9000;
const BOUNDARY_SEGMENTS = 24;
const REPULSE_RADIUS = 220;
const MAX_REPULSE = 0.006;

type BodyState = {
  body: Matter.Body;
  anchor: { x: number; y: number };
  constraint: Matter.Constraint;
  el: HTMLDivElement;
};

function pctToPx(pct: number, size: number) {
  return (pct / 100) * size;
}

function createBoundary(cx: number, cy: number, radius: number): Matter.Body[] {
  const walls: Matter.Body[] = [];
  for (let i = 0; i < BOUNDARY_SEGMENTS; i++) {
    const a0 = (i / BOUNDARY_SEGMENTS) * Math.PI * 2;
    const a1 = ((i + 1) / BOUNDARY_SEGMENTS) * Math.PI * 2;
    const x1 = cx + Math.cos(a0) * radius;
    const y1 = cy + Math.sin(a0) * radius;
    const x2 = cx + Math.cos(a1) * radius;
    const y2 = cy + Math.sin(a1) * radius;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const len = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    walls.push(
      Matter.Bodies.rectangle(midX, midY, len + 2, 6, {
        isStatic: true,
        angle,
        friction: 0.8,
        restitution: 0.25,
        label: "boundary",
      }),
    );
  }
  return walls;
}

export function HeroPhysicsScene({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<BodyState[]>([]);
  const rafRef = useRef<number>(0);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleRef = useRef(false);
  const runningRef = useRef(false);

  const resetIdleTimer = useCallback(() => {
    idleRef.current = false;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      idleRef.current = true;
    }, IDLE_MS);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    engineRef.current = engine;
    engine.enabled = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const portraitR = Math.min(w, h) * 0.22;
      const boundaryR = Math.min(w, h) * 0.46;

      Matter.Composite.clear(engine.world, false);
      bodiesRef.current = [];

      const boundary = createBoundary(cx, cy, boundaryR);
      Matter.Composite.add(engine.world, boundary);

      heroArtifacts.forEach((artifact) => {
        const ax = pctToPx(artifact.restX, w);
        const ay = pctToPx(artifact.restY, h);
        const jitter = (Math.random() - 0.5) * 8;
        const body = Matter.Bodies.circle(ax + jitter, ay + jitter, BODY_RADIUS, {
          restitution: 0.2,
          friction: 0.06,
          frictionAir: 0.02,
          density: 0.001,
          label: artifact.id,
        });
        const constraint = Matter.Constraint.create({
          bodyA: body,
          pointB: { x: ax, y: ay },
          stiffness: 0.0006,
          damping: 0.25,
          length: 0,
        });
        Matter.Composite.add(engine.world, [body, constraint]);

        const el = nodeRefs.current.get(artifact.id);
        if (el) {
          bodiesRef.current.push({ body, anchor: { x: ax, y: ay }, constraint, el });
        }
      });

      // Keep bodies outside portrait core
      void portraitR;
    };

    const scheduleResize = () => requestAnimationFrame(resize);

    scheduleResize();
    const ro = new ResizeObserver(scheduleResize);
    ro.observe(container);

    const tick = () => {
      if (!engine.enabled) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const { x: px, y: py, active } = pointerRef.current;

      bodiesRef.current.forEach(({ body, anchor, constraint }) => {
        if (active) {
          const dx = body.position.x - px;
          const dy = body.position.y - py;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < REPULSE_RADIUS) {
            const strength = (1 - dist / REPULSE_RADIUS) * MAX_REPULSE;
            Matter.Body.applyForce(body, body.position, {
              x: (dx / dist) * strength,
              y: (dy / dist) * strength,
            });
          }
        }

        if (idleRef.current) {
          const lerp = 0.02;
          Matter.Body.setPosition(body, {
            x: body.position.x + (anchor.x - body.position.x) * lerp,
            y: body.position.y + (anchor.y - body.position.y) * lerp,
          });
          Matter.Body.setVelocity(body, {
            x: body.velocity.x * 0.92,
            y: body.velocity.y * 0.92,
          });
          constraint.stiffness = 0.002;
        } else {
          constraint.stiffness = 0.0006;
        }
      });

      Matter.Engine.update(engine, TIMESTEP);

      bodiesRef.current.forEach(({ body, el }) => {
        el.style.left = `${body.position.x}px`;
        el.style.top = `${body.position.y}px`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? true;
        engine.enabled = visible && runningRef.current;
      },
      { threshold: 0.1 },
    );
    io.observe(container);
    runningRef.current = true;
    engine.enabled = true;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      resetIdleTimer();
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
      resetIdleTimer();
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    resetIdleTimer();

    return () => {
      runningRef.current = false;
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [containerRef, resetIdleTimer]);

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-10">
      {heroArtifacts.map((artifact) => (
        <ArtifactPill
          key={artifact.id}
          artifact={artifact}
          innerRef={(el) => {
            if (el) nodeRefs.current.set(artifact.id, el);
            else nodeRefs.current.delete(artifact.id);
          }}
          style={{ left: `${artifact.restX}%`, top: `${artifact.restY}%` }}
        />
      ))}
    </div>
  );
}
