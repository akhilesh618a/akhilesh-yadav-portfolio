import { useEffect, useState } from "react";
import {
  classifyRepositories,
  getRepositories,
  GitHubApiError,
  type ClassifiedRepository,
} from "@/lib/github";

interface State {
  repositories: ClassifiedRepository[];
  loading: boolean;
  error: string | null;
}

const CACHE_KEY_PREFIX = "gh-repos-cache:";
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

export function useGitHubRepositories(username: string) {
  const [state, setState] = useState<State>({
    repositories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

    async function load() {
      // Try cache first for an instant, quota-friendly render.
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as {
            timestamp: number;
            repos: ClassifiedRepository[];
          };
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (!cancelled) {
              setState({
                repositories: parsed.repos,
                loading: false,
                error: null,
              });
            }
            return;
          }
        }
      } catch {
        // Corrupt cache entry — ignore and fetch fresh.
      }

      try {
        const raw = await getRepositories(username);
        const classified = classifyRepositories(raw);
        if (!cancelled) {
          setState({ repositories: classified, loading: false, error: null });
        }
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), repos: classified }),
          );
        } catch {
          // Storage might be unavailable (private browsing) — non-fatal.
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof GitHubApiError
              ? err.message
              : "GitHub projects are temporarily unavailable.";
          setState({ repositories: [], loading: false, error: message });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
