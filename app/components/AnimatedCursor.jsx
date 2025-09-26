'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Make cursor visible after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover effect for interactive elements
    const interactiveElements = [
      ...document.querySelectorAll('a, button, [role="button"], input, textarea, .interactive, .cursor-pointer')
    ];

    interactiveElements.forEach(element => {
      element.style.cursor = 'none';
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(element => {
        element.style.cursor = '';
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render the cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: position.x - 16, // Half of width
        top: position.y - 16,  // Half of height
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
        border: '2px solid rgba(99, 102, 241, 0.8)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.1s ease, background-color 0.2s ease',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        pointerEvents: 'none',
      }}
    >
      {isHovered && (
        <div className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </motion.div>
  );
}
