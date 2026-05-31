"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { JourneyStage, StackNode } from "@/content/journey";
import { journeyStages, JOURNEY_STAGE_COUNT } from "@/content/journey";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const NODE_H = 40;
const ROW_GAP = 56;
const PADDING_Y = 36;
const SIBLING_GAP = 28;

function nodeWidth(label: string, compact?: boolean) {
  const min = compact ? 72 : 84;
  const max = compact ? 108 : 128;
  return Math.max(min, Math.min(max, label.length * (compact ? 5.5 : 6.5) + (compact ? 32 : 40)));
}

function buildChildMap(edges: [string, string][]) {
  const children = new Map<string, string[]>();
  for (const [from, to] of edges) {
    const list = children.get(from) ?? [];
    list.push(to);
    children.set(from, list);
  }
  return children;
}

type NodeLayout = { x: number; y: number; w: number };

function layoutGraph(nodes: StackNode[], edges: [string, string][], compact?: boolean) {
  const children = buildChildMap(edges);
  const hasParent = new Set(edges.map(([, to]) => to));
  const root = nodes.find((n) => !hasParent.has(n.id)) ?? nodes[0]!;
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const positions = new Map<string, NodeLayout>();

  let maxDepth = 0;

  function placeSubtree(id: string, depth: number, centerX: number) {
    maxDepth = Math.max(maxDepth, depth);
    const node = nodeById.get(id)!;
    const w = nodeWidth(node.label, compact);
    const y = PADDING_Y + depth * ROW_GAP;
    positions.set(id, { x: centerX, y, w });

    const kids = children.get(id) ?? [];
    if (kids.length === 0) return;

    const kidWidths = kids.map((kid) => nodeWidth(nodeById.get(kid)!.label, compact));
    const total =
      kidWidths.reduce((sum, kw) => sum + kw, 0) + SIBLING_GAP * (kids.length - 1);
    let cursor = centerX - total / 2;

    kids.forEach((kid, i) => {
      const kw = kidWidths[i]!;
      const kidCenter = cursor + kw / 2;
      cursor += kw + SIBLING_GAP;
      placeSubtree(kid, depth + 1, kidCenter);
    });
  }

  placeSubtree(root.id, 0, 200);

  const layouts = [...positions.values()];
  const minX = Math.min(...layouts.map((p) => p.x - p.w / 2)) - 20;
  const maxX = Math.max(...layouts.map((p) => p.x + p.w / 2)) + 20;
  const width = maxX - minX;
  const height = PADDING_Y * 2 + (maxDepth + 1) * ROW_GAP + 24;

  const normalized = new Map<string, NodeLayout>();
  const offsetX = -minX;
  positions.forEach((p, id) => {
    normalized.set(id, { ...p, x: p.x + offsetX });
  });

  return { positions: normalized, width, height, children };
}

function singleEdgePath(from: NodeLayout, to: NodeLayout, nodeH: number) {
  const y1 = from.y + nodeH / 2;
  const y2 = to.y - nodeH / 2;
  const midY = (y1 + y2) / 2;
  return `M ${from.x} ${y1} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${y2}`;
}

