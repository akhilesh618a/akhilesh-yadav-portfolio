import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="section-label mt-1">{profile.role}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-[var(--text)]"
            data-cursor="CODE"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-[var(--text)]"
          >
            <Linkedin size={18} />
          </a>
          {profile.links.email && (
            <a
              href={`mailto:${profile.links.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-[var(--text)]"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        <div className="text-xs text-muted">
          <p>© 2026 {profile.name}</p>
          <p className="mt-1">Built with curiosity & code.</p>
        </div>
      </div>
    </footer>
  );
}
