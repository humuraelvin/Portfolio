"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { FaArrowRight, FaArrowUp } from 'react-icons/fa';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Get featured projects first, then the rest
  const featuredProjects = projectsData.filter(project => project.featured);
  const regularProjects = projectsData.filter(project => !project.featured);
  
  // Decide which projects to display based on showAll state
  const projectsToDisplay = showAll 
    ? [...featuredProjects, ...regularProjects]
    : featuredProjects;

  const handleToggleProjects = () => {
    // Scroll to projects section when collapsing
    if (showAll) {
      const projectsSection = document.getElementById('projects');
      projectsSection?.scrollIntoView({ behavior: 'smooth' });
    }
    setShowAll(!showAll);
  };

  return (
    <div id='projects' className="relative z-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {showAll ? "All Projects" : "Featured Projects"}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of projects that showcase my skills and experience in software development, 
            from full-stack applications to specialized tools and interfaces.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projectsToDisplay.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          {!showAll && projectsData.length > featuredProjects.length ? (
            <button 
              onClick={handleToggleProjects}
              className="btn btn-outline group"
            >
              View More Projects
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : showAll ? (
            <button 
              onClick={handleToggleProjects}
              className="btn btn-outline group"
            >
              View Featured Projects
              <FaArrowUp className="transition-transform group-hover:-translate-y-1" />
            </button>
          ) : null}
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default Projects;