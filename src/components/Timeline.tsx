import { motion } from "framer-motion";
import type { EducationEntry } from "@/data/education";

export default function Timeline({ entries }: { entries: EducationEntry[] }) {
  return (
    <ol className="relative border-l border-[var(--border-strong)] pl-8 sm:pl-10">
      {entries.map((entry, i) => (
        <motion.li
          key={`${entry.year}-${i}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative pb-12 last:pb-0"
        >
          <span
            className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full sm:-left-[calc(2.5rem+5px)]"
            style={{
              backgroundColor: entry.current ? "var(--accent-soft)" : "var(--border-strong)",
              boxShadow: entry.current ? "0 0 12px var(--accent-soft)" : "none",
            }}
            aria-hidden="true"
          />
          <span className="section-label text-[var(--accent-soft)]">
            {entry.year}
          </span>
          <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
            {entry.title}
          </h3>
          {entry.detail.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.detail.map((d) => (
                <span
                  key={d}
                  className="surface rounded-full px-3 py-1 text-xs text-muted"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
