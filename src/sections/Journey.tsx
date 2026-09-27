import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { journeyTimeline } from "@/data/education";

export default function Journey() {
  return (
    <section id="journey" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="06"
          label="Journey"
          title="THE JOURNEY SO FAR."
        />
        <div className="mt-16">
          <Timeline entries={journeyTimeline} />
        </div>
      </div>
    </section>
  );
}
