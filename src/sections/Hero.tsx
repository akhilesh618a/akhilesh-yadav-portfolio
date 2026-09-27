import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Code2, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/MagneticButton";
import ProfileImage from "@/components/ProfileImage";
import AIVisual from "@/components/AIVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.rotatingRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-7 overflow-hidden sm:h-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={profile.rotatingRoles[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="font-display text-lg font-medium text-[var(--accent-soft)] sm:text-xl"
        >
          {profile.rotatingRoles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      {!reducedMotion && (
        <>
          <motion.div
            className="ambient-drift pointer-events-none absolute left-[7%] top-[22%] h-24 w-24 rounded-full border border-[var(--accent-soft)]/20 blur-[1px]"
          />
          <motion.div
            className="pulse-ring pointer-events-none absolute right-[10%] top-[18%] h-40 w-40 rounded-full border border-[var(--cyan)]/15"
          />
          <motion.div
            className="pointer-events-none absolute right-[18%] top-[25%] h-1.5 w-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_24px_var(--cyan)]"
            animate={{ y: [0, 28, 0], opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute left-[48%] top-[70%] h-1 w-1 rounded-full bg-[var(--accent-soft)] shadow-[0_0_20px_var(--accent-soft)]"
            animate={{ x: [0, 35, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {profile.openToOpportunities && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="surface mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium tracking-wide text-muted">
                Open to opportunities
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
          >
            AKHILESH
            <br />
            <span className="text-[var(--accent-soft)]">YADAV</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 font-display text-sm font-medium uppercase tracking-[0.2em] text-muted sm:text-base"
          >
            CSE • AI & ML • Developer
          </motion.p>

          <div className="mt-4">
            <RotatingRole />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl space-y-3 text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.heroDescription.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              variant="primary"
              onClick={scrollToWork}
              cursorLabel="VIEW"
            >
              Explore My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={scrollToContact}>
              Let&apos;s Connect
            </MagneticButton>
            {profile.resumeUrl && (
              <MagneticButton
                variant="ghost"
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Download size={14} /> Download Resume
              </MagneticButton>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              {profile.location}
            </span>
            <span className="hidden h-4 w-px bg-[var(--border-strong)] sm:block" />
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]">
              <Sparkles size={13} className="text-[var(--accent-soft)]" />
              Building with AI & code
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 flex items-center gap-4"
          >
            <a href={profile.links.github} target="_blank" rel="noreferrer noopener" className="text-muted transition-all hover:-translate-y-1 hover:text-[var(--text)]" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer noopener" className="text-muted transition-all hover:-translate-y-1 hover:text-[var(--text)]" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={profile.links.leetcode} target="_blank" rel="noreferrer noopener" className="text-muted transition-all hover:-translate-y-1 hover:text-[var(--text)]" aria-label="LeetCode">
              <Code2 size={18} />
            </a>
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <AIVisual />
            </div>
            <div className="relative z-10 mx-auto w-80 xl:w-[22rem] 2xl:w-96">
              <ProfileImage />
            </div>
          </motion.div>
        </div>

        {/* Mobile: lightweight stacked visual */}
        <div className="flex flex-col items-center gap-8 lg:hidden">
          <ProfileImage />
          {!reducedMotion && (
            <div className="opacity-80">
              <AIVisual compact />
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="section-label">Scroll to explore</span>
        <span className="relative h-10 w-px overflow-hidden bg-[var(--border-strong)]">
          {!reducedMotion && (
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-[var(--accent-soft)]"
              animate={{ y: [0, 28, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}
