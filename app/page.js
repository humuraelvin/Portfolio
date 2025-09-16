import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Testimonials from "./components/homepage/testimonials";
import SkillsWrapper from "./components/homepage/skills-wrapper";

async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio Website (https://elvinhumura.com)'
      }
    });

    if (!res.ok) {
      console.error('Dev.to API response not OK:', res.status, res.statusText);
      return []; // Return empty array instead of throwing
    }

    const data = await res.json();
    const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
    return filtered;
  } catch (error) {
    console.error('Error fetching from Dev.to API:', error.message);
    return []; // Return empty array on any error
  }
};

export default async function Home() {
  // Fetch blogs but don't let it break the page if it fails
  const blogs = await getData().catch(error => {
    console.error('Error in getData:', error);
    return [];
  });

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <SkillsWrapper />
      <Projects blogs={blogs} />
      <Testimonials />
      <Education />
      <ContactSection />
    </div>
  )
};