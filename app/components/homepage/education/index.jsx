"use client"

import { educations } from "@/utils/data/educations";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import ScrollReveal from "../../helper/scroll-reveal";

function Education() {
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
            <p className="text-gray-400 max-w-2xl mx-auto">
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

          <div className="space-y-6">
            {educations.map((education, index) => (
              <ScrollReveal 
                key={education.id} 
                direction="right" 
                delay={index * 0.1}
              >
                <div className="glass-card p-0.5">
                  <div className="bg-dark-lighter p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{education.title}</h3>
                        <p className="text-gray-300">{education.institution}</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                        {education.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 bg-primary/10 p-2 rounded-lg">
                        <BsPersonWorkspace className="text-primary w-5 h-5" />
                      </div>
                      <p className="text-sm text-gray-400">{education.description || "Focused on computer science, software development, and problem-solving skills."}</p>
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

export default Education;