"use client";

import { projectsData } from "@/utils/data/projects-data";
import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";
import ProjectCard from "./project-card";

const FEATURED_COUNT = 6;

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const featured = projectsData.filter((p) => p.featured).slice(0, FEATURED_COUNT);
  const list = showAll ? projectsData : featured;

  return (
    <section id="projects" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="04" eyebrow="Projects" title="Selected work." />
          <p className="max-w-sm text-sm text-muted lg:text-right">
            {projectsData.length} projects, from a Play Store app to blockchain voting and security tooling.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} large={i === 0 && project.size === "large"} />
            ))}
        </div>

        {projectsData.length > FEATURED_COUNT && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-outline group">
              {showAll ? "Show featured only" : `View all ${projectsData.length} projects`}
              {showAll ? (
                <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              ) : (
                <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
