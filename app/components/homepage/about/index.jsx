"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCode, FaDatabase, FaMobileAlt, FaServer } from "react-icons/fa";

function AboutSection() {
  const skills = [
    {
      title: "Frontend Development",
      description: "Building responsive, accessible, and performant user interfaces with modern frameworks",
      icon: <FaCode className="text-primary h-8 w-8" />,
    },
    {
      title: "Backend Development",
      description: "Designing robust APIs and server architectures with a focus on scalability and security",
      icon: <FaServer className="text-primary h-8 w-8" />,
    },
    {
      title: "Database Design",
      description: "Implementing efficient data storage solutions using both SQL and NoSQL databases",
      icon: <FaDatabase className="text-primary h-8 w-8" />,
    },
    {
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with responsive designs and native features",
      icon: <FaMobileAlt className="text-primary h-8 w-8" />,
    },
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            A glimpse into my background, skills, and what drives me in the world of software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card p-0.5">
              <div className="bg-dark-lighter p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-white">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {personalData.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 bg-dark rounded-lg"
                    >
                      <div className="flex items-start">
                        <div className="shrink-0 mt-1">
                          {skill.icon}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-white font-medium mb-1">{skill.title}</h4>
                          <p className="text-sm text-gray-400">{skill.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Image wrapper with gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={personalData.profile}
                    alt={personalData.name}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-dark-lighter rounded-lg flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
              >
                <span className="text-3xl">👨‍💻</span>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -left-4 w-20 h-20 bg-dark-lighter rounded-lg flex items-center justify-center"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 10, delay: 0.5 }}
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
              
              {/* Floating badges */}
              <motion.div 
                className="absolute -top-10 right-0 px-4 py-2 bg-primary rounded-full text-white text-sm font-medium"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Problem Solver
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 left-0 px-4 py-2 bg-secondary rounded-full text-white text-sm font-medium"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              >
                Innovator
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;