import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Github, Linkedin, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        )}
      >
        <div
          className={cn(
            "mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
            scrolled
              ? "surface-strong backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <button
            onClick={() => scrollTo("home")}
            className="font-display text-lg font-semibold tracking-tight"
            aria-label="Go to home section"
            data-cursor="AKHILESH"
          >
            AY<span className="text-[var(--accent-soft)]">.</span>
          </button>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 font-display text-xs font-medium uppercase tracking-widest transition-colors",
                  activeSection === item.id
                    ? "text-[var(--text)]"
                    : "text-muted hover:text-[var(--text)]",
                )}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-[var(--surface-strong)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Akhilesh Yadav's GitHub profile"
              data-cursor="CODE"
              className="text-muted transition-colors hover:text-[var(--text)]"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Akhilesh Yadav's LeetCode profile"
              data-cursor="DSA"
              className="text-muted transition-colors hover:text-[var(--text)]"
            >
              <Code2 size={18} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Akhilesh Yadav's LinkedIn profile"
              className="text-muted transition-colors hover:text-[var(--text)]"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-[var(--text)] surface"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[var(--bg)]/98 backdrop-blur-2xl md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => scrollTo(item.id)}
                className="font-display text-3xl font-semibold tracking-tight text-[var(--text)]"
              >
                {item.label}
              </motion.button>
            ))}
            <div className="mt-8 flex items-center gap-6">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="text-muted"
              >
                <Github size={22} />
              </a>
              <a
                href={profile.links.leetcode}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LeetCode"
                className="text-muted"
              >
                <Code2 size={22} />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="text-muted"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
