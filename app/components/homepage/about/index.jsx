"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import { personalData } from "@/utils/data/personal-data";
import AnimatedProfileIcons from "@/app/components/AnimatedProfileIcons";

const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const stats = [
    { value: "2+", label: "Years of Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "15+", label: "Technologies" },
    { value: "2+", label: "Companies" },
  ];

  return (
    <div id="about" className="relative py-20 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 w-full h-2/3 bg-gradient-to-b from-dark-darker/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              About Me
            </span>
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A glimpse into my background, skills, and what drives me in the world of software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatedProfileIcons />
                
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      viewport={{ once: true }}
                  className={`p-4 rounded-lg ${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} text-center`}
                >
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                    </motion.div>
                  ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Who am I?
            </h3>
            
            <div className="space-y-4">
              {personalData.aboutMe.map((paragraph, index) => (
                <p key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base leading-relaxed`}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8">
              <div>
                <h4 className={`text-base sm:text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Interests
                </h4>
                <ul className="space-y-2">
                  {personalData.interests.map((interest, index) => (
                    <li key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm flex items-start`}>
                      <span className="mr-2 text-primary">•</span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;