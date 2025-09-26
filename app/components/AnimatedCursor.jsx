'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, .interactive');
    
    const handleHoverStart = () => {
      setIsHovered(true);
      setCursorVariant('hover');
    };
    
    const handleHoverEnd = () => {
      setIsHovered(false);
      setCursorVariant('default');
    };

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart);
      element.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart);
        element.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: 1,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      border: '2px solid rgba(99, 102, 241, 0.8)',
      transition: {
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 300,
      },
    },
    hover: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      scale: 1.5,
      backgroundColor: 'rgba(99, 102, 241, 0.4)',
      border: '2px solid rgba(99, 102, 241, 1)',
    },
  };

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        mass: 0.1,
        damping: 20,
        stiffness: 300,
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full"
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          rotate: [0, 10, -10, 10, 0],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.div>
  );
}
