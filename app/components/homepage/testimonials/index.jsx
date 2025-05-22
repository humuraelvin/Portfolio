"use client";

import { testimonialsData } from "@/utils/data/testimonials-data";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ScrollReveal } from "../../helper/scroll-reveal";
import TestimonialCard from "./testimonial-card";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useTheme } from "@/app/context/ThemeContext";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoplayRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Setup autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
      }, 5000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Touch swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Next testimonial
      goToNext();
    } else if (isRightSwipe) {
      // Previous testimonial
      goToPrev();
    }
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    resetAutoplay();
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    resetAutoplay();
  };

  const resetAutoplay = () => {
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 right-0 w-56 sm:w-64 h-56 sm:h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-56 sm:w-64 h-56 sm:h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                Client Testimonials
              </span>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto text-sm sm:text-base`}>
              Hear what others have to say about working with me on various projects and collaborations.
            </p>
          </div>
        </ScrollReveal>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Large quote icon background */}
          <div className="absolute -z-10 top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-5 sm:opacity-10">
            <FaQuoteLeft className="w-24 sm:w-32 h-24 sm:h-32 text-primary" />
          </div>

          {/* Mobile swipe indicator - only shows initially */}
          <motion.div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${isDark ? 'bg-dark-darker/70' : 'bg-light-darker/70'} rounded-xl px-3 py-2 sm:hidden`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-xs font-medium`}>Swipe to navigate</p>
          </motion.div>

          {/* Testimonials slider */}
          <div className="relative h-[500px] xs:h-[450px] sm:h-[400px] md:h-[350px]">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                isActive={index === activeIndex} 
              />
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  resetAutoplay();
                }}
                className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-6 sm:w-8"
                    : isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile navigation buttons */}
          <div className="flex justify-between mt-4 sm:hidden">
            <button
              onClick={goToPrev}
              className={`p-2 rounded-full ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} hover:bg-primary/20 transition-colors duration-300 active:scale-95`}
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <button
              onClick={goToNext}
              className={`p-2 rounded-full ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} hover:bg-primary/20 transition-colors duration-300 active:scale-95`}
              aria-label="Next testimonial"
            >
              <HiChevronRight className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>

          {/* Desktop navigation arrows */}
          <div className="hidden sm:block">
            <button
              onClick={goToPrev}
              className={`absolute top-1/2 -left-6 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} flex items-center justify-center hover:bg-primary/20 transition-colors duration-300`}
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className={`h-6 w-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <button
              onClick={goToNext}
              className={`absolute top-1/2 -right-6 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} flex items-center justify-center hover:bg-primary/20 transition-colors duration-300`}
              aria-label="Next testimonial"
            >
              <HiChevronRight className={`h-6 w-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>
        </div>

        {/* Animated decoration elements */}
        <div className="pointer-events-none absolute -z-10">
          <motion.div
            className="absolute right-[10%] top-[20%] w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-primary/20"
            animate={{
              y: [0, 20, 0],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute left-[15%] bottom-[30%] w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-secondary/20"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute left-[30%] top-[60%] w-10 sm:w-16 h-10 sm:h-16 rounded-full bg-accent/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 