"use client";

import { ScrollReveal } from "@/app/components/helper/scroll-reveal";
import { useTheme } from "@/app/context/ThemeContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";
import { personalData } from "@/utils/data/personal-data";
import ContactForm from "./contact-form";

const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: personalData.socialMedia.linkedin, color: "bg-[#0077B5]" },
    { name: "GitHub", icon: <FaGithub />, url: personalData.socialMedia.github, color: "bg-[#333]" },
    { name: "Twitter", icon: <FaTwitter />, url: personalData.socialMedia.twitter, color: "bg-[#1DA1F2]" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-dark-darker/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Get In Touch
              </span>
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Have a project in mind or just want to say hello? Feel free to reach out and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="glass-card p-0.5">
              <div className={`${isDark ? 'bg-dark-lighter' : 'bg-light-darker'} p-6 sm:p-8 rounded-xl`}>
                <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Contact Information
                </h3>
                
                <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-1 p-2 rounded-full bg-primary/10">
                      <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className={`text-sm sm:text-base font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                      <a 
                        href={`mailto:${personalData.email}`} 
                        className={`text-sm sm:text-base ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-1 p-2 rounded-full bg-primary/10">
                      <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className={`text-sm sm:text-base font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Location</h4>
                      <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {personalData.location}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h4 className={`text-sm sm:text-base font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect with me</h4>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 sm:p-3 rounded-full ${social.color} text-white flex items-center justify-center hover:opacity-90 transition-all duration-300`}
                      onMouseEnter={() => setHoveredIcon(index)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Visit my ${social.name} profile`}
                    >
                      <span className="text-base sm:text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;