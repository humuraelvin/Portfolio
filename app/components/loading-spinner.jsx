"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingSpinner = ({ minDuration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Initializing...");
  const controls = useAnimation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    let startTime = Date.now();
    let progressInterval;
    let textChangeTimeout;
    
    // Start the progress animation
    progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / minDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
        
        // Add a small delay before hiding the spinner
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    }, 50);
    
    // Change the loading text at intervals
    const changeText = (index = 0) => {
      const loadingTexts = [
        "Initializing...",
        "Loading assets...",
        "Preparing UI components...",
        "Optimizing experience...",
        "Almost there...",
      ];
      
      setProgressText(loadingTexts[index % loadingTexts.length]);
      
      if (index < loadingTexts.length - 1) {
        textChangeTimeout = setTimeout(() => changeText(index + 1), minDuration / loadingTexts.length);
      }
    };
    
    changeText();
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(textChangeTimeout);
    };
  }, [minDuration]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-dark-darker' : 'bg-light'}`}></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo or Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Elvin<span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>.</span>
          </div>
        </motion.div>
        
        {/* Spinner animation */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-primary border-b-secondary border-l-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-t-accent border-r-transparent border-b-primary border-l-secondary"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ boxShadow: "0 0 10px rgba(37, 99, 235, 0)" }}
            animate={{ boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
        
        {/* Loading text and progress */}
        <div className="mt-10 flex flex-col items-center z-10">
          <motion.div 
            className={`w-64 sm:w-80 h-8 relative mb-3 font-mono text-sm text-center ${isDark ? 'text-white' : 'text-gray-900'} overflow-hidden`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block overflow-hidden">
              {progressText}
            </span>
            <motion.span
              className="absolute right-0 inline-block w-3 h-full bg-primary opacity-80"
              animate={{ opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          <div className={`w-64 sm:w-80 h-2 ${isDark ? 'bg-gray-800/50' : 'bg-gray-300/50'} rounded-full overflow-hidden backdrop-blur-sm`}>
            <motion.div 
              className="h-full relative bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
              initial={{ width: '0%' }}
            >
              <motion.div
                className="absolute top-0 right-0 h-full w-5 bg-white/20"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>
          
          <div className={`mt-2 font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Math.floor(progress)}%
            </motion.span>
          </div>
        </div>
        
        {/* Brand/Developer Identity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-xs text-center"
        >
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            Designed & Developed by Elvin HUMURA
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner; 