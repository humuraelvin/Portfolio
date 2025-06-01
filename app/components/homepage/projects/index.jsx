"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { FaArrowRight } from 'react-icons/fa';
import { useTheme } from "@/app/context/ThemeContext";

const Projects = ({ blogs = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Display only featured projects initially, or all if showAll is true
  const featuredProjects = projectsData.filter(project => project.featured);
  const projectsToDisplay = showAll 
    ? projectsData 
    : featuredProjects.slice(0, 6);

  return (
    <div id='projects' className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {showAll ? "All Projects" : "Featured Projects"}
            </span>
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto text-sm sm:text-base`}>
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
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
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
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          {!showAll && projectsData.length > 6 && (
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} rounded-lg text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2 mx-auto`}
            >
              View All Projects
              <FaArrowRight className="text-sm" />
            </motion.button>
          )}
          
          {showAll && (
            <motion.button
              onClick={() => setShowAll(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} rounded-lg text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2 mx-auto`}
            >
              Show Featured Only
              <FaArrowRight className="text-sm rotate-180" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Background decorations - adjusted for mobile */}
      <div className="absolute top-1/4 -left-16 sm:-left-32 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-16 sm:-right-32 w-48 sm:w-64 h-48 sm:h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default Projects;