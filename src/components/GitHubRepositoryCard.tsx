import { motion } from "framer-motion";
import { GitFork, Star, ArrowUpRight } from "lucide-react";
import type { ClassifiedRepository } from "@/lib/github";
import { formatUpdatedAt } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3776ab",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export default function GitHubRepositoryCard({
  repo,
  index,
}: {
  repo: ClassifiedRepository;
  index: number;
}) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] : undefined;

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="CODE"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      whileHover={{ y: -5 }}
      className="surface group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--accent-soft)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-semibold">{repo.name}</h4>
        {repo.isForkOrOpenSource && (
          <span className="whitespace-nowrap rounded-full border border-[var(--border-strong)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Fork / Open Source
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">
        {repo.description || "No description provided."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColor ?? "#888" }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={12} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={12} /> {repo.forks_count}
        </span>
        <span>Updated {formatUpdatedAt(repo.updated_at)}</span>
      </div>

      <div className="mt-5 flex items-center gap-1.5 border-t border-[var(--border)] pt-4 font-display text-xs font-medium text-[var(--text)]">
        View on GitHub
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </motion.a>
  );
}
