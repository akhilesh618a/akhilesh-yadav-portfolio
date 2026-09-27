import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProfileImage() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateY: reducedMotion ? 0 : rotateY,
        rotateX: reducedMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group relative mx-auto aspect-[4/5] w-full max-w-sm"
      data-cursor="AKHILESH"
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--accent)]/25 via-transparent to-[var(--violet)]/20 opacity-70 blur-2xl" />

      <div className="surface-strong relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--border-strong)]">
        {profile.profileImageSrc ? (
          <motion.img
            src={profile.profileImageSrc}
            alt={`Portrait of ${profile.name}`}
            className="h-full w-full object-cover"
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--bg-elevated)] to-[#0d0d12]"
            role="img"
            aria-label={`Portrait placeholder for ${profile.name} — add a real photo at src/assets/profile.jpg`}
          >
            <span className="font-display text-6xl font-bold tracking-tight text-[var(--text)]/90">
              {profile.initials}
            </span>
            <span className="section-label">Add profile.jpg in src/assets</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-white">
              {profile.name.toUpperCase()}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-white/60">
              AI / ML • Developer
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
