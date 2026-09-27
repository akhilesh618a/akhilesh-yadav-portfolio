import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Work"
          title="THINGS I'VE BUILT."
          subtitle="Projects where code meets real-world problems."
        />

        <div className="mt-16 flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
