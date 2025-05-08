"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Animation variants for different directions
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const upVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const downVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export function ScrollReveal({
  children,
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade', 'scale'
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}) {
  // Get appropriate animation variant based on direction
  const getVariant = () => {
    switch (direction) {
      case 'down':
        return downVariants;
      case 'left':
        return leftVariants;
      case 'right':
        return rightVariants;
      case 'fade':
        return fadeVariants;
      case 'scale':
        return scaleVariants;
      case 'up':
      default:
        return upVariants;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      transition={{ duration, delay }}
      variants={getVariant()}
    >
      {children}
    </motion.div>
  );
}

export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
}

export default ScrollReveal; 