/**
 * github.ts
 * ------------------------------------------------------------------
 * Thin client for the public GitHub REST API. No token is used (and
 * none should ever be committed) — only unauthenticated, public
 * endpoints are called, which is all that's needed to list public
 * repositories for a username.
 * ------------------------------------------------------------------
 */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  archived: boolean;
  private: boolean;
}

export type RepositoryCategory =
  | "personal"
  | "ai-ml"
  | "web"
  | "java"
  | "python"
  | "other";

export interface ClassifiedRepository extends GitHubRepository {
  /** true when the repo is a fork / open-source contribution, not original work */
  isForkOrOpenSource: boolean;
  categories: RepositoryCategory[];
}

const GITHUB_API_BASE = "https://api.github.com";

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

/**
 * Fetches all public, non-private repositories for a given username.
 * Handles pagination, rate limiting, and network failures gracefully —
 * callers should catch GitHubApiError and render the provided fallback
 * UI rather than crash.
 */
export async function getRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  const perPage = 100;
  let page = 1;
  const all: GitHubRepository[] = [];

  // Safety cap so a misbehaving API can never spin this loop forever.
  const MAX_PAGES = 5;

  while (page <= MAX_PAGES) {
    const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(
      username,
    )}/repos?per_page=${perPage}&page=${page}&sort=updated`;

    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (response.status === 403) {
      const remaining = response.headers.get("x-ratelimit-remaining");
      if (remaining === "0") {
        throw new GitHubApiError(
          "GitHub API rate limit exceeded. Please try again shortly.",
          403,
        );
      }
      throw new GitHubApiError("GitHub API request was forbidden.", 403);
    }

    if (response.status === 404) {
      throw new GitHubApiError(`GitHub user "${username}" was not found.`, 404);
    }

    if (!response.ok) {
      throw new GitHubApiError(
        `GitHub API responded with status ${response.status}.`,
        response.status,
      );
    }

    const data = (await response.json()) as GitHubRepository[];
    const publicOnly = data.filter((r) => !r.private);
    all.push(...publicOnly);

    if (data.length < perPage) break;
    page += 1;
  }

  return all;
}

/**
 * Classifies a repository as personal work vs. a fork / open-source
 * contribution, and assigns coarse topic categories based on its
 * actual language and topics — never guessed from the name alone.
 */
export function classifyRepository(
  repo: GitHubRepository,
): ClassifiedRepository {
  const categories = new Set<RepositoryCategory>();

  if (!repo.fork) categories.add("personal");

  const language = (repo.language ?? "").toLowerCase();
  const topics = (repo.topics ?? []).map((t) => t.toLowerCase());
  const description = (repo.description ?? "").toLowerCase();
  const haystack = [language, ...topics, description].join(" ");

  if (
    /machine.?learning|deep.?learning|\bml\b|\bai\b|artificial.?intelligence|neural|tensorflow|pytorch|scikit/.test(
      haystack,
    )
  ) {
    categories.add("ai-ml");
  }

  if (
    /javascript|typescript|react|vue|html|css|node/.test(haystack)
  ) {
    categories.add("web");
  }

  if (language === "java") categories.add("java");
  if (language === "python") categories.add("python");

  if (categories.size === 0 || (categories.size === 1 && categories.has("personal"))) {
    categories.add("other");
  }

  return {
    ...repo,
    isForkOrOpenSource: repo.fork,
    categories: Array.from(categories),
  };
}

export function classifyRepositories(
  repos: GitHubRepository[],
): ClassifiedRepository[] {
  return repos.map(classifyRepository);
}

const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 30],
  ["week", 1000 * 60 * 60 * 24 * 7],
  ["day", 1000 * 60 * 60 * 24],
];

export function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);
  const diffMs = date.getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const [unit, ms] of RELATIVE_TIME_UNITS) {
    if (Math.abs(diffMs) >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }
  return "today";
}
