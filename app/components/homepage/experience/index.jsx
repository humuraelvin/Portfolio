"use client"

import { experiences } from "@/utils/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import ScrollReveal from "../../helper/scroll-reveal";
import { useTheme } from "@/app/context/ThemeContext";

function Experience() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div id="experience" className={`relative py-20 lg:py-32 ${isDark ? 'bg-dark-lighter/30' : 'bg-gray-50'}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-gradient-to-b from-dark/50 to-dark-darker/30' : 'bg-gradient-to-b from-gray-100/50 to-white/30'}`}></div>
        <div className="absolute -right-32 top-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Work Experience
              </span>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              My professional journey and roles that have contributed to my growth as a developer
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="w-full mx-auto">
              <AnimationLottie animationPath={experience} />
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ScrollReveal 
                key={experience.id} 
                direction="right" 
                delay={index * 0.1}
              >
                <div className="glass-card p-0.5">
                  <div className={`${isDark ? 'bg-dark' : 'bg-white'} p-6 rounded-xl ${!isDark && 'shadow-md'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{experience.title}</h3>
                        <p className="text-primary">{experience.company}</p>
                      </div>
                      <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                        {experience.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-3 mt-4">
                      <div className="shrink-0 bg-accent/10 p-2 rounded-lg mt-1">
                        <FaBriefcase className="text-accent w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{experience.description || "Developed and maintained applications, collaborated with cross-functional teams, and implemented best practices."}</p>
                        
                        {experience.responsibilities && (
                          <ul className={`list-disc list-inside text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1 ml-2`}>
                            {experience.responsibilities.map((task, i) => (
                              <li key={i}>{task}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;