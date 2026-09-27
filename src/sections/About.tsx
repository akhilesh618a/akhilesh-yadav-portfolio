import { motion } from "framer-motion";
import { Lightbulb, Hammer, GraduationCap, RefreshCcw } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

const CARDS = [
  {
    icon: Lightbulb,
    title: "THINK",
    description: "Understand the problem.",
  },
  {
    icon: Hammer,
    title: "BUILD",
    description: "Turn ideas into working systems.",
  },
  {
    icon: GraduationCap,
    title: "LEARN",
    description: "Improve through experimentation.",
  },
  {
    icon: RefreshCcw,
    title: "ITERATE",
    description: "Test, debug and improve.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          label="About"
          title="MORE THAN JUST CODE."
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-lg leading-relaxed text-muted sm:text-xl"
            >
              {profile.aboutParagraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-12 flex items-end gap-4"
            >
              <span className="font-display text-7xl font-bold tracking-tight text-[var(--accent-soft)] sm:text-8xl">
                {profile.yearOfBTech}
              </span>
              <span className="section-label mb-2">Year of B.Tech</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="surface group flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--accent-soft)]"
              >
                <card.icon
                  size={22}
                  className="text-[var(--accent-soft)] transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="font-display text-base font-semibold tracking-wide">
                  {card.title}
                </h3>
                <p className="text-sm text-muted">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
