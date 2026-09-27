import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Hammer, Wrench } from "lucide-react";
import type { Skill } from "@/data/skills";

const CATEGORY_ICON: Record<string, typeof Code2> = {
  Language: Code2,
  "AI/ML": Sparkles,
  Frontend: Hammer,
  Backend: Hammer,
  Tooling: Wrench,
};

interface SkillOrbProps {
  skill: Skill;
  angleDeg: number;
  radius: number;
  duration: number;
  reducedMotion: boolean;
}

export default function SkillOrb({
  skill,
  angleDeg,
  radius,
  duration,
  reducedMotion,
}: SkillOrbProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = CATEGORY_ICON[skill.category] ?? Code2;

  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
    >
      {/* counter-rotate wrapper keeps the node upright while the orbit spins */}
      <div
        style={
          reducedMotion
            ? undefined
            : { animation: `orbit-spin ${duration}s linear infinite reverse` }
        }
      >
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="surface-strong relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--accent-soft)] transition-colors hover:border-[var(--accent-soft)] sm:h-12 sm:w-12"
          aria-label={`${skill.name} — ${skill.category}`}
        >
          <Icon size={16} strokeWidth={1.75} />
        </button>

        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="surface-strong absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-xl px-3 py-2 text-center shadow-xl"
          >
            <p className="font-display text-xs font-semibold">{skill.name}</p>
            <p className="section-label mt-0.5">{skill.category}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
