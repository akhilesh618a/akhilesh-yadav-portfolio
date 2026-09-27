import { motion } from "framer-motion";
import backgroundPortrait from "@/assets/background-portrait.jpg";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Full-page atmosphere using Akhilesh's supplied portrait.
 * The image uses contain-style sizing so the portrait itself is not cropped.
 */
export default function BackgroundPortrait() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <motion.img
        src={backgroundPortrait}
        alt=""
        className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right opacity-[0.48] grayscale-[18%] [filter:contrast(1.08)_brightness(0.82)] dark:opacity-[0.5]"
        initial={{ opacity: 0, x: 70, scale: 1.03 }}
        animate={
          reducedMotion
            ? { opacity: 0.48, x: 0, scale: 1 }
            : { opacity: [0.38, 0.5, 0.42], x: [18, 0, 10], scale: [1.02, 1, 1.015] }
        }
        transition={
          reducedMotion
            ? { duration: 0.6 }
            : { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/25 via-transparent to-[var(--bg)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(59,130,246,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(139,92,246,0.10),transparent_30%)]" />

      {!reducedMotion && (
        <>
          <motion.div
            className="absolute -right-32 top-1/4 h-80 w-80 rounded-full border border-[var(--accent-soft)]/15"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-[9%] top-[31%] h-2 w-2 rounded-full bg-[var(--cyan)] shadow-[0_0_30px_var(--cyan)]"
            animate={{ y: [-18, 18, -18], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-scanlines opacity-[0.18]" />
        </>
      )}
    </div>
  );
}
