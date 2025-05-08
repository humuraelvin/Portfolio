"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaArrowRight, FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import Typed from "typed.js";

function HeroSection() {
  // For the typing effect
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Software Developer', 'Full Stack Engineer', 'Cybersecurity Expert', 'Problem Solver'],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 lg:py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-start justify-center"
          >
            <span className="text-sm sm:text-base font-medium text-primary mb-3 inline-block animate-fade-in">
              Hello, I&apos;m
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-fade-in">
              {personalData.name}
            </h1>
            <div className="mb-6 text-xl lg:text-2xl text-light-darker animate-fade-in flex h-8">
              I&apos;m a <span className="text-primary ml-2" ref={el}></span>
            </div>
            <p className="text-base lg:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed animate-slide-up">
              {personalData.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10 animate-slide-up">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalData.github}
                target='_blank'
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-lighter text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <BsGithub size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalData.linkedIn}
                target='_blank'
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-lighter text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <BsLinkedin size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalData.instagram}
                target='_blank'
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-lighter text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalData.leetcode}
                target='_blank'
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-lighter text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <SiLeetcode size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalData.twitter}
                target='_blank'
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-lighter text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <FaTwitterSquare size={22} />
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-slide-up">
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary group"
                >
                  Contact Me
                  <RiContactsFill className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href={personalData.resume} target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline group"
                >
                  Resume
                  <MdDownload className="transition-transform group-hover:translate-y-1" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right column - Code card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center items-center"
          >
            <div className="gradient-border w-full max-w-md">
              <div className="glass-card p-1">
                <div className="relative bg-dark-lighter p-4 rounded-xl overflow-hidden">
                  <div className="flex space-x-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <code className="font-mono text-xs md:text-sm block overflow-x-auto text-gray-300">
                    <div className="flex items-center">
                      <span className="text-primary">const</span>
                      <span className="text-white ml-2">developer</span>
                      <span className="text-gray-400 ml-2">=</span>
                      <span className="text-gray-400 ml-2">{'{'}</span>
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-white">name:</span>
                      <span className="text-secondary ml-2">&apos;Elvin HUMURA&apos;</span>,
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-white">title:</span>
                      <span className="text-secondary ml-2">&apos;Software Developer&apos;</span>,
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-white">skills:</span>
                      <span className="text-gray-400 ml-2">[</span>
                      <span className="text-accent">&apos;React&apos;</span>,
                      <span className="text-accent">&apos;Next.js&apos;</span>,
                      <span className="text-accent">&apos;Node.js&apos;</span>,
                      <span className="text-gray-400">...</span>
                      <span className="text-gray-400">]</span>,
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-white">traits:</span>
                      <span className="text-gray-400 ml-2">{'{'}</span>
                    </div>
                    
                    <div className="ml-8">
                      <span className="text-white">problemSolver:</span>
                      <span className="text-orange-400 ml-2">true</span>,
                    </div>
                    
                    <div className="ml-8">
                      <span className="text-white">quickLearner:</span>
                      <span className="text-orange-400 ml-2">true</span>,
                    </div>
                    
                    <div className="ml-8">
                      <span className="text-white">passionate:</span>
                      <span className="text-orange-400 ml-2">true</span>,
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-gray-400">{'}'}</span>,
                    </div>
                    
                    <div className="ml-4">
                      <span className="text-green-400">status:</span>
                      <span className="text-secondary ml-2">&apos;Available for hire&apos;</span>,
                    </div>
                    
                    <div>
                      <span className="text-gray-400">{'}'}</span>;
                    </div>
                  </code>
                  
                  <div className="mt-4 flex items-center text-xs text-gray-400">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    Ready to collaborate on innovative projects
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
          <FaArrowRight className="rotate-90 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;