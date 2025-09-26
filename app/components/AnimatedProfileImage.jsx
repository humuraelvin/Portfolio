'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const AnimatedProfileImage = ({ src, alt, size = 200 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Animation variants for the floating effect
  const floatingAnimation = {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 5, 0],
    transition: {
      y: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
      rotate: {
        duration: 10,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  // Animation for the floating elements
  const floatingElements = [
    { size: 20, x: -30, y: -30, delay: 0, duration: 8 },
    { size: 15, x: 40, y: -20, delay: 0.5, duration: 7 },
    { size: 25, x: -20, y: 40, delay: 0.8, duration: 9 },
    { size: 18, x: 35, y: 35, delay: 0.3, duration: 10 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Animated background elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${isDark ? 'bg-primary/20' : 'bg-secondary/20'}`}
          style={{
            width: el.size,
            height: el.size,
          }}
          animate={{
            x: [0, el.x, 0],
            y: [0, el.y, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: {
              duration: el.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: el.delay,
            },
            y: {
              duration: el.duration + 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: el.delay + 0.5,
            },
            scale: {
              duration: el.duration - 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: el.delay + 0.3,
            },
          }}
        />
      ))}

      {/* Main profile image */}
      <motion.div
        className="relative rounded-full overflow-hidden border-4 border-primary/30 shadow-lg"
        style={{ width: size * 0.8, height: size * 0.8 }}
        animate={floatingAnimation}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 200px, 300px"
          priority
        />
        
        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderImage: isDark 
              ? 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e) 1' 
              : 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b) 1',
            borderImageSlice: 1,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        />
      </motion.div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-10`} />
    </div>
  );
};

export default AnimatedProfileImage;
