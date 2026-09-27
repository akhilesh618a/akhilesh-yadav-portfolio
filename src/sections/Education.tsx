import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { educationTimeline } from "@/data/education";

export default function Education() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="02" label="Education" title="EDUCATION" />
        <div className="mt-16">
          <Timeline entries={educationTimeline} />
        </div>
      </div>
    </section>
  );
}
