"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // After mounting, we can safely show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  
  return (
    <motion.button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileTap={{ scale: 0.9 }}
      className={`
        relative overflow-hidden rounded-full p-2 
        ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'}
        transition-all duration-500 ease-out
        hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        group
      `}
      style={{
        boxShadow: isHovered 
          ? `0 0 ${isPressed ? '10px' : '20px'} rgba(${isDark ? '59, 130, 246' : '37, 99, 235'}, ${isPressed ? '0.7' : '0.5'})`
          : 'none',
      }}
    >
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-yellow-300"
          >
            <FaSun size={24} className="filter drop-shadow-[0_0_3px_rgba(253,224,71,0.7)]" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-blue-600"
          >
            <FaMoon size={24} className="filter drop-shadow-[0_0_3px_rgba(37,99,235,0.7)]" />
          </motion.div>
        )}
      </div>
      
      {/* Animated background effects */}
      <div 
        className={`
          absolute inset-0 -z-10 transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-30"></div>
        
        {/* Animated particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              scale: 0 
            }}
            animate={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: isHovered ? [0, 1, 0] : 0
            }}
            transition={{ 
              duration: 1.5 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 0.1
            }}
            className={`
              absolute w-1 h-1 rounded-full
              ${isDark ? 'bg-yellow-300' : 'bg-blue-400'}
              opacity-70 shadow-lg
            `}
          />
        ))}
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        initial={{ scale: 0, opacity: 0.7 }}
        animate={isPressed ? { scale: 4, opacity: 0 } : { scale: 0, opacity: 0.7 }}
        transition={{ duration: 0.8 }}
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-4 h-4 rounded-full -z-10
          ${isDark ? 'bg-yellow-300/30' : 'bg-blue-400/30'}
        `}
      />
    </motion.button>
  );
};

export default ThemeToggle; 