function busEdgePaths(parent: NodeLayout, kids: NodeLayout[], nodeH: number) {
  const y1 = parent.y + nodeH / 2;
  const hubY = y1 + 18;
  const paths: string[] = [];
  paths.push(`M ${parent.x} ${y1} L ${parent.x} ${hubY}`);
  const xs = kids.map((k) => k.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  paths.push(`M ${minX} ${hubY} L ${maxX} ${hubY}`);
  kids.forEach((k) => {
    paths.push(`M ${k.x} ${hubY} L ${k.x} ${k.y - nodeH / 2}`);
  });
  return paths;
}

export function JourneyGrowingStack({
  stage,
  stageIndex,
  stageProgress,
  compact = false,
}: {
  stage: JourneyStage;
  stageIndex: number;
  stageProgress: number;
  compact?: boolean;
}) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motionReady = hydrated && !reduced;
  const { positions, width, height, children } = useMemo(
    () => layoutGraph(stage.nodes, stage.edges, compact),
    [stage.nodes, stage.edges, compact],
  );

  const nodeHeight = compact ? 34 : NODE_H;
  const labelSize = compact ? 9 : 11;

  const highlightIds = useMemo(() => {
    const prev = journeyStages[stageIndex - 1];
    const prevIds = new Set(prev?.nodes.map((n) => n.id) ?? []);
    const added = stage.nodes.filter((n) => !prevIds.has(n.id)).map((n) => n.id);
    if (added.length > 0) return new Set(added);
    const parents = new Set(stage.edges.map(([f]) => f));
    const leaves = stage.nodes.filter((n) => !parents.has(n.id)).map((n) => n.id);
    return new Set(leaves.slice(-1));
  }, [stage, stageIndex]);

  const edgePaths = useMemo(() => {
    const paths: string[] = [];
    const drawn = new Set<string>();

    children.forEach((kids, parentId) => {
      const parent = positions.get(parentId);
      if (!parent) return;
      const kidLayouts = kids
        .map((id) => positions.get(id))
        .filter((p): p is NodeLayout => Boolean(p));

      if (kids.length > 1) {
        busEdgePaths(parent, kidLayouts, nodeHeight).forEach((d) => paths.push(d));
        kids.forEach((id) => drawn.add(`${parentId}-${id}`));
      } else if (kids.length === 1 && kidLayouts[0]) {
        paths.push(singleEdgePath(parent, kidLayouts[0], nodeHeight));
        drawn.add(`${parentId}-${kids[0]}`);
      }
    });

    return paths;
  }, [children, positions, nodeHeight]);

  return (
    <div
      className={cn(
        "journey-stack-panel relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/40 p-4",
        compact ? "min-h-[240px]" : "min-h-[300px] p-5 md:min-h-[400px] md:p-8",
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-accent-muted/25 via-transparent to-transparent" />

      <motion.svg
        key={stage.id}
        viewBox={`0 0 ${width} ${height}`}
        className={cn(
          "relative z-[1] block h-auto w-full max-w-full",
          compact ? "max-h-[280px]" : "max-h-[420px]",
        )}
        preserveAspectRatio="xMidYMid meet"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <defs>
          <linearGradient id={`journey-line-${stage.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {edgePaths.map((d, i) => (
          <motion.path
            key={`edge-${stage.id}-${i}`}
            d={d}
            fill="none"
            stroke={`url(#journey-line-${stage.id})`}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
              initial={motionReady ? { pathLength: 0, opacity: 0.4 } : false}
            animate={{
              pathLength: 1,
              opacity: 0.5 + stageProgress * 0.45,
            }}
            transition={{
              pathLength: { duration: 0.5, delay: i * 0.04, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
          />
        ))}

        <AnimatePresence mode="popLayout">
          {stage.nodes.map((node, i) => {
            const layout = positions.get(node.id);
            if (!layout) return null;
            const isHighlight = highlightIds.has(node.id);
            const { x, y, w } = layout;

            return (
              <motion.g
                key={`${stage.id}-${node.id}`}
                initial={motionReady ? { opacity: 0, scale: 0.94 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: reduced ? 0 : i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <rect
                  x={x - w / 2}
                  y={y - nodeHeight / 2}
                  width={w}
                  height={nodeHeight}
                  rx={12}
                  fill="var(--card)"
                  stroke={isHighlight ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isHighlight ? 2 : 1}
                  className={isHighlight ? "journey-node-active" : undefined}
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--foreground)"
                  fontSize={labelSize}
                  fontWeight={isHighlight ? 600 : 500}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </motion.svg>

      <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
        <span className="font-mono text-[10px] text-muted">
          Ch. {stage.chapter} · {stageIndex + 1}/{JOURNEY_STAGE_COUNT}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {stage.nodes.length} layers
        </span>
      </div>
    </div>
  );
}
