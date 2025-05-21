"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCodeSlash } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiMicrosoftazure } from "react-icons/si";

const LoadingSpinner = ({ minDuration = 3000 }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });
  const startTimeRef = useRef(null);
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    startTimeRef.current = Date.now();
    
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Simulate loading progress with controlled speed based on minDuration
  useEffect(() => {
    // Calculate increment rate based on minDuration to ensure it takes the full time
    // We want to reach 100% just before minDuration is reached
    const incrementInterval = Math.max(50, minDuration / 400); // Ensure reasonable interval
    const progressPerStep = 100 / (minDuration / incrementInterval);
    
    // First phase - faster loading to ~75%
    let phase = 1;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTimeRef.current;
        const percentComplete = Math.min(100, (elapsed / minDuration) * 100);
        
        // Adjust progression speed based on current progress
        // This creates a natural-looking loading pattern (fast start, slow finish)
        if (prev >= 75 && phase === 1) {
          phase = 2; // Switch to slower phase
        }
        
        let increment;
        if (phase === 1) {
          // Phase 1: Move quickly to 75%
          increment = progressPerStep * 1.5; 
        } else {
          // Phase 2: Move slowly for the remaining 25%
          increment = progressPerStep * 0.5;
        }
        
        // Ensure we don't exceed 100% or go too fast beyond actual loading time
        const newProgress = Math.min(
          prev + (Math.random() * 0.5 + 0.8) * increment, // Add some randomness
          Math.min(98, percentComplete * 1.1) // Stay slightly ahead of elapsed time percentage
        );
        
        // Complete loading when time is up
        if (elapsed >= minDuration * 0.98) {
          clearInterval(interval);
          
          // Ensure smooth completion
          setTimeout(() => {
            setProgress(100);
            setTimeout(() => setLoading(false), 800);
          }, 200);
          
          return newProgress;
        }
        
        return newProgress;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, [minDuration]);

  // Update text based on progress
  useEffect(() => {
    if (progress < 15) {
      setProgressText('Initializing system architecture...');
    } else if (progress < 30) {
      setProgressText('Loading project data...');
    } else if (progress < 45) {
      setProgressText('Compiling developer experience...');
    } else if (progress < 60) {
      setProgressText('Optimizing portfolio assets...');
    } else if (progress < 75) {
      setProgressText('Analyzing skill matrix...');
    } else if (progress < 85) {
      setProgressText('Finalizing interface components...');
    } else if (progress < 95) {
      setProgressText('Performing final checks...');
    } else {
      setProgressText('Ready for exploration!');
    }
  }, [progress]);

  if (!loading) return null;

  // Generate random positions
  const generateRandomPosition = () => {
    if (!mounted) return { x: 0, y: 0 };
    
    return {
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height
    };
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-dark-darker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Digital code matrix background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
            
            {/* Binary matrix background */}
            {mounted && [...Array(20)].map((_, i) => (
              <motion.div 
                key={`binary-${i}`}
                className="absolute left-0 text-primary/30 font-mono text-xs opacity-70 whitespace-nowrap overflow-hidden"
                style={{ 
                  top: `${i * 5}vh`,
                  transform: `translateX(${Math.random() * 100}px)`
                }}
                initial={{ x: -100 }}
                animate={{ x: '100vw' }}
                transition={{ 
                  duration: Math.random() * 100 + 50,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(200)].map((_, j) => (
                  <span key={j}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`horizontal-${i}`}
                  className="absolute left-0 right-0 h-px bg-primary/5"
                  style={{ top: `${(i + 1) * 5}vh` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`vertical-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-primary/5"
                  style={{ left: `${(i + 1) * 5}vw` }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                />
              ))}
            </div>
            
            {/* Floating tech objects */}
            {mounted && (
              <>
                <motion.div
                  className="absolute p-3 rounded-lg bg-primary/10 backdrop-blur-sm"
                  initial={{ x: -100, y: -100, opacity: 0, rotate: -20 }}
                  animate={{ 
                    x: [null, 100, 200, 100], 
                    y: [null, 100, 200, 300], 
                    opacity: [0, 0.7, 0.7, 0],
                    rotate: [null, 0, 20, 0] 
                  }}
                  transition={{ duration: 15, times: [0, 0.3, 0.7, 1] }}
                >
                  <IoCodeSlash className="text-primary text-2xl md:text-3xl" />
                </motion.div>
                
                <motion.div
                  className="absolute p-3 rounded-lg bg-secondary/10 backdrop-blur-sm"
                  initial={{ x: windowSize.width + 100, y: -50, opacity: 0, rotate: 20 }}
                  animate={{ 
                    x: [null, windowSize.width - 200, windowSize.width - 300, windowSize.width - 200], 
                    y: [null, 100, 200, 300], 
                    opacity: [0, 0.7, 0.7, 0],
                    rotate: [null, 0, -20, 0] 
                  }}
                  transition={{ duration: 15, times: [0, 0.3, 0.7, 1], delay: 1 }}
                >
                  <FaGithub className="text-secondary text-2xl md:text-3xl" />
                </motion.div>
                
                <motion.div
                  className="absolute p-3 rounded-lg bg-accent/10 backdrop-blur-sm"
                  initial={{ x: windowSize.width / 2, y: windowSize.height + 100, opacity: 0, rotate: -10 }}
                  animate={{ 
                    x: [null, windowSize.width / 2 - 100, windowSize.width / 2 + 100, windowSize.width / 2], 
                    y: [null, windowSize.height - 100, windowSize.height - 200, windowSize.height - 300], 
                    opacity: [0, 0.7, 0.7, 0],
                    rotate: [null, 10, -10, 0] 
                  }}
                  transition={{ duration: 15, times: [0, 0.3, 0.7, 1], delay: 2 }}
                >
                  <FaLinkedin className="text-accent text-2xl md:text-3xl" />
                </motion.div>
                
                <motion.div
                  className="absolute p-3 rounded-lg bg-blue-500/10 backdrop-blur-sm"
                  initial={{ x: windowSize.width / 3, y: -100, opacity: 0, rotate: 15 }}
                  animate={{ 
                    x: [null, windowSize.width / 3 + 100, windowSize.width / 3 - 100, windowSize.width / 3], 
                    y: [null, 100, 200, 300], 
                    opacity: [0, 0.7, 0.7, 0],
                    rotate: [null, 0, 15, 0] 
                  }}
                  transition={{ duration: 15, times: [0, 0.3, 0.7, 1], delay: 3 }}
                >
                  <SiMicrosoftazure className="text-blue-500 text-2xl md:text-3xl" />
                </motion.div>
              </>
            )}
            
            {/* Connected nodes */}
            {mounted && (
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {[...Array(8)].map((_, i) => {
                  const startX = Math.random() * windowSize.width;
                  const startY = Math.random() * windowSize.height;
                  const endX = Math.random() * windowSize.width;
                  const endY = Math.random() * windowSize.height;
                  
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={startX}
                      y1={startY}
                      x2={startX}
                      y2={startY}
                      stroke="url(#line-gradient)"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        x2: endX, 
                        y2: endY, 
                        opacity: [0, 0.8, 0.8, 0] 
                      }}
                      transition={{ 
                        duration: 5,
                        times: [0, 0.3, 0.7, 1],
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  );
                })}
              </svg>
            )}
          </div>

          {/* Main spinner */}
          <div className="relative z-10">
            <svg width="160" height="160" viewBox="0 0 160 160" className="transform scale-75 sm:scale-100">
              {/* Tech-inspired hexagon frame */}
              <motion.path
                d="M80 10L140 45V115L80 150L20 115V45L80 10Z"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              
              {/* Progress hexagon */}
              <motion.path
                d="M80 10L140 45V115L80 150L20 115V45L80 10Z"
                fill="none"
                stroke="url(#spinner-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              />

              {/* Secondary decorative hexagons */}
              <motion.path
                d="M80 30L120 55V105L80 130L40 105V55L80 30Z"
                fill="none"
                stroke="rgba(139, 92, 246, 0.15)"
                strokeWidth="1"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center' }}
              />
              
              <motion.path
                d="M80 50L100 62.5V87.5L80 100L60 87.5V62.5L80 50Z"
                fill="none"
                stroke="rgba(236, 72, 153, 0.2)"
                strokeWidth="1"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: 'center' }}
              />
              
              {/* Centered glowing dot */}
              <motion.circle
                cx="80"
                cy="80"
                r="15"
                fill="url(#spinner-gradient)"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
                  transformOrigin: "center" 
                }}
              />
              
              {/* Loading progress marks */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180);
                const doneAngle = Math.floor(progress / 100 * 6);
                
                const isActive = i <= doneAngle;
                
                const x = 80 + 55 * Math.cos(angle);
                const y = 80 + 55 * Math.sin(angle);
                
                return (
                  <motion.circle
                    key={`marker-${i}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={isActive ? "url(#spinner-gradient)" : "rgba(255, 255, 255, 0.1)"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                  />
                );
              })}
              
              <defs>
                <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6">
                    <animate attributeName="stop-color" values="#3b82f6; #8b5cf6; #ec4899; #3b82f6" dur="4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#8b5cf6">
                    <animate attributeName="stop-color" values="#8b5cf6; #ec4899; #3b82f6; #8b5cf6" dur="4s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Circular tech nodes on hexagon corners */}
            {mounted && [...Array(6)].map((_, i) => {
              const angle = i * 60 * (Math.PI / 180);
              const x = 80 + 70 * Math.cos(angle);
              const y = 80 + 70 * Math.sin(angle);
              
              return (
                <motion.div
                  key={`node-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-primary/80"
                  style={{ 
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    times: [0, 0.3, 0.7, 1],
                    delay: i * 0.5,
                    repeat: Infinity,
                  }}
                />
              );
            })}
          </div>
          
          {/* Loading text and progress */}
          <div className="mt-10 flex flex-col items-center z-10">
            <motion.div 
              className="w-64 sm:w-80 h-8 relative mb-3 font-mono text-sm text-center text-white overflow-hidden"
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
            
            <div className="w-64 sm:w-80 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
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
            
            <div className="mt-2 font-mono text-xs text-gray-400">
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
            className="absolute bottom-10 left-0 right-0 flex justify-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center backdrop-blur-sm bg-dark-darker/30 px-6 py-3 rounded-lg border border-primary/10">
              <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wider font-mono">
                ELVIN HUMURA
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 tracking-widest">
                SOFTWARE DEVELOPER & CYBERSECURITY ENGINEER
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner; 