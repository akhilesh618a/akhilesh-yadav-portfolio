import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const STAGES = [
  {
    number: "01",
    title: "UNDERSTAND",
    description: "What is the actual problem?",
  },
  {
    number: "02",
    title: "DESIGN",
    description: "What architecture makes sense?",
  },
  {
    number: "03",
    title: "BUILD",
    description: "Turn the solution into working software.",
  },
  {
    number: "04",
    title: "IMPROVE",
    description: "Test, debug and iterate.",
  },
];

export default function HowIThink() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          label="How I Think"
          title="HOW I APPROACH A PROBLEM"
        />

        <div className="relative mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line, desktop only */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--border)] lg:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[var(--accent-soft)] to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="surface-strong relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-semibold text-[var(--accent-soft)]">
                {stage.number}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
