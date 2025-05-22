"use client";

import { personalData } from "@/utils/data/personal-data";
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];
  
  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: personalData.socialMedia.github },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: personalData.socialMedia.linkedin },
    { name: "Twitter", icon: <FaTwitter />, url: personalData.socialMedia.twitter },
    { name: "Email", icon: <FaEnvelope />, url: `mailto:${personalData.email}` },
  ];

  return (
    <footer className={`${isDark ? 'bg-dark-darker' : 'bg-light-darker'} relative mt-16 sm:mt-20`}>
      {/* Decorative Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {personalData.name}
              </h3>
            </Link>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 sm:mb-6 max-w-md`}>
              Software developer specializing in creating exceptional digital experiences 
              with a focus on quality, performance, and user experience.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${isDark ? 'bg-dark-lighter hover:bg-primary/20' : 'bg-light hover:bg-primary/10'} text-primary transition-colors duration-300`}
                  aria-label={link.name}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className={`text-base sm:text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 className={`text-base sm:text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact
            </h4>
            <div className="space-y-2">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {personalData.location}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <a 
                  href={`mailto:${personalData.email}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {personalData.email}
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'} text-center`}>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            &copy; {currentYear} {personalData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;