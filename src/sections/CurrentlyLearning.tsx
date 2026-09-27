import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { exploringTags } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CurrentlyLearning() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="08"
          label="Currently Exploring"
          title="CURRENTLY EXPLORING"
          align="center"
        />

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {exploringTags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              animate={
                reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -8 : 8, 0] }
              }
              transition={{
                opacity: { duration: 0.4, delay: i * 0.06 },
                scale: { duration: 0.4, delay: i * 0.06 },
                y: reducedMotion
                  ? undefined
                  : {
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    },
              }}
              className="surface rounded-full px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--text)]"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
