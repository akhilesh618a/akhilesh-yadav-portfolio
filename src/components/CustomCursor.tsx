import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/useReducedMotion";

type CursorLabel = null | "VIEW" | "CODE" | "AKHILESH";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const [label, setLabel] = useState<CursorLabel>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  const disabled = reducedMotion || isTouch;

  useEffect(() => {
    if (disabled) return;

    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      setHovering(!!target.closest("a, button, [data-cursor]"));
      setLabel((cursorTarget?.dataset.cursor as CursorLabel) ?? null);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [disabled, x, y]);

  if (disabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: label ? 72 : hovering ? 44 : 14,
        height: label ? 72 : hovering ? 44 : 14,
        backgroundColor: "#ffffff",
      }}
      transition={{ type: "spring", damping: 24, stiffness: 300 }}
    >
      {label && (
        <span className="font-display text-[10px] font-semibold tracking-widest text-black">
          {label}
        </span>
      )}
    </motion.div>
  );
}
