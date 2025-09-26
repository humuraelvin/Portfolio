'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the cursor movement with spring physics
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Half of cursor width
      cursorY.set(e.clientY - 16); // Half of cursor height
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .interactive, .cursor-pointer'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className={`fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.2)',
        border: isHovered 
          ? '2px solid rgba(99, 102, 241, 1)' 
          : '2px solid rgba(99, 102, 241, 0.8)',
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full flex items-center justify-center"
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
      >
        {isHovered && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </motion.div>
    </motion.div>
  );
}
