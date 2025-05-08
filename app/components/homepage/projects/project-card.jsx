"use client";

import { generatePlaceholderDataUrl } from '@/utils/image-placeholders';
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
    
    // Convert SVG to data URL
    const encodedSVG = encodeURIComponent(svg);
    return `data:image/svg+xml,${encodedSVG}`;
  };
  
  // Use image if available, otherwise use placeholder
  const placeholderImage = getProjectPlaceholder(project);
  const imageSrc = imageError ? placeholderImage : (project.image || placeholderImage);
  
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
        <div className="relative overflow-hidden h-48">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image 
              src={imageSrc}
              alt={project.name}
              fill
              onError={() => setImageError(true)}
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-darker to-transparent opacity-70"></div>
          
          <div className="absolute bottom-4 left-4 z-10">
            <span className="text-xs font-medium bg-primary/80 text-white px-2 py-1 rounded">
              {project.role}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tools.slice(0, 4).map((tool, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 rounded bg-dark-lighter text-primary"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 4 && (
                <span className="text-xs px-2 py-1 rounded bg-dark-lighter text-gray-400">
                  +{project.tools.length - 4}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {project.code && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white p-2 rounded-full bg-dark-lighter hover:bg-primary transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                )}
                
                {project.demo && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white p-2 rounded-full bg-dark-lighter hover:bg-primary transition-colors"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-medium text-primary hover:underline"
              >
                Learn more
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Highlight border effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent"
          animate={{ 
            borderColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 0, 0, 0)'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default ProjectCard;
