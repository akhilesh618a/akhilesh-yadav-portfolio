import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function DetailBlock({
  index,
  title,
  content,
}: {
  index: string;
  title: string;
  content: string | string[] | null;
}) {
  return (
    <div className="border-t border-[var(--border)] py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
        <span className="section-label w-24 shrink-0">{index}</span>
        <div className="flex-1">
          <h4 className="font-display text-lg font-semibold">{title}</h4>
          {content === null ? (
            <p className="mt-2 text-sm italic text-muted">
              Details coming soon.
            </p>
          ) : Array.isArray(content) ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {content.map((c) => (
                <span
                  key={c}
                  className="surface rounded-full px-3 py-1 text-xs text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-[var(--bg)]/98 backdrop-blur-2xl"
        >
          <div className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project case study"
              className="surface fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-[var(--accent-soft)] sm:right-10 sm:top-10"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="section-label">{project.subtitle}</span>
              <h2
                id="project-modal-title"
                className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl"
              >
                {project.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {project.description}
              </p>

              {/* Animated architecture flow */}
              <div className="surface relative mt-10 flex flex-wrap items-center gap-3 rounded-2xl p-6">
                {project.architecture.map((stage, i) => (
                  <div key={stage.label} className="flex items-center gap-3">
                    <div className="relative rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-medium uppercase tracking-wider">
                      {stage.label}
                    </div>
                    {i < project.architecture.length - 1 && (
                      <div className="relative h-px w-8 bg-[var(--border-strong)] sm:w-10">
                        {!reducedMotion && (
                          <motion.span
                            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]"
                            animate={{ left: ["0%", "100%"] }}
                            transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              delay: i * 0.25,
                              ease: "linear",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {project.riskStates && (
                <div className="mt-4 flex gap-2">
                  {project.riskStates.map((state) => (
                    <span
                      key={state}
                      className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <DetailBlock index="01 / PROBLEM" title="Problem" content={project.caseStudy.problem} />
                <DetailBlock index="02 / APPROACH" title="Approach" content={project.caseStudy.approach} />
                <DetailBlock
                  index="03 / ARCHITECTURE"
                  title="Architecture"
                  content={project.caseStudy.architecture}
                />
                <DetailBlock
                  index="04 / TECHNOLOGY"
                  title="Technology"
                  content={project.caseStudy.technology}
                />
                {project.hardware && (
                  <DetailBlock
                    index="04a / HARDWARE"
                    title="Hardware"
                    content={project.hardware}
                  />
                )}
                <DetailBlock
                  index="05 / IMPLEMENTATION"
                  title="Implementation"
                  content={project.caseStudy.implementation}
                />
                <DetailBlock
                  index="06 / CHALLENGES"
                  title="Challenges"
                  content={project.caseStudy.challenges}
                />
                <DetailBlock
                  index="07 / CONTRIBUTION"
                  title="My Contribution"
                  content={project.caseStudy.contribution}
                />
                <DetailBlock
                  index="08 / STATUS"
                  title="Current Status"
                  content={project.caseStudy.status}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--border)] pt-8">
                {project.caseStudy.github ? (
                  <a
                    href={project.caseStudy.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="surface-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent-soft)]"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                ) : (
                  <span className="surface inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted">
                    <Github size={16} /> Repository link coming soon
                  </span>
                )}
                {project.caseStudy.liveDemo ? (
                  <a
                    href={project.caseStudy.liveDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="surface-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent-soft)]"
                  >
                    <ExternalLink size={16} /> Live demo
                  </a>
                ) : (
                  <span className="surface inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted">
                    <ExternalLink size={16} /> Live demo not available yet
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
