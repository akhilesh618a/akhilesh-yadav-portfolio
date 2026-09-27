import { useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NODE_LABELS = ["AI", "ML", "DATA", "CODE", "VISION", "API"];

interface NodeDef {
  label: string;
  angle: number;
  radius: number;
}

/**
 * An original, restrained "intelligence sphere" — nodes arranged on a
 * circle, connected by animated lines, gently reacting to the cursor.
 * Not a literal 3D scene: a lightweight SVG composition that reads as
 * a floating neural network without the weight of a 3D engine.
 */
export default function AIVisual({ compact = false }: { compact?: boolean }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const size = compact ? 260 : 440;
  const center = size / 2;
  const baseRadius = compact ? 92 : 160;

  const nodes: NodeDef[] = useMemo(
    () =>
      NODE_LABELS.map((label, i) => ({
        label,
        angle: (i / NODE_LABELS.length) * Math.PI * 2 - Math.PI / 2,
        radius: baseRadius,
      })),
    [baseRadius],
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotate = useSpring(useTransform(mx, [-1, 1], [-8, 8]), {
    stiffness: 60,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(my, [-1, 1], [6, -6]), {
    stiffness: 60,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX * 2);
    my.set(relY * 2);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const positions = nodes.map((n) => ({
    x: center + Math.cos(n.angle) * n.radius,
    y: center + Math.sin(n.angle) * n.radius,
    label: n.label,
  }));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          rotateY: reducedMotion ? 0 : rotate,
          rotateX: reducedMotion ? 0 : tiltY,
        }}
        className="relative"
        animate={
          reducedMotion
            ? undefined
            : { rotate: [0, 360] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 90, repeat: Infinity, ease: "linear" }
        }
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          <defs>
            <radialGradient id="sphere-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <circle cx={center} cy={center} r={baseRadius + 40} fill="url(#sphere-glow)" />
          <circle
            cx={center}
            cy={center}
            r={baseRadius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="2 6"
          />

          {/* connections: every node to every other node, faint */}
          {positions.map((a, i) =>
            positions.slice(i + 1).map((b, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#edge-gradient)"
                strokeWidth={0.75}
                initial={{ opacity: 0.15 }}
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [0.1, 0.4, 0.1] }
                }
                transition={{
                  duration: 4 + ((i + j) % 3),
                  repeat: Infinity,
                  delay: (i + j) * 0.2,
                }}
              />
            )),
          )}

          {/* center node */}
          <circle cx={center} cy={center} r={5} fill="#38bdf8" />

          {positions.map((p, i) => (
            <line
              key={`spoke-${i}`}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(110,168,255,0.18)"
              strokeWidth={0.75}
            />
          ))}

          {positions.map((p, i) => (
            <g key={p.label} transform={`translate(${p.x}, ${p.y})`}>
              <motion.circle
                r={compact ? 16 : 22}
                fill="rgba(10,10,14,0.9)"
                stroke="rgba(110,168,255,0.5)"
                strokeWidth={1}
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 1.06, 1] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={compact ? 8 : 10}
                fontFamily="'Space Grotesk', sans-serif"
                fill="#e8ecf5"
                fontWeight={600}
                letterSpacing={0.5}
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
