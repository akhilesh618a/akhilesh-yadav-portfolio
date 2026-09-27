import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      data-cursor="VIEW"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group surface relative w-full overflow-hidden rounded-3xl p-8 text-left transition-colors duration-300 hover:border-[var(--accent-soft)] sm:p-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.10),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="section-label">{`0${index + 1} / FEATURED PROJECT`}</span>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-[var(--accent-soft)] sm:text-base">
            {project.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="surface rounded-full px-3 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:text-[var(--text)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 font-display text-sm font-medium text-[var(--text)]">
          View case study
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* mini architecture strip */}
      <div className="relative mt-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
        {project.architecture.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-2">
            <span className="whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--bg-elevated)]/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
              {stage.label}
            </span>
            {i < project.architecture.length - 1 && (
              <span className="text-[var(--border-strong)]">→</span>
            )}
          </div>
        ))}
      </div>
    </motion.button>
  );
}
