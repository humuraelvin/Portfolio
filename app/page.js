import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import SkillsWrapper from "./components/homepage/skills-wrapper";
import Testimonials from "./components/homepage/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <SkillsWrapper />
      <Projects />
      <Testimonials />
      <Education />
      <ContactSection />
    </>
  );
}
