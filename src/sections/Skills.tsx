import SectionHeading from "@/components/SectionHeading";
import SkillOrb from "@/components/SkillOrb";
import { skillOrbits } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const maxRadius = Math.max(...skillOrbits.map((o) => o.radius));
  const size = maxRadius * 2 + 80;

  return (
    <section id="skills" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Skills"
          title="SKILL CONSTELLATION"
          subtitle="Technologies Akhilesh actually uses and is actively learning — organized by how they connect, not ranked by arbitrary percentages."
        />

        <div className="mt-16 flex justify-center overflow-x-auto">
          <div
            className="relative shrink-0"
            style={{ width: size, height: size, maxWidth: "100%" }}
          >
            {/* orbit rings */}
            {skillOrbits.map((orbit) => (
              <div
                key={`ring-${orbit.id}`}
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed border-[var(--border)]"
                style={{
                  width: orbit.radius * 2,
                  height: orbit.radius * 2,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* center identity node */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="surface-strong flex h-20 w-20 flex-col items-center justify-center rounded-full text-center sm:h-24 sm:w-24">
                <span className="font-display text-xs font-bold tracking-widest text-[var(--accent-soft)] sm:text-sm">
                  AKHILESH
                </span>
              </div>
            </div>

            {/* orbit labels + orbiting skills */}
            {skillOrbits.map((orbit) => {
              const angleStep = 360 / orbit.skills.length;
              return (
                <div
                  key={orbit.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    transform: "translate(-50%, -50%)",
                    animation: reducedMotion
                      ? undefined
                      : `orbit-spin ${orbit.duration}s linear infinite`,
                  }}
                >
                  {orbit.skills.map((skill, i) => (
                    <SkillOrb
                      key={skill.name}
                      skill={skill}
                      angleDeg={i * angleStep - 90}
                      radius={orbit.radius}
                      duration={orbit.duration}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Orbit legend for accessibility / small screens, since hover
            alone shouldn't be the only way to see this info */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillOrbits.map((orbit) => (
            <div key={orbit.id} className="surface rounded-2xl p-5">
              <p className="section-label text-[var(--accent-soft)]">
                {orbit.label}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {orbit.skills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
