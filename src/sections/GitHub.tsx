import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, RefreshCcw } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GitHubRepositoryCard from "@/components/GitHubRepositoryCard";
import MagneticButton from "@/components/MagneticButton";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import type { RepositoryCategory } from "@/lib/github";

const GITHUB_USERNAME = "akhilesh618a";

const FILTERS: { id: "all" | "personal" | RepositoryCategory; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "personal", label: "PERSONAL" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "web", label: "WEB" },
  { id: "java", label: "JAVA" },
  { id: "python", label: "PYTHON" },
  { id: "other", label: "OTHER" },
];

function RepoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="surface h-48 animate-pulse rounded-2xl"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function GitHubSection() {
  const { repositories, loading, error } = useGitHubRepositories(GITHUB_USERNAME);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return repositories;
    return repositories.filter((repo) => repo.categories.includes(filter as RepositoryCategory));
  }, [repositories, filter]);

  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index="05"
            label="GitHub"
            title="CODE IN THE OPEN."
            subtitle="Live from GitHub — forked and open-source repositories are always labeled as such, never presented as original work."
          />
          <MagneticButton
            as="a"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            variant="secondary"
            cursorLabel="CODE"
            className="shrink-0"
          >
            <Github size={16} /> Open GitHub →
          </MagneticButton>
        </div>

        {!error && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter repositories">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-display text-xs font-medium tracking-wide transition-colors",
                  filter === f.id
                    ? "border-[var(--accent-soft)] bg-[var(--accent-soft)]/10 text-[var(--text)]"
                    : "border-[var(--border)] text-muted hover:border-[var(--border-strong)]",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10">
          {loading && <RepoGridSkeleton />}

          {!loading && error && (
            <div className="surface flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
              <p className="font-display text-lg font-semibold">
                GitHub projects are temporarily unavailable.
              </p>
              <p className="max-w-md text-sm text-muted">{error}</p>
              <MagneticButton
                as="a"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
              >
                <RefreshCcw size={14} /> Open GitHub →
              </MagneticButton>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="surface rounded-2xl p-10 text-center text-sm text-muted">
              No repositories match this filter yet.
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              layout
            >
              {filtered.map((repo, i) => (
                <GitHubRepositoryCard key={repo.id} repo={repo} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
