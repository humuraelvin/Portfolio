"use client";

import { motion } from "framer-motion";
import { FaGithub, FaGooglePlay } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCover from "./project-cover";

const ease = [0.22, 1, 0.36, 1];

function ProjectCard({ project, index, large = false }) {
  const links = [
    project.playstore && { label: "Play Store", icon: <FaGooglePlay size={13} />, href: project.playstore, primary: true },
    project.demo && { label: "Live", icon: <FiArrowUpRight size={14} />, href: project.demo, primary: !project.playstore },
    project.code && { label: "Code", icon: <FaGithub size={14} />, href: project.code },
  ].filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.3), ease }}
      className={`card-surface group flex h-full flex-col overflow-hidden ${large ? "lg:col-span-2 lg:flex-row" : ""}`}
    >
      <ProjectCover
        name={project.name}
        index={index + 1}
        className={large ? "h-56 sm:h-64 lg:h-auto lg:w-1/2 lg:min-h-[320px]" : "h-48 sm:h-52"}
      />

      <div className={`flex flex-1 flex-col p-6 ${large ? "lg:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{project.role}</p>
            <h3 className={`mt-2 font-display font-semibold tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
              {project.name}
            </h3>
            {project.tagline && <p className="mt-1 text-sm text-muted">{project.tagline}</p>}
          </div>
          {project.playstore && (
            <span className="chip shrink-0 gap-1.5">
              <FaGooglePlay size={10} /> Live on Play
            </span>
          )}
        </div>

        <p className={`mt-4 text-sm leading-relaxed text-fg/80 ${large ? "" : "line-clamp-3"}`}>{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, large ? 8 : 4).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {!large && project.tools.length > 4 && <span className="chip">+{project.tools.length - 4}</span>}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} ${l.label}`}
              className={`btn h-9 px-4 text-xs ${l.primary ? "btn-solid" : "btn-outline"}`}
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
