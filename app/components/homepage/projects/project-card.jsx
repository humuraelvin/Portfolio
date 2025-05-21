"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a project-specific placeholder with the project name
  const getProjectPlaceholder = (project) => {
    // Return placeholder with project name
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="${project.id % 2 === 0 ? '#10b981' : '#8b5cf6'}" />
          </linearGradient>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend in="SourceGraphic" mode="multiply"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
        <text x="50%" y="50%" font-family="Arial" font-size="42" text-anchor="middle" fill="white">${project.name}</text>
      </svg>
    `;
    
    // Convert SVG to data URL with proper encoding
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };
  
  // Use image if available, otherwise use placeholder
  const placeholderImage = getProjectPlaceholder(project);
  const imageSrc = imageError || !project.image ? placeholderImage : project.image;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div 
        className="glass-card h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden h-40 sm:h-48">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {imageSrc && (
              <Image 
                src={imageSrc}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImageError(true)}
                style={{ objectFit: 'cover' }}
                className="rounded-t-xl"
                priority={project.id <= 4}
              />
            )}
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-darker to-transparent opacity-70"></div>
          
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10">
            <span className="text-xxs sm:text-xs font-medium bg-primary/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              {project.role}
            </span>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white mb-1.5 sm:mb-2 truncate">
            {project.name}
          </h3>
          
          <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mt-auto mb-2 sm:mb-3">
            {project.tools.slice(0, 3).map((tool, index) => (
              <span 
                key={index} 
                className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-dark-lighter text-gray-300 rounded"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-dark-lighter text-gray-300 rounded">
                +{project.tools.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex gap-2 mt-auto">
            {project.code && (
              <Link 
                href={project.code} 
                target="_blank"
                className="text-xs sm:text-sm flex items-center gap-1 text-gray-300 hover:text-primary transition-colors"
                aria-label={`View ${project.name} source code`}
              >
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Code</span>
              </Link>
            )}
            
            {project.demo && (
              <Link 
                href={project.demo}
                target="_blank" 
                className="text-xs sm:text-sm flex items-center gap-1 text-gray-300 hover:text-primary transition-colors"
                aria-label={`View ${project.name} live demo`}
              >
                <FiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
