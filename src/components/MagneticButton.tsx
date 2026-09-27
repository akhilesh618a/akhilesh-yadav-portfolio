import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  cursorLabel?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

const STYLES = {
  primary: "bg-white text-black hover:bg-white/90 border border-white",
  secondary: "surface-strong text-[var(--text)] hover:border-[var(--accent-soft)]",
  ghost: "text-[var(--text-muted)] hover:text-[var(--text)]",
} as const;

/**
 * Buttons that subtly follow the cursor within a small radius —
 * shared spring-physics "magnetic" behavior for both <button> and
 * <a> renders, kept in two branches so each keeps its own correct
 * DOM element typing.
 */
export default function MagneticButton({
  children,
  as = "button",
  href,
  onClick,
  variant = "secondary",
  className,
  cursorLabel,
  type = "button",
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const baseClass = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium transition-colors duration-300",
    STYLES[variant],
    className,
  );

  const makeMouseHandlers = (ref: React.RefObject<HTMLElement>) => ({
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.18);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  });

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (as === "a") {
    const handlers = makeMouseHandlers(anchorRef as React.RefObject<HTMLElement>);
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        style={{ x: springX, y: springY }}
        className={baseClass}
        data-cursor={cursorLabel}
        aria-label={ariaLabel}
        {...handlers}
      >
        {children}
      </motion.a>
    );
  }

  const handlers = makeMouseHandlers(buttonRef as React.RefObject<HTMLElement>);
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={baseClass}
      data-cursor={cursorLabel}
      aria-label={ariaLabel}
      {...handlers}
    >
      {children}
    </motion.button>
  );
}
