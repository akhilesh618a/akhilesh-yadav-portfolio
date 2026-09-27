import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import BackgroundPortrait from "@/components/BackgroundPortrait";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Education from "@/sections/Education";
import Skills from "@/sections/Skills";
import FeaturedProjects from "@/sections/FeaturedProjects";
import GitHubSection from "@/sections/GitHub";
import Journey from "@/sections/Journey";
import HowIThink from "@/sections/HowIThink";
import CurrentlyLearning from "@/sections/CurrentlyLearning";
import Contact from "@/sections/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <BackgroundPortrait />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Education />
          <Skills />
          <FeaturedProjects />
          <GitHubSection />
          <Journey />
          <HowIThink />
          <CurrentlyLearning />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
