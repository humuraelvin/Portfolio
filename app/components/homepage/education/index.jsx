"use client"

import { educations } from "@/utils/data/educations";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import ScrollReveal from "../../helper/scroll-reveal";
import { useTheme } from "@/app/context/ThemeContext";
import { FaGraduationCap } from "react-icons/fa";
import { educationData } from "@/utils/data/education-data";

function Education() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div id="education" className="relative py-20 lg:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-dark-darker/50 to-transparent"></div>
        <div className="absolute -left-32 top-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Education
              </span>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              My academic journey and qualifications that have shaped my professional path
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="w-full lg:w-4/5 mx-auto">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-8">
              {educationData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative pl-8 ${index !== educationData.length - 1 ? 'pb-8' : ''}`}
                >
                  {/* Timeline connector */}
                  {index !== educationData.length - 1 && (
                    <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-primary/30"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <FaGraduationCap className="text-primary w-3.5 h-3.5" />
                  </div>
                  
                      <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.degree}
                      </h3>
                      <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {item.period}
                      </span>
                    </div>
                    
                    <h4 className={`text-sm sm:text-base font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.institution}
                    </h4>
                    
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
                </div>
              </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Education;