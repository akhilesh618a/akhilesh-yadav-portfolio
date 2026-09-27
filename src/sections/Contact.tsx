import { Github, Linkedin, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import MagneticButton from "@/components/MagneticButton";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="09"
          label="Contact"
          title="LET'S BUILD SOMETHING INTELLIGENT."
          subtitle="Have an idea, project, collaboration opportunity or just want to connect?"
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
              >
                <Linkedin size={16} /> LinkedIn →
              </MagneticButton>
              <MagneticButton
                as="a"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                cursorLabel="CODE"
              >
                <Github size={16} /> GitHub →
              </MagneticButton>
              {profile.links.email && (
                <MagneticButton
                  as="a"
                  href={`mailto:${profile.links.email}`}
                  variant="secondary"
                >
                  <Mail size={16} /> Email →
                </MagneticButton>
              )}
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                CODE. LEARN. BUILD. REPEAT.
              </h3>
              <p className="mt-3 max-w-sm text-sm text-muted">
                Every project is another opportunity to understand something
                better.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
